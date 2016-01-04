function MessageChildView(msg, color){
	var self = this;
	base(self,LListChildView,[]);
	self.set(msg, color);
}
MessageChildView.prototype.set = function(msg, color){
	var self = this;
	var child = new LTextField();
	child.text = msg;
	child.size = 14;
	child.color = color ? color : "#000000";
	self.addChild(child);
};