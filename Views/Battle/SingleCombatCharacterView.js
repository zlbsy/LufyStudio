function SingleCombatCharacterView(controller, id, w, h, isLeft) {
	var self = this;
	LExtends(self, BattleCharacterView, [controller, id, w, h]);
	self.isLeft = isLeft;
	self.commands = [];
	self.selectedCommands = [];
	self.selectedButtons = [];
	self.maxCommand = getSingleCombatCommandCount(self.data.force());
	self.setCommands();
	self.singleMode = SingleCombatCharacterConfig.INIT;
	self.addEventListener(BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE,self.attackActionComplete);
}
SingleCombatCharacterView.prototype.moveTo = function(x,y){
	var self = this;
	self.setRoad([{x:x/BattleCharacterSize.width,y:y/BattleCharacterSize.height}]);
};
SingleCombatCharacterView.prototype.toStatic = function(value){
	//覆盖父类处理
};
SingleCombatCharacterView.prototype.setCommands=function(){
	var self = this, command;
	self.selectedButtons.length = 0;
	while(self.commands.length < self.maxCommand){
		command = getSingleCombatCommand(self.commands,self.angry,self.data.force());
		if(self.isLeft){
			command = SingleCombatCommand.BIG_ATTACK;
		}else{
			command = SingleCombatCommand.SPECIAL_ATTACK;
		}
		self.commands.push(command);
	}
};
SingleCombatCharacterView.prototype.toSelectCommand=function(index){
	var self = this;
	if(typeof index != UNDEFINED){
		var command = self.commands[index];
		self.commands.splice(index, 1);
		self.selectedCommands.push(command);
		return;
	}
	while(self.selectedCommands.length < 2){
		var index = self.commands.length * Math.random() >> 0;
		var command = self.commands[index];
		self.commands.splice(index, 1);
		self.selectedCommands.push(command);
	}
};
SingleCombatCharacterView.prototype.actionComplete = function(event){
	var self = event.currentTarget.parent.parent;
	switch(self.action){
		case CharacterAction.ATTACK:
			console.log("self.singleMode="+self.singleMode + ",self.attackCount="+self.attackCount);
			if(self.singleMode == SingleCombatCharacterConfig.INIT){
				self.anime.stop();
				self.dispatchEvent(LEvent.COMPLETE);
				self.singleMode = SingleCombatCharacterConfig.START;
			}else if(self.singleMode == SingleCombatCharacterConfig.START && self.currentCommand == SingleCombatCommand.DOUBLE_ATTACK && self.attackCount++ == 0){
				self.changeAction(CharacterAction.ATTACK);
			}else if(self.singleMode == SingleCombatCharacterConfig.START && self.currentCommand == SingleCombatCommand.BACKSTROKE_ATTACK){
				self.changeAction(CharacterAction.STAND);
				LGlobal.script.analysis();
			}else if(self.singleMode == SingleCombatCharacterConfig.START){
				self.changeAction(CharacterAction.STAND);
				checkSingleCombatCommandEnd();
			}
			break;
		case CharacterAction.HERT:
			if(self.currentCommand == SingleCombatCommand.DOUBLE_ATTACK && self.attackCount++ == 0){
				self.changeAction(CharacterAction.ATTACK);
			}else{
				self.changeAction(CharacterAction.STAND);
				checkSingleCombatCommandEnd();
			}
			break;
		case CharacterAction.BLOCK:
			if(self.targetCharacter.currentCommand == SingleCombatCommand.ATTACK || (self.targetCharacter.currentCommand == SingleCombatCommand.DOUBLE_ATTACK && self.targetCharacter.attackCount > 0)){
				self.changeAction(CharacterAction.ATTACK);
			}else{
				self.changeAction(CharacterAction.STAND);
				checkSingleCombatCommandEnd();
			}
			break;
	}
};
SingleCombatCharacterView.prototype.attackActionComplete = function(event){
	var self = event.currentTarget;
	//console.log("S ",self.data.name(),self.anime.colIndex,self.anime.isMirror,self.currentCommand);
	singleCombatAttackActionComplete(self, self.targetCharacter);
};
SingleCombatCharacterView.prototype.showLight = function(){
	var self = this;
	self.filterValue = 1;
	var shadowColor = "#FFFF00";
	if(self.currentCommand == SingleCombatCommand.SPECIAL_ATTACK){
		shadowColor = "#FF0000";
	}
	var shadow = new LDropShadowFilter(0,0,shadowColor,self.filterValue);
	self.filters = [shadow];
	var func = function(event){
		var obj = event.target;
		obj.filters[0].shadowBlur = obj.filterValue;
	};
	if(self.currentCommand == SingleCombatCommand.BIG_ATTACK){
		LTweenLite.to(self,0.2,{filterValue:30,onUpdate:func}).to(self,0.2,{filterValue:1,onUpdate:func,onComplete:self.showLightComplete});
	}else if(self.currentCommand == SingleCombatCommand.SPECIAL_ATTACK){
		LTweenLite.to(self,0.2,{filterValue:30,onUpdate:func}).to(self,0.2,{filterValue:1,onUpdate:func})
		.to(self,0.2,{filterValue:30,onUpdate:func}).to(self,0.2,{filterValue:1,onUpdate:func})
		.to(self,0.2,{filterValue:30,onUpdate:func}).to(self,0.2,{filterValue:1,onUpdate:func})
		.to(self,0.2,{filterValue:30,onUpdate:func}).to(self,0.2,{filterValue:1,onUpdate:func,onComplete:self.showLightComplete});
	}
};
SingleCombatCharacterView.prototype.showLightComplete = function(event){
	var self = event.target;
	self.filters = null;
	if(self.currentCommand == SingleCombatCommand.SPECIAL_ATTACK){
		var effect = new SpecialEffectView(self.controller);
		self.parent.parent.addChild(effect);
		effect.addEventListener(LEvent.COMPLETE,function(e){
			self.changeAction(CharacterAction.ATTACK);
		});
	}
};
SingleCombatCharacterView.prototype.showRunningCommand = function(index){
	var self = this;
	self.selectedButtons.forEach(function(child){
		child.alpha = 0.5;
	});
	self.selectedButtons[index].alpha = 1;
	self.currentCommand = self.selectedCommands[index];
};
SingleCombatCharacterView.prototype.commandExecute = function(){
	var self = this;
	switch(self.currentCommand){
		case SingleCombatCommand.ATTACK:
			self.changeAction(CharacterAction.ATTACK);
			break;
		case SingleCombatCommand.DOUBLE_ATTACK:
			self.attackCount = 0;
			self.changeAction(CharacterAction.ATTACK);
			break;
		case SingleCombatCommand.BIG_ATTACK:
			self.showLight();
			self.changeAction(CharacterAction.ATTACK);
			break;
		case SingleCombatCommand.SPECIAL_ATTACK:
			self.showLight();
			break;
	}
};
SingleCombatCharacterView.prototype.clearCommand = function(){
	var self = this;
	if(self.currentCommand == SingleCombatCommand.CHARGE){
		self.barAngry.changeValue(10 + 20);
	}else{
		self.barAngry.changeValue(10);
	}
};
SingleCombatCharacterView.prototype.changeHp = function(value){
	this.barHp.changeValue(-value);
	this.barAngry.changeValue(value);
};
SingleCombatCharacterView.prototype.addDodgeScript = function(toAttack){
	var self = this;
	var script = "SGJSingleCombat.dodge("+self.data.id()+");";
	script += "SGJSingleCombat.moveTo("+self.data.id()+",relative,forward,"+BattleCharacterSize.width+");";
	if(toAttack){
		script += "SGJSingleCombat.changeAction("+self.data.id()+","+CharacterAction.ATTACK+",1);";
	}
	LGlobal.script.addScript(script);
};
SingleCombatCharacterView.prototype.addBackstrokeScript = function(){
	var self = this;
	var script = "SGJSingleCombat.dodge("+self.data.id()+");";
	script += "SGJSingleCombat.talk("+self.data.id()+","+SingleCombatTalkMode.BACK+");";
	script += "SGJSingleCombat.moveTo("+self.data.id()+",relative,backward,"+BattleCharacterSize.width+");";
	script += "SGJSingleCombat.talk("+self.targetCharacter.data.id()+","+SingleCombatTalkMode.ZHUI+");";
	script += "SGJSingleCombat.moveTo("+self.targetCharacter.data.id()+",relative,forward,"+(BattleCharacterSize.width*2)+");";
	script += "SGJSingleCombat.talk("+self.data.id()+","+SingleCombatTalkMode.BACK_ATTACK+");";
	script += "SGJSingleCombat.changeDirection("+self.data.id()+",forward);";
	script += "SGJSingleCombat.changeAction("+self.data.id()+","+CharacterAction.ATTACK+",1);";
	script += "Wait.time(0.5);";
	script += "SGJSingleCombat.moveTo("+self.targetCharacter.data.id()+",absolute,"+self.targetCharacter.startPosition()+");";
	script += "SGJSingleCombat.changeDirection("+self.targetCharacter.data.id()+",forward);";
	script += "SGJSingleCombat.moveTo("+self.data.id()+",absolute,"+self.startPosition()+");";
	script += "SGJSingleCombat.changeDirection("+self.data.id()+",forward);";
	script += "SGJSingleCombat.checkCommandEnd();";
	LGlobal.script.addScript(script);
};
SingleCombatCharacterView.prototype.startPosition = function(){
	return this.isLeft ? LMvc.SingleCombatController.view.leftCharacterX : LMvc.SingleCombatController.view.rightCharacterX;
};
SingleCombatCharacterView.prototype.getDebutTalk = function(){
	LGlobal.script.addScript("SGJSingleCombat.talk("+this.data.id()+","+SingleCombatTalkMode.DEBUT+");");
};

