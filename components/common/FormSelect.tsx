import React from 'react';

interface FormSelectProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
  helpText?: string;
  className?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, id, value, onChange, options, helpText, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <label htmlFor={id} className="block text-xs font-bold text-gray-200 uppercase tracking-widest mb-3">
        {label}
      </label>
      <div className="relative">
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="appearance-none bg-tiger-surface border border-tiger-border text-white text-sm rounded-none focus:border-tiger-green focus:bg-black block w-full py-3 px-4 pr-10 transition-all duration-300 cursor-pointer"
        >
            {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-tiger-black text-white py-2">
                {option.label}
            </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-tiger-green">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      {helpText && <p className="mt-2 text-[10px] text-tiger-gray font-mono uppercase opacity-70">{helpText}</p>}
    </div>
  );
};

export default FormSelect;