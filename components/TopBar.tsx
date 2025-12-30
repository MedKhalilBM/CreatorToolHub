
import React, { useRef, useState, useEffect } from 'react';
import { Step } from '../types';
import { Link } from 'react-router-dom';

interface TopBarProps {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
}

const Icons = {
  layout: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 mb-1 transition-colors duration-300 ${isActive ? 'text-tiger-green' : 'text-current'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 5h16M4 12h16M4 19h16" />
    </svg>
  ),
  typography: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 mb-1 transition-colors duration-300 ${isActive ? 'text-tiger-green' : 'text-current'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 6h16M12 6v13m-4 0h8" />
    </svg>
  ),
  colors: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 mb-1 transition-colors duration-300 ${isActive ? 'text-tiger-green' : 'text-current'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0l-2-2m2 2l2-2m2-2l2-2m-2 2l-2-2m-2-2l-2-2m2 2l2-2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  messages: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 mb-1 transition-colors duration-300 ${isActive ? 'text-tiger-green' : 'text-current'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  code: (isActive: boolean) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 mb-1 transition-colors duration-300 ${isActive ? 'text-tiger-green' : 'text-current'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

const stepConfig: { id: Step; label: string; icon: keyof typeof Icons }[] = [
  { id: 'layout', label: 'Layout', icon: 'layout' },
  { id: 'typography', label: 'Typography', icon: 'typography' },
  { id: 'colors', label: 'Colors', icon: 'colors' },
  { id: 'messages', label: 'Settings', icon: 'messages' },
  { id: 'code', label: 'Export', icon: 'code' },
];

const TopBar: React.FC<TopBarProps> = ({ currentStep, setCurrentStep }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 2); // Buffer
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <nav className="w-full h-20 relative flex-shrink-0 flex">
        {/* Home Button */}
        <Link to="/" className="h-full w-20 flex items-center justify-center border-r border-tiger-border hover:bg-tiger-surface transition-colors group z-20 bg-tiger-black flex-shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-tiger-gray group-hover:text-tiger-green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
        </Link>

        {/* Scroll Indicators (Mobile/Overflow) */}
        {showLeftArrow && (
            <div className="absolute left-20 top-0 bottom-0 w-12 bg-gradient-to-r from-tiger-black to-transparent z-20 pointer-events-none flex items-center justify-start pl-2">
                 <div className="text-tiger-green animate-pulse">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 </div>
            </div>
        )}
        {showRightArrow && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-tiger-black to-transparent z-20 pointer-events-none flex items-center justify-end pr-2">
                 <div className="text-tiger-green animate-pulse">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                 </div>
            </div>
        )}

        {/* Navigation - Responsive Scrollable Row */}
        <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex-grow overflow-x-auto scrollbar-hide h-full flex items-center px-4"
        >
          {/* Centered Container within the available space */}
          <div className="flex space-x-2 md:space-x-8 h-full min-w-max mx-auto">
            {stepConfig.map((step) => {
              const isActive = currentStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`
                    relative h-full flex flex-col items-center justify-center px-4 md:px-6 transition-all duration-300 group min-w-[90px]
                    ${isActive ? 'text-white' : 'text-tiger-gray hover:text-white'}
                  `}
                >
                  {/* Icon */}
                  <div className={`transform transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                    {Icons[step.icon](isActive)}
                  </div>

                  {/* Label */}
                  <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 ${isActive ? 'text-white' : ''}`}>
                    {step.label}
                  </span>

                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-tiger-green shadow-[0_0_15px_rgba(88,251,176,0.6)] animate-fade-in" />
                  )}
                  {/* Hover Indicator */}
                  {!isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-tiger-gray opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
    </nav>
  );
};

export default TopBar;