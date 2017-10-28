function BattleModel(){
	LExtends(this,MyModel,[]);
}
BattleModel.prototype.construct=function(){
	var self = this;
	self.map = null;
	self.hits = [];
	self.selfCaptive = [];
	self.enemyCaptive = [];
	self.ourList = [];
	self.enemyList = [];
	self.friendList = [];
	self.atRect = [];
	self.selfMinusStrategyCharas = [];
	self.enemyMinusStrategyCharas = [];
};
BattleModel.prototype.loadMapFile=function(mapPath,callback){
	var self = this;
	//开始读取战场地图文件
	var urlloader = new LURLLoader();
	urlloader.parent = self;
	urlloader.addEventListener(LEvent.COMPLETE,function(event){
		self.loadMapFileOver(event,callback);
	});
	urlloader.load("./Data/maps/"+mapPath+(LGlobal.traceDebug?("?"+(new Date()).getTime()):""),"js");
};
BattleModel.prototype.loadMapFileOver=function(event,callback){
	var self = event.currentTarget.parent;
	//保存战场地图文件内容
	self.map = LMvc.mapData;
	

	self.stepWidth = BattleCharacterSize.width;
	self.stepHeight = BattleCharacterSize.height;
	callback.apply(self.controller,[]);
};
BattleModel.prototype.getImages=function(){
	var self = this;
	var list = [];
	list.push({name:"battle-menu",path:LMvc.IMG_PATH+"battle/menu.png"});
	list.push({name:"rect",path:LMvc.IMG_PATH+"battle/rect.png"});
	list.push({name:"buff",path:LMvc.IMG_PATH+"battle/buff.png"});
	list.push({name:"character-s-default",path:LMvc.IMG_PATH+"character/s/default.png"});
	list.push({name:"tile_map",path:LMvc.IMG_PATH+"smap/tile_map.png"});
	list.push({name:"boat",path:LMvc.IMG_PATH+"smap/boat.png"});
	list.push({name:"light",path:LMvc.IMG_PATH+"common/light.png"});
	list.push({name:"icon_strategy",path:LMvc.IMG_PATH+"icon/strategy.png"});
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
	list.push({name:"big_attack_1",path:LMvc.IMG_PATH+"battle/big_attack_1.gif"});
	list.push({name:"background-text01",path:LMvc.IMG_PATH+"background/text01.png"});
	for(var i=0;i<10;i++){
		list.push({name:"num-1-"+i,path:LMvc.IMG_PATH+"num/1/num_" +i+".png"});
	}
	return list;
};
BattleModel.prototype.setMapFiles=function(){
	this.map = LMvc.mapdata;
	delete LMvc.mapdata;
};
BattleModel.prototype.checkCreat=function(chara,belong){
	var self = this;
	var skill = chara.data.skill();
	if(!skill){
		return;
	}
	if(skill.isSubType(SkillSubType.STRATEGY_HERT_MINUS)){
		var data = {chara:chara,skill:skill};
		if(belong == Belong.SELF){
			self.selfMinusStrategyCharas.push(data);
		}else if(belong == Belong.ENEMY){
			self.enemyMinusStrategyCharas.push(data);
		}
	}
};
BattleModel.prototype.getMinusStrategyCharas=function(belong){
	var self = this;
	if(belong == Belong.SELF){
		return self.selfMinusStrategyCharas;
	}else{
		return self.enemyMinusStrategyCharas;
	}
};
BattleModel.prototype.createMap = function(callback){
	var self = this;
	console.log("BattleModel.prototype.createMap");
	if(!MapHelperSetting.bitmapData){
		MapHelperSetting.bitmapData = new LBitmapData(LMvc.datalist["tile_map"]);
	}
	console.log("self.map="+self.map);
	var maps = self.map.data;
	var h = maps.length;
	var w = maps[0].length;
	self.map.width = BattleCharacterSize.width * w;
	self.map.height = BattleCharacterSize.height * h;
	//if(!BattleModel.bitmapDatas){
	BattleModel.bitmapDatas = [
		new LBitmapData(null,0,0,self.map.width,self.map.height, LBitmapData.DATA_CANVAS)
			//,new LBitmapData(null,0,0,self.map.width,self.map.height, LBitmapData.DATA_CANVAS)
			//,new LBitmapData(null,0,0,self.map.width,self.map.height, LBitmapData.DATA_CANVAS)
	];
	//}
	//for(var i=0;i<3;i++){
	for(var i=0;i<1;i++){
		var data = BattleModel.bitmapDatas[i];
		data.image.width = self.map.width;
		data.image.height = self.map.height;
	}
	for(var dataIndex=0;dataIndex<BattleModel.bitmapDatas.length;dataIndex++){
		BattleModel.bitmapDatas[dataIndex].lock();
	}
	self.createMapTile(0, callback);
};
BattleModel.prototype.addHit = function(id1,id2){
	this.hits.push([id1,id2]);
};
BattleModel.prototype.createMapTile = function(index, callback){
	var self = this;
	var maps = self.map.data;
	var h = maps.length;
	var w = maps[0].length;
	var startI = index / w >>> 0;
	var startJ = index % w;
	var endIndex = index + 10;
	for(var i=startI;i<h;i++){
		for(var j=startJ;j<w;j++){
			var data = maps[i][j];
			var bitmapData = getMapTile(data);
			var rect = new LRectangle(0, 0, BattleCharacterSize.width, BattleCharacterSize.height);
			var point = new LPoint(j*BattleCharacterSize.width,i*BattleCharacterSize.height, BattleCharacterSize.width, BattleCharacterSize.height);
			for(var dataIndex=0;dataIndex<BattleModel.bitmapDatas.length;dataIndex++){
				var data = BattleModel.bitmapDatas[dataIndex];
				data.copyPixels(bitmapData,rect,point);
			}
			if(++index > endIndex){
				break;
			}
		}
		startJ = 0;
		if(index > endIndex){
			break;
		}
	}
	if(endIndex < h * w){
		self.controller.nextFrameExecute(function(){
			self.createMapTile(index, callback);
		});
	}else{
		self.mapBitmapData = new LBitmapData(null, 0, 0, BattleModel.bitmapDatas[0].width, BattleModel.bitmapDatas[0].height);
		self.mapBitmapData.draw(new LBitmap(BattleModel.bitmapDatas[0]));
		BattleModel.bitmapDatas.length = 0;
		callback.apply(self.controller,[]);
	}
};
