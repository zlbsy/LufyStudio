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
	buttonStampList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickEventList);
	
	menuY += menuHeight;
	var buttonReturnTop = getButton(Language.get("return_top"),200);
	buttonReturnTop.y = menuY;
	layer.addChild(buttonReturnTop);
	buttonReturnTop.addEventListener(LMouseEvent.MOUSE_UP, self.onClickReturnTop);
	
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),240,menuY + menuHeight + 20);
	var winBitmap = getBitmap(win);
	self.mainLayer.x = LGlobal.width - winBitmap.getWidth();
	self.mainLayer.addChildAt(winBitmap,0);
	
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
	if(!self.load){
		self.load = new LMvcLoader(self);
	}
};
MenuView.prototype.hide=function(event){
	MenuController.instance().hide();
};
MenuView.prototype.onClickOperatingEnd=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.hide();
	if(typeof SkillMasterModel == UNDEFINED){
		self.loadSeigniorExecute();
	}else{
		SeigniorExecute.run();
	}
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
};
MenuView.prototype.onClickGameRead=function(event){
};
MenuView.prototype.onClickReturnTop=function(event){
};
MenuView.prototype.loadSeigniorExecute=function(){
	var self = this;
	self.load.model(["Master/SkillMaster"],self.loadSeigniorExecuteConfig);
};
MenuView.prototype.loadSeigniorExecuteConfig=function(){
	var self = this;
	self.load.config(["CharacterListType","Skills","EventList"],self.loadSeigniorExecuteHelper);
};
MenuView.prototype.loadSeigniorExecuteHelper=function(){
	var self = this;
	self.load.helper(["JobHelper","JobAIHelper"],self.seigniorExecute);
};
MenuView.prototype.seigniorExecute=function(){
	var self = this;
	SkillMasterModel.setMaster(SkillsData);
	SeigniorExecute.run();
};