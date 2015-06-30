function StatusBarView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
}
StatusBarView.prototype.set = function(isDynamic){
	var self = this;
	//maxValue
	//currentValue
	//label
	//name
	//icon
	//frontBar
	//barSize
	//isDynamic
	//mainLayer
	//statusLayer
};
StatusBarView.prototype.setCharacterStatus=function(){
	var self = this;
	
	var hertIcon = new LBitmap(new LBitmapData(LMvc.datalist[self.icon]));
	hertIcon.scaleX = hertIcon.scaleY = 16 / hertIcon.getHeight();
	self.mainLayer.addChild(hertIcon);
	var barBack = new LPanel(new LBitmapData(LMvc.datalist["blue_bar"]),self.barSize + 4,14);
	barBack.x = hertIcon.x + 20;
	barBack.y = hertIcon.y;
	self.mainLayer.addChild(barBack);
	
	value = currentValue / maxValue;
	value = value < 0.001 ? 0.001 : value;
	var barSize = BattleCharacterStatusView.BAR_SIZE * value;
	var showSize = barSize < iconBitmapData.width ? iconBitmapData.width : barSize;
	var barIcon = new LPanel(new LBitmapData(LMvc.datalist[frontBar]),showSize,10);
	if(barSize < iconBitmapData.width){
		barIcon.scaleX = barSize / showSize;
	}
	var barEndPosition = barBack.x + BattleCharacterStatusView.BAR_SIZE + 2;
	barIcon.x = barEndPosition - barSize;
	barIcon.y = hertIcon.y + 2;
	statusLayer.addChild(barIcon);
	var lblBar = getStrokeLabel(String.format("{0} {1}/{2} ",label,currentValue,maxValue),14,"#FFFFFF","#000000",1);
	var textEndPosition = hertIcon.x + 15 + BattleCharacterStatusView.BAR_SIZE;
	lblBar.x = textEndPosition - lblBar.getWidth();
	lblBar.y = barBack.y + barBack.getHeight() - lblBar.getHeight() - 5;
	statusLayer.addChild(lblBar);
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