
import React from 'react';

interface StepSliderProps {
  label: string;
  value: number; // 1 to 5
  onChange: (value: number) => void;
  className?: string;
}

const StepSlider: React.FC<StepSliderProps> = ({ label, value, onChange, className = '' }) => {
  const steps = [1, 2, 3, 4, 5];

  return (
    <div className={`mb-8 ${className}`}>
        <label className="block text-xs font-bold text-gray-200 uppercase tracking-widest mb-4">
            {label}
        </label>
        <div className="relative pt-1 px-1">
            <div className="flex justify-between mb-2">
                 <span className="text-[10px] font-bold text-tiger-gray uppercase">Light</span>
                 <span className="text-[10px] font-bold text-tiger-gray uppercase">Bold</span>
            </div>
            <div className="relative h-4 flex items-center">
                {/* Track Line */}
                <div className="absolute left-0 right-0 h-[2px] bg-tiger-border"></div>
                
                {/* Steps */}
                <div className="absolute left-0 right-0 flex justify-between px-[1px]">
                    {steps.map(step => (
                        <div 
                            key={step} 
                            onClick={() => onChange(step)}
                            className={`
                                w-3 h-3 rounded-full cursor-pointer z-10 transition-all duration-200 border
                                ${value === step 
                                    ? 'bg-tiger-green border-tiger-green scale-125' 
                                    : 'bg-tiger-surface border-tiger-border hover:border-tiger-gray'
                                }
                            `}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default StepSlider;
