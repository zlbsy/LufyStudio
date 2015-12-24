function GameManager(){
}
GameManager.save = function(index){
	console.log("GameManager.save ");
	var data = {};
	data.seigniors = SeigniorModel.getSaveData();
	data.chapterData = LMvc.chapterData;
	data.selectSeignorId = LMvc.selectSeignorId;
	data.labels = {};
	var selectSeignor = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	data.labels.name = selectSeignor.character().name();
	data.labels.color = selectSeignor.color2();
	data.labels.cityCount = selectSeignor.areas().length;
	data.labels.generalsCount = selectSeignor.generalsCount();
	var now = new Date();
	data.labels.saveTime = String.format("{0}-{1}-{2} {3}:{4}:{5}", now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
	if(LMvc.BattleController){
		data.battleData = getBattleSaveData();
	}
	console.log("data.battleData="+data.battleData);
	var recordName = String.format("gameRecord_{0}", index);
	LPlugin.SetData(recordName, data);
	console.log("GameManager.save "+data);
	return data;
};
GameManager.read = function(index){
	var recordName = String.format("gameRecord_{0}", index);
	var record = LPlugin.GetData(recordName);
	return record;
	//TODO: 
	console.log("GameManager.read ");
	LMvc.isRead = true;
	LMvc.areaData = LPlugin.GetData("gameData_2");
	console.log("GameManager.read ",LMvc.areaData);
	console.log("LMvc.areaData.battleData="+LMvc.areaData.battleData);
	gameDataInit();
	console.log("GameManager.read gameDataInit");
	LMvc.MapController.dispatchEvent(LController.NOTIFY);
	console.log("GameManager.read over");
};