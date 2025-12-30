
import React, { useMemo } from 'react';

interface ColorWithAlphaInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const hexToAlpha = (hex: string): number => {
  if (hex.length === 9) {
    const alphaHex = hex.substring(7, 9);
    return parseInt(alphaHex, 16) / 255;
  }
  if (hex.length === 7) {
    return 1;
  }
  if (hex.length === 5) {
      const alphaHex = hex.substring(4,5).repeat(2);
      return parseInt(alphaHex, 16) / 255;
  }
  return 1;
};

const rgbHexTo8Digit = (hex: string, alpha: number): string => {
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `${hex.substring(0, 7)}${alphaHex}`;
}

const ColorWithAlphaInput: React.FC<ColorWithAlphaInputProps> = ({
  label,
  id,
  value,
  onChange,
  className = '',
}) => {

  const { rgbHex, alpha } = useMemo(() => {
    const validValue = value || '#000000ff';
    return {
      rgbHex: validValue.substring(0, 7),
      alpha: hexToAlpha(validValue),
    };
  }, [value]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(rgbHexTo8Digit(e.target.value, alpha));
  };
  
  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(rgbHexTo8Digit(rgbHex, parseFloat(e.target.value)));
  };

  return (
    <div className={`mb-8 ${className}`}>
        <label htmlFor={id} className="block text-xs font-bold text-gray-200 uppercase tracking-widest mb-3">
            {label}
        </label>
        {/* Adjusted gap to 2 for mobile tightness */}
        <div className="flex items-center gap-2 md:gap-3 bg-tiger-surface p-2 border border-tiger-border rounded-none transition-colors hover:border-tiger-gray">
            <div className="relative overflow-hidden w-10 h-10 rounded-none border border-tiger-border shadow-inner flex-shrink-0">
                <input
                    type="color"
                    id={id}
                    name={id}
                    value={rgbHex}
                    onChange={handleColorChange}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-none cursor-pointer"
                />
            </div>
            <div className="flex-grow flex flex-col justify-center px-1 md:px-2 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[8px] md:text-[10px] text-tiger-gray uppercase tracking-wider">OPACITY</span>
                    <span className="font-mono text-[8px] md:text-[10px] text-tiger-green font-bold">{Math.round(alpha * 100)}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={alpha}
                    onChange={handleAlphaChange}
                    className="w-full mini-slider"
                />
            </div>
            <div className="font-mono text-[10px] md:text-xs text-white bg-black px-1 md:px-2 py-1 rounded-none border border-tiger-border min-w-[60px] md:min-w-[80px] text-center">
                {value}
            </div>
        </div>
    </div>
  );
};

export default ColorWithAlphaInput;
