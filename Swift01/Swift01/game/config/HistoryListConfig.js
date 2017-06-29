var HistoryListConfig = [
{
	id:1,
	index:1,
	name:"汜水关之战",
	level:20,
	troops:1000,
	maxSubCharacter:4,
	characters:[
		[8,24,17],//孙坚，孙策，孙权，孙休
	],
	subCharacters:[72,123,80,178,44,234,167],//程普,黄盖,韩当,祖茂,丁奉,虞汜,陆凯
	enemy:{chara_id : 851,color : "0,0,0",generals_count:6,areas : [
	  {  area_id : 54,prefecture : 851,
	  generals:[
	    {chara_id:851,name:"华雄",feat:0,loyalty:100},
	    {chara_id:852,name:"李肃",feat:0,loyalty:100},
	    {chara_id:853,name:"徐荣",feat:0,loyalty:100},
	    {chara_id:854,name:"胡轸",feat:0,loyalty:100},
	    {chara_id:855,name:"步兵",feat:0,loyalty:100},
	    {chara_id:856,name:"步兵",feat:0,loyalty:100},
	    {chara_id:855,name:"弓兵",feat:0,loyalty:100},
	    {chara_id:856,name:"弓兵",feat:0,loyalty:100},
	    {chara_id:855,name:"骑兵",feat:0,loyalty:100},
	    {chara_id:856,name:"骑兵",feat:0,loyalty:100},
	    ],
	  },
	]},
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:2,
	index:2,
	name:"虎牢关之战",
	level:20,
	troops:1000,
	maxSubCharacter:3,
	characters:[
		[21,226,620],//刘备，刘封，刘禅
		[4,89,154,175,332,502],//关羽，关平，关兴，关索,关统,关彝
		[19,153,598,239],//张飞，张苞，张绍,张遵
		[8,24,17,85,240,464],//孙坚，孙策，孙权,孙休
		[1,35,463,129,584,601,243,103,611],//曹操,曹丕,曹植,曹睿,曹奂
	],
	subCharacters:[39,375,451,75,160,110,602,495,562,408,237,328,273,315,251],//袁绍,袁术,陶谦,公孙瓒,韩馥,孔由,刘岱,张貌,乔瑁,王匡,鲍信,孔融,马腾,张扬
	script:"Data/Event/{0}/fdzlm.txt",
	result:[
		{type:"stopBattle", seigniors:[160,602,451,39,375,1,453,237,8,495,562,446,484,367,408,21,75,144], month:7}
	]
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
		[1,2,3,4,10],//关羽，关平，关兴，关索,关彝
		[21,226,620],//张飞，张苞，张绍,张尊
		[21,226,620],//赵云,赵統,赵广
	],
	subCharacters:[30,31,32],//公孙瓒,陈到
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
		[21,226,620],//曹操,曹丕,曹植,曹睿,曹奂
		[1,2,3,4,10],//夏侯惇
		[21,226,620],//夏侯渊
		[21,226,620],//钟
		[21,226,620],//许褚
	],
	subCharacters:[30,31,32],//公孙瓒,陈到
	script:"Data/Event/{0}/tyjy.txt",
	result:[
		{type:"changeSeignior", id:21, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:4, seignior:604, loyalty:100, city:45},
		{type:"changeSeignior", id:19, seignior:604, loyalty:100, city:45},
	]
},
{
	id:5,
	index:5,
	name:"濮阳逃出战",
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
	id:6,
	index:6,
	name:"江东平定战",
	level:20,
	troops:1000,
	maxSubCharacter:2,
	characters:[
		[21,226,620],//孙策，孙权,孙休
		[1,2,3,4,10],//周瑜,陆逊,陆抗
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
