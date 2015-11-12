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
BattleMainMenuView.prototype.setMenu=function(){
	var self = this;
	var menuLayer = new LSprite();
	self.addChildAt(menuLayer, 0);
	self.menuLayer = menuLayer;
	
	var layer = new LSprite(), menuY = 10, menuWidth = 120, menuHeight = 50;
	
	self.menuLayer.addChild(layer);
	layer.x = menuY;
	var menuButton = getButton("预览图",menuWidth);
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.showOrHideMiniMap);
	
	menuY += menuHeight;
	var menuButton = getButton("战况",menuWidth);
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickBattleField);
	
	menuY += menuHeight;
	var menuButton = getButton("武将一览",menuWidth);
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickCharacterList);
	
	menuY += menuHeight;
	var menuButton = getButton(Language.get("回合结束"),menuWidth);
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
BattleMainMenuView.prototype.boutEnd=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.boutEnd();
	self.menuLayer.visible = false;
};
BattleMainMenuView.prototype.clickCharacterList=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.menuLayer.visible = false;
	var selfCharas = self.controller.view.charaLayer.getCharactersFromBelong(Belong.SELF);
	var enemyCharas = self.controller.view.charaLayer.getCharactersFromBelong(Belong.ENEMY);
	self.controller.loadCharacterList(CharacterListType.BATTLE_CHARACTER_LIST,selfCharas.concat(enemyCharas));
};
BattleMainMenuView.prototype.clickBattleField=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.menuLayer.visible = false;
	self.controller.view.showBattleField();
};