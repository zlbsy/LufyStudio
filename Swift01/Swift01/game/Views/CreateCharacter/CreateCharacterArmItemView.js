function CreateCharacterArmItemView(listView, soldier){
	var self = this;
	base(self,LListChildView,[]);
	self.listView = listView;
	self.soldier = new SoldierModel(null, soldier);
	self.soldierMaster = SoldierMasterModel.getMaster(soldier.id);
	self.init();
}
CreateCharacterArmItemView.prototype.onMinusStatus=function(){
	var self = this;
	var value = parseInt(self.textField.text, 10);
	var abilityView = self.listView.parent.parent;
	if(value <= 0){
		return;
	}
	self.textField.text = value - 50;
	self.cacheAsBitmap(false);
	self.updateView();
	abilityView.updatePoint(50);
};
CreateCharacterArmItemView.prototype.onPlusStatus=function(){
	var self = this;
	var value = parseInt(self.textField.text, 10);
	var abilityView = self.listView.parent.parent;
	if(abilityView.point <= 0 || value >= 1000){
		return;
	}
	self.textField.text = value + 50;
	self.cacheAsBitmap(false);
	self.updateView();
	abilityView.updatePoint(-50);
};
CreateCharacterArmItemView.prototype.setStatus=function(value){
	var self = this;
	self.textField.text = value;
	self.cacheAsBitmap(false);
	self.updateView();
};
CreateCharacterArmItemView.prototype.onClickIcon=function(){
	var self = this;
	var iconListView = new LListView();
	iconListView.cellWidth = 100;
	iconListView.cellHeight = 100;
	iconListView.resize(300, 300);
	//iconListView.updateList(items);
	var obj = {width:360, height:400, subWindow:iconListView, title:Language.get("形象指定"), noButton:true};
	var dialog = ConfirmWindow(obj);
	LMvc.layer.addChild(dialog);
};
CreateCharacterArmItemView.prototype.onClick=function(event){
	var self = event.target;
	if(event.selfX > self.minusButton.x && event.selfX < self.minusButton.x + self.minusButton.getWidth() && event.selfY > self.minusButton.y && event.selfY < self.minusButton.y + self.minusButton.getHeight()){
		self.onMinusStatus();
	}else if(event.selfX > self.plusButton.x && event.selfX < self.plusButton.x + self.plusButton.getWidth() && event.selfY > self.plusButton.y && event.selfY < self.plusButton.y + self.plusButton.getHeight()){
		self.onPlusStatus();
	}else if(event.selfX > self.icon.x && event.selfX < self.icon.x + self.icon.getWidth() && event.selfY > self.icon.y && event.selfY < self.icon.y + self.icon.getHeight()){
		self.onClickIcon();
	}
};
CreateCharacterArmItemView.prototype.setIcon=function(){
	var self = this;
	if(self.icon){
		self.icon.remove();
	}
	var width = 50, height = 50;
	self.icon = self.soldier.icon(new LPoint(width,height),self.iconComplete);
	self.addChild(self.icon);
};
CreateCharacterArmItemView.prototype.init=function(){
	var self = this;
	var width = 50, height = 50;
	self.setIcon();
	var label = getStrokeLabel(Language.get(self.soldierMaster.name()), 18, "#FFFFFF", "#000000", 3);
	label.x = 60;
	label.y = 4;
	self.addChild(label);
	var proficiencyLabel = getStrokeLabel(Language.get("proficiency") + ": ", 18, "#FFFFFF", "#000000", 3);
	proficiencyLabel.x = 60;
	proficiencyLabel.y = 26;
	self.addChild(proficiencyLabel);
	var text = getStrokeLabel(self.soldier.proficiency(),18,"#FFFFFF","#000000",3);
	text.x = 125;
	text.y = 26;
	self.addChild(text);
	var minusButton = getSizeButton("-",40,40);
	minusButton.status = text;
	minusButton.x = 175;
	self.addChild(minusButton);
	self.minusButton = minusButton;
	var plusButton = getSizeButton("+",40,40);
	plusButton.status = text;
	plusButton.x = 215;
	self.addChild(plusButton);
	self.plusButton = plusButton;
	self.textField = text;
};
CreateCharacterArmItemView.prototype.iconComplete=function(event){
	var self = event.currentTarget.parent;
	self.cacheAsBitmap(false);
	self.updateView();
};
