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
	if(!LMvc.BattleController){
		self.showEquipmentList();
	}
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
			//icon = new LPanel(new LBitmapData(LMvc.datalist["win03"]),iconSize,iconSize);
		}
		icon.x = detailedView.faceView.x + coordinate.x - detailedView.tabLayer.x - self.x;
		icon.y = detailedView.faceView.y + coordinate.y - detailedView.tabLayer.y - self.y;
		self.equipmentLayer.addChild(icon);
	}
};
CharacterDetailedTabEquipmentView.prototype.showEquipmentList=function(){
	var self = this;
	var characterModel = self.controller.getValue("selectedCharacter");
	if(characterModel.seigniorId() != LMvc.selectSeignorId){
		return;
	}
	var equipmentsView = self.childList.find(function(child){
		return child instanceof EquipmentsView;
	});
	if(equipmentsView){
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
	var cityData = LMvc.CityController.getValue("cityData");
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
	var canRemove = (!LMvc.BattleController && characterModel.seigniorId() == LMvc.selectSeignorId);
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
	
	var obj = {title:Language.get("confirm"),messageHtml:msg,height:270};
		
	if(canRemove){
		obj.okEvent = self.removeEquipmentRun;
		obj.cancelEvent = null;
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
