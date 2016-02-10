function CreateCharacterAbilityView(controller,data){
	base(this,LView,[controller]);
	this.init(data);
}
CreateCharacterAbilityView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.baseLayer.x = 190;
	self.addChild(self.baseLayer);
};
CreateCharacterAbilityView.prototype.init=function(data){
	var self = this;
	self.layerInit();
	self.abilityInit(data);
	self.skillInit(data);
};
CreateCharacterAbilityView.prototype.updatePoint=function(value){
	var self = this;
	self.point += value;
	self.statusPoint.text = String.format(Language.get("distribute_point"),self.point);
};
CreateCharacterAbilityView.prototype.onRefreshStatus=function(event){
	var self = event.currentTarget.parent.parent;
	var data = self.refreshStatus();
	var items = self.listView.getItems();
	for(var i=0, l=items.length;i<l;i++){
		var child = items[i];
		child.setStatus(data[child.name]);
	}
	self.statusPoint.text = String.format(Language.get("distribute_point"),self.point);
};
CreateCharacterAbilityView.prototype.refreshStatus=function(){
	var self = this;
	var chara = CharacterModel.list[CharacterModel.list.length * Math.random() >>> 0];
	self.point = 0;
	var data = {force:0,intelligence:0,command:0,agility:0,luck:0};
	for(var key in data){
		if(chara.data[key] > 5){
			data[key] = chara.data[key] - 5;
			self.point += 5;
		}else{
			data[key] = chara.data[key];
		}
	}
	return data;
};
CreateCharacterAbilityView.prototype.abilityInit=function(data){
	var self = this;
	if(!data){
		data = self.refreshStatus();
	}else{
		self.point = data.statusPoint;
	}
	
	self.statusPoint = getStrokeLabel(String.format(Language.get("distribute_point"),self.point),20,"#FFFFFF","#000000",3);
	self.statusPoint.x = 10;
	self.statusPoint.y = 12;
	self.baseLayer.addChild(self.statusPoint);
	var refreshButton = getSizeButton(Language.get("refresh"),80,40);
	refreshButton.x = 180;
	refreshButton.y = 5;
	self.baseLayer.addChild(refreshButton);
	refreshButton.addEventListener(LMouseEvent.MOUSE_UP, self.onRefreshStatus);
	self.listView = new LListView();
	self.listView.dragEffect = LListView.DragEffects.None;
	self.listView.x = 10;
	self.listView.y = 55;
	self.listView.cellWidth = 200;
	self.listView.cellHeight = 45;
	self.baseLayer.addChild(self.listView);
	var items = [], child;
	child = new CreateCharacterAbilityItemView(self.listView, "force", data.force);
	items.push(child);
	child = new CreateCharacterAbilityItemView(self.listView, "intelligence", data.intelligence);
	items.push(child);
	child = new CreateCharacterAbilityItemView(self.listView, "command", data.command);
	items.push(child);
	child = new CreateCharacterAbilityItemView(self.listView, "agility", data.agility);
	items.push(child);
	child = new CreateCharacterAbilityItemView(self.listView, "luck", data.luck);
	items.push(child);
	self.listView.resize(200, 45 * items.length);
	self.listView.updateList(items);
};
CreateCharacterAbilityView.prototype.skillInit=function(data){
	var self = this;
	
	var label = getStrokeLabel(Language.get("stunt") + ": ",20,"#FFFFFF","#000000",3);
	label.x = 10;
	label.y = 282;
	self.baseLayer.addChild(label);
	
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win01"]),170,40);
	panel.cacheAsBitmap(true);
	var bitmapOn = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var com = new LComboBox(18,"#ffffff","Arial",panel,bitmapOff,bitmapOn);
	com.setListChildView(CreateCharacterSkillComboBoxChild);
	com.label.x = 10;
	com.label.y = 9;
	com.label.lineColor = "#000000";
	com.label.stroke = true;
	com.label.lineWidth = 3;
	com.setChild({label:Language.get("null"),value:0});
	for(var i=0,l=SkillMasterModel.master.length;i<l;i++){
		var skill = SkillMasterModel.master[i];
		com.setChild({label:skill.name(),value:skill.id()});
	}
	com.maxIndex = 4;
	self.skillComboBox = com;
	com.x = 60;
	com.y = 277;
	self.baseLayer.addChild(com);
	com.addEventListener(LComboBox.ON_CHANGE, self.onSkillChange);
	
	var skillTextField = getStrokeLabel("",12,"#FFFFFF","#000000",1);
	skillTextField.width = 260;
	skillTextField.setWordWrap(true, 22);
	skillTextField.x = 10;
	skillTextField.y = 322;
	self.baseLayer.addChild(skillTextField);
	self.skillTextField = skillTextField;
	
	if(data && data.skill > 0){
		com.setValue(data.skill);
		skillTextField.text = SkillMasterModel.getMaster(data.skill).explanation();
	}
};
CreateCharacterAbilityView.prototype.onSkillChange=function(event){
	var com = event.currentTarget;
	var self = com.parent.parent;
	if(com.value == 0){
		self.skillTextField.text = "";
		return;
	}
	self.skillTextField.text = SkillMasterModel.getMaster(com.value).explanation();
};
