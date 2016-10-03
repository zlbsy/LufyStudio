function ChapterDetailedView(){
	base(this,LView,[]);
}
ChapterDetailedView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
ChapterDetailedView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.seigniorsLayerInit();
	self.ctrlLayerInit();
};
ChapterDetailedView.prototype.layerInit=function(){
	var self = this;
	self.windowWidth = 300;
	self.baseLayer = getTranslucentMask();
	self.addChild(self.baseLayer);
	self.backLayer = getPanel("win05", self.windowWidth, 400);
	self.backLayer.x = (LGlobal.width - self.windowWidth) * 0.5;
	self.backLayer.y = (LGlobal.height - 400) * 0.5;
	self.addChild(self.backLayer);
	self.seigniorsLayer = new LSprite();
	self.seigniorsLayer.y = 130;
	self.backLayer.addChild(self.seigniorsLayer);
	self.ctrlLayer = new LSprite();
	self.backLayer.addChild(self.ctrlLayer);
};
ChapterDetailedView.prototype.seigniorsLayerInit=function(){
	var self = this;
	var back = getTranslucentBitmap(self.windowWidth - 20, 260);
	back.x = 10;
	self.seigniorsLayer.addChild(back);
	
	var seigniors = self.controller.getValue("seigniors");
	self.listView = new LListView();
	self.listView.x = 20;
	self.listView.y = 5;
	self.listView.resize(self.windowWidth - 40, 250);
	self.listView.cellWidth = self.windowWidth - 40;
	self.listView.cellHeight = 40;
	self.listView.arrangement = LListView.Direction.Horizontal;
	self.listView.movement = LListView.Direction.Vertical;
	self.listView.maxPerLine = 1;
	self.seigniorsLayer.addChild(self.listView);
	var items = [];
	for(var i=0;i<seigniors.length;i++){
		var chapterChild = new ChapterDetailedChildView(self.controller,seigniors[i]);
		items.push(chapterChild);
	}
	self.listView.updateList(items);
};
ChapterDetailedView.prototype.ctrlLayerInit=function(){
	var self = this;
	var title = getStrokeLabel(Language.get("chapter_"+LMvc.chapterId),25,"#CDD4AF","#000000",4);
	title.x = (self.windowWidth - title.getWidth()) * 0.5;
	title.y = 14;
	self.ctrlLayer.addChild(title);
	var seigniors = self.controller.getValue("seigniors");
	var message = getStrokeLabel(String.format(Language.get("chapter_message"),seigniors.length),18,"#FFFFFF","#000000",4);
	message.width = self.windowWidth - 40;
	message.setWordWrap(true,27);
	message.x = 20;
	message.y = 55;
	self.ctrlLayer.addChild(message);
	
	var back = getTranslucentBitmap(self.windowWidth - 20, 40);
	back.x = 10;
	back.y = 84;
	self.ctrlLayer.addChild(back);
	var nameLabel = getStrokeLabel(Language.get("seignior"), 20, "#FFFFFF", "#000000", 4);
	nameLabel.x = 20;
	nameLabel.y = 92;
	self.ctrlLayer.addChild(nameLabel);
	var cityLabel = getStrokeLabel(Language.get("city"), 20, "#FFFFFF", "#000000", 4);
	cityLabel.x = 135;
	cityLabel.y = 92;
	self.ctrlLayer.addChild(cityLabel);
	var generalLabel = getStrokeLabel(Language.get("generals"), 20, "#FFFFFF", "#000000", 4);
	generalLabel.x = 215;
	generalLabel.y = 92;
	self.ctrlLayer.addChild(generalLabel);
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = self.windowWidth - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.returnToChapterMenu);
};
ChapterDetailedView.prototype.returnToChapterMenu=function(event){
	var self = event.currentTarget.getParentByConstructor(ChapterDetailedView);
	LMvc.logoStage.chapterMenuLayer.mouseChildren = true;
	self.remove();
};