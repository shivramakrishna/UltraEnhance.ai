import React from 'react';

interface ApiKeySelectorProps {
  onSelectKey: () => void;
}

const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onSelectKey }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-md">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/50 transform transition-all animate-fade-in-up">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">API Key Required</h2>
          <p className="mt-2 text-slate-400">
            This application uses the Google Gemini API. To proceed, please select your own API key.
          </p>
        </div>
        <button
          onClick={onSelectKey}
          className="w-full flex items-center justify-center gap-2 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg px-6 py-3 transition-all duration-300 transform-gpu
                     hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-600/30
                     focus:outline-none focus:ring-4 focus:ring-violet-500/50"
        >
          Select Your API Key
        </button>
        <p className="text-xs text-center text-slate-500">
          Ensure your API key has billing enabled to avoid quota issues.
          {' '}
          <a
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:underline"
          >
            Learn more about billing
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ApiKeySelector;
