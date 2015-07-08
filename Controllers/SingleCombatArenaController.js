function SingleCombatArenaController(){
	base(this,OpenCharacterListController,[]);
}
SingleCombatArenaController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
SingleCombatArenaController.prototype.init=function(){
	var self = this;
	LMvc.keepLoading(false);
	LMvc.SingleCombatArenaController = self;
	LMvc.TestController.view.visible = false;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};