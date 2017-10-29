function cloudWeatherCharacterShow(characterId){
	var characters;
	var weatherLayer = LMvc.BattleController.view.weatherLayer;
	var charaLayer = LMvc.BattleController.view.charaLayer;
	if(characterId){
		var character = charaLayer.getCharacter(Belong.ENEMY,characterId, true);
		characters = [character];
	}else{
		characters = charaLayer.getCharactersFromBelong(Belong.ENEMY);
	}
	if(!weatherLayer.isWeather(BattleWeatherConfig.CLOUD)){
		for(var i=0,l=characters.length;i<l;i++){
			var character = characters[i];
			character.anime.parent.alpha = 1;
			character.hideByCloud = false;
		}
		return;
	}
	var selfCharacters = charaLayer.getCharactersFromBelong(Belong.SELF);
	for(var i=0,l=characters.length;i<l;i++){
		var character = characters[i];
		var findIndex = selfCharacters.findIndex(function(child){
			var x = Math.abs(child.locationX() - character.locationX());
			var y = Math.abs(child.locationY() - character.locationY());
			return x + y <= child.data.movePower();
		});
		if(findIndex >= 0){
			character.anime.parent.alpha = 1;
			character.hideByCloud = false;
		}else{
			character.anime.parent.alpha = 0.01;
			character.hideByCloud = true;
		}
	}
}
function charactersHealMP(currentCharacters){
	for(var i=0,l=currentCharacters.length;i<l;i++){
		var character = currentCharacters[i];
		var soldierType = character.data.currentSoldiers().soldierType();
		if(soldierType == SoldierType.Physical){
			continue;
		}
		var mp = character.data.MP();
		var maxMP = character.data.maxMP();
		if(mp == maxMP){
			continue;
		}
		if(mp >= maxMP * 0.8){
			character.data.MP(mp + 1);
		}else if(mp >= maxMP * 0.5){
			character.data.MP(mp + 2);
		}else if(mp >= maxMP * 0.4){
			character.data.MP(mp + 3);
		}else if(mp >= maxMP * 0.2){
			character.data.MP(mp + 4);
		}else{
			character.data.MP(mp + 5);
		}
	}
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
				}else if(forceDifference >= 0 && Math.fakeRandom()*12 < forceDifference){
					result = true;
				}
				break;
			case CharacterDisposition.CALM:
				if(forceDifference > 0){
					result = true;
				}else if(forceDifference >= -10 && Math.fakeRandom()*12 < forceDifference + 10){
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
		}else if(forceDifference >= -20 && Math.fakeRandom()*50 < forceDifference + 20){
			result = true;
		}
	}
	if(hertChara.data.isEmploy()){
		result = false;
	}
	if(result){
		script += "SGJTalk.show(" + hertCharaModel.id() + ",0," + Language.get("single_combat_answer_ok") + ");" + 
		"SGJBattleCharacter.singleCombatStart(" + attChara.belong + "," + attCharaModel.id() + ");";
	}else{
		script += "SGJTalk.show(" + hertCharaModel.id() + ",0," + Language.get("single_combat_answer_no") + ");" + 
		"SGJBattleCharacter.endAction(" + attChara.belong + "," + attCharaModel.id() + ");";
	}
	LGlobal.script.addScript(script);
}
function battleCanAffectionGroupSkill(chara, targerChara){
	var members = [];
	if(chara.data.father()){
		if(battleCanAttack(chara.belong, chara.data.father(), targerChara)){
			members.push(chara.data.id(), chara.data.father());
			var groupSkill = GroupSkillModel.getMaster(GroupSkillAffectionId);
			groupSkill.data.members = members;
			return groupSkill;
		}
	}
	var childs = chara.data.childs();
	for(var i=0;i<childs.length;i++){
		var charaId = childs[i];
		if(battleCanAttack(chara.belong, charaId, targerChara)){
			members.push(chara.data.id(), charaId);
			var groupSkill = GroupSkillModel.getMaster(GroupSkillAffectionId);
			groupSkill.data.members = members;
			return groupSkill;
		}
	}
	return null;
}
function battleCanGroupSkill(chara, targerChara){
	var groupSkill = battleCanAffectionGroupSkill(chara, targerChara);
	if(groupSkill){
		return groupSkill;
	}
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
	return battleLocationInRangeAttack(chara, targerChara.locationX(), targerChara.locationY());
}
function battleLocationInRangeAttack(chara, locationX, locationY){
	var relativelyX = locationX - chara.locationX();
	var relativelyY = locationY - chara.locationY();
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
	var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(belong, null, true);
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
				var list = AreaModel.getPowerfulCharacters(charas);
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
function battleDefCharactersToAttack(belong, battleData){
	if(belong == Belong.SELF){
		return;
	}
	if(battleData.toCity.seigniorCharaId() == LMvc.selectSeignorId ){
		return;
	}
	var charaLayer = LMvc.BattleController.view.charaLayer;
	var selfCharas = charaLayer.getCharactersFromBelong(Belong.SELF);
	var enemyCharas = charaLayer.getCharactersFromBelong(Belong.ENEMY);
	var troopsSelf = 0, troopsEnemy = 0;
	selfCharas.forEach(function(c){troopsSelf += c.data.troops();});
	enemyCharas.forEach(function(c){troopsEnemy += c.data.troops();});
	if(troopsSelf * 4 > troopsEnemy){
		return;
	}
	enemyCharas.forEach(function(c){
		if(c.data.isDefCharacter()){
			return;
		}
		c.mission = BattleCharacterMission.Initiative;
	});
}
function battleFoodCheck(belong){
	var battleData = LMvc.BattleController.battleData;
	var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(belong);
	var cityFood = (belong == Belong.SELF && battleData.fromCity.seigniorCharaId() != LMvc.selectSeignorId) || 
		(belong == Belong.ENEMY && battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId);
	var militaryModel = LMvc.BattleController.militaryModel;
	battleDefCharactersToAttack(belong, battleData);
	var needFood = 0;
	var thrift = 1;
	for(var i=0,l=charas.length;i<l;i++){
		var charaModel = charas[i].data;
		if(charaModel.hasSkill(SkillSubType.RICE)){
			continue;
		}
		if(cityFood && militaryModel && militaryModel.isType(MilitaryType.WOOD_CATTLE)){
			var troops = charaModel.troops();
			var troopsAdd = charaModel.maxTroops() * militaryModel.healTroops() >>> 0;
			if(charaModel.maxTroops() < troops + troopsAdd){
				charaModel.troops(charaModel.maxTroops());
			}else{
				charaModel.troops(troops + troopsAdd);
			}
			continue;
		}
		needFood += charaModel.troops();
		if(charaModel.hasSkill(SkillSubType.THRIFT)){
			thrift = 0.5;
		}
	}
	if(cityFood){
		if(militaryModel && militaryModel.isType(MilitaryType.WOOD_CATTLE)){
			thrift = 0;
		}
		needFood = (needFood * thrift >>> 0);
		if(battleData.toCity.food() > needFood){
			battleData.toCity.food(-needFood);
			return true;
		}
		battleData.toCity.food(-battleData.toCity.food());
	}else{
		if(militaryModel && militaryModel.isType(MilitaryType.CONSUMPTION)){
			thrift *= 2;
		}
		needFood += (battleData.troops * 0.5);
		needFood = (needFood * thrift >>> 0);
		if(battleData.food > needFood){
			battleData.food -= needFood;
			return true;
		}
		battleData.food = 0;
	}
	
	charas.forEach(function(child){
		//降低能力
		child.status.downloadAidStatusRandom();
		//兵粮不够的时候，兵力每回合损失0.05
		var troops = child.data.troops() * 0.95 >>> 0;
		if(troops < 5){
			troops = 5;
		}
		var minusTroops = child.data.troops() - troops;
		if(minusTroops < 0){
			return;
		}
		child.data.troops(troops);
		tweenTextShow(child, String.format("-{0}",minusTroops), 10);
	});
	var chara;
	for(var i=0,l=charas.length;i<l;i++){
		if(charas[i].isLeader){
			chara = charas[i];
			break;
		}
	}
	var script = "SGJTalk.show(" + chara.data.id() + ",0,"+Language.get("no_food_talk")+");";
	script += "SGJBattleCharacter.boutSkillRun("+belong+");";
	LGlobal.script.addScript(script);
	return false;
}
function battleHealTroops(currentSelectStrategy, currentTargetCharacter, proficiency){
	if(typeof proficiency == UNDEFINED){
		proficiency = 1;
	}
	var troopsAdd = currentSelectStrategy.troops() * proficiency >>> 0;
	var woundedAdd = currentSelectStrategy.wounded() * proficiency >>> 0;
	return battleHealTroopsRun(troopsAdd, woundedAdd, currentTargetCharacter);
}
function battleHealTroopsRun(troopsAdd, woundedAdd, currentTargetCharacter){
	var troops = currentTargetCharacter.data.troops();
	var maxTroops = currentTargetCharacter.data.maxTroops();
	if(troops == maxTroops){
		return 0;
	}
	var wounded = currentTargetCharacter.data.wounded();
	if(woundedAdd < 1){
		woundedAdd = wounded * woundedAdd >>> 0;
	}else if(woundedAdd > wounded){
		woundedAdd = wounded;
	}
	if(troops + woundedAdd > maxTroops){
		woundedAdd = maxTroops - troops;
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
	
	if(troops + troopsAdd + woundedAdd > maxTroops){
		troopsAdd = maxTroops - troops - woundedAdd;
	}
	if(troopsAdd > 0){
		if(battleData.fromCity.seigniorCharaId() == currentTargetCharacter.data.seigniorId()){
			battleData.troops -= troopsAdd;
		}else{
			battleData.toCity.troops(reservist - troopsAdd);
		}
	}
	if(woundedAdd > 0){
		currentTargetCharacter.data.wounded(wounded - woundedAdd);
		troopsAdd += woundedAdd;
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
	data.startAttack = LMvc.BattleController.startAttack;
	data.militaryOver = LMvc.BattleController.militaryOver;
	if(LMvc.BattleController.militaryModel){
		data.militaryId = LMvc.BattleController.militaryModel.id();
		data.militaryValidLimit = LMvc.BattleController.militaryValidLimit;
	}
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
		var childData = {
			id:character.data.id(),
			status:character.status.getData(),
			direction:character.direction,
			action:character.action,
			mode:character.mode,
			mission:character.mission,
			isDefCharacter:character.data.isDefCharacter(),
			isEmploy:character.data.isEmploy(),
			x:character.locationX(),
			y:character.locationY()
		};
		if(character.militaryModel){
			childData.militaryId = character.militaryModel.id();
			childData.militaryValidLimit = character.militaryValidLimit;
		}
		if(childData.isDefCharacter){
			childData.data = character.data.datas();
		}else if(character.data.isEmploy()){
			childData.employDatas = character.data.employDatas();
		}
		data.ourList.push(childData);
	}
	data.enemyList = [];
	for(var i=0,l=model.enemyList.length;i<l;i++){
		var character = model.enemyList[i];
		var childData = {
			id:character.data.id(),
			status:character.status.getData(),
			direction:character.direction,
			action:character.action,
			mission:character.mission,
			isDefCharacter:character.data.isDefCharacter(),
			isEmploy:character.data.isEmploy(),
			x:character.locationX(),
			y:character.locationY()
		};
		if(character.militaryModel){
			childData.militaryId = character.militaryModel.id();
			childData.militaryValidLimit = character.militaryValidLimit;
		}
		if(childData.isDefCharacter){
			childData.data = character.data.datas();
		}else if(character.data.isEmploy()){
			childData.employDatas = character.data.employDatas();
		}
		data.enemyList.push(childData);
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
	data.weather = LMvc.BattleController.view.weatherLayer.getData();
	return data;
}
function setBattleSaveData(){
	var data = LMvc.areaData.battleData;
	LMvc.BattleController.startAttack = data.startAttack;
	LMvc.BattleController.militaryOver = data.militaryOver;
	var battleData = LMvc.BattleController.battleData;
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
		if(charaData.isDefCharacter){
			var chara = CharacterModel.getChara(charaData.id);
			chara.isDefCharacter(1);
			chara.seigniorId(battleData.toCity.seigniorCharaId());
			chara.cityId(battleData.toCity.id());
			chara.setDatas(charaData.data);
		}else if(charaData.isEmploy){
			var chara = CharacterModel.getChara(charaData.id);
			chara.setEmployDatas(charaData.employDatas);
		}
		var chara = charaLayer.addOurCharacter(charaData.id,charaData.action,charaData.direction,charaData.x,charaData.y);
		chara.changeAction(charaData.action);
		chara.mode = charaData.mode;
		chara.mission = charaData.mission;
		chara.status.setData(charaData.status);
		if(charaData.militaryId){
			chara.militaryModel = MilitaryModel.getMaster(charaData.militaryId);
			chara.militaryValidLimit = charaData.militaryValidLimit;
		}
		if(charaData.id == data.selfLeader){
			chara.isLeader = true;
		}
	}
	for(var i=0,l=data.enemyList.length;i<l;i++){
		var charaData = data.enemyList[i];
		if(charaData.isDefCharacter){
			var chara = CharacterModel.getChara(charaData.id);
			chara.isDefCharacter(1);
			chara.seigniorId(battleData.toCity.seigniorCharaId());
			chara.cityId(battleData.toCity.id());
			chara.setDatas(charaData.data);
		}else if(charaData.isEmploy){
			var chara = CharacterModel.getChara(charaData.id);
			chara.setEmployDatas(charaData.employDatas);
		}
		var chara = charaLayer.addEnemyCharacter(charaData.id,charaData.action,charaData.direction,charaData.x,charaData.y);
		chara.changeAction(charaData.action);
		chara.status.setData(charaData.status);
		chara.mission = charaData.mission;
		if(charaData.militaryId){
			chara.militaryModel = MilitaryModel.getMaster(charaData.militaryId);
			chara.militaryValidLimit = charaData.militaryValidLimit;
		}
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
		if(!chara){
			continue;
		}
		model.selfMinusStrategyCharas.push({chara:chara,skill:chara.data.skill()});
	}
	for(var i=0,l=data.enemyMinusStrategyCharas.length;i<l;i++){
		var characterId = data.enemyMinusStrategyCharas[i];
		var chara = charaLayer.getCharacter(Belong.ENEMY, characterId);
		if(!chara){
			continue;
		}
		data.enemyMinusStrategyCharas.push({chara:chara,skill:chara.data.skill()});
	}
	LMvc.BattleController.view.charaLayer.resetCharacterPositions();
	LMvc.BattleController.view.weatherLayer.setData(data.weather);
	LMvc.BattleController.view.mainMenu.visible = true;
	LMvc.BattleController.view.miniLayer.visible = true;
	
	if(data.militaryId){
		LMvc.BattleController.militaryModel = MilitaryModel.getMaster(data.militaryId);
		LMvc.BattleController.militaryValidLimit = data.militaryValidLimit;
	}
	
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
	city.food(-(city.food()*0.6 >>> 0));
	retreatCity.money(city.money()*0.4 >>> 0);
	city.money(-(city.money()*0.6 >>> 0));
	retreatCity.troops(retreatCity.troops() + (city.troops()*0.4 >>> 0));
	city.troops(city.troops()*0.4 >>> 0);
}
/*
 * 战斗后移动到指定城池
 */
function battleCityChange(winSeigniorId, failSeigniorId, retreatCityId, expeditionList, city, captives){
	var generals = city.generals();
	var moveCharas = generals.slice();
	if(retreatCityId){
		var retreatCity = AreaModel.getArea(retreatCityId);
		if(!retreatCity.seigniorCharaId()){
			var seignior = SeigniorModel.getSeignior(failSeigniorId);
			seignior.addCity(retreatCity);
			retreatCity.seigniorCharaId(failSeigniorId);
		}
		//战斗失败后资源移动
		battleExpeditionMove(city, retreatCity);
		
		for(var i=0,l=moveCharas.length;i<l;i++){
			var chara = moveCharas[i];
			if(captives.find(function(child){return child == chara.id();})){
				continue;
			}
			chara.moveTo(retreatCityId);
			chara.moveTo();
		}
	}else{
		//无撤退城市
		var generals = city.generals();
		if(city.seigniorCharaId() > 0 && city.seignior().character().isTribeCharacter()){
			//外族消亡
			for(var i=generals.length-1;i>=0;i--){
				generals[i].toDie();
			}
		}else{
			//全员被俘虏
			for(var i=0,l=generals.length;i<l;i++){
				var child = generals[i];
				if(captives.indexOf(child.id())>=0){
					continue;
				}
				captives.push(child.id());
			}
		}
	}
	//generals.splice(0, generals.length);
	if(failSeigniorId){
		var seigniorFail = SeigniorModel.getSeignior(failSeigniorId);
		seigniorFail.removeCity(city.id());
	}
	var seigniorWin = SeigniorModel.getSeignior(winSeigniorId);
	seigniorWin.addCity(city);
	city.seigniorCharaId(winSeigniorId);
	var prefectureChara = expeditionList[0];
	var fromCityId = prefectureChara.cityId();
	city.prefecture(prefectureChara.id());
	generals = expeditionList.slice();
	var canHeal = generals.find(function(chara){
		return HealSoldiers.indexOf(chara.currentSoldierId())>=0;
	});
	for(var i=0,l=generals.length;i<l;i++){
		var chara = generals[i], troopsValue = chara.troops();
		if(canHeal){
			troopsValue += chara.wounded();
		}else{
			troopsValue += chara.wounded() * (0.2 + 0.6 * Math.fakeRandom());
			troopsValue = troopsValue >>> 0;
		}
		if(chara.cityId() == fromCityId){
			city.troops(city.troops() + troopsValue);
			chara.moveTo(city.id());
			chara.moveTo();
		}else{
			var charaCity = chara.city();
			charaCity.troops(charaCity.troops() + troopsValue);
		}
		chara.troops(0);
		chara.wounded(0);
	}
};
/*战斗失败,撤退城池搜索及处理*/
function battleFailChangeCity(city, failSeigniorId){
	//var city = battleData.toCity;
	if(!failSeigniorId){
		return null;
	}
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
		retreatCity = enemyCitys[enemyCitys.length*Math.fakeRandom() >>> 0];
	}else if(canMoveCitys.length > 0){
		retreatCity = canMoveCitys[canMoveCitys.length*Math.fakeRandom() >>> 0];
		var seignior = SeigniorModel.getSeignior(failSeigniorId);
		seignior.addCity(retreatCity);
		retreatCity.seigniorCharaId(failSeigniorId);
		LMvc.MapController.view.resetAreaIcon(retreatCity.id());
	}
	return retreatCity;
};
function battleCheckRetreatCity(retreatCity, failSeigniorId, toCity){
	var retreatCityId = 0;
	if(!failSeigniorId){
		return retreatCityId;
	}
	if(retreatCity){
		if(!retreatCity.prefecture()){
			var enemyCharas = retreatCity.getDefenseEnemies();
			if(enemyCharas.length > 0){
				retreatCity.prefecture(enemyCharas[0].id());
			}
		}
		retreatCityId = retreatCity.id();
	}else{
		//无相邻可以撤退
		var seignior = SeigniorModel.getSeignior(failSeigniorId);
		var seigniorCharacter = seignior.character();
		if(seigniorCharacter.cityId() != toCity.id()){
			//如果君主未被擒,则撤退到君主所在城池
			//console.log("如果君主未被擒,则撤退到君主所在城池");
			retreatCityId = seigniorCharacter.cityId();
		}else{
			//TODO::ver1.1君主被擒，暂时随机决定撤退城池,版本升级后需调整为最近城池
			var citys = seignior.areas();
			if(citys.length > 0){
				retreatCityId = citys[(citys.length * Math.fakeRandom()) >>> 0].id();
				//console.log("敌军君主被擒，暂时随机决定撤退城池 : " + retreatCityId);
			}
		}
	}
	return retreatCityId;
}
/*经验转换成功绩*/
function experienceToFeat(characterModels){
	if(!characterModels || characterModels.length == 0){
		return;
	}
	var sumExp = 0;
	var datas = [];
	for(var i=0,l=characterModels.length;i<l;i++){
		var character = characterModels[i];
		datas.push({name:character.name(), exp:character.exp(), character:character});
		sumExp += character.exp();
		character.equipmentStoneClear();
	}
	var average = sumExp / datas.length;
	var feat = average * 0.2;
	var minFeat = feat > 20 ? 15 : 10;
	var rewardValue = 1.5;
	datas = datas.sort(function(a,b){return b.exp - a.exp;});
	for(var i=0,l=datas.length;i<l;i++){
		var data = datas[i];
		data.feat = feat;
		if(data.feat < minFeat){
			data.feat = minFeat;
		}
		if(data.exp >= average * rewardValue && data.exp > 50){
			data.feat += feat * (data.exp / average  - rewardValue);
			data.reward = true;
		}
		feat -= 5;
		data.feat = data.feat >>> 0;
		data.character.featPlus(data.feat);
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
	if(fromCity.prefecture() == 0){
		appointPrefecture(fromCity);
		return;
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
		//console.log("斩首:"+characterModel.name());
		message = String.format(Language.get("beheaded_dialog_msg"), characterModel.name());//{0}被敌军斩首了!
		characterModel.toDie();
	}else if(isSeignior || calculateHitrateRelease(leaderId, characterModel)){//释放
		//console.log("释放:"+characterModel.name());
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
	//console.log("俘虏自动化处理",message);
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
/*全军撤退*/
function allCharactersToRetreat(){
	var controller = LMvc.BattleController;
	var toCity = controller.battleData.toCity;
	var isSelfDef = toCity.seigniorCharaId() == LMvc.selectSeignorId;
	var characters = controller.view.charaLayer.getCharactersFromBelong(Belong.SELF);
	var canHeal = characters.find(function(chara){
		return HealSoldiers.indexOf(chara.data.currentSoldierId())>=0;
	});
	for(var i=0,l=characters.length;i<l;i++){
		if(characters[i].data.isDefCharacter()){
			continue;
		}
		var charaModel = characters[i].data;
		var troops = charaModel.troops();
		if(canHeal){
			troops += charaModel.wounded();
		}else{
			troops += charaModel.wounded() * (0.2 + 0.6 * Math.fakeRandom());
			troops = troops >>> 0;
		}
		charaModel.troops(0);
		charaModel.wounded(0);
		if(isSelfDef){
			characters[i].data.city().troops(toCity.troops() + troops);
		}else{
			controller.battleData.troops += troops;
		}
	}
	battleEndCheck(Belong.SELF);
};
/*外族兵力及资源撤回*/
function attackResourcesReturnToCity(characters, battleData, city){
	for(var i=0,l=characters.length;i<l;i++){
		if(characters[i].data.isDefCharacter()){
			continue;
		}
		var troops = characters[i].data.troops();
		characters[i].data.troops(0);
		battleData.troops += troops;
	}
	city.troops(city.troops() + battleData.troops);
	city.food(battleData.food);
	city.money(battleData.money);
};
/*外族入侵，资源损失*/
function lossOfResourcesByTribe(toCity, fromCity){
	var food = toCity.food()*0.5 >>> 0;//粮食掠夺
	toCity.food(-food);
	fromCity.food(food);
	var money = toCity.money()*0.5 >>> 0;//金钱掠夺
	toCity.money(-money);
	fromCity.money(money);
	toCity.troops(toCity.troops()*0.2 >>> 0);//兵力损失
	toCity.cityDefense(-(toCity.cityDefense()*0.5 >>> 0));//防御损失
	toCity.population(-(toCity.population()*0.1 >>> 0));//人口损失
	toCity.police(-(toCity.police()*0.2 >>> 0));//治安损失
	toCity.agriculture(-(toCity.agriculture()*0.1 >>> 0));//农业损失
	toCity.business(-(toCity.business()*0.1 >>> 0));//商业损失
	toCity.technology(-(toCity.technology()*0.1 >>> 0));//技术损失
}
/*外族灭亡，资源重设*/
function resetTribeCity(city){
	city.troops(0);
	city.food(2000);
	city.money(1000);
}
function tweenTextShow(chara, label, y){
	if(!isPlayerBattle()){
		return;
	}
	if(typeof y == UNDEFINED){
		y = 0;
	}
	var tweenObj = getStrokeLabel(label,22,"#FFFFFF","#000000",2);
	tweenObj.x = chara.x + (BattleCharacterSize.width - tweenObj.getWidth()) * 0.5;
	tweenObj.y = chara.y + y;
	chara.controller.view.baseLayer.addChild(tweenObj);
	LTweenLite.to(tweenObj,0.5,{y:tweenObj.y - 20,alpha:0,onComplete:function(e){
		e.target.remove();
	}});
}
/*军师计发动*/
function militaryAdviserStart(characterModel){
	LMvc.BattleController.militaryOver = true;
	var militaryModel = characterModel.military();
	var image = LMvc.datalist["military-"+militaryModel.image()];
	if(!image){
		var list = [{name:"military-"+militaryModel.image(),path:LMvc.IMG_PATH+"military/" + militaryModel.image() + ".png"}];
		LMvc.BattleController.load.image(list,function(){
			militaryAdviserStart(characterModel);
		});
		return;
	}
    var data = new LBitmapData(image);
    var list = LGlobal.divideCoordinate(data.width, data.height, 1, militaryModel.imageCount());
	var animation = new LAnimationTimeline(data, list);
	animation.x =  -animation.getWidth()*0.5;
	animation.y =  -animation.getHeight()*0.5;
	animation.speed = 3;
	var animationLayer = new LSprite();
	animationLayer.alpha = 0;
	animationLayer.scaleX = animationLayer.scaleY = 0.1;
	animationLayer.x = LMvc.screenWidth*0.5;
	animationLayer.y = LMvc.screenHeight*0.5;
	animationLayer.addChild(animation);
	LMvc.layer.addChild(animationLayer);
	LTweenLite.to(animationLayer,0.5,{scaleX:360/data.width,scaleY:360/data.width,alpha:1})
	.to(animationLayer,2,{delay:0.5,scaleX:720/data.width,scaleY:720/data.width,alpha:0,ease:LEasing.Quart.easeOut,onComplete:militaryAdviserEnd});
	if(isPlayerBattle()){
		Toast.makeText(String.format(Language.get("military_started"), militaryModel.name())).show();
	}
}
function militaryAdviserStrategy(chara, strategy){
	//console.log("militaryAdviserStrategy",chara.data.name(),strategy.name());
	switch(strategy.effectType()){
		case StrategyEffectType.Status:
			chara.status.addStatus(strategy.strategyType(), strategy.hert());
			if(strategy.hert() == 0){
				break;
			}
		case StrategyEffectType.Attack:
			var currentChara = isPlayerBattle() ? BattleController.ctrlChara : BattleAIExecute.Instance().currentChara;
			var hertValue = calculateHertStrategyValue(currentChara, chara, strategy, 1);
			var troops = chara.data.troops();
			if(troops < hertValue){
				hertValue = troops;
			}
			chara.data.troops(troops - hertValue);
			break;
		case StrategyEffectType.Aid:
			chara.status.addStatus(strategy.strategyType(), strategy.hert());
			break;
		case StrategyEffectType.Wake:
			chara.status.wake();
			break;
		case StrategyEffectType.Supply:
			var troopsAdd = strategy.troops();
			var woundedAdd = strategy.wounded();
			var troops = chara.data.troops();
			var maxTroops = chara.data.maxTroops();
			if(troops == maxTroops){
				break;
			}
			var wounded = chara.data.wounded();
			if(woundedAdd < 1){
				woundedAdd = wounded * woundedAdd >>> 0;
			}else if(woundedAdd > wounded){
				woundedAdd = wounded;
			}
			if(troops + woundedAdd > maxTroops){
				woundedAdd = maxTroops - troops;
			}
			if(troops + troopsAdd + woundedAdd > maxTroops){
				troopsAdd = maxTroops - troops - woundedAdd;
			}
			if(woundedAdd > 0){
				chara.data.wounded(wounded - woundedAdd);
				troopsAdd += woundedAdd;
			}
			chara.data.troops(troops + troopsAdd);
			break;
	}
}
function getStrategyBelong(belong,targetBelong){
	if(belong == Belong.ENEMY){
		if(targetBelong == Belong.ENEMY){
			return Belong.SELF;
		}else{
			return Belong.ENEMY;
		}
	}else{
		if(targetBelong == Belong.ENEMY){
			return Belong.ENEMY;
		}else{
			return Belong.SELF;
		}
	}
}
function militaryAdviserEnd(event){
	event.target.remove();
	var characterModel = BattleController.ctrlChara.data;
	var militaryModel = characterModel.military();
	var belong = getStrategyBelong(militaryModel.belong(), BattleController.ctrlChara.belong);
	var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(belong);
	militaryAdviserSelect(characterModel, charas);
}
function militaryAdviserSelect(characterModel, charas){
	var militaryModel = characterModel.military();
	if(militaryModel.isType(MilitaryType.STRATEGY)){
		for(var i=0, l= charas.length;i<l;i++){
			var chara = charas[i];
			var strategys = Array.getRandomArrays(militaryModel.strategys(),militaryModel.strategyCount());
			for(var j=0;j<strategys.length;j++){
				var ids = strategys[j];
				for(var k=0;k<ids.length;k++){
					var strategy = StrategyMasterModel.getMaster(ids[k]);
					militaryAdviserStrategy(chara, strategy);
				}
			}
		}
	}else if(militaryModel.isType(MilitaryType.WOOD_CATTLE) || militaryModel.isType(MilitaryType.CONTINUE) || 
	militaryModel.isType(MilitaryType.ANGER) || militaryModel.isType(MilitaryType.CONSUMPTION) || 
	militaryModel.isType(MilitaryType.SKILL) || militaryModel.isType(MilitaryType.SURMOUNT)){
		LMvc.BattleController.militaryModel = militaryModel;
		LMvc.BattleController.militaryValidLimit = militaryModel.validLimit();
	}else if(militaryModel.isType(MilitaryType.BARRIER)){
		for(var i=0, l= charas.length;i<l;i++){
			var chara = charas[i];
			chara.militaryModel = militaryModel;
			chara.militaryValidLimit = militaryModel.validLimit();
		}
	}
	LMvc.running = false;
	if(isPlayerBattle()){
		BattleController.ctrlChara.AI.endAction();
	}
}
function getMaxMilitary(belong){
	var selfAttack = (LMvc.BattleController.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId);
	if(!selfAttack || LMvc.BattleController.militaryOver){
		return null;
	}
	var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(belong);
	return getMaxMilitaryFromCharacters(charas);
}
function getMaxMilitaryFromCharacters(charas){
	/*if(LMvc.BattleController.militaryOver){
		return null;
	}
	var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(belong);*/
	var militaryModels = [];
	for(var i=0;i<charas.length;i++){
		var characterModel = charas[i].data;
		var militaryModel = characterModel.military();
		if(!militaryModel){
			continue;
		}
		militaryModels.push(militaryModel);
	}
	if(militaryModels.length == 0){
		return null;
	}
	militaryModels = militaryModels.sort(function(a, b){
		return b.powerful() - a.powerful();
	});
	return militaryModels[0];
}
function isNeedSupplyMilitary(belong){
	var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(belong);
	return isNeedSupplyMilitaryFromCharacters(charas);
}
function isNeedSupplyMilitaryFromCharacters(charas){
	//var charas = LMvc.BattleController.view.charaLayer.getCharactersFromBelong(belong);
	var count = 0;
	for(var i=0;i<charas.length;i++){
		var chara = charas[i];
		if(chara.status.needWake()){
			count++;
			continue;
		}
		var characterModel = chara.data;
		if(characterModel.wounded() > 20){
			count++;
		}
	}
	return count >= charas.length * 0.5;
}
//战斗结束后特殊兵种取消
function resetAllBattleSoldier(characterModels){
	for(var i=0,l=characterModels.length;i<l;i++){
		var character = characterModels[i];
		character.battleSoldierReset();
	}
}
//普通兵种对应特殊兵种
function getBattleSoldierSelectId(currentSoldiers, characterModel){
	if(SpecializedSoldiers.indexOf(currentSoldiers.id()) >= 0){//佣兵专用兵种
		return currentSoldiers.id();
	}
	if(currentSoldiers.attackType() == AttackType.MAGIC){
		return 51;//仙人
	}else if(currentSoldiers.attackType() == AttackType.FAR){
		return 42;//丹阳兵
	}
	if([74, 33].indexOf(characterModel.id()) >= 0){//典韦，许褚
		return 46;//虎卫军
	}
	if([14, 124, 171, 293, 79, 165, 105].indexOf(characterModel.id()) >= 0){//曹仁,曹洪,曹纯,夏侯惇,曹真,曹休,夏侯尚
		return 45;//虎豹骑
	}
	if([14, 38].indexOf(currentSoldiers.id()) >= 0){//海盗，大海盗
		if(characterModel.skillId() == 32){
			return 46;//虎卫军
		}else{
			return 47;//解烦兵
		}
	}
	if([18, 19].indexOf(currentSoldiers.id()) >= 0){//驯熊师,驯虎师
		return 49;//飞熊军
	}
	if([7, 31, 8, 32, 13, 37].indexOf(currentSoldiers.id()) >= 0){//武术家,贼兵
		if(characterModel.skillId() == 42){
			return 46;//虎卫军
		}else{
			return 44;//无当飞军
		}
	}
	if([2,26].indexOf(currentSoldiers.id()) >= 0){//步兵
		if(characterModel.skillId() == 85){
			return 46;//虎卫军
		}else if(characterModel.skillId() == 21){
			return 43;//白耳兵
		}
		if(characterModel.compatibility() >= 60 && characterModel.compatibility() <= 90){
			return 43;//白耳兵
		}else{
			return 46;//虎卫军
		}
	}else{
		if([17,41].indexOf(currentSoldiers.id()) >= 0){//西凉骑兵
			if(characterModel.skillId() == 39){
				return 45;//虎豹骑
			}else{
				return 50;//陷阵营
			}
		}
		if(characterModel.compatibility() >= 60 && characterModel.compatibility() <= 70){
			return 48;//白马义从
		}else{
			return 45;//虎豹骑
		}
	}
	return currentSoldiers.id();
}
function setEquipmentsStoneItem(characterModel, level, isSpecial){
	var equipments = characterModel.equipments();
	characterModel.calculation(true);
	var stoneTypes = [];
	var skills = [0,0,0,0,0];
	var status = [];
	if(level > 45){
		stoneTypes.push(StoneType.RED,StoneType.RED,StoneType.RED,StoneType.RED,StoneType.RED);
		status.push({p:"attack",k:"force",v:5},{p:"spirit",k:"intelligence",v:5},{p:"defense",k:"command",v:5},{p:"breakout",k:"agility",v:5},{p:"morale",k:"luck",v:5});
		if(LMvc.chapterData.trouble == TroubleConfig.HARD){
			skills = [StoneType.RED,StoneType.RED,StoneType.RED,StoneType.RED,0];
		}else if(LMvc.chapterData.trouble == TroubleConfig.NORMAL){
			skills = [StoneType.RED,StoneType.RED,0,0,0];
		}else{
			skills = [StoneType.RED,0,0,0,0];
		}
	}else if(level > 35){
		stoneTypes.push(StoneType.PURPLE,StoneType.PURPLE,StoneType.PURPLE,StoneType.PURPLE,StoneType.PURPLE);
		status.push({p:"attack",k:"force",v:4},{p:"spirit",k:"intelligence",v:4},{p:"defense",k:"command",v:4},{p:"breakout",k:"agility",v:4},{p:"morale",k:"luck",v:4});
		if(LMvc.chapterData.trouble == TroubleConfig.HARD){
			skills = [StoneType.PURPLE,StoneType.PURPLE,StoneType.PURPLE,0,0];
		}else if(LMvc.chapterData.trouble == TroubleConfig.NORMAL){
			skills = [StoneType.PURPLE,0,0,0,0];
		}
	}else if(level > 25){
		stoneTypes.push(StoneType.BLUE,StoneType.BLUE,StoneType.BLUE,StoneType.BLUE,StoneType.BLUE);
		status.push({k:"attack",v:4},{k:"spirit",v:4},{k:"defense",v:4},{k:"breakout",v:4},{k:"morale",v:4});
		if(LMvc.chapterData.trouble == TroubleConfig.HARD){
			skills = [StoneType.BLUE,StoneType.BLUE,0,0,0];
		}
	}else if(level > 15){
		stoneTypes.push(StoneType.GREEN,StoneType.GREEN,StoneType.GREEN,StoneType.GREEN,StoneType.GREEN);
		status.push({p:"attack",k:"force",v:2},{p:"spirit",k:"intelligence",v:2},{p:"defense",k:"command",v:2},{p:"breakout",k:"agility",v:2},{p:"morale",k:"luck",v:2});
		if(LMvc.chapterData.trouble == TroubleConfig.HARD){
			skills = [StoneType.BLUE,0,0,0,0];
		}
	}else{
		stoneTypes.push(StoneType.YELLOW,StoneType.YELLOW,StoneType.YELLOW,StoneType.YELLOW,StoneType.YELLOW);
		status.push({k:"attack",v:2},{k:"spirit",v:2},{k:"defense",v:2},{k:"breakout",v:2},{k:"morale",v:2});
	}
	var currentSoldiers = characterModel.currentSoldiers();
	var property = currentSoldiers.property();
	for(var i=0;i<equipments.length;i++){
		var equipment = equipments[i];
		if(!isSpecial && i>0){
			continue;
		}
		if(equipment.stone() && equipment.stonePlus().ai && equipment.stonePlus().level >= (level/10 >>> 0)){
			continue;
		}
		var stoneId = 0, stoneData = {type:ItemType.EQUIPMENT, ai:1, level:(level/10 >>> 0)};
		var stoneType = stoneTypes[i];
		var skill = skills[i];
		if(!skill){
			for(var j=0;j<status.length;j++){
				var child = status[j];
				if(!child.p){
					continue;
				}
				var old_v = CharacterModel.upValue(property[child.p], characterModel[child.k](), 0);
				var new_v = CharacterModel.upValue(property[child.p], characterModel[child.k]() + child.v, 0);
				if(new_v > old_v){console.log(child);
					stoneData[child.k] = child.v;
					stoneId = ItemDatas.find(function(c){return c.stoneType == stoneType;}).id;
					break;
				}
			}
			if(stoneId == 0){
				var child = status[status.length * Math.fakeRandom() >>> 0];
				stoneData[child.k] = child.v;
				stoneId = ItemDatas.find(function(c){return c.stoneType == stoneType;}).id;
			}
		}else{
			stoneId = ItemDatas.find(function(c){return c.stoneType == skill;}).id;
			getEquipmentStoneItem(characterModel, skill, stoneData);
		}
		equipment.stone(stoneId);
		equipment.stonePlus(stoneData);
	}
}
function getEquipmentStoneItem(characterModel, stoneType, stoneData){
	var currentSoldiers = characterModel.currentSoldiers();
	var property = currentSoldiers.property();
	var skills = [];
	ItemDatas.forEach(function(child){
		if(child.soldierType && child.soldierType.indexOf(currentSoldiers.soldierType()) >= 0){
			if(!child.stoneValue[0].list || child.stoneValue[0].list.length == 0){
				return;
			}
			skills.push(child.stoneValue[0].list);
		}
	});
	skills = skills[skills.length * Math.fakeRandom() >>> 0];
	var child = skills[skills.length * Math.fakeRandom() >>> 0];
	stoneData.skill = child.skill;
}
function isPlayerBattle(){
	return (typeof BattleController != UNDEFINED) && (LMvc.BattleController instanceof BattleController);
}
function isMilitaryHappened(seigniorId, militaryType){
	if(!LMvc.BattleController || !LMvc.BattleController.militaryModel || !LMvc.BattleController.battleData || !LMvc.BattleController.battleData.toCity || !LMvc.BattleController.battleData.toCity.seigniorCharaId){
		return false;
	}
	return LMvc.BattleController.militaryModel.isType(militaryType) && (seigniorId == 0 || LMvc.BattleController.battleData.toCity.seigniorCharaId() == seigniorId);
}
