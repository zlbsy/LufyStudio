function CharacterDetailedView(controller,param){
	var self = this;
	base(self,LView,[controller]);
	self.nowTab = CharacterDetailedView.TAB_STATUS;
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
	var characterList= self.controller.view.dataList;
	var index = characterList.findIndex(function(child){
		var model = child.constructor.name == "CharacterModel"?child:child.data;
		return model.id() == self.characterModel.id();
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
	self.die();
	self.removeAllChild();
	var characterModel;
	if(param.constructor.name == "CharacterModel"){
		characterModel = param;
		self.controller.setValue("selectedCharacter", characterModel);
		self.controller.setValue("battleStatus", null);
	}else if(param.constructor.name == "BattleCharacterView"){
		self.character = param;
		characterModel = param.data;
		self.controller.setValue("selectedCharacter", characterModel);
		self.controller.setValue("battleStatus", self.character);
	}
	console.log("CharacterDetailedView",characterModel);
	var faceW = 224, faceH = 336;
	self.faceW = faceW;
	self.faceH = faceH;
	self.characterModel = characterModel;
	self.layerInit();
	//alert("CharacterDetailedView.prototype.set");
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),faceW + 10,faceH + 10);
	win.x = (LGlobal.width - faceW - 10) * 0.5;
	win.y = 0;
	self.layer.addChild(win);
	var face = self.characterModel.face();
	face.x = win.x + 5;
	face.y = win.y + 5;
	self.face = face;
	self.layer.addChild(face);
	
	var name = getStrokeLabel(self.characterModel.name(), 20, "#FFFFFF", "#000000", 4);
	name.x = face.x + 10;
	name.y = face.y + 10;
	self.layer.addChild(name);
	if(self.character){
		var belongLabel = getStrokeLabel(Language.get(self.character.belong), 20, "#FFFFFF", "#000000", 4);
		belongLabel.x = name.x;
		belongLabel.y = name.y + name.getHeight()+ 10;
		self.layer.addChild(belongLabel);
	}
	
	self.TabShow(self.nowTab);
	self.ctrlLayerInit();
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
	var icon,iconSize = 60;
	var equipmentCoordinates = [];
	equipmentCoordinates[PositionConfig.Head] = {x:(self.faceW - iconSize)*0.5,y:0};
	equipmentCoordinates[PositionConfig.Hand] = {x:0,y:(self.faceH - iconSize) * 0.5};
	equipmentCoordinates[PositionConfig.Body] = {x:(self.faceW - iconSize)*0.5,y:(self.faceH - iconSize) * 0.5};
	equipmentCoordinates[PositionConfig.Foot] = {x:(self.faceW - iconSize)*0.5,y:self.faceH - iconSize};
	equipmentCoordinates[PositionConfig.Accessories] = {x:self.faceW - iconSize,y:(self.faceH - iconSize) * 0.5};
	var equipments = self.characterModel.equipments();
	for(var i=0;i<PositionConfig.positions.length;i++){
		var position = PositionConfig.positions[i];
		var coordinate = equipmentCoordinates[position];
		var equipment = equipments.find(function(child){
			return child.position() == position;
		});
		if(equipment){
			icon = equipment.icon(new LPoint(iconSize,iconSize));
			icon.removeItemId = equipment.id();
			if(!LMvc.BattleController && self.characterModel.seigniorId() == LMvc.selectSeignorId){
				icon.addEventListener(LMouseEvent.MOUSE_UP,self.removeEquipment);
			}
		}else{
			icon = new LPanel(new LBitmapData(LMvc.datalist["win03"]),iconSize,iconSize);
		}
		icon.x = self.face.x + coordinate.x - self.tabLayer.x;
		icon.y = self.face.y + coordinate.y - self.tabLayer.y;
		self.tabLayer.addChild(icon);
	}
	if(LMvc.BattleController){
		return;
	}
	var equipmentsView = new EquipmentsView(self.controller, "equipment", new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 80));
	equipmentsView.x = 10;
	equipmentsView.y = 50;
	self.tabLayer.addChild(equipmentsView);
	equipmentsView.addEventListener(EquipmentEvent.Dress,self.dressEquipment.bind(self));
};
CharacterDetailedView.prototype.dressEquipment=function(event){
	var self = this;
	var selectItemModel = event.selectItemModel;
	self.characterModel.equip(selectItemModel);
	
	var cityData = LMvc.CityController.getValue("cityData");
	cityData.removeItem(selectItemModel);
	self.changeCharacter(0);
};
CharacterDetailedView.prototype.removeEquipment=function(event){
	var icon = event.currentTarget;
	var self = icon.parent.parent;
	self.removeItemId = icon.removeItemId;
	var equipment = self.characterModel.equipments().find(function(child){
		return child.id() == self.removeItemId;
	});
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_remove_equipment_confirm"),equipment.name()),height:200,
		okEvent:self.removeEquipmentRun,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
CharacterDetailedView.prototype.removeEquipmentRun=function(event){
	var self = event.currentTarget.parent.parent;
	self.characterModel.equipOff(self.removeItemId);
	self.changeCharacter(0);
};
CharacterDetailedView.prototype.showStrategy=function(){
	var self = this;
	var strategyView = new StrategyView(self.controller, self.characterModel, new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 80),self);
	strategyView.x = 10;
	strategyView.y = 50;
	self.tabLayer.addChild(strategyView);
};
CharacterDetailedView.prototype.showArms=function(){
	var self = this;
	var soldiersView = new SoldiersView(self.controller, self.characterModel, new LPoint(LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 60));
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
	tabView.updateView();
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