import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full bg-violet-600 opacity-50 blur-lg animate-pulse"></div>
      <div className="absolute inset-0 rounded-full border-4 border-t-violet-400 border-r-violet-400 border-b-transparent border-l-transparent animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-2 border-t-transparent border-r-fuchsia-500 border-b-fuchsia-500 border-l-transparent animate-spin-reverse"></div>
    <style>{`
      @keyframes spin-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
      .animate-spin-reverse {
        animation: spin-reverse 1.5s linear infinite;
      }
    `}</style>
    </div>
  );
};

export default Loader;