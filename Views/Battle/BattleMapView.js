function BattleMapView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	//self.loadMapComplete = false;
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
	
	self.datas = [self.bitmapData, self.bitmapData.clone()];
	//self.map.bitmapData = self.datas[0];
	self.dataIndex = 0;
	//self.loadMapComplete = true;
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	/*if(self.staticCharacters.length == 0){
		return;
	}
	self.staticCharacters.forEach(function(child){
		child.toStatic(true);
	});
	self.staticCharacters.length = 0;*/
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
	/*if(!self.loadMapComplete){
		self.staticCharacters.push(chara);
		return false;
	}*/
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
	/*
	var bitmapData = self.datas[0];
	bitmapData.copyPixels(self.bitmapData,new LRectangle(chara.x,chara.y,BattleCharacterSize.width,BattleCharacterSize.height),new LPoint(chara.x,chara.y));
	bitmapData = self.datas[1];
	bitmapData.copyPixels(self.bitmapData,new LRectangle(chara.x,chara.y,BattleCharacterSize.width,BattleCharacterSize.height),new LPoint(chara.x,chara.y));*/
};
BattleMapView.prototype.showTerrain=function(x,y){
	var self = this;
	var locationX = x / BattleCharacterSize.width >>> 0;
	var locationY = y / BattleCharacterSize.height >>> 0;
	var sX = locationX * BattleCharacterSize.width;
	var sY = locationY * BattleCharacterSize.height;
	
	var data = self.getTerrainData(locationY,locationX);
	self.controller.view.terrainWindow.show(sX,sY,data);
};
BattleMapView.prototype.getTerrainData=function(locationX,locationY){
	return this.model.map.data[locationY][locationX];
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
	this.wakeRoads[belong].push([x,y]);
};
BattleMapView.prototype.setWakeRoads=function(belong,rects,x,y){
	var self = this, obj;
	if(typeof x == UNDEFINED){
		for(var i = 0,l = rects.length;i < l; i++){
			obj = rects[i];
			self.setWakeRoad(belong, obj[0], obj[1]);
		}
	}else{
		for(var i = 0,l = rects.length;i < l; i++){
			obj = rects[i];
			self.setWakeRoad(belong, obj[0] + x, obj[1] + y);
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

/*
BattleMapView.prototype.setSmall = function(data){
	var self = this;
	
	return;
	var bitmapData = new LBitmapData(LMvc.datalist["img-small"]);
	var scale = data["width"]/bitmapData.width;
	
	self.map = new LBitmap(bitmapData);
	self.map.scaleX = self.map.scaleY = scale;
	self.addChild(self.map);
	
	var loader = new LLoader();
	loader.addEventListener(LEvent.COMPLETE,self.setBig.bind(this));
	loader.load(LMvc.IMG_PATH+"smap/" + data["img-big"]+(LGlobal.traceDebug?("?"+(new Date()).getTime()):""));
};
BattleMapView.prototype.setBig = function(event){
	var self = this;
	self.bitmapData = new LBitmapData(event.target);
	
	self.datas = [new LBitmapData(event.target,0,0,self.controller.model.map.width,self.controller.model.map.height,LBitmapData.DATA_CANVAS), new LBitmapData(event.target,0,0,self.controller.model.map.width,self.controller.model.map.height,LBitmapData.DATA_CANVAS)];
	self.map.bitmapData = self.datas[0];
	self.dataIndex = 0;
	self.map.scaleX = self.map.scaleY = 1;
	self.loadMapComplete = true;
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	if(self.staticCharacters.length == 0){
		return;
	}
	self.staticCharacters.forEach(function(child){
		child.toStatic(true);
	});
	self.staticCharacters.length = 0;
};*/