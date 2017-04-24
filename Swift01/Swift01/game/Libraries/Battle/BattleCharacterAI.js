function BattleCharacterAI(chara) {
	var self = this;
	base(self,LObject,[]);
	self.chara = chara;
	self.herts = null;
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
	if(!self.chara.currentSelectStrategy.imageCache()){
		self.chara.currentSelectStrategy.strategyImageLoad(self,self.magicAttack,[target]);
		return;
	}
	//智力经验
	self.chara.data.propertiesExp("intelligence", 1);
	//console.log("magicAttack",self.chara.data.name(),target.data.name());
	LMvc.running = true;
	LMvc.BattleController.startAttack = true;
	self.attackTarget = target;
	LMvc.currentAttackCharacter = self.chara;
	LMvc.currentAttackTarget = target;
	var soldier = self.chara.data.currentSoldiers();
	soldier.proficiency(soldier.proficiency() + 1);
	//console.log("target.AI.attackTarget" ,target.AI.attackTarget);
	var direction = getDirectionFromTarget(self.chara, target);
	self.chara.setActionDirection(CharacterAction.MAGIC_ATTACK, direction);
	var hertParams;
	var skill;
	if(self.herts === null){
		self.herts = [];
		var currentSelectStrategy = self.chara.currentSelectStrategy;
		var rangeAttackTarget = currentSelectStrategy.rangeAttackTarget();
		skill = self.chara.data.skill(SkillType.STRATEGY_ATTACK);
		if(skill && skill.belong() && skill.belong() != currentSelectStrategy.belong()){
			skill = null;
		}
		var condition = skill ? skill.condition() : null;
		if(condition){
			if(condition.type == "StrategyType"){
				if(condition.value != currentSelectStrategy.strategyType()){
					skill = null;
				}
			}
		}
		var cost = self.chara.currentSelectStrategy.cost();
		if(skill && skill.isSubType(SkillSubType.THRIFT_MP)){
			cost *= (1-skill.thrift());
		}
		self.chara.data.MP(self.chara.data.MP()-cost);
		var correctionFactor = 1;
		var hertValues, charas = [];
		if(skill && skill.isSubType(SkillSubType.STRATEGY_COUNT)){
			hertValues = skill.strategyAttacks();
		}else{
			hertValues = [1];
		}
		//法术连击和其他效果叠加
		if(hertValues.length == 1){
			var skill2 = self.chara.data.skill(SkillType.STRATEGY_COUNT_ATTACK);
			if(skill2 && skill2.isSubType(SkillSubType.STRATEGY_COUNT)){
				var v = hertValues[0];
				hertValues = skill2.strategyAttacks().concat();
				for(var i=0;i<hertValues.length;i++){
					hertValues[i] *= v;
				}
			}
		}
		if(skill && skill.isSubType(SkillSubType.AMBUSH)){
			hertValues[0] += calculateAmbush(skill, target.locationX(), target.locationY(), self.chara.belong, 0);
		}
		for(var j=0;j<hertValues.length;j++){
			correctionFactor = hertValues[j];
			hertParams = new HertParams();
			var ranges;
			if(j == 0 && skill && skill.isSubType(SkillSubType.SPREAD)){//蔓延
				ranges = calculateSpreadPoints(skill, rangeAttackTarget, target);
			}else if(j == 0 && skill && skill.isSubType(SkillSubType.PENETRATE)){//穿透
				ranges = calculatePenetratePoints(self.chara,target, rangeAttackTarget);
			}else{
				ranges = rangeAttackTarget;
			}
			for(var i = 0;i<ranges.length;i++){
				var range = ranges[i];
				var chara = LMvc.BattleController.view.charaLayer.getCharacterFromLocation(target.locationX()+range.x, target.locationY()+range.y);
				if(!chara || ((currentSelectStrategy.belong() == Belong.SELF) ^ isSameBelong(chara.belong,self.chara.belong)) ){
					continue;
				}
				/*if(!chara || (currentSelectStrategy.belong() == Belong.ENEMY && isSameBelong(chara.belong,self.chara.belong)) 
					|| (currentSelectStrategy.belong() == Belong.SELF && !isSameBelong(chara.belong,self.chara.belong))){
					continue;
				}*/
				hertParams.push(chara, correctionFactor*calculateStrategyCharasCorrection(chara));
				charas.push(chara);
			}
			self.herts.push(hertParams);
		}
		//console.log("self.herts.length : "+(self.herts.length));
		var groupSkill = skill ? null : battleCanGroupSkill(self.chara, target);
		//console.log("groupSkill : "+(groupSkill));
		if(groupSkill){
			hertParams = self.herts[0];
			correctionFactor = groupSkill.correctionFactor();
			for(var i = 0,l = hertParams.list.length;i<l;i++){
				hertParams.list[i].hertValue = correctionFactor;
			}
			//groupSkill对话
		}
	}
	if(!skill){
		skill = self.chara.data.skill(SkillType.STRATEGY_ATTACK_END);
	}
	hertParams = self.herts[0];
	self.herts.shift();
	for(var i = 0,l = hertParams.list.length;i<l;i++){
		var obj = hertParams.list[i];
		var chara = obj.chara;
		chara.hertIndex = l - i;
		var effectView = new EffectStrategyView(null, self.chara, chara, obj.hertValue, skill);
		effectView.isTarget = chara.data.id() == target.data.id();
		effectView.x = chara.x;
		effectView.y = chara.y;
		LMvc.BattleController.view.effectLayer.addChild(effectView);
	}
};
BattleCharacterAI.prototype.physicalAttack = function(target) {
	var self = this;
	//武力经验
	self.chara.data.propertiesExp("force", 1);
	LMvc.running = true;
	LMvc.BattleController.startAttack = true;
	LMvc.currentAttackCharacter = self.chara;
	LMvc.currentAttackTarget = target;
	var soldier = self.chara.data.currentSoldiers();
	soldier.proficiency(soldier.proficiency() + 1);
	self.attackTarget = target;
	var direction = getDirectionFromTarget(self.chara, target);
	var skill;
	var rangeAttackTarget;
	if(self.herts === null){
		if(self.chara.data.id() == BattleController.ctrlChara.data.id()){
			self.herts = [];
			var hertValue = calculateHertValue(self.chara, target, 1);
			var hertValues = [];
			skill = self.chara.data.skill(SkillType.ATTACK);
			var condition = skill ? skill.condition() : null;
			if(condition){
				if(condition.type == "AttackType"){
					if(condition.value != self.chara.data.currentSoldiers().attackType()){
						skill = null;
					}
				}else if(condition.type == "StatusCompare"){
					var selfValue = self.chara.data[condition.name]();
					var targetValue = target.data[condition.name]();
					if((selfValue - targetValue)*condition.value <= 0){
						skill = null;
					}
				}
			}
			if(skill && skill.isSubType(SkillSubType.ATTACK_COUNT)){
				hertValues = skill.attacks();
			}else{
				var doubleAtt = calculateDoubleAtt(self.chara, target);
				hertValues = doubleAtt ? [1,1] : [1];
			}
			if(skill && skill.isSubType(SkillSubType.AMBUSH_INVERSE)){
				hertValues[0] += calculateAmbush(skill, self.chara.locationX(), self.chara.locationY(), target.belong, 0);
			}
			if(skill && skill.isSubType(SkillSubType.AMBUSH)){
				hertValues[0] += calculateAmbush(skill, target.locationX(), target.locationY(), self.chara.belong, 1);
			}
			if(skill && skill.isSubType(SkillSubType.NO_COUNTER)){
				target.AI.herts = [];
			}
			for(var j=0;j<hertValues.length;j++){
				var hertParams = new HertParams();
				var value = hertValue*hertValues[j]>>>0;
				hertParams.push(target, value > 1 ? value : 1);
				if(j == 0 && skill && skill.isSubType(SkillSubType.SPREAD)){//蔓延
					var ranges = self.chara.data.currentSoldiers().rangeAttackTarget();
					rangeAttackTarget = calculateSpreadPoints(skill, ranges, target);
					//rangeAttackTarget = ranges;
				}else if(j == 0 && skill && skill.isSubType(SkillSubType.PENETRATE)){//穿透
					var ranges = self.chara.data.currentSoldiers().rangeAttackTarget();
					rangeAttackTarget = calculatePenetratePoints(self.chara,target, ranges, skill.penetrate());
				}else if(skill && skill.isSubType(SkillSubType.ATTACK_RECT)){
					rangeAttackTarget = skill.rects();
				}else if(skill && skill.isSubType(SkillSubType.ATTACK_IN_RECT)){
					rangeAttackTarget = calculateInAttackRangePoints(self.chara, target, self.chara.data.currentSoldiers().rangeAttack());
				}else{
					rangeAttackTarget = self.chara.data.currentSoldiers().rangeAttackTarget();
					if(skill && (skill.isSubType(SkillSubType.FALL_BACK) || skill.isSubType(SkillSubType.BREAK_THROUGH)) && self.herts.length == 0){
						self.chara.currentSkill = skill;
						var penetratePoint = getPenetratePoint(self.chara,target, 1);
						penetratePoint = penetratePoint[0];
						var chara = LMvc.BattleController.view.charaLayer.getCharacterFromLocation(target.locationX()+penetratePoint.x, target.locationY()+penetratePoint.y);
						if(chara && !isSameBelong(chara.belong,self.chara.belong)){
							rangeAttackTarget.push(penetratePoint);
						}
					}
				}
				for(var i = 0;i<rangeAttackTarget.length;i++){
					var range = rangeAttackTarget[i];
					if(range.x == 0 && range.y == 0){
						continue;
					}
					var chara = LMvc.BattleController.view.charaLayer.getCharacterFromLocation(target.locationX()+range.x, target.locationY()+range.y);
					if(!chara || isSameBelong(chara.belong,self.chara.belong)){
						continue;
					}
					hertParams.push(chara,calculateHertValue(self.chara, chara, 1));
				}
				self.herts.push(hertParams);
			}
			hertParams = self.herts[0];
			if(self.herts.length == 1 && skill && skill.isSubType(SkillSubType.ATTACK_RECT)){
				var attacks = skill.attacks();
				if(attacks && attacks.length > 0){
					hertParams.list[0].hertValue = hertParams.list[0].hertValue*attacks[0]>>>0;
				}
			}
			if(skill && skill.isSubType(SkillSubType.ENEMY_AID)){
				var aids = skill.aids();
				var aidCount = skill.aidCount();
				var aidRects = skill.aidRects();
				for(var i=0;i<aidRects.length;i++){
					var range = aidRects[i];
					var hertParamObj = hertParams.list.find(function(child){
						return child.chara.onLocation(target.locationX()+range.x, target.locationY()+range.y);
					});
					if(!hertParamObj){
						var chara = LMvc.BattleController.view.charaLayer.getCharacterFromLocation(target.locationX()+range.x, target.locationY()+range.y);
						if(!chara || isSameBelong(chara.belong,self.chara.belong)){
							continue;
						}
						hertParams.push(chara,0);
						hertParamObj = hertParams.list[hertParams.list.length - 1];
					}
					if(hertParamObj){
						hertParamObj.aids = Array.getRandomArrays(aids,aidCount);
					}
				}
			}
			var groupSkill = battleCanGroupSkill(self.chara, target);
			if(groupSkill){
				self.chara.groupSkill = groupSkill;
				hertParams.list[0].hertValue = hertParams.list[0].hertValue*groupSkill.correctionFactor()>>>0;
			}
			if(skill && skill.isSubType(SkillSubType.SURPRISE)){
				var amendValue = calculateSkillSurpriseAmend(self.chara, target, skill.attacks());
				if(amendValue > 1){
					hertParams.list[0].hertValue = hertParams.list[0].hertValue*amendValue>>>0;
				}else{
					skill = null;
				}
			}
		}else{
			skill = self.chara.data.skill(SkillType.BACK_ATTACK);
			self.herts = [];
			//var hertValue = calculateHertValue(self.chara, target, 1);
			var hertValues;
			if(skill && skill.isSubType(SkillSubType.ATTACK_COUNT)){
				hertValues = skill.attacks();
			}else{
				var doubleAtt = calculateDoubleAtt(self.chara, target);
				hertValues = [0.75];
			}
			var borrow = false;
			if(skill && skill.isSubType(SkillSubType.BORROW)){
				borrow = true;
			}
			for(var j=0;j<hertValues.length;j++){
				var hertValue = hertValues[j];
				var hertParams = new HertParams();
				if(j == 0 && skill && skill.isSubType(SkillSubType.PENETRATE)){//穿透
					var ranges = self.chara.data.currentSoldiers().rangeAttackTarget();
					rangeAttackTarget = calculatePenetratePoints(self.chara,target, ranges);
				}else{
					rangeAttackTarget = self.chara.data.currentSoldiers().rangeAttackTarget();
				}
				hertParams.push(target,calculateHertValue(borrow ? target : self.chara, target, hertValue));
				for(var i = 0;i<rangeAttackTarget.length;i++){
					var range = rangeAttackTarget[i];
					if(range.x == 0 && range.y == 0){
						continue;
					}
					var chara = LMvc.BattleController.view.charaLayer.getCharacterFromLocation(target.locationX()+range.x, target.locationY()+range.y);
						
					if(!chara || isSameBelong(chara.belong,self.chara.belong)){
						continue;
					}
					hertParams.push(chara,calculateHertValue(self.chara, chara, hertValue));
				}
				self.herts.push(hertParams);
			}
		}	
	}
	if(!self.chara.groupSkill && calculateFatalAtt(self.chara, target)){
		self.chara.isAngry = true;
		//self.herts[0].value = self.herts[0].value * 1.25 >>> 0;
		var hertParams = self.herts[0];
		var value = 1.25;
		if(!skill){
			skill = self.chara.data.skill(SkillType.ANGRY_ATTACK);
			if(skill && skill.isSubType(SkillSubType.ATTACK_COUNT)){
				var valueS = (skill.attacks())[0];
				value = value > valueS ? value : valueS;
			}
		}
		hertParams.list[0].hertValue = hertParams.list[0].hertValue*value >>> 0;
	}
	self.chara.changeDirection(direction);
	if(skill){
		var specialEffect = new SpecialEffectView(null, self.chara.data, skill.name());
		specialEffect.addEventListener(LEvent.COMPLETE, function(){
			self.physicalAttackStart();
		});
		LMvc.BattleController.view.addChild(specialEffect);
	}else{
		self.physicalAttackStart();
	}
};
BattleCharacterAI.prototype.physicalAttackStart = function() {
	var self = this;
	self.chara.changeAction(CharacterAction.ATTACK);
	self.chara.addEventListener(BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE,self.attackActionComplete);
};
BattleCharacterAI.prototype.singleCombat = function(target) {
	var self = this;
	self.attackTarget = target;
	target.AI.attackTarget = self.chara;
	var direction = getDirectionFromTarget(self.chara, target);
	var directionTarget = getDirectionFromTarget(target, self.chara);
	target.changeDirection(directionTarget);
	self.chara.changeDirection(direction);
	if(self.chara.belong == Belong.SELF){
		battleSingleCombatCheck(self.chara);
	}
};
BattleCharacterAI.prototype.attackActionComplete = function(event) {
	var chara = event.currentTarget,selfSkill,skill;
	var self = chara.AI;
	chara.removeEventListener(BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE,self.attackActionComplete);
	chara.changeAction(chara.data.isPantTroops()?CharacterAction.PANT:(chara.data.id() == BattleController.ctrlChara.data.id() ? CharacterAction.STAND : CharacterAction.MOVE));
	if(chara.currentSkill){
		selfSkill = chara.currentSkill;
		chara.currentSkill = null;
	}else{
		if(chara.data.id() == BattleController.ctrlChara.data.id()){
			selfSkill = chara.data.skill(SkillType.ATTACK_END);
		}else{
			selfSkill = chara.data.skill(SkillType.BACK_ATTACK_END);
		}
	}
	if(selfSkill && (selfSkill.isSubType(SkillSubType.SELF_AID) || selfSkill.isSubType(SkillSubType.BREAK_THROUGH))){
		tweenTextShow(chara, selfSkill.name(), 22);
		var aids = Array.getRandomArrays(selfSkill.aids(),selfSkill.aidCount());
		for(var j = 0;j<aids.length;j++){
			var strategy = StrategyMasterModel.getMaster(aids[j]);
			chara.status.addStatus(strategy.strategyType(), strategy.hert());
		}	
	}
	var hertParams = self.herts[0];
	var hardships = 0;
	if(chara.data.id() == BattleController.ctrlChara.data.id()
	&& chara.data.hasSkill(SkillSubType.HARDSHIPS)){
		if(chara.data.hardships() > 0){
			hardships = chara.data.hardships();
			chara.data.hardships(0);
		}
	}
	self.herts.shift();
	var mapLayer = LMvc.BattleController.view.mapLayer;
	if(selfSkill && self.herts.length == 0){
		var charaLayer = LMvc.BattleController.view.charaLayer;
		if(!self.attackTarget.data.isDefCharacter() && selfSkill.isSubType(SkillSubType.FALL_BACK)){
			var penetratePoint = getPenetratePoint(chara,self.attackTarget, 1);
			penetratePoint = penetratePoint[0];
			var lx = self.attackTarget.locationX()+penetratePoint.x;
			var ly = self.attackTarget.locationY()+penetratePoint.y;
			var terrainId = mapLayer.getTerrainId(lx, ly);
			var cost = chara.data.currentSoldiers().terrain(terrainId).moveCost;
			if(cost < 100){
				var charaTarget = charaLayer.getCharacterFromLocation(lx, ly);
				if(!charaTarget){
					charaLayer.setToPosition(self.attackTarget, lx, ly);
				}
			}
		}else if(selfSkill.isSubType(SkillSubType.BREAK_THROUGH)){
			var penetratePoint = getPenetratePoint(chara,self.attackTarget, 1);
			penetratePoint = penetratePoint[0];
			var lx = self.attackTarget.locationX()+penetratePoint.x;
			var ly = self.attackTarget.locationY()+penetratePoint.y;
			var terrainId = mapLayer.getTerrainId(lx, ly);
			var cost = chara.data.currentSoldiers().terrain(terrainId).moveCost;
			if(cost < 100){
				var charaTarget = charaLayer.getCharacterFromLocation(lx, ly);
				if(!charaTarget){
					charaLayer.setToPosition(chara, lx, ly);
				}
			}
		}
	}
	for(var i = 0,l = hertParams.list.length;i<l;i++){
		var obj = hertParams.list[i];
		obj.chara.hertIndex = l - i;
		if(hardships > 0){
			obj.hertValue *= (1 + hardships);
			obj.hertValue = obj.hertValue >>> 0;
		}
		var hitrate = false;
		if(obj.chara.militaryModel && obj.chara.militaryModel.isType(MilitaryType.BARRIER)){
			tweenTextShow(obj.chara, obj.chara.militaryModel.name());
			obj.chara.militaryValidLimit--;
			if(obj.chara.militaryValidLimit <= 0){
				obj.chara.militaryModel = null;
			}
		}else{
			hitrate = calculateHitrate(chara,obj.chara);
		}
		if(hitrate){
			skill = obj.chara.data.skill(SkillType.HERT);
			var condition = skill ? skill.condition() : null;
			if(condition){
				if(condition.type == "SoldierId"){
					if(condition.value.indexOf(obj.chara.data.currentSoldiers().id()) < 0){
						skill = null;
					}
				}
			}
			if(skill && skill.isSubType(SkillSubType.BOUNCE)){
				var changeHp = obj.hertValue * skill.bounce() >>> 0;
				if(changeHp > chara.data.troops()){
					changeHp = chara.data.troops();
				}
				chara.data.troops(chara.data.troops() - changeHp, calculateWounded(0.5, 0.2));
				tweenTextShow(chara, String.format("-{0}",changeHp), 10);
			}
			if(skill && skill.isSubType(SkillSubType.HERT_MINUS)){
				tweenTextShow(obj.chara, skill.name());
				obj.hertValue *= skill.hert();
				obj.hertValue = obj.hertValue >>> 0;
				
				if(skill.isSubType(SkillSubType.HEAL)){
					var wounded = obj.chara.data.wounded();
					var troops = obj.chara.data.troops();
					obj.chara.data.wounded(0);
					obj.chara.data.troops(troops + wounded);
				}else if(skill.isSubType(SkillSubType.SELF_AID)){
					var aids = Array.getRandomArrays(skill.aids(),skill.aidCount());
					for(var j = 0;j<aids.length;j++){
						var strategy = StrategyMasterModel.getMaster(aids[j]);
						obj.chara.status.addStatus(strategy.strategyType(), strategy.hert());
					}
				}
			}
			if(skill && skill.isSubType(SkillSubType.HP_MP_CHANGE)){
				var skillName = null;
				if(obj.chara.data.MP() > 0){
					var minusMp = obj.hertValue > obj.chara.data.MP() ? obj.chara.data.MP() : obj.hertValue;
					obj.hertValue = 0;
					obj.chara.data.MP(obj.chara.data.MP() - minusMp);
					skillName = skill.name();
				}else if(Math.fakeRandom() > skill.changeProbability()*0.01){
					var emptyMp = obj.chara.data.maxMP() - obj.chara.data.MP();
					var plusMp = obj.hertValue > emptyMp ? emptyMp : obj.hertValue;
					obj.chara.data.MP(obj.chara.data.MP() + plusMp);
					skillName = skill.name();
				}
				if(skillName){
					tweenTextShow(obj.chara, skill.name());
				}
			}
			
			if(i == 0 && selfSkill && selfSkill.isSubType(SkillSubType.VAMPIRE)){
				var changeHp = obj.hertValue * selfSkill.vampire() >>> 0;
				chara.data.troops(chara.data.troops() + changeHp);
				tweenTextShow(chara, String.format("{0} {1}+{2}",selfSkill.name(),Language.get("troops"),changeHp));
				
			}
			var num = new Num(Num.MIDDLE,1,20);
			obj.chara.hertValue = obj.hertValue > obj.chara.data.troops() ? obj.chara.data.troops() : obj.hertValue;
			num.setValue(obj.chara.hertValue);
			num.x = obj.chara.x;
			num.y = obj.chara.y;
			chara.controller.view.baseLayer.addChild(num);
			LTweenLite.to(num,0.5,{y:num.y - 20,alpha:0,onComplete:function(obj){
				obj.remove();
			}});
			if(obj.aids && obj.aids.length > 0){
				for(var j = 0;j<obj.aids.length;j++){
					var strategy = StrategyMasterModel.getMaster(obj.aids[j]);
					if(strategy.canChangeStatus() && mapLayer.isOnWakeRoad(obj.chara)){
						continue;
					}
					obj.chara.status.addStatus(strategy.strategyType(), strategy.hert());
				}
			}
			if(obj.chara.data.hasSkill(SkillSubType.HARDSHIPS)){
				obj.chara.data.hardships(obj.chara.data.hardships() + 0.2);
			}
			//兵种附带异常效果
			var strategySkill = chara.data.currentSoldiers().strategySkill();
			if(strategySkill && strategySkill.belong() == Belong.ENEMY && strategySkill.canChangeStatus()){
				obj.chara.status.addStatus(strategySkill.strategyType(), strategySkill.hert());
			}
			//统率经验
			obj.chara.data.propertiesExp("command", 1);
			obj.chara.changeAction(CharacterAction.HERT);
			LPlugin.playSE("Se_hert", LPlugin.gameSetting.SE);
			obj.chara.addEventListener(BattleCharacterActionEvent.HERT_ACTION_COMPLETE,obj.chara.AI.hertActionComplete);
		}else{
			//敏捷经验
			obj.chara.data.propertiesExp("agility", 1);
			obj.chara.changeAction(CharacterAction.BLOCK);
			LPlugin.playSE("Se_block", LPlugin.gameSetting.SE);
			obj.chara.addEventListener(BattleCharacterActionEvent.BLOCK_ACTION_COMPLETE,obj.chara.AI.blockActionComplete);
		}
	}
};
BattleCharacterAI.prototype.blockActionComplete = function(event) {
	var chara = event.currentTarget;
	var self = chara.AI;
	var stepTime = BattleCharacterStatusConfig.FADE_TIME + BattleCharacterStatusConfig.SHOW_TIME;
	chara.removeEventListener(BattleCharacterActionEvent.BLOCK_ACTION_COMPLETE,self.hertActionComplete);
	if(chara.mode == CharacterMode.END_ACTION){
		chara.changeAction(chara.data.isPantTroops()?CharacterAction.PANT:CharacterAction.STAND);
	}else{
		chara.changeAction(chara.data.isPantTroops()?CharacterAction.PANT:CharacterAction.MOVE);
	}
	LTweenLite.to(chara,chara.hertIndex * stepTime,{onComplete:function(e){
		var chara = e.target;
		if(!isCurrentAttackTarget(chara)){
			return;
		}
		/*
		//TODO::取消装备经验，以后版本升级可能加入
		var statusView = new BattleCharacterStatusView(self.controller,chara);
		statusView.push(BattleCharacterStatusConfig.EXP_ARMOR, 20);
		chara.controller.view.baseLayer.addChild(statusView);
		statusView.startTween();
		if(!isCurrentAttackTarget(chara)){
			return;
		}
		statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,LMvc.currentAttackCharacter.AI.plusExp);*/
		LMvc.currentAttackCharacter.AI.plusExp();
	}});
};
BattleCharacterAI.prototype.hertActionComplete = function(event) {
	var chara = event.currentTarget;
	var self = chara.AI;
	var stepTime = BattleCharacterStatusConfig.FADE_TIME + BattleCharacterStatusConfig.SHOW_TIME;
	chara.removeEventListener(BattleCharacterActionEvent.HERT_ACTION_COMPLETE,self.hertActionComplete);
	if(chara.mode == CharacterMode.END_ACTION){
		chara.changeAction(chara.data.isPantTroops()?CharacterAction.PANT:CharacterAction.STAND);
	}else{
		chara.changeAction(chara.data.isPantTroops()?CharacterAction.PANT:CharacterAction.MOVE);
	}
	LTweenLite.to(chara,chara.hertIndex * stepTime,{onComplete:function(e){
		var chara = e.target;
		var statusView = new BattleCharacterStatusView(self.controller,chara);
		statusView.push(BattleCharacterStatusConfig.TROOPS, -chara.hertValue);
		chara.controller.view.baseLayer.addChild(statusView);
		statusView.startTween();
		if(!isCurrentAttackTarget(chara)){
			return;
		}
		statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,LMvc.currentAttackCharacter.AI.plusExp);
	}});
};
BattleCharacterAI.prototype.plusExp = function(event) {
	var self, chara;
	chara = LMvc.currentAttackCharacter;
	self = chara.AI;
	var statusView = new BattleCharacterStatusView(chara.controller,chara);
	var exp = calculateExp(chara, self.attackTarget);
	if(self.attackTarget.data.troops() == 0){
		exp *= 3;
	}
	statusView.push(BattleCharacterStatusConfig.EXP, exp);
	/*
	//TODO::取消装备经验，以后版本升级可能加入
	statusView.push(BattleCharacterStatusConfig.EXP_WEAPON, 20);
	*/
	statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,chara.currentSelectStrategy ? self.counterMagicAttack : self.counterAttack);
	chara.controller.view.baseLayer.addChild(statusView);
	statusView.startTween();
};
BattleCharacterAI.prototype.counterAttack = function(event) {
	var attackChatacter = event.currentTarget.character;
	if(!isCurrentAttackCharacter(attackChatacter) && !isCurrentAttackTarget(attackChatacter)){
		return;
	}
	if(attackChatacter.AI.herts && attackChatacter.AI.herts.length > 0){
		attackChatacter.AI.physicalAttack(isCurrentAttackCharacter(attackChatacter) ? LMvc.currentAttackTarget : LMvc.currentAttackCharacter);
		return;
	}
	if(attackChatacter.data.id() == BattleController.ctrlChara.data.id() && !attackChatacter.enemyBackAttack){
		var chara = LMvc.currentAttackTarget;
		if(chara.data.troops() > 0 && chara.AI.herts === null && battleCanAttackCharacter(chara, attackChatacter)){
			chara.AI.physicalAttack(attackChatacter);
			return;
		}
	}else if(attackChatacter.AI.attackTarget.data.id() == BattleController.ctrlChara.data.id()){
		var chara = BattleController.ctrlChara;
		var target = attackChatacter;
		var skill = chara.data.skill(SkillType.ENEMY_BACK_ATTACK_END);
		if(skill && skill.isSubType(SkillSubType.ATTACK_COUNT)){
			var hertValues = skill.attacks();
			var hertValue = calculateHertValue(chara, target, 1);
			for(var j=0;j<hertValues.length;j++){
				var hertParams = new HertParams();
				var value = hertValue*hertValues[j]>>>0;
				hertParams.push(target, value > 1 ? value : 1);
				var rangeAttackTarget = chara.data.currentSoldiers().rangeAttackTarget();
				for(var i = 0;i<rangeAttackTarget.length;i++){
					var range = rangeAttackTarget[i];
					if(range.x == 0 && range.y == 0){
						continue;
					}
					var charaGet = LMvc.BattleController.view.charaLayer.getCharacterFromLocation(target.locationX()+range.x, target.locationY()+range.y);
					if(!charaGet || isSameBelong(chara.belong,charaGet.belong)){
						continue;
					}
					hertParams.push(chara,calculateHertValue(chara, charaGet, 1));
				}
				chara.AI.herts.push(hertParams);
			}
			chara.enemyBackAttack = true;
			chara.AI.physicalAttack(attackChatacter);
			return;
		}
	}
	BattleController.ctrlChara.enemyBackAttack = false;
	BattleController.ctrlChara.AI.endAction();
};
BattleCharacterAI.prototype.counterMagicAttack = function(event) {
	var attackChatacter = event.currentTarget.character;
	if(!isCurrentAttackCharacter(attackChatacter) && !isCurrentAttackTarget(attackChatacter)){
		return;
	}
	if(attackChatacter.AI.herts && attackChatacter.AI.herts.length > 0){
		attackChatacter.AI.magicAttack(isCurrentAttackCharacter(attackChatacter) ? LMvc.currentAttackTarget : LMvc.currentAttackCharacter);
		return;
	}
	BattleController.ctrlChara.AI.endAction();
};
BattleCharacterAI.prototype.endAction = function() {
	var self = this, chara = self.chara, target = chara.AI.attackTarget;
	if(target && target.objectIndex != chara.objectIndex){
		target.currentSelectStrategy = null;
		target.AI.attackTarget = null;
		target.AI.herts = null;
		target.removeAllEventListener();
	}
	self.attackTarget = null;
	self.herts = null;
	chara.removeAllEventListener();
	chara.changeAction(chara.data.isPantTroops()?CharacterAction.PANT:CharacterAction.STAND);
	chara.mode = CharacterMode.END_ACTION;
	var view = LMvc.BattleController.view;
	view.charaLayer.resetCharacterPositions();
	chara.currentSelectStrategy = null;
	chara.toEnd(true);
	chara.inteAI.init();
	chara.moveAttackStep = 0;
	LMvc.running = false;
	if(view.weatherLayer.isWeather(BattleWeatherConfig.CLOUD)){
		cloudWeatherCharacterShow(chara.belong == Belong.SELF ? null : chara.data.id());
	}
	self.endBoutCheck();
};
BattleCharacterAI.prototype.endBoutCheck = function() {
	var chara = BattleController.ctrlChara, self = chara.AI;
	var dieChara = LMvc.BattleController.view.charaLayer.getDieCharacter(chara.belong) || LMvc.BattleController.view.charaLayer.getDieCharacter();
	if(dieChara){
		dieChara.toDie();
		return;
	}
	if(LMvc.BattleController.view.charaLayer.isHasActiveCharacter(chara.belong)){
		if(chara.belong == Belong.SELF){
			LMvc.BattleController.view.mainMenu.visible = true;
		}
		BattleIntelligentAI.execute();
		return;
	}
	if(chara.belong == Belong.SELF){
		var obj = {title:Language.get("confirm"),message:Language.get("bout_end_confirm"),width:300,height:200,okEvent:self.boutEnd,cancelEvent:self.boutEndCancel};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
	}else{
		self.boutEnd();
	}
};
BattleCharacterAI.prototype.boutEndCancel = function(event) {
	event.currentTarget.parent.remove();
	LMvc.BattleController.view.mainMenu.visible = true;
};
BattleCharacterAI.prototype.boutEnd = function(event) {
	if(event){
		event.currentTarget.parent.remove();
	}else if(BattleController.ctrlChara.belong == Belong.SELF){
		var windowLayer = LMvc.layer.getChildByName("ConfirmWindow");
		windowLayer.remove();
	}
	LMvc.BattleController.boutEnd();
};
BattleCharacterAI.prototype.singleCombatStart = function() {
	var self = this;
	//console.log("BattleCharacterAI.prototype.singleCombatStart");
	LMvc.BattleController.loadSingleCombat();
};
BattleCharacterAI.prototype.strategySelect = function(strategyModel) {
	var self = this;
	self.chara.currentSelectStrategy = strategyModel;
	LMvc.BattleController.view.roadLayer.setStrategyRoads(strategyModel.rangeAttack(),self.chara,strategyModel.belong() == Belong.SELF);
	self.chara.mode = CharacterMode.STRATEGY_SELECT;
};

