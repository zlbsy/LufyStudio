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
			return JobPrice.POLICE;
		case Job.TECHNOLOGY:
			return JobPrice.TECHNOLOGY;
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
	//修补：武力+统率
	//谍报：武力+运气*/
function getJobResult(realValue,coefficient){
	var value = (JobCoefficient.NORMAL + realValue) * coefficient;
	return value;
}
function agricultureRun(characterModel){
	//农业：智力+敏捷
	console.log("agricultureRun : ",characterModel.id());
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.AGRICULTURE);
	var value02 = getJobResult(characterModel.agility(),JobCoefficient.AGRICULTURE);
	characterModel.city().agriculture(value01 + value02);
	characterModel.job(Job.IDLE);
}
function businessRun(characterModel){
	//商业：智力+运气
	console.log("businessRun : ",characterModel.id());
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.BUSINESS);
	var value02 = getJobResult(characterModel.luck(),JobCoefficient.BUSINESS);
	characterModel.city().business(value01 + value02);
	characterModel.job(Job.IDLE);
}
function policeRun(characterModel){
	//治安：武力+敏捷
	console.log("policeRun : ",characterModel.id());
	var value01 = getJobResult(characterModel.force(),JobCoefficient.POLICE);
	var value02 = getJobResult(characterModel.agility(),JobCoefficient.POLICE);
	characterModel.city().police(value01 + value02);
	characterModel.job(Job.IDLE);
}
function technologyRun(characterModel){
	//技术：智力+统率
	console.log("technologyRun : ",characterModel.id());
	var value01 = getJobResult(characterModel.intelligence(),JobCoefficient.TECHNOLOGY);
	var value02 = getJobResult(characterModel.command(),JobCoefficient.TECHNOLOGY);
	characterModel.city().technology(value01 + value02);
	characterModel.job(Job.IDLE);
}
function enlistRun(characterModel, targetEnlist){
	//招募：运气+统率
	console.log("enlistRun : ",characterModel.id());
	var area = characterModel.city();
	var troop = area.troops(targetEnlist.id);
	var value01 = getJobResult(characterModel.luck(),JobCoefficient.ENLIST);
	var value02 = getJobResult(characterModel.command(),JobCoefficient.ENLIST);
	var quantity = (targetEnlist.quantity * (value01 + value02) / JobCoefficient.NORMAL) >> 0;
	troop.quantity += quantity;
	area.troops(targetEnlist.id, troop);
	characterModel.job(Job.IDLE);
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
	var compatibility;
	var hireCharacter = outOfOffice[hireCharacterIndex];
	var hireCharacter = CharacterModel.getChara(hireCharacterId);
	var percentage = (JobCoefficient.NORMAL + characterModel.luck()) * 0.5 / JobCoefficient.NORMAL;
	compatibility = Math.abs(characterModel.seignior().compatibility() - hireCharacter.compatibility());
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
	hireCharacter.seignior(characterModel.seignior().id());
	var loyalty = 100 * percentage >> 0;
	hireCharacter.loyalty(loyalty > 100 ? 100 : loyalty);
	outOfOffice.splice(hireCharacterIndex, 1);
	var generals = area.generals();
	generals.push(hireCharacter);
	console.log("hireRun : 成功");
}

