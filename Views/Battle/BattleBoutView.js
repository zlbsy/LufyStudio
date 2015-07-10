function BattleBoutView(controller, belong){
	var self = this;
	LExtends(self,LView,[controller]);
	self.set(belong);
};
BattleBoutView.prototype.set=function(belong){
	var self = this;
	var belongLayer = new LSprite();
	belongLayer.x = LGlobal.width * 0.5;
	belongLayer.y = LGlobal.height * 0.5;
	var boutLabel = getLabelWindow(Language.get(String.format("{0}_action",belong)), 50, 340, 100);
	boutLabel.x = -boutLabel.getWidth() * 0.5;
	boutLabel.y = -boutLabel.getHeight() * 0.5;
	belongLayer.addChild(boutLabel);
	self.addChild(belongLayer);
	belongLayer.alpha = 0;
	belongLayer.scaleX = 2;
	belongLayer.scaleY = 2;
	LTweenLite.to(belongLayer,0.5,{alpha:1,scaleX:1.6,scaleY:1.6})  
    .to(belongLayer,1,{scaleX:1,scaleY:1,ease:Elastic.easeOut,onComplete:function(){
    }});  
};
BattleBoutView.prototype.animeComplete=function(event){
	var anime = event.currentTarget;
	var self = anime.parent;
	anime.stop();
	self.dispatchEvent(LEvent.COMPLETE);
	self.remove();
};
