function BattleMapView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.loadMapComplete = false;
	self.staticCharacters = [];
	self.speed = 5;
	self._speed = 0;
};
BattleMapView.prototype.setSmall = function(data){
	var self = this;
	
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
	/*
	self.controller.view.charaLayer.childList.forEach(function(chara){
		self.characterIn(chara);
	});
	console.log(self.controller.view.charaLayer);
	self.controller.view.charaLayer.visible=false;
	for(var i=50;i<60;i++)
	self.characterOut(self.controller.view.charaLayer.childList[i]);*/
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
	if(!self.loadMapComplete){
		self.staticCharacters.push(chara);
		return false;
	}
	var bitmapData = self.datas[0];
	bitmapData.copyPixels(chara.anime.bitmap.bitmapData,new LRectangle(8,8,48,48),new LPoint(chara.x,chara.y));
	chara.anime.onframe();
	bitmapData = self.datas[1];
	bitmapData.copyPixels(chara.anime.bitmap.bitmapData,new LRectangle(8,8,48,48),new LPoint(chara.x,chara.y));
	return true;
};
BattleMapView.prototype.characterOut = function(chara){
	var self = this;
	var bitmapData = self.datas[0];
	bitmapData.copyPixels(self.bitmapData,new LRectangle(chara.x,chara.y,48,48),new LPoint(chara.x,chara.y));
	bitmapData = self.datas[1];
	bitmapData.copyPixels(self.bitmapData,new LRectangle(chara.x,chara.y,48,48),new LPoint(chara.x,chara.y));
};