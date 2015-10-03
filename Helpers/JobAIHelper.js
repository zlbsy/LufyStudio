function jobAiEvent(){
	return false;
}
function getCanBattleCitys(areaModel){
	return [];
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
function jobAiNeedToEnlist(areaModel){
	return false;
}
function jobAiCanToEnlish(areaModel){
	return false;
}
function jobAiToEnlish(areaModel,characters){
	if(characters.length == 0){
		return;
	}
}
function jobAiSpy(areaModel,characters){
	if(characters.length == 0){
		return;
	}
}
function jobAiFarmland(areaModel,characters){
	if(characters.length == 0){
		return;
	}
}
function jobAiDiplomacy(areaModel,characters){
	if(characters.length == 0){
		return;
	}
}
function jobAiGeneralMove(areaModel,characters){
	if(characters.length == 0){
		return;
	}
}
function jobAiTransport(areaModel,characters){
	if(characters.length == 0){
		return;
	}
}
function jobAiTavern(areaModel,characters){
	if(characters.length == 0){
		return;
	}
}
function jobAiInstitute(areaModel,characters){
	if(characters.length == 0){
		return;
	}
}
function jobAiMarket(areaModel,characters){
	if(characters.length == 0){
		return;
	}
}