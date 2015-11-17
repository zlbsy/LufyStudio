var SoldierType = {
	Physical:0,//物理系
	Magic:1,//法术系
	Comprehensive:2//全能系
};
var MoveType = {
	INFANTRY:0,//步兵
	CAVALRY:1//骑兵
};
var EnlistSetting = {
	ENLIST_FROM:500,//征兵范围
	ENLIST_TO:1000//征兵范围
};
var TrainingSetting = {
	MAX:500//训练最大熟练度
};
/* {id:1,name:"兵种名",type:SoldierType,movetype:MoveType,movePower:移动力,
	property:兵种属性,
	equipment:可以装备的装备的种类,
	restrain:兵种相克[{id:兵种id,value:效果}],
	terrain:地形属性[{id:地形id,value:效果,moveCost:消耗移动里}],
	rangeAttack:攻击距离,
	rangeAttackTarget:攻击范围,
	strategy:策略[{id:策略id,lv:需要等级}],
	strategyHert:策略伤害系数
	explanation:详解
	}*/
var SoldierDatas = [
	{id:1,name:"君王",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"A",spirit:"A",defense:"A",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2},{id:3,value:80,moveCost:2},{id:4,value:100,moveCost:255}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	strategy:[{id:33,lv:0},{id:34,lv:0}],
	strategyHert:1,
	explanation:"explanation_jj",img:1,technology:500,
	next:[{id:2,lv:20}]
	},
	{id:2,name:"步兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:4,
	property:{attack:"B",spirit:"A",defense:"S",breakout:"B",morale:"B",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2},{id:4,value:100,moveCost:255}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	strategyHert:1,
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:5,lv:20}]
	},
	{id:3,name:"骑兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"S",spirit:"B",defense:"A",breakout:"B",morale:"B",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:4,name:"弓兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"B",morale:"S",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:5,name:"弓骑兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:6,name:"炮车",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:7,name:"武术家",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:8,name:"贼兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:9,name:"策士",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:10,name:"风水士",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:11,name:"道士",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:12,name:"骑马策士",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:13,name:"女兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:14,name:"海盗",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:15,name:"都督",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:8,lv:40}]
	},
	{id:16,name:"咒术士",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx"
	},
	{id:17,name:"西凉骑兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:18,name:"驯熊师",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:8,lv:40}]
	},
	{id:19,name:"驯虎师",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx"
	},
	{id:20,name:"青龙骑兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
	{id:21,name:"白虎步兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:8,lv:40}]
	},
	{id:22,name:"玄武弩兵",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx"
	},
	{id:23,name:"朱雀弩骑",type:SoldierType.Physical,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"A",defense:"B",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:2,value:110},{id:3,value:80}],
	terrain:[{id:1,value:110,moveCost:1},{id:2,value:80,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:0},{id:3,lv:3}],
	explanation:"explanation_yx",img:1,technology:500,
	next:[{id:7,lv:20}]
	},
];