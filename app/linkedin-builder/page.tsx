'use client';

import React, { useState } from 'react';

export default function LinkedInBuilderPage() {
  const [formData, setFormData] = useState({
    name: '',
    currentRole: '',
    targetRole: '',
    skills: '',
    experience: '',
  });

  const [generatedProfile, setGeneratedProfile] = useState<{
    headline: string;
    summary: string;
  } | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulating AI generation for the prototype (can be connected to an LLM API later)
    setTimeout(() => {
      setGeneratedProfile({
        headline: `${formData.targetRole || 'Finance & Growth Professional'} | Helping Clients Build Sustainable Wealth & Scale Ventures | Ex-${formData.currentRole || 'Industry Leader'}`,
        summary: `Results-driven professional transitioning into wealth management and financial advisory. Experienced in ${formData.skills || 'strategic planning, business development, and market analysis'}. Passionate about leveraging modern platforms to drive financial literacy and long-term capital growth. Background highlights: ${formData.experience || 'Demonstrated track record of scaling operations and executing high-impact financial initiatives.'}`,
      });
      setIsGenerating(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight mb-3">LinkedIn Profile Optimizer</h1>
          <p className="text-slate-400 text-lg">
            Craft a high-converting, professional LinkedIn headline and summary to attract premium clients and career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <form onSubmit={handleGenerate} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-slate-100 mb-2">Your Profile Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Amlan Das"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Current Role / Background</label>
              <input
                type="text"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                placeholder="e.g. Fintech Entrepreneur / Analyst"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Target Role or Niche</label>
              <input
                type="text"
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="e.g. Wealth Manager & Mutual Fund Distributor"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Key Skills (Comma separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. Portfolio Management, Financial Strategy"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Brief Career Highlights</label>
              <textarea
                name="experience"
                rows={3}
                value={formData.experience}
                onChange={handleChange}
                placeholder="Share a brief sentence about your key achievements..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
            >
              {isGenerating ? 'Generating Profile...' : 'Generate Optimized Profile →'}
            </button>
          </form>

          {/* Output Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-100 mb-4">Optimized LinkedIn Output</h2>
              {generatedProfile ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Suggested Headline</span>
                    <div className="mt-1.5 p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-sm font-medium">
                      {generatedProfile.headline}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Optimized About Summary</span>
                    <div className="mt-1.5 p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                      {generatedProfile.summary}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500 border border-dashed border-slate-800 rounded-lg p-6">
                  <p>Fill out the form on the left and click generate to build your custom LinkedIn profile assets.</p>
                </div>
              )}
            </div>

            {generatedProfile && (
              <button
                onClick={() => alert('Copied to clipboard!')}
                className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 rounded-lg transition text-sm"
              >
                Copy Content to Clipboard
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}