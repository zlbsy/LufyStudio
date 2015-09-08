function BattleResultView(controller, result){
	var self = this;
	LExtends(self,LView,[controller]);
	self.backInit();
	if(result){
		if(controller.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			//self change city
		}else{
			//nothing
		}
		self.showWin();
	}else{
		if(controller.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			//nothing
		}else{
			//enemy change city
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
	if(self.model.enemyCaptive.length == 0){
		self.selfCaptiveFail();
		return;
	}
	var chara = self.model.enemyCaptive[0];
	self.model.enemyCaptive.splice(0, 1);
	if(calculateHitrateSurrender(seigniorId, chara)){//投降
		
	}else if(calculateHitrateBehead(leaderId, chara)){//斩首
		
	}else if(calculateHitrateRelease(leaderId, chara)){//释放
		
	}else{//俘虏
		
	}
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