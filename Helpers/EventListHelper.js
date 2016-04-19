function checkEventList() {
	var eventListFinished = LMvc.chapterData.eventListFinished || [];
	//console.log("checkEventList"+eventListFinished.length);
	for(var i = 0,l = EventListConfig.length;i<l;i++){
		var currentEvent = EventListConfig[i];
		if(eventListFinished.findIndex(function(child){
			return child == currentEvent.id;
			}) >= 0){
			continue;
		}
		if(currentEvent.condition.from && currentEvent.condition.to){
			var month = LMvc.chapterData.month;
			var year = LMvc.chapterData.year;
			var from = currentEvent.condition.from.year * 12 + currentEvent.condition.from.month;
			var to = currentEvent.condition.to.year * 12 + currentEvent.condition.to.month;
			var now = LMvc.chapterData.year * 12 + LMvc.chapterData.month;
			var yearOk = (currentEvent.condition.from.year <= year && currentEvent.condition.to.year >= year);
			var monthOk = (currentEvent.condition.from.month <= month && currentEvent.condition.to.month >= month);
			var timeIn = (yearOk && monthOk);
			if(!timeIn){
				continue;
			}
		}
		if(currentEvent.condition.seignior > 0 && LMvc.selectSeignorId != currentEvent.condition.seignior){
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
		var feat_generals = currentEvent.condition.feat_generals;
		if(feat_generals){
			if(SeigniorModel.list[SeigniorExecute.Instance().seigniorIndex].chara_id() != LMvc.selectSeignorId){
				continue;
			}
			var feat = feat_generals.feat;
			var force = feat_generals.force;
			var count = feat_generals.count;
			var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
			var charas = seignior.generals();
			var characters = [];
			for(var j=0;j<charas.length;j++){
				var character = charas[j];
				if(character.feat() >= feat && character.force() >= force){
					characters.push(character);
				}
			}
			if(characters.length < count){
				continue;
			}
			characters = characters.sort(function(a,b){return b.feat() - a.feat();});
			currentEvent.feat_characters = characters;
		}
		if(!LPlugin.eventIsOpen(currentEvent.id)){
			LPlugin.openEvent(currentEvent.id);
		}
		eventListFinished.push(currentEvent.id);
		LMvc.chapterData.eventListFinished = eventListFinished;
		dispatchEventList(currentEvent);
		return true;
	}
	return false;
}
function dispatchEventList(currentEvent) {
	//result:[{type:"reputation",generals:[],reputation:"tiger"}]
	var script = "Var.set(eventId,"+currentEvent.id+");";
	if(currentEvent.feat_characters){
		script += String.format("Var.set(id0,{0});", LMvc.selectSeignorId);
		for(var i=0, l=currentEvent.condition.feat_generals.count;i<l;i++){
			var character = currentEvent.feat_characters[i];
			script += String.format("Var.set(id{0},{1});", i + 1, character.id());
			script += String.format("Var.set(name{0},{1});", i + 1, character.name());
		}
		currentEvent.result.generals.push(character.id());
	}
	script += "SGJEvent.init();";
	script += "Load.script("+currentEvent.script+");";
	script += "SGJEvent.dispatchEventListResult("+currentEvent.id+");";
	script += "SGJEvent.end();";
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
	for(var i=0,l=currentEvent.result.length;i<l;i++){
		var child = currentEvent.result[i];
		switch(child.type){
			case "stopBattle":
				dispatchEventListResultStopBattle(child);
				break;
			case "changeSeignior":
				dispatchEventListResultChangeSeignior(child);
				break;
			case "reputation":
				dispatchEventListResultReputation(child);
				break;
		}
	}
	LGlobal.script.analysis();
}
function dispatchEventListResultReputation(child) {
	var generals = child.generals;
	for(var i=0,l=generals.length;i<l;i++){
		var id = generals[i];
		var character = CharacterModel.getChara(id);
		character.data.reputation = child.reputation;
	}
}
function dispatchEventListResultStopBattle(child) {
	var seigniors = child.seigniors;
	var month = child.month;
	for(var i=0,l=seigniors.length;i<l;i++){
		var iId = seigniors[i];
		var seignior = SeigniorModel.getSeignior(iId);
		for(var j=0;j<l;j++){
			var jId = seigniors[j];
			if(iId == jId){
				continue;
			}
			seignior.stopBattle(jId, month);
		}
	}
}
function dispatchEventListResultChangeSeignior(child) {
	var character = CharacterModel.getChara(child.id);
	character.seigniorId(child.seignior);
	character.loyalty(child.loyalty);
	character.moveTo(child.city);
	character.moveTo();
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