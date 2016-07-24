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
	if(SeigniorModel.list[0].chara_id() != LMvc.selectSeignorId){
		var selectIndex = SeigniorModel.list.findIndex(function(child){
			return child.chara_id() == LMvc.selectSeignorId;
		});
		var deleteModels = SeigniorModel.list.splice(selectIndex, 1);
		SeigniorModel.list.unshift(deleteModels[0]);
	}
	self.setValue("selectSeignor", SeigniorModel.getSeignior(LMvc.selectSeignorId));
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
