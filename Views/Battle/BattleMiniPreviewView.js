function BattleMiniPreviewView(controller){
	var self = this;
	LExtends(self,LView,[controller]);return;
	self.alpha = 0.7;
	var bitmapData = new LBitmapData(LMvc.datalist["img-small"]);
	
	self.map = new LBitmap(bitmapData);
	self.map.x = self.map.y = 10;
	self.addChild(self.map);
	return;
	var miniMapBar = new WindowPanel(1,bitmapData.width + 20,bitmapData.height + 20);
	self.addChild(miniMapBar);
};