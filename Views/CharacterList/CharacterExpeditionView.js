function CharacterExpeditionView(controller,characterModel){
	var self = this;
	base(self,LView,[controller]);
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
	
	//var soldiers = self.characterModel.soldiers();
	
	var layer = new LSprite();
	self.addChild(layer);
	
	var width = 48, height = 48;
	
	var cityModel = self.controller.getValue("cityData");
	var soldiers = cityModel.soldiers();
	self.canUseTroops = cityModel.troops();
	/*self.troopsList = [];
	for(var i=0;i<troopsList.length;i++){
		self.troopsList.push({id:troopsList[i].id,quantity:troopsList[i].quantity});
	}*/
	self.currentTroops = self.characterModel.troops();
	console.log("self.currentTroops="+self.currentTroops);
	var currentSoldierModel = self.characterModel.currentSoldiers();
	self.currentSoldierModel = currentSoldierModel;
	/*var currentTroopsIndex = self.troopsList.findIndex(function(child){
		return child.id == currentSoldierModel.id();
	});
	self.troopsList[currentTroopsIndex].quantity += currentTroops;*/
	
	self.currentTroopsIndex = soldiers.findIndex(function(child){
		return child.id() == self.currentSoldierModel.id();
	});
	var icon = currentSoldierModel.icon(new LPoint(width,height), true);
	layer.addChild(icon);
	self.maxTroops = self.currentSoldierModel.maxTroops(self.characterModel);
	var com = new LComboBox(16,"#000000","Arial",panel,bitmapOff,bitmapOn);
	for(var i=0;i<soldiers.length;i++){
		var soldierModel = soldiers[i];
		com.setChild({label:soldierModel.name(),value:i});
	}
	com.y = 55;
	layer.addChild(com);
	com.setValue(self.currentTroopsIndex);
	var troopLabel = getStrokeLabel( self.currentTroops, 18, "#FFFFFF", "#000000", 4);
	troopLabel.x = 150;
	troopLabel.y = 10;
	layer.addChild(troopLabel);
	self.troopLabel = troopLabel;
	var r = new LRange(rangeBackground, rangeSelect);
	r.x = 150;
	r.y = 50;
	layer.addChild(r);
	r.setValue(self.currentTroops * 100 / self.maxTroops);
	self.troopRange = r;

	var canUseTroopsLabel = getStrokeLabel( self.canUseTroops, 18, "#FFFFFF", "#000000", 4);
	canUseTroopsLabel.x = 10;
	canUseTroopsLabel.y = 120;
	layer.addChild(canUseTroopsLabel);
	self.canUseTroopsLabel = canUseTroopsLabel;
	self.setTroops();
	r.addEventListener(LRange.ON_CHANGE,self.onchangeTroop);
	com.addEventListener(LComboBox.ON_CHANGE,self.onchangeSoldier);
};
CharacterExpeditionView.prototype.onchangeSoldier=function(event){
	var soldierComboBox = event.currentTarget;
	var self = soldierComboBox.parent.parent;
	self.currentTroopsIndex = soldierComboBox.selectIndex;
	self.setSoldier();
};
CharacterExpeditionView.prototype.setSoldier=function(){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	var soldiers = cityModel.soldiers();
	var currentSoldierModel = soldiers[self.currentTroopsIndex];
	self.currentSoldierModel = currentSoldierModel;
	self.maxTroops = self.currentSoldierModel.maxTroops(self.characterModel);
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
	self.currentTroops = (self.maxTroops * self.troopRange.value * 0.01) >> 0;
	self.troopLabel.text = String.format("{0}：{1}/{2}","兵力",self.currentTroops,self.maxTroops);
	self.canUseTroopsLabel.text = String.format("城内可用兵力：{0}", self.canUseTroops - self.currentTroops);
};
CharacterExpeditionView.prototype.apply=function(){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	var troops = cityModel.troops() + self.characterModel.troops();
	self.characterModel.currentSoldiers(self.currentSoldierModel.id());
	cityModel.troops(troops - self.currentTroops);
	self.characterModel.troops(self.currentTroops);
	/*
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
	}*/
};