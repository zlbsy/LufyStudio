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
	obj[SingleCombatCommand.ATTACK] = 3;
	obj[SingleCombatCommand.DOUBLE_ATTACK] = 2;
	obj[SingleCombatCommand.BIG_ATTACK] = 1;
	obj[SingleCombatCommand.DEFENCE] = 10;
	obj[SingleCombatCommand.DODGE] = 10;
	obj[SingleCombatCommand.CHARGE] = 3;
	obj[SingleCombatCommand.BACKSTROKE_ATTACK] = 40;
	obj[SingleCombatCommand.SPECIAL_ATTACK] = 20;
	data[CharacterDisposition.TIMID] = obj;
	obj = {};
	obj[SingleCombatCommand.ATTACK] = 10;
	obj[SingleCombatCommand.DOUBLE_ATTACK] = 3;
	obj[SingleCombatCommand.BIG_ATTACK] = 1;
	obj[SingleCombatCommand.DEFENCE] = 3;
	obj[SingleCombatCommand.DODGE] = 3;
	obj[SingleCombatCommand.CHARGE] = 3;
	obj[SingleCombatCommand.BACKSTROKE_ATTACK] = 35;
	obj[SingleCombatCommand.SPECIAL_ATTACK] = 25;
	data[CharacterDisposition.CALM] = obj;
	obj = {};
	obj[SingleCombatCommand.ATTACK] = 3;
	obj[SingleCombatCommand.DOUBLE_ATTACK] = 10;
	obj[SingleCombatCommand.BIG_ATTACK] = 3;
	obj[SingleCombatCommand.DEFENCE] = 1;
	obj[SingleCombatCommand.DODGE] = 1;
	obj[SingleCombatCommand.CHARGE] = 3;
	obj[SingleCombatCommand.BACKSTROKE_ATTACK] = 30;
	obj[SingleCombatCommand.SPECIAL_ATTACK] = 30;
	data[CharacterDisposition.BRAVE] = obj;
	obj = {};
	obj[SingleCombatCommand.ATTACK] = 2;
	obj[SingleCombatCommand.DOUBLE_ATTACK] = 3;
	obj[SingleCombatCommand.BIG_ATTACK] = 10;
	obj[SingleCombatCommand.DEFENCE] = 1;
	obj[SingleCombatCommand.DODGE] = 1;
	obj[SingleCombatCommand.CHARGE] = 3;
	obj[SingleCombatCommand.BACKSTROKE_ATTACK] = 20;
	obj[SingleCombatCommand.SPECIAL_ATTACK] = 40;
	data[CharacterDisposition.RECKLESS] = obj;
	return data;
})();

var SingleCombatCommandChange = (function(){
	//轻击->连击,防御
	//连击->重击,躲闪
	//重击->轻击,集气
	//防御->轻击,躲闪
	//躲闪->连击,集气
	//集气->重击,防御
	var data = [];
	data[SingleCombatCommand.ATTACK] = [SingleCombatCommand.DOUBLE_ATTACK, SingleCombatCommand.DEFENCE];
	data[SingleCombatCommand.DOUBLE_ATTACK] = [SingleCombatCommand.BIG_ATTACK, SingleCombatCommand.DODGE];
	data[SingleCombatCommand.BIG_ATTACK] = [SingleCombatCommand.ATTACK, SingleCombatCommand.CHARGE];
	data[SingleCombatCommand.DEFENCE] = [SingleCombatCommand.ATTACK, SingleCombatCommand.DODGE];
	data[SingleCombatCommand.DODGE] = [SingleCombatCommand.DOUBLE_ATTACK, SingleCombatCommand.CHARGE];
	data[SingleCombatCommand.CHARGE] = [SingleCombatCommand.BIG_ATTACK, SingleCombatCommand.DEFENCE];
	return data;
})();
