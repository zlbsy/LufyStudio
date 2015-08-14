var SkillType = {
	/**
	 * 攻击时发动
	 **/
	ATTACK:"attack",
	/**
	 * 攻击时发动
	 **/
	ATTACK_END:"attackEnd",
	/**
	 * 被攻击时发动,伤害减低
	 **/
	HERT:"hert",
	/**
	 * 反击时发动
	 **/
	BACK_ATTACK:"backAttack",
	/**
	 * 回合开始时发动
	 **/
	BOUT_START:"boutStart"
	 
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
{id:1,name:"雷霆怒击(张飞)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[1,0.75,0.5],probability:100,explanation:"{probability}几率攻击三次，但攻击伤害依次减少。"},
{id:2,name:"万众一心(刘备)",type:SkillType.HERT,subType:[SkillSubType.HERT_MINUS],hert:0,probability:100,explanation:"{probability}%几率将受到的伤害减少为0。"},
{id:3,name:"隔山打牛(关羽)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_RECT],rects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率使攻击波及到目标敌人相邻的敌军。"},
{id:4,name:"天下无双(吕布)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT,SkillSubType.ENEMY_AID],attacks:[1.2,1.2],aids:[3,4,6],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率重击敌军两次，并且使得目标敌人相邻的敌军防御力降低。"},
{id:5,name:"愈战愈勇",type:SkillType.ATTACK_END,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率在攻击结束时提升自身攻击力。"},
{id:6,name:"鼓舞",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率在回合开始时提升自身以及周围友军的士气。"},
{id:7,name:"苍龙苏醒(赵云)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率在攻击时使敌人降低一种能力，且自身及周围友军不会陷入任何不良状态。"},
{id:8,name:"幻影(黄忠)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率给对方2倍攻击，且使对方陷入昏迷状态。"},
];