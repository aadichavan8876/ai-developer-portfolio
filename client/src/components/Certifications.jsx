import React from 'react';
import { resumeData } from '../data/resumeData';
import { Award, CheckCircle2, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-brand-500/30 text-brand-400 text-xs font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Validations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Professional <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Official certifications verified in .NET Development, SQL Server Administration, and Web Technologies.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Bar */}
          <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500" />

          <div className="space-y-8 sm:space-y-12">
            {resumeData.certifications.map((cert, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row items-center gap-6 ${
                  index % 2 === 0 ? 'sm:flex-row-reverse text-left sm:text-right' : 'text-left'
                }`}
              >
                {/* Timeline Card Content */}
                <div className="w-full sm:w-1/2">
                  <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 hover:border-cyan-400/50 transition-all group">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{cert.date}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {cert.title}
                    </h3>

                    <p className="text-xs text-slate-400 font-mono">
                      Issued by: {cert.issuer}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Node Badge */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/30 z-10 shrink-0 hidden sm:flex items-center justify-center">
                  <div className="w-full h-full bg-[#0a0d14] rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>

                {/* Empty Spacer Column for layout symmetry */}
                <div className="hidden sm:block w-1/2" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Certifications;
