'use client';

import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Bot, Code2, PenTool, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

type Stack = 'qaquad' | 'selenium' | 'cypress';

export default function StackComparisonPage() {
  const [selectedStack, setSelectedStack] = useState('qaquad');

  const comparisonData = {
    qaquad: {
      title: 'QA Quad (AI-Native)',
      icon: <Bot size={32} className="text-indigo-600" />,
      description: 'Autonomous AI agents that write, execute, and self-heal Playwright & Selenium tests.',
      metrics: {
        creation: 'Minutes',
        maintenance: 'Near Zero',
        flakiness: 'Low (Self-healing)',
        execution: 'High (Parallel)',
      },
      points: [
        'Generates tests from plain English',
        'Auto-heals broken locators on the fly',
        'Built-in API and Database validation',
        'Zero-setup CI/CD integration'
      ],
      color: 'border-indigo-500 bg-indigo-50'
    },
    cypress: {
      title: 'Cypress',
      icon: <Code2 size={32} className="text-emerald-600" />,
      description: 'Modern developer-focused testing framework, but requires heavy coding.',
      metrics: {
        creation: 'Days/Weeks',
        maintenance: 'High',
        flakiness: 'Medium',
        execution: 'Medium (Limited tabs)',
      },
      points: [
        'Requires strong JavaScript/TypeScript skills',
        'Tests break when UI IDs/Classes change',
        'Struggles with multi-tab or cross-domain flows',
        'Maintenance scales linearly with test count'
      ],
      color: 'border-emerald-500 bg-emerald-50'
    },
    selenium: {
      title: 'Selenium / Java',
      icon: <PenTool size={32} className="text-rose-600" />,
      description: 'Legacy standard. Powerful but extremely slow and brittle.',
      metrics: {
        creation: 'Weeks/Months',
        maintenance: 'Extreme',
        flakiness: 'Very High',
        execution: 'Slow',
      },
      points: [
        'Massive boilerplate setup required',
        'Notorious for WebDriver timeout flakiness',
        'Requires dedicated automation engineers',
        'Constant maintenance for every UI tweak'
      ],
      color: 'border-rose-500 bg-rose-50'
    }
  };

  const activeData = comparisonData[selectedStack];

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <Section>
        <SectionHeading
          title="Automation Stack Comparison"
          description="See how the QA Quad AI Engine compares to traditional legacy frameworks."
          align="center"
        />

        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Selector */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <button 
              onClick={() => setSelectedStack('qaquad')}
              className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${selectedStack === 'qaquad' ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-200 hover:border-indigo-300 bg-white'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedStack === 'qaquad' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">QA Quad AI</h3>
                <p className="text-sm text-slate-500">Next-gen autonomous</p>
              </div>
            </button>

            <button 
              onClick={() => setSelectedStack('cypress')}
              className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${selectedStack === 'cypress' ? 'border-emerald-600 bg-emerald-50 shadow-md' : 'border-slate-200 hover:border-emerald-300 bg-white'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedStack === 'cypress' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <Code2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Cypress / JS</h3>
                <p className="text-sm text-slate-500">Developer-led coding</p>
              </div>
            </button>

            <button 
              onClick={() => setSelectedStack('selenium')}
              className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${selectedStack === 'selenium' ? 'border-rose-600 bg-rose-50 shadow-md' : 'border-slate-200 hover:border-rose-300 bg-white'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedStack === 'selenium' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <PenTool size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Selenium</h3>
                <p className="text-sm text-slate-500">Legacy standard</p>
              </div>
            </button>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-8 animate-in fade-in slide-in-from-right-8 duration-500" key={selectedStack}>
            <div className={`h-full rounded-3xl border-2 p-8 md:p-12 ${activeData.color}`}>
              <div className="flex items-center gap-4 mb-6">
                {activeData.icon}
                <h2 className="text-3xl font-bold text-slate-900">{activeData.title}</h2>
              </div>
              <p className="text-xl text-slate-700 mb-10">{activeData.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold uppercase mb-1">Creation Speed</div>
                  <div className="font-bold text-slate-900">{activeData.metrics.creation}</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold uppercase mb-1">Maintenance</div>
                  <div className="font-bold text-slate-900">{activeData.metrics.maintenance}</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold uppercase mb-1">Flakiness</div>
                  <div className="font-bold text-slate-900">{activeData.metrics.flakiness}</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold uppercase mb-1">Execution</div>
                  <div className="font-bold text-slate-900">{activeData.metrics.execution}</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  Key Characteristics
                </h4>
                <ul className="space-y-4">
                  {activeData.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {selectedStack === 'qaquad' ? (
                        <CheckCircle className="text-indigo-500 shrink-0 mt-0.5" size={20} />
                      ) : (
                        <XCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
                      )}
                      <span className="text-slate-700">{point}</span>
                    </li>
                  ))}
                </ul>
                
                {selectedStack !== 'qaquad' && (
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <a href="/migration-checklist" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
                      See how to migrate from {activeData.title} to QA Quad <ArrowRight size={16} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Global CTA */}
        <div className="mt-16 bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Upgrade Your QA Stack?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Stop maintaining brittle test scripts and start shipping faster. See how QA Quad compares to your current setup with a personalized demo.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-indigo-900/20"
          >
            Book a Architecture Review <ArrowRight size={20} />
          </a>
        </div>
      </Section>
    </div>
  );
}
