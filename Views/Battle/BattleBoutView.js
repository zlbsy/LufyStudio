function BattleBoutView(controller, belong){
	var self = this;
	LExtends(self,LView,[controller]);
	self.set(belong);
};
BattleBoutView.prototype.set=function(belong){
	var self = this;
	var belongLayer = new LSprite();
	belongLayer.x = -LGlobal.width * 0.5;
	belongLayer.y = LGlobal.height * 0.5;
	var belongLabel = getLabelWindow(Language.get(String.format("{0}_action",belong)), 50, 340, 100);
	belongLabel.x = -belongLabel.getWidth() * 0.5;
	belongLabel.y = -belongLabel.getHeight() * 0.5;
	belongLayer.addChild(belongLabel);
	self.addChild(belongLayer);
	if(belong == Belong.SELF){
		belongLayer.y = LGlobal.height * 0.5 - 40;
		self.setBout();
	}
	LTweenLite.to(belongLayer,1,{x:LGlobal.width * 0.5,ease:Elastic.easeOut}) 
	.to(belongLayer,1,{delay:0.5,x:LGlobal.width * 1.5,ease:Quint.easeOut,onComplete:function(){
    	self.remove();
    }});  
    return;
	belongLayer.scaleX = 0.1;
	belongLayer.scaleY = 0.1;
	LTweenLite.to(belongLayer,1,{scaleX:1,scaleY:1,ease:Elastic.easeOut,onComplete:function(){
    	self.remove();
    }});  
    return;
	belongLayer.alpha = 0;
	belongLayer.scaleX = 2;
	belongLayer.scaleY = 2;
	LTweenLite.to(belongLayer,0.5,{alpha:1,scaleX:1.6,scaleY:1.6})  
    .to(belongLayer,1,{scaleX:1,scaleY:1,ease:Elastic.easeOut,onComplete:function(){
    	self.remove();
    }});  
};
BattleBoutView.prototype.setBout=function(){
	var self = this;
	var boutLayer = new LSprite();
	boutLayer.x = LGlobal.width * 1.5;
	boutLayer.y = LGlobal.height * 0.5 + 40;
	var boutLabel = getLabelWindow("第1回合", 30, 200, 60);
	boutLabel.x = -boutLabel.getWidth() * 0.5;
	boutLabel.y = -boutLabel.getHeight() * 0.5;
	boutLayer.addChild(boutLabel);
	self.addChild(boutLayer);
	LTweenLite.to(boutLayer,1,{x:LGlobal.width * 0.5,ease:Elastic.easeOut}) 
	.to(boutLayer,1,{delay:0.5,x:-LGlobal.width * 0.5,ease:Quint.easeOut});  
};
