import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, MessageSquare, Users, Award, Star } from 'lucide-react';
import { daliData } from '../data/daliData';
import daliErhaiCycling from '../assets/dali_erhai_cycling.png';
import daliTieDyeing from '../assets/dali_tie_dyeing.png';
import daliCangshanErhai from '../assets/dali_cangshan_erhai.png';

const postImages = {
  1: daliCangshanErhai,  // 游记
  2: daliTieDyeing,      // 扎染工坊
  3: daliCangshanErhai,  // 讨论最美景点
  4: daliErhaiCycling,   // 骑行伙伴
  5: daliCangshanErhai,  // 摄影大赛
  6: daliCangshanErhai   // 饵块问答
};

export default function InteractView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All');
  
  // Custom Dynamic Post feed state
  const [postsList, setPostsList] = useState(daliData.posts);

  // Post Creator States
  const [showPostModal, setShowPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('游记');
  const [newAuthor, setNewAuthor] = useState('大理旅伴');

  // Itinerary Planner States
  const [plannerDays, setPlannerDays] = useState(2);
  const [plannerPref, setPlannerPref] = useState('All');
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  const types = ['All', '游记', '活动', '讨论', '组队'];

  const filteredPosts = postsList.filter(post => {
    const matchesSearch = post.title.includes(searchQuery) || post.desc.includes(searchQuery);
    const matchesType = activeType === 'All' || post.type === activeType;
    return matchesSearch && matchesType;
  });

  const popularRecs = postsList.slice(0, 4);

  const handleGenerateItinerary = () => {
    const dayPlans = {
      1: [
        { time: '上午', spot: '南城门', activity: '拍摄巍峨古城门，听金庸大理题字历史。' },
        { time: '下午', spot: '五华楼', activity: '登古国宾馆，鸟瞰古城棋盘街道，远眺洱海。' },
        { time: '晚上', spot: '红龙井', activity: '顺着清澈小河漫步，体验热闹的夜间民谣酒馆。' }
      ],
      2: [
        { time: '上午', spot: '洱海生态廊道', activity: '租自行车环洱海慢骑，吹拂洱海温柔的海风。' },
        { time: '下午', spot: '崇圣寺三塔', activity: '拍摄千年的大理象征，探秘三塔倒影镜面。' },
        { time: '晚上', spot: '周城扎染坊', activity: '体验手工白族扎染，制作专属蓝白扎染手袋。' }
      ],
      3: [
        { time: '上午', spot: '苍山洗马潭', activity: '乘坐索道上山，漫步玉带云游路，仰望白雪。' },
        { time: '下午', spot: '洋人街', activity: '中西合并风情街区，品尝手磨咖啡与白族烤乳扇。' },
        { time: '晚上', spot: '古城文化广场', activity: '加入篝火晚会，观赏金花金哥传统霸王鞭舞蹈。' }
      ]
    };

    const itinerary = [];
    for (let d = 1; d <= plannerDays; d++) {
      itinerary.push({
        day: d,
        schedule: dayPlans[d]
      });
    }
    setGeneratedItinerary(itinerary);
  };

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    const newPost = {
      id: Date.now(),
      type: newCategory,
      title: newTitle,
      desc: newDesc,
      author: newAuthor,
      rating: 4.8,
      date: '刚刚',
      comments: 0,
      imageGradient: 'from-[#b98a4d]/30 to-slate-900/40'
    };
    setPostsList([newPost, ...postsList]);
    setNewTitle('');
    setNewDesc('');
    setShowPostModal(false);
  };

  return (
    <div className="flex-1 h-full flex overflow-hidden animate-fade-in-up pointer-events-auto">
      
      {/* 1. Left Sidebar inside Interact Panel */}
      <div className="w-60 border-r border-border-dali bg-white/60 p-4 flex flex-col gap-4 overflow-y-auto shrink-0 select-none">
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="搜索..."
            className="w-full pl-3 pr-3 py-1.5 bg-white border border-border-dali rounded-lg text-xs focus:outline-none focus:border-[#b98a4d]"
          />
        </div>

        {/* Interact Type Filters */}
        <div>
          <span className="text-[10px] text-dali-text-secondary font-bold block mb-2">探索互动:</span>
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

        {/* Itinerary Planner Widget */}
        <div className="border-t border-black/5 pt-3 flex flex-col gap-2">
          <span className="text-[10px] text-dali-text-secondary font-bold block">📅 智慧日程订制助手:</span>
          <div className="flex items-center justify-between text-[9px] text-dali-text-secondary">
            <span>游玩天数:</span>
            <div className="flex gap-1">
              {[1, 2, 3].map(d => (
                <button
                  key={d}
                  onClick={() => setPlannerDays(d)}
                  className={`w-5 h-5 rounded text-[9.5px] font-bold border transition-colors cursor-pointer ${
                    plannerDays === d
                      ? 'bg-dali-blue border-dali-blue text-white shadow-sm'
                      : 'bg-white border-border-dali text-dali-text-secondary'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleGenerateItinerary}
            className="py-1.5 w-full bg-[#b98a4d]/10 hover:bg-[#b98a4d]/15 text-[#916834] text-[10px] font-bold rounded-lg border border-[#b98a4d]/25 text-center transition-colors cursor-pointer select-none"
          >
            一键订制专属行程
          </button>
        </div>

        {/* Post Trigger button */}
        <div className="border-t border-black/5 pt-3">
          <button
            onClick={() => setShowPostModal(true)}
            className="w-full py-1.5 bg-[#b98a4d] hover:bg-[#916834] text-white text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow cursor-pointer select-none"
          >
            ✍️ 发布新动态 / 约伴
          </button>
        </div>

      </div>

      {/* 2. Right Content Area: post grids */}
      <div className="flex-1 flex flex-col p-5 overflow-y-auto bg-white/20">
        
        {/* Title Header */}
        <div className="flex justify-between items-center mb-5 select-none shrink-0">
          <div>
            <h2 className="text-base font-extrabold text-dali-text-main flex items-center gap-1.5 dali-title-serif">
              分享大理时光 <span className="text-[10px] text-dali-text-secondary font-normal font-sans">探索故事、参与活动、与旅友连接</span>
            </h2>
          </div>
          <button className="px-2.5 py-1 bg-white border border-border-dali rounded text-[10px] font-bold text-dali-text-secondary flex items-center gap-1 hover:border-[#b98a4d]">
            <span>按热度排序</span> <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-white/90 border border-border-dali rounded-xl overflow-hidden hover:border-[#b98a4d]/30 transition-all duration-300 hover:shadow-md flex flex-col"
            >
              {/* Photo preview banner */}
              <div className="h-32 bg-gradient-to-br from-indigo-950 to-blue-900 p-3 flex justify-between items-start relative overflow-hidden shrink-0">
                {/* Visual backdrop representing post */}
                <div className="absolute inset-0 bg-cover bg-center opacity-70"
                     style={{ backgroundImage: `url('${postImages[post.id] || daliCangshanErhai}')` }}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"></div>

                <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold text-[#dfb257] flex items-center gap-0.5 z-10 select-none">
                  <Star className="w-2.5 h-2.5 fill-[#dfb257] text-[#dfb257]" /> {post.rating}
                </span>

                <span className="px-1.5 py-0.5 bg-dali-blue text-white rounded text-[8px] font-bold z-10 select-none">
                  {post.type}
                </span>
              </div>

              {/* Body */}
              <div className="p-3.5 flex flex-col flex-1 gap-2 text-left">
                <div>
                  <h3 className="text-xs font-extrabold text-dali-text-main flex items-center gap-1.5">
                    {post.title}
                  </h3>
                  <p className="text-[10px] text-dali-text-secondary leading-relaxed mt-1 whitespace-pre-line line-clamp-3">
                    {post.desc}
                  </p>
                </div>

                <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[9px] text-dali-text-muted">
                    发布者: {post.author}
                  </span>

                  {post.type === '活动' && (
                    <button 
                      onClick={() => alert(`您已成功报名“${post.title}”！请准时参加。`)}
                      className="px-2.5 py-1 bg-[#b98a4d] hover:bg-[#916834] text-white text-[9px] font-bold rounded shadow-sm cursor-pointer select-none"
                    >
                      立即报名
                    </button>
                  )}

                  {post.type === '组队' && (
                    <button 
                      onClick={() => alert(`已向发布者发起加入申请！请等待旅友回复。`)}
                      className="px-2.5 py-1 bg-[#1da59a] hover:bg-teal-700 text-white text-[9px] font-bold rounded shadow-sm cursor-pointer select-none"
                    >
                      申请加入
                    </button>
                  )}

                  {post.type === '游记' && (
                    <button className="text-[10px] font-extrabold text-[#b98a4d] hover:text-[#916834] cursor-pointer select-none">
                      查看全文
                    </button>
                  )}

                  {post.type === '讨论' && (
                    <span className="text-[9px] text-dali-blue font-bold flex items-center gap-0.5 cursor-pointer">
                      <MessageSquare className="w-2.5 h-2.5" /> {post.comments} 讨论
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
          {filteredPosts.length === 0 && (
            <div className="col-span-2 py-12 text-center text-dali-text-muted text-xs">
              无符合过滤条件的动态
            </div>
          )}
        </div>

      </div>

      {/* 3. Itinerary Planner Modal */}
      {generatedItinerary && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 pointer-events-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-black/5 w-full max-w-lg p-5 flex flex-col gap-4 animate-fade-in-up text-left max-h-[85%] overflow-hidden">
            <div className="flex justify-between items-center border-b border-black/5 pb-2 shrink-0 select-none">
              <h3 className="text-sm font-bold text-dali-text-main flex items-center gap-1.5">
                📅 大理古城智能定制行程表 ({plannerDays} 日游)
              </h3>
              <button 
                onClick={() => setGeneratedItinerary(null)}
                className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Itinerary roadmap */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
              {generatedItinerary.map(dayPlan => (
                <div key={dayPlan.day} className="border-b border-black/5 pb-3 last:border-b-0 last:pb-0">
                  <span className="px-2 py-0.5 bg-[#b98a4d] text-white text-[9px] font-bold rounded-md block w-max uppercase tracking-wider mb-2.5">
                    第 {dayPlan.day} 天日程
                  </span>
                  
                  <div className="relative pl-4 border-l-2 border-dashed border-[#b98a4d]/30 flex flex-col gap-3 ml-2.5">
                    {dayPlan.schedule.map((item, idx) => (
                      <div key={idx} className="relative text-left">
                        {/* Timeline dot */}
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#b98a4d] border-2 border-white" />
                        
                        <div className="bg-black/5 p-2.5 rounded-lg border border-black/5">
                          <div className="flex justify-between items-center text-[10px] font-extrabold text-dali-text-main">
                            <span>{item.time} · {item.spot}</span>
                          </div>
                          <p className="text-[9.5px] text-dali-text-secondary mt-1 leading-relaxed">
                            {item.activity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-black/5 pt-3 shrink-0 flex gap-2">
              <button 
                onClick={() => { alert('已将定制日程加入您的手机日程或同步至导览地图！'); setGeneratedItinerary(null); }}
                className="flex-1 py-2 bg-[#b98a4d] hover:bg-[#916834] text-white text-[10px] font-bold rounded-lg cursor-pointer text-center"
              >
                同步到我的行程
              </button>
              <button 
                onClick={() => setGeneratedItinerary(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-dali-text-secondary text-[10px] font-bold rounded-lg cursor-pointer text-center"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Post Creator Modal */}
      {showPostModal && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 pointer-events-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-black/5 w-full max-w-md p-5 flex flex-col gap-4 animate-fade-in-up text-left">
            <div className="flex justify-between items-center border-b border-black/5 pb-2 select-none">
              <h3 className="text-sm font-bold text-dali-text-main flex items-center gap-1.5">
                ✍️ 发布新动态 / 寻找伴侣
              </h3>
              <button 
                onClick={() => setShowPostModal(false)}
                className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {/* Category */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-dali-text-secondary font-bold">选择类型:</span>
                <div className="flex gap-2">
                  {['游记', '讨论', '组队'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setNewCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                        newCategory === cat
                          ? 'bg-dali-blue border-dali-blue text-white shadow-sm'
                          : 'bg-white border-border-dali text-dali-text-secondary hover:border-dali-blue/40'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-dali-text-secondary font-bold">主题 / 标题:</span>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="给你的动态起一个吸引人的标题..."
                  className="bg-white border border-border-dali rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#b98a4d]"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-dali-text-secondary font-bold">正文内容:</span>
                <textarea 
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="描述您的游玩见闻，或者是您的搭队时间、地点、人数要求..."
                  rows="3"
                  className="bg-white border border-border-dali rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#b98a4d]"
                />
              </div>

              {/* Author */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-dali-text-secondary font-bold">署名 / 昵称:</span>
                <input 
                  type="text" 
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="旅行者"
                  className="bg-white border border-border-dali rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#b98a4d]"
                />
              </div>
            </div>

            <div className="flex gap-2 border-t border-black/5 pt-3">
              <button 
                onClick={handleCreatePost}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg cursor-pointer text-center"
              >
                发布动态
              </button>
              <button 
                onClick={() => setShowPostModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-dali-text-secondary text-[10px] font-bold rounded-lg cursor-pointer text-center"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
