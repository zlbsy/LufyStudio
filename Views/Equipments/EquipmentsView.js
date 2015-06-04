function EquipmentsView(controller, equipmentListType, size) {
	var self = this;
	base(self, LView, [controller]);
	self.equipmentListType = equipmentListType;
	self.size = size;
	self.getEquipmentListData();
	self.layerInit();
	
	self.setEquipmentList();
}
EquipmentsView.prototype.getEquipmentListData = function() {
	var self = this;
	var cityData = LMvc.CityController.getValue("cityData");
	self.equipmentList = cityData.equipments();
};
EquipmentsView.prototype.setEquipmentList = function() {
	var self = this;
	self.equipmentListLayer.removeAllChild();
	var equipmentList = self.equipmentList;
	var backLayer = new LSprite();
	for (var i = 0, l = equipmentList.length; i < l; i++) {
		var child = new EquipmentsChildView(self.controller, equipmentList[i]);
		//child.x = 110 * (i % 4);
		//child.y = 110 * (i / 4 >>> 0);
		child.y = 50 * i;
		backLayer.addChild(child);
	}
	backLayer.graphics.drawRect(0, "#000000", [0, 0, self.size.x, 50 * equipmentList.length]);
	self.equipmentListLayer.listLayer = backLayer;
	var left = backLayer.graphics.startX(), right = left + backLayer.graphics.getWidth();
	var sc = new LScrollbar(backLayer, self.size.x, self.size.y, 10);
	//sc._showLayer.graphics.clear();
	self.equipmentListLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.equipmentClickDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.equipmentClickUp.bind(self));
};
EquipmentsView.prototype.set = function() {
	var self = this;
	self.layerInit();
	self.ctrlLayerInit();
	self.statusLayerInit();
};
EquipmentsView.prototype.layerInit = function() {
	var self = this;
	/*
	var bitmapData = new LBitmapData(LMvc.datalist["translucent"]);
	var panel = new LPanel(bitmapData,LGlobal.width, LGlobal.height);
	self.addChild(getBitmap(panel));*/

	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);

	self.equipmentListLayer = new LSprite();
	self.baseLayer.addChild(self.equipmentListLayer);
	/*
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	if(self.controller.fromController.constructor.name == "CharacterListController"){
		return;
	}
	self.statusLayer = new LSprite();
	self.addChild(self.statusLayer);*/
};
EquipmentsView.prototype.updateView = function() {
	var self = this;
	self.setEquipmentList();
};
EquipmentsView.prototype.ctrlLayerInit = function() {
	var self = this;
	var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	returnButton.addEventListener(LMouseEvent.MOUSE_UP, self.controller.close.bind(self.controller));
};
EquipmentsView.prototype.equipmentClickDown = function(event) {
	var item = event.target;
	item.offsetX = event.offsetX;
	item.offsetY = event.offsetY;
};
EquipmentsView.prototype.equipmentClickUp = function(event) {
	if(event.target.constructor.name != "EquipmentsChildView"){
		return;
	}
	var equipment = event.target, self = this;
	if (equipment.offsetX && equipment.offsetY && Math.abs(equipment.offsetX - event.offsetX) < 5 && Math.abs(equipment.offsetY - event.offsetY) < 5) {
		self.equipmentDetailedDialog(equipment.itemModel);
	}
};
EquipmentsView.prototype.equipmentDetailedDialog = function(itemModel) {
	var self = this;
	var equipmentDetailed = new EquipmentDetailedView(self.controller,itemModel,self);
	equipmentDetailed.addEventListener(EquipmentEvent.Dress, self.equipmentDress);
	LMvc.layer.addChild(equipmentDetailed);
};
EquipmentsView.prototype.equipmentDress = function(event) {
	var equipmentDetailed = LMvc.layer.getChildAt(LMvc.layer.numChildren - 1);
	console.log("equipmentDress equipmentDetailed",equipmentDetailed);
	var self = equipmentDetailed.fromView;
	console.log("equipmentDress self",self);
	var selectItemModel = equipmentDetailed.itemModel;
	equipmentDetailed.close();
	var e = new LEvent(EquipmentEvent.Dress);
	e.selectItemModel = selectItemModel;
	self.dispatchEvent(e);
};
EquipmentsView.prototype.statusLayerInit=function(){
	var self = this;
	if(!self.statusLayer){
		return;
	}
	var status = new HeaderStatusView(self.controller);
	self.statusLayer.addChild(status);
};
