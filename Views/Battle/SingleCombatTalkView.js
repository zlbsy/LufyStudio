function SingleCombatTalkView(controller, text, isLeft) {
	var self = this;
	LExtends(self, LView, [controller]);
	self.set(text, isLeft);
	self.run();
}
SingleCombatTalkView.prototype.set = function(text, isLeft){
	var self = this;
	var label = getStrokeLabel(text,12,"#FFFFFF","#000000",2); 
	var win = new LPanel(new LBitmapData(LMvc.datalist["single_talk_background"]),label.getWidth() + 20,30);
	var arrow = new LBitmap(new LBitmapData(LMvc.datalist["single_talk_arrow"]));
	
	arrow.x = 50;
	arrow.y = 27;
	if(!isLeft){
		arrow.scaleX = -1;
		arrow.x = win.getWidth() - arrow.getWidth() - 25;
	}
	win.addChild(arrow);
	label.x = 10;
	label.y = 7;
	win.addChild(label);
	self.addChild(getBitmap(win));
};
SingleCombatTalkView.prototype.run = function(){
	var self = this;
	LTweenLite.to(self,0.3,{alpha:0,delay:1,onComplete:self.runComplete});
};
SingleCombatTalkView.prototype.runComplete = function(event){
	var self = event.target;
	self.remove();
};