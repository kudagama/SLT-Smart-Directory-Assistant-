"use client";

import React, { useState } from 'react';
import { Bot, Sparkles, AlertCircle, Phone, Copy } from 'lucide-react';
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
            I need the hotline for Kandy General Hospital and the local RTO number.
          </div>
          <span className="text-[10px] text-slate-400 mt-1 mr-1">10:24 AM</span>
        </div>

        {/* AI Response */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start"
        >
          <div className="bg-slate-100 border border-slate-200 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[95%] text-sm shadow-sm">
            <p className="mb-2">Here are the verified contacts for Kandy General Hospital and the Kandy Regional Telecom Office:</p>
            
            <div className="space-y-2 mt-3">
              <div className="bg-white p-2.5 rounded border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-700">Kandy General Hospital</span>
                  <span className="text-[10px] flex items-center text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">99% Verified</span>
                </div>
                <div className="flex items-center justify-between group">
                  <span className="text-sm font-bold tabular-nums text-slate-900">081 2 222 222</span>
                  <button className="text-slate-400 hover:text-[#005696] transition-colors p-1" title="Copy">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-700">SLT RTO - Kandy</span>
                  <span className="text-[10px] flex items-center text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">100% Verified</span>
                </div>
                <div className="flex items-center justify-between group">
                  <span className="text-sm font-bold tabular-nums text-slate-900">081 2 233 233</span>
                  <button className="text-slate-400 hover:text-[#005696] transition-colors p-1" title="Copy">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-1.5 p-2 bg-amber-50 rounded border border-amber-100 text-xs text-amber-800">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <p>Note: The RTO is currently on lunch break until 1:00 PM.</p>
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
