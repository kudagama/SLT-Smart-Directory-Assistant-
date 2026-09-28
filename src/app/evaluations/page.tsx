"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle2, Target, Clock, Activity, FileText } from 'lucide-react';

export default function EvaluationsPage() {
  return (
    <div className="flex-1 flex overflow-hidden bg-slate-50">
      <div className="flex-1 flex flex-col h-full overflow-y-auto relative">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 px-8 py-10 max-w-5xl mx-auto w-full">
          
          <header className="mb-10 flex items-center justify-between">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/50 border border-indigo-200 text-indigo-700 text-sm font-bold mb-4"
              >
                <Activity className="w-4 h-4" />
                Performance Dashboard
              </motion.div>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Evaluations</span>
              </h1>
              <p className="text-slate-500 text-lg mt-2">
                Review your recent calls and AI feedback to improve your performance.
              </p>
            </div>
          </header>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="border-b border-slate-100 px-6 py-5 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Call with 071 234 5678</h2>
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Today at 10:45 AM • Duration: 04:30
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-3xl font-black text-[#005696]">85<span className="text-lg text-slate-400">%</span></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Score</p>
                  </div>
                  <div className="h-12 w-px bg-slate-200"></div>
                  <div className="text-right">
                    <div className="text-xl font-black text-emerald-500 mb-1">Good</div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sentiment</p>
                  </div>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Strengths */}
                <div className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-emerald-500" /> What went well
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      Promptly greeted the customer and maintained a polite tone throughout.
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      Successfully gathered initial location data (Nugegoda) for coverage checking.
                    </li>
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="bg-rose-50/30 border border-rose-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-6">
                    <AlertTriangle className="w-5 h-5 text-rose-500" /> Areas for Improvement
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-sm text-slate-600 font-medium bg-rose-50/80 p-4 rounded-xl">
                      <span className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</span>
                      <span>
                        <strong className="text-slate-800 block mb-1">Missed Upsell Opportunity:</strong>
                        Failed to mention the "Free Router & Installation" promotion currently active for Fibre connections.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 font-medium bg-rose-50/80 p-4 rounded-xl">
                      <span className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</span>
                      <span>
                        <strong className="text-slate-800 block mb-1">Incomplete Data Collection:</strong>
                        Only gathered the city "Nugegoda" but did not ask for the exact street address which is required for accurate fibre availability validation.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Directory Call Evaluation Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="border-b border-slate-100 px-6 py-5 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Directory Inquiry Call</h2>
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Today at 01:15 PM • Duration: 01:20
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-3xl font-black text-[#005696]">95<span className="text-lg text-slate-400">%</span></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Score</p>
                  </div>
                  <div className="h-12 w-px bg-slate-200"></div>
                  <div className="text-right">
                    <div className="text-xl font-black text-emerald-500 mb-1">Excellent</div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sentiment</p>
                  </div>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Strengths */}
                <div className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-emerald-500" /> What went well
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      Instantly identified the requested branch (BOC Kandy) without asking for repeats.
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      Proactively offered the email address when the customer asked for it.
                    </li>
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="bg-amber-50/30 border border-amber-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-6">
                    <AlertTriangle className="w-5 h-5 text-amber-500" /> Areas for Improvement
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-sm text-slate-600 font-medium bg-amber-50/80 p-4 rounded-xl">
                      <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</span>
                      <span>
                        <strong className="text-slate-800 block mb-1">Transfer Protocol:</strong>
                        Could have offered to directly transfer the call to the BOC Kandy branch instead of just reading the number.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
