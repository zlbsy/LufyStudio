function SeigniorListView(){
	base(this,LView,[]);
}
SeigniorListView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
SeigniorListView.prototype.init=function(){
	var self = this;
	var windowBackgrond = getBlackBitmap();
	self.addChild(windowBackgrond);
	self.mapLayerInit();
	
	self.listLayer = new LSprite();
	self.addChild(self.listLayer);
	self.listLayerInit();
	
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	self.ctrlLayerInit();
	
	self.updateMap();
};
SeigniorListView.prototype.onClickCloseButton=function(event){
	var self = event.currentTarget.parent.parent;
	self.areaMap = null;
	self.mapData = null;
	self.controller.close();
};
SeigniorListView.prototype.updateMap=function(){
	var self = this;
	var miniMapData = self.miniMapData;
	var index = Math.floor((-self.listLayer.x) / LGlobal.width);
	self.mapData.bitmapData.copyPixels(miniMapData,new LRectangle(0,0,miniMapData.width,miniMapData.height),new LPoint(0,0));
	var seigniorModel = SeigniorModel.list[index];
	
	var w = CityIconConfig.width * miniMapData.mapScaleX;
	var h = CityIconConfig.height * miniMapData.mapScaleY;
	var citys = seigniorModel.areas();
	for(var i=0,l=citys.length;i<l;i++){
		var city = citys[i];
		var color = seigniorModel.color();
		var colorData = GameCacher.getCircleBitmapData(color, h * 0.5);
		self.mapData.bitmapData.copyPixels(colorData,new LRectangle(0,0,colorData.height,colorData.height),new LPoint((city.position().x + (colorData.width - colorData.height) * 0.5)*miniMapData.mapScaleX,city.position().y*miniMapData.mapScaleY));
	}
};
SeigniorListView.prototype.listLayerInit=function(){
	var self = this;
	var seigniors = SeigniorModel.list;
	for(var i=0,l=seigniors.length;i<l;i++){
		var seigniorModel = seigniors[i];
		var seigniorChild = new SeigniorListChildView(self.controller,seigniorModel);
		seigniorChild.x = LGlobal.width * i;
		self.listLayer.addChild(seigniorChild);
	}
	self.listLayer.dragRange = new LRectangle(-LGlobal.width * seigniors.length,0,LGlobal.width * (seigniors.length + 1),0);
};
SeigniorListView.prototype.mapLayerInit=function(){
	var self = this;
	self.mapLayer = new LSprite();
	self.addChild(self.mapLayer);
	var miniMapData = GameCacher.getAreaMiniMap("area-map-1");
	var miniMap = new LBitmap(miniMapData);
	
	self.miniMapData = miniMapData;
	var mapBitmapData = new LBitmapData(null,0,0,400,240,LBitmapData.DATA_CANVAS);
	self.mapData = new LBitmap(mapBitmapData);
	
	var layer = new LSprite();
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win01"]),420,260,20,30,23,24);
	layer.addChild(bitmapWin);
	
	var title = Language.get("all_seignior");
	var txtmap = getStrokeLabel(title,30,"#FFFFFF","#CCCCCC",1);
	txtmap.x = (bitmapWin.getWidth() - txtmap.getWidth()) * 0.5;
	bitmapWin.y = txtmap.getHeight();
	layer.addChild(txtmap);
	layer.cacheAsBitmap(true);
	//layer = getBitmap(layer);
	layer.x = (LGlobal.width - layer.getWidth()) * 0.5;
	layer.y = 30;
	self.mapLayer.addChild(layer);
	
	self.mapData.x = layer.x + 10;
	self.mapData.y = layer.y + bitmapWin.y + 10;
	self.mapLayer.addChild(self.mapData);
};
SeigniorListView.prototype.ctrlLayerInit=function(){
	var self = this;
	var leftBitmapData = new LBitmapData(LMvc.datalist["arrow"]);
	var left = new LBitmap(leftBitmapData);
	var leftButton = new LButton(left);
	leftButton.name = "leftButton";
	leftButton.x = 10;
	leftButton.y = LGlobal.height - 160 + (160 - leftBitmapData.height) * 0.5;
	self.ctrlLayer.addChild(leftButton);
	leftButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickLeftArrow);
	var rightBitmapData = GameCacher.getScaleBitmapData("arrow", -1, 1);
	var right = new LBitmap(rightBitmapData);
	var rightButton = new LButton(right);
	rightButton.name = "rightButton";
	rightButton.x = LGlobal.width - leftButton.x - leftBitmapData.width;
	rightButton.y = leftButton.y;
	self.ctrlLayer.addChild(rightButton);
	rightButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickRightArrow);
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.onClickCloseButton);
	self.ctrlButton();
};

SeigniorListView.prototype.clickLeftArrow=function(event){
	var self = event.currentTarget.parent.parent;
	if(self.listLayer.isMoving){
		return;
	}
	self.moveLeft();
};
SeigniorListView.prototype.clickRightArrow=function(event){
	var self = event.currentTarget.parent.parent;
	if(self.listLayer.isMoving){
		return;
	}
	self.moveRight();
};
SeigniorListView.prototype.centerOnChild=function(){
	var self = this;
	if(self.listLayer.x / LGlobal.width == 0){
		return;
	}
	if(self.listLayer.x > 0){
		self.moveRight();
		return;
	}else if(self.listLayer.x < -(self.listLayer.numChildren - 1) * LGlobal.width){
		self.moveLeft();
	}
	var nx = Math.abs(self.listLayer.x % LGlobal.width);
	if(nx > LGlobal.width * 0.5){
		self.moveRight();
	}else{
		self.moveLeft();
	}
};
SeigniorListView.prototype.moveLeft=function(){
	var self = this;
	if(self.listLayer.x >= 0){
		return;
	}
	self.listLayer.isMoving = true;
	var tox = self.listLayer.x + LGlobal.width;
	tox = Math.floor(tox / LGlobal.width) * LGlobal.width;
	LTweenLite.to(self.listLayer,0.5,{x:tox,onComplete:self.moveComplete});
};
SeigniorListView.prototype.moveRight=function(){
	var self = this;
	if(self.listLayer.x <= -(self.listLayer.numChildren - 1)*LGlobal.width){
		return;
	}
	self.listLayer.isMoving = true;
	var tox = self.listLayer.x - LGlobal.width;
	tox = Math.ceil(tox / LGlobal.width) * LGlobal.width;
	LTweenLite.to(self.listLayer,0.5,{x:tox,onComplete:self.moveComplete});
};
SeigniorListView.prototype.moveComplete=function(event){
	var listLayer = event.target;
	var self = listLayer.getParentByConstructor(SeigniorListView);
	self.ctrlButton();
	listLayer.isMoving = false;
	var self = listLayer.parent;
	self.updateMap();
};
SeigniorListView.prototype.ctrlButton=function(){
	var self = this;
	var leftButton = self.ctrlLayer.getChildByName("leftButton");
	leftButton.visible = (self.listLayer.x < 0);
	var rightButton = self.ctrlLayer.getChildByName("rightButton");
	rightButton.visible = (self.listLayer.x > -(self.listLayer.numChildren - 1)*LGlobal.width);
};