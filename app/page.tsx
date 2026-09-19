"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Award, TrendingUp, BookOpen, 
  PlayCircle, ArrowRight, Github, Mail, Globe, Zap 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// 1. IMPORT THE CENTRAL BRAIN
import { useUser } from './context/UserContext';

export default function FinalPremiumHub() {
  const [mounted, setMounted] = useState(false);
  
  // 2. PULL AUTHENTICATION STATE
  const { isAuthenticated, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. THE SMART REDIRECT LOGIC FOR BUTTONS
  const handleProtectedRouting = (targetPath: string) => {
    if (!isLoaded) return; // Wait until local storage is checked

    if (!isAuthenticated) {
      // If not logged in, force them to the login page first
      router.push('/login');
    } else {
      // If logged in, let them through
      router.push(targetPath);
    }
  };

  if (!mounted) return null;

  const partners = Array.from({ length: 20 }, (_, i) => ({ name: `Partner ${i + 1}` }));
  const stories = Array.from({ length: 20 }, (_, i) => `Success Story ${i + 1}: Strategic growth achieved in the Pune finance sector.`);

  return (
    <div className="bg-black text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- SECTION 1: THE IDENTITY (Short & Impactful) --- */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Simple Nature Backdrop with Neon Accent */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2670&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20 contrast-125"
            alt="Nature Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="relative z-10 max-w-5xl space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-500/30 bg-white/5 backdrop-blur-xl text-[10px] font-black tracking-[0.5em] uppercase text-cyan-400">
             <Sparkles size={14} className="fill-cyan-400" /> Amlan Das Platform
          </div>
          <h1 className="text-[12vw] font-bold tracking-tighter leading-[0.85] uppercase italic">
            Welcome to  <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500">FirstCap.in</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed">
            FirstCap – The Financial & Career Infrastructure for India’s Emerging Talent.
          </p>
        </motion.div>
      </section>

      {/* --- SECTION 2: THE ECOSYSTEM (4 TILES) --- */}
      <section className="min-h-screen py-24 px-6 relative flex flex-col items-center justify-center border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
           <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop" className="w-full h-full object-cover" alt="Service Backdrop" />
        </div>
        
        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "SIP Education", sub: "Wealth Strategy", icon: <TrendingUp size={32} />, link: "/sip-education", neon: "border-cyan-500/40 text-cyan-400 shadow-cyan-500/10" },
            { title: "Mutual Funds", sub: "Market Mastery", icon: <BookOpen size={32} />, link: "/mf-education", neon: "border-fuchsia-500/40 text-fuchsia-400 shadow-fuchsia-500/10" },
            { title: "Video Academy", sub: "Studio Library", icon: <PlayCircle size={32} />, link: "/video-library", neon: "border-indigo-500/40 text-indigo-400 shadow-indigo-500/10" },
            { title: "Upskilling", sub: "Certifications", icon: <Award size={32} />, link: "/upskilling", neon: "border-emerald-500/40 text-emerald-400 shadow-emerald-500/10" },
          ].map((tile) => (
            
            // 4. CHANGED <Link> TO A BUTTON THAT TRIGGERS THE GATEKEEPER
            <button 
              key={tile.title} 
              onClick={() => handleProtectedRouting(tile.link)}
              className={`text-left group p-10 rounded-[3.5rem] border bg-white/5 backdrop-blur-2xl transition-all duration-700 hover:-translate-y-4 hover:bg-white/10 ${tile.neon}`}
            >
               <div className="mb-10 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_currentColor]">{tile.icon}</div>
               <h3 className="text-3xl font-black tracking-tighter mb-4 italic">{tile.title}</h3>
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-10">{tile.sub}</p>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  ENTER <ArrowRight size={14} />
               </div>
            </button>

          ))}
        </div>
      </section>

      {/* --- SECTION 3: VALIDATION & FOOTER --- */}
      <section className="min-h-screen py-32 bg-[#050505] relative overflow-hidden flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
        
        <div className="space-y-20 relative z-0">
          {/* Carousel 1: Partners (Left to Right) */}
          <div className="flex overflow-hidden select-none pointer-events-none">
            <motion.div animate={{ x: [0, -1920] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="flex gap-10 whitespace-nowrap">
              {[...partners, ...partners].map((p, i) => (
                <div key={i} className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 min-w-[250px]">
                   <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-black">P</div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{p.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel 2: Stories (Right to Left) */}
          <div className="flex overflow-hidden select-none pointer-events-none">
            <motion.div animate={{ x: [-1920, 0] }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="flex gap-10 whitespace-nowrap">
              {[...stories, ...stories].map((story, i) => (
                <div key={i} className="px-12 py-10 bg-white/5 border border-white/10 rounded-[3rem] min-w-[400px]">
                   <div className="flex items-center gap-2 text-fuchsia-400 mb-4">
                      <Zap size={14} className="fill-fuchsia-400" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Growth Story</span>
                   </div>
                   <p className="text-slate-400 text-sm whitespace-normal leading-relaxed italic font-light">"{story}"</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* --- BOUTIQUE FOOTER --- */}
        <footer className="max-w-7xl mx-auto w-full px-6 pt-32 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/5 opacity-80">
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
               <div className="bg-cyan-500 text-black p-1 rounded-md"><Zap size={18} className="fill-black" /></div>
               GROWTH.
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-xs">
              Ultra-premium financial engineering and strategic brand scaling for the modern professional in Pune.
            </p>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Identity</h5>
            <div className="space-y-4 text-xs font-bold text-slate-300">
              <a href="mailto:contact@amlandas.in" className="flex items-center gap-3 hover:text-cyan-400 transition-colors"><Mail size={16}/> contact@amlandas.in</a>
              <p className="flex items-center gap-3"><Globe size={16}/> Pune, Maharashtra</p>
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-fuchsia-400">Social</h5>
            <div className="flex gap-8 items-center">
               <button onClick={() => window.open('https://github.com/AmlanDas1998', '_blank')} className="text-slate-400 hover:text-white transition-all"><Github size={24}/></button>
               <button onClick={() => window.open('https://www.linkedin.com/in/amlan-das-600839140/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B6rCgRfEfSWysVHMBMibhkg%3D%3D', '_blank')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-white">LinkedIn</button>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}