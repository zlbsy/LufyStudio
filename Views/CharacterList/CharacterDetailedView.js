function CharacterDetailedView(controller,param){
	var self = this;
	base(self,LView,[controller]);
	self.nowTab = CharacterDetailedView.TAB_STATUS;
	self.layerInit();
	self.ctrlLayerInit();
	self.set(param);
}
CharacterDetailedView.prototype.layerInit=function(){
	var self = this;
	var backLayer = getTranslucentMask();
	self.addChild(backLayer);
	self.layer = new LSprite();
	self.addChild(self.layer);
	
	self.tabLayer = new LSprite();
	self.tabLayer.x = 15;
	self.tabLayer.y = 340;
	self.addChild(self.tabLayer);
	
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
};
CharacterDetailedView.prototype.clickLeftArrow=function(event){
	this.changeCharacter(-1);
};
CharacterDetailedView.prototype.clickRightArrow=function(event){
	this.changeCharacter(1);
};
CharacterDetailedView.prototype.changeCharacter=function(value){
	var self = this;
	var characterList= self.controller.characterList;
	var characterModel = self.controller.getValue("selectedCharacter");
	console.log("changeCharacter",characterList);
	var index = characterList.findIndex(function(child){
		var model = child.constructor.name == "CharacterModel"?child:child.data;
		return model.id() == characterModel.id();
	});
	index = index + value;
	if(index < 0){
		index = characterList.length - 1;
	}else if(index >= characterList.length){
		index = 0;
	}
	var characterModel = characterList[index];
	self.set(characterModel);
};
CharacterDetailedView.prototype.set=function(param){
	var self = this;
	var characterModel;
	if(param.constructor.name == "CharacterModel"){
		characterModel = param;
		self.controller.setValue("selectedCharacter", characterModel);
		self.controller.setValue("battleStatus", null);
		self.controller.setValue("battleBelong", null);
	}else if(param.constructor.name == "BattleCharacterView"){
		self.character = param;
		characterModel = param.data;
		self.controller.setValue("selectedCharacter", characterModel);
		self.controller.setValue("battleStatus", self.character);
		self.controller.setValue("battleBelong", self.character.belong);
	}
	self.setFace();
	self.TabShow(self.nowTab);
	self.controller.nextFrameExecute(function(){
		self.controller.dispatchEvent(LController.NOTIFY_ALL);
	});
};
CharacterDetailedView.prototype.setFace=function(){
	var self = this;
	if(self.faceView){
		return;
	}
	self.faceView = new CharacterDetailedFaceView(self.controller);
	self.faceView.x = (LGlobal.width - CharacterFaceSize.width - 20) * 0.5;
	self.faceView.y = 0;
	self.layer.addChild(self.faceView);
};
CharacterDetailedView.TAB_EQUIPMENT = "tab_equipment";
CharacterDetailedView.TAB_SKILL = "tab_skill";
CharacterDetailedView.TAB_ARMS = "tab_arms";
CharacterDetailedView.TAB_LINEUPS = "tab_lineups";
CharacterDetailedView.TAB_STATUS = "tab_status";
CharacterDetailedView.TAB_PROPERTIES = "tab_properties";
CharacterDetailedView.prototype.TabClick=function(event){
	var self = this;
	self.TabShow(event.currentTarget.tabName);
};
CharacterDetailedView.prototype.TabShow=function(tab){
	var self = this, tabIcon, layer;
	self.tabLayer.removeAllChild();
	self.nowTab = tab;
	var tabs = [CharacterDetailedView.TAB_STATUS,CharacterDetailedView.TAB_PROPERTIES,CharacterDetailedView.TAB_SKILL,CharacterDetailedView.TAB_ARMS,CharacterDetailedView.TAB_EQUIPMENT];
	for(var i=0,l=tabs.length;i<l;i++){
		tabIcon = new LSprite();
		if(tabs[i] == tab){
			layer = new LPanel(new LBitmapData(LMvc.datalist["win02"],0,0,51,34),90,50);
			tabIcon.y = -10;
		}else{
			layer = new LPanel(new LBitmapData(LMvc.datalist["win01"],0,0,51,34),90,40);
			tabIcon.tabName = tabs[i];
			tabIcon.addEventListener(LMouseEvent.MOUSE_UP,self.TabClick.bind(self));
		}
		var label = getStrokeLabel(Language.get(tabs[i]),22,"#FFFFFF","#000000",2);
		label.x = (90 - label.getWidth()) * 0.5;
		label.y = 10;
		layer.addChild(label);
		tabIcon.addChild(getBitmap(layer));
		tabIcon.x = 90 * i;
		self.tabLayer.addChild(tabIcon);
	}
	var back = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win02"]),450,LGlobal.height - self.tabLayer.y - 35,18,24,22,24));
	back.y = 35;
	self.tabLayer.addChild(back);
	switch(tab){
		case CharacterDetailedView.TAB_EQUIPMENT:
			self.showEquipment();
			break;
		case CharacterDetailedView.TAB_SKILL:
			self.showStrategy();
			break;
		case CharacterDetailedView.TAB_ARMS:
			self.showArms();
			break;
		case CharacterDetailedView.TAB_PROPERTIES:
			self.showProperties();
			break;
		case CharacterDetailedView.TAB_STATUS:
			self.showStatus();
			break;
	}
};
CharacterDetailedView.prototype.showEquipment=function(){
	var self = this;
	var tabView = new CharacterDetailedTabEquipmentView(self.controller, LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 70);
	tabView.x = 10;
	tabView.y = 50;
	self.tabLayer.addChild(tabView);
};
CharacterDetailedView.prototype.showStrategy=function(){
	var self = this;
	var characterModel = self.controller.getValue("selectedCharacter");
	var strategyView = new StrategyView(self.controller, characterModel, new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 80),self);
	strategyView.x = 10;
	strategyView.y = 50;
	self.tabLayer.addChild(strategyView);
};
CharacterDetailedView.prototype.showArms=function(){
	var self = this;
	var characterModel = self.controller.getValue("selectedCharacter");
	var soldiersView = new SoldiersView(self.controller, characterModel, new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 60));
	soldiersView.x = 10;
	soldiersView.y = 45;
	self.tabLayer.addChild(soldiersView);
};

CharacterDetailedView.prototype.showStatus=function(){
	var self = this;
	var tabView = new CharacterDetailedTabStatusView(self.controller, LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 70);
	tabView.x = 10;
	tabView.y = 50;
	self.tabLayer.addChild(tabView);
};
CharacterDetailedView.prototype.deleteChildFromList=function(characterId){
	var self = this;
	var listView = self.controller.view.listView;
	var items = listView.getItems();
	var item = items.find(function(child){
		return characterId == child.charaModel.id();
	});
	listView.deleteChildView(item);
	self.closeCharacterDetailed();
};
CharacterDetailedView.prototype.showProperties=function(){
	console.log("CharacterDetailedView.prototype.showProperties");
	var self = this;
	var tabView = new CharacterDetailedTabPropertiesView(self.controller, LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 70);
	tabView.x = 10;
	tabView.y = 50;
	self.tabLayer.addChild(tabView);
	tabView.updateView();
};
CharacterDetailedView.prototype.ctrlLayerInit=function(){
	var self = this;
	
	var leftBitmapData = new LBitmapData(LMvc.datalist["arrow"]);
	var left = new LBitmap(leftBitmapData);
	var leftButton = new LButton(left);
	leftButton.x = 10;
	leftButton.y = 100;
	self.ctrlLayer.addChild(leftButton);
	leftButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickLeftArrow.bind(self));
	var rightBitmapData = new LBitmapData(null,0,0,leftBitmapData.width,leftBitmapData.height,LBitmapData.DATA_CANVAS);
	var matrix = new LMatrix();
	matrix.scale(-1,1);
	matrix.translate(leftBitmapData.width,0);
	rightBitmapData.draw(left, matrix);
	var right = new LBitmap(rightBitmapData);
	var rightButton = new LButton(right);
	rightButton.x = LGlobal.width - leftButton.x - leftBitmapData.width;
	rightButton.y = leftButton.y;
	self.ctrlLayer.addChild(rightButton);
	rightButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickRightArrow.bind(self));
	
	var buttonClose = getButton(Language.get("return"),60);
	buttonClose.x = LGlobal.width - buttonClose.getWidth() - 5;
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.closeCharacterDetailed.bind(self));
};
CharacterDetailedView.prototype.closeCharacterDetailed=function(){
	this.controller.closeCharacterDetailed();
};