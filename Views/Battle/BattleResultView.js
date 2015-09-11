function BattleResultView(controller, result){
	var self = this;
	LExtends(self,LView,[controller]);
	self.name = "BattleResult";
	self.backInit();
	self.result = result;
	if(result){
		if(controller.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			//self change city
			console.log("self change city");
			var city = controller.battleData.toCity;
			var generals = city.generals();
			var neighbors = city.neighbor();
			var neighbor = neighbors[neighbors.length*Math.random() >>> 0];
			self.neighbor = neighbor;
			for(var i=0,l=generals.length;i<l;i++){
				var chara = generals[i];
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
			generals = controller.battleData.expeditionCharacterList;
			for(var i=0,l=generals.length;i<l;i++){
				var chara = generals[i];
				chara.moveTo(city.id());
				chara.moveTo();
			}
		}else{
			//nothing
			console.log("nothing");
		}
		self.showWin();
	}else{
		if(controller.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			//nothing
			console.log("nothing");
		}else{
			//enemy change city
			console.log("enemy change city");
			controller.battleData.toCity.seigniorCharaId(controller.battleData.fromCity.seigniorCharaId());
		}
		self.showFail();
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
BattleResultView.prototype.showWin=function(){
	var self = this;
	console.log("showWin");
	var title = getStrokeLabel("战斗胜利",50,"#CCCCCC","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 20;
	self.addChild(title);
	self.selfCaptiveWin();
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
	self.enemyCaptiveFail();
};
BattleResultView.prototype.surrender=function(seigniorId, charaModel){

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
	var leaderId = self.enemyLeader;
	if(calculateHitrateSurrender(seigniorId, charaModel)){//投降
		self.surrender(seigniorId, charaModel);
	}else if(calculateHitrateBehead(leaderId, charaModel)){//斩首
		
	}else if(calculateHitrateRelease(leaderId, charaModel)){//释放
		
	}else{//俘虏
		self.confirmShow(charaModel,String.format("{0}被敌军俘虏了!",charaModel.name()));
	}
};
BattleResultView.prototype.confirmShow=function(charaModel,message,count){
	var self = this;
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
	}else{
		var btnOk = getButton("OK",100);
		btnOk.x = (windowPanel.getWidth() - btnOk.getWidth())*0.5;
		btnOk.y = 160;
		layer.addChild(btnOk);
		btnOk.addEventListener(LMouseEvent.MOUSE_UP, self.confirmHidden);
	}
	
	LTweenLite.to(layer,0.3,{y:(LGlobal.height - windowPanel.getHeight()) * 0.5}) 
};
BattleResultView.prototype.captiveCheck=function(event){
	var btn = event.currentTarget;
	var layer = btn.parent;
	layer.name = btn.name;
	LTweenLite.to(layer,0.3,{y:LGlobal.height,onComplete:function(e){
		var layer = e.target;
		var self = layer.parent;
		var name = layer.name;
		layer.remove();
		self.captiveCheckRun(name);
	}}) 
};
BattleResultView.prototype.captiveCheckRun=function(name){
	var self = this;
	var charaId = self.model.selfCaptive[0];
	var charaModel = CharacterModel.getChara(charaId);
	if(name == "Surrender"){//投降
		if(calculateHitrateSurrender(LMvc.selectSeignorId, charaModel)){
			
		}else{
			var script = "SGJTalk.show(" + charaModel.id() + ",0,少废话!忠臣不事二主!);";
			script += "SGJBattleResult.selfCaptiveWin(1);";
			LGlobal.script.addScript(script);
		}
	}else if(name == "Captive"){//俘虏
		self.model.selfCaptive.splice(0, 1);
		self.selfCaptiveWin();
	}else if(name == "Release"){//释放
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
			self.showWin();
		}else{
			self.showFail();
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
};
BattleResultView.prototype.cityWin=function(){
	var self = this;
	console.log("OVER win");
};