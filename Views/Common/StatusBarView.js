function StatusBarView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
}
StatusBarView.prototype.set = function(obj){
	var self = this;
	self.maxValue = obj.maxValue;
	self.currentValue = obj.currentValue;
	//label
	self.name = obj.name;
	self.icon = obj.icon;
	self.frontBar = obj.frontBar;
	self.barSize = obj.barSize;
	//isDynamic
	self.mainLayer = new LSprite();
	self.addChild(self.mainLayer);
	self.statusLayer = new LSprite();
	self.addChild(self.statusLayer);
	self.setCharacterStatus();
};
StatusBarView.prototype.setCharacterStatus=function(){
	var self = this;
	
	var iconBitmapData = new LBitmapData(LMvc.datalist[self.icon]);
	var hertIcon = new LBitmap(iconBitmapData);
	hertIcon.scaleX = hertIcon.scaleY = 16 / hertIcon.getHeight();
	self.mainLayer.addChild(hertIcon);
	var barBack = new LPanel(new LBitmapData(LMvc.datalist["blue_bar"]),self.barSize + 4,14);
	barBack.x = hertIcon.x + 20;
	barBack.y = hertIcon.y;
	self.mainLayer.addChild(barBack);
	
	value = self.currentValue / self.maxValue;
	value = value < 0.001 ? 0.001 : value;
	var barSize = self.barSize * value;
	var showSize = barSize < iconBitmapData.width ? iconBitmapData.width : barSize;
	var barIcon = new LPanel(new LBitmapData(LMvc.datalist[self.frontBar]),showSize,10);
	if(barSize < iconBitmapData.width){
		barIcon.scaleX = barSize / showSize;
	}
	var barEndPosition = barBack.x + self.barSize + 2;
	barIcon.x = barEndPosition - barSize;
	barIcon.y = hertIcon.y + 2;
	self.statusLayer.addChild(barIcon);
	var lblBar = getStrokeLabel(String.format("{0} {1}/{2} ",self.name,self.currentValue,self.maxValue),14,"#FFFFFF","#000000",1);
	var textEndPosition = hertIcon.x + 15 + self.barSize;
	lblBar.x = textEndPosition - lblBar.getWidth();
	lblBar.y = barBack.y + barBack.getHeight() - lblBar.getHeight() - 5;
	self.statusLayer.addChild(lblBar);
	return;
	if(isDynamic){
		self.currentValue = currentValue;
		self.maxValue = maxValue;
		self.textEndPosition = textEndPosition;
		self.barEndPosition = barEndPosition;
		self.barIcon = barIcon;
		self.formatLabel = label;
		self.label = lblBar;
		LTweenLite.to(self,0.5,{currentValue:self.currentValue + parseInt(self.changeValue),onUpdate:self.onUpdate,onComplete:self.onComplete});
	}
};