function SoldiersView(controller, characterModel, size) {
	var self = this;
	base(self, LView, [controller]);
	self.characterModel = characterModel;
	self.size = size;
	//self.getsoldierListData();
	self.layerInit();
	
	self.setSoldierList();
}
SoldiersView.prototype.setSoldierList = function() {
	var self = this;
	self.soldierListLayer.removeAllChild();
	var soldierList = self.characterModel.soldiers();
	var backLayer = new LSprite();
	var index = 0;
	for (var i = 0, l = soldierList.length; i < l; i++) {
		if(soldierList[i].proficiency() == "D"){
			continue;
		}
		var child = new SoldiersChildView(self.controller, soldierList[i]);
		child.y = 50 * index++;
		backLayer.addChild(child);
	}
	backLayer.graphics.drawRect(0, "#000000", [0, 0, self.size.x, 50 * index]);
	self.soldierListLayer.listLayer = backLayer;
	var left = backLayer.graphics.startX(), right = left + backLayer.graphics.getWidth();
	var sc = new LScrollbar(backLayer, self.size.x, self.size.y, 10);
	//sc._showLayer.graphics.clear();
	self.soldierListLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.soldierClickDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.soldierClickUp.bind(self));
};
SoldiersView.prototype.layerInit = function() {
	var self = this;

	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);

	self.soldierListLayer = new LSprite();
	self.baseLayer.addChild(self.soldierListLayer);
};
SoldiersView.prototype.updateView = function() {
	var self = this;
	self.setsoldierList();
};
SoldiersView.prototype.ctrlLayerInit = function() {
	var self = this;
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP, self.controller.close.bind(self.controller));
};
SoldiersView.prototype.soldierClickDown = function(event) {
	var soldier = event.target;
	soldier.offsetX = event.offsetX;
	soldier.offsetY = event.offsetY;
};
SoldiersView.prototype.soldierClickUp = function(event) {
	if(event.target.constructor.name != "SoldiersChildView"){
		return;
	}
	var soldier = event.target, self = this;
	if (soldier.offsetX && soldier.offsetY && Math.abs(soldier.offsetX - event.offsetX) < 5 && Math.abs(soldier.offsetY - event.offsetY) < 5) {
		self.soldierDetailedDialog(soldier.soldierModel);
	}
};
SoldiersView.prototype.soldierDetailedDialog = function(soldierModel) {
	var self = this;
	var soldierDetailed = new SoldierDetailedView(self.controller,soldierModel,self);
	var obj = {title:soldierModel.name(),subWindow:soldierDetailed,width:400,height:480};
	var windowLayer = ConfirmWindow(obj);
		
	LMvc.layer.addChild(windowLayer);
};

SoldiersView.prototype.statusLayerInit=function(){
	var self = this;
	if(!self.statusLayer){
		return;
	}
	var status = new HeaderStatusView(self.controller);
	self.statusLayer.addChild(status);
};
