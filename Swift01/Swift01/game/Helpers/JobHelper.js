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
		case CharacterListType.PERSUADE:
			return Job.PERSUADE;
	}
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
	return 0;
}
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
训练：总和 + 城池技术
劝降：忠诚度+义气+运气+武将相性
*/
function getJobResult(realValue,coefficient){
	var value = (JobCoefficient.NORMAL + realValue) * coefficient;
	return value;
}
function trainingRun(characterModel, soldierId){
	var soldier = characterModel.soldiers().find(function(child){
		return child.id() == soldierId;
	});
	var proficiencyPlus = getJobResult(characterModel.basicPropertiesSum() * 0.2,JobCoefficient.TRAINING);
	var proficiency = soldier.proficiency();
	if(proficiency + proficiencyPlus > TrainingSetting.MAX){
		proficiencyPlus = TrainingSetting.MAX - proficiency;
	}
	//训练加成城池技术
	var technology = characterModel.city().technology();
	var maxTechnology = AreaModel.technologyList[AreaModel.technologyList.length - 1];
	var toValue = proficiency + proficiencyPlus * (1 + technology / maxTechnology);
	soldier.proficiency(toValue >>> 0);
	var feat = JobFeatCoefficient.NORMAL * proficiencyPlus / JobFeatCoefficient.TRAINING;
	characterModel.featPlus(feat);
	characterModel.job(Job.IDLE);
	//统率经验
	characterModel.plusPropertiesExp("command");
}
function levelUpCityRun(characterModel){
	var city = characterModel.city();
	city.level(1);
	characterModel.featPlus(JobFeatCoefficient.NORMAL);
	characterModel.job(Job.IDLE);
	LMvc.MapController.view.resetAreaIcon(city.id());
	SeigniorExecute.addMessage(String.format(Language.get("levelUpCityMessage"),city.name(),city.size()));
}
function redeemRun(characterModel, data){
	//赎回俘虏:智力+运气
	//console.log("redeemRun 赎回俘虏 : ",characterModel.id(), data);
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.DIPLOMACY);
	var value02 = getJobResult(characterModel.luck(),JobCoefficient.DIPLOMACY);
	var value = value01 + value02;
	var targetCharacter = CharacterModel.getChara(data.chara_id);
	var sum = (targetCharacter.force() + targetCharacter.intelligence() + targetCharacter.command() + targetCharacter.agility() + targetCharacter.luck()) * JobCoefficient.REDEEM;
	sum += (sum * targetCharacter.skillCoefficient() * 0.1);
	//console.log("data.money/sum :"+data.money+"/"+sum+" :  ",(data.money/sum) * 100 , "value : ",value);
	if((data.money/sum) * 100 + value < 100){
		//console.log("赎回俘虏 : 失败");
		if(characterModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("redeemFailMessage"),characterModel.name()));
		}
		characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
		characterModel.city().money(data.money);
		return;
	}
	var city = characterModel.city();
	var targetCity = targetCharacter.city();
	targetCharacter.moveTo(city.id());
	targetCharacter.moveTo();
	targetCity.removeCaptives(data.chara_id);
	characterModel.featPlus(JobFeatCoefficient.NORMAL);
	//console.log("赎回俘虏 : 成功");
	if(characterModel.seigniorId() == LMvc.selectSeignorId){
		SeigniorExecute.addMessage(String.format(Language.get("redeemSuccessMessage"),characterModel.name()));
		SeigniorExecute.addMessage(String.format(Language.get("redeemReturnMessage"),targetCharacter.name(),city.name()));
	}
}
function stopBattleRun(characterModel, data){
	//停战协议:智力+运气
	//console.log("stopBattleRun停战协议 : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.DIPLOMACY);
	var value02 = getJobResult(characterModel.luck(),JobCoefficient.DIPLOMACY);
	var value = value01 + value02;
	var sum = (11 - SeigniorModel.list.length) * JobCoefficient.STOP_BATTLE;
	if(data.money/sum + value < 100){
		//console.log("停战协议 : 失败");
		if(characterModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("stopBattleFailMessage"),characterModel.name()));
		}
		characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
		characterModel.city().money(data.money);
		return;
	}
	var seignior = characterModel.seignior();
	seignior.stopBattle(data.chara_id);
	SeigniorModel.getSeignior(data.chara_id).stopBattle(seignior.chara_id());
	if(characterModel.seigniorId() == LMvc.selectSeignorId){
		SeigniorExecute.addMessage(String.format(Language.get("stopBattleSuccessMessage"),characterModel.name()));
	}
	characterModel.featPlus(JobFeatCoefficient.NORMAL);
}
function accessRun(characterModel){
	//访问：智力+统率+运气
	//console.log("accessRun : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.ACCESS);
	var value02 = getJobResult(characterModel.command(),JobCoefficient.ACCESS);
	var value03 = getJobResult(characterModel.luck(),JobCoefficient.ACCESS);
	var value = value01 + value02 + value03;
	var rand = Math.fakeRandom();
	
	var cityModel = characterModel.city();
	//console.log("accessRun : "+rand+">"+value + ","+value01 + ","+value02 + ","+value03);
	if(rand > value){
		if(characterModel.seigniorId() == LMvc.selectSeignorId && !cityModel.isAppoint()){
			SeigniorExecute.addMessage(String.format(Language.get("accessFailMessage"),characterModel.name()));
		}
		characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
		return false;
	}
	var notDebut = cityModel.notDebut();
	if(notDebut.length == 0){
		//console.log("accessRun : 失败 notDebut.length="+notDebut.length+","+cityModel.data.not_debut);
		if(characterModel.seigniorId() == LMvc.selectSeignorId && !cityModel.isAppoint()){
			SeigniorExecute.addMessage(String.format(Language.get("accessFailMessage"),characterModel.name()));
		}
		characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
		return false;
	}
	var charaId = notDebut[notDebut.length*Math.fakeRandom() >>> 0];
	var chara = cityModel.removeNotDebut(charaId);
	var targetModel = CharacterModel.getChara(charaId);
	if(chara && chara.equipments && chara.equipments.length > 0){
		targetModel.equip(chara.equipments);
	}
	targetModel.cityId(characterModel.cityId());
	var area = characterModel.city();
	var outOfOffice = area.outOfOffice();
	outOfOffice.push(targetModel);
	characterModel.featPlus(JobFeatCoefficient.NORMAL);
	if(characterModel.seigniorId() == LMvc.selectSeignorId && !cityModel.isAppoint()){
		SeigniorExecute.addMessage(String.format(Language.get("accessSuccessMessage"),characterModel.name(),targetModel.name()));
	}
	return hireRun2(characterModel, targetModel, area, true);
}
function exploreItems(items){
	if(items.length == 0 || Math.fakeRandom() < 0.5){
		return -1;
	}
	var proportionSum = 0;
	for(var i=0,l=items.length;i<l;i++){
		var item = items[i];
		var itemModel = ItemMasterModel.getMaster(item.item_id);
		var proportion = item.proportion;
		if(itemModel.rarity() > 4){
			proportion *= 2;
		}
		proportionSum += proportion;
	}
	var proportion = Math.fakeRandom() * proportionSum;
	proportionSum = 0;
	for(var i=0,l=items.length;i<l;i++){
		var item = items[i];
		var itemModel = ItemMasterModel.getMaster(item.item_id);
		var proportion = item.proportion;
		if(itemModel.rarity() > 4){
			proportion *= 2;
		}
		proportionSum += proportion;
		if(proportionSum >= proportion){
			return i;
		}
	}
	return -1;
}
function exploreAgricultureRun(characterModel){
	//农地探索：智力+武力+运气
	//console.log("exploreAgricultureRun农地探索 : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.EXPLORE_AGRICULTURE);
	var value02 = getJobResult(characterModel.force(),JobCoefficient.EXPLORE_AGRICULTURE);
	var value03 = getJobResult(characterModel.luck(),JobCoefficient.EXPLORE_AGRICULTURE);
	var value = value01 + value02 + value03;
	var rand = Math.fakeRandom();
	
	var cityModel = characterModel.city();
	if(rand > value){
		//console.log("exploreAgricultureRun : 失败 能力不够");
		var food = getValueByExploreFail(400,100);
		exploreAgricultureFailRun(cityModel, characterModel, food);
		return;
	}
	var items = cityModel.itemsFarmland();
	var index = exploreItems(items);
	if(index < 0){
		//console.log("exploreAgricultureRun : 失败");
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
	var item = new ItemModel(null,{item_id:itemId,count:1});
	if(characterModel.seigniorId() == LMvc.selectSeignorId && !cityModel.isAppoint()){
		cityModel.addItem(item);
		SeigniorExecute.addMessage(String.format(Language.get("exploreAgricultureSuccess"),characterModel.name(),item.name()));
	}else{
		if(!toEquipmentCityItem(item, cityModel)){
			cityModel.addItem(item);
		}
	}
	characterModel.featPlus(JobFeatCoefficient.NORMAL);
}
function getValueByExploreFail(baseValue, randomValue){
	if(Math.fakeRandom() > 0.5){
		return 0;
	}
	var value = 0;
	var r = Math.fakeRandom();
	var m = randomValue*Math.fakeRandom();;
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
	characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
	if(characterModel.seigniorId() == LMvc.selectSeignorId && !cityModel.isAppoint()){
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
	characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
	if(characterModel.seigniorId() == LMvc.selectSeignorId && !cityModel.isAppoint()){
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
	//console.log("exploreBusinessRun市场探索 : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.EXPLORE_BUSINESS);
	var value02 = getJobResult(characterModel.agility(),JobCoefficient.EXPLORE_BUSINESS);
	var value03 = getJobResult(characterModel.luck(),JobCoefficient.EXPLORE_BUSINESS);
	var value = value01 + value02 + value03;
	var rand = Math.fakeRandom();
	
	var cityModel = characterModel.city();
	if(rand > value){
		//console.log("exploreBusinessRun : 失败 能力不够");
		var money = getValueByExploreFail(200,50);
		exploreBusinessFailRun(cityModel, characterModel, money);
		return;
	}
	var items = cityModel.itemsMarket();
	var index = exploreItems(items);
	if(index < 0){
		//console.log("exploreBusinessRun : 失败");
		var money = getValueByExploreFail(400,100);
		exploreBusinessFailRun(cityModel, characterModel, money);
		return;
	}
	var itemId = items[index].item_id;
	items[index].quantity -= 1;
	if(items[index].quantity == 0){
		items.splice(index, 1);
	}
	cityModel.itemsMarket(items);
	
	var item = new ItemModel(null,{item_id:itemId,count:1});
	if(characterModel.seigniorId() == LMvc.selectSeignorId && !cityModel.isAppoint()){
		cityModel.addItem(item);
		SeigniorExecute.addMessage(String.format(Language.get("exploreBusinessSuccess"),characterModel.name(),item.name()));
	}else{
		if(!toEquipmentCityItem(item, cityModel)){
			cityModel.addItem(item);
		}
	}
	characterModel.featPlus(JobFeatCoefficient.NORMAL);
}
function transportRun(characterModel, transportData){
	//运输物资
	//console.log("transportRun运输物资 : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var cityModel = AreaModel.getArea(transportData.cityId);
	var troops = cityModel.troops();
	cityModel.troops(troops + transportData.troops);
	cityModel.food(transportData.food);
	cityModel.money(transportData.money);
	characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
}
function repairRun(characterModel){
	//修补：武力+统率
	var value = getJobResult(characterModel.force() + characterModel.command(),JobCoefficient.REPAIR);
	var value = value * (characterModel.hasSkill(SkillSubType.REPAIR) ? 1.5 : 1);
	characterModel.city().cityDefense(value >>> 0);
	characterModel.job(Job.IDLE);
	var feat = JobFeatCoefficient.NORMAL * value / JobFeatCoefficient.REPAIR;
	//console.log(characterModel.name() + " 修补:",characterModel.force() + characterModel.command(), value, feat);
	characterModel.featPlus(feat);
	//武力经验
	characterModel.plusPropertiesExp("force");
}
function agricultureRun(characterModel){
	//农业：智力+武力
	var value = getJobResult(characterModel.intelligence() + characterModel.force(),JobCoefficient.AGRICULTURE);
	var value = value * (characterModel.hasSkill(SkillSubType.AGRICULTURE) ? 1.5 : 1);
	characterModel.city().agriculture(value >>> 0);
	characterModel.job(Job.IDLE);
	var feat = JobFeatCoefficient.NORMAL * value / JobFeatCoefficient.AGRICULTURE;
	//console.log(characterModel.name() + " 农业:",characterModel.intelligence() + characterModel.force(), value, feat);
	characterModel.featPlus(feat);
	//敏捷经验
	characterModel.plusPropertiesExp("agility");
}
function businessRun(characterModel){
	//商业：智力+敏捷
	var value = getJobResult(characterModel.intelligence() + characterModel.agility(),JobCoefficient.BUSINESS);
	var value = value * (characterModel.hasSkill(SkillSubType.BUSINESS) ? 1.5 : 1);
	characterModel.city().business(value >>> 0);
	characterModel.job(Job.IDLE);
	var feat = JobFeatCoefficient.NORMAL * value / JobFeatCoefficient.BUSINESS;
	//console.log(characterModel.name() + " 商业:",characterModel.intelligence() + characterModel.agility(), value, feat);
	characterModel.featPlus(feat);
	//运气经验
	characterModel.plusPropertiesExp("luck");
}
function policeRun(characterModel){
	//治安：武力*2+敏捷
	var value = getJobResult((characterModel.force() * 2 + characterModel.agility() - JobCoefficient.NORMAL),JobCoefficient.POLICE);
	var value = value * (characterModel.hasSkill(SkillSubType.POLICE) ? 1.5 : 1);
	characterModel.city().police(value >>> 0);
	characterModel.job(Job.IDLE);
	var feat = JobFeatCoefficient.NORMAL * value / JobFeatCoefficient.POLICE;
	//console.log(characterModel.name() + " 治安:",characterModel.force()*2 + characterModel.agility(), value, feat);
	characterModel.featPlus(feat);
	//武力经验
	characterModel.plusPropertiesExp("force");
}
function technologyRun(characterModel){
	//技术：智力+统率
	var value = getJobResult(characterModel.intelligence() + characterModel.command(),JobCoefficient.TECHNOLOGY);
	var value = value * (characterModel.hasSkill(SkillSubType.TECHNOLOGY) ? 1.5 : 1);
	characterModel.city().technology(value >>> 0);
	characterModel.job(Job.IDLE);
	var feat = JobFeatCoefficient.NORMAL * value / JobFeatCoefficient.TECHNOLOGY;
	//console.log(characterModel.name() + " 技术:",characterModel.intelligence() + characterModel.command(), value, feat);
	characterModel.featPlus(feat);
	//智力经验
	characterModel.plusPropertiesExp("intelligence");
}
function enlistRun(characterModel, targetEnlist){
	//招募：运气+统率
	characterModel.job(Job.IDLE);
	if(!targetEnlist){
		return;
	}
	//console.log("enlistRun招募 : ",characterModel.id());
	var area = characterModel.city();
	var population = area.population();
	var minPopulation = AreaModel.populationList[area.level() - 1][0];
	if(population <= minPopulation){
		return;
	}
	var troop = area.troops();
	var value01 = getJobResult(characterModel.luck(),JobCoefficient.ENLIST);
	var value02 = getJobResult(characterModel.command(),JobCoefficient.ENLIST);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.ENLIST) ? 1.5 : 1);
	var quantity = (targetEnlist.quantity * value / JobCoefficient.NORMAL) >> 0;
	if(quantity > population - minPopulation){
		quantity = (population - minPopulation)*Math.fakeRandom();
	}
	quantity = (quantity >>> 0);
	area.population(-quantity);
	troop += quantity;
	area.troops(troop);
	area.police(-(quantity * 0.05 >>> 0));
	var feat = JobFeatCoefficient.NORMAL * quantity / JobFeatCoefficient.ENLIST;
	characterModel.featPlus(feat);
	//统率经验
	characterModel.plusPropertiesExp("command");
}
function persuadeRun(characterModel, targetPersuadeId){
	//劝降：忠诚度+义气+运气+武将相性
	characterModel.job(Job.IDLE);
	var targetPersuade = CharacterModel.getChara(targetPersuadeId);
	if(!targetPersuade.seignior() || targetPersuade.seigniorId() == targetPersuadeId || !targetPersuade.city()){
		removeCanPersuadeCharacters(targetPersuadeId);
		characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
		return false;
	}
	if(!targetPersuade || targetPersuade.seigniorId() == characterModel.seigniorId()){
		characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
		return false;
	}
	var loyalty = targetPersuade.validLoyalty(), compatibility, percentage;
	if(loyalty >= 100){
		if(characterModel.seigniorId() == LMvc.selectSeignorId && !characterModel.city().isAppoint()){
			SeigniorExecute.addMessage(String.format(Language.get("persuadeRefuseMessage"),targetPersuade.name(),characterModel.name()));
		}
		characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
		return false;
	}
	percentage = (100 - loyalty) * 0.01;
	var percentageLuck = (JobCoefficient.NORMAL + characterModel.luck()) * 0.5 / JobCoefficient.NORMAL;
	percentage *= (0.5 + 0.5 * percentageLuck);
	
	compatibility = Math.abs(characterModel.compatibility() - targetPersuade.compatibility());
	if(compatibility > JobCoefficient.COMPATIBILITY){
		compatibility -= JobCoefficient.COMPATIBILITY;
	}
	var percentageCompatibility = (JobCoefficient.COMPATIBILITY - compatibility) / JobCoefficient.COMPATIBILITY;
	percentage *= (0.5 + 0.5 * percentageCompatibility);
	
	var rand = Math.fakeRandom();
	if(rand > percentage){
		if(characterModel.seigniorId() == LMvc.selectSeignorId && !characterModel.city().isAppoint()){
			SeigniorExecute.addMessage(String.format(Language.get("persuadeRefuseMessage"),targetPersuade.name(),characterModel.name()));
		}
		characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
		return false;
	}
	var targetSeigniorId = targetPersuade.seigniorId();
	targetPersuade.seigniorId(characterModel.seigniorId());
	var loyalty = 50 + 50 * percentage >> 0;
	targetPersuade.loyalty(loyalty > 100 ? 100 : loyalty);
	targetPersuade.moveTo(characterModel.cityId());
	targetPersuade.moveTo();
	
	if(characterModel.seigniorId() == LMvc.selectSeignorId && !characterModel.city().isAppoint()){
		SeigniorExecute.addMessage(String.format(Language.get("persuadeSuccessMessage"),characterModel.name(),targetPersuade.name(),targetPersuade.name()));
	}
	characterModel.featPlus(JobFeatCoefficient.NORMAL);
	if(targetSeigniorId == LMvc.selectSeignorId){
		var persuadeMessage = String.format(Language.get("dialogPersuadeMessage"), targetPersuade.name(), characterModel.seignior().character().name());
		SeigniorExecute.addMessage(persuadeMessage);
		var obj = {title:Language.get("confirm"),message:persuadeMessage,height:200,okEvent:function(e){
			e.currentTarget.parent.remove();
			SeigniorExecute.run();
		}};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return true;
	}
	return false;
}
function spyRun(characterModel, cityId){
	//谍报：武力+运气
	//console.log("spyRun谍报 : "+characterModel.name()+","+cityId);
	var area = AreaModel.getArea(cityId);
	characterModel.job(Job.IDLE);
	if(characterModel.seigniorId() == area.seigniorCharaId()){
		//console.log("spyRun : 失败 null");
		characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
		return;
	}
	var spyValue = characterModel.force() + characterModel.luck();
	if(spyValue<JobCoefficient.SPY){
		if(spyValue < Math.fakeRandom()*JobCoefficient.SPY){
			//console.log("spyRun : 失败 能力不够");
			if(characterModel.seigniorId() == LMvc.selectSeignorId && !characterModel.city().isAppoint()){
				SeigniorExecute.addMessage(String.format(Language.get("spyFailMessage"),characterModel.name(),area.name()));
			}
			characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
			return;
		}
		//seignior = characterModel.seignior();
		//seignior.addSpyCity(cityId);
		//return;
	}
	var num = (spyValue / JobCoefficient.SPY) >>> 0;
	var seignior = characterModel.seignior();
	seignior.addSpyCity(cityId);
	characterModel.featPlus(JobFeatCoefficient.NORMAL);
	if(characterModel.seigniorId() == LMvc.selectSeignorId && !characterModel.city().isAppoint()){
		SeigniorExecute.addMessage(String.format(Language.get("spySuccessMessage"),characterModel.name(),area.name()));
	}
	num -= 1;
	spyValue = spyValue % JobCoefficient.SPY;
	if(spyValue>JobCoefficient.SPY || spyValue > Math.fakeRandom()*JobCoefficient.SPY){
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
	characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
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
	var area = characterModel.city();
	var outOfOffice = area.outOfOffice();
	//console.log("hireRun录用 : ",characterModel.id(),outOfOffice);
	var hireCharacterIndex = outOfOffice.findIndex(function(child){
		return child.id() == hireCharacterId;
	});
	//console.log("hireRun录用 hireCharacterIndex : ",CharacterModel.getChara(19).cityId(),hireCharacterId, hireCharacterIndex);
	characterModel.job(Job.IDLE);
	if(hireCharacterIndex < 0){
		//console.log("hireRun : 失败 null");
		if(characterModel.seigniorId() == LMvc.selectSeignorId && !area.isAppoint()){
			SeigniorExecute.addMessage(String.format(Language.get("hireFailMessage"),characterModel.name()));
		}
		characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
		return false;
	}
	//var hireCharacter = outOfOffice[hireCharacterIndex];
	var hireCharacter = CharacterModel.getChara(hireCharacterId);
	return hireRun2(characterModel, hireCharacter, area);
}
function hireRun2(characterModel, hireCharacter, area, isAccess){
	
	var outOfOffice = area.outOfOffice();
	var hireCharacterIndex = outOfOffice.findIndex(function(child){
		return child.id() == hireCharacter.id();
	});
	if(hireCharacterIndex < 0){
		SeigniorExecute.addMessage(String.format(Language.get("hireRefuseMessage"),hireCharacter.name(),characterModel.name()));
		characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
		return false;
	}
	
	var parentConfig = charactersParentConfig.find(function(child){
		return child.id == hireCharacter.id();
	});
	var parentIsOk = false, parentLoyalty;
	if(parentConfig){
		var parentCharacter = CharacterModel.getChara(parentConfig.parent);
		if(parentCharacter.seigniorId() == characterModel.seigniorId()){
			//关联君主在位
			parentLoyalty = parentCharacter.loyalty();
			parentIsOk = true;
		}
	}
	var compatibility;
	var percentage = (JobCoefficient.NORMAL + characterModel.luck()) * 0.5 / JobCoefficient.NORMAL;
	if(!parentIsOk){
		var seigniorId = characterModel.seigniorId();
		var seigniorChara = CharacterModel.getChara(seigniorId);
		compatibility = Math.abs(seigniorChara.compatibility() - hireCharacter.compatibility());
		if(compatibility > JobCoefficient.COMPATIBILITY){
			compatibility -= JobCoefficient.COMPATIBILITY;
		}
		percentage *= (JobCoefficient.COMPATIBILITY - compatibility) / JobCoefficient.COMPATIBILITY;
		
		//console.log("hireRun : 失败 " + rand + " > " + percentage + " = " + (rand > percentage));
		var rand = Math.fakeRandom();
		if(rand > percentage){
			//console.log("hireRun : 失败 " + rand + " > " + percentage + " = " + (rand > percentage));
			if(characterModel.seigniorId() == LMvc.selectSeignorId && !area.isAppoint()){
				SeigniorExecute.addMessage(String.format(Language.get("hireRefuseMessage"),hireCharacter.name(),characterModel.name()));
			}
			characterModel.featPlus(JobFeatCoefficient.NORMAL * 0.5);
			if(isAccess && characterModel.seigniorId() == LMvc.selectSeignorId && !area.isAppoint()){
				var script = String.format("SGJTalk.show({0},{1},{2});", hireCharacter.id(), 1, Language.get("hireFailTalk"));
				script += "SGJJobHelper.execute();";
				LGlobal.script.addScript(script);
				return true;
			}
			return false;
		}
	}
	
	hireCharacter.seigniorId(characterModel.seigniorId());
	area.addGenerals(hireCharacter);
	hireCharacter.cityId(characterModel.cityId());
	hireCharacter.job(Job.END);
	var loyalty = 50 + 50 * percentage >> 0;
	if(parentIsOk){
		loyalty = parentLoyalty;
	}
	hireCharacter.loyalty(loyalty > 100 ? 100 : loyalty);
	characterModel.featPlus(JobFeatCoefficient.NORMAL);
	if(characterModel.seigniorId() == LMvc.selectSeignorId && !area.isAppoint()){
		SeigniorExecute.addMessage(String.format(Language.get("hireSuccessMessage"),characterModel.name(),hireCharacter.name(),hireCharacter.name()));
		if(!LMvc.TutorialController){
			var script = String.format("SGJTalk.show({0},{1},{2});", hireCharacter.id(), 1, Language.get("hireSuccessTalk"));
			script += "SGJJobHelper.execute();";
			LGlobal.script.addScript(script);
			return true;
		}
	}
	return false;
}
function SeigniorExecuteChangeCityResources(area){
	//TODO::ver1.1自然灾害
	var minPopulation = AreaModel.populationList[0][0];
	var maxPopulation = AreaModel.populationList[AreaModel.populationList.length - 1][1];
	var population = area.population();
	//金钱
	var maxBusiness = AreaModel.businessList[AreaModel.businessList.length - 1];
	if(HarvestMonths.Money.indexOf(LMvc.chapterData.month) >= 0){
		var addMoney = 500 + 3500*area.business()/maxBusiness;
		addMoney *= (1 + population * 0.3 / maxPopulation);
		//console.log(area.name(), addMoney);
		area.money(addMoney >>> 0);
	}
	//粮食
	var maxAgriculture = AreaModel.agricultureList[AreaModel.agricultureList.length - 1];
	if(HarvestMonths.Food.indexOf(LMvc.chapterData.month)  >= 0){
		var addFood = 10000 + 40000*area.agriculture()/maxAgriculture;
		addFood *= (1 + population * 0.3 / maxPopulation);
		area.food(addFood >>> 0);
	}
	var police = area.police();
	var minPolice = 40;
	if(police>50){
		//人口增长
		var addPopulation = population * (0.005 * (police-50)/50 + 0.002*area.business()/maxBusiness + 0.003*area.agriculture()/maxAgriculture);
		area.population(addPopulation);
	}else if (police < 40) {
		var minusValue = (minPolice - police)/minPolice;
		var nowMin = AreaModel.populationList[area.level() - 1][0];
		if(population > nowMin*0.9){
			//人口流失
			var minusPopulation = population*0.01*minusValue;
			area.population(-minusPopulation);
		}
		//暴动
		if(Math.fakeRandom() < 0.2){
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
			if(area.seigniorCharaId() == LMvc.selectSeignorId){
				SeigniorExecute.addMessage(String.format(Language.get("riot_message"),area.name()));
			}
		}
	}
	//武将忠诚随相性随机降低
	charactersLoyaltyToDown(area);
	//在野武将移动
	outOfOfficeCharactersMove(area);
}
//装备
function toEquipmentItem(item, characterModel){
	var key = item.params()[0];
	var equipItem = characterModel.getEquipment(item.position());
	if(equipItem && equipItem[key] >= item[key]){
		return false;
	}
	characterModel.equip(item);
	return true;
}
//装备
function toEquipmentCityItem(item, cityModel){
	var generals = cityModel.generals();
	var length = generals.length;
	var key = item.params()[0];
	generals = generals.sort(function(a,b){
		return b.data[key] - a.data[key];
	});
	var generalMustList = [];
	var generalList = [];
	for(var i=0;i<length;i++){
		var general = generals[i];
		if(key == "force"){
			var soldierType = general.currentSoldiers().soldierType();
			if(soldierType == SoldierType.Magic){
				continue;
			}else if(soldierType == SoldierType.Comprehensive && general.data.force < general.data.intelligence){
				continue;
			}
		}else if(key == "intelligence"){
			var soldierType = general.currentSoldiers().soldierType();
			if(soldierType == SoldierType.Physical){
				continue;
			}else if(soldierType == SoldierType.Comprehensive && general.data.force > general.data.intelligence){
				continue;
			}
		}
		var equipItem = general.getEquipment(item.position());
		if(equipItem && equipItem[key] >= item[key]){
			continue;
		}
		if((general[key]() / 10 >>> 0) - (general.data[key] / 10 >>> 0) >= 1){
			continue;
		}
		if(((general.data[key] + item[key]) / 10 >>> 0) - (general.data[key] / 10 >>> 0) >= 1){
			generalMustList.push(general);
		}else{
			generalList.push(general);
		}
	}
	if(generalMustList.length + generalList.length == 0){
		return false;
	}
	var general = generalMustList.length > 0 ? generalMustList[0] : generalList[0];
	if(toEquipmentItem(item, general)){
		return true;
	}
	return false;
}
//武将忠诚随相性随机降低
function charactersLoyaltyToDown(area){
	var generals = area.generals();
	for(var i=0;i<generals.length;i++){
		var general = generals[i];
		var seignior = general.seignior();
		if(!seignior){
			area.addOutOfOfficeCharacter(general);
			continue;
		}
		var compatibility = Math.abs(seignior.character().compatibility() - general.compatibility());
		if(compatibility > JobCoefficient.COMPATIBILITY){
			compatibility -= JobCoefficient.COMPATIBILITY;
		}
		compatibility = compatibility / JobCoefficient.COMPATIBILITY;
		if(compatibility > 0.3){
			continue;
		}
		compatibility = compatibility * 0.2;
		var loyalty = general.loyalty();
		if((loyalty == 100 && Math.fakeRandom() > compatibility * 0.1) || Math.fakeRandom() > compatibility){
			continue;
		}
		general.loyalty(loyalty - 1);
	}
}
//武将死亡
function charactersNaturalDeath(area){
	if(!deathIsValid()){
		return false;
	}
	var generals = area.generals();
	var prefecture = area.prefecture();
	var prefectureDie = false;
	var seigniorCharaId = area.seigniorCharaId();
	var seignior = area.seignior();
	var seigniorName = seignior.character().name();
	var seigniorCharaDie = false;
	var length = generals.length;
	var generalsName = [];
	for(var i=length-1;i>=0;i--){
		var general = generals[i];
		if(general.age() <= general.life()){
			continue;
		}
		var value = general.age() - general.life();
		//TODO::武将到达年龄，几率死亡
		if(Math.fakeRandom() > 0.5 + 0.1 * value){
			continue;
		}
		general.toDie(true);
		generalsName.push(general.name());
		if(general.id() == prefecture){
			prefectureDie = true;
		}
		if(general.id() == seigniorCharaId){
			seigniorCharaDie = true;
		}
	}
	if(generalsName.length == 0){
		return false;
	}
	var obj;
	if(seigniorCharaId == LMvc.selectSeignorId){
		var generalsCount = seignior.generalsCount();
		if(seigniorCharaDie){
			if(generalsCount>0){
				obj = {title:Language.get("confirm"),
				message:String.format(Language.get("monarch_die_select"), generalsName.join(", ")),
				height:200,okEvent:function(event){
					event.currentTarget.parent.remove();
					SeigniorExecute.Instance().backLayer.visible = false;
					SeigniorExecute.Instance().msgView.hideSeignior();
					LMvc.MapController.checkSeigniorChange(LMvc.selectSeignorId);
				}};
			}else{
				//game over
				obj = {title:Language.get("confirm"),
				message:String.format(Language.get("generals_die_over"), generalsName.join(", ")),
				height:200,okEvent:function(event){
					event.currentTarget.parent.remove();
					LMvc.MapController.checkSeigniorFail(LMvc.selectSeignorId);
				}};
			}
		}else{
			if(prefectureDie){
				appointPrefecture(area);
			}
			obj = {title:Language.get("confirm"),
			message:String.format(Language.get("generals_die_over"), generalsName.join(", ")),
			height:200,okEvent:function(event){
				event.currentTarget.parent.remove();
				SeigniorExecute.run();
			}};
		}
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return true;
	}
	if(seigniorCharaDie){
		var newSeigniorId = monarchChange(seigniorCharaId);
		if(newSeigniorId > 0){
			obj = {title:Language.get("confirm"),
			message:String.format(Language.get("monarch_die"), seigniorName, seignior.character().name()),
			height:200,okEvent:function(event){
				event.currentTarget.parent.remove();
				SeigniorExecute.run();
			}};
		}else{
			obj = {title:Language.get("confirm"),
			message:String.format(Language.get("monarch_die_over"), seigniorName),
			height:200,okEvent:function(event){
				event.currentTarget.parent.remove();
				LMvc.MapController.checkSeigniorFail(seigniorCharaId);
			}};
		}
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
	}else if(prefectureDie){
		appointPrefecture(area);
	}
	return seigniorCharaDie;
}
//在野武将移动
function outOfOfficeCharactersMove(area){
	if(LMvc.TutorialController){
		return;
	}
	var characters = area.outOfOffice();
	var length = characters.length;
	var neighbor = length > 0 ? area.neighbor() : null;
	var moveCount = 0;
	for(var i=length-1;i>=0;i--){
		var character = characters[i];
		if(character.seigniorId() > 0){
			area.removeOutOfOffice(character.id());
			continue;
		}
		if(character.job() != Job.IDLE){
			character.job(Job.IDLE);
			continue;
		}
		var rand = Math.fakeRandom();
		if(rand > 0.2){
			continue;
		}
		var neighborCityId = neighbor[(Math.fakeRandom() * neighbor.length) >>> 0];
		character.moveTo(neighborCityId);
		character.moveTo();
		character.job(Job.END);
		moveCount++;
	}
}
//褒奖
function toPrizedByMoney(characterModel){
	if(characterModel.city().money() < JobPrice.PRIZE){
		return 0;
	}
	characterModel.city().money(-JobPrice.PRIZE);
	var personalLoyaltyValue = 5;
	var compatibilityValue = 3;
	var value1 = personalLoyaltyValue * characterModel.personalLoyalty()/15;
	var value2 = compatibilityValue * (150 - Math.abs(characterModel.compatibility() - characterModel.seignior().character().compatibility())) / 150;
	var upValue = (value1 + value2) >>> 0;
	var value = (value1 + value2 - upValue)*0.5 + 0.5;
	if(value > Math.fakeRandom()){
		upValue += 1;
	}
	var loyalty = characterModel.loyalty() + upValue;
	loyalty = loyalty > 100 ? 100 : loyalty;
	characterModel.loyalty(loyalty);
	characterModel.isPrized(true);
	return upValue;
}
//俘虏忠诚度变化
function captivesChangeLoyalty(area){
	var captives = area.captives();
	for(var i=0;i<captives.length;i++){
		var chara = captives[i];
		chara.job(Job.IDLE);
		var parentConfig = charactersParentConfig.find(function(child){
			return child.id == chara.id();
		});
		if(parentConfig){
			var parentCharacter = CharacterModel.getChara(chara.seigniorId());
			if(chara.seigniorId() == parentConfig.parent && parentCharacter && parentCharacter.seigniorId() > 0){
				continue;
			}
		}
		var personalLoyalty = chara.personalLoyalty();
		var minus = 16 - personalLoyalty;
		if(LMvc.chapterData.month % 2 == 0){
			minus = (minus / 2) >>> 0;
		}
		if(minus == 0){
			continue;
		}
		var loyalty = chara.loyalty();
		var toLoyalty = loyalty - minus > 0 ? loyalty - minus : 0;
		chara.loyalty(toLoyalty);
	}
}
//武将忠诚度变化
function generalsChangeLoyalty(generals){
	for(var i=0;i<generals.length;i++){
		var chara = generals[i];
		if(chara.id() == chara.seigniorId()){
			continue;
		}
		var parentConfig = charactersParentConfig.find(function(child){
			return child.id == chara.id();
		});
		if(parentConfig && chara.seigniorId() == parentConfig.parent){
			return;
		}
		var personalLoyalty = chara.personalLoyalty();
		if((personalLoyalty > 5 && chara.loyalty() == 100) || chara.loyalty() + (personalLoyalty - 5) >= 100){
			continue;
		}
		var minus = (15 - personalLoyalty) / 3 >>> 0;
		var loyalty = chara.loyalty();
		var toLoyalty = loyalty - minus > 0 ? loyalty - minus : 0;
		chara.loyalty(toLoyalty);
	}
}
//比武大会报酬
function tournamentsGet(result){
	var message = Language.get("tournaments_get_message_"+result);
	var ids, arr;
	switch (result) {
		case 0:
			arr = [
			{id:4,q:1},//玉环x1
			{id:11,q:2},//练兵铜牌x2
			{id:12,q:4},//练兵铁牌x4
			{id:14,q:2},//将军印x2
			{id:15,q:4}//印绶x4
			];
			break;
		case 1:
			arr = [
			{id:1,q:1},//方壶x1
			{id:2,q:2},//美酒x2
			{id:3,q:3},//香囊x3
			{id:4,q:4},//玉环x4
			{id:10,q:8},//练兵金牌x8
			{id:11,q:12},//练兵铜牌x12
			{id:12,q:16},//练兵铁牌x16
			{id:13,q:8},//元帅印x8
			{id:14,q:12},//将军印x12
			{id:15,q:16}//印绶x16
			];
			break;
		case 2:
			arr = [
			{id:2,q:1},//美酒x1
			{id:3,q:2},//香囊x2
			{id:4,q:3},//玉环x3
			{id:10,q:4},//练兵金牌x4
			{id:11,q:6},//练兵铜牌x6
			{id:12,q:8},//练兵铁牌x8
			{id:13,q:4},//元帅印x4
			{id:14,q:6},//将军印x6
			{id:15,q:8}//印绶x8
			];
			break;
		case 4:
			arr = [
			{id:3,q:1},//香囊x1
			{id:4,q:2},//玉环x2
			{id:11,q:4},//练兵铜牌x4
			{id:12,q:6},//练兵铁牌x6
			{id:14,q:4},//将军印x4
			{id:15,q:6}//印绶x6
			];
			break;
		default:
			break;
	}
	ids = [];
	while(ids.length < 4){
		var i = arr.length * Math.random() >>> 0;
		ids.push(arr[i]);
		arr.splice(i, 1);
	}
	if(result == 1 && deathIsValid()){
		ids.push({id:91,q:1});//延寿符x1
	}
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var getLabels = [];
	for(var i=0;i<ids.length;i++){
		var itemData = ids[i];
		for(var j=0;j<itemData.q;j++){
			var item = new ItemModel(null,{item_id:itemData.id,count:1});
			seignior.addItem(item);
			if(j > 0){
				continue;
			}
			getLabels.push(item.name() + "x" + itemData.q);
		}
	}
	message = String.format(message, getLabels.join("\n"));
	
	var obj = {title:Language.get("confirm"),
	message:message,
	height:320,okEvent:function(event){
		event.currentTarget.parent.remove();
		SeigniorExecute.run();
	}};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
}
