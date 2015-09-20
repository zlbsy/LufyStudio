function MenuView(){
	base(this,LView,[]);
}
MenuView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
MenuView.prototype.init=function(){
	var self = this;
	self.layerInit();
	
	var layer = new LSprite(), menuY = 20, menuHeight = 55;
	
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),240,menuHeight * 6 + 40);
	var winBitmap = getBitmap(win);
	self.mainLayer.x = LGlobal.width - winBitmap.getWidth();
	self.mainLayer.addChild(winBitmap);
	
	self.mainLayer.addChild(layer);
	layer.x = 20;
	var buttonOperatingEnd = getButton(Language.get("operating_end"),200);
	buttonOperatingEnd.y = menuY;
	layer.addChild(buttonOperatingEnd);
	buttonOperatingEnd.addEventListener(LMouseEvent.MOUSE_UP, self.onClickOperatingEnd);
	
	menuY += menuHeight;
	var buttonGameSave = getButton(Language.get("game_save"),200);
	buttonGameSave.y = menuY;
	layer.addChild(buttonGameSave);
	buttonGameSave.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGameSave);
	
	menuY += menuHeight;
	var buttonGameRead = getButton(Language.get("game_read"),200);
	buttonGameRead.y = menuY;
	layer.addChild(buttonGameRead);
	buttonGameRead.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGameRead);
	
	menuY += menuHeight;
	var buttonGameRead = getButton(Language.get("宝物图鉴"),200);
	buttonGameRead.y = menuY;
	layer.addChild(buttonGameRead);
	buttonGameRead.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGameRead);
	
	menuY += menuHeight;
	var buttonGameRead = getButton(Language.get("事件一览"),200);
	buttonGameRead.y = menuY;
	layer.addChild(buttonGameRead);
	buttonGameRead.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGameRead);
	
	menuY += menuHeight;
	var buttonReturnTop = getButton(Language.get("return_top"),200);
	buttonReturnTop.y = menuY;
	layer.addChild(buttonReturnTop);
	buttonReturnTop.addEventListener(LMouseEvent.MOUSE_UP, self.onClickReturnTop);
};
MenuView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.backLayer.addChild(getBitmap(new LPanel(new LBitmapData(LMvc.datalist["translucent"]),LGlobal.width, LGlobal.height)));
	self.backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.hide);
	self.backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	self.addChild(self.backLayer);
	self.mainLayer = new LSprite();
	self.addChild(self.mainLayer);
};
MenuView.prototype.hide=function(event){
	MenuController.instance().hide();
};
MenuView.prototype.onClickOperatingEnd=function(event){
	event.currentTarget.parent.parent.parent.hide();
	SeigniorExecute.run();
};
MenuView.prototype.onClickGameSave=function(event){
};
MenuView.prototype.onClickGameRead=function(event){
};
MenuView.prototype.onClickReturnTop=function(event){
};
