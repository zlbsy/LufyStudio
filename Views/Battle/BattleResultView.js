function BattleResultView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.set();
};
BattleResultView.prototype.set=function(){
	var self = this;
	var belongLayer = new LSprite();
	belongLayer.x = -LGlobal.width * 0.5;
	belongLayer.y = LGlobal.height * 0.5;
	var belongLabel = getLabelWindow(Language.get(String.format("{0}_action",belong)), 50, 340, 100);
	belongLabel.x = -belongLabel.getWidth() * 0.5;
	belongLabel.y = -belongLabel.getHeight() * 0.5;
	belongLayer.addChild(belongLabel);
	self.addChild(belongLayer);
	self.belong = belong;
	if(belong == Belong.SELF){
		belongLayer.y = LGlobal.height * 0.5 - 40;
		self.setBout();
	}
	LTweenLite.to(belongLayer,1,{x:LGlobal.width * 0.5,ease:Elastic.easeOut}) 
	.to(belongLayer,1,{delay:0.5,x:LGlobal.width * 1.5,ease:Quint.easeOut,onComplete:self.removeSelf}); 
};
BattleResultView.prototype.setBout=function(){
	var self = this;
	var boutLayer = new LSprite();
	boutLayer.x = LGlobal.width * 1.5;
	boutLayer.y = LGlobal.height * 0.5 + 40;
	var bout = self.controller.getValue("bout");
	bout++;
	self.controller.setValue("bout",bout);
	var boutLabel = getLabelWindow(String.format("第{0}回合",bout), 30, 200, 60);
	boutLabel.x = -boutLabel.getWidth() * 0.5;
	boutLabel.y = -boutLabel.getHeight() * 0.5;
	boutLayer.addChild(boutLabel);
	self.addChild(boutLayer);
	LTweenLite.to(boutLayer,1,{x:LGlobal.width * 0.5,ease:Elastic.easeOut}) 
	.to(boutLayer,1,{delay:0.5,x:-LGlobal.width * 0.5,ease:Quint.easeOut});  
};
BattleResultView.prototype.removeSelf=function(event){
	var self = event.target.parent;
	var view = self.parent;
	var belong = self.belong;
	view.charaLayer.boutSkillRun(belong, function(){
		self.remove();
		BattleIntelligentAI.execute();
	});
};
