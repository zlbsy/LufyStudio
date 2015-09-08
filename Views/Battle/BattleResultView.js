function BattleResultView(controller, result){
	var self = this;
	LExtends(self,LView,[controller]);
	self.backInit();
	if(result){
		if(controller.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			//self change city
			console.log("self change city");
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
	var belongLayer = new LSprite();
	LTweenLite.to(belongLayer,1,{x:LGlobal.width * 0.5,ease:Elastic.easeOut}) 
	.to(belongLayer,1,{delay:0.5,x:LGlobal.width * 1.5,ease:Quint.easeOut,onComplete:self.removeSelf}); 
};
BattleResultView.prototype.showFail=function(){
	var self = this;
	var title = getStrokeLabel("战斗失败",50,"#CCCCCC","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 20;
	self.addChild(title);
	/*self.model.enemyCaptive.push(3);
	self.model.selfCaptive.push(1);*/
	self.enemyCaptiveFail();
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
		
	}else if(calculateHitrateBehead(leaderId, charaModel)){//斩首
		
	}else if(calculateHitrateRelease(leaderId, charaModel)){//释放
		
	}else{//俘虏
		self.enemyCaptiveShow(charaModel);
	}
};
BattleResultView.prototype.enemyCaptiveShow=function(charaModel){
	var self = this;
	console.log("enemyCaptiveShow:"+charaModel);
	var layer = new LSprite();
	self.addChild(layer);
	var windowData = new LBitmapData(LMvc.datalist["win05"]);
	var windowPanel = getBitmap(new LPanel(windowData,340,230));
	layer.addChild(windowPanel);
	var msg = getStrokeLabel(String.format("{0}被敌军俘虏了!",charaModel.name()),20,"#CCCCCC","#000000",4);
	msg.x = (windowPanel.getWidth() - msg.getWidth())*0.5;
	msg.y = 20;
	layer.addChild(msg);
	var face = charaModel.minFace();
	face.x = (windowPanel.getWidth() - 100) * 0.5;
	face.y = 50;
	layer.addChild(face);
	layer.x = (LGlobal.width - windowPanel.getWidth()) * 0.5;
	layer.y = (LGlobal.height - windowPanel.getHeight()) * 0.5;
	layer.y = LGlobal.height;
	var btnOk = getButton("OK",100);
	btnOk.x = (windowPanel.getWidth() - btnOk.getWidth())*0.5;
	btnOk.y = 160;
	layer.addChild(btnOk);
	LTweenLite.to(layer,0.4,{y:(LGlobal.height - windowPanel.getHeight()) * 0.5}) 
};
BattleResultView.prototype.selfCaptiveFail=function(){
	var self = this;
	if(self.model.selfCaptive.length == 0){
		self.cityFail();
		return;
	}
};
BattleResultView.prototype.cityFail=function(){
	var self = this;
	if(self.model.enemyCaptive.length == 0){
		self.selfCaptiveFail();
		return;
	}
};