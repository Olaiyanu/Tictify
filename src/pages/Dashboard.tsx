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
  DollarSign
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [localEvents, setLocalEvents] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('events') || '[]');
    setLocalEvents(saved);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const stats = [
    { label: 'Total Tickets Sold', value: '1,284', icon: Ticket, trend: '+12.5%', color: 'text-brand-green' },
    { label: 'Revenue Generated', value: '₦4.2M', icon: DollarSign, trend: '+8.2%', color: 'text-brand-green' },
    { label: 'Event Attendees', value: '892', icon: Users, trend: '+15.3%', color: 'text-brand-green' },
    { label: 'Active Events', value: (localEvents.length + 2).toString(), icon: Calendar, trend: 'stable', color: 'text-white' },
  ];

  const recentEvents = [
    ...localEvents.map(e => ({ title: e.title, date: e.date, revenue: '₦0', sales: '0%', status: 'Live' })),
    { title: 'Summer Vibes Fest', date: 'Oct 24, 2026', revenue: '₦2,450,000', sales: '85%', status: 'Live' },
    { title: 'Tech Connect 2026', date: 'Nov 12, 2026', revenue: '₦1,820,000', sales: '62%', status: 'Live' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-green/30">
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
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 font-bold text-sm transition-all text-left">
            <Calendar className="w-4 h-4" />
            Events
          </button>
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
        {/* Header */}
        <header className="sticky top-0 z-40 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold font-display hidden sm:block">Organizer Dashboard</h1>
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-brand-green transition-colors" />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green/50 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-all relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-brand-green rounded-full border-2 border-brand-dark" />
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-black text-xs">
              JO
            </div>
          </div>
        </header>

        <div className="p-6 space-y-8">
          {/* Welcome & CTA */}
          <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold font-display mb-1">Welcome back, Johnson!</h2>
              <p className="text-gray-500 text-sm">Here's what's happening with your events today.</p>
            </div>
            <Link 
              to="/create-event"
              className="btn-primary py-3 px-6 rounded-2xl flex items-center justify-center gap-2 group whitespace-nowrap"
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
                className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  {stat.trend !== 'stable' && (
                    <div className="flex items-center gap-1 text-brand-green font-bold text-[10px]">
                      <TrendingUp className="w-3 h-3" />
                      {stat.trend}
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold font-mono mb-1">{stat.value}</p>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </section>

          {/* Tables Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Active Events Table */}
            <section className="xl:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-display uppercase tracking-widest text-brand-green">Your Events</h3>
                <button className="text-xs font-bold text-gray-500 hover:text-white flex items-center gap-1 transition-all group">
                  View All Events
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="overflow-x-auto ring-1 ring-white/5 rounded-3xl">
                <table className="w-full text-left bg-white/[0.02]">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      <th className="px-6 py-4">Event Name</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Sales</th>
                      <th className="px-6 py-4">Revenue</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentEvents.map((event) => (
                      <tr key={event.title} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-5">
                          <p className="font-bold text-sm text-white mb-1">{event.title}</p>
                          <p className="text-[10px] text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {event.date}
                          </p>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-tighter ${
                            event.status === 'Live' ? 'bg-brand-green text-brand-dark' : 'bg-white/10 text-gray-400'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="w-32 bg-white/5 h-1 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-brand-green" style={{ width: event.sales }} />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400">{event.sales} capacity</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-sm font-mono font-bold">{event.revenue}</span>
                        </td>
                        <td className="px-6 py-5">
                          <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Side Widget */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold font-display uppercase tracking-widest text-brand-green">Notifications</h3>
              <div className="space-y-4">
                {[
                  { user: 'Seyi G.', action: 'bought a ticket for Summer Vibes Fest', time: '2 mins ago' },
                  { user: 'Bose A.', action: 'bought a ticket for Summer Vibes Fest', time: '15 mins ago' },
                  { user: 'System', action: 'Tech Connect ticket sales reached 60%', time: '1 hour ago' },
                ].map((notif, i) => (
                  <div key={i} className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        <span className="text-white font-bold">{notif.user}</span> {notif.action}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-br from-brand-purple/20 to-brand-green/20 border border-white/10 rounded-3xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-lg font-bold mb-2">Premium Features</h4>
                  <p className="text-xs text-gray-400 mb-4">Unlock advanced analytics and sponsored visibility.</p>
                  <button className="text-xs font-bold text-brand-green flex items-center gap-1 group">
                    Upgrade Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <LayoutDashboard className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500" />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
