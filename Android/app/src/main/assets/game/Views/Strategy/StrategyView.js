function StrategyView(controller, characterModel, size, fromView) {
	var self = this;
	base(self, LView, [controller]);
	self.characterModel = characterModel;
	self.size = size;
	if(!self.size){
		self.size = new LPoint(400,340);
	}
	self.fromCharacterDetailed = (fromView && fromView.constructor.name == "CharacterDetailedView");
	self.layerInit();
	if(!self.fromCharacterDetailed){
		self.setStrategyList();
	}
}
StrategyView.prototype.updateItems = function(strategyList) {
	var self = this;
	var items = self.listView.getItems();
	while(items.length > strategyList.length){
		self.listView.deleteChildView(items[items.length - 1]);
	}
	for(var i=0,l=strategyList.length;i<l;i++){
		var item;
		var strategy = strategyList[i];
		var isLearned = strategy.level() < self.characterModel.level();
		if(i < items.length){
			item = items[i];
			item.strategyModel = strategy;
			item.isLearned = isLearned;
		}else{
			item = StrategyChildView.createChild(strategy, isLearned, self.listView.cellWidth);
			self.listView.insertChildView(item);
		}
		item.cacheAsBitmap(false);
		if(!self.listView.isInClipping(i)){
			continue;
		}
		item.set();
		item.updateView();
	}
};
StrategyView.prototype.updateView = function() {
	var self = this;
	var characterModel = self.controller.getValue("selectedCharacter");
	self.characterModel = characterModel;
	self.setStrategyList();
};
StrategyView.prototype.setStrategyList = function() {
	var self = this;
	var strategyList = self.characterModel.strategies(self.fromCharacterDetailed);
	if(self.listView){
		self.updateItems(strategyList);
		return;
	}
	self.listView = new LListView();
	if(self.fromCharacterDetailed){
		self.listView.resize(self.size.x, self.size.y);
	}else{
		self.listView.resize(self.size.x - 50, self.size.y - 140);
	}
	self.listView.cellWidth = self.listView.clipping.width;
	self.listView.cellHeight = 50;
	self.strategyListLayer.addChild(self.listView);
	var items = [];
	for (var i = 0, l = strategyList.length; i < l; i++) {
		var strategy = strategyList[i];
		var isLearned = strategy.level() < self.characterModel.level();
		var child = new StrategyChildView(strategy, isLearned, self.listView.cellWidth);
		items.push(child);
	}
	self.listView.updateList(items);
};
StrategyView.prototype.onclick = function() {};
StrategyView.prototype.layerInit = function() {
	var self = this;
	if(!self.fromCharacterDetailed){
		var translucentLayer = new LSprite();
		translucentLayer.addShape(LShape.RECT,[0,0,LGlobal.width,LGlobal.height]);
		self.addChild(translucentLayer);
		translucentLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.onclick);
		translucentLayer.addEventListener(LMouseEvent.MOUSE_UP, self.onclick);
	}
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	if(!self.fromCharacterDetailed){
		self.setBackgroundLayer();
	}
	self.strategyListLayer = new LSprite();
	self.baseLayer.addChild(self.strategyListLayer);
	if(self.fromCharacterDetailed){
		return;
	}
	self.strategyListLayer.x = (LGlobal.width - self.size.x)*0.5 + 20;
	self.strategyListLayer.y = (LGlobal.height - self.size.y)*0.5 + 110;
	self.ctrlLayerInit();
};
StrategyView.prototype.setBackgroundLayer = function() {
	var self = this;
	var windowLayer = new LSprite();
	windowLayer.addChild(getTranslucentBitmap());
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	//var panel = getBitmap(new LPanel(backgroundData,self.size.x,self.size.y));
	var panel = getPanel("win05",self.size.x,self.size.y);
	panel.x = (LGlobal.width - panel.getWidth()) * 0.5;
	panel.y = (LGlobal.height - panel.getHeight()) * 0.5;
	windowLayer.addChild(panel);

	var charaName = getStrokeLabel(self.characterModel.name(),20,"#FFFFFF","#000000",4);
	charaName.x = panel.x + 30;
	charaName.y = panel.y + 25;
	windowLayer.addChild(charaName);
	
	var charaName = getStrokeLabel("MP "+self.characterModel.MP(),20,"#FFFFFF","#000000",4);
	charaName.x = panel.x + 230;
	charaName.y = panel.y + 25;
	windowLayer.addChild(charaName);
	
	var tabMenuLayer = new LSprite();
	tabMenuLayer.x = panel.x;
	tabMenuLayer.y = panel.y + 60;
	windowLayer.addChild(tabMenuLayer);
	var tabButton = getButton(Language.get("strategy"),140);
	tabButton.x = 20;
	tabMenuLayer.addChild(tabButton);
		
	var tabButton = getButton(Language.get("effect"),120);
	tabButton.x = 160;
	tabMenuLayer.addChild(tabButton);
		
	var tabButton = getButton("MP",100);
	tabButton.x = 280;
	tabMenuLayer.addChild(tabButton);
	windowLayer.cacheAsBitmap(true);
	self.baseLayer.addChild(windowLayer);
};
StrategyView.prototype.ctrlLayerInit = function() {
	var self = this;
	var buttonClose = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	buttonClose.x = (LGlobal.width - self.size.x) * 0.5 + self.size.x - buttonClose.getWidth() * 0.7;
	buttonClose.y = (LGlobal.height - self.size.y) * 0.5 - buttonClose.getHeight() * 0.3;
	self.baseLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.close);
};
StrategyView.prototype.close = function(event) {
	var self = event.currentTarget.parent.parent;
	self.dispatchEvent(StrategyListEvent.CLOSE);
	self.remove();
};
StrategyView.prototype.strategySelect = function(strategyModel) {
	var self = this;
	if(self.fromCharacterDetailed){
		return;
	}
	if(BattleController.ctrlChara.data.MP() < strategyModel.cost()){
		Toast.makeText(Language.get("strategy_mp_error")).show();
		return;
	}
	if(strategyModel.effectType() == StrategyEffectType.Supply){
		var battleData = LMvc.BattleController.battleData;
		var reservist = 0;
		if(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
			reservist = battleData.troops;
		}else{
			reservist = battleData.toCity.troops();
		}
		if(reservist <= 0 && strategyModel.wounded() == 0 && strategyModel.troops() != 0){
			Toast.makeText(Language.get("strategy_troops_error")).show();
			return;
		}
	}
	var weathers = strategyModel.weathers();
	if(weathers && weathers.length > 0 && weathers.indexOf(LMvc.BattleController.view.weatherLayer.currentWeather.weather) < 0){
		Toast.makeText(Language.get("strategy_weather_error")).show();
		return;
	}
	var e = new LEvent(StrategyListEvent.SELECT);
	e.strategyModel = strategyModel;
	self.dispatchEvent(e);
	self.remove();
};
StrategyView.prototype.strategyImageLoad = function(){
	var self = this;
	if(self.strategyMode.imageCache()){
		self.dispatchSelectEvent();
		return;
	}
	var loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE, self.loadData);
	loader.load(self.strategyMode.image(), "bitmapData");
	LMvc.keepLoading(true);
};
StrategyView.prototype.loadData = function(event){
	var self = event.currentTarget.parent;
	LMvc.keepLoading(false);
	self.strategyMode.imageCache(event.target);
	self.dispatchSelectEvent();
};
StrategyView.prototype.dispatchSelectEvent = function(){
	var self = this;
	var e = new LEvent(StrategyListEvent.SELECT);
	e.strategyModel = self.strategyMode;
	self.dispatchEvent(e);
	self.remove();
};