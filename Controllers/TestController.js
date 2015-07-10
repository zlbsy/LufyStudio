function TestController(){
	base(this,MyController,[]);
}
TestController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.baseControllersLoad);
};
TestController.prototype.baseControllersLoad=function(){
	var self = this;
	self.load.controller(["OpenCharacterList"],self.mvcLoad);
};
TestController.prototype.mvcLoad=function(){
	var self = this;
	self.loadMvc(["BattleSelectMenu","SingleCombat","CharacterList"],self.configLoad);
};
TestController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Character","characterList","Belong","Job","Event"],self.configLoad2);
};
TestController.prototype.configLoad2=function(){
	var self = this;
	self.load.config(["Soldiers","Strategy","Arms","CharacterListType","ArmListType","BattleMap"],self.libraryLoad);
};
TestController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["BitmapSprite","Face","language/chinese/Language"];
	self.load.library(libraris,self.modelLoad);
};
TestController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/Character","Master/SoldierMaster","Master/Soldier","Master/StrategyMaster","Master/Strategy"],self.viewLoad);
};
TestController.prototype.viewLoad=function(){
	var self = this;
	CharacterModel.setChara(characterList);
	SoldierMasterModel.setMaster(SoldierDatas);
	StrategyMasterModel.setMaster(StrategyDatas);
	self.load.view(["Battle/BattleCharacterStatus","Strategy/Strategy","Strategy/StrategyChild","Strategy/StrategyDetailed","Battle/BattleMainMenu","SingleCombat/SingleCombatTalk","Battle/BattleBout"],self.init);
};
TestController.prototype.getChapterData=function(){
	var self = this;
	self.model.getChapterData(self.init);
};
TestController.prototype.init=function(){
	var self = this;
	
	LMvc.TestController = self;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	
	LMvc.keepLoading(false);
};

TestController.prototype.showSingleCombatArena=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.loadMvc("SingleCombatArena",self.singleCombatArenaLoadComplete);
};
TestController.prototype.singleCombatArenaLoadComplete=function(){
	var self = this;
	var singleCombatArena = new SingleCombatArenaController();
	self.view.parent.addChild(singleCombatArena.view);
};