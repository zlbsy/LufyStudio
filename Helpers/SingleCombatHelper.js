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
function singleCombatCommandExecute(leftCharacter, rightCharacter) {
	leftCharacter.commandExecute();
	rightCharacter.commandExecute();
}
function singleCombatHert(leftCharacter, rightCharacter) {
	var hertValue = 5, cardinalNumber = 5;
	var value = leftCharacter.data.force() - rightCharacter.data.force();
	if(value > 0){
		hertValue += cardinalNumber * value / 90;
	}else{
		hertValue += cardinalNumber * value / 90;
		if(hertValue < 0.1){
			hertValue = 0.1;
		}
	}
	if(leftCharacter.currentCommand == SingleCombatCommand.ATTACK){
		hertValue *= 3;
	}else if(leftCharacter.currentCommand == SingleCombatCommand.DOUBLE_ATTACK){
		hertValue *= 2;
	}else if(leftCharacter.currentCommand == SingleCombatCommand.BIG_ATTACK){
		hertValue *= 5;
	}else if(leftCharacter.currentCommand == SingleCombatCommand.BACKSTROKE_ATTACK){
		hertValue *= 6;
	}else if(leftCharacter.currentCommand == SingleCombatCommand.SPECIAL_ATTACK){
		hertValue *= 8;
	}
	if(rightCharacter.currentCommand == SingleCombatCommand.DEFENCE && leftCharacter.currentCommand != SingleCombatCommand.BACKSTROKE_ATTACK){
		hertValue *= 0.5;
	}
	hertValue = hertValue >>> 0;
	console.log("hert>>>",rightCharacter.data.name(),value,hertValue);
	rightCharacter.changeHp(hertValue);
}
function singleCombatAttackActionComplete(currentCharacter, targetCharacter) {
	console.log("check" , currentCharacter.data.name() , ">" , targetCharacter.data.name());
	switch(currentCharacter.currentCommand){
		case SingleCombatCommand.ATTACK:
			singleCombatCommandCheckAttack(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DOUBLE_ATTACK:
			singleCombatCommandCheckDouBleAttack(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.BIG_ATTACK:
			singleCombatCommandBigAttack(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DEFENCE:
			console.log("轻伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DODGE:
			console.log("轻伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.BACKSTROKE_ATTACK:
			console.log("重伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.SPECIAL_ATTACK:
			singleCombatCommandSpecialAttack(currentCharacter, targetCharacter);
			break;
	}
}
function singleCombatCommandCheckAttack(currentCharacter, targetCharacter) {
	console.log("attack" , targetCharacter.currentCommand);
	switch(targetCharacter.currentCommand){
		case SingleCombatCommand.ATTACK:
			if(currentCharacter.isLeft){
				//TODO::挡格音效
				console.log("挡格音效");
			}
			break;
		case SingleCombatCommand.DOUBLE_ATTACK:
			//TODO::轻伤音效
			console.log("轻伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.BIG_ATTACK:
			//TODO::轻伤音效
			console.log("轻伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DEFENCE:
			//TODO::挡格音效
			console.log("挡格音效");
			targetCharacter.changeAction(CharacterAction.BLOCK);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DODGE:
			//TODO::抡空音效
			console.log("抡空音效");
			targetCharacter.dodge();
			break;
		case SingleCombatCommand.CHARGE:
			//TODO::轻伤音效
			console.log("轻伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.BACKSTROKE_ATTACK:
			targetCharacter.addBackstrokeScript();
			break;
		case SingleCombatCommand.SPECIAL_ATTACK:
			break;
	}
}
function singleCombatCommandCheckDouBleAttack(currentCharacter, targetCharacter) {
	console.log("doubleattack" , targetCharacter.currentCommand,targetCharacter.action);
	switch(targetCharacter.currentCommand){
		case SingleCombatCommand.ATTACK:
			if(targetCharacter.action == CharacterAction.ATTACK){
				console.log("-");
				break;
			}
			console.log("HERT");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DOUBLE_ATTACK:
			if(currentCharacter.isLeft){
				//TODO::挡格音效
				console.log("挡格音效");
			}
			break;
		case SingleCombatCommand.BIG_ATTACK:
			//TODO::轻伤音效
			console.log("轻伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			break;
		case SingleCombatCommand.DEFENCE:
			//TODO::挡格音效
			console.log("挡格音效");
			targetCharacter.changeAction(CharacterAction.BLOCK);
			break;
		case SingleCombatCommand.DODGE:
			//TODO::抡空音效
			console.log("抡空音效");
			break;
		case SingleCombatCommand.CHARGE:
			//TODO::轻伤音效
			console.log("轻伤音效");
			break;
		case SingleCombatCommand.BACKSTROKE_ATTACK:
		case SingleCombatCommand.SPECIAL_ATTACK:
			console.log("XXXXX");
			break;
	}
}
function singleCombatCommandBigAttack(currentCharacter, targetCharacter) {
	console.log("bigattack" , targetCharacter.currentCommand,targetCharacter.action);
	switch(targetCharacter.currentCommand){
		case SingleCombatCommand.ATTACK:
			break;
		case SingleCombatCommand.DOUBLE_ATTACK:
			break;
		case SingleCombatCommand.BIG_ATTACK:
			if(currentCharacter.isLeft){
				//TODO::挡格音效
				console.log("挡格音效");
			}
			break;
		case SingleCombatCommand.DEFENCE:
			//TODO::挡格音效
			console.log("挡格音效");
			targetCharacter.changeAction(CharacterAction.BLOCK);
			break;
		case SingleCombatCommand.DODGE:
			//TODO::抡空音效
			console.log("抡空音效");
			break;
		case SingleCombatCommand.CHARGE:
			//TODO::轻伤音效
			console.log("轻伤音效");
			break;
		case SingleCombatCommand.BACKSTROKE_ATTACK:
		case SingleCombatCommand.SPECIAL_ATTACK:
			console.log("XXXXX");
			break;
	}
}
function singleCombatCommandSpecialAttack(currentCharacter, targetCharacter) {
	console.log("special" , targetCharacter.currentCommand,targetCharacter.action);
	switch(targetCharacter.currentCommand){
		case SingleCombatCommand.ATTACK:
			console.log("重伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DOUBLE_ATTACK:
			console.log("重伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.BIG_ATTACK:
			console.log("重伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DEFENCE:
			console.log("重伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DODGE:
			//TODO::抡空音效
			console.log("抡空音效");
			break;
		case SingleCombatCommand.CHARGE:
			console.log("重伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.BACKSTROKE_ATTACK:
			break;
		case SingleCombatCommand.SPECIAL_ATTACK:
			console.log("重挡格音效");
			break;
	}
}