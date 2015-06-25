function StrategyView(controller, characterModel, size) {
	var self = this;
	base(self, LView, [controller]);
	self.characterModel = characterModel;
	self.size = size;
	if(!self.size){
		self.size = new LPoint(400,300);
	}
	//self.getsoldierListData();
	self.layerInit();
	console.log("StrategyView run");
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
	var sc = new LScrollbar(backLayer, self.size.x - 40, self.size.y - 110, 10);
	sc._showLayer.graphics.clear();
	
	self.strategyListLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.strategyClickDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.strategyClickUp.bind(self));
};
StrategyView.prototype.layerInit = function() {
	var self = this;

	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	
	var windowLayer = new LSprite();
	windowLayer.addChild(getTranslucentBitmap());
	self.baseLayer.addChild(windowLayer);
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = getBitmap(new LPanel(backgroundData,self.size.x,self.size.y));
	panel.x = (LGlobal.width - panel.getWidth()) * 0.5;
	panel.y = (LGlobal.height - panel.getHeight()) * 0.5;
	windowLayer.addChild(panel);
	var titleData = new LBitmapData(LMvc.datalist["win02"]);
	var titlePanel = getBitmap(new LPanel(titleData,160,60));
	titlePanel.x = (LGlobal.width - titlePanel.getWidth()) * 0.5;
	titlePanel.y = panel.y - 25;
	windowLayer.addChild(titlePanel);
	
	var title = getStrokeLabel("策略一览",20,"#FFFFFF","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = titlePanel.y + 18;
	windowLayer.addChild(title);
	
	var tabMenuLayer = new LSprite();
	tabMenuLayer.x = panel.x;
	tabMenuLayer.y = panel.y + 40;
	windowLayer.addChild(tabMenuLayer);
	var buttonExpedition = getButton("策略名",140);
	buttonExpedition.x = 20;
	tabMenuLayer.addChild(buttonExpedition);
		
	var buttonExpedition = getButton("效果",120);
	buttonExpedition.x = 160;
	tabMenuLayer.addChild(buttonExpedition);
		
	var buttonExpedition = getButton("MP",100);
	buttonExpedition.x = 280;
	tabMenuLayer.addChild(buttonExpedition);
	
	
	self.strategyListLayer = new LSprite();
	self.baseLayer.addChild(self.strategyListLayer);
	self.strategyListLayer.x = (LGlobal.width - self.size.x)*0.5 + 20;
	self.strategyListLayer.y = (LGlobal.height - self.size.y)*0.5 + 90;
};
StrategyView.prototype.updateView = function() {
	var self = this;
	self.setsoldierList();
};
StrategyView.prototype.ctrlLayerInit = function() {
	var self = this;
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP, self.controller.close.bind(self.controller));
};
StrategyView.prototype.strategyClickDown = function(event) {
	var soldier = event.target;
	soldier.offsetX = event.offsetX;
	soldier.offsetY = event.offsetY;
};
StrategyView.prototype.strategyClickUp = function(event) {
	if(event.target.constructor.name != "SoldiersChildView"){
		return;
	}
	var soldier = event.target, self = this;
	if (soldier.offsetX && soldier.offsetY && Math.abs(soldier.offsetX - event.offsetX) < 5 && Math.abs(soldier.offsetY - event.offsetY) < 5) {
		self.soldierDetailedDialog(soldier.soldierModel);
	}
};
StrategyView.prototype.soldierDetailedDialog = function(soldierModel) {
	var self = this;
	var soldierDetailed = new SoldierDetailedView(self.controller,soldierModel,self);
	var obj = {title:soldierModel.name(),subWindow:soldierDetailed,width:400,height:480};
	var windowLayer = ConfirmWindow(obj);
		
	LMvc.layer.addChild(windowLayer);
};
