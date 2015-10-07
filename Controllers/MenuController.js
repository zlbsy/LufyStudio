function MenuController(){
	base(this,MyController,[]);
}
MenuController.instance = function(){
	if(!MenuController._instance){
		MenuController._instance = new MenuController();
		LMvc.MapController.view.parent.addChild(MenuController._instance.view);
		MenuController._instance.dispatchEvent(LEvent.COMPLETE);
	}
	return MenuController._instance;
};
MenuController.prototype.construct=function(){
	var self = this;
};
MenuController.prototype.show=function(){
	var self = this;
	var parent = self.view.parent;
	parent.setChildIndex(self.view,parent.numChildren - 1);
	self.view.visible = true;
};
MenuController.prototype.hide=function(){
	var self = this;
	self.view.visible = false;
};
MenuController.prototype.loadSeigniorList=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.loadMvc("SeigniorList",self.showSeigniorList);
};
MenuController.prototype.showSeigniorList=function(){
	var self = this;
	var seigniorList = new SeigniorListController();
	LMvc.layer.addChild(seigniorList.view);
};
MenuController.prototype.loadEventList=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.loadMvc("EventList",self.showEventList);
};
MenuController.prototype.showEventList=function(){
	var self = this;
	var eventListController = new EventListController();
	LMvc.layer.addChild(eventListController.view);
};
MenuController.prototype.loadItemList=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.loadMvc("ItemList",self.showItemList);
};
MenuController.prototype.showItemList=function(){
	var self = this;
	var itemListController = new ItemListController();
	LMvc.layer.addChild(itemListController.view);
};