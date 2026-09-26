"use client";

import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ChevronRight, Target, Activity, CheckCircle, ArrowRight, Download } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "How are your QA tests primarily executed?",
    options: [
      { text: "100% Manually", score: 1 },
      { text: "Mostly manual with some legacy scripts", score: 2 },
      { text: "Balanced manual & automated (e.g. Selenium/Cypress)", score: 3 },
      { text: "Highly automated with CI/CD integration", score: 4 },
      { text: "Autonomous AI-driven pipelines", score: 5 }
    ]
  },
  {
    id: 2,
    question: "How long does a full regression suite take to run?",
    options: [
      { text: "Days or weeks", score: 1 },
      { text: "Overnight", score: 2 },
      { text: "A few hours", score: 3 },
      { text: "Under 30 minutes", score: 4 },
      { text: "Real-time / Instantaneous", score: 5 }
    ]
  },
  {
    id: 3,
    question: "How often do you deal with 'flaky' tests (false failures)?",
    options: [
      { text: "Constantly, we ignore many failures", score: 1 },
      { text: "Often, requires regular maintenance", score: 2 },
      { text: "Sometimes, we have a quarantine process", score: 3 },
      { text: "Rarely, we have strict stability rules", score: 4 },
      { text: "Never, our locators self-heal", score: 5 }
    ]
  }
];

export default function MaturityAssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 5;
  const percentage = isFinished ? (totalScore / maxScore) * 100 : 0;

  let maturityLevel = "Level 1: Ad-hoc QA";
  let roadmap = "You are heavily reliant on manual testing. Focus on automating critical paths first.";
  if (percentage >= 40) {
    maturityLevel = "Level 2: Scripted Automation";
    roadmap = "You have basic scripts. Focus on stabilizing them and integrating into CI/CD.";
  }
  if (percentage >= 60) {
    maturityLevel = "Level 3: Integrated CI/CD QA";
    roadmap = "Good CI/CD practices. Start exploring AI for test generation and maintenance.";
  }
  if (percentage >= 80) {
    maturityLevel = "Level 4: Advanced Test Engineering";
    roadmap = "Highly automated. The final step is implementing autonomous self-healing AI.";
  }
  if (percentage === 100) {
    maturityLevel = "Level 5: Autonomous AI QA";
    roadmap = "Industry leading! You are fully utilizing modern AI testing practices.";
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Section tone="dark" className="!py-8 sm:!py-12 border-none">
        <SectionHeading
          title="QA Maturity Assessment"
          description="Take this 2-minute diagnostic audit to benchmark your engineering team's QA process against industry leaders."
          align="center"
        />

        <div className="max-w-3xl mx-auto mt-12 bg-slate-50 rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {!isFinished ? (
            <div className="p-8 md:p-12">
              <div className="mb-8 flex items-center justify-between text-sm font-medium text-slate-500">
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span>{Math.round(((currentStep) / questions.length) * 100)}% Complete</span>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(currentStep / questions.length) * 100}%` }}
                ></div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
                {questions[currentStep].question}
              </h2>

              <div className="space-y-4">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(opt.score)}
                    className="w-full text-left p-4 md:p-6 rounded-xl border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 transition-all font-medium text-slate-700 hover:text-indigo-900 group flex justify-between items-center"
                  >
                    {opt.text}
                    <ChevronRight className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-12 text-center animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity size={48} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Score: {totalScore} / {maxScore}</h2>
              <div className="inline-block px-4 py-2 bg-indigo-600 text-white font-bold rounded-full text-lg mb-8">
                {maturityLevel}
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 text-left mb-8 shadow-sm">
                <h3 className="font-bold flex items-center gap-2 text-slate-800 mb-3">
                  <Target className="text-rose-500" />
                  Customized Gap-Analysis Roadmap
                </h3>
                <p className="text-slate-600">{roadmap}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500" size={16} /> Adopt shift-left strategies</li>
                  <li className="flex items-center gap-2"><CheckCircle className="text-green-500" size={16} /> Integrate AI for visual regression</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.print()}
                  className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold py-4 px-8 rounded-xl transition-all w-full flex items-center justify-center gap-2 print:hidden"
                >
                  <Download size={20} />
                  Download PDF Report
                </button>
                <a 
                  href="/contact"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all w-full flex items-center justify-center gap-2 print:hidden"
                >
                  Discuss Results <ArrowRight size={20} />
                </a>
              </div>
            </div>
          )}
        </div>
      </Section>
    </main>
  );
}
