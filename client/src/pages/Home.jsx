import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import CodingProfiles from '../components/CodingProfiles';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';

// AI Modals & Admin
import AiChatbotModal from '../components/ai/AiChatbotModal';
import AiProjectExplainerModal from '../components/ai/AiProjectExplainerModal';
import AiCareerAdvisorModal from '../components/ai/AiCareerAdvisorModal';
import AiInterviewSimulatorModal from '../components/ai/AiInterviewSimulatorModal';
import AiResumeAnalyzerModal from '../components/ai/AiResumeAnalyzerModal';
import AiCodeGeneratorModal from '../components/ai/AiCodeGeneratorModal';
import AdminDashboard from './AdminDashboard';

import { Sparkles, Bot, Code2, Compass, Award, FileSearch, MessageSquare } from 'lucide-react';

const Home = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [projectExplainerOpen, setProjectExplainerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [careerAdvisorOpen, setCareerAdvisorOpen] = useState(false);
  const [interviewSimOpen, setInterviewSimOpen] = useState(false);
  const [resumeAnalyzerOpen, setResumeAnalyzerOpen] = useState(false);
  const [codeGenOpen, setCodeGenOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const [aiHubOpen, setAiHubOpen] = useState(false);

  const handleExplainProject = (project) => {
    setSelectedProject(project);
    setProjectExplainerOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0d14] text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Background Visual Effects */}
      <ParticleBackground />
      <CustomCursor />
      <ScrollProgress />

      {/* Header Navbar */}
      <Navbar
        onOpenAiHub={() => setAiHubOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Page Sections */}
      <main className="relative z-10 space-y-12">
        <Hero
          onOpenAiHub={() => setAiHubOpen(true)}
          onOpenChatbot={() => setChatbotOpen(true)}
        />

        <About />

        <Skills />

        <Projects onExplainProject={handleExplainProject} />

        <Certifications />

        <CodingProfiles />

        <Contact />
      </main>

      <Footer />

      {/* Floating AI Hub Quick Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {aiHubOpen && (
          <div className="glass-panel p-4 rounded-2xl border border-indigo-500/40 shadow-2xl space-y-2 mb-2 animate-in fade-in slide-in-from-bottom-4 w-64">
            <span className="text-xs font-bold text-cyan-400 font-mono block border-b border-white/10 pb-2">
              ✨ Select AI Feature Tool
            </span>
            <button
              onClick={() => { setAiHubOpen(false); setChatbotOpen(true); }}
              className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-cyan-300 text-left"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>AI Resume Chatbot</span>
            </button>
            <button
              onClick={() => { setAiHubOpen(false); setCareerAdvisorOpen(true); }}
              className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-purple-300 text-left"
            >
              <Compass className="w-4 h-4 text-purple-400" />
              <span>AI Career Advisor</span>
            </button>
            <button
              onClick={() => { setAiHubOpen(false); setInterviewSimOpen(true); }}
              className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-emerald-300 text-left"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>AI Interview Simulator</span>
            </button>
            <button
              onClick={() => { setAiHubOpen(false); setResumeAnalyzerOpen(true); }}
              className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-blue-300 text-left"
            >
              <FileSearch className="w-4 h-4 text-blue-400" />
              <span>AI Resume Analyzer</span>
            </button>
            <button
              onClick={() => { setAiHubOpen(false); setCodeGenOpen(true); }}
              className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-yellow-300 text-left"
            >
              <Code2 className="w-4 h-4 text-yellow-400" />
              <span>AI Code Generator</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setAiHubOpen(!aiHubOpen)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs shadow-2xl shadow-indigo-500/50 hover:scale-110 transition-transform"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>AI Hub</span>
        </button>
      </div>

      {/* AI Modals */}
      <AiChatbotModal isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
      <AiProjectExplainerModal isOpen={projectExplainerOpen} onClose={() => setProjectExplainerOpen(false)} project={selectedProject} />
      <AiCareerAdvisorModal isOpen={careerAdvisorOpen} onClose={() => setCareerAdvisorOpen(false)} />
      <AiInterviewSimulatorModal isOpen={interviewSimOpen} onClose={() => setInterviewSimOpen(false)} />
      <AiResumeAnalyzerModal isOpen={resumeAnalyzerOpen} onClose={() => setResumeAnalyzerOpen(false)} />
      <AiCodeGeneratorModal isOpen={codeGenOpen} onClose={() => setCodeGenOpen(false)} />

      {/* Admin Dashboard */}
      <AdminDashboard isOpen={adminOpen} onClose={() => setAdminOpen(false)} />

    </div>
  );
};

export default Home;
