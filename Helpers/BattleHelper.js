function belongLabel(){
	
}
function getDirectionFromTarget(chara, target){
	var self = this, direction = chara.direction;
	var coordinate = chara.getTo();
	var coordinateTo = target.getTo();
	var angle = Math.atan2(coordinateTo[1] - coordinate[1],coordinateTo[0] - coordinate[0])*180/Math.PI + 180;
	if(angle < 22.5 || angle > 337.5){
		direction = CharacterDirection.LEFT;
	}else if(angle > 22.5 && angle < 67.5){
		//direction = CharacterDirection.LEFT_UP;
		direction = Math.random() > 0.5 ? CharacterDirection.LEFT : CharacterDirection.UP;
	}else if(angle > 67.5 && angle < 112.5){
		direction = CharacterDirection.UP;
	}else if(angle > 112.5 && angle < 157.5){
		//direction = CharacterDirection.RIGHT_UP;
		direction = Math.random() > 0.5 ? CharacterDirection.RIGHT : CharacterDirection.UP;
	}else if(angle > 157.5 && angle < 202.5){
		direction = CharacterDirection.RIGHT;
	}else if(angle > 202.5 && angle < 247.5){
		//direction = CharacterDirection.RIGHT_DOWN;
		direction = Math.random() > 0.5 ? CharacterDirection.RIGHT : CharacterDirection.DOWN;
	}else if(angle > 247.5 && angle < 292.5){
		direction = CharacterDirection.DOWN;
	}else{
		//direction = CharacterDirection.LEFT_DOWN;
		direction = Math.random() > 0.5 ? CharacterDirection.LEFT : CharacterDirection.DOWN;
	}
	return direction;
};
function isCurrentAttackCharacter(chara){
	return chara.objectIndex == LMvc.currentAttackCharacter.objectIndex;
}
function isCurrentAttackTarget(chara){
	return chara.objectIndex == LMvc.currentAttackTarget.objectIndex;
}
function isSameBelong(belong,targetBelong){
	if(belong == Belong.ENEMY){
		if(targetBelong == Belong.ENEMY){
			return true;
		}else{
			return false;
		}
	}else{
		if(targetBelong == Belong.ENEMY){
			return false;
		}else{
			return true;
		}
	}
}
function battleSingleCombatCheck(attChara){
	var hertChara = attChara.AI.attackTarget;
	var attCharaModel = attChara.data;
	var hertCharaModel = hertChara.data;
	var script = "SGJTalk.show(" + attCharaModel.id() + ",0," + String.format(Language.get("single_combat_ask"), hertCharaModel.name()) + ");";
	var disposition = hertCharaModel.disposition();
	var forceDifference = hertCharaModel.force() - attCharaModel.force();
	var result = false;
	//对方混乱
	if(hertChara.status.hasStatus(StrategyType.Chaos)){
		switch(disposition){
			case CharacterDisposition.TIMID:
				if(forceDifference > 10){
					result = true;
				}else if(forceDifference >= 0 && Math.random()*12 < forceDifference){
					result = true;
				}
				break;
			case CharacterDisposition.CALM:
				if(forceDifference > 0){
					result = true;
				}else if(forceDifference >= -10 && Math.random()*12 < forceDifference + 10){
					result = true;
				}
				break;
			case CharacterDisposition.BRAVE:
			case CharacterDisposition.RECKLESS:
				result = true;
				break;
		}
	}else{
		switch(disposition){
			case CharacterDisposition.TIMID:
				forceDifference -= 20;
				break;
			case CharacterDisposition.CALM:
				forceDifference -= 5;
				break;
			case CharacterDisposition.BRAVE:
				forceDifference += 5;
				break;
			case CharacterDisposition.RECKLESS:
				forceDifference += 20;
				break;
		}
		if(forceDifference > 20){
			result = true;
		}else if(forceDifference >= -20 && Math.random()*50 < forceDifference + 20){
			result = true;
		}
	}
	//TODO::
	result = true;
	if(result){
		script += "SGJTalk.show(" + hertCharaModel.id() + ",0," + Language.get("single_combat_answer_ok") + ");" + 
		"SGJBattleCharacter.singleCombatStart(" + attChara.belong + "," + attCharaModel.id() + ");";
	}else{
		script += "SGJTalk.show(" + hertCharaModel.id() + ",0," + Language.get("single_combat_answer_no") + ");" + 
		"SGJBattleCharacter.endAction(" + attChara.belong + "," + attCharaModel.id() + ");";
	}
	LGlobal.script.addScript(script);
}
function battleCanGroupSkill(chara, targerChara){
	var groupSkill = chara.data.groupSkill();
	if(!groupSkill){
		return null;
	}
	var group = groupSkill.group();
	for(var i=0;i<group.length;i++){
		var charaId = group[i];
		if(charaId == chara.data.id()){
			continue;
		}
		if(!battleCanAttack(chara.belong, charaId, targerChara)){
			return null;
		}
	}
	return groupSkill;
}
function battleCanAttack(charaBelong, charaId, targerChara){
	var chara = LMvc.BattleController.view.charaLayer.getCharacter(charaBelong, charaId);
	if(chara == null){
		var belong;
		if(charaBelong == Belong.SELF){
			belong = Belong.FRIEND;
		}else if(charaBelong == Belong.FRIEND){
			belong = Belong.SELF;
		}else{
			return false;
		}
		chara = LMvc.BattleController.view.charaLayer.getCharacter(belong, charaId);
	}
	if(chara == null){
		return false;
	}
	return battleCharaInRangeAttack(chara, targerChara);
}
function battleCharaInRangeAttack(chara, targerChara){
	var relativelyX = targerChara.locationX() - chara.locationX();
	var relativelyY = targerChara.locationY() - chara.locationY();
	var rangeAttack = chara.data.currentSoldiers().rangeAttack();
	for(var i=0;i<rangeAttack.length;i++){
		var range = rangeAttack[i];
		if(range.x == relativelyX && range.y == relativelyY){
			return true;
		}
	}
	return false;
}
function battleCharacterStatusUpdate(belong){
	var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(belong);
	for(var i=0,l=charas.length;i<l;i++){
		charas[i].status.removeStatus();
	}
}
function battleCanAttackCharacter(attChara, hertChara){
	if(attChara.status.hasStatus(StrategyType.Chaos)){
		return false;
	}
	var rangeAttack = attChara.data.currentSoldiers().rangeAttack();
	for(var i=0,l=rangeAttack.length;i<l;i++){
		var range = rangeAttack[i];
		if(hertChara.onLocation(attChara.locationX()+range.x, attChara.locationY()+range.y)){
			return true;
		}
	}
	return false;
}
function battleEndCheck(belong){
	var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(belong);
	if(charas.length == 0){
		if(belong == Belong.SELF){
			//TODO::战斗失败
		}else if(belong == Belong.ENEMY){
			//TODO::战斗胜利
		}
		return;
	}else{
		//判断主将是否撤退
		var chara = charas.find(function(child){
			return child.isLeader;
		});
		if(!chara){
			//无主将，全员能力随机降低一项
			for(var i = 0,l=charas.length;i<l;i++){
				charas[i].status.downloadAidStatusRandom();
			}
			//换主将
			if(belong == Belong.SELF || belong == Belong.ENEMY){
				var list = getPowerfulCharacters(charas);
				chara = list[0].general;
				chara.isLeader = true;
				script = "SGJTalk.show(" + chara.data.id() + ",0," + Language.get("leader_change_talk") + ");";
				script += "SGJBattleCharacter.battleEndCheck("+belong+");";
				LGlobal.script.addScript(script);
				return;
			}
		}
	}
	BattleController.ctrlChara.AI.endBoutCheck();
}
function getDefenseEnemiesFromCity(city){
	var generals = city.generals(),result = [];
	var list = getPowerfulCharacters(generals);
	for(var i=0,l=list.length < BattleMapConfig.DefenseQuantity ? list.length : BattleMapConfig.DefenseQuantity;i<l;i++){
		result.push(list[i].general);
	}
	return result;
}
function getPowerfulCharacters(generals){
	var list = [],result = [];
	for(var i=0,l=generals.length;i<l;i++){
		var child = generals[i];
		var data;
		if(child.constructor.name == "BattleCharacterView"){
			data = child.data;
		}else{
			data = child;
		}
		var value = data.force() + data.intelligence() + data.agility() + data.luck() + data.command();
		value += value * data.lv() * 0.1;
		value += data.maxProficiencySoldier().proficiency() * 0.1;
		value += data.skill() > 0 ? 100 : 0;
		list.push({general:child,value:value});
	}
	list = list.sort(function(a,b){return a.value - b.value;});
	return list;
}
if (!Array.getRandomArrays){
	Array.getRandomArrays = function(list,num){
		var result = [], length = list.length < num ? list.length : num;
		while (result.length < length){
			var i = Math.random() * list.length >>> 0;
			var index = result.findIndex(function(child){
				return child == i;
			});
			if(index >= 0){
				continue;
			}
			result.push(i);
		}
		for(var i=0;i<result.length;i++){
			result[i] = list[result[i]];
		}
		return result;
	};
}