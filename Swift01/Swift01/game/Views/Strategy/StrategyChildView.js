function StrategyChildView(strategyModel, isLearned, width){
	var self = this;
	base(self,LListChildView,[]);
	self.init(strategyModel, isLearned, width);
	self.layerInit();
	//self.set();
}
StrategyChildView._list = [];
StrategyChildView._listCount = 0;
StrategyChildView.createChild = function(strategyModel, isLearned, width){
	if(StrategyChildView._list.length > 0){
		var child = StrategyChildView._list.shift();
		child.init(strategyModel, isLearned, width);
		return child;
	}
	return new StrategyChildView(strategyModel, isLearned, width);
};
StrategyChildView.prototype.removeAllChild = function() {};
StrategyChildView.prototype.die = function() {
	var self = this;
	var has = false;
	for(var i=0, l=StrategyChildView._list.length;i<l;i++){
		var child = StrategyChildView._list[i];
		if(child.objectIndex == self.objectIndex){
			has = true;
			break;
		}
	}
	if(!has){
		self.strategyModel = null;
		self.cacheAsBitmap(false);
		StrategyChildView._list.push(self);
	}
}; 
StrategyChildView.prototype.init = function(strategyModel, isLearned, width) {
	var self = this;
	self.strategyModel = strategyModel;
	self.isLearned = isLearned;
	self.fullWidth = width;
};
StrategyChildView.prototype.updateView = function(bitmap, rectangle, point){
	var self = this;
	if(!self._ll_cacheAsBitmap){
		self.set();
	}
	self.callParent("updateView",arguments);
};
StrategyChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
StrategyChildView.prototype.getName=function(color,lineColor,x){
	var self = this;
	if(!self.lblName){
		var lblName = getStrokeLabel("",20,color,lineColor,3);
		lblName.x = x;
		lblName.y = 10;
		self.layer.addChild(lblName);
		self.lblName = lblName;
	}
	self.lblName.color = color;
	self.lblName.lineColor = lineColor;
	return self.lblName;
};
StrategyChildView.prototype.setBitmapLine=function(x){
	var self = this;
	if(!self.bitmapLine){
		var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
		bitmapLine.scaleX = self.fullWidth - x;
		bitmapLine.x = x;
		bitmapLine.y = 48;
		self.layer.addChild(bitmapLine);
		self.bitmapLine = bitmapLine;
	}
	self.bitmapLine.scaleX = self.fullWidth - x;
};
StrategyChildView.prototype.getEffectType=function(color,lineColor,x){
	var self = this;
	if(!self.lblEffectType){
		var lblEffectType = getStrokeLabel("",20,color,lineColor,3);
		lblEffectType.x = x;
		lblEffectType.y = 10;
		self.layer.addChild(lblEffectType);
		self.lblEffectType = lblEffectType;
	}
	self.lblEffectType.color = color;
	self.lblEffectType.lineColor = lineColor;
	return self.lblEffectType;
};
StrategyChildView.prototype.getMP=function(color,lineColor,x){
	var self = this;
	if(!self.lblMp){
		var lblMp = getStrokeLabel("",20,color,lineColor,3);
		lblMp.x = x;
		lblMp.y = 10;
		self.layer.addChild(lblMp);
		self.lblMp = lblMp;
	}
	self.lblMp.color = color;
	self.lblMp.lineColor = lineColor;
	return self.lblMp;
};
StrategyChildView.prototype.set=function(){
	var self = this;
	var width = 50, height = 50;
	var color = self.isLearned ? "#FFFFFF" : "#666666";
	var lineColor = self.isLearned ? "#000000" : "#000000";
	var lblName = self.getName(color,lineColor,width + 5);
	lblName.text = self.strategyModel.name();
	self.setBitmapLine(width + 5);
	var effectType = Language.get("StrategyEffectType." + self.strategyModel.effectType());
	var lblEffectType = self.getEffectType(color,lineColor,width + 105);
	lblEffectType.text = effectType;
	var lblMp = self.getMP(color,lineColor,width + 225);
	lblMp.text = self.strategyModel.cost();
	var strategyId = self.strategyModel.id();
	if(!self.strategyId || strategyId != self.strategyId){
		if(self.icon){
			self.icon.remove();
		}
		self.strategyId =strategyId;
		self.icon = self.strategyModel.icon(new LPoint(50,50),self.iconComplete);
		self.layer.addChild(self.icon);
	}
}; 
StrategyChildView.prototype.iconComplete=function(event){
	var self = event.currentTarget.parent.parent;
	self.cacheAsBitmap(false);
	self.updateView();
};
StrategyChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	var strategyView = listView.parent;
	while(strategyView.constructor.name != "StrategyView"){
		strategyView = strategyView.parent;
	}
	strategyView.strategySelect(self.strategyModel);
};