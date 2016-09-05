function ChapterModel(){
	base(this,MyModel,[]);
}
ChapterModel.prototype.construct=function(){
	var self = this;
	self.chapters = [];
	self.data = null;
};
ChapterModel.prototype.getImages=function(){
	var list = [
		{name:"win01",path:LMvc.IMG_PATH+"win/win01.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win03",path:LMvc.IMG_PATH+"win/win03.png"},
		{name:"win04",path:LMvc.IMG_PATH+"win/win04.png"},
		{name:"win05",path:LMvc.IMG_PATH+"win/win05.png"},
		{name:"close",path:LMvc.IMG_PATH+"component/close.png"},
		{name:"ok",path:LMvc.IMG_PATH+"component/ok.png"},
		{name:"arrow",path:LMvc.IMG_PATH+"icon/arrow.png"},
		{name:"common-black",path:LMvc.IMG_PATH+"common/black.png"},
		{name:"checkbox-background",path:LMvc.IMG_PATH+"component/checkbox-background.png"},
		{name:"checkbox-on",path:LMvc.IMG_PATH+"component/checkbox-on.png"},
		{name:"area-map-1",path:LMvc.IMG_PATH+"area/map-1.png"}
	];
	return list;
};
ChapterModel.prototype.getChapterData=function(callback){
	var self = this;
	self.callback = callback;
	if(LMvc.isRead){
		self.getChapterDataComplete();
		return;
	}
	LLoadManage.load( [{path:"./Data/"+LMvc.dataFolder+"/chapter.js",type:"js"}],null,self.getChapterDataComplete.bind(self));
};
ChapterModel.prototype.getChapterDataComplete=function(event){
	var self = this;
	self.controller.setValue("title",Language.get("chapter_"+LMvc.chapterId));
	//self.controller.setValue("year",LMvc.chapterData.year);
	//self.controller.setValue("month",LMvc.chapterData.month);
	//self.controller.setValue("icon",LMvc.chapterData.icon);
	self.controller.setValue("seigniors",LMvc.chapterData.seigniors);
	var callback = self.callback;
	delete self.callback;
	callback.apply(self.controller,[]);
};