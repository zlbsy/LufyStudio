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
	
	self.mainLayer.addChild(layer);
	layer.x = 20;
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
	var buttonAllGenerals = getButton(Language.get("own_generals_list"),200);
	buttonAllGenerals.y = menuY;
	layer.addChild(buttonAllGenerals);
	buttonAllGenerals.addEventListener(LMouseEvent.MOUSE_UP, self.onClickAllGenerals);

	menuY += menuHeight;
	var buttonAllSeignior = getButton(Language.get("all_seignior"),200);
	buttonAllSeignior.y = menuY;
	layer.addChild(buttonAllSeignior);
	buttonAllSeignior.addEventListener(LMouseEvent.MOUSE_UP, self.onClickAllSeignior);
	
	menuY += menuHeight;
	var buttonStampList = getButton(Language.get("stamp_list"),200);
	buttonStampList.y = menuY;
	layer.addChild(buttonStampList);
	buttonStampList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickStampList);
	
	menuY += menuHeight;
	var buttonEventList = getButton(Language.get("event_list"),200);
	buttonEventList.y = menuY;
	layer.addChild(buttonEventList);
	buttonEventList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickEventList);
	
	menuY += menuHeight;
	var buttonDictionary = getButton(Language.get("game_dictionary"),200);
	buttonDictionary.y = menuY;
	layer.addChild(buttonDictionary);
	if(!LPlugin.DictionaryIsRead()){
		var newMark = new LBitmap(new LBitmapData(LMvc.datalist["red_ball"]));
		newMark.name = "newMark";
		newMark.x = 180;
		newMark.y = 30;
		buttonDictionary.addChild(newMark);
	}
	buttonDictionary.addEventListener(LMouseEvent.MOUSE_UP, self.onClickDictionary);
	
	menuY += menuHeight;
	var buttonReturnTop = getButton(Language.get("return_top"),200);
	buttonReturnTop.name = "return_top";
	buttonReturnTop.y = menuY;
	layer.addChild(buttonReturnTop);
	buttonReturnTop.addEventListener(LMouseEvent.MOUSE_UP, self.onClickReturnTop);
	
	//var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),240,menuY + menuHeight + 20);
	//var winBitmap = getBitmap(win);
	var win = getPanel("win05",240,menuY + menuHeight + 20);
	self.mainLayer.x = LMvc.screenWidth - win.getWidth();
	self.mainLayer.addChildAt(win,0);
	
};
MenuView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.backLayer.addChild(getTranslucentMask());
	//self.backLayer.addChild(getBitmap(new LPanel(new LBitmapData(LMvc.datalist["translucent"]),LMvc.screenWidth, LMvc.screenHeight)));
	self.backLayer.addEventListener(LMouseEvent.MOUSE_UP, self.hide);
	self.backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	self.addChild(self.backLayer);
	self.mainLayer = new LSprite();
	self.addChild(self.mainLayer);
	if(!self.load){
		self.load = new LMvcLoader(self);
	}
};
MenuView.prototype.hide=function(event){
	MenuController.instance().hide();
};
MenuView.prototype.onClickDictionary=function(event){
	var button = event.currentTarget;
	var newMark = button.getChildByName("newMark");
	if(newMark){
		newMark.visible = false;
	}
	var self = button.getParentByConstructor(MenuView);
	self.hide();
	self.controller.loadDictionary();
};
MenuView.prototype.onClickAllGenerals=function(event){
	var self = event.currentTarget.getParentByConstructor(MenuView);
	self.hide();
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var generals = seignior.generals();
	LMvc.MapController.loadCharacterList(CharacterListType.OWN_CHARACTER_LIST, generals, {showOnly:true});
};
MenuView.prototype.onClickAllSeignior=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.hide();
	self.controller.loadSeigniorList();
};
MenuView.prototype.onClickEventList=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.hide();
	self.controller.loadEventList();
};
MenuView.prototype.onClickStampList=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.hide();
	self.controller.loadItemList();
};
MenuView.prototype.onClickGameSave=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.load.library(["GameManager"],self.gameSave);
};
MenuView.prototype.gameSave=function(){
	var self = this;
	self.hide();
	RecordController.instance().show(RecordController.SAVE_MODE);
};
MenuView.prototype.onClickGameRead=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.load.library(["GameManager"],self.gameRead);
};
MenuView.prototype.gameRead=function(){
	var self = this;
	self.hide();
	RecordController.instance().show(RecordController.READ_MODE);
};
MenuView.prototype.onClickReturnTop=function(event){
	var self = event ? event.currentTarget.parent.parent.parent : this;
	self.hide();
	LMvc.MapController.view.remove();
	LMvc.MapController = null;
	CharacterModel.list = [];
	CharacterModel.setChara(characterListConfig);
	AreaModel.list = [];
	AreaModel.setArea(MapSetting);
	LMvc.stageLayer.controller.logoLoad();
	/*LMvc.logoStage.visible = true;
	if(LMvc.logoStage.chapterMenuLayer){
		LMvc.logoStage.chapterMenuLayer.mouseChildren = true;
	}*/
	LMvc.stageLayer.x = 0;
};
MenuView.prototype.showDictionary=function(event){
	var self = this;
	var dictionary = new DictionaryView();
	LMvc.layer.addChild(dictionary);
};