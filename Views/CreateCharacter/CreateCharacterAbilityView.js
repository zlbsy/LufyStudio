function CreateCharacterAbilityView(controller){
	base(this,LView,[controller]);
	this.init();
}
CreateCharacterAbilityView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.baseLayer.x = 190;
	self.addChild(self.baseLayer);
};
CreateCharacterAbilityView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.abilityInit();
};
CreateCharacterAbilityView.prototype.getAbilityText=function(name, y){
	var self = this;
	var label = getStrokeLabel(Language.get(name) + ":",20,"#FFFFFF","#000000",3);
	label.y = y + 4;
	self.abilityLayer.addChild(label);
	var text = getStrokeLabel("100",20,"#FFFFFF","#000000",3);
	text.x = 50;
	text.y = y + 4;
	self.abilityLayer.addChild(text);
	var minusButton = getSizeButton("-",40,40);
	minusButton.status = text;
	minusButton.x = 90;
	minusButton.y = y;
	self.abilityLayer.addChild(minusButton);
	minusButton.addEventListener(LMouseEvent.MOUSE_UP, self.onMinusStatus);
	var plusButton = getSizeButton("+",40,40);
	plusButton.status = text;
	plusButton.x = 130;
	plusButton.y = y;
	self.abilityLayer.addChild(plusButton);
	plusButton.addEventListener(LMouseEvent.MOUSE_UP, self.onPlusStatus);
	return text;
};
CreateCharacterAbilityView.prototype.onMinusStatus=function(event){
	var button = event.currentTarget;
	var self = button.parent.parent.parent;
	var status = button.status;
	status.text = parseInt(status.text) - 1;
};
CreateCharacterAbilityView.prototype.onPlusStatus=function(event){
	var button = event.currentTarget;
	var self = button.parent.parent.parent;
	var status = button.status;
	status.text = parseInt(status.text) + 1;
};
CreateCharacterAbilityView.prototype.abilityInit=function(){
	var self = this;
	self.abilityLayer = new LSprite();
	self.abilityLayer.x = 300;
	self.abilityLayer.y = 10;
	
	self.statusPoint = getStrokeLabel("分配: 200",20,"#FFFFFF","#000000",3);
	//self.statusPoint.x = 5;
	self.statusPoint.y = 5;
	self.abilityLayer.addChild(self.statusPoint);
	var updateButton = getSizeButton("刷新",80,40);
	updateButton.x = 90;
	//updateButton.y = y;
	self.abilityLayer.addChild(updateButton);
	
	self.forceText = self.getAbilityText("force", 43);
	self.forceText = self.getAbilityText("智利", 86);
	self.forceText = self.getAbilityText("统帅", 129);
	self.forceText = self.getAbilityText("敏捷", 172);
	self.forceText = self.getAbilityText("运气", 215);
	
	self.baseLayer.addChild(self.abilityLayer);
};