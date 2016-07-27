function CreateSettingController(){
	var self = this;
	base(self,MyController,[]);
}
CreateSettingController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list, self.configLoad1);
};
CreateSettingController.prototype.configLoad1=function(){
	var self = this;
	self.load.config(["Soldiers","Strategy"], self.configLoad2);
};
CreateSettingController.prototype.configLoad2=function(){
	var self = this;
	self.load.config(["Character","Skills","characterList"], self.libraryLoad);
};
CreateSettingController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["Face","SgjComboBoxChild"];
	libraris.push(String.format("language/{0}/LanguageAll",LPlugin.language()));
	self.load.library(libraris, self.modelLoad);
};
CreateSettingController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/SoldierMaster","Master/Soldier","Master/SkillMaster","Master/Character"],self.viewLoad);
};
CreateSettingController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["CreateSetting/CreateSeigniorListChild", 
	"CreateSetting/CreateSettingCharacterList", 
	"CreateSetting/CreateSettingCharacterListChild", 
	"CreateSetting/CreateCityCharacterListChild", 
	"CreateSetting/CreateSeigniorFace", 
	"CreateSetting/SelectSeigniorColor", 
	"CreateSetting/SelectSeigniorColorChild", 
	"CreateSetting/SelectSeigniorCityChild", 
	"CreateSetting/CreateSeigniorCityDetailed", 
	"CreateSetting/CreateSeigniorDetailed"], self.getAreaData);
};
CreateSettingController.prototype.getAreaData=function(){
	var self = this;
	self.model.getAreaData(self.init);
};
CreateSettingController.prototype.init=function(){
	var self = this;
	SoldierMasterModel.setMaster(SoldierDatas);
	CharacterModel.setChara(characterListConfig);
	SkillMasterModel.setMaster(SkillsData);
	
	LMvc.keepLoading(false);
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	LMvc.chapterController.view.visible = false;
};
CreateSettingController.prototype.close=function(){
	var self = this;
	LMvc.chapterController.view.visible = true;
	self.view.remove();
};