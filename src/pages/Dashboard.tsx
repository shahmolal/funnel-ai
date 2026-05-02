import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Clock,
  ExternalLink,
  LogOut,
  MoreVertical,
  Plus,
  Search,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

type Audit = {
  id: string;
  landing_page_url: string;
  target_audience: string | null;
  offer: string | null;
  goal: string | null;
  tone: string | null;
  competitor_url: string | null;
  result: string;
  created_at: string;
};

type AuditUsage = {
  user_id: string;
  period_start: string;
  period_end: string;
  used_count: number;
  updated_at: string;
};

const PLAN_LIMITS = {
  free: 3,
  pro: 50,
  agency: 200,
};

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

function formatCountdown(periodEnd?: string) {
  if (!periodEnd) return "Not available";

  const diff = new Date(periodEnd).getTime() - Date.now();

  if (diff <= 0) return "Refreshing soon";

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function getScoreBadgeClass(score: number | null) {
  if (score === null) return "bg-gray-50 text-gray-400 border-gray-100";
  if (score >= 80) return "bg-green-50 text-green-600 border-green-100";
  if (score >= 65) return "bg-violet-50 text-violet-600 border-violet-100";
  if (score >= 45) return "bg-amber-50 text-amber-600 border-amber-100";
  return "bg-red-50 text-red-600 border-red-100";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();

  const [audits, setAudits] = useState<Audit[]>([]);
  const [usage, setUsage] = useState<AuditUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [countdown, setCountdown] = useState("");

  const plan = profile?.plan || "free";
  const auditLimit = PLAN_LIMITS[plan] || PLAN_LIMITS.free;
  const usedCount = usage?.used_count || 0;
  const remainingAudits = Math.max(auditLimit - usedCount, 0);

  useEffect(() => {
    async function loadDashboard() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data: usageData, error: usageError } = await supabase
        .from("audit_usage")
        .select("user_id, period_start, period_end, used_count, updated_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (usageError) {
        console.error("Dashboard usage error:", usageError);
      }

      if (usageData) {
        setUsage(usageData as AuditUsage);
        setCountdown(formatCountdown(usageData.period_end));
      }

      const { data: auditData, error: auditError } = await supabase
        .from("audits")
        .select(
          "id, landing_page_url, target_audience, offer, goal, tone, competitor_url, result, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (auditError) {
        console.error("Dashboard audits error:", auditError);
      }

      setAudits((auditData || []) as Audit[]);
      setLoading(false);
    }

    if (!authLoading) {
      loadDashboard();
    }
  }, [user?.id, authLoading]);

  useEffect(() => {
    setCountdown(formatCountdown(usage?.period_end));

    const timer = setInterval(() => {
      setCountdown(formatCountdown(usage?.period_end));
    }, 1000);

    return () => clearInterval(timer);
  }, [usage?.period_end]);

  const filteredAudits = useMemo(() => {
    const cleanSearch = search.trim().toLowerCase();

    if (!cleanSearch) return audits;

    return audits.filter((audit) => {
      const url = audit.landing_page_url.toLowerCase();
      const offer = (audit.offer || "").toLowerCase();
      const audience = (audit.target_audience || "").toLowerCase();

      return (
        url.includes(cleanSearch) ||
        offer.includes(cleanSearch) ||
        audience.includes(cleanSearch)
      );
    });
  }, [audits, search]);

  const averageScore = useMemo(() => {
    const scores = audits
      .map((audit) => extractScore(audit.result))
      .filter((score): score is number => score !== null);

    if (scores.length === 0) return "—";

    const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return avg.toFixed(1);
  }, [audits]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  if (authLoading || loading) {
    return (
      <div className="pt-32 pb-20 px-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <p className="text-gray-500 font-medium">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600 mb-2">
              Growth Strategy Hub
            </p>

            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-gray-950">
              Welcome, {profile?.full_name || "Founder"}.
            </h1>

            <p className="text-gray-500 font-medium mt-2">
              Your real audits, tokens, plan, and refresh status.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleLogout}
              className="px-5 py-3 rounded-2xl bg-white border border-gray-100 text-gray-600 font-bold shadow-sm hover:text-red-600 hover:border-red-100 hover:shadow-md transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

            <Link to="/dashboard/new-audit">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-950 text-white px-6 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-2 hover:bg-violet-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                New Funnel Audit
              </motion.button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            icon={<Zap className="w-5 h-5 text-amber-500" />}
            label="Remaining Audits"
            value={`${remainingAudits}/${auditLimit}`}
            sub={`Plan: ${plan.toUpperCase()}`}
          />

          <StatCard
            icon={<Clock className="w-5 h-5 text-blue-500" />}
            label="Refresh Timer"
            value={countdown}
            sub="Next token reset"
          />

          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-violet-500" />}
            label="Avg. Funnel Score"
            value={averageScore}
            sub={`${audits.length} total audits`}
          />

          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 bg-gradient-to-br from-gray-950 via-gray-950 to-violet-950 rounded-[2.5rem] shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/30 blur-3xl" />
            <Shield className="w-6 h-6 text-violet-300 mb-5 relative z-10" />

            <h4 className="text-white text-xs font-bold uppercase tracking-widest opacity-60 relative z-10">
              Current Plan
            </h4>

            <p className="text-white text-3xl font-display font-bold mt-1 relative z-10">
              {plan.toUpperCase()}
            </p>

            <Link
              to="/pricing"
              className="mt-5 inline-flex text-xs font-bold text-violet-300 hover:text-white transition-colors relative z-10"
            >
              Upgrade plan →
            </Link>
          </motion.div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100 overflow-hidden">
          <div className="px-8 md:px-10 py-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-2xl text-gray-950">
                Recent Funnel Audits
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                These are your real saved audit reports.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search URL, offer..."
                className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
          </div>

          {filteredAudits.length === 0 ? (
            <div className="p-12 text-center">
              <h4 className="text-2xl font-display font-bold text-gray-950 mb-3">
                {audits.length === 0 ? "No audits yet." : "No matching audits."}
              </h4>

              <p className="text-gray-500 mb-6">
                {audits.length === 0
                  ? "Run your first funnel audit and it will appear here."
                  : "Try a different search term."}
              </p>

              {audits.length === 0 && (
                <Link
                  to="/dashboard/new-audit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-950 text-white font-bold hover:bg-violet-700 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Run First Audit
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Audit Target
                    </th>
                    <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                      Score
                    </th>
                    <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Offer
                    </th>
                    <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredAudits.map((audit) => {
                    const score = extractScore(audit.result);

                    return (
                      <tr
                        key={audit.id}
                        className="hover:bg-violet-50/40 transition-colors group"
                      >
                        <td className="px-8 py-6">
                          <div>
                            <a
                              href={audit.landing_page_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-bold text-gray-950 flex items-center gap-2 hover:text-violet-600 transition-colors"
                            >
                              {getDomain(audit.landing_page_url)}
                              <ExternalLink className="w-3 h-3 text-gray-400" />
                            </a>

                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(audit.created_at).toLocaleString()}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-6 text-center">
                          <div
                            className={`inline-flex items-center justify-center w-11 h-11 rounded-full text-xs font-bold border ${getScoreBadgeClass(
                              score
                            )}`}
                          >
                            {score ?? "—"}
                          </div>
                        </td>

                        <td className="px-6 py-6">
                          <span className="text-sm font-medium text-gray-600">
                            {audit.offer || "No offer provided"}
                          </span>
                        </td>

                        <td className="px-6 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/dashboard/report/${audit.id}`}>
                              <button className="px-4 py-2 bg-violet-50 text-violet-600 text-xs font-bold rounded-xl border border-violet-100 uppercase hover:bg-violet-600 hover:text-white transition-all">
                                View Report
                              </button>
                            </Link>

                            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="px-8 md:px-10 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400">
              Total: {audits.length} audits performed
            </p>

            <p className="text-xs font-bold text-violet-600">
              {remainingAudits} audits remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-all space-y-4"
    >
      <div className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
        {icon}
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
          {label}
        </h4>

        <p className="text-3xl font-display font-bold text-gray-950">
          {value}
        </p>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-tight mt-2">
          {sub}
        </p>
      </div>
    </motion.div>
  );
}