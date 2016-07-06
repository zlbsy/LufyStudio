function TournamentsController(){
	var self = this;
	base(self,OpenCharacterListController,[]);
}
TournamentsController.prototype.construct=function(){
	var self = this;
	self.init();
};
TournamentsController.prototype.init=function(){
	var self = this;
	LMvc.keepLoading(false);
	LMvc.MapController.view.visible = false;
	LMvc.TournamentsController = self;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};
TournamentsController.prototype.closeSelf=function(){
	var self = this;
	LMvc.TournamentsController = null;
	self.view.remove();
	LMvc.MapController.view.visible = true;
};