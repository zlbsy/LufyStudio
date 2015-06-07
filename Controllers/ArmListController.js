function ArmListController(armListType,fromController){
	var self = this;
	self.armListType = armListType;
	self.fromController = fromController;
	base(self,MyController,[]);
}
ArmListController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
};
ArmListController.prototype.configLoad=function(){
	var self = this;
	console.log("ArmListController.prototype.configLoad run");
	self.load.config(["Equipment","Arms","ArmListType","Belong","Position","Soldiers","Strategy"],self.modelLoad);
};

ArmListController.prototype.modelLoad=function(){
	var self = this;
	console.log("ArmListController.prototype.modelLoad run");
	self.load.model(["Master/SoldierMaster","Master/Soldier"],self.viewLoad);
};
ArmListController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["ArmList/ArmListChild","ArmList/ArmDetailed",
	"Soldiers/Soldiers","Soldiers/SoldiersChild","Soldiers/SoldierDetailed"],self.init);
};
ArmListController.prototype.init=function(status){
	var self = this;
	console.log("ArmListController.prototype.init run");
	SoldierMasterModel.setMaster(SoldierDatas);
	LMvc.keepLoading(false);
	var cityData = AreaModel.getArea(LMvc.cityId);
	self.setValue("cityData",cityData);
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};
ArmListController.prototype.closeArmDetailed=function(){
	this.view.showCharacterList();
};
ArmListController.prototype.closeArmList=function(){
	this.fromController.closeArmList();
};
ArmListController.prototype.loadCharacterList = function(type){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	self.characterListType = type;
	self.loadMvc("CharacterList",self.showCharacterList);
};
ArmListController.prototype.showCharacterList=function(){
	var self = this;
	var characterList = new CharacterListController(self.characterListType,self);
	self.view.characterListLayer.addChild(characterList.view);
	self.dispatchEvent(CharacterListEvent.SHOW);
};
ArmListController.prototype.closeCharacterList=function(){
	this.dispatchEvent(CharacterListEvent.CLOSE);
};


