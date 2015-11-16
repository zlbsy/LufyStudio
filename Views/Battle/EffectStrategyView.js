function EffectStrategyView(controller, chara, target, correctionFactor){
	var self = this;
	LExtends(self,LView,[controller]);
	self.currentCharacter = chara;
	self.currentTargetCharacter = target;
	self.correctionFactor = correctionFactor;
	console.log("EffectStrategyView="+self.currentTargetCharacter.data.name());
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
	}else if(self.effectType == StrategyEffectType.Wake){
		self.toChangeStatus();
	}else if(self.effectType == StrategyEffectType.Supply){
		self.toSupply();
	}
};
EffectStrategyView.prototype.toSupply = function(){
	var self = this;
	var currentSelectStrategy = self.currentCharacter.currentSelectStrategy;
	self.currentTargetCharacter.changeAction(CharacterAction.WAKE);
	var troopsAdd = currentSelectStrategy.troops();
	var woundedAdd = currentSelectStrategy.wounded();
	var wounded = self.currentTargetCharacter.data.wounded();
	if(woundedAdd > wounded){
		woundedAdd = wounded;
	}
	if(woundedAdd > 0){
		self.currentTargetCharacter.data.wounded(wounded - woundedAdd);
		troopsAdd += woundedAdd;
	}
	var troops = self.currentTargetCharacter.data.troops();
	console.log("troops="+troops);
	var maxTroops = self.currentTargetCharacter.data.maxTroops();
	console.log("maxTroops="+maxTroops);
	console.log("troopsAdd="+troopsAdd);
	console.log(troops+","+troopsAdd+","+maxTroops);
	var troopsValue = troops + troopsAdd > maxTroops ? maxTroops : troops + troopsAdd;
	self.currentTargetCharacter.data.troops(troopsValue);
};
EffectStrategyView.prototype.toChangeStatus = function(){
	var self = this, hitrate;
	var currentSelectStrategy = self.currentCharacter.currentSelectStrategy;
	if(currentSelectStrategy.belong() == Belong.SELF && self.effectType == StrategyEffectType.Wake){
		self.currentTargetCharacter.changeAction(CharacterAction.WAKE);
		self.currentTargetCharacter.status.wake();
		return;
	}
	var mapLayer = LMvc.BattleController.view.mapLayer;
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
		var hertValue = calculateHertStrategyValue(self.currentCharacter, self.currentTargetCharacter, self.currentCharacter.currentSelectStrategy,self.correctionFactor);
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
	if(isCurrentAttackTarget(self.currentTargetCharacter)){
		self.currentCharacter.changeAction(self.currentCharacter.data.isPantTroops()?CharacterAction.PANT:CharacterAction.STAND);
	}
	var stepTime = BattleCharacterStatusConfig.FADE_TIME + BattleCharacterStatusConfig.SHOW_TIME;
	if(self.currentCharacter.objectIndex != self.currentTargetCharacter.objectIndex){
		if(self.currentTargetCharacter.mode == CharacterMode.END_ACTION){
			self.currentTargetCharacter.changeAction(self.currentTargetCharacter.data.isPantTroops()?CharacterAction.PANT:CharacterAction.STAND);
		}else{
			self.currentTargetCharacter.changeAction(CharacterAction.MOVE);
		}
		self.currentTargetCharacter.toStatic(true);
	}
	console.log("self.effectType="+self.effectType,isCurrentAttackTarget(self.currentTargetCharacter),self.currentCharacter.data.name(),self.currentTargetCharacter.data.name());
	if(self.effectType == StrategyEffectType.Attack){
		LTweenLite.to(self.currentTargetCharacter, self.currentTargetCharacter.hertIndex * stepTime,
		{onComplete:function(e){
			var statusView = new BattleCharacterStatusView(self.controller,e.target);
			statusView.push(BattleCharacterStatusConfig.HP, -e.target.hertValue);
			e.target.controller.view.baseLayer.addChild(statusView);
			statusView.startTween();
			if(!isCurrentAttackTarget(e.target)){
			//if(!e.target.AI.attackTarget){
				return;
			}
			statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,LMvc.currentAttackCharacter.AI.plusExp);
		}});
	}else if(isCurrentAttackTarget(self.currentTargetCharacter)){
		LMvc.currentAttackCharacter.AI.plusExp();
	}
	/*else if(self.effectType == StrategyEffectType.Status && isCurrentAttackTarget(self.currentTargetCharacter)){
		LMvc.currentAttackCharacter.AI.plusExp();
	}else if(self.effectType == StrategyEffectType.Aid && isCurrentAttackTarget(self.currentTargetCharacter)){
		LMvc.currentAttackCharacter.AI.plusExp();
	}else if(self.effectType == StrategyEffectType.Wake && isCurrentAttackTarget(self.currentTargetCharacter)){
		LMvc.currentAttackCharacter.AI.plusExp();
	}else if(self.effectType == StrategyEffectType.Supply && isCurrentAttackTarget(self.currentTargetCharacter)){
		LMvc.currentAttackCharacter.AI.plusExp();
	}*/
	self.remove();
};