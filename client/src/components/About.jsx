import React from 'react';
import { resumeData } from '../data/resumeData';
import { GraduationCap, Briefcase, Target, Award, CheckCircle, Calendar, MapPin, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-brand-500/30 text-brand-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personal Bio & Education</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            About <span className="text-gradient">Aditya Chavan</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Computer Science student, .NET developer intern, and backend engineering enthusiast.
          </p>
        </div>

        {/* Intro & Career Objective Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Introduction Card */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-cyan-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Career Objective & Vision</h3>
                <p className="text-xs text-slate-400 font-mono">Aditya Rajesh Chavan</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {resumeData.personalInfo.objective}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              With hands-on experience developing web applications using <strong>ASP.NET, C#, and SQL Server</strong>, I specialize in building efficient RESTful APIs, implementing robust database normalization, and solving complex algorithmic challenges.
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <span className="text-xs text-slate-400 block font-mono">Location</span>
                <span className="text-sm font-semibold text-white">India</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-mono">Mobile</span>
                <span className="text-sm font-semibold text-cyan-400">{resumeData.personalInfo.mobile}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-mono">Primary Language</span>
                <span className="text-sm font-semibold text-indigo-400">C# / .NET Core</span>
              </div>
            </div>
          </div>

          {/* Internship Highlight Card */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 to-slate-900/60 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Industry Internship</h3>
                  <p className="text-xs text-slate-400 font-mono">6 Months Professional Experience</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium">
                Verified
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-cyan-300">{resumeData.internship.role}</h4>
                  <p className="text-sm text-slate-300 font-medium">{resumeData.internship.company}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-mono bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{resumeData.internship.duration}</span>
                </div>
              </div>

              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300">
                {resumeData.internship.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Education Timeline */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white">Education Qualifications</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resumeData.education.map((item, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 relative overflow-hidden group hover:border-cyan-400/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                    {item.period}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {item.percentage}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors leading-snug">
                    {item.degree}
                  </h4>
                  <p className="text-xs text-slate-400">{item.institution}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
