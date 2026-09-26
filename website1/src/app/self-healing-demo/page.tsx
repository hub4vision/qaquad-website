"use client";

import React, { useState, useEffect } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Bot, AlertTriangle, CheckCircle2, RotateCcw, XCircle, Code, Eye, ArrowRight } from 'lucide-react';

export default function SelfHealingDemoPage() {
  const [testState, setTestState] = useState<'idle' | 'running_traditional' | 'failed_traditional' | 'running_ai' | 'passed_ai'>('idle');
  const [buttonId, setButtonId] = useState('checkout-btn-v1');

  const simulateChange = () => {
    setButtonId(`checkout-btn-${Math.random().toString(36).substring(2, 7)}`);
    setTestState('idle');
  };

  const runTraditional = () => {
    setTestState('running_traditional');
    setTimeout(() => {
      // Traditional test fails because it hardcoded 'checkout-btn-v1'
      if (buttonId === 'checkout-btn-v1') {
        setTestState('idle');
        alert("Wait, it passed because the ID didn't change! Click 'Simulate Dev Change' first.");
      } else {
        setTestState('failed_traditional');
      }
    }, 1500);
  };

  const runAi = () => {
    setTestState('running_ai');
    setTimeout(() => {
      // AI test always passes by healing
      setTestState('passed_ai');
    }, 2500);
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-900 text-slate-200">
      <Section>
        <div className="text-center mb-12">
          <SectionHeading
            title="Self-Healing Locator Simulator"
            description="Watch how QA Quad's AI agent handles dynamic DOM changes that break traditional automation."
            align="center"
          />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Simulated App UI */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Eye className="text-blue-400" /> Simulated App UI
            </h3>
            
            <div className="bg-white p-8 rounded-xl flex items-center justify-center min-h-[200px]">
              <button 
                id={buttonId}
                className="bg-emerald-500 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:bg-emerald-600 transition-all text-xl"
              >
                Checkout Now
              </button>
            </div>

            <div className="mt-6 p-4 bg-slate-900 rounded-lg text-sm font-mono flex items-center justify-between border border-slate-700">
              <div>
                <span className="text-slate-400">Current DOM ID: </span>
                <span className="text-emerald-400">#{buttonId}</span>
              </div>
              <button 
                onClick={simulateChange}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-bold bg-blue-400/10 px-3 py-1.5 rounded-md"
              >
                <RotateCcw size={16} /> Simulate Dev Change
              </button>
            </div>
            
            {(testState === 'running_traditional' || testState === 'running_ai') && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 flex flex-col items-center shadow-2xl">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                  <p className="font-bold text-white">Executing Test...</p>
                  <p className="text-sm text-slate-400">Scanning DOM...</p>
                </div>
              </div>
            )}
          </div>

          {/* Test Runners */}
          <div className="space-y-6">
            
            {/* Traditional Runner */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code className="text-slate-400" /> Traditional Selenium/Cypress
                </h3>
                <button 
                  onClick={runTraditional}
                  disabled={testState !== 'idle'}
                  className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                >
                  Run Script
                </button>
              </div>
              <pre className="bg-slate-900 p-4 rounded-lg text-xs font-mono text-slate-400 border border-slate-800">
{`// Hardcoded Locator
await page.click('#checkout-btn-v1');`}
              </pre>
              
              {testState === 'failed_traditional' && (
                <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg animate-in fade-in flex gap-3">
                  <XCircle className="text-rose-500 shrink-0" />
                  <div>
                    <p className="font-bold text-rose-500">Test Failed (Timeout)</p>
                    <p className="text-xs text-rose-400/80 mt-1">Error: Locator not found: #checkout-btn-v1. Element is detached from DOM or ID changed.</p>
                  </div>
                </div>
              )}
            </div>

            {/* AI Runner */}
            <div className="bg-indigo-900/50 p-6 rounded-2xl border border-indigo-500/50 shadow-[0_0_30px_rgba(79,70,229,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                 <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">AI Powered</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bot className="text-indigo-400" /> QA Quad AI Agent
                </h3>
                <button 
                  onClick={runAi}
                  disabled={testState !== 'idle' && testState !== 'failed_traditional'}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-500/25"
                >
                  Run Smart Script
                </button>
              </div>
              <pre className="bg-slate-900/80 p-4 rounded-lg text-xs font-mono text-indigo-300 border border-indigo-900/50">
{`// Semantic Locator
await agent.click('Checkout button');`}
              </pre>
              
              {testState === 'passed_ai' && (
                <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex gap-3 mb-2">
                    <CheckCircle2 className="text-emerald-500 shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-500">Test Passed!</p>
                      <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                        <AlertTriangle size={12} /> Auto-healed: '#checkout-btn-v1' not found.
                      </p>
                    </div>
                  </div>
                  <div className="pl-9 space-y-1 text-[11px] font-mono text-emerald-600/70">
                    <p>➔ Analyzing DOM geometry...</p>
                    <p>➔ Found element matching text "Checkout Now" [Score: 0.98]</p>
                    <p>➔ Updating locator pointer to #{buttonId}</p>
                    <p>➔ Click successful.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* CTA Section */}
        {testState === 'passed_ai' && (
          <div className="mt-12 bg-indigo-900/40 border border-indigo-500/30 p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 animate-in fade-in zoom-in duration-500">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Stop Maintaining Brittle Tests</h3>
              <p className="text-indigo-200">Deploy QA Quad's self-healing agents in your CI/CD pipeline today.</p>
            </div>
            <a 
              href="/contact"
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
            >
              See a Live Demo <ArrowRight size={20} />
            </a>
          </div>
        )}
      </Section>
    </main>
  );
}
