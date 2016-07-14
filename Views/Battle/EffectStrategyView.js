function EffectStrategyView(controller, chara, target, correctionFactor, skill){
	var self = this;
	LExtends(self,LView,[controller]);
	self.currentCharacter = chara;
	self.currentTargetCharacter = target;
	self.correctionFactor = correctionFactor;
	self.currentSkill = skill;
	//console.log("EffectStrategyView="+self.currentTargetCharacter.data.name());
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
	var se = self.currentCharacter.currentSelectStrategy.se();
	LPlugin.playSE(se, LPlugin.gameSetting.SE);
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
	self.currentTargetCharacter.changeAction(CharacterAction.WAKE);
	var healTroops = battleHealTroops(self.currentCharacter.currentSelectStrategy, self.currentTargetCharacter, self.currentCharacter.data.proficiency());
	BattleCharacterStatusView.healCharactersPush(self.currentTargetCharacter, healTroops);
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
	var isOnWakeRoad = mapLayer.isOnWakeRoad(self.currentTargetCharacter);
	if(isOnWakeRoad){
		hitrate = false;
	}else{
		hitrate = calculateHitrateStrategy(self.currentCharacter, self.currentTargetCharacter);
	}
	if(hitrate){
		self.currentTargetCharacter.status.addStatus(currentSelectStrategy.strategyType(), currentSelectStrategy.hert());
		if(currentSelectStrategy.hert() > 0 && currentSelectStrategy.rand() > Math.fakeRandom()){
			self.effectType = StrategyEffectType.Attack;
			self.toAttack(true);
		}else{
			self.currentTargetCharacter.changeAction(CharacterAction.HERT);
		}
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
EffectStrategyView.prototype.toAttack = function(hitrate){
	var self = this, tweenObj;
	if(!hitrate){
		hitrate = calculateHitrateStrategy(self.currentCharacter, self.currentTargetCharacter);
	}
	//var hitrate = calculateHitrateStrategy(self.currentCharacter, self.currentTargetCharacter);
	if(hitrate){
		self.currentTargetCharacter.changeAction(CharacterAction.HERT);
		tweenObj = new Num(Num.MIDDLE,1,20);
		var hertValue = calculateHertStrategyValue(self.currentCharacter, self.currentTargetCharacter, self.currentCharacter.currentSelectStrategy,self.correctionFactor);
		if(self.currentTargetCharacter.data.troops() < hertValue){
			hertValue = self.currentTargetCharacter.data.troops();
		}
		self.currentTargetCharacter.hertValue = hertValue;
		tweenObj.setValue(hertValue);
		tweenObj.x = self.currentTargetCharacter.x;
		if(self.currentSkill && isCurrentAttackTarget(self.currentTargetCharacter)){
			if(self.currentSkill.isSubType(SkillSubType.VAMPIRE)){
				var changeHp = hertValue * self.currentSkill.vampire() >>> 0;
				self.currentCharacter.data.troops(self.currentCharacter.data.troops() + changeHp);
				var tweenVampire = getStrokeLabel(self.currentSkill.name() + String.format(Language.get("troops_plus"),changeHp),12,"#FF0000","#000000",2);
				tweenVampire.x = self.currentCharacter.x + (BattleCharacterSize.width - tweenVampire.getWidth()) * 0.5;
				tweenVampire.y = self.currentCharacter.y;
				self.currentCharacter.controller.view.baseLayer.addChild(tweenVampire);
				LTweenLite.to(tweenVampire,1.5,{y:tweenVampire.y - 20,alpha:0,onComplete:function(e){
					e.target.remove();
				}});
			}else if(self.currentSkill.isSubType(SkillSubType.ENEMY_AID)){
				var aids = self.currentSkill.aids();
				var aidCount = self.currentSkill.aidCount();
				var aidList = Array.getRandomArrays(aids,aidCount);
				var mapLayer = LMvc.BattleController.view.mapLayer;
				var chara = self.currentTargetCharacter;
				for(var j = 0;j<aidList.length;j++){
					var strategy = StrategyMasterModel.getMaster(aidList[j]);
					if(strategy.canChangeStatus() && mapLayer.isOnWakeRoad(chara)){
						continue;
					}
					chara.status.addStatus(strategy.strategyType(), strategy.hert());
				}
			}
		}
	}else{
		self.currentTargetCharacter.changeAction(CharacterAction.BLOCK);
		self.currentTargetCharacter.hertValue = 0;
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
	if(self.effectType == StrategyEffectType.Attack){
		LTweenLite.to(self.currentTargetCharacter, self.currentTargetCharacter.hertIndex * stepTime,
		{onComplete:function(e){
			var statusView = new BattleCharacterStatusView(self.controller,e.target);
			statusView.push(BattleCharacterStatusConfig.TROOPS, -e.target.hertValue);
			e.target.controller.view.baseLayer.addChild(statusView);
			statusView.startTween();
			if(!isCurrentAttackTarget(e.target)){
				return;
			}
			statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,LMvc.currentAttackCharacter.AI.plusExp);
		}});
	}else if(self.effectType == StrategyEffectType.Supply){
			if(!isCurrentAttackTarget(self.currentTargetCharacter)){
				self.remove();
				return;
			}
		BattleCharacterStatusView.healCharactersStrategy();
	}else if(isCurrentAttackTarget(self.currentTargetCharacter)){
		LMvc.currentAttackCharacter.AI.plusExp();
	}
	self.remove();
};