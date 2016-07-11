function DictionaryView(){
	base(this,LView,[]);
}
DictionaryView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
DictionaryView.prototype.init=function(){
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
DictionaryView.prototype.onClickCloseButton=function(event){
	var self = event.currentTarget.parent.parent;
	self.areaMap = null;
	self.mapData = null;
	self.controller.close();
};
DictionaryView.prototype.listLayerInit=function(){
	var self = this;
	var stamps = ItemMasterModel.getStamps();
	
	self.listView = new LListView();
	self.listView.y = 15;
	self.listView.resize(400, LGlobal.height - 100);
	self.listView.maxPerLine = 4;
	self.listView.cellWidth = 100;
	self.listView.cellHeight = 100;
	self.listLayer.addChild(self.listView);
	self.listView.x = 40;
	self.listView.y = 80;
	var items = [];
	for(var i=0,l=stamps.length;i<l;i++){
		var itemModel = stamps[i];
		var child = new ItemListChildView(itemModel);
		items.push(child);
	}
	self.listView.updateList(items);
};
DictionaryView.prototype.showCharacterDetailed = function(itemModel) {
	var self = this;
	var equipmentDetailed = new EquipmentDetailedView(self.controller,itemModel,self);
	self.addChild(equipmentDetailed);
};
DictionaryView.prototype.ctrlLayerInit=function(){
	var self = this;
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.onClickCloseButton);
};
