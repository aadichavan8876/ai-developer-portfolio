import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Sparkles, Lock, Menu, X, Code2 } from 'lucide-react';

const Navbar = ({ onOpenAiHub, onOpenAdmin }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Coding Profiles', href: '#coding-profiles' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#0a0d14]/80 dark:bg-[#0a0d14]/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0a0d14] rounded-[10px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Aditya Chavan
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase">
              .NET Core & Full-Stack
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-2 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* AI Features Button */}
          <button
            onClick={onOpenAiHub}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-medium text-xs shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span>AI Tools</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Admin Panel Trigger */}
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-400 hover:text-white hover:border-indigo-400 transition-all"
            title="Admin Dashboard"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenAiHub}
            className="p-2 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-cyan-300 text-xs font-medium flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>AI</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel mx-4 mt-2 p-5 rounded-2xl border border-white/10 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-cyan-400 hover:bg-white/5 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
            >
              <Lock className="w-4 h-4" />
              <span>Admin Access</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
