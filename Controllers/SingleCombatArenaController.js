function SingleCombatArenaController(){
	base(this,OpenCharacterListController,[]);
	console.log("SingleCombatArenaController");
}
SingleCombatArenaController.prototype.construct=function(){
	var self = this;console.log("SingleCombatArenaController.prototype.construct");
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
SingleCombatArenaController.prototype.init=function(){
	var self = this;console.log("SingleCombatArenaController.prototype.init");
	LMvc.keepLoading(false);
	LMvc.SingleCombatArenaController = self;
	LMvc.TestController.view.visible = false;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};