import { motion } from 'motion/react';
import { ArrowRight, Ticket, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] as any
      } 
    },
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-6 overflow-hidden glow-mesh">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-green/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-brand-purple/20 blur-[100px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl mb-8 group hover:border-brand-green/30 transition-colors">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="text-sm font-bold uppercase tracking-widest text-brand-green">Welcome to the future of Ticketing</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-bold leading-[1.05] mb-8 max-w-5xl font-display">
            Sell Event Tickets <br />
            <span className="bg-gradient-to-r from-brand-green via-white to-brand-green bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">The Smart Way</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl leading-relaxed">
            Create professional events in minutes, sell secure tickets, and manage entries with ease—trusted by thousands across Nigeria.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-24">
            <Link to="/signup" className="btn-primary group">
              Create an Event
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-secondary">
              Browse Events
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite Horizontal Scrolling Gallery */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-10 opacity-80 hover:opacity-100 transition-opacity">
        <motion.div 
          animate={{ x: [0, -2500] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap px-4"
        >
          {[
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
            "https://images.unsplash.com/photo-1514525253344-991f70969d62",
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
            "https://images.unsplash.com/photo-1514525253344-991f70969d62",
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
          ].map((src, i) => (
            <div key={i} className="inline-block w-[300px] md:w-[500px] h-[250px] md:h-[380px] flex-shrink-0 rounded-[2.5rem] overflow-hidden group relative">
              <img 
                src={`${src}?auto=format&fit=crop&q=80&w=1000`} 
                alt="Event"
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <p className="text-white font-bold text-lg">Featured Event #{i + 1}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating UI Elements (Relocated and kept subtle) */}
      <div className="max-w-7xl mx-auto relative h-0">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[450px] -left-4 md:-left-12 glass-card !p-5 flex items-center gap-4 w-60 shadow-2xl z-20 border-brand-green/20"
        >
          <div className="w-12 h-12 bg-brand-green/20 rounded-2xl flex items-center justify-center text-brand-green">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <p className="text-white text-sm font-bold">Ticket Received</p>
            <p className="text-[10px] text-gray-500 tracking-wider font-bold uppercase">Transaction Multi-Pass</p>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -top-[200px] -right-4 md:-right-12 glass-card !p-5 flex items-center gap-4 w-64 shadow-2xl z-20 border-brand-purple/20"
        >
          <div className="w-12 h-12 bg-brand-purple/30 rounded-2xl flex items-center justify-center text-white">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-white text-sm font-bold">2.4k Attendees</p>
            <p className="text-[10px] text-gray-500 tracking-wider font-bold uppercase">Live Tracking Active</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
