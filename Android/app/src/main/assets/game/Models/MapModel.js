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
	//list.push({name:"question",path:LMvc.IMG_PATH+"common/question.png"});
	/*list.push({name:"flag-blue",path:LMvc.IMG_PATH+"area/flag-blue.png"});
	list.push({name:"flag-brown",path:LMvc.IMG_PATH+"area/flag-brown.png"});
	list.push({name:"flag-darkgoldenrod",path:LMvc.IMG_PATH+"area/flag-darkgoldenrod.png"});
	list.push({name:"flag-darkviolet",path:LMvc.IMG_PATH+"area/flag-darkviolet.png"});
	list.push({name:"flag-green",path:LMvc.IMG_PATH+"area/flag-green.png"});
	list.push({name:"flag-greenyellow",path:LMvc.IMG_PATH+"area/flag-greenyellow.png"});
	list.push({name:"flag-orange",path:LMvc.IMG_PATH+"area/flag-orange.png"});
	list.push({name:"flag-pink",path:LMvc.IMG_PATH+"area/flag-pink.png"});
	list.push({name:"flag-red",path:LMvc.IMG_PATH+"area/flag-red.png"});
	list.push({name:"flag-teal",path:LMvc.IMG_PATH+"area/flag-teal.png"});
	list.push({name:"flag-yellow",path:LMvc.IMG_PATH+"area/flag-yellow.png"});*/
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