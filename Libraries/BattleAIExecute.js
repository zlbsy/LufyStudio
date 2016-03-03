function BattleAIExecute(){
	var self = this;
	if(!self.timer){
		self.timer = new LTimer(LGlobal.speed, 1);
	}
	self.timer.addEventListener(LTimerEvent.TIMER, BattleAIExecute.run);
};
BattleAIExecute.Instance = function(){
	if(!BattleAIExecute._Instance){
		BattleAIExecute._Instance = new BattleAIExecute();
	}
	return BattleAIExecute._Instance;
};
BattleAIExecute.set = function(attackData, targetData){
	console.log("BattleAIExecute.set Start ",attackData, targetData);
	BattleAIExecute.Instance()._set(attackData, targetData);
};
BattleAIExecute.run=function(){
	console.log("BattleAIExecute.run");
	var self = BattleAIExecute.Instance();
	self.attackIndex = 0;
	self.targetIndex = 0;
	var attackCharacters = self.attackData.expeditionCharacterList;
	var targetCharacters = self.targetData.expeditionCharacterList;
	console.log("run attackCharacters.length:"+attackCharacters.length);
	console.log("run targetCharacters.length:"+targetCharacters.length);
	if(attackCharacters.length==0){
		self.result(false);
		//SeigniorExecute.run();
		return;
	}else if(targetCharacters.length==0){
		self.result(true);
		//SeigniorExecute.run();
		return;
	}
	self.battleFoodCheck(attackCharacters, true, self.attackData);
	self.battleFoodCheck(targetCharacters, false, self.attackData);
	while(self.attackIndex < attackCharacters.length || self.targetIndex < targetCharacters.length){
		console.log("while attackCharacters.length:"+attackCharacters.length);
		console.log("while targetCharacters.length:"+targetCharacters.length);
		if(attackCharacters.length==0 && targetCharacters.length==0){
			break;
		}
		var rand;
		if(self.attackIndex >= attackCharacters.length){
			rand = 1;
		}else if(self.targetIndex >= targetCharacters.length){
			rand = 0;
		}else{
			rand = Math.random();
		}
		if(rand < 0.5){
			console.log("attackIndex:"+self.attackIndex + ",currentChara:"+attackCharacters[self.attackIndex]);
			self.currentChara = attackCharacters[self.attackIndex++];
			self.characterExec(self.currentChara, self.attackData, self.targetData);
		}else{
			console.log("targetIndex:"+self.targetIndex + ",currentChara:"+targetCharacters[self.targetIndex]);
			self.currentChara = targetCharacters[self.targetIndex++];
			self.characterExec(self.currentChara, self.targetData, self.attackData);
		}
		self.currentChara.herts = null;
		if(self.currentChara.attackTarget){
			self.currentChara.attackTarget.herts = null;
		}
		self.currentChara = null;
		
		if(attackCharacters.length==0){
			self.result(false);
			SeigniorExecute.run();
			return;
		}else if(targetCharacters.length==0){
			self.result(true);
			return;
		}
	}
	self.timer.reset();
	self.timer.start();
};
BattleAIExecute.prototype.result=function(isWin){
	var self = this;
	console.log("result isWin:"+isWin);
	console.log("self.attackData:",self.attackData);
	var fromCity = self.attackData.fromCity;
	var toCity = self.attackData.toCity;
	var fromSeignior = fromCity.seignior();
	SeigniorExecute.Instance().stop = false;
	if(self.characterView.attackTarget){
		self.characterView.attackTarget.remove();
	}
	self.characterView.remove();
	experienceToFeat(self.attackData._characterList);
	experienceToFeat(self.targetData._characterList);
	SeigniorExecute.Instance().msgView.showSeignior();
	if(isWin){
		var winSeigniorId = fromSeignior.chara_id();
		var failSeigniorId = toCity.seigniorCharaId();
		var isTribe = fromSeignior.character().isTribeCharacter();
		if(isTribe){
			if(toCity.seigniorCharaId()){
				SeigniorExecute.addMessage(String.format(Language.get("{0}的{1}遭到了{2}的掠夺,损失惨重!"),toCity.seignior().character().name(),toCity.name(),fromSeignior.character().name()));
			}else{
				SeigniorExecute.addMessage(String.format(Language.get("{0}遭到了{1}的掠夺,损失惨重!"),toCity.name(),toCity.seignior().character().name()));
			}
			//外族入侵，资源损失
			lossOfResourcesByTribe(toCity, fromCity);
			//外族兵力及资源撤回
			var characters = self.attackData.expeditionCharacterList;
			attackResourcesReturnToCity(characters, self.attackData, fromCity);
		}else{
			if(toCity.seignior().isTribe()){
				//外族资源重设
				resetTribeCity(toCity);
			}
			//{0}攻占了{1}军的{2}!
			if(toCity.seigniorCharaId()){
				SeigniorExecute.addMessage(String.format(Language.get("win_attack_and_occupy_enemy"),fromSeignior.character().name(),toCity.seignior().character().name(),toCity.name()));
			}else{
				SeigniorExecute.addMessage(String.format(Language.get("win_attack_and_occupy_null"),fromSeignior.character().name(),toCity.name()));
			}
		
		
			var leaderId = self.attackData._characterList[0].id();
			retreatCity = battleFailChangeCity(toCity, failSeigniorId);
			var retreatCityId = 0;
			if(retreatCity){
				retreatCityId = retreatCity.id();
			}
			battleCityChange(winSeigniorId,
			failSeigniorId, 
			retreatCityId, 
			self.attackData._characterList,
			toCity,
			self.attackData.captives);
			console.warn("self.attackData.captives=" , self.attackData.captives);
			retreatCityId = battleCheckRetreatCity(retreatCity, failSeigniorId, toCity);
			
			toCity.food(self.attackData.food);
			toCity.money(self.attackData.money);
			toCity.troops(toCity.troops() + self.attackData.troops);
			
			captivesAutomatedProcessing(self.attackData.captives, leaderId, retreatCityId, toCity, fromCity);//处理俘虏
		}
		battleChangeCharactersStatus(winSeigniorId, fromCity, self.attackData._characterList);//战斗结束后武将状态转换，以及出战城池太守任命
		LMvc.MapController.view.resetAreaIcon(toCity.id());
		LMvc.MapController.checkSeigniorFail(failSeigniorId);
	}else{
		//{0}攻占{1}军的{2}失败了!
		SeigniorExecute.addMessage(String.format(Language.get("fail_attack_and_occupy_enemy"),fromSeignior.character().name(),toCity.seignior().character().name(),toCity.name()));
		var winSeigniorId = toCity.seignior().chara_id();
		var failSeigniorId = fromSeignior.chara_id();
		var retreatCityId = fromCity.id();
		var leaderId = self.targetData._characterList[0].id();
		captivesAutomatedProcessing(self.targetData.captives, leaderId, retreatCityId, toCity, fromCity);//处理俘虏
		battleChangeCharactersStatus(winSeigniorId, fromCity, self.attackData._characterList);//战斗结束后武将状态转换，以及出战城池太守任命
	}
};
BattleAIExecute.prototype._set=function(attackData, targetData){
	var self = this;
	var expeditionCharacterList = [];
	attackData.expeditionCharacterList.forEach(function(child){
		child.calculation(true);
		expeditionCharacterList.push({data:child,belong:Belong.SELF,status:new CharacterStatusIconView(null),getTerrain:function(){return {value:1};}});
	});
	attackData.captives = [];
	attackData._characterList = attackData.expeditionCharacterList;
	attackData.expeditionCharacterList = expeditionCharacterList;
	self.attackData = attackData;
	expeditionCharacterList = [];
	targetData.expeditionCharacterList.forEach(function(child){
		child.calculation(true);
		expeditionCharacterList.push({data:child,belong:Belong.ENEMY,status:new CharacterStatusIconView(null),getTerrain:function(){return {value:1};}});
	});
	targetData.captives = [];
	targetData._characterList = targetData.expeditionCharacterList;
	targetData.expeditionCharacterList = expeditionCharacterList;
	self.targetData = targetData;
	
	var fromPosition = self.attackData.fromCity.position();
	var fromX = fromPosition.x + CityIconConfig.width * 0.5 - BattleCharacterSize.width;
	var fromY = fromPosition.y + CityIconConfig.height * 0.5 - BattleCharacterSize.height;
	var toPosition = self.attackData.toCity.position();
	var toX = toPosition.x + CityIconConfig.width * 0.5;
	var toY = toPosition.y + CityIconConfig.height * 0.5 - BattleCharacterSize.height;
	var targetX = toX, targetY = toY;
	if(fromPosition.x > toPosition.x){
		targetX = toX - BattleCharacterSize.width * 2;
	}else{
		toX = targetX - BattleCharacterSize.width * 2;
	}
	LMvc.MapController.view.positionChangeToCity(self.attackData.fromCity);
	var chara = new BattleCharacterView(LMvc.MapController, attackData._characterList[0].id(), BattleCharacterSize.width, BattleCharacterSize.height);
	chara.scaleX = chara.scaleY = 2;
	chara.setCoordinate(fromX, fromY);
	LMvc.MapController.view.baseLayer.addChild(chara);
	var target;
	if(targetData._characterList.length > 0){
		target = new BattleCharacterView(LMvc.MapController, targetData._characterList[0].id(), BattleCharacterSize.width, BattleCharacterSize.height);
		target.scaleX = target.scaleY = 2;
		target.setCoordinate(targetX, targetY);
		LMvc.MapController.view.baseLayer.addChild(target);
		chara.setActionDirection(CharacterAction.MOVE, getDirectionFromTarget(chara, target));
		target.setActionDirection(CharacterAction.STAND, getDirectionFromTarget(target, chara));
		chara.attackTarget = target;
	}else{
		chara.setActionDirection(CharacterAction.MOVE, getDirectionFromTarget(chara, {getTo:function(){return [targetX, targetY];}}));
	}
	
	chara.ctrlX = chara.x;
	chara.ctrlY = chara.y;
	self.characterView = chara;
	SeigniorExecute.Instance().msgView.hideSeignior();
	LTweenLite.to(chara,1,{ctrlX:toX,ctrlY:toY,delay:1,onUpdate:function(event){
		var child = event.target;
		child.setCoordinate(child.ctrlX, child.ctrlY);
		LMvc.MapController.view.toPosition(child.x, child.y);
	},onComplete:function(event){
		var child = event.target;
		if(child.attackTarget){
			child.setActionDirection(CharacterAction.ATTACK, getDirectionFromTarget(child, child.attackTarget));
			child.attackTarget.setActionDirection(CharacterAction.ATTACK, getDirectionFromTarget(child.attackTarget, child));
		}else{
			child.changeAction(CharacterAction.ATTACK);
		}
	}}).to(chara,1,{onUpdate:function(){}, onComplete:function(event){
		BattleAIExecute.Instance().timer.reset();
		BattleAIExecute.Instance().timer.start();
	}});
};
BattleAIExecute.prototype.getTargetCharacters=function(chara){
	return this.attackData.expeditionCharacterList[0].data.seigniorId() == chara.data.seigniorId() ? this.targetData.expeditionCharacterList : this.attackData.expeditionCharacterList;
};
BattleAIExecute.prototype.removeChara = function(chara){
	var self = this;
	var charaList;
	var captives;
	console.log("removeChara", self.attackData.expeditionCharacterList, chara);
	if(self.attackData.expeditionCharacterList[0].data.seigniorId() == chara.data.seigniorId()){
		charaList = self.attackData.expeditionCharacterList;
		captives = self.targetData.captives;
	}else{
		charaList = self.targetData.expeditionCharacterList;
		captives = self.attackData.captives;
	}
	console.log("removeChara "+chara.data.name() + ", length=" + charaList.length);
	for(var i=0,l=charaList.length;i<l;i++){
		console.warn(charaList[i].data.name() + "==" + chara.data.name());
		if(charaList[i].data.id() == chara.data.id()){
			var nearCharas = [];
			if(i - 1 >= 0){
				nearCharas.push(charaList[i - 1]);
			}
			if(i + 1 < charaList.length){
				nearCharas.push(charaList[i + 1]);
			}
			if(calculateHitrateCaptive(chara, nearCharas) || true){
				captives.push(chara.data.id());
			}
			charaList.splice(i, 1);
			break;
		}
	}
	console.log("removeChara Over, length=" + charaList.length);
};
BattleAIExecute.prototype.characterExec=function(currentCharacter, currentData, enemyData){
	var self = this;
	console.log("characterExec:",currentCharacter);
	var currentCharacters = currentData.expeditionCharacterList;
	var enemyCharacters = enemyData.expeditionCharacterList;
	var enemyPants = self.getPantCharacter(enemyCharacters);
	//有虚弱敌军->攻击
	if(enemyPants.length > 0 && Math.random() > 0.8){
		var targetChara = enemyPants[enemyPants.length*Math.random() >>> 0];
		console.log("有虚弱敌军->攻击:"+currentCharacter.data.name() + " > " + targetChara.data.name());
		currentCharacter.attackTarget = targetChara;
		self.attackExec(currentCharacter, targetChara, true);
		return;
	}
	//有虚弱友军->回复
	var currentPants = self.getPantCharacter(currentCharacters);
	if(currentPants.length > 0){
		var targetChara = currentPants[currentPants.length*Math.random() >>> 0];
		if(self.healExec(currentCharacter, targetChara)){
			console.log("有虚弱友军->回复:"+currentCharacter.data.name() + " > " + targetChara.data.name());
			return;
		}
	}
	//有异常状态友军->觉醒
	if(self.toWake(currentCharacter,currentCharacters)){
		console.log("有异常状态友军->觉醒");
		return;
	}
	//加状态
	if(self.useAidStrategy(currentCharacter,currentCharacters,StrategyEffectType.Aid, BattleIntelligentAI.UP_STATUS)){
		console.log("加状态");
		return;
	}
	//减状态
	if(self.useAidStrategy(currentCharacter,enemyCharacters,StrategyEffectType.Aid, BattleIntelligentAI.DOWN_STATUS)){
		console.log("减状态");
		return;
	}
	//攻击
	var targetChara = enemyCharacters[enemyCharacters.length*Math.random() >>> 0];
	console.log("攻击:"+currentCharacter.data.name() + " > " + targetChara.data.name());
	currentCharacter.attackTarget = targetChara;
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
	console.log("chara:"+chara.data.troops() + " -> " + target.data.troops());
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
	console.error("useAidStrategy",chara);
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
	console.log("physicalAttack:"+currentChara.data.name() + "("+currentChara.data.troops() + ")->" + targetChara.data.name()+"("+targetChara.data.troops() + ")");
	var groupSkill;
	var skill;
	if(currentChara.herts == null){
		if(currentChara.data.id() == self.currentChara.data.id()){
			currentChara.herts = [];
			var hertValue = calculateHertValue(currentChara, targetChara, 1);
			var hertValues = [];
			skill = currentChara.data.skill(SkillType.ATTACK);
			var condition = skill ? skill.condition() : null;
			if(condition){
				if(condition.type == "AttackType"){
					if(condition.value != currentChara.data.currentSoldiers().attackType()){
						skill = null;
					}
				}else if(condition.type == "StatusCompare"){
					var selfValue = currentChara.data[condition.name]();
					var targetValue = targetChara.data[condition.name]();
					if((selfValue - targetValue)*condition.value <= 0){
						skill = null;
					}
				}
			}
			if(skill && skill.isSubType(SkillSubType.ATTACK_COUNT)){
				hertValues = skill.attacks();
			}else{
				var doubleAtt = calculateDoubleAtt(currentChara, targetChara);
				hertValues = doubleAtt ? [1,1] : [1];
			}
			if(skill && skill.isSubType(SkillSubType.AMBUSH_INVERSE)){
				//TODO::暂时增加0.1，需计算得出
				hertValues[0] += 0.1;
			}
			if(skill && skill.isSubType(SkillSubType.NO_COUNTER)){
				targetChara.herts = [];
			}
			
			for(var j=0;j<hertValues.length;j++){
				var hertParams = new HertParams();
				var value = hertValue*hertValues[j]>>>0;
				hertParams.push(targetChara, value > 1 ? value : 1);
				if(skill && skill.isSubType(SkillSubType.ATTACK_RECT)){
						rangeAttackTarget = skill.rects();
					}else{
						rangeAttackTarget = currentChara.data.currentSoldiers().rangeAttackTarget();
				}
				//TODO::蔓延，穿透等效果暂时未加入
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
			currentChara.groupSkill = null;
			if(groupSkill){
				currentChara.groupSkill = groupSkill;
				var hertParamObj = 
				currentChara.herts[0].value = currentChara.herts[0].value * groupSkill.correctionFactor() >>> 0;
			}
			if(skill && skill.isSubType(SkillSubType.SURPRISE)){
				var amendValue = calculateSkillSurpriseAmend(currentChara, targetChara, skill.attacks());
				if(amendValue > 1){
					hertParams.list[0].hertValue = hertParams.list[0].hertValue*amendValue>>>0;
				}else{
					skill = null;
				}
			}
		}else{
			var hertParams = new HertParams();
			rangeAttackTarget = self.currentChara.data.currentSoldiers().rangeAttackTarget();
			hertParams.push(targetChara, calculateHertValue(currentChara, targetChara, 0.75));
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
					hertParams.push(chara,calculateHertValue(currentChara, chara, 0.75));
				}
			}
			currentChara.herts = [hertParams];
		}
	}
	if(!currentChara.groupSkill && calculateFatalAtt(currentChara, targetChara)){
		var hertParams = currentChara.herts[0];
		var value = 1.25;
		if(!skill){
			skill = currentChara.data.skill(SkillType.ANGRY_ATTACK);
			if(skill && skill.isSubType(SkillSubType.ATTACK_COUNT)){
				value = (skill.attacks())[0];
			}
		}
		hertParams.list[0].hertValue = hertParams.list[0].hertValue*value >>> 0;
	}
	self.physicalAttackStart(currentChara, targetChara);
};
BattleAIExecute.prototype.physicalAttackStart = function(currentChara, targetChara){
	var self = this;
	console.log("physicalAttackStart:",currentChara.herts);
	var selfSkill = currentChara.data.skill(SkillType.ATTACK_END);
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
		console.log("命中率 : "+currentChara.data.name() +" - "+obj.chara.data.name() + "="+hitrate);
		if(!hitrate){
			continue;
		}
		skill = obj.chara.data.skill(SkillType.HERT);
		if(skill && skill.isSubType(SkillSubType.HERT_MINUS)){
			obj.hertValue *= skill.hert();
		}
		obj.chara.hertValue = obj.hertValue > obj.chara.data.troops() ? obj.chara.data.troops() : obj.hertValue;
		obj.chara.data.troops(obj.chara.data.troops() - obj.chara.hertValue);
		console.log("伤害 : "+(-obj.chara.hertValue)+" 剩余 : "+obj.chara.data.name() + "("+obj.chara.data.troops()+")");
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
		if(targetChara.data.troops() == 0){
			return;
		}
		console.log("counterAttack "+currentChara.data.name()+" 双击");
		self.physicalAttack(currentChara, targetChara);
		return;
	}
	if(currentChara.data.id() == self.currentChara.data.id()){
		if(targetChara.data.troops() > 0 && !targetChara.herts){
			console.log("counterAttack "+targetChara.data.name()+" 反击");
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
};
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