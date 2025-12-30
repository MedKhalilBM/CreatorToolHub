
import React, { useState, useCallback, useEffect } from 'react';
import { WidgetSettings, Step, MockMessage } from '../types';
import { INITIAL_SETTINGS } from '../constants';
import TopBar from '../components/TopBar';
import Preview from '../components/Preview';
import LayoutStep from '../components/steps/LayoutStep';
import ColorsStep from '../components/steps/ColorsStep';
import TypographyStep from '../components/steps/TypographyStep';
import MessagesStep from '../components/steps/MessagesStep';
import CodeStep from '../components/steps/CodeStep';

const initialMockMessages: MockMessage[] = [
    { id: 1, user: 'StreamGamer22', message: 'This game is amazing! PogChamp', tags: { color: '#ff69b4', badges: 'subscriber/1' } },
    { id: 2, user: 'MODBot', message: 'Please keep the chat respectful. LUL', tags: { color: null, badges: 'moderator/1' } },
    { id: 3, user: 'VIP_Fan', message: 'So excited for this stream! Kappa', tags: { color: null, badges: 'vip/1,subscriber/6' } },
    { id: 4, user: 'CasualViewer', message: 'What is this game?', tags: { color: '#a78bfa', badges: '' } },
    { id: 5, user: 'AnotherUser', message: 'Hello everyone! Have a great day!', tags: { color: '#f59e0b', badges: 'subscriber/3' } },
    { id: 6, user: 'TheStreamer', message: 'Welcome everyone! Thanks for tuning in.', tags: { color: '#ff0000', badges: 'broadcaster/1,subscriber/0' } },
];

const ChatTool: React.FC = () => {
  const [settings, setSettings] = useState<WidgetSettings>(INITIAL_SETTINGS);
  const [currentStep, setCurrentStep] = useState<Step>('layout');
  const [mockMessages, setMockMessages] = useState<MockMessage[]>(initialMockMessages);

  // Set the green accent color for this tool
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', '#58fbb0');
  }, []);

  const addTestMessage = useCallback(() => {
    const users = ['NewViewer', 'SuperFan99', 'RandomUser', 'ChatterBox', 'ProPlayer'];
    const messages = ['This is a test message!', 'How is everyone?', 'Great stream!', 'Loving the content!', 'Keep it up!', 'Kappa', 'PogChamp'];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const roles = ['', 'subscriber/1', 'vip/1', 'moderator/1', 'broadcaster/1'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    const newMessage: MockMessage = {
      id: Date.now(),
      user: randomRole.includes('broadcaster') ? 'TheStreamer' : randomUser,
      message: randomMessage,
      tags: {
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          badges: randomRole,
      }
    };

    setMockMessages(prev => {
        const newArr = [...prev, newMessage];
        if (newArr.length > 50) return newArr.slice(-50); 
        return newArr;
    });
  }, []);


  const renderStep = () => {
    switch (currentStep) {
      case 'layout':
        return <LayoutStep settings={settings} setSettings={setSettings} />;
      case 'typography':
        return <TypographyStep settings={settings} setSettings={setSettings} />;
      case 'colors':
        return <ColorsStep settings={settings} setSettings={setSettings} />;
      case 'messages':
        return <MessagesStep settings={settings} setSettings={setSettings} />;
      case 'code':
        return <CodeStep settings={settings} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen font-sans bg-tiger-black text-tiger-white overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_450px] grid-rows-[auto_35vh_1fr] lg:grid-rows-[auto_1fr]">
      
      {/* Top Navigation */}
      <div className="col-span-1 row-start-1 lg:col-start-1 lg:row-start-1 z-30 border-b border-tiger-border bg-tiger-black">
         <TopBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>

      {/* Preview Area */}
      <aside className="col-span-1 row-start-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full h-full lg:h-auto bg-tiger-black border-b lg:border-b-0 lg:border-l border-tiger-border flex flex-col relative shadow-2xl shadow-black z-20 overflow-hidden">
          <div className="h-20 flex justify-between items-center px-4 border-b border-tiger-border bg-tiger-surface flex-shrink-0">
              <div className="flex items-center space-x-2 group cursor-help relative">
                  <div className="w-2 h-2 bg-tiger-green rounded-full animate-pulse"></div>
                  <h2 className="text-xs font-bold text-tiger-white tracking-[0.2em] uppercase font-mono">Chat Preview</h2>
                  
                  <div className="absolute left-0 top-full mt-2 w-64 bg-tiger-surface border border-tiger-border p-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                      <p className="text-[10px] text-tiger-gray leading-relaxed">
                          This preview simulates the widget behavior. Actual rendering in StreamElements may vary slightly.
                      </p>
                  </div>
              </div>
              <button 
                  onClick={addTestMessage}
                  className="relative overflow-hidden bg-transparent border border-tiger-green text-tiger-green text-[10px] md:text-xs font-bold py-1 px-3 md:py-2 md:px-4 hover:bg-tiger-green hover:text-black transition-all duration-200 active:scale-95"
                  aria-label="Add test message"
              >
                  <span className="relative z-10">+ TEST</span>
              </button>
          </div>
          
          <div className="flex-grow relative bg-tiger-black flex overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-10" 
                  style={{backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
              </div>
              <div className="relative w-full h-full p-4">
                  <Preview settings={settings} messages={mockMessages} />
              </div>
          </div>
      </aside>

      {/* Settings Area */}
      <main className="col-span-1 row-start-3 lg:col-start-1 lg:row-start-2 relative overflow-hidden bg-tiger-texture flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-tiger-black/50 pointer-events-none z-10" />
          <div className="flex-1 p-4 md:p-8 overflow-y-auto scrollbar-hide z-0">
              <div className="max-w-4xl mx-auto animate-fade-in pb-20">
                  {renderStep()}
              </div>
          </div>
      </main>

    </div>
  );
};

export default ChatTool;