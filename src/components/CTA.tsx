import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-brand-dark">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-brand-green/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto rounded-[3.5rem] bg-gradient-to-br from-brand-purple/40 to-brand-dark p-12 md:p-24 text-center border border-white/10 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-purple/20 rounded-full blur-3xl" />

        <h2 className="text-5xl md:text-7xl font-bold mb-8 font-display tracking-tight leading-tight">
          Ready to sell out <br />
          <span className="bg-gradient-to-r from-brand-green via-white to-brand-green bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
            your next event?
          </span>
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Join thousands of promoters and organizations already using Tictify to power their ticketing experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/signup" className="btn-primary group">
            Create an Event
          </Link>
          <button className="btn-secondary !bg-white/10 border-white/20">
            Contact Sales
          </button>
        </div>
      </motion.div>
    </section>
  );
}
