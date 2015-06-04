var SoldierType = {
	Physical:0,//物理系
	Magic:1,//法术系
	Comprehensive:2//全能系
};
var MoveType = {
	INFANTRY:0,//步兵
	CAVALRY:1//骑兵
};
/* {id:1,name:"兵种名",type:SoldierType,movetype:MoveType,distance:移动力,
	property:兵种属性,
	equipment:可以装备的装备的种类,
	restrain:兵种相克[{id:兵种id,value:效果}],
	terrain:地形属性[{id:地形id,value:效果,moveCost:消耗移动里}],
	rangeAttack:攻击距离,
	rangeAttackTarget:攻击范围,
	strategy:策略[{id:策略id,lv:需要等级}],
	explanation:详解
	}*/
var SoldierDatas = [
	{id:1,name:"英雄",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"A",spirit:"A",defense:"A",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,enlistPrice:500,
	next:[{id:2,lv:20}]
	},
	{id:2,name:"群雄",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"A",spirit:"A",defense:"A",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,enlistPrice:500,
	next:[{id:3,lv:40}]
	},
	{id:3,name:"群雄",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"A",spirit:"A",defense:"A",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx"
	},
	{id:4,name:"轻步兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"B",spirit:"A",defense:"S",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,enlistPrice:500,
	next:[{id:5,lv:20}]
	},
	{id:5,name:"重步兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"B",spirit:"A",defense:"S",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,enlistPrice:500,
	next:[{id:6,lv:40}]
	},
	{id:6,name:"近卫兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"B",spirit:"A",defense:"S",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx"
	},
	{id:7,name:"轻骑兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,enlistPrice:500,
	next:[{id:7,lv:20}]
	},
	{id:8,name:"重骑兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,enlistPrice:500,
	next:[{id:8,lv:40}]
	},
	{id:9,name:"虎豹兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx"
	},
	{id:10,name:"弓兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,enlistPrice:500,
	next:[{id:7,lv:20}]
	},
	{id:11,name:"弩兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,enlistPrice:500,
	next:[{id:8,lv:40}]
	},
	{id:12,name:"连弩兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx"
	},
];