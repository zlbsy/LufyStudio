function CharacterListController(characterListType,fromController, characterList){
	var self = this;
	self.characterListType = characterListType;
	self.fromController = fromController;
	self.characterList = characterList;
	base(self,MyController,[]);
}
CharacterListController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
};
CharacterListController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Equipment","Arms","Belong","Position","Soldiers","Strategy"],self.helperLoad);
};
CharacterListController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["JobHelper"],self.modelLoad);
};
CharacterListController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Items/Item","Master/SoldierMaster","Master/Soldier","Master/StrategyMaster","Master/Strategy"],self.viewLoad);
};
CharacterListController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["CharacterList/CharacterListChild","CharacterList/CharacterDetailed","CharacterList/CharacterExpedition",
	"Equipments/Equipments","Equipments/EquipmentsChild","Equipments/EquipmentDetailed","Common/StatusBar",
	"Soldiers/Soldiers","Soldiers/SoldiersChild","Soldiers/SoldierDetailed",
	"Strategy/Strategy","Strategy/StrategyChild","Strategy/StrategyDetailed"],self.init);
};
CharacterListController.prototype.init=function(status){
	var self = this;
	StrategyMasterModel.setMaster(StrategyDatas);
	SoldierMasterModel.setMaster(SoldierDatas);
	LMvc.keepLoading(false);
	var cityData = AreaModel.getArea(LMvc.cityId);
	self.setValue("cityData",cityData);
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};
CharacterListController.prototype.closeCharacterDetailed=function(){
	this.view.showCharacterList();
};
CharacterListController.prototype.closeCharacterList=function(obj){
	this.fromController.closeCharacterList(obj);
};
CharacterListController.prototype.toSelectMap=function(characterName){
	this.fromController.toSelectMap(characterName);
};




CharacterListController.prototype.equipmentsShow=function(character_id){
	var self = this;
	self.character_id = character_id;
	LMvc.changeLoading(TranslucentLoading);
	LMvc.keepLoading(true);
	//self.view.visible = false;
	self.loadMvc("Equipments",self.equipmentsLoadComplete);
};
CharacterListController.prototype.equipmentsLoadComplete=function(){
	var self = this;
	var equipments = new EquipmentsController(self);
	self.view.parent.addChild(equipments.view);
};