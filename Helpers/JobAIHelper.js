function jobAiEvent(){
	return false;
}
function getWeakBattleCity(areaModel){
	//最弱城池
	var neighbors = areaModel.neighbor();
	var enemyCitys = [];
	for(var i = 0;i < neighbors.length;i++){
		var child = AreaModel.getArea(neighbors[i]);
		if(child.seigniorCharaId() != areaModel.seigniorCharaId()){
			enemyCitys.push(child);
		}
	}
	if(enemyCitys.length == 0){
		return null;
	}
	enemyCitys = enemyCitys.sort(function(a,b){return a.powerful() - b.powerful();});
	return enemyCitys[0];
}
function getCanBattleCity(areaModel,characters,enlistFlag){
	if(enlistFlag == AiEnlistFlag.Must || enlistFlag == AiEnlistFlag.MustResource){
		return null;
	}
	var weakCity = getWeakBattleCity(areaModel);
	if(!weakCity){
		return null;
	}
	var generals = getPowerfulCharacters(characters);
	var needFood = 0;
	for(var i=0,l=generals.length;i<l && i<5;i++){
		var charaModel = generals[i];
		needFood += charaModel.maxTroops();
	}
	if(areaModel.food() < needFood){
		return null;
	}
	
	if(enlistFlag == AiEnlistFlag.Need || enlistFlag == AiEnlistFlag.NeedResource){
		return null;
	}
	return null;
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
	if(areaModel.money() < JobPrice.ENLIST){
		return false;
	}
	//self.enlistPrice * enlistCount / EnlistSetting.ENLIST_FROM >>> 0;
	var character = characters.shift();
	var num = EnlistSetting.ENLIST_TO - EnlistSetting.ENLIST_FROM;
	var cost = JobPrice.ENLIST * EnlistSetting.ENLIST_TO / EnlistSetting.ENLIST_FROM >>> 0;
	if(areaModel.money() < cost){
		num = (EnlistSetting.ENLIST_TO - EnlistSetting.ENLIST_FROM)*0.7;
		cost = JobPrice.ENLIST * (EnlistSetting.ENLIST_FROM + num) / EnlistSetting.ENLIST_FROM >>> 0;
	}
	if(areaModel.money() < cost){
		num = (EnlistSetting.ENLIST_TO - EnlistSetting.ENLIST_FROM)*0.3;
		cost = JobPrice.ENLIST * (EnlistSetting.ENLIST_FROM + num) / EnlistSetting.ENLIST_FROM >>> 0;
	}
	if(areaModel.money() < cost){
		num = 0;
		cost = JobPrice.ENLIST;
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