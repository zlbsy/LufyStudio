function belongLabel(){
	
}
function getDirectionFromTarget(chara, target, angleFlag){
	var self = this, direction = chara.direction;
	var coordinate = chara.getTo();
	var coordinateTo = target.getTo();console.log("getDirectionFromTarget",coordinate,coordinateTo);
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
function battleHealTroops(currentSelectStrategy, currentTargetCharacter){
	var troopsAdd = currentSelectStrategy.troops();
	var woundedAdd = currentSelectStrategy.wounded();
	return battleHealTroopsRun(troopsAdd, woundedAdd, currentTargetCharacter);
}
function battleHealTroopsRun(troopsAdd, woundedAdd, currentTargetCharacter){
	//var troopsAdd = currentSelectStrategy.troops();
	//var woundedAdd = currentSelectStrategy.wounded();
	var wounded = currentTargetCharacter.data.wounded();
	if(woundedAdd < 1){
		woundedAdd = wounded * woundedAdd >>> 0;
	}else if(woundedAdd > wounded){
		woundedAdd = wounded;
	}
	var battleData = currentTargetCharacter.controller.battleData;
	var reservist = 0;
	if(battleData.fromCity.seigniorCharaId() == currentTargetCharacter.data.seigniorId()){
		reservist = battleData.troops;
	}else{
		reservist = battleData.toCity.troops();
	}
	if(troopsAdd > reservist){
		troopsAdd = reservist;
	}
	if(woundedAdd > 0){
		currentTargetCharacter.data.wounded(wounded - woundedAdd);
		troopsAdd += woundedAdd;
	}
	var troops = currentTargetCharacter.data.troops();
	var maxTroops = currentTargetCharacter.data.maxTroops();
	if(troops + troopsAdd > maxTroops){
		troopsAdd = maxTroops - troops;
	}
	if(battleData.fromCity.seigniorCharaId() == currentTargetCharacter.data.seigniorId()){
		battleData.troops -= troopsAdd;
	}else{
		battleData.toCity.troops(reservist - troopsAdd);
	}
	return troopsAdd;
}
function getBattleSaveData(){
	var data = {};
	var battleData = LMvc.BattleController.battleData;
	data.food = battleData.food;
	data.money = battleData.money;
	data.troops = battleData.troops;
	data.toCityId = battleData.toCity.id();
	data.fromCityId = battleData.fromCity.id();
	data.bout = LMvc.BattleController.getValue("bout");
	
	data.expeditionCharacterList=[];
	for(var i=0,l=battleData.expeditionCharacterList.length;i<l;i++){
		var character = battleData.expeditionCharacterList[i];
		data.expeditionCharacterList.push(character.id());
	}
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
			x:character.locationX(),
			y:character.locationY()
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
			x:character.locationX(),
			y:character.locationY()
		});
	}
	var selfCharas =LMvc.BattleController.view.charaLayer.getCharactersFromBelong(Belong.SELF);
	var selfLeader = selfCharas.find(function(child){
		return child.isLeader;
	});
	var enemyCharas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(Belong.ENEMY);
	var enemyLeader = enemyCharas.find(function(child){
		return child.isLeader;
	});
	data.selfLeader = selfLeader.data.id();
	data.enemyLeader = enemyLeader.data.id();
	
	data.selfCaptive = [];
	for(var i=0,l=model.selfCaptive.length;i<l;i++){
		var characterId = model.selfCaptive[i];
		data.selfCaptive.push(characterId);
	}
	data.enemyCaptive = [];
	for(var i=0,l=model.enemyCaptive.length;i<l;i++){
		var characterId = model.enemyCaptive[i];
		data.enemyCaptive.push(characterId);
	}
	data.selfMinusStrategyCharas = [];
	for(var i=0,l=model.selfMinusStrategyCharas.length;i<l;i++){
		var obj = model.selfMinusStrategyCharas[i];
		data.selfMinusStrategyCharas.push(obj.chara.data.id());
	}
	data.enemyMinusStrategyCharas = [];
	for(var i=0,l=model.enemyMinusStrategyCharas.length;i<l;i++){
		var obj = model.enemyMinusStrategyCharas[i];
		data.enemyMinusStrategyCharas.push(obj.chara.data.id());
	}
	return data;
}
function setBattleSaveData(){
	var data = LMvc.areaData.battleData;
	var battleData = LMvc.BattleController.battleData;
	console.log("setBattleSaveData",battleData);
	LMvc.BattleController.setValue("bout", data.bout);
	LMvc.BattleController.setValue("currentBelong", Belong.SELF);
	battleData.expeditionCharacterList = [];
	for(var i=0,l=data.expeditionCharacterList.length;i<l;i++){
		var character = CharacterModel.getChara(data.expeditionCharacterList[i]);
		battleData.expeditionCharacterList.push(character);
	}
	battleData.expeditionEnemyCharacterList = [];
	for(var i=0,l=data.expeditionEnemyCharacterList.length;i<l;i++){
		var character = CharacterModel.getChara(data.expeditionEnemyCharacterList[i]);
		battleData.expeditionEnemyCharacterList.push(character);
	}
	var model = LMvc.BattleController.model;
	var charaLayer = LMvc.BattleController.view.charaLayer;
	for(var i=0,l=data.ourList.length;i<l;i++){
		var charaData = data.ourList[i];
		var chara = charaLayer.addOurCharacter(charaData.id,charaData.action,charaData.direction,charaData.x,charaData.y);
		chara.changeAction(charaData.action);
		chara.mode = charaData.mode;
		chara.status.setData(charaData.status);
		if(charaData.id == data.selfLeader){
			chara.isLeader = true;
		}
	}
	for(var i=0,l=data.enemyList.length;i<l;i++){
		var charaData = data.enemyList[i];
		var chara = charaLayer.addEnemyCharacter(charaData.id,charaData.action,charaData.direction,charaData.x,charaData.y);
		chara.changeAction(charaData.action);
		chara.status.setData(charaData.status);
		if(charaData.id == data.enemyLeader){
			chara.isLeader = true;
		}
	}
	for(var i=0,l=data.selfCaptive.length;i<l;i++){
		var characterId = data.selfCaptive[i];
		model.selfCaptive.push(characterId);
	}
	for(var i=0,l=data.enemyCaptive.length;i<l;i++){
		var characterId = model.enemyCaptive[i];
		model.enemyCaptive.push(characterId);
	}
	for(var i=0,l=data.selfMinusStrategyCharas.length;i<l;i++){
		var characterId = data.selfMinusStrategyCharas[i];
		var chara = charaLayer.getCharacter(Belong.SELF, characterId);
		model.selfMinusStrategyCharas.push({chara:chara,skill:chara.data.skill()});
	}
	for(var i=0,l=data.enemyMinusStrategyCharas.length;i<l;i++){
		var characterId = data.enemyMinusStrategyCharas[i];
		var chara = charaLayer.getCharacter(Belong.ENEMY, characterId);
		data.enemyMinusStrategyCharas.push({chara:chara,skill:chara.data.skill()});
	}
	LMvc.BattleController.view.charaLayer.resetCharacterPositions();
	LMvc.BattleController.view.mainMenu.visible = true;
	LMvc.BattleController.view.miniLayer.visible = true;
	if(BattleSelectMenuController._instance){
		if(BattleSelectMenuController._instance.view.parent){
			BattleSelectMenuController._instance.view.remove();
		}
		BattleSelectMenuController._instance = null;
	}
	LMvc.isRead = false;
}
/*
 * 战斗失败后资源移动
 */
function battleExpeditionMove(city, retreatCity){
	//资源损失0.2
	retreatCity.food(city.food()*0.4 >>> 0);
	city.food(-city.food()*0.6 >>> 0);
	retreatCity.money(city.money()*0.4 >>> 0);
	city.money(-city.money()*0.6 >>> 0);
	retreatCity.troops(retreatCity.troops() + (city.troops()*0.4 >>> 0));
	city.troops(city.troops()*0.4 >>> 0);
}
/*
 * 战斗后移动到指定城池
 */
function battleCityChange(winSeigniorId, failSeigniorId, retreatCityId, expeditionList, city, captives){
	//var battleData = controller.battleData;
	//var city = battleData.toCity;
	var generals = city.generals();
	var moveCharas = generals.slice();
	/*
	var captives;
	if(LMvc.BattleController){
		var model = controller.model;
		captives = winSeigniorId == LMvc.selectSeignorId ? model.selfCaptive : model.enemyCaptive;
	}else{
		captives = controller.captives;
	}
	*/
	if(retreatCityId){
		var retreatCity = AreaModel.getArea(retreatCityId);
		if(!retreatCity.seigniorCharaId()){
			var seignior = SeigniorModel.getSeignior(failSeigniorId);
			seignior.addCity(retreatCity);
			retreatCity.seigniorCharaId(failSeigniorId);
		}
		//战斗失败后资源移动
		battleExpeditionMove(city, self.retreatCity);
		
		for(var i=0,l=moveCharas.length;i<l;i++){
			var chara = moveCharas[i];
			if(captives.find(function(child){return child == chara.id();})){
				continue;
			}
			chara.moveTo(retreatCityId);
			chara.moveTo();
		}
	}else{
		console.log("无撤退城市");
		var generals = city.generals();
		for(var i=0,l=generals.length;i<l;i++){
			var child = generals[i];
			if(captives.indexOf(child.id())>=0){
				continue;
			}
			captives.push(child.id());
		}
		console.log("全员被俘虏 : " + captives);
	}
	//generals.splice(0, generals.length);
	if(failSeigniorId){
		var seigniorFail = SeigniorModel.getSeignior(failSeigniorId);
		seigniorFail.removeCity(city.id());
	}
	var seigniorWin = SeigniorModel.getSeignior(winSeigniorId);
	seigniorWin.addCity(city);
	console.log("winSeigniorId="+winSeigniorId);
	city.seigniorCharaId(winSeigniorId);
	city.prefecture(expeditionList[0].id());
	generals = expeditionList.slice();
	for(var i=0,l=generals.length;i<l;i++){
		var chara = generals[i];
		city.troops(city.troops() + chara.troops());
		chara.troops(0);
		chara.moveTo(city.id());
		chara.moveTo();
	}
};
/*战斗失败,撤退城池搜索及处理*/
function battleFailChangeCity(city, failSeigniorId){
	//var city = battleData.toCity;
	var neighbors = city.neighbor();
	var enemyCitys = [];
	var canMoveCitys = [];
	for(var i = 0; i < neighbors.length; i++){
		var child = AreaModel.getArea(neighbors[i]);
		if(child.seigniorCharaId() == failSeigniorId){
			enemyCitys.push(child);
		}else if(child.seigniorCharaId() == 0){
			canMoveCitys.push(child);
		}
	}
	var retreatCity = null;
	if(enemyCitys.length > 0){
		retreatCity = enemyCitys[enemyCitys.length*Math.random() >>> 0];
	}else if(canMoveCitys.length > 0){
		retreatCity = canMoveCitys[canMoveCitys.length*Math.random() >>> 0];
		var seignior = SeigniorModel.getSeignior(failSeigniorId);
		seignior.addCity(retreatCity);
		retreatCity.seigniorCharaId(failSeigniorId);
	}
	return retreatCity;
};
function battleCheckRetreatCity(retreatCity, failSeigniorId, toCity){
	var retreatCityId = 0;
	if(retreatCity){
		if(!retreatCity.prefecture()){
			var enemyCharas = getDefenseEnemiesFromCity(retreatCity);
			retreatCity.prefecture(enemyCharas[0].id());
		}
		retreatCityId = retreatCity.id();
	}else{
		//无相邻可以撤退
		var seignior = SeigniorModel.getSeignior(failSeigniorId);
		var seigniorCharacter = seignior.character();
		if(seigniorCharacter.cityId() != toCity.id()){
			//如果君主未被擒,则撤退到君主所在城池
			console.log("如果君主未被擒,则撤退到君主所在城池");
			retreatCityId = seigniorCharacter.cityId();
		}else{
			//TODO::君主被擒，暂时随机决定撤退城池
			//TODO::版本升级后需调整为最近城池
			var citys = seignior.areas();
			if(citys.length > 0){
				retreatCityId = citys[(citys.length * Math.random()) >>> 0].id();
				console.log("敌军君主被擒，暂时随机决定撤退城池 : " + retreatCityId);
			}
		}
	}
	return retreatCityId;
}
/*经验转换成功绩*/
function experienceToFeat(characterModels){
	if(characterModels.length == 0){
		return;
	}
	var sumExp = 0;
	var datas = [];
	for(var i=0,l=characterModels.length;i<l;i++){
		var character = characterModels[i];
		datas.push({name:character.name(), exp:character.exp(), character:character});
		sumExp += character.exp();
	}
	var seignior = characterModels[0].seignior();
	seignior.exp(seignior.exp() + sumExp);
	average = sumExp / datas.length;
	var feat = average * 0.1;
	var minFeat = feat > 20 ? 10 : 5;
	var rewardValue = 1.5;
	datas = datas.sort(function(a,b){return b.exp - a.exp;});
	for(var i=0,l=datas.length;i<l;i++){
		var data = datas[i];
		data.feat = feat;
		if(data.feat < 10){
			data.feat = 10;
		}
		if(data.exp >= average * rewardValue){
			data.feat += feat * (data.exp / average  - rewardValue);
			data.reward = true;
		}
		feat -= 5;
		data.feat = data.feat >>> 0;
		data.character.feat(data.character.feat() + data.feat);
		data.character.exp(0);
		delete data.character;
	}
	return datas;
}
/*战斗结束后武将状态转换，以及出战城池太守任命*/
function battleChangeCharactersStatus(winSeigniorId, fromCity, characters){
	for(var i=0,l=characters.length;i<l;i++){
		characters[i].job(Job.END);
	}
	var prefectureChara = CharacterModel.getChara(fromCity.prefecture());
	if(!prefectureChara.seigniorId() || prefectureChara.cityId() != fromCity.id()){
		appointPrefecture(fromCity);
	}
}
/*俘虏自动化处理AI(一个)*/
function captiveAutomatedProcessing(characterModel, leaderId, retreatCityId, toCity, fromCity){
	var message;
	var seigniorId = toCity.seigniorCharaId();
	var isSeignior = characterModel.id() == characterModel.seigniorId();
	if(!isSeignior && calculateHitrateSurrender(seigniorId, characterModel)){//投降
		generalSurrender(characterModel, toCity);
		message = String.format(Language.get("surrender_dialog_msg"), characterModel.name());//{0}投降了敌军!
	}else if(calculateHitrateBehead(leaderId, characterModel)){//斩首
		console.log("斩首:"+characterModel.name());
		message = String.format(Language.get("beheaded_dialog_msg"), characterModel.name());//{0}被敌军斩首了!
		characterModel.toDie();
	}else if(isSeignior || calculateHitrateRelease(leaderId, characterModel)){//释放
		console.log("释放:"+characterModel.name());
		if(retreatCityId){
			if(characterModel.cityId() != retreatCityId){
				characterModel.moveTo(retreatCityId);
				characterModel.moveTo();
			}
			message = String.format(Language.get("released_dialog_msg"), characterModel.name());//{0}被敌军释放了!
		}else{
			characterModel.toOutOfOffice();
			message = String.format(Language.get("shimono_dialog_msg"), characterModel.name());//{0}下野了!
		}
	}else{//俘虏
		toCity.addCaptives(characterModel);
		message = String.format(Language.get("captived_dialog_msg"), characterModel.name());//{0}被敌军俘虏了!
	}
	console.log("俘虏自动化处理",message);
	return message;
}
/*俘虏自动化处理AI(多个)*/
function captivesAutomatedProcessing(captives, leaderId, retreatCityId, toCity, fromCity){
	for(var i=0,l=captives.length;i<l;i++){
		var characterId = captives[i];
		var characterModel = CharacterModel.getChara(characterId);
		captiveAutomatedProcessing(characterModel, leaderId, retreatCityId, toCity, fromCity);
	}
}
