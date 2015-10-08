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
AiEnlistFlag = {
	None:0,
	Must:1,
	Need:2,
	Battle:3,
	MustResource:4,
	NeedResource:5,
	BattleResource:6,
	Free:7
};
function jobAiNeedToEnlist(areaModel){
	if(areaModel.troops() >= areaModel.maxTroops()){
		return AiEnlistFlag.Node;
	}
	var charas = getDefenseEnemiesFromCity(areaModel);
	var minToops = 0;
	for(var i = 0,l=charas.length;i<l;i++){
		var chara = charas[i];
		minToops += chara.maxTroops();
	}
	if(areaModel.troops() < minToops){ 
		return AiEnlistFlag.Must ;
	}
	if(areaModel.agriculture() < areaModel.maxAgriculture()*0.3 || areaModel.business() < areaModel.maxBusiness()*0.3 || areaModel.cityDefense() < areaModel.maxCityDefense()*0.3){
		return AiEnlistFlag.MustResource;
	}
	if(areaModel.troops() < minToops * 2){
		return AiEnlistFlag.Need;
	}
	if(areaModel.agriculture() < areaModel.maxAgriculture()*0.6 || areaModel.business() < areaModel.maxBusiness()*0.6 || areaModel.cityDefense() < areaModel.maxCityDefense()*0.6){
		return AiEnlistFlag.NeedResource;
	}
	if(areaModel.troops() < minToops * 3){
		return AiEnlistFlag.Battle;
	}
	if(areaModel.agriculture() < areaModel.maxAgriculture() || areaModel.business() < areaModel.maxBusiness() || areaModel.cityDefense() < areaModel.maxCityDefense()){
		return AiEnlistFlag.BattleResource;
	}
	return AiEnlistFlag.Free;
}
function jobAiCanToEnlish(areaModel){
	if(areaModel.population() <= areaModel.minPopulation()){
		return false;
	}
	if(areaModel.money() < JobPrice.ENLIST){
		return false;
	}
	return true;
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