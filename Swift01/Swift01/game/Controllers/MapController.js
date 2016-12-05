function MapController(){
	var self = this;
	base(self,OpenCharacterListController,[]);
}
MapController.MODE_MAP = "map";
MapController.MODE_CHARACTER_MOVE = "generals_move";
MapController.prototype.construct=function(){
	var self = this;
	self.configLoad();
};
MapController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Character","CharacterListType","characterList","Job","Items","Event","Strategy","Soldiers","Reputation","Military"],self.helperLoad);
};
MapController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Talk","CommonHelper","EventListHelper"],self.modelLoad);
};
MapController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/Area","Master/SoldierMaster","Master/Soldier","Master/Seignior","Master/Character","Master/ItemMaster","Items/Item","Master/StrategyMaster","Master/Strategy","Master/Reputation","Master/Military"],self.libraryLoad);
};
MapController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = [String.format("language/{0}/LanguageAll",LPlugin.language()),"SeigniorExecute","SgjComboBoxChild"];
	self.load.library(libraris,self.viewLoad);
};
MapController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Area/AreaIcon","Common/Background","Common/BattleMark"],self.menuLoad);
};
MapController.prototype.menuLoad=function(){
	var self = this;
	self.loadMvc("Menu",self.getAreaData);
};
MapController.prototype.getAreaData=function(){
	var self = this;
	SoldierMasterModel.setMaster(SoldierDatas);
	CharacterModel.setChara(characterListConfig);
	ItemMasterModel.setMaster(ItemDatas);
	StrategyMasterModel.setMaster(StrategyDatas);
	MilitaryModel.setMaster(MilitaryDatas);
	ReputationModel.setReputation(reputationConfig);
	if(LMvc.isRead){
		gameDataInit();
		self.getImages();
	}else{
		self.model.getAreaData(self.getImages);
	}
};
MapController.prototype.getImages=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
MapController.prototype.init=function(status){
	var self = this;
	LMvc.MapController = self;
	self.dispatchEvent(LEvent.COMPLETE);
	LMvc.keepLoading(false);
	/*if(LMvc.logoStage.visible){
		LMvc.logoStage.visible = false;
	}*/
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var item = new ItemModel(null,{item_id:10,count:1});
	seignior.addItem(item);
	LMvc.chapterController.view.visible = false;
	LMvc.stageLayer.x = 0;
	if(LMvc.isRead){
		LMvc.logoStage.visible = false;
		if(!LMvc.areaData.battleData){
			LMvc.isRead = false;
		}
	}else{
		LMvc.areaData = null;
	}
	self.dispatchEvent(LController.NOTIFY);
	LPlugin.playBGM("map", LPlugin.gameSetting.BGM);
	self.addEventListener(CharacterListEvent.SHOW, self.view.hideMapLayer);
	self.addEventListener(CharacterListEvent.CLOSE, self.view.showMapLayer);
	
	if(!LMvc.TutorialController && !LMvc.chapterData.eventEnd){
		LMvc.keepLoading(true);
		SeigniorLevelUpdate();
		self.loadMvc("EventMap",self.eventMapComplete);
		LMvc.chapterData.eventEnd = true;
	}
    //LMvc.logoStage.die();
    LMvc.logoStage.remove();
    LMvc.logoStage = null;
};
MapController.prototype.eventMapComplete = function() {
	var self = this;
	var urlloader = new LURLLoader();
	urlloader.parent = self;
	urlloader.addEventListener(LEvent.COMPLETE, self.eventEndRun);
	urlloader.load("Data/"+LMvc.dataFolder+"/event.js" + (LGlobal.traceDebug ? ("?" + (new Date()).getTime()) : ""), LURLLoader.TYPE_JS);
};
MapController.prototype.eventEndRun = function(event) {
	var urlloader = event.currentTarget;
	var self = urlloader.parent;
	urlloader.removeEventListener(LEvent.COMPLETE, self.eventEndRun);
	LMvc.keepLoading(false);
	dispatchEventListResult(null, LMvc.startEvent);
	if(LMvc.startEvent.script){
		var path = String.format(LMvc.startEvent.script,LPlugin.language());
		var script = "";
		script += "SGJEvent.init();";
		script += "Load.script("+path+");";
		script += "SGJEvent.end();";
		LGlobal.script.addScript(script);
	}
};
MapController.prototype.returnToChapter=function(event){
	var self = event.currentTarget.parent.parent.controller;
	self.view.remove();
	LMvc.chapterController.view.visible = true;
	delete LMvc.chapterController;
	LMvc.changeLoading(Loading);
	LMvc.keepLoading(false);
};
MapController.prototype.showCity=function(cityId, initFunc){
	var self = this;
	LMvc.cityId = cityId;
	self.initFunc = initFunc;
	LMvc.keepLoading(true);
	self.loadMvc("City",self.cityLoadComplete);
};
MapController.prototype.cityLoadComplete=function(){
	var self = this;
	if(LMvc.CityController){
		LMvc.CityController.view.visible = true;
		LMvc.CityController.init(self.initFunc);
	}else{
		var city = new CityController(self.initFunc);
		self.view.parent.addChild(city.view);
	}
	
	self.initFunc = null;
};
MapController.prototype.showTournaments=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.loadMvc("Tournaments",self.tournamentsLoadComplete);
};
MapController.prototype.tournamentsLoadComplete=function(){
	var self = this;
	var tournaments = new TournamentsController();
	self.view.parent.addChild(tournaments.view);
};
MapController.prototype.returnToCity=function(cityId){
	var self = this;
	LTweenLite.removeAll();
	LMvc.MapController.view.clearBattleMark();
	LMvc.MapController.view.visible = false;
	LMvc.CityController.view.visible = true;
	if(!cityId){
		LMvc.CityController.dispatchEvent(LCityEvent.CLOSE_SELECT_CITY);
		return;
	}
	var event = new LEvent(LCityEvent.SELECT_CITY);
    event.cityId = cityId;
	LMvc.CityController.dispatchEvent(event);
};
MapController.prototype.checkSeigniorChange=function(seigniorId){
	var self = this;
	if(checkSeigniorIsDie(seigniorId)){
		if(seigniorId == LMvc.selectSeignorId){
			var seignior = SeigniorModel.getSeignior(seigniorId);
			self.loadCharacterList(CharacterListType.SELECT_MONARCH,seignior.generals(), {isOnlyOne:true,closeDisable:true,buttonLabel:"execute"});
		}else{
			monarchChange(seigniorId);
			if(SeigniorExecute.running){
				SeigniorExecute.run();
			}
		}
	}else{
		if(SeigniorExecute.running){
			SeigniorExecute.run();
		}
	}
};
MapController.prototype.checkSeigniorFail=function(seigniorId){
	var self = this;
	if(!seigniorId){
		if(SeigniorExecute.running){
			SeigniorExecute.run();
		}
		return;
	}
	var seignior = SeigniorModel.getSeignior(seigniorId);
	if(seignior.areas().length > 0 && seignior.generalsCount() > 0){
		self.checkSeigniorChange(seigniorId);
		return;
	}
	self.removeSeigniorId = seigniorId;
	if(SeigniorExecute.running){
		SeigniorExecute.removeSeignior(seigniorId);
	}
	SeigniorModel.removeSeignior(seigniorId);
	self.load.view(["Seignior/Perish"],self.seigniorPerish);
};
MapController.prototype.seigniorPerish=function(){
	var self = this;
	var charaId = self.removeSeigniorId;
	self.removeSeigniorId = null;
	var perishView = new PerishView(self,charaId);
	LMvc.layer.addChild(perishView);
};
MapController.prototype.checkSeigniorWin=function(){//TODO::待删
	var self = this;
	for(var i=0,l=SeigniorModel.list.length;i<l;i++){
		var seignior = SeigniorModel.list[i];
		if(seignior.chara_id() == LMvc.selectSeignorId){
			
		}
	}
};
MapController.prototype.businessItemsShow=function(characterModel, item){
	var self = this;
	self.characterModel = characterModel;
	self.item = item;
	self.load.view(["Common/BusinessItems"],self.businessItemsViewShow);
};
MapController.prototype.businessItemsViewShow=function(){
	var self = this;
	var businessItemsView = new BusinessItemsView(self, self.characterModel, self.item);
	self.characterModel = null;
	self.item = null;
	self.view.addChild(businessItemsView);
};
