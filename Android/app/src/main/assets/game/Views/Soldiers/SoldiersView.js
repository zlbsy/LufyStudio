function SoldiersView(controller, characterModel, size) {
	var self = this;
	base(self, LView, [controller]);
	self.characterModel = characterModel;
	self.size = size;
}
SoldiersView.prototype.setSpecialSoldiers = function(characterModel) {
	var self = this;
	var soldierList = characterModel.soldiers();
	if(characterModel.seigniorId() != LMvc.selectSeignorId){
		return;
	}
	//if(purchaseHasBuy(productIdConfig.soldier_special)){
		for(var i=0, l=specialSoldiersConfig.length;i<l;i++){
			var soldierId = specialSoldiersConfig[i];
			var soldierModel = soldierList.find(function(c){
				return c.id() == soldierId;
			});
			if(!soldierModel){
				soldierModel = new SoldierModel(null, {id:soldierId,proficiency:0});
				for(var j=0;j<soldierList.length;j++){
					var seachSoldier = soldierList[j];
					if(seachSoldier.soldierType() == soldierModel.soldierType() && 
					seachSoldier.attackType() == soldierModel.attackType() &&
					seachSoldier.moveType() == soldierModel.moveType() && 
					seachSoldier.img().indexOf("common") < 0){
						soldierModel.data.img = seachSoldier.img();
						break;
					}
				}
				soldierList.push(soldierModel);
			}
		}
	//}
};
SoldiersView.prototype.setSoldierList = function(characterModel) {
	var self = this;
	self.setSpecialSoldiers(characterModel);
	if(self.listView){
		var items = self.listView.getItems();
		var checkbox = items[0].checkbox && items[0].checkbox.visible;
		var needUpdateAll = SoldiersView.updateAll || (checkbox && LMvc.BattleController) || (!checkbox && !LMvc.BattleController);
		if(needUpdateAll || (characterModel && characterModel.id() != self.characterModel.id())){
			self.updateItems(characterModel);
			SoldiersView.updateAll = null;
		}else{
			var soldierId = characterModel.currentSoldiers().id();
			var item = items.find(function(child){
				return soldierId == child.soldierModel.id();
			});
			item.cacheAsBitmap(false);
			item.updateView();
		}
		return;
	}
	SoldiersView.updateAll = null;
	self.listView = new LListView();
	self.listView.resize(self.size.x, self.size.y);
	self.listView.cellWidth = self.size.x;
	self.listView.cellHeight = 50;
	self.addChild(self.listView);
	var items = [];
	var soldierList = self.characterModel.soldiers();
	for (var i = 0, l = soldierList.length; i < l; i++) {
		var soldierModel = soldierList[i];
		var child = new SoldiersChildView(soldierModel,self.characterModel,self.size.x, self, i);
		items.push(child);
	}
	self.listView.updateList(items);
};
SoldiersView.prototype.updateView = function() {
	var self = this;
	var characterModel = self.controller.getValue("selectedCharacter");
	self.setSoldierList(characterModel);
};
SoldiersView.prototype.updateItems = function(characterModel) {
	var self = this;
	var items = self.listView.getItems();
	var soldierList = characterModel.soldiers();
	while(items.length > soldierList.length){
		self.listView.deleteChildView(items[items.length - 1]);
	}
	for(var i=0,l=soldierList.length;i<l;i++){
		var item;
		if(i < items.length){
			item = items[i];
		}else{
			var soldierModel = soldierList[i];
			item = new SoldiersChildView(soldierModel,characterModel,self.size.x, self, i);
			self.listView.insertChildView(item);
		}
		item.soldierModel = soldierList[i];
		item.characterModel = characterModel;
		item.cacheAsBitmap(false);
		if(!self.listView.isInClipping(i)){
			continue;
		}
		item.set();
		item.updateView();
	}
	if(self.characterModel.id() != characterModel.id()){
		self.listView.clipping.y = 0;
	}
	self.characterModel = characterModel;
};