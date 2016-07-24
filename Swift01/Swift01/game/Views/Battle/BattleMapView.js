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
	self.bitmapData = self.model.mapBitmapData;
	self.map = new LBitmap(self.bitmapData);
	self.addChild(self.map);
	
	self.datas = [BattleModel.bitmapDatas[1], BattleModel.bitmapDatas[2]];
	self.dataIndex = 0;
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};

BattleMapView.prototype.onframe = function(event){
	var self = event.currentTarget;
	self.map.x = -self.parent.x;
	self.map.y = -self.parent.y;
	var bitmapData = self.datas[self.dataIndex];
	bitmapData.setProperties(self.map.x,self.map.y,LGlobal.width,LGlobal.height);
	self.map.bitmapData = bitmapData;
	if(self._speed++ < self.speed){
		return;
	}
	self._speed = 0;
	if(++self.dataIndex >= self.datas.length){
		self.dataIndex = 0;
	}
};
BattleMapView.prototype.characterIn = function(chara){
	var self = this;
	if(chara.hideByCloud){
		return true;
	}
	var bitmapData = self.datas[0];
	bitmapData.copyPixels(chara.getBitmapData(),new LRectangle(8,8,BattleCharacterSize.width,BattleCharacterSize.height),new LPoint(chara.x,chara.y));
	chara.anime.onframe();
	bitmapData = self.datas[1];
	bitmapData.copyPixels(chara.getBitmapData(),new LRectangle(8,8,BattleCharacterSize.width,BattleCharacterSize.height),new LPoint(chara.x,chara.y));
	return true;
};
BattleMapView.prototype.characterOut = function(chara){
	var self = this;
	var data = self.model.map.data[chara.locationY()][chara.locationX()];
	var tileData = getMapTile(data);
	self.datas[0].copyPixels(tileData,new LRectangle(0, 0, BattleCharacterSize.width, BattleCharacterSize.height),new LPoint(chara.x,chara.y));
	self.datas[1].copyPixels(tileData,new LRectangle(0, 0, BattleCharacterSize.width, BattleCharacterSize.height),new LPoint(chara.x,chara.y));
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
	return this.model.map.data[locationY][locationX];
};
BattleMapView.prototype.getTerrainModel=function(locationX,locationY){
	var terrainId = this.getTerrainId(locationX,locationY);
	return TerrainMasterModel.getMaster(terrainId);
};
BattleMapView.prototype.getTerrainId=function(locationX,locationY){
	var terrainData = this.getTerrainData(locationX,locationY);
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