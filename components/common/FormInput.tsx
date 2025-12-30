
import React from 'react';
import SwitchControl from './SwitchControl';

interface FormInputProps {
  label: string;
  type: 'text' | 'number' | 'color' | 'range' | 'checkbox';
  id: string;
  value: string | number | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helpText?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  children?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  helpText,
  min,
  max,
  step,
  className = '',
  children,
}) => {
  const isCheckbox = type === 'checkbox';
  const isColor = type === 'color';
  
  // If it's a checkbox, use the custom SwitchControl but adapting for ON/OFF
  if (isCheckbox) {
    return (
      <div className={`mb-8 ${className}`}>
        <div className="flex items-center justify-between">
             <div className="flex flex-col">
                 <span className="text-xs font-bold text-gray-200 uppercase tracking-widest">{label}</span>
             </div>
             <SwitchControl 
                id={id}
                checked={value as boolean}
                onChange={(checked) => onChange({ target: { checked, type: 'checkbox', name: id, value: checked } } as any)}
                labelLeft="OFF"
                labelRight="ON"
             />
        </div>
        {helpText && <p className="mt-2 text-[10px] text-tiger-gray font-mono uppercase opacity-70">{helpText}</p>}
        {children}
      </div>
    );
  }

  const labelClasses = 'block text-xs font-bold text-gray-200 uppercase tracking-widest mb-3';
  const inputBaseClasses = `
    bg-tiger-surface 
    border border-tiger-border 
    text-white 
    placeholder-gray-600 
    rounded-none
    focus:border-tiger-green focus:bg-black 
    block w-full 
    transition-all duration-300 ease-out
    text-sm
  `;
  
  // Range sliders specific styling to keep bg dark. Removed padding/margin to hit edges.
  const rangeClasses = `
    appearance-none 
    bg-transparent 
    focus:ring-0 border-none w-full block
  `;
  
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex flex-col">
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
        
        <div className={`relative flex items-center w-full`}>
          <input
            type={type}
            id={id}
            name={id}
            value={value as string | number}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            className={`${type === 'range' ? rangeClasses : inputBaseClasses} ${isColor ? 'h-10 p-1 cursor-pointer' : (type === 'range' ? '' : 'py-3 px-4')}`}
          />
          {type === 'range' && (
             <span className="ml-4 text-tiger-green font-mono text-sm font-bold min-w-[3rem] text-right">{value}</span>
          )}
        </div>
      </div>
      
      {helpText && <p className="mt-2 text-[10px] text-tiger-gray font-mono uppercase opacity-70">{helpText}</p>}
      {children}
    </div>
  );
};

export default FormInput;
