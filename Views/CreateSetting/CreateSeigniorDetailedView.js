function CreateSeigniorDetailedView(controller, data){
	var self = this;
	base(self,LView,[controller]);
	self.data = data;
	self.init();
}
CreateSeigniorDetailedView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.titleInit();
	self.faceInit();
};
CreateSeigniorDetailedView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height));
	self.baseLayer.addChild(panel);
	self.titleLayer = new LSprite();
	self.baseLayer.addChild(self.titleLayer);
	self.contentLayer = new LSprite();
	self.contentLayer.y = 50;
	self.baseLayer.addChild(self.contentLayer);
	
	var closeButton = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closeButton.x = LGlobal.width - closeButton.getWidth();
	self.baseLayer.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, self.closeSelf);
	
	self.selectSeigniorLayer = new LSprite();
	self.addChild(self.selectSeigniorLayer);
};
CreateSeigniorDetailedView.prototype.closeSelf=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
	self.parent.baseLayer.visible = true;
	self.remove();
};
CreateSeigniorDetailedView.prototype.titleInit=function(data){
	var self = this, label;
	label = getStrokeLabel(Language.get(data ? "update_seignior" : "create_seignior"),24,"#CDD4AF","#000000",4);
	label.x = 15;
	label.y = 15;
	self.titleLayer.addChild(label);
	self.titleLayer.cacheAsBitmap(true);
};
CreateSeigniorDetailedView.prototype.faceInit=function(){
	var self = this;
	self.faceLayer = new CreateSeigniorFaceView(null, self.data);
	self.contentLayer.addChild(self.faceLayer);
};
CreateSeigniorDetailedView.prototype.toSelectSeignior=function(){
	var self = this;
	console.log("CreateSeigniorDetailedView.prototype.toSelectSeignior");
	self.selectSeigniorView = new SelectSeigniorListView(null, "change_monarch");
	self.selectSeigniorLayer.addChild(self.selectSeigniorView);
	self.baseLayer.visible = false;
};
CreateSeigniorDetailedView.prototype.getData=function(){
	var self = this;
	var name = self.basicView.nameTextField.text;
	if(!name || LString.trim(name).length == 0){
		var obj = {title:Language.get("confirm"),message:Language.get("create_character_name_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return null;
	}
	/*{id:1,color:"0,0,255",citys:[{id:39,generals:[1,2]}]}*/
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
		soldiers.push({id:child.soldier.id(),proficiency:child.textField.text});
	}
	data.soldiers = soldiers;
	
	var items = self.basicView.listView.getItems();
	for(var i=0, l=items.length;i<l;i++){
		var child = items[i];
		data[child.name] = child.comboBox.value;
	}
	console.error(data);
	return data;
};