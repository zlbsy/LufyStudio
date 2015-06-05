function LCityEvent(){}
LCityEvent.SELECT_CITY = "select_city";

function CityController(){
	base(this,MyController,[]);
}
CityController.prototype.construct=function(){
	var self = this;
	//LMvc.keepLoading(true);
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
	//self.load.image(list,self.getSatus);
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
	self.load.helper(["Label"],self.libraryLoad);
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
	"Builds/BuildOfficial","Builds/BuildFarmland","Builds/BuildTavern","Builds/BuildInstitute","Common/HeaderStatus"
	/*,"Common/CharacterList","Common/CharacterListChild","Common/CharacterDetailed"*/],self.init);
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
CityController.prototype.toSelectMap=function(characterName){
	var self = this;
	self.selectCharacterName = characterName;
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
CityController.prototype.loadCharacterList = function(type,buildView){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	self.characterListType = type;
	self.buildView = buildView;
	console.log("CityController.prototype.loadCharacterList self.characterListType",self.characterListType);
	self.loadMvc("CharacterList",self.showCharacterList);
};
CityController.prototype.showCharacterList=function(){
	var self = this;
	console.log("CityController.prototype.showCharacterList self.characterListType",self.characterListType);
	var characterList = new CharacterListController(self.characterListType,self);
	self.view.contentLayer.addChild(characterList.view);
	self.buildView.hideBuild();
};
CityController.prototype.closeCharacterList=function(){
	var self = this;
	self.view.contentLayer.removeChildAt(self.view.contentLayer.numChildren - 1);
	self.buildView.showBuild();
};
CityController.prototype.loadArmList = function(type,buildView){
	var self = this;
	console.log("CityController.prototype.loadArmList run");
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	self.armListType = type;
	self.buildView = buildView;
	self.loadMvc("ArmList",self.showArmList);
};
CityController.prototype.showArmList=function(){
	var self = this;
	var armList = new ArmListController(self.armListType,self);
	self.view.contentLayer.addChild(armList.view);
	self.buildView.hideBuild();
};
CityController.prototype.closeArmList=function(){
	var self = this;
	self.view.contentLayer.removeChildAt(self.view.contentLayer.numChildren - 1);
	self.buildView.showBuild();
};
