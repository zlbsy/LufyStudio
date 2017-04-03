function CharacterDetailedTabEquipmentView(controller, w, h){
	var self = this;
	base(self,LView,[controller]);
	self.equipmentLayer = new LSprite();
	self.addChild(self.equipmentLayer);
	self.tabWidth = w;
	self.tabHeight = h;
}
CharacterDetailedTabEquipmentView.prototype.updateView=function(){
	var self = this;
	self.showEquipments();
	self.showEquipmentList();
};
CharacterDetailedTabEquipmentView.prototype.showEquipments=function(){
	var self = this;
	self.equipmentLayer.removeAllChild();
	var characterModel = self.controller.getValue("selectedCharacter");
	var detailedView = self.getParentByConstructor(CharacterDetailedView);
	var faceW = CharacterFaceSize.width + 20, faceH = CharacterFaceSize.height + 20;
	var icon,iconSize = 60;
	var equipmentCoordinates = [];
	equipmentCoordinates[PositionConfig.Head] = {x:(faceW - iconSize)*0.5,y:0};
	equipmentCoordinates[PositionConfig.Hand] = {x:0,y:(faceH - iconSize) * 0.5};
	equipmentCoordinates[PositionConfig.Body] = {x:(faceW - iconSize)*0.5,y:(faceH - iconSize) * 0.5};
	equipmentCoordinates[PositionConfig.Foot] = {x:(faceW - iconSize)*0.5,y:faceH - iconSize};
	equipmentCoordinates[PositionConfig.Accessories] = {x:faceW - iconSize,y:(faceH - iconSize) * 0.5};
	var equipments = characterModel.equipments();
	for(var i=0;i<PositionConfig.positions.length;i++){
		var position = PositionConfig.positions[i];
		var coordinate = equipmentCoordinates[position];
		var equipment = equipments.find(function(child){
			return child.position() == position;
		});
		if(equipment){
			icon = equipment.icon(new LPoint(iconSize,iconSize));
			icon.removeItemId = equipment.id();
			icon.addEventListener(LMouseEvent.MOUSE_UP,self.confirmEquipment);
		}else{
			icon = getPanel("win03",iconSize,iconSize);
		}
		icon.x = detailedView.faceView.x + coordinate.x - detailedView.tabLayer.x - self.x;
		icon.y = detailedView.faceView.y + coordinate.y - detailedView.tabLayer.y - self.y;
		self.equipmentLayer.addChild(icon);
	}
};
CharacterDetailedTabEquipmentView.prototype.showEquipmentList=function(){
	var self = this;
	var characterModel = self.controller.getValue("selectedCharacter");
	var equipmentsView = self.childList.find(function(child){
		return child instanceof EquipmentsView;
	});
	var cityData = self.controller.getValue("cityData");
	if(LMvc.BattleController || characterModel.seigniorId() != LMvc.selectSeignorId || cityData.seigniorCharaId() != LMvc.selectSeignorId){
		if(equipmentsView){
			equipmentsView.visible = false;
		}
		return;
	}
	if(equipmentsView){
		equipmentsView.addController(self.controller);
		equipmentsView.visible = true;
		equipmentsView.updateView();
		return;
	}
	equipmentsView = new EquipmentsView(self.controller, "equipment", new LPoint(self.tabWidth, self.tabHeight));
	self.addChild(equipmentsView);
	equipmentsView.addEventListener(EquipmentEvent.Dress,self.dressEquipment);
	equipmentsView.updateView();
};
CharacterDetailedTabEquipmentView.prototype.dressEquipment=function(event){
	var self = event.currentTarget.getParentByConstructor(CharacterDetailedTabEquipmentView);
	var selectItemModel = event.selectItemModel;
	
	var itemCount = selectItemModel.count();
	var characterModel = self.controller.getValue("selectedCharacter");
	characterModel.equip(selectItemModel);
	
	characterModel.calculation();
	var cityData = self.controller.getValue("cityData");
	cityData.removeItem(selectItemModel);
	var detailedView = self.getParentByConstructor(CharacterDetailedView);
	detailedView.changeCharacter(0);
	var characterListView = self.getParentByConstructor(CharacterListView);
	var e = new LEvent(CharacterListEvent.LIST_CHANGE);
	e.characterModel = characterModel;
	characterListView.dispatchEvent(e);
};
CharacterDetailedTabEquipmentView.prototype.confirmEquipment=function(event){
	var icon = event.currentTarget;
	var self = icon.getParentByConstructor(CharacterDetailedTabEquipmentView);
	var characterModel = self.controller.getValue("selectedCharacter");
	var removeItemId = icon.removeItemId;;
	var equipment = characterModel.equipments().find(function(child){
		return child.id() == removeItemId;
	});
	var canRemove = (!LMvc.BattleController && characterModel.city() &&  characterModel.city().seigniorCharaId() == LMvc.selectSeignorId);
	var msg = String.format(Language.get("dialog_remove_equipment_confirm"),equipment.name());
	if(!canRemove){
		msg = String.format("<font color='#FF0000'>{0}</font>",equipment.name());
	}
	var params = equipment.params();
	for(var i = 0;i < params.length;i++){
		var key = params[i];
		var format = "<font size='22' color='#FFFFFF'>{0} "+(canRemove ? "-" : "+")+"{1}</font>";
		msg += "\n" + String.format(format, Language.get(key), equipment.getParam(key));
	}
	var skill = equipment.skill();
	var height = 270;
	if(skill){
		msg += "\n<font size='22' color='#FFFFFF'>" 
		+ String.format(Language.get("skill_explanation"),skill.name(),skill.explanation(),skill.probability())
		+ "</font>";
		height += 100;
	}
	
	var obj = {title:Language.get("confirm"),messageHtml:msg,height:height};
		
	if(canRemove){
		obj.okEvent = self.removeEquipmentRun;
		obj.otherEvent = self.strengthenEquipmentRun;
		obj.cancelEvent = null;
		obj.width = 400;
		obj.okText = "remove_equip";
		obj.otherText = "strengthen";
		obj.cancelText = "cancel";
	}else{
		obj.okEvent = null;
	}
	var windowLayer = ConfirmWindow(obj);
	var detailedView = self.getParentByConstructor(CharacterDetailedView);
	detailedView.removeItemId = removeItemId;
	detailedView.addChild(windowLayer);
};
CharacterDetailedTabEquipmentView.prototype.removeEquipmentRun=function(event){
	var detailedView = event.currentTarget.getParentByConstructor(CharacterDetailedView);
	event.currentTarget.parent.remove();
	var characterModel = detailedView.controller.getValue("selectedCharacter");
	characterModel.equipOff(detailedView.removeItemId);
	characterModel.calculation();
	delete detailedView.removeItemId;
	detailedView.changeCharacter(0);
	var characterListView = detailedView.getParentByConstructor(CharacterListView);
	var e = new LEvent(CharacterListEvent.LIST_CHANGE);
	e.characterModel = characterModel;
	characterListView.dispatchEvent(e);
};
CharacterDetailedTabEquipmentView.prototype.strengthenEquipmentRun=function(event){
	var detailedView = event.currentTarget.getParentByConstructor(CharacterDetailedView);
	var removeItemId = detailedView.removeItemId;
	var characterModel = detailedView.controller.getValue("selectedCharacter");
	var equipment = characterModel.equipments().find(function(child){
		return child.id() == removeItemId;
	});
	event.currentTarget.parent.remove();
	var stoneView = new EquipmentsStoneView(self.controller, equipment);
	detailedView.parent.addChild(stoneView);
	detailedView.visible = false;
};
