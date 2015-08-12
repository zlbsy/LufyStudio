var SkillType = {
	/**
	 * 攻击时发动
	 **/
	ATTACK:"attack",
	/**
	 * 被攻击时发动,伤害减低
	 **/
	HERT:"hert",
	/**
	 * 反击时发动
	 **/
	BACK_ATTACK:"backAttack"
	 
};
var SkillSubType = {
	/**
	 * 自身状态改变
	 **/
	SELF_AID:"selfAid",
	/**
	 * 令敌军状态改变
	 **/
	ENEMY_AID:"enemyAid",
	/**
	 * 攻击次数
	 **/
	ATTACK_COUNT:"attackCount",
	/**
	 * 攻击范围
	 **/
	ATTACK_RECT:"attackRect",
	/**
	 * 伤害减少
	 **/
	HERT_MINUS:"hertMinus",
	/**
	 * 免疫异常攻击或法术
	 **/
	WAKE:"wake",
	 
};
var SkillsData = [
{id:1,name:"雷霆怒击",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[1,0.75,0.5],probability:100},
{id:2,name:"万众一心",type:SkillType.HERT,hert:0,probability:100},
{id:3,name:"隔山打牛",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_RECT],rects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100},
{id:4,name:"天下无双",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT,SkillSubType.ENEMY_AID],attacks:[1,1],aids:[[StrategyType.DefenseAid],[StrategyType.DefenseAid]],probability:100},
];