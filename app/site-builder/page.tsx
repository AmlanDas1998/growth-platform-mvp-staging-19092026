"use client";
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Palette, Monitor, Smartphone, Plus, Trash2, 
  Zap, ExternalLink, Globe, User, Quote, ShieldCheck, Download 
} from 'lucide-react';
import Link from 'next/link';

// 1. Import the Central Brain
import { useUser } from '../context/UserContext';

// --- THEME ENGINE ---
type TemplateId = 'executive' | 'tech' | 'creative';
type PaletteId = 'classic' | 'modern' | 'executive' | 'tech' | 'rose';

const accentColors: Record<PaletteId, string> = {
  classic: 'text-slate-600 border-slate-600 bg-slate-900',
  modern: 'text-emerald-500 border-emerald-500 bg-emerald-500',
  executive: 'text-blue-700 border-blue-700 bg-blue-700',
  tech: 'text-cyan-400 border-cyan-400 bg-cyan-500',
  rose: 'text-rose-500 border-rose-500 bg-rose-500'
};

export default function SiteBuilderPage() {
  // 2. Pull all the Master Data and the updaters
  const { userData, updatePersonal, addListItem, removeListItem, editListItem } = useUser();
  const { personal, experience, education, projects, certifications, socials } = userData;
  
  const [template, setTemplate] = useState<TemplateId>('executive');
  const [palette, setPalette] = useState<PaletteId>('executive');
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
  const accent = accentColors[palette];

  // --- LOCAL STATE FOR SITE-SPECIFIC DATA ---
  // We keep things like "Value Proposition" and "Testimonials" local since they don't belong on a standard CV
  const [siteData, setSiteData] = useState({
    hero: { value: "Building scalable ecosystems for the next generation." },
    about: { header: "About Me", bio: "Experienced professional delivering impactful results." },
    impact: [{ label: "Revenue Managed", val: "$10M+" }, { label: "Growth YoY", val: "35%" }],
    skills: [{ cat: "Core", val: "Strategic Planning" }, { cat: "Tech", val: "Financial Modeling" }],
    insights: [{ title: "The Future of Fintech in Pune", link: "#" }],
    testimonials: [{ quote: "An absolute leader in strategy.", author: "VP, Finance" }],
    resume: { cta: "Download PDF" },
    contact: { header: "Contact", sub: "Let's Connect" },
    footer: { tagline: "Building with Precision" }
  });

  const handleLocalUpdate = (section: keyof typeof siteData, field: string, value: any) => {
    setSiteData({ ...siteData, [section]: { ...(siteData as any)[section], [field]: value } });
  };
  
  const addLocalListItem = (section: keyof typeof siteData, templateObj: any) => {
    setSiteData({ ...siteData, [section]: [...(siteData as any)[section], templateObj] });
  };

  const removeLocalListItem = (section: keyof typeof siteData, index: number) => {
    const newList = [...(siteData as any)[section]];
    newList.splice(index, 1);
    setSiteData({ ...siteData, [section]: newList });
  };

  const updateLocalListItem = (section: keyof typeof siteData, index: number, field: string, value: any) => {
    const newList = [...(siteData as any)[section]];
    newList[index] = { ...newList[index], [field]: value };
    setSiteData({ ...siteData, [section]: newList });
  };

  // ---------------------------------------------------------------------------
  // 🎨 TEMPLATE 1: MINIMAL EXECUTIVE (Auto-Populating)
  // ---------------------------------------------------------------------------
  const ExecutiveTemplate = () => (
    <div className="bg-white text-slate-800 font-sans min-h-full">
      <section className="p-12 md:p-24 border-b border-slate-100 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight">{personal.name || 'Your Name'}</h1>
          <p className={`text-xl font-medium ${accent.split(' ')[0]}`}>{personal.title || 'Your Title'}</p>
          <p className="text-slate-500 max-w-md leading-relaxed">{siteData.hero.value}</p>
          <div className="pt-4 flex gap-4">
            <button className={`px-8 py-3 bg-slate-900 text-white text-sm font-bold tracking-widest uppercase`}>View Work</button>
          </div>
        </div>
        <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
          <User size={48} />
        </div>
      </section>

      {/* ABOUT & IMPACT */}
      <section className="p-12 md:p-24 border-b border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">{siteData.about.header}</h3>
          <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">{siteData.about.bio}</p>
        </div>
        <div className="md:col-span-5 grid grid-cols-1 gap-4">
          {siteData.impact.map((i, idx) => (
            <div key={idx} className="p-6 border border-slate-200 bg-slate-50 flex justify-between items-center">
              <span className="text-xs font-bold uppercase text-slate-500">{i.label}</span>
              <span className={`text-2xl font-serif font-bold ${accent.split(' ')[0]}`}>{i.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS & EXPERIENCE (Auto-Populating from Master Data) */}
      <section className="p-12 md:p-24 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">Core Competencies</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {siteData.skills.map((s, i) => (
              <div key={i} className="border-b border-slate-100 pb-2">
                <p className="text-xs text-slate-400 mb-1">{s.cat}</p>
                <p className="font-medium text-slate-800">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">Professional History</h3>
          <div className="space-y-8 border-l-2 border-slate-100 pl-8 ml-2">
            {experience.map((e, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white ${accent.split(' ')[2]}`} />
                <h4 className="text-xl font-bold text-slate-900">{e.role}</h4>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mt-1 mb-2">{e.org} | {e.time}</p>
                <p className="text-slate-600 text-sm max-w-sm">{e.desc}</p>
              </div>
            ))}
            {experience.length === 0 && <p className="text-slate-400 italic">Add experience via Master Profile...</p>}
          </div>
        </div>
      </section>

      {/* PROJECTS & INSIGHTS (Auto-Populating Projects) */}
      <section className="p-12 md:p-24 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">Selected Projects</h3>
          <div className="grid gap-6">
            {projects.map((p, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/1] bg-slate-100 mb-3" />
                <h4 className="text-lg font-bold group-hover:underline">{p.name}</h4>
                <p className="text-sm text-slate-500">{p.outcome}</p>
              </div>
            ))}
            {projects.length === 0 && <p className="text-slate-400 italic">Add projects via Master Profile...</p>}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">Insights</h3>
          <div className="space-y-4">
            {siteData.insights.map((ins, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-slate-100">
                <span className="font-serif font-medium text-lg">{ins.title}</span>
                <ArrowLeft className="rotate-135 text-slate-300" size={16} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & EDUCATION (Auto-Populating Education) */}
      <section className="p-12 md:p-24 border-b border-slate-100 bg-slate-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
           <div className="bg-white p-8 border border-slate-100 shadow-sm">
             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Testimonials</h3>
             {siteData.testimonials.map((t, i) => (
               <div key={i}>
                 <p className="text-xl font-serif italic text-slate-700">"{t.quote}"</p>
                 <p className="text-xs font-bold uppercase mt-4 text-slate-400">— {t.author}</p>
               </div>
             ))}
           </div>
           <div>
             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Credentials</h3>
             {education.map((edu, i) => (
               <div key={i} className="flex justify-between items-end border-b border-slate-200 pb-2 mb-4">
                 <div>
                   <h4 className="font-bold text-slate-900">{edu.school}</h4>
                   <p className="text-sm text-slate-500">{edu.degree}</p>
                 </div>
                 <span className="text-xs font-bold text-slate-400">{edu.year}</span>
               </div>
             ))}
             {education.length === 0 && <p className="text-slate-400 italic text-sm">Add education via Master Profile...</p>}
             
             {/* Show Certifications if they exist */}
             {certifications.length > 0 && (
               <div className="mt-8">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Certifications</h3>
                 {certifications.map((cert, i) => (
                   <div key={i} className="flex justify-between items-end border-b border-slate-200 pb-2 mb-4">
                     <div>
                       <h4 className="font-bold text-slate-900">{cert.name}</h4>
                       <p className="text-sm text-slate-500">{cert.issuer}</p>
                     </div>
                     <span className="text-xs font-bold text-slate-400">{cert.year}</span>
                   </div>
                 ))}
               </div>
             )}
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="p-12 md:p-24 bg-slate-900 text-white text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-serif font-bold text-white">{siteData.contact.header}</h2>
          <p className="text-slate-500">{siteData.contact.sub}</p>
          <button className={`px-10 py-4 ${accent.split(' ')[2]} text-white font-bold tracking-widest uppercase`}>
            {personal.email || 'email@example.com'}
          </button>
        </div>
        <footer className="pt-12 border-t border-slate-200 flex justify-between text-xs text-slate-400 uppercase tracking-widest">
          <span>{siteData.footer.tagline}</span>
          <span>© {new Date().getFullYear()} {personal.name}</span>
        </footer>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-10 px-6 font-sans">
      <div className="max-w-[1900px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)]">
        
        {/* SIDEBAR EDITOR */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
          <div className="flex items-center justify-between bg-zinc-900 p-2 rounded-2xl border border-white/5">
            <Link href="/dashboard" className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 hover:text-white px-4">
              <ArrowLeft size={14} /> Hub
            </Link>
            <div className="flex bg-black p-1 rounded-xl border border-white/10">
              <button onClick={() => setView('desktop')} className={`p-2 rounded-lg ${view === 'desktop' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}><Monitor size={14}/></button>
              <button onClick={() => setView('mobile')} className={`p-2 rounded-lg ${view === 'mobile' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}><Smartphone size={14}/></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
            <div className="bg-zinc-900 border border-white/10 p-6 rounded-[2rem]">
               <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2"><Palette size={12}/> Color Engine</p>
               <div className="flex justify-between">
                 {(Object.keys(accentColors) as PaletteId[]).map((p) => (
                   <button key={p} onClick={() => setPalette(p)} className={`w-10 h-10 rounded-xl border-2 transition-all ${palette === p ? 'border-white scale-110' : 'border-transparent opacity-40 bg-zinc-800'}`}>
                     <div className={`w-5 h-5 rounded-md ${accentColors[p].split(' ')[2]}`} />
                   </button>
                 ))}
               </div>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 space-y-10">
              
              {/* MASTER SYNC NOTIFICATION */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Master Sync Active
                </p>
                <p className="text-xs text-zinc-400">Your Name, Title, Experience, Education, Projects, and Certifications are pulling live from the Profile Builder.</p>
              </div>

              {/* SITE-SPECIFIC CONTENT EDITORS */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase text-cyan-400">1. Hero Tagline (Site Only)</h3>
                <textarea value={siteData.hero.value} onChange={(e)=>handleLocalUpdate('hero','value',e.target.value)} placeholder="Value Proposition" className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm resize-none h-20" />
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-xs font-black uppercase text-cyan-400">2. About (Site Only)</h3>
                <textarea value={siteData.about.bio} onChange={(e)=>handleLocalUpdate('about','bio',e.target.value)} placeholder="Bio" className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm resize-none h-28" />
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between"><h3 className="text-xs font-black uppercase text-cyan-400">3. Impact Stats</h3><button onClick={()=>addLocalListItem('impact', {label:'', val:''})} className="text-cyan-400"><Plus size={14}/></button></div>
                {siteData.impact.map((i, idx) => (
                  <div key={idx} className="flex gap-2 relative">
                    <input value={i.label} onChange={(e)=>updateLocalListItem('impact',idx,'label',e.target.value)} placeholder="Label" className="w-1/2 bg-black border border-white/10 rounded-xl p-3 text-xs" />
                    <input value={i.val} onChange={(e)=>updateLocalListItem('impact',idx,'val',e.target.value)} placeholder="Val" className="w-1/2 bg-black border border-white/10 rounded-xl p-3 text-xs" />
                    <button onClick={()=>removeLocalListItem('impact',idx)} className="text-zinc-600 hover:text-red-500"><Trash2 size={12}/></button>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between"><h3 className="text-xs font-black uppercase text-cyan-400">4. Skills</h3><button onClick={()=>addLocalListItem('skills', {cat:'', val:''})} className="text-cyan-400"><Plus size={14}/></button></div>
                {siteData.skills.map((s, idx) => (
                  <div key={idx} className="p-4 bg-black border border-white/10 rounded-xl relative space-y-2">
                    <button onClick={()=>removeLocalListItem('skills',idx)} className="absolute top-2 right-2 text-zinc-600"><Trash2 size={12}/></button>
                    <input value={s.cat} onChange={(e)=>updateLocalListItem('skills',idx,'cat',e.target.value)} placeholder="Category" className="w-full bg-transparent text-xs border-b border-white/5" />
                    <input value={s.val} onChange={(e)=>updateLocalListItem('skills',idx,'val',e.target.value)} placeholder="Skills" className="w-full bg-transparent text-xs font-bold" />
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between"><h3 className="text-xs font-black uppercase text-cyan-400">5. Testimonials</h3><button onClick={()=>addLocalListItem('testimonials', {quote:'', author:''})} className="text-cyan-400"><Plus size={14}/></button></div>
                {siteData.testimonials.map((t, idx) => (
                  <div key={idx} className="relative p-2 flex gap-2">
                    <input value={t.quote} onChange={(v)=>updateLocalListItem('testimonials',idx,'quote',v.target.value)} placeholder="Quote" className="w-full bg-black p-2 text-xs border border-white/10 rounded" />
                    <input value={t.author} onChange={(v)=>updateLocalListItem('testimonials',idx,'author',v.target.value)} placeholder="Author" className="w-24 bg-black p-2 text-xs border border-white/10 rounded" />
                    <button onClick={()=>removeLocalListItem('testimonials',idx)} className="text-zinc-600"><Trash2 size={12}/></button>
                  </div>
                ))}
              </div>

              {/* FOOTER ACTIONS */}
              <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-xs font-black uppercase text-cyan-400">6. Final Actions</h3>
                <input value={siteData.contact.sub} onChange={(e)=>handleLocalUpdate('contact','sub',e.target.value)} placeholder="Contact Sub-header" className="w-full bg-black border border-white/10 rounded-xl p-4 text-xs" />
                <input value={siteData.footer.tagline} onChange={(e)=>handleLocalUpdate('footer','tagline',e.target.value)} placeholder="Footer Tagline" className="w-full bg-black border border-white/10 rounded-xl p-4 text-xs" />
              </div>

            </div>
          </div>
          <button className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-2xl flex items-center justify-center gap-2">
            <Download size={16}/> Publish Site
          </button>
        </div>

        {/* --- PREVIEW AREA --- */}
        <div className="lg:col-span-8 bg-zinc-900/40 rounded-[3rem] border border-white/5 p-12 flex justify-center overflow-y-auto relative">
           <div className={`transition-all duration-700 shadow-2xl overflow-y-auto custom-scrollbar relative ${view === 'desktop' ? 'w-full max-w-[1400px] h-full rounded-[3rem]' : 'w-[375px] h-[650px] rounded-[4rem] border-[12px] border-zinc-800'}`}>
             <ExecutiveTemplate />
           </div>
           <div className="absolute top-8 left-12 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700 pointer-events-none"><Globe size={12}/> Unified Site Engine</div>
        </div>

      </div>
    </div>
  );
}