export const daliData = {
  sights: [
    {
      id: 1,
      name: "南城门",
      enName: "South Gate",
      rating: 4.8,
      type: "古迹",
      desc: "大理古城的标志，古朴庄严。始建于明洪武十五年，是古城最古老的建筑之一，承载着厚重的历史记忆。",
      audio: true,
      coords: { x: 50, y: 78 }, // Coordinates in percentage on home map illustration
      gradient: "from-amber-900/60 to-stone-900/80"
    },
    {
      id: 2,
      name: "五华楼",
      enName: "Wuhua Building",
      rating: 4.8,
      type: "古迹",
      desc: "大理古城的标志性建筑，古代南诏国王接见国宾的场所。登楼可俯瞰古城全貌，远眺苍山洱海。",
      audio: true,
      coords: { x: 44, y: 46 },
      gradient: "from-amber-950/60 to-yellow-900/80"
    },
    {
      id: 3,
      name: "洋人街",
      enName: "Foreigner's Street",
      rating: 4.8,
      type: "街道",
      desc: "原名护国路，因大理开放初期在此汇集了众多外国游客而得名。这里中西文化交融，咖啡馆与扎染铺错落有致。",
      audio: true,
      coords: { x: 30, y: 52 },
      gradient: "from-cyan-950/60 to-slate-900/80"
    },
    {
      id: 4,
      name: "红龙井",
      enName: "Honglong Well",
      rating: 4.8,
      type: "文化",
      desc: "古城内著名的水景街道，清澈的泉水绕街流淌。两旁垂柳依依，集历史典故、石雕艺术与现代酒吧于一体。",
      audio: true,
      coords: { x: 40, y: 64 },
      gradient: "from-teal-950/60 to-slate-900/80"
    },
    {
      id: 5,
      name: "文庙",
      enName: "Confucian Temple",
      rating: 4.7,
      type: "文化",
      desc: "大理崇尚儒学和文化的重要见证。庙宇格局宏大，环境幽静，散发着浓郁的书香气息与儒家礼制美学。",
      audio: false,
      coords: { x: 56, y: 56 },
      gradient: "from-stone-900/60 to-amber-950/80"
    },
    {
      id: 6,
      name: "苍山",
      enName: "Cangshan Mountain",
      rating: 4.9,
      type: "自然",
      desc: "大理“风花雪月”四景之一的苍山雪。十九峰横列如屏，溪流清澈，有洗马潭、感通索道等极佳徒步路线。",
      audio: false,
      coords: { x: 18, y: 25 },
      gradient: "from-emerald-950/60 to-teal-900/80"
    },
    {
      id: 7,
      name: "洱海",
      enName: "Erhai Lake",
      rating: 4.9,
      type: "自然",
      desc: "高原明珠，形如人耳，水质澄澈。绕湖骑行是体验大理慢时光的不二选择，清风拂面，水天一色。",
      audio: false,
      coords: { x: 80, y: 35 },
      gradient: "from-blue-950/60 to-cyan-900/80"
    },
    {
      id: 8,
      name: "崇圣寺三塔",
      enName: "Three Pagodas",
      rating: 4.8,
      type: "古迹",
      desc: "大理的象征，建于唐开元年间。三塔鼎足而立，挺拔雄伟，是中国南方最古老、最宏伟的佛塔建筑群之一。",
      audio: true,
      coords: { x: 62, y: 70 },
      gradient: "from-yellow-950/60 to-stone-900/80"
    }
  ],
  cultures: [
    {
      id: 1,
      name: "白族扎染",
      enName: "Bai Tie-Dyeing",
      rating: 4.9,
      type: "非遗",
      level: "国家级",
      desc: "周城村是著名的扎染之乡。采用纯天然板蓝根为染料，通过手工缝扎、反复浸染，创造出千变万化的蓝白国潮艺术。",
      location: "周城扎染坊",
      gradient: "from-blue-900/40 to-cyan-950/60"
    },
    {
      id: 2,
      name: "白族三道茶",
      enName: "Bai Three-Course Tea Ceremony",
      rating: 4.8,
      type: "传统",
      level: "国家级",
      desc: "大理民俗的礼宾珍品。“一苦、二甜、三回味”，寓意人生的成长历程。伴随着热情的白族歌舞，传递深厚待客之道。",
      location: "三道茶太演厅",
      gradient: "from-amber-900/40 to-yellow-950/60"
    },
    {
      id: 3,
      name: "大理黑陶制作",
      enName: "Dali Black Pottery Making",
      rating: 4.8,
      type: "手工艺",
      level: "省级",
      desc: "大理古老的泥土艺术。经拉坯、雕刻、高温烧制以及无氧炭化，使黑陶呈现出墨玉般的亮泽与古朴刚劲之美。",
      location: "黑陶艺术馆",
      gradient: "from-stone-900/40 to-zinc-950/65"
    },
    {
      id: 4,
      name: "民俗歌舞表演",
      enName: "Folk Music and Dance Show",
      rating: 4.8,
      type: "传统",
      level: "省级",
      desc: "白族霸王鞭、金花舞等传统表演，在欢乐清脆的节奏中展现白族人民对自然的赞美和对生活的热爱。",
      location: "古城文化广场",
      gradient: "from-rose-950/40 to-crimson-900/60"
    },
    {
      id: 5,
      name: "剑川木雕体验",
      enName: "Woodcarving Experience",
      rating: 4.7,
      type: "手工艺",
      level: "国家级",
      desc: "木雕艺术甲天下。金花浮雕、镂空花窗，白族木匠在方寸木板间雕刻飞禽走兽、花鸟山水，技艺精湛绝伦。",
      location: "木雕展示坊",
      gradient: "from-stone-800/40 to-amber-950/60"
    }
  ],
  posts: [
    {
      id: 1,
      type: "游记",
      title: "我的大理奇遇",
      desc: "游记分享：洱海边骑行，风花雪月尽在眼底。在这里，云朵仿佛触手可及，骑一辆脚踏车，伴着海风，找到了久违的宁静...",
      author: "小林 (旅人)",
      rating: 4.9,
      date: "2023-11-20",
      comments: 11,
      imageGradient: "from-teal-600/30 to-indigo-900/40"
    },
    {
      id: 2,
      type: "活动",
      title: "限时活动：扎染工坊体验营",
      desc: "时间: 12:00 - 18:00\n地点: 大理扎染工坊体验区\n参与人: 30人/场\n白族非遗染匠手把手教学，体验缝扎扎花、板蓝根染色全流程，带走专属扎染手袋。",
      author: "非遗传承馆",
      rating: 4.9,
      date: "每周六限时",
      participants: 30,
      imageGradient: "from-blue-600/30 to-indigo-950/40"
    },
    {
      id: 3,
      type: "讨论",
      title: "你心目中最美的大理景点是哪里？",
      desc: "社区话题讨论：洱海的日落、苍山的徒步溪流，还是清晨静谧的洋人街？分享你私藏的拍照打卡机位！",
      author: "大理首席金花",
      rating: 4.8,
      date: "2小时前",
      comments: 24,
      imageGradient: "from-purple-800/30 to-slate-900/40"
    },
    {
      id: 4,
      type: "组队",
      title: "寻找洱海骑行伙伴",
      desc: "旅行搭子组队：计划下周二（10-26）上午8点出发，从才村码头出发沿着生态廊道骑行至喜洲古镇，慢骑拍照，求队友同往！",
      author: "骑行狂魔阿超",
      rating: 4.7,
      date: "2022-10-26出发",
      participants: 4,
      imageGradient: "from-emerald-700/30 to-slate-900/40"
    },
    {
      id: 5,
      type: "活动",
      title: "摄影大赛：大理光影之美",
      desc: "记录大理的“风花雪月”。不管是胶片、手机还是单反作品，只要体现大理独特的光影与人文，即可投稿参赛赢取名宿大奖。\n截止时间: 2023-11-10",
      author: "大理摄协",
      rating: 4.8,
      date: "进行中",
      participants: 124,
      imageGradient: "from-amber-600/30 to-red-950/40"
    },
    {
      id: 6,
      type: "讨论",
      title: "求助：古城内哪些店铺有地道的饵块？",
      desc: "问答社区：求助！请问各位吃货朋友，古城里有没有本地人常去的烧饵块、乳扇铺子？不要网红游客店，多谢！",
      author: "吃货小张",
      rating: 4.6,
      date: "3小时前",
      comments: 18,
      imageGradient: "from-stone-700/30 to-neutral-900/40"
    }
  ],
  activities: [
    {
      id: 1,
      title: "大理古城 (风花雪月节主题活动)",
      desc: "大理古城盛大的传统庆祝活动，届时将有万人白族霸王鞭大巡游、古街非遗集市及洱海歌会开演。探索更多...",
      imageGradient: "from-amber-700 to-indigo-950"
    },
    {
      id: 2,
      title: "苍山火把节庆祝活动",
      desc: "漫山火树银花，白族火把狂欢夜，古城南门广场千人篝火舞会。感受大理最热烈喧嚣的民俗夜晚。",
      imageGradient: "from-orange-700 to-red-950"
    }
  ],
  topics: [
    { id: 1, title: "大理非遗传承：我的扎染故事", count: "3.2w 讨论" },
    { id: 2, title: "喜洲古镇的美食记", count: "1.8w 讨论" },
    { id: 3, title: "白族服饰的独特魅力", count: "2.1w 讨论" }
  ]
};
