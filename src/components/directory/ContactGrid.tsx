"use client";

import React, { useState } from 'react';
import { Copy, PhoneCall, AlertTriangle, CheckCircle2, Clock, MapPin, Building2, ChevronDown, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_CONTACTS = [
  {
    id: 1,
    name: 'Kandy General Hospital',
    nameSi: 'මහනුවර මහ රෝහල',
    nameTa: 'கண்டி பொது வைத்தியசாலை',
    type: 'Hospital Hotlines',
    primaryNumber: '081 2 222 222',
    extensions: ['Ext 101 - Emergency', 'Ext 105 - Blood Bank'],
    status: 'Open',
    hours: '24/7',
    address: 'William Gopallawa Mawatha, Kandy',
    verified: true,
    escalationTier: 'Tier 1'
  },
  {
    id: 2,
    name: 'SLT Regional Telecom Office - Kandy',
    nameSi: 'ශ්‍රී ලංකා ටෙලිකොම් ප්‍රාදේශීය කාර්යාලය - මහනුවර',
    nameTa: 'ஸ்ரீலங்கா டெலிகொம் பிராந்திய அலுவலகம் - கண்டி',
    type: 'Regional Telecom Offices (RTO)',
    primaryNumber: '081 2 233 233',
    extensions: ['Ext 1 - Faults', 'Ext 2 - Billing'],
    status: 'Closed',
    hours: '8:30 AM - 5:00 PM (Lunch 12:30-1:00)',
    address: 'No 7, Yatinuwara Veediya, Kandy',
    verified: true,
    escalationTier: 'Tier 2'
  },
  {
    id: 3,
    name: 'Police Emergency (Kandy Division)',
    nameSi: 'පොලිස් හදිසි ඇමතුම් (මහනුවර)',
    nameTa: 'பொலிஸ் அவசர பிரிவு (கண்டி)',
    type: 'Emergency & Public Services',
    primaryNumber: '081 2 222 224',
    extensions: [],
    status: 'Open',
    hours: '24/7',
    address: 'Police Station, Kandy',
    verified: true,
    escalationTier: 'Tier 1'
  }
];

export default function ContactGrid() {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
      {/* Search Header & Chips */}
      <div className="p-6 border-b border-slate-200 bg-white">
        <h1 className="text-xl font-bold text-slate-900 mb-4">Directory Search</h1>
        <div className="relative mb-4 group">
          <input 
            type="text" 
            className="w-full text-lg pl-4 pr-12 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#005696] focus:ring-4 focus:ring-[#005696]/10 transition-all bg-white shadow-sm font-medium placeholder-slate-400"
            placeholder="Search by branch name, hotline, emergency, department, or mixed Sinhala/Tamil queries..."
            defaultValue="Kandy"
          />
          <div className="absolute right-3 top-3 px-2 py-1 bg-slate-100 text-slate-400 text-xs font-semibold rounded border border-slate-200">
            Enter ↵
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#005696] text-white border border-[#005696] hover:bg-[#00407a] transition-colors shadow-sm">
            All
          </button>
          <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
            Internal SLT Branches
          </button>
          <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#e0f4fc] text-[#005696] border border-cyan-200 hover:bg-cyan-100 transition-colors shadow-sm">
            Emergency & Public Services
          </button>
          <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
            Hospital Hotlines
          </button>
          <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
            Regional Telecom Offices (RTO)
          </button>
        </div>
      </div>

      {/* Grid Results */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-slate-600">Showing {MOCK_CONTACTS.length} results for <span className="text-slate-900 font-bold">"Kandy"</span></p>
          <button className="text-xs font-medium text-slate-500 flex items-center gap-1 hover:text-slate-800 transition-colors">
            Sort by Relevance <ChevronDown className="w-3 h-3" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {MOCK_CONTACTS.map((contact, idx) => (
            <motion.div 
              key={contact.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#005696]/30 transition-all overflow-hidden flex flex-col group"
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{contact.type}</span>
                    {contact.verified && (
                      <span className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-[#005696] transition-colors">{contact.name}</h3>
                </div>
                <div className={`px-2 py-1 rounded flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                  contact.status === 'Open' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                }`}>
                  <Clock className="w-3 h-3" />
                  {contact.status}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1">
                {/* Trilingual Details */}
                <div className="mb-4">
                  <p className="text-[11px] text-slate-500 font-sans mb-0.5" style={{ fontFamily: 'sans-serif' }}>{contact.nameSi}</p>
                  <p className="text-[11px] text-slate-500 font-sans" style={{ fontFamily: 'sans-serif' }}>{contact.nameTa}</p>
                </div>

                <div className="flex items-end justify-between mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold mb-1 uppercase tracking-wider">Primary Number</p>
                    <p className="text-2xl font-bold tabular-nums tracking-tight text-slate-900">{contact.primaryNumber}</p>
                  </div>
                  <button className="p-2 bg-white border border-slate-200 rounded-md text-slate-600 hover:text-[#005696] hover:border-[#005696] hover:bg-cyan-50 transition-all shadow-sm group-hover:scale-105 active:scale-95" title="Copy Number">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {contact.extensions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[10px] text-slate-500 font-semibold mb-1 uppercase tracking-wider">Extensions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {contact.extensions.map((ext, i) => (
                        <span key={i} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded tabular-nums">
                          {ext}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2 mt-4 text-xs font-medium text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{contact.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{contact.hours}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Escalation: {contact.escalationTier}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex gap-2">
                <button className="flex-1 py-2 bg-[#005696] text-white rounded-lg text-xs font-semibold hover:bg-[#00407a] transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                  <PhoneCall className="w-3.5 h-3.5" />
                  Transfer
                </button>
                <button className="px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 hover:text-[#005696] transition-colors flex items-center justify-center gap-1.5 shadow-sm" title="Copy All Info">
                  <Copy className="w-3.5 h-3.5" />
                  Copy Info
                </button>
                <button className="px-3 py-2 bg-white border border-slate-200 text-slate-400 rounded-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors shadow-sm" title="Report Outdated Info">
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
