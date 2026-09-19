"use client";
import React from 'react';
import { ArrowLeft, Save, User, Share2, Briefcase, GraduationCap, FolderGit2, Award, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

// 1. Import the Central Brain
import { useUser } from '../context/UserContext';

export default function ProfileBuilderPage() {
  const { 
    userData, 
    updatePersonal, 
    updateSocials, 
    addListItem, 
    removeListItem, 
    editListItem, 
    checkOnboardingStatus 
  } = useUser();

  // 2. The Gatekeeper Check: Are Name and Title filled out?
  const isFirstTime = userData.personal.name.trim() === "" || userData.personal.title.trim() === "";

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Hub
          </Link>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Save size={14} /> Auto-Saving
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">Master Identity<span className="text-cyan-500">.</span></h1>
          <p className="text-zinc-400 text-sm">Type once here. Auto-populate your CV and Website instantly.</p>
        </div>

        {/* --- 1. PERSONAL DETAILS --- */}
        <section className="p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] space-y-8">
          <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-widest text-cyan-400 border-b border-white/5 pb-4">
            <User size={20} /> Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Full Name *</label>
              <input value={userData.personal.name} onChange={(e) => updatePersonal('name', e.target.value)} placeholder="e.g. Amlan Das" className="w-full bg-black border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Professional Title *</label>
              <input value={userData.personal.title} onChange={(e) => updatePersonal('title', e.target.value)} placeholder="e.g. Finance Strategist" className="w-full bg-black border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Email Address</label>
              <input value={userData.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} placeholder="amlan@example.com" className="w-full bg-black border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Phone Number</label>
              <input value={userData.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} placeholder="+91 98765 43210" className="w-full bg-black border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Location</label>
              <input value={userData.personal.location} onChange={(e) => updatePersonal('location', e.target.value)} placeholder="Pune, India" className="w-full bg-black border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500" />
            </div>
          </div>
        </section>

        {/* --- 2. SOCIAL PRESENCE --- */}
        <section className="p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] space-y-8">
          <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-widest text-pink-400 border-b border-white/5 pb-4">
            <Share2 size={20} /> Social Presence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(['linkedin', 'github', 'x', 'instagram', 'youtube'] as const).map((social) => (
              <div key={social} className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{social} Handle/URL</label>
                <input value={userData.socials[social]} onChange={(e) => updateSocials(social, e.target.value)} placeholder={`Your ${social}...`} className="w-full bg-black border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-pink-500" />
              </div>
            ))}
          </div>
        </section>

        {/* --- 3. EXPERIENCE --- */}
        <section className="p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-widest text-emerald-400"><Briefcase size={20} /> Experience</h2>
            <button onClick={() => addListItem('experience', { role: '', org: '', time: '', desc: '' })} className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20"><Plus size={16} /></button>
          </div>
          {userData.experience.map((exp, idx) => (
            <div key={idx} className="p-6 bg-black border border-white/10 rounded-2xl relative space-y-3">
              <button onClick={() => removeListItem('experience', idx)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400"><Trash2 size={16} /></button>
              <input value={exp.role} onChange={(e) => editListItem('experience', idx, 'role', e.target.value)} placeholder="Job Role" className="w-full bg-transparent text-sm font-bold outline-none" />
              <input value={exp.org} onChange={(e) => editListItem('experience', idx, 'org', e.target.value)} placeholder="Company Name" className="w-full bg-transparent text-sm outline-none" />
              <input value={exp.time} onChange={(e) => editListItem('experience', idx, 'time', e.target.value)} placeholder="Timeline (e.g. 2024 - Present)" className="w-full bg-transparent text-sm text-zinc-500 outline-none" />
              <textarea value={exp.desc} onChange={(e) => editListItem('experience', idx, 'desc', e.target.value)} placeholder="Description" className="w-full bg-zinc-900 p-3 rounded-lg text-sm text-zinc-400 outline-none resize-none h-20 mt-2" />
            </div>
          ))}
        </section>

        {/* --- 4. EDUCATION --- */}
        <section className="p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-widest text-purple-400"><GraduationCap size={20} /> Education</h2>
            <button onClick={() => addListItem('education', { degree: '', school: '', year: '' })} className="p-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20"><Plus size={16} /></button>
          </div>
          {userData.education.map((edu, idx) => (
            <div key={idx} className="p-6 bg-black border border-white/10 rounded-2xl relative space-y-3">
              <button onClick={() => removeListItem('education', idx)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400"><Trash2 size={16} /></button>
              <input value={edu.school} onChange={(e) => editListItem('education', idx, 'school', e.target.value)} placeholder="Institution Name" className="w-full bg-transparent text-sm font-bold outline-none" />
              <input value={edu.degree} onChange={(e) => editListItem('education', idx, 'degree', e.target.value)} placeholder="Degree" className="w-full bg-transparent text-sm outline-none" />
              <input value={edu.year} onChange={(e) => editListItem('education', idx, 'year', e.target.value)} placeholder="Year of Graduation" className="w-full bg-transparent text-sm text-zinc-500 outline-none" />
            </div>
          ))}
        </section>

        {/* --- 5. PROJECTS --- */}
        <section className="p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-widest text-yellow-400"><FolderGit2 size={20} /> Projects</h2>
            <button onClick={() => addListItem('projects', { name: '', outcome: '' })} className="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg hover:bg-yellow-500/20"><Plus size={16} /></button>
          </div>
          {userData.projects.map((proj, idx) => (
            <div key={idx} className="p-6 bg-black border border-white/10 rounded-2xl relative space-y-3">
              <button onClick={() => removeListItem('projects', idx)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400"><Trash2 size={16} /></button>
              <input value={proj.name} onChange={(e) => editListItem('projects', idx, 'name', e.target.value)} placeholder="Project Name" className="w-full bg-transparent text-sm font-bold outline-none" />
              <textarea value={proj.outcome} onChange={(e) => editListItem('projects', idx, 'outcome', e.target.value)} placeholder="Key outcome or description..." className="w-full bg-zinc-900 p-3 rounded-lg text-sm text-zinc-400 outline-none resize-none h-16 mt-2" />
            </div>
          ))}
        </section>

        {/* --- 6. CERTIFICATIONS --- */}
        <section className="p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-widest text-orange-400"><Award size={20} /> Certifications</h2>
            <button onClick={() => addListItem('certifications', { name: '', issuer: '', year: '' })} className="p-2 bg-orange-500/10 text-orange-400 rounded-lg hover:bg-orange-500/20"><Plus size={16} /></button>
          </div>
          {userData.certifications.map((cert, idx) => (
            <div key={idx} className="p-6 bg-black border border-white/10 rounded-2xl relative space-y-3">
              <button onClick={() => removeListItem('certifications', idx)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400"><Trash2 size={16} /></button>
              <input value={cert.name} onChange={(e) => editListItem('certifications', idx, 'name', e.target.value)} placeholder="Certification Name" className="w-full bg-transparent text-sm font-bold outline-none" />
              <input value={cert.issuer} onChange={(e) => editListItem('certifications', idx, 'issuer', e.target.value)} placeholder="Issuing Organization" className="w-full bg-transparent text-sm outline-none" />
              <input value={cert.year} onChange={(e) => editListItem('certifications', idx, 'year', e.target.value)} placeholder="Year" className="w-full bg-transparent text-sm text-zinc-500 outline-none" />
            </div>
          ))}
        </section>

        {/* ONBOARDING GATEWAY BUTTON */}
        <div className="pt-8 flex justify-end">
          <button 
            onClick={checkOnboardingStatus}
            disabled={isFirstTime}
            className={`px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-300 ${
              isFirstTime 
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                : 'bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]'
            }`}
          >
            {isFirstTime ? 'Fill Name & Title to Continue' : 'Save & Enter Workspace'}
          </button>
        </div>

      </div>
    </div>
  );
}