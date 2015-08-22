function StatusBarView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
}
StatusBarView.prototype.set = function(obj){
	var self = this;
	self.maxValue = obj.maxValue;
	self.currentValue = obj.currentValue;
	self.normalValue = obj.normalValue;
	//label
	self.name = obj.name;
	self.icon = obj.icon;
	self.frontBar = obj.frontBar;
	self.barSize = obj.barSize;
	//isDynamic
	self.mainLayer = new LSprite();
	self.statusLayer = new LSprite();
	self.addChild(self.statusLayer);
	self.setCharacterStatus();
	self.addChildAt(getBitmap(self.mainLayer), 0);
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
	var barIcon = getBitmap(new LPanel(new LBitmapData(LMvc.datalist[self.frontBar]),self.barSize,10));
	barIcon.scaleX = value;
	var barEndPosition = barBack.x + self.barSize + 2;
	barIcon.x = barEndPosition - barSize;
	barIcon.y = hertIcon.y + 2;
	self.statusLayer.addChild(barIcon);
	var lblBar = getStrokeLabel(String.format("{0} {1}/{2} ",self.name,self.currentValue,self.normalValue),14,"#FFFFFF","#000000",3);
	var textEndPosition = hertIcon.x + 15 + self.barSize;
	lblBar.x = textEndPosition - lblBar.getWidth();
	lblBar.y = barBack.y + barBack.getHeight() - lblBar.getHeight() - 5;
	self.statusLayer.addChild(lblBar);
	self.textEndPosition = textEndPosition;
	self.barEndPosition = barEndPosition;
	self.barIcon = barIcon;
	self.label = lblBar;
};
StatusBarView.prototype.onUpdate=function(event){
	event.target.setStatus();
};
StatusBarView.prototype.onComplete=function(event){
	var self = event.target;
	self.setStatus();
	self.dispatchEvent(LEvent.COMPLETE);
};
StatusBarView.prototype.changeValue=function(value){
	var self = this;
	self.value = self.currentValue + value;
	if(self.value > self.maxValue){
		self.value = self.maxValue;
	}else if(self.value < 0){
		self.value = 0;
	}
	LTweenLite.to(self,0.5,{currentValue:self.value,onUpdate:self.onUpdate,onComplete:self.onComplete});
};
StatusBarView.prototype.setStatus=function(){
	var self = this;
	var value = self.currentValue / self.maxValue;
	value = value < 0.001 ? 0.001 : value;
	var barSize = self.barSize * value;
	self.barIcon.scaleX = value;
	self.barIcon.x = self.barEndPosition - barSize;
	
	self.label.text = String.format("{0} {1}/{2} ",self.name,self.currentValue>>0,self.maxValue);
	self.label.x = self.textEndPosition - self.label.getWidth();
};
