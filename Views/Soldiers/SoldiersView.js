function SoldiersView(controller, characterModel, size) {
	var self = this;
	base(self, LView, [controller]);
	self.characterModel = characterModel;
	self.size = size;
	self.setSoldierList();
}
SoldiersView.prototype.setSoldierList = function() {
	var self = this;
	if(self.listView){
		self.listView.updateView();
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
		var child = new SoldiersChildView(soldierList[i],self.size.x);
		items.push(child);
	}
	self.listView.updateList(items);
};
SoldiersView.prototype.updateView = function() {
	this.setsoldierList();
};