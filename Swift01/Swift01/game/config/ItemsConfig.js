var ItemType = {
	HEAL:"item_heal"/*治疗伤兵*/
	,ENLIST:"item_enlist"/*招募新兵*/
	,FEAT:"item_feat"/*增加功绩*/
	,PROFICIENCY:"item_proficiency"/*增加训练度*/
	,EXP:"item_exp"/*增加属性经验*/
	,LOYALTY:"item_loyalty"/*增加忠诚度*/
	,EQUIPMENT:"item_equipment"/*装备*/
	,STONE:"item_stone"/*宝石*/
};
var ItemSubType = {
	
};
var StoneType = {
	RED:"red"/*红宝石:加特技*/
	,PURPLE:"purple"/*紫宝石:加武力智力或特技20%特技*/
	,BLUE:"blue"/*蓝宝石:加攻防属性或特技10%特技*/
	,GREEN:"green"/*绿宝石:加武力智力等属性*/
	,YELLOW:"yellow"/*黄宝石:加攻防等属性*/
}; 
var BusinessSaleItems = [3,4];
//PositionConfig.Hand 武器
//PositionConfig.Body 身
//PositionConfig.Head 头
//PositionConfig.Foot 脚
//PositionConfig.Accessories 配饰
var ItemDatas = [
	{id:1,name:"方壶",stamp:1,rarity:7,loyalty:20,type:ItemType.LOYALTY},
	{id:2,name:"美酒",stamp:1,rarity:5,loyalty:15,type:ItemType.LOYALTY},
	{id:3,name:"香囊",stamp:1,rarity:3,loyalty:10,type:ItemType.LOYALTY},
	{id:4,name:"玉环",stamp:1,rarity:1,loyalty:5,type:ItemType.LOYALTY},
	{id:5,name:"修炼符(武力)",type:ItemType.EXP},
	{id:6,name:"修炼符(统率)",type:ItemType.EXP},
	{id:7,name:"修炼符(智力)",type:ItemType.EXP},
	{id:8,name:"修炼符(敏捷)",type:ItemType.EXP},
	{id:9,name:"修炼符(运气)",type:ItemType.EXP},
	{id:10,name:"练兵金牌",stamp:1,proficiency:100,upper_limit:900,type:ItemType.PROFICIENCY},
	{id:11,name:"练兵铜牌",stamp:1,proficiency:100,upper_limit:700,type:ItemType.PROFICIENCY},
	{id:12,name:"练兵铁牌",stamp:1,proficiency:100,upper_limit:500,type:ItemType.PROFICIENCY},
	{id:13,name:"元帅印",stamp:1,feat:200,type:ItemType.FEAT},
	{id:14,name:"将军印",stamp:1,feat:100,type:ItemType.FEAT},
	{id:15,name:"印绶",stamp:1,feat:50,type:ItemType.FEAT},
	{id:16,name:"方天画戟",type:ItemType.EQUIPMENT,rarity:10,stamp:1,position:PositionConfig.Hand,force:10,defense:10},
	{id:17,name:"丈八蛇矛",type:ItemType.EQUIPMENT,rarity:9,stamp:1,position:PositionConfig.Hand,force:9,breakout:10},
	{id:18,name:"青龙偃月刀",type:ItemType.EQUIPMENT,rarity:9,stamp:1,position:PositionConfig.Hand,force:9,morale:10},
	{id:19,name:"虎头湛金枪",type:ItemType.EQUIPMENT,rarity:8,stamp:1,position:PositionConfig.Hand,force:8,morale:10},
	{id:20,name:"龙胆亮银枪",type:ItemType.EQUIPMENT,rarity:8,stamp:1,position:PositionConfig.Hand,force:8,breakout:10},
	{id:21,name:"万石弓",type:ItemType.EQUIPMENT,rarity:7,stamp:1,position:PositionConfig.Hand,force:7,defense:10},
	{id:22,name:"雌雄双剑",type:ItemType.EQUIPMENT,rarity:7,stamp:1,position:PositionConfig.Hand,force:7,attack:10},
	{id:23,name:"七宝刀",type:ItemType.EQUIPMENT,rarity:6,stamp:1,position:PositionConfig.Hand,force:6,defense:5},
	{id:24,name:"青釭剑",type:ItemType.EQUIPMENT,rarity:6,stamp:1,position:PositionConfig.Hand,force:6,breakout:5},
	{id:25,name:"倚天剑",type:ItemType.EQUIPMENT,rarity:6,stamp:1,position:PositionConfig.Hand,force:6,morale:5},
	{id:26,name:"落日弓",type:ItemType.EQUIPMENT,rarity:5,stamp:1,position:PositionConfig.Hand,force:5},
	{id:27,name:"双铁戟",type:ItemType.EQUIPMENT,rarity:5,stamp:1,position:PositionConfig.Hand,force:5},
	{id:28,name:"古锭刀",type:ItemType.EQUIPMENT,rarity:5,stamp:1,position:PositionConfig.Hand,force:5},
	{id:29,name:"青铜鞭",type:ItemType.EQUIPMENT,rarity:4,stamp:1,position:PositionConfig.Hand,force:4},
	{id:30,name:"涯角枪",type:ItemType.EQUIPMENT,rarity:4,stamp:1,position:PositionConfig.Hand,force:4},
	{id:31,name:"流星锤",type:ItemType.EQUIPMENT,rarity:4,stamp:1,position:PositionConfig.Hand,force:4},
	{id:32,name:"钩镰枪",type:ItemType.EQUIPMENT,rarity:3,stamp:1,position:PositionConfig.Hand,force:3},
	{id:33,name:"三尖两刃刀",type:ItemType.EQUIPMENT,rarity:3,stamp:1,position:PositionConfig.Hand,force:3},
	{id:34,name:"铁蒺藜骨朵",type:ItemType.EQUIPMENT,rarity:3,stamp:1,position:PositionConfig.Hand,force:3},
	{id:35,name:"眉尖刀",type:ItemType.EQUIPMENT,rarity:3,stamp:1,position:PositionConfig.Hand,force:3},
	{id:36,name:"龙舌弓",type:ItemType.EQUIPMENT,rarity:2,stamp:1,position:PositionConfig.Hand,force:2},
	{id:37,name:"铁戟",type:ItemType.EQUIPMENT,rarity:2,stamp:1,position:PositionConfig.Hand,force:2},
	{id:38,name:"大斧",type:ItemType.EQUIPMENT,rarity:2,stamp:1,position:PositionConfig.Hand,force:2},
	{id:39,name:"飞锤",type:ItemType.EQUIPMENT,rarity:2,stamp:1,position:PositionConfig.Hand,force:2},
	{id:40,name:"铁鞭",type:ItemType.EQUIPMENT,rarity:1,stamp:1,position:PositionConfig.Hand,force:1},
	{id:41,name:"铁锤",type:ItemType.EQUIPMENT,rarity:1,stamp:1,position:PositionConfig.Hand,force:1},
	{id:42,name:"铁刀",type:ItemType.EQUIPMENT,rarity:1,stamp:1,position:PositionConfig.Hand,force:1},
	{id:43,name:"铁枪",type:ItemType.EQUIPMENT,rarity:1,stamp:1,position:PositionConfig.Hand,force:1},
	{id:44,name:"兵法二十四篇",type:ItemType.EQUIPMENT,rarity:10,stamp:1,position:PositionConfig.Accessories,intelligence:10},
	{id:45,name:"孙子兵法",type:ItemType.EQUIPMENT,rarity:9,stamp:1,position:PositionConfig.Accessories,intelligence:9},
	{id:46,name:"孟徳新书",type:ItemType.EQUIPMENT,rarity:9,stamp:1,position:PositionConfig.Accessories,intelligence:9},
	{id:47,name:"遁甲天书",type:ItemType.EQUIPMENT,rarity:8,stamp:1,position:PositionConfig.Accessories,intelligence:8},
	{id:48,name:"太平要术",type:ItemType.EQUIPMENT,rarity:8,stamp:1,position:PositionConfig.Accessories,intelligence:8},
	{id:49,name:"六韬",type:ItemType.EQUIPMENT,rarity:7,stamp:1,position:PositionConfig.Accessories,intelligence:7},
	{id:50,name:"三略",type:ItemType.EQUIPMENT,rarity:7,stamp:1,position:PositionConfig.Accessories,intelligence:7},
	{id:51,name:"春秋",type:ItemType.EQUIPMENT,rarity:6,stamp:1,position:PositionConfig.Accessories,intelligence:6},
	{id:52,name:"左传",type:ItemType.EQUIPMENT,rarity:6,stamp:1,position:PositionConfig.Accessories,intelligence:6},
	{id:53,name:"战国策",type:ItemType.EQUIPMENT,rarity:5,stamp:1,position:PositionConfig.Accessories,intelligence:5},
	{id:54,name:"汉书",type:ItemType.EQUIPMENT,rarity:4,stamp:1,position:PositionConfig.Accessories,intelligence:4},
	{id:55,name:"红羽扇",type:ItemType.EQUIPMENT,rarity:3,stamp:1,position:PositionConfig.Hand,intelligence:3},
	{id:56,name:"蓝羽扇 ",type:ItemType.EQUIPMENT,rarity:3,stamp:1,position:PositionConfig.Hand,intelligence:3},
	{id:57,name:"七星剑",type:ItemType.EQUIPMENT,rarity:2,stamp:1,position:PositionConfig.Hand,intelligence:2},
	{id:58,name:"圣者宝剑",type:ItemType.EQUIPMENT,rarity:2,stamp:1,position:PositionConfig.Hand,intelligence:2},
	{id:59,name:"圣拂尘",type:ItemType.EQUIPMENT,rarity:1,stamp:1,position:PositionConfig.Hand,intelligence:1},
	{id:60,name:"暗拂尘",type:ItemType.EQUIPMENT,rarity:1,stamp:1,position:PositionConfig.Hand,intelligence:1},
	{id:61,name:"乌金甲",type:ItemType.EQUIPMENT,rarity:10,stamp:1,position:PositionConfig.Body,command:10},
	{id:62,name:"黄金铠",type:ItemType.EQUIPMENT,rarity:9,stamp:1,position:PositionConfig.Body,command:9},
	{id:63,name:"白银铠",type:ItemType.EQUIPMENT,rarity:8,stamp:1,position:PositionConfig.Body,command:8},
	{id:64,name:"龙鳞铠",type:ItemType.EQUIPMENT,rarity:7,stamp:1,position:PositionConfig.Body,command:7},
	{id:65,name:"连环铠",type:ItemType.EQUIPMENT,rarity:6,stamp:1,position:PositionConfig.Body,command:6},
	{id:66,name:"锁子甲",type:ItemType.EQUIPMENT,rarity:5,stamp:1,position:PositionConfig.Body,command:5},
	{id:67,name:"柳叶甲",type:ItemType.EQUIPMENT,rarity:4,stamp:1,position:PositionConfig.Body,command:4},
	{id:68,name:"玲珑铠",type:ItemType.EQUIPMENT,rarity:3,stamp:1,position:PositionConfig.Body,command:3},
	{id:69,name:"青铜铠",type:ItemType.EQUIPMENT,rarity:2,stamp:1,position:PositionConfig.Body,command:2},
	{id:70,name:"铁铠",type:ItemType.EQUIPMENT,rarity:1,stamp:1,position:PositionConfig.Body,command:1},
	{id:71,name:"赤兔",type:ItemType.EQUIPMENT,rarity:10,stamp:1,position:PositionConfig.Foot,agility:10},
	{id:72,name:"乌骓",type:ItemType.EQUIPMENT,rarity:9,stamp:1,position:PositionConfig.Foot,agility:9},
	{id:73,name:"的卢",type:ItemType.EQUIPMENT,rarity:8,stamp:1,position:PositionConfig.Foot,agility:8},
	{id:74,name:"汗血宝马",type:ItemType.EQUIPMENT,rarity:7,stamp:1,position:PositionConfig.Foot,agility:7},
	{id:75,name:"绝影",type:ItemType.EQUIPMENT,rarity:6,stamp:1,position:PositionConfig.Foot,agility:6},
	{id:76,name:"爪黄飞电",type:ItemType.EQUIPMENT,rarity:5,stamp:1,position:PositionConfig.Foot,agility:5},
	{id:77,name:"照夜玉狮子",type:ItemType.EQUIPMENT,rarity:4,stamp:1,position:PositionConfig.Foot,agility:4},
	{id:78,name:"黄骠马",type:ItemType.EQUIPMENT,rarity:3,stamp:1,position:PositionConfig.Foot,agility:3},
	{id:79,name:"大宛马",type:ItemType.EQUIPMENT,rarity:2,stamp:1,position:PositionConfig.Foot,agility:2},
	{id:80,name:"白马",type:ItemType.EQUIPMENT,rarity:1,stamp:1,position:PositionConfig.Foot,agility:1},
	{id:81,name:"凤翅紫金冠",type:ItemType.EQUIPMENT,rarity:10,stamp:1,position:PositionConfig.Head,luck:10},
	{id:82,name:"黄金盔",type:ItemType.EQUIPMENT,rarity:9,stamp:1,position:PositionConfig.Head,luck:9},
	{id:83,name:"夜明盔",type:ItemType.EQUIPMENT,rarity:8,stamp:1,position:PositionConfig.Head,luck:8},
	{id:84,name:"将军盔",type:ItemType.EQUIPMENT,rarity:7,stamp:1,position:PositionConfig.Head,luck:7},
	{id:85,name:"通天冠",type:ItemType.EQUIPMENT,rarity:6,stamp:1,position:PositionConfig.Head,luck:6},
	{id:86,name:"五梁冠",type:ItemType.EQUIPMENT,rarity:5,stamp:1,position:PositionConfig.Head,luck:5},
	{id:87,name:"铜盔",type:ItemType.EQUIPMENT,rarity:4,stamp:1,position:PositionConfig.Head,luck:4},
	{id:88,name:"铁盔",type:ItemType.EQUIPMENT,rarity:3,stamp:1,position:PositionConfig.Head,luck:3},
	{id:89,name:"皮盔",type:ItemType.EQUIPMENT,rarity:2,stamp:1,position:PositionConfig.Head,luck:2},
	{id:90,name:"头巾",type:ItemType.EQUIPMENT,rarity:1,stamp:1,position:PositionConfig.Head,luck:1},
	{id:91,name:"延寿符",type:ItemType.EQUIPMENT,rarity:10,stamp:1,position:PositionConfig.Accessories,life:10},
	{id:92,name:"鸡毛掸子",type:ItemType.EQUIPMENT,rarity:10,position:PositionConfig.Hand,force:15,spirit:10},
	{id:93,name:"心灵鸡汤",type:ItemType.EQUIPMENT,rarity:10,position:PositionConfig.Accessories,intelligence:15,morale:10},
	{id:94,name:"飞翅服",type:ItemType.EQUIPMENT,rarity:10,position:PositionConfig.Body,command:15,movePower:2},
	{id:95,name:"拜年鸡",type:ItemType.EQUIPMENT,rarity:10,position:PositionConfig.Foot,agility:15,attack:10},
	{id:96,name:"鸡冠帽",type:ItemType.EQUIPMENT,rarity:10,position:PositionConfig.Head,luck:15,breakout:10},
	
	{id:97,name:"红战石",rarity:5,soldierType:[SoldierType.Physical, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.RED,stoneValue:[
	{p:100,list:[{skill:1,p:5},{skill:3,p:5},{skill:4,p:5},{skill:5,p:10},{skill:6,p:10},{skill:8,p:5},{skill:9,p:5},{skill:10,p:5},
	{skill:26,p:10},{skill:31,p:10},{skill:32,p:10},{skill:33,p:10},{skill:39,p:5},{skill:41,p:10},{skill:42,p:10},{skill:43,p:10},
	{skill:44,p:10},{skill:50,p:10},{skill:52,p:10},{skill:56,p:10},{skill:67,p:10},{skill:71,p:5},{skill:72,p:10},{skill:73,p:10},
	{skill:74,p:10},{skill:75,p:10},{skill:77,p:5},{skill:78,p:5},{skill:80,p:5},{skill:81,p:5},{skill:82,p:5},{skill:83,p:5},
	{skill:85,p:5},{skill:86,p:10},{skill:87,p:10},{skill:91,p:10}]},
	{p:0,list:[]},
	{p:0,list:[]}]},//物理攻击宝石
	{id:98,name:"红法石",rarity:5,soldierType:[SoldierType.Magic, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.RED,stoneValue:[
	{p:100,list:[{skill:11,p:5},{skill:12,p:5},{skill:14,p:10},{skill:16,p:5},{skill:17,p:5},{skill:18,p:10},{skill:19,p:10},
	{skill:23,p:10},{skill:24,p:5},{skill:25,p:10},{skill:27,p:10},{skill:76,p:10},{skill:79,p:5},{skill:80,p:5},{skill:84,p:5}]},
	{p:0,list:[]},
	{p:0,list:[]}]},//法术攻击宝石
	{id:99,name:"红辅石",rarity:5,soldierType:[SoldierType.Physical, SoldierType.Magic, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.RED,stoneValue:[
	{p:100,list:[{skill:2,p:5},{skill:7,p:10},{skill:13,p:5},{skill:15,p:10},{skill:20,p:10},{skill:21,p:10},{skill:22,p:10},
	{skill:28,p:10},{skill:29,p:10},{skill:30,p:10},{skill:34,p:10},{skill:35,p:10},{skill:36,p:10},{skill:37,p:10},{skill:38,p:10},
	{skill:40,p:10},{skill:45,p:10},{skill:51,p:10},{skill:53,p:10},{skill:57,p:10},{skill:58,p:10},{skill:59,p:10},{skill:60,p:10},
	{skill:61,p:10},{skill:62,p:10},{skill:63,p:10},{skill:64,p:10},{skill:65,p:10},{skill:66,p:10},{skill:68,p:10},{skill:69,p:10},
	{skill:70,p:10},{skill:88,p:10},{skill:89,p:10},{skill:90,p:10},{skill:92,p:5},{skill:93,p:5},{skill:94,p:5},{skill:98,p:10}]},
	{p:0,list:[]},
	{p:0,list:[]}]},//除攻击类和内政类宝石
	{id:100,name:"红佐石",rarity:5,soldierType:[],type:ItemType.STONE,stoneType:StoneType.RED,stoneValue:[
	{p:100,list:[{skill:46,p:10},{skill:47,p:10},{skill:48,p:10},{skill:49,p:10},{skill:95,p:10},{skill:96,p:10},{skill:97,p:10},{skill:100,p:10}]},
	{p:0,list:[]},
	{p:0,list:[]}]},//内政宝石
	{id:101,name:"紫战石",rarity:4,soldierType:[SoldierType.Physical, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.PURPLE,stoneValue:[
	{p:20,list:[{skill:1,p:5},{skill:3,p:5},{skill:4,p:5},{skill:5,p:10},{skill:6,p:10},{skill:8,p:5},{skill:9,p:5},{skill:10,p:5},
	{skill:26,p:10},{skill:31,p:10},{skill:32,p:10},{skill:33,p:10},{skill:39,p:5},{skill:41,p:10},{skill:42,p:10},{skill:43,p:10},
	{skill:44,p:10},{skill:50,p:10},{skill:52,p:10},{skill:56,p:10},{skill:67,p:10},{skill:71,p:5},{skill:72,p:10},{skill:73,p:10},
	{skill:74,p:10},{skill:75,p:10},{skill:77,p:5},{skill:78,p:5},{skill:80,p:5},{skill:81,p:5},{skill:82,p:5},{skill:83,p:5},
	{skill:85,p:5},{skill:86,p:10},{skill:87,p:10},{skill:91,p:10}]},
	{p:80,list:[{force:5,p:10},{command:5,p:10},{agility:5,p:10},{force:4,p:50},{command:4,p:50},{agility:4,p:50},{force:3,p:100},{command:3,p:100},{agility:3,p:100}]},
	{p:0,list:[]}]},
	{id:102,name:"紫法石",rarity:4,soldierType:[SoldierType.Magic, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.PURPLE,stoneValue:[
	{p:20,list:[{skill:11,p:5},{skill:12,p:5},{skill:14,p:10},{skill:16,p:5},{skill:17,p:5},{skill:18,p:10},{skill:19,p:10},
	{skill:23,p:10},{skill:24,p:5},{skill:25,p:10},{skill:27,p:10},{skill:76,p:10},{skill:79,p:5},{skill:80,p:5},{skill:84,p:5}]},
	{p:80,list:[{intelligence:5,p:10},{command:5,p:10},{luck:5,p:10},{intelligence:4,p:50},{command:4,p:50},{luck:4,p:50},{intelligence:3,p:100},{command:3,p:100},{luck:3,p:100}]},
	{p:0,list:[]}]},
	{id:103,name:"紫辅石",rarity:4,soldierType:[SoldierType.Physical, SoldierType.Magic, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.PURPLE,stoneValue:[
	{p:20,list:[{skill:2,p:5},{skill:7,p:10},{skill:13,p:5},{skill:15,p:10},{skill:20,p:10},{skill:21,p:10},{skill:22,p:10},
	{skill:28,p:10},{skill:29,p:10},{skill:30,p:10},{skill:34,p:10},{skill:35,p:10},{skill:36,p:10},{skill:37,p:10},{skill:38,p:10},
	{skill:40,p:10},{skill:45,p:10},{skill:51,p:10},{skill:53,p:10},{skill:57,p:10},{skill:58,p:10},{skill:59,p:10},{skill:60,p:10},
	{skill:61,p:10},{skill:62,p:10},{skill:63,p:10},{skill:64,p:10},{skill:65,p:10},{skill:66,p:10},{skill:68,p:10},{skill:69,p:10},
	{skill:70,p:10},{skill:88,p:10},{skill:89,p:10},{skill:90,p:10},{skill:92,p:5},{skill:93,p:5},{skill:94,p:5},{skill:98,p:10}]},
	{p:80,list:[{intelligence:5,p:10},{agility:5,p:10},{luck:5,p:10},{intelligence:4,p:50},{agility:4,p:50},{luck:4,p:50},{intelligence:3,p:100},{agility:3,p:100},{luck:3,p:100}]},
	{p:0,list:[]}]},
	{id:104,name:"紫佐石",rarity:4,soldierType:[],type:ItemType.STONE,stoneType:StoneType.PURPLE,stoneValue:[
	{p:20,list:[{skill:46,p:10},{skill:47,p:10},{skill:48,p:10},{skill:49,p:10},{skill:95,p:10},{skill:96,p:10},{skill:97,p:10},{skill:100,p:10}]},
	{p:80,list:[{agility:5,p:10},{luck:5,p:10},{command:5,p:10},{agility:4,p:50},{luck:4,p:50},{command:4,p:50},{agility:3,p:100},{luck:3,p:100},{command:3,p:100}]},
	{p:0,list:[]}]},
	{id:105,name:"蓝战石",rarity:3,soldierType:[SoldierType.Physical, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.BLUE,stoneValue:[
	{p:10,list:[{skill:5,p:10},{skill:6,p:10},{skill:26,p:10},{skill:31,p:10},{skill:32,p:10},{skill:33,p:10},{skill:41,p:10},{skill:42,p:10},{skill:43,p:10},
	{skill:44,p:10},{skill:50,p:10},{skill:52,p:10},{skill:56,p:10},{skill:67,p:10},{skill:72,p:10},{skill:73,p:10},
	{skill:74,p:10},{skill:75,p:10},{skill:86,p:10},{skill:87,p:10},{skill:91,p:10}]},
	{p:0,list:[]},
	{p:90,list:[{attack:6,p:10},{defense:6,p:10},{breakout:6,p:10},{attack:5,p:50},{defense:5,p:50},{breakout:5,p:50},{attack:4,p:100},{defense:4,p:100},{breakout:4,p:100},{attack:3,p:100},{defense:3,p:100},{breakout:3,p:100}]}]},
	{id:106,name:"蓝法石",rarity:3,soldierType:[SoldierType.Magic, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.BLUE,stoneValue:[
	{p:10,list:[{skill:14,p:10},{skill:18,p:10},{skill:19,p:10},{skill:23,p:10},{skill:25,p:10},{skill:27,p:10},{skill:76,p:10}]},
	{p:0,list:[]},
	{p:90,list:[{spirit:6,p:10},{defense:6,p:10},{morale:6,p:10},{spirit:5,p:50},{defense:5,p:50},{morale:5,p:50},{spirit:4,p:100},{defense:4,p:100},{morale:4,p:100},{spirit:3,p:100},{defense:3,p:100},{morale:3,p:100}]}]},
	{id:107,name:"蓝辅石",rarity:3,soldierType:[SoldierType.Physical, SoldierType.Magic, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.BLUE,stoneValue:[
	{p:10,list:[{skill:7,p:10},{skill:15,p:10},{skill:20,p:10},{skill:21,p:10},{skill:22,p:10},
	{skill:28,p:10},{skill:29,p:10},{skill:30,p:10},{skill:34,p:10},{skill:35,p:10},{skill:36,p:10},{skill:37,p:10},{skill:38,p:10},
	{skill:40,p:10},{skill:45,p:10},{skill:51,p:10},{skill:53,p:10},{skill:57,p:10},{skill:58,p:10},{skill:59,p:10},{skill:60,p:10},
	{skill:61,p:10},{skill:62,p:10},{skill:63,p:10},{skill:64,p:10},{skill:65,p:10},{skill:66,p:10},{skill:68,p:10},{skill:69,p:10},
	{skill:70,p:10},{skill:88,p:10},{skill:89,p:10},{skill:90,p:10},{skill:98,p:10}]},
	{p:0,list:[]},
	{p:90,list:[{spirit:6,p:10},{breakout:6,p:10},{morale:6,p:10},{spirit:5,p:50},{breakout:5,p:50},{morale:5,p:50},{spirit:4,p:100},{breakout:4,p:100},{morale:4,p:100},{spirit:3,p:100},{breakout:3,p:100},{morale:3,p:100}]}]},
	{id:108,name:"蓝佐石",rarity:3,soldierType:[],type:ItemType.STONE,stoneType:StoneType.BLUE,stoneValue:[
	{p:10,list:[{skill:46,p:10},{skill:47,p:10},{skill:48,p:10},{skill:49,p:10},{skill:95,p:10},{skill:96,p:10},{skill:97,p:10},{skill:100,p:10}]},
	{p:0,list:[]},
	{p:90,list:[{breakout:6,p:10},{morale:6,p:10},{defense:6,p:10},{breakout:5,p:50},{morale:5,p:50},{defense:5,p:50},{breakout:4,p:100},{morale:4,p:100},{defense:4,p:100},{breakout:3,p:100},{morale:3,p:100},{defense:3,p:100}]}]},
	{id:109,name:"绿战石",rarity:2,soldierType:[SoldierType.Physical, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.GREEN,stoneValue:[
	{p:0,list:[]},
	{p:100,list:[{force:3,p:10},{command:3,p:10},{agility:3,p:10},{force:2,p:50},{command:2,p:50},{agility:2,p:50},{force:1,p:100},{command:1,p:100},{agility:1,p:100}]},
	{p:0,list:[]}]},
	{id:110,name:"绿法石",rarity:2,soldierType:[SoldierType.Magic, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.GREEN,stoneValue:[
	{p:0,list:[]},
	{p:100,list:[{intelligence:3,p:10},{command:3,p:10},{luck:3,p:10},{intelligence:2,p:50},{command:2,p:50},{luck:2,p:50},{intelligence:1,p:100},{command:1,p:100},{luck:1,p:100}]},
	{p:0,list:[]}]},
	{id:111,name:"绿辅石",rarity:2,soldierType:[SoldierType.Physical, SoldierType.Magic, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.GREEN,stoneValue:[
	{p:0,list:[]},
	{p:100,list:[{intelligence:3,p:10},{agility:3,p:10},{luck:3,p:10},{intelligence:2,p:50},{agility:2,p:50},{luck:2,p:50},{intelligence:1,p:100},{agility:1,p:100},{luck:1,p:100}]},
	{p:0,list:[]}]},
	{id:112,name:"绿佐石",rarity:2,soldierType:[],type:ItemType.STONE,stoneType:StoneType.GREEN,stoneValue:[
	{p:0,list:[]},
	{p:100,list:[{agility:3,p:10},{luck:3,p:10},{command:3,p:10},{agility:2,p:50},{luck:2,p:50},{command:2,p:50},{agility:1,p:100},{luck:1,p:100},{command:1,p:100}]},
	{p:0,list:[]}]},
	{id:113,name:"黄战石",rarity:1,soldierType:[SoldierType.Physical, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.YELLOW,stoneValue:[
	{p:0,list:[]},
	{p:0,list:[]},
	{p:100,list:[{attack:4,p:10},{defense:4,p:10},{breakout:4,p:10},{attack:3,p:50},{defense:3,p:50},{breakout:3,p:50},{attack:2,p:100},{defense:2,p:100},{breakout:2,p:100},{attack:1,p:100},{defense:1,p:100},{breakout:1,p:100}]}]},
	{id:114,name:"黄法石",rarity:1,soldierType:[SoldierType.Magic, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.YELLOW,stoneValue:[
	{p:0,
	list:[]},
	{p:0,list:[]},
	{p:100,list:[{spirit:4,p:10},{defense:4,p:10},{morale:4,p:10},{spirit:3,p:50},{defense:3,p:50},{morale:3,p:50},{spirit:2,p:100},{defense:2,p:100},{morale:2,p:100},{spirit:1,p:100},{defense:1,p:100},{morale:1,p:100}]}]},
	{id:115,name:"黄辅石",rarity:1,soldierType:[SoldierType.Physical, SoldierType.Magic, SoldierType.Comprehensive],type:ItemType.STONE,stoneType:StoneType.YELLOW,stoneValue:[
	{p:0,list:[]},
	{p:0,list:[]},
	{p:100,list:[{spirit:4,p:10},{breakout:4,p:10},{morale:4,p:10},{spirit:3,p:50},{breakout:3,p:50},{morale:3,p:50},{spirit:2,p:100},{breakout:2,p:100},{morale:2,p:100},{spirit:1,p:100},{breakout:1,p:100},{morale:1,p:100}]}]},
	{id:116,name:"黄佐石",rarity:1,soldierType:[],type:ItemType.STONE,stoneType:StoneType.YELLOW,stoneValue:[
	{p:0,list:[]},
	{p:0,list:[]},
	{p:100,list:[{breakout:4,p:10},{morale:4,p:10},{defense:4,p:10},{breakout:3,p:50},{morale:3,p:50},{defense:3,p:50},{breakout:2,p:100},{morale:2,p:100},{defense:2,p:100},{breakout:1,p:100},{morale:1,p:100},{defense:1,p:100}]}]},
	
	{id:117,name:"打狗棒",type:ItemType.EQUIPMENT,rarity:10,position:PositionConfig.Hand,force:15,breakout:10},
	{id:118,name:"打狗棒法",type:ItemType.EQUIPMENT,rarity:10,position:PositionConfig.Accessories,intelligence:15,morale:10},
	{id:119,name:"天狗披风",type:ItemType.EQUIPMENT,rarity:10,position:PositionConfig.Body,command:15,defense:10},
	{id:120,name:"哮天犬",type:ItemType.EQUIPMENT,rarity:10,position:PositionConfig.Foot,agility:15,force:5},
	{id:121,name:"烈犬战盔",type:ItemType.EQUIPMENT,rarity:10,position:PositionConfig.Head,luck:15,attack:10},
	
];