function ItemListController(){
	var self = this;
	base(self,MyController,[]);
}
ItemListController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.viewLoad);
};
ItemListController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["ItemList/ItemListChild","Equipments/EquipmentDetailed"],self.init);
};
ItemListController.prototype.init=function(){
	var self = this;
	LMvc.keepLoading(false);
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	LMvc.MapController.view.visible = false;
};
ItemListController.prototype.close=function(){
	var self = this;
	LMvc.MapController.view.visible = true;
	self.view.remove();
};
