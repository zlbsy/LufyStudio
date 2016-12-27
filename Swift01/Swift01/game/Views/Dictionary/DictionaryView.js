function DictionaryView(){
	base(this,LView,[]);
	this.init();
}
DictionaryView.prototype.init=function(){
	var self = this;
	var windowBackgrond = getTranslucentMask();
	self.addChild(windowBackgrond);
	
	var title = Language.get("game_dictionary");
	var txtTitle = getStrokeLabel(title,30,"#FFFFFF","#CCCCCC",1);
	txtTitle.x = (LMvc.screenWidth - txtTitle.getWidth()) * 0.5;
	txtTitle.y = 20;
	self.addChild(txtTitle);
	
	self.listLayer = new LSprite();
	self.addChild(self.listLayer);
	self.listLayerInit();
	self.contentLabel = getStrokeLabel("",20,"#FFFFFF","#000000",2);
	self.contentLabel.width = LMvc.screenWidth - 40;
	self.contentLabel.setWordWrap(true,27);
	var contentLayer = new LSprite();
	self.scrollContent = new LScrollbar(contentLayer,LMvc.screenWidth - 40,LMvc.screenHeight - 120,10);
	self.scrollContent.x = 20;
	self.scrollContent.y = 100;
	contentLayer.addChild(self.contentLabel);
	self.addChild(self.scrollContent);
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	self.ctrlLayerInit();
};
DictionaryView.prototype.onClickCloseButton=function(event){
	var self = event.currentTarget.parent.parent;
	if(self.listLayer.visible){
		self.remove();
	}else{
		self.listLayer.visible = true;
		self.contentLabel.text = "";
		self.contentLabel.visible = false;
	}
};
DictionaryView.prototype.listLayerInit=function(){
	var self = this;
	
	self.listView = new LListView();
	self.listView.y = 15;
	self.listView.resize(440, LMvc.screenHeight - 100);
	self.listView.maxPerLine = 4;
	self.listView.cellWidth = 110;
	self.listView.cellHeight = 50;
	self.listLayer.addChild(self.listView);
	self.listView.x = 20;
	self.listView.y = 80;
	var items = [];
	for(var i=0,l=dictionaryConfig.length;i<l;i++){
		var word = dictionaryConfig[i];
		var child = new DictionaryChildView(word);
		items.push(child);
	}
	self.listView.updateList(items);
};
DictionaryView.prototype.showDetailedDialog = function(word) {
	var self = this;
	self.listLayer.visible = false;
	self.contentLabel.visible = true;
	self.contentLabel.text = String.format("【{0}】{1}",Language.get(word),Language.getDictionary(word));
};
DictionaryView.prototype.ctrlLayerInit=function(){
	var self = this;
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LMvc.screenWidth - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.onClickCloseButton);
};
