/**
 * 市场
 * 发展商业，探索文官相关类宝物
 */
function BuildMarketView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"market"]);
}
BuildMarketView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var buttonBusiness = getButton(Language.get("business"),200);
	buttonBusiness.y = menuY;
	layer.addChild(buttonBusiness);
	buttonBusiness.addEventListener(LMouseEvent.MOUSE_UP, self.onClickBusinessButton);
	
	menuY += menuHeight;
	var buttonExplore = getButton(Language.get("explore"),200);
	buttonExplore.y = menuY;
	layer.addChild(buttonExplore);
	buttonExplore.addEventListener(LMouseEvent.MOUSE_UP, self.onClickExploreButton);
	
	menuY += menuHeight;
	var buttonBuyFood = getButton(Language.get("buy_food"),200);
	buttonBuyFood.y = menuY;
	layer.addChild(buttonBuyFood);
	buttonBuyFood.addEventListener(LMouseEvent.MOUSE_UP, self.onClickBuyFoodButton);
	
	menuY += menuHeight;
	var buttonSellFood = getButton(Language.get("sell_food"),200);
	buttonSellFood.y = menuY;
	layer.addChild(buttonSellFood);
	buttonSellFood.addEventListener(LMouseEvent.MOUSE_UP, self.onClickSellFoodButton);
	
	return layer;
};
BuildMarketView.prototype.onBuyComplete=function(event){
	var self = event.currentTarget.getParentByConstructor(BuildMarketView);
	var cityModel = self.controller.getValue("cityData");
	cityModel.food(self.buyFoodValue);
	cityModel.money(-self.useMoneyValue);
	event.currentTarget.parent.remove();
};
BuildMarketView.prototype.onSellComplete=function(event){
	var self = event.currentTarget.getParentByConstructor(BuildMarketView);
	var cityModel = self.controller.getValue("cityData");
	cityModel.food(-self.sellFoodValue);
	cityModel.money(self.getMoneyValue);
	event.currentTarget.parent.remove();
};
BuildMarketView.prototype.onFoodChange=function(event){
	var rangeFood = event.currentTarget;
	var self = rangeFood.getParentByConstructor(BuildMarketView);
	var cityModel = self.controller.getValue("cityData");
	if(self.rangeType == "buy"){
		self.useMoneyValue = (rangeFood.value * cityModel.money() / 100) >>> 0;
		self.useMoney.text = String.format(Language.get("use_money"), self.useMoneyValue,cityModel.money());
		self.buyFoodValue = self.useMoneyValue * 5;
		self.buyFood.text = self.buyFoodValue;
	}else{
		self.sellFoodValue = (rangeFood.value * cityModel.food() / 100) >>> 0;
		self.sellFood.text = String.format("{0}/{1}", self.sellFoodValue, cityModel.food());
		self.getMoneyValue = (self.sellFoodValue / 10) >>> 0;
		self.getMoney.text = String.format(Language.get("get_money"), self.getMoneyValue);
	}
};
BuildMarketView.prototype.onClickBuyFoodButton=function(event){
	var self = event.currentTarget.getParentByConstructor(BuildMarketView);
	var cityModel = self.controller.getValue("cityData");
	self.useMoneyValue = 0;
	self.buyFoodValue = 0;
	var foodLayer = new LSprite();
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),220,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var foodLabel = getStrokeLabel(Language.get("buy_food_message"), 18, "#FFFFFF", "#000000", 4);
	foodLabel.x = 10;
	foodLayer.addChild(foodLabel);
	var rangeFood = new LRange(rangeBackground, rangeSelect);
	self.rangeType = "buy";
	rangeFood.x = 10;
	rangeFood.y = 20;
	foodLayer.addChild(rangeFood);
	var food = getStrokeLabel(0, 18, "#FFFFFF", "#000000", 4);
	food.x = 10;
	food.y = 80;
	foodLayer.addChild(food);
	self.buyFood = food;
	var useMoneyLabel = getStrokeLabel(String.format(Language.get("use_money"), 0,cityModel.money()), 18, "#FFFFFF", "#000000", 4);
	useMoneyLabel.x = 10;
	useMoneyLabel.y = 120;
	foodLayer.addChild(useMoneyLabel);
	self.useMoney = useMoneyLabel;
	rangeFood.addEventListener(LRange.ON_CHANGE, self.onFoodChange);
	
	var obj = {title:Language.get("buy_food"),subWindow:foodLayer,height:300,okEvent:self.onBuyComplete,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
BuildMarketView.prototype.onClickSellFoodButton=function(event){
	var self = event.currentTarget.getParentByConstructor(BuildMarketView);
	var cityModel = self.controller.getValue("cityData");
	self.sellFoodValue = 0;
	self.getMoneyValue = 0;
	var foodLayer = new LSprite();
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),220,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var foodLabel = getStrokeLabel(Language.get("sell_food_message"), 18, "#FFFFFF", "#000000", 4);
	foodLabel.x = 10;
	foodLayer.addChild(foodLabel);
	var rangeFood = new LRange(rangeBackground, rangeSelect);
	self.rangeType = "sell";
	rangeFood.x = 10;
	rangeFood.y = 20;
	foodLayer.addChild(rangeFood);
	var food = getStrokeLabel(String.format("{0}/{1}", 0, cityModel.food()), 18, "#FFFFFF", "#000000", 4);
	food.x = 10;
	food.y = 80;
	foodLayer.addChild(food);
	self.sellFood = food;
	var getMoneyLabel = getStrokeLabel(String.format(Language.get("get_money"), 0), 18, "#FFFFFF", "#000000", 4);
	getMoneyLabel.x = 10;
	getMoneyLabel.y = 120;
	foodLayer.addChild(getMoneyLabel);
	self.getMoney = getMoneyLabel;
	rangeFood.addEventListener(LRange.ON_CHANGE, self.onFoodChange);
	
	var obj = {title:Language.get("sell_food"),subWindow:foodLayer,height:300,okEvent:self.onSellComplete,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
BuildMarketView.prototype.onClickBusinessButton=function(event){
	var self = event.currentTarget.getParentByConstructor(BuildMarketView);
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.BUSINESS, cityModel.generals(Job.IDLE), {showMoney:true, buttonLabel:"execute"});
};
BuildMarketView.prototype.onClickExploreButton=function(event){
	var self = event.currentTarget.getParentByConstructor(BuildMarketView);
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.EXPLORE_BUSINESS, cityModel.generals(Job.IDLE), {buttonLabel:"execute"});
};