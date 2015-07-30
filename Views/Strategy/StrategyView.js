function StrategyView(controller, characterModel, size) {
	var self = this;
	base(self, LView, [controller]);
	self.characterModel = characterModel;
	self.size = size;
	if(!self.size){
		self.size = new LPoint(400,340);
	}
	self.layerInit();
	self.setStrategyList();
}
StrategyView.prototype.setStrategyList = function() {
	var self = this;
	self.strategyListLayer.removeAllChild();
	var strategyList = self.characterModel.strategies();
	var backLayer = new LSprite();
	var index = 0;
	for (var i = 0, l = strategyList.length; i < l; i++) {
		var strategy = strategyList[i];
		var child = new StrategyChildView(self.controller, strategy);
		child.y = 50 * index++;
		backLayer.addChild(child);
	}
	
	
	backLayer.graphics.drawRect(0, "#000000", [0, 0, self.size.x - 40, 50 * strategyList.length]);
	self.strategyListLayer.listLayer = backLayer;
	
	
	var left = backLayer.graphics.startX(), right = left + backLayer.graphics.getWidth();
	var sc = new LScrollbar(backLayer, self.size.x - 40, self.size.y - 130, 10);
	sc._showLayer.graphics.clear();
	
	self.strategyListLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.strategyClickDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.strategyClickUp.bind(self));
};
StrategyView.prototype.layerInit = function() {
	var self = this;
	var translucentLayer = new LSprite();
	translucentLayer.addShape(LShape.RECT,[0,0,LGlobal.width,LGlobal.height]);
	self.addChild(translucentLayer);
	translucentLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.onclick);
	translucentLayer.addEventListener(LMouseEvent.MOUSE_UP, self.cancel);
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	
	self.setBackgroundLayer();
	
	self.strategyListLayer = new LSprite();
	self.baseLayer.addChild(self.strategyListLayer);
	self.strategyListLayer.x = (LGlobal.width - self.size.x)*0.5 + 20;
	self.strategyListLayer.y = (LGlobal.height - self.size.y)*0.5 + 110;
	
	self.ctrlLayerInit();
};
StrategyView.prototype.setBackgroundLayer = function() {
	var self = this;
	
	var windowLayer = new LSprite();
	windowLayer.addChild(getTranslucentBitmap());
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = getBitmap(new LPanel(backgroundData,self.size.x,self.size.y));
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
	var tabButton = getButton("策略名",140);
	tabButton.x = 20;
	tabMenuLayer.addChild(tabButton);
		
	var tabButton = getButton("效果",120);
	tabButton.x = 160;
	tabMenuLayer.addChild(tabButton);
		
	var tabButton = getButton("MP",100);
	tabButton.x = 280;
	tabMenuLayer.addChild(tabButton);
	
	self.baseLayer.addChild(getBitmap(windowLayer));
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
StrategyView.prototype.strategyClickDown = function(event) {
	var child = event.target;
	child.offsetX = event.offsetX;
	child.offsetY = event.offsetY;
};
StrategyView.prototype.strategyClickUp = function(event) {
	if(event.target.constructor.name != "StrategyChildView"){
		return;
	}
	var child = event.target, self = this;
	if (child.offsetX && child.offsetY && Math.abs(child.offsetX - event.offsetX) < 5 && Math.abs(child.offsetY - event.offsetY) < 5) {
		self.strategySelect(child.strategyModel);
	}
};
StrategyView.prototype.strategySelect = function(strategyModel) {
	var self = this;
	var weathers = strategyModel.weathers();
	if(weathers && weathers.length > 0 && weathers.indexOf(LMvc.BattleController.view.weatherLayer.currentWeather.weather) < 0){
		Toast.makeText(Language.get("无法在此天气使用!")).show();
		return;
	}
	var e = new LEvent(StrategyListEvent.SELECT);
	e.strategyModel = strategyModel;
	self.dispatchEvent(e);
	self.remove();
};
