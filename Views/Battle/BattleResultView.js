function BattleResultView(controller, result){
	var self = this;
	LExtends(self,LView,[controller]);
	self.backInit();
	if(result){
		self.showWin();
	}else{
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
	
};