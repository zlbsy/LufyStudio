function EquipmentsChildView(controller,itemModel){
	var self = this;
	base(self,LView,[controller]);
	self.itemModel = itemModel;
	self.set();
	self.addShape(LShape.RECT,[0,0,415,48]);
}
EquipmentsChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
EquipmentsChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	
	var layer = new LSprite();
	
	var width = 50, height = 50;
	
	var lblName = getStrokeLabel(self.itemModel.name(),25,"#FFFFFF","#000000",3);
	lblName.x = width + 5;
	lblName.y = 5;
	layer.addChild(lblName);
	
	var lblLevel = getStrokeLabel(String.format("Lv.{0}",self.itemModel.lv()),20,"#FFFFFF","#000000",3);
	lblLevel.x = lblName.x + 180;
	lblLevel.y = lblName.y;
	layer.addChild(lblLevel);
	
	var lblExp = getStrokeLabel(String.format("Exp.{0}","44/133"),16,"#000000","#000000",0);
	lblExp.x = lblLevel.x + 60;
	lblExp.y = lblName.y;
	layer.addChild(lblExp);
	
	layer.graphics.drawRect(0, "#000000", [0,0,415,48]);
	layer.graphics.drawRect(1, "#000000", [lblExp.x - 5, 10, 120, 15]);
	layer.graphics.drawRect(0, "#FFFF00", [lblExp.x - 5 + (120 * 0.3) + 1, 11, 120 - (120 * 0.3) - 2, 13], true, "#FFFF00");
	
	self.layer.addChild(getBitmap(layer));
	var equipment = self.itemModel.icon(new LPoint(width,height));
	self.layer.addChild(equipment);
};