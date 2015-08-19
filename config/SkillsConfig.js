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
{id:1,name:"雷霆怒击(张飞)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[1,1,1],probability:50,explanation:"{probability}几率连续攻击三次。"},
{id:2,name:"真龙之气(刘备,曹操,孙权,曹丕,司马炎)",type:SkillType.HERT,subType:[SkillSubType.HERT_MINUS],hert:0,probability:30,explanation:"{probability}%几率将受到的伤害减少为0。"},
{id:3,name:"隔山打牛(关羽)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_RECT],rects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率使攻击波及到目标敌人相邻的敌军。"},
{id:4,name:"天下无双(吕布)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT,SkillSubType.ENEMY_AID],attacks:[1.2,1.2],aids:[3,4,6],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率重击敌军两次，并且使得目标敌人相邻的敌军防御力降低。"},
{id:5,name:"愈战愈勇(颜良)",type:SkillType.ATTACK_END,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0}],probability:40,explanation:"{probability}几率在攻击结束时提升自身攻击力。"},
{id:5,name:"愈战愈坚(文丑)",type:SkillType.ATTACK_END,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0}],probability:40,explanation:"{probability}几率在攻击结束时提升自身攻击力。"},
{id:6,name:"鼓舞(张辽)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率在回合开始时提升自身以及周围友军的士气。"},
{id:7,name:"苍龙苏醒(赵云)",type:SkillType.ATTACK_END,subType:[SkillSubType.GET_HP],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率在攻击时使敌人降低一种能力，且自身及周围友军不会陷入任何不良状态。"},
{id:8,name:"幻影(黄忠)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率给对方2倍攻击，且使对方陷入昏迷状态。"},
{id:9,name:"噬血(马超)",type:SkillType.ATTACK_END,subType:[SkillSubType.VAMPIRE],vampire:0.5,aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率给在物理攻击对方时将敌军兵力转换为己方兵力。"},
{id:10,name:"神算(诸葛亮)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率法术攻击时进行暴击，且免疫一切法术伤害。"},
{id:11,name:"火神(周瑜)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率使用火系策略伤害加倍，且另对方进入燃烧状态。"},
{id:12,name:"医神(华佗)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率对自身及相邻友军进行治疗。"},
{id:13,name:"反间计(陆逊)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:60,explanation:"{probability}几率在法术攻击对方时将敌军兵力转换为己方兵力。"},
{id:14,name:"识破(司马懿)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率令自身及相邻的友军收到的法术伤害减半。"},
{id:15,name:"连珠(法正)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率法术连击。"},
{id:16,name:"连环计(庞统)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率法术攻击时不断波及其他相邻的敌军。"},
{id:17,name:"鬼策(贾诩)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率1.5倍法术暴击，且降低敌军状态。"},
{id:18,name:"鬼谋(郭嘉)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率1.5倍法术暴击，且令敌军陷入不良状态。"},
{id:19,name:"逆嗜血(许褚)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:30,explanation:"{probability}几率反击时将敌军兵力转化为自身兵力。"},
{id:20,name:"反弹(典韦)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率被攻击时令敌军也受到一定程度伤害。"},
{id:21,name:"血路(廖化)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率降低自身及周围被俘虏概率。"},
{id:22,name:"十面埋伏(程昱)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率在使用法术攻击敌军时，如果攻击目标的周围有友军存在，可以借助友军的力量提高法术伤害，友军越多，加成越多。"},
{id:23,name:"决胜(荀彧)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:40,explanation:"{probability}几率在使用法术攻击敌军时2倍暴击，且不消化MP。"},
{id:24,name:"仿效(荀攸)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率在可以模仿周围友军的计策。"},
{id:25,name:"毒箭(夏侯渊)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:30,explanation:"{probability}几率在使用弓箭类兵种攻击时令敌军中毒。"},
{id:26,name:"毒计(徐庶)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率在使用法术攻击时令敌军中毒。"},
{id:27,name:"灵敏(魏延)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:40,explanation:"{probability}几率攻击结束时提升自身爆发力。"},
{id:28,name:"猛攻(姜维)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:30,explanation:"{probability}几率回合开始时提升自身及周围友军的攻击力。"},
{id:29,name:"坚固(邓艾)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:30,explanation:"{probability}几率回合开始时提升自身及周围友军的防御力。"},
{id:30,name:"暗行(吕蒙)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率无视地形和敌军阻挡进行移动。"},
{id:31,name:"劫营(甘宁)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率从敌人背后或侧面攻击时攻击有加成。"},
{id:32,name:"乱射(太史慈)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:30,explanation:"{probability}几率使用弓箭类兵种攻击时,使攻击波及到目标敌人相邻的敌军。"},
{id:33,name:"破弩(徐晃)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率无视弓兵类兵种的克制效果。"},
{id:34,name:"破步(于禁)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率无视步兵类兵种的克制效果。"},
{id:35,name:"破骑(张郃)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率无视骑兵类兵种的克制效果。"},
{id:36,name:"破兵(庞德)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率无视骑步弓三类兵种的克制效果。"},
{id:37,name:"仁者(鲁肃)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率回合开始时为己方随机一人征集一些兵力。"},
{id:38,name:"陷阵营(高顺)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率相邻敌军大于1时攻击有加成，且相邻敌军越多攻击加成越多。"},
{id:39,name:"强行(刘晔)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率移动力增加。"},
{id:40,name:"霸王(孙策)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率1.5倍暴击，如果目标敌军武力低于己方，则令其攻击力降低。"},
{id:41,name:"逆击(华雄)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率反击两次。"},
{id:42,name:"大喝(关兴)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率1.5倍暴击，大喝的强大气势令敌军无法反击。"},
{id:43,name:"冲锋(张苞)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率1.5倍暴击，附带穿透效果。"},
{id:44,name:"节粮(马良)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"战斗中兵粮消耗减半。"},
{id:45,name:"商业(糜竺)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"内政商业加成。"},
{id:46,name:"技术(伊籍)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"内政技术加成。"},
{id:47,name:"农业(简雍)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"内政农业加成。"},
{id:48,name:"征兵(陈到)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"内政征兵加成。"},
{id:49,name:"顽强(周泰)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"士兵越少防御越高。"},
{id:50,name:"死战(凌统)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"士兵越少攻击越高。"},
{id:51,name:"顺势(程普)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"致命一击发动时有几率将攻击提高一倍。"},
{id:52,name:"忍耐(黄盖)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"无视体力影响，保持原有攻击力。"},
{id:53,name:"倾国(貂蝉)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"使用女兵兵种时,受到攻击时有几率将伤害减半,倾国的美色让敌军无法动弹,对女将无效。"},
{id:54,name:"倾城(小乔)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"使用女兵兵种时,受到攻击时有几率将伤害减半,对女将无效。"},
{id:55,name:"巾帼(孙尚香)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"有几率。"},
{id:56,name:"巾帼(马云绿)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"有几率。"},
{id:57,name:"羁绊(马忠)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"有几率附带定身效果。"},
{id:58,name:"羁绊(夏侯敦)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"有几率附带定身效果。"},
];