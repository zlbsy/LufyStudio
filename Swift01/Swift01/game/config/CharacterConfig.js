var CharacterAction = {
	/**
	 * 站立
	 **/
	STAND:"stand",
	/**
	 * 移动
	 **/
	MOVE:"move",
	/**
	 * 攻击
	 **/
	ATTACK:"attack",
	/**
	 * 攻击开始
	 **/
	ATTACK_START:"attack_start",
	/**
	 * 挡格
	 **/
	BLOCK:"block",
	/**
	 * 受伤
	 **/
	HERT:"hert",
	/**
	 * 觉醒
	 **/
	WAKE:"wake",
	/**
	 * 喘气
	 **/
	PANT:"pant",
	/**
	 * 升级
	 **/
	LEVELUP:"levelup",
	/**
	 * 法攻
	 **/
	MAGIC_ATTACK:"magic_attack"
};
var CharacterDirection = {
	DOWN:"down",
	LEFT:"left",
	RIGHT:"right",
	UP:"up",
	LEFT_DOWN:"left_down",
	RIGHT_DOWN:"right_down",
	LEFT_UP:"left_up",
	RIGHT_UP:"right_up"
};
var CharacterDisposition = {
	TIMID:0,//胆小
	CALM:1,//冷静
	BRAVE:2,//勇敢
	RECKLESS:3//鲁莽
};
var BattleCharacterSize = {
	width:48,height:48
};
var CharacterFaceSize = {
	width:220,height:320
};
var CharacterLevelConfig = {
	initLevel:3,
	exp:100,
	maxLevel:100
};

var DefCharacterList = {//防御设施范围
	"soldier_4":[671,672,673,674,675,676],
	"soldier_6":[677,678,679,680,681,682]
};
var DefCharacterImage = {
	"soldier_4":"jinglan",
	"soldier_6":"paoche"
};
var MaxHistoryCharacterIndex = 620;//历史人物范围
var TribeCharacter = [621,670];//外族范围
var EmployCharacter = [683,692];//佣兵范围
var HardEmployCharacter = [857,860];//特殊佣兵范围
var DefenseCharacterCost = 500;//每个防御设施所需城防
var BattleCharacterStatusConfig = {};
BattleCharacterStatusConfig.FADE_TIME = 0.2;
BattleCharacterStatusConfig.SHOW_TIME = 0.5;
BattleCharacterStatusConfig.CONFIRM_STATUS_TIME = 1;
BattleCharacterStatusConfig.TROOPS = "Troops";
BattleCharacterStatusConfig.HP = "HP";
BattleCharacterStatusConfig.MP = "MP";
BattleCharacterStatusConfig.SP = "SP";
BattleCharacterStatusConfig.EXP = "Exp";
BattleCharacterStatusConfig.EXP_WEAPON = "ExpWeapon";
BattleCharacterStatusConfig.EXP_ARMOR = "ExpArmor";
var CharacterMode = {
	NONE : "none",
	SHOW_MOVE_ROAD : "showMoveRoad",
	STRATEGY_SELECT: "strategySelect",
	WAIT_ATTACK : "waitAttack",
	ATTACK : "attack",
	WAIT_SINGLE_COMBAT:"waitSingleCombat",
	MOVING : "moving",
	TO_MOVE : "toMove",
	END_MOVE : "endMove",
	END_ACTION : "endAction"
};
//行动方针
var BattleCharacterMission = {
	Initiative:0,//主动出击
	Passive:1,//被动出击
	Defensive:2//原地防守
};
var SingleCombatCharacterConfig = {};
SingleCombatCharacterConfig.INIT = "init";
SingleCombatCharacterConfig.START = "start";
var RPGCharacterConfig = {
	SPEED : 4
};
//俘虏忠诚度以及劝降关联
var charactersParentConfig = [
	{id:4,parent:21},//关羽-刘备
	{id:19,parent:21},//张飞-刘备
];
var femaleCharacters = [36,37,139,241,380,524,528,548];
var sCharacterImages = ["zpftmd748"];
var NewYearPresent_Boss = 861;
