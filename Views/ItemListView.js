function ItemListView(){
	base(this,LView,[]);
}
ItemListView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
ItemListView.prototype.init=function(){
	var self = this;
	var windowBackgrond = getBlackBitmap();
	self.addChild(windowBackgrond);
	
	self.listLayer = new LSprite();
	self.addChild(self.listLayer);
	self.listLayerInit();
	
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	self.ctrlLayerInit();
};
ItemListView.prototype.onClickCloseButton=function(event){
	var self = event.currentTarget.parent.parent;
	self.areaMap = null;
	self.mapData = null;
	self.controller.close();
};
ItemListView.prototype.listLayerInit=function(){
	var self = this;
	var stamps = ItemMasterModel.getStamps();
	for(var i=0,l=stamps.length;i<l;i++){
		var itemModel = stamps[i];
		var child = new ItemListChildView(self.controller,itemModel);
		child.x = LGlobal.width * i;
		self.listLayer.addChild(child);
	}
	self.listLayer.dragRange = new LRectangle(-LGlobal.width * stamps.length,0,LGlobal.width * (stamps.length + 1),0);
};
ItemListView.prototype.ctrlLayerInit=function(){
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

ItemListView.prototype.clickLeftArrow=function(event){
	var self = event.currentTarget.parent.parent;
	if(self.listLayer.isMoving){
		return;
	}
	self.moveLeft();
};
ItemListView.prototype.clickRightArrow=function(event){
	var self = event.currentTarget.parent.parent;
	if(self.listLayer.isMoving){
		return;
	}
	self.moveRight();
};
ItemListView.prototype.centerOnChild=function(){
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
ItemListView.prototype.moveLeft=function(){
	var self = this;
	if(self.listLayer.x >= 0){
		return;
	}
	self.listLayer.isMoving = true;
	var tox = self.listLayer.x + LGlobal.width;
	tox = Math.floor(tox / LGlobal.width) * LGlobal.width;
	LTweenLite.to(self.listLayer,0.5,{x:tox,onComplete:self.moveComplete});
};
ItemListView.prototype.moveRight=function(){
	var self = this;
	if(self.listLayer.x <= -(self.listLayer.numChildren - 1)*LGlobal.width){
		return;
	}
	self.listLayer.isMoving = true;
	var tox = self.listLayer.x - LGlobal.width;
	tox = Math.ceil(tox / LGlobal.width) * LGlobal.width;
	LTweenLite.to(self.listLayer,0.5,{x:tox,onComplete:self.moveComplete});
};
ItemListView.prototype.moveComplete=function(event){
	var listLayer = event.target;
	listLayer.isMoving = false;
	var self = listLayer.parent;
};