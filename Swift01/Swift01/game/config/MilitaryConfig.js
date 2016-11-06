var MilitaryType = {
	AID:1,
	HEAL:2,
	STRATEGY_ATTACK:3
};
var MilitaryDatas = [
	{id:1,name:"炎海",belong:Belong.ENEMY,
	type:[MilitaryType.AID, MilitaryType.STRATEGY_ATTACK],
	imageCount:4,
	image:"flame",
	aids:[25],aidCount:1,
	strategys:[33],strategyCount:1,
	},
	{id:2,name:"援军",belong:Belong.ENEMY,
	type:[MilitaryType.HEAL],
	imageCount:4,
	image:"attack_down_effect",
	icon:"attack_down_sign",
	se:"Se_strategy_hert2",
	cost:6,
	hert:-0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	}
];