function EventMapModel(){
	base(this,MyModel,[]);
}
EventMapModel.prototype.construct=function(){
	var self = this;
	self.areas = [];
};
EventMapModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"area-map-1",path:LMvc.IMG_PATH+"area/map-1.png"});
	
	list.push({name:"talkbox",path:LMvc.IMG_PATH+"common/talkbox.png"});
	
	list.push({name:"area-1",path:LMvc.IMG_PATH+"area/area-1.png"});
	list.push({name:"flag-black",path:LMvc.IMG_PATH+"area/flag-black.png"});
	list.push({name:"flag-blue",path:LMvc.IMG_PATH+"area/flag-blue.png"});
	list.push({name:"flag-brown",path:LMvc.IMG_PATH+"area/flag-brown.png"});
	list.push({name:"flag-darkgoldenrod",path:LMvc.IMG_PATH+"area/flag-darkgoldenrod.png"});
	list.push({name:"flag-darkviolet",path:LMvc.IMG_PATH+"area/flag-darkviolet.png"});
	list.push({name:"flag-green",path:LMvc.IMG_PATH+"area/flag-green.png"});
	list.push({name:"flag-greenyellow",path:LMvc.IMG_PATH+"area/flag-greenyellow.png"});
	list.push({name:"flag-orange",path:LMvc.IMG_PATH+"area/flag-orange.png"});
	list.push({name:"flag-pink",path:LMvc.IMG_PATH+"area/flag-pink.png"});
	list.push({name:"flag-red",path:LMvc.IMG_PATH+"area/flag-red.png"});
	list.push({name:"flag-teal",path:LMvc.IMG_PATH+"area/flag-teal.png"});
	list.push({name:"flag-yellow",path:LMvc.IMG_PATH+"area/flag-yellow.png"});
	
	list.push({name:"checkbox-background",path:LMvc.IMG_PATH+"component/checkbox-background.png"});
	
	return list;
};
EventMapModel.prototype.getAreaData=function(callback){
	var self = this;
	self.callback = callback;
	LLoadManage.load( [{path:"./Data/"+LMvc.dataFolder+"/area.js",type:"js"}],null,self.getAreaDataComplete.bind(self));
};
EventMapModel.prototype.getAreaDataComplete=function(){
	var self = this;
	var data = LMvc.areaData;
	SeigniorModel.setSeignior(data.seigniors);
	for(var i=0,l=data.seigniors.length;i<l;i++){
		var seignior = data.seigniors[i];
		var areas = seignior.areas;
		var areaList = [];
		areas.forEach(function(child){
			var area = AreaModel.getArea(child.area_id);
			area.setSeignor(seignior,child);
			areaList.push(area);
		});
		seignior.areas = areaList;
	}
	var callback = self.callback;
	delete self.callback;
	callback.apply(self.controller,[]);
};