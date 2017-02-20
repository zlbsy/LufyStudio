function StoneChildView(itemModel, width){
	var self = this;
	base(self,LListChildView,[]);
	self.itemModel = itemModel;
	self.fullWidth = width;
	self.iconWidth = 50;
	self.iconHeight = 50;
	self.layerInit();
	//self.set();
}
StoneChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
StoneChildView.prototype.updateView = function(bitmap, rectangle, point){
	var self = this;
	if(!self._ll_cacheAsBitmap){
		self.set();
	}
	self.callParent("updateView",arguments);
};
StoneChildView.prototype.getName=function(){
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
StoneChildView.prototype.getExplanation=function(){
	var self = this;
	if(!self.lblExplanation){
		var lblExplanation = getStrokeLabel("",16,"#FFFFFF","#000000",3);
		lblExplanation.width = 290;
		lblExplanation.setWordWrap(true, 22);
		lblExplanation.x = 170;
		lblExplanation.y = 5;
		self.layer.addChild(lblExplanation);
		self.lblExplanation = lblExplanation;
	}
	return self.lblExplanation;
};
StoneChildView.prototype.drawLine=function(){
	var self = this;
	if(self.bitmapLine){
		return;
	}
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = self.fullWidth - self.lblName.x;
	bitmapLine.x = self.lblName.x;
	bitmapLine.y = 68;
	self.layer.addChild(bitmapLine);
	self.bitmapLine = bitmapLine;
};
StoneChildView.prototype.set=function(){
	var self = this;
	var lblName = self.getName();
	lblName.text = String.format("{0}x{1}", self.itemModel.name(), self.itemModel.count());
	
	var lblExplanation = self.getExplanation();
	lblExplanation.text = self.itemModel.explanation();
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
StoneChildView.prototype.iconComplete=function(event){
	var self = event.currentTarget.parent.parent;
	self.cacheAsBitmap(false);
	self.updateView();
};
StoneChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	var equipmentsStoneView = listView.getParentByConstructor(EquipmentsStoneView);
	if(equipmentsStoneView.equipmentModel.stone()){
		obj = {width:300, height:240,
		message:Language.get("强化后，原有的强化效果会消失，要继续强化吗？"), 
		title:Language.get("strengthen"), 
		okEvent:function(e){
			e.currentTarget.parent.remove();
			self.equipStone(equipmentsStoneView);
		},
		cancel:null};
		var dialog = ConfirmWindow(obj);
		LMvc.layer.addChild(dialog);
		return;
	}
	self.equipStone(equipmentsStoneView);
};
StoneChildView.prototype.equipStone=function(equipmentsStoneView){
	var self = this;
	equipmentsStoneView.equipStone(self.itemModel);
};