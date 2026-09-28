"use client";

import React, { useState } from 'react';
import { Search, Activity, User, Calendar, BarChart3, TrendingUp, AlertTriangle, PhoneCall, Star, FileText, CheckCircle2, Lock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-[#0F172A] text-slate-200 min-h-screen w-full">
        <div className="w-full max-w-md bg-[#1E293B] rounded-2xl p-8 border border-slate-700/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-sm text-slate-400">Please sign in to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="Enter username" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="Enter password" />
            </div>
            {loginError && <p className="text-rose-400 text-sm font-medium">Invalid credentials. Please try again.</p>}
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" /> Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('2026-09-28');
  const [reportVisible, setReportVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!serviceId) return;
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setReportVisible(true);
    }, 1000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#0F172A] text-slate-200 min-h-full">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-3">
            <Activity className="w-4 h-4" /> Admin Portal
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Agent Evaluation Audit</h1>
          <p className="text-sm text-slate-400 mt-1">Search for an agent to view their daily AI evaluation report.</p>
        </div>

        {/* Search Bar */}
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700/50 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Agent Service ID</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="e.g. AGT-1024"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <button 
              onClick={handleSearch}
              disabled={!serviceId || isSearching}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Auditing...</>
              ) : (
                <><Search className="w-5 h-5" /> View Report</>
              )}
            </button>
          </div>
        </div>

        {/* Report View */}
        <AnimatePresence>
          {reportVisible && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Profile Card */}
              <div className="bg-gradient-to-r from-slate-800 to-[#1E293B] rounded-2xl p-6 border border-slate-700/50 flex items-center gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="w-20 h-20 rounded-full bg-slate-900 border-4 border-slate-700 flex items-center justify-center shrink-0 shadow-inner z-10">
                  <User className="w-10 h-10 text-slate-400" />
                </div>
                <div className="z-10">
                  <h2 className="text-2xl font-black text-white">{serviceId === 'AGT-1024' ? 'Gehan Jayawardana' : 'Agent ' + serviceId}</h2>
                  <p className="text-sm font-medium text-slate-400">Service ID: {serviceId} • Inbound Support Team</p>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700/50 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <BarChart3 className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Score</p>
                    <div className="text-3xl font-black text-white">90<span className="text-lg text-slate-500">%</span></div>
                  </div>
                </div>
                <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700/50 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <PhoneCall className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Calls</p>
                    <div className="text-3xl font-black text-white">45</div>
                  </div>
                </div>
                <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700/50 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Star className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Sentiment</p>
                    <div className="text-2xl font-black text-white">Excellent</div>
                  </div>
                </div>
              </div>

              {/* Aggregated Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-[#1E293B] rounded-2xl p-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-emerald-400" /> Top Strengths (Daily Aggregated)
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      Consistently followed the standard SLTMobitel greeting on 100% of calls.
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      Excellent cross-selling of Home Plus packages during Fibre inquiries.
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      Kept average hold times under 30 seconds.
                    </li>
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-[#1E293B] rounded-2xl p-6 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.05)] relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-6">
                    <AlertTriangle className="w-5 h-5 text-rose-400" /> Areas for Improvement (Alerts)
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-sm text-slate-300 font-medium bg-[#0F172A] p-4 rounded-xl border border-slate-700/50">
                      <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</span>
                      <span>
                        <strong className="text-slate-100 block mb-1">Data Collection Flags (x3):</strong>
                        Missed asking for the exact street address during new connection feasibility checks.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-300 font-medium bg-[#0F172A] p-4 rounded-xl border border-slate-700/50">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</span>
                      <span>
                        <strong className="text-slate-100 block mb-1">Transfer Protocol (x1):</strong>
                        Forgot to offer warm transfer to Kandy branch and only provided the number.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
