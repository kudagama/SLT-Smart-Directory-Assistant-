"use client";

import React, { useState } from 'react';
import { Search, Globe, User, PhoneCall, HelpCircle, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function TopNavigation() {
  const [language, setLanguage] = useState('EN');

  const toggleLanguage = () => {
    const langs = ['EN', 'SI', 'TA'];
    const nextIndex = (langs.indexOf(language) + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shadow-sm z-10 shrink-0">
      {/* Left: Branding */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#005696] rounded-md flex items-center justify-center text-white font-bold tracking-tighter">
          SLT
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-900 leading-tight">Smart Directory</h1>
          <p className="text-[10px] text-slate-500 font-medium leading-none">Contact Center Assistant</p>
        </div>
        <div className="hidden md:flex items-center ml-4 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></div>
          Live DB Connected
        </div>
      </div>

      {/* Center: Main Search (Optional here, we have omnibox in main view, but let's add a global shortcut hint) */}
      <div className="hidden lg:flex items-center justify-center flex-1 max-w-md mx-6">
        <div className="relative w-full text-slate-400 focus-within:text-[#005696] transition-colors">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-md leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#005696] focus:border-[#005696] sm:text-sm transition-all"
            placeholder="Quick search..."
            readOnly
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <span className="inline-flex items-center px-1.5 rounded border border-slate-200 text-[10px] font-sans font-medium text-slate-400">
              /
            </span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 mr-2">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-[#005696] transition-colors flex items-center gap-1.5">
            <Search className="w-4 h-4" />
            Directory
          </Link>
          <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-[#005696] transition-colors flex items-center gap-1.5">
            <LayoutDashboard className="w-4 h-4" />
            Admin
          </Link>
        </nav>

        <div className="w-px h-5 bg-slate-200 hidden md:block"></div>

        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-100 text-sm font-medium text-slate-600 transition-colors"
          title="Toggle Language"
        >
          <Globe className="w-4 h-4 text-slate-400" />
          <span className="w-4 text-center">{language}</span>
        </button>

        {/* Support/Help */}
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Agent Profile */}
        <button className="flex items-center gap-2 pl-2 border-l border-slate-200 group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-700 leading-none group-hover:text-[#005696] transition-colors">A. Perera</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Tier 2 Support</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#e0f4fc] border border-cyan-100 flex items-center justify-center text-[#005696]">
            <User className="w-4 h-4" />
          </div>
        </button>
      </div>
    </header>
  );
}
