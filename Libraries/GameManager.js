function GameManager(){
}
GameManager.save = function(){
	console.log("GameManager.save ");
	var data = {};
	data.seigniors = SeigniorModel.getSaveData();
	data.chapterData = LMvc.chapterData;
	data.selectSeignorId = LMvc.selectSeignorId;
	if(LMvc.BattleController){
		data.battleData = getBattleSaveData();
	}
	console.log("data.battleData="+data.battleData);
	LPlugin.SetData("gameData_2", data);
	console.log("GameManager.save "+data);
};
GameManager.read = function(){
	console.log("GameManager.read ");
	LMvc.isRead = true;
	LMvc.areaData = LPlugin.GetData("gameData_2");
	console.log("GameManager.read "+LMvc.areaData);
	console.log("LMvc.areaData.battleData="+LMvc.areaData.battleData);
	gameDataInit();
	console.log("GameManager.read gameDataInit");
	LMvc.MapController.dispatchEvent(LController.NOTIFY);
	console.log("GameManager.read over");
};