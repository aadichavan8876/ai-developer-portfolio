import React, { useState } from 'react';
import { Sparkles, X, Compass, ArrowRight, Lightbulb, BookOpen, CheckCircle } from 'lucide-react';
import { callAiApi } from '../../services/api';

const AiCareerAdvisorModal = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('.NET Backend Roadmap');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const presets = [
    ".NET Backend Roadmap",
    "What should I learn next?",
    "Interview Preparation Strategy",
    "Resume Improvement Tips"
  ];

  const handleGenerate = async (selectedTopic) => {
    const activeTopic = selectedTopic || topic;
    setLoading(true);
    try {
      const res = await callAiApi('career_advisor', `Provide career advice and roadmap for: ${activeTopic}`);
      setResult(res.data.result);
    } catch (e) {
      setResult(`### 🗺️ ${activeTopic}\n- **Focus**: Master ASP.NET Core Web APIs & Entity Framework Core.\n- **Cloud**: Learn AWS or Azure deployments.\n- **DSA**: Practice 1-2 Medium problems daily on LeetCode.`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-purple-500/40 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">AI Career Advisor & Roadmap</h3>
              <p className="text-xs text-slate-400 font-mono">Personalized guidance for software engineers</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">Select Advice Topic or Ask Question:</label>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => { setTopic(p); handleGenerate(p); }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    topic === p
                      ? 'bg-purple-600 text-white border border-purple-400'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-purple-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleGenerate(topic)}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{loading ? 'Analyzing Career Roadmap...' : 'Generate Career Guidance'}</span>
          </button>

          {result && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm leading-relaxed text-slate-200 whitespace-pre-line space-y-2 font-mono">
              {result}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AiCareerAdvisorModal;
