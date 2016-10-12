function CharacterListChildView(controller, param, cityModel, parentView) {
	var self = this;
	base(self, LListChildView, []);
	self.init(controller, param, cityModel, parentView);
}
CharacterListChildView._list = [];
CharacterListChildView._listCount = 0;
CharacterListChildView.createChild = function(controller, param, cityModel, parentView){
	if(CharacterListChildView._list.length > 0){
		var child = CharacterListChildView._list.shift();
		child.init(controller, param, cityModel, parentView);
		return child;
	}
	return new CharacterListChildView(controller, param, cityModel, parentView);
};
CharacterListChildView.prototype.removeAllChild = function() {};
CharacterListChildView.prototype.die = function() {
	var self = this;
	var has = false;
	for(var i=0, l=CharacterListChildView._list.length;i<l;i++){
		var child = CharacterListChildView._list[i];
		if(child.objectIndex == self.objectIndex){
			has = true;
			break;
		}
	}
	if(!has){
		self.character = null;
		self.cityModel = null;
		self.parentView = null;
		self.controller = null;
		self.charaModel = null;
		self.cacheAsBitmap(false);
		if(self.checkbox){
			self.checkbox.setChecked(false);
		}
		CharacterListChildView._list.push(self);
	}
	//self.callParent("die", arguments);
}; 
CharacterListChildView.prototype.init = function(controller, param, cityModel, parentView) {
	var self = this;
	self.cityModel = cityModel;
	self.parentView = parentView;
	self.controller = controller;
	if(param.constructor.name == "CharacterModel"){
		self.set(param);
	}else if(param.constructor.name == "BattleCharacterView"){
		self.character = param;
		self.set(param.data);
	}
}; 
CharacterListChildView.prototype.set = function(charaModel) {
	var self = this;
	self.charaModel = charaModel;
	//self.removeAllChild();
	self.setCheckBox();
	self.setStatus();
};
CharacterListChildView.prototype.setCheckBox = function() {
	var self = this;
	if(self.controller.params.showOnly) {
		if(self.checkbox){
			self.checkbox.visible = false;
		}
		return;
	}
	if(self.checkbox){
		self.checkbox.visible = true;
		return;
	}
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
	var bitmapSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
	var check = new LCheckBox(bitmap, bitmapSelect);
	check.x = 10;
	check.y = 10;
	self.addChild(check);
	self.checkbox = check;
};
CharacterListChildView.prototype.onClick = function(event) {
	var self = event.target;
	var listView = event.currentTarget;
	if(self.checkbox && event.offsetX < 100){
		if(self.controller.params.isOnlyOne){
			var items = listView.getItems();
			for(var i=0,l=items.length;i<l;i++){
				var item = items[i];
				if(!item.checkbox.checked){
					continue;
				}
				item.checkbox.setChecked(false);
				item.cacheAsBitmap(false);
				item.updateView();
			}
		}
		self.checkbox.setChecked(!self.checkbox.checked);
		self.cacheAsBitmap(false);
		self.updateView();
		self.parentView.dispatchEvent(LCheckBox.ON_CHANGE);
		return;
	}
	if(self.controller.params.noDetailed){
		return;
	}
	if(self.controller.params.cutoverName == "arm_properties" && self.armProperties.visible){
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
CharacterListChildView.prototype.updateArmProperties = function(event) {
	var self = this;
	var windowLayer = self.controller.view.getChildByName("ConfirmWindow");
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
	if(!self.nameLabel){
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
		layer.x = 20;
		layer.y = 10;
		self.addChild(layer);
		self.nameLabel = name;
	}
	self.nameLabel.size = 20;
	self.nameLabel.y = 5;
	self.nameLabel.lineWidth = 4;
	self.nameLabel.setWordWrap(false);
	self.nameLabel.text = self.charaModel.name();
	self.nameLabel.color = "#FFFFFF";
	self.nameLabel.lineColor = "#000000";
	if(self.controller.params.checkCity && self.controller.params.checkCity != self.charaModel.cityId()){
		self.nameLabel.color = "#000000";
		self.nameLabel.lineColor = "#FFFFFF";
	}
	if(self.charaModel.isEmploy()){
		self.nameLabel.size = 17;
		self.nameLabel.y = -4;
		self.nameLabel.lineWidth = 3;
		self.nameLabel.setWordWrap(true, 20);
		self.nameLabel.text += "\n$" + self.charaModel.employPrice();
	}
	self.setBasicProperties();
	self.basicProperties.visible = false;
	self.setAbilityProperties();
	self.abilityProperties.visible = false;
	if(self.armProperties){
		self.armProperties.visible = false;
	}
	if(self.controller.params.showArm){
		self.setArmProperties();
		self.armProperties.visible = true;
		if(self.charaModel.troops() > 0){
			self.checkbox.setChecked(true);
			self.parentView.dispatchEvent(LCheckBox.ON_CHANGE);
		}
	}else if(self.controller.params.showAbility){
		self.abilityProperties.visible = true;
	}else{
		self.basicProperties.visible = true;
	}
}; 
CharacterListChildView.prototype.setArmProperties = function() {
	var self = this;
	var soldierModel = self.charaModel.currentSoldiers();
	if(self.armProperties){
		self.troops.text = String.format("{0}/{1}",self.charaModel.troops(),soldierModel.maxTroops(self.charaModel));
		self.soldierName.text = soldierModel.name();
		var panel = self.soldierName.parent;
		self.soldierName.x = (panel.getWidth() - self.soldierName.getWidth())*0.5;
		return;
	}
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LMvc.screenWidth - 200, 50]);
	
	var cityName = getStrokeLabel(self.charaModel.city().name(), 18, "#FFFFFF", "#000000", 4);
	cityName.x = 2;
	cityName.y = 10;
	layer.addChild(cityName);
	
	var troops = getStrokeLabel( String.format("{0}/{1}",self.charaModel.troops(),soldierModel.maxTroops(self.charaModel)), 18, "#FFFFFF", "#000000", 4);
	troops.x = 80;
	troops.y = 10;
	layer.addChild(troops);
	self.troops = troops;
	
	var panel = getPanel("win01",100,40);
	panel.x = 180;
	panel.y = 0;
	layer.addChild(panel);
	var soldierName = getStrokeLabel(soldierModel.name(), 18, "#FFFFFF", "#000000", 4);
	soldierName.x = (panel.getWidth() - soldierName.getWidth())*0.5;
	soldierName.y = (panel.getHeight() - soldierName.getHeight())*0.5;;
	self.soldierName = soldierName;
	panel.addChild(soldierName);
	layer.x = 180;
	layer.y = 5;
	self.addChild(layer);
	self.armProperties = layer;
};
CharacterListChildView.prototype.setBasicProperties = function() {
	var self = this;
	var seigniorId = self.charaModel.seigniorId();
	if(self.basicProperties){
		self.seigniorName.text = self.charaModel.seigniorName();
		self.identity.text = self.charaModel.identity();
		self.cityNameLabel.text = !self.charaModel.city() ? "" : self.charaModel.city().name();
		self.loyalty.text = seigniorId>0 ? self.charaModel.loyalty() : "--";
		self.jobLabel.text = self.charaModel.jobLabel();
		return;
	}
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LMvc.screenWidth - 200, 50]);

	var seigniorName = getStrokeLabel( self.charaModel.seigniorName(), 18, "#FFFFFF", "#000000", 4);
	seigniorName.x = 2;
	seigniorName.y = 5;
	layer.addChild(seigniorName);
	self.seigniorName = seigniorName;
	
	var identity = getStrokeLabel(self.charaModel.identity(), 18, "#FFFFFF", "#000000", 4);
	identity.x = 60 + 2;
	identity.y = 5;
	layer.addChild(identity);
	self.identity = identity;
	var cityNameLabel = getStrokeLabel(!self.charaModel.city() ? "" : self.charaModel.city().name(), 18, "#FFFFFF", "#000000", 4);
	cityNameLabel.x = 60 * 2 + 2;
	cityNameLabel.y = 5;
	layer.addChild(cityNameLabel);
	self.cityNameLabel = cityNameLabel;
	var loyalty = getStrokeLabel( seigniorId>0 ? self.charaModel.loyalty() : "--", 18, "#FFFFFF", "#000000", 4);
	loyalty.x = 60 * 3 + 2;
	loyalty.y = 5;
	layer.addChild(loyalty);
	self.loyalty = loyalty;

	var jobLabel = getStrokeLabel(self.charaModel.jobLabel(), 18, "#FFFFFF", "#000000", 4);
	jobLabel.x = 60 * 4;
	jobLabel.y = 5;
	layer.addChild(jobLabel);
	self.jobLabel = jobLabel;
	layer.x = 180;
	layer.y = 10;
	self.addChild(layer);
	self.basicProperties = layer;
}; 
CharacterListChildView.prototype.setAbilityProperties = function() {
	var self = this;
	if(self.abilityProperties){
		self.command.text = self.charaModel.command();
		self.force.text = self.charaModel.force();
		self.intelligence.text = self.charaModel.intelligence();
		self.agility.text = self.charaModel.agility();
		self.luck.text = self.charaModel.luck();
		return;
	}
	var layer = new LSprite();
	layer.graphics.drawRect(0, "#ff0000", [0, 0, LMvc.screenWidth - 200, 50]);
	var command = getStrokeLabel(self.charaModel.command(), 18, "#FFFFFF", "#000000", 4);
	command.x = 5;
	command.y = 5;
	layer.addChild(command);
	self.command = command;
	var force = getStrokeLabel(self.charaModel.force(), 18, "#FFFFFF", "#000000", 4);
	force.x = 60 + 5;
	force.y = 5;
	layer.addChild(force);
	self.force = force;
	var intelligence = getStrokeLabel(self.charaModel.intelligence(), 18, "#FFFFFF", "#000000", 4);
	intelligence.x = 60 * 2 + 5;
	intelligence.y = 5;
	layer.addChild(intelligence);
	self.intelligence = intelligence;
	var agility = getStrokeLabel(self.charaModel.agility(), 18, "#FFFFFF", "#000000", 4);
	agility.x = 60 * 3 + 5;
	agility.y = 5;
	layer.addChild(agility);
	self.agility = agility;
	var luck = getStrokeLabel(self.charaModel.luck(), 18, "#FFFFFF", "#000000", 4);
	luck.x = 60 * 4 + 5;
	luck.y = 5;
	layer.addChild(luck);
	self.luck = luck;
	layer.x = 180;
	layer.y = 10;
	self.addChild(layer);
	self.abilityProperties = layer;
	self.abilityProperties.visible = false;
}; 