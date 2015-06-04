function ItemsChildView(controller,itemModel){
	var self = this;
	base(self,LView,[controller]);
	self.itemModel = itemModel;
	self.set();
}
ItemsChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
ItemsChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	
	var layer = new LSprite();
	self.layer.addChild(layer);
	
	var width = 100, height = 100;
	var item = self.itemModel.icon(new LPoint(width,height));
	console.log("item icon ",item.getWidth(),item.getHeight());
	layer.addChild(item);
	
	
	//var bitmapData = new LBitmapData(LMvc.datalist["win06"]);
	//var panel = new LPanel(bitmapData,width,height);
	/*
	var lblCount = getStrokeLabel(self.itemModel.count(),25,"#FFFFFF","#000000",3);
	lblCount.x = width - 5 - lblCount.getWidth();
	lblCount.y = 5;
	layer.addChild(lblCount);
	*/
	//layer.addChild(getBitmap(panel));
};