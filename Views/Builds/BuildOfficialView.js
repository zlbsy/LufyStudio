/**
 * 官府
 * 出征，武将一览，谍报，
 * 外交:->选择外交势力->根据势力关系选择外交项目
 */
function BuildOfficialView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"official"]);
}
BuildOfficialView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var cityModel = self.controller.getValue("cityData");
	if(LMvc.selectSeignorId == cityModel.seignior_chara_id()){
		var buttonExpedition = getButton(Language.get("expedition"),200);
		buttonExpedition.y = menuY;
		layer.addChild(buttonExpedition);
		buttonExpedition.addEventListener(LMouseEvent.MOUSE_UP, self.onClickExpeditionButton.bind(self));
		
		menuY += menuHeight;
		var buttonGeneralsList = getButton(Language.get("generals_list"),200);
		buttonGeneralsList.y = menuY;
		layer.addChild(buttonGeneralsList);
		buttonGeneralsList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsListButton.bind(self));
		
		menuY += menuHeight;
		var buttonGeneralsMove = getButton(Language.get("generals_move"),200);
		buttonGeneralsMove.y = menuY;
		layer.addChild(buttonGeneralsMove);
		buttonGeneralsMove.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsMoveButton.bind(self));
		
		menuY += menuHeight;
		var buttonIntelligence = getButton(Language.get("intelligence"),200);
		buttonIntelligence.y = menuY;
		layer.addChild(buttonIntelligence);
		
		menuY += menuHeight;
		var buttonDiplomacy = getButton(Language.get("diplomacy"),200);
		buttonDiplomacy.y = menuY;
		layer.addChild(buttonDiplomacy);
	}else{
		var buttonGeneralsList = getButton(Language.get("generals_list"),200);
		buttonGeneralsList.y = menuY;
		layer.addChild(buttonGeneralsList);
		buttonGeneralsList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsListButton.bind(self));
	}
	
	return layer;
};
BuildOfficialView.prototype.onClickExpeditionButton=function(event){
	var self = this;
	console.log("onClickExpeditionButton");
};
BuildOfficialView.prototype.onClickCloseButton=function(event){
	var self = this;
	self.contentLayer.removeAllChild();
	self.menuLayer.visible = true;
	self.controller.view.baseLayer.visible = true;
};
BuildOfficialView.prototype.onClickGeneralsListButton=function(event){
	var self = this;
	self.controller.loadCharacterList(CharacterListType.CHARACTER_LIST,self);
	return;
	var characterListView = new CharacterListView(self.controller, CharacterListView.CHARACTER_LIST, self);
	self.contentLayer.addChild(characterListView);
};
BuildOfficialView.prototype.onClickGeneralsMoveButton=function(event){
	var self = this;
	self.controller.loadCharacterList(CharacterListType.CHARACTER_MOVE,self);
	return;
	self.menuLayer.visible = false;
	self.controller.view.baseLayer.visible = false;
	
	var characterListView = new CharacterListView(self.controller, CharacterListView.CHARACTER_MOVE, self);
	self.contentLayer.addChild(characterListView);
};