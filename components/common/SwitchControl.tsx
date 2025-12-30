
import React from 'react';
import Toggle from './Toggle';

interface SwitchControlProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelLeft: string;
  labelRight: string;
  title?: string;
}

const SwitchControl: React.FC<SwitchControlProps> = ({ id, checked, onChange, labelLeft, labelRight, title }) => {
  return (
    <div className="flex flex-col justify-center h-full">
        {title && <h3 className="text-xs font-bold text-gray-200 uppercase tracking-widest mb-3">{title}</h3>}
        <div className="flex items-center gap-3">
            <span 
                className={`text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer select-none ${!checked ? 'text-tiger-green' : 'text-tiger-gray'}`}
                onClick={() => onChange(false)}
            >
                {labelLeft}
            </span>
            
            <Toggle 
                id={id}
                checked={checked}
                onChange={onChange}
            />
            
            <span 
                className={`text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer select-none ${checked ? 'text-tiger-green' : 'text-tiger-gray'}`}
                onClick={() => onChange(true)}
            >
                {labelRight}
            </span>
        </div>
    </div>
  );
};

export default SwitchControl;