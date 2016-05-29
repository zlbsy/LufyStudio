function ArmDetailedView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.set();
	self.name = "ArmDetailedView";
}
ArmDetailedView.prototype.setArmEnlist=function(){
	var self = this;
	var soldierModel = self.soldierModel;
	var cityModel = self.controller.fromController.getValue("cityData");
	var layer = new LSprite();
	
	var width = 48, height = 48;
	
	var quantity = getStrokeLabel(String.format(Language.get("city_of_troops"),cityModel.name(),cityModel.troops()), 20, "#FFFFFF", "#000000", 4);
	quantity.x = 50;
	quantity.y = 20;
	layer.addChild(quantity);
	
	self.enlistPrice = JobPrice.ENLIST;
	
	var enlistConfrim = getStrokeLabel(Language.get("recruit_many_soldiers"), 20, "#FFFFFF", "#000000", 4);
	enlistConfrim.x = 50;
	enlistConfrim.y = 100;
	layer.addChild(enlistConfrim);
	
	var enlistFrom = getStrokeLabel(String.format(Language.get("number_of_people"),EnlistSetting.ENLIST_FROM), 20, "#FFFFFF", "#000000", 4);
	enlistFrom.x = 50;
	enlistFrom.y = 150;
	layer.addChild(enlistFrom);
	
	var enlistTo = getStrokeLabel(String.format(Language.get("number_of_people"),EnlistSetting.ENLIST_TO), 20, "#FFFFFF", "#000000", 4);
	enlistTo.x = enlistFrom.x + 200 - enlistTo.getWidth();
	enlistTo.y = enlistFrom.y;
	layer.addChild(enlistTo);
	
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),200,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var r = new LRange(rangeBackground, rangeSelect);
	r.x = 30;
	r.y = enlistFrom.y + enlistFrom.getHeight();
	self.enlistRange = r;
	layer.addChild(r);
	
	var buttonMax = getButton(Language.get("max"),80);
	buttonMax.x = 250;
	buttonMax.y = r.y;
	buttonMax.name = "buttonMax";
	layer.addChild(buttonMax);
	buttonMax.addEventListener(LMouseEvent.MOUSE_UP, self.onClickMaxButton);

	var enlistConfrim = getStrokeLabel("", 20, "#FFFFFF", "#000000", 4);
	enlistConfrim.setWordWrap(true);
	enlistConfrim.width = 400;
	enlistConfrim.x = 50;
	enlistConfrim.y = 230;
	self.enlistConfrim = enlistConfrim;
	layer.addChild(enlistConfrim);
	
	self.addChild(layer);
	r.addEventListener(LRange.ON_CHANGE, self.onChangeEvent);
	self.onChange();
};
ArmDetailedView.prototype.onClickMaxButton=function(event){
	var self = event ? event.currentTarget.getParentByConstructor(ArmDetailedView) : this;
	self.enlistRange.setValue(100);
};
ArmDetailedView.prototype.setArmExpedition=function(){
	var self = this;
	var soldierModel = self.soldierModel;
	
	var layer = new LSprite();
	
	var quantity = getStrokeLabel(String.format(Language.get("proportion_of_people"),soldierModel.readyQuantity(),soldierModel.quantity()), 20, "#FFFFFF", "#000000", 4);
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
};
ArmDetailedView.prototype.set=function(){
	var self = this;
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
ArmDetailedView.prototype.onChangeEvent = function(event){
	var range = event.currentTarget;
	var self = range.parent.parent;
	self.onChange();
};
ArmDetailedView.prototype.onChange = function(){
	var self = this;
	var range = self.range;
	if(self.controller.armListType == ArmListType.EXPEDITION){
		var selectQuantity = self.soldierModel.quantity() * range.value * 0.01 >> 0;
		self.quantity.text = String.format(Language.get("proportion_of_people"),selectQuantity,self.soldierModel.quantity());
	}else{
		self.enlistChange();
	}
};
ArmDetailedView.prototype.enlistChange = function(){
	var self = this;
	var enlistCount = self.getEnlistCount();
	var enlistPrice = self.getEnlistPrice(enlistCount);
	self.enlistConfrim.text = String.format(Language.get("expedition_troops"), enlistPrice, enlistCount);
};

