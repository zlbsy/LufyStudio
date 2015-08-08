function EffectStrategyView(controller, chara){
	var self = this;
	LExtends(self,LView,[controller]);
	self.currentCharacter = chara;
	var loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE, self.loadData);
	loader.load(chara.currentSelectStrategy.image(), "bitmapData");
	LMvc.keepLoading(true);
}
EffectStrategyView.prototype.loadData = function(event){
	var self = event.currentTarget.parent;
	LMvc.keepLoading(false);
	var data = event.target;
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
	var target = self.currentCharacter.AI.attackTarget;
	//target.toStatic(false);
	var currentSelectStrategy = self.currentCharacter.currentSelectStrategy;
	var rangeAttackTarget = currentSelectStrategy.rangeAttackTarget();
	self.effectType = currentSelectStrategy.effectType();
	var hertParams = new HertParams();
	hertParams.push(target,calculateHertStrategyValue(self.currentCharacter, target, currentSelectStrategy));
	for(var i = 0;i<rangeAttackTarget.length;i++){
		var range = rangeAttackTarget[i];
		if(range.x == 0 && range.y == 0){
			continue;
		}
		var chara = LMvc.BattleController.view.charaLayer.getCharacterFromLocation(target.locationX()+range.x, target.locationY()+range.y);
		if(!chara || isSameBelong(chara.belong,self.currentCharacter.belong)){
			continue;
		}
		if(self.effectType == StrategyEffectType.Attack){
			hertParams.push(chara,calculateHertStrategyValue(self.currentCharacter, chara, currentSelectStrategy));
		}else if(self.effectType == StrategyEffectType.Status){
			hertParams.push(chara,0);
		}else if(self.effectType == StrategyEffectType.Aid){
			hertParams.push(chara,0);
		}
	}
	self.herts = [hertParams];
	if(self.effectType == StrategyEffectType.Attack){
		self.toAttack();
	}else if(self.effectType == StrategyEffectType.Status){
		self.toChangeStatus();
	}else if(self.effectType == StrategyEffectType.Aid){
		self.toChangeAidStatus();
	}
};
EffectStrategyView.prototype.toChangeStatus = function(){
	var self = this;
	var target = self.currentCharacter.AI.attackTarget;
	var currentSelectStrategy = self.currentCharacter.currentSelectStrategy;
	var hitrate = calculateHitrateStrategy(self.currentCharacter, target);
	if(hitrate){
		target.changeAction(CharacterAction.HERT);
		target.status.addStatus(currentSelectStrategy.strategyType(), currentSelectStrategy.hert());
	}else{
		target.changeAction(CharacterAction.BLOCK);
	}
};
EffectStrategyView.prototype.toChangeAidStatus = function(){
	var self = this;
	var target = self.currentCharacter.AI.attackTarget;
	var currentSelectStrategy = self.currentCharacter.currentSelectStrategy;
	if(currentSelectStrategy.belong() == Belong.SELF){
		target.changeAction(CharacterAction.WAKE);
		target.status.addStatus(currentSelectStrategy.strategyType(), currentSelectStrategy.hert());
		return;
	}
	var hitrate = calculateHitrateStrategy(self.currentCharacter, target);
	if(hitrate){
		target.changeAction(CharacterAction.HERT);
		target.status.addStatus(currentSelectStrategy.strategyType(), currentSelectStrategy.hert());
	}else{
		target.changeAction(CharacterAction.BLOCK);
	}
};
EffectStrategyView.prototype.toAttack = function(){
	var self = this, tweenObj;
	var target = self.currentCharacter.AI.attackTarget;
	var hertParams = self.herts[0];
	for(var i = 0,l = hertParams.list.length;i<l;i++){
		var obj = hertParams.list[i];
		obj.chara.toStatic(false);
		obj.chara.hertIndex = l - i;
		var hitrate = calculateHitrateStrategy(self.currentCharacter, target);
		if(hitrate){
			obj.chara.changeAction(CharacterAction.HERT);
			tweenObj = new Num(Num.MIDDLE,1,20);
			obj.chara.hertValue = obj.hertValue;
			//var hertValue = calculateHertStrategyValue(self.currentCharacter, target, self.currentCharacter.currentSelectStrategy);
			tweenObj.setValue(obj.hertValue);
			tweenObj.x = obj.chara.x;
		}else{
			obj.chara.changeAction(CharacterAction.BLOCK);
			tweenObj = getStrokeLabel("MISS",22,"#FFFFFF","#000000",2);
			tweenObj.x = obj.chara.x + (BattleCharacterSize.width - tweenObj.getWidth()) * 0.5;
		}
		tweenObj.y = obj.chara.y;
		obj.chara.controller.view.baseLayer.addChild(tweenObj);
		LTweenLite.to(tweenObj,0.5,{y:tweenObj.y - 20,alpha:0,onComplete:function(obj){
			obj.remove();
		}});
	}
};
EffectStrategyView.prototype.removeSelf = function(event){
	var anime = event.currentTarget;
	var self = anime.parent;
	anime.stop();
	//self.currentCharacter.AI.endAction();
	self.currentCharacter.changeAction(CharacterAction.STAND);
	var stepTime = BattleCharacterStatusConfig.FADE_TIME + BattleCharacterStatusConfig.SHOW_TIME;
		
	//var chara = self.currentCharacter;
	
	var hertParams = self.herts[0];
	for(var i = 0,l = hertParams.list.length;i<l;i++){
		var obj = hertParams.list[i];
		chara = obj.chara;
		console.log("removeSelf",chara.data.name());
		chara.changeAction(CharacterAction.STAND);
		chara.toStatic(false);
		LTweenLite.to(chara,chara.hertIndex * stepTime,{onComplete:function(e){
			var statusView = new BattleCharacterStatusView(self.controller,{character:e.target,belong:e.target.belong,changeType:BattleCharacterStatusView.HP,changeValue:-e.target.hertValue});
			e.target.controller.view.baseLayer.addChild(statusView);
			console.log("removeSelf ",e.target.data.name(),statusView.objectIndex);
			if(!e.target.AI.attackTarget){
				return;
			}
			console.log("removeSelf add plusExpEvent",e.target.data.name());
			statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,e.target.AI.plusExp);
		}});
		
	}
	return;
	var target = chara.AI.attackTarget;
	target.changeAction(CharacterAction.MOVE);
	chara.changeAction(CharacterAction.STAND);
	if(self.effectType == StrategyEffectType.Attack){
		var statusView = new BattleCharacterStatusView(LMvc.BattleController,{character:target,belong:target.belong,changeType:"HP",changeValue:-100});
		statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,function(){
			chara.AI.endAction();
		});
		chara.controller.view.baseLayer.addChild(statusView);
	}else if(self.effectType == StrategyEffectType.Status){
		chara.AI.endAction();
	}else if(self.effectType == StrategyEffectType.Aid){
		chara.AI.endAction();
	}
	self.remove();
};