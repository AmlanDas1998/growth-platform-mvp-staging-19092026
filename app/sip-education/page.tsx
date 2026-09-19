"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  TrendingUp, ShieldCheck, Clock, DollarSign, 
  PieChart, BookOpen, AlertTriangle, CheckCircle2, 
  ChevronDown, ChevronRight, Calculator, ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

export default function SIPGuidePage() {
  // --- SCROLL PROGRESS INDICATOR ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- NAVIGATION SECTIONS ---
  const sections = [
    { id: "what-is-sip", title: "What is SIP?" },
    { id: "features", title: "Key Features" },
    { id: "how-it-works", title: "How it Works" },
    { id: "compounding", title: "Power of Compounding" },
    { id: "comparison", title: "SIP vs Lump Sum" },
    { id: "types", title: "Types of Funds" },
    { id: "risks", title: "Safety & Risks" },
    { id: "faq", title: "FAQs" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* SCROLL PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50" style={{ scaleX }} />

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 px-6 border-b border-white/5 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen size={14} /> Student Finance Academy
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8">
            Systematic Investment Plan <span className="text-zinc-500">(SIP)</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            The complete guide for <span className="text-white font-bold">Students & Young Professionals</span> to master wealth creation through disciplined investing.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">
        
        {/* --- LEFT: STICKY TABLE OF CONTENTS (Desktop) --- */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-32 space-y-2 border-l-2 border-white/5 pl-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6">Contents</h4>
            {sections.map((section) => (
              <button 
                key={section.id} 
                onClick={() => scrollToSection(section.id)}
                className="block text-sm text-zinc-500 hover:text-cyan-400 hover:translate-x-1 transition-all text-left py-1"
              >
                {section.title}
              </button>
            ))}
            <div className="pt-8">
              <button className="w-full py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-cyan-400 transition-colors">
                Start Investing
              </button>
            </div>
          </div>
        </aside>

        {/* --- RIGHT: MAIN CONTENT --- */}
        <main className="flex-1 space-y-24">

          {/* 1. WHAT IS SIP */}
          <section id="what-is-sip" className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-white">What is a Systematic Investment Plan?</h2>
            <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5 space-y-6">
              <p className="text-lg leading-relaxed">
                A <strong className="text-white">Systematic Investment Plan (SIP)</strong> is a disciplined way of investing a fixed amount of money at regular intervals — typically monthly — into a mutual fund scheme. Think of it as a <span className="text-cyan-400">Recurring Deposit (RD)</span> for the stock market, but with potentially higher returns.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="text-white font-bold mb-2">Not a Product</h4>
                  <p className="text-sm">SIP is not an investment product itself. It is a <em className="text-zinc-400">method</em> of investing in mutual funds.</p>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="text-white font-bold mb-2">Regulated by SEBI</h4>
                  <p className="text-sm">Managed by registered Asset Management Companies (AMCs) and regulated strictly by SEBI.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. KEY FEATURES */}
          <section id="features">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: DollarSign, title: "Affordable", desc: "Start with as low as ₹500/month." },
                { icon: Clock, title: "Automated", desc: "Auto-debit from bank on a fixed date." },
                { icon: TrendingUp, title: "Market Linked", desc: "High growth potential over long term." },
                { icon: ShieldCheck, title: "Flexible", desc: "Stop, pause, or increase anytime." },
                { icon: PieChart, title: "Disciplined", desc: "Builds financial habit early." },
                { icon: Calculator, title: "Compounding", desc: "Earn returns on your returns." }
              ].map((feat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-cyan-500/30 transition-colors">
                  <feat.icon className="text-cyan-400 mb-4" size={24} />
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-zinc-500">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. HOW IT WORKS & RCA */}
          <section id="how-it-works" className="space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">How SIP Works</h2>
              <ol className="relative border-l border-zinc-800 ml-4 space-y-8">
                <li className="pl-8 relative">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-zinc-800 border border-zinc-600" />
                  <h4 className="text-xl font-bold text-white">Auto-Debit</h4>
                  <p className="mt-2">Your bank account is debited on a specific date (e.g., 5th of every month).</p>
                </li>
                <li className="pl-8 relative">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-zinc-800 border border-zinc-600" />
                  <h4 className="text-xl font-bold text-white">Unit Purchase</h4>
                  <p className="mt-2">Money is used to buy Mutual Fund units at the current Net Asset Value (NAV).</p>
                </li>
                <li className="pl-8 relative">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  <h4 className="text-xl font-bold text-white">Rupee Cost Averaging</h4>
                  <p className="mt-2 text-zinc-400">
                    If markets fall, you buy <strong className="text-white">more units</strong>.<br/>
                    If markets rise, you buy <strong className="text-white">fewer units</strong>.<br/>
                    This averages out your purchase cost over time, reducing risk.
                  </p>
                </li>
              </ol>
            </div>
          </section>

          {/* 4. COMPOUNDING EXAMPLE */}
          <section id="compounding" className="p-10 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-white">The Power of Compounding</h2>
                <p>Starting early is your biggest advantage. Even small amounts can grow massively over time.</p>
                
                <div className="space-y-4 pt-4">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-sm uppercase tracking-widest">Monthly Investment</span>
                    <span className="font-mono text-xl text-white">₹5,000</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-sm uppercase tracking-widest">Duration</span>
                    <span className="font-mono text-xl text-white">20 Years</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-cyan-500/30">
                    <span className="text-sm uppercase tracking-widest text-cyan-400">Wealth Created</span>
                    <span className="font-mono text-2xl font-bold text-cyan-400">~ ₹49.95 Lakhs</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-600">*Assumed rate of return: 12% p.a.</p>
              </div>
              
              <div className="w-full md:w-1/2 p-8 bg-zinc-950 rounded-3xl border border-white/5 text-center">
                <h3 className="text-lg font-bold text-white mb-6">Why Start at 22 vs 30?</h3>
                <div className="flex justify-around items-end h-48 gap-4">
                  <div className="w-20 bg-zinc-800 rounded-t-xl relative group h-[60%]">
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs font-bold">Start 30</span>
                  </div>
                  <div className="w-20 bg-cyan-500 rounded-t-xl relative group h-[100%] shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-400">Start 22</span>
                  </div>
                </div>
                <p className="mt-6 text-sm text-zinc-400">Delaying by just 8 years can cost you <span className="text-white font-bold">over 50%</span> of your final corpus.</p>
              </div>
            </div>
          </section>

          {/* 5. COMPARISON TABLE */}
          <section id="comparison">
            <h2 className="text-3xl font-black text-white mb-8">SIP vs Lump Sum</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-zinc-500">Factor</th>
                    <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-cyan-400">SIP (Recommended)</th>
                    <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-white">Lump Sum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { factor: "Market Timing", sip: "Not Required", lump: "High Risk" },
                    { factor: "Volatility", sip: "Smoothed Out (Averaging)", lump: "Immediate Impact" },
                    { factor: "Capital Needed", sip: "Low (₹500+)", lump: "High Surplus" },
                    { factor: "Discipline", sip: "Automatic Habit", lump: "Manual Effort" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">{row.factor}</td>
                      <td className="py-4 px-6 text-cyan-300">{row.sip}</td>
                      <td className="py-4 px-6 text-zinc-500">{row.lump}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. FUND TYPES & GOALS */}
          <section id="types" className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Fund Types</h2>
              <ul className="space-y-4">
                {[
                  { name: "Equity Funds", desc: "High risk, high return. Best for long term (>5 years)." },
                  { name: "Debt Funds", desc: "Lower risk, stable returns. Good for short term." },
                  { name: "Hybrid Funds", desc: "Mix of equity and debt for balanced growth." },
                  { name: "Index Funds", desc: "Passive funds tracking Nifty/Sensex. Low cost." },
                  { name: "ELSS Funds", desc: "Tax-saving funds with 3-year lock-in." }
                ].map((fund, i) => (
                  <li key={i} className="group">
                    <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">{fund.name}</h4>
                    <p className="text-sm text-zinc-500">{fund.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Achievable Goals</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Higher Education", "International MBA", "Emergency Fund", "First Home", "World Travel", "Retirement"].map((goal, i) => (
                  <div key={i} className="p-4 border border-white/5 rounded-xl text-center hover:bg-white/5 transition-colors">
                    <span className="text-sm font-bold text-zinc-300">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. TAXATION & SAFETY */}
          <section id="risks" className="space-y-8">
            <div className="p-8 bg-rose-950/10 border border-rose-500/20 rounded-2xl">
              <h3 className="flex items-center gap-2 text-xl font-bold text-rose-400 mb-4">
                <AlertTriangle size={20} /> Risks & Safety
              </h3>
              <p className="mb-4">
                Mutual funds are <strong className="text-white">not guaranteed</strong>. Returns depend on market performance. SIP reduces risk through averaging but does not eliminate it. Always align investments with your risk appetite.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Taxation (Equity Funds)</h3>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li><strong className="text-white">STCG (Short Term):</strong> 15% if sold within 1 year.</li>
                <li><strong className="text-white">LTCG (Long Term):</strong> 10% on gains exceeding ₹1 Lakh if sold after 1 year.</li>
              </ul>
              <p className="text-xs text-zinc-600">Note: Tax laws differ for Debt funds and are subject to change.</p>
            </div>
          </section>

          {/* 8. FAQ SECTION */}
          <section id="faq" className="space-y-8">
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is SIP safe for beginners?", a: "Yes, it is the safest entry point as it minimizes the risk of timing the market wrong." },
                { q: "Can I stop my SIP anytime?", a: "Yes, there are no penalties for stopping a SIP in open-ended funds. You can pause or stop anytime." },
                { q: "What is the minimum amount?", a: "You can start with as little as ₹500 per month." },
                { q: "What if I miss a payment?", a: "Usually, the SIP for that month is skipped. Consecutive misses might cancel the mandate, but no penalty is charged by the fund house." },
                { q: "Better than Fixed Deposit (FD)?", a: "Potential returns are higher (10-15%) compared to FDs (6-7%), but SIPs carry market risk while FDs are guaranteed." },
              ].map((item, i) => (
                <details key={i} className="group p-6 bg-zinc-900 rounded-2xl border border-white/5 open:bg-zinc-800 transition-colors">
                  <summary className="flex justify-between items-center font-bold text-white cursor-pointer list-none">
                    {item.q}
                    <ChevronDown className="group-open:rotate-180 transition-transform" size={16} />
                  </summary>
                  <p className="mt-4 text-zinc-400 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* DISCLAIMER */}
          <footer className="pt-12 border-t border-white/10 text-[10px] text-zinc-600 text-justify leading-relaxed">
            <p className="uppercase font-bold mb-2 tracking-widest">Regulatory Disclaimer</p>
            Mutual Fund investments are subject to market risks, read all scheme related documents carefully. Past performance is not indicative of future returns. The information provided above is for educational purposes only and should not be considered as investment advice. Investors should assess their financial goals and risk appetite before investing.
          </footer>

        </main>
      </div>

      {/* CTA FOOTER */}
      <div className="sticky bottom-0 border-t border-white/10 bg-zinc-950/80 backdrop-blur-lg p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold">Ready to build wealth?</p>
            <p className="text-xs text-zinc-500">Start your journey with Avir Toya today.</p>
          </div>
          <button className="flex items-center gap-2 px-8 py-3 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-colors">
            Start SIP <ArrowRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}