function LogoController(){
	base(this,MyController,[]);
}
LogoController.prototype.construct=function(){
	var self = this;
	LMvc.logoStage = self.view;
	var list = self.model.getImages();
	self.load.image(list,self.mvcLoad);
};
LogoController.prototype.mvcLoad=function(){
	var self = this;
	self.loadMvc(["Record"],self.baseControllersLoad);
};
LogoController.prototype.baseControllersLoad=function(){
	var self = this;
	self.load.controller(["OpenCharacterList"],self.configLoad);
};
LogoController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Position","Belong"],self.helperLoad);
};
LogoController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Label","UI"],self.libraryLoad);
};
LogoController.prototype.libraryLoad=function(){
	var self = this;
	var list = ["TranslucentLoading","BitmapSprite","BattleLoading"];
	if(typeof LPlugin == UNDEFINED){
		list.push("LPlugin");
	}
	self.load.library(list,self.modelLoad);
};
LogoController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/Area"],self.startAnimation);
};
LogoController.prototype.startAnimation=function(){
	var self = this;
	LTweenLite.to(self.view.bitmapBgBack,1,{y:130,onStart:self.checkAuth});
	LTweenLite.to(self.view.layerBg,1,{scaleX:1,scaleY:1});
	LTweenLite.to(self.view.layerChara,1,{scaleX:1,scaleY:1,y:LGlobal.height - 220})
	.to(self.view.layerChara,2,{y:LGlobal.height - 200,loop:true})
	.to(self.view.layerChara,2,{y:LGlobal.height - 220});
};
LogoController.prototype.checkAuth=function(obj){
	var self = obj.parent.controller;
	//console.log("self.dispatchEvent(LController.NOTIFY)");
	//TODO::test
	LPlugin.openStamp(17);
	LPlugin.openStamp(18);
	LPlugin.openStamp(19);
	LPlugin.openEvent(1);
	LPlugin.openEvent(2);
	LPlugin.openEvent(3);
	
	self.dispatchEvent(LController.NOTIFY);
};
LogoController.prototype.loadChapterList = function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	/*
	var list = [{id:1,name:"黄巾之乱",year:194,month:2},{id:2,name:"权臣董卓",year:194,month:2},{id:3,name:"豺狼吕布",year:194,month:2}];
	self.view.showChapterList(list);
	self.configLoad();
};
LogoController.prototype.configLoad=function(){
	var self = this;*/
	self.load.config(["MapSetting","chapterListSetting"],self.configLoadComplete);
};
LogoController.prototype.configLoadComplete = function(){
	var self = this;
	self.view.showChapterList(chapterListSetting);
	AreaModel.setArea(MapSetting);
	LMvc.keepLoading(false);
};
LogoController.prototype.showChapter = function(chapterId){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	LMvc.chapterId = chapterId;
	var chapterSelectData = chapterListSetting[chapterId];
	LMvc.dataFolder = chapterSelectData.folder;
	self.loadMvc("Chapter",self.chapterLoadComplete);
};
LogoController.prototype.chapterLoadComplete=function(){
	var self = this;
	var chapter = new ChapterController();
	LMvc.stageLayer.addChild(chapter.view);
};
LogoController.prototype.showSingleCombatArena=function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	/*self.load.controller(["OpenCharacterList"],self.configSingleCombatLoad);
};
LogoController.prototype.configSingleCombatLoad=function(){
	var self = this;*/
	self.load.config(["Event","Strategy","Soldiers"],self.showSingleCombatArenaMvc);
};
LogoController.prototype.showSingleCombatArenaMvc=function(){
	var self = this; 
	self.loadMvc("SingleCombatArena",self.singleCombatArenaLoadComplete);
};
LogoController.prototype.singleCombatArenaLoadComplete=function(){
	var self = this;
	var singleCombatArena = new SingleCombatArenaController(self);
	self.view.parent.addChild(singleCombatArena.view);
};



//TODO::削除予定
LogoController.prototype.loadTest = function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	self.loadMvc("Test",self.testLoadComplete);
};
LogoController.prototype.testLoadComplete=function(){
	var self = this;
	self.view.visible = false;
	var test = new TestController();
	LMvc.stageLayer.addChild(test.view);
};
LogoController.prototype.read = function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	self.load.config(["MapSetting","chapterListSetting"],self.readConfigLoadComplete);
};
LogoController.prototype.readConfigLoadComplete = function(){
	var self = this;
	AreaModel.setArea(MapSetting);
	var list = ["GameManager"];
	self.load.library(list,self.readRun);
};
LogoController.prototype.readRun = function(){
	var self = this;
	/*LMvc.areaData = LPlugin.GetData("gameData_2");
	LMvc.selectSeignorId = LMvc.areaData.selectSeignorId;
	LMvc.chapterData = LMvc.areaData.chapterData;
	LMvc.isRead = true;*/
	self.loadMvc("Chapter",self.chapterLoadComplete);
};
LogoController.prototype.loadMap=function(){
	var self = this;
	self.loadMvc("Map",self.mapLoadComplete);
};
LogoController.prototype.mapLoadComplete=function(){
	var self = this;
	var map = new MapController();
	self.view.parent.addChild(map.view);
};

//TODO::削除予定
LogoController.prototype.toLogin = function(nameText, passText){
	var self = this;
	LRequestUserLogin({"name":nameText,"pass":passText},self.loginCallback.bind(self));
};
LogoController.prototype.loginCallback = function(data){
	var self = this;
	LMvc.ssid = data.ssid;
	UserModel.own(self).setPlayer(data.user);
	var new_versions = data.versions;
	self.new_versions = new_versions;
	var versions;
	var protocol = location.protocol;
	if (protocol == "http:" || protocol == "https:") {
		versions = GetData("versions");
	}else{
		versions = [];
	}
	var updateMasters;
	console.log("new_versions",new_versions);
	console.log("versions",versions);
	//alert("logincallback 1:"+new_versions);
	new_versions.forEach(function(new_child){
		if(!versions){
			updateMasters = updateMasters || {};
			updateMasters[new_child.name] = 1;
			return;
		}
		var child = versions.find(function(_){
			return _.name == new_child.name;
		});
	
		if(!child || child.ver < new_child.ver){
			updateMasters = updateMasters || {};
			updateMasters[new_child.name] = 1;
		}
	});
	console.log("updateMasters",updateMasters);
	
	if(updateMasters){
		LRequestMasterAll(updateMasters,self.masterModelLoad.bind(self));
	}else{
		self.masterModelLoad({master_data:{}});
	}
};
LogoController.prototype.masterModelLoad=function(data){
	var self = this;
	self.data = data;
	console.log("masterModelLoad data",data);
	self.load.model(["Master/EquipmentMaster","Master/ItemMaster","Master/CharacterMaster","Master/CharacterStarMaster","Master/GrowingMaster","Master/ExpMaster","Master/SkillMaster","Master/ChapterMaster","Master/AreaMaster","Master/StageMaster"],self.setMaster);
};
LogoController.prototype.setMaster = function(){
	var self = this;
	var data = self.data;
	delete self.data;
	console.log("setMaster data",data);
	var character_master_data;
	if(data.master_data.character){
		character_master_data = data.master_data.character;
		SetData("character_master_data", character_master_data);
	}else{
		character_master_data = GetData("character_master_data");
	}
	console.log("character_master_data",character_master_data);
	CharacterMasterModel.setMaster(character_master_data);
	
	var growing_master_data;
	if(data.master_data.growing){
		growing_master_data = data.master_data.growing;
		SetData("growing_master_data", growing_master_data);
	}else{
		growing_master_data = GetData("growing_master_data");
	}
	console.log("growing_master_data",growing_master_data);
	GrowingMasterModel.setMaster(growing_master_data);
	
	var equipment_master_data;
	if(data.master_data.equipment){
		equipment_master_data = data.master_data.equipment;
		SetData("equipment_master_data", equipment_master_data);
	}else{
		equipment_master_data = GetData("equipment_master_data");
	}
	console.log("equipment_master_data",equipment_master_data);
	EquipmentMasterModel.setMaster(equipment_master_data);
	
	var item_master_data;
	if(data.master_data.item){
		item_master_data = data.master_data.item;
		SetData("item_master_data", item_master_data);
	}else{
		item_master_data = GetData("item_master_data");
	}
	console.log("item_master_data",item_master_data);
	ItemMasterModel.setMaster(item_master_data);
	
	var exp_master_data;
	if(data.master_data.exp){
		exp_master_data = data.master_data.exp;
		SetData("exp_master_data", exp_master_data);
	}else{
		exp_master_data = GetData("exp_master_data");
	}
	console.log("exp_master_data",exp_master_data);
	ExpMasterModel.setMaster(exp_master_data);
	
	var skill_master_data;
	if(data.master_data.skill){
		skill_master_data = data.master_data.skill;
		SetData("skill_master_data", skill_master_data);
	}else{
		skill_master_data = GetData("skill_master_data");
	}
	console.log("skill_master_data",skill_master_data);
	SkillMasterModel.setMaster(skill_master_data);
		
	var character_star_master_data;
	if(data.master_data.character_star){
		character_star_master_data = data.master_data.character_star;
		SetData("character_star_master_data", character_star_master_data);
	}else{
		character_star_master_data = GetData("character_star_master_data");
	}
	console.log("character_star_master_data",character_star_master_data);
	CharacterStarMasterModel.setMaster(character_star_master_data);

	var chapter_master_data;
	if(data.master_data.chapter){
		chapter_master_data = data.master_data.chapter;
		SetData("chapter_master_data", chapter_master_data);
	}else{
		chapter_master_data = GetData("chapter_master_data");
	}
	console.log("chapter_master_data",chapter_master_data);
	ChapterMasterModel.setMaster(chapter_master_data);
	
	var area_master_data;
	if(data.master_data.area){
		area_master_data = data.master_data.area;
		SetData("area_master_data", area_master_data);
	}else{
		area_master_data = GetData("area_master_data");
	}
	console.log("area_master_data",area_master_data);
	AreaMasterModel.setMaster(area_master_data);	
	
	var stage_master_data;
	console.log("stage:"+data.master_data.stage);
	if(data.master_data.stage){
		stage_master_data = data.master_data.stage;
		SetData("stage_master_data", stage_master_data);
	}else{
		stage_master_data = GetData("stage_master_data");
	}
	console.log("stage_master_data",stage_master_data);
	StageMasterModel.setMaster(stage_master_data);
		
	SetData("versions",self.new_versions);
	
	self.gotoMain();
};
LogoController.prototype.toRegister = function(nameText, passText){
	var self = this;
};
LogoController.prototype.gotoMain = function(){
	var self = this;
	LTweenLite.removeAll();
	LMvc.keepLoading(true);
	LMvc.changeLoading(Loading);
	self.view.parent.controller.mainLoad();
};