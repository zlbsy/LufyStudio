function BattleIntelligentAI(chara) {
	var self = this;
	self.chara = chara;
	self.strategyRange = [];
	if(!BattleIntelligentAI.timer){
		BattleIntelligentAI.timer = new LTimer(LGlobal.speed, 1);
		BattleIntelligentAI.timer.addEventListener(LTimerEvent.TIMER, BattleIntelligentAI.continueExecute);
	}
}
BattleIntelligentAI.ADD_HP = "addHp";
BattleIntelligentAI.RESTORE_STATE = "restoreState";
BattleIntelligentAI.DOWN_STATUS = "downStatus";
BattleIntelligentAI.HERT = "hert";

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
	BattleIntelligentAI.ownCharacters = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(currentBelong);
	if(currentBelong == Belong.SELF){
		charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(Belong.FRIEND);
	}else if(currentBelong == Belong.FRIEND){
		charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(Belong.SELF);
	}
	charas = BattleIntelligentAI.ownCharacters.concat(charas);
	BattleIntelligentAI.ownPantCharacters = [];
	var sortValue = 0;
	for(var i = 0;i<charas.length;i++){
		chara = charas[i];
		if(chara.data.isPantTroops()){
			BattleIntelligentAI.ownPantCharacters.push(chara);
		}
		if(chara.mode == CharacterMode.END_ACTION){
			continue;
		}
		var terrainData = LMvc.BattleController.view.mapLayer.getTerrainData(chara.locationX(),chara.locationY());
		var terrain = TerrainMasterModel.getMasterFromValue(terrainData);
		if(sortValue == terrain.sortValue()){
			chatacters.push(chara);
		}else if(sortValue < terrain.sortValue()){
			chatacters = [chara];
			sortValue = terrain.sortValue();
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
	chara = chatacters[Math.random()*chatacters.length >>> 0];
	BattleController.ctrlChara = chara;
	BattleIntelligentAI.strategyList = chara.data.strategies();
	chara.inteAI.locationX = chara.locationX();
	chara.inteAI.locationY = chara.locationY();
	chara.inteAI.run();
};
BattleIntelligentAI.continueExecute = function(){
	BattleController.ctrlChara.inteAI.run();
};

BattleIntelligentAI.prototype.run = function() {
	var self = BattleController.ctrlChara.inteAI;
	switch(self.chara.mode){
		case CharacterMode.NONE:
			self.moveRoadsShow();
			break;
		case CharacterMode.SHOW_MOVE_ROAD:
			self.useStrategy();
			break;
		case CharacterMode.WAIT_SINGLE_COMBAT:
			break;
		case CharacterMode.WAIT_ATTACK:
			break;
		case CharacterMode.MOVING:
			break;
	}
	BattleIntelligentAI.timer.reset();
	BattleIntelligentAI.timer.start();
};
BattleIntelligentAI.prototype.moveRoadsShow = function() {
	var self = this, chara = self.chara;
	var path = [];
	if(!self.chara.status.hasStatus(StrategyType.Fixed)){
		path = LMvc.BattleController.query.makePath(chara);
	}
	LMvc.BattleController.view.roadLayer.setMoveRoads(path, chara.belong);
	LMvc.BattleController.view.roadLayer.addRangeAttack(chara);
	self.strategyFlag = BattleIntelligentAI.ADD_HP;
	chara.mode = CharacterMode.SHOW_MOVE_ROAD;
};
BattleIntelligentAI.prototype.useStrategy = function() {
	var self = this, chara = self.chara;
	switch(self.strategyFlag){
		case BattleIntelligentAI.ADD_HP:
			self.useAddHpStrategy();
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
BattleIntelligentAI.prototype.setStrategyRange = function(strategy) {
	var self = this, chara = self.chara;
	var rangeAttack = strategy.rangeAttack();
	var roadList = LMvc.BattleController.view.roadLayer.roadList;
	self.strategyRange[strategy.id()] = [];
	for(var i=0,l=roadList.length;i<l;i++){
		var node = roadList[i];
		for(var j=0;j<rangeAttack.length;j++){
			
		}
	}
};
BattleIntelligentAI.prototype.getCanUseStrategy = function(target,type, node) {
	var self = this, chara = self.chara;
	var strategyList = BattleIntelligentAI.strategyList;
	for (var i = 0, l = strategyList.length; i < l; i++) {
		var strategy = strategyList[i];
		if(!self.strategyRange[strategy.id()]){
			
		}
		var rangeAttack = strategy.rangeAttack(strategy);
		
	}
	
};
BattleIntelligentAI.prototype.getNestNode = function(target) {
	var self = this, chara = self.chara;
	var roadList = LMvc.BattleController.view.roadLayer.roadList;
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
BattleIntelligentAI.prototype.useAddHpStrategy = function() {
	var self = this, chara = self.chara, strategy;
	for(var i = 0,l = BattleIntelligentAI.ownPantCharacters.length;i<l;i++){
		var child = BattleIntelligentAI.ownPantCharacters[i];
		var node = self.getNestNode();
		strategy = self.getCanUseStrategy(child,StrategyEffectType.Supply,node);
		
	}
	if(false){
		
		return;
	}
	self.strategyFlag = BattleIntelligentAI.RESTORE_STATE;
};
BattleIntelligentAI.prototype.useRestoreStateStrategy = function() {
	var self = this, chara = self.chara;
	if(false){
		
		return;
	}
	self.strategyFlag = BattleIntelligentAI.DOWN_STATUS;
};
BattleIntelligentAI.prototype.useDownStatusStrategy = function() {
	var self = this, chara = self.chara;
	if(false){
		
		return;
	}
	self.strategyFlag = BattleIntelligentAI.HERT;
};
BattleIntelligentAI.prototype.useHertStrategy = function() {
	var self = this, chara = self.chara;
	if(false){
		
		return;
	}
	chara.mode = CharacterMode.WAIT_ATTACK;
};