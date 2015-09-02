function ArmDetailedView(controller){
	var self = this;
	base(self,LView,[controller]);
	//self.soldierData = soldierData;
	//self.soldierModel = new SoldierModel(null,soldierData);
	//console.error("ArmDetailedView",soldierModel);
	//self.soldierModel = soldierModel;
	self.set();
}
ArmDetailedView.prototype.setArmEnlist=function(){
	var self = this;
	var soldierModel = self.soldierModel;
	var cityModel = self.controller.fromController.getValue("cityData");
	var layer = new LSprite();
	
	var width = 48, height = 48;
	/*var icon = soldierModel.icon(new LPoint(width,height), true);
	//icon.x = 50;
	//icon.y = 20;
	layer.addChild(icon);
	
	var name = getStrokeLabel(soldierModel.name(), 20, "#FFFFFF", "#000000", 4);
	name.x = icon.x + icon.getWidth() + 10;
	name.y = icon.y + 5;
	layer.addChild(name);*/
	
	var quantity = getStrokeLabel(String.format("{0} 兵力 : {1}人",cityModel.name(),cityModel.troops()), 20, "#FFFFFF", "#000000", 4);
	//quantity.x = name.x + name.getWidth() + 50;
	//quantity.y = name.y;
	quantity.x = 50;
	quantity.y = 20;
	layer.addChild(quantity);
	
	//self.enlistPrice = soldierModel.enlistPrice();
	self.enlistPrice = EnlistSetting.ENLIST_PRICE;
	
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
	r.addEventListener(LRange.ON_CHANGE, self.onChange);
	//self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
ArmDetailedView.prototype.setArmExpedition=function(){
	var self = this;
	var soldierModel = self.soldierModel;
	
	var layer = new LSprite();
	
	var quantity = getStrokeLabel(String.format("{0}/{1}人",soldierModel.readyQuantity(),soldierModel.quantity()), 20, "#FFFFFF", "#000000", 4);
	quantity.x = 300 - quantity.getWidth();
	self.quantity = quantity;
	layer.addChild(quantity);
	
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),240,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var r = new LRange(rangeBackground, rangeSelect);
	r.x = 50;
	r.y = quantity.y + quantity.getHeight() + 10;
	r.setValue(soldierModel.readyQuantity()*100/soldierModel.quantity() >> 0);
	self.range = r;
	layer.addChild(r);
	
	self.addChild(layer);
	r.addEventListener(LRange.ON_CHANGE, self.onChange);
	//self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
ArmDetailedView.prototype.set=function(){
	var self = this;
	//self.layerInit();
	if(self.controller.armListType == ArmListType.ARM_ENLIST){
		self.setArmEnlist();
	}else if(self.controller.armListType == ArmListType.EXPEDITION){
		self.setArmExpedition();
	}
};
ArmDetailedView.prototype.getEnlistCount = function(){
	var self = this;
	var selectCharacters = self.controller.getValue("selectCharacters");
	var length = selectCharacters.length;
	var enlistCount = EnlistSetting.ENLIST_FROM + (EnlistSetting.ENLIST_TO - EnlistSetting.ENLIST_FROM) * self.enlistRange.value*0.01 >>> 0;
	return enlistCount * length;
};
ArmDetailedView.prototype.getEnlistPrice = function(count){
	var self = this;
	var enlistCount = count ? count : self.getEnlistCount();
	return self.enlistPrice * enlistCount / EnlistSetting.ENLIST_FROM >>> 0;
};
ArmDetailedView.prototype.getSelectQuantity = function(){
	var self = this;
	return self.soldierModel.quantity() * self.range.value * 0.01 >> 0;
};
ArmDetailedView.prototype.onChange = function(event){
	var range = event.currentTarget;
	var self = range.parent.parent;
	if(self.controller.armListType == ArmListType.EXPEDITION){
		var selectQuantity = self.soldierModel.quantity() * range.value * 0.01 >> 0;
		self.quantity.text = String.format("{0}/{1}人",selectQuantity,self.soldierModel.quantity());
	}else{
		self.enlistChange();
	}
};
ArmDetailedView.prototype.enlistChange = function(){
	var self = this;
	var enlistCount = self.getEnlistCount();
	var enlistPrice = self.getEnlistPrice(enlistCount);
	self.enlistConfrim.text = String.format("花费金钱:{0}\n招募{1}人", enlistPrice, enlistCount);
};

