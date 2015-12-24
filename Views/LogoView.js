function LogoView(){
	base(this,LView,[]);
}
LogoView.prototype.construct=function(){
	var self = this;
	var bitmapBgBack = new LBitmap(new LBitmapData(LMvc.datalist["logo_bg_1"]));
	self.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height*0.5],true,"#000000");
	bitmapBgBack.y = LGlobal.height - bitmapBgBack.getHeight()+50;
	self.addChild(bitmapBgBack);
	self.bitmapBgBack = bitmapBgBack;
	
	var bitmapBg = new LBitmap(new LBitmapData(LMvc.datalist["logo_bg_2"]));
	bitmapBg.x = -bitmapBg.getWidth()*0.5;
	
	var layerBg = new LSprite();
	layerBg.x = LGlobal.width*0.5;
	self.addChild(layerBg);
	layerBg.y = LGlobal.height - bitmapBg.getHeight();
	layerBg.scaleX = layerBg.scaleY = 4;
	layerBg.addChild(bitmapBg);
	self.layerBg = layerBg;
	
	var bitmapChara = new LBitmap(new LBitmapData(LMvc.datalist["logo_ryofu"]));
	bitmapChara.x = -bitmapChara.getWidth()*0.5;
	bitmapChara.y = -bitmapChara.getHeight()*0.5;
	var layerChara = new LSprite();
	layerChara.x = LGlobal.width*0.5;
	self.addChild(layerChara);
	layerChara.y = LGlobal.height + bitmapChara.getHeight()*2;
	layerChara.scaleX = layerChara.scaleY = 5;
	layerChara.addChild(bitmapChara);
	self.layerChara = layerChara;
	
};
LogoView.prototype.updateView = function(){
	var self = this;
	self.showMenu();
};
LogoView.prototype.showMenu=function(){
	var self = this;
	var menuHeight = 55;
	var menuY = 0;
	var layer = new LSprite();
	var title = getStrokeLabel("三国记",80,"#FFFFFF","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 150;
	var shadow = new LDropShadowFilter(5,45,"#00FF00");
	title.filters = [shadow];
	layer.addChild(title);
	
	layer.graphics.drawRect(0,"#000000",[0,0,layer.getWidth() * 1.2,layer.getHeight()*1.2]);
	self.addChild(getBitmap(layer));
	
	var menuLayer = new LSprite();
	menuLayer.x = menuLayer.tx = (LGlobal.width - 200) * 0.5;
	self.addChild(menuLayer);
	
	var buttonStart = getButton("开始游戏",200);
	buttonStart.y = menuY;
	menuLayer.addChild(buttonStart);
	buttonStart.addEventListener(LMouseEvent.MOUSE_UP, self.loadChapterList.bind(self));
	
	menuY += menuHeight;
	var buttonRead = getButton("读取进度",200);
	buttonRead.y = menuY;
	menuLayer.addChild(buttonRead);
	buttonRead.addEventListener(LMouseEvent.MOUSE_UP, self.readGame.bind(self));
	
	menuY += menuHeight;
	var buttonSetting = getButton("环境设定",200);
	buttonSetting.y = menuY;
	menuLayer.addChild(buttonSetting);
	buttonSetting.addEventListener(LMouseEvent.MOUSE_UP, self.settingGame.bind(self));
	
	menuY += menuHeight;
	var buttonTest = getButton("单挑测试",200);
	buttonTest.y = menuY;
	menuLayer.addChild(buttonTest);
	buttonTest.addEventListener(LMouseEvent.MOUSE_UP, self.testStart.bind(self));
	
	menuY += menuHeight * 2;
	menuLayer.y = LGlobal.height - menuY;
	
	self.topMenuLayer = menuLayer;
};
LogoView.prototype.testStart=function(event){
	var self = this;
	self.controller.showSingleCombatArena();
	//self.controller.loadTest();
};
LogoView.prototype.readGame=function(event){
	//RecordController.instance().show();
	RecordController.instance().show(RecordController.READ_MODE);
	//this.controller.read();
};
LogoView.prototype.settingGame=function(event){
	this.testDialog();
};
LogoView.prototype.testDialog=function(){
	LMessageBox.show({
			title:"错误",
			message:"无法操作，请选择单挑测试！",
			width:300,
			height:150
		});
};
LogoView.prototype.loadChapterList=function(event){
	var self = this;
	self.topMenuLayer.mouseChildren = false;
	self.controller.loadChapterList();
};
LogoView.prototype.showChapterList=function(list){
	var self = this;
	var menuHeight = 55;
	var menuY = 0;
	var menuLayer = new LSprite();
	menuLayer.tx = (LGlobal.width - 200) * 0.5;
	self.addChild(menuLayer);
	
	for(var i = 0; i < list.length; i++){
		var chapter = list[i];
		var buttonChapter = getButton(chapter.name,200);
		buttonChapter.chapterId = chapter.id;
		buttonChapter.y = menuY;
		menuLayer.addChild(buttonChapter);
		buttonChapter.addEventListener(LMouseEvent.MOUSE_UP, self.showChapter.bind(self));
		menuY += menuHeight;
	}
	var buttonReturn = getButton("返回",200);
	buttonReturn.y = menuY;
	menuLayer.addChild(buttonReturn);
	buttonReturn.addEventListener(LMouseEvent.MOUSE_UP, self.returnTopMenu.bind(self));
	
	menuLayer.x = self.topMenuLayer.x + 210;
	menuY += menuHeight * 2;
	menuLayer.y = LGlobal.height - menuY;
	self.chapterMenuLayer = menuLayer;
	
	LTweenLite.to(self.topMenuLayer,0.5,{x:self.topMenuLayer.tx-210, alpha:0});
	LTweenLite.to(self.chapterMenuLayer,0.5,{x:menuLayer.tx, alpha:1});
};
LogoView.prototype.chapterMenuClosed=function(event){
	var self = this;
	self.chapterMenuLayer.remove();
	self.chapterMenuLayer = null;
	self.topMenuLayer.mouseChildren = true;
};
LogoView.prototype.returnTopMenu=function(event){
	var self = this;
	self.chapterMenuLayer.mouseChildren = false;
	LTweenLite.to(self.topMenuLayer,0.5,{x:self.topMenuLayer.tx, alpha:1});
	LTweenLite.to(self.chapterMenuLayer,0.5,{x:self.chapterMenuLayer.tx+210, alpha:0,onComplete:self.chapterMenuClosed.bind(self)});
};
LogoView.prototype.showChapter=function(event){
	var self = this;
	console.log(typeof event.currentTarget.chapterId, event.currentTarget.chapterId);
	if(typeof event.currentTarget.chapterId !== "number"){
		return;
	}
	self.chapterMenuLayer.mouseChildren = false;
	self.controller.showChapter(event.currentTarget.chapterId);
};