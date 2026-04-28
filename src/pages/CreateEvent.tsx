import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Tag as TagIcon,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Info,
  Car,
  Wind,
  PlusCircle,
  FileText,
  Users,
  Ticket,
  Star,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type FeePayer = 'attendee' | 'organizer';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [feePayer, setFeePayer] = useState<FeePayer>('attendee');
  const [images, setImages] = useState<string[]>([]);
  const [highlights, setHighlights] = useState([
    'Live performances from top artists',
    'Food and beverage vendors',
    'Interactive activities and games'
  ]);
  const [ticketTypes, setTicketTypes] = useState([{ name: 'Regular', price: '5000', quantity: '100' }]);

  const handleLaunchEvent = () => {
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const newEvent = {
      id: Date.now(),
      title: eventData.title || 'Untitled Event',
      category: eventData.category,
      date: eventData.startDate || 'Dec 30, 2026',
      venue: eventData.venueName || 'To Be Announced',
      price: ticketTypes[0]?.price ? `₦${Number(ticketTypes[0].price).toLocaleString()}` : 'Free',
      image: images[0] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    };
    localStorage.setItem('events', JSON.stringify([newEvent, ...existingEvents]));
    navigate('/events');
  };

  const [eventData, setEventData] = useState({
    title: '',
    category: 'Music',
    startDate: '',
    startTime: '',
    venueName: '',
    address: '',
    directions: '',
    landmarks: '',
    parkingInfo: '',
    additionalInfo: '',
    facilities: [] as string[],
    rules: ''
  });
  const [schedule, setSchedule] = useState([
    { time: '12:00', title: 'Gates Open', description: 'Early arrival recommended to avoid queues' },
    { time: '14:00', title: 'Opening Act', description: 'Local artists performance' },
    { time: '16:00', title: 'Main Event', description: 'Headline performances begin' },
    { time: '22:00', title: 'Event Ends', description: 'Closing ceremony and final performances' }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 5;

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 6));
    }
  };

  const addTicketType = () => setTicketTypes([...ticketTypes, { name: '', price: '', quantity: '' }]);
  const removeTicketType = (index: number) => setTicketTypes(ticketTypes.filter((_, i) => i !== index));

  const ProgressBanner = () => (
    <div className="fixed top-0 left-0 w-full h-1.5 bg-white/5 z-[60]">
      <motion.div 
        className="h-full bg-brand-green shadow-[0_0_15px_rgba(0,255,156,0.5)]"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
        transition={{ duration: 0.5, ease: "circOut" }}
      />
    </div>
  );

  const stepVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      filter: 'blur(10px)'
    }),
    animate: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      filter: 'blur(10px)'
    })
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setDirection(1);
    nextStep();
  };

  const handlePrev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setDirection(-1);
    prevStep();
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-green/30 pb-32">
      <ProgressBanner />

      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Exit</span>
          </Link>
          <div className="flex flex-col items-center">
            <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-green">Create New Event</h1>
            <p className="text-[10px] text-gray-500 font-medium">Step {currentStep} of {totalSteps}</p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-400">
            {Math.round((currentStep / totalSteps) * 100)}%
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-12 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="w-full"
          >
            {/* STEP 1: SERVICE FEES & BASIC INFO */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <header className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20">
                    <DollarSign className="w-3 h-3 text-brand-green" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-green">Monetization Setup</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight">
                    Set your <span className="text-brand-green">pricing strategy.</span>
                  </h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFeePayer('attendee')}
                    className={`relative p-6 rounded-[2rem] border-2 transition-all duration-300 text-left group ${
                      feePayer === 'attendee' 
                        ? 'bg-brand-green/10 border-brand-green ring-4 ring-brand-green/5' 
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                      feePayer === 'attendee' ? 'bg-brand-green text-brand-dark' : 'bg-white/5 text-gray-500'
                    }`}>
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-brand-green transition-colors">Attendee Pays</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Fees are added to the ticket price.</p>
                  </motion.button>

                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFeePayer('organizer')}
                    className={`relative p-6 rounded-[2rem] border-2 transition-all duration-300 text-left group ${
                      feePayer === 'organizer' 
                        ? 'bg-brand-green/10 border-brand-green ring-4 ring-brand-green/5' 
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                      feePayer === 'organizer' ? 'bg-brand-green text-brand-dark' : 'bg-white/5 text-gray-500'
                    }`}>
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-brand-green transition-colors">I will Absorb</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">You pay fee from your proceeds.</p>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/5">
                  <div className="space-y-1 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-brand-green transition-colors">Event Title</label>
                    <input 
                      type="text" 
                      value={eventData.title}
                      onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                      placeholder="e.g., Lagos Jazz Night" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-base font-bold focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all"
                    />
                  </div>
                  <div className="space-y-1 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-brand-green transition-colors">Category</label>
                    <select 
                      value={eventData.category}
                      onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-base font-bold focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all appearance-none cursor-pointer"
                    >
                      <option value="Music">Music Concert</option>
                      <option value="Tech">Tech Conference</option>
                      <option value="Outdoor">Outdoor / Beach</option>
                      <option value="Culture">Art & Culture</option>
                      <option value="Meetup">Community Meetup</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: VENUE & LOGISTICS */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <header className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20">
                    <MapPin className="w-3 h-3 text-brand-green" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-green">Location Scout</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight">
                    Where is the <span className="text-brand-green">magic happening?</span>
                  </h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-brand-green">Venue Name</label>
                    <input 
                      type="text" 
                      value={eventData.venueName}
                      onChange={(e) => setEventData({ ...eventData, venueName: e.target.value })}
                      placeholder="e.g., Landmark Centre" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-base font-bold focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all"
                    />
                  </div>
                  <div className="space-y-1 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-brand-green">Street Address</label>
                    <input 
                      type="text" 
                      value={eventData.address}
                      onChange={(e) => setEventData({ ...eventData, address: e.target.value })}
                      placeholder="Street name & number" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-base font-bold focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <h3 className="text-lg font-bold font-display flex items-center gap-3">
                    Available Facilities
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['WiFi', 'Toilets', 'Food Court', 'Security'].map((facility) => (
                      <label key={facility} className={`group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        eventData.facilities.includes(facility)
                          ? 'bg-brand-green text-brand-dark border-transparent'
                          : 'bg-white/[0.02] border-white/10 text-gray-500'
                      }`}>
                        <input 
                          type="checkbox" 
                          checked={eventData.facilities.includes(facility)}
                          onChange={(e) => {
                            if (e.target.checked) setEventData({ ...eventData, facilities: [...eventData.facilities, facility] });
                            else setEventData({ ...eventData, facilities: eventData.facilities.filter(f => f !== facility) });
                          }}
                          className="hidden" 
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest">{facility}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PROGRAM & HIGHLIGHTS */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <header className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20">
                    <Star className="w-3 h-3 text-brand-green" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-green">Experience Design</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight">
                    Craft the <span className="text-brand-green">narrative.</span>
                  </h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Highlights */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Highlights</h3>
                      <button onClick={() => setHighlights([...highlights, ''])} className="p-1.5 rounded-full bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-brand-dark transition-all">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-xl">
                          <input 
                            value={h}
                            onChange={(e) => {
                              const newHighlights = [...highlights];
                              newHighlights[i] = e.target.value;
                              setHighlights(newHighlights);
                            }}
                            placeholder="Key highlight"
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold"
                          />
                          <button onClick={() => setHighlights(highlights.filter((_, idx) => idx !== i))} className="text-gray-600 hover:text-red-500">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Schedule</h3>
                      <button onClick={() => setSchedule([...schedule, { time: '12:00', title: '', description: '' }])} className="p-1.5 rounded-full bg-brand-green/10 text-brand-green">
                        <PlusCircle className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {schedule.map((item, i) => (
                        <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <input type="time" value={item.time} className="bg-transparent text-xs font-black text-brand-green w-16" onChange={(e) => {
                              const newS = [...schedule]; newS[i].time = e.target.value; setSchedule(newS);
                            }} />
                            <button onClick={() => setSchedule(schedule.filter((_, idx) => idx !== i))} className="text-gray-600 hover:text-red-500">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input placeholder="Title" value={item.title} className="w-full bg-transparent text-sm font-bold" onChange={(e) => {
                            const newS = [...schedule]; newS[i].title = e.target.value; setSchedule(newS);
                          }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: IMAGES & MEDIA */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <header className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20">
                    <ImageIcon className="w-3 h-3 text-brand-green" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-green">Visual Identity</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight">
                    Showcase the <span className="text-brand-green">vibe.</span>
                  </h2>
                </header>

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video border-2 border-dashed border-white/10 rounded-[2rem] bg-white/[0.01] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-brand-green/[0.02] transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">Upload Images</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Max 6 images</p>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" multiple />
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {images.map((img, i) => (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                      <img src={img} className="w-full h-full object-cover" />
                      <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-500">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: TICKETS & RULES */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <header className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20">
                    <Ticket className="w-3 h-3 text-brand-green" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-green">Inventory Control</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight">
                    Finalize your <span className="text-brand-green">offering.</span>
                  </h2>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Tickets</h3>
                      <button onClick={addTicketType} className="p-1.5 rounded-full bg-brand-green/10 text-brand-green">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {ticketTypes.map((ticket, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                          <input placeholder="Tier Name" value={ticket.name} className="w-full bg-transparent border-none text-sm font-bold" onChange={(e)=>{
                            const nt=[...ticketTypes]; nt[i].name=e.target.value; setTicketTypes(nt);
                          }} />
                          <div className="grid grid-cols-2 gap-3">
                            <input type="number" placeholder="Price" value={ticket.price} className="bg-white/5 p-3 rounded-xl text-xs font-bold" onChange={(e)=>{
                              const nt=[...ticketTypes]; nt[i].price=e.target.value; setTicketTypes(nt);
                            }} />
                            <input type="number" placeholder="Qty" value={ticket.quantity} className="bg-white/5 p-3 rounded-xl text-xs font-bold" onChange={(e)=>{
                              const nt=[...ticketTypes]; nt[i].quantity=e.target.value; setTicketTypes(nt);
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Terms & Rules</h3>
                    <textarea 
                      value={eventData.rules}
                      onChange={(e) => setEventData({ ...eventData, rules: e.target.value })}
                      placeholder="Entry rules..."
                      className="w-full h-40 bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-xs leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-brand-dark/60 backdrop-blur-3xl border-t border-white/5 p-4 z-[60]">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl font-bold text-[10px] tracking-widest uppercase transition-all ${
              currentStep === 1 
                ? 'bg-white/5 text-gray-700 cursor-not-allowed' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          
          {currentStep === totalSteps ? (
            <button 
              onClick={handleLaunchEvent}
              className="flex-[2] btn-primary shadow-[0_0_50px_rgba(0,255,156,0.25)] h-12"
            >
              <span className="tracking-widest uppercase text-xs">Launch Live Event</span>
              <CheckCircle2 className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="flex-[2] btn-primary h-12"
            >
              <span className="tracking-widest uppercase text-xs font-black">Continue</span>
              <ChevronRight className="w-5 h-5 ml-auto" />
            </button>
          )}
        </div>
      </div>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 -left-40 w-[600px] h-[600px] bg-brand-green/5 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 -right-40 w-[700px] h-[700px] bg-brand-purple/10 blur-[180px] rounded-full"
        />
      </div>
    </div>
  );
}
