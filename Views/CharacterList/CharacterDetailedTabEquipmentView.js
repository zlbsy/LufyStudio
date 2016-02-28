function CharacterDetailedTabEquipmentView(controller, w, h){
	var self = this;
	base(self,LView,[controller]);
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
	self.removeAllChild();
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
			if(!LMvc.BattleController && characterModel.seigniorId() == LMvc.selectSeignorId){
				icon.addEventListener(LMouseEvent.MOUSE_UP,self.removeEquipment);
			}
		}else{
			icon = new LPanel(new LBitmapData(LMvc.datalist["win03"]),iconSize,iconSize);
		}
		icon.x = detailedView.faceView.x + coordinate.x - detailedView.tabLayer.x - self.x;
		icon.y = detailedView.faceView.y + coordinate.y - detailedView.tabLayer.y - self.y;
		self.addChild(icon);
	}
};
CharacterDetailedTabEquipmentView.prototype.showEquipmentList=function(){
	var self = this;
	var equipmentsView = new EquipmentsView(self.controller, "equipment", new LPoint(self.tabWidth, self.tabHeight));
	self.addChild(equipmentsView);
	equipmentsView.addEventListener(EquipmentEvent.Dress,self.dressEquipment);
};
CharacterDetailedTabEquipmentView.prototype.dressEquipment=function(event){
	var self = event.currentTarget.getParentByConstructor(CharacterDetailedTabEquipmentView);
	var selectItemModel = event.selectItemModel;
	var itemCount = selectItemModel.count();
	var characterModel = self.controller.getValue("selectedCharacter");
	characterModel.equip(selectItemModel);
	
	var cityData = LMvc.CityController.getValue("cityData");
	cityData.removeItem(selectItemModel);
	
	var detailedView = self.getParentByConstructor(CharacterDetailedView);
	detailedView.changeCharacter(0);
};
CharacterDetailedTabEquipmentView.prototype.removeEquipment=function(event){
	var icon = event.currentTarget;
	var self = icon.getParentByConstructor(CharacterDetailedTabEquipmentView);
	var characterModel = self.controller.getValue("selectedCharacter");
	var removeItemId = icon.removeItemId;;
	var equipment = characterModel.equipments().find(function(child){
		return child.id() == removeItemId;
	});
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_remove_equipment_confirm"),equipment.name()),height:200,
		okEvent:self.removeEquipmentRun,cancelEvent:null};
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
	delete detailedView.removeItemId;
	detailedView.changeCharacter(0);
};
