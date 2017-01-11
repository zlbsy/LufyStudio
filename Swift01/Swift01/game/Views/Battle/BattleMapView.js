function BattleMapView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.staticCharacters = [];
	self.wakeRoads = {};
	self.wakeRoads[Belong.SELF] = [];
	self.wakeRoads[Belong.ENEMY] = [];
	self.speed = BattleMapConfig.SPEED;
	self._speed = 0;
	self.init();
};
BattleMapView.prototype.init = function(){
	var self = this;
	self.map = new LBitmap(self.model.mapBitmapData);
	//self.map = new LBitmap(bitmapData);
	self.addChild(self.map);
	
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};

BattleMapView.prototype.onframe = function(event){
	var self = event.currentTarget;
	self.map.x = -self.parent.x;
	self.map.y = -self.parent.y;
	self.map.bitmapData.setProperties(self.map.x,self.map.y,LMvc.screenWidth,LMvc.screenHeight);
};
BattleMapView.prototype.canUseStrategyOnTerrain=function(currentSelectStrategy, locationX, locationY){
	var self = this;
	var data = self.getTerrainData(locationX,locationY);
	var terrainId = getTerrainId(data);
	var terrainModel = TerrainMasterModel.getMaster(terrainId);
	var strategyType = currentSelectStrategy.strategyType();
	var index = TerrainStrategyConfig.indexOf(strategyType);
	if(index < 0){
		return true;
	}
	var strategy = terrainModel.strategy();
	return strategy[index];
};
BattleMapView.prototype.showTerrain=function(x,y){
	var self = this;
	var locationX = x / BattleCharacterSize.width >>> 0;
	var locationY = y / BattleCharacterSize.height >>> 0;
	var sX = locationX * BattleCharacterSize.width;
	var sY = locationY * BattleCharacterSize.height;
	
	var data = self.getTerrainData(locationX,locationY);
	self.controller.view.terrainWindow.show(sX,sY,data);
};
BattleMapView.prototype.getTerrainData=function(locationX,locationY){
	var data = this.model.map.data;
	if(locationY < 0 || locationY >= data.length || 
		locationX < 0 || locationX >= data[locationY].length){
		return null;
	}
	return data[locationY][locationX];
};
BattleMapView.prototype.getTerrainModel=function(locationX,locationY){
	var terrainId = this.getTerrainId(locationX,locationY);
	return TerrainMasterModel.getMaster(terrainId);
};
BattleMapView.prototype.getTerrainId=function(locationX,locationY){
	var terrainData = this.getTerrainData(locationX,locationY);
	if(!terrainData){
		return 21;
	}
	return getTerrainId(terrainData);
};
BattleMapView.prototype.wakeRoadsClear=function(belong){
	if(belong == Belong.FRIEND){
		return;
	}
	this.wakeRoads[belong].length = 0;
};
BattleMapView.prototype.setWakeRoad=function(belong,x,y){
	var self = this;
	if(belong == Belong.FRIEND){
		belong = Belong.SELF;
	}
	self.wakeRoads[belong].push([x,y]);
};
BattleMapView.prototype.setWakeRoads=function(belong,rects,x,y){
	var self = this, obj;
	if(typeof x == UNDEFINED){
		for(var i = 0,l = rects.length;i < l; i++){
			obj = rects[i];
			self.setWakeRoad(belong, obj.x, obj.y);
		}
	}else{
		for(var i = 0,l = rects.length;i < l; i++){
			obj = rects[i];
			self.setWakeRoad(belong, obj.x + x, obj.y + y);
		}
	}
};
BattleMapView.prototype.isWakeRoad=function(belong,x,y){
	var self = this, obj;
	if(belong == Belong.FRIEND){
		belong = Belong.SELF;
	}
	var rects = self.wakeRoads[belong];
	for(var i = 0,l = rects.length;i < l; i++){
		obj = rects[i];
		if(obj[0] == x && obj[1] == y){
			return true;
		}
	}
	return false;
};
BattleMapView.prototype.isOnWakeRoad=function(chara){
	return this.isWakeRoad(chara.belong,chara.locationX(),chara.locationY());
};