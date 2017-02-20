function EquipmentsChildView(itemModel, width){
	var self = this;
	base(self,LListChildView,[]);
	self.itemModel = itemModel;
	self.fullWidth = width;
	self.iconWidth = 50;
	self.iconHeight = 50;
	self.layerInit();
	//self.set();
}
EquipmentsChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
EquipmentsChildView.prototype.updateView = function(bitmap, rectangle, point){
	var self = this;
	if(!self._ll_cacheAsBitmap){
		self.set();
	}
	self.callParent("updateView",arguments);
};
EquipmentsChildView.prototype.getName=function(){
	var self = this;
	if(!self.lblName){
		var lblName = getStrokeLabel("",23,"#FFFFFF","#000000",3);
		lblName.x = self.iconWidth + 5;
		lblName.y = 5;
		self.layer.addChild(lblName);
		self.lblName = lblName;
	}
	return self.lblName;
};
EquipmentsChildView.prototype.getParams=function(){
	var self = this;
	if(!self.lblParams){
		var lblParams = getStrokeLabel("",16,"#FFFFFF","#000000",3);
		lblParams.setWordWrap(true, 23);
		lblParams.x = 200;
		lblParams.y = 5;
		self.layer.addChild(lblParams);
		self.lblParams = lblParams;
	}
	return self.lblParams;
};
EquipmentsChildView.prototype.drawLine=function(){
	var self = this;
	if(self.bitmapLine){
		return;
	}
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = self.fullWidth - self.lblName.x;
	bitmapLine.x = self.lblName.x;
	bitmapLine.y = 48;
	self.layer.addChild(bitmapLine);
	self.bitmapLine = bitmapLine;
};
EquipmentsChildView.prototype.set=function(){
	var self = this;
	var lblName = self.getName();
	lblName.text = String.format("{0}x{1}", self.itemModel.name(), self.itemModel.count());
	
	var lblParams = self.getParams();
	var txtParams = "", add = "";
	var params = self.itemModel.params();
	for(var i = 0;i < params.length;i++){
		var key = params[i];
		txtParams += Language.get(key) + " + " + self.itemModel.getParam(key);
		if(i % 2 == 0){
			txtParams += "  ";
		}else{
			txtParams += "\n";
		}
	}
	lblParams.text = txtParams;
	self.drawLine();
	
	if(!self.itemId || self.itemId != self.itemModel.id()){
		if(self.icon){
			self.icon.remove();
		}
		self.itemId =self.itemModel.id();
		self.icon = self.itemModel.icon(new LPoint(self.iconWidth, self.iconHeight),self.iconComplete);
		self.layer.addChild(self.icon);
	}
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
};