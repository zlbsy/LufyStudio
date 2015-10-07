function MenuController(){
	base(this,MyController,[]);
}
MenuController.instance = function(){
	if(!MenuController._instance){
		MenuController._instance = new MenuController();
		LMvc.MapController.view.parent.addChild(MenuController._instance.view);
		MenuController._instance.dispatchEvent(LEvent.COMPLETE);
	}
	return MenuController._instance;
};
MenuController.prototype.construct=function(){
	var self = this;
};
MenuController.prototype.show=function(){
	var self = this;
	var parent = self.view.parent;
	parent.setChildIndex(self.view,parent.numChildren - 1);
	self.view.visible = true;
};
MenuController.prototype.hide=function(){
	var self = this;
	self.view.visible = false;
};
MenuController.prototype.loadSeigniorList=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.loadMvc("SeigniorList",self.showSeigniorList);
};
MenuController.prototype.showSeigniorList=function(){
	var self = this;
	var seigniorList = new SeigniorListController();
	LMvc.layer.addChild(seigniorList.view);
};