var HistoryListConfig = [
{
	id:1,
	index:1,
	name:"汜水关之战",
	level:1,
	troops:1000,
	food:0,
	maxSubCharacter:4,
	characters:[
		[8,24,17,240],//孙坚，孙策，孙权，孙休
	],
	subCharacters:[72,123,80,178,44,234,167],//程普,黄盖,韩当,祖茂,丁奉,虞汜,陆凯
	enemy:{chara_id : 265,color : "0,0,0",generals_count:6,areas : [
	  {  area_id : 54,troops:1000,prefecture : 910,food:100000,
	  generals:[
	    {chara_id:10001,name:"华雄",feat:0,loyalty:100},
	    {chara_id:10002,name:"李肃",feat:0,loyalty:100},
	    {chara_id:10003,name:"徐荣",feat:0,loyalty:100},
	    {chara_id:10004,name:"胡轸",feat:0,loyalty:100},
	    {chara_id:11001,name:"步兵",feat:0,loyalty:100},
	    {chara_id:11002,name:"步兵",feat:0,loyalty:100},
	    {chara_id:11101,name:"弓兵",feat:0,loyalty:100},
	    {chara_id:11102,name:"弓兵",feat:0,loyalty:100},
	    {chara_id:11201,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11202,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11203,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11204,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11205,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11206,name:"骑兵",feat:0,loyalty:100},
	    ],
	  },
	]},
	rewards:[{count:1, items:[101, 102, 103, 104]}, {count:2, items:[105, 106, 107, 108]}, {count:5, items:[117, 118, 119, 120, 121]}]
},
{
	id:2,
	index:2,
	name:"虎牢关之战",
	level:0,
	troops:1000,
	maxSubCharacter:3,
	characters:[
		[21,226,620],//刘备，刘封，刘禅
		[4,89,154,175,332,502],//关羽，关平，关兴，关索,关统,关彝
		[19,153,598,239],//张飞，张苞，张绍,张遵
	],
	subCharacters:[39,371,504,317,1,375,75,160,110,251,137,144,229,36,43,202,35,463,228,611,464],
	//袁绍,袁尚,袁谭,袁熙,曹操,袁术,公孙瓒,公孙康,公孙度,公孙渊,鲍信,马腾,马云鹭,马超,马岱,曹丕,曹植,曹睿,曹奂，孙亮
    enemy:{chara_id : 265,color : "0,0,0",generals_count:6,areas : [
      {  area_id : 54,troops:1000,prefecture : 910,food:100000,
      generals:[
        {chara_id:10005,name:"吕布",feat:0,loyalty:100},
        {chara_id:10002,name:"李肃",feat:0,loyalty:100},
        {chara_id:10003,name:"徐荣",feat:0,loyalty:100},
        {chara_id:10004,name:"胡轸",feat:0,loyalty:100},
        {chara_id:10006,name:"李榷",feat:0,loyalty:100},
        {chara_id:10007,name:"郭汜",feat:0,loyalty:100},
        {chara_id:10008,name:"张济",feat:0,loyalty:100},
        {chara_id:10009,name:"樊稠",feat:0,loyalty:100},
        {chara_id:10010,name:"董卓",feat:0,loyalty:100},
        {chara_id:10011,name:"李儒",feat:0,loyalty:100},
        {chara_id:10012,name:"董昱",feat:0,loyalty:100},
        {chara_id:10013,name:"贾诩",feat:0,loyalty:100},
        {chara_id:11001,name:"步兵",feat:0,loyalty:100},
        {chara_id:11002,name:"步兵",feat:0,loyalty:100},
        {chara_id:11003,name:"步兵",feat:0,loyalty:100},
        {chara_id:11004,name:"步兵",feat:0,loyalty:100},
        {chara_id:11005,name:"步兵",feat:0,loyalty:100},
        {chara_id:11101,name:"弓兵",feat:0,loyalty:100},
        {chara_id:11102,name:"弓兵",feat:0,loyalty:100},
        {chara_id:11201,name:"骑兵",feat:0,loyalty:100},
        {chara_id:11202,name:"骑兵",feat:0,loyalty:100},
        {chara_id:11203,name:"骑兵",feat:0,loyalty:100},
        ],
      },
	]},
	rewards:[{count:1, items:[101, 102, 103, 104]}, {count:2, items:[105, 106, 107, 108]}, {count:5, items:[117, 118, 119, 120, 121]}]
},
{
	id:3,
	index:3,
	name:"界桥之战",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[21,226,620],//刘备，刘封，刘禅
		[4,89,154,175,332,502],//关羽，关平，关兴，关索,关统,关彝
		[19,153,598,239],//张飞，张苞，张绍,张遵
		[3,226,620],//赵云,赵統,赵广
		[75,226,620],//公孙瓒,公孙
	],
	subCharacters:[30,31,32],//严纲,陈到
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:4,
	index:4,
	name:"徐州入侵战",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,35,463,129,103,228,611],//曹操,曹丕,曹植,曹睿,曹奂
		[1,2,3,4,10],//夏侯惇
		[21,226,620],//夏侯渊
	],
	subCharacters:[30,31,32],//许褚,钟繇
	enemy:{chara_id : 265,color : "0,0,0",generals_count:6,areas : [
	  {  area_id : 54,troops:1000,prefecture : 910,food:100000,
	  generals:[
	    {chara_id:10001,name:"华雄",feat:0,loyalty:100},
	    {chara_id:10002,name:"李肃",feat:0,loyalty:100},
	    {chara_id:10003,name:"徐荣",feat:0,loyalty:100},
	    {chara_id:10004,name:"胡轸",feat:0,loyalty:100},
	    {chara_id:11001,name:"步兵",feat:0,loyalty:100},
	    {chara_id:11002,name:"步兵",feat:0,loyalty:100},
	    {chara_id:11101,name:"弓兵",feat:0,loyalty:100},
	    {chara_id:11102,name:"弓兵",feat:0,loyalty:100},
	    {chara_id:11201,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11202,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11203,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11204,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11205,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11206,name:"骑兵",feat:0,loyalty:100},
	    ],
	  },
	]},
	rewards:[{count:1, items:[101, 102, 103, 104]}, {count:2, items:[105, 106, 107, 108]}, {count:5, items:[117, 118, 119, 120, 121]}]
},
{
	id:5,
	index:5,
	name:"濮阳逃出战",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,35,463,129,103,228,611],//曹操,曹丕,曹植,曹睿,曹奂
		[21,226,620],//孙策，孙权,孙休
		[1,2,3,4,10],//刘备，刘封，刘禅
	],
	subCharacters:[30,31,32],//关羽,张飞,
	enemy:{chara_id : 265,color : "0,0,0",generals_count:6,areas : [
	  {  area_id : 54,troops:1000,prefecture : 910,food:100000,
	  generals:[
	    {chara_id:10001,name:"华雄",feat:0,loyalty:100},
	    {chara_id:10002,name:"李肃",feat:0,loyalty:100},
	    {chara_id:10003,name:"徐荣",feat:0,loyalty:100},
	    {chara_id:10004,name:"胡轸",feat:0,loyalty:100},
	    {chara_id:11001,name:"步兵",feat:0,loyalty:100},
	    {chara_id:11002,name:"步兵",feat:0,loyalty:100},
	    {chara_id:11101,name:"弓兵",feat:0,loyalty:100},
	    {chara_id:11102,name:"弓兵",feat:0,loyalty:100},
	    {chara_id:11201,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11202,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11203,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11204,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11205,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11206,name:"骑兵",feat:0,loyalty:100},
	    ],
	  },
	]},
	rewards:[{count:1, items:[101, 102, 103, 104]}, {count:2, items:[105, 106, 107, 108]}, {count:5, items:[117, 118, 119, 120, 121]}]
},
{
	id:6,
	index:6,
	name:"江东平定战",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[8,24,17,85,240,464],//孙坚，孙策，孙权,孙休
		[1,2,3,4,10],//周瑜,鲁肃,陆逊,陆抗
	],
	subCharacters:[30,31,32],//周泰,陈武
	enemy:{chara_id : 265,color : "0,0,0",generals_count:6,areas : [
	  {  area_id : 54,troops:1000,prefecture : 910,food:100000,
	  generals:[
	    {chara_id:10001,name:"华雄",feat:0,loyalty:100},
	    {chara_id:10002,name:"李肃",feat:0,loyalty:100},
	    {chara_id:10003,name:"徐荣",feat:0,loyalty:100},
	    {chara_id:10004,name:"胡轸",feat:0,loyalty:100},
	    {chara_id:11001,name:"步兵",feat:0,loyalty:100},
	    {chara_id:11002,name:"步兵",feat:0,loyalty:100},
	    {chara_id:11101,name:"弓兵",feat:0,loyalty:100},
	    {chara_id:11102,name:"弓兵",feat:0,loyalty:100},
	    {chara_id:11201,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11202,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11203,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11204,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11205,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:11206,name:"骑兵",feat:0,loyalty:100},
	    ],
	  },
	]},
	rewards:[{count:1, items:[101, 102, 103, 104]}, {count:2, items:[105, 106, 107, 108]}, {count:5, items:[117, 118, 119, 120, 121]}]
},
{
	id:7,
	index:7,
	name:"宛城逃亡战",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[21,226,620],//曹操,曹丕,曹植,曹睿,曹奂
		[1,2,3,4,10],//典韦,典满,许褚,许仪
	],
	subCharacters:[30,31,32],//周泰,陈武
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:8,
	index:8,
	name:"伪帝讨伐战",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//曹操,曹丕,曹植,曹睿,曹奂
		[21,226,620],//孙策，孙权,孙休
		[1,2,3,4,10],//刘备，刘封，刘禅
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:9,
	index:9,
	name:"水淹下邳",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//曹操,曹丕,曹植,曹睿,曹奂
		[1,2,3,4,10],//刘备，刘封，刘禅
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:10,
	index:10,
	name:"官渡之战",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//曹操,曹丕,曹植,曹睿,曹奂
		[21,226,620],//孙策，孙权,孙休
		[1,2,3,4,10],//刘备，刘封，刘禅
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:11,
	index:11,
	name:"赤壁之战(曹)",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//曹操,曹丕,曹植,曹睿,曹奂
		[21,226,620],//许褚，许仪
		[1,2,3,4,10],//刘备，刘封，刘禅
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:12,
	index:12,
	name:"赤壁之战(孙刘)",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//孙权,孙休
		[21,226,620],//刘备，刘封，刘禅
		[1,2,3,4,10],//诸葛亮,诸葛膽
		[1,2,3,4,10],//周瑜,陆逊,陆抗
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:13,
	index:13,
	name:"马超讨伐战",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//曹操,曹丕,曹植,曹睿,曹奂
		[21,226,620],//许褚，许仪
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:14,
	index:14,
	name:"兵败合肥",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//曹操,曹丕,曹植,曹睿,曹奂
		[21,226,620],//许褚，许仪
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:15,
	index:15,
	name:"败走麦城",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//曹操,曹丕,曹植,曹睿,曹奂
		[21,226,620],//许褚，许仪
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:16,
	index:16,
	name:"陆逊火烧连营(刘)",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//曹操,曹丕,曹植,曹睿,曹奂
		[21,226,620],//许褚，许仪
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:17,
	index:17,
	name:"陆逊火烧连营(孙)",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//曹操,曹丕,曹植,曹睿,曹奂
		[21,226,620],//许褚，许仪
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:18,
	index:18,
	name:"平南蛮",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//曹操,曹丕,曹植,曹睿,曹奂
		[21,226,620],//许褚，许仪
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:19,
	index:19,
	name:"北伐",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//诸葛亮,诸葛膽
		[21,226,620],//赵云,赵統,赵广
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:20,
	index:20,
	name:"灭蜀",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[1,2,3,4,10],//邓艾,邓忠
		[21,226,620],//钟,钟会
	],
	subCharacters:[30,31,32],//关羽,张飞,
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
];
HistoryListConfig = HistoryListConfig.sort(function(a,b){return a.index - b.index;});
