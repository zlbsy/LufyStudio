function ExpeditionReadyView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.set();
}
ExpeditionReadyView.prototype.set=function(img,name){
	var self = this;
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),170,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var layer = new LSprite();
	self.addChild(layer);
	
	var foodLayer = new LSprite();
	foodLayer.x = 10;
	layer.addChild(foodLayer);
	var foodLabel = getStrokeLabel("粮食", 18, "#FFFFFF", "#000000", 4);
	foodLayer.addChild(foodLabel);
	var food = getStrokeLabel( "32000/889999", 18, "#FFFFFF", "#000000", 4);
	food.x = 60;
	foodLayer.addChild(food);
	var r = new LRange(rangeBackground, rangeSelect);
	r.x = 10;
	r.y = 20;
	foodLayer.addChild(r);
	
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),170,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var moneyLayer = new LSprite();
	moneyLayer.x = 230;
	layer.addChild(moneyLayer);
	var moneyLabel = getStrokeLabel("金钱", 18, "#FFFFFF", "#000000", 4);
	moneyLabel.x = 10;
	moneyLayer.addChild(moneyLabel);
	var money = getStrokeLabel( "32000/889999", 18, "#FFFFFF", "#000000", 4);
	money.x = 60;
	moneyLayer.addChild(money);
	var r = new LRange(rangeBackground, rangeSelect);
	r.x = 10;
	r.y = 20;
	moneyLayer.addChild(r);
	
	var armListLayer = new LSprite();
	armListLayer.y = 70;
	layer.addChild(armListLayer);
	
	self.controller.addEventListener(ArmListEvent.SHOW, self.showArmList);
	//self.controller.addEventListener(ArmListEvent.CLOSE, self.hideArmList);
	self.controller.setValue("armListLayer", armListLayer);
	self.controller.loadArmList(ArmListType.EXPEDITION);
};
ExpeditionReadyView.prototype.showArmList=function(event){
	var controller = event.currentTarget;
	var armListLayer = controller.getValue("armListLayer");
	var self = armListLayer.parent;
	
};