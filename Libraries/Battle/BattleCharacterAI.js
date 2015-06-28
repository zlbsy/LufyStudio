function BattleCharacterAI(chara) {
	var self = this;
	self.chara = chara;
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
	self.target = target;
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
	self.target = target;
	target.AI.attackTarget = self.chara;
	var direction = getDirectionFromTarget(self.chara, target);
	
	self.chara.setActionDirection(CharacterAction.ATTACK, direction);
	self.chara.addEventListener(BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE,self.attackActionComplete);
};
BattleCharacterAI.prototype.singleCombat = function(target) {
	var self = this;
	self.target = target;
	target.AI.attackTarget = self.chara;
	var direction = getDirectionFromTarget(self.chara, target);
	var directionTarget = getDirectionFromTarget(target, self.chara);
	target.toStatic(false);
	target.changeDirection(directionTarget);
	target.toStatic(true);
	self.chara.changeDirection(direction);
	singleCombatCheck(self.chara);
};
BattleCharacterAI.prototype.attackActionComplete = function(event) {
	var chara = event.currentTarget;
	var self = chara.AI;
	chara.removeEventListener(BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE,self.attackActionComplete);
	chara.changeAction(chara.data.id() == BattleController.ctrlChara.data.id() ? CharacterAction.STAND : CharacterAction.MOVE);
	self.target.toStatic(false);
	var num = new Num(Num.MIDDLE,1,20);
	//TODO::
	num.setValue(123);
	num.x = self.target.x;
	num.y = self.target.y;
	chara.controller.view.baseLayer.addChild(num);
	LTweenLite.to(num,0.5,{y:num.y - 20,alpha:0,onComplete:function(obj){
		obj.remove();
	}});
	
	self.target.changeAction(CharacterAction.HERT);
	self.target.addEventListener(BattleCharacterActionEvent.HERT_ACTION_COMPLETE,self.target.AI.hertActionComplete);
};
BattleCharacterAI.prototype.hertActionComplete = function(event) {
	var chara = event.currentTarget;
	var self = chara.AI;
	chara.removeEventListener(BattleCharacterActionEvent.HERT_ACTION_COMPLETE,self.hertActionComplete);
	chara.changeAction(CharacterAction.STAND);
	var statusView = new BattleCharacterStatusView(self.controller,{character:chara,belong:chara.belong,changeType:BattleCharacterStatusView.HP,changeValue:-100});
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
	var chara = event.currentTarget.character.AI.target;
	var self = chara.AI;
	//chara.removeEventListener(BattleCharacterActionEvent.COUNTER_ATTACK,self.counterAttack);
	if(chara.data.id() != BattleController.ctrlChara.data.id()){
		self.physicalAttack(BattleController.ctrlChara);
	}else{
		//TODO::
		console.log("can not counterAttack");
		BattleController.ctrlChara.AI.endAction();
	}
};
BattleCharacterAI.prototype.endAction = function() {
	var self = this, chara = self.chara, target = chara.target;
	if(target){
		target.target = null;
		target.removeAllEventListener();
		target.toStatic(true);
	}
	chara.target = null;
	chara.removeAllEventListener();
	chara.changeAction(CharacterAction.STAND);
	chara.mode = CharacterMode.END_ACTION;
	chara.toStatic(true);
	//TODO::check change battle belong mode
};
BattleCharacterAI.prototype.singleCombatStart = function() {
	var self = this;
	console.log("BattleCharacterAI.prototype.singleCombatStart");
};
BattleCharacterAI.prototype.strategySelect = function(strategyModel) {
	var self = this;
	LMvc.BattleController.view.roadLayer.setStrategyRoads(strategyModel.rangeAttack(),self.chara);
	self.chara.currentSelectStrategy = strategyModel;
	self.chara.mode = CharacterMode.STRATEGY_SELECT;
};

