function StrategyChildView(strategyModel, isLearned, width){
	var self = this;
	base(self,LListChildView,[]);
	self.strategyModel = strategyModel;
	self.isLearned = isLearned;
	self.fullWidth = width;
	self.layerInit();
	//self.set();
}
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
	var color = self.isLearned ? "#FFFFFF" : "#CCCCCC";
	var lineColor = self.isLearned ? "#000000" : "#999999";
	var lblName = self.getName(color,lineColor,width + 5);
	lblName.text = self.strategyModel.name();
	self.setBitmapLine(width + 5);
	var effectType = Language.get("StrategyEffectType." + self.strategyModel.effectType());
	var lblEffectType = self.getEffectType(color,lineColor,width + 105);
	lblEffectType.text = effectType;
	var lblMp = self.getMP(color,lineColor,width + 225);
	
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