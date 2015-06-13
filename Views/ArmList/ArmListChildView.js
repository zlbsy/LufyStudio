function ArmListChildView(controller, soldierData, cityModel, parentView) {
	var self = this;
	base(self, LView, [controller]);
	self.soldierData = soldierData;
	self.cityModel = cityModel;
	self.parentView = parentView;
	if(self.controller.armListType == ArmListType.EXPEDITION){
		self.setExpeditionStatus();
	}else{
		self.setStatus();
	}
}
ArmListChildView.prototype.setStatus = function() {
	var self = this;
	var soldierMaster = SoldierMasterModel.getMaster(self.soldierData.id);
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, 440, 50]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 440;
	bitmapLine.y = 40;
	layer.addChild(bitmapLine);
	var name = getStrokeLabel(soldierMaster.name(), 20, "#FFFFFF", "#000000", 4);
	name.x = 50;
	name.y = 5;
	layer.addChild(name);
	
	var quantity = getStrokeLabel(self.soldierData.quantity, 20, "#FFFFFF", "#000000", 4);
	quantity.x = 200;
	quantity.y = 5;
	layer.addChild(quantity);
	
	var bitmapLayer = getBitmap(layer);
	bitmapLayer.x = 20;
	bitmapLayer.y = 10;
	self.addChild(bitmapLayer);
}; 
ArmListChildView.prototype.setExpeditionStatus = function() {
	var self = this;
	var soldierMaster = SoldierMasterModel.getMaster(self.soldierData.id);
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, 390, 50]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 390;
	bitmapLine.y = 40;
	layer.addChild(bitmapLine);
	var name = getStrokeLabel(soldierMaster.name(), 20, "#FFFFFF", "#000000", 4);
	name.x = 0;
	name.y = 5;
	layer.addChild(name);
	
	var quantity = getStrokeLabel(self.soldierData.quantity, 20, "#FFFFFF", "#000000", 4);
	quantity.x = 150;
	quantity.y = 5;
	layer.addChild(quantity);
	
	var bitmapLayer = getBitmap(layer);
	bitmapLayer.x = 10;
	//bitmapLayer.y = 10;
	self.addChild(bitmapLayer);
}; 