import { motion } from 'motion/react';
import { Search, MapPin, Calendar, Tag, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MOCK_EVENTS = [
  { id: 1, title: 'Lagos Jazz Night', category: 'Music', date: 'Dec 12, 2026', venue: 'Jazz Hole, VI', price: '₦15,000', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Tech Expo West Africa', category: 'Tech', date: 'Jan 15, 2027', venue: 'Landmark Centre', price: 'Free', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800' },
  { id: 101, title: 'Mainland Beach Fest', category: 'Outdoor', date: 'Dec 24, 2026', venue: 'Landmark Beach', price: '₦5,000', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800' },
];

export default function BrowseEvents() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [events, setEvents] = useState(MOCK_EVENTS);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents([...savedEvents, ...MOCK_EVENTS]);
  }, []);

  const categories = ['All', 'Music', 'Tech', 'Outdoor', 'Culture'];

  const filteredEvents = activeCategory === 'All' 
    ? events 
    : events.filter(e => e.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="browse" className="py-24 px-6 bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold font-display">
              Find your next <br />
              <span className="text-brand-green">epic experience.</span>
            </h2>
            <p className="text-gray-400 text-lg">Browse curated events from top organizers in Lagos and beyond.</p>
          </div>
          
          <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1 overflow-x-auto whitespace-nowrap hide-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-brand-green text-brand-dark shadow-[0_0_20px_rgba(0,255,156,0.25)]' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-brand-green/30 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-brand-dark/80 backdrop-blur-md rounded-full border border-white/10">
                  <span className="text-[10px] font-black text-brand-green uppercase tracking-widest">{event.category}</span>
                </div>
                <div className="absolute top-6 right-6 px-4 py-2 bg-brand-green text-brand-dark rounded-full font-black text-xs uppercase shadow-xl">
                  {event.price}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 font-display group-hover:text-brand-green transition-colors">{event.title}</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Calendar className="w-4 h-4 text-brand-green" />
                    <span className="text-xs font-medium uppercase tracking-widest">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-4 h-4 text-brand-green" />
                    <span className="text-xs font-medium uppercase tracking-widest">{event.venue}</span>
                  </div>
                </div>
                
                <Link to="/events" className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-brand-green hover:text-brand-dark hover:border-transparent transition-all flex items-center justify-center gap-2 group/btn">
                  View Tickets
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
           <button className="btn-secondary px-12 group">
             Search More Events
             <Search className="w-5 h-5 ml-3 text-brand-green group-hover:rotate-12 transition-transform" />
           </button>
        </div>
      </div>
    </section>
  );
}
