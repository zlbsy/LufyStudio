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
	var cityModel = self.controller.getValue("cityData");
	var foodLayer = new LSprite();
	foodLayer.x = 10;
	layer.addChild(foodLayer);
	var foodLabel = getStrokeLabel("粮食", 18, "#FFFFFF", "#000000", 4);
	foodLayer.addChild(foodLabel);
	self.foodSum = cityModel.food();
	var food = getStrokeLabel( String.format("{0}/{1}",0,self.foodSum), 18, "#FFFFFF", "#000000", 4);
	food.x = 60;
	foodLayer.addChild(food);
	self.food = food;
	var rangeFood = new LRange(rangeBackground, rangeSelect);
	rangeFood.x = 10;
	rangeFood.y = 20;
	foodLayer.addChild(rangeFood);
	rangeFood.addEventListener(LRange.ON_CHANGE, self.onFoodChange);
	
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),170,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var moneyLayer = new LSprite();
	moneyLayer.x = 230;
	layer.addChild(moneyLayer);
	var moneyLabel = getStrokeLabel("金钱", 18, "#FFFFFF", "#000000", 4);
	moneyLabel.x = 10;
	moneyLayer.addChild(moneyLabel);
	self.moneySum = cityModel.money();
	var money = getStrokeLabel( String.format("{0}/{1}",0,self.moneySum), 18, "#FFFFFF", "#000000", 4);
	money.x = 60;
	moneyLayer.addChild(money);
	self.money = money;
	var rangeMoney = new LRange(rangeBackground.clone(), rangeSelect.clone());
	rangeMoney.x = 10;
	rangeMoney.y = 20;
	moneyLayer.addChild(rangeMoney);
	rangeMoney.addEventListener(LRange.ON_CHANGE, self.onMoneyChange);
	
	var armListLayer = new LSprite();
	armListLayer.y = 70;
	layer.addChild(armListLayer);
	
	//self.controller.addEventListener(ArmListEvent.SHOW, self.showArmList);
	//self.controller.addEventListener(ArmListEvent.CLOSE, self.hideArmList);
	self.controller.setValue("armListLayer", armListLayer);
	self.controller.loadArmList(ArmListType.EXPEDITION);
};
ExpeditionReadyView.prototype.onFoodChange=function(event){
	var rangeFood = event.currentTarget;
	var self = rangeFood.parent.parent.parent;
	self.selectFood = self.foodSum*rangeFood.value*0.01>>0;
	self.food.text = String.format("{0}/{1}",self.selectFood,self.foodSum);	
};
ExpeditionReadyView.prototype.onMoneyChange=function(event){
	var rangeMoney = event.currentTarget;
	var self = rangeMoney.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.selectMoney = self.moneySum*rangeMoney.value*0.01>>0;
	self.money.text = String.format("{0}/{1}",self.selectMoney,self.moneySum);	
};
ExpeditionReadyView.prototype.getData=function(event){
	var self = this;
	var obj = {},readyArms = [];
	obj.food = self.selectFood;
	obj.money = self.selectMoney;
	var cityModel = self.controller.getValue("cityData");
	var troops = cityModel.troops();
	for(var i=0;i<troops.length;i++){
		readyArms.push({id:troops[i].id,quantity:troops[i].readyQuantity});
		troops[i].quantity -= troops[i].readyQuantity;
		troops[i].readyQuantity = 0;
	}
	obj.readyArms = readyArms;
	return obj;
};