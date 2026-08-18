"use client";

import React from 'react';
import { Bot, Sparkles, AlertCircle, Phone, Copy, CheckCircle2, MapPin, ExternalLink, Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CopilotChat() {
  return (
    <div className="flex flex-col h-[50vh] lg:h-full bg-gradient-to-b from-slate-50/60 to-slate-100/40 border-b lg:border-b-0 lg:border-r border-slate-200/60 w-full lg:w-[400px] xl:w-[460px] shrink-0 overflow-hidden relative z-20 shadow-[1px_0_15px_rgba(0,0,0,0.02)]">
      
      <div className="px-6 py-5 border-b border-slate-200/60 bg-white/80 backdrop-blur-md flex items-center justify-between z-10 sticky top-0">
        <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center border border-blue-200/50 shadow-sm">
            <Bot className="w-4 h-4 text-[#005696]" />
          </div>
          Agent AI Copilot
        </h2>
        <span className="text-[10px] bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border border-emerald-200/50 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3 h-3 text-emerald-500" />
          Active Context
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-7 relative">
        {/* User Query Log */}
        <div className="flex flex-col items-end">
          <div className="bg-gradient-to-br from-[#005696] to-[#006bb3] text-white px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-[90%] text-sm shadow-[0_8px_20px_rgba(0,86,150,0.15)] font-medium leading-relaxed">
            Kandy RTO billing section hotline ekak ona
          </div>
          <span className="text-[10px] text-slate-400 mt-2 mr-1 flex items-center gap-1.5 font-semibold">
            <span className="px-2 py-0.5 bg-slate-200/50 rounded-md text-slate-500 border border-slate-200/50">Manual Entry</span> 
            10:14 AM
          </span>
        </div>

        {/* AI Response */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200/70 text-slate-800 p-1.5 rounded-2xl rounded-tl-sm max-w-[95%] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            
            {/* Verified Match Badge */}
            <div className="px-4 py-2.5 flex items-center gap-2 border-b border-slate-100/80 bg-slate-50/50 rounded-t-xl">
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" /> 98% Verified Match
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">Auto-retrieved</span>
            </div>

            <div className="p-4">
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                Retrieved direct billing lines for Central Province RTO - Kandy.
              </p>
              
              <div className="mt-5 space-y-2.5">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-rose-600 bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-xl transition-all hover:shadow-sm active:scale-95">
                  <Flag className="w-4 h-4" />
                  Report Outdated Number
                </button>
                
                <Link href="/escalation" className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all hover:shadow-sm active:scale-95 group">
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    Transfer to Level-2 Support
                  </span>
                  <span className="text-[10px] bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded shadow-sm font-mono font-bold group-hover:border-slate-300">L2</span>
                </Link>
              </div>
            </div>
            
          </div>
          <span className="text-[10px] text-slate-400 mt-2 ml-1 flex items-center gap-1.5 font-semibold">
            10:14 AM • AI Copilot
          </span>
        </motion.div>
      </div>

      <div className="p-6 border-t border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="relative shadow-sm hover:shadow-md rounded-xl overflow-hidden border border-slate-200/80 focus-within:border-[#00A3E0] focus-within:ring-2 focus-within:ring-[#00A3E0]/20 transition-all duration-300">
          <textarea
            className="w-full bg-slate-50/50 pl-4 pr-12 py-3.5 text-sm font-medium focus:outline-none resize-none h-14 block placeholder-slate-400"
            placeholder="Type follow-up query..."
          ></textarea>
          <button className="absolute right-2 top-2 p-2 bg-gradient-to-br from-[#005696] to-[#006bb3] text-white rounded-lg hover:shadow-lg transition-all shadow-sm group">
            <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-3 font-semibold">
          Copilot operates securely on internal SLT network.
        </p>
      </div>
    </div>
  );
}
