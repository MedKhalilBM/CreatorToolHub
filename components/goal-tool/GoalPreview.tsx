
import React, { useState, useEffect } from 'react';
import { GoalSettings, GoalItem } from '../../types';

interface GoalPreviewProps {
  settings: GoalSettings;
}

const GoalPreview: React.FC<GoalPreviewProps> = ({ settings }) => {
  const [activeGoalIndex, setActiveGoalIndex] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Initialize
  useEffect(() => {
      setSessionTotal(settings.startAmount);
      setActiveGoalIndex(0);
  }, [settings.goals, settings.startAmount]);

  // Handle auto-advance monitoring
  useEffect(() => {
     // Safety check to prevent stuck loop if out of bounds
     if (activeGoalIndex >= settings.goals.length) return;

     const currentGoal = settings.goals[activeGoalIndex];
     
     // Only trigger if we aren't animating AND the goal is met
     if (sessionTotal >= currentGoal.targetAmount && !isAnimating) {
         setIsAnimating(true);
         setPulse(true);
         
         const timer = setTimeout(() => {
             // Increment goal index
             setActiveGoalIndex(prev => prev + 1);
             setIsAnimating(false);
             setPulse(false);
         }, 1500);
         
         return () => clearTimeout(timer);
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionTotal, activeGoalIndex, settings.goals]); // Removed isAnimating to prevent self-cancellation

  const handleSimulateDonation = () => {
      // Prevent simulation if complete or animating
      if (isAnimating || activeGoalIndex >= settings.goals.length) return;
      const randomAmount = Math.floor(Math.random() * 50) + 10;
      setSessionTotal(prev => prev + randomAmount);
  };
  
  // Calculate Segment Progress
  const getPercent = (goal: GoalItem, index: number) => {
      const prevTarget = index > 0 ? settings.goals[index - 1].targetAmount : settings.startAmount;
      const currentTarget = goal.targetAmount;
      
      if (currentTarget <= prevTarget) return 100;
      
      const effectiveCurrent = Math.max(sessionTotal, prevTarget);
      const progress = effectiveCurrent - prevTarget;
      const range = currentTarget - prevTarget;
      
      let p = progress / range;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      
      return p * 100;
  };

  const getBackgroundValue = (isGradient: boolean, color1: string, color2: string, angle: number) => {
    return isGradient ? `linear-gradient(${angle}deg, ${color1}, ${color2})` : color1;
  };
  
  // Helper to determine the correct color (Unified vs Custom)
  const getGoalColorConfig = (goal: GoalItem) => {
      if (settings.unifiedColors) {
          return {
              color1: settings.fillColor,
              color2: settings.fillColor2,
              isGradient: settings.fillColorIsGradient,
              angle: settings.fillColorAngle
          };
      }
      return {
          color1: goal.fillColor || settings.fillColor,
          color2: goal.fillColor2 || settings.fillColor2,
          isGradient: goal.fillColorIsGradient !== undefined ? goal.fillColorIsGradient : settings.fillColorIsGradient,
          angle: goal.fillColorAngle || settings.fillColorAngle
      };
  };

  const containerStyle: React.CSSProperties = {
      fontFamily: settings.fontFamily,
      color: settings.textColor,
      width: '100%',
      maxWidth: '500px',
      padding: '20px',
  };
  
  const textStyle: React.CSSProperties = {
      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
  };

  const renderBar = (goal: GoalItem, opacity: number, scale: number, percent: number, index: number) => {
    const displayAmount = Math.min(sessionTotal, goal.targetAmount);
    const isActive = index === activeGoalIndex;
    
    const colorConfig = getGoalColorConfig(goal);
    const fillBg = getBackgroundValue(!!colorConfig.isGradient, colorConfig.color1, colorConfig.color2, colorConfig.angle);
    
    return (
        <div 
            key={goal.id} 
            className={`w-full flex flex-col gap-1 transition-all duration-500 ease-in-out ${isActive && pulse ? 'animate-pulse' : ''}`}
            style={{ 
                opacity, 
                transform: `scale(${scale})`,
                filter: opacity < 1 ? 'grayscale(100%) blur(1px)' : 'none'
            }}
        >
            <div className="flex justify-between items-end mb-1">
                 {settings.showTitle && <span style={{...textStyle, fontSize: '1.2em'}}>{goal.title}</span>}
                 {isActive && (
                     <span style={{...textStyle, fontSize: '1em', fontVariantNumeric: 'tabular-nums'}}>
                        {settings.showAmount && `${Math.floor(displayAmount)} / ${goal.targetAmount}`}
                        {settings.showAmount && settings.showPercentage && ' '}
                        {settings.showPercentage && `(${Math.floor(percent)}%)`}
                     </span>
                 )}
            </div>
            <div 
                className="w-full relative overflow-hidden shadow-inner"
                style={{
                    height: `${settings.barHeight}px`,
                    backgroundColor: settings.trackColor,
                    borderRadius: `${settings.cornerRadius}px`,
                    border: `${settings.borderWidth}px solid ${settings.borderColor}`
                }}
            >
                <div 
                    className="h-full relative flex items-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden"
                    style={{
                        width: `${percent}%`,
                        background: fillBg,
                        borderRadius: `${Math.max(0, settings.cornerRadius - settings.borderWidth)}px`
                    }}
                >
                    {/* Stripes Pattern */}
                    {settings.useStripes && (
                        <div className="absolute inset-0 w-full h-full" 
                             style={{
                                backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)`,
                                backgroundSize: `${settings.barHeight}px ${settings.barHeight}px`,
                                animation: 'barberpole 1s linear infinite'
                             }}
                        />
                    )}

                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-60" 
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                            backgroundSize: '200% 100%',
                            animation: 'shine 3s infinite linear'
                        }}
                    />
                </div>
            </div>
        </div>
    );
  };

  const renderGoals = () => {
      if (!settings.goals.length) return <div className="text-gray-500 font-mono text-xs">No goals configured.</div>;

      // Check for completion
      if (activeGoalIndex >= settings.goals.length) {
          return (
              <div className="flex flex-col items-center justify-center h-full animate-bounce">
                  <div className="text-tiger-yellow font-black text-2xl uppercase tracking-widest mb-2">Goal Completed!</div>
                  <div className="text-white font-mono text-sm">Thanks for the support!</div>
              </div>
          );
      }
      
      let goalsToShow: { item: GoalItem; index: number; opacity: number; scale: number }[] = [];

      if (settings.goalDisplayMode === 'single') {
          const mainGoal = settings.goals[activeGoalIndex];
          if (mainGoal) goalsToShow.push({ item: mainGoal, index: activeGoalIndex, opacity: 1, scale: 1 });
      } else {
          // Stack Mode
          const count = settings.goalsToDisplay || 3;
          for (let i = 0; i < count; i++) {
              const idx = activeGoalIndex + i;
              if (settings.goals[idx]) {
                  let opacity = 1;
                  let scale = 1;
                  if (i === 1) { opacity = 0.5; scale = 0.98; }
                  if (i >= 2) { opacity = 0.2; scale = 0.96; }
                  
                  goalsToShow.push({ 
                      item: settings.goals[idx], 
                      index: idx,
                      opacity,
                      scale
                  });
              }
          }
      }

      return (
          <div className={`w-full flex flex-col items-center transition-all ${settings.goalDisplayMode === 'stack' ? 'gap-6 justify-start pt-4' : 'justify-center h-full'}`}>
              {goalsToShow.map((data) => {
                  const percent = getPercent(data.item, data.index);
                  return renderBar(data.item, data.opacity, data.scale, percent, data.index);
              })}
          </div>
      );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-tiger-texture relative">
        <style>
            {`
                @import url('https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(/ /g, '+')}:wght@400;600;800&display=swap');
                @keyframes shine { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
                @keyframes barberpole { 100% { background-position: ${settings.barHeight}px ${settings.barHeight}px; } }
            `}
        </style>
        
        <div style={containerStyle} className="flex flex-col items-center h-full overflow-hidden">
            {renderGoals()}
        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-tiger-surface/90 border border-tiger-border p-4 backdrop-blur-sm rounded-lg flex items-center justify-between gap-4">
             <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-tiger-gray uppercase tracking-widest">
                     Active: <span className="text-tiger-yellow">{settings.goals[activeGoalIndex]?.title || 'Done'}</span>
                 </span>
                 <span className="text-[10px] text-tiger-gray font-mono">
                     Total: {sessionTotal} ({settings.type})
                 </span>
             </div>
             
             <div className="flex gap-2">
                 <button 
                    onClick={() => { setActiveGoalIndex(0); setSessionTotal(settings.startAmount); setIsAnimating(false); setPulse(false); }}
                    className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-tiger-gray hover:text-white border border-tiger-border hover:bg-tiger-border transition-colors"
                 >
                     Reset
                 </button>
                 <button 
                    onClick={handleSimulateDonation}
                    disabled={activeGoalIndex >= settings.goals.length || isAnimating}
                    className="px-4 py-2 bg-tiger-yellow text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                 >
                    {isAnimating ? (
                        <span className="animate-pulse">Completing...</span>
                    ) : (
                        <>
                            <span>+ Simulate</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </>
                    )}
                 </button>
             </div>
        </div>
    </div>
  );
};

export default GoalPreview;
