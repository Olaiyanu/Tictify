export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Tictify Logo" className="w-6 h-6 object-contain" />
          <span className="text-white font-display font-bold tracking-tight">Tictify</span>
        </div>
        
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Tictify. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-brand-green transition-colors">Twitter</a>
          <a href="#" className="hover:text-brand-green transition-colors">Instagram</a>
          <a href="#" className="hover:text-brand-green transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
