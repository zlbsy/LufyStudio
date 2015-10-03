function SeigniorListController(){
	var self = this;
	base(self,MyController,[]);
}
SeigniorListController.prototype.construct=function(){
	var self = this;
	self.load.view(["SeigniorList/SeigniorListChild"],self.init);
};

SeigniorListController.prototype.init=function(status){
	var self = this;
	LMvc.keepLoading(false);
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
};
