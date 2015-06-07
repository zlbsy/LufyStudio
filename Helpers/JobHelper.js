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
	//治安：武力+敏捷
	//商业：智力+运气
	//农业：智力+敏捷
	//技术：智力+统率
	//修补：武力+统率
	//招募：运气+统率
	//谍报：武力+运气
var JobCoefficient = {
	NORMAL:90,
	AGRICULTURE:1,
	BUSINESS:1,
	POLICE:1,
	TECHNOLOGY:1,
};*/
function getJobResult(realValue,coefficient){
	var value = (JobCoefficient.NORMAL + realValue) * coefficient;
	return value;
}
function agricultureRun(characterModel){
	console.log("agricultureRun : ",characterModel.id());
	var value01 = getJobResult(characterModel.luck(),JobCoefficient.AGRICULTURE);
	var value02 = getJobResult(characterModel.luck(),JobCoefficient.AGRICULTURE);
	characterModel.city().agriculture(value01 + value02);
	characterModel.job(Job.IDLE);
}
function businessRun(characterModel){
	console.log("businessRun : ",characterModel.id());
	characterModel.job(Job.IDLE);
}
function policeRun(characterModel){
	//治安：武力+爆发
	console.log("policeRun : ",characterModel.id());
	characterModel.job(Job.IDLE);
}
function technologyRun(characterModel){
	console.log("technologyRun : ",characterModel.id());
	characterModel.job(Job.IDLE);
}