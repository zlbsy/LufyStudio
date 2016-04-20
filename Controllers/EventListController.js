function EventListController(){
	var self = this;
	base(self,MyController,[]);
}
EventListController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
};
EventListController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["EventList"],self.viewLoad);
};
EventListController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["EventList/EventListChild"],self.init);
};
EventListController.prototype.init=function(){
	var self = this;
	LMvc.keepLoading(false);
	LMvc.EventListController = self;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	LMvc.MapController.view.visible = false;
};
EventListController.prototype.close=function(){
	var self = this;
	LMvc.MapController.view.visible = true;
	LMvc.EventListController = null;
	self.view.remove();
};
EventListController.prototype.eventMapLoad=function(){
	var self = this;
	self.loadMvc("EventMap",self.eventMapComplete);
};
EventListController.prototype.eventMapComplete=function(){
	var self = this;
	self.view.visible = false;
	var map = new EventMapController();
	LMvc.layer.addChild(map.view);
};
