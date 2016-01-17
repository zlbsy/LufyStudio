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
	self.result = result=0;
	controller.addEnemyCharacter(243,"up",3,3);
	self.model.enemyList[0].isLeader = true;
	self.model.enemyCaptive.push(4);
	
	var battleData = controller.battleData;
	self.setEvent();
	if(result){
		self.winSeigniorId = LMvc.selectSeignorId;
		if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			self.failSeigniorId = battleData.toCity.seigniorCharaId();
			//self change city
			console.log("self change city");
			var city = battleData.toCity;
			if(city.seigniorCharaId() > 0 && city.generalsSum() > self.model.selfCaptive.length){
				var neighbors = city.neighbor();
				var enemyCitys = [];
				var canMoveCitys = [];
				for(var i = 0;i < neighbors.length;i++){
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
					self.expeditionMove(city, self.retreatCity);
				}
			}
			console.log("cityChange start");
			self.cityChange(self.model.selfCaptive, battleData.expeditionCharacterList);
			console.log("cityChange over");
			//敌方太守
			if(self.retreatCity){
				var enemyCharas = getDefenseEnemiesFromCity(self.retreatCity);
				self.retreatCity.prefecture(enemyCharas[0].id());
			}
			console.log("敌方太守 over");
			//己方太守
			if(self.controller.noBattle){
				city.prefecture(battleData.expeditionLeader.id());
			}else{
				var selfCharas = self.controller.view.charaLayer.getCharactersFromBelong(Belong.SELF);
				var chara = selfCharas.find(function(child){
					return child.isLeader;
				});
				console.log("chara="+chara);
				city.prefecture(chara.data.id());
			}
			console.log("己方太守 over");
		}else{
			self.failSeigniorId = controller.battleData.fromCity.seigniorCharaId();
			//nothing
			console.log("nothing");
		}
		self.showWin();
		//self.addEventListener(BattleResultEvent.CLOSE_EXP, self.selfCaptiveWin);
		self.showExpDialog();
		//self.selfCaptiveWin();
	}else{
		self.enemyLeader = self.model.enemyList.find(function(child){
			return child.isLeader;
		});
		self.showFail();
		self.failSeigniorId = LMvc.selectSeignorId;
		if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			self.winSeigniorId = battleData.toCity.seigniorCharaId();
			//nothing
			console.log("nothing");
			//self.enemyCaptiveFail();
			self.addEventListener(BattleResultEvent.CLOSE_EXP, self.enemyCaptiveFail);
		}else{
			//enemy change city
			console.log("enemy change city");
			self.winSeigniorId = battleData.fromCity.seigniorCharaId();
			//self.selectMoveCity();
			self.addEventListener(BattleResultEvent.CLOSE_EXP, self.selectMoveCity);
		}
		self.showExpDialog();
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
	if(!event){console.error(event);return;}
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
BattleResultView.prototype.showWin=function(){
	var self = this;
	var title = getStrokeLabel(Language.get("battle_win"),50,"#CCCCCC","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 20;
	self.addChild(title);
};
BattleResultView.prototype.showFail=function(){
	var self = this;
	var title = getStrokeLabel(Language.get("battle_fail"),50,"#CCCCCC","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 20;
	self.addChild(title);
};
BattleResultView.prototype.showMap=function(event){
	var self = event.currentTarget;
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

/*
//TODO::Delete
BattleResultView.prototype.expeditionMove=function(city, retreatCity){
	//资源损失0.2
	retreatCity.food(city.food()*0.4 >>> 0);
	city.food(-city.food()*0.6 >>> 0);
	retreatCity.money(city.money()*0.4 >>> 0);
	city.money(-city.money()*0.6 >>> 0);
	retreatCity.troops(retreatCity.troops() + (city.troops()*0.4 >>> 0));
	city.troops(city.troops()*0.4 >>> 0);
};
//TODO::Delete
BattleResultView.prototype.cityChange=function(captiveList, expeditionList){
	var self = this;
	var city = self.controller.battleData.toCity;
	var generals = city.generals();
	var moveCharas = generals.slice();
	
	for(var i=0,l=moveCharas.length;i<l;i++){
		var chara = moveCharas[i];
		if(captiveList.find(function(child){
			return child == chara.id();
		})){
			continue;
		}
		if(self.retreatCityId){
			chara.moveTo(self.retreatCityId);
			chara.moveTo();
		}else{
			city.outOfOffice().push(chara);
		}
	}
	generals.splice(0, generals.length);
	if(self.failSeigniorId){
		var seigniorFail = SeigniorModel.getSeignior(self.failSeigniorId);
		seigniorFail.removeCity(city.id());
	}
	var seigniorWin = SeigniorModel.getSeignior(self.winSeigniorId);
	seigniorWin.addCity(city);
	city.seigniorCharaId(self.winSeigniorId);
	generals = expeditionList.slice();
	for(var i=0,l=generals.length;i<l;i++){
		var chara = generals[i];
		city.troops(city.troops() + chara.troops());
		chara.troops(0);
		chara.moveTo(city.id());
		chara.moveTo();
	}
};
//TODO::Delete
BattleResultView.prototype.selectMoveCityRun=function(event){
	var btnMove = event.currentTarget;
	btnMove.parent.cityId = btnMove.cityId;
	LTweenLite.to(btnMove.parent,0.3,{y:LGlobal.height,onComplete:function(e){
		var layer = e.target;
		var self = layer.parent;
		var city = self.controller.battleData.toCity;
		self.retreatCityId = layer.cityId;
		self.retreatCity = AreaModel.getArea(self.retreatCityId);
		if(!self.retreatCity.seigniorCharaId()){
			var seignior = SeigniorModel.getSeignior(self.failSeigniorId);
			seignior.addCity(self.retreatCityId);
			self.retreatCity.seigniorCharaId(self.failSeigniorId);
		}
		self.expeditionMove(city, self.retreatCity);
		self.cityChange(self.model.enemyCaptive,  self.controller.battleData.expeditionEnemyCharacterList);
		layer.remove();
		self.enemyCaptiveFail();
	}});
};
BattleResultView.prototype.surrender=function(seigniorId, charaModel){
	var self = this;
	var city = self.controller.battleData.toCity;
	charaModel.moveTo(city.id());
	charaModel.moveTo();
	charaModel.seigniorId(seigniorId);
};
BattleResultView.prototype.behead=function(charaModel){
	var self = this,city;
	if(self.result){
		if(self.controller.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			return;
		}else{
			city = self.controller.battleData.fromCity;
		}
	}else{
		if(self.controller.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			city = self.controller.battleData.toCity;
		}else{
			city = self.controller.battleData.fromCity;
		}
	}
	var city = self.controller.battleData.toCity;
	charaModel.moveTo(city.id());
	charaModel.moveTo();
	charaModel.seignior(seigniorId);
};
BattleResultView.prototype.confirmShow=function(param,message,count){
	var self = this;
	var charaModel,type;
	if(param && param.constructor.name == "CharacterModel"){
		charaModel = param;
	}else{
		type = param;
	}
	var layer = new LSprite();
	self.addChild(layer);
	var windowData = new LBitmapData(LMvc.datalist["win05"]);
	var windowPanel = getBitmap(new LPanel(windowData,340,230));
	layer.addChild(windowPanel);
	if(charaModel){
		var face = charaModel.minFace();
		face.x = (windowPanel.getWidth() - 100) * 0.5;
		face.y = 50;
		layer.addChild(face);
	}
	var msg = getStrokeLabel(message,20,"#CCCCCC","#000000",4);
	msg.x = (windowPanel.getWidth() - msg.getWidth())*0.5;
	msg.y = 20;
	layer.addChild(msg);
	
	layer.x = (LGlobal.width - windowPanel.getWidth()) * 0.5;
	layer.y = (LGlobal.height - windowPanel.getHeight()) * 0.5;
	layer.y = LGlobal.height;
	if(charaModel && self.result){
		var btnCaptive = getButton(count == 0 ? "招降" : "俘虏",100);
		btnCaptive.x = (windowPanel.getWidth() - 100)*0.5 - 110;
		btnCaptive.y = 160;
		btnCaptive.name = (count == 0 ? "Surrender" : "Captive");
		layer.addChild(btnCaptive);
		btnCaptive.addEventListener(LMouseEvent.MOUSE_UP, self.captiveCheck);
		var btnRelease = getButton("释放",100);
		btnRelease.x = (windowPanel.getWidth() - 100)*0.5;
		btnRelease.y = 160;
		btnRelease.name = "Release";
		layer.addChild(btnRelease);
		btnRelease.addEventListener(LMouseEvent.MOUSE_UP, self.captiveCheck);
		var btnBehead = getButton("斩首",100);
		btnBehead.x = (windowPanel.getWidth() - 100)*0.5 + 110;
		btnBehead.y = 160;
		btnBehead.name = "Behead";
		layer.addChild(btnBehead);
		btnBehead.addEventListener(LMouseEvent.MOUSE_UP, self.captiveCheck);
	}else if(type == "MoveCity" && self.controller.battleData.toCity.generals().length > self.model.enemyCaptive.length){
		var selectCitys = 0;
		var neighbors = self.controller.battleData.toCity.neighbor();
		for(var i=0,l=neighbors.length;i<l;i++){
			var neighbor = AreaModel.getArea(neighbors[i]);
			if(neighbor.seigniorCharaId() > 0 && neighbor.seigniorCharaId() != LMvc.selectSeignorId){
				continue;
			}
			var btnMoveTo = getButton(neighbor.name(),100);
			btnMoveTo.x = windowPanel.getWidth()*0.5 - 120 + (i % 2)*140;
			btnMoveTo.y = 60 + (i/2 >> 0)*50;
			btnMoveTo.cityId = neighbor.id();
			layer.addChild(btnMoveTo);
			selectCitys++;
			btnMoveTo.addEventListener(LMouseEvent.MOUSE_UP, self.selectMoveCityRun);
		}
		if(selectCitys == 0){
			self.cityChange(self.model.enemyCaptive,  self.controller.battleData.expeditionEnemyCharacterList);
			self.enemyCaptiveFail();
			return;
		}
	}else{
		var btnOk = getButton("OK",100);
		btnOk.x = (windowPanel.getWidth() - btnOk.getWidth())*0.5;
		btnOk.y = 160;
		layer.addChild(btnOk);
		btnOk.addEventListener(LMouseEvent.MOUSE_UP, self.confirmHidden);
	}
	
	LTweenLite.to(layer,0.3,{y:(LGlobal.height - windowPanel.getHeight()) * 0.5});
};
BattleResultView.prototype.captiveCheck=function(event){
	console.log("captiveCheck");
	var btn = event.currentTarget;
	var layer = btn.parent;
	layer.name = btn.name;
	LTweenLite.to(layer,0.3,{y:LGlobal.height,onComplete:function(e){
		var layer = e.target;
		var self = layer.parent;
		var name = layer.name;
		layer.remove();
		self.captiveCheckRun(name);
	}});
};
BattleResultView.prototype.captiveCheckRun=function(name){
	var self = this;
	console.log("captiveCheckRun="+name);
	var charaId = self.model.selfCaptive[0];
	var charaModel = CharacterModel.getChara(charaId);
	var script;
	if(name == "Surrender"){//投降
		if(calculateHitrateSurrender(LMvc.selectSeignorId, charaModel)){
			self.surrender(LMvc.selectSeignorId, charaModel);
			script = "SGJTalk.show(" + charaModel.id() + ",0,愿效犬马之力!);";
			script += "SGJBattleResult.selfCaptiveWin();";
			self.model.selfCaptive.splice(0, 1);
		}else{
			script = "SGJTalk.show(" + charaModel.id() + ",0,少废话!忠臣不事二主!);";
			script += "SGJBattleResult.selfCaptiveWin(1);";
		}
		LGlobal.script.addScript(script);
	}else if(name == "Captive"){//俘虏
		self.controller.battleData.toCity.addCaptives(charaModel);
		self.model.selfCaptive.splice(0, 1);
		self.selfCaptiveWin();
	}else if(name == "Release"){//释放
		if(self.controller.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			console.log("释放self.retreatCityId="+self.retreatCityId);
			charaModel.moveTo(self.retreatCityId);
			charaModel.moveTo();
		}
		self.model.selfCaptive.splice(0, 1);
		self.selfCaptiveWin();
	}else if(name == "Behead"){//斩首
		self.model.selfCaptive.splice(0, 1);
		self.selfCaptiveWin();
	}
};
BattleResultView.prototype.confirmHidden=function(event){
	LTweenLite.to(event.currentTarget.parent,0.3,{y:LGlobal.height,onComplete:function(e){
		var layer = e.target;
		var self = layer.parent;
		layer.remove();
		if(self.result){
			self.selfCaptiveWin();
		}else{
			self.enemyCaptiveFail();
		}
	}});
};
*/