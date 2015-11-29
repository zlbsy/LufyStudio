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
	BattleAIExecute.Instance()._set(attackData, targetData);
};
BattleAIExecute.run=function(){
	var self = BattleAIExecute.Instance();
	self.attackIndex = 0;
	self.targetIndex = 0;
	var attackCharacters = self.attackData.expeditionCharacterList;
	var targetCharacters = self.targetData.expeditionCharacterList;
	if(attackCharacters.length==0){
		self.result(false);
		SeigniorExecute.run();
		return;
	}else if(targetCharacters.length==0){
		self.result(true);
		SeigniorExecute.run();
		return;
	}
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
			self.currentChara = attackCharacters[self.attackIndex++];
			characterExec(self.currentChara, self.attackData, self.targetData);
		}else{
			self.currentChara = targetCharacters[self.targetIndex++];
			characterExec(self.currentChara, self.targetData, self.attackData);
		}
		self.currentChara.herts = null;
		self.currentChara = null;
	}
	self.timer.reset();
	self.timer.start();
};
BattleAIExecute.prototype.result=function(isWin){
	var self = this;
	console.log("result isWin:"+isWin);
	if(isWin){
		SeigniorExecute.Instance().msgView.add(String.format("{0}攻占了{2}的{3}!",self.attackData.fromCity.seiginor().character().name(),self.attackData.toCity.seiginor().character().name(),self.attackData.toCity.name()));
		self.attackData.toCity.food(self.attackData.food);
		self.attackData.toCity.money(self.attackData.money);
		self.attackData.toCity.troops(self.attackData.toCity.troops() + self.attackData.troops);
	}else{
		SeigniorExecute.Instance().msgView.add(String.format("{0}战败了!",self.attackData.fromCity.seiginor().character().name()));
		
	}
};
BattleAIExecute.prototype._set=function(attackData, targetData){
	var self = this;
	var expeditionCharacterList = [];
	attackData.expeditionCharacterList.forEach(function(child){
		child.calculation(true);
		expeditionCharacterList.push({data:child,belong:Belong.SELF,status:new BattleCharacterStatusView(null,child)});
	});
	attackData._characterList = attackData.expeditionCharacterList;
	attackData.expeditionCharacterList = expeditionCharacterList;
	self.attackData = attackData;
	expeditionCharacterList = [];
	targetData.expeditionCharacterList.forEach(function(child){
		child.calculation(true);
		expeditionCharacterList.push({data:child,belong:Belong.ENEMY,status:new BattleCharacterStatusView(null,child)});
	});
	targetData._characterList = targetData.expeditionCharacterList;
	targetData.expeditionCharacterList = expeditionCharacterList;
	self.targetData = targetData;
	self.timer.reset();
	self.timer.start();
};
BattleAIExecute.prototype.getTargetCharacters=function(chara){
	return this.attackData.expeditionCharacterList[0].seigniorId() == chara.seigniorId() ? this.targetData.expeditionCharacterList : this.attackData.expeditionCharacterList;
};
BattleAIExecute.prototype.removeChara = function(chara){
	var self = this;
	var charaList = self.attackData.expeditionCharacterList[0].seigniorId() == chara.seigniorId() ? self.attackData.expeditionCharacterList : self.targetData.expeditionCharacterList;
	for(var i=0,l=charaList.length;i<l;i++){
		if(charaList[i].id() == chara.id()){
			charaList.splice(i, 1);
			break;
		}
	}
};
BattleAIExecute.prototype.characterExec=function(currentCharacter, currentData, enemyData){
	var self = this;
	var currentCharacters = currentData.expeditionCharacterList;
	var enemyCharacters = enemyData.expeditionCharacterList;
	var enemyPants = self.getPantCharacter(enemyCharacters);
	//有虚弱敌军->攻击
	if(enemyPants.length > 0 && Math.random() > 0.8){
		var targetChara = enemyPants[enemyPants.length*Math.random() >>> 0];
		self.attackExec(currentCharacter, targetChara, true);
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
	if(self.toWake(currentCharacter,currentCharacters)){
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
	self.attackExec(currentCharacter, targetChara, false);
};
BattleAIExecute.prototype.toWake = function(currentCharacter,currentCharacters){
	var self = this, hitrate;
	var strategys = [];
	for(var i = 0,l = currentCharacters.length;i<l;i++){
		var child = currentCharacters[i];
		if(!child.status.needWake()){
			continue;
		}
		strategy = self.getCanUseStrategy(currentCharacter, child,StrategyEffectType.Wake);
		if(strategy){
			strategys.push({target:child,strategy:strategy});
		}
	}
	if(strategys == 0){
		return false;
	}
	var obj = strategys[(strategys.length * Math.random()) >>> 0];
	obj.target.status.wake();
	return true;
};
BattleAIExecute.prototype.useHertStrategy = function(chara, target, attack) {
	var self = this;
	if((chara.data.currentSoldiers().soldierType() == SoldierType.Physical) || (chara.data.currentSoldiers().soldierType() == SoldierType.Comprehensive && Math.random() < 0.5)){
		return false;
	}
	var strategy, strategys = [];
	strategy = self.getCanUseStrategy(chara,target,StrategyEffectType.Attack);
	if(strategy){
		strategys.push(strategy);
	}
	if(!strategy || !attack){
		strategy = self.getCanUseStrategy(chara,target,StrategyEffectType.Status);
		if(strategy){
			strategys.push(strategy);
		}
	}
	
	if(strategys.length == 0){
		return false;
	}
	var hitrate = calculateHitrateStrategy(chara, target);
	if(!hitrate){
		return true;
	}
	var strategy = strategys[(strategys.length * Math.random()) >>> 0];
	var effectType = strategy.strategyType();
	var target = obj.target;
	chara.data.MP(chara.data.MP() - obj.strategy.cost());
	if(effectType == StrategyEffectType.Attack){
		var hertValue = calculateHertStrategyValue(chara, target, strategy);
		chara.data.troops(chara.data.troops() - hertValue);
		if(chara.data.troops() == 0){
			self.removeChara(chara);
		}
	}else if(effectType == StrategyEffectType.Status){
		target.status.addStatus(effectType, strategy.hert());
	}
	return true;
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
BattleAIExecute.prototype.attackExec=function(currentCharacter, targetChara, atttack){
	var self = this;
	if(self.useHertStrategy(currentCharacter, targetChara, atttack)){
		return;
	}
	self.physicalAttack(currentCharacter, targetChara);
};
BattleAIExecute.prototype.physicalAttack = function(currentChara, targetChara) {
	var self = this;
	var groupSkill;
	if(currentChara.herts == null){
		if(currentChara.id() == self.currentChara.id()){
			var hertValues;
			currentChara.herts = [];
			var hertValue = calculateHertValue(currentChara, targetChara, 1);
			var skill = currentChara.skill(SkillType.ATTACK);
			if(skill && skill.isSubType(SkillSubType.ATTACK_COUNT)){
				hertValues = skill.attacks();
			}else{
				var doubleAtt = calculateDoubleAtt(currentChara, targetChara);
				hertValues = doubleAtt ? [1,1] : [1];
			}
			for(var j=0;j<hertValues.length;j++){
				var hertParams = new HertParams();
				var value = hertValue*hertValues[j]>>>0;
				hertParams.push(targetChara, value > 1 ? value : 1);
				if(skill && skill.isSubType(SkillSubType.ATTACK_RECT)){
						rangeAttackTarget = skill.rects();
					}else{
						rangeAttackTarget = self.chara.data.currentSoldiers().rangeAttackTarget();
				}
				var rangeLength = (rangeAttackTarget.length / 4) >>> 0;
				if(rangeLength){
					var targetCharas = self.getTargetCharacters(currentChara);
					for(var i = 0, l = targetCharas.length;i<rangeLength && i < l;i++){
						if(Math.random() > 0.5){
							continue;
						}
						var chara = targetCharas[i];
						if(targetChara.data.id() == chara.data.id() || currentChara.data.seigniorId() == chara.data.seigniorId()){
							continue;
						}
						hertParams.push(chara,calculateHertValue(currentChara, chara, 1));
					}
				}
				currentChara.herts.push(hertParams);
			}
			hertParams = currentChara.herts[0];
			if(skill && skill.isSubType(SkillSubType.ENEMY_AID)){
				var aids = skill.aids();
				var aidCount = skill.aidCount();
				var hertParamObj = hertParams.list.find(function(child){
					return child.chara.data.id() == targetChara.data.id();
				});
				if(hertParamObj){
					hertParamObj.aids = Array.getRandomArrays(aids,aidCount);
				}
			}
			groupSkill = self.battleCanGroupSkill(currentChara, targetChara);
			if(groupSkill){
				currentChara.herts[0].value = currentChara.herts[0].value * groupSkill.correctionFactor() >>> 0;
			}
		}else{
			var hertParams = new HertParams();
			rangeAttackTarget = self.chara.data.currentSoldiers().rangeAttackTarget();
			hertParams.push(target,calculateHertValue(self.chara, target, 0.75));
			var rangeLength = (rangeAttackTarget.length / 4) >>> 0;
			if(rangeLength){
				var targetCharas = self.getTargetCharacters(currentChara);
				for(var i = 0, l = targetCharas.length;i<rangeLength && i < l;i++){
					if(Math.random() > 0.5){
						continue;
					}
					var chara = targetCharas[i];
					if(targetChara.data.id() == chara.data.id() || currentChara.data.seigniorId() == chara.data.seigniorId()){
						continue;
					}
					hertParams.push(chara,calculateHertValue(self.chara, chara, 0.75));
				}
			}
			currentChara.herts = [hertParams];
		}
	}
	if(!groupSkill && calculateFatalAtt(currentChara, targetChara)){
		currentChara.herts[0].value = currentChara.herts[0].value * 1.25 >>> 0;
	}
	
}
BattleAIExecute.prototype.physicalAttackStart = function(currentChara, targetChara){
	var self = this;
	var selfSkill = currentChara.skill(SkillType.ATTACK_END);
	if(selfSkill && selfSkill.isSubType(SkillSubType.SELF_AID)){
		var aids = Array.getRandomArrays(selfSkill.aids(),selfSkill.aidCount());
		for(var j = 0;aids && j<aids.length;j++){
			var strategy = StrategyMasterModel.getMaster(aids[j]);
			currentChara.status.addStatus(strategy.strategyType(), strategy.hert());
		}	
	}
	var hertParams = currentChara.herts[0];
	currentChara.herts.shift();
	for(var i = 0,l = hertParams.list.length;i<l;i++){
		var obj = hertParams.list[i];
		var hitrate = calculateHitrate(currentChara,obj.chara);
		if(hitrate){
			
			continue;
		}
		skill = obj.chara.data.skill(SkillType.HERT);
		if(skill && skill.isSubType(SkillSubType.HERT_MINUS)){
			obj.hertValue *= skill.hert();
		}
		obj.chara.hertValue = obj.hertValue > obj.chara.data.troops() ? obj.chara.data.troops() : obj.hertValue;
		obj.chara.data.troops(-obj.chara.hertValue);
		if(obj.chara.data.troops() == 0){
			self.removeChara(obj.chara);
			continue;
		}
		if(!obj.aids || obj.aids.length == 0){
			continue;
		}
		for(var j = 0;j<obj.aids.length;j++){
			var strategy = StrategyMasterModel.getMaster(obj.aids[j]);
			if(!strategy.canChangeStatus()){
				continue;
			}
			obj.chara.status.addStatus(strategy.strategyType(), strategy.hert());
		}
	}
	self.counterAttack(currentChara, targetChara);
};
BattleAIExecute.prototype.counterAttack = function(currentChara, targetChara) {
	var self = this;
	if(currentChara.herts && currentChara.herts.length > 0){
		self.physicalAttack(currentChara, targetChara);
		return;
	}
	if(currentChara.data.id() == self.currentChara.data.id()){
		if(currentChara.data.troops() > 0){
			self.physicalAttack(targetChara, currentChara);
			return;
		}
	}
};
BattleAIExecute.prototype.battleCanGroupSkill = function(chara, targerChara){
	var groupSkill = chara.data.groupSkill();
	if(!groupSkill){
		return null;
	}
	var group = groupSkill.group();
	var selfCharas = self.getTargetCharacters(targerChara);
	for(var i=0;i<group.length;i++){
		var charaId = group[i];
		var chara = selfCharas.find(function(child){
			return child.id() == charaId;
		});
		if(!chara){
			return null;
		}
	}
	return groupSkill;
}
BattleAIExecute.prototype.healExec=function(currentCharacter, targetChara){
	var self = this;
	var strategy = self.getCanUseStrategy(currentCharacter,targetChara,StrategyEffectType.Supply);
	if(!strategy){
		return false;
	}
	var troopsAdd = strategy.troops();
	var woundedAdd = strategy.wounded();
	var wounded = targetChara.data.wounded();
	if(woundedAdd > wounded){
		woundedAdd = wounded;
	}
	if(woundedAdd > 0){
		targetChara.data.wounded(wounded - woundedAdd);
		troopsAdd += woundedAdd;
	}
	var troops = targetChara.data.troops();
	var maxTroops = targetChara.data.maxTroops();
	var troopsValue = troops + troopsAdd > maxTroops ? maxTroops : troops + troopsAdd;
	targetChara.data.troops(troopsValue);
	currentCharacter.data.MP(currentCharacter.data.MP() - strategy.cost());
	return true;
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