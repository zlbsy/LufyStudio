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
	/*var seigniors = self.controller.getValue("seigniors");
	for(var i=0,l=AreaModel.list.length;i<l;i++){
		var areaModel = AreaModel.list[i];
		var seignior = seigniors.find(function(child){
			
		});
	}*/
	
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
	var backLayer = new LSprite();
	for(var i=0;i<seigniors.length;i++){
		var chapterSeignior = new ChapterSeigniorView(self.controller,seigniors[i]);
		chapterSeignior.x = 160 * i;
		backLayer.addChild(chapterSeignior);
	}
	backLayer.graphics.drawRect(1, "#000000", [0, 0, 160 * seigniors.length, 150]);
	var sc = new LScrollbar(backLayer, LGlobal.width - 60, 150, 10);
	self.seigniorsLayer.addChild(sc);
	sc.excluding = true;
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.characterClickDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.characterClickUp.bind(self));
};
ChapterView.prototype.characterClickDown = function(event) {
	var chara = event.target;
	chara.offsetX = event.offsetX;
	chara.offsetY = event.offsetY;
};
ChapterView.prototype.characterClickUp = function(event) {
	if(event.target.constructor.name != "ChapterSeigniorView"){
		return;
	}
	var self = this;
	var chara = event.target;
	if (chara.offsetX && chara.offsetY && Math.abs(chara.offsetX - event.offsetX) < 5 && Math.abs(chara.offsetY - event.offsetY) < 5) {
		self.select_chara_id = chara.data.chara_id;
		/*var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_select_seignior_confirm"),chara.data.name),height:200,
		okEvent:self.okEvent.bind(self),cancelEvent:null};*/
		var obj = {title:"确认",message:"选择"+chara.data.name+"吗？",height:200,
		okEvent:self.okEvent.bind(self),cancelEvent:null};
		var windowLayer = ConfirmWindow(obj);
		self.addChild(windowLayer);
	}
};
ChapterView.prototype.okEvent=function(event){
	this.removeChildAt(this.numChildren - 1);
	this.controller.loadMap(this.select_chara_id);
};
ChapterView.prototype.ctrlLayerInit=function(){
	var self = this;
	/*var returnBitmapData = new LBitmapData(LMvc.datalist["icon-return"]);
	var returnBitmap = new LBitmap(returnBitmapData);
	var returnButton = new LButton(returnBitmap);
	returnButton.x = 20;
	returnButton.y = LGlobal.height - returnBitmapData.height - 20;
	self.ctrlLayer.addChild(returnButton);
	*/
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.returnToChapterMenu.bind(self));
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