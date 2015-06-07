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
	//治安：武力+爆发
	//农业：运气+爆发
	//商业：智力+运气
	//修补：武力+统率
	//农业：运气+爆发
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
	//农业：运气+爆发
	var value = getJobResult(characterModel.luck(),JobCoefficient.AGRICULTURE);
	
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