function EventListChildView(controller, eventObject, bitmapData, x, y) {
	var self = this;
	base(self, LView, [controller]);
	self.eventObject = eventObject;
	self.parentBitmapData = bitmapData;
	self.x = x;
	self.y = y;
	self.lock = !LPlugin.eventIsOpen(eventObject.id);
	self.set();
	if(self.lock){
		self.toBitmap(bitmapData);
	}
}
EventListChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
EventListChildView.prototype.loadOver=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.loadCompleteCount++;
	if(self.loadCompleteCount < 1){
		return;
	}
	self.toBitmap();
};
EventListChildView.prototype.toBitmap=function(){
	var self = this;
	var layer = self.layer.getChildAt(0);
	layer.visible = true;
	layer.cacheAsBitmap(true);
	var bitmap = layer._ll_cacheAsBitmap;
	self.parentBitmapData.copyPixels(bitmap.bitmapData,new LRectangle(0, 0, bitmap.getWidth(), bitmap.getHeight()), new LPoint(self.x,self.y));
	self.layer.remove();
};
EventListChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	self.loadCompleteCount = 0;
	
	var width = 200, height = 100;
	self.addShape(LShape.RECT,[0,0,width,height]);
	var layer = new LSprite();
	layer.visible = false;
	self.layer.addChild(layer);
	
	var icon;
	if(self.lock){
		var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win05"]),width,height);
		layer.addChild(winPanel);
		layer.addChild(getTranslucentBitmap(width,height));
		icon = new LBitmap(new LBitmapData(LMvc.datalist["lock"]));
		icon.x = (width - icon.getWidth())*0.5;
		icon.y = (height - icon.getHeight())*0.5;
		layer.addChild(icon);
		return;
	}else{
		icon = self.itemModel.icon();
		icon.addEventListener(LEvent.COMPLETE,self.loadOver);
		layer.addChild(icon);
	}
	
	var name = getStrokeLabel(self.itemModel.name(),11,"#FFFFFF","#000000",2);
	name.x = 10;
	name.y = 10;
	layer.addChild(name);
};