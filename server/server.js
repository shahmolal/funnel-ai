import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as cheerio from "cheerio";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = 8787;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PLAN_CONFIG = {
  free: {
    limit: 3,
    refreshHours: 12,
  },
  pro: {
    limit: 50,
    refreshHours: 15 * 24,
  },
  agency: {
    limit: 200,
    refreshHours: 30 * 24,
  },
};

function cleanText(text) {
  return text.replace(/\s+/g, " ").trim().slice(0, 12000);
}

async function scrapeWebsite(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Website fetch failed with status ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  $("script, style, noscript, svg, iframe").remove();

  const title = $("title").text();
  const metaDescription = $('meta[name="description"]').attr("content") || "";

  const headings = $("h1, h2, h3")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean)
    .join("\n");

  const buttons = $("button, a")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean)
    .slice(0, 100)
    .join("\n");

  const bodyText = $("body").text();

  return cleanText(`
PAGE TITLE:
${title}

META DESCRIPTION:
${metaDescription}

HEADINGS:
${headings}

BUTTONS / LINKS / CTAS:
${buttons}

PAGE TEXT:
${bodyText}
`);
}

async function getUserFromToken(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("Missing user token. Please login again.");
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    throw new Error("Invalid session. Please login again.");
  }

  return data.user;
}

async function getOrCreateUsage(userId, plan) {
  const config = PLAN_CONFIG[plan] || PLAN_CONFIG.free;

  const { data: existingUsage } = await supabaseAdmin
    .from("audit_usage")
    .select("user_id, period_start, period_end, used_count, updated_at")
    .eq("user_id", userId)
    .single();

  const now = new Date();

  if (!existingUsage) {
    const periodEnd = new Date(
      now.getTime() + config.refreshHours * 60 * 60 * 1000
    );

    const { data: newUsage, error } = await supabaseAdmin
      .from("audit_usage")
      .insert({
        user_id: userId,
        used_count: 0,
        period_start: now.toISOString(),
        period_end: periodEnd.toISOString(),
        updated_at: now.toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return newUsage;
  }

  const periodEnd = new Date(existingUsage.period_end);

  if (periodEnd.getTime() <= now.getTime()) {
    const newPeriodEnd = new Date(
      now.getTime() + config.refreshHours * 60 * 60 * 1000
    );

    const { data: resetUsage, error } = await supabaseAdmin
      .from("audit_usage")
      .update({
        used_count: 0,
        period_start: now.toISOString(),
        period_end: newPeriodEnd.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return resetUsage;
  }

  return existingUsage;
}

app.post("/api/analyze", async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "Missing GROQ_API_KEY in .env file.",
      });
    }

    const user = await getUserFromToken(req);

    const {
      landingPageUrl,
      targetAudience,
      offer,
      goal,
      tone,
      competitorUrl,
    } = req.body;

    if (!landingPageUrl) {
      return res.status(400).json({
        error: "Landing page URL is required.",
      });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, plan")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return res.status(400).json({
        error: "User profile not found. Please signup again.",
      });
    }

    const plan = profile.plan || "free";
    const config = PLAN_CONFIG[plan] || PLAN_CONFIG.free;

    const usage = await getOrCreateUsage(user.id, plan);

    if (usage.used_count >= config.limit) {
      return res.status(403).json({
        error: `You have used all ${config.limit} audits for your ${plan} plan. Your tokens refresh at ${new Date(
          usage.period_end
        ).toLocaleString()}.`,
      });
    }

    const pageContent = await scrapeWebsite(landingPageUrl);

    let competitorContent = "Not provided";
    if (competitorUrl) {
      try {
        competitorContent = await scrapeWebsite(competitorUrl);
      } catch {
        competitorContent = "Competitor website could not be fetched.";
      }
    }

    const prompt = `
You are FunnelLens AI, a strict CRO and landing page audit expert.

IMPORTANT RULES:
- Analyze ONLY the scraped page content below.
- Do NOT invent headlines, CTAs, claims, testimonials, or sections.
- If something is missing, say it is missing.
- Quote actual page phrases when useful.
- Give practical, specific, conversion-focused advice.

USER INPUT:
Landing Page URL: ${landingPageUrl}
Product/Service Offer: ${offer}
Target Audience: ${targetAudience}
Main Goal: ${goal}
Feedback Tone: ${tone}
Competitor URL: ${competitorUrl || "Not provided"}

SCRAPED LANDING PAGE CONTENT:
${pageContent}

SCRAPED COMPETITOR CONTENT:
${competitorContent}

Return in clean Markdown:

# Funnel Audit Report

## Overall Funnel Score
Start this section with exactly this line:
Overall Funnel Score: NN/100
Then explain the score in 2-3 sentences.

## What The Page Currently Communicates
Summarize actual page message.

## Summary Verdict
What works and what hurts conversions.

## Biggest Conversion Problems
Bullet points.

## Headline Clarity Issues
Use actual headline if found.

## Offer Weaknesses
What is unclear, weak, or missing.

## CTA Analysis
Mention actual CTA/button text found.

## Trust Signal Gaps
Testimonials, reviews, guarantees, security, logos, proof.

## Suggested Headline Rewrite
Give 3 improved options.

## Suggested CTA Rewrite
Give 5 improved CTA options.

## 7-Day Action Plan
Day 1 to Day 7.

## Priority Table
Markdown table columns: Issue, Evidence From Page, Impact, Priority, Fix.
`;

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are a strict CRO auditor. Never invent website content. Only analyze provided scraped content.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.2,
          max_tokens: 3500,
        }),
      }
    );

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return res.status(500).json({
        error: data?.error?.message || "Groq API error.",
      });
    }

    const result =
      data.choices?.[0]?.message?.content || "No result generated.";

    const { error: auditInsertError } = await supabaseAdmin
      .from("audits")
      .insert({
        user_id: user.id,
        landing_page_url: landingPageUrl,
        target_audience: targetAudience,
        offer,
        goal,
        tone,
        competitor_url: competitorUrl || null,
        result,
      });

    if (auditInsertError) {
      return res.status(500).json({
        error: auditInsertError.message,
      });
    }

    const newUsedCount = usage.used_count + 1;

    const { data: updatedUsage, error: usageUpdateError } = await supabaseAdmin
      .from("audit_usage")
      .update({
        used_count: newUsedCount,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select()
      .single();

    if (usageUpdateError) {
      return res.status(500).json({
        error: usageUpdateError.message,
      });
    }

    res.json({
      result,
      usage: updatedUsage,
      remaining: Math.max(config.limit - newUsedCount, 0),
      limit: config.limit,
      plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        error.message ||
        "Something went wrong while scraping or analyzing the website.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`FunnelLens backend running on http://localhost:${PORT}`);
});