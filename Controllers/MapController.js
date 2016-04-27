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
	self.load.config(["Character","characterList","Job","Items","Event","Strategy","Soldiers"],self.helperLoad);
};
MapController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Talk","CommonHelper"],self.modelLoad);
};
MapController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/Area","Master/Seignior","Master/Character","Master/ItemMaster","Items/Item","Master/StrategyMaster","Master/Strategy"],self.libraryLoad);
};
MapController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["language/chinese/LanguageAll","Face/CharacterFace","Face/Component","SeigniorExecute","SgjComboBoxChild"];
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
	CharacterModel.setChara(characterList);
	ItemMasterModel.setMaster(ItemDatas);
	StrategyMasterModel.setMaster(StrategyDatas);
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
	LMvc.chapterController.view.visible = false;
	LMvc.stageLayer.x = 0;
	if(LMvc.isRead){
		LMvc.logoStage.visible = false;
		if(!LMvc.areaData.battleData){
			LMvc.isRead = false;
		}
	}
	self.dispatchEvent(LController.NOTIFY);
	LPlugin.playBGM("map");
	self.addEventListener(CharacterListEvent.SHOW, self.view.hideMapLayer);
	self.addEventListener(CharacterListEvent.CLOSE, self.view.showMapLayer);
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
	//console.log("MapController.prototype.showCity " + cityId);
	LMvc.cityId = cityId;
	self.initFunc = initFunc;
	LMvc.keepLoading(true);
	self.loadMvc("City",self.cityLoadComplete);
};
MapController.prototype.cityLoadComplete=function(){
	var self = this;
	var city = new CityController(self.initFunc);
	self.initFunc = null;
	self.view.parent.addChild(city.view);
};
MapController.prototype.returnToCity=function(cityId){
	var self = this;
	console.log("returnToCity cityId="+cityId);
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
    //console.log("LMvc.CityController._eventList",LMvc.CityController._eventList);
	LMvc.CityController.dispatchEvent(event);
};
MapController.prototype.checkSeigniorChange=function(seigniorId){
	var self = this;
	if(checkSeigniorIsDie(seigniorId)){
		console.log("checkSeigniorIsDie true");
		if(seigniorId == LMvc.selectSeignorId){
			var seignior = SeigniorModel.getSeignior(seigniorId);
			self.loadCharacterList(CharacterListType.SELECT_MONARCH,seignior.generals(), {isOnlyOne:true,buttonLabel:"execute"});
		}else{
			monarchChange(seigniorId);
			if(SeigniorExecute.running){
				SeigniorExecute.run();
			}
		}
	}else{
		//console.log("checkSeigniorIsDie false");
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
	//console.log("seignior.areas().length="+seignior.areas().length);
	if(seignior.areas().length > 0){
		self.checkSeigniorChange(seigniorId);
		return;
	}
	self.removeSeigniorId = seigniorId;
	SeigniorModel.removeSeignior(seigniorId);
	if(SeigniorExecute.running){
		SeigniorExecute.removeSeignior(seigniorId);
	}
	self.load.view(["Seignior/Perish"],self.seigniorPerish);
};
MapController.prototype.seigniorPerish=function(){
	var self = this;
	var charaId = self.removeSeigniorId;
	self.removeSeigniorId = null;
	var perishView = new PerishView(self,charaId);
	LMvc.layer.addChild(perishView);
};
MapController.prototype.checkSeigniorWin=function(){
	var self = this;
	for(var i=0,l=SeigniorModel.list.length;i<l;i++){
		var seignior = SeigniorModel.list[i];
		if(seignior.chara_id() == LMvc.selectSeignorId){
			
		}
	}
};
