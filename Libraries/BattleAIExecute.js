function BattleAIExecute(){
	var self = this;
	if(!self.timer){
		self.timer = new LTimer(LGlobal.speed, 1);
	}
	self.timer.addEventListener(LTimerEvent.TIMER, SeigniorExecute.run);
};
BattleAIExecute.Instance = function(){
	if(!BattleAIExecute._Instance){
		BattleAIExecute._Instance = new BattleAIExecute();
	}
	return BattleAIExecute._Instance;
};
BattleAIExecute.set = function(attackData, targetData){
	BattleAIExecute.Instance()._set();
};
BattleAIExecute.run=function(){
	var self = BattleAIExecute.Instance();
	self.attackIndex = 0;
	self.targetIndex = 0;
	var attackCharacters = self.attackData.expeditionCharacterList;
	var targetCharacters = self.targetData.expeditionCharacterList;
	self.battleFoodCheck(attackCharacters, true, self.attackData);
	self.battleFoodCheck(targetCharacters, false, self.attackData);
	while(self.attackIndex < attackCharacters.length || self.targetIndex < targetCharacters.length){
		var rand;
		if(self.attackIndex >= attackCharacters.length){
			rand = 0;
		}else if(self.targetIndex >= targetCharacters.length){
			rand = 1;
		}else{
			rand = Math.random();
		}
		if(rand < 0.5){
			characterExec(attackCharacters[self.attackIndex++], self.attackData, self.targetData);
		}else{
			characterExec(targetCharacters[self.targetIndex++], self.targetData, self.attackData);
		}
	}
	self.timer.reset();
	self.timer.start();
};
BattleAIExecute.prototype._set=function(attackData, targetData){
	var self = this;
	self.attackData = attackData;
	self.targetData = targetData;
	self.timer.reset();
	self.timer.start();
};
BattleAIExecute.prototype.characterExec=function(currentCharacter, currentData, enemyData){
	var self = this;
	var currentCharacters = currentData.expeditionCharacterList;
	var enemyCharacters = enemyData.expeditionCharacterList;
	var enemyPants = self.getPantCharacter(enemyCharacters);
	//有虚弱敌军->攻击
	if(enemyPants.length > 0 && Math.random() > 0.8){
		var targetChara = enemyPants[enemyPants.length*Math.random() >>> 0];
		self.attackExec(currentCharacter, targetChara);
		return;
	}
	//有虚弱友军->回复
	var currentPants = self.getPantCharacter(currentCharacters);
	if(currentPants.length > 0){
		var targetChara = currentPants[currentPants.length*Math.random() >>> 0];
		if(self.healExec(currentCharacter, targetChara)){
			return;
		}
	}
	//有异常状态友军->觉醒
	var strategys = [];
	for(var i = 0,l = currentCharacters.length;i<l;i++){
		var child = currentCharacters[i];
		if(!child.status.needWake()){
			continue;
		}
		node = self.getNestNode(child);
		strategy = self.getCanUseStrategy(currentCharacter, child,StrategyEffectType.Wake,node);
		if(strategy){
			strategys.push({target:child,strategy:strategy});
		}
	}
	if(strategys > 0){
		var obj = strategys[(strategys.length * Math.random()) >>> 0];
		return;
	}
	//加状态
	if(self.useAidStrategy(currentCharacter,currentCharacters,StrategyEffectType.Aid, BattleIntelligentAI.UP_STATUS)){
		return;
	}
	//减状态
	if(self.useAidStrategy(currentCharacter,enemyCharacters,StrategyEffectType.Aid, BattleIntelligentAI.DOWN_STATUS)){
		return;
	}
	//攻击
	var targetChara = enemyCharacters[enemyCharacters.length*Math.random() >>> 0];
	self.attackExec(currentCharacter, targetChara);
};
BattleAIExecute.prototype.toChangeStatus = function(){
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
BattleAIExecute.prototype.useAidStrategy = function(chara, charas, strategyEffectType, strategyFlag) {
	var self = this;
	if((chara.data.currentSoldiers().soldierType() == SoldierType.Physical) || (chara.data.currentSoldiers().soldierType() == SoldierType.Comprehensive && Math.random() < 0.5) || Math.random() < 0.8){
		return false;
	}
	var strategy, strategys = [], node;
	for(var i = 0,l = charas.length;i<l;i++){
		var child = charas[i];
		strategy = self.getCanUseStrategy(chara,child,strategyEffectType);
		if(strategy){
			strategys.push({target:child,strategy:strategy});
		}
	}
	if(strategys.length == 0){
		return false;
	}
	//TODO::判断可以使用策略的优先级
	var obj = strategys[(strategys.length * Math.random()) >>> 0];
	var target = obj.target;
	var currentSelectStrategy = obj.strategy;
	if(currentSelectStrategy.belong() == Belong.SELF){
		target.status.addStatus(currentSelectStrategy.strategyType(), currentSelectStrategy.hert());
		return true;
	}
	var hitrate = calculateHitrateStrategy(chara, target);
	if(hitrate){
		target.status.addStatus(currentSelectStrategy.strategyType(), currentSelectStrategy.hert());
	}
	return true;
};
BattleAIExecute.prototype.attackExec=function(currentCharacter, targetChara){
	var self = this;
	
	
};
BattleAIExecute.prototype.healExec=function(currentCharacter, targetChara){
	var self = this;
	
	
};
BattleAIExecute.prototype.getPantCharacter=function(charas){
	var pantList = [];
	for(var i = 0;i<charas.length;i++){
		chara = charas[i];
		if(chara.data.isPantTroops()){
			pantList.push(chara);
		}
	}
	return pantList;
};
BattleAIExecute.prototype.getCanUseStrategy = function(chara, target,type) {
	var self = this;
	var strategyList = chara.data.strategies();
	var list = [];
	for (var i = 0, l = strategyList.length; i < l; i++) {
		var strategy = strategyList[i];
		if(strategy.effectType() != type || strategy.belong() != target.belong){
			continue;
		}
		//TODO::地形判断
		/*var weathers = strategy.weathers();
		if(weathers && weathers.length > 0 && weathers.indexOf(LMvc.BattleController.view.weatherLayer.currentWeather.weather) < 0){
			continue;
		}*/
		if(type == StrategyEffectType.Status){
			//兵种限制
			if(strategy.strategyType() == StrategyType.BanIncantation && (target.data.currentSoldiers().soldierType() == SoldierType.Physical || target.status.hasStatus(StrategyType.BanIncantation))){
				continue;
			}
		}
		list.push(strategy);
	}
	if(list.length > 0){
		return list[list.length*Math.random()>>>0];
	}
	return null;
};
BattleAIExecute.prototype.battleFoodCheck=function(charas, attackFlag, battleData){
	var self = this;
	var needFood = 0;
	var thrift = 1;
	for(var i=0,l=charas.length;i<l;i++){
		var charaModel = charas[i].data;
		needFood += charaModel.troops();
		if(charaModel.hasSkill(SkillSubType.THRIFT)){
			thrift = 0.5;
		}
	}
	if(!attackFlag){
		needFood = (needFood * thrift >>> 0);
		if(battleData.toCity.food() > needFood){
			battleData.toCity.food(-needFood);
			return;
		}
		battleData.toCity.food(-battleData.toCity.food());
	}else{
		needFood += (battleData.troops * 0.5);
		needFood = (needFood * thrift >>> 0);
		if(battleData.food > needFood){
			battleData.food -= needFood;
			return;
		}
		battleData.food = 0;
	}
	charas.forEach(function(child){
		child.status.downloadAidStatusRandom();
	});
};