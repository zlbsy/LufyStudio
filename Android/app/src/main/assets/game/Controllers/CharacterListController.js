function CharacterListController(characterListType, fromController,  characterList, params){
	var self = this;
	self.set(characterListType, fromController,  characterList, params);
	base(self,MyController,[]);
}
CharacterListController.instance = function(characterListType, fromController,  characterList, params){
	if(!CharacterListController._instance){
		CharacterListController._instance = new CharacterListController(characterListType, fromController,  characterList, params);
	}else{
		CharacterListController._instance.set(characterListType, fromController,  characterList, params);
		CharacterListController._instance.init();
	}
	return CharacterListController._instance;
};
CharacterListController.prototype.set=function(characterListType, fromController,  characterList, params){
	var self = this;
	self.characterListType = characterListType;
	self.fromController = fromController;
	self.characterList = characterList;
	self.params = params;
};
CharacterListController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
};
CharacterListController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["CharacterListType","Skills","Equipment","Arms","Belong","Position","Soldiers","Strategy","Terrain"],self.libraryLoad);
};
CharacterListController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["Face","Toast"];
	self.load.library(libraris,self.helperLoad);
};
CharacterListController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["JobHelper"],self.modelLoad);
};
CharacterListController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/SkillMaster","Items/Item","Master/SoldierMaster","Master/Soldier","Master/StrategyMaster","Master/Strategy","Master/TerrainMaster"],self.viewLoad);
};
CharacterListController.prototype.viewLoad=function(){
	var self = this;
	TerrainMasterModel.setMaster(TerrainConfig);
	StrategyMasterModel.setMaster(StrategyDatas);
	SoldierMasterModel.setMaster(SoldierDatas);
	SkillMasterModel.setMaster(SkillsData);
	self.load.view(["CharacterList/CharacterListChild","CharacterList/CharacterDetailed","CharacterList/CharacterExpedition",
	"CharacterList/CharacterDetailedTabStatus","CharacterList/CharacterDetailedTabProperties","CharacterList/CharacterDetailedFace","CharacterList/CharacterDetailedTabEquipment",
	"Equipments/Equipments","Equipments/EquipmentsChild","Equipments/EquipmentDetailed","Common/StatusBar",
	"Soldiers/Soldiers","Soldiers/SoldiersChild","Soldiers/SoldierDetailed",
	"Items/Items","Items/ItemsChild","Items/ItemDetailed",
	"Strategy/Strategy","Strategy/StrategyChild","Strategy/StrategyDetailed"],self.init);
};
CharacterListController.prototype.init=function(status){
	var self = this;
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