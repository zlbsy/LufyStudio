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
	TIMID:0,
	CALM:1,
	BRAVE:2,
	RECKLESS:3
};
var BattleCharacterSize = {
	width:48,height:48
};
var BattleCharacterStatusConfig = {};
BattleCharacterStatusConfig.HP = "HP";
BattleCharacterStatusConfig.MP = "MP";
BattleCharacterStatusConfig.SP = "SP";
BattleCharacterStatusConfig.EXP = "Exp";
var CharacterMode = {
	SHOW_MOVE_ROAD : "showMoveRoad",
	STRATEGY_SELECT: "strategySelect",
	WAIT_ATTACK : "waitAttack",
	WAIT_SINGLE_COMBAT:"waitSingleCombat",
	MOVING : "moving",
	END_ACTION : "endAction"
};

var SingleCombatCharacterConfig = {};
SingleCombatCharacterConfig.INIT = "init";
SingleCombatCharacterConfig.START = "start";
