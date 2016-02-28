function EquipmentsView(controller, equipmentListType, size) {
	var self = this;
	base(self, LView, [controller]);
	self.equipmentListType = equipmentListType;
	self.size = size;
	//self.getEquipmentListData();
	self.layerInit();
	
	self.setEquipmentList();
}
EquipmentsView.prototype.getEquipmentListData = function() {
	var self = this;
	var cityData = LMvc.CityController.getValue("cityData");
	self.equipmentList = cityData.equipments();
};
EquipmentsView.prototype.isSameList = function(equipmentList) {
	var self = this;
	var items = self.listView.getItems();
	if(equipmentList.length != items.length){
		return false;
	}
	for(var i=0,l=items.length;i<l;i++){
		if(items[i].itemModel.id() != equipmentList[i].id()){
			return false;
		}
	}
	return true;
};
EquipmentsView.prototype.updateItems = function(equipmentList) {
	var self = this;
	var items = self.listView.getItems();
	for(var i=0,l=items.length;i<l;i++){
		items[i].itemModel = equipmentList[i];
		items[i].cacheAsBitmap(false);
		items[i].set();
		items[i].updateView();
		items[i].cacheAsBitmap(true);
	}
};
EquipmentsView.prototype.setEquipmentList = function() {
	var self = this;
	var cityData = LMvc.CityController.getValue("cityData");
	var equipmentList = cityData.equipments();
	if(self.listView){
		if(self.isSameList(equipmentList)){
			self.updateItems(equipmentList);
			return;
		}else{
			self.listView.remove();
		}
	}
	self.listView = new LListView();
	self.listView.resize(self.size.x, self.size.y);
	self.listView.cellWidth = self.size.x;
	self.listView.cellHeight = 50;
	self.addChild(self.listView);
	var items = [];
	for (var i = 0, l = equipmentList.length; i < l; i++) {
		var child = new EquipmentsChildView(equipmentList[i], self.size.x);
		items.push(child);
	}
	self.listView.updateList(items);
};
EquipmentsView.prototype.updateView = function() {
	this.setEquipmentList();
};
EquipmentsView.prototype.set = function() {
	var self = this;
	self.layerInit();
	self.ctrlLayerInit();
	self.statusLayerInit();
};
EquipmentsView.prototype.layerInit = function() {
	var self = this;

	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);

	self.equipmentListLayer = new LSprite();
	self.baseLayer.addChild(self.equipmentListLayer);
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
EquipmentsView.prototype.equipmentDetailedDialog = function(itemModel) {
	var self = this;
	var equipmentDetailed = new EquipmentDetailedView(self.controller,itemModel,self);
	equipmentDetailed.addEventListener(EquipmentEvent.Dress, self.equipmentDress);
	LMvc.layer.addChild(equipmentDetailed);
};
EquipmentsView.prototype.equipmentDress = function(event) {
	var equipmentDetailed = LMvc.layer.getChildAt(LMvc.layer.numChildren - 1);
	var self = equipmentDetailed.fromView;
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
