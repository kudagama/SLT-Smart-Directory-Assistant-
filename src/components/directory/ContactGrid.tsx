"use client";

import React, { useState, useEffect } from 'react';
import { Copy, PhoneCall, CheckCircle2, Clock, MapPin, Building2, ChevronDown, Flag, Mic, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactGrid() {
  const [isListening, setIsListening] = useState(false);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('omnibox')?.focus();
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('omnibox')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] h-full overflow-hidden">
      {/* Search Header & Chips */}
      <div className="px-8 pt-8 pb-6 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shrink-0 z-10 sticky top-0">
        <div className="relative mb-5 group">
          <input 
            id="omnibox"
            type="text" 
            className={`w-full text-lg pl-5 pr-36 py-4 rounded-2xl focus:outline-none transition-all duration-300 font-medium placeholder-slate-400 ${
              isListening 
                ? 'bg-white border-2 border-[#00A3E0] shadow-[0_0_0_4px_rgba(0,163,224,0.1)] text-[#005696]' 
                : 'bg-slate-50/50 border border-slate-200/80 shadow-[0_2px_10px_rgb(0,0,0,0.02)] focus:bg-white focus:border-[#00A3E0]/50 focus:shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
            }`}
            placeholder={isListening ? "Listening... Speak now (Sinhala/Tamil/English)" : "Search directory..."}
          />
          <div className="absolute right-3 top-3 flex items-center gap-2">
            <button 
              onClick={() => setIsListening(!isListening)}
              className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
                isListening 
                  ? 'bg-rose-50 text-rose-500 animate-pulse border border-rose-200/50 shadow-sm' 
                  : 'bg-white text-slate-400 hover:text-[#005696] hover:bg-cyan-50 border border-slate-100 shadow-sm hover:shadow'
              }`}
              title="Voice Search"
            >
              <Mic className="w-5 h-5" />
            </button>
            <div className="px-2.5 py-1.5 bg-slate-100/80 text-slate-400 text-xs font-semibold rounded-lg border border-slate-200/60 hidden sm:block">
              [ ⌘K ]
            </div>
          </div>
        </div>
        

      </div>

      {/* Main Result Area */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center gap-8 relative">
        
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl -z-10 pointer-events-none opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none opacity-50 mix-blend-multiply"></div>
      </div>
    </div>
  );
}
