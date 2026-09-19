"use client";
import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, Lock, CheckCircle2, 
  Map, ShieldCheck, Video, Presentation, 
  FileText, BrainCircuit, Play, ChevronDown, ChevronUp, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT YOUR USER CONTEXT
import { useUser } from '@/app/context/UserContext'; 

// IMPORT THE NEW MODULAR DATABASE
import { pathDatabase } from '../../data';

export default function SkillMapPage({ params }: { params: Promise<{ id: string }> }) {
  const { userData, isLoaded, isAuthenticated } = useUser();
  const router = useRouter();
  
  // 1. Safely unwrap the dynamic route parameters
  const resolvedParams = use(params);
  const pathId = resolvedParams.id;
  
  // 2. Fetch the specific domain data from your modular database
  const currentPath = pathDatabase[pathId]; 
  
  // 3. UI State for Accordions (Defaults to opening the first module if data exists)
  const [expandedModule, setExpandedModule] = useState<string | null>(
    currentPath && currentPath.modules ? currentPath.modules[0].id : null
  );

  useEffect(() => {
    if (isLoaded && !isAuthenticated) router.push('/login');
  }, [isLoaded, isAuthenticated, router]);

  if (!isLoaded || !isAuthenticated) return null;

  // -----------------------------------------------------------------
  // 🛑 THE SAFETY CATCH (PREVENTS CRASHES IF ID MISMATCHES)
  // -----------------------------------------------------------------
  if (!currentPath) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30">
        <AlertTriangle size={56} className="text-emerald-500 mb-6 opacity-80" />
        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-center">
          Domain In Development
        </h1>
        <p className="text-zinc-400 mb-8 text-center max-w-md">
          The curriculum pathway for <span className="text-emerald-400 font-mono">"{pathId}"</span> is currently being mapped or the link is incorrect.
        </p>
        <Link 
          href="/upskilling" 
          className="px-8 py-3 bg-white text-black text-sm font-black uppercase tracking-widest rounded hover:bg-emerald-400 transition-colors"
        >
          Return to Hub
        </Link>
      </div>
    );
  }

  // Helper to render the correct icon based on asset type
  const getAssetIcon = (type: string, status: string) => {
    if (status === 'completed') return <CheckCircle2 size={16} className="text-emerald-500" />;
    if (status === 'locked') return <Lock size={16} className="text-zinc-600" />;
    
    switch (type) {
      case 'video': return <Video size={16} className="text-indigo-400" />;
      case 'ppt': return <Presentation size={16} className="text-orange-400" />;
      case 'text': return <FileText size={16} className="text-cyan-400" />;
      case 'quiz': return <BrainCircuit size={16} className="text-rose-400" />;
      default: return <Play size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500/30 pt-24 pb-24">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* --- HEADER --- */}
        <div className="space-y-6 pb-8 border-b border-white/5 relative">
          <Link href="/upskilling" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
            <ChevronLeft size={14} /> Back to Hub
          </Link>
          
          <div className="flex items-center gap-3 text-emerald-400 font-black tracking-widest text-[10px] uppercase bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-max">
            <Map size={14} /> Interactive Roadmap
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
            {currentPath.title}
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
            {currentPath.description}
          </p>
        </div>

        {/* --- THE GAMIFIED ROADMAP --- */}
        <div className="relative pt-4">
          {/* Vertical Path Line */}
          <div className="absolute left-[28px] md:left-[38px] top-0 bottom-0 w-1 bg-zinc-900 rounded-full z-0" />
          <div className="absolute left-[28px] md:left-[38px] top-0 h-1/3 w-1 bg-gradient-to-b from-emerald-500 to-transparent rounded-full z-0" />

          <div className="space-y-8">
            {currentPath.modules.map((mod: any, index: number) => {
              const isLocked = mod.status === 'locked';
              const isCompleted = mod.status === 'completed';
              const isExpanded = expandedModule === mod.id;

              return (
                <div key={mod.id} className="relative z-10 flex gap-6 md:gap-8 items-start group">
                  
                  {/* Timeline Node */}
                  <div className="flex-shrink-0 mt-2">
                    <div className={`w-14 h-14 rounded-full border-[6px] border-zinc-950 flex items-center justify-center transition-all duration-500 z-10 relative
                      ${isCompleted ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 
                        isLocked ? 'bg-zinc-900 text-zinc-600' : 
                        'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-pulse-slow'}`}
                    >
                      {isCompleted ? <CheckCircle2 size={24} /> : isLocked ? <Lock size={20} /> : <span className="font-black text-lg">{index + 1}</span>}
                    </div>
                  </div>

                  {/* Module Container */}
                  <div className={`flex-grow bg-zinc-900 border rounded-2xl overflow-hidden transition-all duration-300 
                    ${isLocked ? 'border-white/5 opacity-50 grayscale' : 'border-white/10 hover:border-emerald-500/30 shadow-2xl'}`}>
                    
                    {/* Module Header (Clickable) */}
                    <div 
                      onClick={() => !isLocked && setExpandedModule(isExpanded ? null : mod.id)}
                      className={`p-6 md:p-8 flex justify-between items-center ${!isLocked && 'cursor-pointer'}`}
                    >
                      <div>
                        <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2">{mod.title}</h3>
                        <p className="text-sm text-zinc-400 font-medium max-w-lg">{mod.description}</p>
                      </div>
                      {!isLocked && (
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-white/10 group-hover:text-white transition-colors">
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      )}
                    </div>

                    {/* Nested Assets List (Expands) */}
                    {isExpanded && !isLocked && (
                      <div className="px-6 md:px-8 pb-8 pt-2 space-y-3 border-t border-white/5 mt-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4 pt-4 flex items-center gap-2">
                          <ShieldCheck size={14} /> Complete all assets to unlock certification
                        </p>
                        
                        {mod.assets.map((asset: any) => (
                          <div 
                            key={asset.id} 
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all
                              ${asset.status === 'completed' ? 'bg-emerald-500/5 border-emerald-500/20' : 
                                asset.status === 'locked' ? 'bg-zinc-950 border-white/5 opacity-70 cursor-not-allowed' : 
                                'bg-zinc-800 border-white/10 hover:border-emerald-500/50 hover:bg-zinc-800/80 cursor-pointer shadow-lg'}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                                ${asset.status === 'completed' ? 'bg-emerald-500/20' : 'bg-zinc-900'}`}>
                                {getAssetIcon(asset.type, asset.status)}
                              </div>
                              <div>
                                <h4 className={`text-sm font-bold ${asset.status === 'locked' ? 'text-zinc-500' : 'text-zinc-200'}`}>
                                  {asset.title}
                                </h4>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                  {asset.type} • {asset.duration}
                                </span>
                              </div>
                            </div>
                            
                            {/* Asset Action Button */}
                            {asset.status !== 'locked' && asset.status !== 'completed' && (
                              <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded hover:bg-emerald-400 transition-colors">
                                {asset.type === 'quiz' ? 'Start Test' : 'Open'} <Play size={12} fill="currentColor" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
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