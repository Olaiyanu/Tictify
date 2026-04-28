import { motion } from 'motion/react';
import { GraduationCap, Music, Users, Sparkles, Trophy } from 'lucide-react';

const partners = [
  { icon: <GraduationCap className="w-6 h-6" />, name: "Campus Hub" },
  { icon: <Music className="w-6 h-6" />, name: "Live Nation" },
  { icon: <Users className="w-6 h-6" />, name: "Eco Network" },
  { icon: <Trophy className="w-6 h-6" />, name: "Naija Sports" },
  { icon: <Sparkles className="w-6 h-6" />, name: "Elite Gigs" }
];

export default function TrustText() {
  return (
    <section className="px-6 py-24 bg-brand-dark relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green/5 via-transparent to-brand-green/5 opacity-50" />
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <span className="text-brand-green font-bold uppercase tracking-[0.3em] text-[10px] mb-8 block">Proven Credibility</span>
        <p className="text-white font-display font-medium text-2xl md:text-4xl leading-tight mb-16">
          Powering the next generation of <br /> 
          <span className="text-gray-400 italic">Nigerian events and communities.</span>
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 hover:opacity-60 transition-opacity duration-700">
          {partners.map((partner, i) => (
             <div key={i} className="flex items-center gap-3 group cursor-default">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-white group-hover:scale-110 group-hover:bg-brand-green group-hover:text-brand-dark transition-all duration-300">
                  {partner.icon}
                </div>
                <span className="text-white font-bold tracking-tight text-sm uppercase opacity-80">{partner.name}</span>
             </div>
          ))}
        </div>
        
        <p className="mt-12 text-gray-500 text-sm font-medium">
          Trusted by campus promoters, private communities, and major organizers across Lagos, Abuja & PH.
        </p>
      </motion.div>
    </section>
  );
}
