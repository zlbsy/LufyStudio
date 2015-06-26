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
	var width = 50, height = 50;
	
	var lblName = getStrokeLabel(self.strategyModel.name(),20,"#FFFFFF","#000000",3);
	lblName.x = width + 5;
	lblName.y = 5;
	layer.addChild(lblName);
	
	var effectType = (function(){
		switch(self.strategyModel.effectType()){
			case StrategyEffectType.Attack:
				return "攻击";
		}
	})();
	
	var lblEffectType = getStrokeLabel(effectType,20,"#FFFFFF","#000000",3);
	lblEffectType.x = lblName.x + 100;
	lblEffectType.y = 5;
	layer.addChild(lblEffectType);
	
	var lblMp = getStrokeLabel(self.strategyModel.cost(),20,"#FFFFFF","#000000",3);
	lblMp.x = lblEffectType.x + 120;
	lblMp.y = 5;
	layer.addChild(lblMp);
	
	self.layer.addChild(getBitmap(layer));
	
	var icon = self.strategyModel.icon(new LPoint(50,50));
	self.layer.addChild(icon);
}; 