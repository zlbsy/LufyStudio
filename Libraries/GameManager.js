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
	data.seigniorExecute = SeigniorExecute.getSaveData();
	data.labels = {};
	var selectSeignor = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	data.labels.name = selectSeignor.character().name();
	data.labels.color = selectSeignor.color2();
	data.labels.cityCount = Language.get("city") + " : " + selectSeignor.areas().length;
	data.labels.generalsCount = Language.get("generals") + " : " + selectSeignor.generalsCount();
	var city_title_format = Language.get("city_title").replace("(","").replace(")","");
	data.labels.date = LString.trim(String.format(city_title_format, data.chapterData.year, NumberToString(data.chapterData.month,2), "", ""));
	var now = new Date();
	data.labels.saveTime = String.format("{0}-{1}-{2} {3}:{4}:{5}", 
	now.getFullYear(), 
	NumberToString(now.getMonth() + 1,2), 
	NumberToString(now.getDate(),2), 
	NumberToString(now.getHours(),2), 
	NumberToString(now.getMinutes(),2), 
	NumberToString(now.getSeconds(),2));
	if(LMvc.BattleController){
		data.battleData = getBattleSaveData();
		var city = AreaModel.getArea(data.battleData.toCityId);
		data.labels.battleTitle = 
		String.format(Language.get("battle_title"), city.name()) + "("+
		String.format(Language.get("bout_label"),data.battleData.bout) + ")";
		//data.labels.boutLabel = String.format(Language.get("bout_label"),data.battleData.bout);
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