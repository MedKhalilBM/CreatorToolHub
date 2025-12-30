
import React from 'react';
import { Link } from 'react-router-dom';

interface ToolHeaderProps {
  activeTab: 'manual' | 'auto';
  setActiveTab: (tab: 'manual' | 'auto') => void;
  onDownload: () => void;
  hasAsset: boolean;
}

const ToolHeader: React.FC<ToolHeaderProps> = ({ activeTab, setActiveTab, onDownload, hasAsset }) => {
  return (
    <nav className="w-full h-20 bg-tiger-black border-b border-tiger-border flex flex-shrink-0 z-30">
        {/* Home Button */}
        <Link to="/" className="h-full w-20 flex items-center justify-center border-r border-tiger-border hover:bg-tiger-surface transition-colors group bg-tiger-black">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-tiger-gray group-hover:text-tiger-green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
        </Link>

        {/* Title */}
        <div className="flex items-center px-6 border-r border-tiger-border bg-tiger-surface/50">
            <h1 className="text-lg font-black uppercase tracking-tighter italic">
                Asset <span className="text-tiger-blue">Recolor</span>
            </h1>
        </div>

        {/* Tabs */}
        <div className="flex-grow flex justify-center items-center px-4">
            <div className="flex bg-tiger-surface border border-tiger-border p-1 rounded-none">
                <button
                    onClick={() => setActiveTab('manual')}
                    className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                        activeTab === 'manual' 
                        ? 'bg-tiger-blue text-white shadow-md' 
                        : 'text-tiger-gray hover:text-white'
                    }`}
                >
                    Manual
                </button>
                <button
                    onClick={() => setActiveTab('auto')}
                    className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                        activeTab === 'auto' 
                        ? 'bg-tiger-blue text-white shadow-md' 
                        : 'text-tiger-gray hover:text-white'
                    }`}
                >
                    <span>AI Match</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </button>
            </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center px-6 border-l border-tiger-border">
             <button 
                onClick={onDownload}
                disabled={!hasAsset}
                className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                    hasAsset 
                    ? 'bg-white text-black hover:bg-tiger-blue hover:text-white cursor-pointer' 
                    : 'bg-tiger-surface text-tiger-gray cursor-not-allowed border border-tiger-border'
                }`}
             >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download
             </button>
        </div>
    </nav>
  );
};

export default ToolHeader;
