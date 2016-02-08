function CreateCharacterAbilityItemView(listView, name, value){
	var self = this;
	base(self,LListChildView,[]);
	self.listView = listView;
	self.name = name;
	self.value = value;
	self.init();
}
CreateCharacterAbilityItemView.prototype.onMinusStatus=function(){
	var self = this;
	var value = parseInt(self.textField.text, 10);
	var abilityView = self.listView.parent.parent;
	if(value <= 1){
		return;
	}
	self.textField.text = value -= 1;
	self.cacheAsBitmap(false);
	self.updateView();
	abilityView.updatePoint(1);
};
CreateCharacterAbilityItemView.prototype.onPlusStatus=function(){
	var self = this;
	var value = parseInt(self.textField.text, 10);
	var abilityView = self.listView.parent.parent;
	if(abilityView.point <= 0 || value >= 100){
		return;
	}
	self.textField.text = value += 1;
	self.cacheAsBitmap(false);
	self.updateView();
	abilityView.updatePoint(-1);
};
CreateCharacterAbilityItemView.prototype.onClick=function(event){
	var self = event.target;
	if(event.selfX > self.minusButton.x && event.selfX < self.minusButton.x + self.minusButton.getWidth() && event.selfY > self.minusButton.y && event.selfY < self.minusButton.y + self.minusButton.getHeight()){
		self.onMinusStatus();
	}else if(event.selfX > self.plusButton.x && event.selfX < self.plusButton.x + self.plusButton.getWidth() && event.selfY > self.plusButton.y && event.selfY < self.plusButton.y + self.plusButton.getHeight()){
		self.onPlusStatus();
	}
};
CreateCharacterAbilityItemView.prototype.init=function(){
	var self = this;
	var label = getStrokeLabel(Language.get(self.name) + ":",20,"#FFFFFF","#000000",3);
	label.y = 4;
	self.addChild(label);
	var text = getStrokeLabel(self.value,20,"#FFFFFF","#000000",3);
	text.x = 50;
	text.y = 4;
	self.addChild(text);
	var minusButton = getSizeButton("-",40,40);
	minusButton.status = text;
	minusButton.x = 90;
	self.addChild(minusButton);
	self.minusButton = minusButton;
	//minusButton.addEventListener(LMouseEvent.MOUSE_UP, self.onMinusStatus);
	var plusButton = getSizeButton("+",40,40);
	plusButton.status = text;
	plusButton.x = 130;
	self.addChild(plusButton);
	//plusButton.addEventListener(LMouseEvent.MOUSE_UP, self.onPlusStatus);
	self.plusButton = plusButton;
	self.textField = text;
};
