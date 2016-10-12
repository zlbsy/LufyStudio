/*出征兵力分配*/
function CharacterExpeditionView(controller,characterModel){
	var self = this;
	base(self,LView,[controller]);
	self.characterModel = characterModel;
	self.set();
	self.name = "CharacterExpeditionView";
}
CharacterExpeditionView.prototype.layerInit=function(){
	var self = this;
	var backLayer = new LSprite();
	backLayer.graphics.drawRect(0,"#000000",[0,0,LMvc.screenWidth,LMvc.screenHeight],true,"#FFFFFF");
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
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win01"]),220,40);
	var bitmapOn = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	
	var layer = new LSprite();
	self.addChild(layer);
	
	var width = 48, height = 48;
	
	self.currentTroops = self.characterModel.troops();
	var cityModel = self.characterModel.city();
	var soldiers = self.characterModel.soldiers();
	self.canUseTroops = cityModel.troops() + self.currentTroops;
	
	var currentSoldierModel = self.characterModel.currentSoldiers();
	self.currentSoldierModel = currentSoldierModel;
	
	self.currentTroopsIndex = soldiers.findIndex(function(child){
		return child.id() == self.currentSoldierModel.id();
	});
	self.setIcon();
	self.maxTroops = self.currentSoldierModel.maxTroops(self.characterModel);
	if(self.maxTroops > self.canUseTroops){
		self.maxTroops = self.canUseTroops;
	}
	var com = new LComboBox(18,"#ffffff","Arial",panel,bitmapOff,bitmapOn);
	for(var i=0;i<soldiers.length;i++){
		var soldierModel = soldiers[i];
		var label = String.format("{0} {1}({2})", soldierModel.name(), Language.get("proficiency"),soldierModel.proficiency());
		com.setChild({label:label,value:i});
	}
	com.x = 70;
	layer.addChild(com);
	com.setListChildView(ExpeditionComboBoxChild);
	com.listView.cellWidth = 210;
	com.label.x = 10;
	com.label.y = 9;
	com.label.lineColor = "#000000";
	com.label.stroke = true;
	com.label.lineWidth = 3;
	com.setValue(self.currentTroopsIndex);
	
	//var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),220,40));
	var rangeBackground = getPanel("win04",220,40);
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var r = new LRange(rangeBackground, rangeSelect);
	r.x = 10;
	r.y = 50;
	layer.addChild(r);
	r.setValue(self.currentTroops * 100 / self.maxTroops);
	self.troopRange = r;
	
	var buttonMax = getButton(Language.get("max"),80);
	buttonMax.x = 250;
	buttonMax.y = r.y;
	buttonMax.name = "buttonMax";
	layer.addChild(buttonMax);
	buttonMax.addEventListener(LMouseEvent.MOUSE_UP, self.onClickMaxButton);

	var troopLabel = getStrokeLabel( self.currentTroops, 18, "#FFFFFF", "#000000", 4);
	troopLabel.x = 10;
	troopLabel.y = 110;
	layer.addChild(troopLabel);
	self.troopLabel = troopLabel;
	
	var canUseTroopsLabel = getStrokeLabel( self.canUseTroops, 18, "#FFFFFF", "#000000", 4);
	canUseTroopsLabel.x = 10;
	canUseTroopsLabel.y = 140;
	layer.addChild(canUseTroopsLabel);
	self.canUseTroopsLabel = canUseTroopsLabel;
	self.setTroops();
	r.addEventListener(LRange.ON_CHANGE,self.onchangeTroop);
	com.addEventListener(LComboBox.ON_CHANGE,self.onchangeSoldier);
};
CharacterExpeditionView.prototype.onClickMaxButton=function(event){
	var self = event ? event.currentTarget.getParentByConstructor(CharacterExpeditionView) : this;
	self.troopRange.setValue(100);
};
CharacterExpeditionView.prototype.setIcon=function(){
	var self = this;
	var width = 48, height = 48;
	var icon = self.currentSoldierModel.icon(new LPoint(width,height), self.iconLoad);
	self.icon = icon;
	self.addChild(icon);
};
CharacterExpeditionView.prototype.iconLoad=function(event){
	var icon = event.currentTarget;
	icon.cacheAsBitmap(true);
};
CharacterExpeditionView.prototype.onchangeSoldier=function(event){
	var soldierComboBox = event.currentTarget;
	var self = soldierComboBox.parent.parent;
	self.currentTroopsIndex = soldierComboBox.selectIndex;
	self.setSoldier();
	self.icon.remove();
	self.setIcon();
};
CharacterExpeditionView.prototype.setSoldier=function(){
	var self = this;
	var cityModel = self.characterModel.city();
	var soldiers = self.characterModel.soldiers();
	var currentSoldierModel = soldiers[self.currentTroopsIndex];
	self.currentSoldierModel = currentSoldierModel;
	self.maxTroops = self.currentSoldierModel.maxTroops(self.characterModel);
	if(self.maxTroops > self.canUseTroops){
		self.maxTroops = self.canUseTroops;
	}
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
	self.troopLabel.text = String.format("{0}：{1}/{2}",Language.get("distribution_troops"),self.currentTroops,self.maxTroops);
	self.canUseTroopsLabel.text = String.format(Language.get("can_use_troops") + "：{0}", self.canUseTroops - self.currentTroops);
};
CharacterExpeditionView.prototype.apply=function(){
	var self = this;
	var cityModel = self.characterModel.city();
	var troops = cityModel.troops() + self.characterModel.troops();
	self.characterModel.currentSoldierId(self.currentSoldierModel.id());
	cityModel.troops(troops - self.currentTroops);
	self.characterModel.troops(self.currentTroops);
};