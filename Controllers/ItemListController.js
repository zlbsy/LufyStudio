function ItemListController(){
	var self = this;
	base(self,MyController,[]);
}
ItemListController.prototype.construct=function(){
	var self = this;
	self.load.view(["ItemList/ItemListChild"],self.init);
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
