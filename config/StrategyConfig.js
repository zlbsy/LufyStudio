/*  <Strategy1>
	<Type ex="1火2风3水4地5升降能力6毒&定身&混乱&禁咒7觉醒8补给">1</Type>
	<Belong>1</Belong>
	<Img>h1</Img>
	<Icon>huo_sign</Icon>
	<Num>7</Num>
	<At>2</At>
	<Cost>10</Cost>
	<Hert>0.8</Hert>
	<Name>小火计</Name>
	<Range>
	    <List>0,-4</List>
	    <List>0,-3</List>
	    <List>0,-2</List>
	    <List>0,-1</List>
	    <List>0,1</List>
	    <List>0,2</List>
	    <List>0,3</List>
	    <List>0,4</List>
	</Range>
	<Att>
	    <List>0,0</List>
	</Att>
    </Strategy1>
    {id:1,name:"策略名",type:StrategyType,belong:适用对象所属,
	image:效果图片,
	icon:表示icon,
	cost:耗费mp,
	hert:伤害强度参数,
	rangeAttack:攻击距离,
	rangeAttackTarget:攻击范围,
	explanation:详解
	}*/
var StrategyType = {
	Fire:1,//火
	Wind:2,//风
	Warter:3//水
};
var StrategyEffectType = {
	Attack:1,//攻击
	Defense:2,//防御
	Aid:3//辅助
};
var StrategyDatas = [
	{id:1,name:"小火计",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"h1",
	icon:"huo_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:2,name:"小风计1",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"f1",
	icon:"feng_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:3,name:"小风计2",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"f1",
	icon:"feng_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:4,name:"小风计3",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"f1",
	icon:"feng_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:5,name:"小风计4",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"f1",
	icon:"feng_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:6,name:"小风计5",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"f1",
	icon:"feng_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:7,name:"小风计6",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"f1",
	icon:"feng_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:8,name:"小风计9",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"f1",
	icon:"feng_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:9,name:"小风计7",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"f1",
	icon:"feng_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:10,name:"小风计8",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"f1",
	icon:"feng_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	}
];