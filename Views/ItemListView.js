function ItemListView(){
	base(this,LView,[]);
}
ItemListView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
ItemListView.prototype.init=function(){
	var self = this;
	var windowBackgrond = getBlackBitmap();
	self.addChild(windowBackgrond);
	
	var title = Language.get("stamp_list");
	var txtTitle = getStrokeLabel(title,30,"#FFFFFF","#CCCCCC",1);
	txtTitle.x = (LGlobal.width - txtTitle.getWidth()) * 0.5;
	txtTitle.y = 20;
	self.addChild(txtTitle);
	
	self.listLayer = new LSprite();
	self.addChild(self.listLayer);
	self.listLayerInit();
	
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	self.ctrlLayerInit();
};
ItemListView.prototype.onClickCloseButton=function(event){
	var self = event.currentTarget.parent.parent;
	self.areaMap = null;
	self.mapData = null;
	self.controller.close();
};
ItemListView.prototype.listLayerInit=function(){
	var self = this;
	var stamps = ItemMasterModel.getStamps();
	var backLayer = new LSprite();
	for(var i=0,l=stamps.length;i<l;i++){
		var itemModel = stamps[i];
		var child = new ItemListChildView(self.controller, itemModel);
		child.x = 110 * (i % 4);
		child.y = 110 * (i / 4 >>> 0);
		backLayer.addChild(child);
	}
	backLayer.graphics.drawRect(0, "#000000", [0, 0, 430, 110 * ((stamps.length / 4 >>> 0) + 1) - 10]);
	
	self.listLayer.listLayer = backLayer;
	var left = backLayer.graphics.startX(), right = left + backLayer.graphics.getWidth();
	var sc = new LScrollbar(backLayer, 430, LGlobal.height - 100, 10);
	sc.x = 25;
	sc.y = 80;
	self.listLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.stampClickDown.bind(self));
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.stampClickUp.bind(self));
	
};
ItemListView.prototype.stampClickDown = function(event) {
	var self = this;
	var stamp = event.target;
	self.clickIndex = stamp.objectIndex;
	stamp.offsetX = event.offsetX;
	stamp.offsetY = event.offsetY;
};
ItemListView.prototype.stampClickUp = function(event) {
	if(event.target.constructor.name != "ItemListChildView"){
		return;
	}
	var self = this;
	var stamp = event.target;
	if(self.clickIndex != stamp.objectIndex){
		return;
	}
	if (stamp.offsetX && stamp.offsetY && Math.abs(stamp.offsetX - event.offsetX) < 5 && Math.abs(stamp.offsetY - event.offsetY) < 5) {
		var itemModel = new ItemModel(null,{item_id:stamp.itemModel.id()});
		var equipmentDetailed = new EquipmentDetailedView(self.controller,itemModel,self);
		self.addChild(equipmentDetailed);
	}
};
ItemListView.prototype.ctrlLayerInit=function(){
	var self = this;
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.onClickCloseButton);
};
