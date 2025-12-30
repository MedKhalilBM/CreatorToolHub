
import React, { useState, useMemo } from 'react';
import { WidgetSettings } from '../../types';
import { generateHTML, generateCSS, generateJS, generateFields, generateData } from '../../services/codeGenerator';

interface CodeStepProps {
  settings: WidgetSettings;
}

type CodeType = 'html' | 'css' | 'js' | 'fields' | 'data';

const CodeStep: React.FC<CodeStepProps> = ({ settings }) => {
  const [activeTab, setActiveTab] = useState<CodeType>('css');
  const [copiedStates, setCopiedStates] = useState<Record<CodeType, boolean>>({
    html: false,
    css: false,
    js: false,
    fields: false,
    data: false,
  });

  const codes = useMemo(() => ({
    html: generateHTML(),
    css: generateCSS(settings),
    js: generateJS(settings),
    fields: generateFields(settings),
    data: generateData(settings),
  }), [settings]);

  const handleCopy = (codeType: CodeType) => {
    navigator.clipboard.writeText(codes[codeType]).then(() => {
      setCopiedStates(prev => ({ ...prev, [codeType]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [codeType]: false }));
      }, 2000);
    });
  };
  
  const getLanguage = (tab: CodeType) => {
    if (tab === 'js') return 'javascript';
    if (tab === 'fields' || tab === 'data') return 'json';
    return tab;
  }

  return (
    <div className="h-full flex flex-col">
      <header className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Export</h2>
        <div className="h-1 w-20 bg-tiger-green"></div>
        <p className="text-tiger-gray mt-4 font-mono text-xs md:text-sm">Copy and paste these into your StreamElements Custom Widget editor.</p>
      </header>
      
      <div className="flex-1 bg-black border border-tiger-border flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex border-b border-tiger-border bg-tiger-surface overflow-x-auto scrollbar-hide">
          {(Object.keys(codes) as CodeType[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 md:px-8 text-xs font-bold tracking-widest uppercase transition-all duration-300 relative overflow-hidden flex-shrink-0 ${
                activeTab === tab 
                  ? 'text-white bg-black' 
                  : 'text-tiger-gray hover:text-white hover:bg-black/50'
              }`}
            >
              {activeTab === tab && <div className="absolute top-0 left-0 right-0 h-[2px] bg-tiger-green"></div>}
              {tab}
            </button>
          ))}
        </div>
        
        <div className="relative flex-1 bg-black overflow-hidden group">
          <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => handleCopy(activeTab)}
                className={`
                    font-mono text-[10px] md:text-xs font-bold uppercase px-4 md:px-6 py-2 border transition-all duration-300
                    ${copiedStates[activeTab] 
                        ? 'bg-tiger-green text-black border-tiger-green' 
                        : 'bg-black text-tiger-green border-tiger-green hover:bg-tiger-green hover:text-black'}
                `}
              >
                {copiedStates[activeTab] ? 'COPIED' : 'COPY'}
              </button>
          </div>
          
          <pre className="h-full p-4 md:p-6 overflow-auto text-[10px] md:text-xs font-mono leading-relaxed text-gray-300 scrollbar-thin selection:bg-tiger-green selection:text-black">
            <code className={`language-${getLanguage(activeTab)}`}>
              {codes[activeTab]}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeStep;
