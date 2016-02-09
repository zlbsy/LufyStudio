function CreateCharacterBasicView(controller, data){
	base(this,LView,[controller]);
	this.init(data);
}
CreateCharacterBasicView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.baseLayer.x = 190;
	self.addChild(self.baseLayer);
};
CreateCharacterBasicView.prototype.init=function(data){
	var self = this;
	self.layerInit();
	self.statusInit(data);
};
CreateCharacterBasicView.prototype.statusInit=function(data){
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
	
	var nameLabel = getStrokeLabel(Language.get("name") + ":",20,"#FFFFFF","#000000",3);
	nameLabel.x = 10;
	nameLabel.y = 12;
	statusLabelLayer.addChild(nameLabel);
	statusLabelLayer.cacheAsBitmap(true);
	
	var strName;
	if(data){
		strName = data.name;
	}else{
		eval( "var wordRandom1=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
		eval( "var wordRandom2=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
		strName = wordRandom1 + wordRandom2;
	}
	
	var nameText = getStrokeLabel(strName,20,"#FFFFFF","#000000",3);
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
	if(!data){
		data = {born:132, life:20, personalLoyalty:1, disposition:0, ambition:1, compatibility:0};
	}
	var items = [], list;
	for(var i=0, list = [], bornStart = 132; i<100; i++,bornStart++){
		list.push({label:bornStart, value:bornStart});
	}
	var childLayer = new CreateCharacterBasicItemView(self.listView, "born", list);
	childLayer.comboBox.setValue(data.born);
	items.push(childLayer);
	for(var i=0, list = [], lifeStart = 20; i<100; i++,lifeStart++){
		list.push({label:lifeStart, value:lifeStart});
	}
	var childLayer = new CreateCharacterBasicItemView(self.listView, "life", list);
	childLayer.comboBox.setValue(data.life);
	items.push(childLayer);
	for(var i=0, list = [], perStart = 0; i<15; i++,perStart++){
		list.push({label:perStart + 1, value:perStart + 1});
	}
	var childLayer = new CreateCharacterBasicItemView(self.listView, "personalLoyalty", list);
	items.push(childLayer);
	list = [{label:Language.get("disposition_0"),value:0}, {label:Language.get("disposition_1"),value:1}, {label:Language.get("disposition_2"),value:2}, {label:Language.get("disposition_3"),value:3}];
	var childLayer = new CreateCharacterBasicItemView(self.listView, "disposition", list);
	childLayer.comboBox.setValue(data.disposition);
	items.push(childLayer);
	for(var i=0, list = [], ambitionStart = 0; i<15; i++,ambitionStart++){
		list.push({label:ambitionStart + 1, value:ambitionStart + 1});
	}
	var childLayer = new CreateCharacterBasicItemView(self.listView, "ambition", list);
	childLayer.comboBox.setValue(data.ambition);
	items.push(childLayer);
	for(var i=0, list = [], compatibilityStart = 0; i<150; i++,compatibilityStart++){
		list.push({label:compatibilityStart, value:compatibilityStart});
	}
	var childLayer = new CreateCharacterBasicItemView(self.listView, "compatibility", list);
	childLayer.comboBox.setValue(data.compatibility);
	items.push(childLayer);
	
	self.listView.resize(200, 45 * items.length);
	self.listView.updateList(items);
};