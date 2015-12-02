function BattleMiniPreviewView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.alpha = 0.7;
	self.maxSize = 200;
	var bitmapData = self.model.mapBitmapData;
	var bitmap = new LBitmap(bitmapData);
	if(bitmapData.width > bitmapData.height){
		bitmap.scaleX = bitmap.scaleY = self.maxSize / bitmapData.width;
	}else{
		bitmap.scaleX = bitmap.scaleY = self.maxSize / bitmapData.height;
	}
	self.map = new LSprite();
	self.map.addChild(bitmap);
	self.map.cacheAsBitmap(true);
	self.map.x = self.map.y = 10;
	self.addChild(self.map);
};