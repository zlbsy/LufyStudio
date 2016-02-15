function CreateCharacterController(){
	var self = this;
	base(self,MyController,[]);
}
CreateCharacterController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list, self.configLoad1);
};
CreateCharacterController.prototype.configLoad1=function(){
	var self = this;
	self.load.config(["Soldiers","Strategy"], self.configLoad2);
};
CreateCharacterController.prototype.configLoad2=function(){
	var self = this;
	self.load.config(["Character","Skills","characterList"], self.libraryLoad);
};
CreateCharacterController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["Face/CharacterFace","Face/Component","SgjComboBoxChild", "GameManager"];
	libraris.push("language/chinese/LanguageAll");
	self.load.library(libraris, self.modelLoad);
};
CreateCharacterController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/SoldierMaster","Master/Soldier","Master/SkillMaster","Master/Character"],self.viewLoad);
};
CreateCharacterController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["CreateCharacter/CreateCharacterDetailed", 
	"CreateCharacter/CreateCharacterListChild", 
	"CreateCharacter/CreateCharacterFace", 
	"CreateCharacter/CreateCharacterBasic", 
	"CreateCharacter/CreateCharacterBasicItem", 
	"CreateCharacter/CreateCharacterAbility", 
	"CreateCharacter/CreateCharacterAbilityItem", 
	"CreateCharacter/CreateCharacterArm", 
	"CreateCharacter/CreateCharacterArmItem"], self.init);
};
CreateCharacterController.prototype.init=function(){
	var self = this;
	SoldierMasterModel.setMaster(SoldierDatas);
	CharacterModel.setChara(characterList);
	SkillMasterModel.setMaster(SkillsData);
	
	LMvc.keepLoading(false);
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	LMvc.logoStage.visible = false;
};
CreateCharacterController.prototype.close=function(){
	var self = this;
	LMvc.logoStage.visible = true;
	self.view.remove();
};
