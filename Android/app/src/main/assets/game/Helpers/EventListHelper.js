function checkEventList() {
	var eventListFinished = LMvc.chapterData.eventListFinished || [];
	var tribeSeignior = 0, gameClear = true, tribeTroops = 0, selectSeigniorTroops = 0, selectSeigniorGeneralsCount = 0;
	for (var i = 0, l = SeigniorModel.list.length; i < l; i++) {
		var seignior = SeigniorModel.list[i];
		if (seignior.isTribe()) {
			tribeSeignior++;
			tribeTroops += seignior.troops();
		} else if (seignior.chara_id() != LMvc.selectSeignorId) {
			gameClear = false;
			break;
		}

	}
	for (var ii = 0, ll = EventListConfig.length; ii < ll; ii++) {
		var currentEvent = EventListConfig[ii];
		if (eventListFinished.findIndex(function(child) {
			return child == currentEvent.id;
		}) >= 0) {
			continue;
		}
		if (currentEvent.condition.clear) {
			if (!gameClear) {
				continue;
			}
			//汉室复兴条件
			if(!checkEventListRevival(currentEvent)){
				continue;
			}
			//汉室复兴延长条件
			if(!checkEventListConditionRevival(currentEvent, tribeSeignior)){
				continue;
			}
			//兵力判定
			var troopsVsTribe = currentEvent.condition.troopsVsTribe;
			if (typeof troopsVsTribe != UNDEFINED) {
				if (selectSeigniorTroops == 0) {
					selectSeigniorTroops = SeigniorModel.getSeignior(LMvc.selectSeignorId).troops();
				}
				if ((typeof troopsVsTribe.from != UNDEFINED && troopsVsTribe.from * tribeTroops > selectSeigniorTroops) || 
					(typeof troopsVsTribe.to != UNDEFINED && troopsVsTribe.to * tribeTroops < selectSeigniorTroops)) {
					continue;
				}
			}
			//外族个数判定
			if (currentEvent.condition.tribe) {
				if (currentEvent.condition.tribe.indexOf(tribeSeignior) < 0) {
					continue;
				}
			}
			//斩首武将判定
			var beheadOk = getEventListBehead(currentEvent.condition);
			if (!currentEvent.condition.beheadOrPolice && !beheadOk) {
				continue;
			}
			//商业判定
			var businessOk = getEventListBusiness(currentEvent.condition);
			if (!businessOk) {
				continue;
			}
			//农业判定
			var agricultureOk = getEventListAgriculture(currentEvent.condition);
			if (!agricultureOk) {
				continue;
			}
			//技术判定
			var technologyOk = getEventListTechnology(currentEvent.condition);
			if (!technologyOk) {
				continue;
			}
			//宝物判定
			var treasureOk = getEventListTreasure(currentEvent.condition);
			if (!treasureOk) {
				continue;
			}
			//治安判定
			var policeOk = getEventListPolice(currentEvent.condition);
			if (!currentEvent.condition.beheadOrPolice && !policeOk) {
				continue;
			}
			//治安或斩首武将判定
			if (currentEvent.condition.beheadOrPolice && !beheadOk && !policeOk) {
				continue;
			}
		} else if (LMvc.chapterData.noLife && !currentEvent.condition.noHistory) {
			continue;
		}
		//时间判定
		if(!checkEventListTimeIn(currentEvent.condition)){
			continue;
		}
		//势力判定
		if(!checkEventListSeignor(currentEvent.condition)){
			continue;
		}
		//武将判定
		if(!checkEventListGenerals(currentEvent.condition)){
			continue;
		}
		//城池判定
		if(!checkEventListCitys(currentEvent.condition)){
			continue;
		}
		//停战判定
		if(!checkEventListStopBattle(currentEvent.condition)){
			continue;
		}
		//武将个数判定
		if(!checkEventListGeneralsCount(currentEvent)){
			continue;
		}
		if (!LPlugin.eventIsOpen(currentEvent.id)) {
			LPlugin.openEvent(currentEvent.id);
		}
		eventListFinished.push(currentEvent.id);
		LMvc.chapterData.eventListFinished = eventListFinished;
		dispatchEventList(currentEvent);
		return true;
	}
	return false;
}
function checkEventListGeneralsCount(currentEvent){
	var generalsCount = currentEvent.condition.generalsCount;
	if(typeof generalsCount == UNDEFINED){
		return true;
	}
	if (generalsCount.isSelect && 
		SeigniorModel.list[SeigniorExecute.Instance().seigniorIndex].chara_id() != LMvc.selectSeignorId) {
		return false;
	}
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var charas = seignior.generals();
	var characters = [];
	for (var j = 0; j < charas.length; j++) {
		var character = charas[j];
		if (character.id() == LMvc.selectSeignorId) {
			continue;
		}
		if (generalsCount.feat && character.feat() < generalsCount.feat) {
			continue;
		}
		if (generalsCount.force && character.force() < generalsCount.force) {
			continue;
		}
		if (generalsCount.noMaxLoyalty && character.loyalty() >= 100) {
			continue;
		}
		if (generalsCount.basicPropertiesSum && character.basicPropertiesSum() < generalsCount.basicPropertiesSum) {
			continue;
		}
		characters.push(character);
	}
	if ( typeof generalsCount.from != UNDEFINED && characters.length < generalsCount.from) {
		return false;
	}
	if ( typeof generalsCount.to != UNDEFINED && characters.length > generalsCount.to) {
		return false;
	}
	if (currentEvent.condition.feat_characters) {
		characters = characters.sort(function(a, b) {
			return b.feat() - a.feat();
		});
		currentEvent.feat_characters = characters;
	}
	return true;
}
function checkEventListStopBattle(condition){
	var stopBattle = condition.stopBattle;
	if (stopBattle) {
		for (var j = 0; j < stopBattle.length; j++) {
			var seignior1 = stopBattle[j][0];
			var seignior2 = stopBattle[j][1];
			var seignior = SeigniorModel.getSeignior(seignior1);
			if (!seignior.isStopBattle(seignior2)) {
				return false;
			}
		}
	}
	return true;
}
function checkEventListCitys(condition){
	var citys = condition.citys;
	for (var j = 0; j < citys.length; j++) {
		var city = citys[j];
		var cityModel = AreaModel.getArea(city.id);
		if ( typeof city.seignior == "number") {
			if (cityModel.seigniorCharaId() != city.seignior) {
				return false;
			}
		} else {
			var index = city.seignior.findIndex(function(child) {
				return child === cityModel.seigniorCharaId();
			});
			if (index < 0) {
				return false;
			}
		}
	}
	var cityCount = condition.cityCount;
	if (cityCount) {
		for (var j = 0; j < cityCount.length; j++) {
			var child = cityCount[j];
			var seigniorId = child.id ? child.id : LMvc.selectSeignorId;
			var seignior = SeigniorModel.getSeignior(seigniorId);
			var areas = seignior.areas();
			var areaCount = areas.length;
			if (typeof child.maxDefense != UNDEFINED) {
				areaCount = 0;
				var maxDefValue = AreaModel.defenseList[AreaModel.defenseList.length - 1];
				for (var k = 0; k < areas.length; k++) {
					var area = areas[k];
					if (child.maxDefense && area.cityDefense() < maxDefValue) {
						continue;
					}
					areaCount++;
				}
			}
			if (( typeof child.from != UNDEFINED && areaCount < child.from) || ( typeof child.to != UNDEFINED && areaCount > child.to)) {
				return false;
			}
		}
	}
	return true;
}
function checkEventListGenerals(condition){
	var generals = condition.generals;
	for (var j = 0; j < generals.length; j++) {
		var general = generals[j];
		var character = CharacterModel.getChara(general.id);
		if (character.seigniorId() != general.seignior) {
				return false;
		}
		if (general.cityId) {
			if (Array.isArray(general.cityId)) {
				if (general.cityId.indexOf(character.cityId()) < 0) {
					return false;
				}
			} else {
				if (character.cityId() != general.cityId) {
					return false;
				}
			}
		}
		if (general.captive) {
			var city = character.city();
			if (!city || city.seigniorCharaId() != general.captive) {
				return false;
			}
			var captives = city.captives();
			var index = captives.findIndex(function(child) {
				return child.id() == general.id;
			});
			if (index < 0) {
				return false;
			}
		}
	}
	return true;
}
function checkEventListSeignor(condition){
	if (Array.isArray(condition.seignior)) {
		if (condition.seignior.indexOf(LMvc.selectSeignorId) < 0) {
			return false;
		}
	} else if (condition.seignior > 0 && LMvc.selectSeignorId != condition.seignior) {
		return false;
	}
	if (Array.isArray(condition.noSeignior)) {
		if (condition.noSeignior.indexOf(LMvc.selectSeignorId) >= 0) {
			return false;
		}
	} else if (condition.noSeignior > 0 && LMvc.selectSeignorId == condition.noSeignior) {
		return false;
	}
	return true;
}
function checkEventListTimeIn(condition){
	if(typeof condition.from == UNDEFINED || typeof condition.to == UNDEFINED){
		return true;
	}
	var month = LMvc.chapterData.month;
	var year = LMvc.chapterData.year;
	var from = condition.from.year * 12 + condition.from.month;
	var to = condition.to.year * 12 + condition.to.month;
	var now = LMvc.chapterData.year * 12 + LMvc.chapterData.month;
	return (from <= now && to >= now);
}
function getEventListTreasure(condition){
	var treasureObj = condition.treasure;
	if(typeof treasureObj == UNDEFINED){
		return true;
	}
	var itemMax = 0, itemCount = 0;
	for(var i=0;i<ItemDatas.length;i++){
		var child = ItemDatas[i];
		if(!child.stamp || child.type != ItemType.EQUIPMENT){
			continue;
		}
		itemMax++;
		if(LMvc.chapterData["treasure_" + child.id]){
			itemCount++;
		}
	}
	var averageTreasure = itemCount / itemMax;
	if (( typeof treasureObj.from != UNDEFINED && treasureObj.from > averageTreasure) || 
		( typeof treasureObj.to != UNDEFINED && treasureObj.to < averageTreasure)) {
		return false;
	}
	return true;
}
function getEventListTechnology(condition){
	var technologyObj = condition.technology;
	if(typeof technologyObj == UNDEFINED){
		return true;
	}
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var areas = seignior.areas();
	var averageTechnology = 0;
	for (var i = 0, l = areas.length; i < l; i++) {
		averageTechnology += (areas[i].technology() / areas[i].maxTechnology());
	}
	averageTechnology = averageTechnology / areas.length;
	if (( typeof technologyObj.from != UNDEFINED && technologyObj.from > averageTechnology) || 
		( typeof technologyObj.to != UNDEFINED && technologyObj.to < averageTechnology)) {
		return false;
	}
	return true;
}
function getEventListAgriculture(condition){
	var agricultureObj = condition.agriculture;
	if(typeof agricultureObj == UNDEFINED){
		return true;
	}
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var areas = seignior.areas();
	var averageAgriculture = 0;
	for (var i = 0, l = areas.length; i < l; i++) {
		averageAgriculture += (areas[i].agriculture() / areas[i].maxAgriculture());
	}
	averageAgriculture = averageAgriculture / areas.length;
	if (( typeof agricultureObj.from != UNDEFINED && agricultureObj.from > averageAgriculture) || 
		( typeof agricultureObj.to != UNDEFINED && agricultureObj.to < averageAgriculture)) {
		return false;
	}
	return true;
}
function getEventListBusiness(condition){
	var businessObj = condition.business;
	if(typeof businessObj == UNDEFINED){
		return true;
	}
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var areas = seignior.areas();
	var averageBusiness = 0;
	for (var i = 0, l = areas.length; i < l; i++) {
		averageBusiness += (areas[i].business() / areas[i].maxBusiness());
	}
	averageBusiness = averageBusiness / areas.length;
	if (( typeof businessObj.from != UNDEFINED && businessObj.from > averageBusiness) || 
		( typeof businessObj.to != UNDEFINED && businessObj.to < averageBusiness)) {
		return false;
	}
	return true;
}
function getEventListPolice(condition){
	var policeObj = condition.police;
	if(typeof policeObj == UNDEFINED){
		return true;
	}
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var areas = seignior.areas();
	var averagePolice = 0;
	for (var i = 0, l = areas.length; i < l; i++) {
		var police = areas[i].police();
		averagePolice += police;
	}
	averagePolice = averagePolice / areas.length;
	if (( typeof policeObj.from != UNDEFINED && policeObj.from > averagePolice) || 
		( typeof policeObj.to != UNDEFINED && policeObj.to < averagePolice)) {
		return false;
	}
	return true;
}
function getEventListBehead(condition){
	var behead = condition.behead;
	if (behead) {
		var hasBehead = LMvc.chapterData.behead ? LMvc.chapterData.behead : 0;
		if (behead.from && hasBehead <= behead.from) {
			return false;
		} else if (behead.to && hasBehead >= behead.to) {
			return false;
		}
	}
	return true;
}
function checkEventListConditionRevival(currentEvent, tribeSeignior){
	var condition = currentEvent.condition;
	if ( typeof condition.conditionRevival == UNDEFINED) {
		return true;
	}
	var conditionRevival = condition.conditionRevival;
	var isTribeOk = (typeof condition.tribe == UNDEFINED || condition.tribe.indexOf(tribeSeignior) >= 0);
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var areas = seignior.areas();
	var technologySum = 0;
	var businessSum = 0;
	var agricultureSum = 0;
	var policeSum = 0;
	for(var j=0;j<areas.length;j++){
		var area = areas[j];
		technologySum += area.technology();
		businessSum += area.business();
		agricultureSum += area.agriculture();
		policeSum += area.police();
	}
	var technologyMax = AreaModel.agricultureList[AreaModel.agricultureList.length - 1];
	var businessMax = AreaModel.businessList[AreaModel.businessList.length - 1];
	var agricultureMax = AreaModel.technologyList[AreaModel.technologyList.length - 1];
	var internalAffairsOk = (technologySum >= technologyMax * areas.length * 0.5 && 
		businessSum >= businessMax * areas.length * 0.5 && 
		agricultureSum >= agricultureMax * areas.length * 0.5 && 
		policeSum >= 100 * areas.length * 0.8);
	var isConditionRevivalOk = (isTribeOk && internalAffairsOk);
	if((conditionRevival && !isConditionRevivalOk) || (!conditionRevival && isConditionRevivalOk)){
		return false;
	}
	return true;
}
function checkEventListRevival(currentEvent){
	var condition = currentEvent.condition;
	if ( typeof condition.revival == UNDEFINED) {
		return true;
	}
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var seigniorName = seignior.name();
	var lastName = seigniorName.substring(0, 1);
	var isLastNameOk = (lastName == "刘" || lastName == "劉");
	var charas = seignior.generals();
	var isSubordinatesOk = false;
	for (var j = 0; j < charas.length; j++) {
		var character = charas[j];
		if (character.id() == LMvc.selectSeignorId) {
			continue;
		}
		lastName = character.name().substring(0, 1);
		if (lastName == "刘" || lastName == "劉") {
			if(character.loyalty() < 100){
				isSubordinatesOk = false;
				break;
			}else{
				isSubordinatesOk = true;
			}
		}
	}
	var isRevival = (isLastNameOk && isSubordinatesOk);
	if(currentEvent.condition.revival && !isRevival){
		return false;
	}else if(!currentEvent.condition.revival && isRevival){
		return false;
	}
	return true;
}
function dispatchEventList(currentEvent) {
	var script = "";
	var params = [];
	params.push({
		n : "id0",
		v : LMvc.selectSeignorId
	});
	params.push({
		n : "name0",
		v : SeigniorModel.getSeignior(LMvc.selectSeignorId).character().name()
	});
	if (currentEvent.feat_characters && SeigniorExecute.running) {
		for (var i = 0, l = currentEvent.condition.generalsCount.from; i < l; i++) {
			var character = currentEvent.feat_characters[i];
			params.push({
				n : "id" + (i + 1),
				v : character.id()
			});
			params.push({
				n : "name" + (i + 1),
				v : character.name()
			});
			currentEvent.result[0].generals.push(character.id());
		}
	} else if (currentEvent.condition.clear) {
		var charas, index;
		//小人
		charas = [618, 619], index = 0;
		for (var i = 0; i < charas.length; i++) {
			if (charas.length == LMvc.selectSeignorId) {
				continue;
			}
			params.push({
				n : "xiaoren" + (index++),
				v : charas[i]
			});
		}
		//美女
		charas = [380, 524, 548], index = 0;
		for (var i = 0; i < charas.length; i++) {
			if (charas.length == LMvc.selectSeignorId) {
				continue;
			}
			params.push({
				n : "meinv" + (index++),
				v : charas[i]
			});
		}
		//四方诸侯
		charas = [2, 3, 5, 10, 39], index = 0;
		for (var i = 0; i < charas.length; i++) {
			if (charas.length == LMvc.selectSeignorId) {
				continue;
			}
			params.push({
				n : "zhuhou" + (index++),
				v : charas[i]
			});
		}
		//司马后人 司马炎70
		var id_sima = 70, name_sima;
		var chara = CharacterModel.getChara(id_sima);
		if(!chara.seigniorId()){
			name_sima = chara.name();
		}else{
			eval( "var wordRandomSima=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
			name_sima = "司马" + wordRandomSima;
		}
		params.push({n : "id_sima", v : id_sima});
		params.push({n : "name_sima", v : name_sima});
	}
	LPlugin.SetData("event_params_" + currentEvent.id, params);
	if (params && params.length) {
		for (var i = 0; i < params.length; i++) {
			var param = params[i];
			script += String.format("Var.set({0},{1});", param.n, param.v);
		}
	}
	var path = String.format(currentEvent.script, LPlugin.language());
	script += "SGJEvent.init();";
	script += "Load.script(" + path + ");";
	script += "SGJEvent.dispatchEventListResult(" + currentEvent.id + ");";
	script += "SGJEvent.end();";
	LGlobal.script.addScript(script);
}

function dispatchEventListResult(eventId, currentEvent) {
	if (eventId) {
		currentEvent = EventListConfig.find(function(child) {
			return child.id == eventId;
		});
	}
	for (var i = 0, l = currentEvent.result.length; i < l; i++) {
		var child = currentEvent.result[i];
		//console.log("dispatchEventListResult .type="+child.type);
		switch(child.type) {
			case "stopBattle":
				//停战
				dispatchEventListResultStopBattle(child);
				break;
			case "changeSeignior":
				//武将势力变更
				dispatchEventListResultChangeSeignior(child);
				break;
			case "reputation":
				//称号
				dispatchEventListResultReputation(child);
				break;
			case "moveGeneralsToCity":
				//武将移动到城池
				dispatchEventListResultMoveGeneralsToCity(child);
				break;
			case "moveCityResources":
				//资源移动
				dispatchEventListResultMoveCityResources(child);
				break;
			case "changeCitySeignior":
				//城池势力变更
				dispatchEventListResultChangeCitySeignior(child);
				break;
			case "changeCityResources":
				//资源变更
				dispatchEventListResultChangeCityResources(child);
				break;
			case "generalsDie":
				//武将死亡
				dispatchEventListResultGeneralsDie(child);
				break;
			case "monarchDie":
				//君主死亡
				dispatchEventListResultMonarchDie(child);
				break;
			case "captiveDie":
				//处死俘虏
				dispatchEventListResultCaptiveDie(child);
				break;
			case "moveGeneralsToSeignior":
				//武将移动到势力
				dispatchEventListResultMoveGeneralsToSeignior(child);
				break;
			case "seigniorToSeignior":
				//势力归属到另一势力
				dispatchEventListResultSeigniorToSeignior(child);
				break;
			case "changePrefecture":
				//太守变更
				dispatchEventListResultChangePrefecture(child);
				break;
			case "gameClear":
				//游戏通关
				dispatchEventListResultGameClear(child);
				break;
			case "generalsStopInCity":
				//强制武将停留在某个城池
				dispatchEventListResultGeneralsStopInCity(child);
		}
	}
	if (eventId) {
		LGlobal.script.analysis();
	}
}

function dispatchEventListResultGameClear(child) {
	SeigniorExecute.running = false;
	MenuController.instance().nextFrameExecute(function() {
		MenuController.instance().view.onClickReturnTop();
	});
}

function dispatchEventListResultGeneralsStopInCity(child) {
	for (var i = 0, l = child.generals.length; i < l; i++) {
		var general = CharacterModel.getChara(child.generals[i]);
		general.stopIn(child.cityId);
	}
}

function dispatchEventListResultCaptiveDie(child) {
	for (var i = 0, l = child.captives.length; i < l; i++) {
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
	if (!seigniorFrom) {
		return;
	}
	var seigniorTo = SeigniorModel.getSeignior(child.to);
	var citys = seigniorFrom.areas().concat();
	for (var i = 0, l = citys.length; i < l; i++) {
		var city = citys[i];
		var generals = city.generals();
		for (var j = 0, jl = generals.length; j < jl; j++) {
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
	if (!seignior || !seignior.chara_id()) {
		for (var i = 0, l = child.generals.length; i < l; i++) {
			var general = CharacterModel.getChara(child.generals[i]);
			general.toOutOfOffice();
		}
		return;
	}
	var seigniorChara = CharacterModel.getChara(child.to);
	for (var i = 0, l = child.generals.length; i < l; i++) {
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
	for (var i = 0, l = child.newMonarch.length; i < l; i++) {
		var character = CharacterModel.getChara(child.newMonarch[i]);
		if (character.seigniorId() == child.monarch) {
			monarchChange(child.monarch, character.id());
			break;
		}
	}
	GameCacher.resetAreaMap("area-map-1");
	LMvc.MapController.view.areaLayerInit();
}

function dispatchEventListResultGeneralsDie(child) {
	for (var i = 0, l = child.generals.length; i < l; i++) {
		var general = CharacterModel.getChara(child.generals[i]);
		var city = general.city();
		var prefecture = city.prefecture();
		var prefectureDie = (prefecture == general.id());
		general.toDie();
		if (prefectureDie) {
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
	var condition = child.condition;
	if (condition) {
		if (condition.seignior && city.seigniorCharaId() != condition.seignior) {
			return;
		}
	}
	if (city.seigniorCharaId() == child.seignior) {
		return;
	}
	var fromSeignior = city.seignior();
	var fromCitys = [];
	if (fromSeignior) {
		fromCitys = fromSeignior.areas();
	}
	if (fromCitys.length == 1) {
		return;
	}
	var generals = city.generals();
	if (generals.length > 0) {
		var canMoveCitys = [];
		for (var i = 0, l = fromCitys.length; i < l; i++) {
			if (fromCitys[i].id() != child.cityId) {
				canMoveCitys.push(fromCitys[i]);
			}
		}
		while (generals.length > 0) {
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
	var proportion = (child.proportion && child.proportion <= 1) ? child.proportion : 1;
	var food = fromCity.food() * proportion >>> 0;
	var money = fromCity.money() * proportion >>> 0;
	var troops = fromCity.troops() * proportion >>> 0;
	toCity.food(food);
	toCity.money(money);
	toCity.troops(toCity.troops() + troops);
	fromCity.food(-food);
	fromCity.money(-money);
	fromCity.troops(fromCity.troops() - troops);
}

function dispatchEventListResultMoveGeneralsToCity(child) {
	var fromCity = AreaModel.getArea(child.from);
	var toCity = AreaModel.getArea(child.to);
	var condition = child.condition;
	if (condition) {
		if (condition.fromSeignior && fromCity.seigniorCharaId() != condition.fromSeignior) {
			return;
		}
	}
	var generals = [];
	if (!child.generals || child.generals.length == 0) {
		generals = fromCity.generals().concat();
	} else {
		for (var i = 0; i < child.generals.length; i++) {
			var general = CharacterModel.getChara(child.generals[i]);
			generals.push(general);
		}
	}
	for (var i = 0, l = generals.length; i < l; i++) {
		var general = generals[i];
		if (general.seigniorId() != toCity.seigniorCharaId()) {
			continue;
		}
		general.moveTo(child.to);
		general.moveTo();
	}
}

function dispatchEventListResultReputation(child) {
	var generals = child.generals;
	for (var i = 0, l = generals.length; i < l; i++) {
		var id = generals[i];
		var character = CharacterModel.getChara(id);
		if (!character.data.reputation) {
			character.data.reputation = [];
		}
		if (character.data.reputation.indexOf(child.reputation) >= 0) {
			return;
		}
		character.data.reputation.push(child.reputation);
		var reputationModel = ReputationModel.getReputation(child.reputation);
		var soldiers = reputationModel.data.soldiers;
		if (soldiers) {
			for (var j = 0, jl = soldiers.length; j < jl; j++) {
				var reputationSoldier = soldiers[j];
				var soldier = character.soldiers().find(function(child) {
					return child.id() == reputationSoldier.id;
				});
				var proficiency = soldier.proficiency();
				if (proficiency < reputationSoldier.proficiency) {
					soldier.proficiency(reputationSoldier.proficiency);
				}
			}
		}
	}
}

function dispatchEventListResultStopBattle(child) {
	var seigniors = child.seigniors;
	var condition = child.condition;
	if (condition) {
		if (condition.noSeignior) {
			if (condition.noSeignior.indexOf(LMvc.selectSeignorId) >= 0) {
				return;
			}
		}
	}
	var month = child.month;
	for (var i = 0, l = seigniors.length; i < l; i++) {
		var iId = seigniors[i];
		var seignior = SeigniorModel.getSeignior(iId);
		if (!seignior)
			continue;
		for (var j = 0; j < l; j++) {
			var jId = seigniors[j];
			if (iId == jId) {
				continue;
			}
			if (!SeigniorModel.getSeignior(jId))
				continue;
			seignior.stopBattle(jId, month);
		}
	}
}

function dispatchEventListResultChangeSeignior(child) {
	var chara;
	AreaModel.removeNotDebut(child.id);
	var character = CharacterModel.getChara(child.id);
	if (chara && chara.equipments && chara.equipments.length > 0) {
		character.equip(chara.equipments);
	}
	character.seigniorId(child.seignior);
	character.loyalty(child.loyalty);
	character.moveTo(child.city);
	character.moveTo();
}
