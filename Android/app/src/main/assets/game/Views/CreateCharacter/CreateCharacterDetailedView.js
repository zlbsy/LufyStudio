function CreateCharacterDetailedView(controller, data){
	var self = this;
	base(self,LView,[controller]);
	self.data = data;
	self.init();
}
CreateCharacterDetailedView.TAB_BASIC = "basic_properties";
CreateCharacterDetailedView.TAB_ABILITY = "ability_properties";
CreateCharacterDetailedView.TAB_ARMS = "tab_arms";
CreateCharacterDetailedView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.faceInit();
	self.TabShow(CreateCharacterDetailedView.TAB_ARMS);
	self.TabShow(CreateCharacterDetailedView.TAB_ABILITY);
	self.TabShow(CreateCharacterDetailedView.TAB_BASIC);
};
CreateCharacterDetailedView.prototype.TabClick=function(event){
	var self = this;
	self.TabShow(event.currentTarget.tabName);
};
CreateCharacterDetailedView.prototype.TabShow=function(tab){
	var self = this, tabIcon, layer;
	self.tabLayer.removeAllChild();
	self.nowTab = tab;
	var tabs = [CreateCharacterDetailedView.TAB_BASIC,CreateCharacterDetailedView.TAB_ABILITY,CreateCharacterDetailedView.TAB_ARMS];
	for(var i=0,l=tabs.length;i<l;i++){
		tabIcon = new LSprite();
		if(tabs[i] == tab){
			layer = new LPanel(new LBitmapData(LMvc.datalist["win08"],0,0,51,34),160,50);
			tabIcon.y = -10;
		}else{
			layer = new LPanel(new LBitmapData(LMvc.datalist["win08"],0,0,51,34),160,40);
			tabIcon.tabName = tabs[i];
			tabIcon.addEventListener(LMouseEvent.MOUSE_UP,self.TabClick.bind(self));
		}
		var label = getStrokeLabel(Language.get(tabs[i]),22,"#FFFFFF","#000000",2);
		label.x = (160 - label.getWidth()) * 0.5;
		label.y = 10;
		layer.addChild(label);
		layer.cacheAsBitmap(true);
		tabIcon.addChild(layer);
		tabIcon.x = 160 * i;
		self.tabLayer.addChild(tabIcon);
	}
	
	self.hideTabs();
	switch(tab){
		case CreateCharacterDetailedView.TAB_BASIC:
			self.showBasic();
			break;
		case CreateCharacterDetailedView.TAB_ABILITY:
			self.showAbility();
			break;
		case CreateCharacterDetailedView.TAB_ARMS:
			self.showArms();
			break;
	}
};
CreateCharacterDetailedView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	self.tabLayer = new LSprite();
	self.baseLayer.addChild(self.tabLayer);
	self.contentLayer = new LSprite();
	self.contentLayer.y = 40;
	self.baseLayer.addChild(self.contentLayer);
	self.basicLayer = new LSprite();
	self.contentLayer.addChild(self.basicLayer);
	self.abilityLayer = new LSprite();
	self.contentLayer.addChild(self.abilityLayer);
	self.armLayer = new LSprite();
	self.contentLayer.addChild(self.armLayer);
};
CreateCharacterDetailedView.prototype.showBasic=function(){
	var self = this;
	self.basicLayer.visible = true;
	if(self.basicView){
		return;
	}
	self.basicView = new CreateCharacterBasicView(null, self.data);
	self.basicLayer.addChild(self.basicView);
};
CreateCharacterDetailedView.prototype.showAbility=function(){
	var self = this;
	self.abilityLayer.visible = true;
	if(self.abilityView){
		return;
	}
	self.abilityView = new CreateCharacterAbilityView(null, self.data);
	self.abilityLayer.addChild(self.abilityView);
};
CreateCharacterDetailedView.prototype.showArms=function(){
	var self = this;
	self.armLayer.visible = true;
	if(self.armView){
		self.armView.resetSoliderImage();
		return;
	}
	self.armView = new CreateCharacterArmView(null);
	self.armLayer.addChild(self.armView);
	self.armView.init(self.data);
	self.armView.resetSoliderImage();
};
CreateCharacterDetailedView.prototype.hideTabs=function(){
	var self = this;
	self.basicLayer.visible = false;
	self.abilityLayer.visible = false;
	self.armLayer.visible = false;
};
CreateCharacterDetailedView.prototype.faceInit=function(){
	var self = this;
	self.faceLayer = new CreateCharacterFaceView(null, self.data);
	self.contentLayer.addChild(self.faceLayer);
};
CreateCharacterDetailedView.prototype.getData=function(){
	var self = this;
	var name = self.basicView.nameTextField.text;
	if(!name || LString.trim(name).length == 0){
		var obj = {title:Language.get("confirm"),message:Language.get("create_character_name_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return null;
	}
	var data = {groupSkill:0};
	if(self.data){
		data.id = self.data.id;
	}else{
		var characters = LPlugin.characters();
		data.id = characters.list.length == 0 ? 1000 : characters.list[characters.list.length - 1].id + 1;
	}
	data.name = name;
	data.faceImg = self.faceLayer.faceIndex;
	data.gender = self.faceLayer.genderRadio.value;
	if(!self.abilityView){
		var obj = {title:Language.get("confirm"),message:Language.get("create_character_ability_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return null;
	}
	data.statusPoint = self.abilityView.point;
	var items = self.abilityView.listView.getItems();
	for(var i=0, l=items.length;i<l;i++){
		var child = items[i];
		data[child.name] = child.textField.text;
	}
	data.skill = self.abilityView.skillComboBox.value;
	if(!self.armView){
		var obj = {title:Language.get("confirm"),message:Language.get("create_character_arm_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return null;
	}
	data.proficiencyPoint = self.armView.point;
	var soldiers = [];
	var items = self.armView.listView.getItems();
	for(var i=0, l=items.length;i<l;i++){
		var child = items[i];
		var soldierData = {id:child.soldier.id(),proficiency:child.textField.text};
		if(data.gender == 2 && child.soldier.data.img){
			soldierData.img = child.soldier.data.img;
		}
		soldiers.push(soldierData);
	}
	data.soldiers = soldiers;
	
	var items = self.basicView.listView.getItems();
	for(var i=0, l=items.length;i<l;i++){
		var child = items[i];
		data[child.name] = child.comboBox.value;
	}
	return data;
};