import React, { useState } from 'react';
import PricingCards from '../components/PricingCards';
import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Can I start free?",
    a: "Yes, our Free plan includes 3 audits per month with basic funnel scoring and suggestions. No credit card required."
  },
  {
    q: "What is a funnel audit?",
    a: "A funnel audit is a deep dive into your landing page and product offer using AI to identify where users are dropping off and how to fix your copy and layout to improve conversions."
  },
  {
    q: "Do I need to install code?",
    a: "No. FunnelLens AI is entirely cloud-based. Just paste your URL and our AI analyzes the live version of your page."
  },
  {
    q: "Can agencies use this for clients?",
    a: "Absolutely. Our Agency plan is designed specifically for teams needing white-labeled PDF reports to present to clients."
  },
  {
    q: "Is payment active yet?",
    a: "Currently, we are in early access. You can select a plan and we will notify you as soon as full billing is live."
  }
];

export default function Pricing() {
  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Fair pricing for growing funnels.</h1>
          <p className="text-lg text-gray-500 font-medium">Choose the plan that fits your current conversion volume. Upgrade as you scale.</p>
        </div>

        <PricingCards />

        <div className="mt-32 max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string, a: string, key?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-3xl bg-gray-50/30 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-display font-bold text-gray-900">{q}</span>
        {isOpen ? <Minus className="w-4 h-4 text-gray-400" /> : <Plus className="w-4 h-4 text-gray-400" />}
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 pt-0 text-sm text-gray-500 font-medium leading-relaxed">
          {a}
        </div>
      </motion.div>
    </div>
  );
}
