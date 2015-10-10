function ItemListChildView(controller, itemModel) {
	var self = this;
	base(self, LView, [controller]);
	self.itemModel = itemModel;
	self.lock = itemModel.id() % 3 == 0;
	self.set();
	if(self.lock){
		self.toBitmap();
	}
}
ItemListChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
ItemListChildView.prototype.loadOver=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.loadCompleteCount++;
	if(self.loadCompleteCount < 1){
		return;
	}
	self.toBitmap();
};
ItemListChildView.prototype.toBitmap=function(){
	var self = this;
	var layer = self.layer.getChildAt(0);
	layer.visible = true;
	var bitmap = getBitmap(layer);
	layer.remove();
	self.layer.addChildAt(bitmap, 0);
};
ItemListChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	self.loadCompleteCount = 0;
	
	var width = 100, height = 100;
	var layer = new LSprite();
	layer.visible = false;
	self.layer.addChild(layer);
	
	var icon;
	if(self.lock){
		var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win06"]),width,height);
		layer.addChild(winPanel);
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