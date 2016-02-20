function characterListType2JobType(characterListType) {
	switch(characterListType){
		case CharacterListType.AGRICULTURE:
			return Job.AGRICULTURE;
		case CharacterListType.BUSINESS:
			return Job.BUSINESS;
		case CharacterListType.POLICE:
			return Job.POLICE;
		case CharacterListType.TECHNOLOGY:
			return Job.TECHNOLOGY;
		case CharacterListType.ENLIST:
			return Job.ENLIST;
		case CharacterListType.HIRE:
			return Job.HIRE;
		case CharacterListType.REPAIR:
			return Job.REPAIR;
		case CharacterListType.ACCESS:
			return Job.ACCESS;
		case CharacterListType.EXPLORE_AGRICULTURE:
			return Job.EXPLORE_AGRICULTURE;
		case CharacterListType.EXPLORE_BUSINESS:
			return Job.EXPLORE_BUSINESS;
		case CharacterListType.CHARACTER_SPY:
			return Job.SPY;
		case CharacterListType.LEVEL_UP:
			return Job.LEVEL_UP;
	}
	console.error("Can't change to jobType");
	return Job.IDLE;
}
function getJobPrice(jobType) {
	switch(jobType){
		case Job.AGRICULTURE:
			return JobPrice.AGRICULTURE;
		case Job.BUSINESS:
			return JobPrice.BUSINESS;
		case Job.POLICE:
			return JobPrice.REPAIR;
		case Job.REPAIR:
			return JobPrice.POLICE;
		case Job.TECHNOLOGY:
			return JobPrice.TECHNOLOGY;
		case Job.SPY:
			return JobPrice.SPY;
		case Job.LEVEL_UP:
			return JobPrice.LEVEL_UP;
	}
	console.error("Can't get JobPrice");
	return 0;
}
/*function getIdentity(value){
	console.error("getIdentity");
	var identitis = ["在野","一般","太守"];
}*/
/*
外交:智力+运气
访问：智力+统率+运气
农地探索：智力+武力+运气
市场探索：智力+敏捷+运气
谍报：武力+运气
修补：武力+统率
商业：智力+敏捷
农业：智力+武力
治安：武力+敏捷
技术：智力+统率
招募：运气+统率
录用：运气+相性
*/
function getJobResult(realValue,coefficient){
	var value = (JobCoefficient.NORMAL + realValue) * coefficient;
	return value;
}
function trainingRun(characterModel, soldierId){
	var soldier = characterModel.soldiers().find(function(child){
		return child.id() == soldierId;
	});
	var proficiency = soldier.proficiency();
	var proficiencyPlus;
	if(proficiency + JobCoefficient.TRAINING < TrainingSetting.MAX){
		proficiencyPlus = JobCoefficient.TRAINING;
	}else{
		proficiencyPlus = TrainingSetting.MAX - proficiency;
	}
	soldier.proficiency(proficiency + proficiencyPlus);
	characterModel.job(Job.IDLE);
}
function levelUpCityRun(characterModel){
	var city = characterModel.city();
	city.level(1);
	characterModel.job(Job.IDLE);
	LMvc.MapController.view.resetAreaIcon(city.id());
	SeigniorExecute.addMessage(String.format(Language.get("levelUpCityMessage"),city.name(),city.size()));
}
function redeemRun(characterModel, data){
	//赎回俘虏:智力+运气
	console.log("redeemRun 赎回俘虏 : ",characterModel.id(), data);
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.DIPLOMACY);
	var value02 = getJobResult(characterModel.luck(),JobCoefficient.DIPLOMACY);
	var value = value01 + value02;
	var targetCharacter = CharacterModel.getChara(data.chara_id);
	var sum = (targetCharacter.force() + targetCharacter.intelligence() + targetCharacter.command() + targetCharacter.agility() + targetCharacter.luck()) * JobCoefficient.REDEEM;
	sum += (sum * targetCharacter.skillCoefficient() * 0.1);
	console.log("data.money/sum :"+data.money+"/"+sum+" :  ",(data.money/sum) * 100 , "value : ",value);
	if((data.money/sum) * 100 + value < 100){
		console.log("赎回俘虏 : 失败");
		if(characterModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("redeemFailMessage"),characterModel.name()));
		}
		return;
	}
	var city = characterModel.city();
	var targetCity = targetCharacter.city();
	targetCharacter.moveTo(city.id());
	targetCharacter.moveTo();
	targetCity.removeCaptives(data.chara_id);
	console.log("赎回俘虏 : 成功");
	if(characterModel.seigniorId() == LMvc.selectSeignorId){
		SeigniorExecute.addMessage(String.format(Language.get("redeemSuccessMessage"),characterModel.name()));
		SeigniorExecute.addMessage(String.format(Language.get("redeemReturnMessage"),targetCharacter.name(),city.name()));
	}
}
function stopBattleRun(characterModel, data){
	//停战协议:智力+运气
	console.log("stopBattleRun停战协议 : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.DIPLOMACY);
	var value02 = getJobResult(characterModel.luck(),JobCoefficient.DIPLOMACY);
	var value = value01 + value02;
	var sum = (11 - SeigniorModel.list.length) * JobCoefficient.STOP_BATTLE;
	if(data.money/sum + value < 100){
		console.log("停战协议 : 失败");
		if(characterModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("stopBattleFailMessage"),characterModel.name()));
		}
		return;
	}
	var seignior = characterModel.seignior();
	seignior.stopBattle(data.chara_id);
	SeigniorModel.getSeignior(data.chara_id).stopBattle(seignior.chara_id());
	if(characterModel.seigniorId() == LMvc.selectSeignorId){
		SeigniorExecute.addMessage(String.format(Language.get("stopBattleSuccessMessage"),characterModel.name()));
	}
}
function accessRun(characterModel){
	//访问：智力+统率+运气
	console.log("accessRun : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.ACCESS);
	var value02 = getJobResult(characterModel.command(),JobCoefficient.ACCESS);
	var value03 = getJobResult(characterModel.luck(),JobCoefficient.ACCESS);
	var value = value01 + value02 + value03;
	var rand = Math.random();
	
	if(rand > value){
		console.log("accessRun : 失败 能力不够");
		if(characterModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("accessFailMessage"),characterModel.name()));
		}
		return;
	}
	var cityModel = characterModel.city();
	var notDebut = cityModel.notDebut();
	if(notDebut.length == 0){
		console.log("accessRun : 失败");
		if(characterModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("accessFailMessage"),characterModel.name()));
		}
		return;
	}
	var charaId = notDebut[notDebut.length*Math.random() >>> 0];
	
	var targetModel = CharacterModel.getChara(charaId);
	var area = characterModel.city();
	var outOfOffice = area.outOfOffice();
	outOfOffice.push(targetModel);
	if(characterModel.seigniorId() == LMvc.selectSeignorId){
		SeigniorExecute.addMessage(String.format(Language.get("accessSuccessMessage"),characterModel.name(),targetModel.name()));
	}
	hireRun2(characterModel, targetModel,area);
}
function exploreItems(items){
	if(items.length == 0){
		return -1;
	}
	var proportionSum = 0;
	for(var i=0,l=items.length;i<l;i++){
		proportionSum += items[i].proportion;
	}
	var proportion = Math.random() * proportionSum;
	proportionSum = 0;
	for(var i=0,l=items.length;i<l;i++){
		proportionSum += items[i].proportion;
		if(proportionSum >= proportion){
			return i;
		}
	}
	return -1;
}
function exploreAgricultureRun(characterModel){
	//农地探索：智力+武力+运气
	console.log("exploreAgricultureRun农地探索 : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.EXPLORE_AGRICULTURE);
	var value02 = getJobResult(characterModel.force(),JobCoefficient.EXPLORE_AGRICULTURE);
	var value03 = getJobResult(characterModel.luck(),JobCoefficient.EXPLORE_AGRICULTURE);
	var value = value01 + value02 + value03;
	var rand = Math.random();
	
	var cityModel = characterModel.city();
	if(rand > value){
		console.log("exploreAgricultureRun : 失败 能力不够");
		var food = getValueByExploreFail(400,100);
		exploreAgricultureFailRun(cityModel, characterModel, food);
		return;
	}
	var items = cityModel.itemsFarmland();
	var index = exploreItems(items);
	if(index < 0){
		console.log("exploreAgricultureRun : 失败");
		var food = getValueByExploreFail(800,200);
		exploreAgricultureFailRun(cityModel, characterModel, food);
		return;
	}
	var itemId = items[index].item_id;
	items[index].quantity -= 1;
	if(items[index].quantity == 0){
		items.splice(index, 1);
	}
	cityModel.itemsFarmland(items);
	var item = new ItemModel(null,{item_id:itemId});
	cityModel.addItem(item);
	if(characterModel.seigniorId() == LMvc.selectSeignorId){
		SeigniorExecute.addMessage(String.format(Language.get("exploreAgricultureSuccess"),characterModel.name(),item.name()));
	}
}
function getValueByExploreFail(baseValue, randomValue){
	if(Math.random() > 0.5){
		return 0;
	}
	var value = 0;
	var r = Math.random();
	var m = randomValue*Math.random();;
	if(r < 0.1){
		value = baseValue + m;
	}else if(r < 0.3){
		value = baseValue*0.75 + m;
	}else if(r < 0.6){
		value = baseValue*0.5 + m;
	}else{
		value = baseValue*0.25 + m;
	}
	return value >>> 0;
}
function exploreAgricultureFailRun(cityModel, characterModel, food){
	cityModel.food(food);
	if(characterModel.seigniorId() == LMvc.selectSeignorId){
		var msg = "";
		if(food>0){
			msg = String.format(Language.get("exploreAgricultureFood"),characterModel.name(),food);
		}else{
			msg = String.format(Language.get("exploreAgricultureFail"),characterModel.name());
		}
		SeigniorExecute.addMessage(msg);
	}
}
function exploreBusinessFailRun(cityModel, characterModel, money){
	cityModel.money(money);
	if(characterModel.seigniorId() == LMvc.selectSeignorId){
		var msg = "";
		if(money>0){
			msg = String.format(Language.get("exploreBusinessMoney"),characterModel.name(),money);
		}else{
			msg = String.format(Language.get("exploreBusinessFail"),characterModel.name());
		}
		SeigniorExecute.addMessage(msg);
	}
}
function exploreBusinessRun(characterModel){
	//市场探索：智力+敏捷+运气
	console.log("exploreBusinessRun市场探索 : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.EXPLORE_BUSINESS);
	var value02 = getJobResult(characterModel.agility(),JobCoefficient.EXPLORE_BUSINESS);
	var value03 = getJobResult(characterModel.luck(),JobCoefficient.EXPLORE_BUSINESS);
	var value = value01 + value02 + value03;
	var rand = Math.random();
	
	var cityModel = characterModel.city();
	if(rand > value){
		console.log("exploreBusinessRun : 失败 能力不够");
		var money = getValueByExploreFail(200,50);
		exploreBusinessFailRun(cityModel, characterModel, money);
		return;
	}
	var items = cityModel.itemsMarket();
	var index = exploreItems(items);
	if(index < 0){
		console.log("exploreBusinessRun : 失败");
		var money = getValueByExploreFail(400,100);
		exploreBusinessFailRun(cityModel, characterModel, money);
		return;
	}
	var itemId = items[index].item_id;
	items[index].quantity -= 1;
	if(items[index].quantity == 0){
		items.splice(index, 1);
	}
	cityModel.itemsFarmland(items);
	var item = new ItemModel(null,{item_id:itemId});
	cityModel.addItem(item);
	if(characterModel.seigniorId() == LMvc.selectSeignorId){
		SeigniorExecute.addMessage(String.format(Language.get("exploreBusinessSuccess"),characterModel.name(),item.name()));
	}
}
function transportRun(characterModel, transportData){
	//运输物资
	console.log("transportRun运输物资 : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var cityModel = AreaModel.getArea(transportData.cityId);
	var troops = cityModel.troops();
	cityModel.troops(troops + transportData.troops);
	cityModel.food(transportData.food);
	cityModel.money(transportData.money);
}
function repairRun(characterModel){
	//修补：武力+统率
	console.log("repairRun修补 : ",characterModel.id());
	var value01 = getJobResult(characterModel.force(),JobCoefficient.REPAIR);
	var value02 = getJobResult(characterModel.command(),JobCoefficient.REPAIR);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.AGRICULTURE) ? 1.5 : 1);
	characterModel.city().cityDefense(value >>> 0);
	characterModel.job(Job.IDLE);
}
function agricultureRun(characterModel){
	//农业：智力+武力
	console.log("agricultureRun农业 : ",characterModel.id());
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.AGRICULTURE);
	var value02 = getJobResult(characterModel.force(),JobCoefficient.AGRICULTURE);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.AGRICULTURE) ? 1.5 : 1);
	characterModel.city().agriculture(value >>> 0);
	characterModel.job(Job.IDLE);
}
function businessRun(characterModel){
	//商业：智力+敏捷
	console.log("businessRun商业 : ",characterModel.id());
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.BUSINESS);
	var value02 = getJobResult(characterModel.agility(),JobCoefficient.BUSINESS);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.BUSINESS) ? 1.5 : 1);
	characterModel.city().business(value >>> 0);
	characterModel.job(Job.IDLE);
}
function policeRun(characterModel){
	//治安：武力*2+敏捷
	console.log("policeRun治安 : ",characterModel.id());
	var value01 = getJobResult(characterModel.force(),JobCoefficient.POLICE);
	var value02 = getJobResult(characterModel.agility(),JobCoefficient.POLICE);
	var value = (value01 * 2 + value02) * (characterModel.hasSkill(SkillSubType.POLICE) ? 1.5 : 1);
	//SeigniorExecute.addMessage("治安"+characterModel.name()+"="+value);
	characterModel.city().police(value >>> 0);
	characterModel.job(Job.IDLE);
}
function technologyRun(characterModel){
	//技术：智力+统率
	console.log("technologyRun技术 : ",characterModel.id());
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.TECHNOLOGY);
	var value02 = getJobResult(characterModel.command(),JobCoefficient.TECHNOLOGY);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.TECHNOLOGY) ? 1.5 : 1);
	characterModel.city().technology(value >>> 0);
	characterModel.job(Job.IDLE);
}
function enlistRun(characterModel, targetEnlist){
	//招募：运气+统率
	console.log("enlistRun招募 : ",characterModel.id());
	var area = characterModel.city();
	var population = area.population();
	var minPopulation = AreaModel.populationList[area.level()][0];
	var troop = area.troops();
	var value01 = getJobResult(characterModel.luck(),JobCoefficient.ENLIST);
	var value02 = getJobResult(characterModel.command(),JobCoefficient.ENLIST);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.ENLIST) ? 1.5 : 1);
	var quantity = (targetEnlist.quantity * value / JobCoefficient.NORMAL) >> 0;
	if(quantity > population - minPopulation){
		quantity = (population - minPopulation)*Math.random();
	}
	area.population(-quantity);
	troop += quantity;
	area.troops(troop);
	characterModel.job(Job.IDLE);
}
function spyRun(characterModel, cityId){
	//谍报：武力+运气
	console.log("spyRun谍报 : "+characterModel.name()+","+cityId);
	var area = AreaModel.getArea(cityId);
	characterModel.job(Job.IDLE);
	if(characterModel.seigniorId() == area.seigniorCharaId()){
		//TODO::失败:己方城池
		console.log("spyRun : 失败 null");
		return;
	}
	var seignior;
	var spyValue = characterModel.force() + characterModel.luck();
	if(spyValue<JobCoefficient.SPY){
		if(spyValue < Math.random()*JobCoefficient.SPY){
			console.log("spyRun : 失败 能力不够");
			if(characterModel.seigniorId() == LMvc.selectSeignorId){
				SeigniorExecute.addMessage(String.format(Language.get("spyFailMessage"),characterModel.name(),area.name()));
			}
			return;
		}
		seignior = characterModel.seignior();
		seignior.addSpyCity(cityId);
		return;
	}
	var num = (spyValue / JobCoefficient.SPY) >>> 0;
	seignior = seignior || characterModel.seignior();
	seignior.addSpyCity(cityId);
	if(characterModel.seigniorId() == LMvc.selectSeignorId){
		SeigniorExecute.addMessage(String.format(Language.get("spySuccessMessage"),characterModel.name(),area.name()));
	}
	num -= 1;
	spyValue = spyValue % JobCoefficient.SPY;
	if(spyValue>JobCoefficient.SPY || spyValue > Math.random()*JobCoefficient.SPY){
		num += 1;
	}
	if(num = 0){
		return;
	}
	var neighbors = area.neighbor();
	var citys = [];
	for(var i=0;i<neighbors.length;i++){
		var child = AreaModel.getArea(neighbors[i]);
		if(child.seigniorCharaId() == characterModel.seigniorId()){
			continue;
		}
		citys.push(neighbors[i]);
	}
	if(citys.length == 0){
		return;
	}
	if(num > citys.length){
		num = citys.length;
	}
	citys = Array.getRandomArrays(citys, num);
	for(var i = 0;i<citys.length;i++){
		seignior.addSpyCity(citys[i]);
	}
}
function hireRun(characterModel, hireCharacterId){
	//录用：运气+相性
	console.log("hireRun录用 : ",characterModel.id());
	var area = characterModel.city();
	var outOfOffice = area.outOfOffice();
	var hireCharacterIndex = outOfOffice.findIndex(function(child){
		return child.id() == hireCharacterId;
	});
	characterModel.job(Job.IDLE);
	if(hireCharacterIndex < 0){
		//TODO::失败
		console.log("hireRun : 失败 null");
		if(characterModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("hireFailMessage"),characterModel.name()));
		}
		return;
	}
	//var hireCharacter = outOfOffice[hireCharacterIndex];
	var hireCharacter = CharacterModel.getChara(hireCharacterId);
	hireRun2(characterModel, hireCharacter, area);
}
function hireRun2(characterModel, hireCharacter,area){
	var compatibility;
	var percentage = (JobCoefficient.NORMAL + characterModel.luck()) * 0.5 / JobCoefficient.NORMAL;
	var seigniorId = characterModel.seigniorId();
	var seigniorChara = CharacterModel.getChara(seigniorId);
	compatibility = Math.abs(seigniorChara.compatibility() - hireCharacter.compatibility());
	if(compatibility > JobCoefficient.COMPATIBILITY){
		compatibility -= JobCoefficient.COMPATIBILITY;
	}
	percentage *= (JobCoefficient.COMPATIBILITY - compatibility) / JobCoefficient.COMPATIBILITY;
	compatibility = Math.abs(characterModel.compatibility() - hireCharacter.compatibility());
	if(compatibility > JobCoefficient.COMPATIBILITY){
		compatibility -= JobCoefficient.COMPATIBILITY;
	}
	percentage *= (JobCoefficient.COMPATIBILITY - compatibility) / JobCoefficient.COMPATIBILITY;
	var rand = Math.random();
	if(rand > percentage){
		//TODO::失败
		console.log("hireRun : 失败 " + rand + " > " + percentage + " = " + (rand > percentage));
		if(characterModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("hireRefuseMessage"),hireCharacter.name(),characterModel.name()));
		}
		return;
	}
	hireCharacter.seigniorId(characterModel.seigniorId());
	var loyalty = 100 * percentage >> 0;
	hireCharacter.loyalty(loyalty > 100 ? 100 : loyalty);
	var outOfOffice = area.outOfOffice();
	var hireCharacterIndex = outOfOffice.findIndex(function(child){
		return child.id() == hireCharacter.id();
	});
	
	outOfOffice.splice(hireCharacterIndex, 1);
	hireCharacter.cityId(characterModel.cityId());
	var generals = area.generals();
	generals.push(hireCharacter);
	if(characterModel.seigniorId() == LMvc.selectSeignorId){
		SeigniorExecute.addMessage(String.format(Language.get("hireSuccessMessage"),characterModel.name(),hireCharacter.name(),hireCharacter.name()));
	}
}
function SeigniorExecuteChangeCityResources(area){
	//TODO::自然灾害
	var minPopulation = AreaModel.populationList[0][0];
	var maxPopulation = AreaModel.populationList[AreaModel.populationList.length - 1][1];
	var population = area.population();
	//金钱
	var maxBusiness = AreaModel.businessList[AreaModel.businessList.length - 1];
	if(LMvc.chapterData.month % 3 == 0){
		var addMoney = 500 + 5000*area.business()/maxBusiness;
		addMoney *= (1 + population/maxPopulation);
		area.money(addMoney);
	}
	//粮食
	var maxAgriculture = AreaModel.agricultureList[AreaModel.agricultureList.length - 1];
	if(LMvc.chapterData.month  == 7){
		var addFood = 10000 + 50000*area.agriculture()/maxAgriculture;
		addFood *= (1 + population/maxPopulation);
		area.food(addFood);
	}
	var police = area.police();
	var minPolice = 40;
	if(police>50){
		//人口增长
		var addPopulation = population * (0.005 * (police-50)/50 + 0.002*area.business()/maxBusiness + 0.003*area.agriculture()/maxAgriculture);
		area.population(addPopulation);
	}else if (police < 40) {
		var minusValue = (minPolice - police)/minPolice;
		var nowMin = AreaModel.populationList[area.level()][0];
		if(population > nowMin*0.9){
			//人口流失
			var minusPopulation = population*0.01*minusValue;
			area.population(-minusPopulation);
		}
		//暴动
		if(Math.random() < 0.2){
			var troops = area.troops();
			if(troops > 0){
				var minusTroops = troops * 0.1*minusValue;
				area.troops(troops - minusTroops);
			}
			var business = area.business();
			var minusBusiness = business*0.01*minusValue;
			area.business(-minusBusiness);
			var agriculture = area.agriculture();
			var minusAgriculture = agriculture*0.01*minusValue;
			area.agriculture(-minusAgriculture);
			var technology = area.technology();
			var minusTechnology = technology*0.01*minusValue;
			area.technology(-minusTechnology);
			var cityDefense = area.cityDefense();
			var minusCityDefense = cityDefense*0.01*minusValue;
			area.cityDefense(-minusCityDefense);
			SeigniorExecute.addMessage(String.format(Language.get("{0}的百姓发生暴动了!"),area.name()));
		}
	}
	//TODO::武将死亡
	
}

