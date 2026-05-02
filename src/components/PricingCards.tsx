import { CheckCircle2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const plans = [
  {
    id: 'free',
    name: "Free",
    price: "$0",
    description: "Perfect for testing your first funnel leaks.",
    features: [
      "3 audits / month",
      "Basic funnel score",
      "CTA & clarity suggestions",
      "Core AI rewrite (1 hook)",
      "Standard email support"
    ],
    cta: "Start Free",
    link: "/signup",
    popular: false
  },
  {
    id: 'pro',
    name: "Pro",
    price: "$19",
    description: "Built for founders & marketers scaling ads.",
    features: [
      "50 audits / month",
      "Full funnel report",
      "Unlimited Copy rewrites",
      "7-day action plan",
      "Priority AI analysis",
      "Direct chat support"
    ],
    cta: "Upgrade",
    link: "/payment?plan=pro",
    popular: true
  },
  {
    id: 'agency',
    name: "Agency",
    price: "$49",
    description: "The complete toolkit for conversion agencies.",
    features: [
      "200 audits / month",
      "Competitor comparison",
      "Shareable reports",
      "Client-ready PDF export",
      "White-label options",
      "1-on-1 strategy call"
    ],
    cta: "Upgrade",
    link: "/payment?plan=agency",
    popular: false
  }
];

export default function PricingCards({ compact = false }: { compact?: boolean }) {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');

  return (
    <div className={cn("grid gap-8 items-center", compact ? "md:grid-cols-3 max-w-7xl mx-auto" : "md:grid-cols-3")}>
      {plans.map((plan) => {
        const isActive = selectedPlan === plan.id;
        
        return (
          <motion.div
            key={plan.id}
            layout
            onClick={() => setSelectedPlan(plan.id)}
            animate={{
              scale: isActive ? 1.05 : 0.95,
              opacity: isActive ? 1 : 0.8,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "p-10 rounded-[2.5rem] border flex flex-col h-full relative cursor-pointer transition-shadow duration-500",
              isActive 
                ? "bg-charcoal text-white shadow-[0_32px_64px_-12px_rgba(124,58,237,0.25)] border-violet-500/50 z-20" 
                : "bg-white text-gray-900 border-gray-100 shadow-sm z-10 hover:border-gray-200"
            )}
          >
            <AnimatePresence>
              {plan.popular && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-violet-500/20"
                >
                  <Star className="w-3 h-3 fill-white" /> Most Popular
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mb-10">
              <h3 className="font-display font-bold text-2xl mb-4 italic tracking-tight">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-display font-bold">{plan.price}</span>
                <span className={cn("text-sm font-medium", isActive ? "text-white/40" : "text-gray-400")}>/month</span>
              </div>
              <p className={cn("text-sm font-medium leading-relaxed", isActive ? "text-white/50" : "text-gray-500")}>
                {plan.description}
              </p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3">
                  <CheckCircle2 className={cn("w-4 h-4 shrink-0", isActive ? "text-violet-400" : "text-violet-600")} />
                  <span className={cn("text-sm font-medium", isActive ? "text-white/70" : "text-gray-600")}>{feature}</span>
                </li>
              ))}
            </ul>

            <Link to={plan.link} onClick={(e) => e.stopPropagation()}>
              <motion.button
                whileHover={{ scale: 1.02, translateY: -1 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                  isActive 
                    ? "bg-white text-charcoal hover:bg-violet-50 shadow-white/10" 
                    : "bg-charcoal text-white hover:bg-gray-800 shadow-gray-200"
                )}
              >
                {plan.cta}
              </motion.button>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
