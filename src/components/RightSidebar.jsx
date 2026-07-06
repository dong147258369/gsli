import React, { useState } from 'react';
import { Compass, Calendar, MessageSquare, MapPin, Globe, Share2, Facebook, Twitter, Instagram } from 'lucide-react';
import { daliData } from '../data/daliData';
import daliSouthGate from '../assets/dali_south_gate.png';
import daliThreePagodas from '../assets/dali_three_pagodas.png';
import daliCangshanErhai from '../assets/dali_cangshan_erhai.png';
import daliTorchFestival from '../assets/dali_torch_festival.png';

const activityImages = {
  1: daliSouthGate,
  2: daliTorchFestival
};

export default function RightSidebar({ onNavigate, currentTab }) {
  const [lang, setLang] = useState('zh');

  return (
    <aside className="w-80 h-full border-l border-border-dali bg-white/40 backdrop-blur-sm flex flex-col overflow-y-auto p-4 shrink-0 select-none pointer-events-auto">
      
      {/* 1. Featured Spot Card (South Gate Image Visual) */}
      <div className="rounded-xl overflow-hidden shadow-sm border border-border-dali mb-5 relative group cursor-pointer"
           onClick={() => onNavigate('景点')}>
        <div className="h-32 bg-gradient-to-br from-amber-800 to-stone-900 p-3 flex flex-col justify-end relative">
          {/* Simulated image backdrop using a gorgeous photo of South Gate */}
          <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-500"
               style={{ backgroundImage: `url(${daliSouthGate})` }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
          
          <div className="z-10">
            <span className="text-[9px] bg-[#b98a4d] text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">
              DA (South Gate)
            </span>
            <h4 className="text-sm font-bold text-white mt-1">南城门</h4>
          </div>
        </div>
      </div>

      {/* 2. 当前活动 (Current Activities) */}
      <div className="mb-6">
        <h3 className="text-xs font-extrabold text-dali-text-main tracking-wider mb-3 flex items-center gap-1.5 uppercase">
          <Calendar className="w-3.5 h-3.5 text-[#b98a4d]" /> 当前活动
        </h3>
        
        <div className="flex flex-col gap-3">
          {daliData.activities.map(act => (
            <div key={act.id} className="bg-white/80 border border-border-dali rounded-lg p-3 hover:border-[#b98a4d]/40 transition-colors">
              <div className="h-20 rounded bg-gradient-to-br from-indigo-950 to-blue-900 mb-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-45"
                     style={{ backgroundImage: `url(${activityImages[act.id] || daliThreePagodas})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white tracking-wide">
                  Dali Ancient City
                </span>
              </div>
              <h4 className="text-xs font-bold text-dali-text-main leading-tight mb-1">
                {act.title}
              </h4>
              <p className="text-[10px] text-dali-text-secondary leading-normal line-clamp-2">
                {act.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 热门话题 (Hot Topics) */}
      <div className="mb-6">
        <h3 className="text-xs font-extrabold text-dali-text-main tracking-wider mb-3 flex items-center gap-1.5 uppercase">
          <MessageSquare className="w-3.5 h-3.5 text-dali-blue" /> 热门话题
        </h3>
        
        <div className="flex flex-col gap-2">
          {daliData.topics.map(topic => (
            <div key={topic.id} className="flex justify-between items-start text-[11px] border-b border-black/5 pb-2 last:border-b-0 last:pb-0">
              <span className="text-dali-text-main hover:text-[#b98a4d] cursor-pointer font-medium truncate max-w-[180px]">
                # {topic.title}
              </span>
              <span className="text-dali-text-muted text-[10px] font-mono shrink-0">{topic.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Footer Menu Sitemap */}
      <div className="mt-auto border-t border-black/5 pt-4">
        <div className="grid grid-cols-3 gap-y-2 gap-x-4 text-[10px] text-dali-text-secondary mb-4 font-medium">
          <span onClick={() => onNavigate('首页')} className="hover:text-[#b98a4d] cursor-pointer">首页</span>
          <span onClick={() => onNavigate('景点')} className="hover:text-[#b98a4d] cursor-pointer">景点</span>
          <span onClick={() => onNavigate('文化')} className="hover:text-[#b98a4d] cursor-pointer">文化</span>
          <span onClick={() => onNavigate('互动')} className="hover:text-[#b98a4d] cursor-pointer">互动</span>
          <span onClick={() => onNavigate('地图')} className="hover:text-[#b98a4d] cursor-pointer">地图</span>
          <span onClick={() => onNavigate('游记')} className="hover:text-[#b98a4d] cursor-pointer">游记</span>
          <span onClick={() => onNavigate('关于')} className="hover:text-[#b98a4d] cursor-pointer">关于</span>
        </div>

        {/* 5. Languages & Socials & Mini Map */}
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Language Toggle */}
          <button 
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-border-dali rounded text-[10px] font-bold text-dali-text-secondary hover:border-[#b98a4d]"
          >
            <Globe className="w-3 h-3 text-dali-text-secondary" />
            <span>{lang === 'zh' ? '国语 (ZH)' : 'English (EN)'}</span>
          </button>

          {/* Social icons */}
          <div className="flex gap-2">
            <Share2 className="w-3.5 h-3.5 text-dali-text-muted hover:text-[#b98a4d] cursor-pointer" />
            <Facebook className="w-3.5 h-3.5 text-dali-text-muted hover:text-[#b98a4d] cursor-pointer" />
            <Instagram className="w-3.5 h-3.5 text-dali-text-muted hover:text-[#b98a4d] cursor-pointer" />
          </div>
        </div>

        {/* Mini Map Widget */}
        <div className="h-16 rounded-lg border border-border-dali overflow-hidden relative cursor-pointer mb-3"
             onClick={() => onNavigate('地图')}>
          <div className="absolute inset-0 bg-cover bg-center"
               style={{ backgroundImage: `url(${daliCangshanErhai})` }}></div>
          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3" /> 大理古城平面导览
            </span>
          </div>
        </div>

        <p className="text-[9px] text-dali-text-muted text-center tracking-wide font-mono">
          © 2021 Ancient Info Dali Ancient, Inc.
        </p>
      </div>

    </aside>
  );
}
