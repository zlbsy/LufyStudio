var SkillType = {
	/**
	 * 攻击时发动
	 **/
	ATTACK:"attack",
	/**
	 * 攻击结束时发动
	 **/
	ATTACK_END:"attackEnd",
	/**
	 * 法术攻击时发动
	 **/
	STRATEGY_ATTACK:"strategyAttack",
	/**
	 * 法术攻击结束时发动
	 **/
	STRATEGY_ATTACK_END:"strategyAttackEnd",
	/**
	 * 被攻击时发动
	 **/
	HERT:"hert",
	/**
	 * 反击时发动
	 **/
	BACK_ATTACK:"backAttack",
	/**
	 * 反击结束时发动
	 **/
	BACK_ATTACK_END:"backAttackEnd",
	/**
	 * 回合开始时发动
	 **/
	BOUT_START:"boutStart",
	/**
	 * 数据生成时
	 **/
	CREATE:"create",
	/**
	 * 特定时刻，被动调用
	 **/
	NULL:"null"
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
	 * 法术攻击次数
	 **/
	STRATEGY_COUNT:"strategyCount",
	/**
	 * 攻击范围
	 **/
	ATTACK_RECT:"attackRect",
	/**
	 * 伤害减少
	 **/
	HERT_MINUS:"hertMinus",
	/**
	 * 法术伤害减少
	 **/
	STRATEGY_HERT_MINUS:"strategyHertMinus",
	/**
	 * 免疫异常攻击或法术
	 **/
	WAKE:"wake",
	/**
	 * 吸血
	 **/
	VAMPIRE:"vampire",
	/**
	 * 弹射
	 **/
	BOUNCE:"bounce",
	/**
	 * 蔓延
	 **/
	SPREAD:"spread",
	/**
	 * 劫营
	 **/
	SURPRISE:"surprise",
	/**
	 * 埋伏
	 **/
	AMBUSH:"ambush",
	/**
	 * 反埋伏
	 **/
	AMBUSH_INVERSE:"ambush_inverse",
	/**
	 * 穿透
	 **/
	PENETRATE:"penetrate",
	/**
	 * 突击(移动时无视敌军阻挡)
	 **/
	MOVE_ASSAULT:"move_assault",
	/**
	 * 恶路(移动时无视地形)
	 **/
	MOVE_KNOW:"move_know",
	/**
	 * 无视相克
	 **/
	IGNORE_RESTRAINT:"ignore_restraint",
	/**
	 * 节约(兵粮消耗减半)
	 **/
	THRIFT:"thrift",
	/**
	 * 节约MP
	 **/
	THRIFT_MP:"thrift_mp",
	/**
	 * 属性增加固定值
	 **/
	STATUS_ADD_NUM:"status_add_num",
	/**
	 * 属性增加百分比值
	 **/
	STATUS_ADD_PROP:"status_add_prop",
	/**
	 * 征集(和招募区别)
	 **/
	ENLIST_SKILL:"enlist_skill",
	/**
	 * 商业
	 **/
	BUSINESS:"business",
	/**
	 * 农业
	 **/
	AGRICULTURE:"agriculture",
	/**
	 * 技术
	 **/
	TECHNOLOGY:"technology",
	/**
	 * 治安
	 **/
	POLICE:"police",
	/**
	 * 招募
	 **/
	ENLIST:"enlist",
};
var SkillsData = [
{id:1,name:"雷霆怒击(张飞)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[1,1,1],probability:50,explanation:"{probability}几率连续攻击三次。"},
{id:2,name:"真龙之气(刘备,曹操,孙权,曹丕,司马炎)",type:SkillType.HERT,subType:[SkillSubType.HERT_MINUS],hert:0,probability:30,explanation:"{probability}%几率将受到的伤害减少为0。"},
{id:3,name:"隔山打牛(关羽)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_RECT],rects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率使攻击波及到目标敌人相邻的敌军。"},
{id:4,name:"天下无双(吕布)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT,SkillSubType.ENEMY_AID],attacks:[1.2,1.2],aids:[4],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率重击敌军两次，并且使得目标敌人相邻的敌军防御力降低。"},
{id:5,name:"愈战愈勇(颜良,杜预)",type:SkillType.ATTACK_END,subType:[SkillSubType.SELF_AID],aids:[1],aidCount:1,aidRects:[{x:0,y:0}],probability:40,explanation:"{probability}几率在攻击结束时提升自身攻击力。"},
{id:6,name:"愈战愈坚(文丑,郝昭)",type:SkillType.ATTACK_END,subType:[SkillSubType.SELF_AID],aids:[3],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率在攻击结束时提升自身防御力。"},
{id:7,name:"鼓舞(张辽,张任)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率在回合开始时提升自身以及周围友军的士气。"},
{id:8,name:"苍龙苏醒(赵云)",type:SkillType.ATTACK,subType:[SkillSubType.ENEMY_AID,SkillSubType.WAKE],aids:[2,4,6,8,10],aidCount:1,aidRects:[{x:0,y:0}],probability:50,explanation:"{probability}几率在攻击时使敌人降低一种能力，且自身及周围友军不会陷入任何不良状态。"},
{id:9,name:"幻影(黄忠)",type:SkillType.ATTACK,subType:[SkillSubType.ENEMY_AID,SkillSubType.ATTACK_COUNT],attacks:[2],aids:[21],aidCount:1,aidRects:[{x:0,y:0}],probability:30,explanation:"{probability}几率给对方2倍攻击，且使对方陷入昏迷状态。"},
{id:10,name:"噬血(马超)",type:SkillType.ATTACK_END,subType:[SkillSubType.VAMPIRE],vampire:0.5,probability:50,explanation:"{probability}几率给在物理攻击对方时将敌军兵力转换为己方兵力。"},
{id:11,name:"神算(诸葛亮)",type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT,SkillSubType.STRATEGY_HERT_MINUS],strategy_attacks:[1.5],hert:0.5,minusRects:[],probability:100,explanation:"法术攻击时必暴击，我军全员法术伤害减半。"},
{id:12,name:"火神(周瑜)",type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT,SkillSubType.ENEMY_AID],strategy_attacks:[2],condition:{type:"StrategyType",value:StrategyType.Fire},aids:[25],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率使用火系策略伤害加倍，且另对方进入燃烧状态。"},
{id:13,name:"医神(华佗)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率对自身及相邻友军进行治疗。"},
{id:14,name:"反间计(陆逊,陆抗)",type:SkillType.STRATEGY_ATTACK_END,subType:[SkillSubType.VAMPIRE],vampire:0.5,probability:100,explanation:"{probability}几率在法术攻击对方时将敌军兵力转换为己方兵力。"},
{id:15,name:"识破(司马懿)",type:SkillType.NULL,subType:[SkillSubType.STRATEGY_HERT_MINUS],hert:0.5,minusRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率令自身及相邻的友军受到的法术伤害减半。"},
{id:16,name:"连珠(法正)",type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT],strategy_attacks:[1,1],probability:100,explanation:"{probability}几率法术连击。"},
{id:17,name:"连环计(庞统)",type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.SPREAD],speadProbability:0.25,speadRects:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],probability:100,explanation:"{probability}几率法术攻击时不断蔓延到其他相邻的敌军。"},
{id:18,name:"鬼策(贾诩)",type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT,SkillSubType.ENEMY_AID],strategy_attacks:[1.5],aids:[2,4,6,8,10],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率1.5倍法术暴击，且降低敌军状态。"},
{id:19,name:"鬼谋(郭嘉)",type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT,SkillSubType.ENEMY_AID],strategy_attacks:[1.5],aids:[21,22,23,24,25],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率1.5倍法术暴击，且令敌军陷入不良状态。"},
{id:20,name:"逆嗜血(许褚)",type:SkillType.BACK_ATTACK_END,subType:[SkillSubType.VAMPIRE],vampire:0.5,probability:30,explanation:"{probability}几率反击时将敌军兵力转化为自身兵力。"},
{id:21,name:"反弹(典韦)",type:SkillType.HERT,subType:[SkillSubType.BOUNCE],bounce:0.5,probability:100,explanation:"{probability}几率被攻击时令敌军也受到一定程度伤害。"},
{id:22,name:"血路(廖化)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"降低自身及周围被俘虏概率。"},
{id:23,name:"十面埋伏(程昱)",type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.AMBUSH],ambush:0.2,ambushRects:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率在使用法术攻击敌军时，如果攻击目标的周围有友军存在，可以借助友军的力量提高法术伤害，友军越多，加成越多。"},
{id:24,name:"决胜(荀彧)",type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT,SkillSubType.THRIFT_MP],strategy_attacks:[2],aidCount:1,thrift:1,probability:100,explanation:"{probability}几率在使用法术攻击敌军时2倍暴击，且不消化MP。"},
{id:25,name:"摆尾(荀攸)",type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.PENETRATE],probability:100,explanation:"使用法术攻击时附带穿透效果。"},
{id:26,name:"毒箭(夏侯渊)",type:SkillType.ATTACK,subType:[SkillSubType.ENEMY_AID],condition:{type:"AttackType",value:AttackType.FAR},aids:[23],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率在使用弓箭类兵种攻击时令敌军中毒。"},
{id:27,name:"毒计(徐庶,审配)",type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.ENEMY_AID],aids:[23],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率在使用法术攻击时令敌军中毒。"},
{id:28,name:"灵敏(魏延,文鸳)",type:SkillType.ATTACK_END,subType:[SkillSubType.SELF_AID],aids:[9],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率攻击结束时提升自身爆发力。"},
{id:29,name:"猛攻(姜维)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[1],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率回合开始时提升自身及周围友军的攻击力。"},
{id:30,name:"坚固(邓艾)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[3],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率回合开始时提升自身及周围友军的防御力。"},
{id:31,name:"暗行(吕蒙)",type:SkillType.CREATE,subType:[SkillSubType.MOVE_ASSAULT,SkillSubType.MOVE_KNOW],probability:100,explanation:"无视地形和敌军阻挡进行移动。"},
{id:32,name:"劫营(甘宁)",type:SkillType.ATTACK,subType:[SkillSubType.SURPRISE],attacks:[1.5,1.2],probability:100,explanation:"从敌人背后或侧面攻击时攻击有加成,不包括斜角攻击。"},
{id:33,name:"乱射(太史慈)",type:SkillType.ATTACK,subType:[SkillSubType.SPREAD],condition:{type:"AttackType",value:AttackType.FAR},speadProbability:0.25,speadRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率使用弓箭类兵种攻击时,使攻击波及到目标敌人相邻的敌军。"},
{id:34,name:"破弩(徐晃)",type:SkillType.NULL,subType:[SkillSubType.IGNORE_RESTRAINT],ignore:{type:"AttackType",value:AttackType.FAR},probability:100,explanation:"无视弓兵类兵种的克制效果。"},
{id:35,name:"破步(于禁)",type:SkillType.NULL,subType:[SkillSubType.IGNORE_RESTRAINT],ignore:{type:"MoveType",value:MoveType.INFANTRY},probability:100,explanation:"无视步兵类兵种的克制效果。"},
{id:36,name:"破骑(张郃)",type:SkillType.NULL,subType:[SkillSubType.IGNORE_RESTRAINT],ignore:{type:"MoveType",value:MoveType.CAVALRY},probability:100,explanation:"无视骑兵类兵种的克制效果。"},
{id:37,name:"破兵(庞德)",type:SkillType.NULL,subType:[SkillSubType.IGNORE_RESTRAINT],ignore:{type:"SoldierType",value:SoldierType.Physical},probability:100,explanation:"无视物理类兵种的克制效果。"},
{id:38,name:"仁者(鲁肃,羊祜)",type:SkillType.BOUT_START,subType:[SkillSubType.ENLIST_SKILL],enlist_value:0.05,enlist_count:1,probability:100,explanation:"{probability}几率回合开始时为己方随机一人征集一些兵力。"},
{id:39,name:"陷阵营(高顺)",type:SkillType.ATTACK,subType:[SkillSubType.AMBUSH_INVERSE],ambush:1.2,ambushRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率相邻敌军大于1时攻击有加成，且相邻敌军越多攻击加成越多。"},
{id:40,name:"强行(刘晔)",type:SkillType.CREATE,subType:[SkillSubType.STATUS_ADD_NUM],status_name:"movePower",status_value:2,probability:100,explanation:"移动力增加。"},
{id:41,name:"小霸王(孙策)",type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT,SkillSubType.ENEMY_AID],condition:{type:"StatusCompare",name:"force",value:1},attacks:[1.5],aids:[2],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率对武力低于自己的敌军，进行1.5倍暴击，且令其攻击力降低。"},
{id:42,name:"逆击(华雄)",type:SkillType.BACK_ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[0.75,0.75],probability:100,explanation:"{probability}几率反击两次。"},
{id:43,name:"大喝(关兴)",type:SkillType.ATTACK,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率1.5倍暴击，大喝的强大气势令敌军无法反击。"},
{id:44,name:"冲锋(张苞)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率1.5倍暴击，附带穿透效果。"},
{id:45,name:"节粮(马良,郭淮,张紘)",type:SkillType.NULL,subType:[SkillSubType.THRIFT],explanation:"粮食消耗减半。"},
{id:46,name:"商业(糜竺)",type:SkillType.NULL,subType:[SkillSubType.BUSINESS],explanation:"内政商业加成。"},
{id:47,name:"技术(伊籍)",type:SkillType.NULL,subType:[SkillSubType.TECHNOLOGY],explanation:"内政技术加成。"},
{id:48,name:"农业(简雍)",type:SkillType.NULL,subType:[SkillSubType.AGRICULTURE],explanation:"内政农业加成。"},
{id:49,name:"征兵(陈到)",type:SkillType.NULL,subType:[SkillSubType.ENLIST],explanation:"内政征兵加成。"},
{id:50,name:"顽强(周泰)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"反击穿透。"},
{id:51,name:"死战(凌统)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"士兵越少攻击越高。"},
{id:52,name:"顺势(程普)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:30,explanation:"致命一击发动时有几率将攻击提高一倍。"},
{id:53,name:"忍耐(黄盖)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"士兵越少防御越高。"},
{id:54,name:"倾国(貂蝉)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"使用女兵兵种时,受到攻击时有几率将伤害减半,在攻击时其倾国的美色让敌军无法动弹(定身效果)。"},
{id:55,name:"倾城(大乔,小乔)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"使用女兵兵种时,受到攻击时有几率将伤害减半。"},
{id:56,name:"巾帼(孙尚香)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"巾帼不让须眉，每次攻击必定双击。"},
{id:57,name:"偷天换日(马云绿)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"几率将受到的攻击伤害转为MP伤害,且每回合自动回复一定的MP。"},
{id:58,name:"羁绊(马忠,潘璋)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"有几率附带定身效果。"},
{id:59,name:"运气(夏侯敦)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"增强运气。"},
{id:60,name:"防御(关平)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"增强防御。"},
{id:61,name:"敏捷(乐进)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"增强敏捷。"},
{id:62,name:"攻击(文鸯)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"增强攻击。"},
{id:63,name:"精神(陈登,邓芝)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"增强精神。"},
{id:64,name:"厚皮(周仓)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"增大兵力。"},
{id:65,name:"借力(甄氏)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:30,explanation:"有几率在反击时借用对方的攻击力。"},
{id:66,name:"熟路(吕凯)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:30,explanation:"所有地形消耗1点移动力。"},
{id:67,name:"反客为主(孙坚)",type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:30,explanation:"几率反击时给予敌军主动攻击的伤害值。"},
{id:68,name:"治安(刘封)",type:SkillType.NULL,subType:[SkillSubType.POLICE],explanation:"内政治安加成。"},
{id:69,name:"飞刀(祝融)",type:SkillType.NULL,subType:[SkillSubType.POLICE],explanation:"近战兵种攻击范围增强。"},
{id:70,name:"辅佐(黄月英)",type:SkillType.NULL,subType:[SkillSubType.POLICE],explanation:"回合开始时,为自身及周围所有相邻部队提升一种能力。"},
];