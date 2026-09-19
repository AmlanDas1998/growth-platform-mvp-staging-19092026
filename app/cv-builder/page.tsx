"use client";
import React, { useState } from 'react';
import { 
  ArrowLeft, Download, FileText, Settings, 
  Eye, EyeOff, Lock, Edit3, LayoutTemplate, ChevronDown, ChevronUp, Link as LinkIcon, Palette
} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/app/context/UserContext';

// --- TAILWIND COLOR DICTIONARY ---
// Define curated 3-color palettes (Primary, Secondary, Accent)
const themeColors: Record<string, { primary: string, secondary: string, accent: string, text: string, bg: string, border: string, lightBg: string }> = {
  fintech: { primary: '#0f172a', secondary: '#334155', accent: '#06b6d4', text: 'text-cyan-600', bg: 'bg-cyan-600', border: 'border-cyan-600', lightBg: 'bg-cyan-50' },
  executive: { primary: '#1e293b', secondary: '#475569', accent: '#059669', text: 'text-emerald-600', bg: 'bg-emerald-600', border: 'border-emerald-600', lightBg: 'bg-emerald-50' },
  creative: { primary: '#171717', secondary: '#525252', accent: '#e11d48', text: 'text-rose-600', bg: 'bg-rose-600', border: 'border-rose-600', lightBg: 'bg-rose-50' },
  minimalist: { primary: '#18181b', secondary: '#52525b', accent: '#4f46e5', text: 'text-indigo-600', bg: 'bg-indigo-600', border: 'border-indigo-600', lightBg: 'bg-indigo-50' },
  monochrome: { primary: '#000000', secondary: '#404040', accent: '#a3a3a3', text: 'text-neutral-600', bg: 'bg-neutral-600', border: 'border-neutral-600', lightBg: 'bg-neutral-100' },
};

export default function CVBuilderPage() {
  const { userData } = useUser();
  const { personal, experience, education, projects, certifications, socials } = userData;

  // --- LOCAL UI STATE ---
  const [activeTemplate, setActiveTemplate] = useState('executive');
  const [activeColor, setActiveColor] = useState('fintech');
  const [expandedSection, setExpandedSection] = useState<string | null>('personal');
  
  const ALL_TEMPLATES = [
    'executive', 'modern', 'tech', 'corporate', 'creative', 'timeline', 
    'academic', 'block', 'consulting', 'silicon-valley', 'banking', 
    'modern-exec', 'product-leader', 'agency', 'data-scientist', 
    'growth', 'architect', 'hybrid'
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);

  const nextSlide = () => setCarouselIndex((prev) => (prev + 3 >= ALL_TEMPLATES.length ? 0 : prev + 3));
  const prevSlide = () => setCarouselIndex((prev) => (prev - 3 < 0 ? Math.max(0, ALL_TEMPLATES.length - 3) : prev - 3));
  
  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    personal: true, summary: true, experience: true, education: true, skills: true, projects: true, certifications: true,
  });

  const [customData, setCustomData] = useState({
    summary: 'A highly motivated professional with a track record of delivering scalable solutions. Seeking to leverage cross-functional expertise in a dynamic environment.',
    skills: 'React, Next.js, Financial Modeling, Project Management, Client Relations, Data Analysis, SEO Strategy',
  });

  const tColor = themeColors[activeColor];

  const toggleVisibility = (section: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setVisibility(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('cv-document');
    if (!element) return;
    const html2pdf = (await import('html2pdf.js')).default;
    const opt = {
      margin: 0,
      filename: `${personal?.name?.replace(/\s+/g, '_') || 'Professional'}_CV.pdf`,
      image: { type: 'jpeg' as const, quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };
    html2pdf().set(opt).from(element).save();
  };

  const sidebarSections = [
    { id: 'personal', title: 'Profile Details', isMaster: true },
    { id: 'summary', title: 'Targeted Summary', isMaster: false },
    { id: 'experience', title: 'Professional Experience', isMaster: true },
    { id: 'education', title: 'Education & Credentials', isMaster: true },
    { id: 'skills', title: 'Custom Skills', isMaster: false },
    { id: 'projects', title: 'Key Projects', isMaster: true },
    { id: 'certifications', title: 'Certifications', isMaster: true },
  ];

  // =========================================================================
  // PASTE ALL 18 TEMPLATE FUNCTIONS BELOW THIS LINE
  // =========================================================================
  // =========================================================================
  // TEMPLATE 1: EXECUTIVE (Standard ATS, Single Column, Centered Header)
  // =========================================================================
  const renderExecutive = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-900 font-serif p-14 shrink-0 shadow-2xl">
      {visibility.personal && (
        <header className={`border-b-2 ${tColor.border} pb-6 mb-6 text-center`}>
          <h1 className={`text-4xl font-black uppercase tracking-tight mb-2 ${tColor.text}`}>{personal?.name || "YOUR NAME"}</h1>
          <p className="text-lg text-slate-600 tracking-widest uppercase mb-3">{personal?.title || "PROFESSIONAL TITLE"}</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-slate-500 font-sans">
            {personal?.email && <span>{personal.email}</span>}
            {personal?.phone && <span>• {personal.phone}</span>}
            {personal?.location && <span>• {personal.location}</span>}
            {socials?.linkedin && <span>• {socials.linkedin}</span>}
          </div>
        </header>
      )}

      {visibility.summary && customData.summary && (
        <section className="mb-6">
          <p className="leading-relaxed text-slate-700 text-sm">{customData.summary}</p>
        </section>
      )}

      {visibility.experience && experience?.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-base font-black uppercase tracking-widest border-b ${tColor.border} pb-1 mb-4 font-sans ${tColor.text}`}>Experience</h2>
          <div className="space-y-4">
            {experience.map((exp: any, idx: number) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-sm font-sans font-bold text-slate-500">{exp.time}</span>
                </div>
                <p className="italic text-slate-700 mb-1">{exp.org}</p>
                <p className="text-sm text-slate-600 whitespace-pre-wrap">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.education && education?.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-base font-black uppercase tracking-widest border-b ${tColor.border} pb-1 mb-4 font-sans ${tColor.text}`}>Education</h2>
          {education.map((edu: any, idx: number) => (
            <div key={idx} className="flex justify-between items-baseline mb-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">{edu.school}</h3>
                <p className="text-sm text-slate-700">{edu.degree}</p>
              </div>
              <span className="text-sm font-sans font-bold text-slate-500">{edu.year}</span>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {visibility.skills && customData.skills && (
          <section>
            <h2 className={`text-base font-black uppercase tracking-widest border-b ${tColor.border} pb-1 mb-3 font-sans ${tColor.text}`}>Skills</h2>
            <p className="text-sm text-slate-700 leading-relaxed">{customData.skills}</p>
          </section>
        )}
        {visibility.projects && projects?.length > 0 && (
          <section>
            <h2 className={`text-base font-black uppercase tracking-widest border-b ${tColor.border} pb-1 mb-3 font-sans ${tColor.text}`}>Projects</h2>
            <ul className="list-disc pl-4 space-y-2 text-sm text-slate-700">
              {projects.map((proj: any, idx: number) => (
                <li key={idx}><strong>{proj.name}</strong> - {proj.outcome}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );

  // =========================================================================
  // TEMPLATE 2: MODERN SPLIT (Two-Column, Sidebar, Premium Layout)
  // =========================================================================
  const renderModernSplit = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-800 font-sans shrink-0 shadow-2xl flex overflow-hidden">
      {/* Left Sidebar */}
      <div className={`w-[260px] ${tColor.lightBg} p-8 flex flex-col gap-8`}>
        {visibility.personal && (
          <div className="break-words">
            <h1 className={`text-3xl font-black tracking-tighter leading-none mb-2 ${tColor.text}`}>{personal?.name || "YOUR NAME"}</h1>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">{personal?.title || "TITLE"}</p>
            <div className="space-y-3 text-xs text-slate-600">
              {personal?.email && <div><strong className="block text-slate-900">Email</strong>{personal.email}</div>}
              {personal?.phone && <div><strong className="block text-slate-900">Phone</strong>{personal.phone}</div>}
              {personal?.location && <div><strong className="block text-slate-900">Location</strong>{personal.location}</div>}
              {socials?.linkedin && <div><strong className="block text-slate-900">LinkedIn</strong>{socials.linkedin}</div>}
            </div>
          </div>
        )}

        {visibility.skills && customData.skills && (
          <div>
            <h2 className={`text-xs font-black uppercase tracking-widest mb-3 ${tColor.text}`}>Core Skills</h2>
            <div className="flex flex-wrap gap-2">
              {customData.skills.split(',').map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-700 uppercase">{skill.trim()}</span>
              ))}
            </div>
          </div>
        )}

        {visibility.education && education?.length > 0 && (
          <div>
            <h2 className={`text-xs font-black uppercase tracking-widest mb-3 ${tColor.text}`}>Education</h2>
            <div className="space-y-4">
              {education.map((edu: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <strong className="block text-slate-900">{edu.degree}</strong>
                  <span className="text-slate-600">{edu.school}</span>
                  <div className={`font-bold mt-1 ${tColor.text}`}>{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div className="flex-1 p-10 pt-12 flex flex-col gap-8">
        {visibility.summary && customData.summary && (
          <section>
            <h2 className="text-xl font-black mb-3 border-b border-slate-200 pb-2">Profile</h2>
            <p className="text-sm leading-relaxed text-slate-600">{customData.summary}</p>
          </section>
        )}

        {visibility.experience && experience?.length > 0 && (
          <section>
            <h2 className="text-xl font-black mb-4 border-b border-slate-200 pb-2">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp: any, idx: number) => (
                <div key={idx} className="relative pl-4 border-l-2 border-slate-100">
                  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white ${tColor.bg}`}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                    <span className={`text-xs font-bold ${tColor.text}`}>{exp.time}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mb-2">{exp.org}</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{exp.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {visibility.projects && projects?.length > 0 && (
          <section>
            <h2 className="text-xl font-black mb-4 border-b border-slate-200 pb-2">Key Projects</h2>
            <div className="grid grid-cols-1 gap-4 text-sm">
              {projects.map((proj: any, idx: number) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <strong className="block text-slate-900 mb-1">{proj.name}</strong>
                  <span className="text-slate-600">{proj.outcome}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  // =========================================================================
  // TEMPLATE 3: TECH MINIMALIST (Clean Grid, High Typography focus)
  // =========================================================================
  const renderTechMinimalist = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-900 font-sans p-16 shrink-0 shadow-2xl">
      {visibility.personal && (
        <header className="mb-10 flex justify-between items-end border-b-4 border-slate-900 pb-6">
          <div className="max-w-[60%]">
            <h1 className="text-5xl font-black tracking-tighter mb-2">{personal?.name || "YOUR NAME"}</h1>
            <p className={`text-xl font-bold tracking-tight ${tColor.text}`}>{personal?.title || "TITLE"}</p>
          </div>
          <div className="text-right text-xs font-medium space-y-1 text-slate-500">
            {personal?.email && <p>{personal.email}</p>}
            {personal?.phone && <p>{personal.phone}</p>}
            {personal?.location && <p>{personal.location}</p>}
            {socials?.linkedin && <p>{socials.linkedin}</p>}
          </div>
        </header>
      )}

      {visibility.summary && customData.summary && (
        <section className="mb-10 text-lg leading-relaxed font-medium text-slate-700">
          {customData.summary}
        </section>
      )}

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-10">
          {visibility.experience && experience?.length > 0 && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-5 ${tColor.text}`}>Experience</h2>
              <div className="space-y-8">
                {experience.map((exp: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <div className="flex justify-between text-sm text-slate-500 mb-3 font-medium">
                      <span>{exp.org}</span>
                      <span>{exp.time}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {visibility.projects && projects?.length > 0 && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-5 ${tColor.text}`}>Projects</h2>
              <div className="space-y-4">
                {projects.map((proj: any, idx: number) => (
                  <div key={idx}>
                    <strong className="block text-base">{proj.name}</strong>
                    <p className="text-sm text-slate-600 mt-1">{proj.outcome}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-10">
          {visibility.skills && customData.skills && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-4 ${tColor.text}`}>Expertise</h2>
              <ul className="space-y-2">
                {customData.skills.split(',').map((skill, i) => (
                  <li key={i} className="text-sm font-medium border-b border-slate-100 pb-2">{skill.trim()}</li>
                ))}
              </ul>
            </section>
          )}

          {visibility.education && education?.length > 0 && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-4 ${tColor.text}`}>Education</h2>
              <div className="space-y-4">
                {education.map((edu: any, idx: number) => (
                  <div key={idx}>
                    <strong className="block text-sm">{edu.degree}</strong>
                    <span className="text-sm text-slate-500 block mb-1">{edu.school}</span>
                    <span className={`text-xs font-bold ${tColor.text}`}>{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {visibility.certifications && certifications?.length > 0 && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-4 ${tColor.text}`}>Credentials</h2>
              <div className="space-y-3">
                {certifications.map((cert: any, idx: number) => (
                  <div key={idx}>
                    <strong className="block text-sm">{cert.name}</strong>
                    <span className="text-xs text-slate-500 block">{cert.issuer} • {cert.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

// =========================================================================
  // TEMPLATE 4: CORPORATE CLASSIC (Highly structured, thick borders, serif headers)
  // =========================================================================
  const renderCorporateClassic = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-black font-sans p-16 shrink-0 shadow-2xl">
      {visibility.personal && (
        <header className={`border-t-4 border-b-4 ${tColor.border} py-6 mb-8 text-center`}>
          <h1 className="text-4xl font-serif font-black uppercase tracking-widest mb-2">{personal?.name || "YOUR NAME"}</h1>
          <p className="text-sm font-bold tracking-widest uppercase mb-3 text-gray-700">{personal?.title || "PROFESSIONAL TITLE"}</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-semibold text-gray-600">
            {personal?.email && <span>{personal.email}</span>}
            {personal?.phone && <span>| {personal.phone}</span>}
            {personal?.location && <span>| {personal.location}</span>}
            {socials?.linkedin && <span>| {socials.linkedin}</span>}
          </div>
        </header>
      )}

      {visibility.summary && customData.summary && (
        <section className="mb-6">
          <p className="text-sm leading-relaxed text-justify text-gray-800">{customData.summary}</p>
        </section>
      )}

      {visibility.experience && experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 mb-4">Professional Experience</h2>
          <div className="space-y-5">
            {experience.map((exp: any, idx: number) => (
              <div key={idx}>
                <div className="flex justify-between items-end mb-1">
                  <h3 className="text-base font-bold uppercase">{exp.role}</h3>
                  <span className="text-sm font-bold text-gray-600">{exp.time}</span>
                </div>
                <p className={`text-sm font-bold italic mb-2 ${tColor.text}`}>{exp.org}</p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.education && education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 mb-4">Education</h2>
          <div className="space-y-3">
            {education.map((edu: any, idx: number) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold">{edu.degree}</h3>
                  <p className="text-sm text-gray-700">{edu.school}</p>
                </div>
                <span className="text-sm font-bold text-gray-600">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8 mt-6">
        {visibility.skills && customData.skills && (
          <section>
            <h2 className="text-lg font-serif font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 mb-3">Core Competencies</h2>
            <p className="text-sm text-gray-700 leading-relaxed font-semibold">{customData.skills}</p>
          </section>
        )}
        {visibility.projects && projects?.length > 0 && (
          <section>
            <h2 className="text-lg font-serif font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 mb-3">Key Projects</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              {projects.map((proj: any, idx: number) => (
                <li key={idx}>
                  <strong className="text-black">{proj.name}:</strong> {proj.outcome}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );

  // =========================================================================
  // TEMPLATE 5: CREATIVE RIGHT (Dark Accent Right Sidebar, Left Main Content)
  // =========================================================================
  const renderCreativeRight = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-900 font-sans shrink-0 shadow-2xl flex overflow-hidden">
      <div className="flex-1 p-12 pt-16 flex flex-col gap-8">
        {visibility.personal && (
          <header className="mb-4">
            <h1 className={`text-5xl font-black uppercase tracking-tighter mb-2 ${tColor.text}`}>{personal?.name || "YOUR NAME"}</h1>
            <p className="text-xl font-bold uppercase tracking-widest text-slate-400">{personal?.title || "TITLE"}</p>
          </header>
        )}

        {visibility.summary && customData.summary && (
          <section>
            <p className="text-sm leading-relaxed text-slate-600 font-medium">{customData.summary}</p>
          </section>
        )}

        {visibility.experience && experience?.length > 0 && (
          <section>
            <h2 className="text-2xl font-black tracking-tight mb-5 flex items-center gap-3">
              Experience <span className={`h-1 flex-1 ${tColor.bg} opacity-20`}></span>
            </h2>
            <div className="space-y-6">
              {experience.map((exp: any, idx: number) => (
                <div key={idx}>
                  <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                  <div className={`text-xs font-black uppercase tracking-widest mb-2 ${tColor.text}`}>
                    {exp.org} • {exp.time}
                  </div>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{exp.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {visibility.projects && projects?.length > 0 && (
          <section>
            <h2 className="text-2xl font-black tracking-tight mb-5 flex items-center gap-3">
              Projects <span className={`h-1 flex-1 ${tColor.bg} opacity-20`}></span>
            </h2>
            <div className="space-y-4">
              {projects.map((proj: any, idx: number) => (
                <div key={idx}>
                  <strong className="block text-base">{proj.name}</strong>
                  <span className="text-sm text-slate-600">{proj.outcome}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className={`w-[240px] ${tColor.bg} text-white p-8 flex flex-col gap-10`}>
        {visibility.personal && (
          <div className="space-y-4 text-xs font-medium opacity-90 break-words">
            {personal?.email && <div><span className="block opacity-50 uppercase text-[10px] font-black tracking-widest mb-1">Email</span>{personal.email}</div>}
            {personal?.phone && <div><span className="block opacity-50 uppercase text-[10px] font-black tracking-widest mb-1">Phone</span>{personal.phone}</div>}
            {personal?.location && <div><span className="block opacity-50 uppercase text-[10px] font-black tracking-widest mb-1">Location</span>{personal.location}</div>}
            {socials?.linkedin && <div><span className="block opacity-50 uppercase text-[10px] font-black tracking-widest mb-1">LinkedIn</span>{socials.linkedin}</div>}
          </div>
        )}

        {visibility.skills && customData.skills && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest mb-4 opacity-50">Skills</h2>
            <ul className="space-y-2 text-sm font-bold">
              {customData.skills.split(',').map((skill, i) => (
                <li key={i}>{skill.trim()}</li>
              ))}
            </ul>
          </div>
        )}

        {visibility.education && education?.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest mb-4 opacity-50">Education</h2>
            <div className="space-y-5">
              {education.map((edu: any, idx: number) => (
                <div key={idx} className="text-sm">
                  <strong className="block font-bold leading-tight mb-1">{edu.degree}</strong>
                  <span className="block opacity-80 text-xs mb-1">{edu.school}</span>
                  <span className="text-[10px] font-black tracking-widest opacity-50">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // =========================================================================
  // TEMPLATE 6: SLEEK TIMELINE (Left bordered dots marking chronological events)
  // =========================================================================
  const renderSleekTimeline = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-gray-800 font-sans p-14 shrink-0 shadow-2xl">
      {visibility.personal && (
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-light tracking-widest uppercase mb-2 text-gray-900">{personal?.name || "YOUR NAME"}</h1>
          <p className={`text-sm font-bold tracking-widest uppercase mb-4 ${tColor.text}`}>{personal?.title || "TITLE"}</p>
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            {personal?.email && <span>{personal.email}</span>}
            {personal?.phone && <span>• {personal.phone}</span>}
            {personal?.location && <span>• {personal.location}</span>}
          </div>
        </header>
      )}

      {visibility.summary && customData.summary && (
        <section className="mb-10 text-center px-10">
          <p className="text-sm leading-relaxed text-gray-600 italic">"{customData.summary}"</p>
        </section>
      )}

      <div className="ml-4">
        {visibility.experience && experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest mb-6 text-gray-900 pl-6">Experience</h2>
            <div className={`border-l-2 ${tColor.border} space-y-8 pb-4`}>
              {experience.map((exp: any, idx: number) => (
                <div key={idx} className="relative pl-8">
                  <div className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-white border-2 ${tColor.border}`}></div>
                  <h3 className="text-base font-bold text-gray-900">{exp.role}</h3>
                  <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">{exp.org} | {exp.time}</div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{exp.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {visibility.education && education?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest mb-6 text-gray-900 pl-6">Education</h2>
            <div className={`border-l-2 ${tColor.border} space-y-6 pb-4`}>
              {education.map((edu: any, idx: number) => (
                <div key={idx} className="relative pl-8">
                  <div className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-white border-2 ${tColor.border}`}></div>
                  <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                  <div className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">{edu.school} | {edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="grid grid-cols-2 gap-8 ml-10 mt-8">
        {visibility.skills && customData.skills && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-900">Skills</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{customData.skills}</p>
          </section>
        )}
        {visibility.certifications && certifications?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-900">Certifications</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              {certifications.map((cert: any, idx: number) => (
                <li key={idx}><strong>{cert.name}</strong> ({cert.year})</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );

  // =========================================================================
  // TEMPLATE 7: DUAL COLUMN SPLIT (Centered Header, 50/50 vertical split)
  // =========================================================================
  const renderAcademicSplit = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-900 font-serif p-14 shrink-0 shadow-2xl">
      {visibility.personal && (
        <header className="mb-8 text-center pb-8 border-b border-gray-300">
          <h1 className={`text-4xl font-black uppercase tracking-widest mb-2 ${tColor.text}`}>{personal?.name || "YOUR NAME"}</h1>
          <p className="text-sm tracking-widest uppercase mb-4 text-gray-600">{personal?.title || "TITLE"}</p>
          <p className="text-xs font-sans text-gray-500">
            {[personal?.email, personal?.phone, personal?.location, socials?.linkedin].filter(Boolean).join(" • ")}
          </p>
        </header>
      )}

      {visibility.summary && customData.summary && (
        <section className="mb-8 px-4 text-center">
          <p className="text-sm leading-relaxed text-gray-700">{customData.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-8">
          {visibility.experience && experience?.length > 0 && (
            <section>
              <h2 className={`text-base font-bold uppercase tracking-widest mb-4 border-b pb-1 ${tColor.border}`}>Experience</h2>
              <div className="space-y-6">
                {experience.map((exp: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-base font-bold text-black">{exp.role}</h3>
                    <p className="text-xs font-sans text-gray-500 mb-2">{exp.org} | {exp.time}</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {visibility.projects && projects?.length > 0 && (
            <section>
              <h2 className={`text-base font-bold uppercase tracking-widest mb-4 border-b pb-1 ${tColor.border}`}>Projects</h2>
              <div className="space-y-4">
                {projects.map((proj: any, idx: number) => (
                  <div key={idx}>
                    <strong className="block text-sm">{proj.name}</strong>
                    <span className="text-sm text-gray-600">{proj.outcome}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-8">
          {visibility.education && education?.length > 0 && (
            <section>
              <h2 className={`text-base font-bold uppercase tracking-widest mb-4 border-b pb-1 ${tColor.border}`}>Education</h2>
              <div className="space-y-4">
                {education.map((edu: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-base font-bold text-black">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">{edu.school}</p>
                    <p className="text-xs font-sans text-gray-500 mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {visibility.skills && customData.skills && (
            <section>
              <h2 className={`text-base font-bold uppercase tracking-widest mb-4 border-b pb-1 ${tColor.border}`}>Skills & Abilities</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {customData.skills.split(',').map((skill, i) => (
                  <li key={i}>{skill.trim()}</li>
                ))}
              </ul>
            </section>
          )}
          {visibility.certifications && certifications?.length > 0 && (
            <section>
              <h2 className={`text-base font-bold uppercase tracking-widest mb-4 border-b pb-1 ${tColor.border}`}>Certifications</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {certifications.map((cert: any, idx: number) => (
                  <li key={idx}>{cert.name} - {cert.issuer}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // TEMPLATE 8: BOLD BLOCK (Solid background bars for section headers)
  // =========================================================================
  const renderBoldBlock = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-800 font-sans p-0 shrink-0 shadow-2xl overflow-hidden">
      {visibility.personal && (
        <header className={`${tColor.lightBg} p-12 pb-10 border-b-4 ${tColor.border}`}>
          <h1 className={`text-5xl font-black tracking-tighter uppercase mb-2 ${tColor.text}`}>{personal?.name || "YOUR NAME"}</h1>
          <p className="text-lg font-bold uppercase tracking-widest text-slate-700 mb-4">{personal?.title || "TITLE"}</p>
          <div className="flex gap-6 text-sm font-semibold text-slate-600">
            {personal?.email && <span>{personal.email}</span>}
            {personal?.phone && <span>{personal.phone}</span>}
            {personal?.location && <span>{personal.location}</span>}
          </div>
        </header>
      )}

      <div className="p-12 space-y-8">
        {visibility.summary && customData.summary && (
          <section>
            <h2 className={`text-sm font-black uppercase tracking-widest text-white px-4 py-1.5 inline-block mb-4 ${tColor.bg}`}>Profile Statement</h2>
            <p className="text-sm leading-relaxed text-slate-700 font-medium">{customData.summary}</p>
          </section>
        )}

        {visibility.experience && experience?.length > 0 && (
          <section>
            <h2 className={`text-sm font-black uppercase tracking-widest text-white px-4 py-1.5 block w-full mb-6 ${tColor.bg}`}>Professional History</h2>
            <div className="space-y-6 pl-4">
              {experience.map((exp: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-sm font-black text-slate-400">{exp.time}</span>
                  </div>
                  <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${tColor.text}`}>{exp.org}</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{exp.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          <div>
            {visibility.education && education?.length > 0 && (
              <section className="mb-8">
                <h2 className={`text-sm font-black uppercase tracking-widest text-white px-4 py-1.5 block w-full mb-4 ${tColor.bg}`}>Education</h2>
                <div className="space-y-4 pl-4">
                  {education.map((edu: any, idx: number) => (
                    <div key={idx}>
                      <h3 className="text-base font-bold text-slate-900">{edu.degree}</h3>
                      <p className="text-sm text-slate-600">{edu.school}</p>
                      <p className={`text-xs font-bold mt-1 ${tColor.text}`}>{edu.year}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div>
            {visibility.skills && customData.skills && (
              <section className="mb-8">
                <h2 className={`text-sm font-black uppercase tracking-widest text-white px-4 py-1.5 block w-full mb-4 ${tColor.bg}`}>Skills</h2>
                <div className="flex flex-wrap gap-2 pl-4">
                  {customData.skills.split(',').map((skill, i) => (
                    <span key={i} className={`px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-700 border-l-2 ${tColor.border}`}>{skill.trim()}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
// =========================================================================
  // 9. THE CONSULTING CLASSIC (McKinsey / BCG Style - Strict, Dense, Serif)
  // =========================================================================
  const renderConsulting = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-black font-serif p-[1in] shrink-0 shadow-2xl box-border">
      {visibility.personal && (
        <header className="text-center mb-6">
          <h1 className="text-[28px] font-bold uppercase tracking-wide mb-1">{personal?.name || "YOUR NAME"}</h1>
          <div className="text-[11px] mb-2">{personal?.title || "TITLE"}</div>
          <div className="text-[11px] flex justify-center gap-3">
            {[personal?.email, personal?.phone, personal?.location, socials?.linkedin].filter(Boolean).join(" • ")}
          </div>
        </header>
      )}
      {visibility.summary && customData.summary && (
        <section className="mb-4 text-[11px] leading-relaxed text-justify">{customData.summary}</section>
      )}
      {visibility.experience && experience?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[13px] font-bold uppercase border-b-[1.5px] border-black pb-0.5 mb-2">Experience</h2>
          {experience.map((exp: any, idx: number) => (
            <div key={idx} className="mb-3 text-[11px]">
              <div className="flex justify-between font-bold">
                <span>{exp.org} <span className="font-normal italic">| {exp.role}</span></span>
                <span>{exp.time}</span>
              </div>
              <p className="mt-1 leading-snug">{exp.desc}</p>
            </div>
          ))}
        </section>
      )}
      {visibility.education && education?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[13px] font-bold uppercase border-b-[1.5px] border-black pb-0.5 mb-2">Education</h2>
          {education.map((edu: any, idx: number) => (
            <div key={idx} className="flex justify-between text-[11px] mb-1">
              <span className="font-bold">{edu.school} <span className="font-normal italic">- {edu.degree}</span></span>
              <span className="font-bold">{edu.year}</span>
            </div>
          ))}
        </section>
      )}
      {visibility.projects && projects?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[13px] font-bold uppercase border-b-[1.5px] border-black pb-0.5 mb-2">Selected Projects</h2>
          {projects.map((proj: any, idx: number) => (
            <div key={idx} className="text-[11px] mb-1"><strong className="italic">{proj.name}:</strong> {proj.outcome}</div>
          ))}
        </section>
      )}
      {visibility.skills && customData.skills && (
        <section>
          <h2 className="text-[13px] font-bold uppercase border-b-[1.5px] border-black pb-0.5 mb-2">Skills & Certifications</h2>
          <p className="text-[11px]"><strong>Core Competencies:</strong> {customData.skills}</p>
        </section>
      )}
    </div>
  );

  // =========================================================================
  // 10. THE SILICON VALLEY (FAANG Engineer - Clean Sans, Skills Up Top)
  // =========================================================================
  const renderSiliconValley = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-900 font-sans p-14 shrink-0 shadow-2xl">
      {visibility.personal && (
        <header className="mb-6 flex justify-between items-end border-b-2 border-slate-200 pb-4">
          <div>
            <h1 className={`text-4xl font-black tracking-tight ${tColor.text}`}>{personal?.name || "YOUR NAME"}</h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">{personal?.title || "TITLE"}</p>
          </div>
          <div className="text-right text-xs font-medium text-slate-500 space-y-0.5">
            <div>{personal?.email}</div>
            <div>{personal?.phone}</div>
            <div>{socials?.linkedin}</div>
          </div>
        </header>
      )}
      {visibility.skills && customData.skills && (
        <section className="mb-6">
          <p className="text-sm font-semibold leading-relaxed text-slate-700">
            <span className={`uppercase font-black text-xs tracking-widest mr-2 ${tColor.text}`}>Tech Stack:</span> 
            {customData.skills}
          </p>
        </section>
      )}
      {visibility.experience && experience?.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-sm font-black uppercase tracking-widest mb-4 ${tColor.text}`}>Experience</h2>
          <div className="space-y-5">
            {experience.map((exp: any, idx: number) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-xs font-bold text-slate-400">{exp.time}</span>
                </div>
                <div className="text-sm font-bold text-slate-600 mb-2">{exp.org}</div>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="grid grid-cols-2 gap-8">
        {visibility.projects && projects?.length > 0 && (
          <section>
            <h2 className={`text-sm font-black uppercase tracking-widest mb-3 ${tColor.text}`}>Projects</h2>
            <div className="space-y-3">
              {projects.map((proj: any, idx: number) => (
                <div key={idx} className="text-sm">
                  <strong className="block text-slate-900">{proj.name}</strong>
                  <span className="text-slate-600">{proj.outcome}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        {visibility.education && education?.length > 0 && (
          <section>
            <h2 className={`text-sm font-black uppercase tracking-widest mb-3 ${tColor.text}`}>Education</h2>
            <div className="space-y-3">
              {education.map((edu: any, idx: number) => (
                <div key={idx} className="text-sm">
                  <strong className="block text-slate-900">{edu.degree}</strong>
                  <span className="text-slate-600 block">{edu.school}</span>
                  <span className="text-xs text-slate-400 font-bold">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  // =========================================================================
  // 11. THE INVESTMENT BANKER (Ultra-conservative, Times New Roman, Right Aligned)
  // =========================================================================
  const renderBanking = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-black font-serif p-[0.75in] shrink-0 shadow-2xl">
      {visibility.personal && (
        <header className="text-center mb-5 border-b border-black pb-3">
          <h1 className="text-2xl font-bold uppercase">{personal?.name || "YOUR NAME"}</h1>
          <p className="text-xs mt-1">{[personal?.location, personal?.phone, personal?.email, socials?.linkedin].filter(Boolean).join(" | ")}</p>
        </header>
      )}
      {visibility.education && education?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[12px] font-bold uppercase border-b border-black mb-2 pb-0.5">Education</h2>
          {education.map((edu: any, idx: number) => (
            <div key={idx} className="text-[11px] mb-2">
              <div className="flex justify-between font-bold">
                <span>{edu.school}</span>
                <span>{edu.year}</span>
              </div>
              <div className="italic">{edu.degree}</div>
            </div>
          ))}
        </section>
      )}
      {visibility.experience && experience?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[12px] font-bold uppercase border-b border-black mb-2 pb-0.5">Professional Experience</h2>
          {experience.map((exp: any, idx: number) => (
            <div key={idx} className="text-[11px] mb-3">
              <div className="flex justify-between font-bold">
                <span>{exp.org}</span>
                <span>{exp.time}</span>
              </div>
              <div className="italic mb-1">{exp.role}</div>
              <p className="leading-snug">{exp.desc}</p>
            </div>
          ))}
        </section>
      )}
      {visibility.skills && customData.skills && (
        <section className="mb-4">
          <h2 className="text-[12px] font-bold uppercase border-b border-black mb-2 pb-0.5">Skills, Activities & Interests</h2>
          <p className="text-[11px]"><strong>Technical Skills:</strong> {customData.skills}</p>
        </section>
      )}
    </div>
  );

  // =========================================================================
  // 12. THE MODERN EXECUTIVE (Bold, High Contrast, Authoritative)
  // =========================================================================
  const renderModernExecutive = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-900 font-sans p-0 shrink-0 shadow-2xl flex flex-col">
      {visibility.personal && (
        <header className={`${tColor.bg} text-white p-12 pb-10`}>
          <h1 className="text-5xl font-black uppercase tracking-widest mb-2">{personal?.name || "YOUR NAME"}</h1>
          <p className="text-lg font-medium opacity-90 tracking-widest uppercase mb-4">{personal?.title || "TITLE"}</p>
          <div className="flex gap-6 text-sm opacity-75 font-medium">
            {personal?.email && <span>{personal.email}</span>}
            {personal?.phone && <span>{personal.phone}</span>}
            {personal?.location && <span>{personal.location}</span>}
          </div>
        </header>
      )}
      <div className="p-12 flex-1">
        {visibility.summary && customData.summary && (
          <section className="mb-10 text-lg font-medium leading-relaxed text-slate-700">
            {customData.summary}
          </section>
        )}
        {visibility.experience && experience?.length > 0 && (
          <section className="mb-10">
            <h2 className={`text-xl font-black uppercase tracking-widest border-b-2 ${tColor.border} pb-2 mb-6`}>Career History</h2>
            <div className="space-y-8">
              {experience.map((exp: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-1">
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <span className={`text-sm font-bold ${tColor.text}`}>{exp.time}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">{exp.org}</div>
                  <p className="text-sm text-slate-700 leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <div className="grid grid-cols-2 gap-10">
          {visibility.education && education?.length > 0 && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest border-b-2 ${tColor.border} pb-2 mb-4`}>Education</h2>
              {education.map((edu: any, idx: number) => (
                <div key={idx} className="mb-3">
                  <h3 className="text-base font-bold">{edu.degree}</h3>
                  <p className="text-sm text-slate-600">{edu.school}</p>
                </div>
              ))}
            </section>
          )}
          {visibility.skills && customData.skills && (
            <section>
              <h2 className={`text-sm font-black uppercase tracking-widest border-b-2 ${tColor.border} pb-2 mb-4`}>Expertise</h2>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">{customData.skills}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // 13. THE PRODUCT LEADER (70/30 Split, Focus on Metrics and Outcomes)
  // =========================================================================
  const renderProductLeader = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-800 font-sans p-12 shrink-0 shadow-2xl flex flex-col">
      {visibility.personal && (
        <header className="mb-8 border-b border-slate-200 pb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-1">{personal?.name || "YOUR NAME"}</h1>
            <p className={`text-base font-bold uppercase tracking-widest ${tColor.text}`}>{personal?.title || "TITLE"}</p>
          </div>
          <div className="text-right text-xs text-slate-500 space-y-1">
            <p>{personal?.email}</p>
            <p>{personal?.phone}</p>
            <p>{socials?.linkedin}</p>
          </div>
        </header>
      )}
      <div className="flex gap-10">
        <div className="flex-[3]">
          {visibility.summary && customData.summary && (
            <section className="mb-8">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Profile</h2>
              <p className="text-sm leading-relaxed font-medium">{customData.summary}</p>
            </section>
          )}
          {visibility.experience && experience?.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                    <div className="flex gap-2 text-xs font-bold text-slate-500 mb-2">
                      <span>{exp.org}</span> • <span>{exp.time}</span>
                    </div>
                    <p className="text-sm text-slate-600">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="flex-[1] space-y-8">
          {visibility.skills && customData.skills && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Skills</h2>
              <div className="flex flex-col gap-2">
                {customData.skills.split(',').map((s, i) => (
                  <span key={i} className={`text-xs font-bold px-2 py-1 rounded ${tColor.lightBg} ${tColor.text}`}>{s.trim()}</span>
                ))}
              </div>
            </section>
          )}
          {visibility.education && education?.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Education</h2>
              <div className="space-y-4">
                {education.map((edu: any, idx: number) => (
                  <div key={idx} className="text-sm">
                    <strong className="block text-slate-900 leading-tight">{edu.degree}</strong>
                    <span className="text-xs text-slate-500">{edu.school}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // 14. THE CREATIVE AGENCY (Bold Typography, Left Color Ribbon)
  // =========================================================================
  const renderCreativeAgency = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-900 font-sans shrink-0 shadow-2xl relative">
      <div className={`absolute left-0 top-0 bottom-0 w-8 ${tColor.bg}`}></div>
      <div className="pl-20 pr-12 py-16">
        {visibility.personal && (
          <header className="mb-10">
            <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-3">{personal?.name || "YOUR NAME"}</h1>
            <p className={`text-xl font-bold uppercase tracking-widest ${tColor.text} mb-4`}>{personal?.title || "TITLE"}</p>
            <div className="flex gap-4 text-xs font-bold text-slate-400">
              {personal?.email && <span>{personal.email}</span>}
              {personal?.phone && <span>{personal.phone}</span>}
            </div>
          </header>
        )}
        {visibility.summary && customData.summary && (
          <section className="mb-10">
            <p className="text-base font-medium leading-relaxed border-l-4 border-slate-200 pl-4">{customData.summary}</p>
          </section>
        )}
        {visibility.experience && experience?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-black mb-6">Experience.</h2>
            <div className="space-y-8">
              {experience.map((exp: any, idx: number) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">{exp.org} // {exp.time}</div>
                  <p className="text-sm text-slate-600">{exp.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <div className="grid grid-cols-2 gap-10">
          {visibility.skills && customData.skills && (
            <section>
              <h2 className="text-2xl font-black mb-4">Skills.</h2>
              <p className="text-sm font-bold text-slate-600 leading-relaxed">{customData.skills}</p>
            </section>
          )}
          {visibility.education && education?.length > 0 && (
            <section>
              <h2 className="text-2xl font-black mb-4">Education.</h2>
              {education.map((edu: any, idx: number) => (
                <div key={idx} className="mb-3">
                  <h3 className="text-base font-bold">{edu.degree}</h3>
                  <p className="text-sm text-slate-500">{edu.school}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // 15. THE DATA SCIENTIST (Highly structured, Mono accents, Grid layout)
  // =========================================================================
  const renderDataScientist = () => (
    <div className="w-[800px] min-h-[1131px] bg-slate-50 text-slate-800 font-sans p-12 shrink-0 shadow-2xl">
      <div className="bg-white border border-slate-200 p-10 h-full">
        {visibility.personal && (
          <header className="border-b-2 border-slate-800 pb-6 mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black uppercase">{personal?.name || "YOUR NAME"}</h1>
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mt-2">{personal?.title || "TITLE"}</p>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-500 space-y-1">
              <div>{personal?.email}</div>
              <div>{personal?.phone}</div>
              <div>{socials?.linkedin}</div>
            </div>
          </header>
        )}
        {visibility.skills && customData.skills && (
          <section className="mb-8 bg-slate-100 p-4 border border-slate-200">
            <h2 className="font-mono text-[10px] uppercase tracking-widest font-bold mb-2 text-slate-800">// CORE_STACK</h2>
            <p className="font-mono text-xs text-slate-600">{customData.skills}</p>
          </section>
        )}
        {visibility.experience && experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="font-mono text-[10px] uppercase tracking-widest font-bold mb-4 text-slate-800">// PROFESSIONAL_EXPERIENCE</h2>
            <div className="space-y-6">
              {experience.map((exp: any, idx: number) => (
                <div key={idx} className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 font-mono text-xs text-slate-500">
                    <div>{exp.time}</div>
                    <div className={`font-bold ${tColor.text}`}>{exp.org}</div>
                  </div>
                  <div className="col-span-3">
                    <h3 className="text-base font-bold text-slate-900 mb-1">{exp.role}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {visibility.education && education?.length > 0 && (
          <section>
            <h2 className="font-mono text-[10px] uppercase tracking-widest font-bold mb-4 text-slate-800">// ACADEMIC_BACKGROUND</h2>
            {education.map((edu: any, idx: number) => (
              <div key={idx} className="grid grid-cols-4 gap-4 mb-3">
                <div className="col-span-1 font-mono text-xs text-slate-500">{edu.year}</div>
                <div className="col-span-3">
                  <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-xs text-slate-600">{edu.school}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );

  // =========================================================================
  // 16. THE GROWTH MARKETER (Block Highlights, Vibrant, Sans-Serif)
  // =========================================================================
  const renderGrowthMarketer = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-800 font-sans p-14 shrink-0 shadow-2xl">
      {visibility.personal && (
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{personal?.name || "YOUR NAME"}</h1>
          <span className={`inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${tColor.lightBg} ${tColor.text}`}>
            {personal?.title || "TITLE"}
          </span>
          <div className="mt-4 flex justify-center gap-4 text-xs font-medium text-slate-500">
            {personal?.email && <span>{personal.email}</span>}
            {personal?.phone && <span>{personal.phone}</span>}
            {socials?.linkedin && <span>{socials.linkedin}</span>}
          </div>
        </header>
      )}
      {visibility.summary && customData.summary && (
        <section className={`p-6 rounded-2xl mb-8 text-sm font-medium leading-relaxed ${tColor.lightBg} ${tColor.text}`}>
          {customData.summary}
        </section>
      )}
      {visibility.experience && experience?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-black mb-5">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp: any, idx: number) => (
              <div key={idx} className="border-l-2 border-slate-100 pl-4">
                <h3 className="text-lg font-bold">{exp.role}</h3>
                <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${tColor.text}`}>{exp.org} • {exp.time}</div>
                <p className="text-sm text-slate-600">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="grid grid-cols-2 gap-8">
        {visibility.skills && customData.skills && (
          <section>
            <h2 className="text-lg font-black mb-3">Core Skills</h2>
            <ul className="text-sm text-slate-600 font-medium space-y-1">
              {customData.skills.split(',').map((skill, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${tColor.bg}`}></span> {skill.trim()}
                </li>
              ))}
            </ul>
          </section>
        )}
        {visibility.projects && projects?.length > 0 && (
          <section>
            <h2 className="text-lg font-black mb-3">Key Campaigns</h2>
            <div className="space-y-3">
              {projects.map((proj: any, idx: number) => (
                <div key={idx} className="text-sm">
                  <strong className="block">{proj.name}</strong>
                  <span className="text-slate-600">{proj.outcome}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  // =========================================================================
  // 17. THE ARCHITECT (Minimalist, Wide Tracking, Sophisticated Typography)
  // =========================================================================
  const renderArchitect = () => (
    <div className="w-[800px] min-h-[1131px] bg-[#fafafa] text-[#111] font-sans p-16 shrink-0 shadow-2xl">
      {visibility.personal && (
        <header className="mb-12">
          <h1 className="text-3xl font-light tracking-[0.2em] uppercase mb-2">{personal?.name || "YOUR NAME"}</h1>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-6">{personal?.title || "TITLE"}</p>
          <div className="text-[10px] tracking-widest uppercase text-gray-500 space-y-1">
            {personal?.email && <p>{personal.email}</p>}
            {personal?.phone && <p>{personal.phone}</p>}
          </div>
        </header>
      )}
      {visibility.summary && customData.summary && (
        <section className="mb-12">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 border-b border-gray-200 pb-2">Profile</h2>
          <p className="text-xs leading-loose font-medium text-gray-600 w-4/5">{customData.summary}</p>
        </section>
      )}
      {visibility.experience && experience?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 border-b border-gray-200 pb-2">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp: any, idx: number) => (
              <div key={idx} className="grid grid-cols-12 gap-6">
                <div className="col-span-3 text-[10px] font-bold tracking-widest uppercase text-gray-400 mt-1">
                  {exp.time}
                </div>
                <div className="col-span-9">
                  <h3 className="text-sm font-bold tracking-wide uppercase mb-1">{exp.role}</h3>
                  <p className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${tColor.text}`}>{exp.org}</p>
                  <p className="text-xs leading-relaxed text-gray-600">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {visibility.education && education?.length > 0 && (
        <section>
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 border-b border-gray-200 pb-2">Education</h2>
          <div className="space-y-6">
            {education.map((edu: any, idx: number) => (
              <div key={idx} className="grid grid-cols-12 gap-6">
                <div className="col-span-3 text-[10px] font-bold tracking-widest uppercase text-gray-400 mt-1">
                  {edu.year}
                </div>
                <div className="col-span-9">
                  <h3 className="text-sm font-bold tracking-wide uppercase mb-1">{edu.degree}</h3>
                  <p className="text-xs text-gray-500">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  // =========================================================================
  // 18. THE HYBRID GRID (Two Column Header, Three Column Body structure)
  // =========================================================================
  const renderHybridGrid = () => (
    <div className="w-[800px] min-h-[1131px] bg-white text-slate-800 font-sans p-12 shrink-0 shadow-2xl">
      {visibility.personal && (
        <header className="grid grid-cols-2 gap-8 items-end border-b-4 border-slate-900 pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-1">{personal?.name || "YOUR NAME"}</h1>
            <p className={`text-sm font-bold uppercase tracking-widest ${tColor.text}`}>{personal?.title || "TITLE"}</p>
          </div>
          <div className="text-right text-xs font-semibold text-slate-500 space-y-1">
            {personal?.email && <p>{personal.email}</p>}
            {personal?.phone && <p>{personal.phone}</p>}
            {personal?.location && <p>{personal.location}</p>}
          </div>
        </header>
      )}
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-8">
          {visibility.summary && customData.summary && (
            <section>
              <h2 className="text-lg font-black mb-2">Summary</h2>
              <p className="text-sm leading-relaxed text-slate-600">{customData.summary}</p>
            </section>
          )}
          {visibility.experience && experience?.length > 0 && (
            <section>
              <h2 className="text-lg font-black mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-base font-bold text-slate-900">{exp.role}</h3>
                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">{exp.org} | {exp.time}</div>
                    <p className="text-sm text-slate-600">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="col-span-1 space-y-8">
          {visibility.skills && customData.skills && (
            <section>
              <h2 className="text-lg font-black mb-3">Skills</h2>
              <ul className="space-y-2">
                {customData.skills.split(',').map((skill, i) => (
                  <li key={i} className="text-sm font-medium border-b border-slate-100 pb-1">{skill.trim()}</li>
                ))}
              </ul>
            </section>
          )}
          {visibility.education && education?.length > 0 && (
            <section>
              <h2 className="text-lg font-black mb-3">Education</h2>
              <div className="space-y-4">
                {education.map((edu: any, idx: number) => (
                  <div key={idx}>
                    <strong className="block text-sm">{edu.degree}</strong>
                    <span className="text-xs text-slate-500 block">{edu.school}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest mt-1 ${tColor.text}`}>{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // RENDER ENGINE ROUTER
  // =========================================================================
  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'executive': return renderExecutive();
      case 'modern': return renderModernSplit();
      case 'tech': return renderTechMinimalist();
      case 'corporate': return renderCorporateClassic();
      case 'creative': return renderCreativeRight();
      case 'timeline': return renderSleekTimeline();
      case 'academic': return renderAcademicSplit();
      case 'block': return renderBoldBlock();
      case 'consulting': return renderConsulting();
      case 'silicon-valley': return renderSiliconValley();
      case 'banking': return renderBanking();
      case 'modern-exec': return renderModernExecutive();
      case 'product-leader': return renderProductLeader();
      case 'agency': return renderCreativeAgency();
      case 'data-scientist': return renderDataScientist();
      case 'growth': return renderGrowthMarketer();
      case 'architect': return renderArchitect();
      case 'hybrid': return renderHybridGrid();
      default: return renderExecutive();
    }
  };

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-10 px-6 font-sans selection:bg-cyan-500/30">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-120px)]">
        
        {/* --- CONTROLS SIDEBAR --- */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-hidden">
          
          <div className="flex-1 bg-zinc-900 border border-white/5 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-widest text-white">Document Engine</h2>
              </div>
              
              {/* Architecture & Color Engine */}
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 mb-4">
                    <Palette size={12} /> Color Palette Engine
                  </span>
                  <div className="flex gap-4">
                    {Object.entries(themeColors).map(([name, data]) => (
                      <button
                        key={name}
                        onClick={() => setActiveColor(name)}
                        className={`group flex overflow-hidden rounded-full w-8 h-8 transition-all border-2 ${activeColor === name ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        title={name}
                      >
                        <div className="w-1/3 h-full" style={{ backgroundColor: data.primary }} />
                        <div className="w-1/3 h-full" style={{ backgroundColor: data.secondary }} />
                        <div className="w-1/3 h-full" style={{ backgroundColor: data.accent }} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Component List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
              {sidebarSections.map((section) => (
                <div key={section.id} className="border border-white/5 bg-zinc-950 rounded-xl overflow-hidden transition-all">
                  <div 
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {section.isMaster ? <Lock size={14} className="text-emerald-500" /> : <Edit3 size={14} className="text-cyan-400" />}
                      <span className={`text-sm font-bold ${!visibility[section.id] && 'text-zinc-600 line-through'}`}>
                        {section.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={(e) => toggleVisibility(section.id, e)} className="text-zinc-500 hover:text-white transition-colors">
                        {visibility[section.id] ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      {expandedSection === section.id ? <ChevronUp size={16} className="text-zinc-600"/> : <ChevronDown size={16} className="text-zinc-600"/>}
                    </div>
                  </div>

                  {expandedSection === section.id && (
                    <div className="p-4 pt-0 border-t border-white/5 bg-zinc-900/50">
                      {section.isMaster ? (
                        <div className="mt-4 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3">
                            To update marked sections, go to the Profile Builder.
                          </p>
                          <Link href="/profile-builder" className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors rounded text-xs font-bold">
                            <LinkIcon size={12} /> Open Profile Builder
                          </Link>
                        </div>
                      ) : (
                        <div className="mt-4 space-y-3">
                          {section.id === 'summary' && (
                            <textarea 
                              value={customData.summary}
                              onChange={(e) => setCustomData({...customData, summary: e.target.value})}
                              className="w-full bg-zinc-950 border border-white/10 rounded-lg p-3 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500 min-h-[100px]"
                            />
                          )}
                          {section.id === 'skills' && (
                            <textarea 
                              value={customData.skills}
                              onChange={(e) => setCustomData({...customData, skills: e.target.value})}
                              className="w-full bg-zinc-950 border border-white/10 rounded-lg p-3 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500 min-h-[80px]"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleExportPDF}
            className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>

        {/* --- A4 DOCUMENT PREVIEW --- */}
        <div className="lg:col-span-8 bg-zinc-900/50 rounded-[3rem] border border-white/5 p-8 flex flex-col items-center overflow-y-auto custom-scrollbar relative">
          
          {/* FLOATING TEMPLATE CAROUSEL */}
          <div className="sticky top-0 z-50 mb-10 w-full max-w-[700px] flex items-center justify-between bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-4 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] shrink-0">
            <button onClick={prevSlide} className="p-2.5 hover:bg-white/10 rounded-full transition-all text-zinc-400 hover:text-white">
              <ArrowLeft size={18} />
            </button>

            <div className="flex gap-3 overflow-hidden">
              {ALL_TEMPLATES.slice(carouselIndex, carouselIndex + 3).map((tpl) => (
                <button 
                  key={tpl}
                  onClick={() => setActiveTemplate(tpl)}
                  className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all whitespace-nowrap border
                    ${activeTemplate === tpl 
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                      : 'bg-transparent text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-white/5'}`}
                >
                  {tpl.replace('-', ' ')}
                </button>
              ))}
            </div>

            <button onClick={nextSlide} className="p-2.5 hover:bg-white/10 rounded-full transition-all text-zinc-400 hover:text-white rotate-180">
              <ArrowLeft size={18} />
            </button>
          </div>

          {/* SINGLE CV DOCUMENT CONTAINER */}
          <div id="cv-document" className="transition-all duration-500 ease-in-out shadow-2xl">
             {renderTemplate()} 
          </div>

        </div>
      </div>
    </div>
  );
}