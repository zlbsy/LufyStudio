function BattleResultConfirmView(controller, confirmType, params){
	var self = this;
	LExtends(self,LView,[controller]);
	self.initLayer();
	self.setBackground();
	if(confirmType == BattleResultConfirmType.selfCaptive){
		self.setSelfCaptive();
	} 
}
BattleResultConfirmView.prototype.initLayer = function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
};
BattleResultConfirmView.prototype.setBackground = function(){
	var self = this;
	var windowData = new LBitmapData(LMvc.datalist["win05"]);
	var windowPanel = new LPanel(windowData,340,230);
	windowPanel.cacheAsBitmap(true);
	self.baseLayer.addChild(windowPanel);
};
BattleResultConfirmView.prototype.setSelfCaptive = function(){
	var self = this;
	var face = self.characterModel.face();
	face.x = 5;
	face.y = 5;
	self.baseLayer.addChild(face);
	
};