function SettingGameController(){
	base(this,MyController,[]);
}
SettingGameController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
SettingGameController.prototype.init=function(){
	var self = this;
	self.dispatchEvent(LEvent.COMPLETE);
};