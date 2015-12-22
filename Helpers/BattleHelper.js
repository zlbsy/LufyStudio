function belongLabel(){
	
}
function getDirectionFromTarget(chara, target, angleFlag){
	var self = this, direction = chara.direction;
	var coordinate = chara.getTo();
	var coordinateTo = target.getTo();
	var angle = Math.atan2(coordinateTo[1] - coordinate[1],coordinateTo[0] - coordinate[0])*180/Math.PI + 180;
	if(angle < 22.5 || angle > 337.5){
		direction = CharacterDirection.LEFT;
	}else if(angle > 22.5 && angle < 67.5){
		direction = angleFlag ? CharacterDirection.LEFT_UP : (Math.random() > 0.5 ? CharacterDirection.LEFT : CharacterDirection.UP);
	}else if(angle > 67.5 && angle < 112.5){
		direction = CharacterDirection.UP;
	}else if(angle > 112.5 && angle < 157.5){
		direction = angleFlag ? CharacterDirection.RIGHT_UP : (Math.random() > 0.5 ? CharacterDirection.RIGHT : CharacterDirection.UP);
	}else if(angle > 157.5 && angle < 202.5){
		direction = CharacterDirection.RIGHT;
	}else if(angle > 202.5 && angle < 247.5){
		direction = angleFlag ? CharacterDirection.RIGHT_DOWN : (Math.random() > 0.5 ? CharacterDirection.RIGHT : CharacterDirection.DOWN);
	}else if(angle > 247.5 && angle < 292.5){
		direction = CharacterDirection.DOWN;
	}else{
		direction = angleFlag ? CharacterDirection.LEFT_DOWN : (Math.random() > 0.5 ? CharacterDirection.LEFT : CharacterDirection.DOWN);
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
	var rangeAttack = chara.data.rangeAttack();
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
	var rangeAttack = attChara.data.rangeAttack();
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
		var result;
		if(belong == Belong.FRIEND){
			BattleController.ctrlChara.AI.endBoutCheck();
			return;
		}
		var resultView = new BattleResultView(LMvc.BattleController,belong == Belong.ENEMY);
		LMvc.BattleController.view.addChild(resultView);
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
		BattleController.ctrlChara.AI.endBoutCheck();
	}
}
function getDefenseEnemiesFromCity(city){
	var generals = city.generals(),result = [];
	var list = getPowerfulCharacters(generals);
	var index = list.findIndex(function(child){
		return child.general.id() == city.seigniorCharaId();
	});
	if(index < 0){
		index = list.findIndex(function(child){
			return child.general.id() == city.prefecture();
		});
	}
	if(index >= 0){
		var chara = list.splice(index,1)[0];
		list.unshift(chara);
	}
	console.log("getDefenseEnemiesFromCity list:",list);
	for(var i=0,l=list.length < BattleMapConfig.DefenseQuantity ? list.length : BattleMapConfig.DefenseQuantity;i<l;i++){
		result.push(list[i].general);
	}
	return result;
}
function getPowerfulCharacters(generals){
	var list = [],result = [];
	console.log("getPowerfulCharacters generals:",generals);
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
function battleFoodCheck(belong){
	var battleData = LMvc.BattleController.battleData;
	var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(belong);
	var needFood = 0;
	var thrift = 1;
	for(var i=0,l=charas.length;i<l;i++){
		var charaModel = charas[i].data;
		needFood += charaModel.troops();
		if(charaModel.hasSkill(SkillSubType.THRIFT)){
			thrift = 0.5;
		}
	}
	var cityFood = (belong == Belong.SELF && battleData.fromCity.seigniorCharaId() != LMvc.selectSeignorId) || 
		(belong == Belong.ENEMY && battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId);
	if(cityFood){
		needFood = (needFood * thrift >>> 0);
		console.log("cityFood ",battleData.toCity.food() +">"+ needFood);
		if(battleData.toCity.food() > needFood){
			battleData.toCity.food(-needFood);
			return true;
		}
		battleData.toCity.food(-battleData.toCity.food());
	}else{
		needFood += (battleData.troops * 0.5);
		needFood = (needFood * thrift >>> 0);
		console.log("food ",battleData.food +">"+ needFood);
		if(battleData.food > needFood){
			battleData.food -= needFood;
			return true;
		}
		battleData.food = 0;
	}
	
	charas.forEach(function(child){
		child.status.downloadAidStatusRandom();
	});
	var chara;
	for(var i=0,l=charas.length;i<l;i++){
		if(charas[i].isLeader){
			chara = charas[i];
			break;
		}
	}
	var script = "SGJTalk.show(" + chara.data.id() + ",0,糟糕！没有兵粮了，士兵的战斗力开始下降了。);";
	script += "SGJBattleCharacter.boutSkillRun("+belong+");";
	LGlobal.script.addScript(script);
	return false;
}
function getBattleSaveData(){
	var data = {};
	var battleData = LMvc.BattleController.battleData;
	data.food = battleData.food;
	data.money = battleData.money;
	data.troops = battleData.troops;
	data.toCityId = battleData.toCity.id();
	data.fromCityId = battleData.fromCity.id();
	data.expeditionEnemyCharacterList=[];
	for(var i=0,l=battleData.expeditionEnemyCharacterList.length;i<l;i++){
		var character = battleData.expeditionEnemyCharacterList[i];
		data.expeditionEnemyCharacterList.push(character.id());
	}
	var model = LMvc.BattleController.model;
	data.ourList = [];
	for(var i=0,l=model.ourList.length;i<l;i++){
		var character = model.ourList[i];
		data.ourList.push({
			id:character.data.id(),
			status:character.status.getData(),
			direction:character.direction,
			action:character.action,
			mode:character.mode,
			x:character.x,
			y:character.y
		});
	}
	data.enemyList = [];
	for(var i=0,l=model.enemyList.length;i<l;i++){
		var character = model.enemyList[i];
		data.enemyList.push({
			id:character.data.id(),
			status:character.status.getData(),
			direction:character.direction,
			action:character.action,
			x:character.x,
			y:character.y
		});
	}
	data.selfCaptive = [];
	for(var i=0,l=model.selfCaptive.length;i<l;i++){
		var character = model.selfCaptive[i];
		data.selfCaptive.push({
			id:character.data.id()
		});
	}
	data.enemyCaptive = [];
	for(var i=0,l=model.enemyCaptive.length;i<l;i++){
		var character = model.enemyCaptive[i];
		data.enemyCaptive.push({
			id:character.data.id()
		});
	}
	data.selfMinusStrategyCharas = [];
	for(var i=0,l=model.selfMinusStrategyCharas.length;i<l;i++){
		var character = model.selfMinusStrategyCharas[i];
		data.selfMinusStrategyCharas.push({
			id:character.data.id()
		});
	}
	data.enemyMinusStrategyCharas = [];
	for(var i=0,l=model.enemyMinusStrategyCharas.length;i<l;i++){
		var character = model.enemyMinusStrategyCharas[i];
		data.enemyMinusStrategyCharas.push({
			id:character.data.id()
		});
	}
	return data;
}