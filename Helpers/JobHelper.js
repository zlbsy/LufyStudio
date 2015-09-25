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
	}
	console.error("Can't get JobPrice");
	return 0;
}
/*
var JobCoefficient = {
	NORMAL:90,
	AGRICULTURE:1,
	BUSINESS:1,
	POLICE:1,
	TECHNOLOGY:1,
};
//外交:智力+运气
访问：智力+统率+运气
//农地探索：智力+武力+运气
//市场探索：智力+敏捷+运气
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
		return;
	}
	var cityModel = characterModel.city();
	var notDebut = cityModel.notDebut();
	if(notDebut.length == 0){
		console.log("accessRun : 失败");
		return;
	}
	var charaId = notDebut[notDebut.length*Math.random() >>> 0];
	
	var targetModel = CharacterModel.getChara(charaId);
	var area = characterModel.city();
	var outOfOffice = area.outOfOffice();
	outOfOffice.push(targetModel);
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
	console.log("exploreAgricultureRun : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.EXPLORE_AGRICULTURE);
	var value02 = getJobResult(characterModel.force(),JobCoefficient.EXPLORE_AGRICULTURE);
	var value03 = getJobResult(characterModel.luck(),JobCoefficient.EXPLORE_AGRICULTURE);
	var value = value01 + value02 + value03;
	var rand = Math.random();
	
	if(rand > value){
		console.log("exploreAgricultureRun : 失败 能力不够");
		return;
	}
	var cityModel = characterModel.city();
	var items = cityModel.itemsFarmland();
	var index = exploreItems(items);
	if(index < 0){
		console.log("exploreAgricultureRun : 失败");
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
}
function exploreBusinessRun(characterModel){
	//市场探索：智力+敏捷+运气
	console.log("exploreBusinessRun : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.EXPLORE_BUSINESS);
	var value02 = getJobResult(characterModel.agility(),JobCoefficient.EXPLORE_BUSINESS);
	var value03 = getJobResult(characterModel.luck(),JobCoefficient.EXPLORE_BUSINESS);
	var value = value01 + value02 + value03;
	var rand = Math.random();
	
	if(rand > value){
		console.log("exploreBusinessRun : 失败 能力不够");
		return;
	}
	var cityModel = characterModel.city();
	var items = cityModel.itemsMarket();
	var index = exploreItems(items);
	if(index < 0){
		console.log("exploreBusinessRun : 失败");
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
}
function transportRun(characterModel, transportData){
	//运输物资
	console.log("transportRun : ",characterModel.id());
	characterModel.job(Job.IDLE);
	var cityModel = AreaModel.getArea(transportData.cityId);
	var troops = cityModel.troops();
	cityModel.troops(troops + transportData.troops);
	cityModel.food(transportData.food);
	cityModel.money(transportData.money);
}
function repairRun(characterModel){
	//修补：武力+统率
	console.log("repairRun : ",characterModel.id());
	var value01 = getJobResult(characterModel.force(),JobCoefficient.REPAIR);
	var value02 = getJobResult(characterModel.command(),JobCoefficient.REPAIR);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.AGRICULTURE) ? 1.5 : 1);
	characterModel.city().cityDefense(value >>> 0);
	characterModel.job(Job.IDLE);
}
function agricultureRun(characterModel){
	//农业：智力+武力
	console.log("agricultureRun : ",characterModel.id());
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.AGRICULTURE);
	var value02 = getJobResult(characterModel.force(),JobCoefficient.AGRICULTURE);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.AGRICULTURE) ? 1.5 : 1);
	characterModel.city().agriculture(value >>> 0);
	characterModel.job(Job.IDLE);
}
function businessRun(characterModel){
	//商业：智力+敏捷
	console.log("businessRun : ",characterModel.id());
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.BUSINESS);
	var value02 = getJobResult(characterModel.agility(),JobCoefficient.BUSINESS);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.BUSINESS) ? 1.5 : 1);
	characterModel.city().business(value >>> 0);
	characterModel.job(Job.IDLE);
}
function policeRun(characterModel){
	//治安：武力+敏捷
	console.log("policeRun : ",characterModel.id());
	var value01 = getJobResult(characterModel.force(),JobCoefficient.POLICE);
	var value02 = getJobResult(characterModel.agility(),JobCoefficient.POLICE);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.POLICE) ? 1.5 : 1);
	characterModel.city().police(value >>> 0);
	characterModel.job(Job.IDLE);
}
function technologyRun(characterModel){
	//技术：智力+统率
	console.log("technologyRun : ",characterModel.id());
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.TECHNOLOGY);
	var value02 = getJobResult(characterModel.command(),JobCoefficient.TECHNOLOGY);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.TECHNOLOGY) ? 1.5 : 1);
	characterModel.city().technology(value >>> 0);
	characterModel.job(Job.IDLE);
}
function enlistRun(characterModel, targetEnlist){
	//招募：运气+统率
	console.log("enlistRun : ",characterModel.id());
	var area = characterModel.city();
	var troop = area.troops();
	var value01 = getJobResult(characterModel.luck(),JobCoefficient.ENLIST);
	var value02 = getJobResult(characterModel.command(),JobCoefficient.ENLIST);
	console.log("SkillSubType="+SkillSubType+","+SkillSubType.ENLIST);
	var value = (value01 + value02) * (characterModel.hasSkill(SkillSubType.ENLIST) ? 1.5 : 1);
	var quantity = (targetEnlist.quantity * value / JobCoefficient.NORMAL) >> 0;
	troop += quantity;
	console.log("troop="+troop);
	area.troops(troop);
	characterModel.job(Job.IDLE);
}
function spyRun(characterModel, cityId){
	//谍报：武力+运气
	console.log("spyRun : "+characterModel.name()+","+cityId);
	var area = AreaModel.getArea(cityId);
	characterModel.job(Job.IDLE);
	if(characterModel.seigniorId() == area.seigniorCharaId()){
		//TODO::失败:己方城池
		console.log("spyRun : 失败 null");
		return;
	}
	console.log("spyValue count");
	var seignior;
	var spyValue = characterModel.force() + characterModel.luck();
	if(spyValue<JobCoefficient.SPY){
		if(spyValue < Math.random()*JobCoefficient.SPY){
			console.log("spyRun : 失败 能力不够");
			return;
		}
		seignior = characterModel.seignior();
		seignior.addSpyCity(cityId);
		return;
	}
	var num = (spyValue / JobCoefficient.SPY) >>> 0;
	console.log("spyRun : num="+num);
	seignior = seignior || characterModel.seignior();
	console.log("spyRun : seignior="+seignior);
	seignior.addSpyCity(cityId);
	num -= 1;
	console.log("spyRun : num="+num);
	spyValue = spyValue % JobCoefficient.SPY;
	if(spyValue>JobCoefficient.SPY || spyValue > Math.random()*JobCoefficient.SPY){
		num += 1;
	}
	console.log("spyRun : num2="+num);
	if(num = 0){
		return;
	}
	var neighbors = area.neighbor();
	console.log("spyRun : neighbors="+neighbors.length);
	var citys = [];
	for(var i=0;i<neighbors.length;i++){
		var child = AreaModel.getArea(neighbors[i]);
		if(child.seigniorCharaId() == characterModel.seigniorId()){
			continue;
		}
		citys.push(neighbors[i]);
	}
	console.log("spyRun : citys="+citys.length);
	if(citys.length == 0){
		return;
	}
	if(num > citys.length){
		num = citys.length;
	}
	citys = Array.getRandomArrays(citys, num);
	console.log("spyRun : neighbors="+citys);
	for(var i = 0;i<citys.length;i++){
		seignior.addSpyCity(citys[i]);
	}
}
function hireRun(characterModel, hireCharacterId){
	//录用：运气+相性
	console.log("hireRun : ",characterModel.id());
	var area = characterModel.city();
	var outOfOffice = area.outOfOffice();
	var hireCharacterIndex = outOfOffice.findIndex(function(child){
		return child.id() == hireCharacterId;
	});
	characterModel.job(Job.IDLE);
	if(hireCharacterIndex < 0){
		//TODO::失败
		console.log("hireRun : 失败 null");
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
}

