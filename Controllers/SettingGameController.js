function SettingGameController(){
	base(this,MyController,[]);
}
SettingGameController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.libraryLoad);
};
SettingGameController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["language/chinese/LanguageAll"];
	self.load.library(libraris,self.init);
};
SettingGameController.prototype.init=function(){
	var self = this;
	self.dispatchEvent(LEvent.COMPLETE);
};