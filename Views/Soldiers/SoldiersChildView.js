function SoldiersChildView(soldierModel){
//function SoldiersChildView(controller,soldierModel){
	var self = this;
	base(self, LListChildView, []);
	self.soldierModel = soldierModel;
	self.set();
	return;
	base(self,LView,[controller]);
	self.soldierModel = soldierModel;
	self.set();
	self.addShape(LShape.RECT,[0,0,415,48]);
}
SoldiersChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
SoldiersChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	
	var layer = new LSprite();
	
	var width = 50, height = 50;
	
	var lblName = getStrokeLabel(self.soldierModel.name(),23,"#FFFFFF","#000000",3);
	lblName.x = width + 5;
	lblName.y = 5;
	layer.addChild(lblName);
	
	var lblLevel = getStrokeLabel(String.format("熟练度:{0} ",self.soldierModel.proficiency()),23,"#FFFFFF","#000000",3);
	lblLevel.x = lblName.x + 150;
	lblLevel.y = lblName.y;
	layer.addChild(lblLevel);
	
	self.layer.addChild(getBitmap(layer));
	var icon = self.soldierModel.icon(new LPoint(width,height),true);
	self.layer.addChild(icon);
};