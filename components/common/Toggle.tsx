
import React from 'react';

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ id, checked, onChange, className = '' }) => {
  return (
    <label htmlFor={id} className={`relative inline-flex items-center cursor-pointer group ${className}`}>
      <input 
        type="checkbox" 
        id={id} 
        name={id}
        className="sr-only peer" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
      />
      {/* Track */}
      <div className="w-10 h-5 relative bg-tiger-surface border border-tiger-border peer-focus:outline-none rounded-none peer 
        peer-checked:border-tiger-green
        
        /* Knob */
        after:content-[''] 
        after:absolute 
        after:top-[2px] 
        after:left-[2px] 
        after:bg-tiger-gray 
        after:rounded-none 
        after:h-[14px] 
        after:w-[14px] 
        after:transition-all 
        after:duration-300 
        
        /* Knob Active State */
        peer-checked:after:translate-x-full 
        peer-checked:after:left-[4px]
        peer-checked:after:bg-tiger-green
      "></div>
    </label>
  );
};

export default Toggle;
