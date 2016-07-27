function BattleResultView(controller, result){
	var self = this;
	LExtends(self,LView,[controller]);
	self.name = "BattleResult";
	self.backInit();
	self.result = result;
	self.checkCaptives = [];
	//TODO:test code
	//var from = self.controller.battleData.fromCity;
	//self.controller.battleData.fromCity = self.controller.battleData.toCity;
	//self.controller.battleData.toCity = from;
	//self.model.enemyList[0].isLeader = true;
	//TODO:test code end
	//self.result = result=0;
	//controller.addEnemyCharacter(243,"up",3,3);
	//self.model.enemyList[0].isLeader = true;
	//self.model.enemyCaptive.push(4);
	
	experienceToFeat(self.controller.battleData.expeditionEnemyCharacterList);
	self.setEvent();
	if(result){
		self.winInit();
	}else{
		self.failInit();
	}
	self.showExpDialog();
};
BattleResultView.prototype.selfChangeCity=function(){
	var self = this;
	var battleData = self.controller.battleData;
	self.retreatCity = battleFailChangeCity(battleData.toCity, self.failSeigniorId);
	if(self.retreatCity){
		self.retreatCityId = self.retreatCity.id();
	}
};
BattleResultView.prototype.winInit=function(){
	var self = this;
	var battleData = self.controller.battleData;
	self.winSeigniorId = LMvc.selectSeignorId;
	if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		self.failSeigniorId = battleData.toCity.seigniorCharaId();
		var city = battleData.toCity;
		if(city.seigniorCharaId() > 0 && city.seignior().isTribe()){
			//外族资源重设
			resetTribeCity(city);
		}
		if(city.seigniorCharaId() > 0 && city.generalsSum() > self.model.selfCaptive.length){
			self.selfChangeCity();
		}
		battleCityChange(self.winSeigniorId, self.failSeigniorId, self.retreatCityId, battleData.expeditionCharacterList, battleData.toCity, self.model.selfCaptive);
		//敌方太守
		self.retreatCityId = battleCheckRetreatCity(self.retreatCity, self.failSeigniorId, battleData.toCity);
		//己方太守
		if(self.controller.noBattle){
			city.prefecture(battleData.expeditionLeader.id());
		}else{
			var selfCharas = self.controller.view.charaLayer.getCharactersFromBelong(Belong.SELF);
			var chara = selfCharas.find(function(child){
				return child.isLeader;
			});
			if(!chara)return;
			city.prefecture(chara.data.id());
		}
	}else{
		self.retreatCityId = battleData.fromCity.id();
		self.failSeigniorId = battleData.fromCity.seigniorCharaId();
	}
	self.showResultTitle("battle_win");
};
BattleResultView.prototype.failInit=function(){
	var self = this;
	var battleData = self.controller.battleData;
	self.enemyLeader = self.model.enemyList.find(function(child){
		return child.isLeader;
	});
	self.showResultTitle("battle_fail");
	self.failSeigniorId = LMvc.selectSeignorId;
	if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		self.winSeigniorId = battleData.toCity.seigniorCharaId();
		self.retreatCityId = battleData.fromCity.id();
		self.addEventListener(BattleResultEvent.CLOSE_EXP, self.enemyCaptiveFail);
	}else{
		self.winSeigniorId = battleData.fromCity.seigniorCharaId();
		var isTribeCharacter = battleData.fromCity.seignior().character().isTribeCharacter();
		if(isTribeCharacter){
			self.addEventListener(BattleResultEvent.CLOSE_EXP, self.lossOfResources);
			self.addEventListener(BattleResultEvent.LOSS_OF_OCCUPY, self.showMap);
		}else{
			self.addEventListener(BattleResultEvent.CLOSE_EXP, self.selectMoveCity);
		}
	}
};
BattleResultView.prototype.lossOfResources=function(event){
	var self = event.currentTarget;
	var battleData = self.controller.battleData;
	//外族入侵，资源损失
	lossOfResourcesByTribe(battleData.toCity, battleData.fromCity);
	//外族兵力及资源撤回
	var characters = self.controller.view.charaLayer.getCharactersFromBelong(Belong.ENEMY);
	attackResourcesReturnToCity(characters, battleData, battleData.fromCity);
	self.message = String.format(Language.get("dialog_tribe_invasion_self_message"), battleData.toCity.name());
	//{0}被外族入侵，城池遭到破坏，资源损失严重!
	var view = new BattleResultConfirmView(self.controller, 
		{
			confirmType : BattleFailConfirmType.lossOfResources, 
			message : self.message
		}
	);
	self.addChild(view);
};
BattleResultView.prototype.selectMoveCity=function(event){
	var self = event.currentTarget;
	var view = new BattleResultConfirmView(self.controller, 
		{
			winSeigniorId : self.winSeigniorId,
			failSeigniorId : self.failSeigniorId,
			confirmType : BattleFailConfirmType.selectMoveCity
		}
	);
	self.addChild(view);
};
BattleResultView.prototype.setEvent=function(){
	var self = this;
	if(self.result){
		self.addEventListener(BattleResultEvent.CLOSE_EXP, self.selfCaptiveWin);
		self.addEventListener(BattleResultEvent.CLOSE_CAPTIVE, self.selfCaptiveWin);
		self.addEventListener(BattleResultEvent.CLOSE_CAPTIVE_SELF, self.enemyCaptiveWin);
		self.addEventListener(BattleResultEvent.CLOSE_CAPTIVE_ENEMY, self.cityWin);
		self.addEventListener(BattleResultEvent.RESCUE_CAPTIVE, self.cityWin);
	}else{
		self.addEventListener(BattleResultEvent.LOSE_CITY, self.enemyCaptiveFail);
		self.addEventListener(BattleResultEvent.CLOSE_FAIL_CAPTIVE, self.enemyCaptiveFail);
		self.addEventListener(BattleResultEvent.CLOSE_FAIL_CAPTIVE_ENEMY, self.selfCaptiveFail);
		self.addEventListener(BattleResultEvent.CLOSE_FAIL_CAPTIVE_SELF, self.cityFail);
		self.addEventListener(BattleResultEvent.RESCUE_CAPTIVE, self.cityFail);
	}
	self.addEventListener(BattleResultEvent.ATTACK_AND_OCCUPY, self.showMap);
};
BattleResultView.prototype.cityWin=function(event){
	var self = event.currentTarget;
	var charaTroops = 0;
	self.model.ourList.forEach(function(child){
		if(child.data.isDefCharacter()){
			return;
		}
		charaTroops += child.data.troops();
		child.data.troops(0);
	});
	var message;
	var battleData = self.controller.battleData;
	var cityName = battleData.toCity.name();
	if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		if(!self.failSeigniorId){
			message = String.format(Language.get("win_attack_and_occupy_null"),Language.get("belong_self"),cityName);//{0}攻占了{1}!
		}else{
			var seignior = CharacterModel.getChara(self.failSeigniorId);
			message = String.format(Language.get("win_attack_and_occupy_enemy"),Language.get("belong_self"),seignior.name(),cityName);//{0}攻占了{1}军的{2}!
		}
		battleData.toCity.food(battleData.food);
		battleData.toCity.money(battleData.money);
		battleData.toCity.troops(battleData.toCity.troops() + battleData.troops + charaTroops);
	}else{
		var seignior = CharacterModel.getChara(self.failSeigniorId);
		message = String.format(Language.get("win_attack_and_occupy_self"),cityName,seignior.name());//我军在{0}击退了{1}军的进攻!
		battleData.toCity.troops(battleData.toCity.troops() + charaTroops);
	}
	self.message = message;
	var view = new BattleResultConfirmView(self.controller, 
		{
			confirmType : BattleWinConfirmType.attackAndOccupy, 
			message : message
		}
	);
	self.addChild(view);
};
BattleResultView.prototype.cityFail=function(event){
	var self = event.currentTarget;
	var charaTroops = 0;
	self.model.enemyList.forEach(function(child){
		if(child.data.isDefCharacter()){
			return;
		}
		charaTroops += child.data.troops();
		child.data.troops(0);
	});
	var message;
	var seignior = CharacterModel.getChara(self.winSeigniorId);
	var battleData = self.controller.battleData;
	var cityName = battleData.toCity.name();
	if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		message = String.format(Language.get("fail_attack_and_occupy_enemy"),Language.get("belong_self"),seignior.name(),cityName);//{0}攻占{1}军的{2}失败了!
		battleData.toCity.troops(battleData.toCity.troops() + charaTroops);
	}else{
		battleData.toCity.food(battleData.food);
		battleData.toCity.money(battleData.money);
		battleData.toCity.troops(battleData.toCity.troops() + battleData.troops + charaTroops);
		message = String.format(Language.get("fail_attack_and_occupy_self"),cityName,seignior.name());//我军的{0}被{1}军攻占了!
	}
	self.message = message;
	var view = new BattleResultConfirmView(self.controller, 
		{
			confirmType : BattleFailConfirmType.attackAndOccupy, 
			message : message
		}
	);
	self.addChild(view);
};
BattleResultView.prototype.selfCaptiveFail=function(event){
	var self = event.currentTarget;
	if(self.model.selfCaptive.length == 0){
		self.dispatchEvent(BattleResultEvent.CLOSE_FAIL_CAPTIVE_SELF);
		return;
	}
	self.model.selfCaptive.length = 0;
	var view = new BattleResultConfirmView(self.controller, 
		{confirmType : BattleFailConfirmType.selfCaptive}
	);
	self.addChild(view);
};
BattleResultView.prototype.enemyCaptiveFail=function(event){
	var self = event.currentTarget;
	if(self.model.enemyCaptive.length == 0){
		self.dispatchEvent(BattleResultEvent.CLOSE_FAIL_CAPTIVE_ENEMY);
		return;
	}
	var charaId = self.model.enemyCaptive[0];
	self.model.enemyCaptive.splice(0, 1);
	var view = new BattleResultConfirmView(self.controller, 
		{
			confirmType : BattleFailConfirmType.enemyCaptive,
			leaderId : self.enemyLeader.data.id(),
			retreatCityId : self.retreatCityId,
			characterModel : CharacterModel.getChara(charaId)
		}
	);
	self.addChild(view);
};
BattleResultView.prototype.showExpDialog=function(){
	var self = this;
	var view = new BattleExpChangeView(self.controller);
	self.addChild(view);
};
BattleResultView.prototype.selfCaptiveWin=function(event){
	var self = event.currentTarget;
	if(self.model.selfCaptive.length == 0){
		self.dispatchEvent(BattleResultEvent.CLOSE_CAPTIVE_SELF);
		return;
	}
	var characterId = self.model.selfCaptive[0];
	var confirmType = BattleWinConfirmType.selfCaptive;
	if(self.checkCaptives.indexOf(characterId) >= 0){
		confirmType = BattleWinConfirmType.selfRecruitFail;
	}
	var view = new BattleResultConfirmView(self.controller, 
		{
			confirmType : confirmType,
			characterModel : CharacterModel.getChara(characterId)
		}
	);
	self.addChild(view);
};
BattleResultView.prototype.enemyCaptiveWin=function(event){
	var self = event.currentTarget;
	if(self.model.enemyCaptive.length == 0){
		self.dispatchEvent(BattleResultEvent.CLOSE_CAPTIVE_ENEMY);
		return;
	}
	self.model.enemyCaptive.length = 0;
	var view = new BattleResultConfirmView(self.controller, 
		{confirmType : BattleWinConfirmType.enemyCaptive}
	);
	self.addChild(view);
};
BattleResultView.prototype.backInit=function(){
	var self = this;
	var windowLayer = new LSprite();
	self.addChild(windowLayer);
	windowLayer.addChild(getTranslucentBitmap());
	windowLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	windowLayer.addEventListener(LMouseEvent.MOUSE_UP, function(){});
	windowLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function(){});
};
BattleResultView.prototype.showResultTitle=function(value){
	var self = this;
	var title = getStrokeLabel(Language.get(value),50,"#CCCCCC","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 20;
	self.addChild(title);
};
BattleResultView.prototype.showMap=function(event){
	var self = event ? event.currentTarget : this;
	self.changeCharactersStatus();
	var toCity = self.controller.battleData.toCity;
	var cityId = toCity.id();
	
	BattleSelectMenuController._instance = null;
	
	BattleController.ctrlChara = null;
	var battleController = LMvc.BattleController;
	var battleModel = battleController.model;
	var battleView = battleController.view;
	LMvc.BattleController = null;
	battleController.view.remove();
	for(var k in battleController){
		delete battleController[k];
	}
	for(var k in battleModel){
		delete battleModel[k];
	}
	for(var k in battleView){
		delete battleView[k];
	}
	LMvc.MapController.view.visible = true;
	LMvc.MapController.view.positionChangeToCity(toCity);
	LMvc.MapController.view.changeMode(MapController.MODE_MAP);
	LMvc.MapController.view.resetAreaIcon(cityId);
	if(self.retreatCityId){
		LMvc.MapController.view.resetAreaIcon(self.retreatCityId);
	}
	if(SeigniorExecute.running){
		SeigniorExecute.Instance().stop = false;
		SeigniorExecute.addMessage(self.message);
	}
	if(self.failSeigniorId){
		LMvc.MapController.checkSeigniorFail(self.failSeigniorId);
	}else{
		LMvc.MapController.checkSeigniorWin();
	}
};
BattleResultView.prototype.changeCharactersStatus=function(){
	var self = this;
	var battleData = self.controller.battleData;
	var isTribeCharacter = battleData.fromCity.seignior().character().isTribeCharacter();
	if(isTribeCharacter){
		return;
	}
	var characters;
	if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		characters = battleData.expeditionCharacterList;
	}else{
		characters = battleData.expeditionEnemyCharacterList;
	}
	battleChangeCharactersStatus(self.winSeigniorId, battleData.fromCity, characters);
};