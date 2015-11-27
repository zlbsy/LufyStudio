/**
 * 俘虏概率
 */
function calculateHitrateCaptive(chara){
	if(chara.data.hasSkill(SkillSubType.RETREAT)){
		return false;
	}
	var addRate = false;
	var positions = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
	var locationX = chara.locationX();
	var locationY = chara.locationY();
	var charaLayer = LMvc.BattleController.view.charaLayer;
	for(var i=0,l=positions.length;i<l;i++){
		var position = positions[i];
		var child = charaLayer.getCharacterFromLocation(locationX+position[0],locationY+position[1]);
		if(!child){
			continue;
		}
		if(isSameBelong(child.belong, chara.belong) && child.data.hasSkill(StrategyEffectType.Flee)){
			return false;
		}
		if(!isSameBelong(child.belong, chara.belong) && child.data.hasSkill(StrategyEffectType.Capture)){
			addRate = true;
		}
	}
	return Math.random() < 0.1*(addRate?2:1);
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

