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
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	LMvc.MapController.view.visible = false;
};
EventListController.prototype.close=function(){
	var self = this;
	LMvc.MapController.view.visible = true;
	self.view.remove();
};
