import React, { useState } from 'react';
import { Sparkles, X, Code2, Copy, Check, Terminal } from 'lucide-react';
import { callAiApi } from '../../services/api';

const AiCodeGeneratorModal = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('ASP.NET Core Web API Employee Controller');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const presets = [
    "ASP.NET Core Web API Employee Controller",
    "SQL Server Stored Procedure CRUD",
    "Node.js Express Contact API Route",
    "JWT Authentication Middleware in C#",
    "SQL Index Optimization Query"
  ];

  const handleGenerate = async (selectedPrompt) => {
    const activePrompt = selectedPrompt || prompt;
    setLoading(true);
    setCopied(false);
    try {
      const res = await callAiApi('code_generator', `Generate production-ready code snippet for: ${activePrompt}`);
      setCode(res.data.result);
    } catch (e) {
      setCode(`\`\`\`csharp\n// C# ASP.NET Core Controller\n[ApiController]\n[Route("api/[controller]")]\npublic class EmployeesController : ControllerBase {\n  [HttpGet]\n  public IActionResult Get() => Ok();\n}\n\`\`\``);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">AI Full-Stack Code Snippet Generator</h3>
              <p className="text-xs text-slate-400 font-mono">Instant C#, ASP.NET Core, Node.js, & SQL code creation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">Choose Preset or Enter Requirement:</label>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => { setPrompt(p); handleGenerate(p); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                    prompt === p
                      ? 'bg-cyan-600 text-white border border-cyan-400'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. C# Repository Pattern with Dapper & SQL Server..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => handleGenerate(prompt)}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-xs font-semibold hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>{loading ? 'Coding...' : 'Generate Code'}</span>
            </button>
          </div>

          {code && (
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-slate-200 overflow-x-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <span className="text-[11px] text-cyan-400">Generated Snippet Output</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] px-3 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed">{code}</pre>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AiCodeGeneratorModal;
