/********************************************
 双击概率计算
 如果Sa/Sd<1，那么H=1；
 如果1<=Sa/Sd<2，那么H=2+18*（Sa/Sd-1）；
 如果2<=Sa/Sd<=3，那么H=20+80*（Sa/Sd-2）；
 如果Sa/Sd>=3，那么H=100；
 *********************************************/
function calculateDoubleAtt(attChara,hertChara){
	var attCharaModel = attChara.data;
	var hertCharaModel = hertChara.data;
	var h;
	//得到双方的爆发力
	var attBreakout = attCharaModel.breakout();
	var BreakoutAid = attChara.status.getStatus(StrategyType.BreakoutAid);
	if(BreakoutAid){
		attBreakout *= (1 + BreakoutAid.value);
	}
	var hertBreakout = hertCharaModel.breakout();
	BreakoutAid = hertChara.status.getStatus(StrategyType.BreakoutAid);
	if(BreakoutAid){
		hertBreakout *= (1 + BreakoutAid.value);
	}
	var rate = attBreakout/hertBreakout;
	if(rate < 1){
		h = 1;
	}else if(rate >= 1 && rate < 2){
		h = 2 + 18*(rate - 1);
	}else if(rate >= 2 && rate < 3){
		h = 20 + 80*(rate - 2);
	}else if(rate >= 3){
		h = 100;
	}
	if(Math.random()*100 <= h){
		return true;
	}
	return false;
}
/********************************************
 致命概率计算
 如果Sa/Sd<1，那么H=1；
 如果1<=Sa/Sd<2，那么H=2+18*（Sa/Sd-1）；
 如果2<=Sa/Sd<=3，那么H=20+80*（Sa/Sd-2）；
 如果Sa/Sd>=3，那么H=100；
 *********************************************/
function calculateFatalAtt(attChara,hertChara){
	var attCharaModel = attChara.data;
	var hertCharaModel = hertChara.data;
	var h;
	var h;
	//得到双方的士气
	var attMorale = attCharaModel.morale();
	var MoraleAid = attChara.status.getStatus(StrategyType.MoraleAid);
	if(MoraleAid){
		attMorale *= (1 + MoraleAid.value);
	}
	var hertMorale = hertCharaModel.morale();
	MoraleAid = hertChara.status.getStatus(StrategyType.MoraleAid);
	if(MoraleAid){
		hertMorale *= (1 + MoraleAid.value);
	}
	var rate = attMorale/hertMorale;
	if(rate < 1){
		h = 1;
	}else if(rate >= 1 && rate < 2){
		h = 2 + 18*(rate - 1);
	}else if(rate >= 2 && rate < 3){
		h = 20 + 80*(rate - 2);
	}else if(rate >= 3){
		h = 100;
	}
	if(Math.random()*100 <= h){
		return true;
	}
	return false;
}
/********************************************
 物理攻击的命中率<br>
 X代表我方的爆发力，Y代表敌方的爆发力。R表示命中率<br>
 if (x>2*y)<br>
 r=100;<br>
 else if(x>y)<br>
 r=(x-y)*10/y+90;<br>
 else if(x>y/2)<br>
 r=(x-y/2)*30/(y/2)+60;<br>
 else<br>
 r=(x-y/3)*30/(y/3)+30;<br>
 注：手套和盾有加成效果。比如敌人有辅助防御15%的宝物，那么最终的命中率是r-15<br>
 2、法术攻击的命中率<br>
 计算公式与1相同，其中X表示我方的精神力与运气之和，Y表示敌方的精神力与运气之和<br>
 再考虑宝物的加成<br>
 最后，不同的法术还会有具体的权重系数，比如还要乘以1.5、0.9等等。
 *********************************************/
function calculateHitrate(attChara,hertChara){
	//对方混乱
	if(hertChara.status.hasStatus(StrategyType.Chaos)){
		return true;
	}
	var attCharaModel = attChara.data;
	var hertCharaModel = hertChara.data;
	var r;
	//得到双方的爆发力
	var attBreakout = attCharaModel.breakout();
	var BreakoutAid = attChara.status.getStatus(StrategyType.BreakoutAid);
	if(BreakoutAid){
		attBreakout *= (1 + BreakoutAid.value);
	}
	var hertBreakout = hertCharaModel.breakout();
	BreakoutAid = hertChara.status.getStatus(StrategyType.BreakoutAid);
	if(BreakoutAid){
		hertBreakout *= (1 + BreakoutAid.value);
	}
	if(attBreakout > 2*hertBreakout){
		r = 100;
	}else if(attBreakout > hertBreakout){
		r=(attBreakout-hertBreakout)*10/hertBreakout+90;
	}else if(attBreakout > hertBreakout){
		r=(attBreakout-hertBreakout/2)*30/(hertBreakout/2)+60;
	}else{
		r=(attBreakout-hertBreakout/3)*30/(hertBreakout/3)+30;
	}
	if(Math.random()*100 <= r){
		return true;
	}
	return false;
}
/********************************************
 法术攻击的命中率<br>
 X代表我方的精神力与运气之和，Y代表敌方的精神力与运气之和。R表示命中率<br>
 if (x>2*y)<br>
 r=100;<br>
 else if(x>y)<br>
 r=(x-y)*10/y+90;<br>
 else if(x>y/2)<br>
 r=(x-y/2)*30/(y/2)+60;<br>
 else<br>
 r=(x-y/3)*30/(y/3)+30;<br>
 宝物的加成<br>
 *********************************************/
function calculateHitrateStrategy(attChara,hertChara){
	//对方混乱
	if(hertChara.status.hasStatus(StrategyType.Chaos)){
		return true;
	}
	var attCharaModel = attChara.data;
	var hertCharaModel = hertChara.data;
	var r;
	//得到双方的精神力与运气之和
	var attSpirit = attCharaModel.spirit();
	var ApiritAid = attChara.status.getStatus(StrategyType.ApiritAid);
	if(ApiritAid){
		attSpirit *= (1 + ApiritAid.value);
	}
	var attMorale = attCharaModel.morale();
	var MoraleAid = attChara.status.getStatus(StrategyType.MoraleAid);
	if(MoraleAid){
		attMorale *= (1 + MoraleAid.value);
	}
	var attX = attSpirit + attMorale;
	
	var hertSpirit = hertCharaModel.spirit();
	ApiritAid = hertChara.status.getStatus(StrategyType.ApiritAid);
	if(ApiritAid){
		hertSpirit *= (1 + ApiritAid.value);
	}
	var hertMorale = hertCharaModel.morale();
	MoraleAid = hertChara.status.getStatus(StrategyType.MoraleAid);
	if(MoraleAid){
		hertMorale *= (1 + MoraleAid.value);
	}
	var hertY = hertSpirit + hertMorale;
	
	if(attX > 2*hertY){
		r = 100;
	}else if(attX > hertY){
		r=(attX-hertY)*10/hertY+90;
	}else if(attX > hertY){
		r=(attX-hertY/2)*30/(hertY/2)+60;
	}else{
		r=(attX-hertY/3)*30/(hertY/3)+30;
	}
	if(Math.random()*100 <= r){
		return true;
	}	
	return false;
}
/************************************************************
 法术攻击的伤害值计算<br>
 X代表攻击方的精神力，Y代表被攻击方的精神力，Lv表示攻击方的等级。R表示伤害值<br>
 r=Lv+25+(X'-Y')/3;<br>
 然后再根据兵种相克和宝物进行修正
 **************************************************************/
function calculateHertStrategyValue(attChara,hertChara,currentSelectStrategy){
	var r;
	var attCharaModel = attChara.data;
	var hertCharaModel = hertChara.data;
	//得到攻击方的精神力和等级
	var attLv =  attCharaModel.lv();
	var attAttack = attCharaModel.spirit();
	//精神变化
	var ApiritAid = attChara.status.getStatus(StrategyType.ApiritAid);
	if(ApiritAid){
		attAttack *= (1 + ApiritAid.value);
	}
	//得到防御方的精神力
	var hertDefense = hertCharaModel.spirit();
	//精神变化
	ApiritAid = hertChara.status.getStatus(StrategyType.ApiritAid);
	if(ApiritAid){
		hertDefense *= (1 + ApiritAid.value);
	}
	//法术攻击的伤害值计算
	r = attLv + 25 + (attAttack - hertDefense)/3;
	//法术系数加成
	r = r * currentSelectStrategy.hert();
	//兵种伤害系数加成
	r = r * attCharaModel.currentSoldiers().strategyHert();
	//TODO:宝物加成
	if(r < 1){
		r = 1;
	}
	r = r >>> 0;
	return r;
}	
/*****************************************************************
 物理攻击的伤害值计算
 X代表攻击方的攻击力，Y代表被攻击方的防御力，Lv表示攻击方的等级。R表示伤害值
 首先会根据地形修正攻击和防御力为X',Y'
 r=Lv+25+(X'-Y')/2;
 然后再根据兵种相克和宝物进行修正
 **************************************************************/
function calculateHertValue(attChara,hertChara,correctionFactor){
	var r;
	var attCharaModel = attChara.data;
	var hertCharaModel = hertChara.data;
	//得到攻击方的攻击力和等级
	var attLv =  attCharaModel.lv();
	var attAttack = attCharaModel.attack();
	//攻击变化
	var AttackAid = attChara.status.getStatus(StrategyType.AttackAid);
	if(AttackAid){
		attAttack *= (1 + AttackAid.value);
	}
	//得到防御方的防御力
	var hertDefense = hertCharaModel.defense();
	//防御变化
	var DefenseAid = hertChara.status.getStatus(StrategyType.DefenseAid);
	if(DefenseAid){
		hertDefense *= (1 + DefenseAid.value);
	}
	//地形修正
	var map = LMvc.BattleController.model.map.data;
	var attAttackAddition = attAttack * attCharaModel.currentSoldiers().terrain(map[attChara.locationY()][hertChara.locationX()].value).value * 0.01;
	var hertDefenseAddition = hertDefense * hertCharaModel.currentSoldiers().terrain(map[hertChara.locationY()][hertChara.locationX()].value).value * 0.01;
	//物理攻击的伤害值计算
	r = attLv + 25 + (attAttackAddition - hertDefenseAddition)/2;
	//兵种相克
	r = r * attCharaModel.currentSoldiers().restrain(hertCharaModel.currentSoldiers().id()).value * 0.01;
	//修正系数
	r *= correctionFactor;
	//随即系数
	r = (11 - Math.random() * 2) * 0.1 * r;
	//TODO:: 宝物修正
	if(r < 1){
		r = 1;
	}
	r = r >>> 0;
	return r;
}
/**
 * 俘虏概率
 */
function calculateHitrateCaptive(chara){
	if(chara.data.hasSkill(StrategyEffectType.Flee)){
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
		return false;
	}
	return true;
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

