var SingleCombatCommand = {
	ATTACK:"single_command_attack",//轻击 3
	DOUBLE_ATTACK:"single_command_double_attack",//连击 2
	BIG_ATTACK:"single_command_big_attack",//重击 5
	DEFENCE:"single_command_defence",//防御 3
	DODGE:"single_command_dodge",//躲闪 3
	CHARGE:"single_command_charge",//集气 0
	BACKSTROKE_ATTACK:"single_command_backstroke_attack",//回马攻击 6
	SPECIAL_ATTACK:"single_command_special_attack",//全力一击 8
};
var RandomSingleCombatCommands = [SingleCombatCommand.ATTACK, SingleCombatCommand.DOUBLE_ATTACK, SingleCombatCommand.BIG_ATTACK, SingleCombatCommand.DEFENCE, SingleCombatCommand.DODGE, SingleCombatCommand.CHARGE];

SingleCombatTalkMode = {};
SingleCombatTalkMode.DEBUT = "Debut";
SingleCombatTalkMode.BACK = "Back";
SingleCombatTalkMode.PURSUIT = "Pursuit";
SingleCombatTalkMode.BACK_ATTACK = "Back_attack";

var SingleCombatCommandProbability = (function(){
	var data = [], obj;
	obj = {};
	obj[SingleCombatCommand.ATTACK] = 5;
	obj[SingleCombatCommand.DOUBLE_ATTACK] = 3;
	obj[SingleCombatCommand.BIG_ATTACK] = 1;
	obj[SingleCombatCommand.DEFENCE] = 10;
	obj[SingleCombatCommand.DODGE] = 10;
	obj[SingleCombatCommand.CHARGE] = 3;
	obj[SingleCombatCommand.BACKSTROKE_ATTACK] = 40;
	obj[SingleCombatCommand.SPECIAL_ATTACK] = 20;
	data[CharacterDisposition.TIMID] = obj;
	obj = {};
	obj[SingleCombatCommand.ATTACK] = 10;
	obj[SingleCombatCommand.DOUBLE_ATTACK] = 7;
	obj[SingleCombatCommand.BIG_ATTACK] = 5;
	obj[SingleCombatCommand.DEFENCE] = 5;
	obj[SingleCombatCommand.DODGE] = 5;
	obj[SingleCombatCommand.CHARGE] = 4;
	obj[SingleCombatCommand.BACKSTROKE_ATTACK] = 35;
	obj[SingleCombatCommand.SPECIAL_ATTACK] = 25;
	data[CharacterDisposition.CALM] = obj;
	obj = {};
	obj[SingleCombatCommand.ATTACK] = 5;
	obj[SingleCombatCommand.DOUBLE_ATTACK] = 10;
	obj[SingleCombatCommand.BIG_ATTACK] = 7;
	obj[SingleCombatCommand.DEFENCE] = 3;
	obj[SingleCombatCommand.DODGE] = 3;
	obj[SingleCombatCommand.CHARGE] = 3;
	obj[SingleCombatCommand.BACKSTROKE_ATTACK] = 30;
	obj[SingleCombatCommand.SPECIAL_ATTACK] = 30;
	data[CharacterDisposition.BRAVE] = obj;
	obj = {};
	obj[SingleCombatCommand.ATTACK] = 5;
	obj[SingleCombatCommand.DOUBLE_ATTACK] = 7;
	obj[SingleCombatCommand.BIG_ATTACK] = 10;
	obj[SingleCombatCommand.DEFENCE] = 3;
	obj[SingleCombatCommand.DODGE] = 3;
	obj[SingleCombatCommand.CHARGE] = 3;
	obj[SingleCombatCommand.BACKSTROKE_ATTACK] = 20;
	obj[SingleCombatCommand.SPECIAL_ATTACK] = 40;
	data[CharacterDisposition.RECKLESS] = obj;
	return data;
})();
