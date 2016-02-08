function CreateCharacterArmView(controller){
	base(this,LView,[controller]);
	this.init();
}
CreateCharacterArmView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.baseLayer.x = 190;
	self.addChild(self.baseLayer);
};
CreateCharacterArmView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.armInit();
};
CreateCharacterArmView.prototype.updatePoint=function(value){
	var self = this;
	self.point += value;
	self.statusPoint.text = String.format("可分配点数: {0}",self.point);
};
CreateCharacterArmView.prototype.armInit=function(){
	var self = this;
	self.point = 1500;
	
	self.statusPoint = getStrokeLabel(String.format("可分配点数: {0}",self.point),20,"#FFFFFF","#000000",3);
	self.statusPoint.x = 10;
	self.statusPoint.y = 12;
	self.baseLayer.addChild(self.statusPoint);
	var updateButton = getSizeButton("刷新",80,40);
	updateButton.x = 180;
	updateButton.y = 5;
	self.baseLayer.addChild(updateButton);
	self.listView = new LListView();
	self.listView.x = 10;
	self.listView.y = 55;
	self.listView.cellWidth = 260;
	self.listView.cellHeight = 50;
	self.baseLayer.addChild(self.listView);
	var soldiers = [];
	for(var i=0,l=SoldierMasterModel.master.length;i<l;i++){
		var soldier = SoldierMasterModel.master[i];
		soldiers.push({id:soldier.id(),proficiency:0});
	}
	var items = [], child;
	for(var i=0,l=soldiers.length;i<l;i++){
		var soldier = soldiers[i];
		child = new CreateCharacterArmItemView(self.listView, soldier);
		items.push(child);
	}
	
	self.listView.resize(260, 50 * 6);
	self.listView.updateList(items);
};