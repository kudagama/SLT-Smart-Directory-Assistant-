"use client";

import React, { useState } from 'react';
import { Bot, Sparkles, AlertCircle, Phone, Copy, CheckCircle2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CopilotChat() {
  return (
    <div className="flex flex-col h-[50vh] lg:h-full bg-white border-b lg:border-b-0 lg:border-r border-slate-200 w-full lg:w-[380px] xl:w-[420px] shrink-0 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <Bot className="w-4 h-4 text-[#005696]" />
          Agent Copilot
        </h2>
        <span className="text-[10px] bg-[#e0f4fc] text-[#005696] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          AI Powered
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* User Query Log */}
        <div className="flex flex-col items-end">
          <div className="bg-[#005696] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm">
            mata tharindu perera, 269 vidyachanda mawatha ahangama inne eyge mobile number eka denna
          </div>
          <span className="text-[10px] text-slate-400 mt-1 mr-1 flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 font-medium">Singlish Audio</span> 
            11:12 AM
          </span>
        </div>

        {/* AI Response */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start"
        >
          <div className="bg-slate-100 border border-slate-200 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[95%] text-sm shadow-sm">
            <p className="mb-2">Here is the contact information matching <span className="font-semibold">Tharindu Perera</span> in <span className="font-semibold">Ahangama</span>:</p>
            
            <div className="space-y-2 mt-3">
              <div className="bg-white p-3 rounded border border-[#005696]/20 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00A3E0]"></div>
                <div className="flex items-center justify-between mb-2 pl-2">
                  <span className="text-sm font-bold text-slate-900">Tharindu Perera</span>
                  <span className="text-[10px] flex items-center text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Resident
                  </span>
                </div>
                
                <div className="pl-2 mb-3 text-xs text-slate-600 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" />
                  <span>269, Vidyachanda Mawatha,<br/>Ahangama, Southern Province</span>
                </div>

                <div className="flex items-center justify-between group bg-slate-50 p-2 rounded border border-slate-100 ml-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-base font-bold tabular-nums text-slate-900 tracking-tight">071 3 452 890</span>
                  </div>
                  <button className="text-slate-400 hover:text-[#005696] transition-colors p-1.5 bg-white border border-slate-200 rounded shadow-sm group-hover:border-[#005696]/30" title="Copy">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-1.5 p-2 bg-blue-50 rounded border border-blue-100 text-xs text-[#005696]">
              <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <p>Found this match with 98% confidence based on name and address similarity.</p>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 ml-1 flex items-center gap-1">
            10:24 AM • Copilot
          </span>
        </motion.div>
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="relative">
          <textarea
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005696]/20 focus:border-[#005696] resize-none h-12 transition-all"
            placeholder="Type your query here..."
            readOnly
          ></textarea>
          <button className="absolute right-2 top-2.5 p-1 bg-[#005696] text-white rounded-md hover:bg-[#00407a] transition-colors">
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-2">
          Copilot can make mistakes. Always verify critical escalations.
        </p>
      </div>
    </div>
  );
}
