import { motion } from 'motion/react';
import { ShieldCheck, CreditCard, ShoppingBag, ArrowRight, Lock } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Payment() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const plan = query.get('plan') || 'pro';

  const planInfo = {
    free: { name: 'Free', price: '$0' },
    pro: { name: 'Pro', price: '$19' },
    agency: { name: 'Agency', price: '$49' }
  }[plan.toLowerCase()] || { name: 'Pro', price: '$19' };

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-16">
        <div className="lg:col-span-3 space-y-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold tracking-tight">Complete your upgrade.</h1>
            <p className="text-gray-500 font-medium italic underline decoration-violet-200">You've selected the {planInfo.name} Plan.</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Billing Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Full Name" placeholder="Alex Johnson" />
              <Input label="Email" placeholder="alex@company.com" />
              <Input label="Company" placeholder="Nexus Growth" />
              <Input label="Tax ID (Optional)" placeholder="VAT-123456" />
            </div>
          </div>

          <div className="space-y-6 pt-10 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Payment Method</h3>
              <div className="flex gap-2">
                <div className="w-8 h-5 bg-gray-100 rounded border border-gray-200" />
                <div className="w-8 h-5 bg-gray-100 rounded border border-gray-200" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CreditCard className="w-4 h-4 text-gray-300" />
                </div>
                <input 
                  type="text" 
                  placeholder="Card Number" 
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium text-sm"
                />
                <input 
                  type="text" 
                  placeholder="CVC" 
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 bg-charcoal text-white rounded-2xl font-bold shadow-xl shadow-charcoal/10 flex items-center justify-center gap-3"
          >
            Authorize Payment & Start Audit <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <div className="flex items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure SSL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">PCI Compliant</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="p-8 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-charcoal border border-gray-100 shadow-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-display font-bold">Order Summary</h2>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">{planInfo.name} Plan</p>
                  <p className="text-xs text-gray-400 font-medium">Monthly Subscription</p>
                </div>
                <p className="text-lg font-display font-bold">{planInfo.price}<span className="text-xs font-medium text-gray-400">/mo</span></p>
              </div>
              <div className="flex justify-between items-center py-4 border-t border-gray-200">
                <p className="text-sm font-bold text-gray-400">Tax (0%)</p>
                <p className="text-sm font-bold">$0.00</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-2 border-gray-900 border-dashed">
                <p className="text-lg font-display font-bold">Total Due</p>
                <p className="text-3xl font-display font-bold text-violet-600 italic tracking-tighter">{planInfo.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all font-medium text-sm"
      />
    </div>
  );
}
