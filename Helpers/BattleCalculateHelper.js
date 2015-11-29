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
function calculateHertStrategyValue(attChara,hertChara,currentSelectStrategy,correctionFactor){
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
	//特技等系数加成
	r = r * correctionFactor;
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
	var skill = hertCharaModel.skill(SkillType.IGNORE_RESTRAINT);
	var ignore = false;
	if(skill){
		var skillIgnore = skill.ignore();
		if(!skillIgnore){
		}else if(skillIgnore.type == "AttackType"){
			if(skillIgnore.value == attCharaModel.currentSoldiers().attackType()){
				ignore = true;
			}
		}else if(skillIgnore.type == "MoveType"){
			if(skillIgnore.value == attCharaModel.currentSoldiers().moveType()){
				ignore = true;
			}
		}else if(skillIgnore.type == "SoldierType"){
			if(skillIgnore.value == attCharaModel.currentSoldiers().soldierType()){
				ignore = true;
			}
		}
	}
	if(!ignore){
		//兵种相克
		var restrain = attCharaModel.currentSoldiers().restrain(hertCharaModel.currentSoldiers().id()).value * 0.01;
		r = r * restrain;
	}
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
/*****************************************************************
 劫营特技的伤害加成值计算
 **************************************************************/
function calculateSkillSurpriseAmend(chara, target, attacks){
	console.log("calculateSkillSurpriseAmend");
	if(chara.locationX() != target.locationX() && chara.locationY() != target.locationY()){
		return 1;
	}
	if(chara.direction == target.direction){
		return attacks[0];
	}
	var no = (chara.direction == CharacterDirection.DOWN && chara.direction == CharacterDirection.UP) ||
		(chara.direction == CharacterDirection.UP && chara.direction == CharacterDirection.DOWN) ||
		(chara.direction == CharacterDirection.LEFT && chara.direction == CharacterDirection.RIGHT) ||
		(chara.direction == CharacterDirection.RIGHT && chara.direction == CharacterDirection.LEFT);
	if(no){
		return 1;
	}
	return attacks[1];
}
/*****************************************************************
 特技的法术减免伤害加成值计算
 **************************************************************/
function calculateStrategyCharasCorrection(currentChara){
	var strategyCharas = currentChara.model.getMinusStrategyCharas(currentChara.belong);
	if(strategyCharas.length == 0){
		return 1;
	}
	var hertCorrect = 1;
	var locationX = currentChara.locationX();
	var locationY = currentChara.locationY();
	for(var i=0,l=strategyCharas.length;i<l;i++){
		var obj = strategyCharas[i];
		var chara = obj.chara;
		var skill = obj.skill;
		if(chara.data.troops() == 0 || skill.hert() > hertCorrect){
			continue;
		}
		var x = chara.locationX();
		var y = chara.locationY();
		var minusRects = skill.minusRects();
		if(minusRects.length == 0){
			hertCorrect = skill.hert();
			continue;
		}
		for(var i = 0;i<minusRects.length;i++){
			var point = minusRects[i];
			if(x + point.x == locationX && y + point.y == locationY){
				hertCorrect = skill.hert();
				break;
			}
		}
	}
	return hertCorrect;
}
/*****************************************************************
 特技的法术蔓延范围计算
 **************************************************************/
function calculateSpreadPoints(skill, ranges){
	testCount = 0;
	var points = ranges.concat();
	var speadRects = skill.speadRects();
	var speadProbability = skill.speadProbability();
	var pointsCheck = {};
	ranges.forEach(function(child){
		for(var i = 0; i < speadRects.length; i++){
			var point = speadRects[i];
			calculateSpreadPointsLoop(child.x + point.x, child.y + point.y, points, speadRects, speadProbability, 0, pointsCheck);
		}
	});
	return points;
}
function calculateSpreadPointsLoop(x, y, points, speadRects, speadProbability, loops, pointsCheck){
	//console.log("PointsLoop("+(testCount++)+"):"+x+","+y+":"+speadProbability+"l="+points.length);
	if(loops > 2 || pointsCheck[x+","+y])return;
	if(Math.random() > speadProbability){
		return;
	}
	pointsCheck[x+","+y]=1;
	points.push({x:x,y:y});
	for(var i = 0; i < speadRects.length; i++){
		var point = speadRects[i];
		calculateSpreadPointsLoop(x + point.x, y + point.y, points, speadRects, speadProbability, loops + 1, pointsCheck);
	}
}
/*****************************************************************
 特技(反)埋伏加强系数计算
 **************************************************************/
function calculateAmbush(skill, x, y, belong, count){
	var ambushRects = skill.ambushRects();
	var ambush = skill.ambush();
	var result = 0;
	var num = 0;
	for(var i = 0, l = ambushRects.length;i<l;i++){
		var point = ambushRects[i];
		var chara = LMvc.BattleController.view.charaLayer.getCharacterFromLocation(x+point.x, y+point.y);
		if(!chara || !isSameBelong(chara.belong,belong)){
			continue;
		}
		if(++num > count){
			result += ambush;
		}
	}
	return result;
}
/*****************************************************************
 特技穿透效果范围计算
 **************************************************************/
function calculatePenetratePoints(chara, target, ranges){
	var x=0,y=0;
	var direction = getDirectionFromTarget(chara, target, true);
	switch(direction){
		case CharacterDirection.DOWN:
			y = 1;
			break;
		case CharacterDirection.UP:
			y = -1;
			break;
		case CharacterDirection.LEFT:
			x = -1;
			break;
		case CharacterDirection.RIGHT:
			x = 1;
			break;
		case CharacterDirection.LEFT_UP:
			x = -1;
			y = -1;
			break;
		case CharacterDirection.RIGHT_UP:
			x = 1;
			y = -1;
			break;
		case CharacterDirection.RIGHT_DOWN:
			x = 1;
			y = 1;
			break;
		case CharacterDirection.LEFT_DOWN:
			x = -1;
			y = 1;
			break;
	}
	if(ranges.findIndex(function(child){
		return child.x == x && child.y == y;
	}) < 0){
		ranges.push({x:x,y:y});
	}
	return ranges;
}