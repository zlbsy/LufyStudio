function SingleCombatController(){
	base(this,MyController,[]);
}
SingleCombatController.prototype.construct=function(){
	var self = this;
	LMvc.keepLoading(true);
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
SingleCombatController.prototype.init = function(){
	var self = this;
	LMvc.keepLoading(false);
	LMvc.SingleCombatController = self;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};