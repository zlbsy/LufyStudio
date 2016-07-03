function CityController(initFunc){
	this.initFunc = initFunc;
	base(this,OpenCharacterListController,[]);
}
CityController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.configLoad);
};
CityController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Arms","CharacterListType","ArmListType","BattleMap","BattleWeather","Terrain","Skills"],self.modelLoad);
};
CityController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/Character"],self.helperLoad);
};
CityController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Label","Troops","CommonHelper"],self.libraryLoad);
};
CityController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["Face","Toast"];
	self.load.library(libraris,self.viewLoad);
};
CityController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Builds/Build","Builds/BuildBase","Common/HeaderStatus",
	"Builds/BuildMarket","Builds/BuildBarrack","Builds/BuildCitygate","Builds/BuildOfficial",
	"Builds/BuildFarmland","Builds/BuildTavern","Builds/BuildInstitute","Builds/BuildDiplomacy",
	"Builds/BuildGenerals","Builds/BuildExpedition"],self.init);
};
CityController.prototype.init=function(initFunc){
	var self = this;
	var cityData = AreaModel.getArea(LMvc.cityId);
	self.setValue("cityData",cityData);
	var cityFree = cityData.seigniorCharaId() == LMvc.selectSeignorId || SeigniorModel.getSeignior(LMvc.selectSeignorId).isSpyCity(LMvc.cityId);
	self.setValue("cityFree",cityFree);
	var selfCity = cityData.seigniorCharaId() == LMvc.selectSeignorId;
	self.setValue("selfCity",selfCity);
	if(selfCity){
		self.setValue("isAppoint",cityData.isAppoint());
	}
	//TODO::测试用
	if(LGlobal.traceDebug){
		self.setValue("cityFree",true);
	}
	LMvc.keepLoading(false);
	LMvc.CityController = self;
	LMvc.MapController.view.visible = false;
	self.view.visible = true;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY_ALL);
	if(self.initFunc){
		self.initFunc();
		self.initFunc = null;
	}else if(initFunc){
		initFunc();
	}
	LPlugin.playBGM("city", LPlugin.gameSetting.BGM);
};
CityController.prototype.gotoMap=function(){
	var self = this;
	self.view.visible = false;
	LPlugin.playBGM("map", LPlugin.gameSetting.BGM);
	LMvc.MapController.view.visible = true;
	LMvc.MapController.view.changeMode(MapController.MODE_MAP);
};
CityController.prototype.toSelectMap=function(eventType, params){
	var self = this;
	self.eventType = eventType;
	self.view.visible = false;
	LMvc.MapController.view.visible = true;
	LMvc.MapController.setValue("selectCityParams", params);
	if(!params.hideArraw){
		var cityData = self.getValue("cityData");
		var neighbor = cityData.neighbor();
		LMvc.MapController.view.areaLayer.childList.forEach(function(child){
			var citySeigniorId = child.areaStatus.seigniorCharaId();
			if(params.isSelf && citySeigniorId != LMvc.selectSeignorId){
				return;
			}else if(!params.isSelf && citySeigniorId == LMvc.selectSeignorId){
				return;
			}
			if(neighbor.indexOf(child.areaStatus.id()) >= 0){
				LMvc.MapController.view.addBattleMark(child.areaStatus);
			}
		});
	}
	LMvc.MapController.view.changeMode(MapController.MODE_CHARACTER_MOVE);
	if(params.toast){
		Toast.makeText(Language.get(params.toast)).show();
	}
};
CityController.prototype.gotoBattle=function(){
	var self = this;
	LMvc.CityController.view.clearContentLayer();
	LMvc.CityController.view.visible = false;
	LPlugin.playSE("Se_goto_battle", LPlugin.gameSetting.SE);
	LMvc.keepLoading(true);
	self.loadMvc("Battle",self.battleLoadComplete);
};
CityController.prototype.battleLoadComplete=function(){
	var self = this;
	var battleData = self.getValue("battleData");
	battleData.fromCity = self.getValue("cityData");
	var toCity = self.getValue("toCity");
	battleData.toCity = toCity?toCity:AreaModel.getArea(self.getValue("toCityId"));
	if(battleData.expeditionCharacterList){
		var leaderIndex = battleData.expeditionCharacterList.findIndex(function(child){return child.id() == battleData.expeditionLeader.id();});
		if(leaderIndex > 0){
			battleData.expeditionCharacterList.splice(leaderIndex, 1);
			battleData.expeditionCharacterList.unshift(battleData.expeditionLeader);
		}
	}
	battleData.expeditionEnemyData = self.getValue("expeditionEnemyData");
	var battle = new BattleController(battleData, self);
	LMvc.stageLayer.addChild(battle);
};