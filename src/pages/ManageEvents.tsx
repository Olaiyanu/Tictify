import { motion } from 'motion/react';
import { 
  Calendar, 
  ArrowRight,
  Bell,
  Search,
  Trash2,
  ExternalLink,
  Menu,
  X,
  LayoutDashboard,
  Settings,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ManageEvents() {
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

  const deleteEvent = (id: number) => {
    const updated = localEvents.filter(e => e.id !== id);
    setLocalEvents(updated);
    localStorage.setItem('events', JSON.stringify(updated));
  };

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
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-bold">Dashboard</span>
            </Link>
            <Link 
              to="/events" 
              className="flex items-center gap-4 p-4 rounded-2xl bg-brand-green/10 text-brand-green"
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
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 font-bold text-sm transition-all">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link to="/events" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-green/10 text-brand-green font-bold text-sm transition-all">
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
          <h1 className="text-lg font-bold font-display">Manage Events</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-black text-xs">
              JO
            </div>
          </div>
        </header>

        <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Events List */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold font-display uppercase tracking-widest text-brand-green">Your Creation</h2>
                        <span className="text-xs text-gray-500">{localEvents.length} active events</span>
                    </div>

                    <div className="space-y-4">
                        {localEvents.length === 0 ? (
                            <div className="p-12 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-[2rem]">
                                <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400 font-medium">You haven't created any events yet.</p>
                                <Link to="/create-event" className="text-brand-green font-bold text-sm mt-4 inline-block hover:underline">
                                    Create your first event
                                </Link>
                            </div>
                        ) : (
                            localEvents.map((event) => (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={event.id}
                                    className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col md:flex-row items-center gap-6 group hover:border-brand-green/30 transition-all"
                                >
                                    <div className="w-full md:w-32 aspect-video md:aspect-square rounded-xl overflow-hidden shrink-0">
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                                            <span className="font-mono text-brand-green">{event.price}</span>
                                            <span className="px-2 py-0.5 rounded bg-brand-green/10 text-brand-green uppercase text-[8px] font-black">{event.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all hidden sm:block">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => deleteEvent(event.id)}
                                            className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Notifications Panel */}
                <aside className="space-y-6">
                    <h2 className="text-xl font-bold font-display uppercase tracking-widest text-brand-green">Recent Activity</h2>
                    <div className="space-y-4">
                        {localEvents.length > 0 ? (
                            <>
                                <div className="p-4 bg-brand-green/5 border border-brand-green/20 rounded-2xl flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green shrink-0">
                                        <Bell className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-200">Your event "{localEvents[0].title}" is now live!</p>
                                        <p className="text-[10px] text-gray-500 mt-1">Just now</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex gap-4 opacity-60">
                                    <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-400">System maintenance scheduled for tonight.</p>
                                        <p className="text-[10px] text-gray-500 mt-1">2 hours ago</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-xs text-gray-500 italic">No recent activity to show.</p>
                        )}
                    </div>

                    <div className="p-6 bg-gradient-to-br from-brand-purple/10 to-brand-green/10 border border-white/5 rounded-[2rem]">
                        <h4 className="text-sm font-bold mb-2">Organizer Tip</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Complete your event description and add clear entry rules to reduce attendee inquiries by up to 60%.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
      </main>
    </div>
  );
}
