function SoldiersView(controller, characterModel, size) {
	var self = this;
	base(self, LView, [controller]);
	self.characterModel = characterModel;
	self.size = size;
}
SoldiersView.prototype.setSoldierList = function(characterModel) {
	var self = this;
	if(self.listView){
		if(characterModel && characterModel.id() != self.characterModel.id()){
			self.updateItems(characterModel);
		}else{
			self.listView.updateView();
		}
		return;
	}
	self.listView = new LListView();
	self.listView.resize(self.size.x, self.size.y);
	self.listView.cellWidth = self.size.x;
	self.listView.cellHeight = 50;
	self.addChild(self.listView);
	var items = [];
	var soldierList = self.characterModel.soldiers();
	for (var i = 0, l = soldierList.length; i < l; i++) {
		var child = new SoldiersChildView(soldierList[i],self.characterModel,self.size.x);
		items.push(child);
	}
	self.listView.updateList(items);
};
SoldiersView.prototype.updateView = function() {
	var self = this;
	var characterModel = self.controller.getValue("selectedCharacter");
	this.setSoldierList(characterModel);
};
SoldiersView.prototype.updateItems = function(characterModel) {
	var self = this;
	var items = self.listView.getItems();
	var soldierList = characterModel.soldiers();
	for(var i=0,l=items.length;i<l;i++){
		items[i].soldierModel = soldierList[i];
		items[i].characterModel = characterModel;
		items[i].cacheAsBitmap(false);
		items[i].set();
		items[i].updateView();
		items[i].cacheAsBitmap(true);
	}
	self.characterModel = characterModel;
};