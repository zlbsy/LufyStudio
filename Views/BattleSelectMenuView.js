function BattleSelectMenuView(){
	LExtends(this,LView,[]);
}
BattleSelectMenuView.prototype.construct=function(){
	this.controller.addEventListener(BattleSelectMenuEvent.SELECT_MENU_SHOW, this.showSelectMenu.bind(this));
};
BattleSelectMenuView.prototype.showSelectMenu=function(){
	var self = this;
	var layer = new LSprite(), menuY = 10, menuWidth = 120, menuHeight = 50;
	self.mainLayer = new LSprite();
	self.addChild(self.mainLayer);
	self.x=self.y=100;
	
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),menuWidth + menuY*2,menuHeight * 6 + menuY*3);
	var winBitmap = getBitmap(win);
	self.mainLayer.addChild(winBitmap);
	
	self.mainLayer.addChild(layer);
	layer.x = menuY;
	var buttonOperatingEnd = getIconButton("battle-menu",new LRectangle(0,0,35,35),"攻击",menuWidth);
	buttonOperatingEnd.y = menuY;
	layer.addChild(buttonOperatingEnd);
	
	
	menuY += menuHeight;
	var buttonGameSave = getIconButton("battle-menu",new LRectangle(35,0,35,35),"策略",menuWidth);
	buttonGameSave.y = menuY;
	layer.addChild(buttonGameSave);
	
	
	menuY += menuHeight;
	var buttonGameRead = getIconButton("battle-menu",new LRectangle(70,0,35,35),"单挑",menuWidth);
	buttonGameRead.y = menuY;
	layer.addChild(buttonGameRead);
	
	menuY += menuHeight;
	var buttonGameRead = getIconButton("battle-menu",new LRectangle(105,0,35,35),"物品",menuWidth);
	buttonGameRead.y = menuY;
	layer.addChild(buttonGameRead);
	
	
	menuY += menuHeight;
	var buttonGameRead = getIconButton("battle-menu",new LRectangle(140,0,35,35),Language.get("技能"),menuWidth);
	buttonGameRead.y = menuY;
	layer.addChild(buttonGameRead);
	
	
	menuY += menuHeight;
	var buttonGameRead = getIconButton("battle-menu",new LRectangle(175,0,35,35),Language.get("待命"),menuWidth);
	buttonGameRead.y = menuY;
	layer.addChild(buttonGameRead);
	self.visible = true;
};