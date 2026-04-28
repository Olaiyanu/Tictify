import { motion } from 'motion/react';

const steps = [
  {
    number: "01",
    title: "Create Event",
    description: "Add details and tickets."
  },
  {
    number: "02",
    title: "Sell Tickets",
    description: "Guests pay & get QR codes."
  },
  {
    number: "03",
    title: "Scan & Admit",
    description: "Prevent fraud at entry."
  }
];

export default function HowItWorks() {
  return (
    <section className="light-section py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="section-title">How Tictify Works</h2>
          <p className="section-subtitle">Simplified end-to-end ticketing management for any event scale.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 relative">
          {/* Detailed Connector line for desktop */}
          <div className="absolute top-[48px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent hidden md:block" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative text-center group"
            >
              <div className="w-24 h-24 bg-white border border-gray-100 rounded-3xl flex items-center justify-center text-brand-dark text-3xl font-display font-bold mx-auto mb-10 relative z-10 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2">
                <span className="text-brand-green">{step.number}</span>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-dark rounded-full flex items-center justify-center border-4 border-white">
                  <div className="w-2 h-2 bg-brand-green rounded-full animate-ping" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-dark">{step.title}</h3>
              <p className="text-gray-500 max-w-[240px] mx-auto text-base leading-relaxed font-medium">
                {step.description}
              </p>
              
              {/* Subtle Step Label */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
                Action Required
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
