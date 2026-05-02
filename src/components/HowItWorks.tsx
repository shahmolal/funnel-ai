import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Link as LinkIcon, HelpCircle, MessageSquare, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">From URL to conversion roadmap.</h2>
          <p className="text-lg text-gray-500 font-medium">FunnelLens AI turns your landing page into a clear action plan in minutes.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="grid gap-10">
            <Step 
              number="01" 
              title="Paste your URL" 
              description="Simply drop the link to your landing page or specific sales page."
              icon={<LinkIcon className="w-5 h-5" />}
            />
            <Step 
              number="02" 
              title="Add context" 
              description="Tell us about your offer, audience, and the primary goal of the page."
              icon={<Target className="w-5 h-5" />}
            />
            <Step 
              number="03" 
              title="Get the roadmap" 
              description="Receive a prioritized 7-day action plan to plug your conversion leaks."
              icon={<HelpCircle className="w-5 h-5" />}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-charcoal/5 border border-gray-100"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Website URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm italic">https://</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="your-landing-page.com" 
                    className="w-full pl-16 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-sm font-medium"
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">What are you selling?</label>
                <textarea 
                  placeholder="e.g., A B2B SaaS for social media automation..." 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-sm font-medium h-24 resize-none"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main Goal</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-sm font-medium appearance-none">
                    <option>Get Leads</option>
                    <option>Direct Sales</option>
                    <option>Free Signups</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Target Audience</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Marketing Managers" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-sm font-medium"
                    readOnly
                  />
                </div>
              </div>

              <Link to="/dashboard/new-audit" className="block pt-4">
                <button className="w-full py-4 bg-charcoal text-white rounded-xl font-bold shadow-lg hover:shadow-violet-500/20 transition-all active:scale-[0.98]">
                  Analyze Funnel
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Step({ number, title, description, icon }: { number: string, title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="flex gap-6 group">
      <div className="flex-shrink-0">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-violet-600 font-display font-bold text-xl shadow-sm border border-gray-100 relative group-hover:scale-110 transition-transform">
          <span className="relative z-10">{number}</span>
          <div className="absolute inset-0 bg-violet-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-display font-bold text-gray-900 flex items-center gap-2">
          {title}
          <div className="text-violet-200 group-hover:text-violet-400 transition-colors">{icon}</div>
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
