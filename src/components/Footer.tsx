import { Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <span className="text-white font-display font-bold tracking-tight">Tictify</span>
        </div>
        
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Tictify. All rights reserved.
        </p>

        <div className="flex gap-4">
          <a 
            href="#" 
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-brand-green hover:border-brand-green/30 hover:bg-brand-green/5 transition-all duration-300 group"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5 transition-transform group-hover:scale-110" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-brand-green hover:border-brand-green/30 hover:bg-brand-green/5 transition-all duration-300 group"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-brand-green hover:border-brand-green/30 hover:bg-brand-green/5 transition-all duration-300 group"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 transition-transform group-hover:scale-110" />
          </a>
        </div>
      </div>
    </footer>
  );
}
