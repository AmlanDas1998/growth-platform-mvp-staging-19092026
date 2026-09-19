"use client";
import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

// 1. Import the Central Brain to access the login trigger
import { useUser } from '../context/UserContext';

export default function LoginPage() {
  // 2. Pull the login function from our context
  const { login } = useUser();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative font-sans">
      
      {/* Subtle Premium Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-zinc-950 to-zinc-950 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md p-10 rounded-[3rem] bg-zinc-900/80 border border-white/5 backdrop-blur-xl shadow-2xl">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mx-auto mb-6">
            <Zap size={32} />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2">
            Authenticate<span className="text-cyan-400">.</span>
          </h1>
          <p className="text-zinc-400 text-sm">Enter the boutique workspace.</p>
        </div>

        {/* 3. The Login Button that triggers our Gatekeeper logic */}
        <button 
          onClick={login}
          className="w-full group flex items-center justify-between p-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          <span>Continue / Sign In</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
        
        <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest mt-8">
          Secure Access • Growth Platform MVP
        </p>

      </div>
    </div>
  );
}