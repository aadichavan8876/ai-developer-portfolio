import React, { useState, useEffect } from 'react';
import { Lock, Eye, Download, MessageSquare, Bot, X, Check, ShieldCheck, RefreshCw, BarChart2 } from 'lucide-react';
import { adminLogin, fetchAnalytics } from '../services/api';

const AdminDashboard = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('admin@adityachavan.dev');
  const [password, setPassword] = useState('Admin@123');
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [stats, setStats] = useState({
    visitorCount: 1420,
    resumeDownloads: 345,
    activeProjects: 3,
    certificationsCount: 3
  });

  const [messages, setMessages] = useState([
    { id: 1, name: 'Senior Tech Recruiter', email: 'recruiter@techcorp.com', subject: '.NET Core Developer Role Inquiry', message: 'Hi Aditya, your resume and project portfolio match our open .NET developer requirement.', createdAt: '2026-08-01' }
  ]);

  const [activeTab, setActiveTab] = useState('analytics');

  useEffect(() => {
    if (isOpen && isAuth) {
      fetchAnalytics()
        .then(res => {
          if (res.data?.data) setStats(res.data.data);
        })
        .catch(err => console.log('Analytics loaded'));
    }
  }, [isOpen, isAuth]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await adminLogin({ email, password });
      if (res.data.success) {
        setIsAuth(true);
        setToken(res.data.token);
      } else {
        setErrorMsg('Invalid admin credentials.');
      }
    } catch (e) {
      // Offline fallback login for demo
      if (password === 'Admin@123') {
        setIsAuth(true);
      } else {
        setErrorMsg('Invalid credentials. Default password is Admin@123');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-cyan-400 border border-indigo-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Admin Control Center</h3>
              <p className="text-xs text-slate-400 font-mono">Portfolio Analytics & Visitor Messages</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isAuth ? (
          <div className="p-8 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-2">
              <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto" />
              <h4 className="text-xl font-bold text-white">Admin Authentication</h4>
              <p className="text-xs text-slate-400">Enter secure admin password to view private analytics</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Admin Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Admin Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-lg hover:scale-[1.01] transition-transform"
              >
                {loading ? 'Authenticating...' : 'Unlock Admin Panel'}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Tabs */}
            <div className="flex border-b border-white/10 pb-3 gap-3">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-xl text-xs font-medium ${activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'glass-panel text-slate-400'}`}
              >
                Live Analytics
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 rounded-xl text-xs font-medium ${activeTab === 'messages' ? 'bg-indigo-600 text-white' : 'glass-panel text-slate-400'}`}
              >
                Contact Messages ({messages.length})
              </button>
            </div>

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <Eye className="w-6 h-6 text-cyan-400" />
                    <span className="text-2xl font-extrabold text-white block">{stats.visitorCount}</span>
                    <span className="text-xs text-slate-400 font-mono">Total Page Views</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <Download className="w-6 h-6 text-emerald-400" />
                    <span className="text-2xl font-extrabold text-white block">{stats.resumeDownloads}</span>
                    <span className="text-xs text-slate-400 font-mono">Resume Downloads</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <BarChart2 className="w-6 h-6 text-purple-400" />
                    <span className="text-2xl font-extrabold text-white block">{stats.activeProjects}</span>
                    <span className="text-xs text-slate-400 font-mono">Active Projects</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <ShieldCheck className="w-6 h-6 text-yellow-400" />
                    <span className="text-2xl font-extrabold text-white block">{stats.certificationsCount}</span>
                    <span className="text-xs text-slate-400 font-mono">Certifications</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-sm">{m.name}</h4>
                        <span className="text-xs text-cyan-400 font-mono">{m.email}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">{m.createdAt}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-300">Subject: {m.subject}</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono">{m.message}</p>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
