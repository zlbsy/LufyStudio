function BattleTerrainView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.init();
}
BattleTerrainView.prototype.init = function(){
	var self = this;
	var background = new LSprite();
	background.addChild(getTranslucentBitmap(160,100));
	self.addChild(background);
	self.bitmap = new LBitmap(new LBitmapData("#ffffff",0,0,BattleCharacterSize.width,BattleCharacterSize.height,LBitmapData.DATA_CANVAS));
	self.bitmap.x = self.bitmap.y = 10;
	self.addChild(self.bitmap);
	var lblName = getStrokeLabel("地形",20,"#FFFFFF","#000000",4);
	lblName.x = self.bitmap.x + BattleCharacterSize.width + 10;
	lblName.y = self.bitmap.y;
	self.addChild(lblName);
	self.nameLabel = lblName;
	
	var lblComment = getStrokeLabel("可以恢复",16,"#FF0000","#000000",4);
	lblComment.x = lblName.x;
	lblComment.y = lblName.y + lblName.getHeight() + 5;
	self.addChild(lblComment);
	self.commentLabel = lblComment;
	
	var bitmapStrategys = [
		new LBitmap(new LBitmapData(LMvc.datalist["icon_strategy"],0,0,30,30)),
		new LBitmap(new LBitmapData(LMvc.datalist["icon_strategy"],30,0,30,30)),
		new LBitmap(new LBitmapData(LMvc.datalist["icon_strategy"],60,0,30,30)),
		new LBitmap(new LBitmapData(LMvc.datalist["icon_strategy"],90,0,30,30))
	];
	for(var i = 0;i < bitmapStrategys.length;i++){
		var bitmap = bitmapStrategys[i];
		bitmap.x = 10 + i * 35;
		bitmap.y = self.bitmap.y + self.bitmap.getHeight() + 5;
		self.addChild(bitmap);
	}
	self.bitmapStrategys = bitmapStrategys;
};
BattleTerrainView.prototype.show = function(sx,sy,terrainId){
	var self = this;
	if(self.tween){
		LTweenLite.remove(self.tween);
	}
	var terrainModel = TerrainMasterModel.getMaster(terrainId);
	self.nameLabel.text = terrainModel.name();
	var strategy = terrainModel.strategy();
	for(var i=0;i<strategy.length;i++){
		//self.bitmapStrategys[i].alpha = strategy[i] ? 1 : 0.3;
		self.setChildIndex(self.bitmapStrategys[i], strategy[i] ? self.numChildren - 1 : 0);
	}
	var comment = terrainModel.comment();
	self.commentLabel.visible = comment ? true:false;
	if(self.commentLabel.visible){
		self.commentLabel.text = comment;
	}
		self.bitmap.bitmapData.copyPixels(self.controller.view.mapLayer.bitmapData,new LRectangle(sx,sy,BattleCharacterSize.width,BattleCharacterSize.height),new LPoint(0,0));
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
	self.tween = LTweenLite.to(self,0.2,{alpha:0,delay:0.5,onComplete:self.onComplete});
};
BattleTerrainView.prototype.onComplete = function(event){
	var self = event.target;
	self.tween=null;
	self.visible = false;
};