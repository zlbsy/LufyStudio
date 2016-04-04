function jobAiEvent(){
	return checkEventList();
}
/*检索战力最弱城池*/
function getWeakBattleCity(areaModel){
	//console.log("getWeakBattleCity :: 检索战力最弱城池");
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
/*检索可攻击城池*/
function getCanBattleCity(areaModel,characters,enlistFlag){
	//console.log("getCanBattleCity :: 检索可攻击城池");
	if(enlistFlag == AiEnlistFlag.Must || enlistFlag == AiEnlistFlag.MustResource){
		return null;
	}
	var generalCount = areaModel.generalsSum();
	if(characters.length < BattleMapConfig.DetachmentQuantity || generalCount < BattleMapConfig.DetachmentQuantity * 2 || generalCount - BattleMapConfig.DetachmentQuantity > characters.length){
		return;
	}
	var weakCity = getWeakBattleCity(areaModel);
	//console.log("weakCity="+weakCity);
	if(!weakCity){
		return null;
	}
	var weakCityGeneralCount = weakCity.generalsSum();
	weakCityGeneralCount = weakCityGeneralCount > BattleMapConfig.DefenseQuantity ? BattleMapConfig.DefenseQuantity : weakCityGeneralCount;
	if(characters.length < weakCityGeneralCount * 0.5){
		return null;
	}
	var generals = AreaModel.getPowerfulCharacters(characters);
	//console.log("getCanBattleCity generals.length="+generals.length);
	var needFood = 0;
	for(var i=0,l=generals.length;i<l && i<BattleMapConfig.AttackQuantity;i++){
		var charaModel = generals[i].general;
		needFood += charaModel.maxTroops();
	}
	//console.log("areaModel.food()="+areaModel.food());
	//console.log("needFood * 20="+(needFood * 20));
	if(areaModel.food() < needFood * 20){
		return null;
	}
	
	return weakCity;
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
/*出战准备*/
function jobAiToBattle(areaModel,characters,targetCity){
	//targetCity = AreaModel.getArea(22);//测试用
	
	var attackQuantity = BattleMapConfig.AttackQuantity;
	var generalCount = areaModel.generalsSum();
	if(generalCount - attackQuantity < BattleMapConfig.DetachmentQuantity){
		attackQuantity = generalCount - BattleMapConfig.DetachmentQuantity;
	}
	if(characters.length < attackQuantity){
		attackQuantity = characters.length;
	}
	var generals = AreaModel.getPowerfulCharacters(characters);
	var data = {};
	data.fromCity = areaModel;
	data.attackFlag = 1;
	data.expeditionCharacterList = [];
	var sumTroops = 0;
	for(var i = 0;i<attackQuantity;i++){
		var general = generals[i].general;
		var index = characters.findIndex(function(child){
			return child.id() == general.id();
		});
		characters.splice(index, 1);
		data.expeditionCharacterList.push(general);
		if(i == 0){
			data.expeditionLeader = general;
		}
		var maxTroops = general.maxTroops();
		sumTroops += maxTroops;
		general.troops(maxTroops);
	}
	data.troops = sumTroops;
	sumTroops = sumTroops + data.troops;
	data.money = areaModel.money() * 0.2 >>> 0;
	//TODO::带多少回合粮食
	data.food = sumTroops * 10;
	areaModel.food(-data.food);
	areaModel.money(-data.money);
	areaModel.troops(areaModel.troops() - sumTroops);
	data.cityId = targetCity.id();
	data.toCity = targetCity;
	if(targetCity.seigniorCharaId() == LMvc.selectSeignorId){
		SeigniorExecute.Instance().stop = true;
		//进入战斗
		var attackSeignior = areaModel.seignior();
		//{0}的{1}向{2}的{3}发起进攻了!
		var msg = String.format(Language.get("to_attack_seignior_city"),attackSeignior.character().name(),areaModel.name(),"我军",targetCity.name());
		var obj = {title:Language.get("confirm"),message:msg,height:200
		,okEvent:function(event){
			event.currentTarget.parent.remove();
			SeigniorExecute.Instance().backLayer.visible = false;
			LMvc.MapController.showCity(targetCity.id(), function(){
				var build = LMvc.CityController.view.showBuildView("expedition");
				build.characterListType = CharacterListType.EXPEDITION;
				LMvc.CityController.setValue("cityData",areaModel);
				LMvc.CityController.setValue("toCity",targetCity);
				LMvc.CityController.setValue("expeditionEnemyData",data);
				
				LMvc.CityController.loadCharacterList(CharacterListType.EXPEDITION,targetCity.generals(Job.IDLE), {buttonLabel:"execute"});
			});
		}};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	jobAiBattleExecute(areaModel,data,targetCity);
}
/*AI之间自动战斗*/
function jobAiBattleExecute(areaModel,data,targetCity){
	console.log("AI之间自动战斗", areaModel,data,targetCity);
	var attackSeignior = areaModel.seignior();
	var defSeignior = targetCity.seignior();
	if(!targetCity.seigniorCharaId()){
		SeigniorExecute.addMessage(String.format(Language.get("to_attack_null_city"),attackSeignior.character().name(),areaModel.name(),targetCity.name()));
		BattleAIExecute.set(data, {expeditionCharacterList:[]});
		return;
	}
	SeigniorExecute.addMessage(String.format(Language.get("to_attack_seignior_city"),attackSeignior.character().name(),areaModel.name(),defSeignior.character().name(),targetCity.name()));
	var targetData = {};
	var enemyCharas = targetCity.getDefenseEnemies();
	enemyCharas[0].isLeader = true;
	var sumTroops = targetCity.troops();
	for(var i = 0;i<enemyCharas.length;i++){
		var charaId = enemyCharas[i].id();
		var chara = CharacterModel.getChara(charaId);
		var maxTroop = chara.maxTroops();
		if(maxTroop > sumTroops){
			maxTroop = sumTroops;
		}
		chara.troops(maxTroop);
		sumTroops -= maxTroop;
		targetCity.troops(sumTroops);
		if(sumTroops > 0 || i == enemyCharas.length - 1){
			continue;
		}
		enemyCharas = enemyCharas.splice(0, i + 1);
		break;
	}
	targetData.expeditionCharacterList = enemyCharas;
	BattleAIExecute.set(data, targetData);
}
function jobAiNeedToEnlist(areaModel){
	if(areaModel.troops() >= areaModel.maxTroops()){
		return AiEnlistFlag.Node;
	}
	var charas = areaModel.getDefenseEnemies();
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
	if(areaModel.population() <= areaModel.minPopulation() || areaModel.money() < JobPrice.ENLIST){
		return false;
	}
	return true;
}
function jobAiToEnlish(areaModel,characters){
	if(characters.length == 0){
		return;
	}
	if(areaModel.money() < JobPrice.ENLIST){
		return;
	}
	//console.log("jobAiToEnlish :: 征兵");
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
	areaModel.money(-cost);
	character.enlist(EnlistSetting.ENLIST_FROM + num);
	SeigniorExecute.Instance().areaMessage(areaModel, "jobai_enlish_message");//{0}的{1}在招兵买马!
}
function jobAiPersuade(areaModel,characters){//劝降
	console.log("+++++++++++++++++++++++劝降"+characters.length);
	if(characters.length == 0){
		return;
	}
	var persuadeCharacters = getCanPersuadeCharacters();
	var length = persuadeCharacters.length;
	if(length == 0){
		return;
	}
	var minLoyalty = persuadeCharacters[length - 1].l;
	var p = Math.ceil((90 - minLoyalty) / 5) * 0.1;
	var r = Math.random();
	if(r > p){
		return;
	}
	console.log("+++++++++++++++++++++++",r,p,persuadeCharacters);
	var sum = 0;
	for(var i = 0;i<length;i++){console.log(persuadeCharacters[i].i);
		sum += (i + 1);
	}
	var v = sum * Math.random();
	sum = 0, targetId = persuadeCharacters[length - 1].i;
	for(var i = 0;i<length;i++){
		sum += (i + 1);
		if(v < sum){
			targetId = persuadeCharacters[i].i;
			break;
		}
	}
	var character = characters.shift();
	character.persuade(targetId);
}
function jobAiTavern(areaModel,characters){//录用
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().areaMessage(areaModel, "jobai_tavern_message");
	var outOfOfficeCharas = areaModel.outOfOffice();
	if(outOfOfficeCharas.length == 0){
		return;
	}
	var character = characters.shift();
	var hireCharacterIndex = Math.random()*outOfOfficeCharas.length >>> 0;
	character.hire(outOfOfficeCharas[hireCharacterIndex].id());
}
function jobAiAccess(areaModel,characters){//访问
	if(characters.length == 0){
		return;
	}
	SeigniorExecute.Instance().areaMessage(areaModel, "jobai_tavern_message");
	jobAiInternal(areaModel,characters,0,Job.ACCESS);
}
function jobAiLevelUpCity(areaModel,characters){//升级城池
	jobAiInternal(areaModel,characters,JobPrice.LEVEL_UP,Job.LEVEL_UP);
}
function jobAiInstitute(areaModel,characters){//技术
	jobAiInternal(areaModel,characters,JobPrice.TECHNOLOGY,Job.TECHNOLOGY);
}
function jobAiFarmland(areaModel,characters){//农业
	jobAiInternal(areaModel,characters,JobPrice.AGRICULTURE,Job.AGRICULTURE);
}
function jobAiMarket(areaModel,characters){//商业
	jobAiInternal(areaModel,characters,JobPrice.BUSINESS,Job.BUSINESS);
}
function jobAiFarmlandExplore(areaModel,characters){//农地探索
	jobAiInternal(areaModel,characters,0,Job.EXPLORE_AGRICULTURE);
}
function jobAiMarketExplore(areaModel,characters){//市场探索
	jobAiInternal(areaModel,characters,0,Job.EXPLORE_BUSINESS);
}
function jobAiPolice(areaModel,characters){//治安
	jobAiInternal(areaModel,characters,JobPrice.POLICE,Job.POLICE);
}
function jobAiRepair(areaModel,characters){//修补
	jobAiInternal(areaModel,characters,JobPrice.REPAIR,Job.REPAIR);
}
function jobAiInternal(areaModel,characters,price,job){//内政
	if(characters.length == 0){
		return;
	}
	if(price > 0 && areaModel.money() < price){
		return;
	}
	SeigniorExecute.Instance().areaMessage(areaModel, "jobai_internal_message");//{0}的{1}在发展内政!
	var character = characters.shift();
	character.job(job);
	if(price > 0){
		areaModel.money(-price);
	}
}
function jobAiSetCityBattleDistance(seigniorModel){
	if(seigniorModel.chara_id() == LMvc.selectSeignorId){
		SeigniorExecute.Instance().timer.reset();
		SeigniorExecute.Instance().timer.start();
		return;
	}
	var areas = seigniorModel.areas();
	areas.forEach(function(area){
		area.battleDistanceCheckOver = false;
		area.battleDistance = 100;
		area.aiWillComeNum = 0;
	});
	//console.log("jobAiSetCityBattleDistance areas:"+areas.length);
	for(var j=0,l=areas.length;j<l;j++){
		var area = areas[j];
		if(area.battleDistanceCheckOver){
			continue;
		}
		var neighbors = area.neighbor();
		var enemyNear = 0;
		var neighborCitys = [];
		for(var i = 0;i < neighbors.length;i++){
			var child = AreaModel.getArea(neighbors[i]);
			if(child.seigniorCharaId() != area.seigniorCharaId()){
				enemyNear += 1;
			}else{
				neighborCitys.push(child);
			}
		}
		var distance = -enemyNear * 0.1;
		if(area.battleDistance > distance){
			area.battleDistance = distance;
		}
		distance += 1;
		for(var i = 0;i < neighborCitys.length;i++){
			var child = neighborCitys[i];
			if(child.battleDistance > distance){
				child.battleDistance = distance;
			}
		}
	}
	SeigniorExecute.Instance().timer.reset();
	SeigniorExecute.Instance().timer.start();
}
function jobAiGeneralMove(areaModel,characters){//武将移动
	if(characters.length == 0){
		return;
	}
	//console.log("jobAiGeneralMove :: 武将移动");
	var nowGeneralSum = areaModel.aiWillComeNum + areaModel.generalsSum();
	if(nowGeneralSum <= 1){
		return;
	}
	var neighbors = areaModel.neighbor();
	var citys = [];
	var battleDistance = 100;
	var currentCity, currentGeneralSum = 100;
	for(var i = 0;i < neighbors.length;i++){
		var child = AreaModel.getArea(neighbors[i]);
		if(child.seigniorCharaId() != areaModel.seigniorCharaId()){
			continue;
		}
		var childGeneralSum = child.generalsSum() + child.aiWillComeNum;
		if(nowGeneralSum < childGeneralSum){
			continue;
		}
		if(child.battleDistance < battleDistance || (child.battleDistance == battleDistance && childGeneralSum < currentGeneralSum)){
			citys = [child];
			battleDistance = child.battleDistance;
			currentCity = child;
			currentGeneralSum = childGeneralSum;
		}else if(child.battleDistance == battleDistance && childGeneralSum == currentGeneralSum){
			citys.push(child);
		}
	}
	if(citys.length == 0 || citys[0].battleDistance > areaModel.battleDistance){
		return;
	}
	var targetCity = citys[citys.length * Math.random() >>> 0];
	var generals = AreaModel.getPowerfulCharacters(characters);
	var charaId = generals[0].general.id();
	var index = characters.findIndex(function(child){
		return child.id() == charaId;
	});
	var character = characters[index];
	characters.splice(index, 1);
	areaModel.aiWillComeNum--;
	targetCity.aiWillComeNum++;
	character.moveTo(targetCity.id());
}
function jobAiTransport(areaModel,characters){//运输物资
	if(characters.length == 0){
		return;
	}
	//console.log("jobAiTransport :: 运输物资");
	var neighbors = areaModel.neighbor();
	var battleDistance = 100;
	var currentCity;
	for(var i = 0;i < neighbors.length;i++){
		var child = AreaModel.getArea(neighbors[i]);
		if(child.seigniorCharaId() != areaModel.seigniorCharaId()){
			return;
		}
		if(child.battleDistance > areaModel.battleDistance){
			continue;
		}
		if(child.battleDistance < battleDistance){
			battleDistance = child.battleDistance;
			currentCity = child;
		}
	}
	if(!currentCity){
		return;
	}
	var charas = areaModel.getDefenseEnemies();
	var minToops = 0;
	for(var i = 0,l=charas.length;i<l;i++){
		var chara = charas[i];
		minToops += chara.maxTroops();
	}
	var troops = areaModel.troops() - minToops*3;
	troops = troops < minToops ? 0 : troops;
	var food = areaModel.food() - minToops * 30;
	food = food < minToops * 10 ? 0 : food;
	var money = areaModel.money() - 10000;
	money = money < 5000 ? 0 : money;
	if(troops == 0 && food == 0 && money == 0){
		return;
	}
	var data = {
		cityId : currentCity.id(),
		money : money,
		food : food,
		troops : troops
	};
	var index = characters.length * Math.random() >>> 0;
	var character = characters[index];
	characters.splice(index, 1);
	character.transport(data);
}
function jobAiCaptives(areaModel){
	var captives = areaModel.captives();
	if(captives.length == 0){
		return;
	}
	var seigniorId = areaModel.seigniorCharaId();
	for(var i = captives.length - 1; i >= 0; i--){
		var charaModel = captives[i];
		if(charaModel.job() != Job.IDLE){
			continue;
		}
		jobAiCaptive(areaModel, seigniorId, charaModel);
	}
}
function jobAiCaptive(areaModel, seigniorId, charaModel){
	charaModel.job(Job.END);
	if(calculateHitrateSurrender(seigniorId, charaModel)){//投降
		if(charaModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("surrender_dialog_msg"),charaModel.name()));
		}
		charaModel.seigniorId(seigniorId);
		areaModel.removeCaptives(charaModel.id());
		areaModel.addGenerals(charaModel);
		return;
	}
	if(calculateHitrateRelease(seigniorId, charaModel)){//释放
		if(charaModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("released_dialog_msg"),charaModel.name()));
		}
		areaModel.removeCaptives(charaModel.id());
		if(!charaModel.seignior() || !charaModel.seignior().character().seigniorId()){
			//下野
			charaModel.toOutOfOffice();
		}else{
			//回归自己势力
			var areas = charaModel.seignior().areas();
			var city = areas[areas.length * Math.random() >>> 0];
			charaModel.moveTo(city.id());
			charaModel.moveTo();
		}
		return;
	}
	if(calculateHitrateBehead(seigniorId, charaModel)){//斩首
		if(charaModel.seigniorId() == LMvc.selectSeignorId){
			SeigniorExecute.addMessage(String.format(Language.get("beheaded_dialog_msg"),charaModel.name()));
		}
		areaModel.removeCaptives(charaModel.id());
	} 
}
function jobAiCaptivesRescue(areaModel,characters){//解救俘虏
	if(characters.length == 0){
		return false;
	}
	//console.log("jobAiCaptivesRescue :: 解救俘虏");
	var captives = SeigniorModel.getCharactersIsCaptives(areaModel.seigniorCharaId());
	if(captives.length == 0){
		return false;
	}
	//TODO::执行解救俘虏概率
	
	
	var captiveIndex = captives.length * Math.random() >>> 0;
	var captive = captives[captiveIndex];
	var character = characters.shift();
	var money = (captive.force() + captive.intelligence() + captive.command() + captive.agility() + captive.luck()) * JobCoefficient.REDEEM;
	money += (money * captive.skillCoefficient() * 0.1);
	//console.log("captive:" ,captive.name(),",money:",money,", areaModel.money():",areaModel.money());
	if(areaModel.money() < money){
		return false;
	}
	areaModel.money(-money);
	var captiveArea = captive.city();
	if(captiveArea.seigniorCharaId() == LMvc.selectSeignorId){
		character.job(Job.End);
		//"{0}的{1}想用金钱{2}赎回{3}，是否答应？"
		var obj = {title:Language.get("confirm"),message:String.format(Language.get("jobai_rescue_confirm_message"),captiveArea.seignior().name(),character.name(),money,captive.name()),height:200
		,okEvent:function(event){
			event.currentTarget.parent.remove();
			areaModel.removeCaptives(character.id());
			charaModel.moveTo(character.cityId());
			charaModel.moveTo();
			SeigniorExecute.run();
		},cancelEvent:function(event){
			event.currentTarget.parent.remove();
			areaModel.money(money);
			SeigniorExecute.run();
		}};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return true;
	}
	character.redeem(captive.id(), money);
	return false;
}