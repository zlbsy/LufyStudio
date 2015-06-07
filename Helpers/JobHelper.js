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
	characterModel.city().police(value01 + value02);
	characterModel.job(Job.IDLE);
}
function enlistRun(characterModel){
	//招募：运气+统率
	console.log("enlistRun : ",characterModel.id());
	
	characterModel.job(Job.IDLE);
}
