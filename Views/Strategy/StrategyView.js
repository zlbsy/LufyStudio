function StrategyView(controller, characterModel, size) {
	var self = this;
	base(self, LView, [controller]);
	self.characterModel = characterModel;
	self.size = size;
	if(!self.size){
		self.size = new LPoint(300,200);
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
		continue;
		var strategyList = soldier.strategy();
		for(var j = 0;j<strategyList.length;j++){
			var strategyChild = strategyList[j];
			var child = new StrategyChildView(self.controller, strategyChild);
			child.y = 50 * index++;
			backLayer.addChild(child);
		}
	}
	backLayer.graphics.drawRect(0, "#000000", [0, 0, self.size.x, 50 * soldierList.length]);
	self.soldierListLayer.listLayer = backLayer;
	var left = backLayer.graphics.startX(), right = left + backLayer.graphics.getWidth();
	var sc = new LScrollbar(backLayer, self.size.x, self.size.y, 10);
	//sc._showLayer.graphics.clear();
	self.soldierListLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.strategyClickDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.strategyClickUp.bind(self));
};
StrategyView.prototype.layerInit = function() {
	var self = this;

	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);

	self.strategyListLayer = new LSprite();
	self.baseLayer.addChild(self.strategyListLayer);
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
