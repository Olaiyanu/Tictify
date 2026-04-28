import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
        scrolled ? 'py-4 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <Link to="/" className="flex items-center group cursor-pointer">
        <span className="text-white font-display font-bold text-2xl tracking-tighter">Tictify</span>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {['Home', 'Discover', 'Pricing'].map((item) => (
          <a 
            key={item}
            href={item === 'Home' ? '/' : `#${item.toLowerCase()}`} 
            className="text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link 
          to="/signin" 
          className="text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-[0.15em] transition-colors px-4 py-2 rounded-lg border border-white/5 hover:bg-white/5"
        >
          Login
        </Link>
        <Link 
          to="/signup"
          className="bg-brand-green text-brand-dark px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] hover:shadow-[0_0_20px_rgba(0,255,156,0.3)] transition-all transform active:scale-95 text-center whitespace-nowrap"
        >
          Sign Up
        </Link>
      </div>
    </motion.nav>
  );
}
