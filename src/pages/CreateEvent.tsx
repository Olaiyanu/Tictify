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
    navigate('/dashboard');
  };

  const [eventData, setEventData] = useState({
    title: '',
    category: 'Music Concert',
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
                <header>
                  <h2 className="text-3xl md:text-5xl font-bold font-display mb-2">Service Fees</h2>
                  <p className="text-gray-500 text-base">Who should pay the ticket service fees?</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setFeePayer('attendee')}
                    className={`relative p-6 sm:p-8 rounded-[2rem] border-2 transition-all duration-300 text-left group ${
                      feePayer === 'attendee' 
                        ? 'bg-brand-green/10 border-brand-green ring-4 ring-brand-green/10' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      feePayer === 'attendee' ? 'bg-brand-green text-brand-dark' : 'bg-white/10 text-gray-400'
                    }`}>
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">Attendee Pays</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Fees are added to the ticket price and paid by the buyer.</p>
                    {feePayer === 'attendee' && (
                      <motion.div layoutId="check" className="absolute top-4 right-4 sm:top-6 sm:right-6">
                        <CheckCircle2 className="w-5 h-5 text-brand-green" />
                      </motion.div>
                    )}
                  </button>

                  <button 
                    onClick={() => setFeePayer('organizer')}
                    className={`relative p-6 sm:p-8 rounded-[2rem] border-2 transition-all duration-300 text-left group ${
                      feePayer === 'organizer' 
                        ? 'bg-brand-green/10 border-brand-green ring-4 ring-brand-green/10' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      feePayer === 'organizer' ? 'bg-brand-green text-brand-dark' : 'bg-white/10 text-gray-400'
                    }`}>
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">I will Absorb</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">You will absorb the service fees. Attendees will only pay the ticket price.</p>
                    {feePayer === 'organizer' && (
                      <motion.div layoutId="check" className="absolute top-4 right-4 sm:top-6 sm:right-6">
                        <CheckCircle2 className="w-5 h-5 text-brand-green" />
                      </motion.div>
                    )}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={feePayer}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-4 sm:p-5 rounded-2xl bg-brand-green/5 border border-brand-green/10 flex flex-col md:flex-row justify-between items-center gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green">
                        <Info className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-xs">
                          {feePayer === 'attendee' ? 'Attendee Pays Fee' : 'You Absorb Fee'}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {feePayer === 'attendee' 
                            ? 'The service fee will be added to the customer\'s ticket price.' 
                            : 'The service fee will be deducted from your ticket payout.'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 px-4 py-2 bg-brand-dark/50 rounded-xl border border-white/5">
                      <div className="text-center">
                        <p className="text-[7px] uppercase font-bold text-gray-600 tracking-widest mb-0.5">Fee</p>
                        <p className="text-[10px] font-mono font-bold text-white">5% + ₦100</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[7px] uppercase font-bold text-brand-green tracking-widest mb-0.5">Example</p>
                        <p className="text-[10px] font-mono font-bold text-white">
                          ₦5k → {feePayer === 'attendee' ? '₦5,350 total' : '₦4,650 payout'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="space-y-6 pt-4 border-t border-white/5">
                  <h3 className="text-xl font-bold font-display">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Event Title</label>
                      <input 
                        type="text" 
                        value={eventData.title}
                        onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                        placeholder="e.g., Summer Vibes Fest" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Event Category</label>
                      <select 
                        value={eventData.category}
                        onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                        className="w-full bg-brand-dark border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all appearance-none cursor-pointer"
                      >
                        <option>Music Concert</option>
                        <option>Tech Conference</option>
                        <option>Community Meetup</option>
                        <option>Art Exhibition</option>
                        <option>Sporting Event</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Start Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="date" 
                          value={eventData.startDate}
                          onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Start Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="time" 
                          value={eventData.startTime}
                          onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: VENUE & LOGISTICS */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <header>
                  <h2 className="text-3xl md:text-5xl font-bold font-display mb-2">Venue Address</h2>
                  <p className="text-gray-500 text-lg">Where is the magic happening?</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Venue Name</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="text" 
                        value={eventData.venueName}
                        onChange={(e) => setEventData({ ...eventData, venueName: e.target.value })}
                        placeholder="e.g., Lagos Beach Resort" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Street Address</label>
                    <input 
                      type="text" 
                      value={eventData.address}
                      onChange={(e) => setEventData({ ...eventData, address: e.target.value })}
                      placeholder="e.g., 123 Victoria Island Way" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-white/5">
                  <h3 className="text-lg font-bold font-display flex items-center gap-3">
                    <Car className="w-5 h-5 text-brand-green" />
                    Getting There
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Directions</label>
                      <input 
                        type="text" 
                        value={eventData.directions}
                        onChange={(e) => setEventData({ ...eventData, directions: e.target.value })}
                        placeholder="e.g., 15m from Airport" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Landmarks</label>
                      <input 
                        type="text" 
                        value={eventData.landmarks}
                        onChange={(e) => setEventData({ ...eventData, landmarks: e.target.value })}
                        placeholder="e.g., Near yellow building" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-sm"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Parking Info</label>
                      <input 
                        type="text" 
                        value={eventData.parkingInfo}
                        onChange={(e) => setEventData({ ...eventData, parkingInfo: e.target.value })}
                        placeholder="e.g., Free parking available" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-white/5">
                  <h3 className="text-lg font-bold font-display flex items-center gap-3">
                    <FileText className="w-5 h-5 text-brand-green" />
                    Additional Information
                  </h3>
                  <textarea 
                    rows={3}
                    value={eventData.additionalInfo}
                    onChange={(e) => setEventData({ ...eventData, additionalInfo: e.target.value })}
                    placeholder="Relevant venue information..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-sm"
                  ></textarea>
                </div>

                <div className="space-y-6 pt-4 border-t border-white/5">
                  <h3 className="text-lg font-bold font-display flex items-center gap-3">
                    <Settings className="w-5 h-5 text-brand-green" />
                    Facilities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['WiFi', 'Toilets', 'Food Court', 'First Aid', 'Security', 'Smoking Area', 'Charging Stations', 'VIP Lounge'].map((facility) => (
                      <label key={facility} className="group flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-brand-green/5 transition-all">
                        <input 
                          type="checkbox" 
                          checked={eventData.facilities.includes(facility)}
                          onChange={(e) => {
                            if (e.target.checked) setEventData({ ...eventData, facilities: [...eventData.facilities, facility] });
                            else setEventData({ ...eventData, facilities: eventData.facilities.filter(f => f !== facility) });
                          }}
                          className="w-4 h-4 rounded-md border-white/10 bg-brand-dark text-brand-green focus:ring-offset-0 focus:ring-brand-green" 
                        />
                        <span className="text-[9px] font-bold text-gray-400 group-hover:text-white uppercase tracking-wider">{facility}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PROGRAM & CATEGORY */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <header>
                  <h2 className="text-3xl md:text-5xl font-bold font-display mb-2">Event Flow</h2>
                  <p className="text-gray-500 text-base">Define the experience for your attendees.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Category & Tags</label>
                      <div className="relative">
                        <TagIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text" 
                          value={eventData.category}
                          onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                          placeholder="e.g., music, outdoor, family" 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Event Highlights</label>
                      <div className="space-y-3">
                        {highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl group hover:border-brand-green/20 transition-all">
                            <Star className="w-4 h-4 text-brand-green shrink-0" />
                            <input 
                              value={h}
                              onChange={(e) => {
                                const newHighlights = [...highlights];
                                newHighlights[i] = e.target.value;
                                setHighlights(newHighlights);
                              }}
                              className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-0"
                            />
                            <button 
                              onClick={() => setHighlights(highlights.filter((_, idx) => idx !== i))}
                              className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => setHighlights([...highlights, ''])}
                          className="w-full p-3 border border-dashed border-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Highlight
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Event Schedule</label>
                    <div className="space-y-3">
                      {schedule.map((item, i) => (
                        <div key={i} className="flex gap-3 group">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-[10px]">
                              {i + 1}
                            </div>
                            {i !== schedule.length - 1 && <div className="flex-1 w-0.5 bg-white/10 my-1" />}
                          </div>
                          <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-xl p-4 group-hover:border-brand-green/20 transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2 px-2 py-1 rounded bg-brand-green/10">
                                <Clock className="w-3 h-3 text-brand-green" />
                                <input 
                                  type="time"
                                  value={item.time}
                                  onChange={(e) => {
                                    const newSchedule = [...schedule];
                                    newSchedule[i].time = e.target.value;
                                    setSchedule(newSchedule);
                                  }}
                                  className="bg-transparent border-none focus:ring-0 text-[10px] font-mono font-bold text-brand-green p-0 w-16"
                                />
                              </div>
                              <button 
                                onClick={() => setSchedule(schedule.filter((_, idx) => idx !== i))}
                                className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input 
                              placeholder="Title"
                              value={item.title}
                              onChange={(e) => {
                                const newSchedule = [...schedule];
                                newSchedule[i].title = e.target.value;
                                setSchedule(newSchedule);
                              }}
                              className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold text-white mb-1 p-0"
                            />
                            <textarea 
                              placeholder="Description"
                              value={item.description}
                              onChange={(e) => {
                                const newSchedule = [...schedule];
                                newSchedule[i].description = e.target.value;
                                setSchedule(newSchedule);
                              }}
                              rows={1}
                              className="w-full bg-transparent border-none focus:ring-0 text-[10px] text-gray-500 italic p-0 resize-none"
                            />
                          </div>
                        </div>
                      ))}
                      <button 
                        onClick={() => setSchedule([...schedule, { time: '12:00', title: '', description: '' }])}
                        className="w-full p-3 border border-dashed border-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <PlusCircle className="w-5 h-5" />
                        Add Slot
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: IMAGES & MEDIA */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <header>
                  <h2 className="text-3xl md:text-5xl font-bold font-display mb-2">Visual Media</h2>
                  <p className="text-gray-500 text-base">Capture the vibe with images.</p>
                </header>

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video border-2 border-dashed border-white/10 rounded-[2rem] bg-white/[0.02] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/[0.04] transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">Touch to upload images</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">PNG, JPG up to 10MB</p>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" multiple />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
                      <img src={img} alt="Upload" className="w-full h-full object-cover" />
                      <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: TICKETS & RULES */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <header>
                  <h2 className="text-3xl md:text-5xl font-bold font-display mb-2">Tickets & Rules</h2>
                  <p className="text-gray-500 text-base">Almost there! Finalize your ticket settings.</p>
                </header>

                <div className="space-y-4">
                  {ticketTypes.map((ticket, i) => (
                    <div key={i} className="p-5 sm:p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-brand-green/30 transition-all group">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Ticket Name</label>
                          <div className="relative">
                            <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                            <input 
                              type="text" 
                              value={ticket.name}
                              onChange={(e) => {
                                const newTickets = [...ticketTypes];
                                newTickets[i].name = e.target.value;
                                setTicketTypes(newTickets);
                              }}
                              placeholder="e.g., VIP Experience" 
                              className="w-full bg-brand-dark/50 border border-white/10 rounded-xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-xs font-medium"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Price (₦)</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold text-xs">₦</span>
                            <input 
                              type="number" 
                              value={ticket.price}
                              onChange={(e) => {
                                const newTickets = [...ticketTypes];
                                newTickets[i].price = e.target.value;
                                setTicketTypes(newTickets);
                              }}
                              placeholder="0" 
                              className="w-full bg-brand-dark/50 border border-white/10 rounded-xl p-4 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-xs font-mono font-bold"
                            />
                          </div>
                        </div>
                        <div className="space-y-1 relative">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Stock Quantity</label>
                          <div className="flex gap-3">
                            <input 
                              type="number" 
                              value={ticket.quantity}
                              onChange={(e) => {
                                const newTickets = [...ticketTypes];
                                newTickets[i].quantity = e.target.value;
                                setTicketTypes(newTickets);
                              }}
                              placeholder="100" 
                              className="flex-1 bg-brand-dark/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-xs font-medium"
                            />
                            {ticketTypes.length > 1 && (
                              <button 
                                onClick={() => removeTicketType(i)}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shrink-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={addTicketType}
                    className="w-full p-4 sm:p-6 border-2 border-dashed border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white hover:border-brand-green/40 transition-all flex items-center justify-center gap-3 group"
                  >
                    <Plus className="w-4 h-4" />
                    Add Ticket Category
                  </button>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5">
                  <h3 className="text-xl font-bold font-display flex items-center gap-3">
                    <FileText className="w-5 h-5 text-brand-green" />
                    Entry Rules & Restrictions
                  </h3>
                  <textarea 
                    value={eventData.rules}
                    onChange={(e) => setEventData({ ...eventData, rules: e.target.value })}
                    placeholder="e.g., No outside food or drinks allowed. Age restriction: 18+..."
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all text-xs leading-relaxed"
                  ></textarea>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-brand-dark/60 backdrop-blur-3xl border-t border-white/5 p-6 z-[60]">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex-1 flex items-center justify-center gap-3 p-5 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all ${
              currentStep === 1 
                ? 'bg-white/5 text-gray-700 cursor-not-allowed' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          {currentStep === totalSteps ? (
            <button 
              onClick={handleLaunchEvent}
              className="flex-[2] btn-primary shadow-[0_0_50px_rgba(0,255,156,0.25)] h-[64px]"
            >
              <span className="tracking-widest uppercase text-sm">Launch Live Event</span>
              <CheckCircle2 className="w-6 h-6 ml-3" />
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="flex-[2] btn-primary h-[64px]"
            >
              <span className="tracking-widest uppercase text-sm font-black">Continue</span>
              <ChevronRight className="w-6 h-6 ml-auto" />
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
