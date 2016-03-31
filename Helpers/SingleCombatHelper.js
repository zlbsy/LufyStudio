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
function selectSingleCombatCommand(commands, selectedCommands, characterModel){
	var commandProbability = SingleCombatCommandProbability[characterModel.disposition()];
	var canSelectCommand = [], commandCount = 0;
	for(var key in commandProbability){
		//console.log("key : "+key+"="+commandProbability[key]);
		var index = commands.findIndex(function(child){
			//console.log(child+"=="+key);
			return child == key;
		});
		if(index < 0){
			continue;
		}
		if(key == SingleCombatCommand.BACKSTROKE_ATTACK || key == SingleCombatCommand.SPECIAL_ATTACK){
			var index2 = selectedCommands.findIndex(function(child){
				return child == SingleCombatCommand.BACKSTROKE_ATTACK || child == SingleCombatCommand.SPECIAL_ATTACK;
			});
			if(index2 >= 0){
				continue;
			}
		}
		canSelectCommand.push(key);
		commandCount += commandProbability[key];
	}
	var randomIndex = Math.random() * commandCount;
	commandCount = 0;
	for(var i=0;i<canSelectCommand.length;i++){
		var key = canSelectCommand[i];
		commandCount += commandProbability[key];
		if(randomIndex < commandCount){
			return key;
		}
	}
	return null;
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
function getSingleCombatCommandFromOldCommand(oldCommand) {
	var commands = SingleCombatCommandChange[oldCommand];
	if(commands){
		return commands[Math.random() * commands.length >> 0];
	}
	return RandomSingleCombatCommands[Math.random() * RandomSingleCombatCommands.length >> 0];
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
	if(hertValue < 1){
		hertValue = 1;
	}
	rightCharacter.changeHp(hertValue);
}
//TODO::版本升级后，需做事件化调整
function singleCombatAttackActionComplete(currentCharacter, targetCharacter) {
	console.log("check" , currentCharacter.data.name() , ">" , targetCharacter.data.name());
	switch(currentCharacter.currentCommand){
		case SingleCombatCommand.ATTACK:
			singleCombatCommandCheckAttack(currentCharacter, targetCharacter);
			break;
		case SingleCombatCommand.DOUBLE_ATTACK:
			singleCombatCommandCheckDoubleAttack(currentCharacter, targetCharacter);
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
function singleCombatCommandCheckDoubleAttack(currentCharacter, targetCharacter) {
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
			currentCharacter.attackCount++;
			break;
	}
}
function singleCombatCommandBigAttack(currentCharacter, targetCharacter) {
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
			console.log("重挡格音效");
			targetCharacter.changeAction(CharacterAction.BLOCK);
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
			if(currentCharacter.isLeft){
				console.log("重挡格音效");
			}
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