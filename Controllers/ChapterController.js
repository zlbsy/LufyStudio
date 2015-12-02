function ChapterController(chapterSelectData){
	base(this,MyController,[]);
	self.chapterSelectData = chapterSelectData;
}
ChapterController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.modelLoad);
};
ChapterController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Chapter/ChapterStatus"],self.libraryLoad);
};
ChapterController.prototype.libraryLoad=function(){
	var self = this;
	var libraris = ["BitmapSprite","Face","Face/CharacterFace","Face/Component"];
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
