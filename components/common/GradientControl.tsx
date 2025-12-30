
import React from 'react';
import FormInput from './FormInput';
import ColorWithAlphaInput from './ColorWithAlphaInput';
import SwitchControl from './SwitchControl';
import AnglePicker from './AnglePicker';

interface GradientControlProps {
  label: string;
  isGradient: boolean;
  onToggleGradient: (isGradient: boolean) => void;
  color1: string;
  onChangeColor1: (color: string) => void;
  color2: string;
  onChangeColor2: (color: string) => void;
  angle: number;
  onChangeAngle: (angle: number) => void;
  helpText?: string;
  isNested?: boolean;
  idPrefix?: string; // To prevent ID collisions
}

const GradientControl: React.FC<GradientControlProps> = ({
  label,
  isGradient,
  onToggleGradient,
  color1,
  onChangeColor1,
  color2,
  onChangeColor2,
  angle,
  onChangeAngle,
  helpText,
  isNested = false,
  idPrefix = 'grad',
}) => {
  const containerClasses = isNested ? 'mb-4 p-4 border-l-2 border-tiger-border bg-black/20' : 'mb-8';
  const prefix = `${idPrefix}-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={containerClasses}>
       <div className={`flex justify-between items-center mb-6 pb-2 border-b border-tiger-border/50`}>
        <h3 className={`font-bold uppercase tracking-widest ${isNested ? 'text-xs text-gray-200' : 'text-sm text-white'}`}>{label}</h3>
        <SwitchControl 
            id={`${prefix}-toggle`}
            checked={isGradient}
            onChange={onToggleGradient}
            labelLeft="Solid"
            labelRight="Gradient"
        />
      </div>
      
      <div className="animate-fade-in">
        {isGradient ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <ColorWithAlphaInput label="Start Color" id={`${prefix}-color1`} value={color1} onChange={onChangeColor1} />
                <ColorWithAlphaInput label="End Color" id={`${prefix}-color2`} value={color2} onChange={onChangeColor2} />
                <div className="col-span-1 md:col-span-2 mb-8">
                    <label className="block text-xs font-bold text-gray-200 uppercase tracking-widest mb-3">Angle</label>
                    <AnglePicker angle={angle} onChange={onChangeAngle} />
                </div>
            </div>
        ) : (
            <ColorWithAlphaInput label="Color" id={`${prefix}-color1`} value={color1} onChange={onChangeColor1} />
        )}
      </div>
      {helpText && <p className="mt-2 text-[10px] text-tiger-gray font-mono uppercase opacity-70">{helpText}</p>}
    </div>
  );
};

export default GradientControl;
