function StatusBarView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
}
StatusBarView.prototype.set = function(obj){
	var self = this;
	self.setData(obj);
	//isDynamic
	self.mainLayer = new LSprite();
	self.statusLayer = new LSprite();
	self.addChild(self.statusLayer);
	self.setCharacterStatus();
	self.addChildAt(getBitmap(self.mainLayer), 0);
};
StatusBarView.prototype.setData = function(obj){
	var self = this;
	self.maxValue = obj.maxValue;
	if(typeof obj.currentValue == "string"){
		var index = obj.currentValue.indexOf("(");
		var indexEnd = obj.currentValue.indexOf(")");
		self.currentValue = parseInt(obj.currentValue.substring(0,index));
		var subCurrentValue = obj.currentValue.substring(index+1, indexEnd);
		self.subCurrentValue = LMath.isInt(subCurrentValue) ? parseInt(subCurrentValue) : subCurrentValue;
	}else {
		self.currentValue = obj.currentValue;
		self.subCurrentValue = undefined;
	}
	self.normalValue = obj.normalValue;
	if(typeof self.normalValue == UNDEFINED){
		self.normalValue = self.maxValue;
	}
	if(typeof obj.name != UNDEFINED){
		self.name = obj.name;
	}
	if(typeof obj.icon != UNDEFINED){
		self.icon = obj.icon;
	}
	if(typeof obj.frontBar != UNDEFINED){
		self.frontBar = obj.frontBar;
	}
	if(typeof obj.barSize != UNDEFINED){
		self.barSize = obj.barSize;
	}
};
StatusBarView.prototype.setCharacterStatus=function(){
	var self = this;
	var iconX = 0, iconY = 0;
	if(self.icon){
		var iconBitmapData = new LBitmapData(LMvc.datalist[self.icon]);
		var hertIcon = new LBitmap(iconBitmapData);
		hertIcon.scaleX = hertIcon.scaleY = 16 / hertIcon.getHeight();
		self.mainLayer.addChild(hertIcon);
	}
	var barBack = getPanel("blue_bar",self.barSize + 4,14);
	barBack.x = 20;
	self.mainLayer.addChild(barBack);
	
	var currentValue = self.currentValue;
	var strCurrent = currentValue;
	if(typeof self.subCurrentValue != UNDEFINED){
		strCurrent += "(" + self.subCurrentValue + ")";
	}
	value = currentValue / self.maxValue;
	value = value < 0.001 ? 0.001 : value;
	var barSize = self.barSize * value;
	var barIcon = getPanel(self.frontBar,self.barSize,10);
	barIcon.scaleX = value;
	var barEndPosition = barBack.x + self.barSize + 2;
	barIcon.x = barEndPosition - barSize;
	barIcon.y = iconY + 2;
	self.statusLayer.addChild(barIcon);
	var lblBar = getStrokeLabel(String.format("{0} {1}/{2} ",self.name, strCurrent, self.normalValue),14,"#FFFFFF","#000000",3);
	var textEndPosition = iconX + 15 + self.barSize;
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
	var obj = {currentValue:self.value,onUpdate:self.onUpdate,onComplete:self.onComplete};
	LTweenLite.to(self,0.5,obj);
};
StatusBarView.prototype.setStatus=function(){
	var self = this;
	var currentValue = self.currentValue >>0;
	var strCurrent = currentValue;
	if(typeof self.subCurrentValue != UNDEFINED){
		strCurrent += "(" + self.subCurrentValue + ")";
	}
	value = currentValue / self.maxValue;
	value = value < 0.001 ? 0.001 : value;
	var barSize = self.barSize * value;
	self.barIcon.scaleX = value;
	self.barIcon.x = self.barEndPosition - barSize;
	
	self.label.text = String.format("{0} {1}/{2} ",self.name, strCurrent, self.maxValue);
	self.label.x = self.textEndPosition - self.label.getWidth();
};
