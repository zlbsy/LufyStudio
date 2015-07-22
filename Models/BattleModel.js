function BattleModel(){
	LExtends(this,MyModel,[]);
}
BattleModel.prototype.construct=function(){
	var self = this;
	self.map = null;
	self.ourList = [];
	self.enemyList = [];
	self.friendList = [];
	self.atRect = [];
};
BattleModel.prototype.loadMapFile=function(mapPath,callback){
	var self = this;
	//开始读取战场地图文件
	var urlloader = new LURLLoader();
	urlloader.parent = self;
	urlloader.addEventListener(LEvent.COMPLETE,function(event){
		self.loadMapFileOver(event,callback);
	});
	urlloader.load("./Data/maps/"+mapPath+(LGlobal.traceDebug?("?"+(new Date()).getTime()):""),"text");
};
BattleModel.prototype.loadMapFileOver=function(event,callback){
	var self = event.currentTarget.parent;
	//保存战场地图文件内容
	self.map = JSON.parse(event.target);
	
	var grids = self.map.data;
	self.stepWidth = self.map.width/grids[0].length;
	self.stepHeight = self.map.height/grids.length;
	callback.apply(self.controller,[]);
};
BattleModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	/*list.push({name:"talkbox",path:LMvc.IMG_PATH+"common/talkbox.png"});
	list.push({name:"sMenu",path:LMvc.IMG_PATH+"sousou/menu.png"});*/
	list.push({name:"battle-menu",path:LMvc.IMG_PATH+"battle/menu.png"});
	list.push({name:"rect",path:LMvc.IMG_PATH+"battle/rect.png"});
	list.push({name:"character-s-default",path:LMvc.IMG_PATH+"character/s/default.png"});
	list.push({name:"img-small",path:LMvc.IMG_PATH+"smap/" + self.map["img-small"]});
	
	list.push({name:"red_bar",path:LMvc.IMG_PATH+"icon/red_bar.png"});
	list.push({name:"blue_bar",path:LMvc.IMG_PATH+"icon/blue_bar.png"});
	list.push({name:"yellow_bar",path:LMvc.IMG_PATH+"icon/yellow_bar.png"});
	list.push({name:"orange_bar",path:LMvc.IMG_PATH+"icon/orange_bar.png"});
	list.push({name:"icon_hert",path:LMvc.IMG_PATH+"icon/hert.png"});
	list.push({name:"yellow_ball",path:LMvc.IMG_PATH+"icon/yellow_ball.png"});
	list.push({name:"orange_ball",path:LMvc.IMG_PATH+"icon/orange_ball.png"});
	list.push({name:"orange_ball",path:LMvc.IMG_PATH+"icon/orange_ball.png"});
	list.push({name:"icon-armor",path:LMvc.IMG_PATH+"icon/armor.png"});
	list.push({name:"icon-weapon",path:LMvc.IMG_PATH+"icon/weapon.png"});
	list.push({name:"menu_line",path:LMvc.IMG_PATH+"component/menu_line.png"});
	list.push({name:"battle_status",path:LMvc.IMG_PATH+"battle/status.png"});
	
	for(var i=0;i<10;i++){
		list.push({name:"num-1-"+i,path:LMvc.IMG_PATH+"num/1/num_" +i+".png"});
	}
	return list;
};
BattleModel.prototype.setMapFiles=function(){
	this.map = LMvc.mapdata;
	delete LMvc.mapdata;
};