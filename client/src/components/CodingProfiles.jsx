import React from 'react';
import { resumeData } from '../data/resumeData';
import { Terminal, Github, Code2, ExternalLink, Flame, Trophy, CheckCircle2, GitCommit } from 'lucide-react';

const CodingProfiles = () => {
  return (
    <section id="coding-profiles" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-brand-500/30 text-brand-400 text-xs font-mono uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>Problem Solving & Open Source</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Coding <span className="text-gradient">Profiles</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Competitive programming activity, Data Structures & Algorithms practice, and GitHub repositories.
          </p>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resumeData.codingProfiles.map((profile, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 flex flex-col justify-between hover:border-cyan-400/50 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      {profile.platform === 'GitHub' && <Github className="w-6 h-6" />}
                      {profile.platform === 'LeetCode' && <Code2 className="w-6 h-6 text-amber-400" />}
                      {profile.platform === 'CodeChef' && <Flame className="w-6 h-6 text-red-400" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {profile.platform}
                      </h3>
                      <p className="text-xs font-mono text-slate-400">@{profile.username}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-medium">
                  {profile.focus}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {Object.entries(profile.stats).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[11px] text-slate-400 font-mono capitalize block">
                        {key}
                      </span>
                      <span className="text-base font-bold text-cyan-300">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={profile.url}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl glass-panel border border-white/10 text-xs font-semibold text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                <span>View Official Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CodingProfiles;
