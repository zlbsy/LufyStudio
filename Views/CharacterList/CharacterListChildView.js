function CharacterListChildView(controller, param, cityModel, parentView) {
	var self = this;
	base(self, LListChildView, []);
	self.cityModel = cityModel;
	self.parentView = parentView;
	self.controller = controller;
	if(param.constructor.name == "CharacterModel"){
		self.set(param);
	}else if(param.constructor.name == "BattleCharacterView"){
		self.character = param;
		self.set(param.data);
	}
}

CharacterListChildView.prototype.set = function(charaModel) {
	var self = this;
	self.charaModel = charaModel;
	self.removeAllChild();
	self.setCheckBox();
	self.setStatus();
};
CharacterListChildView.prototype.toDelete = function(charaModel) {
	var self = this;
	//var mask = getTranslucentBitmap(420, 50);
	self.alpha = 0.4;
};
CharacterListChildView.prototype.setCheckBox = function() {
	var self = this;
	switch(self.controller.characterListType) {
		case CharacterListType.CHARACTER_LIST:
		case CharacterListType.BATTLE_CHARACTER_LIST:
			break;
		default:
			var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
			var bitmapSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
			var check = new LCheckBox(bitmap, bitmapSelect);
			check.x = 10;
			check.y = 10;
			self.addChild(check);
			self.checkbox = check;
			break;
	}
};
CharacterListChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	if(self.alpha < 1){
		return;
	}
	if(self.checkbox && event.offsetX < 70){
		self.checkbox.setChecked(!self.checkbox.checked);
		self.cacheAsBitmap(false);
		self.updateView();
		self.parentView.dispatchEvent(LCheckBox.ON_CHANGE);
		return;
	}
	if(self.controller.characterListType == CharacterListType.EXPEDITION && self.armProperties.visible){
		if(event.offsetX > 350){
			var characterExpedition = new CharacterExpeditionView(self.controller, self.charaModel);
			var obj = {title:Language.get("distribute"),subWindow:characterExpedition,width:400,height:320,okEvent:self.updateArmProperties.bind(self),cancelEvent:null};//分配
			var windowLayer = ConfirmWindow(obj);
			self.controller.view.addChild(windowLayer);
			return;
		}
	}
	self.parentView.showCharacterDetailed(self.character?self.character:self.charaModel);
};
/*CharacterListChildView.prototype.hitTestPoint = function(offsetX,offsetY) {
	var self = this;return;
	if(self.alpha < 1){
		return false;
	}
	if(self.controller.characterListType == CharacterListType.EXPEDITION && self.armProperties.visible){
		if(offsetX > 370){
			var characterExpedition = new CharacterExpeditionView(self.controller, self.charaModel);
			var obj = {title:Language.get("distribute"),subWindow:characterExpedition,width:400,height:320,okEvent:self.updateArmProperties.bind(self),cancelEvent:null};//分配
			var windowLayer = ConfirmWindow(obj);
			self.controller.view.addChild(windowLayer);
			return false;
		}
	}
	var hit = self.callParent("hitTestPoint",arguments);
	if(self.checkbox){
		return hit && !self.checkbox.hitTestPoint(offsetX,offsetY);
	}
	return hit;
};*/
CharacterListChildView.prototype.updateArmProperties = function(event) {
	var self = this;
	var windowLayer = event.currentTarget.parent;
	var characterExpedition = windowLayer.childList.find(function(child){
		return child.constructor.name == "CharacterExpeditionView";
	});
	characterExpedition.apply();
	self.setArmProperties();
	windowLayer.remove();
	self.cacheAsBitmap(false);
	self.updateView();
};
CharacterListChildView.prototype.cutover = function(value, isInClipping) {
	var self = this;
	self.basicProperties.visible = false;
	self.abilityProperties.visible = false;
	if(self.armProperties){
		self.armProperties.visible = false;
	}
	if (value == CharacterListView.CUTOVER_ARM) {
		self.armProperties.visible = true;
	} else if (value == CharacterListView.CUTOVER_BASIC) {
		self.basicProperties.visible = true;
	} else if (value == CharacterListView.CUTOVER_ABILITY) {
		self.abilityProperties.visible = true;
	}
	self.cacheAsBitmap(false);
	if(!isInClipping){
		return;
	}
	self.updateView();
};
CharacterListChildView.prototype.setStatus = function() {
	var self = this;
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, 420, 40]);
	var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
	bitmapLine.scaleX = 420;
	bitmapLine.y = 38;
	layer.addChild(bitmapLine);
	var name = getStrokeLabel(self.charaModel.name(), 20, "#FFFFFF", "#000000", 4);
	name.x = 50;
	name.y = 5;
	layer.addChild(name);
	var bitmapName = getBitmap(layer);
	bitmapName.x = 20;
	bitmapName.y = 10;
	self.addChild(bitmapName);
	self.setBasicProperties();
	self.setAbilityProperties();
	if(self.controller.characterListType == CharacterListType.EXPEDITION){
		self.setArmProperties();
		self.basicProperties.visible = false;
		self.abilityProperties.visible = false;
		self.armProperties.visible = true;
	}
}; 
CharacterListChildView.prototype.setArmProperties = function() {
	var self = this;
	if(self.armProperties){
		self.armProperties.remove();
	}
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LGlobal.width - 200, 50]);
	//var soldiers = self.charaModel.soldiers();
	var soldierModel = self.charaModel.currentSoldiers();
	
	var name = getStrokeLabel( String.format("{0}/{1}",self.charaModel.troops(),self.charaModel.maxTroops()), 18, "#FFFFFF", "#000000", 4);
	name.x = 2;
	name.y = 10;
	layer.addChild(name);
	var name = getStrokeLabel(soldierModel.name(), 18, "#FFFFFF", "#000000", 4);
	name.x = 120;
	name.y = 10;
	layer.addChild(name);
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win01"]),80,40);
	panel.x = 200;
	panel.y = 0;
	layer.addChild(panel);
	var name = getStrokeLabel(Language.get("distribute"), 18, "#FFFFFF", "#000000", 4);
	name.x = (panel.getWidth() - name.getWidth())*0.5;
	name.y = (panel.getHeight() - name.getHeight())*0.5;;
	panel.addChild(name);
	var armPropertiesBitmap = getBitmap(layer);
	armPropertiesBitmap.x = 180;
	armPropertiesBitmap.y = 5;
	self.addChild(armPropertiesBitmap);
	self.armProperties = armPropertiesBitmap;
};
CharacterListChildView.prototype.setBasicProperties = function() {
	var self = this;
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LGlobal.width - 200, 50]);

	var seigniorId = self.charaModel.seigniorId();
	var name = getStrokeLabel( seigniorId>0 ? CharacterModel.getChara(seigniorId).name() : Language.get("nothing"), 18, "#FFFFFF", "#000000", 4);
	name.x = 2;
	name.y = 5;
	layer.addChild(name);
	
	var name = getStrokeLabel(self.charaModel.identity(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 + 2;
	name.y = 5;
	layer.addChild(name);
	if(self.cityModel){
		var name = getStrokeLabel(self.character?self.charaModel.city().name():self.cityModel.name(), 18, "#FFFFFF", "#000000", 4);
		name.x = 60 * 2 + 2;
		name.y = 5;
		layer.addChild(name);
	}
	var name = getStrokeLabel( seigniorId>0 ? self.charaModel.loyalty() : "--", 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 3 + 2;
	name.y = 5;
	layer.addChild(name);

	var name = getStrokeLabel(self.charaModel.jobLabel(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 4;
	name.y = 5;
	layer.addChild(name);

	var basicPropertiesBitmap = getBitmap(layer);
	basicPropertiesBitmap.x = 180;
	basicPropertiesBitmap.y = 10;
	self.addChild(basicPropertiesBitmap);
	self.basicProperties = basicPropertiesBitmap;
}; 
CharacterListChildView.prototype.setAbilityProperties = function() {
	var self = this;
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LGlobal.width - 200, 50]);
	var name = getStrokeLabel(self.charaModel.command(), 18, "#FFFFFF", "#000000", 4);
	name.x = 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.charaModel.force(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.charaModel.intelligence(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 2 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.charaModel.agility(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 3 + 5;
	name.y = 5;
	layer.addChild(name);
	var name = getStrokeLabel(self.charaModel.luck(), 18, "#FFFFFF", "#000000", 4);
	name.x = 60 * 4 + 5;
	name.y = 5;
	layer.addChild(name);

	var abilityPropertiesBitmap = getBitmap(layer);
	abilityPropertiesBitmap.x = 180;
	abilityPropertiesBitmap.y = 10;
	self.addChild(abilityPropertiesBitmap);
	self.abilityProperties = abilityPropertiesBitmap;
	self.abilityProperties.visible = false;
}; 