

import React, { useState, useEffect } from 'react';
import { TimerSettings } from '../../types';

interface TimerPreviewProps {
  settings: TimerSettings;
}

const TimerPreview: React.FC<TimerPreviewProps> = ({ settings }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [shake, setShake] = useState(false);

  // Initialize time based on settings start time
  useEffect(() => {
    const startSec = (settings.startTimeHours * 3600) + (settings.startTimeMinutes * 60) + settings.startTimeSeconds;
    setRemainingTime(startSec);
  }, [settings.startTimeHours, settings.startTimeMinutes, settings.startTimeSeconds]);

  // Tick Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => {
        // Countdown modes only now
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [settings.mode]);

  const simulateEvent = (seconds: number) => {
    if (settings.mode === 'countdown_sub') {
        // Subtract Mode
        setRemainingTime(prev => Math.max(0, prev - seconds));
        setShake(true);
        setTimeout(() => setShake(false), 400);
    } else {
        // Add Mode
        setRemainingTime(prev => {
            const newVal = prev + seconds;
            const cap = settings.capHours * 3600;
            return (cap > 0 && newVal > cap) ? cap : newVal;
        });
        setPulse(true);
        setTimeout(() => setPulse(false), 300);
    }
  };

  const formatTime = (totalSeconds: number) => {
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      const fmt = (n: number) => n.toString().padStart(2, '0');
      return `${fmt(h)}:${fmt(m)}:${fmt(s)}`;
  };

  const getEndTime = () => {
      if (remainingTime === 0) return 'ENDED';
      const now = new Date();
      const end = new Date(now.getTime() + remainingTime * 1000);
      return 'ENDS ' + end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const getBackgroundValue = (isGradient: boolean, color1: string, color2: string, angle: number) => {
    return isGradient ? `linear-gradient(${angle}deg, ${color1}, ${color2})` : color1;
  };
  
  const bg = getBackgroundValue(settings.backgroundColorIsGradient, settings.backgroundColor, settings.backgroundColor2, settings.backgroundColorAngle);

  // Layout Styles
  const containerBase = `flex flex-col items-center justify-center transition-transform duration-300 ${pulse ? 'scale-105' : ''} ${shake ? 'translate-x-1' : ''}`;
  
  const layoutStyles: React.CSSProperties = {
      fontFamily: settings.fontFamily,
      padding: '20px 40px',
  };

  if (settings.layout === 'box') {
      layoutStyles.background = bg;
      layoutStyles.border = `${settings.borderWidth}px solid ${settings.borderColor}`;
      layoutStyles.borderRadius = `${settings.cornerRadius}px`;
      layoutStyles.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-tiger-texture relative">
        <style>
            {`@import url('https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(/ /g, '+')}:wght@400;600;800&display=swap');`}
        </style>
        
        <div style={layoutStyles} className={containerBase}>
            <div 
                className="tabular-nums leading-none"
                style={{
                    color: settings.textColor,
                    fontSize: `${settings.fontSize}px`,
                    fontWeight: 800,
                    textShadow: settings.textShadow ? '2px 2px 0px rgba(0,0,0,0.5)' : 'none'
                }}
            >
                {formatTime(remainingTime)}
            </div>
            {settings.showEndTime && (
                <div 
                    className="mt-2 text-center uppercase tracking-widest font-semibold"
                    style={{
                        color: settings.endTimeColor,
                        fontSize: `${Math.max(10, settings.fontSize * 0.35)}px`
                    }}
                >
                    {getEndTime()}
                </div>
            )}
        </div>

        {/* Simulator Controls - Dynamic based on Platform */}
        <div className="absolute bottom-4 left-4 right-4 bg-tiger-surface/90 border border-tiger-border p-4 backdrop-blur-sm rounded-lg flex items-center justify-between gap-4">
            <span className="text-[10px] font-bold text-tiger-gray uppercase tracking-widest">
                 Simulate ({settings.platform === 'twitch' ? 'Twitch' : 'YouTube'})
             </span>
             <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                 {settings.platform === 'twitch' ? (
                     <>
                        <button 
                            onClick={() => simulateEvent(settings.secondsPerSub)}
                            className="px-3 py-2 bg-tiger-purple text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-none whitespace-nowrap"
                        >
                            + Sub ({settings.secondsPerSub}s)
                        </button>
                        <button 
                            onClick={() => simulateEvent(settings.secondsPerCheer)}
                            className="px-3 py-2 border border-tiger-purple text-tiger-purple text-[10px] font-bold uppercase tracking-widest hover:bg-tiger-purple hover:text-white transition-colors rounded-none whitespace-nowrap"
                        >
                            + Bits
                        </button>
                        <button 
                            onClick={() => simulateEvent(settings.secondsPerFollow)}
                            className="px-3 py-2 border border-tiger-purple text-tiger-purple text-[10px] font-bold uppercase tracking-widest hover:bg-tiger-purple hover:text-white transition-colors rounded-none whitespace-nowrap"
                        >
                            + Follow
                        </button>
                     </>
                 ) : (
                     <>
                        <button 
                            onClick={() => simulateEvent(settings.secondsPerMember)}
                            className="px-3 py-2 bg-tiger-purple text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-none whitespace-nowrap"
                        >
                            + Member ({settings.secondsPerMember}s)
                        </button>
                        <button 
                            onClick={() => simulateEvent(settings.secondsPerSuperChat * 5)}
                            className="px-3 py-2 border border-tiger-purple text-tiger-purple text-[10px] font-bold uppercase tracking-widest hover:bg-tiger-purple hover:text-white transition-colors rounded-none whitespace-nowrap"
                        >
                            + SC $5
                        </button>
                        <button 
                            onClick={() => simulateEvent(settings.secondsPerSub)}
                            className="px-3 py-2 border border-tiger-purple text-tiger-purple text-[10px] font-bold uppercase tracking-widest hover:bg-tiger-purple hover:text-white transition-colors rounded-none whitespace-nowrap"
                        >
                            + Sub (Free)
                        </button>
                     </>
                 )}
             </div>
        </div>
    </div>
  );
};

export default TimerPreview;