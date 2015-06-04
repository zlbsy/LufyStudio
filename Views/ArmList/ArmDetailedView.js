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
	
	var quantity = getStrokeLabel(String.format("{0}人",self.soldierData.quantity), 20, "#FFFFFF", "#000000", 4);
	quantity.x = name.x + name.getWidth() + 50;
	quantity.y = name.y;
	layer.addChild(quantity);
	
	self.enlistPrice = soldierModel.enlistPrice();
	
	var enlistConfrim = getStrokeLabel("要招募多少士兵？", 20, "#FFFFFF", "#000000", 4);
	enlistConfrim.x = 50;
	enlistConfrim.y = 100;
	layer.addChild(enlistConfrim);
	
	var enlistFrom = getStrokeLabel(String.format("{0}人",EnlistSetting.ENLIST_FROM), 20, "#FFFFFF", "#000000", 4);
	enlistFrom.x = 50;
	enlistFrom.y = 150;
	layer.addChild(enlistFrom);
	
	var enlistTo = getStrokeLabel(String.format("{0}人",EnlistSetting.ENLIST_TO), 20, "#FFFFFF", "#000000", 4);
	enlistTo.x = enlistFrom.x + 240 - enlistTo.getWidth();
	enlistTo.y = enlistFrom.y;
	layer.addChild(enlistTo);
	
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),240,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var r = new LRange(rangeBackground, rangeSelect);
	r.x = 50;
	r.y = enlistFrom.y + enlistFrom.getHeight();
	self.enlistRange = r;
	layer.addChild(r);

	var enlistConfrim = getStrokeLabel("", 20, "#FFFFFF", "#000000", 4);
	enlistConfrim.setWordWrap(true);
	enlistConfrim.width = 400;
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
	
	var enlistCount = EnlistSetting.ENLIST_FROM + (EnlistSetting.ENLIST_TO - EnlistSetting.ENLIST_FROM) * self.enlistRange.value*0.01 >>> 0;
	var enlistPrice = self.enlistPrice * enlistCount / EnlistSetting.ENLIST_FROM >>> 0;
	
	self.enlistConfrim.text = String.format("花费金钱:{0}\n招募{1}人", enlistPrice, enlistCount);
};

