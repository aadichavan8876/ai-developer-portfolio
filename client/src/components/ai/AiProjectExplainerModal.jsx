import React, { useEffect, useState } from 'react';
import { Sparkles, X, Layers, Database, CheckCircle, AlertTriangle, ArrowRight, Cpu } from 'lucide-react';
import { callAiApi } from '../../services/api';

const AiProjectExplainerModal = ({ isOpen, onClose, project }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && project) {
      setLoading(true);
      callAiApi('project_explainer', `Explain project architecture for ${project.title}`, { projectName: project.title })
        .then((res) => {
          try {
            const parsed = typeof res.data.result === 'string' ? JSON.parse(res.data.result) : res.data.result;
            setData(parsed);
          } catch (e) {
            setData({
              projectName: project.title,
              architecture: project.architecture || "3-Tier Controller-Service-Data Architecture in ASP.NET",
              databaseDesign: project.databaseDesign || "Normalized SQL Server Relational Database",
              features: project.features,
              challenges: project.challenges,
              futureScope: project.futureImprovements
            });
          }
        })
        .catch(() => {
          setData({
            projectName: project.title,
            architecture: project.architecture || "3-Tier Architecture",
            databaseDesign: project.databaseDesign || "Normalized SQL Server Schema",
            features: project.features,
            challenges: project.challenges,
            futureScope: project.futureImprovements
          });
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-6 h-6 animate-pulse text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">{project.title}</h3>
              <p className="text-xs text-slate-400 font-mono">AI Technical Architecture & DB Breakdown</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <Cpu className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
              <p className="text-sm font-mono text-slate-300">Generating Architecture & Database Specifications...</p>
            </div>
          ) : (
            <>
              {/* Architecture Section */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Layers className="w-4 h-4" />
                  <span>System Architecture & Pattern</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                  {data?.architecture}
                </p>
              </div>

              {/* Database Design Section */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Database className="w-4 h-4" />
                  <span>Database Normalization & Schema</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                  {data?.databaseDesign}
                </p>
              </div>

              {/* Grid: Challenges & Future Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Technical Challenges Solved</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {data?.challenges?.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <ArrowRight className="w-4 h-4" />
                    <span>Future Scope & Extensions</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {data?.futureScope?.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </>
          )}
        </div>

        <div className="p-4 border-t border-white/10 bg-slate-950 text-right">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700">
            Close Explainer
          </button>
        </div>

      </div>
    </div>
  );
};

export default AiProjectExplainerModal;
