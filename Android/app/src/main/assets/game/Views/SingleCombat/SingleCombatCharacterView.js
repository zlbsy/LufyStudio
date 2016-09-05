function SingleCombatCharacterView(controller, id, w, h, isLeft) {
	var self = this;
	LExtends(self, BattleCharacterView, [controller, id, w, h]);
	self.isLeft = isLeft;
	self.isFail = false;
	self.bufferEnable = false;
	self.addAngry = 10;
	self.addBuffer = 0;
	self.addHP = 0;
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
SingleCombatCharacterView.prototype.checkBuffer = function(){
	var self = this;
	if(self.bufferEnable){
		self.buffer().visible = true;
		self.bufferEnable = false;
	}
};
SingleCombatCharacterView.prototype.buffer = function(){
	var self = this;
	if(self._buffer){
		return self._buffer;
	}
	var data = LMvc.datalist["attack_up_effect"];
	var list = LGlobal.divideCoordinate(data.width,data.height, data.height/data.width, 1);
	var arr = [];
	for(var i=7,l=list.length;i<l;i++){
		arr.push(list[i][0]);
	}
	var anime = new LAnimationTimeline(new LBitmapData(data), [arr]);
	anime.alpha = 0.3;
	anime.speed = 2;
	anime.visible = false;
	anime.x = (BattleCharacterSize.width - anime.getWidth()) * 0.5;
	anime.y = (BattleCharacterSize.height - anime.getHeight()) * 0.5;
	self.addChild(anime);
	self._buffer = anime;
	return self._buffer;
};
SingleCombatCharacterView.prototype.setCommands=function(){
	var self = this, command, oldCommand;
	if(self.barAngry){
		self.barAngry.changeValue(self.addAngry);
		self.addAngry = 10;
	}
	if(self.addHP > 0){
		self.barHp.changeValue(self.addHP);
		self.addHP = 0;
	}
	if(self.addBuffer > 0){
		self.addBuffer = 0;
	}
	for(var i=0;i<self.selectedCommands.length;i++){
		oldCommand = self.selectedCommands[0];
		command = getSingleCombatCommand(self.commands,self.barAngry.value,self.data.force(),oldCommand);
		self.commands.push(command);
	}
	while(self.commands.length < self.maxCommand){
		command = getSingleCombatCommand(self.commands,0,self.data.force());
		self.commands.push(command);
	}
};
SingleCombatCharacterView.prototype.clearCommand = function(){
	var self = this;
	self.selectedCommands.length = 0;
	self.selectedButtons.length = 0;
	self.currentCommand = null;
};
SingleCombatCharacterView.prototype.toSelectCommand=function(command){
	var self = this;
	if(typeof command != UNDEFINED){
		var index = self.commands.findIndex(function(child){
			return child == command;
		});
		self.commands.splice(index, 1);
		self.selectedCommands.push(command);
		return;
	}
	
	while(self.selectedCommands.length < 2){
		var index;
		var selectCommand = selectSingleCombatCommand(self.commands, self.selectedCommands, self.data);
		if(selectCommand){
			index = self.commands.findIndex(function(child){
				return child == selectCommand;
			});
		}else{
			index = self.commands.length * Math.random() >> 0;
		}
		command = self.commands[index];
		self.commands.splice(index, 1);
		self.selectedCommands.push(command);
	}
};
SingleCombatCharacterView.prototype.actionComplete = function(event){
	var self = event.currentTarget.parent.parent;
	if(self.isFail || self.targetCharacter.isFail){
		self.changeAction(CharacterAction.STAND);
		return;
	}
	//TODO::版本升级后，需做事件化调整
	switch(self.action){
		case CharacterAction.ATTACK:
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
			self.buffer().visible = false;
			var targetCommand = self.targetCharacter.currentCommand;
			if(self.currentCommand == SingleCombatCommand.DOUBLE_ATTACK &&
				targetCommand != SingleCombatCommand.SPECIAL_ATTACK &&
				self.attackCount++ == 0){
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
		case SingleCombatCommand.DEFENCE:
		case SingleCombatCommand.DODGE:
		case SingleCombatCommand.CHARGE:
		case SingleCombatCommand.HEAL:
		case SingleCombatCommand.BUFFER:
		case SingleCombatCommand.BACKSTROKE_ATTACK:
			if(self.isLeft && 
			(self.targetCharacter.currentCommand == SingleCombatCommand.DEFENCE 
			|| self.targetCharacter.currentCommand == SingleCombatCommand.DODGE 
			|| self.targetCharacter.currentCommand == SingleCombatCommand.CHARGE 
			|| self.targetCharacter.currentCommand == SingleCombatCommand.HEAL
			|| self.targetCharacter.currentCommand == SingleCombatCommand.BUFFER
			|| self.targetCharacter.currentCommand == SingleCombatCommand.BACKSTROKE_ATTACK)){
					checkSingleCombatCommandEnd();
			}
			if(self.currentCommand == SingleCombatCommand.CHARGE){
				self.addAngry += 20;
			}else if(self.currentCommand == SingleCombatCommand.HEAL){
				self.addHP = 20;
			}else if(self.currentCommand == SingleCombatCommand.BUFFER){
				self.bufferEnable = true;
			}else if(self.currentCommand == SingleCombatCommand.BACKSTROKE_ATTACK){
				self.barAngry.changeValue(-80);
			}
			break;
		case SingleCombatCommand.SPECIAL_ATTACK:
			self.barAngry.changeValue(-100);
			self.showLight();
			break;
	}
	if(self.currentCommand != SingleCombatCommand.BACKSTROKE_ATTACK && self.currentCommand != SingleCombatCommand.SPECIAL_ATTACK){
		return;
	}
	var index = self.commands.findIndex(function(child){
		return child == SingleCombatCommand.BACKSTROKE_ATTACK || child == SingleCombatCommand.SPECIAL_ATTACK;
	});
	if(index >= 0){
		self.commands.splice(index, 1);
	}
};
SingleCombatCharacterView.prototype.changeHp = function(value){
	var self = this;
	self.barHp.changeValue(-value);
	self.barAngry.changeValue(value);
	if(self.barHp.value == 0 && !self.isFail){
		LMvc.SingleCombatController.view.commandEnd = true;
		self.isFail = true;
		self.barHp.addEventListener(LEvent.COMPLETE,self.fail.bind(self));
	}
};
SingleCombatCharacterView.prototype.singleCombatEnd = function(event){
	var self = this, obj;
	self.targetCharacter.data.HP(self.targetCharacter.barHp.value);
	var dieChara = LMvc.BattleController.view.charaLayer.getCharacter(null,self.data.id());
	self.controller.over();
	dieChara.isSingleCombat = true;
	dieChara.data.troops(0);
	dieChara.data.wounded(0);
	if(dieChara.data.id() == BattleController.ctrlChara.data.id()){
		BattleController.ctrlChara.AI.endAction();
	}else{
		var statusView = new BattleCharacterStatusView(LMvc.BattleController,BattleController.ctrlChara);
		var exp = calculateExp(BattleController.ctrlChara, dieChara) * 3;
		statusView.push(BattleCharacterStatusConfig.EXP, exp);
		
		statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,function(){
			BattleController.ctrlChara.AI.endAction();
		});
		LMvc.BattleController.view.baseLayer.addChild(statusView);
		statusView.startTween();
	}
	//BattleController.ctrlChara.AI.endAction();
};
SingleCombatCharacterView.prototype.fail = function(event){
	var self = this, obj;
	if(self.controller.fromController.constructor.name == "BattleController"){
		self.singleCombatEnd();
		return;
	}else if(self.controller.fromController.constructor.name == "TournamentsController"){
		if(self.isLeft){
			self.controller.fromController.view.fail();
		}else{
			self.controller.fromController.view.win();
		}
		return;
	}
	var view = LMvc.SingleCombatController.view;
	var arena = LMvc.SingleCombatArenaController;
	if(self.isLeft || arena.getValue("enemyList").length == 0){
		obj = {title:Language.get("final_record"),message:String.format(Language.get("consecutive_wins"),arena.getValue("killedEnemyList").length + (arena.getValue("enemyList").length == 0 ? 1 : 0)),width:300,height:240,okEvent:view.restart};
	}else{
		obj = {title:Language.get("battle_win"),message:String.format(Language.get("continue_challenge_question"),arena.getValue("killedEnemyList").length + 1),width:300,height:240,okEvent:view.keepUp,cancelEvent:view.restart};
	}
	var windowLayer = ConfirmWindow(obj);
	LMvc.SingleCombatController.view.addChild(windowLayer);
};
SingleCombatCharacterView.prototype.addDodgeScript = function(toAttack){
	var self = this;
	var script = "SGJSingleCombat.dodge("+self.data.id()+");";
	script += "SGJSingleCombat.moveTo("+self.data.id()+",relative,forward,"+BattleCharacterSize.width+");";
	if(toAttack){
		script += "SGJSingleCombat.changeAction("+self.data.id()+","+CharacterAction.ATTACK+",1);";
	}else{
		script += "SGJSingleCombat.checkCommandEnd();";
	}
	LGlobal.script.addScript(script);
};
SingleCombatCharacterView.prototype.addBackstrokeScript = function(){
	var self = this;
	var script = "SGJSingleCombat.dodge("+self.data.id()+");";
	script += "SGJSingleCombat.talk("+self.data.id()+","+SingleCombatTalkMode.BACK+");";
	script += "SGJSingleCombat.moveTo("+self.data.id()+",relative,backward,"+BattleCharacterSize.width+");";
	script += "SGJSingleCombat.talk("+self.targetCharacter.data.id()+","+SingleCombatTalkMode.PURSUIT+");";
	script += "SGJSingleCombat.moveTo("+self.targetCharacter.data.id()+",relative,forward,"+(BattleCharacterSize.width*2)+");";
	script += "SGJSingleCombat.talk("+self.data.id()+","+SingleCombatTalkMode.BACK_ATTACK+");";
	script += "SGJSingleCombat.changeDirection("+self.data.id()+",forward);";
	script += "SGJSingleCombat.changeAction("+self.data.id()+","+CharacterAction.ATTACK+",1);";
	script += "SGJSingleCombat.playSE(Se_hert);";
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
