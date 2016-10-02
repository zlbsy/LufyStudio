/********************************************
 双击概率计算
 如果Sa/Sd<1，那么H=1；
 如果1<=Sa/Sd<2，那么H=2+18*（Sa/Sd-1）；
 如果2<=Sa/Sd<=3，那么H=20+80*（Sa/Sd-2）；
 如果Sa/Sd>=3，那么H=100；
 *********************************************/
function calculateDoubleAtt(attChara,hertChara){
	if(LMvc.TutorialController){
		return false;
	}
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
	//地形修正
	var terrainAtt = attChara.getTerrain();
	var terrainHert = hertChara.getTerrain();
	var attBreakout = attBreakout * terrainAtt.value * 0.01;
	var hertBreakout = hertBreakout * terrainHert.value * 0.01;
	
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
	if(Math.fakeRandom()*100 <= h){
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
	if(LMvc.TutorialController){
		return false;
	}
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
	//地形修正
	var terrainAtt = attChara.getTerrain();
	var terrainHert = hertChara.getTerrain();
	var attMorale = attMorale * terrainAtt.value * 0.01;
	var hertMorale = hertMorale * terrainHert.value * 0.01;
	
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
	var skill = attCharaModel.skill(SkillType.ATTACK_FATAL);
	if(skill && h < skill.hit()){
		h = skill.hit();
	}
	if(Math.fakeRandom()*100 <= h){
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
function calculateHitrate(attChara,hertChara,isView){
	if(LMvc.TutorialController){
		if(isView){
			return 100;
		}
		return true;
	}
	//对方混乱
	if(hertChara.status.hasStatus(StrategyType.Chaos)){
		if(isView){
			return 100;
		}
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
	//地形修正
	var terrainAtt = attChara.getTerrain();
	var terrainHert = hertChara.getTerrain();
	var attBreakout = attBreakout * terrainAtt.value * 0.01;
	var hertBreakout = hertBreakout * terrainHert.value * 0.01;
	
	if(attBreakout > 2*hertBreakout){
		r = 100;
	}else if(attBreakout > hertBreakout){
		r=(attBreakout-hertBreakout)*10/hertBreakout+90;
	}else if(attBreakout > hertBreakout * 0.5){
		r=(attBreakout-hertBreakout/2)*30/(hertBreakout/2)+60;
	}else{
		r=(attBreakout-hertBreakout/3)*30/(hertBreakout/3)+30;
	}
	var skill = attCharaModel.skill(SkillType.HIT);
	var condition = skill ? skill.condition() : null;
	if(condition){
		if(condition.type == "AttackType"){
			if(condition.value != attCharaModel.currentSoldiers().attackType()){
				skill = null;
			}
		}
	}
	if(skill && r < skill.hit()){
		r = skill.hit();
	}
	if(isView){
		return r >>> 0;
	}
	if(Math.fakeRandom()*100 <= r){
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
function calculateHitrateStrategy(attChara,hertChara, isView){
	//对方混乱
	if(hertChara.status.hasStatus(StrategyType.Chaos)){
		if(isView){
			return 100;
		}
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
	//地形修正
	var terrainAtt = attChara.getTerrain();
	var terrainHert = hertChara.getTerrain();
	var attX = attX * terrainAtt.value * 0.01;
	var hertY = hertY * terrainHert.value * 0.01;
	
	if(attX > 2*hertY){
		r = 100;
	}else if(attX > hertY){
		r=(attX-hertY)*10/hertY+90;
	}else if(attX > hertY * 0.5){
		r=(attX-hertY/2)*30/(hertY/2)+60;
	}else{
		r=(attX-hertY/3)*30/(hertY/3)+30;
	}
	var skill = attCharaModel.skill(SkillType.HIT);
	if(skill && r < skill.hit()){
		r = skill.hit();
	}
	if(isView){
		return r >>> 0;
	}
	if(Math.fakeRandom()*100 <= r){
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
	var attLv =  attCharaModel.seigniorLevel();
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
	//地形修正
	var terrainAtt = attChara.getTerrain();
	var terrainHert = hertChara.getTerrain();
	var attAttack = attAttack * terrainAtt.value * 0.01;
	var hertDefense = hertDefense * terrainHert.value * 0.01;
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
function calculateHertValue(attChara,hertChara,correctionFactor, isView){
	var r;
	var attCharaModel = attChara.data;
	var hertCharaModel = hertChara.data;
	//得到攻击方的攻击力和等级
	var attLv =  attCharaModel.seigniorLevel();
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
	var terrainAtt = attChara.getTerrain();
	var terrainHert = hertChara.getTerrain();
	var attAttackAddition = attAttack * terrainAtt.value * 0.01;
	var hertDefenseAddition = hertDefense * terrainHert.value * 0.01;
	//物理攻击的伤害值计算
	r = attLv + 25 + (attAttackAddition - hertDefenseAddition)/2;
	if(attCharaModel.hasSkill(SkillSubType.MOVE_ATTACK) && attChara.getMoveAddition){
		r *= (1 + attChara.getMoveAddition());
	}
	//兵种相克
	var restrain = attCharaModel.currentSoldiers().restrain(hertCharaModel.currentSoldiers().id()).value;
	var ignore = false;
	if(restrain > 100){
		var skill = hertCharaModel.skill(SkillType.IGNORE_RESTRAINT);
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
	}else if(restrain < 100){
		var skill = attCharaModel.skill(SkillType.IGNORE_RESTRAINT);
		if(skill){
			var skillIgnore = skill.ignore();
			if(!skillIgnore){
			}else if(skillIgnore.type == "AttackType"){
				if(skillIgnore.value == hertCharaModel.currentSoldiers().attackType()){
					ignore = true;
				}
			}else if(skillIgnore.type == "MoveType"){
				if(skillIgnore.value == hertCharaModel.currentSoldiers().moveType()){
					ignore = true;
				}
			}else if(skillIgnore.type == "SoldierType"){
				if(skillIgnore.value == hertCharaModel.currentSoldiers().soldierType()){
					ignore = true;
				}
			}
		}
	}
	if(!ignore){
		r = r * restrain * 0.01;
	}
	//修正系数
	r *= correctionFactor;
	if(!isView){
		//随即系数
		r = (11 - Math.fakeRandom() * 2) * 0.1 * r;
	}
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
	if(!chara.locationX || !target.locationX){
		//AI自动战斗，随机
		var rand = Math.fakeRandom();
		if(rand < 0.2){
			return attacks[0];
		}else if(rand < 0.5){
			return attacks[1];
		}
		return 1;
	}
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
		if(!skill){
			continue;
		}
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
function calculateSpreadPoints(skill, ranges, targetCharacter){
	var points = ranges.concat();
	var speadRects = skill.speadRects();
	var speadProbability = skill.speadProbability();
	var pointsCheck = {};
	ranges.forEach(function(child){
		for(var i = 0; i < speadRects.length; i++){
			var point = speadRects[i];
			calculateSpreadPointsLoop(targetCharacter, child.x + point.x, child.y + point.y, points, speadRects, speadProbability, 0, pointsCheck);
		}
	});
	return points;
}
function calculateSpreadPointsLoop(targetCharacter, x, y, points, speadRects, speadProbability, loops, pointsCheck){
	if(loops > 2 || pointsCheck[x+","+y])return;
	if(Math.fakeRandom() > speadProbability){
		return;
	}
	pointsCheck[x+","+y]=1;
	var targetChara = LMvc.BattleController.view.charaLayer.hasCharacterInPosition(targetCharacter.locationX() + x, targetCharacter.locationY() + y);
	if(!targetChara || !isSameBelong(targetCharacter.belong, targetChara.belong)){
		return;
	}
	points.push({x:x,y:y});
	for(var i = 0; i < speadRects.length; i++){
		var point = speadRects[i];
		calculateSpreadPointsLoop(targetCharacter, x + point.x, y + point.y, points, speadRects, speadProbability, loops + 1, pointsCheck);
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
	if(num - count == 1 && skill.startAmbushProbability() < 1){
		if(Math.fakeRandom() > skill.startAmbushProbability()){
			return 0;
		}
	}
	return result;
}
/*****************************************************************
 特技横扫效果范围计算
 **************************************************************/
function calculateInAttackRangePoints(chara, target, attackRanges){
	var ranges = [];
	var charaX = chara.locationX();
	var charaY = chara.locationY();
	var targetX = target.locationX();
	var targetY = target.locationY();
	for(var i=0;i<attackRanges.length;i++){
		var child = attackRanges[i];
		var x = child.x + charaX;
		var y = child.y + charaY;
		ranges.push({x:x-targetX,y:y-targetY});
	}
	return ranges;
}
/*****************************************************************
 特技穿透效果范围计算
 **************************************************************/
function calculatePenetratePoints(chara, target, ranges, penetrate){
	if(!penetrate){
		penetrate = 1;
	}
	var arr = getPenetratePoint(chara, target, penetrate);
	for(var i=0;i<arr.length;i++){
		var point = arr[i];
		var x=point.x, y=point.y;
		if(ranges.findIndex(function(child){
			return child.x == x && child.y == y;
		}) < 0){
			ranges.push({x:x,y:y});
		}
	}
	return ranges;
}
function getPenetratePoint(chara, target, penetrate){
	var arr = [], x = 0, y = 0;
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
	for(var i=0;i<penetrate;i++){
		arr.push({x : x*(i+1), y : y*(i+1)});
	}
	return arr;
}
function calculateWounded(value, range){
	return value + range * (1 - 2 * Math.fakeRandom()); 
}
function calculateExp(attChara,hertChara){
	var attCharaModel = attChara.data;
	var hertCharaModel = hertChara.data;
	var lv = attCharaModel.seigniorLevel() - hertCharaModel.seigniorLevel();
	var exp = 8;
	if(lv > 0){
		exp -= lv;
	}else if(lv < 0){
		exp -= lv * 2;
	}
	if(exp < 1){
		exp = 1;
	}
	if(hertCharaModel.troops() == 0){
		exp = (exp*1.5 >>> 0);
	}
	return exp;
}
function calculateAskSingleCombat(chara, target){
	if(chara.data.force() < 60){
		return false;
	}
	if(!battleCanAttackCharacter(target, chara)){
		return false;
	}
	var charaValue = chara.data.force()*3 + chara.data.HP();
	var targetValue = target.data.force()*3 + target.data.HP();
	var value = charaValue - targetValue;
	if(value < -15){
		return false; 
	}else if(value <= 0){
		return Math.fakeRandom() < 0.05; 
	}else if(value <= 15){
		return Math.fakeRandom() < 0.2; 
	}else if(value <= 30){
		return Math.fakeRandom() < 0.05; 
	}else if(value <= 50){
		return Math.fakeRandom() < 0.01; 
	}
	return false;
}