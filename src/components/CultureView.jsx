import React, { useState } from 'react';
import { Search, Play, Star, ChevronDown, Award } from 'lucide-react';
import { daliData } from '../data/daliData';
import daliTieDyeing from '../assets/dali_tie_dyeing.png';
import daliThreeTea from '../assets/dali_three_tea.png';
import daliBlackPottery from '../assets/dali_black_pottery.png';
import daliFolkDance from '../assets/dali_folk_dance.png';
import daliWoodcarving from '../assets/dali_woodcarving.png';

const cultureImages = {
  1: daliTieDyeing,      // 扎染
  2: daliThreeTea,       // 三道茶
  3: daliBlackPottery,   // 黑陶
  4: daliFolkDance,      // 歌舞
  5: daliWoodcarving     // 木雕
};

export default function CultureView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [activeRegion, setActiveRegion] = useState('All');

  // Interactive Game States
  const [activeGame, setActiveGame] = useState(null); // null, 'tiedye', 'tea'
  
  // Tie Dye Game States
  const [dyeFold, setDyeFold] = useState('spiral');
  const [dyeKnots, setDyeKnots] = useState(5);
  const [dyeProgress, setDyeProgress] = useState(0);
  const [dyeing, setDyeing] = useState(false);
  const [dyeStep, setDyeStep] = useState(0); // 0: fold, 1: tie, 2: dye, 3: reveal
  
  // Three-course Tea States
  const [teaStep, setTeaStep] = useState(0); // 0: Bitter, 1: Sweet, 2: Aftertaste, 3: Finish
  const [teaBrews, setTeaBrews] = useState({
    bitter: false,
    sweet: false,
    aftertaste: false
  });
  const [potRoastProgress, setPotRoastProgress] = useState(0);
  const [roasting, setRoasting] = useState(false);
  const [addedIngredients, setAddedIngredients] = useState([]);

  const types = ['All', '非遗', '传统', '手工艺', '国家级', '省级'];

  const filteredCultures = daliData.cultures.filter(cul => {
    const matchesSearch = cul.name.includes(searchQuery) || cul.enName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === 'All' || cul.type === activeType || cul.level === activeType;
    return matchesSearch && matchesType;
  });

  const popularRecs = daliData.cultures.slice(0, 4);

  // Simulation handlers
  const startDyeing = () => {
    setDyeing(true);
    setDyeProgress(0);
    const interval = setInterval(() => {
      setDyeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDyeing(false);
          setDyeStep(3);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  const handleRoasting = () => {
    setRoasting(true);
    setPotRoastProgress(0);
    const timer = setInterval(() => {
      setPotRoastProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setRoasting(false);
          setTeaBrews(prevBrews => ({ ...prevBrews, bitter: true }));
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  const handleAddIngredient = (ing) => {
    if (addedIngredients.includes(ing)) return;
    const newList = [...addedIngredients, ing];
    setAddedIngredients(newList);

    if (teaStep === 1 && ['核桃仁', '红糖', '芝麻'].every(x => newList.includes(x))) {
      setTeaBrews(prev => ({ ...prev, sweet: true }));
    }
    if (teaStep === 2 && ['蜂蜜', '花椒', '桂皮'].every(x => newList.includes(x))) {
      setTeaBrews(prev => ({ ...prev, aftertaste: true }));
    }
  };

  return (
    <div className="flex-1 h-full flex overflow-hidden animate-fade-in-up pointer-events-auto">
      
      {/* 1. Left Sidebar inside Culture Panel */}
      <div className="w-60 border-r border-border-dali bg-white/60 p-4 flex flex-col gap-4 overflow-y-auto shrink-0 select-none">
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-dali-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="搜索..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-border-dali rounded-lg text-xs focus:outline-none focus:border-[#b98a4d]"
          />
        </div>

        {/* Culture Type Filters */}
        <div>
          <span className="text-[10px] text-dali-text-secondary font-bold block mb-2">按文化类型:</span>
          <div className="flex flex-wrap gap-1.5">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-2.5 py-1 rounded text-[10px] font-semibold border transition-all cursor-pointer ${
                  activeType === t
                    ? 'bg-[#b98a4d] border-[#b98a4d] text-white'
                    : 'bg-white border-border-dali text-dali-text-secondary hover:border-[#b98a4d]/40'
                }`}
              >
                {t === 'All' ? '全部' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Region Filter */}
        <div>
          <span className="text-[10px] text-dali-text-secondary font-bold block mb-1.5">按区域:</span>
          <select
            value={activeRegion}
            onChange={e => setActiveRegion(e.target.value)}
            className="w-full bg-white border border-border-dali rounded p-1.5 text-[10px] text-dali-text-secondary focus:outline-none focus:border-[#b98a4d]"
          >
            <option value="All">全部区域</option>
            <option value="古城">古城内</option>
            <option value="周边村落">周边村落 (如周城村)</option>
          </select>
        </div>

        {/* Interactive Workshop Quicklinks */}
        <div className="border-t border-black/5 pt-3">
          <span className="text-[10px] text-dali-text-secondary font-bold block mb-2">非遗手作体验营:</span>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => { setActiveGame('tiedye'); setDyeStep(0); setDyeProgress(0); }}
              className="py-1.5 w-full bg-blue-600/10 hover:bg-blue-600/15 text-blue-800 text-[10.5px] font-bold rounded-lg border border-blue-600/20 text-center transition-colors cursor-pointer select-none"
            >
              🎨 白族扎染坊体验
            </button>
            <button 
              onClick={() => { setActiveGame('tea'); setTeaStep(0); setAddedIngredients([]); }}
              className="py-1.5 w-full bg-amber-600/10 hover:bg-amber-600/15 text-amber-800 text-[10.5px] font-bold rounded-lg border border-amber-600/20 text-center transition-colors cursor-pointer select-none"
            >
              🍵 白族三道茶冲沏
            </button>
          </div>
        </div>

      </div>

      {/* 2. Right Content Area: culture grids */}
      <div className="flex-1 flex flex-col p-5 overflow-y-auto bg-white/20 relative">
        
        {/* Title Header */}
        <div className="flex justify-between items-center mb-5 select-none shrink-0">
          <div>
            <h2 className="text-base font-extrabold text-dali-text-main flex items-center gap-1.5 dali-title-serif">
              体验大理文化 <span className="text-[10px] text-dali-text-secondary font-normal font-sans">白族传统、非遗体验与多元艺术</span>
            </h2>
          </div>
          <button className="px-2.5 py-1 bg-white border border-border-dali rounded text-[10px] font-bold text-dali-text-secondary flex items-center gap-1 hover:border-[#b98a4d]">
            <span>按热度排序</span> <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Interactive Highlight Promo Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-4 text-white text-left shadow-lg mb-5 flex justify-between items-center relative overflow-hidden shrink-0 select-none">
          <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('${daliTieDyeing}')` }} />
          <div className="z-10 max-w-md">
            <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-[8px] font-bold uppercase tracking-wider">
              非遗互动微课堂
            </span>
            <h3 className="text-sm font-bold mt-1">亲手触碰千年的蓝白浪漫</h3>
            <p className="text-[10px] text-white/80 mt-1 leading-relaxed">
              周城白族扎染技艺是中国国家级非物质文化遗产。我们现已上线数字化手作体验，点击右侧按钮立即在线体验折花、扎线与染色工艺。
            </p>
          </div>
          <button 
            onClick={() => { setActiveGame('tiedye'); setDyeStep(0); setDyeProgress(0); }}
            className="z-10 px-4 py-2 bg-[#b98a4d] hover:bg-[#916834] text-white text-[10.5px] font-bold rounded-lg transition-colors cursor-pointer select-none shadow"
          >
            开启扎染坊
          </button>
        </div>

        {/* Culture Grid */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {filteredCultures.map(cul => (
            <div
              key={cul.id}
              className="bg-white/90 border border-border-dali rounded-xl overflow-hidden hover:border-[#b98a4d]/30 transition-all duration-300 hover:shadow-md flex flex-col"
            >
              {/* Image banner representing Culture Spot */}
              <div className="h-32 bg-gradient-to-br from-indigo-950 to-blue-900 p-3 flex justify-between items-start relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-cover bg-center opacity-70"
                     style={{ backgroundImage: `url('${cultureImages[cul.id] || daliTieDyeing}')` }}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold text-[#dfb257] flex items-center gap-0.5 z-10 select-none">
                  <Star className="w-2.5 h-2.5 fill-[#dfb257] text-[#dfb257]" /> {cul.rating}
                </span>

                <span className="px-1.5 py-0.5 bg-amber-800 text-white rounded text-[8px] font-bold z-10 select-none flex items-center gap-0.5">
                  <Award className="w-2.5 h-2.5" /> {cul.level}
                </span>
              </div>

              {/* Body */}
              <div className="p-3.5 flex flex-col flex-1 gap-2 text-left">
                <div>
                  <h3 className="text-xs font-extrabold text-dali-text-main flex items-center gap-1.5">
                    {cul.name} <span className="text-[10px] text-dali-text-secondary font-normal font-mono">{cul.enName}</span>
                  </h3>
                  <p className="text-[10px] text-dali-text-secondary leading-relaxed mt-1 line-clamp-2">
                    {cul.desc}
                  </p>
                </div>

                <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between">
                  <button 
                    onClick={() => {
                      if (cul.id === 1) { setActiveGame('tiedye'); setDyeStep(0); setDyeProgress(0); }
                      else if (cul.id === 2) { setActiveGame('tea'); setTeaStep(0); setAddedIngredients([]); }
                      else { alert(`“${cul.name}”手作演示即将上线，敬请期待！`); }
                    }}
                    className="text-[10px] font-extrabold text-[#b98a4d] hover:text-[#916834] transition-colors cursor-pointer select-none"
                  >
                    在线手作体验
                  </button>

                  <button 
                    onClick={() => alert(`正在加载“${cul.name}”国家级非遗名录解说录音...`)}
                    className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors cursor-pointer select-none"
                  >
                    <Play className="w-2.5 h-2.5 text-dali-blue fill-dali-blue" />
                  </button>
                </div>
              </div>

            </div>
          ))}
          {filteredCultures.length === 0 && (
            <div className="col-span-2 py-12 text-center text-dali-text-muted text-xs">
              无符合过滤条件的文化项目
            </div>
          )}
        </div>

      </div>

      {/* 3. Tie-dye Game Modal */}
      {activeGame === 'tiedye' && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 pointer-events-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-black/5 w-full max-w-md p-5 flex flex-col gap-4 animate-fade-in-up text-left">
            <div className="flex justify-between items-center border-b border-black/5 pb-2">
              <h3 className="text-sm font-bold text-dali-text-main flex items-center gap-1">
                🎨 白族非遗扎染工坊
              </h3>
              <button 
                onClick={() => setActiveGame(null)} 
                className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Step indicators */}
            <div className="grid grid-cols-4 gap-1 text-[8.5px] font-bold text-center select-none text-dali-text-muted">
              <span className={`pb-1 border-b-2 ${dyeStep >= 0 ? 'border-blue-600 text-blue-700' : 'border-transparent'}`}>1. 折花</span>
              <span className={`pb-1 border-b-2 ${dyeStep >= 1 ? 'border-blue-600 text-blue-700' : 'border-transparent'}`}>2. 捆扎</span>
              <span className={`pb-1 border-b-2 ${dyeStep >= 2 ? 'border-blue-600 text-blue-700' : 'border-transparent'}`}>3. 浸染</span>
              <span className={`pb-1 border-b-2 ${dyeStep >= 3 ? 'border-blue-600 text-blue-700' : 'border-transparent'}`}>4. 揭晓</span>
            </div>

            {/* Game Screen Content */}
            {dyeStep === 0 && (
              <div className="flex flex-col gap-3 animate-fade-in">
                <span className="text-[10px] text-dali-text-secondary leading-relaxed">
                  第一步：选择您的布料折叠样式。不同的折法将决定成品染布图案的骨架与几何对称走向。
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'spiral', label: '螺旋折', icon: '🌀' },
                    { id: 'symmetrical', label: '辐射折', icon: '❄️' },
                    { id: 'random', label: '云纹折', icon: '☁️' }
                  ].map(x => (
                    <button
                      key={x.id}
                      onClick={() => setDyeFold(x.id)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        dyeFold === x.id 
                          ? 'border-blue-600 bg-blue-50 text-blue-900 scale-105 shadow-sm' 
                          : 'border-border-dali bg-white text-dali-text-secondary hover:border-blue-300'
                      }`}
                    >
                      <span className="text-xl">{x.icon}</span>
                      <span className="text-[9px] font-bold">{x.label}</span>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setDyeStep(1)}
                  className="mt-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center"
                >
                  下一步：捆绑缝扎
                </button>
              </div>
            )}

            {dyeStep === 1 && (
              <div className="flex flex-col gap-3 animate-fade-in">
                <span className="text-[10px] text-dali-text-secondary leading-relaxed">
                  第二步：确定捆扎线绳结数。白族染匠通过用线绳结扎、缝缀织物，结扎处因无法进色，从而形成白色的花纹。
                </span>
                <div className="flex flex-col gap-2">
                  <span className="text-[9.5px] text-dali-text-secondary flex justify-between font-bold">
                    <span>绳结数量:</span> <span>{dyeKnots} 节</span>
                  </span>
                  <input 
                    type="range" 
                    min="3" 
                    max="10" 
                    value={dyeKnots}
                    onChange={(e) => setDyeKnots(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[8px] text-dali-text-muted font-bold px-1 select-none">
                    <span>简单 (3结)</span>
                    <span>中等 (6结)</span>
                    <span>繁复 (10结)</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => setDyeStep(0)}
                    className="flex-1 py-1.5 bg-gray-200 hover:bg-gray-300 text-dali-text-secondary text-[10px] font-bold rounded-lg cursor-pointer"
                  >
                    上一步
                  </button>
                  <button 
                    onClick={() => setDyeStep(2)}
                    className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg cursor-pointer"
                  >
                    开始浸染
                  </button>
                </div>
              </div>
            )}

            {dyeStep === 2 && (
              <div className="flex flex-col gap-3 items-center animate-fade-in text-center">
                <span className="text-[10px] text-dali-text-secondary leading-relaxed">
                  第三步：将包好的织物浸入纯植物蓝草（板蓝根）发酵的染池中。浸染次数与时间越长，蓝色泽越纯厚浓郁。
                </span>
                
                {/* Indigo dye vat simulation graphic */}
                <div className="w-32 h-20 rounded-b-3xl border-2 border-slate-600 relative overflow-hidden bg-gradient-to-b from-[#1a365d] to-[#1e3a8a] flex items-center justify-center shadow-inner">
                  {/* Floating fabric bubbles */}
                  <div className={`w-16 h-10 bg-amber-100 rounded-lg tied-fabric border border-dashed border-amber-900/30 ${
                    dyeing ? 'animate-bounce' : ''
                  }`} />
                  
                  {/* Wave liquid overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-blue-900/60 mix-blend-color-burn" />
                </div>

                {dyeing ? (
                  <div className="w-full">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden relative">
                      <div className="absolute left-0 top-0 h-full bg-blue-600" style={{ width: `${dyeProgress}%` }} />
                    </div>
                    <span className="text-[9px] text-blue-600 font-bold block mt-1">发酵浸染中: {dyeProgress}%</span>
                  </div>
                ) : (
                  <button 
                    onClick={startDyeing}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10.5px] font-bold rounded-lg shadow cursor-pointer"
                  >
                    浸染布料 (点击)
                  </button>
                )}

                <button 
                  onClick={() => setDyeStep(1)} 
                  disabled={dyeing}
                  className="text-[9px] text-dali-text-secondary hover:underline cursor-pointer disabled:opacity-50"
                >
                  返回捆扎修改
                </button>
              </div>
            )}

            {dyeStep === 3 && (
              <div className="flex flex-col gap-3 text-center items-center animate-fade-in">
                <span className="text-[10px] text-dali-text-secondary leading-relaxed">
                  🎉 浸染完成！解开线绳并晾干织物，您专属的蓝白花纹呈现如下：
                </span>

                {/* Procedural SVG tie-dye result pattern */}
                <div className="p-3 bg-[#edf2f7] rounded-2xl shadow-sm">
                  {dyeFold === 'spiral' && (
                    <svg viewBox="0 0 100 100" className="w-40 h-40 bg-white border border-[#b98a4d]/20 rounded-xl mx-auto shadow-inner">
                      <path d="M 50,50 A 10,10 0 0,1 60,50 A 20,20 0 0,1 40,50 A 30,30 0 0,1 70,50 A 40,40 0 0,1 30,50" fill="none" stroke="#1c3d70" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
                      <path d="M 50,50 A 15,15 0 0,0 65,50 A 25,25 0 0,0 35,50 A 35,35 0 0,0 75,50" fill="none" stroke="#1c3d70" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  )}

                  {dyeFold === 'symmetrical' && (
                    <svg viewBox="0 0 100 100" className="w-40 h-40 bg-white border border-[#b98a4d]/20 rounded-xl mx-auto shadow-inner">
                      <g transform="translate(50,50)" stroke="#1c3d70" fill="none" strokeWidth="3">
                        {Array.from({length: 8}).map((_, i) => (
                          <g key={i} transform={`rotate(${i * 45})`}>
                            <path d="M0,0 Q15,-30 0,-45 Q-15,-30 0,0" opacity="0.85" />
                            <circle cx="0" cy="-25" r="4" fill="#1c3d70" />
                          </g>
                        ))}
                      </g>
                    </svg>
                  )}

                  {dyeFold === 'random' && (
                    <svg viewBox="0 0 100 100" className="w-40 h-40 bg-white border border-[#b98a4d]/20 rounded-xl mx-auto shadow-inner">
                      <circle cx="35" cy="40" r="18" fill="#1c3d70" opacity="0.75" />
                      <circle cx="65" cy="55" r="22" fill="#1c3d70" opacity="0.8" />
                      <circle cx="50" cy="30" r="14" fill="#1c3d70" opacity="0.6" />
                      <path d="M25,65 Q40,55 55,75 T80,60" stroke="#1c3d70" strokeWidth="8" fill="none" opacity="0.7" />
                    </svg>
                  )}
                </div>

                <div className="text-[9px] text-[#b98a4d] font-bold bg-[#b98a4d]/5 px-3 py-1 rounded-lg border border-[#b98a4d]/10 text-left w-full leading-relaxed">
                  ℹ️ **工艺解析**: 您采用了 **{dyeFold === 'spiral' ? '螺旋折' : dyeFold === 'symmetrical' ? '辐射折' : '云纹折'}** 和 **{dyeKnots} 节绑扎**，晕染出了蓝草纯天然的层次之美。手工浸染会根据结扎紧密程度形成自然水滴晕纹，这就是非遗的独特之处。
                </div>

                <button 
                  onClick={() => setActiveGame(null)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg cursor-pointer"
                >
                  收集染布并完成手作
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 4. Three-course Tea Game Modal */}
      {activeGame === 'tea' && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 pointer-events-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-black/5 w-full max-w-md p-5 flex flex-col gap-4 animate-fade-in-up text-left">
            <div className="flex justify-between items-center border-b border-black/5 pb-2">
              <h3 className="text-sm font-bold text-dali-text-main flex items-center gap-1">
                🍵 白族三道茶冲沏仪式
              </h3>
              <button 
                onClick={() => setActiveGame(null)} 
                className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Custom course description panel */}
            <div className="grid grid-cols-3 gap-1 text-[8.5px] font-bold text-center select-none text-dali-text-muted mb-2">
              <span className={`pb-1 border-b-2 ${teaStep === 0 ? 'border-amber-600 text-amber-800' : 'border-transparent'}`}>第一道：苦茶</span>
              <span className={`pb-1 border-b-2 ${teaStep === 1 ? 'border-amber-600 text-amber-800' : 'border-transparent'}`}>第二道：甜茶</span>
              <span className={`pb-1 border-b-2 ${teaStep === 2 ? 'border-amber-600 text-amber-800' : 'border-transparent'}`}>第三道：回味茶</span>
            </div>

            {teaStep === 0 && (
              <div className="flex flex-col gap-3 animate-fade-in">
                <span className="text-[10px] text-dali-text-secondary leading-relaxed">
                  **第一道：苦茶 (百折不挠)**。白族染匠或主人将感通茶放入小砂罐内在文火上烘烤。茶叶受热发出“啪啪”爆响，茶香扑鼻，色黄微焦，冲入滚水时茶香袅袅。
                </span>
                
                {/* Clay pot graphic */}
                <div className="w-24 h-24 bg-gradient-to-b from-stone-600 to-stone-800 rounded-full border border-stone-900/50 shadow mx-auto flex flex-col items-center justify-center relative">
                  {roasting && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xs font-bold text-yellow-500 animate-pulse">
                      罐烤中...
                    </div>
                  )}
                  {teaBrews.bitter ? (
                    <span className="text-xl">🍵 苦茶已成</span>
                  ) : (
                    <span className="text-3xl">🏺</span>
                  )}
                </div>

                {roasting ? (
                  <div className="w-full">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden relative">
                      <div className="absolute left-0 top-0 h-full bg-amber-600" style={{ width: `${potRoastProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handleRoasting}
                    className="w-full py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-[10px] font-bold rounded-lg cursor-pointer"
                  >
                    {teaBrews.bitter ? '重新烘烤茶叶' : '点击文火烘烤茶叶 (砂罐)'}
                  </button>
                )}

                {teaBrews.bitter && (
                  <button 
                    onClick={() => { setTeaStep(1); setAddedIngredients([]); }}
                    className="py-1.5 bg-[#b98a4d] hover:bg-[#916834] text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center"
                  >
                    进行第二道：甜茶
                  </button>
                )}
              </div>
            )}

            {teaStep === 1 && (
              <div className="flex flex-col gap-3 animate-fade-in">
                <span className="text-[10px] text-dali-text-secondary leading-relaxed">
                  **第二道：甜茶 (否极泰来)**。冲入茶汤后加入大理特产核桃仁、红糖及烤芝麻。此茶甘甜可口，寓意人生历经清苦终能换来甘甜与丰收。
                </span>

                <div className="flex gap-2 justify-center">
                  {[
                    { name: '核桃仁', symbol: '🌰' },
                    { name: '红糖', symbol: '🍬' },
                    { name: '芝麻', symbol: '🌾' }
                  ].map(x => (
                    <button
                      key={x.name}
                      onClick={() => handleAddIngredient(x.name)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        addedIngredients.includes(x.name)
                          ? 'border-amber-600 bg-amber-50 text-amber-900 scale-105 shadow-sm'
                          : 'border-border-dali bg-white text-dali-text-secondary hover:border-amber-300'
                      }`}
                    >
                      <span className="text-lg">{x.symbol}</span>
                      <span className="text-[9px] font-bold">{x.name}</span>
                    </button>
                  ))}
                </div>

                <div className="text-[9px] text-dali-text-muted mt-1 select-none">
                  添加配料进度: {addedIngredients.length} / 3
                </div>

                {teaBrews.sweet && (
                  <button 
                    onClick={() => { setTeaStep(2); setAddedIngredients([]); }}
                    className="py-1.5 bg-[#b98a4d] hover:bg-[#916834] text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center"
                  >
                    进行第三道：回味茶
                  </button>
                )}
              </div>
            )}

            {teaStep === 2 && (
              <div className="flex flex-col gap-3 animate-fade-in">
                <span className="text-[10px] text-dali-text-secondary leading-relaxed">
                  **第三道：回味茶 (思远深省)**。加入蜂蜜、少许花椒和桂皮。此茶酸、甜、苦、辣、麻俱全，“一苦、二甜、三回味”，寓意对人生的感悟与咀嚼。
                </span>

                <div className="flex gap-2 justify-center">
                  {[
                    { name: '蜂蜜', symbol: '🍯' },
                    { name: '花椒', symbol: '🌶️' },
                    { name: '桂皮', symbol: '🍂' }
                  ].map(x => (
                    <button
                      key={x.name}
                      onClick={() => handleAddIngredient(x.name)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        addedIngredients.includes(x.name)
                          ? 'border-amber-600 bg-amber-50 text-amber-900 scale-105 shadow-sm'
                          : 'border-border-dali bg-white text-dali-text-secondary hover:border-amber-300'
                      }`}
                    >
                      <span className="text-lg">{x.symbol}</span>
                      <span className="text-[9px] font-bold">{x.name}</span>
                    </button>
                  ))}
                </div>

                <div className="text-[9px] text-dali-text-muted mt-1 select-none">
                  添加配料进度: {addedIngredients.length} / 3
                </div>

                {teaBrews.aftertaste && (
                  <button 
                    onClick={() => setTeaStep(3)}
                    className="py-1.5 bg-[#b98a4d] hover:bg-[#916834] text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center"
                  >
                    完成三道茶仪式
                  </button>
                )}
              </div>
            )}

            {teaStep === 3 && (
              <div className="flex flex-col gap-3 text-center items-center animate-fade-in">
                <span className="text-[10px] text-dali-text-secondary leading-relaxed">
                  🎉 恭喜！您已顺利模拟冲沏了大理白族传统的“三道茶”。
                </span>

                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-3xl mb-2 animate-bounce border border-amber-500/20">
                  🍵
                </div>

                <div className="text-[9px] text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-200/50 text-left w-full leading-relaxed">
                  💡 **三道茶心悟**: 
                  - **一苦**: 苦寒清火，思及奋斗的坚韧。
                  - **二甜**: 融洽香醇，象征努力后的丰裕。
                  - **三回味**: 多味杂陈，让人掩卷思索、回味一生。
                </div>

                <button 
                  onClick={() => setActiveGame(null)}
                  className="w-full py-2 bg-amber-800 hover:bg-amber-950 text-white text-[10px] font-bold rounded-lg cursor-pointer"
                >
                  收集茶礼并结束冲酿
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
