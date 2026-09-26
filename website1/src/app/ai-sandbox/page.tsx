"use client";

import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Play, Code, FileText, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

export default function AiSandboxPage() {
  const [prompt, setPrompt] = useState("Navigate to 'demo-store.example.com', add a 'Wireless Headphones' to the cart, apply promo code 'WELCOME20', and verify the total price updates correctly.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResults(null);
    
    try {
      const res = await fetch('/api/generate-tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.ok) {
        setResults(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50">
      <Section>
        <SectionHeading
          title="AI Test Case Generator Sandbox"
          description="Experience the QA Quad engine. Enter a user story or API spec and watch the AI instantly generate ready-to-run automation scripts and boundary tests."
          align="center"
        />

        <div className="max-w-5xl mx-auto mt-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <label className="block text-sm font-bold text-slate-700 mb-3">
              Enter User Story or Requirements:
            </label>
            <div className="flex gap-4 flex-col sm:flex-row">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 rounded-xl text-slate-900 border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px] resize-none"
                placeholder="e.g., Navigate to 'demo-store.example.com'..."
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 min-w-[200px]"
              >
                {isGenerating ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Play fill="currentColor" size={20} />
                    Generate Tests
                  </>
                )}
              </button>
            </div>
          </div>

          {results && (
            <div className="p-8 bg-slate-900 text-slate-300 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <FileText className="text-green-400" size={20} />
                  BDD / Gherkin Scenarios
                </h3>
                <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-green-300 border border-slate-800">
{results.bdd}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <Code className="text-blue-400" size={20} />
                  Playwright TypeScript (Self-Healing)
                </h3>
                <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-blue-300 border border-slate-800">
{results.playwright}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <CheckCircle2 className="text-yellow-400" size={20} />
                    Edge & Boundary Cases
                  </h3>
                  <ul className="space-y-2 text-sm bg-black/50 p-4 rounded-lg border border-slate-800 h-full">
                    {results.edgeCases.map((tc: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2"><span className="text-yellow-500">•</span> {tc}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <ShieldAlert className="text-rose-400" size={20} />
                    Security & Negative Tests
                  </h3>
                  <ul className="space-y-2 text-sm bg-black/50 p-4 rounded-lg border border-slate-800 h-full">
                    {results.securityCases.map((tc: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2"><span className="text-rose-500">•</span> {tc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800 text-center">
                <p className="text-slate-400 mb-6">Want to see QA Quad execute this test live on your application?</p>
                <a href="/contact" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all">
                  Run this Test on QA Quad <ArrowRight size={20} />
                </a>
              </div>

            </div>
          )}
        </div>
      </Section>
    </main>
  );
}
