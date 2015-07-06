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
function checkSingleCombatCommandEnd(){
	var character = LMvc.SingleCombatController.view.characterLayer.childList.find(function(child){
		return child.constructor.name == "SingleCombatCharacterView" && child.action != CharacterAction.STAND;
	});
	if(character){
		return;
	}
	var view = LMvc.SingleCombatController.view;
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
	var talks;
	switch(mode){
		case SingleCombatTalkMode.DEBUT:
			talks = ["让你见识一下{0}的厉害！", "听过{0}的大名吗！", "在下{0}讨教敌将高招！"];
			return String.format(talks[Math.random() * talks.length >> 0],characterModel.name());
		case SingleCombatTalkMode.BACK:
			talks = ["好厉害，还是撤退吧！", "三十六计走为上！", "我认输了！"];
			break;
		case SingleCombatTalkMode.ZHUI:
			talks = ["休想逃跑!", "留下你的脑袋！"];
			break;
		case SingleCombatTalkMode.BACK_ATTACK:
			talks = ["你上当了！", "你太笨了！", "有勇无谋之辈！"];
			break;
	}
	return talks[Math.random() * talks.length >> 0];
}