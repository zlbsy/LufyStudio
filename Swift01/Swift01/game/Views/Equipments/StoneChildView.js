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
	var obj = {width:300, height:240,title:Language.get("strengthen"), 
		okEvent:function(e){
			e.currentTarget.parent.remove();
			self.equipStone(equipmentsStoneView);
		},
		cancel:null};
	if(equipmentsStoneView.equipmentModel.stone()){
		obj.message=Language.get("强化后，原有的强化效果会消失，要继续强化吗？");
	}else{
		obj.message=Language.get("消化强化石进行强化吗？");
	}
	var dialog = ConfirmWindow(obj);
	LMvc.layer.addChild(dialog);
};
StoneChildView.prototype.equipStone=function(equipmentsStoneView){
	var self = this;
	var strengthBitmap = new LBitmap(new LBitmapData(LMvc.datalist["strength"]));
	strengthBitmap.x = -0.5*strengthBitmap.getWidth();
	strengthBitmap.y = -0.5*strengthBitmap.getHeight();
	var strength = new LSprite();
	strength.x = equipmentsStoneView.icon.x + equipmentsStoneView.icon.getWidth() * 0.5;
	strength.y = equipmentsStoneView.icon.y + equipmentsStoneView.icon.getHeight() * 0.5;
	strength.scaleX = strength.scaleY = 0.5;
	strength.alpha = 0;
	strength.addChild(strengthBitmap);
	
	LMvc.layer.addChild(strength);
	LTweenLite.to(strength,0.1,{alpha:1})
	.to(strength,0.3,{scaleX:2,scaleY:2,ease:Back.easeIn})
	.to(strength,0.1,{alpha:0,onComplete:function(event){
		event.target.remove();
		equipmentsStoneView.equipStone(self.itemModel);
	}});
};