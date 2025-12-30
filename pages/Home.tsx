
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  useEffect(() => {
    // Set blood red accent color for the Hub
    document.documentElement.style.setProperty('--accent-color', '#B3001B');
  }, []);

  return (
    <div className="min-h-screen bg-tiger-black text-white font-sans overflow-x-hidden bg-tiger-texture relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#B3001B]/10 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="p-8 md:p-12 flex justify-between items-center border-b border-tiger-border bg-tiger-black/80 backdrop-blur-sm z-10 relative">
        <div>
           <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
             W<span className="text-tiger-green">/</span>T
           </h1>
           <p className="text-tiger-gray text-xs md:text-sm font-mono tracking-widest mt-2 uppercase">Creator Tools Hub</p>
        </div>
        <div className="hidden md:block">
            <span className="text-xs font-bold text-tiger-green border border-tiger-green px-3 py-1 rounded-full animate-pulse">
                BETA v2.2
            </span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto p-4 md:p-12 relative z-10">
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 flex items-center gap-4">
            <span className="w-8 h-1 bg-tiger-green"></span>
            Available Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Tool Card 1: Chat Widget - GREEN THEME (Static Hex to override Hub Red) */}
            <Link to="/chat-widget" className="group relative bg-tiger-surface border border-tiger-border overflow-hidden hover:border-[#58fbb0] transition-all duration-300 hover:shadow-[0_0_30px_rgba(88,251,176,0.1)] hover:-translate-y-1 block h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Abstract Preview Graphic */}
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                     <svg className="w-32 h-32 text-[#58fbb0]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2 text-white group-hover:text-[#58fbb0] transition-colors">Chat Customizer</h3>
                    <p className="text-sm text-tiger-gray font-mono mb-6 line-clamp-2">
                        Design premium, animated chat widgets for your stream. Customize colors, fonts, and roles visually.
                    </p>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest border-b-2 border-[#58fbb0] pb-1 text-white">
                        Launch Tool &rarr;
                    </span>
                </div>
            </Link>

            {/* Tool Card 2: Asset Recolor - BLUE THEME */}
            <Link to="/asset-tool" className="group relative bg-tiger-surface border border-tiger-border overflow-hidden hover:border-tiger-blue transition-all duration-300 hover:shadow-[0_0_30px_rgba(46,92,255,0.1)] hover:-translate-y-1 block h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Abstract Preview Graphic */}
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                     <svg className="w-32 h-32 text-tiger-blue" fill="currentColor" viewBox="0 0 24 24"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0l-2-2m2 2l2-2m2-2l2-2m-2 2l-2-2m-2-2l-2-2m2 2l2-2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2 text-white group-hover:text-tiger-blue transition-colors">Asset Recolor</h3>
                    <p className="text-sm text-tiger-gray font-mono mb-6 line-clamp-2">
                        Use AI to match your asset colors to your VTuber model, or manually tint and blend layers.
                    </p>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest border-b-2 border-tiger-blue pb-1 text-white">
                        Launch Tool &rarr;
                    </span>
                </div>
            </Link>

            {/* Tool Card 3: Goal Tracker - YELLOW THEME */}
            <Link to="/goal-tool" className="group relative bg-tiger-surface border border-tiger-border overflow-hidden hover:border-tiger-yellow transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,196,48,0.1)] hover:-translate-y-1 block h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Abstract Preview Graphic */}
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                     <svg className="w-32 h-32 text-tiger-yellow" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2 text-white group-hover:text-tiger-yellow transition-colors">Goal Tracker</h3>
                    <p className="text-sm text-tiger-gray font-mono mb-6 line-clamp-2">
                        Create dynamic multi-stage subathon goals. Animated progress bars, circular trackers, and stackable lists.
                    </p>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest border-b-2 border-tiger-yellow pb-1 text-white">
                        Launch Tool &rarr;
                    </span>
                </div>
            </Link>
            
            {/* Tool Card 4: Subathon Timer - PURPLE THEME */}
            <Link to="/timer-tool" className="group relative bg-tiger-surface border border-tiger-border overflow-hidden hover:border-tiger-purple transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)] hover:-translate-y-1 block h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Abstract Preview Graphic */}
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                     <svg className="w-32 h-32 text-tiger-purple" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2 text-white group-hover:text-tiger-purple transition-colors">Subathon Timer</h3>
                    <p className="text-sm text-tiger-gray font-mono mb-6 line-clamp-2">
                        Customizable countdown/countup timer that reacts to subs, tips, and bits. Features end-time prediction.
                    </p>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest border-b-2 border-tiger-purple pb-1 text-white">
                        Launch Tool &rarr;
                    </span>
                </div>
            </Link>

        </div>
      </main>
    </div>
  );
};

export default Home;
