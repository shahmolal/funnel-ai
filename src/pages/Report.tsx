import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  RotateCcw,
  Zap,
  ListChecks,
  Shield,
  Target,
  AlertTriangle,
  CheckCircle2,
  FileText,
  TrendingUp,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

type Audit = {
  id: string;
  user_id: string;
  landing_page_url: string;
  target_audience: string | null;
  offer: string | null;
  goal: string | null;
  tone: string | null;
  competitor_url: string | null;
  result: string;
  created_at: string;
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function extractScore(result: string) {
  const clean = result
    .replace(/\*\*/g, "")
    .replace(/#/g, "")
    .replace(/\n/g, " ");

  const patterns = [
    /overall\s+funnel\s+score\s*[:\-]?\s*(\d{1,3})\s*\/\s*100/i,
    /total\s+funnel\s+score\s*[:\-]?\s*(\d{1,3})\s*\/\s*100/i,
    /funnel\s+score\s*[:\-]?\s*(\d{1,3})\s*\/\s*100/i,
    /overall\s+score\s*[:\-]?\s*(\d{1,3})\s*\/\s*100/i,
    /score\s*[:\-]?\s*(\d{1,3})\s*\/\s*100/i,

    /overall\s+funnel\s+score\s*[:\-]?\s*(\d{1,3})/i,
    /total\s+funnel\s+score\s*[:\-]?\s*(\d{1,3})/i,
    /funnel\s+score\s*[:\-]?\s*(\d{1,3})/i,
    /overall\s+score\s*[:\-]?\s*(\d{1,3})/i,
    /score\s*[:\-]?\s*(\d{1,3})/i,

    /(\d{1,3})\s*\/\s*100/i,
  ];

  for (const pattern of patterns) {
    const match = clean.match(pattern);

    if (match) {
      const score = Number(match[1]);

      if (!Number.isNaN(score) && score >= 0 && score <= 100) {
        return score;
      }
    }
  }

  return null;
}

function getScoreLabel(score: number | null) {
  if (score === null) return "Not detected";
  if (score >= 80) return "Strong";
  if (score >= 65) return "Needs optimization";
  if (score >= 45) return "High friction";
  return "Critical";
}

function getScoreColor(score: number | null) {
  if (score === null) return "from-gray-400 to-gray-600";
  if (score >= 80) return "from-green-500 to-emerald-500";
  if (score >= 65) return "from-violet-500 to-blue-500";
  if (score >= 45) return "from-amber-500 to-orange-500";
  return "from-red-500 to-rose-500";
}

function extractSection(result: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(
    `##\\s+${escaped}\\s*([\\s\\S]*?)(?=\\n##\\s+|$)`,
    "i"
  );

  const match = result.match(regex);
  return match?.[1]?.trim() || "";
}

function extractBulletItems(text: string, limit = 3) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.startsWith("-") ||
        line.startsWith("*") ||
        /^\d+\./.test(line)
    )
    .map((line) =>
      line
        .replace(/^[-*]\s*/, "")
        .replace(/^\d+\.\s*/, "")
        .replace(/\*\*/g, "")
        .trim()
    )
    .filter(Boolean)
    .slice(0, limit);
}

function downloadMarkdown(audit: Audit) {
  const fileName = `funnellens-report-${getDomain(audit.landing_page_url)}.md`;

  const content = `# FunnelLens AI Report

URL: ${audit.landing_page_url}
Offer: ${audit.offer || "Not provided"}
Target Audience: ${audit.target_audience || "Not provided"}
Goal: ${audit.goal || "Not provided"}
Generated: ${new Date(audit.created_at).toLocaleString()}

---

${audit.result}
`;

  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

export default function Report() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();

  const [audit, setAudit] = useState<Audit | null>(null);
  const [latestAudit, setLatestAudit] = useState<Audit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      if (!user?.id) return;

      setLoading(true);

      if (id) {
        const { data, error } = await supabase
          .from("audits")
          .select(
            "id, user_id, landing_page_url, target_audience, offer, goal, tone, competitor_url, result, created_at"
          )
          .eq("id", id)
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Report load error:", error);
          setAudit(null);
        } else {
          setAudit(data as Audit);
        }
      } else {
        const { data, error } = await supabase
          .from("audits")
          .select(
            "id, user_id, landing_page_url, target_audience, offer, goal, tone, competitor_url, result, created_at"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Latest report load error:", error);
          setLatestAudit(null);
        } else {
          setLatestAudit((data as Audit) || null);
        }
      }

      setLoading(false);
    }

    if (!authLoading) {
      loadReport();
    }
  }, [id, user?.id, authLoading]);

  const activeAudit = audit || latestAudit;

  const score = useMemo(() => {
    if (!activeAudit?.result) return null;
    return extractScore(activeAudit.result);
  }, [activeAudit?.result]);

  const biggestProblems = useMemo(() => {
    if (!activeAudit?.result) return [];

    const section = extractSection(
      activeAudit.result,
      "Biggest Conversion Problems"
    );

    return extractBulletItems(section, 3);
  }, [activeAudit?.result]);

  const actionPlan = useMemo(() => {
    if (!activeAudit?.result) return "";

    return extractSection(activeAudit.result, "7-Day Action Plan");
  }, [activeAudit?.result]);

  const summary = useMemo(() => {
    if (!activeAudit?.result) return "";

    return (
      extractSection(activeAudit.result, "Summary Verdict") ||
      extractSection(activeAudit.result, "What The Page Currently Communicates")
    );
  }, [activeAudit?.result]);

  if (authLoading || loading) {
    return (
      <div className="pt-32 pb-24 px-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-500 font-medium">Loading saved report...</p>
        </div>
      </div>
    );
  }

  if (!activeAudit) {
    return (
      <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-3xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-7 h-7" />
          </div>

          <h1 className="text-4xl font-display font-bold text-gray-950 mb-4">
            No report found.
          </h1>

          <p className="text-gray-500 mb-8">
            Run your first audit and your saved report will appear here.
          </p>

          <Link
            to="/dashboard/new-audit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-950 text-white font-bold hover:bg-violet-700 transition-all"
          >
            <Zap className="w-4 h-4" />
            Run New Audit
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 px-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <button className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm text-gray-400 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600 mb-2">
                Saved Funnel Report
              </p>

              <h1 className="text-2xl md:text-4xl font-display font-bold text-gray-950 tracking-tight">
                Audit: {getDomain(activeAudit.landing_page_url)}
              </h1>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
                Generated: {new Date(activeAudit.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => downloadMarkdown(activeAudit)}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              Export Markdown
            </button>

            <Link to="/dashboard/new-audit">
              <button className="flex items-center gap-2 px-5 py-3 bg-gray-950 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-violet-700 transition-all">
                <RotateCcw className="w-4 h-4" />
                Run New Audit
              </button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100 space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 border border-violet-100">
                  <FileText className="w-5 h-5" />
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-950">
                    Summary Verdict
                  </h2>
                  <p className="text-sm text-gray-400 font-medium">
                    Pulled from your real AI audit output.
                  </p>
                </div>
              </div>

              <div className="text-gray-700 leading-relaxed">
                {summary ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {summary}
                  </ReactMarkdown>
                ) : (
                  <p>
                    The full report is available below. Summary section was not
                    detected in the AI output.
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <MiniStat
                  icon={<Target className="w-4 h-4" />}
                  label="Goal"
                  value={activeAudit.goal || "Not provided"}
                />

                <MiniStat
                  icon={<Shield className="w-4 h-4" />}
                  label="Audience"
                  value={activeAudit.target_audience || "Not provided"}
                />

                <MiniStat
                  icon={<TrendingUp className="w-4 h-4" />}
                  label="Offer"
                  value={activeAudit.offer || "Not provided"}
                />
              </div>
            </motion.div>

            <div className="p-8 md:p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <ListChecks className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-display font-bold text-gray-950">
                  7-Day Action Plan
                </h3>
              </div>

              {actionPlan ? (
                <div className="pro-report">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      ol: ({ children }) => (
                        <ol className="space-y-4 list-decimal pl-6">
                          {children}
                        </ol>
                      ),
                      ul: ({ children }) => (
                        <ul className="space-y-4 list-disc pl-6">
                          {children}
                        </ul>
                      ),
                      li: ({ children }) => (
                        <li className="text-gray-700 leading-relaxed font-medium">
                          {children}
                        </li>
                      ),
                    }}
                  >
                    {actionPlan}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-gray-500">
                  No action plan section detected. Check full report below.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 bg-gray-950 text-white rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col items-center text-center space-y-8"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/40 blur-3xl opacity-70" />

              <div className="space-y-2 relative z-10">
                <span className="text-xs font-bold text-white/40 uppercase tracking-[0.3em]">
                  Total Funnel Score
                </span>

                <div className="text-7xl font-display font-bold tracking-tighter">
                  {score ?? "—"}
                </div>

                <p className="text-sm font-bold text-violet-200 uppercase tracking-widest">
                  {getScoreLabel(score)}
                </p>
              </div>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative z-10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score ?? 0}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className={cn(
                    "h-full bg-gradient-to-r",
                    getScoreColor(score)
                  )}
                />
              </div>

              <p className="text-sm font-medium text-white/50 relative z-10">
                This score is extracted from the saved AI report.
              </p>
            </motion.div>

            <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h4 className="font-display font-bold text-gray-950">
                  Top Conversion Problems
                </h4>
              </div>

              {biggestProblems.length > 0 ? (
                <div className="space-y-4">
                  {biggestProblems.map((problem, index) => (
                    <LeakItem
                      key={problem}
                      rank={`0${index + 1}`}
                      title={problem}
                      impact={index === 0 ? "High" : "Medium"}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No bullet problems detected. Check the full report below.
                </p>
              )}
            </div>

            <div className="p-8 bg-violet-50 rounded-[2.5rem] border border-violet-100 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-violet-600 mb-4" />

              <h4 className="text-xl font-display font-bold text-gray-950 mb-2">
                Want another diagnosis?
              </h4>

              <p className="text-sm text-gray-600 mb-6">
                Run a new audit with updated copy, new landing page, or a
                competitor URL.
              </p>

              <Link
                to="/dashboard/new-audit"
                className="inline-flex items-center justify-center w-full px-5 py-3 bg-gray-950 text-white rounded-2xl font-bold hover:bg-violet-700 transition-all"
              >
                Run New Audit
              </Link>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600 mb-2">
              Full AI Report
            </p>

            <h2 className="text-3xl font-display font-bold text-gray-950">
              Complete saved analysis
            </h2>
          </div>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-950 mb-6">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-950 mt-10 mb-4 border-l-4 border-violet-500 pl-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-violet-700 mt-8 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-gray-950">
                  {children}
                </strong>
              ),
              ul: ({ children }) => (
                <ul className="space-y-3 mb-6 pl-6 list-disc text-gray-700">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-3 mb-6 pl-6 list-decimal text-gray-700">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-8 rounded-2xl border border-gray-200 bg-white">
                  <table className="w-full text-sm">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="bg-gray-100 px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-5 py-4 border-t border-gray-100 text-gray-700 align-top">
                  {children}
                </td>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-600 font-bold hover:underline"
                >
                  {children}
                </a>
              ),
            }}
          >
            {activeAudit.result}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
      <div className="flex items-center gap-2 text-violet-600 mb-2">
        {icon}
        <span className="text-xs font-bold uppercase tracking-widest">
          {label}
        </span>
      </div>

      <p className="text-sm font-bold text-gray-950 line-clamp-2">{value}</p>
    </div>
  );
}

function LeakItem({
  rank,
  title,
  impact,
}: {
  rank: string;
  title: string;
  impact: string;
}) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-violet-100 transition-colors">
      <div className="text-xs font-black text-violet-600 font-display shrink-0 underline">
        {rank}
      </div>

      <div className="space-y-2">
        <h5 className="text-sm font-bold text-gray-950">{title}</h5>

        <span
          className={cn(
            "inline-flex text-[9px] font-bold px-2 py-1 rounded-full uppercase",
            impact === "High"
              ? "bg-red-50 text-red-500"
              : "bg-amber-50 text-amber-500"
          )}
        >
          {impact} Impact
        </span>
      </div>
    </div>
  );
}