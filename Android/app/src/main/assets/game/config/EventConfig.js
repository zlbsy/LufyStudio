var CharacterListEvent = {};
CharacterListEvent.SHOW = "characterList_show";
CharacterListEvent.CLOSE = "characterList_close";
CharacterListEvent.LIST_CHANGE = "characterList_list_change";

var ArmListEvent = {};
ArmListEvent.SHOW = "armList_show";
ArmListEvent.CLOSE = "armList_close";

var LCityEvent = {};
LCityEvent.SELECT_CITY = "select_city";
LCityEvent.CLOSE_SELECT_CITY = "close_select_city";

var ItemEvent = {};
ItemEvent.USE_ITEM = "user_item";

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
BattleSelectMenuEvent.MILITARY_ADVISER = "military_adviser";
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
BattleResultEvent.CLOSE_CAPTIVE_SELF = "close_captive_self";
BattleResultEvent.CLOSE_CAPTIVE_ENEMY = "close_captive_enemy";
BattleResultEvent.CAPTIVE_CAPTIVE = "captive_captive";
BattleResultEvent.SURRENDER_CAPTIVE = "surrender_captive";
BattleResultEvent.RELEASE_CAPTIVE = "release_captive";
BattleResultEvent.BEHEAD_CAPTIVE = "behead_captive";
BattleResultEvent.RESCUE_CAPTIVE = "rescue_captive";
BattleResultEvent.ATTACK_AND_OCCUPY = "attack_and_occupy";
BattleResultEvent.LOSE_CITY = "lose_city";
BattleResultEvent.CLOSE_FAIL_CAPTIVE = "close_fail_captive";
BattleResultEvent.CLOSE_FAIL_CAPTIVE_ENEMY = "close_fail_captive_enemy";
BattleResultEvent.CLOSE_FAIL_CAPTIVE_SELF = "close_fail_captive_self";
BattleResultEvent.LOSS_OF_OCCUPY = "lose_of_occupy";
