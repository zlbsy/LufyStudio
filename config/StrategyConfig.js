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
var StrategyDatas = [
	{id:1,name:"小火计",belong:Belong.ENEMY,type:StrategyType.Fire,image:"h1",
	icon:"huo_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:2,name:"小风计",belong:Belong.ENEMY,type:StrategyType.Fire,image:"f1",
	icon:"feng_sign",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	}
];