function TournamentsController(){
	var self = this;
	base(self,OpenCharacterListController,[]);
}
TournamentsController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.mvcLoad);
};
TournamentsController.prototype.mvcLoad=function(){
	var self = this;
	self.loadMvc(["SingleCombat","CharacterList"],self.viewLoad);
};
TournamentsController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Tournaments/TournamentsConfirm"],self.init);
};
TournamentsController.prototype.init=function(){
	var self = this;
	LMvc.keepLoading(false);
	LMvc.TournamentsController = self;
	LMvc.MapController.view.visible = false;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};
TournamentsController.prototype.closeSelf=function(){
	var self = this;
	LMvc.MapController.view.visible = true;
	LMvc.TournamentsController = null;
	self.view.remove();
};