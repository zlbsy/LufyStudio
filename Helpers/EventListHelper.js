function checkEventList() {
	var eventListFinished = LMvc.chapterData.eventListFinished || [];
	var tribeSeignior = 0, gameClear = true;
	for(var i=0,l=SeigniorModel.list.length;i<l;i++){
		var seignior = SeigniorModel.list[i];
		if(seignior.isTribe()){
			tribeSeignior++;
		}else if(seignior.chara_id() != LMvc.selectSeignorId){
			gameClear = false;
			break;
		}
		
	}
	for(var ii = 0,ll = EventListConfig.length;ii<ll;ii++){
		var currentEvent = EventListConfig[ii];
		if(eventListFinished.findIndex(function(child){
			return child == currentEvent.id;
			}) >= 0){
			continue;
		}
		if(currentEvent.condition.clear){
			if(!gameClear){
				continue;
			}
			if(currentEvent.condition.tribe.from > tribeSeignior ||  currentEvent.condition.tribe.to < tribeSeignior){
				continue;
			}
			if(currentEvent.condition.police){
				var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
				var areas = seignior.areas();
				var policeOk = true;
				var averagePolice = 0;
				for(var i = 0, l = areas.length;i<l;i++){
					var police = areas[i].police();
					averagePolice += police;
					//if(currentEvent.condition.police.from >= police ||  currentEvent.condition.police.to <= police){
					//	policeOk = false;
					//	break;
					//}
				}
				averagePolice = averagePolice/areas.length;
				if(currentEvent.condition.police.from > averagePolice ||  currentEvent.condition.police.to < averagePolice){
					policeOk = false;
				}
				if(!policeOk){
					continue;
				}
			}
		}
		if(currentEvent.condition.from && currentEvent.condition.to){
			var month = LMvc.chapterData.month;
			var year = LMvc.chapterData.year;
			var from = currentEvent.condition.from.year * 12 + currentEvent.condition.from.month;
			var to = currentEvent.condition.to.year * 12 + currentEvent.condition.to.month;
			var now = LMvc.chapterData.year * 12 + LMvc.chapterData.month;
			var timeIn = (from<=now && to>=now);
			if(!timeIn){
				continue;
			}
		}
		if(currentEvent.condition.seignior > 0 && LMvc.selectSeignorId != currentEvent.condition.seignior){
			continue;
		}
		if(currentEvent.condition.noSeignior > 0 && LMvc.selectSeignorId == currentEvent.condition.noSeignior){
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
			if(general.cityId){
				if(Array.isArray(general.cityId)){
					if(general.cityId.indexOf(character.cityId())<0){
						generalsOk = false;
						break;
					}
				}else{
					if(character.cityId() != general.cityId){
						generalsOk = false;
						break;
					}
				}
			}
			if(general.captive){
				var city = character.city();
				if(city.seigniorCharaId() != general.captive){
					generalsOk = false;
					break;
				}
				var captives = city.captives();
				var index = captives.findIndex(function(child){
					return child.id() == general.id;
				});
				if(index < 0){
					generalsOk = false;
					break;
				}
			}
		}
		if(!generalsOk){
			//console.log(currentEvent.name + " generalsOk");
			continue;
		}
		var citysOk = true;
		var citys = currentEvent.condition.citys;
		for(var j=0;j<citys.length;j++){
			var city = citys[j];
			var cityModel = AreaModel.getArea(city.id);
			if(typeof city.seignior == "number"){
				if(cityModel.seigniorCharaId() != city.seignior){
					//console.log(currentEvent.name +": citys number,"+cityModel.seigniorCharaId()+","+city.seignior);
					citysOk = false;
					break;
				}
			}else{
				var index = city.seignior.findIndex(function(child){
					return child === cityModel.seigniorCharaId();
				});
				if(index < 0){
					//console.log(currentEvent.name +": citys index");
					citysOk = false;
					break;
				}
			}
		}
		if(!citysOk){
			//console.log(currentEvent.name + " citysOk");
			continue;
		}
		var cityCountOk = true;
		var cityCount = currentEvent.condition.cityCount;
		if(cityCount){
			for(var j=0;j<cityCount.length;j++){
				var seignior = SeigniorModel.getSeignior(cityCount[j].id);
				var areaCount = seignior.areas().length;
				if(areaCount < cityCount[j].from || areaCount > cityCount[j].to){
					cityCountOk = false;
					break;
				}
			}
		}
		if(!cityCountOk){
			//console.log(currentEvent.name + " cityCountOk");
			continue;
		}
		var stopBattleOk = true;
		var stopBattle = currentEvent.condition.stopBattle;
		if(stopBattle){
			for(var j=0;j<stopBattle.length;j++){
				var seignior1 = stopBattle[j][0];
				var seignior2 = stopBattle[j][1];
				var seignior = SeigniorModel.getSeignior(seignior1);
				if(!seignior.isStopBattle(seignior2)){
					stopBattleOk = false;
					break;
				}
			}
		}
		if(!stopBattleOk){
			//console.log(currentEvent.name + " stopBattleOk");
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
				if(character.id() == LMvc.selectSeignorId){
					continue;
				}
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
	var script = "";
	var params = [];
	params.push({n:"id0",v:LMvc.selectSeignorId});
	params.push({n:"name0",v:SeigniorModel.getSeignior(LMvc.selectSeignorId).character().name()});
	if(currentEvent.feat_characters && SeigniorExecute.running){
		for(var i=0, l=currentEvent.condition.feat_generals.count;i<l;i++){
			var character = currentEvent.feat_characters[i];
			params.push({n:"id"+(i + 1),v:character.id()});
			params.push({n:"name"+(i + 1),v:character.name()});
			currentEvent.result[0].generals.push(character.id());
		}
	}else if(currentEvent.condition.clear){
		var charas, index;
		//小人
		charas = [618,619], index = 0;
		for(var i=0;i<charas.length;i++){
			if(charas.length == LMvc.selectSeignorId){
				continue;
			}
			params.push({n:"xiaoren"+(index++),v:charas[i]});
		}
		//美女
		charas = [380,524, 548], index = 0;
		for(var i=0;i<charas.length;i++){
			if(charas.length == LMvc.selectSeignorId){
				continue;
			}
			params.push({n:"meinv"+(index++),v:charas[i]});
		}
		//四方诸侯
		charas = [2,3,5,10,39], index = 0;
		for(var i=0;i<charas.length;i++){
			if(charas.length == LMvc.selectSeignorId){
				continue;
			}
			params.push({n:"zhuhou"+(index++),v:charas[i]});
		}
	}
	LPlugin.SetData("event_params_"+currentEvent.id, params);
	if(params && params.length){
		for(var i=0;i<params.length;i++){
			var param = params[i];
			script += String.format("Var.set({0},{1});", param.n, param.v);
		}
	}
	var path = String.format(currentEvent.script,LPlugin.language());
	script += "SGJEvent.init();";
	script += "Load.script("+path+");";
	script += "SGJEvent.dispatchEventListResult("+currentEvent.id+");";
	script += "SGJEvent.end();";
	LGlobal.script.addScript(script);
}
function dispatchEventListResult(eventId, currentEvent) {
	if(eventId){
		currentEvent = EventListConfig.find(function(child) {
			return child.id == eventId;
		});
	}
	for(var i=0,l=currentEvent.result.length;i<l;i++){
		var child = currentEvent.result[i];
		//console.log("dispatchEventListResult .type="+child.type);
		switch(child.type){
			case "stopBattle"://停战
				dispatchEventListResultStopBattle(child);
				break;
			case "changeSeignior"://武将势力变更
				dispatchEventListResultChangeSeignior(child);
				break;
			case "reputation"://称号
				dispatchEventListResultReputation(child);
				break;
			case "moveGeneralsToCity"://武将移动到城池
				dispatchEventListResultMoveGeneralsToCity(child);
				break;
			case "moveCityResources"://资源移动
				dispatchEventListResultMoveCityResources(child);
				break;
			case "changeCitySeignior"://城池势力变更
				dispatchEventListResultChangeCitySeignior(child);
				break;
			case "changeCityResources"://资源变更
				dispatchEventListResultChangeCityResources(child);
				break;
			case "generalsDie"://武将死亡
				dispatchEventListResultGeneralsDie(child);
				break;
			case "monarchDie"://君主死亡
				dispatchEventListResultMonarchDie(child);
				break;
			case "captiveDie"://处死俘虏
				dispatchEventListResultCaptiveDie(child);
				break;
			case "moveGeneralsToSeignior"://武将移动到势力
				dispatchEventListResultMoveGeneralsToSeignior(child);
				break;
			case "seigniorToSeignior"://势力归属到另一势力
				dispatchEventListResultSeigniorToSeignior(child);
				break;
			case "changePrefecture"://太守变更
				dispatchEventListResultChangePrefecture(child);
				break;
			case "gameClear"://游戏通关
				dispatchEventListResultGameClear(child);
				break;
		}
	}
	if(eventId){
		LGlobal.script.analysis();
	}
}
function dispatchEventListResultGameClear(child) {
	SeigniorExecute.running = false;
	MenuController.instance().nextFrameExecute(function(){
		MenuController.instance().view.onClickReturnTop();
	});
}
function dispatchEventListResultCaptiveDie(child) {
	for(var i=0,l=child.captives.length;i<l;i++){
		var chara = CharacterModel.getChara(child.captives[i]);
		chara.toDie();
	}
}
function dispatchEventListResultChangePrefecture(child) {
	var city = AreaModel.getArea(child.cityId);
	city.prefecture(child.prefecture);
}
function dispatchEventListResultSeigniorToSeignior(child) {
	var seigniorFrom = SeigniorModel.getSeignior(child.from);
	if(!seigniorFrom){
		return;
	}
	var seigniorTo = SeigniorModel.getSeignior(child.to);
	var citys = seigniorFrom.areas().concat(); 
	for(var i=0,l=citys.length;i<l;i++){
		var city = citys[i];
		var generals = city.generals();
		for(var j=0,jl=generals.length;j<jl;j++){
			var general = generals[j];
			general.seigniorId(child.to);
		}
		seigniorTo.addCity(city);
		SeigniorExecute.Instance().eventCitys.push(city.id());
	}
	SeigniorModel.removeSeignior(child.from);
	GameCacher.resetAreaMap("area-map-1");
	LMvc.MapController.view.areaLayerInit();
}
function dispatchEventListResultMoveGeneralsToSeignior(child) {
	var seignior = SeigniorModel.getSeignior(child.to);
	if(!seignior || !seignior.chara_id()){
		for(var i=0,l=child.generals.length;i<l;i++){
			var general = CharacterModel.getChara(child.generals[i]);
			general.toOutOfOffice();
		}
		return;
	}
	var seigniorChara = CharacterModel.getChara(child.to);
	for(var i=0,l=child.generals.length;i<l;i++){
		var general = CharacterModel.getChara(child.generals[i]);
		general.seigniorId(child.to);
		general.loyalty(child.loyalty);
		general.moveTo(seigniorChara.cityId());
		general.moveTo();
	}
}
function dispatchEventListResultMonarchDie(child) {
	var general = CharacterModel.getChara(child.monarch);
	general.toDie();
	for(var i=0,l=child.newMonarch.length;i<l;i++){
		var character = CharacterModel.getChara(child.newMonarch[i]);
		if(character.seigniorId() == child.monarch){
			monarchChange(child.monarch, character.id());
			break;
		}
	}
	GameCacher.resetAreaMap("area-map-1");
	LMvc.MapController.view.areaLayerInit();
}
function dispatchEventListResultGeneralsDie(child) {
	for(var i=0,l=child.generals.length;i<l;i++){
		var general = CharacterModel.getChara(child.generals[i]);
		var city = general.city();
		var prefecture = city.prefecture();
		var prefectureDie = (prefecture == general.id());
		general.toDie();
		if(prefectureDie){
			appointPrefecture(city);
		}
	}
}
function dispatchEventListResultChangeCityResources(child) {
	var city = AreaModel.getArea(child.cityId);
	city.food(child.food - city.food());
	city.money(child.money - city.money());
	city.business(child.business - city.business());
	city.agriculture(child.agriculture - city.agriculture());
	city.technology(child.technology - city.technology());
	city.police(child.police - city.police());
	city.cityDefense(child.city_defense - city.cityDefense());
	city.troops(child.troops);
}
function dispatchEventListResultChangeCitySeignior(child) {
	var city = AreaModel.getArea(child.cityId);
	if(city.seigniorCharaId() == child.seignior){
		return;
	}
	var fromSeignior = city.seignior();
	var fromCitys = [];
	if(fromSeignior){
		fromCitys = fromSeignior.areas();
	}
	if(fromCitys.length == 1){
		return;
	}
	var generals = city.generals();
	if(generals.length > 0){
		var canMoveCitys = [];
		for(var i=0,l=fromCitys.length;i<l;i++){
			if(fromCitys[i].id() != child.cityId){
				canMoveCitys.push(fromCitys[i]);
			}
		}
		while(generals.length > 0){
			var moveCity = canMoveCitys[canMoveCitys.length * Math.fakeRandom() >>> 0];
			generals[0].moveTo(moveCity.id());
			generals[0].moveTo();
		}
	}
	SeigniorExecute.Instance().eventCitys.push(child.cityId);
	city.seigniorCharaId(child.seignior);
	GameCacher.resetAreaMap("area-map-1");
	LMvc.MapController.view.areaLayerInit();
}
function dispatchEventListResultMoveCityResources(child) {
	var fromCity = AreaModel.getArea(child.from);
	var toCity = AreaModel.getArea(child.to);
	var food = fromCity.food();
	var money = fromCity.money();
	toCity.food(food);
	toCity.money(money);
	toCity.troops(toCity.troops() + fromCity.troops());
	fromCity.food(-food);
	fromCity.money(-money);
	fromCity.troops(0);
}
function dispatchEventListResultMoveGeneralsToCity(child) {
	var fromCity = AreaModel.getArea(child.from);
	var toCity = AreaModel.getArea(child.to);
	var generals = [];
	if(!child.generals || child.generals.length == 0){
		generals = fromCity.generals().concat();
	}else{
		for(var i=0;i<child.generals.length;i++){
			var general = CharacterModel.getChara(child.generals[i]);
			generals.push(general);
		}
	}
	for(var i=0,l=generals.length;i<l;i++){
		var general = generals[i];
		if(general.seigniorId() != toCity.seigniorCharaId()){
			continue;
		}
		general.moveTo(child.to);
		general.moveTo();
	}
}
function dispatchEventListResultReputation(child) {
	var generals = child.generals;
	for(var i=0,l=generals.length;i<l;i++){
		var id = generals[i];
		var character = CharacterModel.getChara(id);
		if(!character.data.reputation){
			character.data.reputation = [];
		}
		character.data.reputation.push(child.reputation);
		var reputationModel = ReputationModel.getReputation(child.reputation);
		var soldiers = reputationModel.data.soldiers;
		if(soldiers){
			for(var j=0,jl=soldiers.length;j<jl;j++){
				var reputationSoldier = soldiers[j];
				var soldier = character.soldiers().find(function(child){
					return child.id() == reputationSoldier.id;
				});
				var proficiency = soldier.proficiency();
				if(proficiency < reputationSoldier.proficiency){
					soldier.proficiency(reputationSoldier.proficiency);
				}
			}
		}
	}
}
function dispatchEventListResultStopBattle(child) {
	var seigniors = child.seigniors;
	var month = child.month;
	for(var i=0,l=seigniors.length;i<l;i++){
		var iId = seigniors[i];
		var seignior = SeigniorModel.getSeignior(iId);
		if(!seignior)continue;
		for(var j=0;j<l;j++){
			var jId = seigniors[j];
			if(iId == jId){
				continue;
			}
			if(!SeigniorModel.getSeignior(jId))continue;
			seignior.stopBattle(jId, month);
		}
	}
}
function dispatchEventListResultChangeSeignior(child) {
	var chara;
	for(var i=0,l=AreaModel.list.length;i<l;i++){
		var area = AreaModel.list[i];
		chara = area.removeNotDebut(child.id);
		if(chara){
			break;
		}
	}
	var character = CharacterModel.getChara(child.id);
	if(chara && chara.equipments && chara.equipments.length > 0){
		character.equip(chara.equipments);
	}
	character.seigniorId(child.seignior);
	character.loyalty(child.loyalty);
	character.moveTo(child.city);
	character.moveTo();
}