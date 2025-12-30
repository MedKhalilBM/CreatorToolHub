import React from 'react';
import { Step } from '../types';

interface SidebarProps {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
}

// SVG Icon Components - Minimalist Lines
const LayoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 5h16M4 12h16M4 19h16" /></svg>;
const ColorSwatchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0l-2-2m2 2l2-2m2-2l2-2m-2 2l-2-2m-2-2l-2-2m2 2l2-2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TypographyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 6h16M12 6v13m-4 0h8" /></svg>;
const ChatBubbleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;

const stepConfig: { id: Step; label: string; icon: React.ReactNode }[] = [
  { id: 'layout', label: 'LAYOUT', icon: <LayoutIcon /> },
  { id: 'colors', label: 'COLORS', icon: <ColorSwatchIcon /> },
  { id: 'typography', label: 'TYPE', icon: <TypographyIcon /> },
  { id: 'messages', label: 'MESSAGES', icon: <ChatBubbleIcon /> },
  { id: 'code', label: 'EXPORT', icon: <CodeIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ currentStep, setCurrentStep }) => {
  return (
    <nav className="bg-tiger-black p-0 w-full md:w-20 lg:w-64 border-b md:border-b-0 md:border-r border-tiger-border flex flex-row md:flex-col z-30">
      <div className="hidden md:flex items-center justify-center h-20 border-b border-tiger-border">
        <h1 className="text-xl font-bold text-white tracking-tighter italic">
            W<span className="text-tiger-red">/</span>T
        </h1>
      </div>
      
      <ul className="flex md:flex-col w-full overflow-x-auto md:overflow-visible no-scrollbar">
        {stepConfig.map((step) => {
          const isActive = currentStep === step.id;
          return (
            <li key={step.id} className="flex-1 md:flex-none">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`group w-full flex flex-col md:flex-row items-center md:px-6 py-4 text-left transition-all duration-300 relative overflow-hidden
                  ${isActive ? 'text-white' : 'text-tiger-gray hover:text-tiger-white'}
                `}
              >
                {/* Active Background Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-tiger-red shadow-[0_0_10px_rgba(179,0,27,0.6)] hidden md:block" />
                )}
                {isActive && (
                    <div className="absolute inset-0 bg-tiger-surface opacity-50 hidden md:block" />
                )}
                 {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-tiger-red md:hidden" />
                )}

                <span className={`mb-1 md:mb-0 md:mr-4 w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-tiger-red' : 'group-hover:text-white'}`}>
                    {step.icon}
                </span>
                <span className="text-[10px] md:text-sm font-bold tracking-widest font-mono">
                    {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      
      <div className="hidden md:block mt-auto p-6">
        <div className="text-[10px] text-tiger-gray font-mono text-center">
            v2.0.4 <br/> PRECISION UI
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;