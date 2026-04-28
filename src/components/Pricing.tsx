import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="light-section">
      <div className="section-container">
        <div className="text-center mb-20">
          <h2 className="section-title">Transparent Pricing</h2>
          <p className="section-subtitle mx-auto">Focus on your event, and we will handle the rest with simple, low fees.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="light-card border-gray-200"
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-4">Free</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-6xl font-bold text-brand-dark">₦0</span>
              </div>
              <p className="text-brand-green font-bold">Perfect for communities and students.</p>
            </div>
            
            <div className="h-[1px] bg-gray-200 mb-8" />
            
            <ul className="space-y-6 mb-12">
              {["Unlimited free tickets", "QR code scanning", "Mobile app manager", "Email support"].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-600 font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center border border-brand-green/20">
                    <Check className="w-3 h-3 text-brand-green" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button className="w-full btn-secondary !bg-gray-100 !text-brand-dark !border-gray-200 hover:!bg-gray-200">Get Started for Free</button>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="light-card ring-2 ring-brand-green bg-white p-10 transform lg:scale-110 shadow-[0_30px_100px_rgba(0,0,0,0.1)] relative"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-green text-brand-dark px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
              Most Popular
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-brand-purple uppercase tracking-widest mb-4">Pro</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-7xl font-bold text-brand-dark">3%</span>
                <span className="text-2xl text-gray-400 font-bold">+ ₦80</span>
              </div>
              <p className="text-gray-500 font-medium">Paid tickets made professional.</p>
            </div>

            <div className="h-[1px] bg-gray-100 mb-8" />
            
            <ul className="space-y-6 mb-12">
              {["Everything in Free", "Low transaction fees", "Instant payouts via ErcasPay", "Real-time ticket analytics", "Priority 24/7 support"].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-brand-dark font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center border border-brand-green/20">
                    <Check className="w-3 h-3 text-brand-green" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button className="w-full btn-primary">Start Selling Pro</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
