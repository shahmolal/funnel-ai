import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, Shield, MousePointerClick, Zap } from 'lucide-react';

export default function ReportPreview() {
  return (
    <section className="py-24 px-6 bg-charcoal text-white overflow-hidden relative">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <TrendingUp className="w-4 h-4 text-violet-400" />
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Growth Strategist View</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">See your funnel like a growth strategist.</h2>
          
          <p className="text-lg text-white/50 font-medium leading-relaxed">
            Most tools give raw data. FunnelLens AI explains what is wrong, why it matters, and exactly what to fix first.
          </p>

          <div className="space-y-4 pt-4">
            <Bullet text="Diagnose weak funnel stages" />
            <Bullet text="Rewrite unclear copy" />
            <Bullet text="Prioritize fixes by conversion impact" />
            <Bullet text="Compare competitor positioning" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Mock Dashboard Preview */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-bold">Audit Dashboard</h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-5 bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Funnel Health</span>
                <div className="w-20 h-20 rounded-full border-4 border-violet-500/30 flex items-center justify-center relative">
                  <div className="absolute inset-0 border-4 border-violet-500 rounded-full border-t-transparent border-l-transparent rotate-45" />
                  <span className="text-xl font-display font-bold">84</span>
                </div>
              </div>
              <div className="p-5 bg-white/5 rounded-3xl border border-white/5 flex flex-col justify-center">
                <p className="text-xs text-white/50 mb-1">Top Conversion Leak</p>
                <p className="text-sm font-bold text-red-400">Checkout Objections</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-[10px] font-bold text-white/30 mb-2 uppercase">Impact</p>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-red-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group-hover:translate-x-2 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold">Headline Refresh</h5>
                    <p className="text-[10px] text-white/40">3 variants generated</p>
                  </div>
                </div>
                <div className="px-2 py-1 rounded bg-violet-500/20 text-violet-400 text-[10px] font-bold uppercase">High Priority</div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group-hover:translate-x-2 transition-transform delay-75">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <MousePointerClick className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold">CTA Button Fix</h5>
                    <p className="text-[10px] text-white/40">Positioning & Contrast</p>
                  </div>
                </div>
                <div className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase">Medium Priority</div>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-600/20 blur-3xl -z-10 group-hover:bg-violet-600/40 transition-colors" />
        </motion.div>
      </div>
    </section>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
        <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
      </div>
      <span className="text-sm font-semibold text-white/80">{text}</span>
    </div>
  );
}
