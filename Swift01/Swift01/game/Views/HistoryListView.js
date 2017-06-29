function HistoryListView(controller){
	base(this,LView,[controller]);
}
HistoryListView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
	this.controller.addEventListener(CharacterListEvent.CLOSE, self.closeCharacterList);
};
HistoryListView.prototype.init=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	
	var windowBackgrond = getBlackBitmap();
	self.baseLayer.addChild(windowBackgrond);
	
	var title = Language.get("历史遗迹");
	var txtTitle = getStrokeLabel(title,30,"#FFFFFF","#CCCCCC",1);
	txtTitle.x = (LMvc.screenWidth - txtTitle.getWidth()) * 0.5;
	txtTitle.y = 20;
	self.baseLayer.addChild(txtTitle);
	
	self.listLayer = new LSprite();
	self.baseLayer.addChild(self.listLayer);
	self.listLayerInit();
	
	self.ctrlLayer = new LSprite();
	self.baseLayer.addChild(self.ctrlLayer);
	self.ctrlLayerInit();
};
HistoryListView.prototype.onClickCloseButton=function(event){
	var self = event.currentTarget.getParentByConstructor(HistoryListView);
	self.controller.close();
};
HistoryListView.prototype.listLayerInit=function(){
	var self = this;
	self.listView = new LListView();
	self.listView.y = 15;
	self.listView.resize(440, LMvc.screenHeight - 100);
	self.listView.maxPerLine = 1;
	self.listView.cellWidth = 440;
	self.listView.cellHeight = 100;
	self.listLayer.addChild(self.listView);
	self.listView.x = 20;
	self.listView.y = 80;
	var items = [];
	for(var i=0,l=HistoryListConfig.length;i<l;i++){
		var historyObject = HistoryListConfig[i];
		var child = new HistoryListChildView(historyObject);
		items.push(child);
	}
	self.listView.updateList(items);
};
HistoryListView.prototype.showDetailed = function(historyObject) {
	var self = this;
	var detailedView = new HistoryListDetailedView(self.controller,historyObject);
	detailedView.name = "historyListDetailedView";
	self.addChild(detailedView);
	self.baseLayer.visible = false;
};
HistoryListView.prototype.closeDetailed = function() {
	var self = this;
	var detailedView = self.getChildByName("historyListDetailedView");
	detailedView.remove();
	self.baseLayer.visible = true;
};
HistoryListView.prototype.ctrlLayerInit=function(){
	var self = this;
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LMvc.screenWidth - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.onClickCloseButton);
};
HistoryListView.prototype.addCharacterListView=function(characterListView){
	var self = this;
	var detailedView = self.getChildByName("historyListDetailedView");
	detailedView.visible = false;
	characterListView.name = "characterListView";
	self.addChild(characterListView);
};
HistoryListView.prototype.closeCharacterList=function(event){
	var self = event.currentTarget.view;
	var detailedView = self.getChildByName("historyListDetailedView");
	detailedView.visible = true;
	var characterListView = self.getChildByName("characterListView");
	characterListView.visible = false;
	return true;
};