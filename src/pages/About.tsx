import React from 'react';
import { Shield, Target, Zap, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <h1 className="text-4xl md:text-7xl font-display font-bold tracking-tight mb-8 italic">
            Stop guessing, <br /> 
            <span className="text-violet-600">start optimizing.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            We built FunnelLens AI because most marketing audits are subjective. We replace 'opinions' with AI-driven conversion intelligence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
          <div className="space-y-12">
            <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium bg-violet-50 p-8 rounded-[2.5rem] border border-violet-100">
                “To help founders, marketers, and agencies find conversion leaks before they waste more traffic.”
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold">Why FunnelLens AI exists</h2>
              <p className="text-gray-500 leading-relaxed font-medium">
                Billions of dollars are wasted every year on PPC traffic that lands on broken funnels. Agency audits are expensive and slow. Heatmaps are noisy. 
              </p>
              <p className="text-gray-500 leading-relaxed font-medium">
                FunnelLens AI gives you a growth strategist's brain in seconds. We look at clarity, trust, offer strength, and friction points across your entire surface area.
              </p>
            </section>
          </div>

          <div className="bg-gray-50 rounded-[3rem] p-12 space-y-10">
            <h3 className="text-2xl font-display font-bold">Our Philosophy</h3>
            <div className="space-y-8">
              <PhilosophyItem 
                icon={<Target className="w-5 h-5" />} 
                title="Diagnose" 
                text="Find the specific leaks where users are bouncing."
              />
              <PhilosophyItem 
                icon={<Zap className="w-5 h-5" />} 
                title="Explain" 
                text="Not just 'what' is wrong, but 'why' it hurts your conversion."
              />
              <PhilosophyItem 
                icon={<Shield className="w-5 h-5" />} 
                title="Fix" 
                text="Actionable steps and copy rewrites you can implement today."
              />
            </div>
          </div>
        </div>

        <div className="text-center pt-24 border-t border-gray-100">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Built for teams who care about ROI</p>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40">
            {/* Mock team logos/indicators */}
            <span className="font-display font-black text-2xl tracking-tighter italic">Founders.</span>
            <span className="font-display font-black text-2xl tracking-tighter italic">Marketers.</span>
            <span className="font-display font-black text-2xl tracking-tighter italic">Agencies.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhilosophyItem({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="flex gap-6">
      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-violet-600 shadow-sm border border-gray-100 shrink-0">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-display font-bold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
