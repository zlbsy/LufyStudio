function StrategyChildView(controller,strategyModel){
	var self = this;
	base(self,LView,[controller]);
	self.strategyModel = strategyModel;
	self.set();
	self.addShape(LShape.RECT,[0,0,360,48]);
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
	console.log("self.strategyModel.name()="+self.strategyModel.name());
	var width = 50, height = 50;
	
	var lblName = getStrokeLabel(self.strategyModel.name(),20,"#FFFFFF","#000000",3);
	lblName.x = width + 5;
	lblName.y = 5;
	layer.addChild(lblName);
//	self.layer.addChild((layer));return;
	self.layer.addChild(getBitmap(layer));console.log("over");
	
	var icon = self.strategyModel.icon(new LPoint(50,50));
	self.layer.addChild(icon);
}; 