var ItemType = {
	HEAL:"heal"/*治疗伤兵*/
	,ENLIST:"enlist"/*招募新兵*/
	,SUPPLEMENT:"supplement"/*从后备兵中补充*/
	,EQUIPMENT:"equipment"/*装备*/
};
var ItemsConfig = [
	{id:1,name:"金创药",type:ItemType.HEAL},
	{id:2,name:"征兵符",type:ItemType.ENLIST},
	{id:3,name:"兵符",type:ItemType.SUPPLEMENT},
	{id:4,name:"短刀",type:ItemType.EQUIPMENT,position:PositionConfig.Hand},
	{id:5,name:"皮铠",type:ItemType.EQUIPMENT,position:PositionConfig.Body},
	{id:6,name:"皮帽",type:ItemType.EQUIPMENT,position:PositionConfig.Head},
	{id:7,name:"布鞋",type:ItemType.EQUIPMENT,position:PositionConfig.Foot},
	{id:8,name:"皮盾",type:ItemType.EQUIPMENT,position:PositionConfig.Accessories}
];
