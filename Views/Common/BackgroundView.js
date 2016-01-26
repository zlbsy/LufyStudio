function BackgroundView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
}
BackgroundView.prototype.set = function(bitmapData, targetLayer){
	var self = this;
	self.baseBitmapData = bitmapData;
	self.targetLayer = targetLayer;
	var data = new LBitmapData(null,0,0,LGlobal.width,LGlobal.height,LBitmapData.DATA_CANVAS);
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
	self.map.bitmapData.copyPixels(self.baseBitmapData, new LRectangle(-self.targetLayer.x,-self.targetLayer.y, LGlobal.width,LGlobal.height), new LPoint(0,0));
	/*self.map.x = -point.x;
	self.map.y = -point.y;
	self.map.bitmapData.setProperties(self.map.x,self.map.y,LGlobal.width,LGlobal.height);*/
};