function checkEventList() {
	var eventListFinished = LMvc.chapterData.eventListFinished || [];
	for(var i = 0,l = EventListConfig.length;i<l;i++){
		var currentEvent = EventListConfig[i];
		if(eventListFinished.findIndex(function(child){
			return child == currentEvent.id;
			}) >= 0){
			continue;
		}
		var month = LMvc.chapterController.getValue("month");
		var year = LMvc.chapterController.getValue("year");
		var timeIn = (currentEvent.condition.from.year <= year && currentEvent.condition.to.year >= year && currentEvent.condition.from.month <= month && currentEvent.condition.to.month >= month);
		if(!timeIn){
			continue;
		}
		if(LMvc.selectSeignorId != currentEvent.condition.seignior){
			continue;
		}
		var generalsOk = true;
		var generals = currentEvent.condition.generals;
		for(var j=0;j<generals.length;j++){
			var general = generals[j];
			var character = CharacterModel.getChara(general.id);
			if(character.seigniorId() != general.seignior){
				generalsOk = false;
				break;
			}
		}
		if(!generalsOk){
			continue;
		}
		var citysOk = true;
		var citys = currentEvent.condition.citys;
		for(var j=0;j<citys.length;j++){
			var city = citys[j];
			var cityModel = AreaModel.getArea(city.id);
			if(cityModel.seigniorCharaId() != city.seignior){
				citysOk = false;
				break;
			}
		}
		if(!citysOk){
			continue;
		}
		eventListFinished.push(currentEvent.id);
		LMvc.chapterData.eventListFinished = eventListFinished;
		dispatchEventList(currentEvent);
		return true;
	}
	return false;
}
function dispatchEventList(currentEvent) {
	var script = "Var.set(eventId,"+currentEvent.id+");";
	script += "Load.script("+currentEvent.stript+");";
	script += "SGJJobHelper.dispatchEventListResult("+currentEvent.id+");";
	LGlobal.script.addScript(script);
}
function dispatchEventListResult(eventId) {
	var currentEvent = EventListConfig.find(function(child) {
		return child.id == eventId;
	});
	if(currentEvent.result.length == 0){
		SeigniorExecute.run();
		return;
	}
	
}
/*{
	id:1,
	name:"桃园结义",
	condition:{
		from:{year:184,month:1},
		to:{year:184,month:1},
		seignior:1,
		generals:[
			{id:1,seignior:1},
			{id:2,seignior:1},
			{id:3,seignior:1}
		],
		citys:[
			{id:25,seignior:1},
		]
	},
	stript:"Data/Event/tyjy.txt",
	result:[]
}*/