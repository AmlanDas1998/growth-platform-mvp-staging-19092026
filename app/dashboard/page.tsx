"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Globe, Zap, ArrowRight, TrendingUp, Users, Eye, 
  Download, User, ShieldCheck 
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // --- BUILD-SAFE ANIMATION VARIANTS ---
  // Removed explicit 'ease' string to prevent Vercel Type Error
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-16">
        
        {/* --- HERO: WELCOME LAYER --- */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 opacity-80">
            <Zap size={12} /> Pune Professional Ecosystem
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            DASHBOARD<span className="text-zinc-800">.</span>
          </h1>
          <p className="text-zinc-500 text-lg font-medium max-w-2xl">
            Welcome back, Amlan. Select an engine to manage your professional presence.
          </p>
        </motion.div>

        {/* --- CORE ENGINES: THE 3 TILES --- */}
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          
          {/* 1. CV BUILDER TILE */}
          <Link href="/cv-builder">
            <motion.div 
              variants={fadeInUp} 
              whileHover={{ y: -8, borderColor: 'rgba(6,182,212,0.3)' }}
              className="group h-full p-10 rounded-[3rem] bg-zinc-900 border border-white/5 transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <FileText size={120} />
              </div>
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <FileText size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tight mb-2 text-white">CV BUILDER</h2>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Create 11-section executive resumes with boutique templates (Modern, Sleek, Executive).
                  </p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400 group-hover:translate-x-2 transition-transform">
                Enter Builder <ArrowRight size={14} />
              </div>
            </motion.div>
          </Link>

          {/* 2. WEBSITE BUILDER TILE */}
          <Link href="/site-builder">
            <motion.div 
              variants={fadeInUp} 
              whileHover={{ y: -8, borderColor: 'rgba(16,185,129,0.3)' }}
              className="group h-full p-10 rounded-[3rem] bg-zinc-900 border border-white/5 transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe size={120} />
              </div>
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Globe size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tight mb-2 text-white">SITE BUILDER</h2>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Deploy a 12-section personal brand site with high-conversion templates and color engines.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 group-hover:translate-x-2 transition-transform">
                Launch Site <ArrowRight size={14} />
              </div>
            </motion.div>
          </Link>

          {/* 3. PROFILE BUILDER TILE (Links to /profile) */}
          <Link href="/profile">
            <motion.div 
              variants={fadeInUp} 
              whileHover={{ y: -8, borderColor: 'rgba(59,130,246,0.3)' }}
              className="group h-full p-10 rounded-[3rem] bg-zinc-900 border border-white/5 transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <User size={120} />
              </div>
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <User size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tight mb-2 text-white">PROFILE BUILDER</h2>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Manage your core identity data, verification status, and master professional details.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 group-hover:translate-x-2 transition-transform">
                Edit Profile <ArrowRight size={14} />
              </div>
            </motion.div>
          </Link>

        </motion.div>

        {/* --- QUICK STATS ROW --- */}
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Views', val: '1.2k', icon: Eye, color: 'text-blue-400' },
            { label: 'CV Exports', val: '48', icon: Download, color: 'text-amber-400' },
            { label: 'Profile Score', val: '98%', icon: ShieldCheck, color: 'text-emerald-400' },
            { label: 'Network', val: '14', icon: Users, color: 'text-rose-400' }
          ].map((stat, i) => (
            <motion.div 
              key={i} variants={fadeInUp}
              className="p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 flex flex-col gap-4"
            >
              <stat.icon size={20} className={stat.color} />
              <div>
                <h4 className="text-3xl font-black italic">{stat.val}</h4>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- FOOTER --- */}
        <motion.footer 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="pt-20 border-t border-white/5 flex justify-between items-center"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700">
            Amlan Das Boutique Career Ecosystem
          </p>
          <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest text-zinc-500">
             <span className="hover:text-white cursor-pointer">Settings</span>
             <span className="hover:text-white cursor-pointer">Help</span>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}