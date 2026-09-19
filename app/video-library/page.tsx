"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Info, Lock, ChevronRight, Search, Bell, CheckCircle2, XCircle, Zap, ChevronDown, Plus } from 'lucide-react';

// 1. IMPORT THE CENTRAL BRAIN
import { useUser } from '../context/UserContext';

// --- EXPANDED MOCK DATA (For High Density) ---
const navItems = ["Home", "Shows", "Learning Paths", "The Vault", "My List", "Browse by Skills"];

const continueWatching = [
  { id: "c1", ytId: "dQw4w9WgXcQ", title: "SIP Engineering Foundations", img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop", progress: "65%", hasQuiz: true, quizType: "SIP", badge: "New Module" },
  { id: "c2", ytId: "dQw4w9WgXcQ", title: "Pune Market Strategy", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop", progress: "15%", hasQuiz: false },
];

const gemsForYou = [
  { id: "g1", ytId: "dQw4w9WgXcQ", title: "Mutual Fund Mechanics", img: "https://images.unsplash.com/photo-1611974714151-6c45963f456c?q=80&w=1000&auto=format&fit=crop", hasQuiz: true, quizType: "MF", top10: true },
  { id: "g2", ytId: "dQw4w9WgXcQ", title: "Premium CV Construction", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop", hasQuiz: false },
  { id: "g3", ytId: "dQw4w9WgXcQ", title: "Next.js Architecture", img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop", hasQuiz: false },
  { id: "g4", ytId: "dQw4w9WgXcQ", title: "LinkedIn Authority", img: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000&auto=format&fit=crop", hasQuiz: false, badge: "Recently Added" },
  { id: "g5", ytId: "dQw4w9WgXcQ", title: "Institutional Portfolios", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop", hasQuiz: false },
  { id: "g6", ytId: "dQw4w9WgXcQ", title: "Tax Optimization Basics", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", hasQuiz: false },
];

const theVault = [
  { id: "v1", ytId: "dQw4w9WgXcQ", title: "CXO Keynote: Scale", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop", type: "Keynote" },
  { id: "v2", ytId: "dQw4w9WgXcQ", title: "Panel: Active vs Passive", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop", type: "Panel Discussion" },
  { id: "v3", ytId: "dQw4w9WgXcQ", title: "The Future of FinTech", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", type: "Fireside Chat" },
  { id: "v4", ytId: "dQw4w9WgXcQ", title: "Recruiter Dashboards", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop", type: "Backend Breakdown" },
  { id: "v5", ytId: "dQw4w9WgXcQ", title: "Influence & Capital", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop", type: "Keynote" },
];

const quizzes = {
  SIP: { title: "SIP Mastery Check", questions: [{ q: "What is the primary mathematical advantage of a SIP?", options: ["Market Timing", "Rupee Cost Averaging", "Tax Evasion"], answer: 1 }] },
  MF: { title: "Mutual Fund Certification", questions: [{ q: "What does 'Expense Ratio' represent?", options: ["The fund manager's bonus", "Annual maintenance charge by the AMC", "The exit load penalty"], answer: 1 }] }
};

export default function SidequestAcademy() {
  const { userData, isLoaded, isAuthenticated } = useUser();
  const router = useRouter();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);
  const [quizResult, setQuizResult] = useState<"pass" | "fail" | null>(null);

  useEffect(() => {
    if (isLoaded && !isAuthenticated) router.push('/login');
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded, isAuthenticated, router]);

  if (!isLoaded || !isAuthenticated) return null;

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === activeQuiz.data.questions[quizStep].answer) setScore(score + 1);
    if (quizStep + 1 < activeQuiz.data.questions.length) {
      setQuizStep(quizStep + 1);
    } else {
      const finalScore = selectedIndex === activeQuiz.data.questions[quizStep].answer ? score + 1 : score;
      if (finalScore === activeQuiz.data.questions.length) {
        setQuizResult("pass");
        setIsVaultUnlocked(true);
      } else {
        setQuizResult("fail");
      }
    }
  };

  const closeQuiz = () => { setActiveQuiz(null); setQuizStep(0); setScore(0); setQuizResult(null); };

  return (
    // Background color matched to Netflix's exact dark gray (#141414)
    <div className="bg-[#141414] min-h-screen text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden pb-24">
      
      {/* --- 1. NETFLIX-STYLE NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-40 px-4 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="flex items-center gap-8 md:gap-12">
          {/* AMLANDAS Logo mapped exactly to your screenshot */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <div className="bg-cyan-500 rounded-full p-1"><Zap size={16} className="fill-black text-black" /></div>
            <h1 className="text-white font-black text-xl tracking-tight">AMLANDAS.</h1>
          </div>
          
          {/* Left-Aligned Links */}
          <div className="hidden lg:flex gap-5 text-[13px] font-medium text-zinc-300">
            {navItems.map((item, idx) => (
              <span key={item} className={`cursor-pointer transition-colors ${idx === 1 ? 'text-white font-bold' : 'hover:text-white/80'}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
        
        {/* Right Icons */}
        <div className="flex items-center gap-6 text-white">
          <Search size={22} className="cursor-pointer" />
          <Bell size={22} className="cursor-pointer" />
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold uppercase cursor-pointer">
            {userData.personal.name[0] || 'A'}
          </div>
        </div>
      </nav>

      {/* --- 2. THE TV SHOWS HEADER (Mimicking Image 3) --- */}
      <div className="pt-28 px-4 md:px-12 pb-6 flex items-center gap-8">
        <h2 className="text-4xl font-bold text-white tracking-tight">Sidequests</h2>
        <button className="flex items-center gap-2 border border-white/30 bg-black/40 px-4 py-1.5 text-sm font-bold transition-all hover:bg-white/10">
          Categories <ChevronDown size={16}/>
        </button>
      </div>

      {/* --- 3. DENSE CONTENT ROWS --- */}
      <div className="relative z-10 space-y-10">
        
        {/* ROW 1: Continue Watching (With Progress Bars) */}
        <div className="px-4 md:px-12 space-y-2">
          <h3 className="text-[1.1rem] font-bold text-[#e5e5e5] flex items-center gap-2 group cursor-pointer">
            Continue Watching for {userData.personal.name.split(' ')[0] || 'Executive'} 
            <ChevronRight size={18} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-all -ml-1 mt-0.5" />
          </h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 pt-1">
            {continueWatching.map((vid) => (
              <div key={vid.id} onClick={() => setActiveVideo(vid)} className="min-w-[280px] w-[280px] aspect-video bg-zinc-900 rounded-md overflow-hidden relative group cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:z-20">
                <img src={vid.img} className="w-full h-full object-cover" />
                
                {/* Netflix Play Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-black/50 backdrop-blur-sm"><Play size={20} className="fill-white text-white ml-1" /></div>
                </div>

                {/* Progress Bar (Netflix Red mapped to Indigo/Red) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-600/60">
                  <div className="h-full bg-red-600" style={{ width: vid.progress }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Gems For You */}
        <div className="px-4 md:px-12 space-y-2">
          <h3 className="text-[1.1rem] font-bold text-[#e5e5e5] flex items-center gap-2 group cursor-pointer">
            Gems for You <ChevronRight size={18} className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-all -ml-1 mt-0.5" />
          </h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 pt-1">
            {gemsForYou.map((vid) => (
              <div key={vid.id} onClick={() => setActiveVideo(vid)} className="min-w-[280px] w-[280px] aspect-video bg-zinc-900 rounded-md overflow-hidden relative group cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:z-20">
                <img src={vid.img} className="w-full h-full object-cover" />
                
                {/* Badges mapped from image */}
                {vid.top10 && (
                   <div className="absolute top-0 right-0 bg-[#E50914] text-white text-[8px] font-black uppercase tracking-tight px-1.5 py-1 leading-none">
                     TOP <br/> 10
                   </div>
                )}
                {vid.badge && (
                   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm whitespace-nowrap">
                     {vid.badge}
                   </div>
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <div className="flex gap-2 mb-2">
                     <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-zinc-200"><Play size={14} className="fill-black ml-0.5" /></div>
                     <div className="w-8 h-8 rounded-full border-2 border-zinc-400 flex items-center justify-center text-white hover:border-white"><Plus size={16} /></div>
                  </div>
                  <p className="text-sm font-bold text-white">{vid.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 3: THE VAULT (Locked/Unlocked Display) */}
        <div className="px-4 md:px-12 space-y-2 pt-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[1.1rem] font-bold text-[#e5e5e5]">Bingeworthy C-Suite Insights</h3>
            {!isVaultUnlocked && <Lock size={14} className="text-zinc-500" />}
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-8 pt-1">
            {theVault.map((vid) => (
              <div 
                key={vid.id} 
                onClick={() => isVaultUnlocked && setActiveVideo(vid)}
                className={`min-w-[280px] w-[280px] aspect-video rounded-md overflow-hidden relative transition-transform duration-300 ${isVaultUnlocked ? 'cursor-pointer hover:scale-[1.03] hover:z-20' : 'cursor-not-allowed grayscale-[0.8] opacity-60'}`}
              >
                <img src={vid.img} className="w-full h-full object-cover" />
                
                {/* Netflix N Logo Badge style for Originals */}
                <div className="absolute top-2 left-2 flex flex-col">
                  <span className="text-[8px] text-[#E50914] font-black tracking-widest leading-none">STUDIO</span>
                  <span className="text-[10px] font-bold uppercase tracking-tight text-white leading-none">{vid.type}</span>
                </div>

                {!isVaultUnlocked && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                    <Lock size={24} className="text-zinc-400 mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Requires SIP Mastery</span>
                  </div>
                )}

                {isVaultUnlocked && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                     <p className="text-sm font-bold text-white">{vid.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- VIDEO PLAYER MODAL (Unchanged Logic, UI Tweaks) --- */}
      {activeVideo && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6">
          <button onClick={() => setActiveVideo(null)} className="absolute top-6 right-6 md:top-10 md:right-10 text-zinc-400 hover:text-white transition-colors"><XCircle size={36} strokeWidth={1.5} /></button>
          
          <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden bg-black relative group shadow-2xl">
            <iframe 
              width="100%" height="100%" 
              src={`https://www.youtube.com/embed/${activeVideo.ytId}?autoplay=1&rel=0&modestbranding=1`} 
              frameBorder="0" allowFullScreen 
            />
            
            {activeVideo.hasQuiz && (
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => { setActiveQuiz({ type: activeVideo.quizType, data: quizzes[activeVideo.quizType as keyof typeof quizzes] }); setActiveVideo(null); }}
                  className="bg-[#E50914] text-white px-6 py-2.5 rounded font-bold text-sm flex items-center gap-2 hover:bg-red-700 hover:scale-105 transition-all shadow-xl"
                >
                  Take Skill Check <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- SKILL CHECK (QUIZ) MODAL (Unchanged Logic) --- */}
      {activeQuiz && (
         // ... (Keep the exact same Quiz Modal code from the previous block here for brevity, ensuring it works perfectly)
        <div className="fixed inset-0 z-[70] bg-[#141414] flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-xl p-8 md:p-12 relative shadow-2xl">
            {!quizResult ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[#E50914] text-xs font-black uppercase tracking-widest">{activeQuiz.data.title}</span>
                  <span className="text-zinc-500 text-xs font-bold uppercase">Q {quizStep + 1} / {activeQuiz.data.questions.length}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-8">{activeQuiz.data.questions[quizStep].q}</h3>
                <div className="space-y-3">
                  {activeQuiz.data.questions[quizStep].options.map((opt: string, idx: number) => (
                    <button key={idx} onClick={() => handleAnswer(idx)} className="w-full text-left p-4 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm font-medium flex justify-between items-center group">
                      {opt} <ChevronRight size={16} className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-10 flex flex-col items-center">
                {quizResult === "pass" ? (
                  <>
                    <CheckCircle2 size={64} className="text-green-500 mb-6" />
                    <h3 className="text-3xl font-bold mb-4 text-white">Skill Verified</h3>
                    <p className="text-zinc-400 mb-8 max-w-sm mx-auto">The Vault is now unlocked. Access C-Suite Keynotes from your dashboard.</p>
                    <button onClick={closeQuiz} className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-zinc-200 transition-colors">Enter The Vault</button>
                  </>
                ) : (
                  <>
                    <XCircle size={64} className="text-[#E50914] mb-6" />
                    <h3 className="text-3xl font-bold mb-4 text-white">Quest Failed</h3>
                    <p className="text-zinc-400 mb-8 max-w-sm mx-auto">Review the material and try the skill check again to unlock The Vault.</p>
                    <button onClick={closeQuiz} className="bg-zinc-800 text-white px-8 py-3 rounded font-bold hover:bg-zinc-700 transition-colors">Return to Academy</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}