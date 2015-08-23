function EffectStrategyView(controller, chara, target){
	var self = this;
	LExtends(self,LView,[controller]);
	self.currentCharacter = chara;
	self.currentTargetCharacter = target;
	self.init();
}
EffectStrategyView.prototype.init = function(){
	var self = this;
	var data = self.currentCharacter.currentSelectStrategy.imageCache();
	var list = LGlobal.divideCoordinate(data.width,data.height, data.height/data.width, 1);
	var arr = [];
	for(var i=0,l=list.length;i<l;i++){
		arr.push(list[i][0]);
	}
	var startPosition = (BattleCharacterSize.width - data.width) * 0.5;
	var anime = new LAnimationTimeline(new LBitmapData(data), [arr]);
	anime.setLabel("effect", 0, arr.length * 0.3 >> 0, 1, false);
	anime.addFrameScript("effect",self.becomeEffective,[]);
	anime.addEventListener(LEvent.COMPLETE, self.removeSelf);
	anime.x = anime.y = startPosition;
	anime.speed = 1;
	self.addChild(anime);
};
EffectStrategyView.prototype.becomeEffective = function(anime){
	var self = anime.parent;
	anime.removeFrameScript("effect");
	self.currentTargetCharacter.toStatic(false);
	self.effectType = self.currentCharacter.currentSelectStrategy.effectType();
	if(self.effectType == StrategyEffectType.Attack){
		self.toAttack();
	}else if(self.effectType == StrategyEffectType.Status){
		self.toChangeStatus();
	}else if(self.effectType == StrategyEffectType.Aid){
		self.toChangeAidStatus();
	}
};
EffectStrategyView.prototype.toChangeStatus = function(){
	var self = this, hitrate;
	var currentSelectStrategy = self.currentCharacter.currentSelectStrategy;
	var mapLayer = controller.view.mapLayer;
	if(mapLayer.isOnWakeRoad(self.currentTargetCharacter)){
		hitrate = false;
	}else{
		hitrate = calculateHitrateStrategy(self.currentCharacter, self.currentTargetCharacter);
	}
	if(hitrate){
		self.currentTargetCharacter.changeAction(CharacterAction.HERT);
		self.currentTargetCharacter.status.addStatus(currentSelectStrategy.strategyType(), currentSelectStrategy.hert());
	}else{
		self.currentTargetCharacter.changeAction(CharacterAction.BLOCK);
	}
};
EffectStrategyView.prototype.toChangeAidStatus = function(){
	var self = this;
	var currentSelectStrategy = self.currentCharacter.currentSelectStrategy;
	if(currentSelectStrategy.belong() == Belong.SELF){
		self.currentTargetCharacter.changeAction(CharacterAction.WAKE);
		self.currentTargetCharacter.status.addStatus(currentSelectStrategy.strategyType(), currentSelectStrategy.hert());
		return;
	}
	var hitrate = calculateHitrateStrategy(self.currentCharacter, self.currentTargetCharacter);
	if(hitrate){
		self.currentTargetCharacter.changeAction(CharacterAction.HERT);
		self.currentTargetCharacter.status.addStatus(currentSelectStrategy.strategyType(), currentSelectStrategy.hert());
	}else{
		self.currentTargetCharacter.changeAction(CharacterAction.BLOCK);
	}
};
EffectStrategyView.prototype.toAttack = function(){
	var self = this, tweenObj;
	var hitrate = calculateHitrateStrategy(self.currentCharacter, self.currentTargetCharacter);
	if(hitrate){
		self.currentTargetCharacter.changeAction(CharacterAction.HERT);
		tweenObj = new Num(Num.MIDDLE,1,20);
		var hertValue = calculateHertStrategyValue(self.currentCharacter, self.currentTargetCharacter, self.currentCharacter.currentSelectStrategy);
		self.currentTargetCharacter.hertValue = hertValue;
		tweenObj.setValue(hertValue);
		tweenObj.x = self.currentTargetCharacter.x;
	}else{
		self.currentTargetCharacter.changeAction(CharacterAction.BLOCK);
		tweenObj = getStrokeLabel("MISS",22,"#FFFFFF","#000000",2);
		tweenObj.x = self.currentTargetCharacter.x + (BattleCharacterSize.width - tweenObj.getWidth()) * 0.5;
	}
	tweenObj.y = self.currentTargetCharacter.y;
	self.currentTargetCharacter.controller.view.baseLayer.addChild(tweenObj);
	LTweenLite.to(tweenObj,0.5,{y:tweenObj.y - 20,alpha:0,onComplete:function(obj){
		obj.remove();
	}});
};
EffectStrategyView.prototype.removeSelf = function(event){
	var anime = event.currentTarget;
	var self = anime.parent;
	anime.stop();
	if(self.currentTargetCharacter.AI.attackTarget){
		self.currentCharacter.changeAction(self.currentTargetCharacter.data.isHertTroops()?CharacterAction.HERT:CharacterAction.STAND);
	}
	var stepTime = BattleCharacterStatusConfig.FADE_TIME + BattleCharacterStatusConfig.SHOW_TIME;
	self.currentTargetCharacter.changeAction(CharacterAction.MOVE);
	self.currentTargetCharacter.toStatic(true);
	if(self.effectType == StrategyEffectType.Attack){
		LTweenLite.to(self.currentTargetCharacter, self.currentTargetCharacter.hertIndex * stepTime,
		{onComplete:function(e){
			var statusView = new BattleCharacterStatusView(self.controller,e.target);
			statusView.push(BattleCharacterStatusConfig.HP, -e.target.hertValue);
			e.target.controller.view.baseLayer.addChild(statusView);
			statusView.startTween();
			if(!e.target.AI.attackTarget){
				return;
			}
			statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,e.target.AI.plusExp);
		}});
	}else if(self.effectType == StrategyEffectType.Status && self.currentTargetCharacter.AI.attackTarget){
		self.currentTargetCharacter.AI.plusExp();
	}else if(self.effectType == StrategyEffectType.Aid && self.currentTargetCharacter.AI.attackTarget){
		self.currentTargetCharacter.AI.plusExp();
	}
	self.remove();
};