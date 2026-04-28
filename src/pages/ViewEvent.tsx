import { motion } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  ArrowLeft, 
  Share2, 
  ShieldCheck,
  Zap,
  Bell,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  venue: string;
  price: string;
  image: string;
  description?: string;
  tickets?: { name: string; price: string; quantity: string }[];
  schedule?: { time: string; title: string; description: string }[];
  rules?: string;
}

const MOCK_EVENTS = [
  { id: 1, title: 'Lagos Jazz Night', category: 'Music', date: 'Dec 12, 2026', venue: 'Jazz Hole, VI', price: '₦15,000', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800' },
  { id: 101, title: 'Mainland Beach Fest', category: 'Outdoor', date: 'Dec 24, 2026', venue: 'Landmark Beach', price: '₦5,000', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800' },
];

export default function ViewEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('events') || '[]');
    const allEvents = [...saved, ...MOCK_EVENTS];
    const found = allEvents.find(e => e.id.toString() === id);
    
    if (found) {
      setEvent(found);
    } else {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  if (!event) return null;

  const generateCalendarLink = (type: 'google' | 'outlook' | 'apple') => {
    const title = encodeURIComponent(event.title);
    const location = encodeURIComponent(event.venue);
    const details = encodeURIComponent(event.description || `Join us for ${event.title}!`);
    
    // Default to a 2 hour duration
    const startDate = new Date(event.date);
    if (isNaN(startDate.getTime())) {
      // Fallback if date parsing fails
      startDate.setHours(19, 0, 0, 0);
    } else {
      startDate.setHours(19, 0, 0, 0); // Mock time
    }
    
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 2);

    const formatISO = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');

    switch (type) {
      case 'google':
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatISO(startDate)}/${formatISO(endDate)}&details=${details}&location=${location}`;
      case 'outlook':
        return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${details}&location=${location}`;
      case 'apple':
        // For Apple/iCal we'd typically generate a .ics file, but for a web link, this is a placeholder
        return `data:text/calendar;charset=utf8,BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:${window.location.href}\nDTSTART:${formatISO(startDate)}\nDTEND:${formatISO(endDate)}\nSUMMARY:${title}\nDESCRIPTION:${details}\nLOCATION:${location}\nEND:VEVENT\nEND:VCALENDAR`;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-green/30">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-brand-green transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Events</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Visuals & Info */}
            <div className="lg:col-span-8 space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl group"
              >
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 flex gap-2">
                   <span className="px-4 py-1.5 rounded-full bg-brand-green text-brand-dark text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {event.category}
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                    Live Event
                  </span>
                </div>
              </motion.div>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight">
                  {event.title}
                </h1>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Calendar, label: 'Date', val: event.date },
                    { icon: Clock, label: 'Time', val: '07:00 PM' },
                    { icon: MapPin, label: 'Location', val: event.venue },
                    { icon: ShieldCheck, label: 'Verified', val: 'Official Listing' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                      <item.icon className="w-5 h-5 text-brand-green mb-2" />
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-sm font-bold truncate">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6 pt-12 border-t border-white/5">
                <h2 className="text-2xl font-bold font-display uppercase tracking-widest text-brand-green flex items-center gap-3">
                  <Info className="w-6 h-6" />
                  Experience Details
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                  {event.description || `Join us for an unforgettable ${event.category} experience at ${event.venue}. Immerse yourself in the vibrant atmosphere as we bring together the best talent and the most energetic crowd in the city.`}
                </p>
              </div>

              {/* Rules / Terms */}
              <div className="p-8 bg-brand-green/5 border border-brand-green/20 rounded-[2.5rem]">
                <h3 className="text-lg font-bold mb-4 font-display flex items-center gap-2">
                   <ShieldCheck className="w-5 h-5 text-brand-green" />
                   Entry Policy
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {event.rules || "No outside food or drinks. 18+ valid ID required. Gates close 2 hours after event start time. Respect the organizers and fellow attendees."}
                </p>
              </div>
            </div>

            {/* Right Column: Ticket Checkout */}
            <div className="lg:col-span-4">
              <aside className="sticky top-28 space-y-6">
                <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] shadow-2xl">
                   <h3 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-brand-green" />
                    Secure Your Spot
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    {/* If custom tickets exist, show them, else show mock base ticket */}
                    <div className="space-y-3">
                       <button 
                        onClick={() => setSelectedTicket(0)}
                        className={`w-full p-6 pt-1 text-left border-2 transition-all group ${
                          selectedTicket === 0 
                            ? 'bg-brand-green/10 border-brand-green rounded-[1.5rem]' 
                            : 'bg-white/5 border-white/10 rounded-2xl hover:border-white/20'
                        }`}
                      >
                         <div className="flex justify-between items-center mb-1">
                           <span className={`text-[10px] font-black uppercase tracking-widest ${selectedTicket === 0 ? 'text-brand-green' : 'text-gray-500'}`}>Standard Access</span>
                           {selectedTicket === 0 && <span className="w-2 h-2 rounded-full bg-brand-green" />}
                         </div>
                         <div className="flex justify-between items-end">
                            <span className="text-2xl font-black font-mono">{event.price || 'Free'}</span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Available</span>
                         </div>
                      </button>

                      {/* Mock Second Tier if no custom tickets */}
                      <button 
                        onClick={() => setSelectedTicket(1)}
                        className={`w-full p-6 pt-1 text-left border-2 transition-all group ${
                          selectedTicket === 1 
                            ? 'bg-brand-green/10 border-brand-green rounded-[1.5rem]' 
                            : 'bg-white/5 border-white/10 rounded-2xl hover:border-white/20'
                        }`}
                      >
                         <div className="flex justify-between items-center mb-1">
                           <span className={`text-[10px] font-black uppercase tracking-widest ${selectedTicket === 1 ? 'text-brand-green' : 'text-gray-500'}`}>VIP Experience</span>
                           {selectedTicket === 1 && <span className="w-2 h-2 rounded-full bg-brand-green" />}
                         </div>
                         <div className="flex justify-between items-end">
                            <span className="text-2xl font-black font-mono">₦{((parseInt(event.price?.replace(/\D/g, '') || '0') * 2.5) || 50000).toLocaleString()}</span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Low Stock</span>
                         </div>
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <button 
                      onClick={() => setShowCalendarOptions(!showCalendarOptions)}
                      className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4 text-brand-green group-hover:animate-bounce" />
                        <span>Set Event Reminder</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showCalendarOptions ? 'rotate-180' : ''}`} />
                    </button>

                    {showCalendarOptions && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 w-full mt-2 bg-brand-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-20"
                      >
                        {[
                          { name: 'Google Calendar', type: 'google' as const },
                          { name: 'Outlook Calendar', type: 'outlook' as const },
                          { name: 'Apple Calendar (.ics)', type: 'apple' as const },
                        ].map((cal) => (
                          <a
                            key={cal.name}
                            href={generateCalendarLink(cal.type)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 hover:bg-brand-green hover:text-brand-dark transition-all text-[10px] font-black uppercase tracking-widest"
                            onClick={() => setShowCalendarOptions(false)}
                          >
                            {cal.name}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <button className="w-full btn-primary py-5 rounded-2xl shadow-[0_20px_50px_rgba(0,255,156,0.2)] flex items-center justify-center gap-3 group">
                    <Ticket className="w-5 h-5" />
                    <span className="tracking-widest uppercase text-sm">Checkout Now</span>
                  </button>

                  <div className="mt-6 flex flex-col items-center gap-4">
                     <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                       <ShieldCheck className="w-3 h-3 text-brand-green" />
                       Guaranteed safe & secure transactions
                     </p>
                     <div className="flex gap-4">
                        <button className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                          <Share2 className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="p-6 bg-gradient-to-br from-brand-purple/10 to-brand-green/10 border border-white/5 rounded-[2rem]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-green text-brand-dark flex items-center justify-center font-black text-xs">
                      JO
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Organizer</p>
                      <p className="text-sm font-bold">Johnson Events Co.</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
