"use client";

import React from 'react';
import { Settings, Users, Database, ShieldAlert, CheckCircle, Clock, Search, MoreVertical, Filter, Download, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-6 h-6 text-[#005696]" />
              Directory Administration
            </h1>
            <p className="text-sm text-slate-500 mt-1">Manage contact records, view analytics, and handle escalations.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-4 py-2 bg-[#005696] text-white rounded-lg text-sm font-semibold hover:bg-[#00407a] transition-colors shadow-sm">
              + New Record
            </button>
          </div>
        </div>

        {/* Analytics Snapshot Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-500">Total Records</span>
              <Database className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900">4,289</div>
            <div className="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +12 this week
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-500">Pending Review</span>
              <ShieldAlert className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900">24</div>
            <div className="mt-2 text-xs font-medium text-slate-500">Requires supervisor approval</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-500">Query Volume (Today)</span>
              <Activity className="w-4 h-4 text-[#005696]" />
            </div>
            <div className="text-3xl font-bold text-slate-900">12.4k</div>
            <div className="mt-2 text-xs font-medium text-rose-600 flex items-center gap-1">
              Failed lookups: 1.2%
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-500">Language Dist.</span>
              <Users className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="flex-1 mt-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium w-6">SI</span>
                <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#005696] h-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-xs text-slate-500 w-8 text-right">65%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium w-6">TA</span>
                <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full" style={{ width: '25%' }}></div>
                </div>
                <span className="text-xs text-slate-500 w-8 text-right">25%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium w-6">EN</span>
                <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full" style={{ width: '10%' }}></div>
                </div>
                <span className="text-xs text-slate-500 w-8 text-right">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* CRUD Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search records..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#005696]/20 focus:border-[#005696] transition-all"
              />
            </div>
            <button className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">Contact Name</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Primary Number</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Last Updated</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900">National Hospital Colombo</td>
                  <td className="px-6 py-4">Hospital Hotlines</td>
                  <td className="px-6 py-4 font-medium tabular-nums">011 2 691 111</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">Today, 10:24 AM</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-[#005696] p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900">SLT RTO - Gampaha</td>
                  <td className="px-6 py-4">RTO</td>
                  <td className="px-6 py-4 font-medium tabular-nums">033 2 222 233</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs font-semibold">
                      <Clock className="w-3 h-3" /> Pending Approval
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">Yesterday, 04:15 PM</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-[#005696] p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900">Police Emergency (Colombo)</td>
                  <td className="px-6 py-4">Emergency</td>
                  <td className="px-6 py-4 font-medium tabular-nums">119</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">Oct 12, 2026</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-[#005696] p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900">Kurunegala Fire Station</td>
                  <td className="px-6 py-4">Emergency</td>
                  <td className="px-6 py-4 font-medium tabular-nums">037 2 222 222</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100">
                      <ShieldAlert className="w-3 h-3" /> Outdated
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">Oct 05, 2026</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-[#005696] p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing 1 to 4 of 4,289 records</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-400 cursor-not-allowed">Prev</button>
              <button className="px-2 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
