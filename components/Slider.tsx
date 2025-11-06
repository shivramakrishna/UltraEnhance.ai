import React from 'react';

export const Slider: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      type="range"
      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer
                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-in-out [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:bg-violet-400
                 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-violet-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:hover:bg-violet-400"
      {...props}
    />
  );
};