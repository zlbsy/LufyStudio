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
	 * 法术攻击时发动
	 * 为了让法术连击可以叠加
	 **/
	STRATEGY_COUNT_ATTACK:"strategyCountAttack",
	/**
	 * 法术攻击结束时发动
	 **/
	STRATEGY_ATTACK_END:"strategyAttackEnd",
	/**
	 * 被攻击时发动
	 **/
	HERT:"hert",
	/**
	 * 命中判断时发动
	 **/
	ATTACK_HIT:"attack_hit",
	/**
	 * 致命判断时发动
	 **/
	ATTACK_FATAL:"attack_fatal",
	/**
	 * 法术命中判断时发动
	 **/
	STRATEGY_HIT:"trategy_hit",
	/**
	 * 反击时发动
	 **/
	BACK_ATTACK:"backAttack",
	/**
	 * 敌军反击结束时发动
	 **/
	ENEMY_BACK_ATTACK_END:"enemyBackAttackEnd",
	/**
	 * 反击结束时发动
	 **/
	BACK_ATTACK_END:"backAttackEnd",
	/**
	 * 致命攻击时发动
	 **/
	ANGRY_ATTACK:"angryAttack",
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
	 * 提高城市收入
	 **/
	INCOME:"income",
	/**
	 * 祭祀
	 **/
	SACRIFICE:"sacrifice",
	/**
	 * 城池额外收入
	 **/
	ADDITIONAL:"additional",
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
	 * 攻击范围变为能攻击到的所有人
	 **/
	ATTACK_IN_RECT:"attackInRect",
	/**
	 * 兵种攻击范围
	 **/
	SOLDIERS_ATTACK_RECT:"soldiersAttackRect",
	/**
	 * 无反击
	 **/
	NO_COUNTER:"noCounter",
	/**
	 * 后退
	 **/
	FALL_BACK:"fallBack",
	/**
	 * 突破
	 **/
	BREAK_THROUGH:"breakThrough",
	/**
	 * 治疗
	 **/
	HEAL:"heal",
	/**
	 * 米袋
	 **/
	RICE:"rice",
	/**
	 * 卧薪尝胆
	 **/
	HARDSHIPS:"hardships",
	/**
	 * 伤害减少
	 **/
	HERT_MINUS:"hertMinus",
	/**
	 * 法术伤害减少
	 **/
	STRATEGY_HERT_MINUS:"strategyHertMinus",
	/**
	 * 属性随HP变化而变化
	 **/
	HERT_VS_STATUS:"hertVsStatus",
	/**
	 * HP和MP相互转化(偷天换日)
	 **/
	HP_MP_CHANGE:"hpMpChange",
	/**
	 * 物理攻击命中
	 **/
	HIT:"hit",
	/**
	 * 物理致命攻击
	 **/
	ATTACK_FATAL:"attack_fatal",
	/**
	 * 法术命中
	 **/
	STRATEGY_HIT:"trategy_hit",
	/**
	 * 免疫异常攻击或法术
	 **/
	WAKE:"wake",
	/**
	 * 移动攻击
	 **/
	MOVE_ATTACK:"move_attack",
	/**
	 * 撤退(血路)
	 **/
	RETREAT:"retreat",
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
	 * 借用
	 **/
	BORROW:"borrow",
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
	 * 修补
	 **/
	REPAIR:"repair",
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
{id:1,name:"雷霆怒击(张飞)",powerful:200,type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[1,0.8,0.7],probability:40,explanation:"{probability}几率连续攻击三次。"},
{id:2,name:"真龙之气(刘备,曹操,孙权,曹丕,司马炎)",powerful:100,type:SkillType.HERT,subType:[SkillSubType.HERT_MINUS],hert:0,probability:30,explanation:"{probability}%几率将受到的伤害减少为0。"},
{id:3,name:"隔山打牛(关羽)",powerful:200,type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_RECT],attacks:[1.5],rects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:40,explanation:"{probability}几率使攻击波及到目标敌人相邻的敌军。"},
{id:4,name:"天下无双(吕布)",powerful:210,type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT,SkillSubType.ENEMY_AID],attacks:[1.1,1.1],aids:[4],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:60,explanation:"{probability}几率重击敌军两次，并且使得目标敌人相邻的敌军防御力降低。"},
{id:5,name:"愈战愈勇(颜良,杜预)",powerful:100,type:SkillType.ATTACK_END,subType:[SkillSubType.SELF_AID],aids:[1],aidCount:1,aidRects:[{x:0,y:0}],probability:40,explanation:"{probability}几率在攻击结束时提升自身攻击力。"},
{id:6,name:"愈战愈坚(文丑,郝昭)",powerful:100,type:SkillType.ATTACK_END,subType:[SkillSubType.SELF_AID],aids:[3],aidCount:1,aidRects:[{x:0,y:0}],probability:40,explanation:"{probability}几率在攻击结束时提升自身防御力。"},
{id:7,name:"鼓舞(张辽,张任)",powerful:100,type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[5],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率在回合开始时提升自身以及周围友军的士气。"},
{id:8,name:"苍龙苏醒(赵云)",powerful:200,type:SkillType.ATTACK,subType:[SkillSubType.ENEMY_AID,SkillSubType.WAKE,SkillSubType.ATTACK_COUNT],attacks:[1.5],aids:[2,4,6,8,10],aidCount:1,aidRects:[{x:0,y:0}],wakeRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率在攻击时使敌人降低一种能力，且自身及周围友军不会陷入任何不良状态。"},
{id:9,name:"幻影(黄忠)",powerful:200,type:SkillType.ATTACK,subType:[SkillSubType.ENEMY_AID,SkillSubType.ATTACK_COUNT],attacks:[2],aids:[21],aidCount:1,aidRects:[{x:0,y:0}],probability:30,explanation:"{probability}几率给对方2倍攻击，且使对方陷入昏迷状态。"},
{id:10,name:"噬血(马超)",powerful:200,type:SkillType.ATTACK_END,subType:[SkillSubType.VAMPIRE],vampire:0.3,probability:100,explanation:"{probability}几率给在物理攻击对方时将敌军兵力转换为己方兵力。"},
{id:11,name:"神算(诸葛亮)",powerful:200,type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT,SkillSubType.STRATEGY_HERT_MINUS],strategy_attacks:[1.5],hert:0.5,minusRects:[],probability:100,explanation:"法术攻击时必暴击，我军全员法术伤害减半。"},
{id:12,name:"火神(周瑜)",powerful:200,type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT,SkillSubType.ENEMY_AID],belong:Belong.ENEMY,strategy_attacks:[2],condition:{type:"StrategyType",value:StrategyType.Fire},aids:[25],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率使用火系策略伤害加倍，且另对方进入燃烧状态。"},
{id:13,name:"医神(华佗)",powerful:100,type:SkillType.BOUT_START,subType:[SkillSubType.HEAL],healId:42,healRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率回合开始时对自身及相邻友军进行治疗。"},
{id:14,name:"反间计(陆逊,陆抗)",powerful:150,type:SkillType.STRATEGY_ATTACK_END,subType:[SkillSubType.VAMPIRE],vampire:0.3,probability:100,explanation:"{probability}几率在法术攻击对方时将敌军兵力转换为己方兵力。"},
{id:15,name:"识破(荀攸)",powerful:100,type:SkillType.NULL,subType:[SkillSubType.STRATEGY_HERT_MINUS],hert:0.5,minusRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率令自身及相邻的友军受到的法术伤害减半。"},
{id:16,name:"连珠(法正)",powerful:200,type:[SkillType.STRATEGY_ATTACK, SkillType.STRATEGY_COUNT_ATTACK],subType:[SkillSubType.STRATEGY_COUNT],belong:Belong.ENEMY,strategy_attacks:[1,1],probability:60,explanation:"{probability}几率法术连击。"},
{id:17,name:"连环计(庞统)",powerful:200,type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.SPREAD],belong:Belong.ENEMY,speadProbability:10.5,speadRects:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],probability:60,explanation:"{probability}几率法术攻击时不断蔓延到其他相邻的敌军。"},
{id:18,name:"鬼策(贾诩)",powerful:150,type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT,SkillSubType.ENEMY_AID],belong:Belong.ENEMY,strategy_attacks:[1.5],aids:[2,4,6,8,10],aidCount:1,aidRects:[{x:0,y:0}],probability:50,explanation:"{probability}几率1.5倍法术暴击，且降低敌军状态。"},
{id:19,name:"鬼谋(郭嘉)",powerful:150,type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT,SkillSubType.ENEMY_AID],belong:Belong.ENEMY,strategy_attacks:[1.5],aids:[21,22,23,24,25],aidCount:1,aidRects:[{x:0,y:0}],probability:50,explanation:"{probability}几率1.5倍法术暴击，且令敌军陷入不良状态。"},
{id:20,name:"逆嗜血(许褚)",powerful:150,type:SkillType.BACK_ATTACK_END,subType:[SkillSubType.VAMPIRE],vampire:0.3,probability:100,explanation:"{probability}几率反击时将敌军兵力转化为自身兵力。"},
{id:21,name:"反弹(典韦)",powerful:150,type:SkillType.HERT,subType:[SkillSubType.BOUNCE],bounce:0.5,probability:100,explanation:"{probability}几率被攻击时令敌军也受到一定程度伤害。"},
{id:22,name:"血路(廖化)",powerful:20,type:SkillType.NULL,subType:[SkillSubType.RETREAT],probability:100,explanation:"降低自身及周围被俘虏概率。"},
{id:23,name:"十面埋伏(程昱)",powerful:150,type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.AMBUSH],belong:Belong.ENEMY,ambush:0.2,ambushRects:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率在使用法术攻击敌军时，如果攻击目标的周围有友军存在，可以借助友军的力量提高法术伤害，友军越多，加成越多。"},
{id:24,name:"决胜(司马懿)",powerful:200,type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT,SkillSubType.THRIFT_MP],belong:Belong.ENEMY,strategy_attacks:[2],aidCount:1,thrift:1,probability:50,explanation:"{probability}几率在使用法术攻击敌军时2倍暴击，且不消化MP。"},
{id:25,name:"摆尾(荀彧)",powerful:150,type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.PENETRATE],belong:Belong.ENEMY,probability:50,explanation:"使用法术攻击时附带穿透效果。"},
{id:26,name:"毒箭(夏侯渊)",powerful:160,type:SkillType.ATTACK,subType:[SkillSubType.ENEMY_AID],condition:{type:"AttackType",value:AttackType.FAR},aids:[23],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率在使用弓箭类兵种攻击时令敌军中毒。"},
{id:27,name:"毒计(徐庶,审配)",powerful:150,type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.ENEMY_AID],belong:Belong.ENEMY,aids:[23],aidCount:1,aidRects:[{x:0,y:0}],probability:60,explanation:"{probability}几率在使用法术攻击时令敌军中毒。"},
{id:28,name:"灵敏(魏延,文鸳)",powerful:80,type:SkillType.ATTACK_END,subType:[SkillSubType.SELF_AID],aids:[9],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"{probability}几率攻击结束时提升自身爆发力。"},
{id:29,name:"猛攻(姜维)",powerful:100,type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[1],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率回合开始时提升自身及周围友军的攻击力。"},
{id:30,name:"坚固(邓艾)",powerful:100,type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[3],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:50,explanation:"{probability}几率回合开始时提升自身及周围友军的防御力。"},
{id:31,name:"暗行(吕蒙)",powerful:10,type:[SkillType.CREATE,SkillType.ATTACK],subType:[SkillSubType.MOVE_ASSAULT,SkillSubType.MOVE_KNOW,SkillSubType.NO_COUNTER],probability:100,explanation:"无视地形和敌军阻挡进行移动。"},
{id:32,name:"劫营(甘宁)",powerful:150,type:SkillType.ATTACK,subType:[SkillSubType.SURPRISE],attacks:[1.5,1.2],probability:100,explanation:"从敌人背后或侧面攻击时攻击有加成,不包括斜角攻击。"},
{id:33,name:"乱射(太史慈)",powerful:150,type:SkillType.ATTACK,subType:[SkillSubType.SPREAD],condition:{type:"AttackType",value:AttackType.FAR},speadProbability:0.5,speadRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:40,explanation:"{probability}几率使用弓箭类兵种攻击时,使攻击波及到目标敌人相邻的敌军。"},
{id:34,name:"破弩(徐晃)",powerful:90,type:SkillType.NULL,subType:[SkillSubType.IGNORE_RESTRAINT],ignore:{type:"AttackType",value:AttackType.FAR},probability:100,explanation:"无视弓兵类兵种的克制效果。"},
{id:35,name:"破步(于禁)",powerful:90,type:SkillType.NULL,subType:[SkillSubType.IGNORE_RESTRAINT],ignore:{type:"MoveType",value:MoveType.INFANTRY},probability:100,explanation:"无视步兵类兵种的克制效果。"},
{id:36,name:"破骑(张郃)",powerful:90,type:SkillType.NULL,subType:[SkillSubType.IGNORE_RESTRAINT],ignore:{type:"MoveType",value:MoveType.CAVALRY},probability:100,explanation:"无视骑兵类兵种的克制效果。"},
{id:37,name:"破兵(庞德)",powerful:110,type:SkillType.NULL,subType:[SkillSubType.IGNORE_RESTRAINT],ignore:{type:"SoldierType",value:SoldierType.Physical},probability:100,explanation:"无视物理类兵种的克制效果。"},
{id:38,name:"仁者(鲁肃,羊祜)",powerful:100,type:SkillType.BOUT_START,subType:[SkillSubType.ENLIST_SKILL],enlist_value:0.1,enlist_count:1,probability:50,explanation:"{probability}几率回合开始时为己方随机一人征集一些兵力。"},
{id:39,name:"陷阵营(高顺)",powerful:200,type:SkillType.ATTACK,subType:[SkillSubType.AMBUSH_INVERSE],ambush:0.2,startAmbushProbability:0.5,ambushRects:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"{probability}几率相邻敌军大于1时攻击有加成，且相邻敌军越多攻击加成越多。"},
{id:40,name:"强行(刘晔)",powerful:10,type:SkillType.CREATE,subType:[SkillSubType.STATUS_ADD_NUM],status_name:"movePower",status_value:2,probability:100,explanation:"移动力增加。"},
{id:41,name:"小霸王(孙策)",powerful:100,type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT,SkillSubType.ENEMY_AID],condition:{type:"StatusCompare",name:"force",value:1},attacks:[1.5],aids:[2],aidCount:1,aidRects:[{x:0,y:0}],probability:50,explanation:"{probability}几率对武力低于自己的敌军，进行1.5倍暴击，且令其攻击力降低。"},
{id:42,name:"逆击(华雄)",powerful:100,type:SkillType.BACK_ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[0.75,0.75],probability:50,explanation:"{probability}几率反击两次。"},
{id:43,name:"大喝(关兴)",powerful:100,type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT,SkillSubType.NO_COUNTER],attacks:[1.5],probability:40,explanation:"{probability}几率1.5倍暴击，大喝的强大气势令敌军无法反击。"},
{id:44,name:"冲锋(张苞)",powerful:100,type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT,SkillSubType.PENETRATE],attacks:[1.5],probability:40,explanation:"{probability}几率1.5倍暴击，附带穿透效果。"},
{id:45,name:"节粮(马良,郭淮,张紘)",powerful:100,type:SkillType.NULL,subType:[SkillSubType.THRIFT],explanation:"粮食消耗减半。"},
{id:46,name:"商业(糜竺)",powerful:0,type:SkillType.NULL,subType:[SkillSubType.BUSINESS],explanation:"内政商业加成。"},
{id:47,name:"技术(伊籍)",powerful:0,type:SkillType.NULL,subType:[SkillSubType.TECHNOLOGY],explanation:"内政技术加成。"},
{id:48,name:"农业(简雍)",powerful:0,type:SkillType.NULL,subType:[SkillSubType.AGRICULTURE],explanation:"内政农业加成。"},
{id:49,name:"征兵(陈到)",powerful:0,type:SkillType.NULL,subType:[SkillSubType.ENLIST],explanation:"内政征兵加成。"},
{id:50,name:"肉搏(周泰)",powerful:100,type:SkillType.BACK_ATTACK,subType:[SkillSubType.PENETRATE],probability:50,explanation:"反击时附带穿透效果。"},
{id:51,name:"死战(凌统)",powerful:100,type:SkillType.CREATE,subType:[SkillSubType.HERT_VS_STATUS],hert_vs_status:{name:"attack",value:0.3},probability:100,explanation:"士兵越少攻击越高。"},
{id:52,name:"顺势(程普)",powerful:80,type:SkillType.ANGRY_ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[2.5],probability:100,explanation:"致命一击发动时有几率将攻击提高一倍。"},
{id:53,name:"忍耐(黄盖)",powerful:80,type:SkillType.CREATE,subType:[SkillSubType.HERT_VS_STATUS],hert_vs_status:{name:"defense",value:0.3},probability:100,explanation:"士兵越少防御越高。"},
{id:54,name:"倾国(貂蝉)",powerful:80,type:[SkillType.ATTACK, SkillType.HERT],subType:[SkillSubType.HERT_MINUS,SkillSubType.ENEMY_AID],hert:0.5,condition:{type:"SoldierId",value:[13]},aids:[22],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"使用女兵兵种时,受到攻击时有几率将伤害减半,其倾国的美色让敌军无法动弹(定身效果)。"},
{id:55,name:"倾城(大乔,小乔)",powerful:50,type:SkillType.HERT,subType:[SkillSubType.HERT_MINUS],hert:0.5,condition:{type:"SoldierId",value:[13]},aids:[22],aidCount:1,probability:100,explanation:"使用女兵兵种时,受到攻击时有几率将伤害减半。"},
{id:56,name:"巾帼(孙尚香)",powerful:120,type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[1,0.75],probability:100,explanation:"巾帼不让须眉，每次攻击必定双击。"},
{id:57,name:"偷天换日(马云绿)",powerful:120,type:SkillType.HERT,subType:[SkillSubType.HP_MP_CHANGE],changeProbability:30,probability:100,explanation:"几率使用近战兵种时,将受到的攻击伤害转为MP伤害,如果MP为零，则有一定概率将伤害转换为MP。"},
{id:58,name:"羁绊(马忠,潘璋)",powerful:50,type:SkillType.ATTACK,subType:[SkillSubType.ENEMY_AID],aids:[22],aidCount:1,aidRects:[{x:0,y:0}],probability:100,explanation:"有几率附带定身效果。"},
{id:59,name:"运气(马忠(蜀))",powerful:80,type:SkillType.CREATE,subType:[SkillSubType.STATUS_ADD_PROP],status_name:"morale",status_value:0.1,probability:100,explanation:"增强士气。"},
{id:60,name:"防御(关平)",powerful:80,type:SkillType.CREATE,subType:[SkillSubType.STATUS_ADD_PROP],status_name:"defense",status_value:0.1,probability:100,explanation:"增强防御。"},
{id:61,name:"敏捷(乐进)",powerful:80,type:SkillType.CREATE,subType:[SkillSubType.STATUS_ADD_PROP],status_name:"breakout",status_value:0.1,probability:100,explanation:"增强爆发力。"},
{id:62,name:"攻击(文鸯)",powerful:80,type:SkillType.CREATE,subType:[SkillSubType.STATUS_ADD_PROP],status_name:"attack",status_value:0.1,probability:100,explanation:"增强攻击。"},
{id:63,name:"精神(陈登,邓芝)",powerful:80,type:SkillType.CREATE,subType:[SkillSubType.STATUS_ADD_PROP],status_name:"spirit",status_value:0.1,probability:100,explanation:"增强精神。"},
{id:64,name:"厚皮(周仓)",powerful:80,type:SkillType.CREATE,subType:[SkillSubType.STATUS_ADD_PROP],status_name:"maxTroops",status_value:0.1,probability:100,explanation:"增大兵力。"},
{id:65,name:"斗转星移(甄氏)",powerful:30,type:SkillType.BACK_ATTACK,subType:[SkillSubType.BORROW],probability:100,explanation:"有几率在反击时借用对方的攻击力。"},
{id:66,name:"熟路(吕凯)",powerful:10,type:SkillType.CREATE,subType:[SkillSubType.MOVE_KNOW],probability:100,explanation:"所有地形消耗1点移动力。"},
{id:67,name:"反客为主(孙坚)",powerful:120,type:SkillType.BACK_ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[1],probability:100,explanation:"几率反击时给予敌军主动攻击的伤害值。"},
{id:68,name:"治安(刘封)",powerful:0,type:SkillType.NULL,subType:[SkillSubType.POLICE],explanation:"内政治安加成。"},
{id:69,name:"飞刀(祝融)",powerful:100,type:SkillType.CREATE,subType:[SkillSubType.SOLDIERS_ATTACK_RECT],condition:{type:"AttackType",value:AttackType.NEAR},rangeAttack:[{x:0,y:2},{x:0,y:-2},{x:2,y:0},{x:-2,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],explanation:"近战兵种攻击范围增强。"},
{id:70,name:"辅佐(黄月英)",powerful:100,type:SkillType.BOUT_START,subType:[SkillSubType.SELF_AID],aids:[1,3,5,7,9],aidCount:1,aidRects:[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"回合开始时,为自身及周围所有相邻部队提升一种能力。"},
{id:71,name:"突击(夏侯惇)",powerful:180,type:[SkillType.ATTACK],subType:[SkillSubType.ATTACK_COUNT,SkillSubType.FALL_BACK],attacks:[1.2],probability:35,explanation:"重击敌军的同时令敌军后退一格，如果后方存在部队无法后退时，则对后方部队产生撞击伤害。对建筑无效。"},
{id:72,name:"突破(乐进)",powerful:150,type:[SkillType.ATTACK],subType:[SkillSubType.BREAK_THROUGH],aids:[3],aidCount:1,aidRects:[{x:0,y:0}],probability:35,explanation:"提升自身防御之后穿透到敌军背后，如果后方存在部队无法后退时，则对后方部队产生撞击伤害。"},
{id:73,name:"逆势反击(张郃)",powerful:150,type:SkillType.ENEMY_BACK_ATTACK_END,subType:[SkillSubType.ATTACK_COUNT],attacks:[0.75],probability:50,explanation:"主动攻击时依然对敌军的攻击进行反击。"},
{id:74,name:"白耳(陈到)",powerful:100,type:SkillType.ATTACK_END,subType:[SkillSubType.FALL_BACK],probability:30,explanation:"白耳兵强大的攻击力迫使敌军后退一格，如因后方存在部队无法后退时,则产生撞击伤害。对建筑无效。"},
{id:75,name:"冲击(张辽)",powerful:160,type:SkillType.ATTACK,subType:[SkillSubType.ENEMY_AID,SkillSubType.PENETRATE],aids:[2],aidCount:1,aidRects:[{x:0,y:0}],probability:50,explanation:"用力冲向敌军,强大的冲力令敌军胆寒,除了令敌军攻击力受损之外,还可以将伤害蔓延到后方的敌军。"},
{id:76,name:"运筹(陈宫)",powerful:100,type:SkillType.STRATEGY_ATTACK,subType:[SkillSubType.STRATEGY_COUNT],belong:Belong.ENEMY,strategy_attacks:[1.5],aidCount:1,thrift:1,probability:40,explanation:"在使用法术攻击敌军时1.5倍暴击。"},
{id:77,name:"神箭",powerful:200,type:[SkillType.ATTACK,SkillType.ATTACK_HIT],subType:[SkillSubType.HIT,SkillSubType.ATTACK_COUNT],attacks:[1,1],hit:100,condition:{type:"AttackType",value:AttackType.FAR},probability:100,explanation:"使用弓箭类兵种时，100%双击，且100%命中"},
{id:78,name:"霸王重生",powerful:200,type:[SkillType.ATTACK,SkillType.ATTACK_END],subType:[SkillSubType.ATTACK_COUNT,SkillSubType.SELF_AID],attacks:[1.1,1.1],aids:[1,3,5,7,9],aidCount:1,aidRects:[{x:0,y:0}],probability:60,explanation:"双击＋提升自身能力"},
{id:79,name:"算无遗策",powerful:200,type:[SkillType.STRATEGY_HIT,SkillType.STRATEGY_ATTACK],subType:[SkillSubType.STRATEGY_HIT,SkillSubType.SPREAD],belong:Belong.ENEMY,hit:100,speadProbability:0.3,speadRects:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],probability:100,explanation:"法术命中100%＋随机溅射一人"},
{id:80,name:"军神",powerful:200,type:[SkillType.ATTACK_HIT,SkillType.ATTACK,SkillType.STRATEGY_ATTACK],subType:[SkillSubType.HIT,SkillSubType.STRATEGY_HIT,SkillSubType.AMBUSH],hit:100,ambush:0.2,ambushRects:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],probability:100,explanation:"物理攻击命中100%＋十面埋伏特效"},
{id:81,name:"冲杀",powerful:200,type:SkillType.ATTACK,subType:[SkillSubType.PENETRATE],penetrate:3,probability:40,explanation:"穿透4格攻击"},
{id:82,name:"横扫",powerful:200,type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_IN_RECT],probability:40,explanation:"物理攻击时，一次性攻击所有攻击范围内的敌军。"},
{id:83,name:"百步穿杨",powerful:160,type:[SkillType.ATTACK,SkillType.ATTACK_HIT],subType:[SkillSubType.HIT,SkillSubType.ATTACK_COUNT],attacks:[1.1],hit:100,condition:{type:"AttackType",value:AttackType.FAR},probability:100,explanation:"使用弓箭类兵种时，攻击伤害提升10%，且100%命中。"},
{id:84,name:"兵神",powerful:210,type:[SkillType.STRATEGY_HIT,SkillType.STRATEGY_ATTACK],subType:[SkillSubType.STRATEGY_HIT,SkillSubType.STRATEGY_COUNT],belong:Belong.ENEMY,strategy_attacks:[1,0.8,0.7],hit:100,probability:50,explanation:"法术三次连击，且命中100%。"},
{id:85,name:"奋战",powerful:200,type:SkillType.ATTACK_FATAL,subType:[SkillSubType.ATTACK_FATAL],hit:100,probability:100,explanation:"致命攻击。"},
{id:86,name:"卧薪尝胆",powerful:110,type:SkillType.NULL,subType:[SkillSubType.HARDSHIPS],probability:100,explanation:"敌方回合每受到一次攻击，自己的攻击伤害提升10%。"},
{id:87,name:"快速连击",powerful:100,type:SkillType.ATTACK,subType:[SkillSubType.ATTACK_COUNT],attacks:[0.6,0.6],probability:50,explanation:"通过减轻力量来快速攻击两次，但是每次攻击只有普通攻击的0.6倍。"},
{id:88,name:"防守",powerful:100,type:SkillType.HERT,subType:[SkillSubType.HERT_MINUS],hert:0.8,probability:50,explanation:"受到的伤害减少10%。"},
{id:89,name:"骑术",powerful:80,type:SkillType.CREATE,subType:[SkillSubType.SOLDIERS_ATTACK_RECT],condition:{type:"SoldierId",value:[3,27]},rangeAttack:[{x:-1,y:-1},{x:1,y:1},{x:-1,y:1},{x:1,y:-1}],explanation:"掌握了超凡的骑术，在使用骑兵时，将攻击范围扩大至8格。"},
{id:90,name:"米袋",powerful:50,type:SkillType.NULL,subType:[SkillSubType.RICE],probability:100,explanation:"自备口粮，不消耗军队的粮食。"},
{id:91,name:"移动攻击",powerful:100,type:SkillType.NULL,subType:[SkillSubType.MOVE_ATTACK],probability:100,explanation:"移动距离越长攻击越高。"},
{id:92,name:"英龙之气(曹操)",powerful:180,type:SkillType.HERT,subType:[SkillSubType.HERT_MINUS,SkillSubType.BOUNCE],bounce:0.5,hert:0,probability:30,explanation:"将受到的一部分伤害反射给对方，自身承受的伤害减少为0。"},
{id:93,name:"仁龙之气(刘备)",powerful:180,type:SkillType.HERT,subType:[SkillSubType.HERT_MINUS,SkillSubType.HEAL],hert:0,probability:30,explanation:"将受到的伤害减少为0，且治愈所有伤兵。"},
{id:94,name:"贤龙之气(孙权)",powerful:180,type:SkillType.HERT,subType:[SkillSubType.HERT_MINUS,SkillSubType.SELF_AID],hert:0,aids:[1,3,5,7,9],aidCount:1,aidRects:[{x:0,y:0}],probability:30,explanation:"将受到的伤害减少为0，并为自己提高一种能力。"},
{id:95,name:"经商",powerful:0,type:SkillType.NULL,subType:[SkillSubType.INCOME],income:"money",probability:100,explanation:"大幅增加城池金钱收入。"},
{id:96,name:"生产",powerful:0,type:SkillType.NULL,subType:[SkillSubType.INCOME],income:"food",probability:100,explanation:"大幅增加城池粮食收入。"},
{id:97,name:"祭祀",powerful:0,type:SkillType.NULL,subType:[SkillSubType.SACRIFICE],probability:100,explanation:"所在城池不会发生灾害。"},
{id:98,name:"短刀",powerful:80,type:SkillType.CREATE,subType:[SkillSubType.SOLDIERS_ATTACK_RECT],condition:{type:"SoldierId",value:[4,28,5,29,6,30,22]},rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],explanation:"装备了短刀，在使用远程兵种时，可以近身攻击。"},
{id:99,name:"筹粮",powerful:0,type:SkillType.NULL,subType:[SkillSubType.THRIFT,SkillSubType.ADDITIONAL],additional:{type:"food",value:2000},probability:100,explanation:"每月可获得粮食，战斗时候粮草消耗减半。"},
];