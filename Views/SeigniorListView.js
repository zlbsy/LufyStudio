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
};
SeigniorListView.prototype.onClickCloseButton=function(event){
	var self = event.currentTarget.parent.parent;
	self.areaMap = null;
	self.mapData = null;
	self.controller.close();
};
SeigniorListView.prototype.updateMap=function(){
	var self = this;
	var matrix = new LMatrix();
	matrix.scale(mapBitmapData.width/bitmapData.width, mapBitmapData.height/bitmapData.height);
	self.mapData.bitmapData.draw(self.areaMap,matrix);
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
	var bitmapData = new LBitmapData(LMvc.datalist["area-map-1"],null,null,null,null,LBitmapData.DATA_CANVAS);
	self.areaMap = bitmapData;
	var mapBitmapData = new LBitmapData(null,0,0,400,240,LBitmapData.DATA_CANVAS);
	self.mapData = new LBitmap(mapBitmapData);
	//var icon = new BitmapSprite(LMvc.IMG_PATH + "map/map-" + LMvc.chapterData.icon + ".png", null,null);
	/*var seigniors = self.controller.getValue("seigniors");
	for(var i=0,l=AreaModel.list.length;i<l;i++){
		var areaModel = AreaModel.list[i];
		var seignior = seigniors.find(function(child){
			
		});
	}*/
	
	var layer = new LSprite();
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win01"]),420,260,20,30,23,24);
	layer.addChild(bitmapWin);
	
	var title = Language.get("all_seignior");
	var txtmap = getStrokeLabel(title,30,"#FFFFFF","#CCCCCC",1);
	txtmap.x = (bitmapWin.getWidth() - txtmap.getWidth()) * 0.5;
	bitmapWin.y = txtmap.getHeight();
	layer.addChild(txtmap);
	
	layer = getBitmap(layer);
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
	leftButton.x = 10;
	leftButton.y = LGlobal.height - 160 + (160 - leftBitmapData.height) * 0.5;
	self.ctrlLayer.addChild(leftButton);
	leftButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickLeftArrow);
	var rightBitmapData = new LBitmapData(null,0,0,leftBitmapData.width,leftBitmapData.height,LBitmapData.DATA_CANVAS);
	var matrix = new LMatrix();
	matrix.scale(-1,1);
	matrix.translate(leftBitmapData.width,0);
	rightBitmapData.draw(left, matrix);
	var right = new LBitmap(rightBitmapData);
	var rightButton = new LButton(right);
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
	event.target.isMoving = false;
};