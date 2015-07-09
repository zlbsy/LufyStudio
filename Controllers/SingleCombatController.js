function SingleCombatController(fromacontroller, currentCharacterId, targetCharacterId){
	var self = this;
	base(self,MyController,[]);
	self.fromacontroller = fromacontroller;
	self.currentCharacterId = currentCharacterId;
	self.targetCharacterId = targetCharacterId;
}
SingleCombatController.prototype.construct=function(){
	var self = this;
	LMvc.keepLoading(true);
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
};
SingleCombatController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Character","SingleCombat"],self.helperLoad);
};
SingleCombatController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["SingleCombatHelper"],self.libraryLoad);
};
SingleCombatController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["Face"];
	self.load.library(libraris,self.viewLoad);
};
SingleCombatController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["SingleCombat/SingleCombatTalk","SingleCombat/SingleCombatCharacter","Common/StatusBar","Common/Character","Battle/BattleCharacter","Common/SpecialEffect"],self.init);
};
SingleCombatController.prototype.init = function(){
	var self = this;
	LMvc.keepLoading(false);
	LMvc.SingleCombatController = self;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};