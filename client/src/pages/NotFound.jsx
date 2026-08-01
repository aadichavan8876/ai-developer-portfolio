import React from 'react';
import { Home as HomeIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0a0d14] text-center space-y-4">
      <h1 className="text-6xl font-extrabold text-cyan-400 font-mono">404</h1>
      <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
      <p className="text-sm text-slate-400 max-w-md">The page you are looking for does not exist in Aditya Chavan's Portfolio.</p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-lg hover:scale-105 transition-transform"
      >
        <HomeIcon className="w-4 h-4" />
        <span>Return to Home</span>
      </a>
    </div>
  );
};

export default NotFound;
