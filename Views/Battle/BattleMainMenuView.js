function BattleMainMenuView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.init();
}
BattleMainMenuView.prototype.init = function(){
	var self = this;
	self.miniMapVisible = true;
	var mainLayer = new LSprite();
	self.addChild(mainLayer);
	var mainMenu = self.getMainMenu();
	mainLayer.addChild(mainMenu);
	self.mainLayer = mainLayer;
	mainLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.onClickDown);
	mainLayer.addEventListener(LMouseEvent.MOUSE_UP, self.onClickUp);
	if(!self.load){
		self.load = new LMvcLoader(self);
	}
};
BattleMainMenuView.prototype.onClickDown = function(event){
	var button = event.currentTarget;
	var self = button.parent;
	button.offsetX = event.offsetX;
	button.offsetY = event.offsetY;
	if(self.menuLayer && self.menuLayer.visible){
		return;
	}
	
	event.currentTarget.startDrag(event.touchPointID);
};
BattleMainMenuView.prototype.onClickUp = function(event){
	var button = event.currentTarget;
	button.stopDrag();
	if(Math.abs(button.offsetX - event.offsetX) > 12 || Math.abs(button.offsetY - event.offsetY) > 12){
		return;
	}
	var self = button.parent;
	if(self.menuLayer){
		self.menuLayer.visible = !self.menuLayer.visible;
		self.backLayer.visible = self.menuLayer.visible;
		self.miniMapVisible = self.menuLayer.visible;
		if(self.menuLayer.visible){
			self.setMenuPosition();
		}
	}else{
		self.setMenu();
	}
};
BattleMainMenuView.prototype.getMainMenu = function(){
	var self = this;
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist["win01"]),70,50);
	var bitmapIcon;
	for(var i=0;i<3;i++){
		bitmapIcon = new LBitmap(new LBitmapData(LMvc.datalist["menu_line"]));
		bitmapIcon.x = 15;
		bitmapIcon.y = 8 + 10 * i;
		bitmapWin.addChild(bitmapIcon);
	}
	return getBitmap(bitmapWin);
};
BattleMainMenuView.prototype.hideMenu=function(){
	this.backLayer.visible = false;
	this.menuLayer.visible = false;
};
BattleMainMenuView.prototype.setMenu=function(){
	var self = this;
	var menuLayer = new LSprite();
	self.addChildAt(menuLayer, 0);
	self.menuLayer = menuLayer;
	
	var layer = new LSprite(), menuY = 10, menuWidth = 160, menuHeight = 50;
	self.backLayer = getTranslucentMask();
	self.addChildAt(self.backLayer, 0);
	
	self.menuLayer.addChild(layer);
	layer.x = menuY;
	var menuButton = getButton(Language.get("preview"),menuWidth);
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.showOrHideMiniMap);
	
	menuY += menuHeight;
	var menuButton = getButton(Language.get("battleField"),menuWidth);
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickBattleField);
	
	menuY += menuHeight;
	var menuButton = getButton(Language.get("generals_list"),menuWidth);
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickCharacterList);
	menuY += menuHeight;
	var menuButton = getButton(Language.get("game_save"),menuWidth);
	if(!purchaseHasBuy(productIdConfig.saveReport)){
		lockedButton(menuButton);
	}
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGameSave);
	menuY += menuHeight;
	var menuButton = getButton(Language.get("game_read"),menuWidth);
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGameRead);
	
	menuY += menuHeight;
	var menuButton = getButton(Language.get("army_retreat"),menuWidth);
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.toRetreat);
	
	menuY += menuHeight;
	var menuButton = getButton(Language.get("end_bout"),menuWidth);
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.boutEnd);
	
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),menuWidth + 20, menuHeight * (((menuY - 10) / menuHeight >> 0) + 1) + 30);
	var winBitmap = getBitmap(win);
	self.menuLayer.addChildAt(winBitmap, 0);
	self.menuWidth = self.menuLayer.getWidth();
	self.menuHeight = self.menuLayer.getHeight();
	self.setMenuPosition();
};
BattleMainMenuView.prototype.setMenuPosition=function(){
	var self = this;
	self.menuLayer.x = self.mainLayer.x + 70;
	self.menuLayer.y = self.mainLayer.y;
	if(self.menuLayer.x + self.menuWidth > LGlobal.width){
		self.menuLayer.x = self.mainLayer.x - self.menuWidth;
	}
	if(self.menuLayer.y + self.menuHeight > LGlobal.height){
		self.menuLayer.y = LGlobal.height - self.menuHeight;
	}
};
BattleMainMenuView.prototype.showOrHideMiniMap=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var miniLayer = self.controller.view.miniLayer;
	miniLayer.visible = !miniLayer.visible;
};
BattleMainMenuView.prototype.toRetreat=function(event){
	var self = event.currentTarget.getParentByConstructor(BattleMainMenuView);
	self.hideMenu();
	var obj = {title:Language.get("confirm"),message:Language.get("army_retreat_confirm"),height:200,
		okEvent:self.retreatRun,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
BattleMainMenuView.prototype.retreatRun=function(event){
	event.currentTarget.parent.remove();
	allCharactersToRetreat();
};
BattleMainMenuView.prototype.boutEnd=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.boutEnd();
	self.hideMenu();
};
BattleMainMenuView.prototype.onClickGameSave=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(BattleMainMenuView);
	self.hideMenu();
	self.toGameSave(button);
};
BattleMainMenuView.prototype.toGameSave=function(button){
	var self = this;
	if(button.getChildByName("lock")){
		if(LPlugin.native){
			purchaseConfirm(productIdConfig.saveReport, Language.get("battle_save_record"), function(){
				LMvc.changeLoading(TranslucentLoading);
				self.load.library(["GameManager"],self.gameSave);
			});
		}else{
			purchaseConfirm(null, Language.get("battle_save_record"), function(){
				window.open("http://lufylegend.com/sgj");
			});
		}
		return;
	}
	LMvc.changeLoading(TranslucentLoading);
	self.load.library(["GameManager"],self.gameSave);
};
BattleMainMenuView.prototype.gameSave=function(){
	RecordController.instance().show(RecordController.SAVE_MODE);
};
BattleMainMenuView.prototype.onClickGameRead=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.hideMenu();
	LMvc.changeLoading(TranslucentLoading);
	self.load.library(["GameManager"],self.gameRead);
};
BattleMainMenuView.prototype.gameRead=function(){
	var self = this;
	RecordController.instance().show(RecordController.READ_MODE);
};

BattleMainMenuView.prototype.clickCharacterList=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.hideMenu();
	var selfCharas = self.controller.view.charaLayer.getCharactersFromBelong(Belong.SELF);
	var enemyCharas = self.controller.view.charaLayer.getCharactersFromBelong(Belong.ENEMY);
	self.controller.loadCharacterList(CharacterListType.BATTLE_CHARACTER_LIST,selfCharas.concat(enemyCharas), {showOnly:true});
};
BattleMainMenuView.prototype.clickBattleField=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.hideMenu();
	self.controller.view.showBattleField();
};