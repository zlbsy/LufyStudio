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
	self.x=self.y=0;
	
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),menuWidth + menuY*2,menuHeight * 5 + menuY*3);
	var winBitmap = getBitmap(win);
	self.mainLayer.addChild(winBitmap);
	
	self.mainLayer.addChild(layer);
	layer.x = menuY;
	var buttonOperatingEnd = getButton("攻击",menuWidth);
	buttonOperatingEnd.y = menuY;
	layer.addChild(buttonOperatingEnd);
	
	
	menuY += menuHeight;
	var buttonGameSave = getButton("策略",menuWidth);
	buttonGameSave.y = menuY;
	layer.addChild(buttonGameSave);
	
	
	menuY += menuHeight;
	var buttonGameRead = getButton("物品",menuWidth);
	buttonGameRead.y = menuY;
	layer.addChild(buttonGameRead);
	
	
	menuY += menuHeight;
	var buttonGameRead = getButton(Language.get("技能"),menuWidth);
	buttonGameRead.y = menuY;
	layer.addChild(buttonGameRead);
	
	
	menuY += menuHeight;
	var buttonGameRead = getButton(Language.get("停止"),menuWidth);
	buttonGameRead.y = menuY;
	layer.addChild(buttonGameRead);
	self.visible = true;
};