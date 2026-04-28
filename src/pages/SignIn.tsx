import { motion } from 'motion/react';
import { Eye, EyeOff, ArrowRight, ShieldCheck, Mail, Lock, Sparkles, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock SignIn
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col lg:flex-row relative">
      {/* Back to Home - Floating for Desktop/Mobile */}
      <Link 
        to="/" 
        className="absolute top-6 right-6 lg:top-10 lg:right-10 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Back to Home</span>
      </Link>

      {/* Visual Side Panel */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-brand-purple to-brand-dark p-20 flex-col justify-between"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-transparent to-brand-dark/80" />
        
        <Link to="/" className="relative z-10 flex items-center">
          <span className="text-2xl font-bold tracking-tighter text-white">Tictify</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Organizer Portal</span>
          </motion.div>
          <h1 className="text-5xl xl:text-7xl font-bold text-white font-display leading-[1.1]">
            Welcome back <br />
            <span className="text-brand-green">to Tictify.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-md leading-relaxed">
            Manage your events, view live analytics, and stay connected with your community.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6 opacity-50">
          <p className="text-sm font-medium text-white italic">Trusted by 500+ organizers</p>
        </div>
      </motion.div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-32 sm:p-12 lg:p-20 relative min-h-screen lg:min-h-0">
        <Link to="/" className="lg:hidden absolute top-6 left-6 flex items-center">
            <span className="text-xl font-bold text-white tracking-tighter">Tictify</span>
        </Link>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3 font-display">Welcome back</h2>
            <p className="text-gray-500 font-medium text-sm sm:text-base">Sign in to manage your events on Tictify</p>
          </div>

          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-white uppercase tracking-widest opacity-80">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-brand-green transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white outline-none focus:border-brand-green/50 focus:bg-white/[0.06] transition-all duration-300 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-white uppercase tracking-widest opacity-80">Password</label>
                <Link to="#" className="text-xs text-brand-green hover:underline">Forgot password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-brand-green transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-white outline-none focus:border-brand-green/50 focus:bg-white/[0.06] transition-all duration-300 font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button className="w-full btn-primary !py-5 flex items-center justify-center gap-3 group mt-8">
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-10 text-center text-gray-500 font-medium">
            New organizer? <Link to="/signup" className="text-brand-green hover:underline">Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
