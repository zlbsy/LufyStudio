function CityController(){
	base(this,OpenCharacterListController,[]);
}
CityController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
};
CityController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Arms","Belong","CharacterListType","ArmListType"],self.modelLoad);
};
CityController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/Character"],self.helperLoad);
};
CityController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Label","Troops"],self.libraryLoad);
};
CityController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["Face","Toast"];
	libraris.push("language/chinese/Language");
	self.load.library(libraris,self.viewLoad);
};
CityController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Builds/Build","Builds/BuildBase","Builds/BuildMarket","Builds/BuildBarrack","Builds/BuildCitygate",
	"Builds/BuildOfficial","Builds/BuildFarmland","Builds/BuildTavern","Builds/BuildInstitute","Common/HeaderStatus"],self.init);
};
CityController.prototype.init=function(){
	var self = this;
	
	var cityData = AreaModel.getArea(LMvc.cityId);
	self.setValue("cityData",cityData);
	
	LMvc.keepLoading(false);
	LMvc.CityController = self;
	LMvc.MapController.view.visible = false;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};
CityController.prototype.gotoMap=function(){
	var self = this;
	self.view.remove();
	LMvc.CityController = null;
	LMvc.MapController.view.visible = true;
};
CityController.prototype.toSelectMap=function(eventType){
	var self = this;
	self.eventType = eventType;
	self.view.visible = false;
	LMvc.MapController.view.visible = true;
	var cityData = self.getValue("cityData");
	var neighbor = cityData.neighbor();
	LMvc.MapController.view.areaLayer.childList.forEach(function(child){
		if(neighbor.indexOf(child.areaStatus.id()) >= 0){
			LTweenLite.to(child,1,{alpha:0.5,loop:true})
    		.to(child,1,{alpha:1});
		}
	});
};
CityController.prototype.gotoBattle=function(){
	var self = this;
	LMvc.CityController = null;
	LMvc.keepLoading(true);
	self.loadMvc("Battle",self.battleLoadComplete);
};
CityController.prototype.battleLoadComplete=function(){
	var self = this;
	var battleData = self.getValue("battleData");
	var battle = new BattleController(battleData, self);
	self.view.parent.addChild(battle);
};