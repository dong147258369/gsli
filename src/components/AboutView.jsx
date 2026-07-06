import React, { useState } from 'react';
import { Compass, Landmark, Heart, Clock, Award, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export default function AboutView() {
  const [activeTimeline, setActiveTimeline] = useState(2); // default to Ming Dynasty
  const [hoveredCard, setHoveredCard] = useState(null);

  const timelineData = [
    {
      year: '公元738年',
      title: '南诏建都',
      desc: '皮罗阁在唐朝支持下合六诏为一，建立南诏国，并在苍山洱海之间修建太和城，开启了大理作为区域政治与文化中心的历史大幕。',
      detail: '大理地区由此进入地方政权大一统时期，与唐朝在军事、文化上均有深度交流。'
    },
    {
      year: '公元937年',
      title: '大理立国',
      desc: '段思平联合滇东三十七部，推翻大义宁国，建立大理国。崇尚佛教，被誉为“妙香佛国”，三塔也是在此期间鼎立形成。',
      detail: '大理国时期佛教大兴，留下了大量的造像、经典和壁画，造就了独特的多元宗教融合美学。'
    },
    {
      year: '公元1382年',
      title: '明筑城垣',
      desc: '明朝将领沐英主持修建大理卫城（即今天的大理古城墙结构），呈方圆十二里，设东西南北四门，确立了今日九街十八巷的棋盘格局。',
      detail: '我们今天看到的复兴路、南城门等主要遗存，均是在明代修建的基础上不断修复更新而成的。'
    },
    {
      year: '1982年至今',
      title: '历史名城',
      desc: '大理被评为中国第一批“国家历史文化名城”，正式开启了科学规划、古城风貌保护以及文化传承活化的新纪元。',
      detail: '从简单的实地游览升级到数字文旅体验，传统文化与现代科技在此交融。'
    }
  ];

  const sensoryCards = [
    {
      id: 'wind',
      title: '下关风',
      poem: '风拂苍山雪漫漫',
      subtitle: 'Xiaguan Wind',
      desc: '下关因地势特殊，风速较大。大理的风不仅能吹散浮云，更吹出了古城慢游的心境与风力发电的低碳之美。',
      bgGradient: 'from-teal-600/20 to-cyan-900/40',
      symbol: '💨'
    },
    {
      id: 'flower',
      title: '上关花',
      poem: '花开十里溢古香',
      subtitle: 'Shangguan Flower',
      desc: '上关花以奇花异木闻名。古城处处“家家流水，户户养花”，花卉扎染与金花传统服饰，将自然之美染入生活。',
      bgGradient: 'from-pink-600/20 to-rose-900/40',
      symbol: '🌸'
    },
    {
      id: 'snow',
      title: '苍山雪',
      poem: '雪照峰峦银铠亮',
      subtitle: 'Cangshan Snow',
      desc: '苍山十九峰连绵起伏，山顶白雪终年不化。雪水流经三条井，穿过古城千家万户，滋养出独特的白族水街美学。',
      bgGradient: 'from-blue-600/20 to-slate-900/40',
      symbol: '❄️'
    },
    {
      id: 'moon',
      title: '洱海月',
      poem: '月落波光照影长',
      subtitle: 'Erhai Moon',
      desc: '洱海静谧如镜，月圆之夜明月映照于碧波之中。在生态廊道骑行，静看海上生明月，是体验大理浪漫与诗意的极佳方式。',
      bgGradient: 'from-indigo-600/20 to-blue-950/40',
      symbol: '🌙'
    }
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-white/30 flex flex-col gap-6 text-left pointer-events-auto animate-fade-in-up">
      
      {/* 1. Header Title */}
      <div className="flex justify-between items-center select-none shrink-0">
        <div>
          <h2 className="text-base font-extrabold text-dali-text-main flex items-center gap-1.5 dali-title-serif">
            关于大理古城 <span className="text-[10px] text-dali-text-secondary font-normal font-sans">一水绕苍山，苍山抱古城</span>
          </h2>
        </div>
      </div>

      {/* 2. Core Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/80 border border-border-dali rounded-xl p-4 flex items-center gap-3 shadow-sm hover:border-[#b98a4d]/25 transition-all">
          <div className="w-10 h-10 rounded-full bg-dali-blue/10 flex items-center justify-center text-dali-blue shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-dali-text-main">风花雪月</h4>
            <p className="text-[10px] text-dali-text-secondary mt-0.5">下关风、上关花、苍山雪、洱海月</p>
          </div>
        </div>

        <div className="bg-white/80 border border-border-dali rounded-xl p-4 flex items-center gap-3 shadow-sm hover:border-[#b98a4d]/25 transition-all">
          <div className="w-10 h-10 rounded-full bg-[#b98a4d]/10 flex items-center justify-center text-[#b98a4d] shrink-0">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-dali-text-main">千年都城</h4>
            <p className="text-[10px] text-dali-text-secondary mt-0.5">曾是南诏国、大理国之都城遗存</p>
          </div>
        </div>

        <div className="bg-white/80 border border-border-dali rounded-xl p-4 flex items-center gap-3 shadow-sm hover:border-[#b98a4d]/25 transition-all">
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-dali-text-main">白族非遗</h4>
            <p className="text-[10px] text-dali-text-secondary mt-0.5">扎染、三道茶、木雕，人文荟萃</p>
          </div>
        </div>
      </div>

      {/* 3. Interactive History Timeline */}
      <div className="bg-white/90 border border-border-dali rounded-2xl p-5 shadow-sm">
        <h3 className="text-xs font-bold text-dali-text-main flex items-center gap-1.5 mb-4 select-none uppercase">
          <Clock className="w-3.5 h-3.5 text-[#b98a4d]" /> 古城历史变迁卷轴
        </h3>

        {/* Timeline dots line */}
        <div className="relative flex justify-between items-center px-6 py-4 mb-3">
          <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-black/5 -translate-y-1/2 z-0">
            <div 
              className="h-full bg-[#b98a4d] transition-all duration-500" 
              style={{ width: `${(activeTimeline / (timelineData.length - 1)) * 100}%` }}
            />
          </div>

          {timelineData.map((node, index) => {
            const isActive = activeTimeline === index;
            return (
              <button
                key={index}
                onClick={() => setActiveTimeline(index)}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[10px] z-10 transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#b98a4d] text-white ring-4 ring-[#b98a4d]/20 scale-110 shadow' 
                    : 'bg-white border border-border-dali text-dali-text-secondary hover:border-[#b98a4d]'
                }`}
              >
                {node.year.replace('公元', '')}
              </button>
            );
          })}
        </div>

        {/* Timeline detailed card */}
        <div className="bg-black/5 p-4 rounded-xl text-left border border-black/5 animate-fade-in">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-dali-text-main flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#b98a4d]" /> 
              {timelineData[activeTimeline].year} · {timelineData[activeTimeline].title}
            </h4>
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-800 text-[8px] font-bold rounded">
              大理纪实
            </span>
          </div>
          <p className="text-[10px] text-dali-text-secondary leading-relaxed mt-2">
            {timelineData[activeTimeline].desc}
          </p>
          <div className="mt-2 text-[9px] text-dali-text-muted leading-relaxed pl-3.5 border-l-2 border-[#b98a4d]/40 italic">
            深度底蕴: {timelineData[activeTimeline].detail}
          </div>
        </div>
      </div>

      {/* 4. 风花雪月 Sensory Cards Grid */}
      <div>
        <h3 className="text-xs font-bold text-dali-text-main flex items-center gap-1.5 mb-4 select-none uppercase">
          <BookOpen className="w-3.5 h-3.5 text-dali-blue" /> 大理意境 · 风花雪月感知录
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {sensoryCards.map(card => {
            const isHovered = hoveredCard === card.id;
            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`bg-white/90 border border-border-dali rounded-2xl p-4 flex flex-col gap-2 cursor-pointer transition-all duration-300 relative overflow-hidden select-none hover:shadow-md ${
                  isHovered ? 'border-[#b98a4d]/40 -translate-y-1' : ''
                }`}
              >
                {/* Glow backdrop on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : ''
                }`} />

                <div className="z-10 flex justify-between items-center">
                  <span className="text-lg">{card.symbol}</span>
                  <span className="text-[9px] font-bold text-[#b98a4d] border border-[#b98a4d]/20 px-1.5 py-0.5 rounded-full bg-white/80">
                    {card.title}
                  </span>
                </div>

                <div className="z-10 mt-2">
                  <h4 className="text-xs font-extrabold text-dali-text-main">{card.title}</h4>
                  <p className="text-[8px] text-dali-text-muted font-mono">{card.subtitle}</p>
                </div>

                <div className="z-10 mt-1 border-t border-black/5 pt-2">
                  <p className="text-[8px] text-dali-gold font-bold italic">“ {card.poem} ”</p>
                  <p className="text-[9.5px] text-dali-text-secondary leading-normal mt-1.5 line-clamp-3">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
