function BattleCharacterAI(chara) {
	var self = this;
	self.chara = chara;
	self.herts = null;
}
BattleCharacterAI.prototype.setEvent = function() {
	var self = this;
	self.chara.removeAllEventListener();
	self.chara.addEventListener(CharacterActionEvent.MOVE_COMPLETE,function(event){
		BattleSelectMenuController.instance().show();
	});
};
BattleCharacterAI.prototype.magicAttack = function(target){
	var self = this;
	self.attackTarget = target;
	target.AI.attackTarget = self.chara;
	var direction = getDirectionFromTarget(self.chara, target);
	self.chara.setActionDirection(CharacterAction.MAGIC_ATTACK, direction);
	var effectView = new EffectStrategyView(null, self.chara);
	effectView.x = target.x;
	effectView.y = target.y;
	LMvc.BattleController.view.effectLayer.addChild(effectView);
};
BattleCharacterAI.prototype.physicalAttack = function(target) {
	var self = this;
	self.attackTarget = target;
	target.AI.attackTarget = self.chara;
	var direction = getDirectionFromTarget(self.chara, target);
	if(self.herts === null){
		if(self.chara.data.id() == BattleController.ctrlChara.data.id()){
			self.herts = [];
			var hertValue = calculateHertValue(self.chara, target, 1);
			var skill = self.chara.data.skill(SkillType.ATTACK);
			if(skill){
				//skillCalculateAttack();
			}
			var doubleAtt = calculateDoubleAtt(self.chara, target);
			var length = doubleAtt ? 2 : 1;
			for(var i=0;i<length;i++){
				var hertParams = new HertParams();
				hertParams.push(target,hertValue);
				var rangeAttackTarget = self.chara.data.currentSoldiers().rangeAttackTarget();
				for(var i = 0;i<rangeAttackTarget.length;i++){
					var range = rangeAttackTarget[i];
					if(range.x == 0 && range.y == 0){
						continue;
					}
					var chara = LMvc.BattleController.view.charaLayer.getCharacterFromLocation(target.locationX()+range.x, target.locationY()+range.y);
					
					if(!chara || isSameBelong(chara.belong,self.chara.belong)){
						continue;
					}
					hertParams.push(chara,calculateHertValue(self.chara, chara, 1));
				}
				self.herts.push(hertParams);
				//alert("self.herts.push(hertParams)="+hertParams.list.length);
			}
			var groupSkill = battleCanGroupSkill(self.chara);
			if(groupSkill){
				self.chara.groupSkill = groupSkill;
				self.herts[0].value = self.herts[0].value * groupSkill.correctionFactor() >>> 0;
			}
		}else{
			var hertValue = calculateHertValue(self.chara, target, 0.75);
			var hertParams = new HertParams();
			hertParams.push(target,hertValue);
			self.herts = [hertParams];
		}	
	}
	if(!self.chara.groupSkill && calculateFatalAtt(self.chara, target)){
		self.chara.isAngry = true;
		self.herts[0].value = self.herts[0].value * 1.25 >>> 0;
	}
	
	self.chara.setActionDirection(CharacterAction.ATTACK, direction);
	self.chara.addEventListener(BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE,self.attackActionComplete);
};
BattleCharacterAI.prototype.singleCombat = function(target) {
	var self = this;
	self.attackTarget = target;
	target.AI.attackTarget = self.chara;
	var direction = getDirectionFromTarget(self.chara, target);
	var directionTarget = getDirectionFromTarget(target, self.chara);
	target.toStatic(false);
	target.changeDirection(directionTarget);
	target.toStatic(true);
	self.chara.changeDirection(direction);
	battleSingleCombatCheck(self.chara);
};
BattleCharacterAI.prototype.attackActionComplete = function(event) {
	var chara = event.currentTarget;
	var self = chara.AI;
	chara.removeEventListener(BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE,self.attackActionComplete);
	chara.changeAction(chara.data.id() == BattleController.ctrlChara.data.id() ? CharacterAction.STAND : CharacterAction.MOVE);
	
	 
	var hertParams = self.herts[0];
	self.herts.shift();
	//alert("hertParams.list.length="+hertParams.list.length);
	for(var i = 0;i<hertParams.list.length;i++){
		var obj = hertParams.list[i];
		obj.chara.toStatic(false);
		var hitrate = calculateHitrate(chara,obj.chara);
		if(hitrate){
		
		var num = new Num(Num.MIDDLE,1,20);
		obj.chara.hertValue = obj.hertValue;
		num.setValue(obj.hertValue);
		
		num.x = obj.chara.x;
		num.y = obj.chara.y;
		chara.controller.view.baseLayer.addChild(num);
		LTweenLite.to(num,0.5,{y:num.y - 20,alpha:0,onComplete:function(obj){
			obj.remove();
		}});
		obj.chara.changeAction(CharacterAction.HERT);
		obj.chara.addEventListener(BattleCharacterActionEvent.HERT_ACTION_COMPLETE,self.attackTarget.AI.hertActionComplete);
	}else{
		obj.chara.changeAction(CharacterAction.BLOCK);
		obj.chara.addEventListener(BattleCharacterActionEvent.BLOCK_ACTION_COMPLETE,self.attackTarget.AI.blockActionComplete);
	}
	
	}
	return;
	if(hitrate){
		var num = new Num(Num.MIDDLE,1,20);
		self.attackTarget.hertValue = self.herts[0].value;
		num.setValue(self.herts[0].value);
		self.herts.shift();
		num.x = self.attackTarget.x;
		num.y = self.attackTarget.y;
		chara.controller.view.baseLayer.addChild(num);
		LTweenLite.to(num,0.5,{y:num.y - 20,alpha:0,onComplete:function(obj){
			obj.remove();
		}});
		self.attackTarget.changeAction(CharacterAction.HERT);
		self.attackTarget.addEventListener(BattleCharacterActionEvent.HERT_ACTION_COMPLETE,self.attackTarget.AI.hertActionComplete);
	}else{
		self.attackTarget.changeAction(CharacterAction.BLOCK);
		self.attackTarget.addEventListener(BattleCharacterActionEvent.BLOCK_ACTION_COMPLETE,self.attackTarget.AI.blockActionComplete);
	}
};
BattleCharacterAI.prototype.blockActionComplete = function(event) {
	var chara = event.currentTarget;
	var self = chara.AI;
	chara.removeEventListener(BattleCharacterActionEvent.BLOCK_ACTION_COMPLETE,self.hertActionComplete);
	chara.changeAction(CharacterAction.STAND);
	var statusView = new BattleCharacterStatusView(self.controller,{character:chara,belong:chara.belong,changeType:BattleCharacterStatusView.HP,changeValue:-100});
	statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,self.plusExp);
	//chara.addEventListener(BattleCharacterActionEvent.COUNTER_ATTACK,self.counterAttack);
	chara.controller.view.baseLayer.addChild(statusView);
};
BattleCharacterAI.prototype.hertActionComplete = function(event) {
	var chara = event.currentTarget;
	var self = chara.AI;
	chara.removeEventListener(BattleCharacterActionEvent.HERT_ACTION_COMPLETE,self.hertActionComplete);
	chara.changeAction(CharacterAction.STAND);
	var statusView = new BattleCharacterStatusView(self.controller,{character:chara,belong:chara.belong,changeType:BattleCharacterStatusView.HP,changeValue:-chara.hertValue});
	statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,self.plusExp);
	//chara.addEventListener(BattleCharacterActionEvent.COUNTER_ATTACK,self.counterAttack);
	chara.controller.view.baseLayer.addChild(statusView);
};
BattleCharacterAI.prototype.plusExp = function(event) {
	var chara = event.currentTarget.character;
	var self = chara.AI;
	var attackTarget = chara.AI.attackTarget;
	var statusView = new BattleCharacterStatusView(chara.AI.controller,{character:attackTarget,belong:attackTarget.belong,changeType:BattleCharacterStatusView.EXP,changeValue:30});
	statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,self.counterAttack);
	chara.controller.view.baseLayer.addChild(statusView);
};
BattleCharacterAI.prototype.counterAttack = function(event) {
	var attackChatacter = event.currentTarget.character;
	var chara = attackChatacter.AI.attackTarget;
	var self = chara.AI;
	//chara.removeEventListener(BattleCharacterActionEvent.COUNTER_ATTACK,self.counterAttack);
	if(attackChatacter.AI.herts && attackChatacter.AI.herts.length > 0){
		attackChatacter.AI.physicalAttack(chara);
		return;
	}
	
	if(chara.data.id() != BattleController.ctrlChara.data.id()){
		self.physicalAttack(BattleController.ctrlChara);
	}else{
		//TODO::
		console.log("can not counterAttack");
		if(self.herts.length > 0){
			self.physicalAttack(self.attackTarget);
			return;
		}
		self.herts = null;
		BattleController.ctrlChara.AI.endAction();
	}
};
BattleCharacterAI.prototype.endAction = function() {
	var self = this, chara = self.chara, target = self.attackTarget;
	
	if(target){
		target.AI.attackTarget = null;
		target.AI.herts = null;
		target.removeAllEventListener();
		target.toStatic(true);
	}
	self.attackTarget = null;
	self.herts = null;
	chara.removeAllEventListener();
	chara.changeAction(CharacterAction.STAND);
	chara.mode = CharacterMode.END_ACTION;
	chara.toStatic(true);
	//TODO::check change battle belong mode
	if(!LMvc.BattleController.view.charaLayer.isHasActiveCharacter(chara.belong)){
		if(chara.belong == Belong.SELF){
			var obj = {title:Language.get("确认"),message:Language.get("结束本回合吗？"),width:300,height:200,okEvent:self.boutEnd,cancelEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		}
	}	
};
BattleCharacterAI.prototype.boutEnd = function(event) {
	event.currentTarget.parent.remove();
	LMvc.BattleController.boutEnd();
};
BattleCharacterAI.prototype.singleCombatStart = function() {
	var self = this;
	console.log("BattleCharacterAI.prototype.singleCombatStart");
	LMvc.BattleController.loadSingleCombat();
};
BattleCharacterAI.prototype.strategySelect = function(strategyModel) {
	var self = this;
	LMvc.BattleController.view.roadLayer.setStrategyRoads(strategyModel.rangeAttack(),self.chara);
	self.chara.currentSelectStrategy = strategyModel;
	self.chara.mode = CharacterMode.STRATEGY_SELECT;
};

