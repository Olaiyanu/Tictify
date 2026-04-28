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
      <Link to="/" className="flex items-center gap-3 group cursor-pointer">
        <img src="/logo.svg" alt="Tictify Logo" className="w-8 h-8 object-contain" />
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

      <div className="flex items-center gap-6">
        <Link to="/signin" className="text-gray-400 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors hidden sm:block">
          Login
        </Link>
        <Link 
          to="/signup"
          className="bg-brand-green text-brand-dark px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,255,156,0.4)] transition-all transform active:scale-95 text-center"
        >
          Sign Up
        </Link>
      </div>
    </motion.nav>
  );
}
