import React, { useState } from 'react';
import { Heart, MessageSquare, Send, Share2, Sparkles, Eye } from 'lucide-react';
import { daliData } from '../data/daliData';

// Custom high-quality placeholder mock images for travel note posts to make them look stunning
import daliSouthGate from '../assets/dali_south_gate.png';
import daliThreePagodas from '../assets/dali_three_pagodas.png';
import daliCangshanErhai from '../assets/dali_cangshan_erhai.png';
import daliErhaiLake from '../assets/dali_erhai_lake.png';
import daliTorchFestival from '../assets/dali_torch_festival.png';

const travelImages = {
  1: daliErhaiLake,
  2: daliSouthGate,
  3: daliCangshanErhai,
  4: daliErhaiLake,
  5: daliThreePagodas,
  6: daliTorchFestival
};

export default function TravelNotesView() {
  const [posts, setPosts] = useState(
    daliData.posts.filter(p => p.type === '游记' || p.type === '讨论').map(post => ({
      ...post,
      likes: Math.floor(Math.random() * 150) + 50,
      hasLiked: false,
      commentsList: [
        { id: 1, author: '阿华', text: '大理真的很慢，超级舒服！' },
        { id: 2, author: '金花小姐姐', text: '欢迎常来大理玩噢～' }
      ],
      showComments: false,
      newComment: ''
    }))
  );

  const [activePhoto, setActivePhoto] = useState(null);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const handleLike = (postId, e) => {
    e.stopPropagation();
    
    // Trigger floating heart animation
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const heartId = Date.now() + Math.random();
    setFloatingHearts(prev => [...prev, { id: heartId, x, y }]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== heartId));
    }, 1200);

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
            hasLiked: !post.hasLiked
          };
        }
        return post;
      })
    );
  };

  const handleToggleComments = (postId) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return { ...post, showComments: !post.showComments };
        }
        return post;
      })
    );
  };

  const handleCommentChange = (postId, val) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return { ...post, newComment: val };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId && post.newComment.trim()) {
          return {
            ...post,
            commentsList: [
              ...post.commentsList,
              { id: Date.now(), author: '旅行者', text: post.newComment }
            ],
            newComment: ''
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-white/30 flex flex-col gap-6 text-left pointer-events-auto animate-fade-in-up relative">
      
      {/* Page Header */}
      <div className="flex justify-between items-center select-none shrink-0">
        <div>
          <h2 className="text-base font-extrabold text-dali-text-main flex items-center gap-1.5 dali-title-serif">
            大理游记云廊 <span className="text-[10px] text-dali-text-secondary font-normal font-sans">分享真实见闻，感受大理慢生活</span>
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[9px] font-bold text-amber-800">
          <Sparkles className="w-3 h-3 animate-pulse" /> 实时慢游动态已同步
        </div>
      </div>

      {/* Grid of travel notes */}
      <div className="grid grid-cols-2 gap-5">
        {posts.map(post => (
          <div 
            key={post.id} 
            className="bg-white/90 border border-border-dali rounded-2xl overflow-hidden hover:border-[#b98a4d]/30 transition-all duration-300 hover:shadow-md flex flex-col relative"
          >
            {/* Visual Header */}
            <div className="h-40 bg-gradient-to-br from-teal-600/30 to-indigo-900/40 relative overflow-hidden group shrink-0">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${travelImages[post.id] || daliCangshanErhai}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Type tag */}
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[8px] font-bold text-white tracking-widest uppercase">
                {post.type}
              </span>
              
              {/* Visual preview trigger */}
              <button 
                onClick={() => setActivePhoto(travelImages[post.id] || daliCangshanErhai)}
                className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-md rounded-full text-white transition-colors cursor-pointer"
                title="预览大图"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>

              <div className="absolute bottom-3 left-3 right-3 text-left">
                <h3 className="text-xs font-bold text-white truncate drop-shadow">{post.title}</h3>
                <p className="text-[9px] text-white/80 mt-0.5 font-mono">作者: {post.author} · {post.date}</p>
              </div>
            </div>

            {/* Note text */}
            <div className="p-4 flex flex-col flex-1 gap-3 relative">
              <p className="text-[10px] text-dali-text-secondary leading-relaxed line-clamp-4">
                {post.desc}
              </p>

              {/* Interactions row */}
              <div className="mt-auto pt-3 border-t border-black/5 flex justify-between items-center select-none relative">
                {/* Likes button with floating heart generator */}
                <button 
                  onClick={(e) => handleLike(post.id, e)}
                  className={`flex items-center gap-1 text-[10px] font-bold transition-colors relative cursor-pointer ${
                    post.hasLiked ? 'text-red-500' : 'text-dali-text-secondary hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.hasLiked ? 'fill-red-500' : ''}`} />
                  <span>{post.likes}</span>

                  {/* Render floating hearts inside this button's relative frame */}
                  {floatingHearts.map(h => (
                    <span 
                      key={h.id} 
                      className="float-heart"
                      style={{ left: `${h.x}px`, top: `${h.y - 10}px` }}
                    >
                      ❤️
                    </span>
                  ))}
                </button>

                {/* Comment Toggle */}
                <button 
                  onClick={() => handleToggleComments(post.id)}
                  className="flex items-center gap-1 text-[10px] font-bold text-dali-text-secondary hover:text-dali-blue transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.commentsList.length} 评论</span>
                </button>

                {/* Share mock */}
                <button 
                  onClick={() => alert('已将该游记分享链接复制到剪贴板！')}
                  className="flex items-center gap-1 text-[10px] font-bold text-dali-text-secondary hover:text-[#b98a4d] transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Collapsible Comments Section */}
              {post.showComments && (
                <div className="mt-2 border-t border-black/5 pt-3 flex flex-col gap-2 bg-black/5 p-2.5 rounded-lg animate-fade-in">
                  <div className="flex flex-col gap-2 max-h-24 overflow-y-auto">
                    {post.commentsList.map(comment => (
                      <div key={comment.id} className="text-[9px] text-dali-text-secondary leading-tight">
                        <span className="font-bold text-dali-text-main">{comment.author}: </span>
                        <span>{comment.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Write a comment */}
                  <div className="flex gap-1.5 items-center mt-1 border-t border-black/5 pt-2">
                    <input 
                      type="text"
                      value={post.newComment}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      placeholder="写下你的想法..."
                      className="flex-1 bg-white border border-border-dali rounded px-2 py-1 text-[9px] focus:outline-none focus:border-[#b98a4d]"
                    />
                    <button 
                      onClick={() => handleAddComment(post.id)}
                      className="p-1 bg-dali-blue text-white rounded hover:bg-teal-700 transition-colors cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* Lightbox photo preview */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)}
          className="absolute inset-0 bg-black/85 z-50 flex items-center justify-center p-8 animate-fade-in pointer-events-auto cursor-zoom-out"
        >
          <div className="max-w-full max-h-full rounded-xl overflow-hidden shadow-2xl relative border border-white/10 animate-fade-in-up">
            <img src={activePhoto} alt="Preview" className="max-h-[75vh] object-contain mx-auto" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-[9px] font-bold rounded-full select-none">
              点击任意处退出预览
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
