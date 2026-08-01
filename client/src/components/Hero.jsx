import React, { useState } from 'react';
import { resumeData } from '../data/resumeData';
import { Download, Mail, Sparkles, Github, Linkedin, Code, Database, Server, Terminal, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { trackAnalytics } from '../services/api';

const Hero = ({ onOpenAiHub, onOpenChatbot }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadCount, setDownloadCount] = useState(345);

  const handleDownloadResume = async () => {
    setDownloading(true);
    try {
      await trackAnalytics('resume_download');
      setDownloadCount(prev => prev + 1);

      // Trigger Confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Initiate download
      const response = await fetch('/api/resume/download');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Aditya_Rajesh_Chavan_Resume.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        // Fallback simple download
        const blob = new Blob([resumeData.personalInfo.summary], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Aditya_Rajesh_Chavan_Resume.txt';
        a.click();
      }
    } catch (e) {
      console.warn('Resume download triggered');
    } finally {
      setTimeout(() => setDownloading(false), 600);
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Text & Call to Actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Open for Software Developer Roles & .NET Opportunities</span>
          </div>

          {/* Name & Title */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Hi, I'm <span className="text-gradient">{resumeData.personalInfo.name}</span>
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-cyan-400 font-sans tracking-wide">
              {resumeData.personalInfo.title}
            </p>
          </div>

          {/* Short Bio */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            {resumeData.personalInfo.summary}
          </p>

          {/* Key Skill Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['.NET Core', 'C#', 'ASP.NET', 'SQL Server', 'DSA', 'REST APIs', 'Microservices'].map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
                #{tag}
              </span>
            ))}
          </div>

          {/* Call To Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={handleDownloadResume}
              disabled={downloading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Preparing Resume...' : 'Download Resume'}</span>
              <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded bg-white/20 font-mono">
                {downloadCount}
              </span>
            </button>

            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass-panel border border-white/10 text-white font-semibold text-sm hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>

            <button
              onClick={onOpenChatbot}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Ask AI Chatbot</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Profiles:</span>
            <a
              href={resumeData.personalInfo.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg glass-panel hover:text-cyan-400 hover:border-cyan-400 transition-all text-slate-300"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={resumeData.personalInfo.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg glass-panel hover:text-cyan-400 hover:border-cyan-400 transition-all text-slate-300"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              className="p-2.5 rounded-lg glass-panel hover:text-cyan-400 hover:border-cyan-400 transition-all text-slate-300"
              title="Send Direct Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column: Glassmorphic Tech Badge Showcase */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Ambient Background Box */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/30 via-indigo-600/20 to-cyan-500/30 rounded-3xl blur-2xl transform rotate-3 scale-95" />
            
            {/* Main Glass Card */}
            <div className="relative glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-6 animate-float">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono text-slate-400">Aditya_Portfolio.cs</span>
              </div>

              {/* Code Snippet / Highlights */}
              <div className="font-mono text-xs text-slate-300 space-y-2 bg-[#090d16]/90 p-4 rounded-xl border border-slate-800">
                <p className="text-purple-400">using <span className="text-cyan-300">System</span>;</p>
                <p className="text-purple-400">using <span className="text-cyan-300">Microsoft.AspNetCore.Mvc</span>;</p>
                <br />
                <p className="text-blue-400">namespace <span className="text-yellow-300">AdityaPortfolio</span> &#123;</p>
                <p className="pl-4 text-emerald-400">// .NET Developer & Problem Solver</p>
                <p className="pl-4"><span className="text-purple-400">public class</span> <span className="text-amber-300">Developer</span> &#123;</p>
                <p className="pl-8 text-cyan-300">string Name = <span className="text-amber-200">"{resumeData.personalInfo.name}"</span>;</p>
                <p className="pl-8 text-cyan-300">string Role = <span className="text-amber-200">".NET Core Developer"</span>;</p>
                <p className="pl-8 text-cyan-300">string Degree = <span className="text-amber-200">"MSc CA (Appearing)"</span>;</p>
                <p className="pl-4">&#125;</p>
                <p>&#125;</p>
              </div>

              {/* Verified Metrics Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
                  <Server className="w-6 h-6 text-indigo-400" />
                  <div>
                    <div className="text-sm font-bold text-white">6 Months</div>
                    <div className="text-[11px] text-slate-400">.NET Internship</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
                  <Code className="w-6 h-6 text-cyan-400" />
                  <div>
                    <div className="text-sm font-bold text-white">250+ Solved</div>
                    <div className="text-[11px] text-slate-400">LeetCode DSA</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
                  <Database className="w-6 h-6 text-emerald-400" />
                  <div>
                    <div className="text-sm font-bold text-white">SQL Server</div>
                    <div className="text-[11px] text-slate-400">Certified DB</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-sm font-bold text-white">3 Key Projects</div>
                    <div className="text-[11px] text-slate-400">Full-Stack APIs</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
