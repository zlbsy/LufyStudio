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
function getSingleCombatCommand(commands, angry, force, oldCommand) {
	var specialIndex,backstrokeIndex;
	if(angry == 100){
		specialIndex = commands.findIndex(function(child){
			return child == SingleCombatCommand.SPECIAL_ATTACK;
		});
		if(specialIndex < 0){
			return SingleCombatCommand.SPECIAL_ATTACK;
		}
		if(force >= 90){
			backstrokeIndex = commands.findIndex(function(child){
				return child == SingleCombatCommand.BACKSTROKE_ATTACK;
			});
			if(backstrokeIndex < 0 && Math.random() > 0.5){
				return SingleCombatCommand.BACKSTROKE_ATTACK;
			}
		}
	}
	if(oldCommand){
		return getSingleCombatCommandFromOldCommand(oldCommand);
	}
	var index = Math.random() * RandomSingleCombatCommands.length >> 0;
	return RandomSingleCombatCommands[index];
}
/*
轻连重防躲集绝
重轻连重连轻随
集躲防集放躲机*/
function getSingleCombatCommandFromOldCommand(oldCommand) {
	switch(oldCommand){
		case SingleCombatCommand.ATTACK:
			return Math.random() > 0.5 ? SingleCombatCommand.BIG_ATTACK : SingleCombatCommand.CHARGE;
		case SingleCombatCommand.DOUBLE_ATTACK:
			return Math.random() > 0.5 ? SingleCombatCommand.ATTACK : SingleCombatCommand.DODGE;
		case SingleCombatCommand.BIG_ATTACK:
			return Math.random() > 0.5 ? SingleCombatCommand.DOUBLE_ATTACK : SingleCombatCommand.DEFENCE;
		case SingleCombatCommand.DEFENCE:
			return Math.random() > 0.5 ? SingleCombatCommand.BIG_ATTACK : SingleCombatCommand.DOUBLE_ATTACK;
		case SingleCombatCommand.DODGE:
			return Math.random() > 0.5 ? SingleCombatCommand.DOUBLE_ATTACK : SingleCombatCommand.DEFENCE;
		case SingleCombatCommand.CHARGE:
			return Math.random() > 0.5 ? SingleCombatCommand.ATTACK : SingleCombatCommand.DODGE;
		case SingleCombatCommand.BACKSTROKE_ATTACK:
		case SingleCombatCommand.SPECIAL_ATTACK:
			return RandomSingleCombatCommands[Math.random() * RandomSingleCombatCommands.length >> 0];
	}
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
			targetCharacter.addDodgeScript(true);
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
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DEFENCE:
			//TODO::挡格音效
			console.log("挡格音效");
			targetCharacter.changeAction(CharacterAction.BLOCK);
			break;
		case SingleCombatCommand.DODGE:
			if(currentCharacter.attackCount == 0){
				//TODO::抡空音效
				console.log("抡空音效");
				targetCharacter.addDodgeScript(false);
			}else{
				//TODO::轻伤音效
				console.log("轻伤音效");
				targetCharacter.changeAction(CharacterAction.HERT);
				singleCombatHert(currentCharacter, targetCharacter);
			}
			break;
		case SingleCombatCommand.CHARGE:
			//TODO::轻伤音效
			console.log("轻伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.BACKSTROKE_ATTACK:
			currentCharacter.attackCount++;
			targetCharacter.addBackstrokeScript();
			break;
		case SingleCombatCommand.SPECIAL_ATTACK:
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
				//TODO::重挡格音效
				console.log("重挡格音效");
			}
			break;
		case SingleCombatCommand.DEFENCE:
			//TODO::挡格音效
			console.log("挡格音效");
			targetCharacter.changeAction(CharacterAction.BLOCK);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DODGE:
			//TODO::重伤音效
			console.log("重伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.CHARGE:
			//TODO::重伤音效
			console.log("重伤音效");
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
			if(Math.random() > 0.5){
				//TODO::抡空音效
				console.log("抡空音效");
				targetCharacter.addDodgeScript(false);
			}else{
				targetCharacter.changeAction(CharacterAction.HERT);
				singleCombatHert(currentCharacter, targetCharacter);
			}
			break;
		case SingleCombatCommand.CHARGE:
			console.log("重伤音效");
			targetCharacter.changeAction(CharacterAction.HERT);
			singleCombatHert(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.BACKSTROKE_ATTACK:
			targetCharacter.addBackstrokeScript();
			break;
		case SingleCombatCommand.SPECIAL_ATTACK:
			console.log("重挡格音效");
			break;
	}
}
function checkSingleCombatCommandEnd(){
	var view = LMvc.SingleCombatController.view;
	if(view.commandEnd){
		return;
	}
	var character = view.characterLayer.childList.find(function(child){
		return child.constructor.name == "SingleCombatCharacterView" && (child.action != CharacterAction.STAND || child.filters);
	});
	if(character){
		return;
	}
	view.commandEnd = true;
	if(view.executeIndex < 2){
		setTimeout(view.execute,1000);
	}else{
		setTimeout(function(){
			LTweenLite.to(view.commandLayer,0.2,{alpha:0,onComplete:function(e){
				var layer = e.target;
				layer.die();
				layer.removeAllChild();
				layer.alpha = 1;
			}});
			view.leftCharacter.setCommands();
			view.rightCharacter.setCommands();
			view.leftCharacter.clearCommand();
			view.rightCharacter.clearCommand();
			view.addCtrlButton();
		},1000);
	}
}
function getSingleCombatTalk(characterModel, mode){
	var length;
	switch(mode){
		case SingleCombatTalkMode.DEBUT:
			return String.format(Language.getSingleCombat(SingleCombatTalkMode.DEBUT + (Math.random() * 4 >> 0)),characterModel.name());
		case SingleCombatTalkMode.BACK:
			length = 4;
			break;
		case SingleCombatTalkMode.PURSUIT:
			length = 2;
			break;
		case SingleCombatTalkMode.BACK_ATTACK:
			length = 3;
			break;
	}
	return Language.getSingleCombat(mode + (Math.random() * length >>> 0));
}