function CreateCharacterArmView(controller){
	base(this,LView,[controller]);
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
	var detailedView = self.getParentByConstructor(CreateCharacterDetailedView);
	var chara = CharacterModel.list[CharacterModel.list.length * Math.random() >>> 0];
	self.point = 0;
	var data = [];
	var soldiers = chara.data.soldiers;
	var sum = 0;
	var girlSoldiers = [{id:1,img:"36-1"},{id:2,img:"36-2"},{id:3,img:"36-3"},{id:4,img:"36-4"},{id:5,img:"36-5"},{id:7,img:"36-2"},{id:8,img:"36-2"},
	{id:9,img:"36-9"},{id:10,img:"36-9"},{id:11,img:"36-9"},{id:12,img:"36-12"},{id:13,img:"36-13"},{id:14,img:"36-2"},{id:15,img:"36-2"},
	{id:16,img:"36-9"},{id:17,img:"36-17"},{id:21,img:"36-3"},{id:23,img:"36-2"},{id:24,img:"36-13"}];
	for(var i=0,l=soldiers.length;i<l;i++){
		var child = soldiers[i];
		sum += child.proficiency;
		var soldierData = {id:child.id, img:child.img};
		console.error(soldierData);
		if(child.proficiency > 500){
			soldierData.proficiency = child.proficiency - 500;
			data.push(soldierData);
			self.point += 500;
		}else{
			soldierData.proficiency = child.proficiency;
			data.push(soldierData);
		}
		if(detailedView.faceLayer.genderRadio.value == 2){
			var findGirlSoldier = girlSoldiers.find(function(c){
				return c.id == child.id;
			});
			if(findGirlSoldier){
				soldierData.img = findGirlSoldier.img;
			}
		}
	}
	for(var i=soldiers.length,l=SoldierDatas.length;i<l;i++){
		var child = SoldierDatas[i];
		var soldierData = {id:child.id,proficiency:0};
		var findGirlSoldier = girlSoldiers.find(function(c){
			return c.id == child.id;
		});
		if(detailedView.faceLayer.genderRadio.value == 2){
			if(findGirlSoldier){
				soldierData.img = findGirlSoldier.img;
			}
		}
		data.push(soldierData);
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
	self.imgLabel = getStrokeLabel("点击兵种形象可以选择其它形象！",18,"#FAFAD2","#000000",2);
	self.imgLabel.y = 360;
	self.baseLayer.addChild(self.imgLabel);
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
CreateCharacterArmView.prototype.resetSoliderImage=function(data){
	var self = this;
	var soldiers = self.refreshStatus().soldiers;
	var items = self.listView.getItems();
	for(var i=0;i<items.length;i++){
		var item = items[i];
		var soldier = soldiers.find(function(child){
			return child.id == item.soldier.id();
		});
		item.soldier.data.img = soldier ? soldier.img : null;
		item.setIcon();
	}
};