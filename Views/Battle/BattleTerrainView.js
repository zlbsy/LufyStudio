function BattleTerrainView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.init();
}
BattleTerrainView.prototype.init = function(){
	var self = this;
	var background = new LPanel(new LBitmapData(LMvc.datalist["win03"]),160,100);
	self.addChild(background);
	self.bitmap = new LBitmap(new LBitmapData("#ffffff",0,0,BattleCharacterSize.width,BattleCharacterSize.height,LBitmapData.DATA_CANVAS));
	self.bitmap.x = self.bitmap.y = 10;
	self.addChild(self.bitmap);
};
BattleTerrainView.prototype.show = function(sx,sy){
	var self = this;	self.bitmap.bitmapData.copyPixels(self.controller.view.mapLayer.bitmapData,new LRectangle(sx,sy,BattleCharacterSize.width,BattleCharacterSize.height),new LPoint(0,0));
	self.visible = true;
	self.alpha = 1;
	self.x = mouseX + BattleCharacterSize.width;
	self.y = mouseY;
	if(self.x + self.getWidth() > LGlobal.width){
		self.x = mouseX - BattleCharacterSize.width - self.getWidth();
	}
	if(self.y + self.getHeight() > LGlobal.height){
		self.y = LGlobal.height - self.getWidth();
	}
};