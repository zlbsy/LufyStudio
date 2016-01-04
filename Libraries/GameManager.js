function GameManager(){
}
GameManager.save = function(index){
	console.log("GameManager.save ");
	var data = {};
	data.seigniors = SeigniorModel.getSaveData();
	data.chapterData = LMvc.chapterData;
	data.selectSeignorId = LMvc.selectSeignorId;
	data.mapX = LMvc.mapX;
	data.mapY = LMvc.mapY;
	data.labels = {};
	var selectSeignor = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	data.labels.name = selectSeignor.character().name();
	data.labels.color = selectSeignor.color2();
	data.labels.cityCount = Language.get("city") + " : " + selectSeignor.areas().length;
	data.labels.generalsCount = Language.get("generals") + " : " + selectSeignor.generalsCount();
	var city_title_format = Language.get("city_title").replace("(","").replace(")","");
	data.labels.date = LString.trim(String.format(city_title_format, data.chapterData.year, data.chapterData.month, "", ""));
	var now = new Date();
	data.labels.saveTime = String.format("{0}-{1}-{2} {3}:{4}:{5}", now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
	if(LMvc.BattleController){
		data.battleData = getBattleSaveData();
	}
	var recordName = String.format("gameRecord_{0}", index);
	LPlugin.SetData(recordName, data);
	return data;
};
GameManager.read = function(index){
	var recordName = String.format("gameRecord_{0}", index);
	var record = LPlugin.GetData(recordName);
	return record;
};