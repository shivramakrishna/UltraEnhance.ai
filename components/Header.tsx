import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">
        UltraEnhance.ai
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        Enhance your image like magic ✨
      </p>
    </header>
  );
};

export default Header;