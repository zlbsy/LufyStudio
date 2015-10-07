function SeigniorListController(){
	var self = this;
	base(self,MyController,[]);
}
SeigniorListController.prototype.construct=function(){
	var self = this;
	self.load.view(["SeigniorList/SeigniorListChild"],self.init);
};

SeigniorListController.prototype.init=function(){
	var self = this;
	LMvc.keepLoading(false);
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	LMvc.MapController.view.visible = false;
};
SeigniorListController.prototype.close=function(){
	var self = this;
	LMvc.MapController.view.visible = true;
	self.view.remove();
};
