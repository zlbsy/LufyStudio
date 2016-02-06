function CreateCharacterDetailedView(controller){
	base(this,LView,[controller]);
	this.init();
}
CreateCharacterDetailedView.prototype.layerInit=function(){
	var self = this;
	//self.addChild(getTranslucentMask());
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
};
CreateCharacterDetailedView.prototype.faceInit=function(){
	var self = this;
	self.faceLayer = new LSprite();
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = getBitmap(new LPanel(backgroundData,120, 170));
	self.faceLayer.addChild(panel);
	
	self.randomFace(1);
	
	var buttonFace = getButton("头像变更",120);
	buttonFace.y = 170;
	self.faceLayer.addChild(buttonFace);
	buttonFace.addEventListener(LMouseEvent.MOUSE_UP, self.changeFace);
	
	var normalLabel = getStrokeLabel("男",20,"#FFFFFF","#000000",4);
	normalLabel.x = 5;
	normalLabel.y = 230;
	self.faceLayer.addChild(normalLabel);
	var fastLabel = getStrokeLabel("女",20,"#FFFFFF","#000000",4);
	fastLabel.x = 60;
	fastLabel.y = 230;
	self.faceLayer.addChild(fastLabel);
	var radioBackground = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
	var radioSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
	speedRadio = new LRadio();
	speedRadio.x = 20;
	speedRadio.y = 230;
	speedRadio.setChildRadio(1,0,0,radioBackground,radioSelect);
	speedRadio.setChildRadio(2,60,0,radioBackground,radioSelect);
	speedRadio.setValue(2);
	self.faceLayer.addChild(speedRadio);
	//speedRadio.addEventListener(LMouseEvent.MOUSE_UP,self.onSpeedChange);
	
	self.baseLayer.addChild(self.faceLayer);
};
CreateCharacterDetailedView.prototype.changeFace=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.randomFace();
};
CreateCharacterDetailedView.prototype.randomFace=function(faceIndex){
	var self = this;
	if(self.face){
		self.face.remove();
	}
	if(!faceIndex){
		faceIndex = (620 * Math.random() >>> 0) + 1;
	}
	self.faceIndex = faceIndex;
	self.face = new CharacterFace(faceIndex);
	self.face.x = self.face.y = 5;
	self.face.scaleX = self.face.scaleY = 0.5;
	self.faceLayer.addChild(self.face);
};
CreateCharacterDetailedView.prototype.getStatusComboBox=function(list){
	var panelBorn = new LPanel(new LBitmapData(LMvc.datalist["win01"]),100,40);
	panelBorn.cacheAsBitmap(true);
	var bitmapOn = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var com = new LComboBox(18,"#ffffff","Arial",panelBorn,bitmapOff,bitmapOn);
	com.setListChildView(CreateCharacterComboBoxChild);
	com.listView.cellWidth = 100;
	com.label.x = 10;
	com.label.y = 9;
	com.label.lineColor = "#000000";
	com.label.stroke = true;
	com.label.lineWidth = 3;
	for(var i=0,l=list.length;i<l;i++){
		com.setChild({label:list[i].label,value:list[i].value});
	}
	return com;
};
CreateCharacterDetailedView.prototype.statusInit=function(){
	var self = this;
	self.statusLayer = new LSprite();
	self.statusLayer.x = 120;
	
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = new LPanel(backgroundData,LGlobal.width - 120, 280);
	panel.cacheAsBitmap(true);
	self.statusLayer.addChild(panel);
	var backgroundName = new LBitmapData(LMvc.datalist["background-text01"]);
	var panelName = new LPanel(backgroundName,100, 30);
	panelName.alpha = 0.8;
	panelName.cacheAsBitmap(true);
	panelName.x = 60;
	panelName.y = 10;
	self.statusLayer.addChild(panelName);
	
	var nameLabel = getStrokeLabel("姓名:",20,"#FFFFFF","#000000",3);
	nameLabel.x = 10;
	nameLabel.y = 12;
	self.statusLayer.addChild(nameLabel);
	eval( "var wordRandom1=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
	eval( "var wordRandom2=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
	var nameText = getStrokeLabel(wordRandom1 + wordRandom2,20,"#FFFFFF","#000000",3);
	nameText.x = 65;
	nameText.y = 12;
	var inputLayer = new LSprite();
	inputLayer.graphics.drawRect(0,"#000000",[0, 0, 100, 30]);
	nameText.setType(LTextFieldType.INPUT, inputLayer);
	self.statusLayer.addChild(nameText);
	
	var bornLabel = getStrokeLabel("出生:",20,"#FFFFFF","#000000",3);
	bornLabel.x = 10;
	bornLabel.y = 55;
	self.statusLayer.addChild(bornLabel);
	
	var yearStart = 132, list = [];
	for(var i=0;i<100;i++,yearStart++){
		list.push({label:yearStart,value:yearStart});
	}
	var bornCom = self.getStatusComboBox(list);
	bornCom.x = 60;
	bornCom.y = 50;
	self.statusLayer.addChild(bornCom);
	
	var lifeLabel = getStrokeLabel("寿命:",20,"#FFFFFF","#000000",3);
	lifeLabel.x = 10;
	lifeLabel.y = 98;
	self.statusLayer.addChild(lifeLabel);
	
	var lifeStart = 20, list = [];
	for(var i=0;i<100;i++,lifeStart++){
		list.push({label:lifeStart,value:lifeStart});
	}
	var lifeCom = self.getStatusComboBox(list);
	lifeCom.x = 60;
	lifeCom.y = 93;
	self.statusLayer.addChild(lifeCom);
	
	var personalLoyaltyLabel = getStrokeLabel("義理:",20,"#FFFFFF","#000000",3);
	personalLoyaltyLabel.x = 10;
	personalLoyaltyLabel.y = 141;
	self.statusLayer.addChild(personalLoyaltyLabel);
	
	var perStart = 0, list = [];
	for(var i=0;i<15;i++,perStart++){
		list.push({label:perStart + 1,value:perStart + 1});
	}
	var personalLoyaltyCom = self.getStatusComboBox(list);
	personalLoyaltyCom.x = 60;
	personalLoyaltyCom.y = 136;
	self.statusLayer.addChild(personalLoyaltyCom);
	
	//disposition : 0胆小，1冷静，2勇敢，3鲁莽
	var dispositionLabel = getStrokeLabel("性格:",20,"#FFFFFF","#000000",3);
	dispositionLabel.x = 10;
	dispositionLabel.y = 184;
	self.statusLayer.addChild(dispositionLabel);
	var list = [
	{label:"胆小",value:0},
	{label:"冷静",value:1},
	{label:"勇敢",value:2},
	{label:"鲁莽",value:3}
	];
	var dispositionCom = self.getStatusComboBox(list);
	dispositionCom.x = 60;
	dispositionCom.y = 179;
	self.statusLayer.addChild(dispositionCom);
	
	var compatibilityLabel = getStrokeLabel("相性:",20,"#FFFFFF","#000000",3);
	compatibilityLabel.x = 10;
	compatibilityLabel.y = 227;
	self.statusLayer.addChild(compatibilityLabel);
	var compatibilityStart = 0, list = [];
	for(var i=0;i<150;i++,compatibilityStart++){
		list.push({label:compatibilityStart,value:compatibilityStart});
	}
	var compatibilityCom = self.getStatusComboBox(list);
	compatibilityCom.x = 60;
	compatibilityCom.y = 222;
	self.statusLayer.addChild(compatibilityCom);
	
	self.baseLayer.addChild(self.statusLayer);
};
CreateCharacterDetailedView.prototype.getAbilityText=function(name, y){
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
CreateCharacterDetailedView.prototype.onMinusStatus=function(event){
	var button = event.currentTarget;
	var self = button.parent.parent.parent;
	var status = button.status;
	status.text = parseInt(status.text) - 1;
};
CreateCharacterDetailedView.prototype.onPlusStatus=function(event){
	var button = event.currentTarget;
	var self = button.parent.parent.parent;
	var status = button.status;
	status.text = parseInt(status.text) + 1;
};
CreateCharacterDetailedView.prototype.abilityInit=function(){
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
CreateCharacterDetailedView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.faceInit();
	self.statusInit();
	self.abilityInit();
};