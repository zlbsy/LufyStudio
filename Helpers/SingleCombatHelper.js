function getSingleCombatCommandCount(force){
	if(force > 94){
		return 6;
	}else if(force > 80){
		return 5;
	}else if(force > 60){
		return 4;
	}else{
		return 3;
	}
}
function getSingleCombatCommand(commands, angry, force) {
	var specialIndex;
	if(angry == 100){
		specialIndex = commands.findIndex(function(child){
			return child == SingleCombatCommand.BACKSTROKE_ATTACK || child == SingleCombatCommand.SPECIAL_ATTACK;
		});
		if(specialIndex < 0){
			return getSpecialSingleCombatCommand(force);
		}
	}
	var index = Math.random() * RandomSingleCombatCommands.length >> 0;
	return RandomSingleCombatCommands[index];
}
function getSpecialSingleCombatCommand(force) {
	if(force < 90){
		return SingleCombatCommand.BACKSTROKE_ATTACK;
	}
	if(Math.random() > 0.5){
		return SingleCombatCommand.BACKSTROKE_ATTACK;
	}
	return SingleCombatCommand.SPECIAL_ATTACK;
}