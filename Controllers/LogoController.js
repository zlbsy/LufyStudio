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
	self.load.config(["Position","Belong","Purchase"],self.helperLoad);
};
LogoController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Label","UI","PurchaseHelper"],self.libraryLoad);
};
LogoController.prototype.libraryLoad=function(){
	var self = this;
	var list = ["TranslucentLoading","BitmapSprite","BattleLoading","GameCacher","LPluginExtension"];
	if(typeof LPlugin == UNDEFINED){
		window["LPlugin"] = function(){}; 
	}
	self.load.library(list,self.languageLoad);
};
LogoController.prototype.languageLoad=function(){
	var self = this;
	var list = [String.format("language/{0}/LanguageSimple",LPlugin.language())];
	self.load.library(list,self.modelLoad);
};
LogoController.prototype.changeLanguage=function(language){
	var self = this;
	LPlugin.language(language);
	var list = [String.format("language/{0}/LanguageSimple",language)];
	self.load.library(list,self.changeLanguageComplete);
};
LogoController.prototype.changeLanguageComplete=function(){
	this.dispatchEvent(LController.NOTIFY);
};
LogoController.prototype.modelLoad=function(){
	var self = this;
	var volumeSetting = LPlugin.GetData("volumeSetting");
	if(!volumeSetting || typeof volumeSetting.SE == UNDEFINED){
		volumeSetting = {SE:1, BGM:1};
		LPlugin.SetData("volumeSetting", volumeSetting);
	}
	LPlugin.volumeSE = volumeSetting.SE;
	LPlugin.volumeBGM = volumeSetting.BGM;
	var speedSetting = LPlugin.GetData("speedSetting");
	if(!speedSetting || typeof speedSetting.value == UNDEFINED){
		speedSetting = {value:1};
		LPlugin.SetData("speedSetting", speedSetting);
	}
	LPlugin.gameSpeed = speedSetting.value;
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
	
	if(LPlugin.native){
		LMvc.keepLoading(true);
		if(!LPlugin.GetData("purchaseLog"), null){
			LMvc.changeLoading(TranslucentLoading);
			purchaseLogGet(function(){
				self.updateCheck();
			});
		}else{
			self.updateCheck();
		}
	}else{
		LPlugin.SetData("purchaseLog", []);
		//TODO::测试用
		if(LGlobal.traceDebug){
			var datas = [];
			productIdConfig.productIds.forEach(function(c){
				datas.push({product_id:c});
			});
			LPlugin.SetData("purchaseLog", datas);
			//self.updateCheck();
		}
	}
	if(!LPlugin.native && LSound.webAudioEnabled){
		if(LPlugin.soundData){
			return;
		}
		var soundDatas = [
		{name:"battle1",path:LMvc.MVC_PATH+"Sound/battle1.mp3"},
		{name:"battle2",path:LMvc.MVC_PATH+"Sound/battle2.mp3"},
		{name:"city",path:LMvc.MVC_PATH+"Sound/city.mp3"},
		{name:"map",path:LMvc.MVC_PATH+"Sound/map.mp3"},
		{name:"Se_loading",path:LMvc.MVC_PATH+"Sound/Se_loading.wav"},
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
	self.dispatchEvent(LController.NOTIFY);
};
LogoController.prototype.soundComplete = function(result){
	LPlugin.soundData = result;
};
LogoController.prototype.updateCheck = function(){
	var self = this;
	LAjax.post(LMvc.updateURL + "index.php",{},function(data){
		data = JSON.parse(data);
		if(LPlugin.dataVer() >= data.ver){
			LMvc.keepLoading(false);
			return;
		}
		self.needUpdateData = data;
		self.needUpdateFiles = {};
		self.updateFile(0);
	},function(){
		LPlugin.print("updateCheck Error");
		LMvc.keepLoading(false);
	});
};
LogoController.prototype.updateFile = function(index){
	var self = this;
	if(index >= self.needUpdateData.files.length){
		self.updateComplete();
		return;
	}
	var ver = self.needUpdateData.ver;
	var path = self.needUpdateData.files[index];
	LAjax.post(LMvc.updateURL + ver + "/" + path,{},function(data){
		self.needUpdateFiles[path] = data;
		self.updateFile(index + 1);
	});
};
LogoController.prototype.updateComplete = function(){
	var self = this;
	var GameData = LPlugin.GetData("GameData", null);
	self.needUpdateData.files.forEach(function(path){
		var key = path.replace(/\//g,"_");
		LPlugin.SetData(key, self.needUpdateFiles[path]);
	});
	if(GameData){
		GameData.files.forEach(function(path){
			var index = self.needUpdateData.files.findIndex(function(child){
				return child == path;
			});
			if(index < 0){
				var key = path.replace(/\//g,"_");
				LPlugin.DeleteData(key);
			}
		});
	}
	LPlugin.SetData("GameData", self.needUpdateData);
	LMvc.keepLoading(false);
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
