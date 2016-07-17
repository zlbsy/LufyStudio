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
MessageChildView._list = [];
MessageChildView.createChild = function(msg, color){
	if(MessageChildView._list.length > 0){
		var child = MessageChildView._list.shift();
		var label = child.getChildAt(0);
		label.text = msg;
		label.color = color;
		return child;
	}
	return new MessageChildView(msg, color);
};
MessageChildView.prototype.die = function() {
	var self = this;
	var has = false;
	for(var i=0, l=MessageChildView._list.length;i<l;i++){
		var child = MessageChildView._list[i];
		if(child.objectIndex == self.objectIndex){
			has = true;
			break;
		}
	}
	if(!has){
		self.cacheAsBitmap(false);
		MessageChildView._list.push(self);
	}
}; 