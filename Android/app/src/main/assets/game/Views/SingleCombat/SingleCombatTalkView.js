function SingleCombatTalkView(controller, text, isLeft) {
	var self = this;
	LExtends(self, LView, [controller]);
	self.set(text, isLeft);
	self.run();
}
SingleCombatTalkView.prototype.set = function(text, isLeft){
	var self = this;
	var label = getStrokeLabel(text,16,"#FFFFFF","#000000",2);
	var win = new LPanel(new LBitmapData(LMvc.datalist["single_talk_background"]),label.getWidth() + 20,label.getHeight() + 10);
	var arrow = new LBitmap(new LBitmapData(LMvc.datalist["single_talk_arrow"]));
	
	arrow.x = label.getWidth() + 20 - arrow.getWidth() - 48;
	arrow.y = label.getHeight() + 7;
	if(!isLeft){
		arrow.scaleX = -1;
		arrow.x = 48;
	}
	win.addChild(arrow);
	label.x = 10;
	label.y = 5;
	win.addChild(label);
	win.cacheAsBitmap(true);
	var bitmap = win;
	bitmap.x = 98-(label.getWidth() + 20);
	if(!isLeft){
		bitmap.x = 0;
	}
	self.addChild(bitmap);
};
SingleCombatTalkView.prototype.run = function(){
	var self = this;
	LTweenLite.to(self,0.3,{alpha:0,delay:1,onComplete:self.runComplete});
};
SingleCombatTalkView.prototype.runComplete = function(event){
	var self = event.target;
	self.remove();
};