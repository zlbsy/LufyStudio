function GameManager(){
}
GameManager.save = function(){
	var data = {};
	data.charactersData = CharacterModel.getSaveData();
	data.seigniorsData = SeigniorModel.getSaveData();
	if(!LMvc.BattleController){
		return;
	}
	data.battleData = "";
};
GameManager.read = function(){
	
};