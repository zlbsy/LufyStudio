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
	self.load.config(["Position","Belong","Purchase","Trouble","Job"],self.helperLoad);
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
	if(LPlugin.native){
		LMvc.ver = LPlugin.bundleVersion();
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
	LPlugin.gameSetting = LPlugin.GetData("gameSetting");
	if(!LPlugin.gameSetting || typeof LPlugin.gameSetting.speed == UNDEFINED){
		LPlugin.gameSetting = {SE:1, BGM:1, speed:1};
		LPlugin.SetData("gameSetting", LPlugin.gameSetting);
	}
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
LogoController.prototype.restore=function(){
	var self = this;
	purchaseRestore(function(){
		self.dispatchEvent(LController.NOTIFY);
	});
};
LogoController.prototype.loadReport = function(){
	var self = this;
	self.load.view(["Common/BugReport"],self.openReport);
};
LogoController.prototype.loadReportUpdate = function(){
	var self = this;
	self.load.view(["Common/ReportUpdate"],self.loadReportUpdateLibrary);
};
LogoController.prototype.loadReportUpdateLibrary = function(){
	var self = this;
	self.load.library(["SeigniorExecute"],self.openReportUpdate);
};
LogoController.prototype.openReport=function(){
	var self = this;
	var reportView = new BugReportView();
	var obj = {width:440, height:500, subWindow:reportView, title:Language.get("bug_report"), okEvent:reportView.toUpdate, cancelEvent:function(event){
		event.currentTarget.parent.remove();
		LGlobal.preventDefault = true;
	}};
	var reportDialog = ConfirmWindow(obj);
	self.view.addChild(reportDialog);
};
LogoController.prototype.openReportUpdate=function(){
	var self = this;
	var reportView = new ReportUpdateView();
	var obj = {width:440, height:300, subWindow:reportView, title:Language.get("update_report"), okEvent:reportView.toUpdate, cancelEvent:function(event){
		event.currentTarget.parent.remove();
		LGlobal.preventDefault = true;
	}};
	var reportDialog = ConfirmWindow(obj);
	self.view.addChild(reportDialog);
};
LogoController.prototype.start=function(event){
	var self = event.target.parent.controller;
	
	self.dispatchEvent(LController.NOTIFY);
	self.updateCheck();
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
		{name:"woman_attack",path:LMvc.MVC_PATH+"Sound/woman_attack.wav"},
		{name:"man_attack",path:LMvc.MVC_PATH+"Sound/man_attack.wav"},
		];
		LLoadManage.load(soundDatas, null, self.soundComplete);
	}
};
LogoController.prototype.soundComplete = function(result){
	LPlugin.soundData = result;
};
LogoController.prototype.testVersionOver = function(message){
	var self = this;
	LMvc.keepLoading(false);
	var obj = {title:Language.get("confirm"),message:message,width:300,height:200,okEvent:function(event){
		LPlugin.openURL(LMvc.homeURL);
	}};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
LogoController.prototype.updateCheck = function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	if(LPlugin.testVersion){
		LAjax.post(LMvc.updateURL + "test.php",{ver:LMvc.ver},function(data){
			data = JSON.parse(data);
			if(!data.result){
				self.testVersionOver(data.message);
			}else{
				LMvc.keepLoading(false);
				self.view.showNews(data.newsURL + "&l=" + LPlugin.language());
			}
		},function(){
			self.testVersionOver("Could Not Connect to Internet Error !!");
			//LMvc.keepLoading(false);
		});
		return;
	}
	LAjax.post(LMvc.updateURL + "index.php",{ver:LMvc.ver},function(data){
		data = JSON.parse(data);
		LPlugin.SetData("reviewing", data.reviewing);
		self.view.forumLayer.visible = data.reviewing ? false : true;
		var today = formatDate(new Date(), "YYYY-MM-DD 00:00:00");
		if(!data.reviewing && data.newsURL){
			var newsShowDay = LPlugin.GetData("newsShowDay", null);
			var forceNewsShow = false;
			if(data.forceNewsTime){
				var forceNewsTime = LPlugin.GetData("forceNewsTime", today);
				forceNewsShow = forceNewsTime < data.forceNewsTime;
				if(forceNewsShow){
					LPlugin.SetData("forceNewsTime", data.forceNewsTime);
				}
			}
			if(newsShowDay < today || forceNewsShow){
				self.view.showNews(data.newsURL + "&l=" + LPlugin.language());
				//LPlugin.SetData("newsShowDay", today);
			}
		}
		if(LPlugin.dataVer() >= LPlugin.dataVer(data.ver)){
			LMvc.keepLoading(false);
			return;
		}
		self.needUpdateData = data;
		self.needUpdateFiles = {};
		self.updateFile(0);
	},function(){
		LMvc.keepLoading(false);
		var reviewing = LPlugin.GetData("reviewing", 0);
		self.view.forumLayer.visible = reviewing ? false : true;
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
	self.showChapterList(0);
	AreaModel.setArea(MapSetting);
	LMvc.keepLoading(false);
};
LogoController.prototype.showChapterList = function(index){
	var self = this;
	var list = [];
	for(var i=0;i<chapterListSetting.length;i++){
		var chapter = chapterListSetting[i];
		if(chapter.id > 0){
			list.push(chapter);
		}
	}
	self.view.showChapterList(list, index);
};
LogoController.prototype.selectedChapter = function(chapterId){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	LMvc.chapterId = chapterId;
	var chapterSelectData = chapterListSetting.find(function(child){return child.id == chapterId;});
	LMvc.dataFolder = chapterSelectData.folder;
};
LogoController.prototype.showChapterDetailed = function(chapterId){
	var self = this;
	self.selectedChapter(chapterId);
	self.loadMvc("ChapterDetailed",self.chapterDetailedLoadComplete);
};
LogoController.prototype.chapterDetailedLoadComplete=function(){
	var self = this;
	var chapter = new ChapterDetailedController();
	LMvc.stageLayer.addChild(chapter.view);
};
LogoController.prototype.showChapter = function(chapterId){
	var self = this;
	self.selectedChapter(chapterId);
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
LogoController.prototype.loadTutorial = function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	self.loadMvc("Tutorial",self.loadTutorialComplete);
};
LogoController.prototype.loadTutorialComplete = function(){
	var self = this;
	var tutorial = new TutorialController();
	//self.showChapter(0);return;
	//self.view.parent.addChild(tutorial.view);
};
