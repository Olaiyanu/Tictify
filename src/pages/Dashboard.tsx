import { motion } from 'motion/react';
import { 
  Users, 
  Ticket, 
  TrendingUp, 
  Calendar, 
  Plus, 
  ArrowRight,
  LayoutDashboard,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  DollarSign,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [localEvents, setLocalEvents] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('events') || '[]');
    setLocalEvents(saved);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  // Mock calculation based on real usage (events created)
  const totalRevenue = localEvents.reduce((acc, curr) => {
    const priceStr = curr.price.replace('₦', '').replace(',', '');
    const price = isNaN(Number(priceStr)) ? 0 : Number(priceStr);
    return acc + (price * 12); // Mock some sales
  }, 0);

  const stats = [
    { label: 'Total Tickets Sold', value: (localEvents.length * 12).toLocaleString(), icon: Ticket, trend: '+0%', color: 'text-brand-green' },
    { label: 'Revenue Generated', value: `₦${totalRevenue.toLocaleString()}`, icon: DollarSign, trend: '+0%', color: 'text-brand-green' },
    { label: 'Total Page Views', value: (localEvents.length * 150).toLocaleString(), icon: Users, trend: '+0%', color: 'text-brand-green' },
    { label: 'Events Created', value: localEvents.length.toString(), icon: Calendar, trend: 'Updated', color: 'text-white' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-green/30">
      {/* Mobile Navbar */}
      <div className="lg:hidden sticky top-0 z-[60] bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-black tracking-tighter text-white">
          EVENT<span className="text-brand-green">X</span>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl bg-white/5 text-brand-green"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 z-50 bg-brand-dark lg:hidden pt-24 px-6"
        >
          <nav className="space-y-4">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-4 p-4 rounded-2xl bg-brand-green/10 text-brand-green"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-bold">Dashboard</span>
            </Link>
            <Link 
              to="/events" 
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-bold">My Events</span>
            </Link>
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 text-left"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-bold">Sign Out</span>
            </button>
          </nav>
        </motion.div>
      )}

      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-brand-dark border-r border-white/5 hidden lg:flex flex-col z-50">
        <div className="p-8">
          <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
            EVENT<span className="text-brand-green">X</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-green/10 text-brand-green font-bold text-sm transition-all">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link to="/events" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 font-bold text-sm transition-all">
            <Calendar className="w-4 h-4" />
            Events
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 font-bold text-sm transition-all text-left">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-bold text-sm transition-all w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">
        <header className="sticky top-0 z-40 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold font-display">Organizer Overview</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-black text-xs">
              JO
            </div>
          </div>
        </header>

        <div className="p-6 space-y-8">
          {/* Welcome & CTA */}
          <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-brand-green/10 to-transparent p-8 rounded-[2.5rem] border border-brand-green/10">
            <div>
              <h2 className="text-3xl font-bold font-display mb-1 flex items-center gap-3">
                Good Afternoon, Johnson!
                <Sparkles className="w-6 h-6 text-brand-green" />
              </h2>
              <p className="text-gray-400 text-sm">Your business is growing. You have {localEvents.length} active events.</p>
            </div>
            <Link 
              to="/create-event"
              className="btn-primary py-4 px-8 rounded-2xl flex items-center justify-center gap-2 group whitespace-nowrap shadow-[0_20px_50px_rgba(0,255,156,0.15)]"
            >
              <Plus className="w-5 h-5" />
              <span className="text-sm">Create New Event</span>
            </Link>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={stat.label} 
                className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl group hover:border-brand-green/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold font-mono mb-1">{stat.value}</p>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold font-display mb-4">Quick Insights</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Events in the <span className="text-brand-green font-bold">Music</span> category are currently performing 25% better than last month. Consider increasing your marketing budget for social media.
                    </p>
                </div>
                <Link to="/events" className="text-xs font-bold text-brand-green flex items-center gap-2 group">
                    Manage your events
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>

             <div className="p-8 bg-brand-green text-brand-dark rounded-[2.5rem] relative overflow-hidden group">
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-black mb-2">Need Help?</h3>
                        <p className="font-bold opacity-70 text-sm max-w-[200px]">Our support team is here to help you scale your events.</p>
                    </div>
                    <button className="bg-brand-dark text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest mt-6 w-fit">
                        Contact Support
                    </button>
                </div>
                <Users className="absolute -bottom-8 -right-8 w-40 h-40 text-brand-dark/10 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" />
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
