function ChapterDetailedController(chapterSelectData){
	base(this,MyController,[]);
	self.chapterSelectData = chapterSelectData;
}
ChapterDetailedController.prototype.construct=function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.viewLoad);
};
ChapterDetailedController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["ChapterDetailed/ChapterDetailedChild"],self.getChapterData);
};
ChapterDetailedController.prototype.getChapterData=function(){
	var self = this;
	self.model.getChapterData(self.init);
};
ChapterDetailedController.prototype.init=function(status){
	var self = this;
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	
	LMvc.keepLoading(false);
};
