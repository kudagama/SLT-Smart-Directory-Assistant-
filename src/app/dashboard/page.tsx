"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, User, Bot, Zap, Wifi, CheckCircle2, AlertCircle, Play, Pause, Activity, ShieldAlert, Cpu, X, Star, TrendingUp, AlertTriangle, Target, PhoneCall } from 'lucide-react';

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

const sinhalaCallScript = [
  { delay: 1000, speaker: 'agent', text: 'ආයුබෝවන්! මම හිමාලි, මට පුළුවනි ඔබට සහය වන්න.' },
  { delay: 4000, speaker: 'customer', text: 'මට Kandy Hospital එකේ අංකය දැනගන්න පුළුවන්ද?' },
  { delay: 9000, speaker: 'agent', text: 'කරුණාකර රැඳී ඉන්න සර්/ මැඩම්.' },
  { delay: 13000, speaker: 'agent', text: 'රැඳීසිටියාට ස්තූතියි. අංකය 081 222 2222. වෙනත් යමක් දැනගැනීමට අවශ්‍යද?' },
  { delay: 19000, speaker: 'customer', text: 'නෑ, එච්චරයි. ස්තූතියි.' },
  { delay: 22000, speaker: 'agent', text: 'මා ලබාදුන් සේවය ඇගයීම සඳහා රැඳී සිටින්න. SLT Mobitel ඇමතුවාට ස්තූතියි. සුභ දවසක්!' }
];

const englishCallScript = [
  { delay: 1000, speaker: 'agent', text: 'Ayubowan! I am Himali. How may I help you?' },
  { delay: 4000, speaker: 'customer', text: 'Hello, I am looking to get a new broadband connection.' },
  { delay: 9000, speaker: 'agent', text: 'Please hold on Sir/Madam while I check the details.' },
  { delay: 13000, speaker: 'agent', text: 'Thank you for being on hold. The Fibre packages start at Rs. 4,400. Is there anything else I can help you with Sir/Madam?' },
  { delay: 19000, speaker: 'customer', text: 'No, that is all. Thanks!' },
  { delay: 22000, speaker: 'agent', text: 'Please hold on to rate my service. Thank you for calling SLT Mobitel. Have a nice day!' }
];

const tamilCallScript = [
  { delay: 1000, speaker: 'agent', text: 'வணக்கம் ! நான் ஹிமாலி , என்னால் எவ்வகையில் உதவ முடியும்?' },
  { delay: 4000, speaker: 'customer', text: 'நான் Kandy Bank of Ceylon இலக்கத்தை அறிய விரும்புகிறேன்.' },
  { delay: 9000, speaker: 'agent', text: 'தயவு செய்து அழைப்பில் காத்திருங்கள். Sir / Madam.' },
  { delay: 13000, speaker: 'agent', text: 'அழைப்பில் காத்திருந்தமைக்கு நன்றி. இலக்கம் 081 222 2222. வேறேதும் தெரிந்து கொள்ள இருக்கிறதா? Sir / Madam.' },
  { delay: 19000, speaker: 'customer', text: 'இல்லை, நன்றி.' },
  { delay: 22000, speaker: 'agent', text: 'இந்த அழைப்பை மதிப்பீடு செய்ய தயவு செய்து காத்திருங்கள். SLT Mobitel அழைத்தமைக்கு நன்றி இந்த நாள் இனிய நாளாக அமையட்டும்.' }
];

export default function DashboardPage() {
  const [callActive, setCallActive] = useState(false);
  const [activeCallType, setActiveCallType] = useState<'sinhala' | 'english' | 'tamil' | null>(null);
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

  const startCallSimulation = (type: 'sinhala' | 'english' | 'tamil') => {
    setCallActive(true);
    setActiveCallType(type);
    setTranscript([]);
    setSuggestions([]);
    setCallTimer(0);
    setShowEvaluation(false);
    
    timerRef.current = setInterval(() => {
      setCallTimer(prev => prev + 1);
    }, 1000);

    const activeScript = type === 'sinhala' ? sinhalaCallScript : type === 'english' ? englishCallScript : tamilCallScript;

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
    setActiveCallType(null);
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

    if (lowerText.includes('hospital') || lowerText.includes('kandy')) {
      newSuggestions.push({
        id: 'hospital-dir',
        type: 'intent',
        title: 'Directory Search: Kandy Hospital',
        content: (
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-800">Kandy General Hospital</p>
            <p className="text-xs text-slate-600 flex items-center gap-1"><Phone className="w-3 h-3"/> 081 222 2222</p>
          </div>
        )
      });
    }

    if (lowerText.includes('broadband') || lowerText.includes('fibre') || lowerText.includes('ceylon')) {
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
          </div>
        )
      });
    }

    if (lowerText.includes('home package') || lowerText.includes('unlimited home')) {
      newSuggestions.push({
        id: 'home-packages',
        type: 'product',
        title: 'Unlimited Home Packages',
        content: (
          <div className="space-y-2 text-xs">
            <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
                    <th className="py-2 px-3 font-bold">Package</th>
                    <th className="py-2 px-3 font-bold">Speed</th>
                    <th className="py-2 px-3 font-bold">Monthly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="py-2 px-3 font-medium">Home</td><td className="py-2 px-3 text-slate-500">100/50</td><td className="py-2 px-3 font-bold text-[#005696]">Rs. 5,900</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Home Plus</td><td className="py-2 px-3 text-slate-500">200/100</td><td className="py-2 px-3 font-bold text-[#005696]">Rs. 9,900</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Twin</td><td className="py-2 px-3 text-slate-500">200/200</td><td className="py-2 px-3 font-bold text-[#005696]">Rs. 14,900 <span className="text-[9px] text-slate-400 block leading-tight">+1 Static IP</span></td></tr>
                  <tr><td className="py-2 px-3 font-medium">Pro</td><td className="py-2 px-3 text-slate-500">500/200</td><td className="py-2 px-3 font-bold text-[#005696]">Rs. 19,900</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Edge</td><td className="py-2 px-3 text-slate-500">750/250</td><td className="py-2 px-3 font-bold text-[#005696]">Rs. 29,900</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Turbo</td><td className="py-2 px-3 text-slate-500">1000/300</td><td className="py-2 px-3 font-bold text-[#005696]">Rs. 39,900</td></tr>
                </tbody>
              </table>
            </div>
            <button className="w-full py-2 text-xs font-bold text-white bg-[#005696] rounded-md hover:bg-[#00407a] transition-colors mt-2">
              Send Full Details via SMS
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
                <span className="text-xs font-bold text-emerald-900">Primary Contact (General)</span>
                <button className="text-emerald-700 hover:text-emerald-900"><Phone className="w-4 h-4" /></button>
              </div>
              <p className="text-2xl font-black text-emerald-700 tracking-tight">081 222 2222</p>
              <p className="text-xs text-emerald-800 mt-1 mb-3">boc.kandy@boc.lk</p>
              
              <div className="border-t border-emerald-200/60 pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800">WhatsApp / Direct</span>
                  <p className="text-sm font-bold text-emerald-700">077 123 4567</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800">Fax (Branch Manager)</span>
                  <p className="text-sm font-bold text-emerald-700">081 222 2223</p>
                </div>
              </div>
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
        {/* Left Panel: Pearl Modernized Interface */}
        <div className="w-full lg:w-7/12 flex flex-col border-r border-slate-200 bg-white relative shadow-[10px_0_30px_rgba(0,0,0,0.02)] z-10">
          
          {/* Pearl Top Header */}
          <div className="px-6 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-600 overflow-x-auto whitespace-nowrap">
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="flex items-center gap-2 text-[#005696] font-black text-sm">
                <ShieldAlert className="w-4 h-4" /> PEARL AI
              </div>
              <div>Logged in as: <span className="text-slate-800">Gehan Jayawardana</span></div>
              <div>Campaign: <span className="text-slate-800">C_SLT</span></div>
            </div>
            <div className="flex items-center gap-4 lg:gap-6 text-right">
              <div>Calls in Queue: <span className="text-slate-800 font-black">0</span></div>
              {callActive ? (
                 <div className="text-emerald-600 font-black uppercase flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> LIVE CALL ({formatTime(callTimer)})</div>
              ) : (
                 <div className="text-slate-400 font-black uppercase">NO LIVE CALL</div>
              )}
            </div>
          </div>

          {/* Body Section */}
          <div className="flex flex-1 overflow-hidden relative">
            
            {/* Left Action Buttons */}
            <div className="w-32 lg:w-40 border-r border-slate-200 bg-slate-50 p-4 flex flex-col gap-3 shrink-0">
              <div className="text-xs font-black text-slate-500 mb-2">STATUS:</div>
              <button className="w-full py-2 bg-emerald-500 text-white font-bold text-[10px] rounded border border-emerald-600 shadow-sm">YOU ARE ACTIVE</button>
              <button className="w-full py-2 bg-amber-400 text-amber-900 font-bold text-[10px] rounded border border-amber-500 shadow-sm">BREAK</button>
              
              <div className="mt-8 space-y-3">
                <button className="w-full py-2 bg-slate-200 text-slate-600 font-bold text-[10px] rounded border border-slate-300 hover:bg-slate-300">PARK CALL</button>
                <button onClick={callActive ? endCall : undefined} className={`w-full py-2 font-bold text-[10px] rounded border shadow-sm ${callActive ? 'bg-purple-500 text-white border-purple-600 hover:bg-purple-600' : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'}`}>TRANSFER - CONF</button>
                {callActive && (
                  <button onClick={endCall} className="w-full py-2 bg-rose-500 text-white font-bold text-[10px] rounded border border-rose-600 hover:bg-rose-600 shadow-sm mt-4">HANGUP CUSTOMER</button>
                )}
              </div>
            </div>

            {/* Form Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed relative" style={{ backgroundColor: '#ffffff' }}>
              
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                
                {/* Left Column Fields */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">Title:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">First:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">Last:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">Address1:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">City:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">Province:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">Phone:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none" value={callActive ? "0776165556" : ""} readOnly />
                  </div>
                </div>

                {/* Right Column Fields */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">Address3:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">State:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">IVR Entry:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs text-slate-500 bg-slate-50 focus:ring-1 focus:ring-blue-500 outline-none" readOnly value={callActive ? "CONTACT_0776165556" : ""} />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">Email:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="flex items-center gap-2 mt-6">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">PostCode:</label>
                    <input type="text" className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-20 text-right text-xs font-bold text-slate-600">Gender:</label>
                    <select className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                       <option>U - Undefined</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Call Simulation Starters */}
              {!callActive && (
                <div className="mt-8 p-6 border border-blue-200 bg-blue-50/50 rounded-xl max-w-lg mx-auto text-center space-y-4 shadow-sm backdrop-blur-sm">
                   <p className="text-sm font-bold text-[#005696] flex items-center justify-center gap-2"><PhoneCall className="w-4 h-4" /> Simulator Controls</p>
                   <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                     <button onClick={() => startCallSimulation('sinhala')} className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-lg font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                       <Play className="w-3 h-3 fill-white" /> සිංහල Directory
                     </button>
                     <button onClick={() => startCallSimulation('english')} className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                       <Play className="w-3 h-3 fill-white" /> English Product
                     </button>
                     <button onClick={() => startCallSimulation('tamil')} className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                       <Play className="w-3 h-3 fill-white" /> தமிழ் Directory
                     </button>
                   </div>
                </div>
              )}

              {/* Floating Incoming Call Banner */}
              <AnimatePresence>
                {callActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-8 mx-auto w-full max-w-lg bg-rose-400 border border-rose-500 rounded-xl p-5 shadow-lg z-20 text-center"
                  >
                    <p className="text-sm font-bold text-rose-950 mb-1">Incoming: (077)616-5556 Group- {activeCallType === 'sinhala' ? 'Sinhala Directory' : activeCallType === 'english' ? 'English Product' : 'Tamil Directory'}</p>
                    <p className="text-xs font-medium text-rose-900">Fronter: - CONTACT 0776165556 UID: Y9240901190037712</p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
          
          {/* Transcript Footer (Like Pearl Bottom Bar) */}
          <div className="h-40 bg-[#4287f5] border-t border-slate-300 relative overflow-hidden flex flex-col shrink-0">
             <div className="p-2 px-4 text-white text-[10px] font-bold border-b border-[#2b6bd4] flex justify-between shadow-sm">
                <span>Show conference call channel information</span>
                <span>Agents View +</span>
             </div>
             
             {/* Live transcript area */}
             <div className="flex-1 overflow-y-auto p-4 space-y-1.5" ref={transcriptRef}>
                {transcript.map((msg) => (
                  <div key={msg.id} className="text-xs font-bold">
                    <span className={msg.speaker === 'agent' ? 'text-blue-100' : 'text-emerald-200 uppercase'}>{msg.speaker}:</span> <span className="text-white font-medium">{msg.text}</span>
                  </div>
                ))}
                {callActive && (
                  <div className="flex items-center gap-2 text-blue-200 text-xs font-medium mt-2">
                    <Activity className="w-3 h-3 animate-pulse" /> AI is listening to the live call...
                  </div>
                )}
             </div>
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
