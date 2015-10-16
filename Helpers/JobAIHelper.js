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
AiEnlistFlag = {
	None:0,
	Must:1,
	Need:2,
	Battle:3,
	MustResource:4,
	NeedResource:5,
	BattleResource:6,
	Free:7
};
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
	if(areaModel.population() <= areaModel.minPopulation()){
		return false;
	}
	if(areaModel.money() < JobPrice.ENLIST){
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
		
	//self.enlistPrice * enlistCount / EnlistSetting.ENLIST_FROM >>> 0;
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
function jobAiSpy(areaModel,characters){
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiSpy");
}
function jobAiFarmland(areaModel,characters){
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiFarmland");
}
function jobAiDiplomacy(areaModel,characters){
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiDiplomacy");
}
function jobAiGeneralMove(areaModel,characters){
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiGeneralMove");
}
function jobAiTransport(areaModel,characters){
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiTransport");
}
function jobAiTavern(areaModel,characters){
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().areaMessage(areaModel,"{0}在招贤纳士!");
	SeigniorExecute.Instance().msgView.add("jobAiTavern");
}
function jobAiInstitute(areaModel,characters){
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiInstitute");
}
function jobAiMarket(areaModel,characters){
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().msgView.add("jobAiMarket");
}