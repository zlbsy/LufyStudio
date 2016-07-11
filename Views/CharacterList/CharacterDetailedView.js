function CharacterDetailedView(controller,param){
	var self = this;
	base(self,LView,[controller]);
	self.nowTab = CharacterDetailedView.TAB_STATUS;
	self.layerInit();
	self.ctrlLayerInit();
	self.tabs = [CharacterDetailedView.TAB_STATUS,CharacterDetailedView.TAB_PROPERTIES,CharacterDetailedView.TAB_SKILL,CharacterDetailedView.TAB_ARMS,CharacterDetailedView.TAB_EQUIPMENT];
	
	self.setTabButtons();
	self.tabLayerInit();
	self.set(param);
}
CharacterDetailedView.TAB_EQUIPMENT = "tab_equipment";
CharacterDetailedView.TAB_SKILL = "tab_skill";
CharacterDetailedView.TAB_ARMS = "tab_arms";
CharacterDetailedView.TAB_LINEUPS = "tab_lineups";
CharacterDetailedView.TAB_STATUS = "tab_status";
CharacterDetailedView.TAB_PROPERTIES = "tab_properties";
CharacterDetailedView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = getTranslucentMask();
	self.addChild(self.backLayer);
	self.layer = new LSprite();
	self.addChild(self.layer);
	
	self.tabButtonCacheLayer = new LSprite();
	self.tabButtonCacheLayer.x = 15;
	self.tabButtonCacheLayer.y = 340;
	self.addChild(self.tabButtonCacheLayer);
	self.selectedTabLayer = new LSprite();
	self.selectedTabLayer.y = self.tabButtonCacheLayer.y - 10;
	self.addChild(self.selectedTabLayer);
	self.tabButtonLayer = new LSprite();
	self.tabButtonLayer.x = self.tabButtonCacheLayer.x;
	self.tabButtonLayer.y = self.tabButtonCacheLayer.y;
	self.addChild(self.tabButtonLayer);
	
	self.tabLayer = new LSprite();
	self.tabLayer.x = self.tabButtonCacheLayer.x + 10;
	self.tabLayer.y = self.tabButtonCacheLayer.y + 45;
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
CharacterDetailedView.prototype.die=function(){
	var self = this;
	self.controller = null;
	self.model = null;
	if(self.faceView){
		self.faceView.controller.removeView(self.faceView);
		self.faceView.controller = null;
		self.faceView.model = null;
	}
	for(var i=0;i<self.tabLayer.numChildren;i++){
		var tab = self.tabLayer.childList[i];
		if(tab.controller){
			tab.controller.removeView(tab);
		}
		tab.controller = null;
		tab.model = null;
	}
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
		self.controller.setValue("charaStatus", self.character.status);
		self.controller.setValue("battleStatus", self.character.status.statusLabel());
		self.controller.setValue("battleBelong", self.character.belong);
	}
	self.setFaceLayer();
	self.TabShow(self.nowTab);
	self.controller.dispatchEvent(LController.NOTIFY_ALL);
};
CharacterDetailedView.prototype.setFaceLayer=function(){
	var self = this;
	if(self.faceView){
		self.faceView.init(self.controller);
		return;
	}
	self.faceView = new CharacterDetailedFaceView(self.controller);
	self.faceView.x = (LGlobal.width - CharacterFaceSize.width - 20) * 0.5;
	self.faceView.y = 0;
	self.layer.addChild(self.faceView);
};
CharacterDetailedView.prototype.setTabButtons=function(){
	var self = this, layer;
	var tabs = self.tabs;
	for(var i=0,l=self.tabs.length;i<l;i++){
		if(!GameCacher.hasPanelBitmapData("tab_no_selected")){
			var bitmapData = getBitmapData(new LPanel(new LBitmapData(LMvc.datalist["win01"],0,0,51,34),90,40));
			GameCacher.setPanelBitmapData("tab_no_selected",0,0,0,0,0,0,bitmapData);
		}
		layer = getPanel("tab_no_selected");
		var label = getStrokeLabel(Language.get(tabs[i]),22,"#FFFFFF","#000000",2);
		label.x = (90 - label.getWidth()) * 0.5;
		label.y = 10;
		layer.addChild(label);
		layer.x = 90 * i;
		self.tabButtonCacheLayer.addChild(layer);
	}
	self.tabButtonCacheLayer.cacheAsBitmap(true);
};
CharacterDetailedView.prototype.selectedTab=function(key){
	var self = this, label;
	self.selectedTabLayer.cacheAsBitmap(false);
	if(self.selectedTabLayer.numChildren == 0){
		if(!GameCacher.hasPanelBitmapData("tab_selected")){
			var bitmapData = getBitmapData(new LPanel(new LBitmapData(LMvc.datalist["win02"],0,0,51,34),90,50));
			GameCacher.setPanelBitmapData("tab_selected",0,0,0,0,0,0,bitmapData);
		}
		var layer = getPanel("tab_selected");
		self.selectedTabLayer.addChild(layer);
		label = getStrokeLabel("",22,"#FFFFFF","#000000",2);
		label.y = 10;
		self.selectedTabLayer.addChild(label);
	}
	label = self.selectedTabLayer.getChildAt(1); 
	label.text = Language.get(key);
	label.x = (90 - label.getWidth()) * 0.5;
	self.selectedTabLayer.cacheAsBitmap(true);
};
CharacterDetailedView.prototype.tabLayerInit=function(){
	var self = this;
	var back = getPanel("win02",450,LGlobal.height - self.tabLayer.y + 10);
	back.x = -10;
	back.y = -10;
	self.tabLayer.addChild(back);
};
CharacterDetailedView.prototype.TabClick=function(event){
	var button = event.currentTarget;
	var self = button.getParentByConstructor(CharacterDetailedView);
	self.TabShow(button.tabName);
	self.controller.dispatchEvent(LController.NOTIFY_ALL);
};
CharacterDetailedView.prototype.TabShow=function(tab){
	var self = this, layer;
	self.tabButtonLayer.removeAllChild();
	self.nowTab = tab;
	var tabs = self.tabs;
	for(var i=0,l=tabs.length;i<l;i++){
		if(tabs[i] == tab){
			self.selectedTab(tab);
			self.selectedTabLayer.x = self.tabButtonCacheLayer.x + 90 * i;
		}else{
			layer = new LSprite();
			layer.tabName = tabs[i];
			layer.addShape(LShape.RECT,[0,0,90,40]);
			layer.x = 90 * i;
			self.tabButtonLayer.addChild(layer);
			layer.addEventListener(LMouseEvent.MOUSE_UP,self.TabClick);
		}
	}
	for(var i=1;i<self.tabLayer.numChildren;i++){
		self.tabLayer.childList[i].visible = false;
	}
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
	var equipmentView = self.tabLayer.childList.find(function(child){
		return child instanceof CharacterDetailedTabEquipmentView;
	});
	if(equipmentView){
		equipmentView.addController(self.controller);
		equipmentView.visible = true;
		return;
	}
	equipmentView = new CharacterDetailedTabEquipmentView(self.controller, LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 10);
	self.tabLayer.addChild(equipmentView);
};
CharacterDetailedView.prototype.showStrategy=function(){
	var self = this;
	var strategyView = self.tabLayer.childList.find(function(child){
		return child instanceof StrategyView;
	});
	if(strategyView){
		strategyView.addController(self.controller);
		strategyView.visible = true;
		return;
	}
	var characterModel = self.controller.getValue("selectedCharacter");
	strategyView = new StrategyView(self.controller, characterModel, new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 10),self);
	self.tabLayer.addChild(strategyView);
};
CharacterDetailedView.prototype.showArms=function(){
	var self = this;
	var soldiersView = self.tabLayer.childList.find(function(child){
		return child instanceof SoldiersView;
	});
	if(soldiersView){
		soldiersView.addController(self.controller);
		soldiersView.visible = true;
		return;
	}
	var characterModel = self.controller.getValue("selectedCharacter");
	soldiersView = new SoldiersView(self.controller, characterModel, new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 10));
	self.tabLayer.addChild(soldiersView);
};

CharacterDetailedView.prototype.showStatus=function(){
	var self = this;
	var statusView = self.tabLayer.childList.find(function(child){
		return child instanceof CharacterDetailedTabStatusView;
	});
	if(statusView){
		statusView.addController(self.controller);
		statusView.visible = true;
		return;
	}
	statusView = new CharacterDetailedTabStatusView(self.controller, LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 10);
	self.tabLayer.addChild(statusView);
};
CharacterDetailedView.prototype.showProperties=function(){
	var self = this;
	var propertiesView = self.tabLayer.childList.find(function(child){
		return child instanceof CharacterDetailedTabPropertiesView;
	});
	if(propertiesView){
		propertiesView.addController(self.controller);
		propertiesView.visible = true;
		return;
	}
	propertiesView = new CharacterDetailedTabPropertiesView(self.controller, LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 10);
	self.tabLayer.addChild(propertiesView);
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
CharacterDetailedView.prototype.updateChildFromList=function(characterId){
	var self = this;
	var listView = self.controller.view.listView;
	var items = listView.getItems();
	var item = items.find(function(child){
		return characterId == child.charaModel.id();
	});
	var characterModel = CharacterModel.getChara(characterId);
	item.set(characterModel);
	item.cacheAsBitmap(false);
	item.updateView();
	self.closeCharacterDetailed();
};
CharacterDetailedView.prototype.ctrlLayerInit=function(){
	var self = this;
	
	var leftBitmapData = new LBitmapData(LMvc.datalist["arrow"]);
	var left = new LBitmap(leftBitmapData);
	var leftButton = new LButton(left);
	leftButton.x = 10;
	leftButton.y = 130;
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
	
	var buttonClose = getButton(Language.get("return"),100);
	buttonClose.x = LGlobal.width - buttonClose.getWidth() - 5;
	self.ctrlLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.closeCharacterDetailed);
	var buttonItem = getButton(Language.get("item"),100);
	buttonItem.x = buttonClose.x;
	buttonItem.y = buttonClose.getHeight() + 5;
	self.ctrlLayer.addChild(buttonItem);
	buttonItem.addEventListener(LMouseEvent.MOUSE_UP, self.openItems);
};
CharacterDetailedView.prototype.closeCharacterDetailed=function(event){
	var self = event ?  event.currentTarget.getParentByConstructor(CharacterDetailedView) : this;
	self.controller.closeCharacterDetailed();
};
CharacterDetailedView.prototype.openItems=function(event){
	var self = event ?  event.currentTarget.getParentByConstructor(CharacterDetailedView) : this;
	if(self.itemsView){
		self.itemsView.visible = true;
		self.itemsView.updateView();
		return;
	}
	self.itemsView = new ItemsView();
	self.addChild(self.itemsView);
	self.itemsView.updateView();
};