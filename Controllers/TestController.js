function TestController(chapterSelectData){
	base(this,MyController,[]);
}
TestController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
};
TestController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Character","characterList","Soldiers","Strategy"],self.libraryLoad);
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
	self.load.view(["Battle/BattleCharacterStatus","Strategy/Strategy","Strategy/StrategyChild","Strategy/StrategyDetailed"],self.init);
};
TestController.prototype.getChapterData=function(){
	var self = this;
	self.model.getChapterData(self.init);
};
TestController.prototype.init=function(){
	var self = this;
	
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	
	LMvc.keepLoading(false);
};
