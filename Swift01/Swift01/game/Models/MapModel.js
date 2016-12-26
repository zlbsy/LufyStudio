function MapModel(){
	base(this,MyModel,[]);
}
MapModel.prototype.construct=function(){
	var self = this;
	self.areas = [];
};
MapModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	//TODO::ver1.1四季 list.push({name:"area-map-1",path:LMvc.IMG_PATH+"area/map-1.png"});
	
	list.push({name:"talkbox",path:LMvc.IMG_PATH+"common/talkbox.png"});
	
	list.push({name:"area-1",path:LMvc.IMG_PATH+"area/area-1.png"});
	list.push({name:"icon-appoint",path:LMvc.IMG_PATH+"icon/appoint.png"});
	list.push({name:"red_ball",path:LMvc.IMG_PATH+"icon/red_ball.png"});
	list.push({name:"flag-stick",path:LMvc.IMG_PATH+"area/flag-stick.png"});
	list.push({name:"flag-cloth",path:LMvc.IMG_PATH+"area/flag-cloth.png"});
	list.push({name:"blue_bar",path:LMvc.IMG_PATH+"icon/blue_bar.png"});
	list.push({name:"yellow_bar",path:LMvc.IMG_PATH+"icon/yellow_bar.png"});
	list.push({name:"character-s-default",path:LMvc.IMG_PATH+"character/s/default.png"});
	
	list.push({name:"checkbox-background",path:LMvc.IMG_PATH+"component/checkbox-background.png"});
	
	return list;
};
MapModel.prototype.getAreaData=function(callback){
	var self = this;
	self.callback = callback;
	LLoadManage.load( [{path:"./Data/"+LMvc.dataFolder+"/area.js",type:"js"}],null,self.getAreaDataComplete.bind(self));
};
MapModel.prototype.getAreaDataComplete=function(){
	var self = this;
	if(LMvc.chapterData.isCreateDebut){
		addCreateSeigniorsToGame();
	}
	gameDataInit();
	var callback = self.callback;
	delete self.callback;
	callback.apply(self.controller,[]);
};