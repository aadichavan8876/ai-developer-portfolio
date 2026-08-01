import React, { useState } from 'react';
import { Sparkles, X, HelpCircle, CheckCircle, ChevronRight, RefreshCw, Award } from 'lucide-react';
import { callAiApi } from '../../services/api';

const AiInterviewSimulatorModal = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState('ASP.NET & C#');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const categories = [
    "ASP.NET & C#",
    "SQL Server",
    "DSA & Problem Solving",
    "Backend Development",
    "HR Interview"
  ];

  const handleStartInterview = async () => {
    setLoading(true);
    setShowAnswer(false);
    setActiveIdx(0);
    try {
      const res = await callAiApi('interview_simulator', `Generate technical interview questions for: ${category}`);
      let parsed;
      try {
        parsed = typeof res.data.result === 'string' ? JSON.parse(res.data.result) : res.data.result;
      } catch (e) {
        parsed = {
          questions: [
            {
              id: 1,
              category: category,
              question: `Explain core concepts of ${category} and common architectural patterns.`,
              sampleAnswer: "Demonstrate solid knowledge of principles, optimization, and clean code practices."
            }
          ]
        };
      }
      setQuestions(parsed.questions || []);
    } catch (e) {
      setQuestions([
        {
          id: 1,
          category: category,
          question: "Explain Dependency Injection in ASP.NET Core and difference between Transient, Scoped, Singleton lifetimes.",
          sampleAnswer: "Transient creates new instances per request; Scoped creates per HTTP connection; Singleton creates a single application-wide instance."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const currentQ = questions[activeIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-emerald-500/40 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">AI Technical Interview Simulator</h3>
              <p className="text-xs text-slate-400 font-mono">Practice technical questions based on Aditya's skills</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">Select Interview Domain:</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    category === cat
                      ? 'bg-emerald-600 text-white border border-emerald-400'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-emerald-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartInterview}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs shadow-lg hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{loading ? 'Generating Mock Questions...' : 'Start Mock Technical Session'}</span>
          </button>

          {currentQ && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 border-b border-slate-800 pb-3">
                <span>Question {activeIdx + 1} of {questions.length}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{currentQ.category}</span>
              </div>

              <h4 className="text-lg font-bold text-white leading-relaxed">
                {currentQ.question}
              </h4>

              <div className="pt-2">
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono border border-slate-700"
                >
                  {showAnswer ? 'Hide Model Answer' : 'Show Ideal Technical Answer'}
                </button>

                {showAnswer && (
                  <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono animate-in fade-in">
                    <span className="text-emerald-400 font-bold block mb-1">Model Answer:</span>
                    {currentQ.sampleAnswer}
                  </div>
                )}
              </div>

              {questions.length > 1 && (
                <div className="flex justify-end pt-3 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setShowAnswer(false);
                      setActiveIdx((prev) => (prev + 1) % questions.length);
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AiInterviewSimulatorModal;
