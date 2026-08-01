import React from 'react';
import { resumeData } from '../data/resumeData';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#07090f] py-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="font-bold text-white">{resumeData.personalInfo.name}</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span>.NET & Full-Stack AI Developer Portfolio</span>
        </div>

        <div className="flex items-center gap-4">
          <a href={resumeData.personalInfo.githubUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
            <Github className="w-4 h-4" />
          </a>
          <a href={resumeData.personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-cyan-400">
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center gap-1">
          <span>Built with React, Tailwind & Node.js</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
