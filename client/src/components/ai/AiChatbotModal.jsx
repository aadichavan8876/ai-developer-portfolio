import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, RefreshCw, MessageSquare } from 'lucide-react';
import { sendAiChat } from '../../services/api';

const AiChatbotModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am Aditya Rajesh Chavan's AI Portfolio Assistant. Ask me anything about Aditya's background, education, internship at CodeReach Software, projects, or technical skills!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Tell me about yourself",
    "Explain your internship at CodeReach",
    "What technologies do you know?",
    "Tell me about your Employee Mgmt System",
    "What are your strengths?",
    "Tell me about your certifications"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (customPrompt) => {
    const query = customPrompt || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const res = await sendAiChat(query);
      const botText = res.data.result || "Thank you for asking!";
      setMessages(prev => [...prev, { sender: 'bot', text: botText }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "Aditya Rajesh Chavan is a .NET Core Developer proficient in C#, ASP.NET, SQL Server, and DSA. He completed a 6-month internship at CodeReach Software Pvt Ltd and built projects like Employee Management and Online Food Ordering System."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-indigo-500/40 shadow-2xl flex flex-col h-[650px] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 p-[2px]">
              <div className="w-full h-full bg-[#0a0d14] rounded-[10px] flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <span>AI Resume Assistant</span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-cyan-500/20 text-cyan-300 font-mono">Resume-Trained</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">Answering only based on Aditya's Resume</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/40">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Thinking based on Aditya's resume...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompt Chips */}
        <div className="px-5 py-2 border-t border-white/10 bg-slate-950/60 overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 text-xs whitespace-nowrap shrink-0 transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 border-t border-white/10 bg-slate-900/90 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Aditya's C# skills, internship, or projects..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:scale-105 transition-transform flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

export default AiChatbotModal;
