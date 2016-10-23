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
	self.seigniorsLayerInit();
	self.ctrlLayerInit();
	self.chapterLayerInit();
	self.x = LMvc.screenWidth;
	LTweenLite.to(LMvc.stageLayer,0.5,{x:-LMvc.screenWidth, onComplete:self.logoToHide.bind(self)});
};
ChapterView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.chapterLayer = new LSprite();
	self.addChild(self.chapterLayer);
	self.seigniorsLayer = new LSprite();
	self.seigniorsLayer.x = 30;
	self.seigniorsLayer.y = LMvc.screenHeight - 180;
	self.addChild(self.seigniorsLayer);
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
};
ChapterView.prototype.logoToHide=function(){
	LMvc.logoStage.visible = false;
};
ChapterView.prototype.backLayerInit=function(){
	var self = this;
	self.backLayer.addChild(getPanel("win04",LMvc.screenWidth,LMvc.screenHeight));
};
ChapterView.prototype.chapterLayerInit=function(){
	var self = this;
	var miniMapData = GameCacher.getAreaMiniMap("area-map-1");
	var miniMap = new LBitmap(miniMapData);
	var layer = new LSprite();
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win05"]),420,260);
	layer.addChild(bitmapWin);
	var title = self.controller.getValue("title");
	var txtChapter = getStrokeLabel(title,30,"#FFFFFF","#CCCCCC",1);
	txtChapter.x = (bitmapWin.getWidth() - txtChapter.getWidth()) * 0.5;
	bitmapWin.y = txtChapter.getHeight();
	layer.addChild(txtChapter);
	layer.cacheAsBitmap(true);
	layer.x = (LMvc.screenWidth - layer.getWidth()) * 0.5;
	layer.y = 30;
	miniMap.x = layer.x + 10;
	miniMap.y = layer.y + bitmapWin.y + 10;
	self.chapterLayer.addChild(layer);
	self.chapterLayer.addChild(miniMap);
	self.miniMapData = miniMapData;
	self.setMapData();
};
ChapterView.prototype.setMapData=function(){
	var self = this;
	var miniMapData = self.miniMapData;
	for(var i=0,l=MapSetting.length;i<l;i++){
		var city = MapSetting[i];
		var size = 10;
		var colorData = new LBitmapData("#ffffff",0,0,size,size,LBitmapData.DATA_CANVAS);
		miniMapData.copyPixels(colorData,new LRectangle(0,0,colorData.width,colorData.height),new LPoint(city.position.x*miniMapData.mapScaleX,city.position.y*miniMapData.mapScaleY));
	}
	var seigniors = LMvc.chapterData.seigniors;
	for(var i=0,l=seigniors.length;i<l;i++){
		var seignior = seigniors[i];
		var size = 10;
		var citys = seignior.citys;
		for(var j=0,ll=citys.length;j<ll;j++){
			var city = MapSetting.find(function(child){
				return child.id == citys[j];
			});
			var color = String.format("rgb({0})",seignior.color);
			var colorData = new LBitmapData(color,0,0,size,size,LBitmapData.DATA_CANVAS);
			miniMapData.copyPixels(colorData,new LRectangle(0,0,colorData.width,colorData.height),new LPoint(city.position.x*miniMapData.mapScaleX,city.position.y*miniMapData.mapScaleY));
		}
	}
	
};
ChapterView.prototype.seigniorsLayerInit=function(){
	var self = this;
	var seigniors = self.controller.getValue("seigniors");
	self.listView = new LListView();
	self.listView.resize(LMvc.screenWidth - 60, 160);
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
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.getParentByConstructor(ChapterView);
	windowLayer.remove();
	var troubleSelect = new TroubleSelectView();
	var obj = {title:Language.get("confirm"),subWindow:troubleSelect,width:400,height:420,
	okEvent:self.troubleSelect,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
ChapterView.prototype.troubleSelect=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.getParentByConstructor(ChapterView);
	var troubleSelect = windowLayer.getChildByName("TroubleSelectView");
	LMvc.chapterData.trouble = troubleSelect.radioTrouble.value;
	if(LMvc.chapterData.noLife){
		LMvc.chapterData.validDeath = 0;
	}else{
		LMvc.chapterData.validDeath = troubleSelect.radioDeath.value;
	}
	LMvc.chapterData.validBehead = troubleSelect.radioBehead.value;
	windowLayer.remove();
	LMvc.chapterData.isCreateDebut = false;
	self.controller.loadMap(self.select_chara_id);
	if(!LPlugin.native){
		LPlugin.readyBGM("map");
	}
};
ChapterView.prototype.ctrlLayerInit=function(){
	var self = this;
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LMvc.screenWidth - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.returnToChapterMenu.bind(self));
	
	var settingButton = getButton(Language.get("create_character_setting"),200);
	settingButton.x = LMvc.screenWidth - settingButton.getWidth() - 25;
	settingButton.y = self.seigniorsLayer.y - settingButton.getHeight() - 5;
	lockedButton(settingButton);
	self.ctrlLayer.addChild(settingButton);
	settingButton.addEventListener(LMouseEvent.MOUSE_UP, self.showWebNotSupportDialog);
};
ChapterView.prototype.showWebNotSupportDialog=function(event){
	webNotSupportDialog();
};
ChapterView.prototype.returnToChapterMenu=function(event){
	var self = this;
	LMvc.logoStage.visible = true;
	if(LMvc.logoStage.chapterMenuLayer){
		LMvc.logoStage.chapterMenuLayer.mouseChildren = true;
		LTweenLite.to(LMvc.stageLayer,0.5,{x:0, onComplete:self.deleteView.bind(self)});
	}else{
		self.remove();
	}
};
ChapterView.prototype.deleteView=function(event){
	var self = this;
	self.remove();
};