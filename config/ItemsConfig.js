var ItemType = {
	HEAL:"heal"/*治疗伤兵*/
	,ENLIST:"enlist"/*招募新兵*/
	,SUPPLEMENT:"supplement"/*从后备兵中补充*/
	,EQUIPMENT:"equipment"/*装备*/
};
var ItemSubType = {
	
};
//PositionConfig.Hand 武器
//PositionConfig.Body 防御
//PositionConfig.Head 魔防增加
//PositionConfig.Foot 武器
//PositionConfig.Accessories 武器
var ItemDatas = [
	{id:1,name:"金创药",type:ItemType.HEAL},
	{id:2,name:"金创药",type:ItemType.HEAL},
	{id:3,name:"金创药",type:ItemType.HEAL},
	{id:4,name:"金创药",type:ItemType.HEAL},
	{id:5,name:"金创药",type:ItemType.HEAL},
	{id:6,name:"征兵符",type:ItemType.ENLIST},
	{id:7,name:"征兵符",type:ItemType.ENLIST},
	{id:8,name:"征兵符",type:ItemType.ENLIST},
	{id:9,name:"征兵符",type:ItemType.ENLIST},
	{id:10,name:"征兵符",type:ItemType.ENLIST},
	{id:11,name:"兵符",type:ItemType.SUPPLEMENT},
	{id:12,name:"兵符",type:ItemType.SUPPLEMENT},
	{id:13,name:"兵符",type:ItemType.SUPPLEMENT},
	{id:14,name:"兵符",type:ItemType.SUPPLEMENT},
	{id:15,name:"兵符",type:ItemType.SUPPLEMENT},
	{id:16,name:"青龙偃月刀",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:8,attack:10},
	{id:17,name:"丈八蛇矛",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:9},
	{id:18,name:"方天画戟",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:10},
	{id:19,name:"虎头湛金枪",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:7},
	{id:20,name:"龙胆亮银枪",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:7},
	{id:21,name:"万石弓",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:7},
	{id:22,name:"铁脊蛇矛",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:5},
	{id:23,name:"七宝刀",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:24,name:"青釭剑",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:25,name:"倚天剑",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:26,name:"双铁戟",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:5},
	{id:27,name:"涯角枪",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:28,name:"古锭刀",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:5},
	{id:29,name:"钩镰枪",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:5},
	{id:30,name:"青铜鞭",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:5},
	{id:31,name:"双铁钩",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:5},
	{id:32,name:"古锭刀",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:5},
	{id:33,name:"铁戟",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:5},
	{id:34,name:"大斧",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:35,name:"三尖两刃刀",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:36,name:"铁鞭",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:37,name:"铁蒺藜骨朵",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:38,name:"流星锤",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:39,name:"飞锤",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:40,name:"铁锤",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:41,name:"眉尖刀",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,force:6},
	{id:42,name:"短刀",type:ItemType.EQUIPMENT,position:PositionConfig.Hand,attack:10},
	{id:43,name:"皮铠",type:ItemType.EQUIPMENT,position:PositionConfig.Body,defense:10},
	{id:44,name:"皮帽",type:ItemType.EQUIPMENT,position:PositionConfig.Head,magicDefense:10},
	{id:45,name:"布鞋",type:ItemType.EQUIPMENT,position:PositionConfig.Foot,dodge:10},
	{id:46,name:"皮盾",type:ItemType.EQUIPMENT,position:PositionConfig.Accessories,breakout:10}
];