import { motion } from 'motion/react';
import { Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="bg-charcoal rounded-[3rem] p-12 md:p-20 overflow-hidden relative text-center">
          {/* Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/30 blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/30 blur-[100px] -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-violet-400 mx-auto border border-white/10">
              <Target className="w-8 h-8" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">Ready to find your biggest conversion leaks?</h2>
            
            <p className="text-lg text-white/50 font-medium">
              Run your first audit and get a clear action plan before spending more on traffic.
            </p>
            
            <div className="pt-4">
              <Link to="/dashboard/new-audit">
                <motion.button
                  whileHover={{ scale: 1.05, translateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-charcoal px-10 py-5 rounded-2xl font-bold shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2 mx-auto group"
                >
                  Run Free Audit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <p className="mt-6 text-sm text-white/30 font-medium">No account required for your first report.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
