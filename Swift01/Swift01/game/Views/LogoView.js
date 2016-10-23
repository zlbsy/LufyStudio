function LogoView(){
	base(this,LView,[]);
}
LogoView.prototype.construct=function(){
	var self = this;
	var bitmapBgBack = new LBitmap(new LBitmapData(LMvc.datalist["logo_bg_1"]));
	self.graphics.drawRect(0,"#000000",[0,0,LMvc.screenWidth,LMvc.screenHeight*0.5],true,"#000000");
	bitmapBgBack.y = LMvc.screenHeight - bitmapBgBack.getHeight()+50;
	self.addChild(bitmapBgBack);
	self.bitmapBgBack = bitmapBgBack;
	
	var bitmapBg = new LBitmap(new LBitmapData(LMvc.datalist["logo_bg_2"]));
	bitmapBg.x = -bitmapBg.getWidth()*0.5;
	
	var layerBg = new LSprite();
	layerBg.x = LMvc.screenWidth*0.5;
	self.addChild(layerBg);
	layerBg.y = LMvc.screenHeight - bitmapBg.getHeight();
	layerBg.scaleX = layerBg.scaleY = 4;
	layerBg.addChild(bitmapBg);
	self.layerBg = layerBg;
	
	var bitmapChara = new LBitmap(new LBitmapData(LMvc.datalist["logo_ryofu"]));
	bitmapChara.x = -bitmapChara.getWidth()*0.5;
	bitmapChara.y = -bitmapChara.getHeight()*0.5;
	var layerChara = new LSprite();
	layerChara.x = LMvc.screenWidth*0.5;
	self.addChild(layerChara);
	layerChara.y = LMvc.screenHeight + bitmapChara.getHeight()*2;
	layerChara.scaleX = layerChara.scaleY = 5;
	layerChara.addChild(bitmapChara);
	self.layerChara = layerChara;
	
	self.mainMenuLayer = new LSprite();
	self.addChild(self.mainMenuLayer);
};
LogoView.prototype.updateView = function(){
	var self = this;
	self.mainMenuLayer.removeAllChild();
	self.showMenu();
};
LogoView.prototype.changeLanguage=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.controller.changeLanguage(button.language);
};
LogoView.prototype.showMenu=function(){
	var self = this;
	var menuHeight = 48;
	var menuY = 0;
	var layer = new LSprite();
	var title = getStrokeLabel(Language.get("game_title"),80,"#FFFFFF","#000000",4);
	title.x = (LMvc.screenWidth - title.getWidth())*0.5;
	title.y = 150;
	var shadow = new LDropShadowFilter(5,45,"#00FF00");
	title.filters = [shadow];
	layer.addChild(title);
	
	layer.graphics.drawRect(0,"#000000",[0,0,layer.getWidth() * 1.2,layer.getHeight()*1.2]);
	layer.cacheAsBitmap(true);
	self.mainMenuLayer.addChild(layer);
	
	var menuLayer = new LSprite();
	menuLayer.x = menuLayer.tx = (LMvc.screenWidth - 180) * 0.5;
	self.mainMenuLayer.addChild(menuLayer);
	
	var buttonStart = getSizeButton(Language.get("game_start"),180, 45);
	buttonStart.y = menuY;
	menuLayer.addChild(buttonStart);
	buttonStart.addEventListener(LMouseEvent.MOUSE_UP, self.loadChapterList.bind(self));
	
	menuY += menuHeight;
	var buttonRead = getSizeButton(Language.get("game_read"),180, 45);
	buttonRead.y = menuY;
	menuLayer.addChild(buttonRead);
	buttonRead.addEventListener(LMouseEvent.MOUSE_UP, self.readGame.bind(self));
	
	menuY += menuHeight;
	var buttonSetting = getSizeButton(Language.get("game_setting"),180, 45);
	buttonSetting.y = menuY;
	menuLayer.addChild(buttonSetting);
	buttonSetting.addEventListener(LMouseEvent.MOUSE_UP, self.settingGame.bind(self));
	
	menuY += menuHeight;
	var buttonSingleCombat = getSizeButton(Language.get("game_single_combat"),180, 45);
	buttonSingleCombat.y = menuY;
	menuLayer.addChild(buttonSingleCombat);
	lockedButton(buttonSingleCombat);
	buttonSingleCombat.addEventListener(LMouseEvent.MOUSE_UP, self.showWebNotSupportDialog);
	
	menuY += menuHeight;
	var buttonCreate = getSizeButton(Language.get("create_character"),180, 45);
	buttonCreate.y = menuY;
	menuLayer.addChild(buttonCreate);
	lockedButton(buttonCreate);
	buttonCreate.addEventListener(LMouseEvent.MOUSE_UP, self.showWebNotSupportDialog);
	
	menuY += menuHeight;
	var buttonTutorial = getSizeButton(Language.get("game_tutorial"),180, 45);
	buttonTutorial.y = menuY;
	menuLayer.addChild(buttonTutorial);
	buttonTutorial.addEventListener(LMouseEvent.MOUSE_UP, self.tutorialChick);
	
	menuY += menuHeight * 2;
	
	var buttonMore = getSizeButton(Language.get("更多游戏"),140, 45);
	buttonMore.x = -menuLayer.x;
	buttonMore.y = menuY - buttonMore.getHeight() - menuHeight * 2;
	menuLayer.addChild(buttonMore);
	buttonMore.addEventListener(LMouseEvent.MOUSE_UP, self.showMoreGame);
	
	var buttonRestore = getSizeButton(Language.get("about_game"),140, 45);
	buttonRestore.x = -menuLayer.x;
	buttonRestore.y = menuY - buttonRestore.getHeight() - menuHeight;
	menuLayer.addChild(buttonRestore);
	buttonRestore.addEventListener(LMouseEvent.MOUSE_UP, self.showAboutGame);
		
	var buttonChinese = getSizeButton(Language.get("chinese"),100, 45,LPlugin.language() == LPlugin.languageDefault?"win07":"win01");
	buttonChinese.language = "chinese";
	buttonChinese.x = -menuLayer.x;
	buttonChinese.y = menuY-buttonChinese.getHeight();
	menuLayer.addChild(buttonChinese);
	var buttonJapanese = getSizeButton(Language.get("japanese"),100, 45,LPlugin.language() == LPlugin.languageDefault?"win01":"win07");
	buttonJapanese.language = "japanese";
	buttonJapanese.x = -menuLayer.x + 100;
	buttonJapanese.y = menuY-buttonJapanese.getHeight();
	menuLayer.addChild(buttonJapanese);
	if(LPlugin.language() == LPlugin.languageDefault){
		buttonChinese.staticMode = true;
		buttonJapanese.addEventListener(LMouseEvent.MOUSE_UP, self.changeLanguage);
	}else{
		buttonJapanese.staticMode = true;
		buttonChinese.addEventListener(LMouseEvent.MOUSE_UP, self.changeLanguage);
	}
	var verLabel = getStrokeLabel(LMvc.ver,20,"#FFFFFF","#000000",4);
	verLabel.x = LMvc.screenWidth - menuLayer.x - verLabel.getWidth() - 10;
	verLabel.y = menuY - 25;
	menuLayer.addChild(verLabel);
	menuLayer.y = LMvc.screenHeight - menuY;
	
	self.topMenuLayer = menuLayer;
};
LogoView.prototype.showMoreGame=function(event){
	h5api.moreGame();
};
LogoView.prototype.tutorialChick=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.controller.loadTutorial();
};
LogoView.prototype.showWebNotSupportDialog=function(event){
	webNotSupportDialog();
};
LogoView.prototype.showAboutGame=function(event){
	var obj = {width:400, height:300, messageHtml:Language.get("about_game_message"), title:Language.get("about_game")};
	var dialog = ConfirmWindow(obj);
	LMvc.layer.addChild(dialog);
};
LogoView.prototype.readGame=function(event){
	RecordController.instance().show(RecordController.READ_MODE);
};
LogoView.prototype.settingGame=function(event){
	this.controller.loadSettingGame();
};
LogoView.prototype.loadChapterList=function(event){
	var self = this;
	self.topMenuLayer.mouseChildren = false;
	self.controller.loadChapterList();
};
LogoView.prototype.showChapterListChild=function(chapter, menuLayer, x, y){
	var self = this;
	var title = (chapter.hideYear ? "" : chapter.year + " ") + Language.get("chapter_"+chapter.id);
	var buttonChapter = getSizeButton(title,200, 45);
	buttonChapter.chapterId = chapter.id;
	buttonChapter.x = (200 - buttonChapter.getWidth()) * 0.5 + x;
	buttonChapter.y = y;
	menuLayer.addChild(buttonChapter);
	buttonChapter.addEventListener(LMouseEvent.MOUSE_UP, self.showChapter);
	var buttonDetailed = getSizeButton("?",45, 45);
	buttonDetailed.chapterId = chapter.id;
	buttonDetailed.x = buttonChapter.x + 200 + 10;
	buttonDetailed.y = buttonChapter.y;
	menuLayer.addChild(buttonDetailed);
	buttonDetailed.addEventListener(LMouseEvent.MOUSE_UP, self.showChapterDetailed);
};
LogoView.prototype.showChapterList=function(list, index){
	var self = this;
	var menuHeight = 48;
	var menuY = 0;
	var menuLayer = self.getChildByName("menuLayer");
	if(menuLayer){
		menuLayer.removeAllChild();
	}else{
		menuLayer = new LSprite();
		menuLayer.name = "menuLayer";
		menuLayer.tx = (LMvc.screenWidth - 200) * 0.5;
		self.addChild(menuLayer);
	}
	self.showIndex = index;
	var currentChapter;
	for(var i = 0; i < list.length; i++){
		var chapter = list[i];
		if(chapter.index != index){
			continue;
		}
		currentChapter = chapter;
		self.showChapterListChild(chapter, menuLayer, 0, menuY);
		menuY += menuHeight;
	}
	var buttonReturn = getSizeButton(Language.get("return"),200,45);
	buttonReturn.y = menuY;
	menuLayer.addChild(buttonReturn);
	buttonReturn.addEventListener(LMouseEvent.MOUSE_UP, self.returnTopMenu);
	menuLayer.x = self.topMenuLayer.x + 210;
	menuY += menuHeight * 2;
	menuLayer.y = LMvc.screenHeight - menuY;
	self.chapterMenuLayer = menuLayer;
	
	LTweenLite.to(self.topMenuLayer,0.5,{x:self.topMenuLayer.tx-210, alpha:0});
	self.chapterMenuLayer.alpha = 0;
	LTweenLite.to(self.chapterMenuLayer,0.5,{x:menuLayer.tx, alpha:1});
};
LogoView.prototype.chapterMenuClosed=function(event){
	var self = event.target.getParentByConstructor(LogoView);
	self.chapterMenuLayer.remove();
	self.chapterMenuLayer = null;
	self.topMenuLayer.mouseChildren = true;
};
LogoView.prototype.returnTopMenu=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.chapterMenuLayer.mouseChildren = false;
	LTweenLite.to(self.topMenuLayer,0.5,{x:self.topMenuLayer.tx, alpha:1});
	LTweenLite.to(self.chapterMenuLayer,0.5,{x:self.chapterMenuLayer.tx+210, alpha:0,onComplete:self.chapterMenuClosed});
};
LogoView.prototype.showChapterDetailed=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.chapterMenuLayer.mouseChildren = false;
	self.controller.showChapterDetailed(button.chapterId);
};
LogoView.prototype.showChapter=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.showChapterRun(button);
};
LogoView.prototype.showChapterRun=function(button){
	var self = this;
	if(!button.chapterId && !button.group){
		return;
	}
	self.chapterMenuLayer.mouseChildren = false;
	self.controller.showChapter(button.chapterId);
};
