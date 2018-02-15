function HistoryListController(){
	var self = this;
	base(self,OpenCharacterListController,[]);
}
HistoryListController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
};
HistoryListController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Arms","CharacterListType","ArmListType","BattleMap","BattleWeather","Terrain","Skills","HistoryList"],self.eventMapLoad);
};
HistoryListController.prototype.eventMapLoad=function(){
	var self = this;
	self.loadMvc("EventMap",self.libraryLoad);
};
HistoryListController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["Face","Toast"];
	self.load.library(libraris,self.viewLoad);
};
HistoryListController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["HistoryList/HistoryListChild","HistoryList/HistoryListDetailed","HistoryList/HistoryListSelectChild","HistoryList/HistoryListSubChild","HistoryList/HistoryListPayChild"],self.init);
};
HistoryListController.prototype.init=function(){
	var self = this;
	LMvc.keepLoading(false);
	LMvc.HistoryListController = self;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	LMvc.MapController.view.visible = false;
};
HistoryListController.prototype.close=function(){
	var self = this;
	LMvc.MapController.view.visible = true;
	LMvc.HistoryListController = null;
	self.view.remove();
};
HistoryListController.prototype.gotoBattle=function(){
	var self = this;
	LPlugin.playSE("Se_goto_battle", LPlugin.gameSetting.SE);
	LMvc.keepLoading(true);
	self.loadMvc("Battle",self.battleLoadComplete);
};
HistoryListController.prototype.battleLoadComplete=function(){
	var self = this;
	var script = "";
	var battleData = self.getValue("battleData");
	var path = String.format("Data/Event/{0}/history/start_{1}.txt",LPlugin.language(),battleData.historyId);
	script += "SGJEvent.init();";
	script += "Load.script("+path+");";
	//script += "SGJEvent.end();";
	LGlobal.script.addScript(script);
	//LGlobal.script.analysis();
};
HistoryListController.prototype.battleStart=function(){
	var self = this;
	var battleData = self.getValue("battleData");
	var battle = new BattleController(battleData, LMvc.MapController);
	self.clearValue();
	LMvc.HistoryListController = null;
	self.view.remove();
};
