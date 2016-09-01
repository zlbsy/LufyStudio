function jobAiEvent(){
	return checkEventList();
}
/*检索战力最弱城池*/
function getWeakBattleCity(areaModel){
	//console.log("getWeakBattleCity :: 检索战力最弱城池");
	var neighbors = areaModel.neighbor();
	var enemyCitys = [];
	for(var i = 0;i < neighbors.length;i++){
		var child = AreaModel.getArea(neighbors[i]);
		if(SeigniorExecute.Instance().eventCitys.indexOf(neighbors[i])>=0){
			continue;
		}
		if(child.seigniorCharaId() != areaModel.seigniorCharaId() && !areaModel.seignior().isStopBattle(child.seigniorCharaId())){
			enemyCitys.push(child);
		}
	}
	if(enemyCitys.length == 0){
		return null;
	}
	enemyCitys = enemyCitys.sort(function(a,b){
		return a.powerful() - b.powerful();
	});
	return enemyCitys[0];
}
/*检索可攻击城池*/
function getCanBattleCity(areaModel,baseCharacters,enlistFlag){
	switch (enlistFlag) {
		case AiEnlistFlag.None://爆满
		case AiEnlistFlag.Free://充足
			break;
		case AiEnlistFlag.NeedResource://物资短缺
		case AiEnlistFlag.Battle://战斗准备征兵
		case AiEnlistFlag.BattleResource://战斗准备物资
			var ambition, maxAmbition = 15;
			var seigniorCharaId = areaModel.seigniorCharaId();
			if(seigniorCharaId == LMvc.selectSeignorId){
				if(areaModel.isAppoint() && areaModel.appointType() == AppointType.AppointMilitary){
					var prefectureChara = CharacterModel.getChara(areaModel.prefecture());
					var basicPropertiesSum = prefectureChara.basicPropertiesSum();
					ambition = maxAmbition * basicPropertiesSum / 500;
				}else{
					ambition = 0;
				}
			}else{
				ambition = areaModel.seignior().character().ambition();
			}
			var numAmbition = maxAmbition - ambition;
			var p = numAmbition / maxAmbition;
			if(enlistFlag == AiEnlistFlag.NeedResource){
				if(Math.fakeRandom() < 0.8 + 0.2 * p){
					return null;
				}
			}
			if(Math.fakeRandom() < p){
				return null;
			}
			break;
		case AiEnlistFlag.Must://必须征兵
		case AiEnlistFlag.Need://需要征兵
		case AiEnlistFlag.MustResource://物资极缺
		default:
			return null;
	}
	var characters = [];
	for (var i = 0, l=baseCharacters.length; i < l; i++) {
		var chara = baseCharacters[i];
		if(chara.stopIn() == areaModel.id()){
			continue;
		}
		characters.push(chara);
	}
	var generalCount = areaModel.generalsSum();
	if(characters.length < BattleMapConfig.DetachmentQuantity || generalCount < BattleMapConfig.DetachmentQuantity * 2){
		return null;
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
	var generals = AreaModel.getPowerfulCharacters(characters);
	var needFood = 0;
	for(var i=0,l=generals.length;i<l && i<BattleMapConfig.AttackQuantity;i++){
		var charaModel = generals[i].general;
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
function jobAiToBattle(areaModel,baseCharacters,targetCity){
	//targetCity = AreaModel.getArea(22);//TODO::测试用
	var attackQuantity = BattleMapConfig.AttackQuantity;
	var generalCount = areaModel.generalsSum();
	if(generalCount - attackQuantity < BattleMapConfig.DetachmentQuantity){
		attackQuantity = generalCount - BattleMapConfig.DetachmentQuantity;
	}
	var characters = [];
	for (var i = 0, l=baseCharacters.length; i < l; i++) {
		var chara = baseCharacters[i];
		if(chara.stopIn() == areaModel.id()){
			continue;
		}
		characters.push(chara);
	}
	if(characters.length < attackQuantity){
		attackQuantity = characters.length;
	}
	var generals = AreaModel.getPowerfulCharacters(characters);
	var data = {};
	data.fromCity = areaModel;
	data.attackFlag = 1;
	data.expeditionCharacterList = [];
	for(var i = 0;i<attackQuantity;i++){
		var general = generals[i].general;
		var index = characters.findIndex(function(child){
			return child.id() == general.id();
		});
		characters.splice(index, 1);
		data.expeditionCharacterList.push(general);
		if(i == 0){
			data.expeditionLeader = general;
		}
		var maxTroops = general.maxTroops();
		general.troops(maxTroops);
		areaModel.troops(areaModel.troops() - maxTroops);
	}
	var selfNoAppoints = [];
	if(data.expeditionCharacterList.length < BattleMapConfig.AttackQuantity){
		var neighbor = areaModel.neighbor();
		neighbor = neighbor.sort(function(){
			return Math.fakeRandom()>0.5?1:-1;
		});
		
		for(var i=0;i<neighbor.length;i++){
			var city = AreaModel.getArea(neighbor[i]);
			if(city.seigniorCharaId() != areaModel.seigniorCharaId() || city.id() == areaModel.id()){
				continue;
			}else if(city.seigniorCharaId() == LMvc.selectSeignorId){
				if(!city.isAppoint()){
					selfNoAppoints.push(city);
					continue;
				}
			}
			generals = getBattleReinforcement(city, data.expeditionCharacterList.length, BattleMapConfig.AttackQuantity);
			data.expeditionCharacterList = data.expeditionCharacterList.concat(generals);
		}
	}
	if(data.expeditionCharacterList.length < BattleMapConfig.AttackQuantity && selfNoAppoints.length > 0){
		SeigniorExecute.Instance().stop = true;
		//进入战斗
		var attackSeignior = areaModel.seignior();
		//{0}的{1}向{2}的{3}发起进攻了!要从其它城池调派援兵吗？
		var msg = String.format(Language.get("to_attack_seignior_city_reinforcement"),Language.get("belong_self"),areaModel.name(),targetCity.seignior().character().name(),targetCity.name());
		var obj = {title:Language.get("confirm"),message:msg,height:200
		,okEvent:function(event){
			event.currentTarget.parent.remove();
			SeigniorExecute.Instance().backLayer.visible = false;
			LMvc.MapController.showCity(targetCity.id(), function(){
				var build = LMvc.CityController.view.showBuildView("expedition");
				build.characterListType = CharacterListType.EXPEDITION_REINFORCEMENT;
				LMvc.CityController.setValue("cityData",areaModel);
				LMvc.CityController.setValue("toCity",targetCity);
				LMvc.CityController.setValue("expeditionOutData",data);
				var generals = [];
				for(var i=0;i<selfNoAppoints.length;i++){
					var city = selfNoAppoints[i];
					generals = generals.concat(city.generals());
				}
				LMvc.CityController.loadCharacterList(CharacterListType.EXPEDITION_REINFORCEMENT, generals, {buttonLabel:"execute", showArm:true,cutoverName:"arm_properties"});
			});
		},cancelEvent:function(event){
			event.currentTarget.parent.remove();
			jobAiToBattleTarget(areaModel,targetCity,data);
		}};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	jobAiToBattleTarget(areaModel,targetCity,data);
}
/*出战准备*/
function jobAiToBattleTarget(areaModel,targetCity,data){
	var sumTroops = 0;
	for(var i = 0;i<data.expeditionCharacterList.length;i++){
		var general = data.expeditionCharacterList[i];
		sumTroops += general.troops();
	}
	data.troops = sumTroops*0.5 >>> 0;
	sumTroops = sumTroops + data.troops;
	data.money = areaModel.money() * 0.2 >>> 0;
	//带15回合粮食
	data.food = sumTroops * 15;
	areaModel.food(-data.food);
	areaModel.money(-data.money);
	areaModel.troops(areaModel.troops() - data.troops);
	data.cityId = targetCity.id();
	data.toCity = targetCity;
	if(targetCity.seigniorCharaId() == LMvc.selectSeignorId && !targetCity.isAppoint() && (targetCity.troops() > 0 && targetCity.generals().length > 0)){
		SeigniorExecute.Instance().stop = true;
		//进入战斗
		var attackSeignior = areaModel.seignior();
		//{0}的{1}向{2}的{3}发起进攻了!
		var msg = String.format(Language.get("to_attack_seignior_city"),attackSeignior.character().name(),areaModel.name(),Language.get("belong_self"),targetCity.name());
		msg += "\n"+String.format(Language.get("attack_intelligence_enemy"),data.troops*3,data.expeditionCharacterList.length);
		var obj = {title:Language.get("confirm"),message:msg,width:340,height:300
		,okEvent:function(event){
			event.currentTarget.parent.remove();
			SeigniorExecute.Instance().backLayer.visible = false;
			LMvc.MapController.showCity(targetCity.id(), function(){
				var build = LMvc.CityController.view.showBuildView("expedition");
				build.characterListType = CharacterListType.EXPEDITION;
				LMvc.CityController.setValue("cityData",areaModel);
				LMvc.CityController.setValue("toCity",targetCity);
				LMvc.CityController.setValue("expeditionEnemyData",data);
				var neighbor = targetCity.neighbor();
				var generals = [];
				generals = generals.concat(targetCity.generals());
				for(var i=0;i<neighbor.length;i++){
					var city = AreaModel.getArea(neighbor[i]);
					if(city.id() == targetCity.id() || city.seigniorCharaId() != LMvc.selectSeignorId){
						continue;
					}
					generals = generals.concat(city.generals());
				}
				var employs = targetCity.getEmployCharacters();
				generals = generals.concat(employs);
				LMvc.CityController.loadCharacterList(CharacterListType.EXPEDITION, generals, {buttonLabel:"execute", closeDisable:true, cutoverName:"arm_properties", showArm:true,hasEmploy:true,showMoney:true,checkCity:targetCity.id()});
			});
		}};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	jobAiBattleExecute(areaModel,data,targetCity);
}
/*AI之间自动战斗*/
function jobAiBattleExecute(areaModel,data,targetCity){
	//console.log("AI之间自动战斗", areaModel,data,targetCity);
	var attackSeignior = areaModel.seignior();
	var defSeignior = targetCity.seignior();
	if(!targetCity.seigniorCharaId()){
		SeigniorExecute.addMessage(String.format(Language.get("to_attack_null_city"),attackSeignior.character().name(),areaModel.name(),targetCity.name()));
		BattleAIExecute.set(data, {expeditionCharacterList:[]});
		return;
	}
	SeigniorExecute.addMessage(String.format(Language.get("to_attack_seignior_city"),attackSeignior.character().name(),areaModel.name(),defSeignior.character().name(),targetCity.name()));
	var targetData = {};
	var enemyCharas = targetCity.getDefenseEnemies();
	if(enemyCharas.length > 0){
		enemyCharas[0].isLeader = true;
	}
	var sumTroops = targetCity.troops();
	var allTroops = sumTroops;
	for(var i = 0;i<enemyCharas.length;i++){
		var charaId = enemyCharas[i].id();
		var chara = CharacterModel.getChara(charaId);
		var maxTroop = chara.maxTroops();
		if(maxTroop > sumTroops){
			maxTroop = sumTroops;
		}
		chara.troops(maxTroop);
		sumTroops -= maxTroop;
		targetCity.troops(sumTroops);
		if(sumTroops > 0 || i == enemyCharas.length - 1){
			continue;
		}
		enemyCharas = enemyCharas.splice(0, i + 1);
		break;
	}
	targetData.expeditionCharacterList = enemyCharas;
	var neighbor = targetCity.neighbor();
	neighbor = neighbor.sort(function(){
		return Math.fakeRandom()>0.5?1:-1;
	});
	var selfNoAppoints = [];
	if(targetData.expeditionCharacterList.length > 0 
		&& targetData.expeditionCharacterList.length < BattleMapConfig.DefenseQuantity){
		for(var i=0;i<neighbor.length;i++){
			var city = AreaModel.getArea(neighbor[i]);
			if(city.seigniorCharaId() != targetCity.seigniorCharaId() || city.id() == targetCity.id()){
				continue;
			}else if(city.seigniorCharaId() == LMvc.selectSeignorId){
				if(!city.isAppoint()){
					selfNoAppoints.push(city);
					continue;
				}
			}
			generals = getBattleReinforcement(city, targetData.expeditionCharacterList.length, BattleMapConfig.DefenseQuantity);
			targetData.expeditionCharacterList = targetData.expeditionCharacterList.concat(generals);
		}
		
	}
	if(targetData.expeditionCharacterList.length > 0 && 
		targetData.expeditionCharacterList.length < BattleMapConfig.DefenseQuantity && selfNoAppoints.length > 0){
		SeigniorExecute.Instance().stop = true;
		//进入战斗
		var attackSeignior = areaModel.seignior();
		//{0}的{1}向{2}的{3}发起进攻了!要从其它城池调派援兵吗？
		var msg = String.format(Language.get("to_attack_seignior_city_reinforcement"),attackSeignior.character().name(),areaModel.name(),Language.get("belong_self"),targetCity.name());
		msg += "\n\n"+String.format(Language.get("attack_intelligence_enemy"),data.troops*3,data.expeditionCharacterList.length);
		msg += "\n"+String.format(Language.get("attack_intelligence_self"),allTroops,targetData.expeditionCharacterList.length);
		var obj = {title:Language.get("confirm"),message:msg,width:340,height:350
		,okEvent:function(event){
			event.currentTarget.parent.remove();
			SeigniorExecute.Instance().backLayer.visible = false;
			LMvc.MapController.showCity(targetCity.id(), function(){
				var build = LMvc.CityController.view.showBuildView("expedition");
				build.characterListType = CharacterListType.EXPEDITION_REINFORCEMENT;
				LMvc.CityController.setValue("cityData",areaModel);
				LMvc.CityController.setValue("toCity",targetCity);
				LMvc.CityController.setValue("expeditionEnemyData",data);
				LMvc.CityController.setValue("expeditionOutData",targetData);
				var generals = [];
				for(var i=0;i<selfNoAppoints.length;i++){
					var city = selfNoAppoints[i];
					generals = generals.concat(city.generals());
				}
				LMvc.CityController.loadCharacterList(CharacterListType.EXPEDITION_REINFORCEMENT, generals, {buttonLabel:"execute", showArm:true,cutoverName:"arm_properties"});
			});
		},cancelEvent:function(event){
			event.currentTarget.parent.remove();
			BattleAIExecute.set(data, targetData);
		}};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	var employCharacters;
	while(targetData.expeditionCharacterList.length > 0 && targetData.expeditionCharacterList.length < BattleMapConfig.DefenseQuantity){
		if(!employCharacters){
			employCharacters = targetCity.getEmployCharacters();
		}
		var chara = employCharacters.shift();
		if(targetCity.money() < chara.employPrice()){
			break;
		}
		if(targetCity.troops() < chara.maxTroops()){
			break;
		}
		chara.troops(chara.maxTroops());
		targetCity.troops(targetCity.troops() - chara.maxTroops());
		targetCity.money(-chara.employPrice());
		targetData.expeditionCharacterList.push(chara);
	}
	/*console.log("BattleAIExecute");
	for(var i=0;i<data.expeditionCharacterList.length;i++){
		console.log("data",data.expeditionCharacterList[i].name());
	}
	for(var i=0;i<targetData.expeditionCharacterList.length;i++){
		console.log("targetData",targetData.expeditionCharacterList[i].name());
	}*/
	BattleAIExecute.set(data, targetData);
}
//获取援兵
function getBattleReinforcement(areaModel, count, maxCount){
	var quantity = BattleMapConfig.AttackQuantity - count;
	var reinforcementGenerals = [];
	var generals = AreaModel.getPowerfulCharacters(areaModel.generals());
	if(generals.length < quantity){
		quantity = generals.length;
	}
	var sumTroops = 0;
	for(var i = 0;i<quantity;i++){
		if(areaModel.troops() <= areaModel.minDefTroops()){
			return reinforcementGenerals;
		}
		var general = generals[i].general;
		var maxTroops = general.maxTroops();
		if(maxTroops > areaModel.troops()){
			return reinforcementGenerals;
		}
		general.troops(maxTroops);
		reinforcementGenerals.push(general);
	}
	return reinforcementGenerals;
}
function jobAiNeedToEnlist(areaModel){
	if(areaModel.troops() >= areaModel.maxTroops()){
		return AiEnlistFlag.None;
	}
	var charas = areaModel.getDefenseEnemies();
	var minToops = 0;
	for(var i = 0,l=charas.length;i<l;i++){
		var chara = charas[i];
		minToops += chara.maxTroops();
	}
	var mustProportion = 1, internalProportion = 1;
	if(areaModel.seigniorCharaId() == LMvc.selectSeignorId){
		if(areaModel.isAppoint()){
			if(areaModel.appointType() == AppointType.AppointInternal || areaModel.appointType() == AppointType.AppointExplore){
				mustProportion = 0.1;
				internalProportion = 2;
			}else if(areaModel.appointType() == AppointType.AppointMilitary){
				internalProportion = 0.7;
				mustProportion = 0.7;
			}
		}
	}else{
		var maxAmbition = 15, ambition = areaModel.seignior().character().ambition();
		internalProportion = 0.7 + (maxAmbition - ambition) / maxAmbition;
		mustProportion = internalProportion;
		
	}
	if(areaModel.troops() < minToops * mustProportion){ 
		return AiEnlistFlag.Must;
	}
	if(areaModel.agriculture() < areaModel.maxAgriculture()*0.2*internalProportion || 
		areaModel.business() < areaModel.maxBusiness()*0.2*internalProportion || 
		areaModel.technology() < areaModel.maxTechnology()*0.2*internalProportion){
		return AiEnlistFlag.MustResource;
	}
	if(areaModel.troops() < minToops * 1.5 * mustProportion){
		return AiEnlistFlag.Need;
	}
	if(areaModel.agriculture() < areaModel.maxAgriculture()*0.4*internalProportion || 
		areaModel.business() < areaModel.maxBusiness()*0.4*internalProportion || 
		areaModel.technology() < areaModel.maxTechnology()*0.4*internalProportion){
		return AiEnlistFlag.NeedResource;
	}
	if(areaModel.troops() < minToops * 2 * mustProportion){
		return AiEnlistFlag.Battle;
	}
	if(areaModel.agriculture() < areaModel.maxAgriculture()*internalProportion || 
		areaModel.business() < areaModel.maxBusiness()*internalProportion || 
		areaModel.technology() < areaModel.maxTechnology()*internalProportion){
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
	if(areaModel.money() - areaModel.minMoney() < JobPrice.ENLIST){
		return;
	}
	var character = characters.shift();
	var num = EnlistSetting.ENLIST_TO - EnlistSetting.ENLIST_FROM;
	var cost = JobPrice.ENLIST * EnlistSetting.ENLIST_TO / EnlistSetting.ENLIST_FROM >>> 0;
	if(areaModel.money() - areaModel.minMoney() < cost){
		num = (EnlistSetting.ENLIST_TO - EnlistSetting.ENLIST_FROM)*0.7;
		cost = JobPrice.ENLIST * (EnlistSetting.ENLIST_FROM + num) / EnlistSetting.ENLIST_FROM >>> 0;
	}
	if(areaModel.money() - areaModel.minMoney() < cost){
		num = (EnlistSetting.ENLIST_TO - EnlistSetting.ENLIST_FROM)*0.3;
		cost = JobPrice.ENLIST * (EnlistSetting.ENLIST_FROM + num) / EnlistSetting.ENLIST_FROM >>> 0;
	}
	if(areaModel.money() - areaModel.minMoney() < cost){
		num = 0;
		cost = JobPrice.ENLIST;
	}
	areaModel.money(-cost);
	character.enlist(EnlistSetting.ENLIST_FROM + num);
	SeigniorExecute.Instance().areaMessage(areaModel, "jobai_enlish_message");//{0}的{1}在招兵买马!
}
function jobAiPersuade(areaModel,characters){//劝降
	if(characters.length == 0){
		return;
	}
	var persuadeCharacters = getCanPersuadeCharacters();
	var length = persuadeCharacters.length;
	if(length == 0){
		return;
	}
	var charas = [];
	for(var i=0,l=length;i<length;i++){
		var chara = persuadeCharacters[i];
		if(chara.y * 100 +  chara.m  < LMvc.chapterData.year * 100 + LMvc.chapterData.month - 3){
			charas.push(chara);
		}
	}
	persuadeCharacters = charas;
	var length = persuadeCharacters.length;
	if(length == 0){
		return;
	}
	var minLoyalty = persuadeCharacters[length - 1].l;
	var p = Math.ceil((90 - minLoyalty) / 5) * 0.1;
	var r = Math.fakeRandom();
	if(r > p){
		return;
	}
	var sum = 0;
	for(var i = 0;i<length;i++){
		sum += (i + 1);
	}
	var v = sum * Math.fakeRandom();
	sum = 0, targetId = persuadeCharacters[length - 1].i;
	for(var i = 0;i<length;i++){
		sum += (i + 1);
		if(v < sum){
			targetId = persuadeCharacters[i].i;
			break;
		}
	}
	var character = characters.shift();
	character.persuade(targetId);
}
function jobAiTavern(areaModel,characters){//录用
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().areaMessage(areaModel, "jobai_tavern_message");
	var outOfOfficeCharas = areaModel.outOfOffice();
	if(outOfOfficeCharas.length == 0){
		return;
	}
	var character = characters.shift();
	var hireCharacterIndex = Math.fakeRandom()*outOfOfficeCharas.length >>> 0;
	character.hire(outOfOfficeCharas[hireCharacterIndex].id());
}
function jobAiAccess(areaModel,characters){//访问
	if(characters.length == 0){
		return;
	}
	jobAiInternal(areaModel,characters,0,Job.ACCESS);
}
function jobAiLevelUpCity(areaModel,characters){//升级城池
	jobAiInternal(areaModel,characters,JobPrice.LEVEL_UP*areaModel.level(),Job.LEVEL_UP);
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
	if(price > 0 && areaModel.money() - areaModel.minMoney() < price){
		return;
	}
	var character = characters.shift();
	character.job(job);
	if(price > 0){
		areaModel.money(-price);
	}
}
function jobAiSetCityBattleDistance(seigniorModel){
	/*if(seigniorModel.chara_id() == LMvc.selectSeignorId){
		SeigniorExecute.Instance().timer.reset();
		SeigniorExecute.Instance().timer.start();
		return;
	}*/
	var areas = seigniorModel.areas();
	areas.forEach(function(area){
		area.battleDistanceCheckOver = false;
		area.battleDistance = 100;
		area.aiWillComeNum = 0;
	});
	for(var j=0,l=areas.length;j<l;j++){
		var area = areas[j];
		if(area.battleDistanceCheckOver){
			continue;
		}
		var neighbors = area.neighbor();
		var enemyNear = 0;
		var neighborCitys = [];
		for(var i = 0;i < neighbors.length;i++){
			var child = AreaModel.getArea(neighbors[i]);
			if(child.seigniorCharaId() != area.seigniorCharaId()){
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
	SeigniorExecute.Instance().timer.reset();
	SeigniorExecute.Instance().timer.start();
}
function jobAiGeneralMove(areaModel,baseCharacters){//武将移动
	var characters = [];
	for (var i = 0, l=baseCharacters.length; i < l; i++) {
		var chara = baseCharacters[i];
		if(chara.stopIn() == areaModel.id()){
			continue;
		}
		if(chara.id() == areaModel.prefecture()){
			continue;
		}
		characters.push(chara);
	}
	if(characters.length == 0){
		return;
	}
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
		if(childGeneralSum == 0 || child.battleDistance < battleDistance || (child.battleDistance == battleDistance && childGeneralSum < currentGeneralSum)){
			citys = [child];
			battleDistance = child.battleDistance;
			currentCity = child;
			currentGeneralSum = childGeneralSum;
		}else if(child.battleDistance == battleDistance && childGeneralSum == currentGeneralSum){
			citys.push(child);
		}
	}
	if(citys.length == 0 || (citys[0].battleDistance > areaModel.battleDistance && citys[0].generalsSum() > 0)){
		return;
	}
	var targetCity = citys[citys.length * Math.fakeRandom() >>> 0];
	var generals = AreaModel.getPowerfulCharacters(characters);
	var charaId = generals[0].general.id();
	var index = characters.findIndex(function(child){
		return child.id() == charaId;
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
		if(child.troops() > areaModel.troops() && child.money() > areaModel.money() && child.food() > areaModel.food()){
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
	var charas = areaModel.getDefenseEnemies();
	var minToops = 0;
	for(var i = 0,l=charas.length;i<l;i++){
		var chara = charas[i];
		minToops += chara.maxTroops();
	}
	var troops = 0;
	if(currentCity.troops() < areaModel.troops()){
		troops = areaModel.troops() - minToops*3;
		troops = troops < minToops ? 0 : troops;
	}
	var food = 0;
	if(currentCity.food() < areaModel.food()){
		food = areaModel.food() - minToops * 30;
		food = food < minToops * 10 ? 0 : food;
	}
	var money = 0;
	if(currentCity.money() < areaModel.money()){
		money = areaModel.money() - 10000;
		money = money < 5000 ? 0 : money;
	}
	if(troops == 0 && food == 0 && money == 0){
		return;
	}
	var data = {
		cityId : currentCity.id(),
		money : money,
		food : food,
		troops : troops
	};
	areaModel.troops(areaModel.troops() - troops);
	areaModel.food(-food);
	areaModel.money(-money);
	var index = characters.length * Math.fakeRandom() >>> 0;
	var character = characters[index];
	characters.splice(index, 1);
	character.transport(data);
}
function jobAiCaptives(areaModel){
	var captives = areaModel.captives();
	if(captives.length == 0){
		return;
	}
	var seigniorId = areaModel.seigniorCharaId();
	for(var i = captives.length - 1; i >= 0; i--){
		var charaModel = captives[i];
		if(charaModel.job() != Job.IDLE){
			continue;
		}
		jobAiCaptive(areaModel, seigniorId, charaModel);
	}
}
function jobAiCaptive(areaModel, seigniorId, charaModel){
	charaModel.job(Job.END);
	if(calculateHitrateSurrender(seigniorId, charaModel)){//投降
		if(charaModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("surrender_dialog_msg"),charaModel.name()));
		}
		calculateLoyalty(charaModel, seigniorId);
		charaModel.seigniorId(seigniorId);
		areaModel.removeCaptives(charaModel.id());
		areaModel.addGenerals(charaModel);
		return;
	}
	if(calculateHitrateRelease(seigniorId, charaModel)){//释放
		if(charaModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("released_dialog_msg"),charaModel.name()));
		}
		areaModel.removeCaptives(charaModel.id());
		if(!charaModel.seignior() || !charaModel.seignior().character().seigniorId()){
			//下野
			charaModel.toOutOfOffice();
		}else{
			//回归自己势力
			var areas = charaModel.seignior().areas();
			var city = areas[areas.length * Math.fakeRandom() >>> 0];
			charaModel.moveTo(city.id());
			charaModel.moveTo();
		}
		return;
	}
	if(calculateHitrateBehead(seigniorId, charaModel)){//斩首
		if(charaModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("beheaded_dialog_msg"),charaModel.name()));
		}
		areaModel.removeCaptives(charaModel.id());
	} 
}
function jobAiCaptivesRescue(areaModel,characters){//解救俘虏
	if(characters.length == 0){
		return false;
	}
	var captives = SeigniorModel.getCharactersIsCaptives(areaModel.seigniorCharaId());
	var captivesChecked = SeigniorExecute.Instance().captivesChecked;
	var noCheckedCaptives = [];
	for(var i=0, l=captives.length;i<l;i++){
		if(captivesChecked.indexOf(captives[i].id()) < 0){
			noCheckedCaptives.push(captives[i]);
		}
	}
	captives = noCheckedCaptives;
	if(captives.length == 0){
		return false;
	}
	//TODO::ver1.1执行解救俘虏概率
	if(Math.fakeRandom() < 0.5){
		return false;
	}
	
	var captiveIndex = captives.length * Math.fakeRandom() >>> 0;
	var captive = captives[captiveIndex];
	var character = characters.shift();
	var money = (captive.force() + captive.intelligence() + captive.command() + captive.agility() + captive.luck()) * JobCoefficient.REDEEM;
	money += (money * captive.skillCoefficient() * 0.1);
	if(areaModel.money() < money){
		return false;
	}
	SeigniorExecute.Instance().captivesChecked.push(captive.id());
	var captiveArea = captive.city();
	if(captiveArea.seigniorCharaId() == LMvc.selectSeignorId && !captiveArea.isAppoint()){
		character.job(Job.End);
		//"{0}的{1}想用金钱{2}赎回{3}，是否答应？"
		var obj = {title:Language.get("confirm"),message:String.format(Language.get("jobai_rescue_confirm_message"),character.seignior().name(),character.name(),money,captive.name()),height:200
		,okEvent:function(event){
			event.currentTarget.parent.remove();
			captiveArea.removeCaptives(captive.id());
			captive.moveTo(areaModel.id());
			captive.moveTo();
			areaModel.money(-money);
			captiveArea.money(money);
			SeigniorExecute.run();
		},cancelEvent:function(event){
			event.currentTarget.parent.remove();
			SeigniorExecute.run();
		}};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return true;
	}
	character.redeem(captive.id(), money);
	return false;
}
function childHasNotGenerals(childModel){
	if(childModel.seigniorId() > 0){
		return false;
	}
	if(childModel.age() != 16){
		return false;
	}
	for(var i=0,l=AreaModel.list.length;i<l;i++){
		var area = AreaModel.list[i];
		//获取所有未登场武将ID
		var notDebut = area.notDebut(true);
		var index = notDebut.indexOf(childModel.id());
		if(index >= 0){
			//删除未登场武将信息
			var chara = area.removeNotDebut(childModel.id());
			if(chara && chara.equipments && chara.equipments.length > 0){
				childModel.equip(chara.equipments);
			}
			return true;
		}
	}
	return false;
}
function childsHasGrowup(areaModel){
	var generals = areaModel.generals();
	for(var i=0;i<generals.length;i++){
		var chara = generals[i];
		var childs = chara.childs();
		if(childs.length == 0){
			continue;
		}
		for(var j=0;j<childs.length;j++){
			var childId = childs[j];
			var childModel = CharacterModel.getChara(childId);
			if(!childHasNotGenerals(childModel)){
				continue;
			}
			//出仕处理
			childModel.cityId(areaModel.id());
			childModel.seigniorId(areaModel.seigniorCharaId());
			childModel.loyalty(chara.loyalty());
			childModel.feat(0);
			areaModel.addGenerals(childModel);
			if(areaModel.seigniorCharaId() == LMvc.selectSeignorId){
				var obj = {title:Language.get("confirm"),messageHtml:String.format(Language.get("child_growup"), childModel.name(), chara.name()),height:240, okEvent:function(event){
					event.currentTarget.parent.remove();
					SeigniorExecute.Instance().stop = false;
					SeigniorExecute.run();
				}};
				var windowLayer = ConfirmWindow(obj);
				LMvc.layer.addChild(windowLayer);
			}else{
				LMvc.MapController.nextFrameExecute(function(){
					SeigniorExecute.Instance().stop = false;
					SeigniorExecute.run();
				});
			}
			return true;
		}
		
	}
	return false;
}
