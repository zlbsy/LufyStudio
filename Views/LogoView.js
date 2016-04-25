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
		//var obj = {title:Language.get("confirm"),width:340,height:240,cancelEvent:null};
		if(LPlugin.native){
			purchaseConfirm(productIdConfig.createCharacter, "自创武将", function(){
				var lock = button.getChildByName("lock");
				lock.remove();
				self.createCharacter(button);
			});
			/*var productInformation = GameCacher.getData("productInformation");
			if (!productInformation) {
				purchaseProductInformation(function() {
					self.createCharacter(button);
				});
				return;
			}
			var product = productInformation.find(function(child){
				return child.productId == productIdConfig.createCharacter;
			});
			obj.messageHtml = String.format("<font size='21' color='#FFFFFF'>开通新建武将功能需要花费<font color='#FF0000'>{0}</font>，要开通此功能吗?</font>", product.priceLabel);
			obj.okEvent = function(e){
				e.currentTarget.parent.remove();
				purchaseStart(productIdConfig.createCharacter, function(){
					var lock = button.getChildByName("lock");
					lock.remove();
					self.createCharacter(button);
				});
			};*/
		}else{
			purchaseConfirm(null, "自创武将", function(){
				window.open("http://lufylegend.com/sgj");
			});
			/*obj.messageHtml = "<font size='21' color='#FFFFFF'>当前版本无法使用自创武将功能，请下载<font color='#FF0000'>手机安装版本</font>!</font>";
			obj.okEvent = function(e){
				e.currentTarget.parent.remove();
				window.open("http://lufylegend.com/sgj");
			};*/
		}
		//var windowLayer = ConfirmWindow(obj);
		//LMvc.layer.addChild(windowLayer);
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
		var buttonChapter = getButton(Language.get("chapter_"+chapter.id),200);
		buttonChapter.chapterId = chapter.id;
		buttonChapter.x = (200 - buttonChapter.getWidth()) * 0.5 - 110;
		buttonChapter.y = menuY;
		menuLayer.addChild(buttonChapter);
		buttonChapter.addEventListener(LMouseEvent.MOUSE_UP, self.showChapter.bind(self));
		menuY += menuHeight;
	}
	menuY = 0;
	for(; i < list.length; i++){
		var chapter = list[i];
		var buttonChapter = getButton(Language.get("chapter_"+chapter.id),200);
		buttonChapter.chapterId = chapter.id;
		buttonChapter.x = (200 - buttonChapter.getWidth()) * 0.5 + 110;
		buttonChapter.y = menuY;
		menuLayer.addChild(buttonChapter);
		buttonChapter.addEventListener(LMouseEvent.MOUSE_UP, self.showChapter.bind(self));
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
	var self = this;
	//console.log(typeof event.currentTarget.chapterId, event.currentTarget.chapterId);
	if(typeof event.currentTarget.chapterId !== "number"){
		return;
	}
	self.chapterMenuLayer.mouseChildren = false;
	self.controller.showChapter(event.currentTarget.chapterId);
};