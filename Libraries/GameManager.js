function GameManager(){
}
GameManager.save = function(){
	console.log("GameManager.save ");
	var data = {};
	//data.charactersData = CharacterModel.getSaveData();
	//data.citysData = AreaModel.getSaveData();
	data.seigniors = SeigniorModel.getSaveData();
	console.log("GameManager.save "+data);
	if(!LMvc.BattleController){
		return;
	}
	data.battleData = "";
};
GameManager.read = function(){
	
};