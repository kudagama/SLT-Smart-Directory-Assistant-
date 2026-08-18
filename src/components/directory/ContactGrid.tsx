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
            defaultValue="Kandy RTO billing section hotline ekak ona"
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
        
        <div className="flex flex-wrap gap-2.5">
          <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#005696] to-[#006bb3] text-white shadow-[0_4px_12px_rgba(0,86,150,0.25)] hover:shadow-[0_6px_16px_rgba(0,86,150,0.35)] hover:-translate-y-0.5 transition-all duration-300">
            All
          </button>
          <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-50 text-[#005696] border border-cyan-100/80 hover:bg-cyan-100 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300">
            Regional Telecom Offices (RTO)
          </button>
          <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200/70 hover:bg-slate-50 hover:text-slate-900 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300">
            Billing & Accounts
          </button>
          <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200/70 hover:bg-slate-50 hover:text-slate-900 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300">
            Emergency Hotlines
          </button>
          <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200/70 hover:bg-slate-50 hover:text-slate-900 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300">
            Hospitals
          </button>
        </div>
      </div>

      {/* Main Result Card & Alternatives */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 relative">
        
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl -z-10 pointer-events-none opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none opacity-50 mix-blend-multiply"></div>
        
        {/* Primary Contact Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-8 py-7 border-b border-slate-100/80 bg-gradient-to-r from-blue-50/40 to-transparent flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1.5">Regional Telecom Office (RTO) - Kandy</h2>
              <div className="text-sm text-slate-500 font-sans leading-relaxed flex items-center gap-2">
                <span>මහනුවර ප්‍රාදේශීය විදුලි සංදේශ කාර්යාලය</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span>கண்டி பிராந்திய தொலைத்தொடர்பு அலுவலகம்</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50/80 px-3 py-1.5 rounded-full uppercase tracking-wider border border-emerald-100/50 shadow-sm self-start">
              <CheckCircle2 className="w-4 h-4" /> Verified Match
            </span>
          </div>

          {/* Highlighted Hotline & Secondary Info */}
          <div className="p-8 flex flex-col lg:flex-row gap-10 items-center lg:items-stretch">
            
            {/* Left: Massive Number */}
            <div className="flex-1 w-full bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100 flex flex-col justify-center items-center text-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#005696] to-[#00A3E0] rounded-l-2xl"></div>
              
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Direct Billing Hotline</p>
              <div className="text-4xl sm:text-5xl font-black tabular-nums tracking-tighter text-slate-800 mb-8 drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                +94 81 222 2222
              </div>
              
              <div className="flex w-full gap-4 justify-center max-w-sm">
                <button className="flex-1 py-3.5 bg-gradient-to-r from-[#005696] to-[#006bb3] text-white rounded-xl font-bold hover:shadow-[0_8px_20px_rgba(0,86,150,0.3)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95">
                  <PhoneCall className="w-5 h-5" /> Quick Dial
                </button>
                <button className="flex-1 py-3.5 bg-white text-[#005696] border border-slate-200 rounded-xl font-bold hover:bg-slate-50 hover:border-[#005696]/30 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 active:scale-95">
                  <Copy className="w-5 h-5" /> Copy
                </button>
              </div>
            </div>

            {/* Right: Secondary Details */}
            <div className="flex-1 w-full flex flex-col justify-center space-y-6">
              <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-slate-50/80 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-50/80 flex items-center justify-center shrink-0 border border-blue-100/50 shadow-sm">
                  <PhoneCall className="w-4 h-4 text-[#005696]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Extension Number</p>
                  <p className="text-base font-bold text-slate-800">Ext: 1212</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-slate-50/80 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-50/80 flex items-center justify-center shrink-0 border border-blue-100/50 shadow-sm">
                  <Building2 className="w-4 h-4 text-[#005696]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Department</p>
                  <p className="text-base font-bold text-slate-800">Customer Care & Billing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-slate-50/80 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-50/80 flex items-center justify-center shrink-0 border border-emerald-100/50 shadow-sm">
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Operating Hours</p>
                  <p className="text-base font-bold text-slate-800">08:30 AM - 05:00 PM <span className="text-emerald-600 font-bold ml-1.5 bg-emerald-50 px-2 py-0.5 rounded-md text-sm border border-emerald-100">(Open Now)</span></p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-2 rounded-xl hover:bg-slate-50/80 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-50/80 flex items-center justify-center shrink-0 border border-blue-100/50 shadow-sm">
                  <MapPin className="w-4 h-4 text-[#005696]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Location</p>
                  <p className="text-base font-medium text-slate-800">No. 15, Peradeniya Road, Kandy</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Related Alternatives */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 px-1">
            <ExternalLink className="w-4 h-4 text-slate-400" />
            Related Alternatives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Alternative 1 */}
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex justify-between items-center group cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Customer Experience Center</p>
                <p className="text-sm font-bold text-slate-900 group-hover:text-[#005696] transition-colors">Kandy CEC (City Centre)</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-slate-500">
                  <PhoneCall className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#005696] transition-colors" /> 081 2 222 333
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:text-[#005696] group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shadow-sm">
                <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Alternative 2 */}
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex justify-between items-center group cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Regional Branch</p>
                <p className="text-sm font-bold text-slate-900 group-hover:text-[#005696] transition-colors">Peradeniya Teleshop</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-slate-500">
                  <PhoneCall className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#005696] transition-colors" /> 081 2 388 444
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:text-[#005696] group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shadow-sm">
                <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
