function BattleMapView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
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
	loader.load(LMvc.IMG_PATH+"sousou/smap/" + data["img-big"]+(LGlobal.traceDebug?("?"+(new Date()).getTime()):""));
};
BattleMapView.prototype.setBig = function(event){
	var self = this;
	self.map.bitmapData = new LBitmapData(event.target);
	self.map.scaleX = self.map.scaleY = 1;
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
BattleMapView.prototype.onframe = function(event){
	var self = event.currentTarget;
	self.map.x = -self.parent.x;
	self.map.y = -self.parent.y;
	self.map.bitmapData.setProperties(self.map.x,self.map.y,LGlobal.width,LGlobal.height);
};