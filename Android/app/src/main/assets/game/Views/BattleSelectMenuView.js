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
	translucentLayer.addShape(LShape.RECT,[0,0,LMvc.screenWidth,LMvc.screenHeight]);
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
	if(LMvc.BattleController.militaryOver || BattleController.ctrlChara.data.militaryId() == 0 || 
		LMvc.BattleController.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		self.hideMilitaryAdviser();
	}else{
		self.showMilitaryAdviser();
	}
	self.setPosition();
};
BattleSelectMenuView.prototype.setPosition=function(){
	var self = this;	
	var point = BattleController.ctrlChara.getRootCoordinate();
	self.mainLayer.x=point.x + BattleCharacterSize.width;
	self.mainLayer.y=point.y;
	if(self.mainLayer.x + self.mainLayer.getWidth() > LMvc.screenWidth){
		self.mainLayer.x = point.x - self.mainLayer.getWidth();
	}
	if(self.mainLayer.y + self.mainLayer.getHeight() > LMvc.screenHeight){
		self.mainLayer.y = LMvc.screenHeight - self.mainLayer.getHeight();
	}
	self.visible = true;
};
BattleSelectMenuView.prototype.setMenu=function(){
	var self = this;
	
	var layer = new LSprite(), menuY = 10, menuWidth = 120, menuHeight = 50;
	layer.name = "buttonLayer";
	self.mainLayer.addChild(layer);
	layer.x = menuY;
	var attackButton = getIconButton("battle-menu",new LRectangle(0,0,35,35),Language.get("attack"),menuWidth);
	attackButton.name = "attack";
	attackButton.y = menuY;
	layer.addChild(attackButton);
	attackButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickAttack);
	
	menuY += menuHeight;
	var strategyButton = getIconButton("battle-menu",new LRectangle(35,0,35,35),Language.get("strategy"),menuWidth);
	strategyButton.name = "spirit";
	strategyButton.y = menuY;
	layer.addChild(strategyButton);
	strategyButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickMagicSelect);
	
	var historyId = LMvc.BattleController.getValue("historyId");
	if(!historyId){
		menuY += menuHeight;
		var singleCombatButton = getIconButton("battle-menu",new LRectangle(70,0,35,35),Language.get("singleCombat"),menuWidth);
		singleCombatButton.name = "singleCombat";
		singleCombatButton.y = menuY;
		layer.addChild(singleCombatButton);
		singleCombatButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickSingleCombat);
	}
	
	menuY += menuHeight;
	self.menuHeight = menuHeight;
	self.separationY = menuY;
	var militaryAdviserButton = getIconButton("battle-menu",new LRectangle(140,0,35,35),Language.get("military"),menuWidth);
	militaryAdviserButton.name = "militaryAdviser";
	militaryAdviserButton.y = menuY;
	layer.addChild(militaryAdviserButton);
	militaryAdviserButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickMilitaryAdviser);
	var noMilitaryAdviserBackground = getPanel("win05",menuWidth + 20, menuHeight * (((menuY - 10) / menuHeight >> 0) + 1) + 20);
	noMilitaryAdviserBackground.name = "noMilitaryAdviserBackground";
	self.mainLayer.addChildAt(noMilitaryAdviserBackground, 0);

	menuY += menuHeight;
	var standbyButton = getIconButton("battle-menu",new LRectangle(175,0,35,35),Language.get("standby"),menuWidth);
	standbyButton.name = "standby";
	standbyButton.y = menuY;
	layer.addChild(standbyButton);
	standbyButton.addEventListener(LMouseEvent.MOUSE_UP, self.clickStandby);
	
	var militaryAdviserBackground = getPanel("win05",menuWidth + 20, menuHeight * (((menuY - 10) / menuHeight >> 0) + 1) + 20);
	militaryAdviserBackground.name = "militaryAdviserBackground";
	self.mainLayer.addChildAt(militaryAdviserBackground, 0);
};
BattleSelectMenuView.prototype.showMilitaryAdviser=function(){
	var self = this;
	var buttonLayer = self.mainLayer.getChildByName("buttonLayer");
	var militaryAdviserButton = buttonLayer.getChildByName("militaryAdviser");
	var standbyButton = buttonLayer.getChildByName("standby");
	var militaryAdviserBackground = self.mainLayer.getChildByName("militaryAdviserBackground");
	var noMilitaryAdviserBackground = self.mainLayer.getChildByName("noMilitaryAdviserBackground");
	militaryAdviserBackground.visible = true;
	noMilitaryAdviserBackground.visible = false;
	militaryAdviserButton.visible = true;
	standbyButton.y = self.separationY + self.menuHeight;
};
BattleSelectMenuView.prototype.hideMilitaryAdviser=function(){
	var self = this;
	var buttonLayer = self.mainLayer.getChildByName("buttonLayer");
	var militaryAdviserButton = buttonLayer.getChildByName("militaryAdviser");
	var standbyButton = buttonLayer.getChildByName("standby");
	var militaryAdviserBackground = self.mainLayer.getChildByName("militaryAdviserBackground");
	var noMilitaryAdviserBackground = self.mainLayer.getChildByName("noMilitaryAdviserBackground");
	militaryAdviserBackground.visible = false;
	noMilitaryAdviserBackground.visible = true;
	militaryAdviserButton.visible = false;
	standbyButton.y = self.separationY;
};
BattleSelectMenuView.prototype.clickMilitaryAdviser=function(event){
	var self = event.currentTarget.getParentByConstructor(BattleSelectMenuView);
	self.closeSelectMenu();
	self.controller.dispatchEvent(BattleSelectMenuEvent.MILITARY_ADVISER);
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