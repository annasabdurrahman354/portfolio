/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Annas's digital assistant. Ask me anything about his experience, skills, or projects! ★" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(scrollToBottom, 100);

    const systemPrompt = `You are the digital assistant for Annas Abdurrahman, a Fullstack Software Developer based in Yogyakarta, Indonesia. 
    Annas is an Informatics graduate from Universitas Sebelas Maret (Bachelor's Degree, Computer Science, 2019-2023).
    
    His top skills include:
    - Web: Fullstack Web Development (Frontend & Backend) using Laravel (Livewire, Filament, Inertia.js), PHP, React, Vue, TailwindCSS, ASP.NET Core (C#), RESTful APIs.
    - Mobile: Mobile Development (Native Android & React Native) using Kotlin, Java, Jetpack, Firebase.
    - Database: Database Administration, Relational Databases, SQL.
    - Others: SEO, Digital Product Optimization, Domain-Driven Design (DDD), Object-Oriented Programming (OOP).
    
    Work Experience:
    - Pondok Pesantren Walibarokah Kediri: Full Stack Engineer (Nov 2024 - Apr 2026). Led digital transformation, built "Generus" ERP.
    - Pondok Pesantren Walibarokah Kediri: ICT Teacher (Jan 2025 - Mar 2026).
    - Freelance Mobile Developer (Nov 2021 - Dec 2023). Developed SAYFINE and CABBLE.
    - Bangkit Academy (Google, GoTo, Traveloka): Mobile Development Cohort (Jan 2022 - Aug 2022).
    - Forest Interactive: Software Engineer (Feb 2022 - June 2022).
    - Tradeasia International: IT Student Trainee (Feb 2022 - May 2022).
    - Universitas Sebelas Maret: Assistant Lecturer (Sep 2020 - Jan 2021).
    
    Certifications:
    - Associate Android Developer (AAD) by Google.
    - Microsoft Technology Associate (MTA): Database Administration Fundamentals.
    
    Awards:
    - Finalist LIDM 2020.
    - Best Individual Performance at Tradeasia International.
    
    Languages: English (Limited Working), Indonesian (Native).
    
    Keep your answers professional, helpful, and slightly playful to match the "Modern Retro" aesthetic of the portfolio.
    If asked about contact info, mention his email: annasabdurrahman354@gmail.com or his LinkedIn.`;

    const responseText = await sendMessageToGemini(`${systemPrompt}\n\nUser: ${input}`);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-6 w-[90vw] md:w-96 bg-white card-container shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-action-blue p-4 flex justify-between items-center border-b-2 border-ink-black">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sticker-yellow rounded-full neo-brutal-border flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-ink-black" />
                </div>
                <h3 className="font-heading font-bold text-ink-black uppercase tracking-tight">Annas's Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-ink-black/50 hover:text-ink-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-80 overflow-y-auto p-6 space-y-4 scroll-smooth bg-[#FDFCF8]"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium neo-brutal-border ${
                      msg.role === 'user'
                        ? 'bg-pop-purple text-ink-black rounded-tr-none rotate-1'
                        : 'bg-white text-ink-black rounded-tl-none -rotate-1'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none neo-brutal-border flex gap-1">
                    <span className="w-1.5 h-1.5 bg-ink-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-ink-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-ink-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t-2 border-ink-black bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-ink-black placeholder-ink-black/30 text-sm font-medium focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-sticker-yellow p-2 rounded-xl neo-brutal-border hover:opacity-90 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-ink-black" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-action-blue flex items-center justify-center sticker-effect neo-brutal-border z-50 group"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-ink-black" />
        ) : (
          <MessageCircle className="w-6 h-6 text-ink-black" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
