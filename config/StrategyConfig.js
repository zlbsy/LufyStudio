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
	explanation:详解[火，风，水，地]
	}*/
var StrategyType = {
	Fire:1,//火
	Wind:2,//风
	Warter:3,//水
	Earth:4,//地
	AttackAid:5,//攻击变化
	DefenseAid:6,//防御变化
	ApiritAid:7,//精神变化
	BreakoutAid:8,//暴发变化
	MoraleAid:9,//士气变化
	Poison:10,//毒
	Fixed:11,//定身
	Chaos:12,//混乱
	BanIncantation:13,//禁咒
	Burn:14,//燃烧
	Wake:15,//觉醒
	Supply:16,//补给
	Vampire:17,//吸血
};
var StrategyTypeToString = {};
for(var key in StrategyType){
	StrategyTypeToString[StrategyType[key]] = "status_" + key;
}

var StrategyEffectType = {
	Attack:1,//攻击
	Status:2,//异常状态
	Aid:3,//升降能力
	Wake:4,//觉醒
	Supply:5,//补给
};
var StrategyDatas = [
	{id:1,name:"加攻",belong:Belong.SELF,type:StrategyType.AttackAid,effectType:StrategyEffectType.Aid,image:"attack_up_effect",
	icon:"attack_up_sign",
	se:"Se_strategy_heal2",
	cost:6,
	hert:0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:2,name:"降攻",belong:Belong.ENEMY,type:StrategyType.AttackAid,effectType:StrategyEffectType.Aid,image:"attack_down_effect",
	icon:"attack_down_sign",
	se:"Se_strategy_hert2",
	cost:6,
	hert:-0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:3,name:"加防",belong:Belong.SELF,type:StrategyType.DefenseAid,effectType:StrategyEffectType.Aid,image:"def_up_effect",
	icon:"def_up_sign",
	se:"Se_strategy_heal2",
	cost:6,
	hert:0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:4,name:"降防",belong:Belong.ENEMY,type:StrategyType.DefenseAid,effectType:StrategyEffectType.Aid,image:"def_down_effect",
	icon:"def_down_sign",
	se:"Se_strategy_hert2",
	cost:6,
	hert:-0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:5,name:"加士气",belong:Belong.SELF,type:StrategyType.MoraleAid,effectType:StrategyEffectType.Aid,image:"morale_up_effect",
	icon:"morale_up_sign",
	se:"Se_strategy_heal2",
	cost:6,
	hert:0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:6,name:"降士气",belong:Belong.ENEMY,type:StrategyType.MoraleAid,effectType:StrategyEffectType.Aid,image:"morale_down_effect",
	icon:"morale_down_sign",
	se:"Se_strategy_hert2",
	cost:6,
	hert:-0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:7,name:"加精神",belong:Belong.SELF,type:StrategyType.ApiritAid,effectType:StrategyEffectType.Aid,image:"spirit_up_effect",
	icon:"spirit_up_sign",
	se:"Se_strategy_heal2",
	cost:6,
	hert:0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:8,name:"降精神",belong:Belong.ENEMY,type:StrategyType.ApiritAid,effectType:StrategyEffectType.Aid,image:"spirit_down_effect",
	icon:"spirit_down_sign",
	se:"Se_strategy_hert2",
	cost:6,
	hert:-0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:9,name:"加爆发",belong:Belong.SELF,type:StrategyType.BreakoutAid,effectType:StrategyEffectType.Aid,image:"breakout_up_effect",
	icon:"breakout_up_sign",
	se:"Se_strategy_heal2",
	cost:6,
	hert:0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:10,name:"降爆发",belong:Belong.ENEMY,type:StrategyType.BreakoutAid,effectType:StrategyEffectType.Aid,image:"breakout_down_effect",
	icon:"breakout_down_sign",
	se:"Se_strategy_hert2",
	cost:6,
	hert:-0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:11,name:"群体加攻",belong:Belong.SELF,type:StrategyType.AttackAid,effectType:StrategyEffectType.Aid,image:"attack_up_effect",
	icon:"attack_up_sign",
	se:"Se_strategy_heal2",
	cost:12,
	hert:0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:12,name:"群体降攻",belong:Belong.ENEMY,type:StrategyType.AttackAid,effectType:StrategyEffectType.Aid,image:"attack_down_effect",
	icon:"attack_down_sign",
	se:"Se_strategy_hert2",
	cost:12,
	hert:-0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:13,name:"群体加防",belong:Belong.SELF,type:StrategyType.DefenseAid,effectType:StrategyEffectType.Aid,image:"def_up_effect",
	icon:"def_up_sign",
	se:"Se_strategy_heal2",
	cost:12,
	hert:0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:14,name:"群体降防",belong:Belong.ENEMY,type:StrategyType.DefenseAid,effectType:StrategyEffectType.Aid,image:"def_down_effect",
	icon:"def_down_sign",
	se:"Se_strategy_hert2",
	cost:12,
	hert:-0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:15,name:"群体加士气",belong:Belong.SELF,type:StrategyType.MoraleAid,effectType:StrategyEffectType.Aid,image:"morale_up_effect",
	icon:"morale_up_sign",
	se:"Se_strategy_heal2",
	cost:12,
	hert:0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:16,name:"群体降士气",belong:Belong.ENEMY,type:StrategyType.MoraleAid,effectType:StrategyEffectType.Aid,image:"morale_down_effect",
	icon:"morale_down_sign",
	se:"Se_strategy_hert2",
	cost:12,
	hert:-0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:17,name:"群体加精神",belong:Belong.SELF,type:StrategyType.ApiritAid,effectType:StrategyEffectType.Aid,image:"spirit_up_effect",
	icon:"spirit_up_sign",
	se:"Se_strategy_heal2",
	cost:12,
	hert:0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:18,name:"群体降精神",belong:Belong.ENEMY,type:StrategyType.ApiritAid,effectType:StrategyEffectType.Aid,image:"spirit_down_effect",
	icon:"spirit_down_sign",
	se:"Se_strategy_hert2",
	cost:12,
	hert:-0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:19,name:"群体加爆发",belong:Belong.SELF,type:StrategyType.BreakoutAid,effectType:StrategyEffectType.Aid,image:"breakout_up_effect",
	icon:"breakout_up_sign",
	se:"Se_strategy_heal2",
	cost:12,
	hert:0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:20,name:"群体降爆发",belong:Belong.ENEMY,type:StrategyType.BreakoutAid,effectType:StrategyEffectType.Aid,image:"breakout_down_effect",
	icon:"breakout_down_sign",
	se:"Se_strategy_hert2",
	cost:12,
	hert:-0.2,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:21,name:"混乱",belong:Belong.ENEMY,type:StrategyType.Chaos,effectType:StrategyEffectType.Status,image:"chaos_effect",
	icon:"chaos_sign",
	se:"Se_strategy_hert1",
	cost:8,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:22,name:"定身",belong:Belong.ENEMY,type:StrategyType.Fixed,effectType:StrategyEffectType.Status,image:"fixed_effect",
	icon:"fixed_sign",
	se:"Se_strategy_hert2",
	cost:8,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:23,name:"毒",belong:Belong.ENEMY,type:StrategyType.Poison,effectType:StrategyEffectType.Status,image:"du_effect",
	icon:"du_sign",
	se:"Se_strategy_hert1",
	cost:8,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:24,name:"禁咒",belong:Belong.ENEMY,type:StrategyType.BanIncantation,effectType:StrategyEffectType.Status,image:"jinzhou_effect",
	icon:"jinzhou_sign",
	se:"Se_strategy_hert2",
	cost:8,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:25,name:"燃烧",belong:Belong.ENEMY,type:StrategyType.Burn,effectType:StrategyEffectType.Status,image:"shao_effect",
	icon:"shao_sign",
	se:"Se_strategy_hert2",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:26,name:"群体混乱",belong:Belong.ENEMY,type:StrategyType.Chaos,effectType:StrategyEffectType.Status,image:"chaos_effect",
	icon:"chaos_sign",
	se:"Se_strategy_hert1",
	cost:14,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:27,name:"群体定身",belong:Belong.ENEMY,type:StrategyType.Fixed,effectType:StrategyEffectType.Status,image:"fixed_effect",
	icon:"fixed_sign",
	se:"Se_strategy_hert2",
	cost:14,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:28,name:"群体毒",belong:Belong.ENEMY,type:StrategyType.Fixed,effectType:StrategyEffectType.Status,image:"du_effect",
	icon:"du_sign",
	se:"Se_strategy_hert1",
	cost:14,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:29,name:"群体禁咒",belong:Belong.ENEMY,type:StrategyType.Fixed,effectType:StrategyEffectType.Status,image:"jinzhou_effect",
	icon:"jinzhou_sign",
	se:"Se_strategy_hert2",
	cost:14,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:30,name:"群体燃烧",belong:Belong.ENEMY,type:StrategyType.Fixed,effectType:StrategyEffectType.Status,image:"shao_effect",
	icon:"shao_sign",
	se:"Se_strategy_hert2",
	cost:12,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:31,name:"觉醒",belong:Belong.SELF,type:StrategyType.Wake,effectType:StrategyEffectType.Wake,image:"wake_effect",
	icon:"wake_sign",
	se:"Se_strategy_heal2",
	cost:8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:32,name:"大觉醒",belong:Belong.SELF,type:StrategyType.Wake,effectType:StrategyEffectType.Wake,image:"wake_effect",
	icon:"wake_sign",
	se:"Se_strategy_heal2",
	cost:14 ,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:33,name:"小火计",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"fire_effect",
	icon:"fire_sign",
	se:"Se_strategy_fire",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:2},{x:-1,y:-2},{x:1,y:-2},{x:-1,y:2},{x:2,y:1},{x:-2,y:-1},{x:2,y:-1},{x:-2,y:1}],
	rangeAttackTarget:[{x:0,y:0}],
	weathers:["sunny", "cloud"],
	explanation:""
	},
	{id:34,name:"小风计",belong:Belong.ENEMY,type:StrategyType.Wind,effectType:StrategyEffectType.Attack,image:"feng_effect",
	icon:"feng_sign",
	se:"Se_strategy_wind",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:2},{x:-1,y:-2},{x:1,y:-2},{x:-1,y:2},{x:2,y:1},{x:-2,y:-1},{x:2,y:-1},{x:-2,y:1}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:35,name:"小水计",belong:Belong.ENEMY,type:StrategyType.Warter,effectType:StrategyEffectType.Attack,image:"shui_effect",
	icon:"shui_sign",
	se:"Se_strategy_warter",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:2},{x:-1,y:-2},{x:1,y:-2},{x:-1,y:2},{x:2,y:1},{x:-2,y:-1},{x:2,y:-1},{x:-2,y:1}],
	rangeAttackTarget:[{x:0,y:0}],
	weathers:[],
	explanation:""
	},
	{id:36,name:"小石计",belong:Belong.ENEMY,type:StrategyType.Earth,effectType:StrategyEffectType.Attack,image:"shi_effect",
	icon:"shi_sign",
	se:"Se_strategy_earth",
	cost:6,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:2},{x:-1,y:-2},{x:1,y:-2},{x:-1,y:2},{x:2,y:1},{x:-2,y:-1},{x:2,y:-1},{x:-2,y:1}],
	rangeAttackTarget:[{x:0,y:0}],
	weathers:[],
	explanation:""
	},
	{id:37,name:"小火阵",belong:Belong.ENEMY,type:StrategyType.Fire,effectType:StrategyEffectType.Attack,image:"fire_effect",
	icon:"fire_sign",
	se:"Se_strategy_fire",
	cost:12,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	weathers:["sunny", "cloud"],
	explanation:""
	},
	{id:38,name:"小风阵",belong:Belong.ENEMY,type:StrategyType.Wind,effectType:StrategyEffectType.Attack,image:"feng_effect",
	icon:"feng_sign",
	se:"Se_strategy_wind",
	cost:12,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:39,name:"小水阵",belong:Belong.ENEMY,type:StrategyType.Warter,effectType:StrategyEffectType.Attack,image:"shui_effect",
	icon:"shui_sign",
	se:"Se_strategy_warter",
	cost:12,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	weathers:[],
	explanation:""
	},
	{id:40,name:"小石阵",belong:Belong.ENEMY,type:StrategyType.Earth,effectType:StrategyEffectType.Attack,image:"shi_effect",
	icon:"shi_sign",
	se:"Se_strategy_earth",
	cost:12,
	hert:0.8,
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	weathers:[],
	explanation:""
	},
	{id:41,name:"小回复",belong:Belong.SELF,type:StrategyType.Supply,effectType:StrategyEffectType.Supply,image:"hp_effect",
	icon:"hp_sign",
	se:"Se_strategy_heal1",
	cost:6,
	troops:50,
	minTroops:50,
	maxTroops:100,
	proportion:0.1,
	wounded:0,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:2},{x:-1,y:-2},{x:1,y:-2},{x:-1,y:2},{x:2,y:1},{x:-2,y:-1},{x:2,y:-1},{x:-2,y:1}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:42,name:"小治疗",belong:Belong.SELF,type:StrategyType.Supply,effectType:StrategyEffectType.Supply,image:"heal_effect",
	icon:"heal_sign",
	se:"Se_strategy_heal1",
	cost:6,
	troops:0,
	wounded:50,
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:2},{x:-1,y:-2},{x:1,y:-2},{x:-1,y:2},{x:2,y:1},{x:-2,y:-1},{x:2,y:-1},{x:-2,y:1}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:43,name:"大回复",belong:Belong.SELF,type:StrategyType.Supply,effectType:StrategyEffectType.Supply,image:"hp_effect",
	icon:"hp_sign",
	se:"Se_strategy_heal1",
	cost:10,
	troops:150,
	wounded:0,
	rangeAttack:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:44,name:"大治疗",belong:Belong.SELF,type:StrategyType.Supply,effectType:StrategyEffectType.Supply,image:"heal_effect",
	icon:"heal_sign",
	se:"Se_strategy_heal1",
	cost:10,
	troops:0,
	wounded:150,
	rangeAttack:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:45,name:"群体回复",belong:Belong.SELF,type:StrategyType.Supply,effectType:StrategyEffectType.Supply,image:"hp_effect",
	icon:"hp_sign",
	se:"Se_strategy_heal1",
	cost:12,
	troops:50,
	wounded:0,
	rangeAttack:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:46,name:"群体治疗",belong:Belong.SELF,type:StrategyType.Supply,effectType:StrategyEffectType.Supply,image:"heal_effect",
	icon:"heal_sign",
	se:"Se_strategy_heal1",
	cost:12,
	troops:0,
	wounded:50,
	rangeAttack:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:2,y:0},{x:-2,y:0},{x:0,y:2},{x:0,y:-2}],
	rangeAttackTarget:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],
	explanation:""
	},
	{id:47,name:"奋起",belong:Belong.SELF,type:StrategyType.AttackAid,effectType:StrategyEffectType.Aid,image:"up_effect",
	icon:"up_sign",
	se:"Se_strategy_heal2",
	cost:6,
	hert:0.2,
	rangeAttack:[{x:0,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:48,name:"奋起",belong:Belong.SELF,type:StrategyType.ApiritAid,effectType:StrategyEffectType.Aid,image:"up_effect",
	icon:"up_sign",
	se:"Se_strategy_heal2",
	cost:6,
	hert:0.2,
	rangeAttack:[{x:0,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},
	{id:49,name:"吸血",belong:Belong.SELF,type:StrategyType.Vampire,effectType:StrategyEffectType.Attack,image:"vampire_effect",
	icon:"vampire_sign",
	se:"Se_strategy_hert1",
	cost:6,
	hert:0.2,
	rangeAttack:[{x:0,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	explanation:""
	},

];