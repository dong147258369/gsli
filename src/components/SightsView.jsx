import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Play, Pause, Star, ChevronDown, X, Volume2, RotateCcw, Share2, Info, ArrowLeft, ArrowRight, Navigation, Camera, Navigation2, RefreshCw } from 'lucide-react';
import { daliData } from '../data/daliData';
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

export default function SightsView({ onSelectSpot, selectedSpot }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [activeModalSpot, setActiveModalSpot] = useState(null);
  const [vrOffset, setVrOffset] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(15);
  
  // AR Walking Navigation States
  const [activeArNav, setActiveArNav] = useState(false);
  const [arDistance, setArDistance] = useState(150);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);

  // Review states
  const [reviewsMap, setReviewsMap] = useState({
    1: [
      { id: 1, author: '行者无疆', rating: 5, date: '2023-11-20', content: '登上城门，看着远处的苍山，特别震撼！城墙非常厚实，饱经沧桑。' },
      { id: 2, author: '金花朵朵', rating: 4, date: '2023-11-18', content: '大理两个字写的很好看，城门口拍照很出片，就是下午人有点多。' }
    ],
    2: [
      { id: 1, author: '徐霞客传人', rating: 5, date: '2023-11-15', content: '五华楼是古城的中心地标，登楼之后视野太开阔了，夜景尤其漂亮。' },
      { id: 2, author: '背包客小王', rating: 4, date: '2023-11-12', content: '楼下有很多好玩的手工艺品店铺，二楼看红龙井和复兴路很赞。' }
    ],
    8: [
      { id: 1, author: '古建迷', rating: 5, date: '2023-11-16', content: '唐代千寻塔的砖雕精美异常，三塔倒影公园的池水倒影特别漂亮，推荐去！' }
    ]
  });
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [activeHotspotDesc, setActiveHotspotDesc] = useState(null);

  // AI Audio Guide interval
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 150);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // AR Navigation live camera hook
  useEffect(() => {
    if (activeArNav) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          setCameraStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.warn("Camera feed block or unavailable, switching to virtual AR mode.", err);
        });
    } else {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
      }
    }
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeArNav]);

  // AR Walking simulator countdown hook
  useEffect(() => {
    let walkInterval = null;
    if (activeArNav) {
      setArDistance(150);
      walkInterval = setInterval(() => {
        setArDistance(prev => {
          if (prev <= 0) {
            clearInterval(walkInterval);
            return 0;
          }
          return prev - 3;
        });
      }, 250);
    } else {
      clearInterval(walkInterval);
    }
    return () => clearInterval(walkInterval);
  }, [activeArNav]);

  const categories = ['All', '古迹', '街道', '文化', '自然'];

  const filteredSights = daliData.sights.filter(sight => {
    const matchesSearch = sight.name.includes(searchQuery) || sight.enName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || sight.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const popularRecommendations = daliData.sights.slice(0, 4);

  return (
    <div className="flex-1 h-full flex overflow-hidden animate-fade-in-up pointer-events-auto">
      
      {/* 1. Left Sidebar within Sights Panel */}
      <div className="w-60 border-r border-border-dali bg-white/60 p-4 flex flex-col gap-4 overflow-y-auto shrink-0 select-none">
        
        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="搜索..."
            className="w-full pl-3 pr-3 py-1.5 bg-white border border-border-dali rounded-lg text-xs focus:outline-none focus:border-[#b98a4d]"
          />
        </div>

        {/* Category Pills Filter */}
        <div>
          <span className="text-[10px] text-dali-text-secondary font-bold block mb-2">搜索类型:</span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded text-[10px] font-semibold border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#b98a4d] border-[#b98a4d] text-white'
                    : 'bg-white border-border-dali text-dali-text-secondary hover:border-[#b98a4d]/40'
                }`}
              >
                {cat === 'All' ? '全部' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Recommendations list */}
        <div>
          <span className="text-[10px] text-dali-text-secondary font-bold block mb-2.5">热门推荐:</span>
          <div className="flex flex-col gap-3">
            {popularRecommendations.map(sight => (
              <div 
                key={sight.id} 
                onClick={() => onSelectSpot(sight)}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                {/* Minimized thumbnail representation */}
                <div className="w-10 h-10 rounded bg-gradient-to-br from-amber-700 to-indigo-950 relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform"
                       style={{ backgroundImage: `url('${sightImages[sight.id] || daliSouthGate}')` }}/>
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] font-bold text-dali-text-main group-hover:text-[#b98a4d] transition-colors truncate">
                    {sight.name}
                  </h4>
                  <p className="text-[9px] text-dali-text-muted mt-0.5">大理古城评阅</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 2. Right Content Area: grid of cards */}
      <div className="flex-1 flex flex-col p-5 overflow-y-auto bg-white/20">
        
        {/* Title Header */}
        <div className="flex justify-between items-center mb-5 select-none shrink-0">
          <div>
            <h2 className="text-base font-extrabold text-dali-text-main flex items-center gap-1.5 dali-title-serif">
              探索古城名胜 <span className="text-[10px] text-dali-text-secondary font-normal font-sans">探索古城名胜</span>
            </h2>
          </div>
          <button className="px-2.5 py-1 bg-white border border-border-dali rounded text-[10px] font-bold text-dali-text-secondary flex items-center gap-1 hover:border-[#b98a4d]">
            <span>按热度排序</span> <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {filteredSights.map(sight => (
            <div
              key={sight.id}
              onClick={() => { onSelectSpot(sight); setActiveModalSpot(sight); }}
              className="bg-white/90 border border-border-dali rounded-xl overflow-hidden hover:border-[#b98a4d]/30 transition-all duration-300 hover:shadow-md flex flex-col cursor-pointer"
            >
              {/* Image banner representing Sight */}
              <div className="h-32 bg-gradient-to-br from-amber-700 to-indigo-950 p-3 flex justify-between items-start relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-cover bg-center opacity-80"
                     style={{ backgroundImage: `url('${sightImages[sight.id] || daliSouthGate}')` }}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold text-[#dfb257] flex items-center gap-0.5 z-10 select-none">
                  <Star className="w-2.5 h-2.5 fill-[#dfb257] text-[#dfb257]" /> {sight.rating}
                </span>
                
                <span className="px-1.5 py-0.5 bg-white/20 backdrop-blur-md rounded text-[8px] font-bold text-white z-10 select-none">
                  {sight.type}
                </span>
              </div>

              {/* Body */}
              <div className="p-3.5 flex flex-col flex-1 gap-2 text-left">
                <div>
                  <h3 className="text-xs font-extrabold text-dali-text-main flex items-center gap-1.5">
                    {sight.name} <span className="text-[10px] text-dali-text-secondary font-normal font-mono">{sight.enName}</span>
                  </h3>
                  <p className="text-[10px] text-dali-text-secondary leading-relaxed mt-1 line-clamp-2">
                    {sight.desc}
                  </p>
                </div>

                {/* Bottom row actions */}
                <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onSelectSpot(sight); setActiveModalSpot(sight); }}
                    className="text-[10px] font-extrabold text-[#b98a4d] hover:text-[#916834] transition-colors cursor-pointer select-none"
                  >
                    了解更多
                  </button>

                  {sight.audio && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onSelectSpot(sight); setActiveModalSpot(sight); setIsPlaying(true); }}
                      className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors cursor-pointer select-none"
                    >
                      <Play className="w-2.5 h-2.5 text-dali-blue fill-dali-blue" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
          {filteredSights.length === 0 && (
            <div className="col-span-2 py-12 text-center text-dali-text-muted text-xs">
              无符合过滤条件的景点
            </div>
          )}
        </div>

      </div>

      {/* 3. Spot Details Interactive Modal */}
      {activeModalSpot && (
        <div className="absolute inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in pointer-events-auto">
          
          <div className="bg-white/95 rounded-2xl border border-black/5 shadow-2xl w-full max-w-2xl max-h-[85%] flex flex-col overflow-hidden animate-fade-in-up">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-black/5 flex justify-between items-center bg-[#b98a4d]/5 shrink-0 select-none">
              <div>
                <span className="px-1.5 py-0.5 bg-amber-800 text-white rounded text-[8px] font-bold uppercase tracking-wider">
                  {activeModalSpot.type}
                </span>
                <h3 className="text-sm font-extrabold text-dali-text-main flex items-center gap-2 mt-1">
                  {activeModalSpot.name} 
                  <span className="text-[10px] text-dali-text-secondary font-mono font-normal">({activeModalSpot.enName})</span>
                </h3>
              </div>
              <button 
                onClick={() => { setActiveModalSpot(null); setIsPlaying(false); }}
                className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-dali-text-secondary" />
              </button>
            </div>

            {/* Modal Body Container */}
            {activeArNav ? (
              /* AR Walk Navigation Simulator Viewport */
              <div className="flex-1 relative bg-black min-h-[350px] overflow-hidden flex flex-col justify-between p-4 select-none">
                
                {/* 1. Camera Feed (real webcam or simulated background) */}
                {cameraStream ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                ) : (
                  /* Fallback simulated live camera panning the scenic asset */
                  <div 
                    className="absolute inset-0 bg-cover bg-no-repeat opacity-60 filter saturate-150 brightness-110"
                    style={{ 
                      backgroundImage: `url('${sightImages[activeModalSpot.id] || daliSouthGate}')`,
                      backgroundPosition: `${50 + Math.sin(arDistance / 10) * 10}% center`,
                      backgroundSize: '180% 120%',
                      transition: 'background-position 0.25s ease-out'
                    }}
                  />
                )}

                {/* Grid Scan Lines Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_95%)] pointer-events-none" />
                <div className="absolute inset-0 border border-white/10 flex items-center justify-center pointer-events-none">
                  {/* Camera focus bracket */}
                  <div className="w-48 h-36 border border-dashed border-white/20 rounded relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#1da59a]" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#1da59a]" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#1da59a]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#1da59a]" />
                  </div>
                </div>

                {/* 2. Top Status Bar: RADAR scan & Distance indicator */}
                <div className="z-10 flex justify-between items-start">
                  
                  {/* Holographic Radar */}
                  <div className="w-14 h-14 rounded-full border border-[#1da59a]/40 bg-black/40 backdrop-blur-md relative overflow-hidden flex items-center justify-center shadow-lg">
                    {/* Radar scan line */}
                    <div className="absolute w-full h-0.5 bg-[#1da59a]/70 top-1/2 left-0 origin-center animate-spin" style={{ animationDuration: '3s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping absolute top-1/3 left-1/2" />
                    <div className="w-1 h-1 rounded-full bg-[#1da59a] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <RefreshCw className="w-8 h-8 text-[#1da59a]/30 animate-pulse" />
                  </div>

                  {/* Distance Countdown Card */}
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-3.5 py-1.5 text-right shadow-lg">
                    <span className="text-[8px] text-white/50 block font-bold uppercase tracking-wider">AR Target Range</span>
                    <span className="text-base font-black text-white font-mono flex items-baseline gap-0.5">
                      {arDistance} <span className="text-[10px] font-normal">米 (m)</span>
                    </span>
                  </div>

                </div>

                {/* 3. Central Hovering Holographic Navigation Arrow */}
                <div className="z-10 flex-1 flex flex-col items-center justify-center relative">
                  {arDistance > 0 ? (
                    <div className="flex flex-col items-center animate-bounce duration-1000">
                      {/* SVG Glowing Holographic 3D Arrow */}
                      <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(29,165,154,0.85)] fill-[#1da59a] text-[#1da59a]">
                        <path d="M50 15 L80 55 L60 55 L60 85 L40 85 L40 55 L20 55 Z" className="transform origin-center" style={{ transform: `rotate(${Math.sin(arDistance / 15) * 15}deg)` }} />
                      </svg>
                      <span className="px-2.5 py-1 bg-[#1da59a]/90 text-white text-[9px] font-bold rounded-full backdrop-blur-md shadow-md mt-2 tracking-widest animate-pulse border border-white/20">
                        {arDistance > 100 ? "请直行" : arDistance > 10 ? "前方请右转" : "即将抵达"}
                      </span>
                    </div>
                  ) : (
                    /* Destination Success Card */
                    <div className="bg-white/95 border border-[#b98a4d]/20 rounded-2xl p-5 w-72 text-center shadow-2xl animate-fade-in-up flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#1da59a]/15 flex items-center justify-center border border-[#1da59a]/40 text-[#1da59a]">
                        <Star className="w-5 h-5 fill-[#1da59a]" />
                      </div>
                      <h4 className="text-xs font-bold text-dali-text-main">已抵达目的地：{activeModalSpot.name}</h4>
                      <p className="text-[9px] text-dali-text-secondary leading-relaxed">
                        您已顺利通过 AR 实景步导抵达终点。您可以点击下方按钮开启语音解说，了解更多大理古迹故事。
                      </p>
                      <button 
                        onClick={() => { setActiveArNav(false); setIsPlaying(true); }}
                        className="mt-1 px-4 py-1.5 bg-[#b98a4d] hover:bg-[#916834] text-white text-[9px] font-bold rounded-full transition-colors cursor-pointer"
                      >
                        播放 AI 语音解说
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Bottom Instructions Card & Exit Trigger */}
                <div className="z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 flex justify-between items-center gap-4 text-left shadow-lg shrink-0">
                  <div className="min-w-0 flex-1">
                    <span className="text-[8px] text-white/50 block font-bold uppercase tracking-wider">AR Step Guide</span>
                    <h5 className="text-[10px] font-bold text-white truncate mt-0.5">
                      {arDistance > 100 && "沿复兴路朝北直行 60 米"}
                      {arDistance <= 100 && arDistance > 10 && "前方路口右转，继续前行 50 米"}
                      {arDistance <= 10 && arDistance > 0 && "已看到目的地，前方 15 米直行"}
                      {arDistance === 0 && "您已顺利抵达终点！"}
                    </h5>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button 
                      onClick={() => setArDistance(150)}
                      className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                      title="重新导航"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => setActiveArNav(false)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[9px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      退出导航
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* Original Dual Column Details View */
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                
                {/* Dual Column Layout */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Column Left: Visual & VR Tour */}
                  <div className="flex flex-col gap-3">
                    {/* VR Viewer container */}
                    <div className="rounded-xl overflow-hidden border border-border-dali relative h-48 bg-black shrink-0 shadow-sm">
                      <div 
                        className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-300"
                        style={{ 
                          backgroundImage: `url('${sightImages[activeModalSpot.id] || daliSouthGate}')`,
                          backgroundPosition: `${vrOffset}% center`,
                          backgroundSize: '160% 100%'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[8px] font-bold text-white flex items-center gap-1 z-10">
                        <RotateCcw className="w-2 h-2 animate-spin" /> 360° VR 虚拟导游
                      </span>

                      {/* Interactive VR Hotspots overlay depending on vrOffset */}
                      {activeModalSpot.id === 1 && (
                        <button 
                          onClick={() => setActiveHotspotDesc('城门牌匾：“大理”二字由著名作家金庸先生亲笔题写，字体苍劲有力，是南城门的重要标志。')}
                          style={{ left: `${55 - (vrOffset - 50) * 0.8}%`, top: '45%' }}
                          className="absolute vr-hotspot w-5 h-5 rounded-full bg-[#b98a4d] text-white text-[9px] font-bold flex items-center justify-center cursor-pointer shadow border border-white/20 select-none z-10 animate-bounce"
                        >
                          ℹ️
                        </button>
                      )}
                      {activeModalSpot.id === 2 && (
                        <button 
                          onClick={() => setActiveHotspotDesc('重檐楼阁：明清重檐歇山顶式建筑，是古代南诏国接见国宾的国宾馆，气势恢宏。')}
                          style={{ left: `${60 - (vrOffset - 50) * 0.9}%`, top: '38%' }}
                          className="absolute vr-hotspot w-5 h-5 rounded-full bg-[#b98a4d] text-white text-[9px] font-bold flex items-center justify-center cursor-pointer shadow border border-white/20 select-none z-10 animate-bounce"
                        >
                          ℹ️
                        </button>
                      )}
                      {activeModalSpot.id === 8 && (
                        <button 
                          onClick={() => setActiveHotspotDesc('千寻塔：三塔中居中的主塔，高69.13米，为唐代中原式砖塔，结构极其稳固。')}
                          style={{ left: `${48 - (vrOffset - 50) * 0.6}%`, top: '42%' }}
                          className="absolute vr-hotspot w-5 h-5 rounded-full bg-[#b98a4d] text-white text-[9px] font-bold flex items-center justify-center cursor-pointer shadow border border-white/20 select-none z-10 animate-bounce"
                        >
                          ℹ️
                        </button>
                      )}

                      {/* Hotspot details overlay card */}
                      {activeHotspotDesc && (
                        <div className="absolute top-2 right-2 left-2 bg-black/80 backdrop-blur-sm rounded-lg p-2 text-left z-20 text-[9px] text-white flex justify-between items-start animate-fade-in border border-white/10">
                          <span>{activeHotspotDesc}</span>
                          <button onClick={() => setActiveHotspotDesc(null)} className="text-white/60 hover:text-white font-bold ml-2">✕</button>
                        </div>
                      )}

                      {/* Navigation controls */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-full z-10">
                        <button 
                          onClick={() => { setVrOffset(prev => Math.max(0, prev - 10)); setActiveHotspotDesc(null); }}
                          className="p-1 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                        <span className="text-[8px] text-white/90 font-bold font-mono">视点: {vrOffset}%</span>
                        <button 
                          onClick={() => { setVrOffset(prev => Math.min(100, prev + 10)); setActiveHotspotDesc(null); }}
                          className="p-1 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Travel Info Box */}
                    <div className="bg-blue-50/50 rounded-xl p-3 border border-dali-blue/10 text-left">
                      <span className="text-[10px] text-dali-text-main font-bold flex items-center gap-1 mb-1.5 select-none">
                        <Info className="w-3.5 h-3.5 text-dali-blue" /> 实用旅行贴士
                      </span>
                      <div className="flex flex-col gap-1 text-[9px] text-dali-text-secondary">
                        <div>🎟️ 门票信息: <span className="font-bold text-dali-text-main ml-1">{activeModalSpot.id === 8 ? "门票：75元/人" : "免费开放"}</span></div>
                        <div>⏰ 建议游玩: <span className="font-bold text-dali-text-main ml-1">1 - 2 小时</span></div>
                        <div>🚌 交通方式: <span className="font-bold text-dali-text-main ml-1">古城内步行/直达大巴</span></div>
                        <div>💡 推荐时段: <span className="font-bold text-dali-text-main ml-1">16:00 - 18:30 (最美夕阳)</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Column Right: Description & Audio Player */}
                  <div className="flex flex-col gap-3 text-left">
                    <div>
                      <span className="text-[10px] text-dali-text-secondary font-bold block mb-1">景点介绍:</span>
                      <p className="text-[10px] text-dali-text-secondary leading-relaxed bg-black/5 p-3 rounded-lg max-h-36 overflow-y-auto">
                        {activeModalSpot.desc} 大理古城承载着唐宋五华楼、明清城墙等丰富的历史遗存。这里不仅保留着棋盘式的街道格局和清澈的三条井泉，更是了解白族传统文化、体验古朴丝路岁月的活化石。
                      </p>
                    </div>

                    {/* Audio Guide Container */}
                    <div className="bg-amber-50/60 rounded-xl p-3 border border-[#b98a4d]/15 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-dali-text-main font-bold flex items-center gap-1">
                          <Volume2 className="w-3.5 h-3.5 text-[#b98a4d]" /> 智能AI解说
                        </span>
                        {/* Sound waves animation */}
                        <div className="flex items-end gap-0.5 h-3">
                          <div className={`w-0.5 bg-[#b98a4d] rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce h-3' : 'h-1'}`} style={{ animationDelay: '0.1s' }} />
                          <div className={`w-0.5 bg-[#b98a4d] rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce h-2' : 'h-1.5'}`} style={{ animationDelay: '0.3s' }} />
                          <div className={`w-0.5 bg-[#b98a4d] rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce h-3.5' : 'h-1'}`} style={{ animationDelay: '0.5s' }} />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-7 h-7 rounded-full bg-[#b98a4d] hover:bg-[#916834] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                        >
                          {isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white ml-0.5" />}
                        </button>
                        <div className="flex-1">
                          <div className="h-1 bg-black/5 rounded-full overflow-hidden relative">
                            <div className="absolute left-0 top-0 h-full bg-[#b98a4d]" style={{ width: `${audioProgress}%` }} />
                          </div>
                          <div className="flex justify-between items-center mt-1 text-[8px] text-dali-text-secondary font-mono">
                            <span>{Math.floor((audioProgress * 150) / 100 / 60)}:{(Math.floor((audioProgress * 150) / 100) % 60).toString().padStart(2, '0')}</span>
                            <span>02:30</span>
                          </div>
                        </div>
                      </div>

                      {/* Audio Transcript text */}
                      <div className="h-14 overflow-y-auto border-t border-black/5 pt-1 text-[8.5px] text-dali-text-secondary leading-relaxed bg-white/45 p-1 rounded font-sans">
                        <span className="font-semibold text-dali-text-main">播放文本: </span>
                        {activeModalSpot.id === 1 && "您好，当前为您讲解的是大理古城南城门。南城门是古城的门面，始建于洪武年间。城门上刻有的‘大理’二字由金庸先生亲笔题写，在此能感受到千百年来白族土司与中原文化交流融合的历史脉搏。"}
                        {activeModalSpot.id === 2 && "您好，当前为您讲解的是五华楼。作为南诏及大理国国王迎宾的国宾馆，这里见证了无数盛大的宴会与外事活动，是大理历史演变的无价地标。"}
                        {activeModalSpot.id === 8 && "您好，当前为您讲解的是崇圣寺三塔。东临洱海、西靠苍山，这三座砖塔经历了千年的风雨剥蚀与强烈地震依然屹立不倒，堪称中国建筑史上的奇迹。"}
                        {![1,2,8].includes(activeModalSpot.id) && "您好，这里是大理最具白族民俗与历史风情的著名景点。在这里您可以慢下脚步，静静体味古丝路商贾马帮和白族扎染工艺带来的文化沉淀。"}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Reviews Section */}
                <div className="border-t border-black/5 pt-4 mt-2">
                  <span className="text-[10px] text-dali-text-main font-bold block mb-2 text-left">游客真实点评</span>
                  
                  <div className="flex flex-col gap-2.5 max-h-36 overflow-y-auto mb-3 bg-black/5 p-3 rounded-xl border border-black/5">
                    {(reviewsMap[activeModalSpot.id] || [
                      { id: 1, author: '云游诗人', rating: 5, date: '2023-11-10', content: `来到 ${activeModalSpot.name}，让人感觉时光变慢了，风景如画！` },
                      { id: 2, author: '大理小金花', rating: 4, date: '2023-11-08', content: '白族风情浓郁，拍照超级好看，非常推荐大家来打卡。' }
                    ]).map(rev => (
                      <div key={rev.id} className="text-left border-b border-black/5 pb-2 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <span className="text-[9.5px] font-bold text-dali-text-main">{rev.author}</span>
                          <span className="text-[8.5px] text-dali-text-muted font-mono">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mt-0.5 text-orange-400">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} className={`w-2.5 h-2.5 ${idx < rev.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-[9.5px] text-dali-text-secondary mt-1 leading-relaxed">{rev.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Review Form */}
                  <div className="bg-amber-50/40 border border-[#b98a4d]/10 rounded-xl p-3 text-left">
                    <span className="text-[9px] text-dali-text-main font-bold block mb-1.5">发布您的点评</span>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[9px] text-dali-text-secondary">评分:</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button 
                            key={star} 
                            onClick={() => setNewReviewRating(star)}
                            className="cursor-pointer animate-pulse"
                          >
                            <Star className={`w-3.5 h-3.5 ${star <= newReviewRating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 items-end">
                      <textarea 
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        placeholder={`分享您对 ${activeModalSpot.name} 的印象和故事...`}
                        rows="2"
                        className="flex-1 bg-white border border-border-dali rounded-lg px-2.5 py-1.5 text-[9.5px] focus:outline-none focus:border-[#b98a4d]"
                      />
                      <button 
                        onClick={() => {
                          if (!newReviewText.trim()) return;
                          const newRev = {
                            id: Date.now(),
                            author: '当前旅伴',
                            rating: newReviewRating,
                            date: new Date().toISOString().split('T')[0],
                            content: newReviewText
                          };
                          setReviewsMap(prev => ({
                            ...prev,
                            [activeModalSpot.id]: [newRev, ...(prev[activeModalSpot.id] || [
                              { id: 1, author: '云游诗人', rating: 5, date: '2023-11-10', content: `来到 ${activeModalSpot.name}，让人感觉时光变慢了，风景如画！` },
                              { id: 2, author: '大理小金花', rating: 4, date: '2023-11-08', content: '白族风情浓郁，拍照超级好看，非常推荐大家来打卡。' }
                            ])]
                          }));
                          setNewReviewText('');
                        }}
                        className="px-3.5 py-1.5 bg-[#b98a4d] hover:bg-[#916834] text-white text-[9.5px] font-bold rounded-lg transition-colors cursor-pointer select-none shrink-0"
                      >
                        发布点评
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Modal Footer Controls */}
            {!activeArNav && (
              <div className="px-5 py-4 border-t border-black/5 flex gap-3 bg-[#b98a4d]/5 shrink-0">
                <button 
                  onClick={() => setActiveArNav(true)}
                  className="flex-1 py-2 bg-dali-blue hover:bg-teal-700 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer select-none"
                >
                  <Navigation className="w-3.5 h-3.5 animate-pulse" /> 
                  开启 AR 步行实景导航
                </button>
                <button 
                  onClick={() => alert(`已将“${activeModalSpot.name}”成功加入您的旅行游览规划清单中！`)}
                  className="px-4 py-2 bg-[#b98a4d] hover:bg-[#916834] text-white rounded-lg text-[10px] font-bold transition-colors select-none cursor-pointer"
                >
                  加入行程规划
                </button>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
