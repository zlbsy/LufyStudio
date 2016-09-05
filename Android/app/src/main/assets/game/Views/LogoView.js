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
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = 150;
	var shadow = new LDropShadowFilter(5,45,"#00FF00");
	title.filters = [shadow];
	layer.addChild(title);
	
	layer.graphics.drawRect(0,"#000000",[0,0,layer.getWidth() * 1.2,layer.getHeight()*1.2]);
	layer.cacheAsBitmap(true);
	self.mainMenuLayer.addChild(layer);
	//self.mainMenuLayer.addChild(getBitmap(layer));
	
	var menuLayer = new LSprite();
	menuLayer.x = menuLayer.tx = (LGlobal.width - 180) * 0.5;
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
	buttonSingleCombat.addEventListener(LMouseEvent.MOUSE_UP, self.showSingleCombatArena.bind(self));
	
	menuY += menuHeight;
	var buttonCreate = getSizeButton(Language.get("create_character"),180, 45);
	buttonCreate.name = productIdConfig.createCharacter;
	buttonCreate.y = menuY;
	menuLayer.addChild(buttonCreate);
	if(!purchaseHasBuy(productIdConfig.createCharacter)){
		lockedButton(buttonCreate);
	}
	buttonCreate.addEventListener(LMouseEvent.MOUSE_UP, self.createCharacterChick);
	
	menuY += menuHeight;
	var buttonTutorial = getSizeButton(Language.get("game_tutorial"),180, 45);
	buttonTutorial.y = menuY;
	menuLayer.addChild(buttonTutorial);
	buttonTutorial.addEventListener(LMouseEvent.MOUSE_UP, self.tutorialChick);
	
	menuY += menuHeight * 2;
	
	var buttonBug = getSizeButton(Language.get("bug_report"),140, 45);
	buttonBug.x = -menuLayer.x;
	buttonBug.y = menuY - buttonBug.getHeight() - menuHeight * 3 - 2;
	menuLayer.addChild(buttonBug);
	buttonBug.addEventListener(LMouseEvent.MOUSE_UP, self.bugReportChick);
	var buttonUpdate = getSizeButton(Language.get("update_report"),140, 45);
	buttonUpdate.x = -menuLayer.x;
	buttonUpdate.y = menuY - buttonUpdate.getHeight() - menuHeight * 2 - 2;
	menuLayer.addChild(buttonUpdate);
	buttonUpdate.addEventListener(LMouseEvent.MOUSE_UP, self.reportUpdateChick);
	
	if(LPlugin.native){
		var buttonRestore = getSizeButton(Language.get("restore_buy"),100, 45);
		buttonRestore.x = -menuLayer.x;
		buttonRestore.y = menuY - buttonRestore.getHeight() - menuHeight;
		menuLayer.addChild(buttonRestore);
		buttonRestore.addEventListener(LMouseEvent.MOUSE_UP, self.restoreChick);
	}
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
	var forumLayer = new LSprite();
	var forumLabel = getStrokeLabel(Language.get("opinion"),20,"#FFFFFF","#000000",4);
	forumLayer.graphics.drawRect(0,"#000000",[0,0,forumLabel.getWidth(),forumLabel.getHeight()]);
	forumLayer.graphics.drawLine(2,"#000000",[0,forumLabel.getHeight()+2,forumLabel.getWidth(),forumLabel.getHeight()+2]);
	forumLayer.addChild(forumLabel);
	forumLayer.x = LGlobal.width - menuLayer.x - forumLabel.getWidth() - 10;
	forumLayer.y = menuY - 60;
	menuLayer.addChild(forumLayer);
	forumLayer.addEventListener(LMouseEvent.MOUSE_UP, self.clickForum);
	self.forumLayer = forumLayer;
	self.forumLayer.visible = LPlugin.GetData("reviewing") ? false : true;
	
	var verLabel = getStrokeLabel("Ver." + LMvc.ver,20,"#FFFFFF","#000000",4);
	verLabel.x = LGlobal.width - menuLayer.x - verLabel.getWidth() - 10;
	verLabel.y = menuY - 25;
	menuLayer.addChild(verLabel);
	
	menuLayer.y = LGlobal.height - menuY;
	
	self.topMenuLayer = menuLayer;
};
LogoView.prototype.reportUpdateChick=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.controller.loadReportUpdate();
};
LogoView.prototype.bugReportChick=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.controller.loadReport();
};
LogoView.prototype.clickForum=function(event){
	LPlugin.openURL(LMvc.forumURL);
};
LogoView.prototype.restoreChick=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	var obj = {
		title : Language.get("confirm"),
		messageHtml : Language.get("restore_confirm_message"),
		width : 340,
		height : 260,
		okEvent : function(e) {
			e.currentTarget.parent.remove();
			self.controller.restore();
		},
		cancelEvent : null
	};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
LogoView.prototype.tutorialChick=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.controller.loadTutorial();
};
LogoView.prototype.createCharacterChick=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.createCharacter(button);
};
LogoView.prototype.createCharacter=function(button){
	var self = this;
	if(button.getChildByName("lock")){
		if(LPlugin.native){
			purchaseConfirm(productIdConfig.createCharacter, Language.get("create_character"), function(productId){
				var currentButton = self.topMenuLayer.getChildByName(productId);
				var currentLock = currentButton.getChildByName("lock");
				currentLock.remove();
				self.createCharacter(currentButton);
			});
		}else{
			purchaseConfirm(null, Language.get("create_character"), function(){
				window.open(LMvc.homeURL);
			});
		}
		return;
	}
	self.controller.loadCreateCharacter();
};
LogoView.prototype.showSingleCombatArena=function(event){
	this.controller.showSingleCombatArena();
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
	buttonChapter.name = productIdConfig["chapter_"+chapter.id];
	var group = productIdConfig[chapter.group];
	var groupIsBuy = purchaseHasBuy(group);
	if(chapter.lock && !groupIsBuy){
		if(!purchaseHasBuy(productIdConfig["chapter_" + chapter.id])){
			lockedButton(buttonChapter);
		}
	}
	buttonChapter.x = (200 - buttonChapter.getWidth()) * 0.5 + x;
	buttonChapter.y = y;
	menuLayer.addChild(buttonChapter);
	buttonChapter.addEventListener(LMouseEvent.MOUSE_UP, self.showChapter);
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
		menuLayer.tx = (LGlobal.width - 200) * 0.5;
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
		//self.showChapterListChild(chapter, menuLayer, -110, menuY);
		menuY += menuHeight;
	}
	var lockButton = menuLayer.childList.find(function(child){
		return child.getChildByName("lock");
	});
	if(lockButton && currentChapter && currentChapter.group){
		var title = Language.get("chapter_group");
		var buttonChapter = getSizeButton(title,200, 45);
		buttonChapter.group = currentChapter.group;
		buttonChapter.name = productIdConfig[currentChapter.group];
		if(!purchaseHasBuy(buttonChapter.name)){
			lockedButton(buttonChapter);
		}
		buttonChapter.x = (200 - buttonChapter.getWidth()) * 0.5;
		buttonChapter.y = menuY;
		menuY += menuHeight;
		menuLayer.addChild(buttonChapter);
		buttonChapter.addEventListener(LMouseEvent.MOUSE_UP, self.showChapter);
	}
	/*menuY = 0;
	for(; i < list.length; i++){
		var chapter = list[i];
		self.showChapterListChild(chapter, menuLayer, 110, menuY);
		menuY += menuHeight;
	}*/
	var buttonReturn = getSizeButton(Language.get("return"),200,45);
	buttonReturn.y = menuY;
	menuLayer.addChild(buttonReturn);
	buttonReturn.addEventListener(LMouseEvent.MOUSE_UP, self.returnTopMenu);
	if(index > 0){
		var buttonLeft = getSizeButton("←",100,45);
		buttonLeft.x = (200 - buttonLeft.getWidth()) * 0.5 - 160;
		buttonLeft.y = menuY;
		menuLayer.addChild(buttonLeft);
		buttonLeft.addEventListener(LMouseEvent.MOUSE_UP, self.toLeft);
	}
	if(index != 3){
		var buttonRight = getSizeButton("→",100,45);
		buttonRight.x = (200 - buttonRight.getWidth()) * 0.5 + 160;
		buttonRight.y = menuY;
		menuLayer.addChild(buttonRight);
		buttonRight.addEventListener(LMouseEvent.MOUSE_UP, self.toRight);
	}
	menuLayer.x = self.topMenuLayer.x + 210;
	menuY += menuHeight * 2;
	menuLayer.y = LGlobal.height - menuY;
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
LogoView.prototype.toLeft=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.controller.showChapterList(self.showIndex - 1);
};
LogoView.prototype.toRight=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.controller.showChapterList(self.showIndex + 1);
};
LogoView.prototype.returnTopMenu=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.chapterMenuLayer.mouseChildren = false;
	LTweenLite.to(self.topMenuLayer,0.5,{x:self.topMenuLayer.tx, alpha:1});
	LTweenLite.to(self.chapterMenuLayer,0.5,{x:self.chapterMenuLayer.tx+210, alpha:0,onComplete:self.chapterMenuClosed});
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
	var lockMark = button.getChildByName("lock");
	if(lockMark){
		var name = String.format(Language.get("new_script"), Language.get("chapter_"+button.chapterId));
		if(LPlugin.native){
			if(button.group){
				name = Language.get("chapter_group");
				purchaseGroupConfirm(button.name, name, button.group, function(productId){
					self.controller.showChapterList(self.showIndex);
				});
			}else{
				purchaseConfirm(button.name, name, function(productId){
					var menuLayer = self.getChildByName("menuLayer");
					var currentButton = menuLayer.getChildByName(productId);
					var currentLock = currentButton.getChildByName("lock");
					currentLock.remove();
					self.showChapterRun(currentButton);
				});
			}
		}else{
			if(button.group){
				name = Language.get("chapter_group");
			}
			purchaseConfirm(null, name, function(){
				window.open(LMvc.homeURL);
			});
		}
		return;
	}
	self.chapterMenuLayer.mouseChildren = false;
	self.controller.showChapter(button.chapterId);
};
LogoView.prototype.showNews=function(newsURL){
	var self = this;
	var newsBackMask = getTranslucentMask();
	self.addChild(newsBackMask);
	var w = 400, h = 400, x, y;
	x = (LGlobal.width - w) * 0.5;
	y = (LGlobal.height - h) * 0.5;
	var newsBackground = getPanel("win02", w + 20, h + 20);
	newsBackground.x = x - 10;
	newsBackground.y = y - 10;
	self.addChild(newsBackground);
	var webview = new LStageWebView();
	webview.setViewPort(new LRectangle(x, y, w, h));
	webview.loadURL(newsURL);
	webview.show();
	var closeButton = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closeButton.x = x + w - closeButton.getWidth();
	closeButton.y = y - closeButton.getWidth();
	self.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		event.currentTarget.remove();
		newsBackMask.remove();
		newsBackground.remove();
		webview.hide();
	});
};
