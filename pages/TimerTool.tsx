

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TimerSettings } from '../types';
import TimerGeneralStep from '../components/timer-tool/TimerGeneralStep';
import TimerStyleStep from '../components/timer-tool/TimerStyleStep';
import TimerCodeStep from '../components/timer-tool/TimerCodeStep';
import TimerPreview from '../components/timer-tool/TimerPreview';

const INITIAL_TIMER_SETTINGS: TimerSettings = {
  platform: 'twitch',
  mode: 'countdown_add',
  startTimeHours: 4,
  startTimeMinutes: 0,
  startTimeSeconds: 0,
  capHours: 24,
  // Twitch
  secondsPerSub: 300,
  secondsPerTip: 60,
  secondsPerCheer: 60,
  secondsPerFollow: 0,
  // YouTube
  secondsPerMember: 300,
  secondsPerSuperChat: 60,
  
  layout: 'box',
  fontFamily: 'Inter',
  fontSize: 64,
  textColor: '#FFFFFF',
  backgroundColor: '#D946EF',
  backgroundColorIsGradient: true,
  backgroundColor2: '#7E22CE',
  backgroundColorAngle: 45,
  borderColor: '#FFFFFF',
  borderWidth: 0,
  cornerRadius: 16,
  showEndTime: true,
  endTimeColor: '#A1A1AA',
  textShadow: true,
};

type TimerStep = 'general' | 'style' | 'export';

const TimerTool: React.FC = () => {
  const [settings, setSettings] = useState<TimerSettings>(INITIAL_TIMER_SETTINGS);
  const [currentStep, setCurrentStep] = useState<TimerStep>('general');

  // Set PURPLE accent color
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', '#D946EF');
  }, []);

  const steps: { id: TimerStep; label: string; icon: React.ReactNode }[] = [
      { id: 'general', label: 'Logic', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
      { id: 'style', label: 'Style', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0l-2-2m2 2l2-2m2-2l2-2m-2 2l-2-2m2 2l2-2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
      { id: 'export', label: 'Export', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
  ];

  return (
    <div className="h-screen font-sans bg-tiger-black text-tiger-white overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_450px] grid-rows-[auto_35vh_1fr] lg:grid-rows-[auto_1fr]">
        
        {/* Header */}
        <div className="col-span-1 row-start-1 lg:col-start-1 lg:row-start-1 z-30 border-b border-tiger-border bg-tiger-black h-20 flex">
            <Link to="/" className="h-full w-20 flex items-center justify-center border-r border-tiger-border hover:bg-tiger-surface transition-colors group bg-tiger-black flex-shrink-0">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-tiger-gray group-hover:text-tiger-purple transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                 </svg>
            </Link>
             <div className="flex-grow flex items-center justify-center gap-8 px-4 overflow-x-auto scrollbar-hide">
                 {steps.map(step => (
                     <button
                        key={step.id}
                        onClick={() => setCurrentStep(step.id)}
                        className={`
                            flex flex-col items-center justify-center h-full px-4 min-w-[80px] relative group
                            ${currentStep === step.id ? 'text-white' : 'text-tiger-gray hover:text-white'}
                        `}
                     >
                         <div className={`transition-transform duration-300 ${currentStep === step.id ? 'scale-110 text-tiger-purple' : ''}`}>
                             {step.icon}
                         </div>
                         <span className="text-[10px] font-bold uppercase tracking-widest mt-1">{step.label}</span>
                         {currentStep === step.id && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-tiger-purple shadow-[0_0_10px_rgba(217,70,239,0.5)]" />}
                     </button>
                 ))}
             </div>
        </div>

        {/* Preview Area */}
        <aside className="col-span-1 row-start-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full h-full lg:h-auto bg-tiger-black border-b lg:border-b-0 lg:border-l border-tiger-border flex flex-col relative shadow-2xl shadow-black z-20 overflow-hidden">
            <div className="h-10 bg-tiger-surface border-b border-tiger-border flex items-center px-4 justify-between">
                <span className="text-[10px] font-mono text-tiger-purple font-bold uppercase tracking-widest">Live Preview</span>
            </div>
            <div className="flex-grow relative">
                <TimerPreview settings={settings} />
            </div>
        </aside>

        {/* Settings Area */}
        <main className="col-span-1 row-start-3 lg:col-start-1 lg:row-start-2 relative overflow-hidden bg-tiger-texture flex flex-col">
             <div className="flex-1 p-4 md:p-8 overflow-y-auto scrollbar-hide">
                 <div className="max-w-4xl mx-auto pb-20">
                     {currentStep === 'general' && <TimerGeneralStep settings={settings} setSettings={setSettings} />}
                     {currentStep === 'style' && <TimerStyleStep settings={settings} setSettings={setSettings} />}
                     {currentStep === 'export' && <TimerCodeStep settings={settings} />}
                 </div>
             </div>
        </main>
    </div>
  );
};

export default TimerTool;