"use client";
import React, { useState } from 'react';
import { IndianRupee, TrendingUp, Calendar, Target, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function InvestmentCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  // Magic Math Logic
  const calculateWealth = () => {
    const i = (rate / 100) / 12;
    const n = years * 12;
    const totalValue = monthlyAmount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = monthlyAmount * n;
    return {
      total: Math.round(totalValue),
      invested: invested,
      gains: Math.round(totalValue - invested)
    };
  };

  const results = calculateWealth();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-black mb-8 transition-all">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <h1 className="text-4xl font-black text-slate-900 mb-2">Wealth Estimator 📈</h1>
        <p className="text-slate-500 mb-10">See how your money grows over time with smart investments.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: The Controls */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
            <div>
              <label className="flex justify-between text-sm font-bold mb-4">
                <span>Monthly Investment</span>
                <span className="text-blue-600 font-black text-lg">₹{monthlyAmount.toLocaleString('en-IN')}</span>
              </label>
              <input 
                type="range" min="500" max="100000" step="500" 
                value={monthlyAmount} onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-bold mb-4">
                <span>Time Period (Years)</span>
                <span className="text-blue-600 font-black text-lg">{years} Years</span>
              </label>
              <input 
                type="range" min="1" max="30" step="1" 
                value={years} onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-bold mb-4">
                <span>Expected Return (%)</span>
                <span className="text-blue-600 font-black text-lg">{rate}%</span>
              </label>
              <input 
                type="range" min="1" max="30" step="1" 
                value={rate} onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* RIGHT: The Results */}
          <div className="space-y-4">
            <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-200">
              <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-2">Estimated Total Wealth</p>
              <h2 className="text-5xl font-black italic">₹{results.total.toLocaleString('en-IN')}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Total Invested</p>
                <p className="text-xl font-bold text-slate-900">₹{results.invested.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Total Gains</p>
                <p className="text-xl font-bold text-emerald-500">₹{results.gains.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all mt-4">
              Start This Investment Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}<footer className="mt-12 pt-8 border-t border-slate-200 text-center">
  <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest font-bold">
    Disclaimer: Mutual Fund investments are subject to market risks. <br />
    Please read all scheme-related documents carefully before investing. 
    Built for the growth of users in Pune and beyond.
  </p>
</footer>