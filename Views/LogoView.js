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
	var title = getStrokeLabel(Language.get("game_title"),80,"#FFFFFF","#000000",4);
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
	
	var buttonStart = getButton(Language.get("game_start"),200);
	buttonStart.y = menuY;
	menuLayer.addChild(buttonStart);
	buttonStart.addEventListener(LMouseEvent.MOUSE_UP, self.loadChapterList.bind(self));
	
	menuY += menuHeight;
	var buttonRead = getButton(Language.get("game_read"),200);
	buttonRead.y = menuY;
	menuLayer.addChild(buttonRead);
	buttonRead.addEventListener(LMouseEvent.MOUSE_UP, self.readGame.bind(self));
	
	menuY += menuHeight;
	var buttonSetting = getButton(Language.get("game_setting"),200);
	buttonSetting.y = menuY;
	menuLayer.addChild(buttonSetting);
	buttonSetting.addEventListener(LMouseEvent.MOUSE_UP, self.settingGame.bind(self));
	
	menuY += menuHeight;
	var buttonSingleCombat = getButton(Language.get("game_single_combat"),200);
	buttonSingleCombat.y = menuY;
	menuLayer.addChild(buttonSingleCombat);
	buttonSingleCombat.addEventListener(LMouseEvent.MOUSE_UP, self.showSingleCombatArena.bind(self));
	
	menuY += menuHeight;
	var buttonCreate = getButton(Language.get("create_character"),200);
	buttonCreate.y = menuY;
	menuLayer.addChild(buttonCreate);
	if(!purchaseHasBuy(productIdConfig.createCharacter)){
		lockedButton(buttonCreate);
	}
	buttonCreate.addEventListener(LMouseEvent.MOUSE_UP, self.createCharacterChick);
	
	menuY += menuHeight * 2;
	menuLayer.y = LGlobal.height - menuY;
	
	self.topMenuLayer = menuLayer;
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
			purchaseConfirm(productIdConfig.createCharacter, Language.get("create_character"), function(){
				var lock = button.getChildByName("lock");
				lock.remove();
				self.createCharacter(button);
			});
		}else{
			purchaseConfirm(null, Language.get("create_character"), function(){
				window.open("http://lufylegend.com/sgj");
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
	var self = this, title;
	if(chapter.preparing){
		title = Language.get("preparing");
	}else{
		title = chapter.year + " " + Language.get("chapter_"+chapter.id);
	}
	var buttonChapter = getButton(title,200);
	buttonChapter.chapterId = chapter.preparing ? 0 : chapter.id;
	if(!chapter.preparing && chapter.lock){
		if(!purchaseHasBuy(productIdConfig["chapter_" + chapter.id])){
			lockedButton(buttonChapter);
		}
	}
	buttonChapter.x = (200 - buttonChapter.getWidth()) * 0.5 + x;
	buttonChapter.y = y;
	menuLayer.addChild(buttonChapter);
	buttonChapter.addEventListener(LMouseEvent.MOUSE_UP, self.showChapter);
};
LogoView.prototype.showChapterList=function(list){
	var self = this;
	var menuHeight = 55;
	var menuY = 0;
	var menuLayer = new LSprite();
	menuLayer.tx = (LGlobal.width - 200) * 0.5;
	self.addChild(menuLayer);
	var i = 0;
	for(; i < list.length*0.5; i++){
		var chapter = list[i];
		self.showChapterListChild(chapter, menuLayer, -110, menuY);
		menuY += menuHeight;
	}
	menuY = 0;
	for(; i < list.length; i++){
		var chapter = list[i];
		self.showChapterListChild(chapter, menuLayer, 110, menuY);
		menuY += menuHeight;
	}
	var buttonReturn = getButton(Language.get("return"),200);
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
	var button = event.currentTarget;
	var self = button.getParentByConstructor(LogoView);
	self.showChapterRun(button);
};
LogoView.prototype.showChapterRun=function(button){
	var self = this;
	if(!button.chapterId){
		return;
	}
	if(button.getChildByName("lock")){
		var name = String.format(Language.get("new_script"), Language.get("chapter_"+button.chapterId));
		if(LPlugin.native){
			purchaseConfirm(productIdConfig["chapter_"+button.chapterId], name, function(){
				var lock = button.getChildByName("lock");
				lock.remove();
				self.showChapterRun(button);
			});
		}else{
			purchaseConfirm(null, name, function(){
				window.open("http://lufylegend.com/sgj");
			});
		}
		return;
	}
	self.chapterMenuLayer.mouseChildren = false;
	self.controller.showChapter(button.chapterId);
};