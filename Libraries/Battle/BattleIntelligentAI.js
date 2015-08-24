function BattleIntelligentAI(chara) {
	var self = this;
	self.chara = chara;
	self.herts = null;
}
BattleIntelligentAI.currentCharacter = null;
BattleIntelligentAI.execute = function() {
	var self = this;
	var currentBelong = LMvc.BattleController.getValue("currentBelong");
	if(currentBelong == Belong.SELF){
		return;
	}
	var chatacters = [];
	var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(currentBelong);
	var sortValue = 0;
	for(var i = 0;i<charas.length;i++){
		var chara = charas[i];
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
	BattleIntelligentAI.currentCharacter = chatacters[Math.random()*chatacters.length >>> 0];
	BattleIntelligentAI.currentCharacter.run();
};
BattleIntelligentAI.prototype.run = function() {
	var self = this;
	
};