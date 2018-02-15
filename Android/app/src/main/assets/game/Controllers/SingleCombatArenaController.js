function SingleCombatArenaController(fromController){
	var self = this;
	base(self,OpenCharacterListController,[]);
	self.fromController = fromController;
}
SingleCombatArenaController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
};
SingleCombatArenaController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["CharacterListType","Job","Character","BattleMap"],self.configLoad2);
};
SingleCombatArenaController.prototype.configLoad2=function(){
	var self = this;
	self.load.config(["MapSetting","HistoryList","characterList"],self.libraryLoad);
};
SingleCombatArenaController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["BitmapSprite","Face","SeigniorExecute",String.format("language/{0}/LanguageAll",LPlugin.language())];
	self.load.library(libraris,self.modelLoad);
};
SingleCombatArenaController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/Character"],self.mvcLoad);
};
SingleCombatArenaController.prototype.mvcLoad=function(){
	var self = this;
	self.loadMvc(["SingleCombat","CharacterList"],self.init);
};
SingleCombatArenaController.prototype.init=function(){
	var self = this;
	CharacterModel.setChara(characterListConfig);
	LMvc.keepLoading(false);
	LMvc.SingleCombatArenaController = self;
	self.fromController.view.visible = false;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};
SingleCombatArenaController.prototype.closeSelf=function(){
	var self = this;
	self.fromController.view.visible = true;
	self.fromController = null;
	LMvc.SingleCombatArenaController = null;
	self.view.remove();
};