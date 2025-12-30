
import React, { useRef, useState, useEffect } from 'react';

interface AnglePickerProps {
  angle: number;
  onChange: (angle: number) => void;
  size?: number;
}

const AnglePicker: React.FC<AnglePickerProps> = ({ angle, onChange, size = 40 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInteraction = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    
    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90; 
    if (deg < 0) deg += 360;
    
    onChange(Math.round(deg));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleInteraction(e.clientX, e.clientY);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleInteraction(e.clientX, e.clientY);
      }
    };
    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex items-center gap-3">
        <div 
            ref={containerRef}
            className="relative rounded-full border border-tiger-green bg-tiger-surface cursor-pointer"
            style={{ width: size, height: size }}
            onMouseDown={onMouseDown}
        >
            <div 
                className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-tiger-green origin-left"
                style={{ 
                    transform: `translate(0, -50%) rotate(${angle - 90}deg)`,
                }}
            >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-tiger-green shadow-sm" />
            </div>
        </div>
        <div className="text-xs font-mono text-tiger-green font-bold w-8 text-right">
            {angle}°
        </div>
    </div>
  );
};

export default AnglePicker;