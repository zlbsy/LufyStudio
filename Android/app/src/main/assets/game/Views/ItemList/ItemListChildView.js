function ItemListChildView(itemModel) {
	var self = this;
	base(self, LListChildView, []);
	self.itemModel = itemModel;
	self.lock = !LPlugin.stampIsOpen(itemModel.id());
	self.set();
}
ItemListChildView.prototype.layerInit=function(){
	var self = this;
	self.layer = new LSprite();
	self.addChild(self.layer);
};
ItemListChildView.prototype.loadOver=function(event){
	var self = event.currentTarget.parent.parent;
	self.cacheAsBitmap(false);
	self.updateView();
};
ItemListChildView.prototype.getWidth=function(){
	return 100;
};
ItemListChildView.prototype.getHeight=function(){
	return 100;
};
ItemListChildView.prototype.set=function(){
	var self = this;
	self.layerInit();
	
	var width = self.getWidth(), height = self.getHeight();
	
	var icon;
	if(self.lock){
		var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win06"]),width,height);
		self.layer.addChild(winPanel);
		icon = new LBitmap(new LBitmapData(LMvc.datalist["lock"]));
		icon.x = (width - icon.getWidth())*0.5;
		icon.y = (height - icon.getHeight())*0.5;
		self.layer.addChild(icon);
		return;
	}else{
		icon = self.itemModel.icon(new LPoint(width,height));
		icon.addEventListener(LEvent.COMPLETE,self.loadOver);
		self.layer.addChild(icon);
	}
	var name = getStrokeLabel(self.itemModel.name(),12,"#FFFFFF","#000000",2);
	name.x = 10;
	name.y = 10;
	self.layer.addChild(name);
};
ItemListChildView.prototype.onClick = function(event) {
	var self = event.target;
	if(self.lock){
		return;
	}
	var listView = event.currentTarget;
	var parentView = listView.getParentByConstructor(ItemListView);;
	parentView.showCharacterDetailed(self.itemModel);
};