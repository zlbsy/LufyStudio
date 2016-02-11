function ChapterView(){
	base(this,LView,[]);
}
ChapterView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
ChapterView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.backLayerInit();
	self.chapterLayerInit();
	self.seigniorsLayerInit();
	self.ctrlLayerInit();
	self.x = LGlobal.width;
	LTweenLite.to(LMvc.stageLayer,0.5,{x:-LGlobal.width, onComplete:self.logoToHide.bind(self)});
};
ChapterView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.chapterLayer = new LSprite();
	self.addChild(self.chapterLayer);
	self.seigniorsLayer = new LSprite();
	self.seigniorsLayer.x = 30;
	self.seigniorsLayer.y = LGlobal.height - 180;
	self.addChild(self.seigniorsLayer);
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win04"]),LGlobal.width,LGlobal.height,15,25,18,24);
	self.addChild(getBitmap(bitmapWin));
};
ChapterView.prototype.logoToHide=function(){
	LMvc.logoStage.visible = false;
};
ChapterView.prototype.backLayerInit=function(){
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist["common-black"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.scaleX = LGlobal.width / bitmapData.width;
	bitmap.scaleY = LGlobal.height / bitmapData.height;
	self.backLayer.addChild(bitmap);
};
ChapterView.prototype.chapterLayerInit=function(){
	var self = this;
	var icon = new BitmapSprite(LMvc.IMG_PATH + "chapter/chapter-" + self.controller.getValue("icon") + ".png", null,null);
	var layer = new LSprite();
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win01"]),420,260,20,30,23,24);
	layer.addChild(bitmapWin);
	
	var title = self.controller.getValue("title");
	var txtChapter = getStrokeLabel(title,30,"#FFFFFF","#CCCCCC",1);
	txtChapter.x = (bitmapWin.getWidth() - txtChapter.getWidth()) * 0.5;
	bitmapWin.y = txtChapter.getHeight();
	layer.addChild(txtChapter);
	
	layer = getBitmap(layer);
	layer.x = (LGlobal.width - layer.getWidth()) * 0.5;
	layer.y = 30;
	icon.x = layer.x + 10;
	icon.y = layer.y + bitmapWin.y + 10;
	self.chapterLayer.addChild(layer);
	
	self.chapterLayer.addChild(icon);
};
ChapterView.prototype.seigniorsLayerInit=function(){
	var self = this;
	var seigniors = self.controller.getValue("seigniors");
	self.listView = new LListView();
	self.listView.resize(LGlobal.width - 60, 160);
	self.listView.cellWidth = 160;
	self.listView.cellHeight = 160;
	self.listView.arrangement = LListView.Direction.Vertical;
	self.listView.movement = LListView.Direction.Horizontal;
	self.listView.maxPerLine = 1;
	self.seigniorsLayer.addChild(self.listView);
	var items = [];
	for(var i=0;i<seigniors.length;i++){
		var chapterSeignior = new ChapterSeigniorView(self.controller,seigniors[i]);
		items.push(chapterSeignior);
	}
	self.listView.updateList(items);
};
ChapterView.prototype.okEvent=function(event){
	this.removeChildAt(this.numChildren - 1);
	this.controller.loadMap(this.select_chara_id);
};
ChapterView.prototype.ctrlLayerInit=function(){
	var self = this;
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.returnToChapterMenu.bind(self));
	var settingButton = getButton(Language.get("create_character_setting"),150);
	settingButton.x = LGlobal.width - settingButton.getWidth() - 5;
	settingButton.y = self.seigniorsLayer.y - settingButton.getHeight() - 5;
	self.ctrlLayer.addChild(settingButton);
	settingButton.addEventListener(LMouseEvent.MOUSE_UP, self.loadCreateSetting);
};
ChapterView.prototype.loadCreateSetting=function(event){
	var self = event.currentTarget.parent.parent;
	
};
ChapterView.prototype.returnToChapterMenu=function(event){
	var self = this;
	LMvc.logoStage.visible = true;
	LMvc.logoStage.chapterMenuLayer.mouseChildren = true;
	LTweenLite.to(LMvc.stageLayer,0.5,{x:0, onComplete:self.deleteView.bind(self)});
};
ChapterView.prototype.deleteView=function(event){
	var self = this;
	self.remove();
};