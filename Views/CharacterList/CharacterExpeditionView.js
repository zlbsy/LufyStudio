function CharacterExpeditionView(controller,characterModel){
	var self = this;
	base(self,LView,[controller]);
	console.log("CharacterExpeditionView",characterModel);
	self.characterModel = characterModel;
	self.set();
}
CharacterExpeditionView.prototype.layerInit=function(){
	var self = this;
	var backLayer = new LSprite();
	backLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#FFFFFF");
	self.addChild(getBitmap(backLayer));
	self.layer = new LSprite();
	self.addChild(self.layer);
	
	self.tabLayer = new LSprite();
	self.tabLayer.x = 15;
	self.tabLayer.y = 375;
	self.addChild(self.tabLayer);
	
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
};
CharacterExpeditionView.prototype.set=function(){
	var self = this;
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win01"]),110,40);
	var bitmapOn = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),170,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	
	var soldiers = self.characterModel.soldiers();
	
	var layer = new LSprite();
	self.addChild(layer);
	
	var width = 48, height = 48;
	
	var cityModel = self.controller.getValue("cityData");
	var troopsList = cityModel.troops();
	console.log("troopsList",troopsList);
	self.troopsList = [];
	for(var i=0;i<troopsList.length;i++){
		self.troopsList.push({id:troopsList[i].id,quantity:troopsList[i].quantity});
	}
	var currentTroops = self.characterModel.troops();
	
	var currentSoldierModel = soldiers[0];
	self.currentSoldierModel = currentSoldierModel;
	var currentTroopsIndex = self.troopsList.findIndex(function(child){
		return child.id == currentSoldierModel.id();
	});
	self.troopsList[currentTroopsIndex].quantity += currentTroops;
	
	self.currentTroopsIndex = 0;
	var icon = currentSoldierModel.icon(new LPoint(width,height), true);
	layer.addChild(icon);
	self.maxTroops = self.currentSoldierModel.troops(self.characterModel);
	var com = new LComboBox(16,"#000000","Arial",panel,bitmapOff,bitmapOn);
	for(var i=0;i<soldiers.length;i++){
		var soldierModel = soldiers[i];
		com.setChild({label:soldierModel.name(),value:i});
	}
	com.y = 55;
	layer.addChild(com);
	com.addEventListener(LComboBox.ON_CHANGE,self.onchangeSoldier);
	
	var troopLabel = getStrokeLabel( "", 18, "#FFFFFF", "#000000", 4);
	troopLabel.x = 150;
	troopLabel.y = 10;
	layer.addChild(troopLabel);
	self.troopLabel = troopLabel;
	var r = new LRange(rangeBackground, rangeSelect);
	r.x = 150;
	r.y = 50;
	layer.addChild(r);
	r.addEventListener(LRange.ON_CHANGE,self.onchangeTroop);
	self.troopRange = r;

	var canUseTroopsLabel = getStrokeLabel( "", 18, "#FFFFFF", "#000000", 4);
	canUseTroopsLabel.x = 10;
	canUseTroopsLabel.y = 120;
	layer.addChild(canUseTroopsLabel);
	self.canUseTroopsLabel = canUseTroopsLabel;
	self.setSoldier();
	Troops = self.troopsList.find(function(child){
		return child.id == currentSoldierModel.id();
	});
	console.log("currentTroops=",currentTroops,currentTroops*100/self.troopsList[currentTroopsIndex].quantity);
	r.setValue(currentTroops*100/self.troopsList[currentTroopsIndex].quantity);
};
CharacterExpeditionView.prototype.onchangeSoldier=function(event){
	var soldierComboBox = event.currentTarget;
	var self = soldierComboBox.parent.parent;
	self.currentTroopsIndex = soldierComboBox.selectIndex;
	self.setSoldier();
};
CharacterExpeditionView.prototype.setSoldier=function(){
	var self = this;
	var soldiers = self.characterModel.soldiers();
	var currentSoldierModel = soldiers[self.currentTroopsIndex];
	
	var currentTroops = self.troopsList.find(function(child){
		return child.id == currentSoldierModel.id();
	});
	self.canUseTroops = currentTroops.quantity;
	self.currentSoldierModel = currentSoldierModel;
	self.maxTroops = self.currentSoldierModel.troops(self.characterModel);
	self.troopRange.setValue(0); 
	self.setTroops();
};
CharacterExpeditionView.prototype.onchangeTroop=function(event){
	var troopRange = event.currentTarget;
	var self = troopRange.parent.parent;
	self.setTroops();
};
CharacterExpeditionView.prototype.setTroops=function(){
	var self = this;
	var troop = (self.maxTroops * self.troopRange.value * 0.01) >> 0;
	self.troopLabel.text = String.format("{0}：{1}/{2}","兵力",troop,self.maxTroops);
	self.canUseTroopsLabel.text = String.format("城内可用兵力：{0}", self.canUseTroops - troop);
};
CharacterExpeditionView.prototype.apply=function(){
	var self = this;
	var troop = (self.maxTroops * self.troopRange.value * 0.01) >> 0;
	self.characterModel.troops(troop);
	var soldiers = self.characterModel.soldiers();
	var soldier = soldiers.splice(self.currentTroopsIndex,1);
	soldier = soldier[0];
	soldiers.unshift(soldier);
	var cityModel = self.controller.getValue("cityData");
	var troops = cityModel.troops();
	for(var i=0;i<troops.length;i++){
		if(troops[i].id == soldier.id()){
			troops[i].quantity = self.troopsList[i].quantity - troop;
		}else{
			troops[i].quantity = self.troopsList[i].quantity;
		}
	}
	console.log("apply",self.characterModel.troops());
	//var cityTroops = cityModel.troops(soldier.id());
	//cityTroops.quantity = self.canUseTroops - troop;
	//cityModel.troops(soldier.id(), cityTroops);
	//self.controller.setValue("cityData", cityModel);
};