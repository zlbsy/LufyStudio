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
	layer.graphics.drawRect(0,"#000000",[0,0,415,48]);
	var lblName = getStrokeLabel(self.itemModel.name(),25,"#FFFFFF","#000000",3);
	lblName.x = width + 5;
	lblName.y = 5;
	layer.addChild(lblName);
	
	var params = self.itemModel.params();
	for(var i = 0;i < params.length && i<2;i++){
		var key = params[i];
		var label = getStrokeLabel(Language.get(key) + " + " + self.itemModel.getParam(key),16,"#FFFFFF","#000000",4);
		label.x = 300;
		label.y = params.length > 1 ? (i * 23 + 5) : 15;
		layer.addChild(label);
	}
	
	self.layer.addChild(getBitmap(layer));
	var equipment = self.itemModel.icon(new LPoint(width,height));
	self.layer.addChild(equipment);
};