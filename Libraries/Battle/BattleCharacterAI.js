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
	console.log("magicAttack",self.chara.data.name(),target.data.name());
	LMvc.running = true;
	self.attackTarget = target;
	LMvc.currentAttackCharacter = self.chara;
	LMvc.currentAttackTarget = target;
	//console.log("target.AI.attackTarget" ,target.AI.attackTarget);
	var direction = getDirectionFromTarget(self.chara, target);
	self.chara.setActionDirection(CharacterAction.MAGIC_ATTACK, direction);
	var currentSelectStrategy = self.chara.currentSelectStrategy;
	var rangeAttackTarget = currentSelectStrategy.rangeAttackTarget();
	var charas = [];
	for(var i = 0;i<rangeAttackTarget.length;i++){
		var range = rangeAttackTarget[i];
		var chara = LMvc.BattleController.view.charaLayer.getCharacterFromLocation(target.locationX()+range.x, target.locationY()+range.y);
		if(!chara || (currentSelectStrategy.belong() == Belong.ENEMY && isSameBelong(chara.belong,self.chara.belong)) 
			|| (currentSelectStrategy.belong() == Belong.SELF && !isSameBelong(chara.belong,self.chara.belong))){
			continue;
		}
		charas.push(chara);
	}
	for(var i = 0,l=charas.length;i<l;i++){
		var chara = charas[i];
		chara.hertIndex = l - i;
		var effectView = new EffectStrategyView(null, self.chara, chara);
		effectView.x = chara.x;
		effectView.y = chara.y;
		LMvc.BattleController.view.effectLayer.addChild(effectView);
	}
};
BattleCharacterAI.prototype.physicalAttack = function(target) {
	var self = this;
	LMvc.running = true;
	LMvc.currentAttackCharacter = self.chara;
	LMvc.currentAttackTarget = target;
	self.attackTarget = target;
	//target.AI.attackTarget = self.chara;
	var direction = getDirectionFromTarget(self.chara, target);
	var skill;
	if(self.herts === null){
		if(self.chara.data.id() == BattleController.ctrlChara.data.id()){
			self.herts = [];
			var hertValue = calculateHertValue(self.chara, target, 1);
			var hertValues = [];
			skill = self.chara.data.skill(SkillType.ATTACK);
			
			if(skill && skill.isSubType(SkillSubType.ATTACK_COUNT)){
				hertValues = skill.attacks();
			}else{
				var doubleAtt = calculateDoubleAtt(self.chara, target);
				hertValues = doubleAtt ? [1,1] : [1];
			}
			for(var j=0;j<hertValues.length;j++){
				var hertParams = new HertParams();
				var value = hertValue*hertValues[j]>>>0;
				hertParams.push(target, value > 1 ? value : 1);
				var rangeAttackTarget;
				if(skill && skill.isSubType(SkillSubType.ATTACK_RECT)){
					rangeAttackTarget = skill.rects();
				}else{
					rangeAttackTarget = self.chara.data.currentSoldiers().rangeAttackTarget();
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
					hertParamObj.aids = Array.getRandomArrays(aids,aidCount);
				}
			}
			var groupSkill = battleCanGroupSkill(self.chara, target);
			if(groupSkill){
				self.chara.groupSkill = groupSkill;
				self.herts[0].value = self.herts[0].value * groupSkill.correctionFactor() >>> 0;
			}
		}else{
			var hertValue = calculateHertValue(self.chara, target, 0.75);
			var hertParams = new HertParams();
			hertParams.push(target,hertValue);
			self.herts = [hertParams];
		}	
	}
	if(!self.chara.groupSkill && calculateFatalAtt(self.chara, target)){
		self.chara.isAngry = true;
		self.herts[0].value = self.herts[0].value * 1.25 >>> 0;
	}
	self.chara.changeDirection(direction);
	if(skill){
		var specialEffect = new SpecialEffectView();
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
	target.toStatic(false);
	target.changeDirection(directionTarget);
	target.toStatic(true);
	self.chara.changeDirection(direction);
	battleSingleCombatCheck(self.chara);
};
BattleCharacterAI.prototype.attackActionComplete = function(event) {
	var chara = event.currentTarget,selfSkill,skill;
	var self = chara.AI;
	chara.removeEventListener(BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE,self.attackActionComplete);
	chara.changeAction(chara.data.isPantTroops()?CharacterAction.PANT:(chara.data.id() == BattleController.ctrlChara.data.id() ? CharacterAction.STAND : CharacterAction.MOVE));
	selfSkill = chara.data.skill(SkillType.ATTACK_END);
	if(selfSkill && selfSkill.isSubType(SkillSubType.SELF_AID)){
		var tweenObj = getStrokeLabel(selfSkill.name(),22,"#FFFFFF","#000000",2); 
		tweenObj.x = chara.x + (BattleCharacterSize.width - tweenObj.getWidth()) * 0.5;
			tweenObj.y = chara.y + tweenObj.getHeight();
			chara.controller.view.baseLayer.addChild(tweenObj);
			LTweenLite.to(tweenObj,0.5,{y:tweenObj.y - 20,alpha:0,onComplete:function(e){
				e.target.remove();
			}});
			
			var aids = Array.getRandomArrays(selfSkill.aids(),selfSkill.aidCount());
			for(var j = 0;j<aids.length;j++){
				var strategy = StrategyMasterModel.getMaster(aids[j]);
				chara.status.addStatus(strategy.strategyType(), strategy.hert());
			}
			
	}
	var hertParams = self.herts[0];
	self.herts.shift();
	var mapLayer = LMvc.BattleController.view.mapLayer;
	for(var i = 0,l = hertParams.list.length;i<l;i++){
		var obj = hertParams.list[i];
		obj.chara.toStatic(false);
		obj.chara.hertIndex = l - i;
		var hitrate = calculateHitrate(chara,obj.chara);
		if(hitrate){
			skill = obj.chara.data.skill(SkillType.HERT);
			if(skill && skill.isSubType(SkillSubType.HERT_MINUS)){
				var tweenObj = getStrokeLabel(skill.name(),22,"#FFFFFF","#000000",2);
				tweenObj.x = obj.chara.x + (BattleCharacterSize.width - tweenObj.getWidth()) * 0.5;
				tweenObj.y = obj.chara.y;// - tweenObj.getHeight();
				chara.controller.view.baseLayer.addChild(tweenObj);
				LTweenLite.to(tweenObj,0.5,{y:tweenObj.y - 20,alpha:0,onComplete:function(obj){
					obj.remove();
				}});
				obj.hertValue *= skill.hert();
			}
			if(i == 0 && selfSkill && selfSkill.isSubType(SkillSubType.VAMPIRE)){
				var changeHp = obj.hertValue * selfSkill.vampire();
				var tweenObj = getStrokeLabel(String.format("{0} 兵力+{1}",selfSkill.name(),changeHp),12,"#FF0000","#000000",2);
				tweenObj.x = chara.x + (BattleCharacterSize.width - tweenObj.getWidth()) * 0.5;
				tweenObj.y = chara.y;
				chara.controller.view.baseLayer.addChild(tweenObj);
				LTweenLite.to(tweenObj,1.5,{y:tweenObj.y - 20,alpha:0,onComplete:function(e){
					e.target.remove();
				}});
				
			}
			var num = new Num(Num.MIDDLE,1,20);
			obj.chara.hertValue = obj.hertValue;
			num.setValue(obj.hertValue);
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
			obj.chara.changeAction(CharacterAction.HERT);
			obj.chara.addEventListener(BattleCharacterActionEvent.HERT_ACTION_COMPLETE,obj.chara.AI.hertActionComplete);
		}else{
			obj.chara.changeAction(CharacterAction.BLOCK);
			obj.chara.addEventListener(BattleCharacterActionEvent.BLOCK_ACTION_COMPLETE,obj.chara.AI.blockActionComplete);
		}
	}
};
BattleCharacterAI.prototype.blockActionComplete = function(event) {
	var chara = event.currentTarget;
	var self = chara.AI;
	var stepTime = BattleCharacterStatusConfig.FADE_TIME + BattleCharacterStatusConfig.SHOW_TIME;
	chara.removeEventListener(BattleCharacterActionEvent.BLOCK_ACTION_COMPLETE,self.hertActionComplete);
	chara.changeAction(chara.data.isPantTroops()?CharacterAction.PANT:CharacterAction.STAND);
	LTweenLite.to(chara,chara.hertIndex * stepTime,{onComplete:function(e){
		var chara = e.target;
		var statusView = new BattleCharacterStatusView(self.controller,chara);
		statusView.push(BattleCharacterStatusConfig.EXP_ARMOR, 20);
		chara.controller.view.baseLayer.addChild(statusView);
		statusView.startTween();
		//if(!chara.AI.attackTarget){
		if(!isCurrentAttackTarget(chara)){
			return;
		}
		statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,LMvc.currentAttackCharacter.AI.plusExp);
	}});
};
BattleCharacterAI.prototype.hertActionComplete = function(event) {
	var chara = event.currentTarget;
	var self = chara.AI;
	var stepTime = BattleCharacterStatusConfig.FADE_TIME + BattleCharacterStatusConfig.SHOW_TIME;
	chara.removeEventListener(BattleCharacterActionEvent.HERT_ACTION_COMPLETE,self.hertActionComplete);
	chara.changeAction(chara.data.isPantTroops()?CharacterAction.PANT:CharacterAction.STAND);
	LTweenLite.to(chara,chara.hertIndex * stepTime,{onComplete:function(e){
		var chara = e.target;
		var statusView = new BattleCharacterStatusView(self.controller,chara);
		statusView.push(BattleCharacterStatusConfig.HP, -chara.hertValue);
		chara.controller.view.baseLayer.addChild(statusView);
		statusView.startTween();
		//if(!chara.AI.attackTarget){
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
	/*
	if(typeof event == UNDEFINED){
		self = this;
		chara = self.chara;
	}else{
		chara = event.currentTarget.character;
		self = chara.AI;
	}
	var attackTarget = chara.AI.attackTarget;*/
	var statusView = new BattleCharacterStatusView(chara.controller,chara);
	statusView.push(BattleCharacterStatusConfig.EXP, 30);
	statusView.push(BattleCharacterStatusConfig.EXP_WEAPON, 20);
	statusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,chara.currentSelectStrategy ? self.counterMagicAttack : self.counterAttack);
	chara.controller.view.baseLayer.addChild(statusView);
	statusView.startTween();
};
BattleCharacterAI.prototype.counterAttack = function(event) {
	var attackChatacter = event.currentTarget.character;
	console.error("counterAttack" ,attackChatacter.data.name());
	if(!isCurrentAttackCharacter(attackChatacter) && !isCurrentAttackTarget(attackChatacter)){
		return;
	}
	if(attackChatacter.AI.herts && attackChatacter.AI.herts.length > 0){
		attackChatacter.AI.physicalAttack(isCurrentAttackCharacter(attackChatacter) ? LMvc.currentAttackTarget : LMvc.currentAttackCharacter);
		return;
	}
	
	//var self = chara.AI;
	if(attackChatacter.data.id() == BattleController.ctrlChara.data.id()){
		var chara = LMvc.currentAttackTarget;
		if(battleCanAttackCharacter(chara, attackChatacter)){
			chara.AI.physicalAttack(attackChatacter);
			return;
		}
		//self = attackChatacter.AI;
	}
	/*if(self.herts.length > 0){
		self.physicalAttack(self.attackTarget);
		return;
	}
	self.herts = null;*/
	BattleController.ctrlChara.AI.endAction();
	
};
BattleCharacterAI.prototype.counterMagicAttack = function(event) {
	var attackChatacter = event.currentTarget.character;
	console.error("counterMagicAttack" ,attackChatacter.data.name());
	
	BattleController.ctrlChara.AI.endAction();
};
BattleCharacterAI.prototype.endAction = function() {
	var self = this, chara = self.chara, target = chara.AI.attackTarget;
	console.error("endAction",chara.data.name());
	if(target){
		target.currentSelectStrategy = null;
		target.AI.attackTarget = null;
		target.AI.herts = null;
		target.removeAllEventListener();
		target.toStatic(true);
	}
	self.attackTarget = null;
	self.herts = null;
	chara.removeAllEventListener();
	chara.changeAction(chara.data.isPantTroops()?CharacterAction.PANT:CharacterAction.STAND);
	chara.mode = CharacterMode.END_ACTION;
	chara.currentSelectStrategy = null;
	chara.toStatic(true);
	LMvc.running = false;
	console.log("check",LMvc.BattleController.view.charaLayer.isHasActiveCharacter(chara.belong));
	//TODO::check change battle belong mode
	if(!LMvc.BattleController.view.charaLayer.isHasActiveCharacter(chara.belong)){
		if(chara.belong == Belong.SELF){
			var obj = {title:Language.get("确认"),message:Language.get("结束本回合吗？"),width:300,height:200,okEvent:self.boutEnd,cancelEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
		}else{
			self.boutEnd();
		}
	}else{
		BattleIntelligentAI.execute();
	}
};
BattleCharacterAI.prototype.boutEnd = function(event) {
	event.currentTarget.parent.remove();
	LMvc.BattleController.boutEnd();
};
BattleCharacterAI.prototype.singleCombatStart = function() {
	var self = this;
	console.log("BattleCharacterAI.prototype.singleCombatStart");
	LMvc.BattleController.loadSingleCombat();
};
BattleCharacterAI.prototype.strategySelect = function(strategyModel) {
	var self = this;
	LMvc.BattleController.view.roadLayer.setStrategyRoads(strategyModel.rangeAttack(),self.chara,strategyModel.belong() == Belong.SELF);
	self.chara.currentSelectStrategy = strategyModel;
	self.chara.mode = CharacterMode.STRATEGY_SELECT;
};

