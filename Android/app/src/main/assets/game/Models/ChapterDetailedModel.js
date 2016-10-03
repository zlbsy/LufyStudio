function ChapterDetailedModel(){
	base(this,MyModel,[]);
}
ChapterDetailedModel.prototype.construct=function(){
	var self = this;
};
ChapterDetailedModel.prototype.getImages=function(){
	var list = [
		{name:"win01",path:LMvc.IMG_PATH+"win/win01.png"},
		{name:"win02",path:LMvc.IMG_PATH+"win/win02.png"},
		{name:"win03",path:LMvc.IMG_PATH+"win/win03.png"},
		{name:"win04",path:LMvc.IMG_PATH+"win/win04.png"},
		{name:"win05",path:LMvc.IMG_PATH+"win/win05.png"},
		{name:"close",path:LMvc.IMG_PATH+"component/close.png"},
		{name:"common-black",path:LMvc.IMG_PATH+"common/black.png"},
	];
	return list;
};
ChapterDetailedModel.prototype.getChapterData=function(callback){
	var self = this;
	self.callback = callback;
	LLoadManage.load( [{path:"./Data/"+LMvc.dataFolder+"/chapter.js",type:"js"}],null,self.getChapterDataComplete.bind(self));
};
ChapterDetailedModel.prototype.getChapterDataComplete=function(event){
	var self = this;
	self.controller.setValue("seigniors",LMvc.chapterData.seigniors);
	var callback = self.callback;
	delete self.callback;
	callback.apply(self.controller,[]);
};