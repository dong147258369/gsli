import React from 'react';
import { Compass } from 'lucide-react';

export default function Navbar({ currentTab, onNavigate }) {
  const navItems = [
    { label: '首页', key: '首页' },
    { label: '景点', key: '景点' },
    { label: '文化', key: '文化' },
    { label: '互动', key: '互动' },
    { label: '地图', key: '地图' },
    { label: '游记', key: '游记' },
    { label: '关于', key: '关于' }
  ];

  return (
    <nav className="h-16 px-6 bg-white/95 border-b border-border-dali flex items-center justify-between shrink-0 select-none pointer-events-auto z-40">
      
      {/* Left logo section */}
      <div className="flex items-center gap-2 cursor-pointer w-40" onClick={() => onNavigate('首页')}>
        <div className="w-8 h-8 rounded-full bg-[#1da59a]/15 flex items-center justify-center border border-[#1da59a]/35">
          <Compass className="w-4 h-4 text-[#1da59a]" />
        </div>
        <div>
          <span className="text-sm font-bold tracking-wider text-dali-text-main dali-title-serif block text-left">
            大理古城
          </span>
          <span className="text-[8px] text-dali-text-secondary tracking-widest font-semibold uppercase block -mt-1 font-mono text-left">
            Dali Ancient City
          </span>
        </div>
      </div>

      {/* Middle nav menu */}
      <div className="flex items-center gap-8 text-xs font-semibold">
        {navItems.map(item => {
          const isActive = currentTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`py-2 transition-colors relative cursor-pointer ${
                isActive 
                  ? 'text-[#b98a4d] tab-active-indicator' 
                  : 'text-dali-text-secondary hover:text-[#b98a4d]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right placeholder to keep layout balanced */}
      <div className="w-40" />

    </nav>
  );
}

