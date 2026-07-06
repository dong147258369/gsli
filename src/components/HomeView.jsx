import React, { useState } from 'react';
import { MapPin, Headphones, Eye, X, ArrowUpRight } from 'lucide-react';
import { daliData } from '../data/daliData';
import daliMapBackdrop from '../assets/dali_map_backdrop.png';
import daliSouthGate from '../assets/dali_south_gate.png';
import daliThreePagodas from '../assets/dali_three_pagodas.png';
import daliCangshanErhai from '../assets/dali_cangshan_erhai.png';
import daliWuhuaBuilding from '../assets/dali_wuhua_building.png';
import daliYangrenStreet from '../assets/dali_yangren_street.png';
import daliHonglongWell from '../assets/dali_honglong_well.png';
import daliConfucianTemple from '../assets/dali_confucian_temple.png';
import daliErhaiLake from '../assets/dali_erhai_lake.png';

const sightImages = {
  1: daliSouthGate,       // 南城门
  2: daliWuhuaBuilding,   // 五华楼
  3: daliYangrenStreet,   // 洋人街
  4: daliHonglongWell,    // 红龙井
  5: daliConfucianTemple, // 文庙
  6: daliCangshanErhai,   // 苍山
  7: daliErhaiLake,       // 洱海
  8: daliThreePagodas     // 三塔
};

export default function HomeView({ onNavigate, onSelectSpot }) {
  const [activePin, setActivePin] = useState(daliData.sights[0]); // default to South Gate
  const [weatherMode, setWeatherMode] = useState('sunny'); // sunny, wind, flower, snow, moon
  const [activeRoute, setActiveRoute] = useState(null); // null, classic, heritage

  const handlePinClick = (spot) => {
    setActivePin(spot);
    onSelectSpot(spot);
  };

  const handleExploreMore = (spot) => {
    onSelectSpot(spot);
    onNavigate('景点');
  };

  // Weather descriptions for tooltips/helpers
  const weatherLabels = {
    sunny: '风和日丽',
    wind: '下关风 (清风拂面)',
    flower: '上关花 (花瓣飘零)',
    snow: '苍山雪 (飞雪皑皑)',
    moon: '洱海月 (月影摇曳)'
  };

  // Pre-calculated coordinates mapping for SVG route lines
  // Sight IDs: 1 (South Gate), 2 (Wuhua), 3 (Foreigner St), 4 (Honglong), 5 (Confucian), 8 (Three Pagodas)
  const routePaths = {
    classic: "M 50,78 Q 44,71 40,64 T 30,52 Q 37,49 44,46 T 62,70",
    heritage: "M 50,78 Q 53,67 56,56 T 44,46 Q 37,49 30,52 T 18,25"
  };

  return (
    <div className="flex-1 h-full flex flex-col relative select-none overflow-hidden animate-fade-in-up">
      
      {/* 1. Main Bird's-Eye Map Illustration Backdrop */}
      <div className="flex-1 w-full relative bg-cover bg-center bg-[#e4e9ed]"
           style={{ 
             backgroundImage: `url('${daliMapBackdrop}')`,
             // Mimics a beautifully painted cartoonish aerial map of Cangshan/Erhai/Dali
           }}>
        
        {/* Soft vignette/grid overlays */}
        <div className="absolute inset-0 bg-black/15"></div>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_30%,rgba(0,0,0,0.3)_95%)]"></div>
        
        {/* Dynamic Weather Overlay Particles */}
        {weatherMode !== 'sunny' && (
          <div className="weather-overlay">
            {/* Xiaguan Wind Lines */}
            {weatherMode === 'wind' && Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="wind-line" 
                style={{ 
                  '--y-pos': `${10 + i * 11}%`, 
                  top: `${10 + i * 11}%`,
                  left: '0px',
                  width: `${100 + Math.random() * 200}px`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }} 
              />
            ))}

            {/* Shangguan Falling Flowers */}
            {weatherMode === 'flower' && Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="falling-flower" 
                style={{ 
                  left: `${5 + Math.random() * 90}%`,
                  top: '-20px',
                  width: `${6 + Math.random() * 12}px`,
                  height: `${6 + Math.random() * 12}px`,
                  animationDelay: `${i * 0.6}s`,
                  animationDuration: `${5 + Math.random() * 5}s`
                }} 
              />
            ))}

            {/* Cangshan Falling Snow */}
            {weatherMode === 'snow' && Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                className="falling-snow" 
                style={{ 
                  left: `${2 + Math.random() * 96}%`,
                  top: '-10px',
                  width: `${2 + Math.random() * 5}px`,
                  height: `${2 + Math.random() * 5}px`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${4 + Math.random() * 4}s`
                }} 
              />
            ))}

            {/* Erhai Moon Glow */}
            {weatherMode === 'moon' && (
              <div 
                className="moon-glow" 
                style={{ 
                  top: '12%', 
                  right: '18%', 
                  width: '180px', 
                  height: '180px' 
                }} 
              />
            )}
          </div>
        )}

        {/* 2. Glow path overlay representing recommendation tours */}
        {activeRoute && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d={routePaths[activeRoute]} 
              fill="none" 
              className="glowing-route" 
            />
          </svg>
        )}

        {/* Static landmark labels in the background */}
        <span className="absolute top-28 left-48 text-white/70 text-xs font-bold tracking-widest pointer-events-none filter drop-shadow">
          苍山
        </span>
        <span className="absolute top-36 left-96 text-white/70 text-xs font-bold tracking-widest pointer-events-none filter drop-shadow">
          苍山
        </span>
        <span className="absolute top-48 left-80 text-white/70 text-xs font-bold tracking-widest pointer-events-none filter drop-shadow">
          洋人街
        </span>
        <span className="absolute bottom-28 left-1/2 text-white/70 text-xs font-bold tracking-widest pointer-events-none filter drop-shadow">
          三塔
        </span>
        <span className="absolute top-44 right-24 text-white/70 text-xs font-bold tracking-widest pointer-events-none filter drop-shadow">
          洱海
        </span>

        {/* 3. Interactive Geo Pins */}
        {daliData.sights.map(spot => {
          const isActive = activePin && activePin.id === spot.id;
          return (
            <button
              key={spot.id}
              onClick={() => handlePinClick(spot)}
              style={{ left: `${spot.coords.x}%`, top: `${spot.coords.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 flex items-center justify-center p-2 rounded-full transition-all duration-300 pointer-events-auto ${
                isActive 
                  ? 'bg-blue-600 text-white scale-125 map-pin-pulse shadow-lg' 
                  : 'bg-amber-100/90 text-amber-800 scale-100 hover:scale-115 hover:bg-white shadow'
              }`}
            >
              <MapPin className="w-4 h-4" />
            </button>
          );
        })}

        {/* 4. Detail Popup Card (matches Dali South Gate popup design) */}
        {activePin && (
          <div 
            style={{ left: `${activePin.coords.x}%`, top: `${activePin.coords.y - 4}%` }}
            className="absolute -translate-x-1/2 -translate-y-full z-30 bg-white/95 rounded-xl border border-black/5 shadow-2xl p-3 w-72 md:w-80 flex flex-col gap-3 animate-fade-in-up pointer-events-auto"
          >
            {/* Pop-up triangle helper */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[9px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
            
            <button 
              onClick={() => setActivePin(null)}
              className="absolute top-2.5 right-2.5 p-1 text-dali-text-muted hover:text-dali-text-main rounded-full hover:bg-black/5"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Popup Image representation */}
            <div className="h-24 rounded-lg bg-gradient-to-br from-amber-700 to-indigo-950 relative overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url('${sightImages[activePin.id] || daliSouthGate}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Title & Description */}
            <div>
              <h4 className="text-xs font-extrabold text-dali-text-main">
                {activePin.name} ({activePin.enName})
              </h4>
              <p className="text-[10px] text-dali-text-secondary leading-relaxed mt-1">
                {activePin.desc}
              </p>
            </div>

            {/* Audio / VR / Learn More buttons */}
            <div className="flex gap-2 items-center border-t border-black/5 pt-2.5 mt-0.5">
              <button 
                onClick={() => handleExploreMore(activePin)}
                className="flex-1 py-1.5 px-3 bg-[#b98a4d] hover:bg-[#916834] text-white text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
              >
                探索更多 <ArrowUpRight className="w-3 h-3" />
              </button>

              <button 
                onClick={() => onNavigate('景点')}
                className="py-1.5 px-2 bg-black/5 hover:bg-black/10 text-dali-text-secondary hover:text-dali-text-main text-[9px] font-semibold rounded-lg transition-colors flex items-center gap-1"
              >
                <Headphones className="w-3 h-3 text-[#b98a4d]" />
                <span>语音解说</span>
              </button>
              
              <button 
                onClick={() => onNavigate('景点')}
                className="py-1.5 px-2 bg-black/5 hover:bg-black/10 text-dali-text-secondary hover:text-dali-text-main text-[9px] font-semibold rounded-lg transition-colors flex items-center gap-1"
              >
                <Eye className="w-3 h-3 text-[#1da59a]" />
                <span>VR 游览</span>
              </button>
            </div>

          </div>
        )}

        {/* 5. Floating Controllers Overlay */}
        {/* Left Side: Route Planner */}
        <div className="absolute bottom-4 left-4 bg-white/95 rounded-xl border border-black/5 shadow-xl p-2.5 flex flex-col gap-2 z-20 pointer-events-auto">
          <span className="text-[9px] text-dali-text-secondary font-bold block text-left uppercase tracking-wider">
            🗺️ 智慧推荐路线
          </span>
          <div className="flex gap-1.5">
            <button 
              onClick={() => setActiveRoute(activeRoute === 'classic' ? null : 'classic')}
              className={`px-2 py-1 rounded text-[9.5px] font-bold border transition-colors cursor-pointer ${
                activeRoute === 'classic' 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                  : 'bg-white border-border-dali text-dali-text-secondary hover:border-[#b98a4d]'
              }`}
            >
              一日经典线
            </button>
            <button 
              onClick={() => setActiveRoute(activeRoute === 'heritage' ? null : 'heritage')}
              className={`px-2 py-1 rounded text-[9.5px] font-bold border transition-colors cursor-pointer ${
                activeRoute === 'heritage' 
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' 
                  : 'bg-white border-border-dali text-dali-text-secondary hover:border-[#b98a4d]'
              }`}
            >
              非遗文化线
            </button>
          </div>
          {activeRoute && (
            <span className="text-[8px] text-dali-text-secondary block max-w-[180px] text-left leading-tight italic">
              {activeRoute === 'classic' 
                ? '路线: 南城门 → 红龙井 → 洋人街 → 五华楼 → 崇圣寺三塔' 
                : '路线: 南城门 → 文庙 → 五华楼 → 洋人街 → 苍山'
              }
            </span>
          )}
        </div>

        {/* Right Side: Weather Selector (风花雪月) */}
        <div className="absolute bottom-4 right-4 bg-white/95 rounded-xl border border-black/5 shadow-xl p-2.5 flex flex-col gap-2 z-20 pointer-events-auto">
          <span className="text-[9px] text-dali-text-secondary font-bold block text-left uppercase tracking-wider">
            🌸 风花雪月天气系统
          </span>
          <div className="flex gap-1">
            {['sunny', 'wind', 'flower', 'snow', 'moon'].map(mode => (
              <button 
                key={mode}
                onClick={() => setWeatherMode(mode)}
                title={weatherLabels[mode]}
                className={`w-6 h-6 rounded flex items-center justify-center text-[10px] border transition-all cursor-pointer ${
                  weatherMode === mode 
                    ? 'bg-[#b98a4d] border-[#b98a4d] text-white scale-110 shadow-sm' 
                    : 'bg-white border-border-dali hover:border-[#b98a4d]/45'
                }`}
              >
                {mode === 'sunny' && '☀️'}
                {mode === 'wind' && '💨'}
                {mode === 'flower' && '🌸'}
                {mode === 'snow' && '❄️'}
                {mode === 'moon' && '🌙'}
              </button>
            ))}
          </div>
          <span className="text-[8.5px] text-[#b98a4d] font-bold block text-left mt-0.5 font-sans leading-none">
            当前气候: {weatherLabels[weatherMode]}
          </span>
        </div>

      </div>

    </div>
  );
}
