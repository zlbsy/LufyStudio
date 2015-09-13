function BattleResultView(controller, result){
	var self = this;
	LExtends(self,LView,[controller]);
	self.name = "BattleResult";
	self.backInit();
	self.result = result;
	//TODO:test code
	//var from = self.controller.battleData.fromCity;
	//self.controller.battleData.fromCity = self.controller.battleData.toCity;
	//self.controller.battleData.toCity = from;
	self.model.enemyList[0].isLeader = true;
	//TODO:test code end
	
	self.enemyLeader = self.model.enemyList.find(function(child){
		return child.isLeader;
	});
	if(result){
		self.winSeigniorId = LMvc.selectSeignorId;
		if(controller.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			self.failSeigniorId = controller.battleData.toCity.seigniorCharaId();
			//self change city
			console.log("self change city");
			var city = controller.battleData.toCity;
			var neighbors = city.neighbor();
			self.retreatCityId = neighbors[neighbors.length*Math.random() >>> 0];
			self.cityChange(self.model.selfCaptive, self.controller.battleData.expeditionCharacterList);
			/*var generals = city.generals();
			var neighbors = city.neighbor();
			var neighbor = neighbors[neighbors.length*Math.random() >>> 0];
			self.retreatCityId = neighbor;
			var moveCharas = generals.slice();
			for(var i=0,l=moveCharas.length;i<l;i++){
				var chara = moveCharas[i];
				if(self.model.selfCaptive.find(function(child){
					return child == chara.id();
				})){
					continue;
				}
				chara.moveTo(neighbor);
				chara.moveTo();
			}
			generals.splice(0, generals.length);
			self.targetSeigniorCharaId = city.seigniorCharaId();
			city.seigniorCharaId(LMvc.selectSeignorId);
			generals = controller.battleData.expeditionCharacterList.slice();
			for(var i=0,l=generals.length;i<l;i++){
				var chara = generals[i];
				chara.moveTo(city.id());
				chara.moveTo();
			}*/
		}else{
			self.failSeigniorId = controller.battleData.fromCity.seigniorCharaId();
			//nothing
			console.log("nothing");
		}
		self.showWin();
		self.selfCaptiveWin();
	}else{
		self.showFail();
		self.failSeigniorId = LMvc.selectSeignorId;
		if(controller.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			self.winSeigniorId = controller.battleData.toCity.seigniorCharaId();
			//nothing
			console.log("nothing");
			self.enemyCaptiveFail();
		}else{
			//enemy change city
			console.log("enemy change city");
			self.winSeigniorId = controller.battleData.fromCity.seigniorCharaId();
			self.selectMoveCity();
		}
	}
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
BattleResultView.prototype.selectMoveCity=function(){
	var self = this;
	var city = self.controller.battleData.toCity;
	var fromSeigniorCharaId = self.controller.battleData.fromCity.seigniorCharaId();
	var fromSeignior = CharacterModel.getChara(fromSeigniorCharaId);
	self.confirmShow("MoveCity",String.format(city.generals().length > self.model.enemyCaptive.length ? "{0}被{1}军占领了，撤往哪里？" : "{0}被{1}军占领了!",city.name(),fromSeignior.name()));
};
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
		chara.moveTo(self.retreatCityId);
		chara.moveTo();
	}
	generals.splice(0, generals.length);
	city.seigniorCharaId(self.winSeigniorId);
	generals = expeditionList.slice();
	for(var i=0,l=generals.length;i<l;i++){
		var chara = generals[i];
		chara.moveTo(city.id());
		chara.moveTo();
	}
};
BattleResultView.prototype.selectMoveCityRun=function(event){
	var btnMove = event.currentTarget;
	btnMove.parent.cityId = btnMove.cityId;
	LTweenLite.to(btnMove.parent,0.3,{y:LGlobal.height,onComplete:function(e){
		var layer = e.target;
		var self = layer.parent;
		self.retreatCityId = layer.cityId;
		self.cityChange(self.model.enemyCaptive, self.controller.battleData.expeditionEnemyCharacterList);
		/*var city = self.controller.battleData.toCity;
		var generals = city.generals();
		var moveCharas = generals.slice();
		for(var i=0,l=moveCharas.length;i<l;i++){
			var chara = moveCharas[i];
			if(self.model.enemyCaptive.find(function(child){
				return child == chara.id();
			})){
				continue;
			}
			chara.moveTo(self.retreatCityId);
			chara.moveTo();
		}
		generals.splice(0, generals.length);
		city.seigniorCharaId(self.winSeigniorId);
		generals = self.controller.battleData.expeditionEnemyCharacterList.slice();
		for(var i=0,l=generals.length;i<l;i++){
			var chara = generals[i];
			chara.moveTo(city.id());
			chara.moveTo();
		}*/
		layer.remove();
		self.enemyCaptiveFail();
	}});
};
BattleResultView.prototype.showWin=function(){
	var self = this;
	console.log("showWin");
	var title = getStrokeLabel("战斗胜利",50,"#CCCCCC","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 20;
	self.addChild(title);
};
BattleResultView.prototype.selfCaptiveWin=function(count){
	var self = this;
	if(!count){
		count = 0;
	}
	if(self.model.selfCaptive.length == 0){
		self.enemyCaptiveWin();
		return;
	}
	var charaId = self.model.selfCaptive[0];
	var charaModel = CharacterModel.getChara(charaId);
	//self.model.selfCaptive.splice(0, 1);
	self.confirmShow(charaModel,String.format("俘虏了敌将{0}!",charaModel.name()),count);
};
BattleResultView.prototype.enemyCaptiveWin=function(){
	var self = this;
	if(self.model.enemyCaptive.length == 0){
		self.cityWin();
		return;
	}
	self.model.enemyCaptive.length = 0;
	self.confirmShow(null,"被敌军俘虏的将领也被救回来了!");
};
BattleResultView.prototype.showFail=function(){
	var self = this;
	var title = getStrokeLabel("战斗失败",50,"#CCCCCC","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 20;
	self.addChild(title);
};
BattleResultView.prototype.surrender=function(seigniorId, charaModel){
	var self = this;
	var city = self.controller.battleData.toCity;
	charaModel.moveTo(city.id());
	charaModel.moveTo();
	charaModel.seignior(seigniorId);
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
BattleResultView.prototype.enemyCaptiveFail=function(){
	var self = this;
	console.log("enemyCaptiveFail:"+self.model.enemyCaptive.length);
	if(self.model.enemyCaptive.length == 0){
		self.selfCaptiveFail();
		return;
	}
	var charaId = self.model.enemyCaptive[0];
	var charaModel = CharacterModel.getChara(charaId);
	self.model.enemyCaptive.splice(0, 1);
	var seigniorId = self.controller.battleData.toCity.seigniorCharaId();
	var leaderId = self.enemyLeader.data.id();
	if(calculateHitrateSurrender(seigniorId, charaModel)){//投降
		self.surrender(seigniorId, charaModel);
		self.confirmShow(charaModel,String.format("{0}投降了敌军!",charaModel.name()));
	}else if(calculateHitrateBehead(leaderId, charaModel)){//斩首
		self.confirmShow(charaModel,String.format("{0}被敌军斩首了!",charaModel.name()));
	}else if(calculateHitrateRelease(leaderId, charaModel)){//释放
		if(self.controller.battleData.toCity.seigniorCharaId() == LMvc.selectSeignorId){
			charaModel.moveTo(self.retreatCityId);
			charaModel.moveTo();
		}
		self.confirmShow(charaModel,String.format("{0}被敌军释放了!",charaModel.name()));
	}else{//俘虏
		self.controller.battleData.toCity.addCaptives(charaModel);
		self.confirmShow(charaModel,String.format("{0}被敌军俘虏了!",charaModel.name()));
	}
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
		var neighbors = self.controller.battleData.toCity.neighbor();
		for(var i=0,l=neighbors.length;i<l;i++){
			var neighbor = AreaModel.getArea(neighbors[i]);
			if(neighbor.seigniorCharaId() != LMvc.selectSeignorId){
				continue;
			}
			var btnMoveTo = getButton(neighbor.name(),100);
			btnMoveTo.x = windowPanel.getWidth()*0.5 - 120 + (i % 2)*140;
			btnMoveTo.y = 60 + (i/2 >> 0)*50;
			btnMoveTo.cityId = neighbor.id();
			layer.addChild(btnMoveTo);
			btnMoveTo.addEventListener(LMouseEvent.MOUSE_UP, self.selectMoveCityRun);
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
BattleResultView.prototype.selfCaptiveFail=function(){
	var self = this;
	if(self.model.selfCaptive.length == 0){
		self.cityFail();
		return;
	}
	self.model.selfCaptive.length = 0;
	self.confirmShow(null,"我军俘虏的敌将也被救回去了!");
};
BattleResultView.prototype.cityFail=function(){
	var self = this;
	console.log("OVER fail");
	var cityId = self.controller.battleData.toCity.id();
	self.controller.view.remove();
	LMvc.MapController.view.visible = true;
	LMvc.MapController.view.changeMode(MapController.MODE_MAP);
	LMvc.MapController.view.resetAreaIcon(cityId);
};
BattleResultView.prototype.cityWin=function(){
	var self = this;
	console.log("OVER win");
	var cityId = self.controller.battleData.toCity.id();
	self.controller.view.remove();
	LMvc.MapController.view.visible = true;
	LMvc.MapController.view.changeMode(MapController.MODE_MAP);
	LMvc.MapController.view.resetAreaIcon(cityId);
};