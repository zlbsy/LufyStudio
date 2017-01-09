function ExpeditionReadyView(controller, characterListType){
	var self = this;
	base(self,LView,[controller]);
	self.selectFood = 0;
	self.selectMoney = 0;
	self.selectTroops = 0;
	self.characterListType = characterListType;
	self.set();
	self.name = "ExpeditionReadyView";
}
ExpeditionReadyView.prototype.set=function(img,name){
	var self = this;
	self.multiple = 1;
	var charas = self.controller.getValue(self.characterListType == CharacterListType.TRANSPORT ? "transportCharacter" : "expeditionCharacterList");
	var sumTroops = 0;
	for (var i = 0, l = charas.length; i < l; i++) {
		var chara = charas[i];
		if(chara.hasSkill(SkillSubType.THRIFT)){
			self.multiple = 2;
		}
		sumTroops += chara.troops();
	}
	self.sumTroops= sumTroops;
	var rangeBackground = getPanel("win04",300,40);
	//var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),300,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var layer = new LSprite();
	layer.x = (LMvc.screenWidth - rangeBackground.getWidth())*0.5;
	self.addChild(layer);
	var cityModel = self.controller.getValue("cityData");
	var foodLayer = new LSprite();
	foodLayer.x = 10;
	layer.addChild(foodLayer);
	var foodLabel = getStrokeLabel(Language.get("food"), 18, "#FFFFFF", "#000000", 4);
	foodLabel.x = 10;
	foodLayer.addChild(foodLabel);
	self.foodSum = cityModel.food();
	var food = getStrokeLabel(String.format("{0}/{1}", 0, self.foodSum), 18, "#FFFFFF", "#000000", 4);
	food.x = 60;
	foodLayer.addChild(food);
	self.food = food;
	var rangeFood = new LRange(rangeBackground, rangeSelect);
	self.rangeFood = rangeFood;
	rangeFood.x = 10;
	rangeFood.y = 20;
	foodLayer.addChild(rangeFood);
	rangeFood.addEventListener(LRange.ON_CHANGE, self.onFoodChange);
	
	var rangeBackground = getPanel("win04",300,40);
	//var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),300,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var moneyLayer = new LSprite();
	moneyLayer.x = 10;
	moneyLayer.y = 100;
	layer.addChild(moneyLayer);
	var moneyLabel = getStrokeLabel(Language.get("money"), 18, "#FFFFFF", "#000000", 4);
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
	
	var rangeBackground = getPanel("win04",300,40);
	//var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),300,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var troopsLayer = new LSprite();
	troopsLayer.x = 10;
	troopsLayer.y = 200;
	layer.addChild(troopsLayer);
	var troopsLabel = getStrokeLabel(Language.get("arm_expedition"), 18, "#FFFFFF", "#000000", 4);
	troopsLabel.x = 10;
	troopsLayer.addChild(troopsLabel);
	self.troopsSum = cityModel.troops();
	var troops = getStrokeLabel( String.format("{0}/{1}",0,self.troopsSum), 18, "#FFFFFF", "#000000", 4);
	troops.x = 100;
	troopsLayer.addChild(troops);
	self.troops = troops;
	var rangeTroops = new LRange(rangeBackground.clone(), rangeSelect.clone());
	rangeTroops.x = 10;
	rangeTroops.y = 20;
	troopsLayer.addChild(rangeTroops);
	rangeTroops.addEventListener(LRange.ON_CHANGE, self.onTroopsChange);
};
ExpeditionReadyView.prototype.onFoodChange=function(event){
	var rangeFood = event.currentTarget;
	var self = rangeFood.parent.parent.parent;
	self.setFoodValue(rangeFood.value);
	//self.selectFood = self.foodSum*rangeFood.value*0.01>>0;
	//self.updateFoodLabel();
};
ExpeditionReadyView.prototype.setFoodValue=function(value){
	var self = this;
	if(typeof value == "string"){
		self.rangeFood.setValue(parseInt(value));
		return;
	}
	self.selectFood = self.foodSum * value * 0.01 >> 0;
	self.updateFoodLabel();
};
ExpeditionReadyView.prototype.updateFoodLabel=function(){
	var self = this;
	var unitFood = (self.selectTroops + self.sumTroops * 2) * 0.5;
	self.food.text = String.format(Language.get("expedition_ready_food"),self.selectFood,self.foodSum, self.selectFood * self.multiple / unitFood >>> 0);
};
ExpeditionReadyView.prototype.onMoneyChange=function(event){
	var rangeMoney = event.currentTarget;
	var self = rangeMoney.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.selectMoney = self.moneySum*rangeMoney.value*0.01>>0;
	self.money.text = String.format("{0}/{1}",self.selectMoney,self.moneySum);	
};
ExpeditionReadyView.prototype.onTroopsChange=function(event){
	var rangeTroops = event.currentTarget;
	var self = rangeTroops.parent.parent.parent;
	self.selectTroops = self.troopsSum*rangeTroops.value*0.01>>0;
	self.troops.text = String.format("{0}/{1}",self.selectTroops,self.troopsSum);
	self.updateFoodLabel();
};
ExpeditionReadyView.prototype.getData=function(event){
	var self = this;
	var obj = {},readyArms = [];
	obj.food = self.selectFood;
	obj.money = self.selectMoney;
	obj.troops = self.selectTroops;
	var cityModel = self.controller.getValue("cityData");
	var troops = cityModel.troops();
	cityModel.troops(troops - obj.troops);
	cityModel.food(-obj.food);
	cityModel.money(-obj.money);
	return obj;
};