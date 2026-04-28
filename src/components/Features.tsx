import { motion } from 'motion/react';
import { Smartphone, QrCode, ShieldCheck, Zap, Ticket, Users, ArrowRight } from 'lucide-react';

export default function Features() {
  return (
    <div className="space-y-0">
      {/* For Everyone Header */}
      <section className="bg-brand-dark pt-24 -mb-16">
        <div className="section-container text-center">
          <h2 className="section-title">For Everyone</h2>
          <p className="section-subtitle mx-auto">Tailored experiences for event goers and creators alike.</p>
        </div>
      </section>

      {/* Guests Section - Light */}
      <section id="guests" className="light-section relative overflow-hidden">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green border border-brand-green/20">
                <Ticket className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-display text-brand-dark leading-tight">
                For Guests
              </h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed">
                Experience events with frictionless entry and instant access. Your gateway to exclusive communities is just a tap away.
              </p>
              
              <div className="space-y-6 pt-4">
                {[
                  { title: "Instant e-Tickets", desc: "Get your tickets delivered to your inbox and wallet immediately.", icon: <Zap className="w-5 h-5" /> },
                  { title: "QR Code Scanning", desc: "No more printing. Just show your code for high-speed entry.", icon: <QrCode className="w-5 h-5" /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 p-2 bg-brand-green/10 rounded-lg text-brand-green">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg text-brand-dark">{item.title}</h4>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="light-card aspect-square flex items-center justify-center bg-gray-100/50 border-gray-200 shadow-2xl relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800" 
                  alt="Guest Experience"
                  className="w-full h-full object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-green/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Organizers Section - Dark */}
      <section id="organizers" className="bg-brand-dark relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/10 blur-[120px] -z-10" />
        
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1 relative"
            >
              <div className="glass-card aspect-square flex items-center justify-center border-white/10 shadow-2xl relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" 
                  alt="Organizer Dashboard"
                  className="w-full h-full object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-purple/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 md:order-2"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-display text-white leading-tight">
                For Organizers
              </h2>
              <p className="text-xl text-gray-400 font-medium leading-relaxed">
                Powerful tools to host, manage, and scale your events with ease. Built for growth and total control.
              </p>
              
              <div className="space-y-6 pt-4">
                {[
                  { title: "Event Manager App", desc: "A dedicated dashboard to track sales and scan guest tickets.", icon: <Smartphone className="w-5 h-5" /> },
                  { title: "Secure Bank Payouts", desc: "Receive your event earnings directly with zero hassle.", icon: <ShieldCheck className="w-5 h-5" /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 p-2 bg-white/5 rounded-lg text-brand-green border border-white/10">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg text-white">{item.title}</h4>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
