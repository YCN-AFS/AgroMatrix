import React, { useState } from 'react';
import { AppView } from './types';
import { Dashboard } from './views/Dashboard';
import { Scheduling } from './views/Scheduling';
import { Analytics } from './views/Analytics';
import { Controls } from './views/Controls';
import { BottomNav } from './components/BottomNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  // Helper to render current view
  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onChangeView={setCurrentView} />;
      case AppView.SCHEDULING:
        return <Scheduling onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.ANALYTICS:
        return <Analytics onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.CONTROLS:
        return <Controls />;
      default:
        return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="relative flex flex-col w-full max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark overflow-hidden shadow-2xl">
      <div className="flex-1 overflow-hidden flex flex-col">
        {renderView()}
      </div>
      
      {/* 
        Bottom Nav is persistent across most screens, but sometimes we might want to hide it.
        Based on the design, Scheduling and Analytics act more like "Sub-pages" with back buttons,
        but typically an app like this has a persistent nav. 
        However, the provided HTML for Scheduling/Analytics has a Back button and NO bottom nav in the image,
        while the Analytics HTML *does* have a bottom nav.
        Let's follow the Analytics HTML pattern and show BottomNav. 
        Scheduling HTML does NOT show BottomNav.
      */}
      {currentView !== AppView.SCHEDULING && (
        <BottomNav currentView={currentView} onChangeView={setCurrentView} />
      )}
    </div>
  );
};

export default App;