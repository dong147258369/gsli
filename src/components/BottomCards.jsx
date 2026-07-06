import daliSouthGate from '../assets/dali_south_gate.png';
import daliTieDyeing from '../assets/dali_tie_dyeing.png';
import daliErhaiCycling from '../assets/dali_erhai_cycling.png';
import daliThreePagodas from '../assets/dali_three_pagodas.png';

export default function BottomCards({ onNavigate }) {
  const cards = [
    {
      id: 1,
      title: "探索景点",
      sub: "Explore Sights",
      target: "景点",
      bgUrl: daliSouthGate,
      gradient: "from-amber-900 to-yellow-950"
    },
    {
      id: 2,
      title: "文化体验",
      sub: "白族散布染色、市场",
      target: "文化",
      bgUrl: daliTieDyeing,
      gradient: "from-blue-950 to-indigo-950"
    },
    {
      id: 3,
      title: "洱海骑行",
      sub: "Cycling around Erhai",
      target: "互动",
      bgUrl: daliErhaiCycling,
      gradient: "from-teal-950 to-emerald-950"
    },
    {
      id: 4,
      title: "美食探店",
      sub: "三道茶、饵块",
      target: "地图", 
      bgUrl: daliThreePagodas,
      gradient: "from-orange-950 to-stone-900"
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 px-5 py-4 bg-white/30 border-t border-border-dali mt-auto select-none shrink-0 pointer-events-auto">
      {cards.map(card => (
        <div
          key={card.id}
          onClick={() => onNavigate(card.target)}
          className="group relative h-24 rounded-xl overflow-hidden cursor-pointer shadow-sm border border-border-dali transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          {/* Card background image fallback to rich gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}>
            <div 
              className="w-full h-full bg-cover bg-center mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: `url('${card.bgUrl}')` }}
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Text Info */}
          <div className="absolute bottom-3 left-3.5 z-10">
            <h4 className="text-xs md:text-sm font-bold text-white tracking-wide group-hover:text-[#b98a4d] transition-colors">
              {card.title}
            </h4>
            <p className="text-[9px] text-white/70 mt-0.5 tracking-wider truncate max-w-[140px] md:max-w-none">
              {card.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
