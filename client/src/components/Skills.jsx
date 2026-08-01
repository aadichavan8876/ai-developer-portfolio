import React, { useState } from 'react';
import { resumeData } from '../data/resumeData';
import { Code, Server, Database, Cpu, Layout, Wrench, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Backend',
    'Programming Languages',
    'Database',
    'Frontend',
    'Computer Science Fundamentals',
    'Tools',
    'Soft Skills'
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Backend': return <Server className="w-4 h-4 text-indigo-400" />;
      case 'Programming Languages': return <Code className="w-4 h-4 text-cyan-400" />;
      case 'Database': return <Database className="w-4 h-4 text-emerald-400" />;
      case 'Frontend': return <Layout className="w-4 h-4 text-pink-400" />;
      case 'Computer Science Fundamentals': return <Cpu className="w-4 h-4 text-yellow-400" />;
      case 'Tools': return <Wrench className="w-4 h-4 text-purple-400" />;
      case 'Soft Skills': return <MessageSquare className="w-4 h-4 text-orange-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  const filteredSkills = activeCategory === 'All'
    ? resumeData.skills
    : resumeData.skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-brand-500/30 text-brand-400 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Proficiency</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Categorized technical capabilities, core computer science subjects, and software engineering tools.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                  : 'glass-panel border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400'
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="glass-card p-5 rounded-2xl border border-white/10 space-y-4 hover:border-cyan-400/50 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-cyan-400 group-hover:scale-110 transition-transform">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Progress Meter Bar */}
              <div className="space-y-1">
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-[1px]">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
