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
BattleCharacterAI.prototype.physicalAttack = function(target) {
	var self = this;
	self.target = target;
	console.log("LSouSouCharacterAI.prototype.physicalAttack "+self.chara.data.id() + ", target="+target.data.id());
	var direction = getDirectionFromTarget(self.chara, target);
	
	self.chara.setActionDirection(CharacterAction.ATTACK, direction);
	self.chara.addEventListener(BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE,self.attackActionComplete);
};
BattleCharacterAI.prototype.attackActionComplete = function(event) {
	var chara = event.currentTarget;
	var self = chara.AI;
	chara.removeEventListener(BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE,self.attackActionComplete);
	chara.changeAction(CharacterAction.STAND);
	self.target.toStatic(false);
	var num = new Num(Num.MIDDLE,1,20);
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
	var statusView = new BattleCharacterStatusView(self.controller,{character:chara,belong:chara.belong,changeType:"HP",changeValue:-100});
	chara.addEventListener(BattleCharacterActionEvent.COUNTER_ATTACK,self.counterAttack);
	chara.controller.view.baseLayer.addChild(statusView);
};
BattleCharacterAI.prototype.counterAttack = function(event) {
	var chara = event.currentTarget;
	var self = chara.AI;
	chara.removeEventListener(BattleCharacterActionEvent.COUNTER_ATTACK,self.counterAttack);
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
};