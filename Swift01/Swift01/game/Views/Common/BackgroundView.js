function BackgroundView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
}
BackgroundView.prototype.set = function(bitmapData, targetLayer){
	var self = this;
	self.baseBitmapData = bitmapData;
	self.targetLayer = targetLayer;
	var data = new LBitmapData(null,0,0,LMvc.screenWidth,LMvc.screenHeight,LBitmapData.DATA_CANVAS);
	self.map = new LBitmap(data);
	self.addChild(self.map);

	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
BackgroundView.prototype.onframe = function(event){
	var self = event.currentTarget;
	if(self.ll_x == self.targetLayer.x && self.ll_y == self.targetLayer.y){
		return;
	}
	self.ll_x = self.targetLayer.x;
	self.ll_y = self.targetLayer.y;
	self.map.bitmapData.copyPixels(self.baseBitmapData, new LRectangle(-self.targetLayer.x,-self.targetLayer.y, LMvc.screenWidth,LMvc.screenHeight), new LPoint(0,0));
};
BackgroundView.prototype.updateView = function(){
	this.ll_x = Number.MIN_VALUE;
};