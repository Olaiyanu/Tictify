import { motion } from 'motion/react';

export default function TrustText() {
  return (
    <section className="px-6 py-24 bg-brand-dark relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green/5 via-transparent to-brand-green/5 opacity-50" />
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <span className="text-brand-green font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Proven Credibility</span>
        <p className="text-white font-display font-medium text-2xl md:text-4xl leading-tight mb-2">
          Powering the next generation of <br /> 
          <span className="text-gray-400 italic">Nigerian events and communities.</span>
        </p>
        
        <p className="text-gray-500 text-sm font-medium">
          Trusted by campus promoters, private communities, and major organizers across Lagos, Abuja & PH.
        </p>
      </motion.div>
    </section>
  );
}
