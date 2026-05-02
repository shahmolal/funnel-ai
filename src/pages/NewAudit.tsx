import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Globe,
  ShoppingBag,
  Zap,
  Target as TargetIcon,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { analyzeFunnel } from "../api/analyze";

export default function NewAudit() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const [formData, setFormData] = useState({
    landingPageUrl: "",
    targetAudience: "",
    offer: "",
    goal: "Leads (Capture Email)",
    tone: "Balanced (Neutral & Clear)",
    competitorUrl: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const aiResult = await analyzeFunnel(formData);

    setResult(aiResult);
    setLoading(false);
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 text-violet-600 rounded-full border border-violet-100">
            <span className="w-2 h-2 bg-violet-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              New Intelligence Session
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            Set your funnel parameters.
          </h1>

          <p className="text-gray-500 font-medium">
            FunnelLens AI will fetch your page content, analyze the real copy,
            and generate a conversion-focused audit report.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-[3rem] border border-gray-100 shadow-2xl shadow-charcoal/5"
        >
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                  Landing Page URL
                </label>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Globe className="w-4 h-4 text-gray-300 group-focus-within:text-violet-500 transition-colors" />
                  </div>

                  <input
                    required
                    name="landingPageUrl"
                    value={formData.landingPageUrl}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://your-product.com/offer"
                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                  Target Audience
                </label>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <TargetIcon className="w-4 h-4 text-gray-300 group-focus-within:text-violet-500 transition-colors" />
                  </div>

                  <input
                    required
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g., Early-stage SaaS Founders"
                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                Product/Service Offer
              </label>

              <div className="relative group">
                <div className="absolute left-4 top-4 pointer-events-none">
                  <ShoppingBag className="w-4 h-4 text-gray-300 group-focus-within:text-violet-500 transition-colors" />
                </div>

                <textarea
                  required
                  name="offer"
                  value={formData.offer}
                  onChange={handleChange}
                  placeholder="What exactly are you selling?"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium text-sm min-h-[120px] resize-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                  Primary Goal
                </label>

                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium text-sm"
                >
                  <option>Leads (Capture Email)</option>
                  <option>Sales (Checkout Complete)</option>
                  <option>Signups (Account Creation)</option>
                  <option>Bookings (Demo/Call)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                  Feedback Tone
                </label>

                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium text-sm"
                >
                  <option>Balanced (Neutral & Clear)</option>
                  <option>Brutal (Hard-hitting truths)</option>
                  <option>Founder-friendly (Encouraging)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                Optional: Competitor URL
              </label>

              <input
                name="competitorUrl"
                value={formData.competitorUrl}
                onChange={handleChange}
                type="url"
                placeholder="https://competitor.com"
                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium text-sm"
              />
            </div>

            <motion.button
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={cn(
                "w-full py-5 rounded-[1.25rem] font-bold shadow-xl flex items-center justify-center gap-3 transition-all",
                loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-charcoal text-white hover:bg-black"
              )}
            >
              {loading ? (
                <>
                  <Zap className="w-5 h-5 animate-spin" />
                  Fetching page and analyzing funnel...
                </>
              ) : (
                <>
                  Analyze Funnel Architecture <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {result && (
          <div className="mt-12 bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-gray-100 p-8 md:p-10">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-2">
                AI Funnel Audit Result
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-950">
                Your conversion report
              </h2>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8">
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
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}