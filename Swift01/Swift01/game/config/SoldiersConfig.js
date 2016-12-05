var SoldierType = {
	Physical:0,//物理系
	Magic:1,//法术系
	Comprehensive:2//全能系
};
var MoveType = {
	INFANTRY:0,//步兵
	CAVALRY:1,//骑兵
	CAR:2,//炮车
};
var AttackType = {
	NEAR:0,//近战
	FAR:1,//远程
	MAGIC:2,//法术
};
var EnlistSetting = {
	ENLIST_FROM:100,//征兵范围
	ENLIST_TO:200//征兵范围
};
var TrainingSetting = {
	MAX:500//训练最大熟练度
};
var HealSoldiers = [10];
var SoldierImages = [];
SoldierImages[AttackType.NEAR] = [
["4-2"], 
["1-1", "3-3", "4-3", "5-3", "6-3", "7-3", "8-1", "12-3", "14-3", "17-1", "18-17", "19-3", "21-1", "24-1", "25-3", "27-3", 
"28-3", "35-1", "39-1", "43-17", "48-3", "53-3", "65-3", "70-1", "72-3", "75-1", "81-3", "83-3", "89-3", "90-3", "94-3", 
"119-3", "129-3", "131-3", "143-3", "146-3", "153-3", "154-3", "205-3", "621-1", "622-3"], 
[]];
SoldierImages[AttackType.FAR] = [["624-4"], ["41-5","111-5"], []];
SoldierImages[AttackType.MAGIC] = [["10-16"], [], []];
/* {id:1,name:"兵种名",type:SoldierType,movetype:MoveType,movePower:移动力,
	property:兵种属性,
	equipment:可以装备的装备的种类,
	restrain:兵种相克[{id:兵种id,value:效果}],
	terrain:地形属性[{id:地形id,value:效果,moveCost:消耗移动里}],
	rangeAttack:攻击距离,
	rangeAttackTarget:攻击范围,
	strategy:策略[{id:策略id,lv:需要等级}],
	strategyHert:策略伤害系数
	explanation:详解,
	next:[{id:2,lv:20}]
	}*/
var specialSoldiersConfig = [42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
var employCommonSoldiersConfig = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
var SoldierDatas = [
	{id:1,name:"君主",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"A",spirit:"A",defense:"A",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:1,value:110,moveCost:1},{id:2,value:90,moveCost:2},{id:3,value:90,moveCost:2},{id:4,value:80,moveCost:3},
	{id:5,value:100,moveCost:2},{id:6,value:110,moveCost:1},{id:7,value:90,moveCost:2},{id:8,value:80,moveCost:3},
	{id:9,value:90,moveCost:2},{id:11,value:100,moveCost:3}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:33,lv:5},{id:34,lv:10},{id:42,lv:20}],
	sign:"jj",
	maxProficiency:1000,
	next:25
	},
	{id:2,name:"步兵",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"B",spirit:"A",defense:"S",breakout:"B",morale:"B",troops:6,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:4,value:150},{id:6,value:150},{id:22,value:150},{id:3,value:50}],
	terrain:[{id:7,value:100,moveCost:2},{id:8,value:100,moveCost:2},{id:10,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"qbb",
	maxProficiency:900,
	next:26
	},
	{id:3,name:"骑兵",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"S",spirit:"B",defense:"A",breakout:"B",morale:"B",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:4,value:60},{id:6,value:60}],
	terrain:[
	{id:0,value:110,moveCost:1},{id:1,value:110,moveCost:1},{id:2,value:90,moveCost:2},{id:3,value:90,moveCost:2},{id:4,value:80,moveCost:3},
	{id:5,value:100,moveCost:2},{id:6,value:110,moveCost:1},{id:7,value:90,moveCost:2},{id:8,value:80,moveCost:3},{id:9,value:80,moveCost:2},{id:11,value:90,moveCost:3}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"qqb",
	maxProficiency:1000,
	next:27
	},
	{id:4,name:"弓兵",type:SoldierType.Physical,attackType:AttackType.FAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"B",morale:"S",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:3,value:150},{id:17,value:150},{id:18,value:150},{id:19,value:150}],
	terrain:[{id:7,value:100,moveCost:2},{id:8,value:100,moveCost:2},{id:10,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-2},{x:0,y:2},{x:-2,y:0},{x:2,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"gb",
	maxProficiency:1000,
	next:28
	},
	{id:5,name:"弓骑兵",type:SoldierType.Physical,attackType:AttackType.FAR,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"S",spirit:"B",defense:"B",breakout:"B",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:3,value:150},{id:17,value:150},{id:18,value:150},{id:19,value:150}],
	terrain:[
	{id:1,value:110,moveCost:1},{id:2,value:90,moveCost:2},{id:3,value:90,moveCost:2},{id:4,value:80,moveCost:3},
	{id:5,value:100,moveCost:2},{id:6,value:110,moveCost:1},{id:7,value:90,moveCost:2},{id:8,value:80,moveCost:3},{id:9,value:80,moveCost:2},{id:11,value:90,moveCost:3}],
	rangeAttack:[{x:0,y:-2},{x:0,y:2},{x:-2,y:0},{x:2,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"gqb",
	maxProficiency:1000,
	next:29
	},
	{id:6,name:"炮车",type:SoldierType.Physical,attackType:AttackType.FAR,moveType:MoveType.CAR,movePower:3,
	property:{attack:"S",spirit:"B",defense:"A",breakout:"C",morale:"A",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:3,value:150},{id:17,value:150},{id:18,value:150},{id:19,value:150}],
	terrain:[
	{id:2,value:90,moveCost:1},{id:3,value:90,moveCost:1},
	{id:4,value:80,moveCost:2},{id:6,value:110,moveCost:1},{id:7,value:80,moveCost:2},
	{id:8,value:80,moveCost:2},{id:10,value:110,moveCost:1},{id:11,value:100,moveCost:2}],
	rangeAttack:[{x:0,y:-4},{x:0,y:4},{x:-4,y:0},{x:4,y:0}, {x:1,y:-3},{x:1,y:3},{x:-1,y:-3},{x:-1,y:3},{x:-3,y:1},{x:3,y:1},{x:-3,y:-1},{x:3,y:-1}, {x:2,y:-2},{x:2,y:2},{x:-2,y:2},{x:-2,y:-2}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"qpc",
	maxProficiency:1000,
	next:30
	},
	{id:7,name:"武术家",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"A",spirit:"C",defense:"A",breakout:"S",morale:"B",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:4,value:90,moveCost:1},{id:5,value:90,moveCost:1},
	{id:8,value:100,moveCost:2},{id:9,value:110,moveCost:1},{id:11,value:100,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10}],
	sign:"whj",
	maxProficiency:1000,
	next:31
	},
	{id:8,name:"贼兵",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"S",spirit:"C",defense:"B",breakout:"B",morale:"S",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:2,value:110,moveCost:1},{id:3,value:110,moveCost:1},
	{id:4,value:110,moveCost:1},{id:5,value:80,moveCost:1},{id:7,value:80,moveCost:2},
	{id:8,value:80,moveCost:2},{id:9,value:80,moveCost:2},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:4,lv:15},{id:36,lv:10}],
	sign:"zb",
	maxProficiency:1000,
	next:32
	},
	{id:9,name:"策士",type:SoldierType.Magic,attackType:AttackType.MAGIC,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"B",spirit:"S",defense:"B",breakout:"B",morale:"B",troops:5,strategy:2},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},
	{id:4,value:80,moveCost:2},{id:5,value:90,moveCost:1},{id:7,value:100,moveCost:2},
	{id:8,value:90,moveCost:2},{id:9,value:80,moveCost:2},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:33,lv:0},{id:34,lv:0},{id:35,lv:5},{id:36,lv:10},{id:37,lv:15},{id:38,lv:20},{id:39,lv:25},{id:40,lv:30},{id:41,lv:5},{id:42,lv:20},{id:48,lv:20}],
	sign:"cs",
	maxProficiency:1000,
	next:33
	},
	{id:10,name:"风水士",type:SoldierType.Magic,attackType:AttackType.MAGIC,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"C",spirit:"S",defense:"C",breakout:"A",morale:"A",troops:3,strategy:2},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:80,moveCost:2},{id:7,value:100,moveCost:2},
	{id:8,value:90,moveCost:2},{id:9,value:100,moveCost:2},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:1,lv:5},{id:3,lv:10},{id:5,lv:15},{id:7,lv:20},{id:9,lv:25},{id:11,lv:30},{id:13,lv:35},{id:15,lv:40},{id:17,lv:45},{id:19,lv:50},{id:31,lv:10},{id:32,lv:50},
	{id:41,lv:0},{id:42,lv:0},{id:43,lv:10},{id:44,lv:10},{id:45,lv:20},{id:46,lv:20}],
	sign:"fsis",
	maxProficiency:1000,
	next:34
	},
	{id:11,name:"道士",type:SoldierType.Magic,attackType:AttackType.MAGIC,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"C",spirit:"S",defense:"B",breakout:"A",morale:"B",troops:3,strategy:2},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:2,value:110,moveCost:1},{id:3,value:110,moveCost:1},
	{id:4,value:110,moveCost:2},{id:5,value:90,moveCost:1},{id:7,value:90,moveCost:2},
	{id:8,value:80,moveCost:2},{id:9,value:80,moveCost:2},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:5},{id:4,lv:10},{id:6,lv:15},{id:8,lv:20},{id:10,lv:25},{id:12,lv:30},{id:14,lv:35},{id:16,lv:40},{id:18,lv:45},{id:20,lv:50},
	{id:21,lv:30},{id:22,lv:10},{id:23,lv:0},{id:24,lv:20},{id:26,lv:50},{id:27,lv:40},{id:28,lv:35},{id:29,lv:45},
	{id:41,lv:5}],
	sign:"ds",
	maxProficiency:1000,
	next:35
	},
	{id:12,name:"骑马策士",type:SoldierType.Magic,attackType:AttackType.MAGIC,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"A",spirit:"S",defense:"B",breakout:"B",morale:"C",troops:5,strategy:2},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:1,value:110,moveCost:1},{id:2,value:90,moveCost:2},{id:3,value:90,moveCost:2},
	{id:4,value:80,moveCost:3},{id:5,value:100,moveCost:2},{id:6,value:110,moveCost:1},{id:7,value:90,moveCost:2},
	{id:8,value:80,moveCost:3},{id:9,value:80,moveCost:2},{id:11,value:90,moveCost:3}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:4,lv:20},{id:6,lv:30},{id:10,lv:40},{id:33,lv:0},{id:34,lv:5},{id:35,lv:10},{id:36,lv:15},{id:38,lv:25},{id:40,lv:35},{id:41,lv:5},{id:42,lv:20}],
	sign:"qcs",
	maxProficiency:1000,
	next:36
	},
	{id:13,name:"女兵",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"wun",
	maxProficiency:1000,
	next:37
	},
	{id:14,name:"海盗",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"S",spirit:"B",defense:"B",breakout:"A",morale:"B",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:0,value:90,moveCost:1},{id:1,value:90,moveCost:1},{id:2,value:90,moveCost:1},{id:3,value:80,moveCost:2},
	{id:4,value:80,moveCost:2},{id:7,value:110,moveCost:1},
	{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:35,lv:10},{id:39,lv:40}],
	sign:"hd",
	maxProficiency:1000,
	next:38
	},
	{id:15,name:"都督",type:SoldierType.Comprehensive,attackType:AttackType.MAGIC,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"A",spirit:"S",defense:"B",breakout:"B",morale:"B",troops:4,strategy:2},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:1,value:90,moveCost:1},{id:2,value:90,moveCost:1},{id:3,value:80,moveCost:2},{id:4,value:80,moveCost:2},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:33,lv:5},{id:34,lv:10},{id:35,lv:0},{id:36,lv:15},{id:37,lv:25},{id:38,lv:30},{id:39,lv:20},{id:41,lv:5},{id:42,lv:20}],
	sign:"dd",
	maxProficiency:1000,
	next:39
	},
	{id:16,name:"咒术士",type:SoldierType.Magic,attackType:AttackType.MAGIC,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"C",spirit:"S",defense:"B",breakout:"B",morale:"A",troops:3,strategy:3},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:2},{id:4,value:80,moveCost:2},{id:7,value:80,moveCost:2},
	{id:8,value:80,moveCost:2},{id:9,value:80,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:1,lv:5},{id:2,lv:10},{id:3,lv:15},{id:4,lv:20},{id:5,lv:25},{id:6,lv:30},{id:7,lv:35},{id:8,lv:40},{id:9,lv:45},{id:10,lv:50},
	{id:21,lv:25},{id:22,lv:10},{id:23,lv:15},{id:24,lv:20},{id:31,lv:30},
	{id:33,lv:0},{id:34,lv:10},{id:35,lv:20},{id:36,lv:30},{id:37,lv:40},
	{id:41,lv:5},{id:42,lv:0},{id:45,lv:45},{id:46,lv:40}],
	sign:"zss",
	maxProficiency:1000,
	next:40
	},
	{id:17,name:"西凉骑兵",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"C",defense:"S",breakout:"B",morale:"B",troops:6,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:4,value:60},{id:6,value:60}],
	terrain:[
	{id:2,value:80,moveCost:2},{id:3,value:110,moveCost:1},
	{id:4,value:110,moveCost:1},{id:5,value:110,moveCost:1},{id:7,value:80,moveCost:2},
	{id:8,value:80,moveCost:2},{id:9,value:80,moveCost:2},{id:11,value:90,moveCost:3}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	strategyHert:1.5,
	sign:"xlqb",
	maxProficiency:1000,
	next:41
	},
	{id:18,name:"驯熊师",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"S",spirit:"C",defense:"A",breakout:"B",morale:"B",troops:6,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:2,value:110,moveCost:1},{id:3,value:110,moveCost:1},{id:4,value:110,moveCost:1},{id:7,value:90,moveCost:1},
	{id:8,value:90,moveCost:1},{id:9,value:80,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	strategyHert:1.5,
	sign:"xxs",
	strategySkill:23,
	strategySkillProbability:20
	},
	{id:19,name:"驯虎师",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"A",spirit:"C",defense:"A",breakout:"S",morale:"C",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:2,value:110,moveCost:1},{id:3,value:110,moveCost:1},{id:4,value:110,moveCost:1},{id:7,value:90,moveCost:1},
	{id:8,value:90,moveCost:1},{id:9,value:80,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	strategyHert:1.5,
	sign:"xhs",
	strategySkill:22,
	strategySkillProbability:20,
	},
	{id:20,name:"藤甲兵",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"B",spirit:"C",defense:"S",breakout:"S",morale:"C",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[{id:7,value:100,moveCost:2},{id:8,value:100,moveCost:2},{id:10,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	strategyHert:1.5,
	sign:"tjb"
	},
	{id:21,name:"游牧骑",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"S",spirit:"C",defense:"B",breakout:"S",morale:"B",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:4,value:60},{id:6,value:60}],
	terrain:[
	{id:2,value:80,moveCost:2},{id:3,value:110,moveCost:1},
	{id:4,value:110,moveCost:1},{id:5,value:110,moveCost:1},{id:7,value:80,moveCost:2},
	{id:8,value:80,moveCost:2},{id:9,value:80,moveCost:2},{id:11,value:90,moveCost:3}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"ymq"
	},
	{id:22,name:"飞刀兵",type:SoldierType.Physical,attackType:AttackType.FAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"S",spirit:"B",defense:"B",breakout:"B",morale:"A",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:3,value:150},{id:17,value:150},{id:18,value:150},{id:19,value:150}],
	terrain:[{id:7,value:100,moveCost:2},{id:8,value:100,moveCost:2},{id:10,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-2},{x:0,y:2},{x:-2,y:0},{x:2,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"fdb"
	},
	{id:23,name:"野蛮人",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"S",spirit:"C",defense:"S",breakout:"B",morale:"C",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:2,value:110,moveCost:1},{id:3,value:110,moveCost:1},{id:4,value:110,moveCost:1},{id:5,value:110,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:100,moveCost:2}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"ymr"
	},
	{id:24,name:"青州兵",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"S",spirit:"C",defense:"A",breakout:"A",morale:"B",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[{id:7,value:100,moveCost:2},{id:8,value:100,moveCost:2},{id:10,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:1},{x:0,y:2},{x:-1,y:0},{x:-2,y:0},{x:1,y:0},{x:2,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"qzb"
	},
	{id:25,name:"君王",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"A",spirit:"A",defense:"A",breakout:"A",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:1,value:110,moveCost:1},{id:2,value:90,moveCost:2},{id:3,value:90,moveCost:2},{id:4,value:80,moveCost:3},
	{id:5,value:100,moveCost:2},{id:6,value:110,moveCost:1},{id:7,value:90,moveCost:2},{id:8,value:80,moveCost:3},
	{id:9,value:90,moveCost:2},{id:11,value:100,moveCost:3}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:33,lv:5},{id:34,lv:10},{id:42,lv:20}],
	sign:"jj",
	newcount:1
	},
	{id:26,name:"重步兵",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"B",spirit:"A",defense:"S",breakout:"B",morale:"B",troops:6,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:4,value:150},{id:6,value:150},{id:22,value:150},{id:3,value:50}],
	terrain:[{id:7,value:100,moveCost:2},{id:8,value:100,moveCost:2},{id:10,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"zbb",
	newcount:1
	},
	{id:27,name:"重骑兵",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"S",spirit:"B",defense:"A",breakout:"B",morale:"B",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:4,value:80},{id:6,value:80}],
	terrain:[
	{id:0,value:110,moveCost:1},{id:1,value:110,moveCost:1},{id:2,value:90,moveCost:2},{id:3,value:90,moveCost:2},{id:4,value:80,moveCost:3},
	{id:5,value:100,moveCost:2},{id:6,value:110,moveCost:1},{id:7,value:90,moveCost:2},{id:8,value:80,moveCost:3},{id:9,value:80,moveCost:2},{id:11,value:90,moveCost:3}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"zqb",
	newcount:1
	},
	{id:28,name:"驽兵",type:SoldierType.Physical,attackType:AttackType.FAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"B",morale:"S",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:3,value:150},{id:17,value:150},{id:18,value:150},{id:19,value:150}],
	terrain:[{id:7,value:100,moveCost:2},{id:8,value:100,moveCost:2},{id:10,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:-2},{x:0,y:-3},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:-1,y:0},{x:-2,y:0},{x:-3,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:2},{x:-1,y:-2},{x:1,y:-2},{x:-1,y:2},{x:2,y:1},{x:-2,y:-1},{x:2,y:-1},{x:-2,y:1}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"nub",
	newcount:1
	},
	{id:29,name:"驽骑兵",type:SoldierType.Physical,attackType:AttackType.FAR,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"S",spirit:"B",defense:"B",breakout:"B",morale:"A",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:3,value:150},{id:17,value:150},{id:18,value:150},{id:19,value:150}],
	terrain:[
	{id:1,value:110,moveCost:1},{id:2,value:90,moveCost:2},{id:3,value:90,moveCost:2},{id:4,value:80,moveCost:3},
	{id:5,value:100,moveCost:2},{id:6,value:110,moveCost:1},{id:7,value:90,moveCost:2},{id:8,value:80,moveCost:3},{id:9,value:80,moveCost:2},{id:11,value:90,moveCost:3}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-2},{x:0,y:2},{x:-2,y:0},{x:2,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"nqb",
	newcount:1
	},
	{id:30,name:"重炮车",type:SoldierType.Physical,attackType:AttackType.FAR,moveType:MoveType.CAR,movePower:3,
	property:{attack:"S",spirit:"B",defense:"A",breakout:"C",morale:"A",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:3,value:150},{id:17,value:150},{id:18,value:150},{id:19,value:150}],
	terrain:[
	{id:2,value:90,moveCost:1},{id:3,value:90,moveCost:1},
	{id:4,value:80,moveCost:2},{id:6,value:110,moveCost:1},{id:7,value:80,moveCost:2},
	{id:8,value:80,moveCost:2},{id:10,value:110,moveCost:1},{id:11,value:100,moveCost:2}],
	rangeAttack:[{x:0,y:-4},{x:0,y:4},{x:-4,y:0},{x:4,y:0}, {x:1,y:-3},{x:1,y:3},{x:-1,y:-3},{x:-1,y:3},{x:-3,y:1},{x:3,y:1},{x:-3,y:-1},{x:3,y:-1}, {x:2,y:-2},{x:2,y:2},{x:-2,y:2},{x:-2,y:-2},
	{x:-5,y:0},{x:-4,y:1},{x:-4,y:-1},{x:-3,y:2},{x:-3,y:-2},{x:-2,y:3},{x:-2,y:-3},{x:-1,y:4},{x:-1,y:-4},{x:0,y:5},{x:0,y:-5},
	{x:1,y:4},{x:1,y:-4},{x:2,y:3},{x:2,y:-3},{x:3,y:2},{x:3,y:-2},{x:4,y:1},{x:4,y:-1},{x:5,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	sign:"zpc",
	newcount:1
	},
	{id:31,name:"拳士",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"A",spirit:"C",defense:"A",breakout:"S",morale:"B",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:4,value:90,moveCost:1},{id:5,value:90,moveCost:1},
	{id:8,value:100,moveCost:2},{id:9,value:110,moveCost:1},{id:11,value:100,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10}],
	sign:"qs",
	newcount:1
	},
	{id:32,name:"义贼",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"S",spirit:"C",defense:"B",breakout:"B",morale:"S",troops:5,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:2,value:110,moveCost:1},{id:3,value:110,moveCost:1},
	{id:4,value:110,moveCost:1},{id:5,value:80,moveCost:1},{id:7,value:80,moveCost:2},
	{id:8,value:80,moveCost:2},{id:9,value:80,moveCost:2},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:4,lv:15},{id:36,lv:10}],
	sign:"yz",
	newcount:1
	},
	{id:33,name:"参谋",type:SoldierType.Magic,attackType:AttackType.MAGIC,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"B",spirit:"S",defense:"B",breakout:"B",morale:"B",troops:5,strategy:2},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},
	{id:4,value:80,moveCost:2},{id:5,value:90,moveCost:1},{id:7,value:100,moveCost:2},
	{id:8,value:90,moveCost:2},{id:9,value:80,moveCost:2},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:33,lv:0},{id:34,lv:0},{id:35,lv:5},{id:36,lv:10},{id:37,lv:15},{id:38,lv:20},{id:39,lv:25},{id:40,lv:30},{id:41,lv:5},{id:42,lv:20},{id:48,lv:20}],
	sign:"cm",
	newcount:1
	},
	{id:34,name:"方术士",type:SoldierType.Magic,attackType:AttackType.MAGIC,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"C",spirit:"S",defense:"C",breakout:"A",morale:"A",troops:3,strategy:2},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:80,moveCost:2},{id:7,value:100,moveCost:2},
	{id:8,value:90,moveCost:2},{id:9,value:100,moveCost:2},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:1,lv:5},{id:3,lv:10},{id:5,lv:15},{id:7,lv:20},{id:9,lv:25},{id:11,lv:30},{id:13,lv:35},{id:15,lv:40},{id:17,lv:45},{id:19,lv:50},{id:31,lv:10},{id:32,lv:50},
	{id:41,lv:0},{id:42,lv:0},{id:43,lv:10},{id:44,lv:10},{id:45,lv:20},{id:46,lv:20}],
	sign:"fss",
	newcount:1
	},
	{id:35,name:"幻术士",type:SoldierType.Magic,attackType:AttackType.MAGIC,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"C",spirit:"S",defense:"B",breakout:"A",morale:"B",troops:3,strategy:2},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:2,value:110,moveCost:1},{id:3,value:110,moveCost:1},
	{id:4,value:110,moveCost:2},{id:5,value:90,moveCost:1},{id:7,value:90,moveCost:2},
	{id:8,value:80,moveCost:2},{id:9,value:80,moveCost:2},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:2,lv:5},{id:4,lv:10},{id:6,lv:15},{id:8,lv:20},{id:10,lv:25},{id:12,lv:30},{id:14,lv:35},{id:16,lv:40},{id:18,lv:45},{id:20,lv:50},
	{id:21,lv:30},{id:22,lv:10},{id:23,lv:0},{id:24,lv:20},{id:26,lv:50},{id:27,lv:40},{id:28,lv:35},{id:29,lv:45},
	{id:41,lv:5}],
	sign:"hss",
	newcount:1
	},
	{id:36,name:"骑马参谋",type:SoldierType.Magic,attackType:AttackType.MAGIC,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"A",spirit:"S",defense:"B",breakout:"B",morale:"C",troops:5,strategy:2},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:1,value:110,moveCost:1},{id:2,value:90,moveCost:2},{id:3,value:90,moveCost:2},
	{id:4,value:80,moveCost:3},{id:5,value:100,moveCost:2},{id:6,value:110,moveCost:1},{id:7,value:90,moveCost:2},
	{id:8,value:80,moveCost:3},{id:9,value:80,moveCost:2},{id:11,value:90,moveCost:3}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:4,lv:20},{id:6,lv:30},{id:10,lv:40},{id:33,lv:0},{id:34,lv:5},{id:35,lv:10},{id:36,lv:15},{id:38,lv:25},{id:40,lv:35},{id:41,lv:5},{id:42,lv:20}],
	sign:"qmcm",
	newcount:1
	},
	{id:37,name:"女将",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"nvj",
	newcount:1
	},
	{id:38,name:"大海盗",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"S",spirit:"B",defense:"B",breakout:"A",morale:"B",troops:4,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:0,value:90,moveCost:1},{id:1,value:90,moveCost:1},{id:2,value:90,moveCost:1},{id:3,value:80,moveCost:2},
	{id:4,value:80,moveCost:2},{id:7,value:110,moveCost:1},
	{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:35,lv:10},{id:39,lv:40}],
	sign:"hd",
	newcount:1
	},
	{id:39,name:"大都督",type:SoldierType.Comprehensive,attackType:AttackType.MAGIC,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"A",spirit:"S",defense:"B",breakout:"B",morale:"B",troops:4,strategy:2},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:1,value:90,moveCost:1},{id:2,value:90,moveCost:1},{id:3,value:80,moveCost:2},{id:4,value:80,moveCost:2},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:33,lv:5},{id:34,lv:10},{id:35,lv:0},{id:36,lv:15},{id:37,lv:25},{id:38,lv:30},{id:39,lv:20},{id:41,lv:5},{id:42,lv:20}],
	sign:"dd",
	newcount:1
	},
	{id:40,name:"狂咒术士",type:SoldierType.Magic,attackType:AttackType.MAGIC,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"C",spirit:"S",defense:"B",breakout:"B",morale:"A",troops:3,strategy:3},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:2},{id:4,value:80,moveCost:2},{id:7,value:80,moveCost:2},
	{id:8,value:80,moveCost:2},{id:9,value:80,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:1,lv:5},{id:2,lv:10},{id:3,lv:15},{id:4,lv:20},{id:5,lv:25},{id:6,lv:30},{id:7,lv:35},{id:8,lv:40},{id:9,lv:45},{id:10,lv:50},
	{id:21,lv:25},{id:22,lv:10},{id:23,lv:15},{id:24,lv:20},{id:31,lv:30},
	{id:33,lv:0},{id:34,lv:10},{id:35,lv:20},{id:36,lv:30},{id:37,lv:40},
	{id:41,lv:5},{id:42,lv:0},{id:45,lv:45},{id:46,lv:40}],
	sign:"zss",
	newcount:1
	},
	{id:41,name:"西凉铁骑",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.CAVALRY,movePower:5,
	property:{attack:"S",spirit:"C",defense:"S",breakout:"B",morale:"B",troops:6,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[{id:4,value:60},{id:6,value:60}],
	terrain:[
	{id:2,value:80,moveCost:2},{id:3,value:110,moveCost:1},
	{id:4,value:110,moveCost:1},{id:5,value:110,moveCost:1},{id:7,value:80,moveCost:2},
	{id:8,value:80,moveCost:2},{id:9,value:80,moveCost:2},{id:11,value:90,moveCost:3}],
	rangeAttack:[{x:-1,y:-1},{x:-1,y:1},{x:1,y:1},{x:1,y:-1},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[],
	strategyHert:1.5,
	sign:"xlqb",
	newcount:1
	},
	{id:42,name:"丹阳兵",type:SoldierType.Physical,attackType:AttackType.FAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"dyb",
	skill:85,//奋战
	newcount:1
	},
	{id:43,name:"白耳兵",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"ber",
	skill:74,//白耳
	newcount:1
	},
	{id:44,name:"无当飞军",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"wdfj",
	skill:42,//逆击
	newcount:1
	},
	{id:45,name:"虎豹骑",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.CAVALRY,movePower:6,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"hbq",
	skill:44,//冲锋
	newcount:1
	},
	{id:46,name:"虎卫军",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"hwj",
	skill:21,//反弹
	newcount:1
	},
	{id:47,name:"解烦兵",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:4,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"jfb",
	skill:32,//劫营
	newcount:1
	},
	{id:48,name:"白马义从",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"bmyc",
	skill:91,//移动攻击
	newcount:1
	},
	{id:49,name:"飞熊军",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"fxj",
	skill:86,//卧薪尝胆
	newcount:1
	},
	{id:50,name:"陷阵营",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"xzy",
	skill:39,//陷阵营
	newcount:1
	},
	{id:51,name:"仙人",type:SoldierType.Physical,attackType:AttackType.NEAR,moveType:MoveType.INFANTRY,movePower:5,
	property:{attack:"A",spirit:"B",defense:"B",breakout:"S",morale:"B",troops:3,strategy:1},
	equipment:{head:0,hand:0,body:0,foot:0,accessories:0},
	restrain:[],
	terrain:[
	{id:3,value:90,moveCost:1},{id:4,value:90,moveCost:2},{id:5,value:90,moveCost:1},
	{id:7,value:110,moveCost:1},{id:8,value:110,moveCost:1},{id:9,value:110,moveCost:1},{id:11,value:110,moveCost:2}],
	rangeAttack:[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}],
	rangeAttackTarget:[{x:0,y:0}],
	strategy:[{id:47,lv:10},{id:49,lv:20}],
	strategySkill:31,
	sign:"xr",
	skill:16,//连珠
	newcount:1
	},
];
for(var i=0,l=SoldierDatas.length;i<l;i++){
	SoldierDatas[i].terrain.push({id:12,value:120,moveCost:1});
	SoldierDatas[i].terrain.push({id:13,value:120,moveCost:1});
	SoldierDatas[i].terrain.push({id:14,value:110,moveCost:2});
	SoldierDatas[i].terrain.push({id:15,value:110,moveCost:2});
	SoldierDatas[i].terrain.push({id:16,value:110,moveCost:2});
	SoldierDatas[i].terrain.push({id:17,value:0,moveCost:255});
	SoldierDatas[i].terrain.push({id:18,value:0,moveCost:255});
	SoldierDatas[i].terrain.push({id:19,value:0,moveCost:255});
	SoldierDatas[i].terrain.push({id:20,value:0,moveCost:255});
	SoldierDatas[i].terrain.push({id:21,value:0,moveCost:255});
	SoldierDatas[i].terrain.push({id:22,value:0,moveCost:255});
	SoldierDatas[i].terrain.push({id:23,value:0,moveCost:255});
	SoldierDatas[i].terrain.push({id:24,value:0,moveCost:255});
}