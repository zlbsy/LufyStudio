function CreateCharacterArmView(controller, data){
	base(this,LView,[controller]);
	this.init(data);
}
CreateCharacterArmView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.baseLayer.x = 190;
	self.addChild(self.baseLayer);
};
CreateCharacterArmView.prototype.init=function(data){
	var self = this;
	self.layerInit();
	self.armInit(data);
};
CreateCharacterArmView.prototype.updatePoint=function(value){
	var self = this;
	self.point += value;
	self.statusPoint.text = String.format(Language.get("distribute_point"),self.point);
};
CreateCharacterArmView.prototype.refreshStatus=function(){
	var self = this;
	var chara = CharacterModel.list[CharacterModel.list.length * Math.random() >>> 0];
	self.point = 0;
	var data = [];
	var soldiers = chara.data.soldiers;
	var sum = 0;
	for(var i=0,l=soldiers.length;i<l;i++){
		var child = soldiers[i];
		sum += child.proficiency;
		if(child.proficiency > 500){
			data.push({id:child.id,proficiency:child.proficiency - 500});
			self.point += 500;
		}else{
			data.push({id:child.id,proficiency:child.proficiency});
		}
	}
	for(var i=soldiers.length,l=SoldierDatas.length;i<l;i++){
		var child = SoldierDatas[i];
		data.push({id:child.id,proficiency:0});
	}
	if(sum < 1500){
		self.point += (1500 - sum);
	}
	return {soldiers:data};
};
CreateCharacterArmView.prototype.onRefreshStatus=function(event){
	var self = event.currentTarget.parent.parent;
	var soldiers = self.refreshStatus().soldiers;
	var items = self.listView.getItems();
	for(var i=0, l=items.length;i<l;i++){
		var child = items[i];
		var soldier = soldiers.find(function(obj){
			return obj.id == child.soldier.id();
		});
		child.setStatus(soldier.proficiency);
	}
	self.statusPoint.text = String.format(Language.get("distribute_point"),self.point);
};
CreateCharacterArmView.prototype.armInit=function(data){
	var self = this;
	if(!data){
		data = self.refreshStatus();
	}else{
		self.point = data.proficiencyPoint;
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
	self.listView.x = 10;
	self.listView.y = 55;
	self.listView.cellWidth = 260;
	self.listView.cellHeight = 50;
	self.baseLayer.addChild(self.listView);
	var soldiers = data.soldiers;
	var items = [], child;
	for(var i=0,l=soldiers.length;i<l;i++){
		var soldier = soldiers[i];
		child = new CreateCharacterArmItemView(self.listView, soldier);
		items.push(child);
	}
	
	self.listView.resize(260, 50 * 6);
	self.listView.updateList(items);
};