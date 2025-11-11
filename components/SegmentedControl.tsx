import React from 'react';

interface SegmentedControlProps<T extends string> {
  name: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

export const SegmentedControl = <T extends string>({ name, options, value, onChange }: SegmentedControlProps<T>) => {
  const gridCols: { [key: number]: string } = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };
  const gridClass = gridCols[options.length] || 'grid-cols-4';

  return (
    <div className={`grid ${gridClass} gap-2 bg-slate-800/50 p-1 rounded-lg`}>
      {options.map((option) => (
        <label
          key={option}
          className={`text-center text-sm px-3 py-1.5 rounded-md cursor-pointer transition-colors duration-200
                     ${value === option ? 'bg-violet-600 text-white font-semibold shadow' : 'text-slate-400 hover:bg-slate-700'}`}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="sr-only"
          />
          {option}
        </label>
      ))}
    </div>
  );
};
