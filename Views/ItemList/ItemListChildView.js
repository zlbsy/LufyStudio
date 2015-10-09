function ItemListChildView(controller, itemModel) {
	var self = this;
	base(self, LView, [controller]);
	self.itemModel = itemModel;
	self.set();
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
	
	var icon = self.itemModel.icon();
	icon.addEventListener(LEvent.COMPLETE,self.loadOver);
	layer.addChild(icon);
	
	var name = getStrokeLabel(self.itemModel.name(),11,"#FFFFFF","#000000",2);
	name.x = 10;
	name.y = 10;
	layer.addChild(name);
};