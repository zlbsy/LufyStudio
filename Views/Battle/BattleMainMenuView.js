function BattleMainMenuView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.init();
}
BattleMainMenuView.prototype.init = function(){
	var self = this;
	var mainLayer = new LSprite();
	self.addChild(mainLayer);
	var mainMenu = self.getMainMenu();
	mainLayer.addChild(mainMenu);
	self.mainLayer = mainLayer;
	mainLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.onClickDown);
	mainLayer.addEventListener(LMouseEvent.MOUSE_UP, self.onClickUp);
	var menuLayer = new LSprite();
	self.addChild(menuLayer);
};
BattleMainMenuView.prototype.onClickDown = function(event){
	var button = event.currentTarget;
	button.offsetX = event.offsetX;
	button.offsetY = event.offsetY;
	event.currentTarget.startDrag(event.touchPointID);
};
BattleMainMenuView.prototype.onClickUp = function(event){
	var button = event.currentTarget;
	button.stopDrag();
	if(Math.abs(button.offsetX - event.offsetX) > 12 || Math.abs(button.offsetY - event.offsetY) > 12){
		return;
	}
	var self = button.parent;
	
	console.log("click menu");
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
