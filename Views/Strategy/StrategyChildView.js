function StrategyChildView(strategyModel, isLearned, width){
	var self = this;
	base(self,LListChildView,[]);
	self.strategyModel = strategyModel;
	self.isLearned = isLearned;
	self.fullWidth = width;
	self.set();
}
StrategyChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
StrategyChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	var layer = new LSprite();
	var width = 50, height = 50;
	var color = self.isLearned ? "#FFFFFF" : "#CCCCCC";
	var lineColor = self.isLearned ? "#000000" : "#999999";
	var lblName = getStrokeLabel(self.strategyModel.name(),20,color,lineColor,3);
	lblName.x = width + 5;
	lblName.y = 10;
	layer.addChild(lblName);
	
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = self.fullWidth - lblName.x;
	bitmapLine.x = lblName.x;
	bitmapLine.y = 48;
	layer.addChild(bitmapLine);
	var effectType = Language.get("StrategyEffectType." + self.strategyModel.effectType());
	
	var lblEffectType = getStrokeLabel(effectType,20,color,lineColor,3);
	lblEffectType.x = lblName.x + 100;
	lblEffectType.y = 10;
	layer.addChild(lblEffectType);
	
	var lblMp = getStrokeLabel(self.strategyModel.cost() + "M ",20,color,lineColor,3);
	lblMp.x = lblEffectType.x + 120;
	lblMp.y = 10;
	layer.addChild(lblMp);
	
	self.layer.addChild(layer);
	
	var icon = self.strategyModel.icon(new LPoint(50,50),self.iconComplete);
	self.layer.addChild(icon);
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