function MessageChildView(msg, color){
	var self = this;
	base(self,LListChildView,[]);
	self.set(msg, color);
}
MessageChildView.prototype.set = function(msg, color){
	var self = this;
	var child = getStrokeLabel(msg, 12, color, "#000000", 2);
	child.x = 10;
	child.y = 2;
	self.addChild(child);
	self.graphics.rect(0, 0, LGlobal.width - 20, 20);
};