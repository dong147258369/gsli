import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import SightsView from './components/SightsView';
import CultureView from './components/CultureView';
import InteractView from './components/InteractView';
import MapView from './components/MapView';
import RightSidebar from './components/RightSidebar';
import BottomCards from './components/BottomCards';
import TravelNotesView from './components/TravelNotesView';
import AboutView from './components/AboutView';

function App() {
  const [currentTab, setCurrentTab] = useState('首页');
  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleNavigate = (tab) => {
    setCurrentTab(tab);
  };

  const handleSelectSpot = (spot) => {
    setSelectedSpot(spot);
  };

  return (
    <div className="dali-app-frame animate-fade-in-up">
      {/* 1. Header Navigation Bar */}
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} />

      {/* 2. Middle Panel: Page Content + Sidebar */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        
        {/* Left/Middle Content viewport */}
        <div className="flex-1 h-full flex flex-col overflow-hidden relative">
          
          {/* Main conditional page views */}
          {currentTab === '首页' && (
            <HomeView onNavigate={handleNavigate} onSelectSpot={handleSelectSpot} />
          )}
          
          {currentTab === '景点' && (
            <SightsView onSelectSpot={handleSelectSpot} selectedSpot={selectedSpot} />
          )}

          {currentTab === '文化' && (
            <CultureView />
          )}

          {currentTab === '互动' && (
            <InteractView />
          )}

          {currentTab === '地图' && (
            <MapView onSelectSpot={handleSelectSpot} />
          )}

          {/* Additional pages represented in Navbar tabs */}
          {currentTab === '游记' && (
            <TravelNotesView />
          )}

          {currentTab === '关于' && (
            <AboutView />
          )}

        </div>

        {/* Right Sidebar */}
        <RightSidebar onNavigate={handleNavigate} currentTab={currentTab} />

      </div>

      {/* 3. Footer Navigation Shortcut Cards */}
      <BottomCards onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
