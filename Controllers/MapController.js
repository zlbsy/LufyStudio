function MapController(){
	base(this,MyController,[]);
}
MapController.MODE_MAP = "map";
MapController.MODE_CHARACTER_MOVE = "generals_move";
MapController.prototype.construct=function(){
	var self = this;
	self.configLoad();
};
MapController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["characterList","Job","Items"],self.modelLoad);
};
MapController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/Area","Master/Seignior","Master/Character","Master/ItemMaster","Items/Item"],self.libraryLoad);
};
MapController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["language/chinese/Language","SeigniorExecute"];
	self.load.library(libraris,self.viewLoad);
};
MapController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Area/AreaIcon","Common/Background"],self.menuLoad);
};
MapController.prototype.menuLoad=function(){
	var self = this;
	self.loadMvc("Menu",self.getAreaData);
};
MapController.prototype.getAreaData=function(){
	var self = this;
	CharacterModel.setChara(characterList);
	ItemMasterModel.setMaster(ItemDatas);
	
	self.model.getAreaData(self.getImages);
};
MapController.prototype.getImages=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
MapController.prototype.init=function(status){
	var self = this;
	LMvc.MapController = self;
	self.dispatchEvent(LEvent.COMPLETE);
	LMvc.keepLoading(false);
	LMvc.chapterController.view.visible = false;
	LMvc.stageLayer.x = 0;
	//self.view.init();
	
	self.dispatchEvent(LController.NOTIFY);
};
MapController.prototype.returnToChapter=function(event){
	var self = event.currentTarget.parent.parent.controller;
	self.view.remove();
	LMvc.chapterController.view.visible = true;
	delete LMvc.chapterController;
	LMvc.changeLoading(Loading);
	LMvc.keepLoading(false);
};
MapController.prototype.showCity=function(cityId){
	var self = this;
	LMvc.cityId = cityId;
	LMvc.keepLoading(true);
	self.loadMvc("City",self.cityLoadComplete);
};
MapController.prototype.cityLoadComplete=function(){
	var self = this;
	var city = new CityController();
	self.view.parent.addChild(city.view);
};
MapController.prototype.returnToCity=function(cityId){
	var self = this;
	LTweenLite.removeAll();
	LMvc.MapController.view.visible = false;
	LMvc.CityController.view.visible = true;
	if(!cityId){
		return;
	}
	var event = new LEvent(LCityEvent.SELECT_CITY);
    event.cityId = cityId;
    console.log("LMvc.CityController._eventList",LMvc.CityController._eventList);
	LMvc.CityController.dispatchEvent(event);
};