import { supabase } from "../lib/supabase";

export interface FunnelAuditInput {
  landingPageUrl: string;
  targetAudience: string;
  offer: string;
  goal: string;
  tone: string;
  competitorUrl?: string;
}

export async function analyzeFunnel(input: FunnelAuditInput) {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (!token) {
      return "Please login before running an audit.";
    }

    const response = await fetch("http://localhost:8787/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });

    const resultData = await response.json();

    if (!response.ok) {
      return resultData?.error || "API error. Please check backend server.";
    }

    return resultData.result || "No response generated.";
  } catch (error) {
    console.error("Analyze funnel error:", error);
    return "Backend server is not running. Please run: npm run server";
  }
}