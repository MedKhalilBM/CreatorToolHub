
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatTool from './pages/ChatTool';
import AssetTool from './pages/AssetTool';
import GoalTool from './pages/GoalTool';
import TimerTool from './pages/TimerTool';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat-widget" element={<ChatTool />} />
        <Route path="/asset-tool" element={<AssetTool />} />
        <Route path="/goal-tool" element={<GoalTool />} />
        <Route path="/timer-tool" element={<TimerTool />} />
      </Routes>
    </Router>
  );
};

export default App;
