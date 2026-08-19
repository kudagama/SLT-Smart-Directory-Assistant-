"use client";

import React, { useState, useEffect } from 'react';
import { Copy, PhoneCall, CheckCircle2, Clock, MapPin, Building2, ChevronDown, Mic, ExternalLink, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface Contact {
  id: string;
  name: string;
  nameSinhala?: string;
  nameTamil?: string;
  department: string;
  hotline: string;
  extension?: string;
  operatingHours: string;
  location: string;
  type: string;
}

export default function ContactGrid() {
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/contacts/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] h-full overflow-hidden">
      {/* Search Header */}
      <div className="px-8 pt-8 pb-6 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shrink-0 z-10 sticky top-0">
        <div className="relative group">
          <input 
            id="omnibox"
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full text-lg pl-12 pr-36 py-4 rounded-2xl focus:outline-none transition-all duration-300 font-medium placeholder-slate-400 ${
              isListening 
                ? 'bg-white border-2 border-[#00A3E0] shadow-[0_0_0_4px_rgba(0,163,224,0.1)] text-[#005696]' 
                : 'bg-slate-50/50 border border-slate-200/80 shadow-[0_2px_10px_rgb(0,0,0,0.02)] focus:bg-white focus:border-[#00A3E0]/50 focus:shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
            }`}
            placeholder={isListening ? "Listening... Speak now (Sinhala/Tamil/English)" : "Search directory..."}
          />
          <Search className="absolute left-4 top-4.5 w-5 h-5 text-slate-400 group-focus-within:text-[#005696] transition-colors" />
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
      </div>

      {/* Main Result Area */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl -z-10 pointer-events-none opacity-50 mix-blend-multiply"></div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005696]"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            {results.map((contact, idx) => (
              <motion.div 
                key={contact.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all overflow-hidden flex flex-col group"
              >
                <div className="p-5 border-b border-slate-100/80 flex items-start justify-between bg-gradient-to-r from-slate-50/50 to-transparent">
                  <div>
                    <span className="text-[10px] font-bold text-[#00A3E0] uppercase tracking-wider mb-1 block">{contact.type}</span>
                    <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-[#005696] transition-colors">{contact.name}</h3>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 uppercase tracking-wider whitespace-nowrap">
                    <Clock className="w-3 h-3" /> Open
                  </span>
                </div>

                <div className="p-5 flex-1 space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Primary Hotline</p>
                      <p className="text-xl font-bold tabular-nums text-slate-800">{contact.hotline}</p>
                    </div>
                    <button className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-[#005696] hover:border-[#005696]/30 shadow-sm transition-all" title="Copy Number">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs font-medium text-slate-600">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{contact.location}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{contact.department} {contact.extension && `(Ext: ${contact.extension})`}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100/80 bg-slate-50/30">
                  <button className="w-full py-2.5 bg-gradient-to-r from-[#005696] to-[#006bb3] text-white rounded-xl text-xs font-bold hover:shadow-[0_4px_12px_rgba(0,86,150,0.2)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                    <PhoneCall className="w-4 h-4" /> Quick Dial
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg font-medium text-slate-500">No contacts found</p>
            <p className="text-sm">Try searching for a different keyword or location.</p>
          </div>
        )}
      </div>
    </div>
  );
}
