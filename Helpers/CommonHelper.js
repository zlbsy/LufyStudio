/**
 * 俘虏概率
 */
function calculateHitrateCaptive(chara){
	var rate = 1;
	if(chara.data.hasSkill(SkillSubType.RETREAT)){
		rate = 0.2;
	}else{
		var positions = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
		var locationX = chara.locationX();
		var locationY = chara.locationY();
		var charaLayer = LMvc.BattleController.view.charaLayer;
		for(var i=0,l=positions.length;i<l;i++){
			var position = positions[i];
			var child = charaLayer.getCharacterFromLocation(locationX+position[0],locationY+position[1]);
			if(!child || !isSameBelong(child.belong, chara.belong) || !child.data.hasSkill(SkillSubType.RETREAT)){
				continue;
			}
			rate = 0.2;
			break;
		}
	}
	return Math.random() < 0.1*rate;
}
/**
 * 投降概率
 */
function calculateHitrateSurrender(seignorId, charaModel){
	var maxPersonalLoyalty = 15;
	var personalLoyalty = charaModel.personalLoyalty();
	var maxLoyalty = 80;
	if(maxPersonalLoyalty == personalLoyalty){
		maxLoyalty = 1;
	}
	var surrebderLoyalty = maxLoyalty*personalLoyalty/maxPersonalLoyalty;
	var loyalty = charaModel.loyalty();
	if(surrebderLoyalty >= loyalty){
		return true;
	}
	return false;
}
/**
 * 斩首概率
 */
function calculateHitrateBehead(leaderId, charaModel){
	if(Math.random() > 0.1){
		return false;
	}
	var sum = 75;
	var leader = CharacterModel.getChara(leaderId);
	var compatibility = Math.abs(leader.compatibility() - charaModel.compatibility());
	if(compatibility > sum){
		compatibility = sum;
	}
	return Math.random() < compatibility/sum;
}
/**
 * 释放概率
 */
function calculateHitrateRelease(leaderId, charaModel){
	if(Math.random() > 0.2){
		return false;
	}
	var sum = 75;
	var leader = CharacterModel.getChara(leaderId);
	var compatibility = Math.abs(leader.compatibility() - charaModel.compatibility());
	if(compatibility > sum){
		compatibility = sum;
	}
	return Math.random() > compatibility/sum;;
}
function getIdentity(value){
	var identitis = ["在野","一般","太守"];
}
function gameDataInit(){
	var data = LMvc.areaData;
	console.log("gameDataInit");
	SeigniorModel.setSeignior(data.seigniors);
	for(var i=0,l=data.seigniors.length;i<l;i++){
		var seignior = data.seigniors[i];
		var areas = seignior.areas;
		var areaList = [];
		areas.forEach(function(child){
			var area = AreaModel.getArea(child.area_id);
			area.setSeignor(seignior,child);
			areaList.push(area);
		});
		seignior.areas = areaList;
	}
	console.log("gameDataInit o");
}
function NumberToString(value, length){
	value = ""+value;
	while(value.length < length){
		value = "0"+value;
	}
	return value;
}
