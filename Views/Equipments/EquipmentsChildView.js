function EquipmentsChildView(itemModel, width){
	var self = this;
	base(self,LListChildView,[]);
	self.itemModel = itemModel;
	self.fullWidth = width;
	self.set();
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
	layer.graphics.drawRect(0,"#000000",[0,0,self.fullWidth,48]);
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
	var equipment = self.itemModel.icon(new LPoint(width,height),self.iconComplete);
	self.layer.addChild(equipment);
};
EquipmentsChildView.prototype.iconComplete=function(event){
	var self = event.currentTarget.parent.parent;
	self.cacheAsBitmap(false);
	self.updateView();
};
EquipmentsChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	var equipmentsView = listView.getParentByConstructor(EquipmentsView);
	equipmentsView.equipmentDetailedDialog(self.itemModel);
	return;
	var canSelect = (!LMvc.BattleController && self.characterModel.seigniorId() == LMvc.selectSeignorId);
	if(canSelect && event.offsetX > self.checkbox.x - 10){
		self.toSelected(listView);
		return;
	}
	var soldierDetailed = new SoldierDetailedView(null,self.soldierModel);
	var obj = {title:self.soldierModel.name(),subWindow:soldierDetailed,width:400,height:480};
	if(canSelect){
		obj.okEvent = function(e){
			self.toSelected(listView);
			e.currentTarget.parent.remove();
		};
		obj.cancelEvent = null;
	}
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};