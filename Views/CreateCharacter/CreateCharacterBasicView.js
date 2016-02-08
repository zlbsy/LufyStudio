function CreateCharacterBasicView(controller){
	base(this,LView,[controller]);
	this.init();
}
CreateCharacterBasicView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.baseLayer.x = 190;
	self.addChild(self.baseLayer);
};
CreateCharacterBasicView.prototype.init=function(){
	var self = this;
	self.layerInit();
	//self.faceInit();
	self.statusInit();
	//self.abilityInit();
};
CreateCharacterBasicView.prototype.statusInit=function(){
	var self = this;
	
	var statusLabelLayer = new LSprite();
	self.baseLayer.addChild(statusLabelLayer);

	var backgroundName = new LBitmapData(LMvc.datalist["background-text01"]);
	var panelName = new LPanel(backgroundName,100, 30);
	panelName.alpha = 0.8;
	panelName.cacheAsBitmap(true);
	panelName.x = 70;
	panelName.y = 10;
	statusLabelLayer.addChild(panelName);
	
	var nameLabel = getStrokeLabel("姓名:",20,"#FFFFFF","#000000",3);
	nameLabel.x = 10;
	nameLabel.y = 12;
	statusLabelLayer.addChild(nameLabel);
	
	eval( "var wordRandom1=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
	eval( "var wordRandom2=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
	var nameText = getStrokeLabel(wordRandom1 + wordRandom2,20,"#FFFFFF","#000000",3);
	nameText.x = 75;
	nameText.y = 12;
	var inputLayer = new LSprite();
	inputLayer.graphics.drawRect(0,"#000000",[0, 0, 100, 30]);
	nameText.setType(LTextFieldType.INPUT, inputLayer);
	self.baseLayer.addChild(nameText);
	
	self.listView = new LListView();
	self.listView.dragEffect = LListView.DragEffects.None;
	self.listView.x = 10;
	self.listView.y = 55;
	self.listView.cellWidth = 200;
	self.listView.cellHeight = 45;
	self.baseLayer.addChild(self.listView);
	
	var items = [], list;
	for(var i=0, list = [], bornStart = 132; i<100; i++,bornStart++){
		list.push({label:bornStart, value:bornStart});
	}
	var childLayer = new CreateCharacterBasicItemView(self.listView, "born", list);
	items.push(childLayer);
	for(var i=0, list = [], lifeStart = 20; i<100; i++,lifeStart++){
		list.push({label:lifeStart, value:lifeStart});
	}
	var childLayer = new CreateCharacterBasicItemView(self.listView, "life", list);
	items.push(childLayer);
	for(var i=0, list = [], perStart = 0; i<15; i++,perStart++){
		list.push({label:perStart + 1, value:perStart + 1});
	}
	var childLayer = new CreateCharacterBasicItemView(self.listView, "personalLoyalty", list);
	items.push(childLayer);
	list = [{label:"胆小",value:0}, {label:"冷静",value:1}, {label:"勇敢",value:2}, {label:"鲁莽",value:3}];
	var childLayer = new CreateCharacterBasicItemView(self.listView, "disposition", list);
	items.push(childLayer);
	for(var i=0, list = [], ambitionStart = 0; i<15; i++,ambitionStart++){
		list.push({label:ambitionStart + 1, value:ambitionStart + 1});
	}
	var childLayer = new CreateCharacterBasicItemView(self.listView, "ambition", list);
	items.push(childLayer);
	for(var i=0, list = [], compatibilityStart = 0; i<150; i++,compatibilityStart++){
		list.push({label:compatibilityStart, value:compatibilityStart});
	}
	var childLayer = new CreateCharacterBasicItemView(self.listView, "compatibility", list);
	items.push(childLayer);
	
	self.listView.resize(200, 45 * items.length);
	self.listView.updateList(items);
};
CreateCharacterBasicView.prototype.getStatusComboBox=function(list){
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