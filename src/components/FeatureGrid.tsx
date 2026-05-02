import { motion } from 'motion/react';
import { Target, Zap, Layout, ShieldCheck, Mail, LineChart, Users, FileText } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Funnel Score",
    description: "Instant data-driven health check of your entire conversion architecture."
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "CTA Diagnosis",
    description: "Identify why your buttons are being ignored and how to fix the friction."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Offer Strength",
    description: "Deep analysis of your product's perceived value vs. consumer effort."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Trust Signal Gaps",
    description: "Locate exactly where users lose confidence and bounce from your site."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Headline Rewrite",
    description: "AI-generated hooks that speak directly to user pain points and desires."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Competitor Comparison",
    description: "Benchmark your funnel against top rivals to find your edge."
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "7-Day Fix Plan",
    description: "A step-by-step prioritized roadmap to repair your leaks immediately."
  },
  {
    icon: <ListChecks className="w-6 h-6" />,
    title: "Conversion Priority",
    description: "Focus on the 20% of changes that will drive 80% of your growth."
  }
];

function ListChecks({ className }: { className?: string }) {
  return <Mail className={className} />; // Placeholder as lucide-react might not have exact match in some versions
}

export default function FeatureGrid() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">More than a website audit.</h2>
          <p className="text-lg text-gray-500 font-medium">FunnelLens AI analyzes the full conversion journey, not just surface-level design.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:shadow-violet-500/5 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-normal">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
