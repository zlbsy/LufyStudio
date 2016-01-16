var CharacterListEvent = {};
CharacterListEvent.SHOW = "characterList_show";
CharacterListEvent.CLOSE = "characterList_close";

var ArmListEvent = {};
ArmListEvent.SHOW = "armList_show";
ArmListEvent.CLOSE = "armList_close";

var LCityEvent = {};
LCityEvent.SELECT_CITY = "select_city";

/*
var BattleCharacterEvent = {};
BattleCharacterEvent.MOVE_COMPLETE = "moveComplete";
BattleCharacterEvent.SHOW_MOVE_ROAD = "showMoveRoad";
BattleCharacterEvent.MOVING = "moving";
BattleCharacterEvent.WAIT_ATTACK = "waitAttack";
BattleCharacterEvent.WAIT_SELECT = "waitSelect";
BattleCharacterEvent.ATTACK_ACTION_COMPLETE = "attackActionComplete";
BattleCharacterEvent.HERT_ACTION_COMPLETE = "hertActionComplete";*/

var CharacterActionEvent = {};
CharacterActionEvent.MOVE_COMPLETE = "moveComplete";

var BattleBoutEvent = {};
BattleBoutEvent.SHOW = "bout_show";
BattleBoutEvent.END = "bout_end";

var BattleCharacterActionEvent = {};
//攻击动作结束
BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE = "attackActionComplete";
//被攻击动作结束
BattleCharacterActionEvent.HERT_ACTION_COMPLETE = "hertActionComplete";
//档格动作结束
BattleCharacterActionEvent.BLOCK_ACTION_COMPLETE = "blockActionComplete";
//反击
BattleCharacterActionEvent.COUNTER_ATTACK = "counterAttack";

var BattleCharacterStatusEvent = {};
BattleCharacterStatusEvent.CHANGE_COMPLETE = "changeComplete";

var BattleSelectMenuEvent = {};
BattleSelectMenuEvent.ATTACK = "attack";
BattleSelectMenuEvent.MAGIC_SELECT = "magic_select";
BattleSelectMenuEvent.MAGIC_ATTACK = "magic_attack";
BattleSelectMenuEvent.SINGLE_COMBAT = "single_combat";
BattleSelectMenuEvent.STANDBY = "standby";
BattleSelectMenuEvent.CANCEL = "cancel";
BattleSelectMenuEvent.SELECT_MENU_SHOW = "select_menu_show";
BattleSelectMenuEvent.SELECT_MENU_HIDDEN = "select_menu_hidden";

var StrategyListEvent = {};
StrategyListEvent.SELECT = "strategyListSelect";
StrategyListEvent.CLOSE = "strategyListClose";

var BattleResultEvent = {};
BattleResultEvent.CLOSE_EXP = "close_exp";
BattleResultEvent.CLOSE_CAPTIVE = "close_captive";
BattleResultEvent.CAPTIVE_CAPTIVE = "captive_captive";
BattleResultEvent.SURRENDER_CAPTIVE = "surrender_captive";
BattleResultEvent.RELEASE_CAPTIVE = "release_captive";
BattleResultEvent.BEHEAD_CAPTIVE = "behead_captive";

if (!Array.getRandomArrays){
	Array.getRandomArrays = function(list,num){
		var result = [], length = list.length < num ? list.length : num;
		while (result.length < length){
			var i = Math.random() * list.length >>> 0;
			var index = result.findIndex(function(child){
				return child == i;
			});
			if(index >= 0){
				continue;
			}
			result.push(i);
		}
		for(var i=0;i<result.length;i++){
			result[i] = list[result[i]];
		}
		return result;
	};
}