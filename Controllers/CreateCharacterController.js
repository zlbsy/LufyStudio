function CreateCharacterController(){
	var self = this;
	base(self,MyController,[]);
}
CreateCharacterController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.libraryLoad);
};
CreateCharacterController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["Face/CharacterFace","Face/Component","SgjComboBoxChild"];
	libraris.push("language/chinese/LanguageAll");
	self.load.library(libraris,self.viewLoad);
};
CreateCharacterController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["CreateCharacter/CreateCharacterDetailed"],self.init);
};
CreateCharacterController.prototype.init=function(){
	var self = this;
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
