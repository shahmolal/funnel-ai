import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Zap, Target, Layout, ShieldCheck, ListChecks } from 'lucide-react';
import { cn } from '../lib/utils';

const states = [
  {
    id: '01',
    label: 'Funnel Score',
    title: 'Visualizing Weakness',
    content: (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Overall Funnel Score</span>
          <span className="text-3xl font-display font-bold text-amber-500">72/100</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ScoreIndicator label="Clarity" status="Needs Work" color="bg-amber-100 text-amber-700" />
          <ScoreIndicator label="CTA" status="Weak" color="bg-red-100 text-red-700" />
          <ScoreIndicator label="Trust" status="Missing" color="bg-gray-100 text-gray-500" />
          <ScoreIndicator label="Offer" status="Good" color="bg-green-100 text-green-700" />
        </div>
        <div className="space-y-3 pt-2">
          <RecommendationCard icon={<Target className="w-4 h-4" />} text="Hero position doesn't match intent" />
          <RecommendationCard icon={<ShieldCheck className="w-4 h-4" />} text="Social proof missing above fold" />
          <RecommendationCard icon={<Zap className="w-4 h-4" />} text="Secondary CTA competing with Hero" />
        </div>
      </div>
    )
  },
  {
    id: '02',
    label: 'Copy Rewrite',
    title: 'AI Copy Generation',
    content: (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
            <span className="absolute -top-3 left-3 px-2 bg-white text-[10px] font-bold text-gray-400 border border-gray-100 uppercase rounded">Original Copy</span>
            <p className="text-sm italic text-gray-500">“We help businesses grow online with our innovative software solutions and professional tools.”</p>
          </div>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="p-5 bg-violet-50 rounded-xl border border-violet-100 relative shadow-sm"
          >
            <span className="absolute -top-3 left-3 px-2 bg-violet-600 text-[10px] font-bold text-white uppercase rounded">AI Optimized</span>
            <p className="text-base font-semibold text-violet-900 leading-tight">“Turn paid traffic into qualified leads in 7 days without changing your budget.”</p>
          </motion.div>
        </div>
        <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
          <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Why it works</h5>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            Shifted from "Features" to "Specific Outcomes". Added a clear timeframe (7 days) and addressed a primary objection (budget).
          </p>
        </div>
      </div>
    )
  },
  {
    id: '03',
    label: 'Action Plan',
    title: 'Daily Roadmap',
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-display font-bold text-gray-900">Conversion Roadmap</h4>
          <span className="px-2 py-1 bg-violet-100 text-violet-700 text-[10px] font-bold rounded uppercase">7-Day Fix</span>
        </div>
        <div className="space-y-2">
          <DayItem day="1" text="Rewrite hero headline for benefit-driven focus" completed={true} />
          <DayItem day="2" text="Move primary CTA button above the scroll fold" completed={false} />
          <DayItem day="3" text="Add social proof section (Logos & Testimonials)" completed={false} />
          <DayItem day="4" text="Clarify one primary transformation in the offer" completed={false} />
          <DayItem day="5" text="Add FAQ for top 3 conversion objections" completed={false} />
          <DayItem day="6" text="Add trust badges near the final checkout/signup" completed={false} />
          <DayItem day="7" text="Relaunch and monitor engagement metrics" completed={false} />
        </div>
      </div>
    )
  }
];

export default function Hero() {
  const [activeState, setActiveState] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveState((prev) => (prev + 1) % states.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-b from-violet-50/50 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-200/20 blur-3xl rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 border border-violet-100 rounded-full">
            <span className="w-2 h-2 bg-violet-600 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">AI Funnel Intelligence</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight">
            Find what’s killing your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">conversions.</span>
          </h1>
          
          <p className="text-lg text-gray-500 leading-relaxed max-w-lg font-medium">
            Paste your landing page URL and get an AI-powered funnel diagnosis with clear fixes, rewritten copy, and a prioritized action plan.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/dashboard/new-audit">
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-charcoal text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 group w-full sm:w-auto overflow-hidden relative"
              >
                <span className="relative z-10">Run Free Audit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </Link>
            
            <a href="#how-it-works" className="text-sm font-bold text-gray-400 hover:text-charcoal transition-colors flex items-center gap-1 group">
              See How It Works
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
          
          <div className="flex items-center gap-6 pt-4">
            <TrustPoint text="No code" />
            <TrustPoint text="No setup" />
            <TrustPoint text="Instant report" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Card Showcase Display */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-1 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
            <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 aspect-[4/3] md:aspect-square lg:aspect-[4/3] p-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeState}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col"
                >
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-8 border-b border-gray-50 pb-4">{states[activeState].title}</h3>
                  <div className="flex-grow">
                    {states[activeState].content}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-white shadow-xl rounded-full border border-gray-100">
            {states.map((state, idx) => (
              <button
                key={state.id}
                onClick={() => setActiveState(idx)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2",
                  activeState === idx 
                    ? "bg-charcoal text-white shadow-md shadow-charcoal/20" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                )}
              >
                <span>{state.id}</span>
                <span className={cn("hidden lg:block overflow-hidden transition-all duration-300 whitespace-nowrap", activeState === idx ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0")}>{state.label}</span>
              </button>
            ))}
          </div>

          {/* Decorative accents */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-100 rounded-full blur-xl opacity-60" />
          <div className="absolute -bottom-10 -right-4 w-20 h-20 bg-violet-100 rounded-full blur-xl opacity-60" />
        </motion.div>
      </div>
    </section>
  );
}

function ScoreIndicator({ label, status, color }: { label: string, status: string, color: string }) {
  return (
    <div className="p-3 rounded-2xl border border-gray-50 bg-gray-50/30">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <div className={cn("inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase", color)}>
        {status}
      </div>
    </div>
  );
}

function RecommendationCard({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
      <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600">
        {icon}
      </div>
      <p className="text-xs font-semibold text-gray-700">{text}</p>
    </div>
  );
}

function DayItem({ day, text, completed }: { day: string, text: string, completed: boolean }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors",
        completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400 group-hover:bg-violet-100 group-hover:text-violet-600"
      )}>
        {completed ? <CheckCircle2 className="w-3 h-3" /> : day}
      </div>
      <p className={cn("text-xs font-semibold", completed ? "text-gray-400 line-through" : "text-gray-700")}>{text}</p>
    </div>
  );
}

function TrustPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{text}</span>
    </div>
  );
}
