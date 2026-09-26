'use client';

import React, { useState, useEffect } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Activity, CheckCircle, XCircle, Clock, Server, Terminal, Shield, ArrowRight } from 'lucide-react';

type LogEntry = {
  id: number;
  time: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
};

const initialLogs: LogEntry[] = [
  { id: 1, time: '10:00:01', type: 'info', message: 'Initializing QA Quad Agent cluster...' },
  { id: 2, time: '10:00:03', type: 'info', message: 'Connecting to target environment: staging.eye4travel.com' },
];

const mockEventStream = [
  { type: 'success', message: 'Authentication flow: PASSED (240ms)' },
  { type: 'info', message: 'Navigating to /booking/flights' },
  { type: 'success', message: 'Form render check: PASSED' },
  { type: 'info', message: 'AI Agent interpreting form layout (Self-healing active)' },
  { type: 'success', message: 'Departure date selected (T+14)' },
  { type: 'warning', message: 'Locator changed for "Search" button. Healing applied.' },
  { type: 'success', message: 'Flight search initiated: PASSED' },
  { type: 'info', message: 'Awaiting API response from inventory service...' },
  { type: 'success', message: 'API schema validation: PASSED' },
  { type: 'error', message: 'Timeout waiting for pricing DOM element (.price-total). Retrying...' },
  { type: 'success', message: 'Retried pricing DOM element: PASSED (Found via semantic search)' },
  { type: 'info', message: 'Executing checkout boundaries...' },
  { type: 'success', message: 'Payment validation: PASSED' },
  { type: 'success', message: 'E2E Booking Workflow Complete: PASSED' },
];

export default function LiveTelemetryPage() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({ passed: 0, failed: 0, healed: 0 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && progress < mockEventStream.length) {
      interval = setInterval(() => {
        const event = mockEventStream[progress];
        
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        setLogs(prev => [...prev, { id: Date.now(), time: timeStr, type: event.type as any, message: event.message }]);
        
        if (event.type === 'success') setStats(s => ({ ...s, passed: s.passed + 1 }));
        if (event.type === 'error') setStats(s => ({ ...s, failed: s.failed + 1 }));
        if (event.type === 'warning') setStats(s => ({ ...s, healed: s.healed + 1 }));
        
        setProgress(prev => prev + 1);
      }, Math.random() * 800 + 400); // Random delay between 400-1200ms
    }

    if (progress >= mockEventStream.length) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, progress]);

  const handleStart = () => {
    if (progress >= mockEventStream.length) {
      setLogs(initialLogs);
      setProgress(0);
      setStats({ passed: 0, failed: 0, healed: 0 });
    }
    setIsRunning(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <Section tone="dark" className="!py-16">
        <SectionHeading
          title="Live Telemetry Dashboard"
          description="Watch the QA Quad AI Agent execute tests in real-time, self-heal flaky locators, and report on API metrics."
          align="center"
        />

        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Stats Column */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
              <h3 className="text-slate-400 font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <Activity size={16} /> Cluster Status
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                  {isRunning && <div className="absolute top-0 left-0 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>}
                </div>
                <span className="text-white font-bold text-lg">{isRunning ? 'Executing Suite' : progress > 0 ? 'Suite Complete' : 'Idle'}</span>
              </div>
              
              <button 
                onClick={handleStart}
                disabled={isRunning}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all"
              >
                {isRunning ? 'Running...' : progress > 0 ? 'Run Again' : 'Start Execution'}
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl flex-grow">
              <h3 className="text-slate-400 font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <Shield size={16} /> Live Metrics
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                  <span className="text-slate-300 flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Passed</span>
                  <span className="text-xl font-bold text-white">{stats.passed}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                  <span className="text-slate-300 flex items-center gap-2"><XCircle size={16} className="text-rose-400" /> Failed</span>
                  <span className="text-xl font-bold text-white">{stats.failed}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                  <span className="text-slate-300 flex items-center gap-2"><Server size={16} className="text-amber-400" /> Auto-Healed</span>
                  <span className="text-xl font-bold text-white">{stats.healed}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                  <span className="text-slate-300 flex items-center gap-2"><Clock size={16} className="text-indigo-400" /> Progress</span>
                  <span className="text-xl font-bold text-white">{Math.round((progress / mockEventStream.length) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Column */}
          <div className="lg:col-span-2 bg-black border border-slate-700 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[600px]">
            <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center gap-2">
              <Terminal size={18} className="text-slate-400" />
              <span className="text-slate-300 font-mono text-sm">qa-quad-agent-node-01</span>
            </div>
            
            <div className="p-6 font-mono text-sm overflow-y-auto flex-grow space-y-2 flex flex-col justify-end">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <span className="text-slate-600 shrink-0">[{log.time}]</span>
                  <span className={
                    log.type === 'success' ? 'text-emerald-400' :
                    log.type === 'error' ? 'text-rose-400' :
                    log.type === 'warning' ? 'text-amber-400' :
                    'text-slate-300'
                  }>
                    {log.message}
                  </span>
                </div>
              ))}
              {isRunning && (
                <div className="flex gap-4 mt-2">
                  <span className="text-slate-600">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                  <span className="text-slate-500 animate-pulse">_</span>
                </div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          {!isRunning && progress >= mockEventStream.length && (
            <div className="lg:col-span-3 mt-8 bg-indigo-900/40 border border-indigo-500/30 p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready for Autonomous Telemetry?</h3>
                <p className="text-indigo-200">Integrate QA Quad into your pipeline and watch tests self-heal in real-time.</p>
              </div>
              <a 
                href="/contact"
                className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
              >
                Book a Live Demo <ArrowRight size={20} />
              </a>
            </div>
          )}

        </div>
      </Section>
    </main>
  );
}
