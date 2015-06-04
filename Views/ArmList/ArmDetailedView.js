function ArmDetailedView(controller, soldierData){
	var self = this;
	base(self,LView,[controller]);
	self.soldierData = soldierData;
	self.set();
}
ArmDetailedView.prototype.setArmEnlist=function(){
	var self = this;
	var soldierModel = new SoldierModel(null,self.soldierData);
	
	var layer = new LSprite();
	
	var width = 48, height = 48;
	var icon = soldierModel.icon(new LPoint(width,height), true);
	//icon.x = 50;
	//icon.y = 20;
	layer.addChild(icon);
	
	var name = getStrokeLabel(soldierModel.name(), 20, "#FFFFFF", "#000000", 4);
	name.x = icon.x + icon.getWidth() + 10;
	name.y = icon.y + 5;
	layer.addChild(name);
	
	var quantity = getStrokeLabel(self.soldierData.quantity, 20, "#FFFFFF", "#000000", 4);
	quantity.x = icon.x + icon.getWidth() + 10;
	quantity.y = name.y + name.getHeight() + 10;
	layer.addChild(quantity);
	
	self.enlistPrice = soldierModel.enlistPrice();
	
	var enlistConfrim = getStrokeLabel("要招募多少士兵？", 20, "#FFFFFF", "#000000", 4);
	enlistConfrim.x = 50;
	enlistConfrim.y = 100;
	layer.addChild(enlistConfrim);
	
	var enlistFrom = getStrokeLabel(500, 20, "#FFFFFF", "#000000", 4);
	enlistFrom.x = 50;
	enlistFrom.y = 150;
	layer.addChild(enlistFrom);
	
	var enlistTo = getStrokeLabel(1000, 20, "#FFFFFF", "#000000", 4);
	enlistTo.x = enlistFrom.x + 240 - enlistTo.getWidth();
	enlistTo.y = enlistFrom.y;
	layer.addChild(enlistTo);
	
	var r = new LRange(240);
	r.x = 50;
	r.y = enlistFrom.y + enlistFrom.getHeight();
	self.enlistRange = r;
	layer.addChild(r);

	var enlistConfrim = getStrokeLabel("", 20, "#FFFFFF", "#000000", 4);
	enlistConfrim.x = 50;
	enlistConfrim.y = 230;
	self.enlistConfrim = enlistConfrim;
	layer.addChild(enlistConfrim);
	
	self.addChild(layer);
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
ArmDetailedView.prototype.set=function(){
	var self = this;
	//self.layerInit();
	if(self.controller.armListType == ArmListType.ARM_ENLIST){
		self.setArmEnlist();
		return;
	}
};
ArmDetailedView.prototype.onframe = function(event){
	var self = event.currentTarget;
	
	
	var enlistPrice = self.enlistPrice * (100 + self.enlistRange.value)*0.01 >>> 0;
	
	self.enlistConfrim.text = String.format("花费金钱:{0}",enlistPrice);
};

