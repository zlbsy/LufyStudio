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