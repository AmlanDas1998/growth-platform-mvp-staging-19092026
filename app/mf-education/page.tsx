"use client";
import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  PieChart, Users, TrendingUp, Shield, 
  Briefcase, DollarSign, Activity, AlertTriangle, 
  BookOpen, ChevronDown, Check, ArrowRight, X
} from 'lucide-react';

export default function MutualFundsPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* READING PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-50" style={{ scaleX }} />

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-24 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8">
            <BookOpen size={14} /> Student Finance Academy
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8">
            MUTUAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">FUNDS</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            The power of <span className="text-white font-bold">pooled capital</span>. Professional management, diversification, and wealth creation simplified for young investors.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">
        
        {/* --- LEFT: STICKY NAVIGATION --- */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-32 space-y-1 border-l-2 border-white/5 pl-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6">Acts & Chapters</h4>
            {[
              { id: "concept", label: "Act I: The Concept" },
              { id: "mechanics", label: "Act II: Mechanics" },
              { id: "student-edge", label: "Act III: Student Edge" },
              { id: "risk", label: "Act IV: Risk & Asset" },
              { id: "types", label: "Act V: Fund Types" },
              { id: "glossary", label: "Act VI: Key Terms" },
              { id: "faq", label: "FAQs" }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollTo(item.id)}
                className="block text-sm text-zinc-500 hover:text-indigo-400 hover:translate-x-1 transition-all text-left py-2 font-medium"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-10">
              <button className="w-full py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-900/20">
                Explore Funds
              </button>
            </div>
          </div>
        </aside>

        {/* --- RIGHT: MAIN NARRATIVE --- */}
        <main className="flex-1 space-y-32">

          {/* ACT I: THE CONCEPT */}
          <section id="concept" className="space-y-12">
            <div>
              <span className="text-indigo-500 font-mono text-sm tracking-widest mb-2 block">ACT I</span>
              <h2 className="text-4xl font-black text-white mb-6">The Concept</h2>
              <div className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-900 border border-white/5 relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                  <p className="text-xl leading-relaxed text-zinc-300">
                    A Mutual Fund is a vehicle that <strong className="text-white">pools money</strong> from multiple investors to buy a diversified portfolio of stocks, bonds, or securities. Instead of buying 1 stock with ₹1,000, you buy a "slice" of 50 companies.
                  </p>
                  
                  {/* Visual Metaphor Card */}
                  <div className="bg-black/40 rounded-2xl p-8 border border-white/5">
                    <h4 className="text-white font-bold mb-6 flex items-center gap-2"><Users size={18}/> The Power of Pooling</h4>
                    <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
                      <div className="text-center w-full md:w-1/3">
                        <div className="text-3xl font-black text-indigo-400 mb-2">10k</div>
                        <div className="text-zinc-500 uppercase tracking-wider text-xs">Students</div>
                      </div>
                      <div className="hidden md:block text-zinc-600">→</div>
                      <div className="text-center w-full md:w-1/3">
                        <div className="text-3xl font-black text-white mb-2">₹1 Cr</div>
                        <div className="text-zinc-500 uppercase tracking-wider text-xs">Pooled Capital</div>
                      </div>
                      <div className="hidden md:block text-zinc-600">→</div>
                      <div className="text-center w-full md:w-1/3">
                        <div className="text-3xl font-black text-emerald-400 mb-2">50+</div>
                        <div className="text-zinc-500 uppercase tracking-wider text-xs">Companies Owned</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ACT II: MECHANICS */}
          <section id="mechanics" className="space-y-12">
            <div>
              <span className="text-indigo-500 font-mono text-sm tracking-widest mb-2 block">ACT II</span>
              <h2 className="text-4xl font-black text-white mb-8">How It Works</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "1. The Pool", desc: "Investors contribute capital into one large corpus." },
                  { title: "2. The Manager", desc: "A professional fund manager analyzes macro conditions and picks the best assets." },
                  { title: "3. The NAV", desc: "Net Asset Value is the price of 1 unit. If Fund Value is ₹100Cr & Units are 10Cr, NAV = ₹10." },
                  { title: "4. The Returns", desc: "Generated via Capital Appreciation (Stock Price ↑) and Dividends." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-white/5 items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold text-sm border border-zinc-700">{i + 1}</span>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-sm text-zinc-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* NAV Calculation Visual */}
              <div className="mt-8 p-8 bg-indigo-900/10 border border-indigo-500/20 rounded-3xl text-center">
                <h4 className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-4">NAV Formula</h4>
                <div className="text-2xl md:text-3xl font-mono text-white">
                  (Assets - Liabilities) ÷ Total Units
                </div>
              </div>
            </div>
          </section>

          {/* ACT III: STUDENT ADVANTAGE */}
          <section id="student-edge" className="space-y-8">
            <span className="text-indigo-500 font-mono text-sm tracking-widest block">ACT III</span>
            <h2 className="text-4xl font-black text-white">Why It's For Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Low Barrier", text: "Start with ₹500. No need for lakhs.", icon: DollarSign },
                { title: "Expert Managed", text: "You study. Let experts manage money.", icon: Briefcase },
                { title: "Liquidity", text: "Withdraw anytime (mostly). No lock-in.", icon: Activity },
                { title: "Diversified", text: "Risk spread across 30-60 stocks.", icon: PieChart },
              ].map((card, i) => (
                <div key={i} className="p-8 bg-zinc-900 rounded-3xl border border-white/5 hover:bg-zinc-800/80 transition-colors">
                  <card.icon className="text-indigo-400 mb-4" size={28} />
                  <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ACT IV: RISK & ALLOCATION */}
          <section id="risk" className="space-y-8">
            <span className="text-indigo-500 font-mono text-sm tracking-widest block">ACT IV</span>
            <h2 className="text-4xl font-black text-white">Risk & Allocation</h2>
            
            {/* Comparison Table */}
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left bg-zinc-900">
                <thead className="bg-zinc-950">
                  <tr>
                    <th className="p-6 text-xs font-bold uppercase tracking-widest text-zinc-500">Feature</th>
                    <th className="p-6 text-xs font-bold uppercase tracking-widest text-indigo-400">Equity Funds</th>
                    <th className="p-6 text-xs font-bold uppercase tracking-widest text-emerald-400">Debt Funds</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="p-6 font-medium text-white">Invests In</td><td className="p-6 text-zinc-400">Stocks</td><td className="p-6 text-zinc-400">Bonds / Govt Securities</td></tr>
                  <tr><td className="p-6 font-medium text-white">Risk</td><td className="p-6 text-zinc-400">High Volatility</td><td className="p-6 text-zinc-400">Low to Moderate</td></tr>
                  <tr><td className="p-6 font-medium text-white">Horizon</td><td className="p-6 text-zinc-400">Long Term (5yr+)</td><td className="p-6 text-zinc-400">Short/Medium Term</td></tr>
                  <tr><td className="p-6 font-medium text-white">Best For</td><td className="p-6 text-zinc-400">Wealth Creation</td><td className="p-6 text-zinc-400">Stability & Income</td></tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-zinc-900/50 border-l-4 border-indigo-500 rounded-r-xl">
              <p className="text-sm text-zinc-300"><strong className="text-white">Pro Tip:</strong> Young investors (like students) usually allocate more to <span className="text-white">Equity</span> because they have time to ride out market volatility for higher gains.</p>
            </div>
          </section>

          {/* ACT V: TYPES OF FUNDS */}
          <section id="types">
            <span className="text-indigo-500 font-mono text-sm tracking-widest block mb-2">ACT V</span>
            <h2 className="text-4xl font-black text-white mb-10">Fund Universe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Equity Funds", sub: "High Risk • High Reward", desc: "Buys shares of companies. Best for 5+ year goals." },
                { name: "Debt Funds", sub: "Low Risk • Stable", desc: "Lends to govt/companies. Safer than stocks." },
                { name: "Hybrid Funds", sub: "Balanced", desc: "Mix of both equity and debt for stability + growth." },
                { name: "Index Funds", sub: "Passive • Low Cost", desc: "Simply copies the Nifty 50 or Sensex. No bias." },
              ].map((fund, i) => (
                <div key={i} className="p-8 border border-white/10 rounded-2xl hover:border-indigo-500 transition-colors group">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{fund.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4 block">{fund.sub}</span>
                  <p className="text-zinc-400">{fund.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ACT VI: GLOSSARY */}
          <section id="glossary">
            <span className="text-indigo-500 font-mono text-sm tracking-widest block mb-2">ACT VI</span>
            <h2 className="text-4xl font-black text-white mb-10">Investor's Dictionary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { term: "NAV", def: "Price per unit. Changes daily based on market." },
                { term: "AUM", def: "Total money managed by the fund house." },
                { term: "Expense Ratio", def: "Annual fee charged for management. Lower is better." },
                { term: "Exit Load", def: "Penalty for withdrawing money too early (usually <1yr)." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-zinc-950 rounded-xl border border-white/5">
                  <h4 className="text-lg font-bold text-white mb-2">{item.term}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.def}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ SECTION */}
          <section id="faq" className="space-y-8">
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Can I lose money in Mutual Funds?", a: "Yes. They are market-linked. However, long-term investing (5+ years) historically minimizes loss probability." },
                { q: "What is the minimum investment?", a: "For SIPs, usually ₹500/month. For lump sum, ₹1,000 or ₹5,000." },
                { q: "Can I withdraw anytime?", a: "Yes, for open-ended funds. Money hits your bank in 1-3 days. Exit loads may apply if withdrawn early." },
                { q: "Is it safe?", a: "Mutual Funds are strictly regulated by SEBI. Your money is held by independent custodians, not the fund manager." },
              ].map((faq, i) => (
                <details key={i} className="group p-6 bg-zinc-900 rounded-2xl border border-white/5 open:bg-zinc-800 transition-colors">
                  <summary className="flex justify-between items-center font-bold text-white cursor-pointer list-none">
                    {faq.q}
                    <ChevronDown className="group-open:rotate-180 transition-transform text-indigo-400" size={16} />
                  </summary>
                  <p className="mt-4 text-zinc-400 leading-relaxed text-sm">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* COMPLIANCE FOOTER */}
          <footer className="pt-12 border-t border-white/10 text-[10px] text-zinc-600 text-justify space-y-4">
            <div>
              <strong className="text-zinc-500 block mb-1">REGULATORY AUTHORITY</strong>
              Mutual funds in India are regulated by the Securities and Exchange Board of India (SEBI). All funds must adhere to strict transparency and investor protection norms.
            </div>
            <div>
              <strong className="text-zinc-500 block mb-1">RISK DISCLOSURE</strong>
              Mutual Fund investments are subject to market risks, read all scheme related documents carefully. Past performance is not indicative of future results. Investors should evaluate their financial goals and risk tolerance before investing.
            </div>
          </footer>

        </main>
      </div>

      {/* STICKY CTA */}
      <div className="sticky bottom-0 border-t border-white/10 bg-zinc-950/80 backdrop-blur-lg p-6 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold">Ready to start your journey?</p>
            <p className="text-xs text-zinc-500">Choose a fund suited for students.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-zinc-800 text-white font-bold uppercase text-xs tracking-widest rounded-full hover:bg-zinc-700 transition-colors">
              Compare Funds
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:bg-indigo-400 transition-colors">
              Start Investing <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}