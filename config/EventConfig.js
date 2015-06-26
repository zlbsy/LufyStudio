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

var BattleCharacterActionEvent = {};
//攻击动作结束
BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE = "attackActionComplete";
//被攻击动作结束
BattleCharacterActionEvent.HERT_ACTION_COMPLETE = "hertActionComplete";
//反击
BattleCharacterActionEvent.COUNTER_ATTACK = "counterAttack";

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
