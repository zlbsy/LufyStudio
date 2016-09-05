function EventMapModel(){
	base(this,MyModel,[]);
}
EventMapModel.prototype.construct=function(){
	var self = this;
};
EventMapModel.prototype.mapPath=function(mapIndex){
	return String.format("{0}rmap/{1}.png", LMvc.IMG_PATH, mapIndex);
};
/*

EventMapModel.prototype.loadMapFileOver=function(event){
	var self = event.currentTarget.parent;
	//保存战场地图文件内容
	self.map = JSON.parse(event.target);
	
	var grids = self.map.data;
	self.stepWidth = self.map.width/grids[0].length;
	self.stepHeight = self.map.height/grids.length;
	
	self.controller.loadMapFileOver();
};
EventMapModel.prototype.addCoordinateCheck=function(index,startX,startY,endX,endY,funName){
	var self = this;
	var child = {
		"index":index,
		"rect":new LRectangle(
			parseInt(startX),
			parseInt(startY),
			parseInt(endX)-parseInt(startX),
			parseInt(endY)-parseInt(startY)
		),
		"fun":funName
	};
	self.atRect.push(child);
};
EventMapModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"character-r-default",path:LMvc.IMG_PATH+"character/r/default.png"});
	for(var i=0;i<self.map.imgs.length;i++){
		for(var j=0;j<self.map.imgs[i].length;j++){
			var imgObj = self.map.imgs[i][j];
			list.push({name:imgObj.img,path:LMvc.IMG_PATH+"rmap/"+imgObj.path});
		}
	}
	
	for(var i=0;self.map.builds && i<self.map.builds.length;i++){
		for(var j=0;j<self.map.builds[i].length;j++){
			var imgObj = self.map.builds[i][j];
			list.push({name:imgObj.img,path:LMvc.IMG_PATH+"rmap/"+imgObj.path});
		}
	}
	return list;
};
EventMapModel.prototype.setMapFiles=function(){
	this.map = LMvc.mapdata;
	delete LMvc.mapdata;
};*/