function CreateCharacterListChildView(data) {
	var self = this;
	base(self, LListChildView, []);
	self.set(data);
}

CreateCharacterListChildView.prototype.set = function(data) {
	var self = this;
	self.data = data;
	self.removeAllChild();
	self.setStatus();
};
CreateCharacterListChildView.prototype.onClick = function(event) {
	var self = event.target;
	
};
CreateCharacterListChildView.prototype.setStatus = function() {
	var self = this;
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, 420, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 420;
	bitmapLine.y = 38;
	layer.addChild(bitmapLine);
	var name = getStrokeLabel(self.name, 20, "#FFFFFF", "#000000", 4);
	name.x = 50;
	name.y = 5;
	layer.addChild(name);
	var bitmapName = getBitmap(layer);
	bitmapName.x = 20;
	bitmapName.y = 10;
	self.addChild(bitmapName);
	self.setAbilityProperties();
}; 
CreateCharacterListChildView.prototype.setAbilityProperties = function() {
	var self = this;
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LGlobal.width - 200, 50]);
	var name = getStrokeLabel(self.data.command, 18, "#FFFFFF", "#000000", 4);
	name.x = 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.data.force, 18, "#FFFFFF", "#000000", 4);
	name.x = 60 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.data.intelligence, 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 2 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.data.agility, 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 3 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.data.luck, 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 4 + 5;
	name.y = 5;
	layer.addChild(name);

	layer.x = 180;
	layer.y = 10;
	self.addChild(layer);
}; 