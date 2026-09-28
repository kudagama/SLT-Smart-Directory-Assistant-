"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, User, Bot, Zap, Wifi, CheckCircle2, AlertCircle, Play, Pause, Activity, ShieldAlert, Cpu, X, Star, TrendingUp, AlertTriangle, Target } from 'lucide-react';

type TranscriptMessage = {
  id: string;
  speaker: 'customer' | 'agent';
  text: string;
};

type CopilotSuggestion = {
  id: string;
  type: 'product' | 'action' | 'intent';
  title: string;
  content: React.ReactNode;
};

const productCallScript = [
  { delay: 1000, speaker: 'agent', text: "Ayubowan, I'm Gehan, how may I help you?" },
  { delay: 4000, speaker: 'customer', text: 'Hello, I am looking to get a new broadband connection. I heard about SLT Fibre.' },
  { delay: 9000, speaker: 'agent', text: 'Great choice! May I know your location to check coverage?' },
  { delay: 13000, speaker: 'customer', text: 'I am from Nugegoda. What are the prices for the unlimited data packages?' },
  { delay: 18000, speaker: 'agent', text: 'Please hold on while I check the coverage and packages for Nugegoda.' },
  { delay: 22000, speaker: 'agent', text: 'Thank you for being on hold. Coverage is available, and packages start at Rs. 4,490. Is there anything else I can help with you?' },
  { delay: 28000, speaker: 'customer', text: 'No, that is all. Thanks!' },
  { delay: 31000, speaker: 'agent', text: 'Please hold on to rate my service. Thank you for calling SLTMobitel, have a nice day.' }
];

const directoryCallScript = [
  { delay: 1000, speaker: 'agent', text: "Ayubowan, I'm Gehan, how may I help you?" },
  { delay: 4000, speaker: 'customer', text: 'Hello, I want the number for the Bank of Ceylon, Kandy branch.' },
  { delay: 9000, speaker: 'agent', text: 'Sure, Bank of Ceylon Kandy branch. Please hold on.' },
  { delay: 13000, speaker: 'agent', text: 'Thank you for being on hold. The number is 081 222 2222 and email is boc.kandy@boc.lk. Is there anything else I can help with you?' },
  { delay: 20000, speaker: 'customer', text: 'No, that is enough. Thank you.' },
  { delay: 23000, speaker: 'agent', text: 'Please hold on to rate my service. Thank you for calling SLTMobitel, have a nice day.' }
];

export default function DashboardPage() {
  const [callActive, setCallActive] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [suggestions, setSuggestions] = useState<CopilotSuggestion[]>([]);
  const [callTimer, setCallTimer] = useState(0);
  const [showEvaluation, setShowEvaluation] = useState(false);
  
  const transcriptRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scriptTimers = useRef<NodeJS.Timeout[]>([]);

  // Scroll to bottom of transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const startCallSimulation = (type: 'product' | 'directory') => {
    setCallActive(true);
    setTranscript([]);
    setSuggestions([]);
    setCallTimer(0);
    setShowEvaluation(false);
    
    timerRef.current = setInterval(() => {
      setCallTimer(prev => prev + 1);
    }, 1000);

    const activeScript = type === 'product' ? productCallScript : directoryCallScript;

    // Schedule transcript messages
    activeScript.forEach((step) => {
      const timer = setTimeout(() => {
        setTranscript(prev => [...prev, { id: Math.random().toString(), speaker: step.speaker as 'customer' | 'agent', text: step.text }]);
        
        // Simulate Copilot AI listening and triggering suggestions based on keywords
        analyzeRealTimeAudio(step.text);
        
      }, step.delay);
      scriptTimers.current.push(timer);
    });
  };

  const endCall = () => {
    setCallActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    scriptTimers.current.forEach(timer => clearTimeout(timer));
    scriptTimers.current = [];
    
    if (transcript.length > 0) {
      setShowEvaluation(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const analyzeRealTimeAudio = (text: string) => {
    const lowerText = text.toLowerCase();
    const newSuggestions: CopilotSuggestion[] = [];

    if (lowerText.includes('broadband') || lowerText.includes('fibre')) {
      newSuggestions.push({
        id: 'fibre-product',
        type: 'product',
        title: 'SLT Fibre (FTTH)',
        content: (
          <div className="space-y-3">
            <p className="text-sm text-slate-600">Ultra-fast broadband up to 1 Gbps.</p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Wifi className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-900">Key Features</span>
              </div>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Free Router & Installation</li>
                <li>• Lowest Latency for Gaming</li>
              </ul>
            </div>
          </div>
        )
      });
    }

    if (lowerText.includes('nugegoda')) {
      newSuggestions.push({
        id: 'coverage-check',
        type: 'intent',
        title: 'Location Identified',
        content: (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Nugegoda Area</p>
              <p className="text-xs text-slate-500 mt-1">Fibre coverage is available. High density zone.</p>
            </div>
          </div>
        )
      });
    }

    if (lowerText.includes('unlimited packages') || lowerText.includes('prices for unlimited')) {
      newSuggestions.push({
        id: 'unlimited-plans',
        type: 'product',
        title: 'Fibre Unlimited Packages',
        content: (
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 border border-slate-200 rounded-md bg-white">
              <span className="text-xs font-bold text-slate-700">Fibre Unlimited 10</span>
              <span className="text-xs font-bold text-[#005696]">Rs. 4,490</span>
            </div>
            <div className="flex justify-between items-center p-2 border border-slate-200 rounded-md bg-white">
              <span className="text-xs font-bold text-slate-700">Fibre Unlimited 25</span>
              <span className="text-xs font-bold text-[#005696]">Rs. 6,490</span>
            </div>
            <button className="w-full py-2 text-xs font-bold text-white bg-[#005696] rounded-md hover:bg-[#00407a] transition-colors mt-2">
              Send SMS Details to Customer
            </button>
          </div>
        )
      });
    }

    // Directory Call Keywords
    if (lowerText.includes('bank of ceylon') || lowerText.includes('kandy branch')) {
      newSuggestions.push({
        id: 'dir-boc-kandy',
        type: 'action',
        title: 'Directory Result: BOC Kandy',
        content: (
          <div className="space-y-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-900">Primary Contact</span>
                <button className="text-emerald-700 hover:text-emerald-900"><Phone className="w-3 h-3" /></button>
              </div>
              <p className="text-lg font-black text-emerald-700">081 222 2222</p>
              <p className="text-xs text-emerald-800 mt-1">boc.kandy@boc.lk</p>
            </div>
            <button className="w-full py-2 text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-md hover:bg-emerald-200 transition-colors">
              Transfer Call
            </button>
          </div>
        )
      });
    }

    if (newSuggestions.length > 0) {
      setSuggestions(prev => {
        // Prevent duplicates based on ID
        const combined = [...newSuggestions, ...prev];
        const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
        return unique.slice(0, 4);
      });
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-50">
      
      {/* Main Layout (Row) */}
      <div className="flex w-full h-full">
        {/* Left Panel: Call Controls & Live Transcript */}
        <div className="w-full lg:w-7/12 flex flex-col border-r border-slate-200 bg-white relative shadow-[10px_0_30px_rgba(0,0,0,0.02)] z-10">
          
          {/* Call Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${callActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Unknown Caller</h2>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  {callActive ? (
                    <><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Call • {formatTime(callTimer)}</>
                  ) : (
                    <><span className="w-2 h-2 rounded-full bg-slate-300"></span> Idle</>
                  )}
                </p>
              </div>
            </div>
            
            <div>
              {!callActive ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => startCallSimulation('product')} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full font-bold text-xs shadow-md transition-all active:scale-95">
                    <Play className="w-3 h-3 fill-white" /> Product Call
                  </button>
                  <button onClick={() => startCallSimulation('directory')} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full font-bold text-xs shadow-md transition-all active:scale-95">
                    <Play className="w-3 h-3 fill-white" /> Directory Call
                  </button>
                </div>
              ) : (
                <button onClick={endCall} className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold text-sm shadow-md transition-all active:scale-95">
                  <PhoneOff className="w-4 h-4" /> End Call
                </button>
              )}
            </div>
          </div>

          {/* Live Transcript Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed" style={{ backgroundColor: '#f8fafc' }} ref={transcriptRef}>
            {transcript.length === 0 && !callActive && (
              <div className="h-full flex flex-col items-center justify-center opacity-50">
                <Bot className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">Waiting for call to start AI analysis...</p>
              </div>
            )}

            <AnimatePresence>
              {transcript.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`mb-6 flex flex-col ${msg.speaker === 'customer' ? 'items-start' : 'items-end'}`}
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
                    {msg.speaker}
                  </span>
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm font-medium leading-relaxed ${
                    msg.speaker === 'customer' 
                    ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm' 
                    : 'bg-gradient-to-br from-[#005696] to-[#00407a] text-white rounded-tr-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {callActive && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-slate-400 text-xs font-medium px-2 py-4"
                >
                  <Activity className="w-4 h-4 animate-pulse text-[#005696]" /> AI is listening to the live call...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel: AI Live Feed & Extractions */}
        <div className="flex-1 bg-slate-50 overflow-y-auto relative">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A3E0]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#005696] to-[#00A3E0] flex items-center justify-center shadow-md">
                  <Cpu className="w-4 h-4 text-white" />
                </div>
                Live Copilot Feed
              </h2>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active
              </div>
            </div>

            <AnimatePresence>
              {suggestions.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center p-10 bg-white/50 border border-slate-200 border-dashed rounded-2xl"
                >
                  <Zap className="w-10 h-10 text-slate-300 mb-3" />
                  <p className="text-sm font-semibold text-slate-500">
                    AI will surface products, data, and suggestions here as the customer speaks.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {suggestions.map((suggestion, idx) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                      className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,86,150,0.08)] transition-all"
                    >
                      <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-3">
                        {suggestion.type === 'product' && <Wifi className="w-4 h-4 text-purple-500" />}
                        {suggestion.type === 'intent' && <ShieldAlert className="w-4 h-4 text-emerald-500" />}
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {suggestion.type === 'product' ? 'Product Match' : 'Intent Detected'}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-bold text-slate-800 mb-3">{suggestion.title}</h3>
                      
                      <div>{suggestion.content}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Evaluation Saved Toast */}
      <AnimatePresence>
        {showEvaluation && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-bold">Call Finished</p>
              <p className="text-xs text-slate-300">Evaluation saved to Performance tab.</p>
            </div>
            <button onClick={() => setShowEvaluation(false)} className="ml-4 p-1 hover:bg-slate-800 rounded-lg transition-colors">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
