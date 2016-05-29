function ChapterController(chapterSelectData){
	base(this,MyController,[]);
	self.chapterSelectData = chapterSelectData;
}
ChapterController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.libraryLoad);
};
ChapterController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["Face","GameManager","GameCacher"];
	self.load.library(libraris,self.viewLoad);
};
ChapterController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Chapter/ChapterSeignior"],self.getChapterData);
};
ChapterController.prototype.getChapterData=function(){
	var self = this;
	self.model.getChapterData(self.init);
};
ChapterController.prototype.init=function(status){
	var self = this;
	if(LMvc.isRead){
		self.loadMvc("Map",self.mapLoadComplete);
		return;
	}else if(LMvc.TutorialController){
		self.loadMap(21);
		return;
	}
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	
	LMvc.keepLoading(false);
};
ChapterController.prototype.returnToChapterMenu=function(event){
	var self = this;
	
	LTweenLite.removeAll();
	self.view.remove();
	LMvc.mainController.view.visible = true;
	LMvc.mainController.webview.show();
	delete LMvc.mainController;
};
ChapterController.prototype.loadMap=function(chara_id){
	var self = this;
	LMvc.selectSeignorId = chara_id;
	LMvc.keepLoading(true);
	self.loadMvc("Map",self.mapLoadComplete);
};
ChapterController.prototype.mapLoadComplete=function(){
	var self = this;
	LMvc.chapterController = self;
	var map = new MapController();
	self.view.parent.addChild(map.view);
};
ChapterController.prototype.loadCreateSetting=function(){
	var self = this;
	LMvc.keepLoading(true);
	self.loadMvc("CreateSetting",self.loadCreateSettingComplete);
};
ChapterController.prototype.loadCreateSettingComplete=function(){
	var self = this;
	LMvc.chapterController = self;
	var createSetting = new CreateSettingController();
	createSetting.view.x = self.view.x;
	self.view.parent.addChild(createSetting.view);
};
