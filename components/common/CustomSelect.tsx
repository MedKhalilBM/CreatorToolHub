
import React, { useState, useRef, useEffect } from 'react';

interface CustomSelectProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Mimic native event
  options: { value: string | number; label: string }[];
  helpText?: string;
  className?: string;
  isFontSelect?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
    label, id, value, onChange, options, helpText, className = '', isFontSelect = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    // Create a synthetic event
    const event = {
        target: { name: id, value: optionValue, type: 'select-one' }
    } as unknown as React.ChangeEvent<HTMLSelectElement>;
    onChange(event);
    setIsOpen(false);
  };

  const selectedLabel = options.find(o => o.value === value)?.label || value;

  return (
    <div className={`mb-8 ${className}`} ref={containerRef}>
      <label htmlFor={id} className="block text-xs font-bold text-gray-200 uppercase tracking-widest mb-3">
        {label}
      </label>
      <div className="relative">
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`
                flex items-center justify-between w-full py-3 px-4 bg-tiger-surface border border-tiger-border 
                text-white text-sm text-left transition-all duration-300
                focus:outline-none focus:border-tiger-green
                ${isOpen ? 'border-tiger-green bg-black' : 'hover:border-tiger-gray'}
            `}
        >
            <span style={isFontSelect ? { fontFamily: selectedLabel as string } : {}}>
                {selectedLabel}
            </span>
            <svg 
                className={`w-4 h-4 text-tiger-green transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        
        {isOpen && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto bg-black border border-tiger-green shadow-xl">
                {options.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={`
                            px-4 py-3 text-sm cursor-pointer transition-colors duration-200
                            ${option.value === value ? 'text-tiger-green bg-tiger-surface font-bold' : 'text-gray-300 hover:text-black hover:bg-tiger-green'}
                        `}
                        style={isFontSelect ? { fontFamily: option.label } : {}}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        )}
      </div>
      {helpText && <p className="mt-2 text-[10px] text-tiger-gray font-mono uppercase opacity-70">{helpText}</p>}
    </div>
  );
};

export default CustomSelect;
