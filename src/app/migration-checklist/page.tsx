'use client';

import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CheckSquare, Square, Download, ArrowRight } from 'lucide-react';

type ChecklistItem = {
  id: string;
  label: string;
  checked: boolean;
};

const defaultChecklist: ChecklistItem[] = [
  { id: '1', label: 'Inventory existing Legacy (Selenium/Cypress) test cases', checked: false },
  { id: '2', label: 'Identify and remove redundant or flaky tests from inventory', checked: false },
  { id: '3', label: 'Map test cases to core business workflows', checked: false },
  { id: '4', label: 'Provision QA Quad test environment access', checked: false },
  { id: '5', label: 'Run QA Quad AI Discovery on target application', checked: false },
  { id: '6', label: 'Review AI-generated requirements against legacy inventory', checked: false },
  { id: '7', label: 'Approve AI-generated BDD Scenarios', checked: false },
  { id: '8', label: 'Execute initial AI test run and capture baselines', checked: false },
  { id: '9', label: 'Integrate QA Quad webhook into CI/CD pipeline (GitHub Actions/Jenkins)', checked: false },
  { id: '10', label: 'Deprecate legacy test suite', checked: false },
];

export default function MigrationChecklistPage() {
  const [items, setItems] = useState(defaultChecklist);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const completedCount = items.filter(i => i.checked).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <Section>
        <SectionHeading
          title="Legacy Migration Checklist"
          description="A step-by-step interactive guide for migrating from brittle Selenium/Cypress suites to AI-Native QA Quad."
          align="center"
        />

        <div className="max-w-4xl mx-auto mt-12">
          
          {/* Progress Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8 sticky top-24 z-10">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Migration Readiness</h3>
                <p className="text-slate-500 text-sm">Track your progress toward autonomous QA</p>
              </div>
              <div className="text-3xl font-black text-indigo-600">{progressPercent}%</div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div 
                className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h4 className="font-bold text-slate-700">10-Step Migration Plan</h4>
              <button 
                onClick={() => window.print()}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-2 print:hidden"
              >
                <Download size={16} /> Export PDF
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-5 md:p-6 flex items-start gap-4 cursor-pointer transition-colors hover:bg-slate-50 ${item.checked ? 'bg-indigo-50/30' : ''}`}
                >
                  <div className="mt-1 shrink-0">
                    {item.checked ? (
                      <CheckSquare className="text-indigo-600" size={24} />
                    ) : (
                      <Square className="text-slate-300" size={24} />
                    )}
                  </div>
                  <div>
                    <h5 className={`font-medium text-lg transition-colors ${item.checked ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                      {item.label}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          {progressPercent === 100 && (
            <div className="mt-8 bg-indigo-600 text-white rounded-2xl p-8 text-center animate-in zoom-in duration-500 shadow-xl print:hidden">
              <h3 className="text-2xl font-bold mb-4">You are ready to migrate!</h3>
              <p className="mb-6 opacity-90">Your team has completed the prerequisites. It's time to activate the QA Quad engine.</p>
              <a href="/contact" className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors">
                Schedule Deployment Call <ArrowRight size={20} />
              </a>
            </div>
          )}
          
        </div>
      </Section>
    </div>
  );
}
