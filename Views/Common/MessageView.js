function MessageView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.init();
}
MessageView.prototype.add = function(msg){
	var self = this;console.log(msg);
	var child = new LTextField();
	child.text = msg;
	child.size = 18;
	child.color = "#000000";
	child.y = self.listLayer.numChildren * 20;
	self.listLayer.addChild(child);
	self.listLayer.clearShape();
	self.listLayer.addShape(LShape.RECT,[0,0,270,self.listLayer.numChildren * 20]);
	if(self.listLayer.numChildren > 20)self.listLayer.parent.parent.scrollToBottom();
};
MessageView.prototype.init = function(){
	var self = this
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = getBitmap(new LPanel(backgroundData,300,300));
	self.addChild(panel);
	self.listLayer = new LSprite();
	var sc = new LScrollbar(self.listLayer, 270, 270, 10, false);
	sc.x = 15;
	sc.y = 15;
	self.addChild(sc);
	sc.excluding = true;
	self.listLayer.getHeight = function(){
		return this.numChildren * 20;
	};
};