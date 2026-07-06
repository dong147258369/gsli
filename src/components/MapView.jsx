import React, { useState } from 'react';
import { Search, MapPin, Navigation, Star, Layers, Globe, Compass, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
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

// Mock points of interest data for Food and Lodging filters
const foodItems = [
  { id: 101, name: '白族八大碗', coords: { x: 48, y: 35 }, type: '美食', rating: 4.8, desc: '大理地道白族红白喜事宴席，菜品丰富，色香味俱全。' },
  { id: 102, name: '烤乳扇、烧饵块', coords: { x: 38, y: 55 }, type: '美食', rating: 4.7, desc: '古城街边招牌风味小吃，芝士香气扑鼻，软糯弹牙。' }
];

const lodgingItems = [
  { id: 201, name: '洱海观景别墅民宿', coords: { x: 75, y: 22 }, type: '住宿', rating: 4.9, desc: '面朝洱海，躺在床上看日出，享受静谧海浪时光。' },
  { id: 202, name: '古城白族精品客栈', coords: { x: 32, y: 42 }, type: '住宿', rating: 4.8, desc: '传统白族三坊一照壁院落客栈，闹中取静，别有风味。' }
];

export default function MapView({ onSelectSpot }) {
  const [mapQuery, setMapQuery] = useState('');
  const [selectedMapNode, setSelectedMapNode] = useState(daliData.sights[1]); // default to Wuhua Building
  const [activeFilter, setActiveFilter] = useState('景点'); // 景点, 美食, 住宿
  
  // Navigation states
  const [navActiveSpotId, setNavActiveSpotId] = useState(null); // ID of spot to navigate to
  
  // Zoom & Pan States
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const mapFilters = [
    { label: '探索景点', key: '景点' },
    { label: '地道美食', key: '美食' },
    { label: '特色宿地', key: '住宿' }
  ];

  const handleNodeClick = (node) => {
    setSelectedMapNode(node);
    if (node.id <= 8) {
      onSelectSpot(node);
    }
  };

  const handleZoom = (direction) => {
    setZoom(prev => {
      if (direction === 'in') return Math.min(2.5, prev + 0.2);
      return Math.max(1, prev - 0.2);
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setNavActiveSpotId(null);
  };

  // Drag and drop pan logic
  const handleMouseDown = (e) => {
    if (zoom === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Navigations steps text description mapping
  const navDirections = {
    2: [
      '从南城门起步，直行进入复兴路。',
      '沿复兴路步行 320 米，经过红龙井水街路口。',
      '前方直行 80 米，即可抵达大理古城中心五华楼。'
    ],
    3: [
      '从南城门出发，沿复兴路向北直行 320 米。',
      '在红龙井路口继续前行 60 米，左转进入洋人街。',
      '向西行进约 120 米，到达洋人街中段商铺区。'
    ],
    4: [
      '从南城门起步，向西北方向步行 150 米。',
      '左转进入红龙井街道，顺着溪流方向前行。',
      '步行约 180 米，即抵达红龙井水街酒吧区。'
    ],
    5: [
      '从南城门出发，向东北方向步行 120 米。',
      '右转朝东行进，经过城墙下清幽街巷，走约 200 米。',
      '抵达庄严幽静的大理文庙。'
    ],
    8: [
      '从南门沿复兴路一路向北步行穿越整个古城（约1.5公里）。',
      '出北城门牌坊后，朝西北方向继续步行 400 米。',
      '抵达大理象征——崇圣寺三塔景区门楼。'
    ],
    6: [
      '从南城门打车或乘巴士前往苍山大索道入口。',
      '乘坐索道登上洗马潭，漫步玉带云游路。',
      '到达苍山十九峰风景区。'
    ],
    7: [
      '从南门打车或骑行前往才村码头（约 3.5公里）。',
      '在才村入口处进入洱海生态廊道。',
      '顺着湖畔木栈道前行，即在洱海风光中。'
    ]
  };

  // SVG Line paths from South Gate (ID 1: coords x=50, y=78, which maps to svg width=800, height=600 -> x=400, y=468)
  const navPaths = {
    2: 'M 400,468 L 352,468 L 352,276', // 五华楼 (352, 276)
    3: 'M 400,468 L 352,468 L 352,312 L 240,312', // 洋人街 (240, 312)
    4: 'M 400,468 L 320,468 L 320,384', // 红龙井 (320, 384)
    5: 'M 400,468 L 448,468 L 448,336', // 文庙 (448, 336)
    8: 'M 400,468 L 496,468 L 496,420', // 三塔 (496, 420)
    6: 'M 400,468 L 144,468 L 144,150', // 苍山 (144, 150)
    7: 'M 400,468 L 640,468 L 640,210'  // 洱海 (640, 210)
  };

  // Filter dynamic points depending on activeFilter and mapQuery
  const visibleNodes = (
    activeFilter === '景点' 
      ? daliData.sights 
      : activeFilter === '美食' 
        ? foodItems 
        : lodgingItems
  ).filter(node => 
    node.name.toLowerCase().includes(mapQuery.trim().toLowerCase()) || 
    (node.desc && node.desc.toLowerCase().includes(mapQuery.trim().toLowerCase()))
  );

  return (
    <div className="flex-1 h-full flex relative select-none overflow-hidden animate-fade-in-up pointer-events-auto">
      
      {/* 1. Central SVG Stylized Tourist Map Canvas */}
      <div 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex-1 h-full relative bg-[#edf2f7] overflow-hidden ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
      >
        
        {/* Stylized vector SVG map backdrop container with scale and pan transform */}
        <div 
          className="w-full h-full transition-transform duration-100 ease-out origin-center"
          style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)` }}
        >
          <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
            {/* Background ground */}
            <rect width="800" height="600" fill="#f7fafc" />

            {/* Cangshan Mountains (West - Left side) */}
            <path d="M-100,600 L-100,0 L120,0 L70,180 L140,320 L50,440 L100,600 Z" fill="#e2e8f0" opacity="0.8" />
            <path d="M-100,450 L-100,50 L20,100 L-30,280 L40,390 L-20,490 Z" fill="#cbd5e0" opacity="0.6" />
            <text x="35" y="300" fill="#718096" fontSize="14" fontWeight="bold" writingMode="vertical-rl" letterSpacing="6">
              苍山 (Cangshan)
            </text>

            {/* Erhai Lake (East - Right side) */}
            <path d="M800,0 L680,0 L720,120 L660,250 L750,420 L690,560 L800,600 Z" fill="#ebf8ff" />
            <path d="M800,50 L710,120 L740,240 L690,320 L780,480 L730,550 L800,580 Z" fill="#e1f5fe" opacity="0.8" />
            <text x="735" y="300" fill="#3182ce" fontSize="14" fontWeight="bold" writingMode="vertical-rl" letterSpacing="6">
              洱海 (Erhai)
            </text>

            {/* Rectangular Ancient City Wall boundary */}
            <rect x="220" y="80" width="380" height="420" rx="10" fill="none" stroke="#a0aec0" strokeWidth="5" strokeDasharray="10 5" opacity="0.6" />
            <rect x="225" y="85" width="370" height="410" rx="8" fill="none" stroke="#cbd5e0" strokeWidth="1" opacity="0.8" />
            
            {/* Main Road Network */}
            {/* Fuxing Road 复兴路 */}
            <line x1="390" y1="50" x2="390" y2="550" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" opacity="0.9" />
            <line x1="390" y1="50" x2="390" y2="550" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
            <text x="375" y="520" fill="#a0aec0" fontSize="9" fontWeight="bold" transform="rotate(-90 375 520)">
              复兴路 (Fuxing Rd)
            </text>

            {/* People's Road 人民路 */}
            <line x1="180" y1="280" x2="680" y2="280" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" opacity="0.9" />
            <line x1="180" y1="280" x2="680" y2="280" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
            <text x="560" y="274" fill="#a0aec0" fontSize="9" fontWeight="bold">
              人民路 (Renmin Rd)
            </text>

            {/* Foreigner's Street */}
            <line x1="220" y1="200" x2="480" y2="200" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" opacity="0.8" />
            <line x1="220" y1="200" x2="480" y2="200" stroke="#edf2f7" strokeWidth="6" strokeLinecap="round" />
            
            {/* City Gates Labels */}
            <text x="390" y="70" fill="#4a5568" fontSize="10" fontWeight="bold" textAnchor="middle">北门 (North Gate)</text>
            <text x="390" y="525" fill="#4a5568" fontSize="10" fontWeight="bold" textAnchor="middle">南门 (South Gate)</text>
            <text x="180" y="284" fill="#4a5568" fontSize="10" fontWeight="bold" textAnchor="middle">西门 (West)</text>
            <text x="635" y="284" fill="#4a5568" fontSize="10" fontWeight="bold" textAnchor="middle">东门 (East)</text>

            {/* Waterway channels */}
            <path d="M 280,80 Q 290,180 270,280 T 290,500" fill="none" stroke="#90cdf4" strokeWidth="3" opacity="0.5" />
            <path d="M 490,80 Q 510,210 480,310 T 520,500" fill="none" stroke="#90cdf4" strokeWidth="2.5" opacity="0.5" />

            {/* Live Navigation Route drawing */}
            {navActiveSpotId && navPaths[navActiveSpotId] && (
              <path 
                d={navPaths[navActiveSpotId]} 
                fill="none" 
                className="glowing-route" 
              />
            )}
          </svg>

          {/* 2. Map Pins Overlay */}
          {visibleNodes.map(spot => {
            const isSelected = selectedMapNode && selectedMapNode.id === spot.id;
            const leftPos = `${spot.coords.x}%`;
            const topPos = `${spot.coords.y}%`;

            return (
              <button
                key={spot.id}
                onClick={() => handleNodeClick(spot)}
                style={{ left: leftPos, top: topPos }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 flex items-center justify-center p-2 rounded-full transition-all duration-300 pointer-events-auto ${
                  isSelected 
                    ? 'bg-blue-600 text-white scale-125 map-pin-pulse shadow-lg' 
                    : activeFilter === '美食' 
                      ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                      : activeFilter === '住宿' 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-white text-[#b98a4d] border border-[#b98a4d]/20'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
              </button>
            );
          })}

          {/* 3. Popup detail card */}
          {selectedMapNode && (
            <div 
              style={{ 
                left: `${selectedMapNode.coords.x}%`, 
                top: `${selectedMapNode.coords.y - 5}%` 
              }}
              className="absolute -translate-x-1/2 -translate-y-full z-30 bg-white/95 rounded-xl border border-black/5 shadow-2xl p-3 w-64 flex flex-col gap-2.5 animate-fade-in-up pointer-events-auto"
            >
              {/* pop up pointer */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[9px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
              
              <div className="h-20 rounded bg-gradient-to-br from-amber-700 to-indigo-950 overflow-hidden relative shrink-0">
                <div className="absolute inset-0 bg-cover bg-center"
                     style={{ backgroundImage: `url('${sightImages[selectedMapNode.id] || daliThreePagodas}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="text-left">
                <h4 className="text-xs font-bold text-dali-text-main flex items-center gap-1.5 justify-between">
                  <span>{selectedMapNode.name}</span>
                  {selectedMapNode.enName && (
                    <span className="text-[9px] font-mono text-dali-text-secondary font-normal truncate max-w-[90px]">
                      ({selectedMapNode.enName})
                    </span>
                  )}
                </h4>
                
                <div className="flex items-center gap-0.5 mt-0.5 text-orange-400">
                  <Star className="w-2.5 h-2.5 fill-orange-400" />
                  <Star className="w-2.5 h-2.5 fill-orange-400" />
                  <Star className="w-2.5 h-2.5 fill-orange-400" />
                  <Star className="w-2.5 h-2.5 fill-orange-400" />
                  <span className="text-[9px] text-dali-text-secondary font-mono ml-1">4.8/5</span>
                </div>
                
                <p className="text-[9px] text-dali-text-secondary leading-normal mt-1 line-clamp-2">
                  {selectedMapNode.desc}
                </p>
              </div>

              <div className="flex gap-2 border-t border-black/5 pt-2 shrink-0">
                {selectedMapNode.id <= 8 ? (
                  <button 
                    onClick={() => handleNodeClick(selectedMapNode)}
                    className="flex-1 py-1.5 bg-[#b98a4d] text-white text-[9px] font-bold rounded hover:bg-[#916834] transition-colors cursor-pointer"
                  >
                    查看详情
                  </button>
                ) : (
                  <span className="flex-1 text-[8.5px] text-dali-text-muted flex items-center pl-1 font-sans italic">
                    📍 大理特选{selectedMapNode.type}
                  </span>
                )}
                
                {/* Navigation activator */}
                {selectedMapNode.id !== 1 && (
                  <button 
                    onClick={() => {
                      setNavActiveSpotId(selectedMapNode.id);
                      alert(`已开启导航路线！起点: 南城门，终点: ${selectedMapNode.name}。查看左侧导航指引面板。`);
                    }}
                    className="flex-1 py-1.5 bg-black/5 text-dali-text-secondary hover:text-dali-text-main text-[9px] font-bold rounded flex items-center justify-center gap-1 hover:bg-black/10 transition-colors cursor-pointer"
                  >
                    <Navigation className="w-2.5 h-2.5 text-dali-blue" /> 开始导航
                  </button>
                )}
              </div>

            </div>
          )}
        </div>

        {/* 4. Zoom & Pan Floating Controls overlay (right side) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
          <div className="w-9 h-9 rounded-full bg-white/95 border border-border-dali shadow flex items-center justify-center">
            <Compass className="w-4 h-4 text-red-500 animate-pulse" />
          </div>

          <div className="flex flex-col rounded-xl border border-black/5 bg-white/95 shadow-lg overflow-hidden">
            <button 
              onClick={() => handleZoom('in')}
              className="w-8 h-8 flex items-center justify-center border-b border-black/5 hover:bg-black/5 transition-colors cursor-pointer"
              title="放大地图"
            >
              <ZoomIn className="w-4 h-4 text-dali-text-secondary" />
            </button>
            <button 
              onClick={() => handleZoom('out')}
              className="w-8 h-8 flex items-center justify-center border-b border-black/5 hover:bg-black/5 transition-colors cursor-pointer"
              title="缩小地图"
            >
              <ZoomOut className="w-4 h-4 text-dali-text-secondary" />
            </button>
            <button 
              onClick={handleReset}
              className="w-8 h-8 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
              title="重置视角与导航"
            >
              <RefreshCw className="w-3.5 h-3.5 text-dali-text-secondary" />
            </button>
          </div>
        </div>

      </div>

      {/* 5. Left Floating Search Control Box */}
      <div className="absolute top-4 left-4 w-72 bg-white/95 rounded-xl border border-black/5 shadow-xl p-3 flex flex-col gap-3 z-30 select-none">
        
        {/* Map Search input */}
        <div className="relative shrink-0">
          <input
            type="text"
            value={mapQuery}
            onChange={e => setMapQuery(e.target.value)}
            placeholder="搜索古城景点、美食、客栈..."
            className="w-full pl-3 pr-3 py-1.5 bg-white border border-border-dali rounded-lg text-[11px] text-dali-text-main placeholder-dali-text-muted focus:outline-none focus:border-[#b98a4d] transition-all"
          />
        </div>

        {/* Grid Filters */}
        <div className="grid grid-cols-3 gap-1.5 shrink-0">
          {mapFilters.map(f => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setSelectedMapNode(null); }}
              className={`py-1 rounded text-[9px] font-semibold border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-white border-border-dali text-dali-text-secondary hover:border-[#b98a4d]/40'
              }`}
            >
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Sidebar Content: Navigation Steps OR Lists */}
        <div className="flex-1 overflow-y-auto max-h-[190px] pr-0.5 text-left">
          {navActiveSpotId && navDirections[navActiveSpotId] ? (
            /* Navigation Steps UI */
            <div className="flex flex-col gap-2 bg-blue-50/50 p-2.5 rounded-lg border border-dali-blue/10 animate-fade-in">
              <span className="text-[9px] text-dali-blue font-extrabold flex justify-between items-center mb-1">
                <span>🛣️ 导航指引 (起点: 南城门)</span>
                <button 
                  onClick={() => setNavActiveSpotId(null)}
                  className="text-red-500 hover:underline text-[8px] cursor-pointer"
                >
                  退出导航
                </button>
              </span>
              <div className="flex flex-col gap-2 text-[9px] text-dali-text-secondary pl-3 border-l border-dali-blue/30">
                {navDirections[navActiveSpotId].map((step, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[16px] top-0.5 w-1.5 h-1.5 rounded-full bg-dali-blue" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Default lists: 附近必看 & 附近必吃 */
            <div className="flex flex-col gap-3 animate-fade-in">
              {/* Sights lists */}
              <div>
                <span className="text-[9px] text-dali-text-secondary font-bold block mb-1 text-left">附近必看景区:</span>
                <div className="flex flex-col gap-1 text-left text-[9px]">
                  <span 
                    onClick={() => handleNodeClick(daliData.sights[7])}
                    className="py-1 px-1.5 bg-black/5 rounded font-medium text-dali-text-main flex justify-between items-center cursor-pointer hover:bg-black/10"
                  >
                    <span>崇圣寺三塔 Three Pagodas</span>
                    <span className="text-dali-text-muted">450m</span>
                  </span>
                  <span 
                    onClick={() => handleNodeClick(daliData.sights[0])}
                    className="py-1 px-1.5 bg-black/5 rounded font-medium text-dali-text-main flex justify-between items-center cursor-pointer hover:bg-black/10"
                  >
                    <span>南城门古迹 Ancient Gate</span>
                    <span className="text-dali-text-muted">0m</span>
                  </span>
                </div>
              </div>

              {/* Food lists */}
              <div>
                <span className="text-[9px] text-dali-text-secondary font-bold block mb-1 text-left">附近经典美食:</span>
                <div className="flex flex-col gap-1 text-left text-[9px]">
                  <span 
                    onClick={() => handleNodeClick(foodItems[0])}
                    className="py-1 px-1.5 bg-black/5 rounded font-medium text-dali-text-main flex justify-between items-center cursor-pointer hover:bg-black/10"
                  >
                    <span>白族八大碗 (大理老味道)</span>
                    <span className="text-[#b98a4d] font-bold">★ 4.8</span>
                  </span>
                  <span 
                    onClick={() => handleNodeClick(foodItems[1])}
                    className="py-1 px-1.5 bg-black/5 rounded font-medium text-dali-text-main flex justify-between items-center cursor-pointer hover:bg-black/10"
                  >
                    <span>烤乳扇、烧饵块 (特色小吃)</span>
                    <span className="text-[#b98a4d] font-bold">★ 4.7</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
