function CreateCharacterAbilityView(controller){
	base(this,LView,[controller]);
	this.init();
}
CreateCharacterAbilityView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.baseLayer.x = 190;
	self.addChild(self.baseLayer);
};
CreateCharacterAbilityView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.abilityInit();
};
CreateCharacterAbilityView.prototype.updatePoint=function(value){
	var self = this;
	self.point += value;
	self.statusPoint.text = String.format("可分配点数: {0}",self.point);
};
CreateCharacterAbilityView.prototype.abilityInit=function(){
	var self = this;
	self.point = 20;
	
	self.statusPoint = getStrokeLabel(String.format("可分配点数: {0}",self.point),20,"#FFFFFF","#000000",3);
	self.statusPoint.x = 10;
	self.statusPoint.y = 12;
	self.baseLayer.addChild(self.statusPoint);
	var updateButton = getSizeButton("刷新",80,40);
	updateButton.x = 180;
	updateButton.y = 5;
	self.baseLayer.addChild(updateButton);
	self.listView = new LListView();
	self.listView.dragEffect = LListView.DragEffects.None;
	self.listView.x = 10;
	self.listView.y = 55;
	self.listView.cellWidth = 200;
	self.listView.cellHeight = 45;
	self.baseLayer.addChild(self.listView);
	var items = [], child;
	child = new CreateCharacterAbilityItemView(self.listView, "force", 80);
	items.push(child);
	child = new CreateCharacterAbilityItemView(self.listView, "intelligence", 80);
	items.push(child);
	child = new CreateCharacterAbilityItemView(self.listView, "command", 80);
	items.push(child);
	child = new CreateCharacterAbilityItemView(self.listView, "agility", 80);
	items.push(child);
	child = new CreateCharacterAbilityItemView(self.listView, "luck", 80);
	items.push(child);
	self.listView.resize(200, 45 * items.length);
	self.listView.updateList(items);
};