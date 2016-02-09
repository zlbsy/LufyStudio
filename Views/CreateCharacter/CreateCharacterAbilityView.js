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