function BattleIntelligentAI(chara) {
	var self = this;
	self.chara = chara;
	self.init();
	if(!BattleIntelligentAI.timer){
		BattleIntelligentAI.timer = new LTimer(LGlobal.speed, 1);
		BattleIntelligentAI.timer.addEventListener(LTimerEvent.TIMER, BattleIntelligentAI.continueExecute);
	}
}
BattleIntelligentAI.ADD_HP = "addHp";
BattleIntelligentAI.WAKE = "wake";
BattleIntelligentAI.RESTORE_STATE = "restoreState";
BattleIntelligentAI.DOWN_STATUS = "downStatus";
BattleIntelligentAI.HERT = "hert";
BattleIntelligentAI.PHYSICAL_PANT = "physicalPant";
BattleIntelligentAI.PHYSICAL_OTHER = "physicalOther";

BattleIntelligentAI.ownCharacters = null;
BattleIntelligentAI.ownPantCharacters = null;
BattleIntelligentAI.targetCharacters = null;
BattleIntelligentAI.targetPantCharacters = null;
BattleIntelligentAI.strategyList = null;

BattleIntelligentAI.execute = function() {
	var self = this;
	var currentBelong = LMvc.BattleController.getValue("currentBelong");
	if(currentBelong == Belong.SELF){
		return;
	}
	var chatacters = [];
	var charas = [], chara;
	charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(currentBelong);
	/* 行动顺序：位于恢复地形>残血状态>攻击型法师>远程类>近战类>风水士类
	 * 风水士类 +1
	 * 近战类 +2
	 * 远程类 +3
	 * 攻击型法师 +4
	 * 残血状态 x10
	 * 地形 x100
	 */
	var sortValue = 0;
	for(var i = 0;i<charas.length;i++){
		chara = charas[i];
		if(chara.mode == CharacterMode.END_ACTION){
			continue;
		}
		var currentSoldier = chara.data.currentSoldiers();
		var attackType = currentSoldier.attackType();
		var terrainData = LMvc.BattleController.view.mapLayer.getTerrainData(chara.locationX(),chara.locationY());
		var terrainId = getTerrainId(terrainData);
		var terrain = TerrainMasterModel.getMaster(terrainId);
		var currentSort = 1;
		if(HealSoldiers.indexOf(currentSoldier.id())){
			currentSort += 1;
		}else if(attackType == AttackType.NEAR){
			currentSort += 2;
		}else if(attackType == AttackType.FAR){
			currentSort += 3;
		}else if(attackType == AttackType.MAGIC){
			currentSort += 4;
		}
		if(chara.data.isPantTroops()){
			currentSort *= 10;
		}
		if(terrain.heal() > 0){
			currentSort *= 100;
		}
		if(sortValue == currentSort){
			chatacters.push(chara);
		}else if(sortValue < currentSort){
			chatacters = [chara];
			sortValue = currentSort;
		}
	}
	BattleIntelligentAI.ownCharacters = charas;
	if(currentBelong == Belong.FRIEND){
		charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(Belong.SELF);
	}
	charas = BattleIntelligentAI.ownCharacters.concat(charas);
	BattleIntelligentAI.ownCharacters = charas;
	BattleIntelligentAI.ownPantCharacters = [];
	var sortValue = 0;
	for(var i = 0;i<charas.length;i++){
		chara = charas[i];
		if(chara.data.isPantTroops()){
			BattleIntelligentAI.ownPantCharacters.push(chara);
		}
	}
	if(BattleIntelligentAI.ownPantCharacters.length > 1){
		BattleIntelligentAI.ownPantCharacters = BattleIntelligentAI.ownPantCharacters.sort(function(a,b){return Math.fakeRandom() > 0.5 ? 1: -1;}); 
	}
	if(currentBelong == Belong.ENEMY){
		BattleIntelligentAI.targetCharacters = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(Belong.SELF);
		charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(Belong.FRIEND);
		BattleIntelligentAI.targetCharacters = BattleIntelligentAI.targetCharacters.concat(charas);
	}else{
		BattleIntelligentAI.targetCharacters = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(Belong.ENEMY);
	}
	BattleIntelligentAI.targetPantCharacters = [];
	charas = BattleIntelligentAI.targetCharacters;
	for(var i = 0;i<charas.length;i++){
		chara = charas[i];
		if(chara.data.isPantTroops()){
			BattleIntelligentAI.targetPantCharacters.push(chara);
		}
	}
	chara = chatacters[0];
	BattleController.ctrlChara = chara;
	//console.log("ctrlChara",chara.data.name());
	BattleIntelligentAI.strategyList = chara.data.strategies();
	chara.inteAI.locationX = chara.locationX();
	chara.inteAI.locationY = chara.locationY();
	chara.toStatic(false);
	LMvc.BattleController.view.resetMapPosition(chara);
	chara.inteAI.run();
};
BattleIntelligentAI.continueExecute = function(){
	BattleController.ctrlChara.inteAI.run();
};

BattleIntelligentAI.prototype.init = function(){
	var self = this;
	self.strategyFlag = BattleIntelligentAI.ADD_HP;
	self.physicalFlag = BattleIntelligentAI.PHYSICAL_PANT;
	self.target = null;
	self.targetNode = null;
	self.roadList = null;
	BattleIntelligentAI.ownCharacters = null;
	BattleIntelligentAI.ownPantCharacters = null;
	BattleIntelligentAI.targetCharacters = null;
	BattleIntelligentAI.targetPantCharacters = null;
	BattleIntelligentAI.strategyList = null;
};
BattleIntelligentAI.prototype.run = function() {
	var self = BattleController.ctrlChara.inteAI;
	if(self.chara.status.hasStatus(StrategyType.Chaos)){
		self.chara.AI.endAction();
	}else{
		switch(self.chara.mode){
			case CharacterMode.NONE:
				self.moveRoadsShow();
				break;
			case CharacterMode.SHOW_MOVE_ROAD:
				self.findMagicAttackTarget();
				break;
			case CharacterMode.WAIT_SINGLE_COMBAT:
				break;
			case CharacterMode.WAIT_ATTACK:
				self.findPhysicalAttackTarget();
				break;
			case CharacterMode.TO_MOVE:
				self.findMoveTarget();
				break;
			case CharacterMode.END_MOVE:
				self.chara.AI.endAction();
				return;
			case CharacterMode.ATTACK:
				self.physicalAttack();
				return;
			case CharacterMode.MOVING:
				self.moveStart();
				return;
			case CharacterMode.STRATEGY_SELECT:
				self.magicAttack();
				return;
		}
	}
	BattleIntelligentAI.timer.reset();
	BattleIntelligentAI.timer.start();
};
BattleIntelligentAI.prototype.cloudWeatherCharacterShow = function() {
	var self = this;
	var weatherLayer = LMvc.BattleController.view.weatherLayer;
	if(weatherLayer.isWeather(BattleWeatherConfig.CLOUD)){
		cloudWeatherCharacterShow(self.chara.data.id());
	}
};
BattleIntelligentAI.prototype.moveRoadsShow = function() {
	var self = this;
	var view = LMvc.BattleController.view;
	var path = [];
	//定身及原地防守判断
	if(!self.chara.status.hasStatus(StrategyType.Fixed) && self.chara.mission != BattleCharacterMission.Defensive){
		path = LMvc.BattleController.query.makePath(self.chara);
	}else{
		path = [new LPoint(self.locationX, self.locationY)];
	}
	self.roadList = [];
	for(var i = 0,l=path.length;i<l;i++){
		var node = path[i];
		if(node.x != self.locationX || node.y != self.locationY){
			var chara = view.charaLayer.getCharacterFromLocation(node.x,node.y);
			if(chara){
				continue;
			}
		}
		self.roadList.push(node);
	}
	view.roadLayer.setMoveRoads(path, self.chara.belong);
	view.roadLayer.addRangeAttack(self.chara);
	if(self.chara.hideByCloud){
		view.roadLayer.alpha = 0;
	}
	self.chara.mode = CharacterMode.SHOW_MOVE_ROAD;
	
};
BattleIntelligentAI.prototype.findMagicAttackTarget = function() {
	var self = this;
	switch(self.strategyFlag){
		case BattleIntelligentAI.ADD_HP:
			self.useAddHpStrategy();
			break;
		case BattleIntelligentAI.WAKE:
			self.useWakeStrategy();
			break;
		case BattleIntelligentAI.RESTORE_STATE:
			self.useRestoreStateStrategy();
			break;
		case BattleIntelligentAI.DOWN_STATUS:
			self.useDownStatusStrategy();
			break;
		case BattleIntelligentAI.HERT:
			self.useHertStrategy();
			break;
	}
};
BattleIntelligentAI.prototype.getCanUseStrategy = function(target, type, node, checkFun) {
	var self = this, chara = self.chara;
	var lX = target.locationX();
	var lY = target.locationY(); 
	var strategyList = BattleIntelligentAI.strategyList;
	for (var i = 0, l = strategyList.length; i < l; i++) {
		var strategy = strategyList[i];
		if(checkFun && checkFun(strategy)){
			continue;
		}
		if(chara.data.MP() < strategy.cost()){
			continue;
		}
		if(strategy.effectType() != type){
			continue;
		}
		if(strategy.belong() == Belong.SELF){
			if(!isSameBelong(chara.belong, target.belong)){
				continue;
			}
		}else{
			if(isSameBelong(chara.belong, target.belong)){
				continue;
			}
		}
		//地形判断
		if(!LMvc.BattleController.view.mapLayer.canUseStrategyOnTerrain(strategy, lX, lY)){
			continue;
		}
		var weathers = strategy.weathers();
		if(weathers && weathers.length > 0 && weathers.indexOf(LMvc.BattleController.view.weatherLayer.currentWeather.weather) < 0){
			continue;
		}
		if(type == StrategyEffectType.Status){
			//兵种限制
			if(strategy.strategyType() == StrategyType.BanIncantation && (target.data.currentSoldiers().soldierType() == SoldierType.Physical || target.status.hasStatus(StrategyType.BanIncantation))){
				continue;
			}
		}
		var rangeAttack = strategy.rangeAttack();
		for(var j=0,jl=rangeAttack.length;j<jl;j++){
			var child = rangeAttack[j];
			if(child.x + node.x == lX && child.y + node.y == lY){
				//TODO::获取最大优先级的策略
				return strategy;
			}
		}
	}
	return null;
};
BattleIntelligentAI.prototype.getNestLocation = function(fromLocations, x, y) {
	var length = 10000;
	for(var i=0;i<fromLocations.length;i++){
		var location = fromLocations[i];
		var l = Math.abs(x - location[0]) + Math.abs(y - location[1]);
		if(length > l){
			length = l;
		}
	}
	return length;
};
BattleIntelligentAI.prototype.getNestNode = function(target, rangeAttack) {
	var self = this, chara = self.chara;
	var roadList = self.roadList;
	var node, length = 10000, sLength;
	var lX = target.locationX();
	var lY = target.locationY();
	//targetLength
	if(typeof rangeAttack == UNDEFINED){
		rangeAttack = [{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}];
	}
	var sortFunc = function(a, b){
		var aIndex = rangeAttack.findIndex(function(p){return p.x + a.x == lX && p.y + a.y == lY;});
		var bIndex = rangeAttack.findIndex(function(p){return p.x + b.x == lX && p.y + b.y == lY;});
		if(aIndex >= 0 && bIndex < 0){
			return -1;
		}else if(aIndex < 0 && bIndex >= 0){
			return 1;
		}
		var al = Math.abs(a.x - lX) + Math.abs(a.y - lY);
		var bl = Math.abs(b.x - lX) + Math.abs(b.y - lY);
		if(aIndex >= 0 && bIndex >= 0){
			return bl - al;
		}else{
			return al - bl;
		}
	};
	self.roadList.sort(sortFunc);
	return self.roadList[0];
	for (var i = 0, l = roadList.length; i < l; i++) {
		var child = roadList[i];
		var cLength = Math.abs(child.x - lX) + Math.abs(child.y - lY);
		if(cLength > length){
			continue;
		}else if(cLength == length){
			var l2 = Math.abs(child.x - self.locationX) + Math.abs(child.y - self.locationY);
			if(l2 >= sLength){
				continue;
			}else{
				sLength = l2;
			}
		}
		length = cLength;
		if(!sLength){
			sLength = Math.abs(child.x - self.locationX) + Math.abs(child.y - self.locationY);
		}
		node = child;
	}
	return node;
};
BattleIntelligentAI.prototype.getStrategyNodeTarget = function(strategy, target) {
	var self = this, chara = self.chara;
	var roadList = self.roadList;
	var range, rangeAttack = strategy.rangeAttack(), jl = rangeAttack.length;
	var node, length = 10000, sLength;
	var lX = target.locationX();
	var lY = target.locationY();
	for (var i = 0, l = roadList.length; i < l; i++) {
		var child = roadList[i];
		var can = false;
		for(var j=0;j<jl;j++){
			range = rangeAttack[j];
			if(child.x + range.x == lX && child.y + range.y == lY){
				can = true;
				break;
			}
		}
		if(!can){
			continue;
		}
		var cLength = Math.abs(child.x - self.locationX) + Math.abs(child.y - self.locationY);
		if(cLength > length){
			continue;
		}else if(cLength == length){
			var l2 = Math.abs(child.x - lX) + Math.abs(child.y - lY);
			if(l2 <= sLength){
				continue;
			}else{
				sLength = l2;
			}
		}
		length = cLength;
		if(!sLength){
			sLength = Math.abs(child.x - lX) + Math.abs(child.y - lY);
		}
		node = child;
	}
	return node;
};
BattleIntelligentAI.prototype.magicAttack = function() {
	this.chara.AI.magicAttack(this.target);
};
BattleIntelligentAI.prototype.askSingleCombat = function() {
	var self = BattleController.ctrlChara.inteAI;
	var targetModel = self.target.data;
	var message = String.format( Language.get("ask_single_combat_confirm"), self.chara.data.name(), self.chara.data.force(), self.chara.data.HP(), targetModel.name(), targetModel.force(), targetModel.HP());
	var obj = {title:Language.get("confirm"), message:message, width:360, height:330, okEvent:self.singleCombatSuccess, cancelEvent:self.singleCombatFail};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
BattleIntelligentAI.prototype.singleCombatSuccess = function(event) {
	event.currentTarget.parent.remove();
	var self = BattleController.ctrlChara.inteAI;
	self.chara.AI.singleCombat(self.target);
	var targetModel = self.target.data;
	script = "SGJTalk.show(" + targetModel.id() + ",0," + Language.get("single_combat_answer_ok") + ");" + 
		"SGJBattleCharacter.singleCombatStart(" + self.chara.belong + "," + self.chara.data.id() + ");";
	LGlobal.script.addScript(script);
};
BattleIntelligentAI.prototype.singleCombatFail = function(event) {
	event.currentTarget.parent.remove();
	var self = BattleController.ctrlChara.inteAI;
	var script = "SGJTalk.show(" + self.target.data.id() + ",0," + Language.get("single_combat_answer_no") + ");" + 
		"SGJBattleCharacter.endAction(" + self.chara.belong + "," + self.chara.data.id() + ");";
	LGlobal.script.addScript(script);
};
BattleIntelligentAI.prototype.physicalAttack = function() {
	var self = this;
	if(calculateAskSingleCombat(self.chara, self.target)){
		var script = "SGJTalk.show(" + self.chara.data.id() + ",0," + String.format(Language.get("single_combat_ask"), self.target.data.name()) + ");";
		script += "SGJBattleCharacter.askSingleCombat();";
		LGlobal.script.addScript(script);
	}else{
		self.chara.AI.physicalAttack(self.target);
	}
};
BattleIntelligentAI.prototype.useAddHpStrategy = function() {
	var self = this, chara = self.chara, strategy, strategys = [], node;
	for(var i = 0,l = BattleIntelligentAI.ownPantCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.ownPantCharacters[i];
		node = self.getNestNode(child);
		strategy = self.getCanUseStrategy(child,StrategyEffectType.Supply,node);
		if(strategy){
			strategys.push({target:child,strategy:strategy});
		}
	}
	if(strategys.length == 0){
		var f = function(s){
			return s.wounded() == 0;
		};
		for(var i = 0,l = BattleIntelligentAI.ownCharacters.length;i<l;i++){
			var child = BattleIntelligentAI.ownCharacters[i];
			if(child.data.wounded() < 20){
				continue;
			}
			node = self.getNestNode(child);
			strategy = self.getCanUseStrategy(child,StrategyEffectType.Supply,node,f);
			if(strategy){
				strategys.push({target:child,strategy:strategy});
			}
		}
		if(strategys.length == 0){
			self.strategyFlag = BattleIntelligentAI.WAKE;
			return;
		}
	}
	//TODO::ver1.1判断可以使用策略的优先级
	var obj = strategys[(strategys.length * Math.fakeRandom()) >>> 0];
	strategy = obj.strategy;
	var target = obj.target;
	node = self.getStrategyNodeTarget(strategy, target);
	self.chara.currentSelectStrategy = strategy;
	self.target = target;
	self.targetNode = node;
	self.chara.mode = CharacterMode.MOVING;
};
BattleIntelligentAI.prototype.moveStart = function() {
	var self = this, chara = self.chara;
	var returnList = self.targetNode ? LMvc.BattleController.query.queryPath(new LPoint(self.locationX, self.locationY),new LPoint(self.targetNode.x,self.targetNode.y)) : [];
	var length = returnList.length;
	LMvc.BattleController.view.roadLayer.clear();
	if(length > 0){
		self.chara.addEventListener(CharacterActionEvent.MOVE_COMPLETE,self.run);
		self.chara.setRoad(returnList);//move
	}
	if(!self.target){
		self.chara.mode = CharacterMode.END_MOVE;
		if(length == 0){
			self.run();
		}
		return;
	}
	if(self.chara.currentSelectStrategy){
		self.chara.mode = CharacterMode.STRATEGY_SELECT;
	}else{
		self.chara.mode = CharacterMode.ATTACK;
	}
	self.cloudWeatherCharacterShow();
	if(length == 0){
		self.run();
	}
};
BattleIntelligentAI.prototype.useWakeStrategy = function() {
	var self = this, chara = self.chara, strategy, strategys = [], node;
	for(var i = 0,l = BattleIntelligentAI.ownCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.ownCharacters[i];
		if(!child.status.needWake()){
			continue;
		}
		node = self.getNestNode(child);
		strategy = self.getCanUseStrategy(child,StrategyEffectType.Wake,node);
		if(strategy){
			strategys.push({target:child,strategy:strategy});
		}
	}
	if(strategys.length == 0){
		self.strategyFlag = BattleIntelligentAI.RESTORE_STATE;
		return;
	}
	//TODO::ver1.1判断可以使用策略的优先级
	var obj = strategys[(strategys.length * Math.fakeRandom()) >>> 0];
	strategy = obj.strategy;
	var target = obj.target;
	node = self.getStrategyNodeTarget(strategy, target);
	self.chara.currentSelectStrategy = strategy;
	self.target = target;
	self.targetNode = node;
	self.chara.mode = CharacterMode.MOVING;
};
BattleIntelligentAI.prototype.useRestoreStateStrategy = function() {
	this.useAidStrategy(BattleIntelligentAI.ownCharacters, StrategyEffectType.Aid, BattleIntelligentAI.DOWN_STATUS);
};
BattleIntelligentAI.prototype.useDownStatusStrategy = function() {
	this.useAidStrategy(BattleIntelligentAI.targetCharacters, StrategyEffectType.Aid, BattleIntelligentAI.HERT);
};
BattleIntelligentAI.prototype.useAidStrategy = function(charas, strategyEffectType, strategyFlag) {
	var self = this, chara = self.chara;
	if((chara.data.currentSoldiers().soldierType() == SoldierType.Physical) || (chara.data.currentSoldiers().soldierType() == SoldierType.Comprehensive && Math.fakeRandom() < 0.5) || Math.fakeRandom() < 0.8){
		self.strategyFlag = strategyFlag;
		return;
	}
	var strategy, strategys = [], node;
	for(var i = 0,l = charas.length;i<l;i++){
		var child = charas[i];
		node = self.getNestNode(child);
		strategy = self.getCanUseStrategy(child,strategyEffectType,node);
		if(strategy){
			strategys.push({target:child,strategy:strategy});
		}
	}
	if(strategys.length == 0){
		self.strategyFlag = strategyFlag;
		return;
	}
	//TODO::ver1.1判断可以使用策略的优先级
	var obj = strategys[(strategys.length * Math.fakeRandom()) >>> 0];
	strategy = obj.strategy;
	var target = obj.target;
	node = self.getStrategyNodeTarget(strategy, target);
	self.chara.currentSelectStrategy = strategy;
	self.target = target;
	self.targetNode = node;
	self.chara.mode = CharacterMode.MOVING;
};
BattleIntelligentAI.prototype.useHertStrategy = function() {
	var self = this, chara = self.chara;
	if((chara.data.currentSoldiers().soldierType() == SoldierType.Physical) || (chara.data.currentSoldiers().soldierType() == SoldierType.Comprehensive && Math.fakeRandom() < 0.5)){
		chara.mode = CharacterMode.WAIT_ATTACK;
		return;
	}
	var strategy, strategys = [], node;
	for(var i = 0,l = BattleIntelligentAI.targetCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.targetCharacters[i];
		node = self.getNestNode(child);
		strategy = self.getCanUseStrategy(child,StrategyEffectType.Status,node);
		if(strategy){
			strategys.push({target:child,strategy:strategy});
			//continue;
		}
		strategy = self.getCanUseStrategy(child,StrategyEffectType.Attack,node);
		if(strategy){
			strategys.push({target:child,strategy:strategy});
			//continue;
		}
	}
	if(strategys.length == 0){
		chara.mode = CharacterMode.WAIT_ATTACK;
		return;
	}
	//TODO::ver1.1判断可以使用策略的优先级
	var obj = strategys[(strategys.length * Math.fakeRandom()) >>> 0];
	strategy = obj.strategy;
	var target = obj.target;
	node = self.getStrategyNodeTarget(strategy, target);
	self.chara.currentSelectStrategy = strategy;
	self.target = target;
	self.targetNode = node;
	self.chara.mode = CharacterMode.MOVING;
};
BattleIntelligentAI.prototype.findPhysicalAttackTarget = function() {
	var self = this, chara = self.chara;
	var rangeAttack = chara.data.currentSoldiers().rangeAttack();
	rangeAttack = rangeAttack.sort(function(a, b){
		return Math.abs(b.x) + Math.abs(b.y) - Math.abs(a.x) - Math.abs(a.y);
	});
	var targetLength = Math.abs(rangeAttack[0].x) + Math.abs(rangeAttack[0].y) - 1;
	switch(self.physicalFlag){
		case BattleIntelligentAI.PHYSICAL_PANT:
			self.findPhysicalPant(targetLength);
			break;
		case BattleIntelligentAI.PHYSICAL_OTHER:
			self.findPhysicalOther(targetLength);
			break;
	}
};
BattleIntelligentAI.prototype.findPhysicalPant = function(targetLength) {
	var self = this, chara = self.chara,node,targets = [];
	for(var i = 0,l = BattleIntelligentAI.targetPantCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.targetPantCharacters[i];
		node = self.getNestNode(child, chara.data.currentSoldiers().rangeAttack());
		var can = self.canAttackTarget(child,node);
		if(can){
			targets.push(child);
		}
	}
	if(targets.length == 0){
		self.physicalFlag = BattleIntelligentAI.PHYSICAL_OTHER;
		return;
	}
	var target = targets[(targets.length * Math.fakeRandom()) >>> 0];
	node = self.getPhysicalNodeTarget(target);
	self.target = target;
	self.targetNode = node;
	self.chara.mode = CharacterMode.MOVING;
};
BattleIntelligentAI.prototype.findPhysicalOther = function(targetLength) {
	var self = this, chara = self.chara,node,targets = [];
	var fromLocations = [[self.locationX, self.locationY]];
	if(chara.data.currentSoldiers().attackType() == AttackType.FAR){
		
	}
	for(var i = 0,l = BattleIntelligentAI.targetCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.targetCharacters[i];
		if(child.data.isPantTroops()){
			continue;
		}
		node = self.getNestNode(child, chara.data.currentSoldiers().rangeAttack());
		var can = self.canAttackTarget(child,node);
		if(can){
			targets.push(child);
		}
	}
	if(targets.length == 0){
		self.chara.mode = CharacterMode.TO_MOVE;
		return;
	}
	var target = targets[(targets.length * Math.fakeRandom()) >>> 0];
	node = self.getPhysicalNodeTarget(target);
	self.target = target;
	self.targetNode = node;
	self.chara.mode = CharacterMode.MOVING;
};
BattleIntelligentAI.prototype.canAttackTarget = function(target, node) {
	var self = this, chara = self.chara;
	var lX = target.locationX();
	var lY = target.locationY(); 
	var rangeAttack = chara.data.currentSoldiers().rangeAttack();
	for (var i = 0, l = rangeAttack.length; i < l; i++) {
		var child = rangeAttack[i];
		if(child.x + node.x == lX && child.y + node.y == lY){
			return true;
		}
	}
	return false;
};
BattleIntelligentAI.prototype.getPhysicalNodeTarget = function(target) {
	var self = this, chara = self.chara;
	var roadList = self.roadList;
	var range, rangeAttack = chara.data.currentSoldiers().rangeAttack(), jl = rangeAttack.length;
	var node, length = 10000, sLength;
	var lX = target.locationX();
	var lY = target.locationY();
	for (var i = 0, l = roadList.length; i < l; i++) {
		var child = roadList[i];
		var can = false;
		for(var j=0;j<jl;j++){
			range = rangeAttack[j];
			if(child.x + range.x == lX && child.y + range.y == lY){
				can = true;
				break;
			}
		}
		if(!can){
			continue;
		}
		var cLength = Math.abs(child.x - self.locationX) + Math.abs(child.y - self.locationY);
		if(cLength > length){
			continue;
		}else if(cLength == length){
			var l2 = Math.abs(child.x - lX) + Math.abs(child.y - lY);
			if(l2 <= sLength){
				continue;
			}else{
				sLength = l2;
			}
		}
		length = cLength;
		if(!sLength){
			sLength = Math.abs(child.x - lX) + Math.abs(child.y - lY);
		}
		node = child;
	}
	return node;
};
BattleIntelligentAI.prototype.findMoveTarget = function() {
	var self = this, chara = self.chara;
	if(chara.mission != BattleCharacterMission.Initiative){
		chara.mode = CharacterMode.END_MOVE;
		return;
	}
	//没有可以攻击到的人，向最近目标移动
	var distance = 100000, lX, lY, targetX = self.locationX, targetY = self.locationY, targetRoads;
	for(var i = 0,l = BattleIntelligentAI.targetCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.targetCharacters[i];
		if(child.data.isDefCharacter()){
			continue;//绕过防御设施
		}
		lX = child.locationX(), lY = child.locationY();
		LMvc.BattleController.query.checkDistance = true;
		LMvc.BattleController.query.checkCharacter = true;
		var roads;
		var ii = 0;
		var noRoad;
		do{
			ii++;
			roads = LMvc.BattleController.query.queryPath(new LPoint(self.locationX, self.locationY),new LPoint(lX,lY));
			noRoad = (!roads || roads.length == 0);
			var absX = Math.abs(self.locationX - lX);
			var absY = Math.abs(self.locationY - lY);
			if(absX > absY){
				lX += (self.locationX > lX ? 1 : -1);
			}else if(absX < absY){
				lY += (self.locationY > lY ? 1 : -1);
			}else if(noRoad){
				roads = [new LPoint(self.locationX, self.locationY)];
				break;
			}
		}while(noRoad && ii < 4);
		LMvc.BattleController.query.checkDistance = false;
		LMvc.BattleController.query.checkCharacter = false;
		var currentDistance = roads.length;
		if(!noRoad && currentDistance > 0 && currentDistance < distance){
			distance = currentDistance;
			targetRoads = roads;
		}
	}
	for(var i = 0,l=targetRoads.length;i<l;i++){
		var node = targetRoads[i];
		if(!LMvc.BattleController.view.roadLayer.roadList.find(function(child){
			return child.x == node.x && child.y == node.y;
		})){
			break;
		}
		if(self.roadList.find(function(child){
			return child.x == node.x && child.y == node.y;
		})){
			targetX = node.x;
			targetY = node.y;
		}
	}
	if(targetX == self.locationX && targetY == self.locationY){
		self.targetNode = null;
	}else{
		self.targetNode = new LPoint(targetX, targetY);
	}
	self.chara.mode = CharacterMode.MOVING;
};

