function BattleIntelligentAI(chara) {
	var self = this;
	self.chara = chara;
	self.herts = null;
	if(!BattleIntelligentAI.timer){
		BattleIntelligentAI.timer = new LTimer(0, 0.05);
		BattleIntelligentAI.timer.addEventListener(LTimerEvent.TIMER, BattleIntelligentAI.continue);
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

BattleIntelligentAI.execute = function() {
	var self = this;
	var currentBelong = LMvc.BattleController.getValue("currentBelong");
	if(currentBelong == Belong.SELF){
		return;
	}
	var chatacters = [];
	var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(currentBelong);
	BattleIntelligentAI.ownCharacters = charas;
	BattleIntelligentAI.ownPantCharacters = [];
	var sortValue = 0;
	for(var i = 0;i<charas.length;i++){
		var chara = charas[i];
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
		BattleIntelligentAI.ownPantCharacters = BattleIntelligentAI.ownPantCharacters.sort(function(a,b){return a.z - b.z;}); 
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
		var chara = charas[i];
		if(chara.data.isPantTroops()){
			BattleIntelligentAI.targetPantCharacters.push(chara);
		}
	}
	BattleController.ctrlChara = chatacters[Math.random()*chatacters.length >>> 0];
	BattleController.ctrlChara.inteAI.run();
};
BattleIntelligentAI.continue = function(){
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
	var self = this, chara = BattleController.ctrlChara;
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
	var self = this, chara = BattleController.ctrlChara;
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
BattleIntelligentAI.prototype.useAddHpStrategy = function() {
	var self = this, chara = BattleController.ctrlChara;
	if(false){
		
		return;
	}
	self.strategyFlag = BattleIntelligentAI.RESTORE_STATE;
};
BattleIntelligentAI.prototype.useRestoreStateStrategy = function() {
	var self = this, chara = BattleController.ctrlChara;
	if(false){
		
		return;
	}
	self.strategyFlag = BattleIntelligentAI.DOWN_STATUS;
};
BattleIntelligentAI.prototype.useDownStatusStrategy = function() {
	var self = this, chara = BattleController.ctrlChara;
	if(false){
		
		return;
	}
	self.strategyFlag = BattleIntelligentAI.HERT;
};
BattleIntelligentAI.prototype.useHertStrategy = function() {
	var self = this, chara = BattleController.ctrlChara;
	if(false){
		
		return;
	}
	chara.mode = CharacterMode.WAIT_ATTACK;
};