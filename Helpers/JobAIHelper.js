function jobAiEvent(){
	var month = LMvc.chapterController.getValue("month");
	var year = LMvc.chapterController.getValue("year");
	for(var i=0,l=EventListConfig.length;i<l;i++){
		var eventObject = EventListConfig[i];
		var condition = eventObject.condition;
		if(LMvc.chapterData.eventList.indexOf(eventObject.id) >= 0){
			continue;
		}
		if(!(condition.from.year <= year && condition.from.month <= month && condition.to.year >= year && condition.to.month >= month)){
			continue;
		}
		if(!condition.seignior || LMvc.selectSeignorId != condition.seignior){
			continue;
		}
		var general = condition.generals.find(function(child){
			var chara = CharacterModel.getChara(child.id);
			if(chara.seigniorId() != child.seignior){
				return true;
			}
			if(child.city && chara.cityId() != child.city){
				return true;
			}
			return false;
		});
		if(general){
			continue;
		}
		var city = condition.citys.find(function(child){
			var area = AreaModel.getArea(child.id);
			return area.seigniorCharaId() != child.seignior;
		});
		if(city){
			continue;
		}
		if(!LPlugin.eventIsOpen(eventObject.id)){
			LPlugin.openEvent(eventObject.id);
		}
		LMvc.chapterData.eventList.push(eventObject.id);
		var script = "Load.script("+eventObject.script+");";
		console.log(script);
		LGlobal.script.addScript(script);
		LMvc.MapController.view.visible = false;
		return true;
	}
	return false;
}
/*检索战力最弱城池*/
function getWeakBattleCity(areaModel){
	var neighbors = areaModel.neighbor();
	var enemyCitys = [];
	for(var i = 0;i < neighbors.length;i++){
		var child = AreaModel.getArea(neighbors[i]);
		if(child.seigniorCharaId() != areaModel.seigniorCharaId()){
			enemyCitys.push(child);
		}
	}
	if(enemyCitys.length == 0){
		return null;
	}
	enemyCitys = enemyCitys.sort(function(a,b){return a.powerful() - b.powerful();});
	return enemyCitys[0];
}
/*检索可攻击城池*/
function getCanBattleCity(areaModel,characters,enlistFlag){
	if(enlistFlag == AiEnlistFlag.Must || enlistFlag == AiEnlistFlag.MustResource){
		return null;
	}
	var generalCount = areaModel.generalsSum();
	if(characters.length < BattleMapConfig.DetachmentQuantity || generalCount < BattleMapConfig.DetachmentQuantity * 2 || generalCount - BattleMapConfig.DetachmentQuantity > characters.length){
		return;
	}
	var weakCity = getWeakBattleCity(areaModel);
	if(!weakCity){
		return null;
	}
	var weakCityGeneralCount = weakCity.generalsSum();
	weakCityGeneralCount = weakCityGeneralCount > BattleMapConfig.DefenseQuantity ? BattleMapConfig.DefenseQuantity : weakCityGeneralCount;
	if(characters.length < weakCityGeneralCount * 0.5){
		return null;
	}
	var generals = getPowerfulCharacters(characters);
	var needFood = 0;
	for(var i=0,l=generals.length;i<l && i<BattleMapConfig.AttackQuantity;i++){
		var charaModel = generals[i];
		needFood += charaModel.maxTroops();
	}
	if(areaModel.food() < needFood * 20){
		return null;
	}
	
	return weakCity;
}
function getIdleCharacters(areaModel){
	var charas = [];
	var generals = areaModel.generals();
	for(var i=0;i<generals.length;i++){
		chara = generals[i];
		if(chara.job() == Job.IDLE){
			charas.push(chara);
		}
	}
	return charas;
}
/*出战准备*/
function jobAiToBattle(areaModel,characters,targetCity){
	var attackQuantity = BattleMapConfig.AttackQuantity;
	var generalCount = areaModel.generalsSum();
	if(generalCount - attackQuantity < BattleMapConfig.DetachmentQuantity){
		attackQuantity = generalCount - BattleMapConfig.DetachmentQuantity;
	}
	if(characters.length < attackQuantity){
		attackQuantity = characters.length;
	}
	var generals = getPowerfulCharacters(characters);
	var data = {};
	data.expeditionCharacterList = [];
	var sumTroops = 0;
	for(var i = 0;i<attackQuantity;i++){
		var general = generals[i];
		var index = characters.findIndex(function(child){
			return child.id() == general.id();
		});
		characters.splice(index, 1);
		data.expeditionCharacterList.push(general);
		if(i == 0){
			data.expeditionLeader = general;
		}
		var maxTroops = general.maxTroops();
		sumTroops += maxTroops;
		general.troops(maxTroops);
	}
	data.troops = sumTroops;
	sumTroops = sumTroops + data.troops;
	data.money = areaModel.money() * 0.2;
	data.food = sumTroops * 10;
	areaModel.food(-data.food);
	areaModel.money(-data.money);
	areaModel.troops(areaModel.troops() - sumTroops);
	data.cityId = targetCity.id();
	if(targetCity.seigniorCharaId() == LMvc.selectSeignorId){
		SeigniorExecute.Instance().stop = true;
		//TODO::进入战斗
		var attackSeignior = areaModel.seignior();
		SeigniorExecute.Instance().msgView.add(String.format("{0}的{1}向{2}的{3}发起进攻了!",attackSeignior.character().name(),areaModel.name(),"我军",targetCity.name()));
		
		return;
	}
	jobAiBattleExecute(areaModel,data,targetCity);
}
/*AI之间自动战斗*/
function jobAiBattleExecute(areaModel,data,targetCity){
	var attackSeignior = areaModel.seignior();
	var defSeignior = targetCity.seignior();
	SeigniorExecute.Instance().msgView.add(String.format("{0}的{1}向{2}的{3}发起进攻了!",attackSeignior.character().name(),areaModel.name(),defSeignior.character().name(),targetCity.name()));
}
function jobAiNeedToEnlist(areaModel){
	if(areaModel.troops() >= areaModel.maxTroops()){
		return AiEnlistFlag.Node;
	}
	var charas = getDefenseEnemiesFromCity(areaModel);
	var minToops = 0;
	for(var i = 0,l=charas.length;i<l;i++){
		var chara = charas[i];
		minToops += chara.maxTroops();
	}
	if(areaModel.troops() < minToops){ 
		return AiEnlistFlag.Must ;
	}
	if(areaModel.agriculture() < areaModel.maxAgriculture()*0.3 || areaModel.business() < areaModel.maxBusiness()*0.3 || areaModel.cityDefense() < areaModel.maxCityDefense()*0.3){
		return AiEnlistFlag.MustResource;
	}
	if(areaModel.troops() < minToops * 2){
		return AiEnlistFlag.Need;
	}
	if(areaModel.agriculture() < areaModel.maxAgriculture()*0.6 || areaModel.business() < areaModel.maxBusiness()*0.6 || areaModel.cityDefense() < areaModel.maxCityDefense()*0.6){
		return AiEnlistFlag.NeedResource;
	}
	if(areaModel.troops() < minToops * 3){
		return AiEnlistFlag.Battle;
	}
	if(areaModel.agriculture() < areaModel.maxAgriculture() || areaModel.business() < areaModel.maxBusiness() || areaModel.cityDefense() < areaModel.maxCityDefense()){
		return AiEnlistFlag.BattleResource;
	}
	return AiEnlistFlag.Free;
}
function jobAiCanToEnlish(areaModel){
	if(areaModel.population() <= areaModel.minPopulation() || areaModel.money() < JobPrice.ENLIST){
		return false;
	}
	return true;
}
function jobAiToEnlish(areaModel,characters){
	if(characters.length == 0){
		return;
	}
	if(areaModel.money() < JobPrice.ENLIST){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiToEnlish");
	var character = characters.shift();
	var num = EnlistSetting.ENLIST_TO - EnlistSetting.ENLIST_FROM;
	var cost = JobPrice.ENLIST * EnlistSetting.ENLIST_TO / EnlistSetting.ENLIST_FROM >>> 0;
	if(areaModel.money() < cost){
		num = (EnlistSetting.ENLIST_TO - EnlistSetting.ENLIST_FROM)*0.7;
		cost = JobPrice.ENLIST * (EnlistSetting.ENLIST_FROM + num) / EnlistSetting.ENLIST_FROM >>> 0;
	}
	if(areaModel.money() < cost){
		num = (EnlistSetting.ENLIST_TO - EnlistSetting.ENLIST_FROM)*0.3;
		cost = JobPrice.ENLIST * (EnlistSetting.ENLIST_FROM + num) / EnlistSetting.ENLIST_FROM >>> 0;
	}
	if(areaModel.money() < cost){
		num = 0;
		cost = JobPrice.ENLIST;
	}
	areaModel.money(-cost);
	character.enlist(EnlistSetting.ENLIST_FROM + num);
}
function jobAiSpy(areaModel,characters){//谍报
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiSpy");
}
function jobAiDiplomacy(areaModel,characters){//外交
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiDiplomacy");
}
function jobAiTavern(areaModel,characters){//录用
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().areaMessage(areaModel,"{0}在招贤纳士!");
	var outOfOfficeCharas = areaModel.outOfOffice();
	if(outOfOfficeCharas.length == 0){
		return;
	}
	var character = characters.shift();
	var hireCharacterIndex = Math.random()*outOfOfficeCharas.length >>> 0;
	character.hire(outOfOfficeCharas[hireCharacterIndex].id());
}
function jobAiAccess(areaModel,characters){//访问
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().areaMessage(areaModel,"{0}在招贤纳士!");
	jobAiInternal(areaModel,characters,0,Job.ACCESS);
}
function jobAiInstitute(areaModel,characters){//技术
	jobAiInternal(areaModel,characters,JobPrice.TECHNOLOGY,Job.TECHNOLOGY);
}
function jobAiFarmland(areaModel,characters){//农业
	jobAiInternal(areaModel,characters,JobPrice.AGRICULTURE,Job.AGRICULTURE);
}
function jobAiMarket(areaModel,characters){//商业
	jobAiInternal(areaModel,characters,JobPrice.BUSINESS,Job.BUSINESS);
}
function jobAiFarmlandExplore(areaModel,characters){//农地探索
	jobAiInternal(areaModel,characters,0,Job.EXPLORE_AGRICULTURE);
}
function jobAiMarketExplore(areaModel,characters){//市场探索
	jobAiInternal(areaModel,characters,0,Job.EXPLORE_BUSINESS);
}
function jobAiPolice(areaModel,characters){//治安
	jobAiInternal(areaModel,characters,JobPrice.POLICE,Job.POLICE);
}
function jobAiRepair(areaModel,characters){//修补
	jobAiInternal(areaModel,characters,JobPrice.REPAIR,Job.REPAIR);
}
function jobAiInternal(areaModel,characters,price,job){//内政
	if(characters.length == 0){
		return;
	}
	if(price > 0 && areaModel.money() < price){
		return;
	}
	SeigniorExecute.Instance().areaMessage(areaModel,"{0}在发展内政!");
	var character = characters.shift();
	character.job(job);
	if(price > 0){
		areaModel.money(-price);
	}
}
function jobAiSetCityBattleDistance(seigniorModel){
	var areas = seigniorModel.areas();
	areas.forEach(function(area){
		area.battleDistanceCheckOver = false;
		area.battleDistance = 100;
		area.aiWillComeNum = 0;
	});
	for(var i=0,l=areas.length;i<l;i++){
		var area = areas[i];
		if(area.battleDistanceCheckOver){
			continue;
		}
		var neighbors = areaModel.neighbor();
		var enemyNear = 0;
		var neighborCitys = [];
		for(var i = 0;i < neighbors.length;i++){
			var child = AreaModel.getArea(neighbors[i]);
			if(child.seigniorCharaId() != areaModel.seigniorCharaId()){
				enemyNear += 1;
			}else{
				neighborCitys.push(child);
			}
		}
		var distance = -enemyNear * 0.1;
		if(area.battleDistance > distance){
			area.battleDistance = distance;
		}
		distance += 1;
		for(var i = 0;i < neighborCitys.length;i++){
			var child = neighborCitys[i];
			if(child.battleDistance > distance){
				child.battleDistance = distance;
			}
		}
	}
}
function jobAiGeneralMove(areaModel,characters){//武将移动
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiGeneralMove");
	var nowGeneralSum = areaModel.aiWillComeNum + areaModel.generalsSum();
	if(nowGeneralSum <= 1){
		return;
	}
	var neighbors = areaModel.neighbor();
	var citys = [];
	var battleDistance = 100;
	var currentCity, currentGeneralSum = 100;
	for(var i = 0;i < neighbors.length;i++){
		var child = AreaModel.getArea(neighbors[i]);
		if(child.seigniorCharaId() != areaModel.seigniorCharaId()){
			continue;
		}
		var childGeneralSum = child.generalsSum() + child.aiWillComeNum;
		if(nowGeneralSum < childGeneralSum){
			continue;
		}
		if(child.battleDistance < battleDistance || (child.battleDistance == battleDistance && childGeneralSum < currentGeneralSum)){
			citys = [child];
			battleDistance = child.battleDistance;
			currentCity = child;
			currentGeneralSum = childGeneralSum;
		}else if(child.battleDistance == battleDistance && childGeneralSum == currentGeneralSum){
			citys.push(child);
		}
	}
	if(citys.length == 0 || citys[0].battleDistance > areaModel.battleDistance){
		return;
	}
	var targetCity = citys[citys.length * Math.random() >>> 0];
	var generals = getPowerfulCharacters(characters);
	var index = characters.findIndex(function(child){
		return child.id() == generals[0].id();
	});
	var character = characters[index];
	characters.splice(index, 1);
	areaModel.aiWillComeNum--;
	targetCity.aiWillComeNum++;
	character.moveTo(targetCity.id());
}
function jobAiTransport(areaModel,characters){//运输物资
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiTransport");
	var neighbors = areaModel.neighbor();
	var battleDistance = 100;
	var currentCity;
	for(var i = 0;i < neighbors.length;i++){
		var child = AreaModel.getArea(neighbors[i]);
		if(child.seigniorCharaId() != areaModel.seigniorCharaId()){
			return;
		}
		if(child.battleDistance > areaModel.battleDistance){
			continue;
		}
		if(child.battleDistance < battleDistance){
			battleDistance = child.battleDistance;
			currentCity = child;
		}
	}
	if(!currentCity){
		return;
	}
	var charas = getDefenseEnemiesFromCity(areaModel);
	var minToops = 0;
	for(var i = 0,l=charas.length;i<l;i++){
		var chara = charas[i];
		minToops += chara.maxTroops();
	}
	var troops = areaModel.troops() - minToops*3;
	troops = troops < minToops ? 0 : troops;
	var food = areaModel.food() - minToops * 30;
	food = food < minToops * 10 ? 0 : food;
	var money = areaModel.money() - 10000;
	money = money < 5000 ? 0 : money;
	if(moveTroops == 0 && food == 0 && money == 0){
		return;
	}
	var data = {
		cityId : currentCity.id(),
		money : money,
		food : food,
		troops : troops
	};
	var index = characters.length * Math.random() >>> 0;
	var character = characters[index];
	characters.splice(index, 1);
	characterModel.transport(data);
}