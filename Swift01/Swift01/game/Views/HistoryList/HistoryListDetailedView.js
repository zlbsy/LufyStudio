function HistoryListDetailedView(controller,historyObject) {
	var self = this;console.log("HistoryListDetailedView");
	base(self, LView, [controller]);
	self.historyObject = historyObject;
	//self.lock = !LPlugin.eventIsOpen(historyObject.id);
	self.set();
}
HistoryListDetailedView.prototype.layerInit=function(){
	var self = this;
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.mustLayer = new LSprite();
	self.addChild(self.mustLayer);
	self.canLayer = new LSprite();
	self.addChild(self.canLayer);
	var background = getPanel("win05",LMvc.screenWidth,LMvc.screenHeight);
	self.backLayer.addChild(background);
};
HistoryListDetailedView.prototype.iconComplete=function(event){return;
	var self = event.currentTarget.getParentByConstructor(HistoryListDetailedView);
	self.cacheAsBitmap(false);
	self.updateView();
};
HistoryListDetailedView.prototype.set=function(){
	var self = this;
	self.layerInit();
	var title = getStrokeLabel(Language.get("history_" + self.historyObject.id),20,"#FFFFFF","#000000",4);
	title.x = (LMvc.screenWidth-title.getWidth())*0.5;
	title.y = 10;
	self.backLayer.addChild(title);
	
	var level = getStrokeLabel(String.format("势力等级要求:{0}",self.historyObject.level),20,"#999999","#000000",4);
	level.x = 10;
	level.y = 45;
	self.backLayer.addChild(level);
	/*var level = getStrokeLabel(String.format("可用预备兵力:{0}/{1}",0,self.historyObject.troops),20,"#999999","#000000",4);
	level.x = 200;
	level.y = 45;
	self.backLayer.addChild(level);
	*/
	var rangeBackground = getPanel("win04",300,40);
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var troopsLayer = new LSprite();
	troopsLayer.x = 10;
	troopsLayer.y = 70;
	self.backLayer.addChild(troopsLayer);
	var troopsLabel = getStrokeLabel(Language.get("可用预备兵力"), 18, "#FFFFFF", "#000000", 4);
	//troopsLabel.x = 10;
	troopsLayer.addChild(troopsLabel);
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var cityModel = seignior.character().city();
	self.troopsSum = cityModel.troops() > self.historyObject.troops ? self.historyObject.troops : cityModel.troops();
	var troops = getStrokeLabel( String.format("{0}/{1}",0,self.historyObject.troops), 18, "#FFFFFF", "#000000", 4);
	troops.x = 130;
	troopsLayer.addChild(troops);
	self.troops = troops;
	var rangeTroops = new LRange(rangeBackground.clone(), rangeSelect.clone());
	rangeTroops.x = 10;
	rangeTroops.y = 20;
	troopsLayer.addChild(rangeTroops);
	rangeTroops.addEventListener(LRange.ON_CHANGE, self.onTroopsChange);
	
	var msg = getStrokeLabel("*挑战历史遗迹只消耗预备兵力,所消耗的预备兵力为我方君主所在城池兵力。",16,"#ff0000","#000000",2);
	msg.width = 460;
	msg.x = 10;
	msg.y = 130;
	msg.setWordWrap(true,17);
	self.backLayer.addChild(msg);
	self.mustCount = 0;
	var mustLabel = getStrokeLabel(String.format("必须参战武将:{0}/{1}",self.mustCount,self.historyObject.characters.length),16,"#ffffff","#000000",2);
	mustLabel.x = 10;
	mustLabel.y = 175;
	self.mustLabel = mustLabel;
	self.backLayer.addChild(mustLabel);
	self.mustLayer.x = 10;
	self.mustLayer.y = 200;
	self.listLayerInit();
	self.subCount=0;
	var canLabel = getStrokeLabel(String.format("选择参战武将:{0}/{1}",self.subCount,self.historyObject.maxSubCharacter),16,"#ffffff","#000000",2);
	canLabel.x = 10;
	canLabel.y = 405;
	self.canLabel = canLabel;
	self.backLayer.addChild(canLabel);
	self.canLayer.x = 10;
	self.canLayer.y = 430;
	self.subListLayerInit();
	self.ctrlLayerInit();
	var buttonOk = getSizeButton(Language.get("出战"),180, 45);
	buttonOk.x = (LMvc.screenWidth - 180)*0.5;
	buttonOk.y = LMvc.screenHeight - 70;
	self.backLayer.addChild(buttonOk);
	buttonOk.addEventListener(LMouseEvent.MOUSE_UP, self.gotoBattle);
};
HistoryListDetailedView.prototype.onTroopsChange=function(event){
	var rangeTroops = event.currentTarget;
	var self = rangeTroops.parent.parent.parent;
	self.selectTroops = self.troopsSum*rangeTroops.value*0.01>>0;
	self.troops.text = String.format("{0}/{1}",self.selectTroops,self.troopsSum);
};
HistoryListDetailedView.prototype.gotoBattle = function(event){
	var self = event.currentTarget.getParentByConstructor(HistoryListDetailedView);
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	if(self.historyObject.level > seignior.level()){
		var obj = {width:300, height:200, message:Language.get("势力等级不够!"), title:Language.get("confirm")};
		var dialog = ConfirmWindow(obj);
		LMvc.layer.addChild(dialog);
		return;
	}
	var expeditionCharacterList = [];
	var items = self.listView.getItems();
	for(var i = 0;i<items.length;i++){
		var item = items[i];
		if(item.selectCharacter){
			expeditionCharacterList.push(item.selectCharacter);
		}
	}
	if(expeditionCharacterList.length < self.historyObject.characters.length){
		var obj = {width:300, height:200, message:Language.get("必须出战武将"), title:Language.get("confirm")};
		var dialog = ConfirmWindow(obj);
		LMvc.layer.addChild(dialog);
		return;
	}
	items = self.subListView.getItems();
	for(var i = 0;i<items.length;i++){
		var item = items[i];
		if(item.focus){
			var chara = CharacterModel.getChara(item.characterId);
			expeditionCharacterList.push(chara);
		}
	}
	
	var battleData = {historyId:self.historyObject.id};
	battleData.fromCity = seignior.character().city();
	battleData.expeditionCharacterList = expeditionCharacterList;
	battleData.expeditionLeader = expeditionCharacterList[0];
	var areas = self.historyObject.enemy.areas;
	self.historyObject.enemy.areasBaseData = areas;
	var areaList = [];
	areas.forEach(function(child){
		var area = AreaModel.getArea(child.area_id);
		area.setSeignor(self.historyObject.enemy,child);
		area.troops(5000);
		areaList.push(area);
	});
	self.historyObject.enemy.areas = areaList;
	SeigniorModel.setSingleSeignior(self.historyObject.enemy);
	battleData.toCity = areaList[0];
	self.controller.setValue("battleData", battleData);
	self.controller.gotoBattle();
};
HistoryListDetailedView.prototype.listLayerInit=function(){
	var self = this;
	var background = getPanel("win04",450, 65*3+10);
	background.x = background.y = -5;
	self.mustLayer.addChild(background);
	
	self.listView = new LListView();
	//self.listView.y = 15;
	self.listView.resize(440, 65*3);
	self.listView.maxPerLine = 1;
	self.listView.cellWidth = 440;
	self.listView.cellHeight = 65;
	self.mustLayer.addChild(self.listView);
	//self.listView.x = 20;
	//self.listView.y = 80;
	var items = [];
	var characters = self.historyObject.characters;
	for(var i=0,l=characters.length;i<l;i++){
		var characterIds = characters[i];
		var child = new HistoryListSelectChildView(characterIds);
		items.push(child);
	}
	self.listView.updateList(items);
};
HistoryListDetailedView.prototype.subListLayerInit=function(){
	var self = this;
	var background = getPanel("win04",450, 65+10);
	background.x = background.y = -5;
	self.canLayer.addChild(background);
	self.subListView = new LListView();
	self.subListView.movement = LListView.Direction.Horizontal;
	self.subListView.arrangement = LListView.Direction.Vertical;

	self.subListView.resize(440, 65);
	self.subListView.maxPerLine = 1;
	self.subListView.cellWidth = 55;
	self.subListView.cellHeight = 65;
	self.canLayer.addChild(self.subListView);
	//self.listView.x = 20;
	//self.listView.y = 80;
	var items = [];
	var characters = self.historyObject.subCharacters;
	for(var i=0,l=characters.length;i<l;i++){
		var child = new HistoryListSubChildView(characters[i]);
		items.push(child);
	}
	self.subListView.updateList(items);
};
HistoryListDetailedView.prototype.ctrlLayerInit=function(){
	var self = this;
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LMvc.screenWidth - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	
	self.backLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP,self.onClickCloseButton);
};
HistoryListDetailedView.prototype.onClickCloseButton=function(event){
	var self = event.currentTarget.getParentByConstructor(HistoryListDetailedView);
	var parentView = self.getParentByConstructor(HistoryListView);
	parentView.closeDetailed();
};
HistoryListDetailedView.prototype.changeSubCount=function(num){
	var self = this;
	self.subCount += num;
	self.canLabel.text = String.format("选择参战武将:{0}/{1}",self.subCount,self.historyObject.maxSubCharacter);
};
HistoryListDetailedView.prototype.changeMustCount=function(){
	var self = this;
	self.mustCount += 1;
	self.mustLabel.text = String.format("必须参战武将:{0}/{1}",self.mustCount,self.historyObject.characters.length);
};