"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Target, Trophy, Clock, ArrowRight, BookOpen, 
  CheckCircle2, Flame, ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

// IMPORT THE CENTRAL BRAIN
import { useUser } from '../context/UserContext';

// --- DOMAIN CURRICULUM DATA ---
const skillPaths = [
  {
    id: "indian-taxation",
    title: "Indian Taxation",
    description: "Understand Indian income tax structures, file your own ITR confidently, and optimize your taxes.",
    modulesTotal: 2,
    modulesCompleted: 0,
    estimatedTime: "3 Hours",
    level: "Beginner to Applied",
    color: "emerald",
    tags: ["Income Tax", "ITR Filing", "Tax Planning"]
  },
  {
    id: "provident-fund",
    title: "Provident Fund (EPF)",
    description: "Master the EPF structure to actively manage your withdrawals, transfers, and long-term retirement planning.",
    modulesTotal: 2,
    modulesCompleted: 0,
    estimatedTime: "2 Hours",
    level: "Beginner to Applied",
    color: "cyan",
    tags: ["EPF", "Retirement", "Withdrawals"]
  },
  {
    id: "insurance-strategy",
    title: "Insurance Strategy",
    description: "Understand risk coverage and independently select, compare, and manage your personal insurance policies.",
    modulesTotal: 2,
    modulesCompleted: 0,
    estimatedTime: "2.5 Hours",
    level: "Beginner to Applied",
    color: "indigo",
    tags: ["Risk Analysis", "Health/Term", "Claims"]
  },
  {
    id: "sip-mastery",
    title: "Systematic Investment Plan (SIP)",
    description: "Harness the power of compounding. Learn to build, automate, and optimize your mutual fund SIP portfolios.",
    modulesTotal: 2,
    modulesCompleted: 0,
    estimatedTime: "3 Hours",
    level: "Beginner to Applied",
    color: "emerald",
    tags: ["Compounding", "Asset Allocation", "Wealth"]
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    description: "Navigate the mutual fund ecosystem. Confidently select, analyze, and manage a diversified portfolio.",
    modulesTotal: 2,
    modulesCompleted: 0,
    estimatedTime: "4 Hours",
    level: "Beginner to Applied",
    color: "cyan",
    tags: ["Equities", "Debt", "Portfolio"]
  },
  {
    id: "ai-foundations",
    title: "Artificial Intelligence (AI)",
    description: "Grasp the AI landscape and learn how to integrate powerful AI tools into your daily professional workflows.",
    modulesTotal: 2,
    modulesCompleted: 0,
    estimatedTime: "3 Hours",
    level: "Beginner to Applied",
    color: "indigo",
    tags: ["AI Tools", "Automation", "Productivity"]
  },
  {
    id: "machine-learning",
    title: "Machine Learning (ML)",
    description: "Understand how ML models work conceptually and learn to evaluate applied algorithms for business use cases.",
    modulesTotal: 2,
    modulesCompleted: 0,
    estimatedTime: "5 Hours",
    level: "Beginner to Applied",
    color: "emerald",
    tags: ["Algorithms", "Data Models", "Use Cases"]
  },
  {
    id: "llms",
    title: "Large Language Models (LLMs)",
    description: "Learn the core architecture of LLMs and how to strategically integrate them into business applications.",
    modulesTotal: 2,
    modulesCompleted: 0,
    estimatedTime: "4 Hours",
    level: "Beginner to Applied",
    color: "cyan",
    tags: ["Transformers", "APIs", "Fine-Tuning"]
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Master structured AI communication. Design optimized, high-performance prompts for professional systems.",
    modulesTotal: 2,
    modulesCompleted: 0,
    estimatedTime: "2.5 Hours",
    level: "Beginner to Applied",
    color: "indigo",
    tags: ["Zero-Shot", "Frameworks", "AI Workflows"]
  }
];

export default function UpskillingHub() {
  const { userData, isLoaded, isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoaded, isAuthenticated, router]);

  if (!isLoaded || !isAuthenticated) return null;

  // Calculate overall progress stats based on the new data
  const totalModules = skillPaths.reduce((acc, path) => acc + path.modulesTotal, 0);
  const completedModules = skillPaths.reduce((acc, path) => acc + path.modulesCompleted, 0);
  const globalProgress = totalModules === 0 ? 0 : Math.round((completedModules / totalModules) * 100);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500/30 pt-24 pb-20 overflow-x-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* --- HEADER & GLOBAL STATS --- */}
        <div className="flex flex-col lg:flex-row gap-10 justify-between items-start lg:items-center border-b border-white/5 pb-10">
          <div className="space-y-4 max-w-2xl">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mb-2">
              <ChevronLeft size={14} /> Return to Hub
            </Link>
            <div className="flex items-center gap-3 text-emerald-400 font-black tracking-widest text-[10px] uppercase bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-max">
              <Target size={14} /> Certification Center
            </div>
            <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              Skill <span className="text-emerald-500">Architecture.</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Welcome back, {userData.personal.name || 'Executive'}. Select a path below to view your curriculum map, complete technical assessments, and unlock verified credentials for your CV.
            </p>
          </div>

          {/* Gamification Dashboard */}
          <div className="flex gap-4 w-full lg:w-auto">
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 flex-1 lg:w-48 flex flex-col items-center justify-center text-center shadow-xl">
              <Flame size={28} className="text-orange-500 mb-2" />
              <span className="text-3xl font-black tracking-tighter">0</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">Day Streak</span>
            </div>
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 flex-1 lg:w-48 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/5" />
              <Trophy size={28} className="text-emerald-400 mb-2 relative z-10" />
              <span className="text-3xl font-black tracking-tighter relative z-10">{globalProgress}%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1 relative z-10">Mastery Level</span>
            </div>
          </div>
        </div>

        {/* --- SKILL PATHS GRID --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <BookOpen className="text-emerald-500" size={24} /> 
              Active Curriculums
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillPaths.map((path) => {
              const progressPct = path.modulesTotal === 0 ? 0 : Math.round((path.modulesCompleted / path.modulesTotal) * 100);
              const isCompleted = path.modulesCompleted === path.modulesTotal && path.modulesTotal > 0;

              return (
                <div 
                  key={path.id}
                  onClick={() => router.push(`/upskilling/path/${path.id}`)}
                  className="bg-zinc-900 border border-white/5 rounded-[2rem] p-8 cursor-pointer group hover:border-emerald-500/30 hover:bg-zinc-900/80 transition-all duration-500 relative overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] flex flex-col h-full"
                >
                  {/* Status Indicator */}
                  <div className="absolute top-8 right-8">
                    {isCompleted ? (
                      <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-full backdrop-blur-md">
                        <CheckCircle2 size={20} />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all">
                        <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mb-6 flex-wrap pr-12">
                    {path.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-zinc-400 bg-black px-2.5 py-1 rounded-md border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-black tracking-tight mb-3 pr-8 leading-tight group-hover:text-emerald-400 transition-colors">
                    {path.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                    {path.description}
                  </p>

                  <div className="mt-auto space-y-6">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-500 border-t border-white/5 pt-6">
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-emerald-500/70" /> {path.estimatedTime}</span>
                      <span>{path.level}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className={isCompleted ? "text-emerald-400" : "text-zinc-400"}>
                          {isCompleted ? "Certification Unlocked" : "Path Progress"}
                        </span>
                        <span className="text-zinc-500">{path.modulesCompleted} / {path.modulesTotal} Modules</span>
                      </div>
                      <div className="w-full h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                        <div 
                          className={`h-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-emerald-400' : 'bg-emerald-500'}`} 
                          style={{ width: `${progressPct}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}