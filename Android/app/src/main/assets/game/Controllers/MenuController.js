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
MenuController.prototype.loadEventList=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.loadMvc("EventList",self.showEventList);
};
MenuController.prototype.showEventList=function(){
	var self = this;
	var eventListController = new EventListController();
	LMvc.layer.addChild(eventListController.view);
};
MenuController.prototype.loadItemList=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.loadMvc("ItemList",self.showItemList);
};
MenuController.prototype.showItemList=function(){
	var self = this;
	var itemListController = new ItemListController();
	LMvc.layer.addChild(itemListController.view);
};
MenuController.prototype.loadDictionary=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.load.view(["Dictionary/Dictionary","Dictionary/DictionaryChild"],self.loadDictionaryConfig);
};
MenuController.prototype.loadDictionaryConfig=function(){
	var self = this;
	self.load.config(["Dictionary"],self.loadDictionaryLibrary);
};
MenuController.prototype.loadDictionaryLibrary=function(){
	var self = this;
	var libraris = [String.format("language/{0}/LanguageDictionary",LPlugin.language())];
	self.load.library(libraris,self.showDictionary);
};
MenuController.prototype.showDictionary=function(){
	var self = this;
	LMvc.keepLoading(false);
	self.view.showDictionary();
};