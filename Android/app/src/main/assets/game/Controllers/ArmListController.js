function ArmListController(armListType,fromController){
	var self = this;
	self.armListType = armListType;
	self.fromController = fromController;
	base(self,OpenCharacterListController,[]);
}
ArmListController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
};
ArmListController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Equipment","Arms","ArmListType","Belong","Position","Soldiers","Strategy"],self.modelLoad);
};

ArmListController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/SoldierMaster","Master/Soldier"],self.viewLoad);
};
ArmListController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["ArmList/ArmListChild","ArmList/ArmDetailed",
	"Soldiers/Soldiers","Soldiers/SoldiersChild","Soldiers/SoldierDetailed"],self.init);
};
ArmListController.prototype.init=function(status){
	var self = this;
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


