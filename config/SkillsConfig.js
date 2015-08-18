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
	/**
	 * 吸血
	 **/
	VAMPIRE:"vampire",
};
var SkillsData = [
{id:1,name:"雷霆怒击(张飞)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[1,0.75,0.5],probability:100,explanation:"{probability}几率攻击三次，但攻击伤害依次减少。"},
{id:2,name:"真龙之气(刘备)",type:SkillType.HERT,subType:[SkillSubType.HERT_MINUS],hert:0,probability:100,explanation:"{probability}%几率将受到的伤害减少为0。"},
{id:3,name:"隔山打牛(关羽)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_RECT],rects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率使攻击波及到目标敌人相邻的敌军。"},
{id:4,name:"天下无双(吕布)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT,SkillSubType.ENEMY_AID],attacks:[1.2,1.2],aids:[3,4,6],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率重击敌军两次，并且使得目标敌人相邻的敌军防御力降低。"},
{id:5,name:"愈战愈勇(颜良)",type:SkillType.ATTACK_END,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率在攻击结束时提升自身攻击力。"},
{id:5,name:"愈战愈坚(文丑)",type:SkillType.ATTACK_END,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率在攻击结束时提升自身攻击力。"},
{id:6,name:"鼓舞(张辽)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率在回合开始时提升自身以及周围友军的士气。"},
{id:7,name:"苍龙苏醒(赵云)",type:SkillType.ATTACK_END,subType:[SkillSubType.GET_HP],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率在攻击时使敌人降低一种能力，且自身及周围友军不会陷入任何不良状态。"},
{id:8,name:"幻影(黄忠)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率给对方2倍攻击，且使对方陷入昏迷状态。"},
{id:9,name:"噬血(马超)",type:SkillType.ATTACK_END,subType:[SkillSubType.VAMPIRE],vampire:0.5,aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率给在物理攻击对方时将敌军兵力转换为己方兵力。"},
{id:10,name:"智神(诸葛亮)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率法术攻击时进行暴击，且免疫一切法术伤害。"},
{id:11,name:"火神(周瑜)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率使用火系策略伤害加倍，且另对方进入燃烧状态。"},
{id:12,name:"医神(华佗)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率对自身及相邻友军进行治疗。"},
{id:13,name:"反间计(陆逊)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率在法术攻击对方时将敌军兵力转换为己方兵力。"},
{id:14,name:"识破(司马懿)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率令自身及相邻的友军收到的法术伤害减半。"},
{id:15,name:"连珠(法正)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率法术连击。"},
{id:16,name:"连环计(庞统)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率法术攻击时不断波及其他相邻的敌军。"},
{id:17,name:"智圣(贾诩)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率法术攻击时令降低敌军状态。"},
{id:18,name:"智囊(郭嘉)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率法术攻击时令敌军陷入不良状态。"},
{id:19,name:"逆嗜血(许褚)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率受攻击时将敌军兵力转化为自身兵力。"},
{id:20,name:"反弹(典韦)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率被攻击时另地方也受到一定程度伤害。"},
{id:21,name:"血路(廖化)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率降低被俘虏概率。"},
];