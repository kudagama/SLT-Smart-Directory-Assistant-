"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Phone, Copy, CheckCircle2, MapPin, ExternalLink, Flag, Send, Mic, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { dummyContacts, Contact } from '@/data/contacts';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: string;
  results?: Contact[];
}

export default function CopilotChat() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'user',
      text: 'Kandy RTO billing section hotline ekak ona',
      timestamp: new Date(Date.now() - 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: '2',
      type: 'ai',
      text: 'I found the direct billing lines for the Central Province RTO in Kandy.',
      timestamp: new Date(Date.now() - 59000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      results: [dummyContacts[0]]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSearch = () => {
    if (!input.trim()) return;

    const query = input.toLowerCase();
    const newMessages = [...messages];
    
    newMessages.push({
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const keywords = query.split(' ').filter(k => k.length > 2);
      
      const results = dummyContacts.filter(c => {
        const searchText = `${c.name} ${c.department} ${c.location} ${c.keywords.join(' ')}`.toLowerCase();
        return keywords.some(k => searchText.includes(k));
      });

      let aiText = "I couldn't find any specific contacts matching your query. Please try with different keywords.";
      if (results.length > 0) {
        aiText = `Here are the contacts I found matching your request.`;
      }

      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          results: results.length > 0 ? results : undefined
        }
      ]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFA] relative overflow-hidden font-sans">
      {/* Decorative Background */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none -z-0"></div>
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute top-1/3 -left-24 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl pointer-events-none -z-0"></div>



      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto scroll-smooth z-10 pb-40">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-10 space-y-6 md:space-y-10">
          
          <div className="text-center mb-8 md:mb-10 pt-6 md:pt-10">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#005696] to-[#00A3E0] mx-auto flex items-center justify-center shadow-xl shadow-blue-500/20 mb-4">
              <Bot className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2 md:mb-3 tracking-tight">How can I help you today?</h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium">Search for branches, hotlines, employees, or specific departments.</p>
          </div>

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Avatar */}
                {msg.type === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005696] to-[#00A3E0] flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} max-w-[95%] sm:max-w-[85%]`}>
                  {msg.type === 'user' ? (
                    <div className="bg-slate-800 text-white px-5 sm:px-6 py-3 sm:py-4 rounded-3xl rounded-tr-sm text-sm sm:text-[15px] shadow-sm font-medium leading-relaxed break-words">
                      {msg.text}
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="bg-white border border-slate-200/70 p-5 sm:p-6 rounded-3xl rounded-tl-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-slate-800">
                        <p className="text-sm sm:text-[15px] font-medium leading-relaxed">
                          {msg.text}
                        </p>
                        
                        {msg.results && msg.results.length > 0 && (
                          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {msg.results.map((contact, idx) => (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                key={contact.id} 
                                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:bg-white hover:border-[#00A3E0]/40 hover:shadow-lg transition-all group cursor-default"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#005696] transition-colors line-clamp-1">{contact.name}</h3>
                                    <p className="text-xs text-slate-500 font-medium mt-1">{contact.department}</p>
                                  </div>
                                  <span className="bg-emerald-100 text-emerald-700 p-1.5 rounded-full" title="Verified Match">
                                    <CheckCircle2 className="w-4 h-4" />
                                  </span>
                                </div>
                                
                                <div className="space-y-2 mt-4">
                                  <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl p-2.5 group-hover:border-blue-100 transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                      <Phone className="w-4 h-4 text-[#005696]" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hotline</p>
                                      <p className="text-sm font-black text-slate-800">{contact.hotline}</p>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-[#005696] hover:bg-slate-50 rounded-lg transition-colors" title="Copy Number">
                                      <Copy className="w-4 h-4" />
                                    </button>
                                  </div>

                                  <div className="flex items-center gap-2 text-xs text-slate-500 px-1 pt-1">
                                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate">{contact.location}</span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {msg.results && msg.results.length > 0 && (
                          <div className="mt-6 flex flex-wrap gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-full transition-colors">
                              <Flag className="w-3.5 h-3.5" /> Report Issue
                            </button>
                            <Link href="/escalation" className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                              <ExternalLink className="w-3.5 h-3.5" /> Escalate to L2
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <span className="text-[10px] text-slate-400 mt-2 mx-2 font-semibold">
                    {msg.timestamp}
                  </span>
                </div>

                {/* User Avatar */}
                {msg.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <User className="w-4 h-4 text-slate-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 items-start"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005696] to-[#00A3E0] flex items-center justify-center shrink-0 shadow-sm mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-slate-200/70 p-4 rounded-3xl rounded-tl-sm shadow-sm flex gap-1.5 items-center h-12">
                <motion.div className="w-2 h-2 rounded-full bg-slate-300" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                <motion.div className="w-2 h-2 rounded-full bg-slate-300" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                <motion.div className="w-2 h-2 rounded-full bg-slate-300" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input Area (Floating) */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA] to-transparent pt-24 z-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-2xl sm:rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-200/80 focus-within:ring-4 focus-within:ring-[#00A3E0]/10 focus-within:border-[#00A3E0]/30 transition-all flex flex-col">
            <div className="flex items-end px-2 py-2">
              <button 
                onClick={() => setIsListening(!isListening)}
                className={`p-3 rounded-xl transition-colors shrink-0 mb-1 flex items-center justify-center ${
                  isListening 
                    ? 'text-rose-500 bg-rose-50 animate-pulse shadow-inner' 
                    : 'text-slate-400 hover:text-[#005696] hover:bg-blue-50'
                }`}
                title="Voice Search"
              >
                <Mic className="w-5 h-5" />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                className="w-full bg-transparent py-3 md:py-4 px-2 text-sm md:text-[15px] font-medium focus:outline-none resize-none max-h-32 min-h-[50px] md:min-h-[56px] placeholder-slate-400 self-center overflow-y-auto"
                placeholder={isListening ? "Listening..." : "Ask about contacts..."}
                rows={1}
              />
              <div className="p-1 shrink-0 self-end mb-1">
                <button 
                  onClick={handleSearch}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center hover:bg-[#005696] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:bg-slate-800 disabled:hover:scale-100 shadow-sm"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-slate-400 font-medium mt-4">
            Agent AI Copilot can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
