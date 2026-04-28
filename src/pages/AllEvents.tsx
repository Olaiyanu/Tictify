import { motion } from 'motion/react';
import { Search, MapPin, Calendar, Tag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MOCK_EVENTS = [
  { id: 1, title: 'Lagos Jazz Night', category: 'Music', date: 'Dec 12, 2026', venue: 'Jazz Hole, VI', price: '₦15,000', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800' },
  { id: 101, title: 'Mainland Beach Fest', category: 'Outdoor', date: 'Dec 24, 2026', venue: 'Landmark Beach', price: '₦5,000', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'TechSummit 2026', category: 'Tech', date: 'Jan 15, 2027', venue: 'Convention Centre', price: '₦25,000', image: 'https://images.unsplash.com/photo-1505373633560-eb28217336ed?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Art & Soul Expo', category: 'Culture', date: 'Feb 05, 2027', venue: 'National Gallery', price: 'Free', image: 'https://images.unsplash.com/photo-1460666819451-74129999a9aa?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Lagos Startup Meetup', category: 'Meetup', date: 'Mar 10, 2027', venue: 'Hub One, Yaba', price: 'Free', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800' },
];

export default function AllEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents([...saved, ...MOCK_EVENTS]);
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Music', 'Tech', 'Outdoor', 'Culture', 'Meetup'];

  const filteredEvents = events.filter(event => {
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-brand-green transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Return Home</span>
            </button>
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">Discovery <span className="text-brand-green">Hub</span></h1>
            <p className="text-gray-400 text-lg max-w-2xl">Browse the full catalog of epic experiences. Use filters to find exactly what you're looking for.</p>
          </header>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-green transition-colors" />
              <input 
                type="text" 
                placeholder="Search by title or venue..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 pl-14 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeCategory === category 
                      ? 'bg-brand-green text-brand-dark shadow-[0_10px_20px_rgba(0,255,156,0.2)]' 
                      : 'bg-white/5 text-gray-500 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Event Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={event.id} 
                  className="group"
                >
                  <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-4 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 hover:translate-y-[-4px]">
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-brand-green text-brand-dark text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
                          {event.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 px-2 pb-2">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-brand-green transition-colors">{event.title}</h3>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-gray-500">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{event.venue}</span>
                          </div>
                          <div className="flex items-center gap-2 text-brand-green">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{event.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Starting from</span>
                          <span className="text-lg font-mono font-black text-white">{event.price}</span>
                        </div>
                        <Link to={`/event/${event.id}`} className="p-4 bg-brand-green text-brand-dark rounded-2xl shadow-xl hover:scale-110 transition-all active:scale-95">
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
