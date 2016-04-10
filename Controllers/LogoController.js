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
	var list = ["TranslucentLoading","BitmapSprite","BattleLoading","GameCacher"];
	if(typeof LPlugin == UNDEFINED){
		list.push("LPlugin");
	}
	list.push("language/chinese/LanguageSimple");
	self.load.library(list,self.modelLoad);
};
LogoController.prototype.modelLoad=function(){
	var self = this;
	var volumeSetting = LPlugin.GetData("volumeSetting");
	if(!volumeSetting || typeof volumeSetting.SE == UNDEFINED){
		volumeSetting = {SE:1, BGM:1};
		LPlugin.SetData("volumeSetting", volumeSetting);
	}
	LPlugin.volumeSE = volumeSetting.SE;
	LPlugin.volumeBGM = volumeSetting.BGM;console.log(volumeSetting);
	self.load.model(["Master/Area"],self.startAnimation);
};
LogoController.prototype.startAnimation=function(){
	var self = this;
	LTweenLite.to(self.view.bitmapBgBack,1,{y:130,onStart:self.start});
	LTweenLite.to(self.view.layerBg,1,{scaleX:1,scaleY:1});
	LTweenLite.to(self.view.layerChara,1,{scaleX:1,scaleY:1,y:180})
	.to(self.view.layerChara,2,{y:200,loop:true})
	.to(self.view.layerChara,2,{y:180});
};
LogoController.prototype.start=function(event){
	var self = event.target.parent.controller;
	//TODO::测试用
	/*LPlugin.openStamp(17);
	LPlugin.openStamp(18);
	LPlugin.openStamp(19);
	LPlugin.openEvent(1);
	LPlugin.openEvent(2);
	LPlugin.openEvent(3);*/
	
	self.dispatchEvent(LController.NOTIFY);
	
	if(!LPlugin.native && LSound.webAudioEnabled){
		if(LPlugin.soundData){
			return;
		}
		var soundDatas = [
		{name:"battle1",path:LMvc.MVC_PATH+"Sound/battle1.mp3"},
		{name:"battle2",path:LMvc.MVC_PATH+"Sound/battle2.mp3"},
		{name:"city",path:LMvc.MVC_PATH+"Sound/city.mp3"},
		{name:"map",path:LMvc.MVC_PATH+"Sound/map.mp3"},
		{name:"Se_battle_loading",path:LMvc.MVC_PATH+"Sound/Se_battle_loading.wav"},
		{name:"Se_big_block",path:LMvc.MVC_PATH+"Sound/Se_big_block.wav"},
		{name:"Se_big_hert",path:LMvc.MVC_PATH+"Sound/Se_big_hert.wav"},
		{name:"Se_block",path:LMvc.MVC_PATH+"Sound/Se_block.wav"},
		{name:"Se_cancel",path:LMvc.MVC_PATH+"Sound/Se_cancel.wav"},
		{name:"Se_charge",path:LMvc.MVC_PATH+"Sound/Se_charge.wav"},
		{name:"Se_die",path:LMvc.MVC_PATH+"Sound/Se_die.wav"},
		{name:"Se_gameover",path:LMvc.MVC_PATH+"Sound/Se_gameover.wav"},
		{name:"Se_goto_battle",path:LMvc.MVC_PATH+"Sound/Se_goto_battle.wav"},
		{name:"Se_hert",path:LMvc.MVC_PATH+"Sound/Se_hert.wav"},
		{name:"Se_move_car",path:LMvc.MVC_PATH+"Sound/Se_move_car.wav"},
		{name:"Se_move_cavalry",path:LMvc.MVC_PATH+"Sound/Se_move_cavalry.wav"},
		{name:"Se_move_infantry",path:LMvc.MVC_PATH+"Sound/Se_move_infantry.wav"},
		{name:"Se_move_warter",path:LMvc.MVC_PATH+"Sound/Se_move_warter.wav"},
		{name:"Se_no",path:LMvc.MVC_PATH+"Sound/Se_no.wav"},
		{name:"Se_ok",path:LMvc.MVC_PATH+"Sound/Se_ok.wav"},
		{name:"Se_set",path:LMvc.MVC_PATH+"Sound/Se_set.wav"},
		{name:"Se_strategy_earth",path:LMvc.MVC_PATH+"Sound/Se_strategy_earth.wav"},
		{name:"Se_strategy_fire",path:LMvc.MVC_PATH+"Sound/Se_strategy_fire.wav"},
		{name:"Se_strategy_heal1",path:LMvc.MVC_PATH+"Sound/Se_strategy_heal1.wav"},
		{name:"Se_strategy_heal2",path:LMvc.MVC_PATH+"Sound/Se_strategy_heal2.wav"},
		{name:"Se_strategy_hert1",path:LMvc.MVC_PATH+"Sound/Se_strategy_hert1.wav"},
		{name:"Se_strategy_hert2",path:LMvc.MVC_PATH+"Sound/Se_strategy_hert2.wav"},
		{name:"Se_strategy_warter",path:LMvc.MVC_PATH+"Sound/Se_strategy_warter.wav"},
		{name:"Se_strategy_wind",path:LMvc.MVC_PATH+"Sound/Se_strategy_wind.wav"},
		{name:"Se_swing",path:LMvc.MVC_PATH+"Sound/Se_swing.wav"},
		];
		LLoadManage.load(soundDatas, null, self.soundComplete);
	}
};
LogoController.prototype.soundComplete = function(result){
	LPlugin.soundData = result;
	console.log(result);
};
LogoController.prototype.loadChapterList = function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
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
	var chapterSelectData = chapterListSetting.find(function(child){return child.id == chapterId;});
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
LogoController.prototype.loadSettingGame = function(){
	var self = this;
	self.loadMvc("SettingGame",self.settingGameLoadComplete);
};
LogoController.prototype.settingGameLoadComplete = function(){
	var self = this;
	var settingGame = new SettingGameController();
	self.view.parent.addChild(settingGame.view);
};
LogoController.prototype.loadCreateCharacter = function(){
	var self = this;
	self.loadMvc("CreateCharacter",self.createCharacterLoadComplete);
};
LogoController.prototype.createCharacterLoadComplete = function(){
	var self = this;
	var createCharacter = new CreateCharacterController();
	self.view.parent.addChild(createCharacter.view);
};
