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
	var sortValue = 0;
	for(var i = 0;i<charas.length;i++){
		chara = charas[i];
		if(chara.mode == CharacterMode.END_ACTION){
			continue;
		}
		var terrainData = LMvc.BattleController.view.mapLayer.getTerrainData(chara.locationX(),chara.locationY());
		var terrainId = getTerrainId(terrainData);
		var terrain = TerrainMasterModel.getMaster(terrainId);
		if(sortValue == terrain.sortValue()){
			chatacters.push(chara);
		}else if(sortValue < terrain.sortValue()){
			chatacters = [chara];
			sortValue = terrain.sortValue();
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
		BattleIntelligentAI.ownPantCharacters = BattleIntelligentAI.ownPantCharacters.sort(function(a,b){return Math.random() > 0.5 ? 1: -1;}); 
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
	console.log("ctrlChara",chara.data.name());
	BattleIntelligentAI.strategyList = chara.data.strategies();
	chara.inteAI.locationX = chara.locationX();
	chara.inteAI.locationY = chara.locationY();
	chara.toStatic(false);
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
	BattleIntelligentAI.timer.reset();
	BattleIntelligentAI.timer.start();
};
BattleIntelligentAI.prototype.moveRoadsShow = function() {
	var self = this;
	var view = LMvc.BattleController.view;
	var path = [];
	if(!self.chara.status.hasStatus(StrategyType.Fixed)){
		path = LMvc.BattleController.query.makePath(self.chara);
	}
	self.roadList = [];
	for(var i = 0,l=path.length;i<l;i++){
		var node = path[i];
		var chara = view.charaLayer.getCharacterFromLocation(node.x,node.y);
		if(chara){
			continue;
		}
		self.roadList.push(node);
	}
	view.roadLayer.setMoveRoads(path, self.chara.belong);
	view.roadLayer.addRangeAttack(self.chara);
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
BattleIntelligentAI.prototype.getCanUseStrategy = function(target,type, node) {
	var self = this, chara = self.chara;
	var lX = target.locationX();
	var lY = target.locationY(); 
	var strategyList = BattleIntelligentAI.strategyList;
	for (var i = 0, l = strategyList.length; i < l; i++) {
		var strategy = strategyList[i];
		console.log("strategy="+strategy.name()+" : "+strategy.effectType()+"!="+type);
		if(strategy.effectType() != type || strategy.belong() != target.belong){
			continue;
		}
		//TODO::地形判断
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
BattleIntelligentAI.prototype.getNestNode = function(target) {
	var self = this, chara = self.chara;
	var roadList = self.roadList;
	var node, length = 10000, sLength;
	var lX = target.locationX();
	var lY = target.locationY();
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
	console.log("getStrategyNodeTarget",strategy,target);
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
BattleIntelligentAI.prototype.physicalAttack = function() {
	this.chara.AI.physicalAttack(this.target);
};
BattleIntelligentAI.prototype.useAddHpStrategy = function() {
	var self = this, chara = self.chara, strategy, strategys = [], node;
	for(var i = 0,l = BattleIntelligentAI.ownPantCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.ownPantCharacters[i];
		node = self.getNestNode(child);
		console.log(child.data.name() + " : node",node);
		strategy = self.getCanUseStrategy(child,StrategyEffectType.Supply,node);
		console.log("find strategy",strategy);
		if(strategy){
			strategys.push({target:child,strategy:strategy});
		}
	}
	if(strategys.length == 0){
		self.strategyFlag = BattleIntelligentAI.WAKE;
		return;
	}
	//TODO::判断可以使用策略的优先级
	var obj = strategys[(strategys.length * Math.random()) >>> 0];
	strategy = obj.strategy;
	var target = obj.target;
	node = self.getStrategyNodeTarget(strategy, target);
	console.log("To : node="+node);
	self.chara.currentSelectStrategy = strategy;
	self.target = target;
	self.targetNode = node;
	self.chara.mode = CharacterMode.MOVING;
};
BattleIntelligentAI.prototype.moveStart = function() {
	var self = this, chara = self.chara;
	console.log("moveStart");
	var returnList = LMvc.BattleController.query.queryPath(new LPoint(self.locationX, self.locationY),new LPoint(self.targetNode.x,self.targetNode.y));
	console.log("returnList=",returnList);
	if(returnList.length > 0){
		LMvc.BattleController.view.roadLayer.clear();
		self.chara.addEventListener(CharacterActionEvent.MOVE_COMPLETE,self.run);
		self.chara.setRoad(returnList);//move
	}
	if(!self.target){
		self.chara.mode = CharacterMode.END_MOVE;
		return;
	}
	if(self.chara.currentSelectStrategy){
		self.chara.mode = CharacterMode.STRATEGY_SELECT;
	}else{
		self.chara.mode = CharacterMode.ATTACK;
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
		console.log(child.data.name() + " : node",node);
		strategy = self.getCanUseStrategy(child,StrategyEffectType.Wake,node);
		console.log("find strategy",strategy);
		if(strategy){
			strategys.push({target:child,strategy:strategy});
		}
	}
	if(strategys.length == 0){
		self.strategyFlag = BattleIntelligentAI.RESTORE_STATE;
		return;
	}
	//TODO::判断可以使用策略的优先级
	var obj = strategys[(strategys.length * Math.random()) >>> 0];
	strategy = obj.strategy;
	var target = obj.target;
	node = self.getStrategyNodeTarget(strategy, target);
	console.log("To : node="+node);
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
	if((chara.data.currentSoldiers().soldierType() == SoldierType.Physical) || (chara.data.currentSoldiers().soldierType() == SoldierType.Comprehensive && Math.random() < 0.5) || Math.random() < 0.8){
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
	//TODO::判断可以使用策略的优先级
	var obj = strategys[(strategys.length * Math.random()) >>> 0];
	strategy = obj.strategy;
	var target = obj.target;
	node = self.getStrategyNodeTarget(strategy, target);
	console.log("To : node="+node);
	self.chara.currentSelectStrategy = strategy;
	self.target = target;
	self.targetNode = node;
	self.chara.mode = CharacterMode.MOVING;
};
BattleIntelligentAI.prototype.useHertStrategy = function() {
	var self = this, chara = self.chara;
	if((chara.data.currentSoldiers().soldierType() == SoldierType.Physical) || (chara.data.currentSoldiers().soldierType() == SoldierType.Comprehensive && Math.random() < 0.5)){
		chara.mode = CharacterMode.WAIT_ATTACK;
		return;
	}
	var strategy, strategys = [], node;
	for(var i = 0,l = BattleIntelligentAI.targetCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.targetCharacters[i];
		node = self.getNestNode(child);
		console.log(child.data.name() + " : node",node);
		strategy = self.getCanUseStrategy(child,StrategyEffectType.Status,node);
		if(strategy){
			console.log("find strategy",strategy);
			strategys.push({target:child,strategy:strategy});
			//continue;
		}
		strategy = self.getCanUseStrategy(child,StrategyEffectType.Attack,node);
		if(strategy){
			console.log("find strategy",strategy);
			strategys.push({target:child,strategy:strategy});
			//continue;
		}
	}
	if(strategys.length == 0){
		chara.mode = CharacterMode.WAIT_ATTACK;
		return;
	}
	//TODO::判断可以使用策略的优先级
	var obj = strategys[(strategys.length * Math.random()) >>> 0];
	strategy = obj.strategy;
	var target = obj.target;
	node = self.getStrategyNodeTarget(strategy, target);
	console.log("To : node="+node);
	self.chara.currentSelectStrategy = strategy;
	self.target = target;
	self.targetNode = node;
	self.chara.mode = CharacterMode.MOVING;
};
BattleIntelligentAI.prototype.findPhysicalAttackTarget = function() {
	var self = this, chara = self.chara;
	console.log("self.physicalFlag = " + self.physicalFlag);
	switch(self.physicalFlag){
		case BattleIntelligentAI.PHYSICAL_PANT:
			self.findPhysicalPant();
			break;
		case BattleIntelligentAI.PHYSICAL_OTHER:
			self.findPhysicalOther();
			break;
	}
};
BattleIntelligentAI.prototype.findPhysicalPant = function() {
	var self = this, chara = self.chara,node,targets = [];
	for(var i = 0,l = BattleIntelligentAI.targetPantCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.targetPantCharacters[i];
		node = self.getNestNode(child);
		console.log(child.data.name() + " : node",node);
		var can = self.canAttackTarget(child,node);
		if(can){
			console.log("findPhysicalPant",child);
			targets.push(child);
		}
	}
	if(targets.length == 0){
		self.physicalFlag = BattleIntelligentAI.PHYSICAL_OTHER;
		return;
	}
	var target = targets[(targets.length * Math.random()) >>> 0];
	node = self.getPhysicalNodeTarget(target);
	console.log("To : node="+node);
	self.target = target;
	self.targetNode = node;
	self.chara.mode = CharacterMode.MOVING;
};
BattleIntelligentAI.prototype.findPhysicalOther = function() {
	var self = this, chara = self.chara,node,targets = [];
	for(var i = 0,l = BattleIntelligentAI.targetCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.targetCharacters[i];
		if(child.data.isPantTroops()){
			continue;
		}
		node = self.getNestNode(child);
		console.log(child.data.name() + " : node",node);
		var can = self.canAttackTarget(child,node);
		if(can){
			console.log("findPhysicalOther",child);
			targets.push(child);
		}
	}
	if(targets.length == 0){
		self.chara.mode = CharacterMode.TO_MOVE;
		return;
	}
	var target = targets[(targets.length * Math.random()) >>> 0];
	node = self.getPhysicalNodeTarget(target);
	console.log("To : node="+node);
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
	//没有可以攻击到的人，向最近目标移动
	var distance = 100000, lX, lY, targetX, targetY,targetRoads;
	for(var i = 0,l = BattleIntelligentAI.targetCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.targetCharacters[i];
		lX = child.locationX(), lY = child.locationY();
		LMvc.BattleController.query.checkDistance = true;
		var roads = LMvc.BattleController.query.queryPath(new LPoint(self.locationX, self.locationY),new LPoint(lX,lY));
		LMvc.BattleController.query.checkDistance = false;
		var currentDistance = roads.length;
		if(currentDistance < distance){
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
	self.targetNode = new LPoint(targetX, targetY);
	self.chara.mode = CharacterMode.MOVING;
};

