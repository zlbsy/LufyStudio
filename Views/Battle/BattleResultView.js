function BattleResultView(controller, result){
	var self = this;
	LExtends(self,LView,[controller]);console.error("BattleResultView");
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
	var city = battleData.toCity;
	var neighbors = city.neighbor();
	var enemyCitys = [];
	var canMoveCitys = [];
	for(var i = 0; i < neighbors.length; i++){
		var child = AreaModel.getArea(neighbors[i]);
		if(child.seigniorCharaId() == self.failSeigniorId){
			enemyCitys.push(child);
		}else if(child.seigniorCharaId() == 0){
			canMoveCitys.push(child);
		}
	}
	self.retreatCity = null;
	if(enemyCitys.length > 0){
		self.retreatCity = enemyCitys[enemyCitys.length*Math.random() >>> 0];
	}else if(canMoveCitys.length > 0){
		self.retreatCity = canMoveCitys[canMoveCitys.length*Math.random() >>> 0];
		var seignior = SeigniorModel.getSeignior(self.failSeigniorId);
		seignior.addCity(self.retreatCity);
		self.retreatCity.seigniorCharaId(self.failSeigniorId);
	}
	if(self.retreatCity){
		self.retreatCityId = self.retreatCity.id();
		battleExpeditionMove(city, self.retreatCity);
	}
};
BattleResultView.prototype.winInit=function(){
	var self = this;
	var battleData = self.controller.battleData;
	self.winSeigniorId = LMvc.selectSeignorId;
	if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		experienceToFeat(battleData.expeditionEnemyCharacterList);
		self.failSeigniorId = battleData.toCity.seigniorCharaId();
		var city = battleData.toCity;
		if(city.seigniorCharaId() > 0 && city.generalsSum() > self.model.selfCaptive.length){
			self.selfChangeCity();
		}
		battleCityChange(self.winSeigniorId, self.failSeigniorId, self.retreatCityId, self.model.selfCaptive, battleData.expeditionCharacterList);
		//敌方太守
		if(self.retreatCity){
			var enemyCharas = getDefenseEnemiesFromCity(self.retreatCity);
			self.retreatCity.prefecture(enemyCharas[0].id());
		}else{
			/*var generals = battleData.toCity.generals();
			console.log("toCity generals",generals);
			for(var i=0,l=generals.length;i<l;i++){
				var child = generals[i];
				if(self.model.selfCaptive.indexOf(child.id())>=0){
					continue;
				}
				self.model.selfCaptive.push(child.id());
			}
			console.log("全员被俘虏 : " + self.model.selfCaptive);
			*/
			//无相邻可以撤退
			var seignior = SeigniorModel.getSeignior(self.failSeigniorId);
			var seigniorCharacter = seignior.character();
			if(seigniorCharacter.cityId() != battleData.toCity.id()){
				//如果君主未被擒,则撤退到君主所在城池
				console.log("如果君主未被擒,则撤退到君主所在城池");
				self.retreatCityId = seigniorCharacter.cityId();
			}else{
				//TODO::君主被擒，暂时随机决定撤退城池
				//TODO::版本升级后需调整为最近城池
				var citys = seignior.areas();
				if(citys.length > 0){
					self.retreatCityId = citys[(citys.length * Math.random()) >>> 0].id();
					console.log("敌军君主被擒，暂时随机决定撤退城池 : " + self.retreatCityId);
				}
			}
		}
		//己方太守
		if(self.controller.noBattle){
			city.prefecture(battleData.expeditionLeader.id());
		}else{
			var selfCharas = self.controller.view.charaLayer.getCharactersFromBelong(Belong.SELF);
			console.log("selfCharas", selfCharas);
			var chara = selfCharas.find(function(child){
				return child.isLeader;
			});console.log("chara", chara);
			if(!chara)return;
			city.prefecture(chara.data.id());
		}
	}else{
		self.failSeigniorId = controller.battleData.fromCity.seigniorCharaId();
		console.log("nothing");
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
		console.log("nothing");
		self.winSeigniorId = battleData.toCity.seigniorCharaId();
		self.retreatCityId = battleData.fromCity.id();
		self.addEventListener(BattleResultEvent.CLOSE_EXP, self.enemyCaptiveFail);
	}else{
		console.log("enemy change city");
		self.winSeigniorId = battleData.fromCity.seigniorCharaId();
		self.addEventListener(BattleResultEvent.CLOSE_EXP, self.selectMoveCity);
	}
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
		charaTroops += child.data.troops();
		child.data.troops(0);
	});
	var message;
	var battleData = self.controller.battleData;
	var cityName = battleData.toCity.name();
	if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		if(!self.failSeigniorId){
			message = String.format(Language.get("win_attack_and_occupy_null"),cityName);//我军攻占了{0}!
		}else{
			var seignior = CharacterModel.getChara(self.failSeigniorId);
			message = String.format(Language.get("win_attack_and_occupy_enemy"),seignior.name(),cityName);//我军攻占了{0}军的{1}!
		}
		battleData.toCity.food(battleData.food);
		battleData.toCity.money(battleData.money);
		battleData.toCity.troops(battleData.toCity.troops() + battleData.troops + charaTroops);
	}else{
		var seignior = CharacterModel.getChara(self.failSeigniorId);
		message = String.format(Language.get("win_attack_and_occupy_self"),cityName,seignior.name());//我军在{0}击退了{1}军的进攻!
		battleData.toCity.troops(battleData.toCity.troops() + charaTroops);
	}
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
		charaTroops += child.data.troops();
		child.data.troops(0);
	});
	var message;
	var seignior = CharacterModel.getChara(self.winSeigniorId);
	var battleData = self.controller.battleData;
	var cityName = battleData.toCity.name();
	if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		message = String.format(Language.get("fail_attack_and_occupy_enemy"),seignior.name(),cityName);//我军攻占{0}军的{1}失败了!
		battleData.toCity.troops(battleData.toCity.troops() + charaTroops);
	}else{
		battleData.toCity.food(battleData.food);
		battleData.toCity.money(battleData.money);
		battleData.toCity.troops(battleData.toCity.troops() + battleData.troops + charaTroops);
		message = String.format(Language.get("fail_attack_and_occupy_self"),cityName,seignior.name());//我军的{0}被{1}军攻占了!
	}
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
	if(event.eventType == BattleResultEvent.CLOSE_EXP){
		experienceToFeat(battleData.expeditionEnemyCharacterList);
	}
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
	var self = event.currentTarget;
	self.changeCharactersStatus();
	var cityId = self.controller.battleData.toCity.id();
	self.controller.view.remove();
	LMvc.BattleController = null;
	LMvc.MapController.view.visible = true;
	LMvc.MapController.view.changeMode(MapController.MODE_MAP);
	LMvc.MapController.view.resetAreaIcon(cityId);
	if(self.retreatCityId){
		LMvc.MapController.view.resetAreaIcon(self.retreatCityId);
	}
	if(self.failSeigniorId){
		LMvc.MapController.checkSeigniorFail(self.failSeigniorId);
	}else{
		LMvc.MapController.checkSeigniorWin();
	}
};
BattleResultView.prototype.changeCharactersStatus=function(){
	var self = this;
	console.log("SeigniorExecute.running = " + SeigniorExecute.running);
	if(SeigniorExecute.running){
		return;
	}
	var battleData = self.controller.battleData;
	if(battleData.fromCity.seigniorCharaId() != LMvc.selectSeignorId){
		return;
	}
	for(var i=0,l=battleData.expeditionCharacterList.length;i<l;i++){
		var character = battleData.expeditionCharacterList[i];
		character.job(Job.END);
	}
};
