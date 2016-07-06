function BattleSelectMenuView(){
	LExtends(this,LView,[]);
}
BattleSelectMenuView.prototype.construct=function(){
	this.controller.addEventListener(BattleSelectMenuEvent.SELECT_MENU_SHOW, this.showSelectMenu.bind(this));
};
BattleSelectMenuView.prototype.onclick=function(){
};
BattleSelectMenuView.prototype.close=function(event){
	var self = event.currentTarget.parent;
	self.closeSelectMenu();
};
BattleSelectMenuView.prototype.cancel=function(event){
	var self = event.currentTarget.parent;
	self.controller.dispatchEvent(BattleSelectMenuEvent.CANCEL);
	self.closeSelectMenu();
};
BattleSelectMenuView.prototype.closeSelectMenu=function(){
	this.visible = false;
};
BattleSelectMenuView.prototype.layerInit=function(){
	var self = this;
	var translucentLayer = new LSprite();
	translucentLayer.addShape(LShape.RECT,[0,0,LGlobal.width,LGlobal.height]);
	self.addChild(translucentLayer);
	translucentLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.onclick);
	translucentLayer.addEventListener(LMouseEvent.MOUSE_UP, self.cancel);
	
	self.mainLayer = new LSprite();
	self.addChild(self.mainLayer);
	
};
BattleSelectMenuView.prototype.showSelectMenu=function(){
	var self = this;
	if(!self.mainLayer){
		self.layerInit();
		self.setMenu();
	}
	self.setPosition();
};
BattleSelectMenuView.prototype.setPosition=function(){
	var self = this;	
	var point = BattleController.ctrlChara.getRootCoordinate();
	self.mainLayer.x=point.x + BattleCharacterSize.width;
	self.mainLayer.y=point.y;
	if(self.mainLayer.x + self.mainLayer.getWidth() > LGlobal.width){
		self.mainLayer.x = point.x - self.mainLayer.getWidth();
	}
	if(self.mainLayer.y + self.mainLayer.getHeight() > LGlobal.height){
		self.mainLayer.y = LGlobal.height - self.mainLayer.getHeight();
	}
	self.visible = true;
};
BattleSelectMenuView.prototype.setMenu=function(){
	var self = this;
	
	var layer = new LSprite(), menuY = 10, menuWidth = 120, menuHeight = 50;
	
	self.mainLayer.addChild(layer);
	layer.x = menuY;
	var menuButton = getIconButton("battle-menu",new LRectangle(0,0,35,35),Language.get("attack"),menuWidth);
	menuButton.name = "attack";
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickAttack);
	
	menuY += menuHeight;
	var menuButton = getIconButton("battle-menu",new LRectangle(35,0,35,35),Language.get("spirit"),menuWidth);
	menuButton.name = "spirit";
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickMagicSelect);
	
	menuY += menuHeight;
	var menuButton = getIconButton("battle-menu",new LRectangle(70,0,35,35),Language.get("singleCombat"),menuWidth);
	menuButton.name = "singleCombat";
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickSingleCombat);
	/*
	menuY += menuHeight;
	var menuButton = getIconButton("battle-menu",new LRectangle(105,0,35,35),"物品",menuWidth);
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickItem);*/

	menuY += menuHeight;
	var menuButton = getIconButton("battle-menu",new LRectangle(175,0,35,35),Language.get("standby"),menuWidth);
	menuButton.name = "standby";
	menuButton.y = menuY;
	layer.addChild(menuButton);
	menuButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickStandby);
	
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),menuWidth + 20, menuHeight * (((menuY - 10) / menuHeight >> 0) + 1) + 30);
	var winBitmap = getBitmap(win);
	self.mainLayer.addChildAt(winBitmap, 0);
};
BattleSelectMenuView.prototype.clickAttack=function(event){
	var self = event ? event.currentTarget.parent.parent.parent : this;
	self.closeSelectMenu();
	self.controller.dispatchEvent(BattleSelectMenuEvent.ATTACK);
};
BattleSelectMenuView.prototype.clickMagicSelect=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.closeSelectMenu();
	self.controller.dispatchEvent(BattleSelectMenuEvent.MAGIC_SELECT);
};
BattleSelectMenuView.prototype.clickSingleCombat=function(event){
	var self = event.currentTarget.parent.parent.parent;
	if(BattleController.ctrlChara.data.isDefCharacter()){
		Toast.makeText(Language.get("def_single_combat_error")).show();
		return;
	}
	self.closeSelectMenu();
	self.controller.dispatchEvent(BattleSelectMenuEvent.SINGLE_COMBAT);
};
BattleSelectMenuView.prototype.clickStandby=function(event){
	var self = event ? event.currentTarget.parent.parent.parent : this;
	self.closeSelectMenu();
	self.controller.dispatchEvent(BattleSelectMenuEvent.STANDBY);
};