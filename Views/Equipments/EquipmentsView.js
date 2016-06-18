function EquipmentsView(controller, equipmentListType, size) {
	var self = this;
	base(self, LView, [controller]);
	self.equipmentListType = equipmentListType;
	self.size = size;
}
EquipmentsView.prototype.getEquipmentList = function() {
	var self = this;
	var cityData = LMvc.CityController.getValue("cityData");
	var equipmentList = cityData.equipments();
	equipmentList = equipmentList.sort(function(a, b){
		var v = b.rarity() - a.rarity();
		if(v != 0){
			return v;
		}
		return b.id() - a.id();
	});
	return equipmentList;
};
EquipmentsView.prototype.updateItems = function(equipmentList) {
	var self = this;
	var items = self.listView.getItems();
	while(items.length > equipmentList.length){
		self.listView.deleteChildView(items[items.length - 1]);
	}
	for(var i=0,l=equipmentList.length;i<l;i++){
		var item;
		if(i < items.length){
			item = items[i];
		}else{
			item = new EquipmentsChildView(equipmentList[i], self.size.x);
			self.listView.insertChildView(item);
		}
		item.itemModel = equipmentList[i];
		item.cacheAsBitmap(false);
		if(!self.listView.isInClipping(i)){
			continue;
		}
		item.set();
		item.updateView();
	}
};
EquipmentsView.prototype.setEquipmentList = function() {
	var self = this;
	var equipmentList = self.getEquipmentList();
	if(self.listView){
		self.updateItems(equipmentList);
		return;
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
