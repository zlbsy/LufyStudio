function CharacterListChildView(controller, charaModel, cityModel, parentView) {
	var self = this;
	base(self, LView, [controller]);
	self.charaModel = charaModel;
	self.cityModel = cityModel;
	self.parentView = parentView;
	self.set();
}

CharacterListChildView.prototype.set = function() {
	var self = this;
	self.setCheckBox();
	self.setStatus();
};
CharacterListChildView.prototype.setCheckBox = function() {
	var self = this;
	switch(self.controller.characterListType) {
		case CharacterListType.CHARACTER_LIST:
			break;
		case CharacterListType.CHARACTER_MOVE:
		case CharacterListType.AGRICULTURE:
			var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
			var bitmapSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
			var check = new LCheckBox(bitmap, bitmapSelect);
			check.x = 10;
			check.y = 10;
			self.addChild(check);
			self.checkbox = check;
			break;
	}
};
CharacterListChildView.prototype.hitTestPoint = function(offsetX,offsetY) {
	var self = this;
	var hit = self.callParent("hitTestPoint",arguments);
	if(self.checkbox){
		return hit && !self.checkbox.hitTestPoint(offsetX,offsetY);
	}
	return hit;
};
CharacterListChildView.prototype.cutover = function(value) {
	var self = this;
	self.basicProperties.visible = false;
	self.abilityProperties.visible = false;
	if (value == CharacterListView.CUTOVER_BASIC) {
		self.basicProperties.visible = true;
	} else if (value == CharacterListView.CUTOVER_ABILITY) {
		self.abilityProperties.visible = true;
	}

};
CharacterListChildView.prototype.setStatus = function() {
	var self = this;
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, 440, 50]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 440;
	bitmapLine.y = 40;
	layer.addChild(bitmapLine);
	var name = getStrokeLabel(self.charaModel.name(), 20, "#FFFFFF", "#000000", 4);
	name.x = 50;
	name.y = 5;
	layer.addChild(name);
	var bitmapName = getBitmap(layer);
	bitmapName.x = 20;
	bitmapName.y = 10;
	self.addChild(bitmapName);

	self.setBasicProperties();
	self.setAbilityProperties();
}; 
CharacterListChildView.prototype.setBasicProperties = function() {
	var self = this;
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LGlobal.width - 200, 50]);
	var seignior = self.charaModel.seignior();
	var name = getStrokeLabel( seignior ? seignior.name() : Language.get("nothing"), 18, "#FFFFFF", "#000000", 4);
	name.x = 2;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.charaModel.identity(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 + 2;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.cityModel.name(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 2 + 2;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel( seignior ? self.charaModel.loyalty() : "--", 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 3 + 2;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.charaModel.jobLabel(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 4;
	name.y = 5;
	layer.addChild(name);

	var basicPropertiesBitmap = getBitmap(layer);
	basicPropertiesBitmap.x = 180;
	basicPropertiesBitmap.y = 10;
	self.addChild(basicPropertiesBitmap);
	self.basicProperties = basicPropertiesBitmap;
}; 
CharacterListChildView.prototype.setAbilityProperties = function() {
	var self = this;
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LGlobal.width - 200, 50]);
	var name = getStrokeLabel(self.charaModel.command(), 18, "#FFFFFF", "#000000", 4);
	name.x = 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.charaModel.force(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.charaModel.intelligence(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 2 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.charaModel.agilie(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 3 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.charaModel.luck(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 4 + 5;
	name.y = 5;
	layer.addChild(name);

	var abilityPropertiesBitmap = getBitmap(layer);
	abilityPropertiesBitmap.x = 180;
	abilityPropertiesBitmap.y = 10;
	self.addChild(abilityPropertiesBitmap);
	self.abilityProperties = abilityPropertiesBitmap;
	self.abilityProperties.visible = false;
}; 