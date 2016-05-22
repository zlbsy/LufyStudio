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
BuildMarketView.prototype.onClickBuyFoodButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	var foodLayer = new LSprite();
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),220,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var foodLabel = getStrokeLabel(Language.get("buy_food_message"), 18, "#FFFFFF", "#000000", 4);
	foodLabel.x = 10;
	foodLayer.addChild(foodLabel);
	var rangeFood = new LRange(rangeBackground, rangeSelect);
	rangeFood.x = 10;
	rangeFood.y = 20;
	foodLayer.addChild(rangeFood);
	var food = getStrokeLabel(500, 18, "#FFFFFF", "#000000", 4);
	food.x = 10;
	food.y = 80;
	foodLayer.addChild(food);
	var food = getStrokeLabel(String.format("use_money", 1000,2000), 18, "#FFFFFF", "#000000", 4);
	food.x = 10;
	food.y = 120;
	foodLayer.addChild(food);
	//rangeFood.addEventListener(LRange.ON_CHANGE, self.onFoodChange);
	
	var obj = {title:Language.get("buy_food"),subWindow:foodLayer,height:300,okEvent:null,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
BuildMarketView.prototype.onClickSellFoodButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	var foodLayer = new LSprite();
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),220,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var foodLabel = getStrokeLabel(Language.get("sell_food_message"), 18, "#FFFFFF", "#000000", 4);
	foodLabel.x = 10;
	foodLayer.addChild(foodLabel);
	var rangeFood = new LRange(rangeBackground, rangeSelect);
	rangeFood.x = 10;
	rangeFood.y = 20;
	foodLayer.addChild(rangeFood);
	var food = getStrokeLabel(String.format("{0}/{1}", 500, 1000), 18, "#FFFFFF", "#000000", 4);
	food.x = 10;
	food.y = 80;
	foodLayer.addChild(food);
	var food = getStrokeLabel(String.format("get_money", 1000), 18, "#FFFFFF", "#000000", 4);
	food.x = 10;
	food.y = 120;
	foodLayer.addChild(food);
	//rangeFood.addEventListener(LRange.ON_CHANGE, self.onFoodChange);
	
	var obj = {title:Language.get("sell_food"),subWindow:foodLayer,height:300,okEvent:null,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
BuildMarketView.prototype.onClickBusinessButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.BUSINESS, cityModel.generals(Job.IDLE), {showMoney:true, buttonLabel:"execute"});
};
BuildMarketView.prototype.onClickExploreButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.EXPLORE_BUSINESS, cityModel.generals(Job.IDLE), {buttonLabel:"execute"});
};