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
	self.backLayer.addChild(getBlackBitmap());
};
ChapterView.prototype.chapterLayerInit=function(){
	var self = this;
	var miniMapData = GameCacher.getAreaMiniMap("area-map-1");
	var miniMap = new LBitmap(miniMapData);
	var layer = new LSprite();
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win01"]),420,260,20,30,23,24);
	layer.addChild(bitmapWin);
	var title = self.controller.getValue("title");
	var txtChapter = getStrokeLabel(title,30,"#FFFFFF","#CCCCCC",1);
	txtChapter.x = (bitmapWin.getWidth() - txtChapter.getWidth()) * 0.5;
	bitmapWin.y = txtChapter.getHeight();
	layer.addChild(txtChapter);
	layer.cacheAsBitmap(true);
	layer.x = (LGlobal.width - layer.getWidth()) * 0.5;
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
	if(!self.checkboxDebut.checked){
		return;
	}
	var seigniorList = GameManager.getCreateSeigniorList(LMvc.chapterId);
	for(var i=0,l=seigniorList.list.length;i<l;i++){
		var seignior = seigniorList.list[i];
		var citys = seignior.citys;
		for(var j=0,ll=citys.length;j<ll;j++){
			var city = MapSetting.find(function(child){
				return child.id == citys[j].id;
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
	var self = event.currentTarget.getParentByConstructor(ChapterView);
	self.removeChildAt(self.numChildren - 1);
	LMvc.chapterData.isCreateDebut = self.checkboxDebut.checked;
	self.controller.loadMap(self.select_chara_id);
};
ChapterView.prototype.ctrlLayerInit=function(){
	var self = this;
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.returnToChapterMenu.bind(self));
	
	var newCharacter = getStrokeLabel(Language.get("create_character_debut"),20,"#FFFFFF","#CCCCCC",1);
	newCharacter.x = self.seigniorsLayer.x;
	newCharacter.y = self.seigniorsLayer.y - newCharacter.getHeight() - 10;
	self.ctrlLayer.addChild(newCharacter);
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
	var bitmapSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
	var check = new LCheckBox(bitmap, bitmapSelect);
	check.x = newCharacter.x + newCharacter.getWidth();
	check.y = newCharacter.y + (newCharacter.getHeight() - bitmap.height) * 0.5;
	check.addEventListener(LCheckBox.ON_CHANGE,self.onChangeDebut);
	self.addChild(check);
	self.checkboxDebut = check;
	
	var settingButton = getButton(Language.get("create_character_setting"),150);
	settingButton.x = LGlobal.width - settingButton.getWidth() - 25;
	settingButton.y = self.seigniorsLayer.y - settingButton.getHeight() - 5;
	self.ctrlLayer.addChild(settingButton);
	settingButton.addEventListener(LMouseEvent.MOUSE_UP, self.loadCreateSetting);
};
ChapterView.prototype.onChangeDebut=function(event){
	var self = event.currentTarget.parent;
	self.setMapData();
	
	self.setCreateSeigniorList();
};
ChapterView.prototype.setCreateSeigniorList=function(){
	var self = this;
	var items = self.listView.getItems();
	for(var i=items.length - 1;i>=0;i--){
		var child = items[i];
		if(child.data.id < 1000){
			break;
		}
		self.listView.deleteChildView(child);
	}
	if(!self.checkboxDebut.checked){
		return;
	}
	var seigniorList = GameManager.getCreateSeigniorList(LMvc.chapterId);
	for(var i=0,l=seigniorList.list.length;i<l;i++){
		var seignior = seigniorList.list[i];
		var child = new ChapterSeigniorView(self.controller,seignior);
		self.listView.insertChildView(child);
	}
};
ChapterView.prototype.loadCreateSetting=function(event){
	var self = event.currentTarget.parent.parent;
	self.controller.loadCreateSetting();
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