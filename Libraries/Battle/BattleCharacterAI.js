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
	console.log("LSouSouCharacterAI.prototype.physicalAttack");
	self.target = target;
	var direction = self.getDirectionFromTarget(target);
	
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
	chara.changeAction(CharacterAction.STAND);
	self.chara.toStatic(true);
	var v = new BattleCharacterStatusView(self.controller,{characterModel:chara,belong:CharacterConfig.BELONG_SELF,changeType:self.changeComboBox.value,changeValue:self.changeValue.text});
	v.x = 50;
	v.y = 100;
	chara.controller.view.baseLayer.addChild(v);
};
BattleCharacterAI.prototype.getDirectionFromTarget = function() {
	var self = this, direction = self.chara.direction;
	var coordinate = self.chara.getTo();
	var coordinateTo = self.target.getTo();
	var angle = Math.atan2(coordinateTo[1] - coordinate[1],coordinateTo[0] - coordinate[0])*180/Math.PI + 180;
	if(angle < 22.5 || angle > 337.5){
		direction = CharacterDirection.LEFT;
	}else if(angle > 22.5 && angle < 67.5){
		direction = CharacterDirection.LEFT_UP;
	}else if(angle > 67.5 && angle < 112.5){
		direction = CharacterDirection.UP;
	}else if(angle > 112.5 && angle < 157.5){
		direction = CharacterDirection.RIGHT_UP;
	}else if(angle > 157.5 && angle < 202.5){
		direction = CharacterDirection.RIGHT;
	}else if(angle > 202.5 && angle < 247.5){
		direction = CharacterDirection.RIGHT_DOWN;
	}else if(angle > 247.5 && angle < 292.5){
		direction = CharacterDirection.DOWN;
	}else{
		direction = CharacterDirection.LEFT_DOWN;
	}
	return direction;
};