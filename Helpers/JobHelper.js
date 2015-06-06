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