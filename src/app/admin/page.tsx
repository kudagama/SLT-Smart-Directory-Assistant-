"use client";

import React from 'react';
import { Search, Database, ShieldAlert, CheckCircle, Clock, MoreVertical, Filter, Download, ArrowUpRight, Activity, TrendingUp, AlertTriangle, Plus, Server } from 'lucide-react';

const KPI_DATA = [
  { label: 'Total Verified Numbers', value: '14,820', delta: '+124', icon: Database, color: 'text-emerald-400', isPositive: true },
  { label: 'Daily Search Volume', value: '42,500', delta: '+5.2%', icon: Activity, color: 'text-[#00A3E0]', isPositive: true },
  { label: 'AI Accuracy / Match Rate', value: '98.4%', delta: '+1.2%', icon: TrendingUp, color: 'text-emerald-400', isPositive: true },
  { label: 'Failed / Escalated', value: '1.6%', delta: '-0.3%', icon: AlertTriangle, color: 'text-amber-400', isPositive: false, highlight: true },
];

const DIRECTORY_DATA = [
  { id: 'DIR-892', nameEn: 'National Hospital Colombo', nameSi: 'ජාතික රෝහල කොළඹ', nameTa: 'தேசிய மருத்துவமனை கொழும்பு', category: 'Hospital Hotlines', number: '011 2 691 111', status: 'Verified', updated: 'Today, 10:24 AM', syncStatus: 'Synced' },
  { id: 'DIR-893', nameEn: 'SLT RTO - Gampaha', nameSi: 'ශ්‍රී ලංකා ටෙලිකොම් - ගම්පහ', nameTa: 'ஸ்ரீலங்கா டெலிகொம் - கம்பஹா', category: 'RTO', number: '033 2 222 233', status: 'Pending Approval', updated: 'Yesterday, 04:15 PM', syncStatus: 'Syncing...' },
  { id: 'DIR-894', nameEn: 'Police Emergency (Colombo)', nameSi: 'පොලිස් හදිසි ඇමතුම්', nameTa: 'பொலிஸ் அவசர பிரிவு', category: 'Emergency', number: '119', status: 'Verified', updated: 'Oct 12, 2026', syncStatus: 'Synced' },
  { id: 'DIR-895', nameEn: 'Kurunegala Fire Station', nameSi: 'කුරුණෑගල ගිනි නිවන ඒකකය', nameTa: 'குருநாகல் தீயணைப்பு நிலையம்', category: 'Emergency', number: '037 2 222 222', status: 'Needs Audit', updated: 'Oct 05, 2026', syncStatus: 'Sync Failed' },
  { id: 'DIR-896', nameEn: 'Ministry of Health Helpdesk', nameSi: 'සෞඛ්‍ය අමාත්‍යාංශය', nameTa: 'சுகாதார அமைச்சு', category: 'Public Services', number: '1999', status: 'Verified', updated: 'Oct 01, 2026', syncStatus: 'Synced' },
];

export default function AdminPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#0F172A] text-slate-200">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Top Search & Profile Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Directory Management</h1>
            <p className="text-sm text-slate-400 mt-1">Manage core directory schemas and vector embeddings.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative w-64 hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="w-full pl-9 pr-4 py-2 bg-[#1E293B] border border-slate-700/50 rounded-lg text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-all text-slate-200 placeholder-slate-500"
              />
            </div>
            <button className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg text-sm font-semibold hover:bg-[#008bc0] transition-colors shadow-[0_0_15px_rgba(0,163,224,0.2)] flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Entity
            </button>
          </div>
        </div>

        {/* Top KPI Bento Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_DATA.map((kpi, idx) => (
            <div key={idx} className={`p-5 rounded-xl border ${kpi.highlight ? 'bg-[#1E293B] border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.05)]' : 'bg-[#1E293B] border-slate-700/50 shadow-sm'} flex flex-col relative overflow-hidden group`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <kpi.icon className={`w-4 h-4 ${kpi.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div className="flex items-end justify-between">
                <div className={`text-3xl font-bold tabular-nums tracking-tight ${kpi.highlight ? 'text-white' : 'text-slate-100'}`}>
                  {kpi.value}
                </div>
                <div className={`text-xs font-bold flex items-center gap-0.5 mb-1 ${kpi.isPositive ? 'text-emerald-400' : 'text-emerald-400'}`}>
                  {kpi.highlight ? <span className="text-amber-400">{kpi.delta}</span> : <span><ArrowUpRight className="w-3 h-3 inline" /> {kpi.delta}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Central Data Grid (Directory Management) */}
        <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-4 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1E293B]">
            <h2 className="text-base font-bold text-slate-100">Core Directory Entities</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-[#0F172A] border border-slate-700 text-slate-300 rounded text-xs font-medium hover:bg-slate-800 transition-colors flex items-center gap-1.5">
                <Filter className="w-3 h-3" /> Filters
              </button>
              <button className="px-3 py-1.5 bg-[#0F172A] border border-slate-700 text-slate-300 rounded text-xs font-medium hover:bg-slate-800 transition-colors flex items-center gap-1.5">
                <Download className="w-3 h-3" /> Export
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-[11px] font-semibold text-slate-400 uppercase bg-[#0F172A]/50 border-b border-slate-700/50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3">ID / Entity Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Primary Contact</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Vector Sync</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {DIRECTORY_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#0F172A]/40 transition-colors group">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-500">{row.id}</span>
                        <div>
                          <p className="font-bold text-slate-200 group-hover:text-[#00A3E0] transition-colors">{row.nameEn}</p>
                          <p className="text-[10px] text-slate-500 font-sans" style={{ fontFamily: 'sans-serif' }}>{row.nameSi} • {row.nameTa}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-slate-400 text-xs">{row.category}</td>
                    <td className="px-6 py-3 font-medium tabular-nums text-slate-300">{row.number}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
                        ${row.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                        ${row.status === 'Pending Approval' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                        ${row.status === 'Needs Audit' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : ''}
                      `}>
                        {row.status === 'Verified' && <CheckCircle className="w-3 h-3" />}
                        {row.status === 'Pending Approval' && <Clock className="w-3 h-3" />}
                        {row.status === 'Needs Audit' && <ShieldAlert className="w-3 h-3" />}
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 cursor-help relative group/tooltip">
                        <Server className={`w-3.5 h-3.5 ${row.syncStatus === 'Synced' ? 'text-emerald-500' : row.syncStatus === 'Sync Failed' ? 'text-rose-500' : 'text-[#00A3E0] animate-pulse'}`} />
                        {row.syncStatus}
                        
                        {/* Hover Modal */}
                        <div className="absolute left-0 bottom-full mb-2 w-48 p-3 bg-[#0F172A] border border-slate-700 rounded-lg shadow-xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity z-20">
                          <p className="text-xs font-semibold text-slate-300 mb-1">MongoDB Vector Sync</p>
                          <p className="text-[10px] text-slate-500">Last attempt: {row.updated}</p>
                          <p className="text-[10px] text-slate-400 mt-2 font-mono">Embedding ID: E-{row.id.split('-')[1]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button className="text-slate-500 hover:text-white p-1 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Bar Chart */}
          <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-100 mb-4">Query Volume by Language</h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">English / Singlish (EN)</span>
                  <span className="text-white">50%</span>
                </div>
                <div className="w-full bg-[#0F172A] rounded-full h-2">
                  <div className="bg-[#00A3E0] h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Sinhala (SI)</span>
                  <span className="text-white">35%</span>
                </div>
                <div className="w-full bg-[#0F172A] rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Tamil (TA)</span>
                  <span className="text-white">15%</span>
                </div>
                <div className="w-full bg-[#0F172A] rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Failed Searches Log */}
          <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 shadow-sm flex flex-col h-[200px]">
            <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Live Failed Searches Log
              </h2>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-start justify-between gap-4 p-3 bg-[#0F172A] rounded-lg border border-slate-700/50 group hover:border-slate-600 transition-colors">
                <div>
                  <p className="text-xs font-mono text-slate-400 mb-1">QID: 9942 • 2 mins ago</p>
                  <p className="text-sm text-slate-200 font-medium">"nugegoda branch manager direct number ekak"</p>
                </div>
                <button className="px-2 py-1 bg-[#1E293B] border border-slate-600 text-slate-300 rounded text-[10px] font-semibold hover:bg-slate-700 hover:text-white transition-colors whitespace-nowrap opacity-0 group-hover:opacity-100">
                  + Add to KB
                </button>
              </div>
              
              <div className="flex items-start justify-between gap-4 p-3 bg-[#0F172A] rounded-lg border border-slate-700/50 group hover:border-slate-600 transition-colors">
                <div>
                  <p className="text-xs font-mono text-slate-400 mb-1">QID: 9941 • 5 mins ago</p>
                  <p className="text-sm text-slate-200 font-medium">"jaffna technical fault team head"</p>
                </div>
                <button className="px-2 py-1 bg-[#1E293B] border border-slate-600 text-slate-300 rounded text-[10px] font-semibold hover:bg-slate-700 hover:text-white transition-colors whitespace-nowrap opacity-0 group-hover:opacity-100">
                  + Add to KB
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
