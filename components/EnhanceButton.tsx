import React from 'react';

interface EnhanceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

export const EnhanceButton: React.FC<EnhanceButtonProps> = ({ onClick, isLoading, disabled, ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg px-6 py-3 transition-all duration-300 transform-gpu
                 hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-600/30
                 focus:outline-none focus:ring-4 focus:ring-violet-500/50
                 disabled:from-slate-700 disabled:to-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Enhancing...
        </>
      ) : (
        '✨ Enhance Now'
      )}
    </button>
  );
};