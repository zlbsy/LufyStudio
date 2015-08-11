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
//PositionConfig.Hand 武器
//PositionConfig.Hand 武器
var ItemDatas = [
	{id:1,name:"金创药",type:ItemType.HEAL},
	{id:2,name:"征兵符",type:ItemType.ENLIST},
	{id:3,name:"兵符",type:ItemType.SUPPLEMENT},
	{id:4,name:"短刀",type:ItemType.EQUIPMENT,subType:1,position:PositionConfig.Hand,maxLv:10,init:{attack:10},add:{attack:5}},
	{id:5,name:"皮铠",type:ItemType.EQUIPMENT,position:PositionConfig.Body,maxLv:10,init:{defense:10},add:{defense:5}},
	{id:6,name:"皮帽",type:ItemType.EQUIPMENT,position:PositionConfig.Head,maxLv:10,init:{magicDefense:10},add:{magicDefense:5}},
	{id:7,name:"布鞋",type:ItemType.EQUIPMENT,position:PositionConfig.Foot,maxLv:10,init:{dodge:10},add:{dodge:5}},
	{id:8,name:"皮盾",type:ItemType.EQUIPMENT,position:PositionConfig.Accessories,maxLv:10,init:{breakout:10},add:{breakout:5}}
];