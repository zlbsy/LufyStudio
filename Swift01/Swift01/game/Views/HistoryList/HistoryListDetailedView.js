function HistoryListDetailedView(controller,historyObject) {
	var self = this;
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
	self.payLayer = new LSprite();
	self.addChild(self.payLayer);
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
	
	var level = getStrokeLabel(String.format(Language.get("seignior_level_condition"),self.historyObject.level),18,"#666666","#000000",4);
	level.x = 10;
	level.y = 45;
	self.backLayer.addChild(level);
	var rangeBackground = getPanel("win04",200,40);
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var troopsLayer = new LSprite();
	troopsLayer.x = 10;
	troopsLayer.y = 70;
	self.backLayer.addChild(troopsLayer);
	var troopsLabel = getStrokeLabel(Language.get("arm_expedition_condition"), 16, "#FFFFFF", "#000000", 4);
	troopsLayer.addChild(troopsLabel);
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var cityModel = seignior.character().city();
	self.troopsSum = cityModel.troops() > self.historyObject.troops ? self.historyObject.troops : cityModel.troops();
	var troops = getStrokeLabel( String.format("{0}/{1}",0,self.troopsSum), 18, "#FFFFFF", "#000000", 4);
	troops.x = 130;
	troopsLayer.addChild(troops);
	self.troops = troops;
	var rangeTroops = new LRange(rangeBackground.clone(), rangeSelect.clone());
	rangeTroops.x = 10;
	rangeTroops.y = 18;
	troopsLayer.addChild(rangeTroops);
	rangeTroops.addEventListener(LRange.ON_CHANGE, self.onTroopsChange);
	if(self.troopsSum == 0){
		rangeTroops.visible = false;
	}
	var foodLayer = new LSprite();
	foodLayer.x = 250;
	foodLayer.y = 70;
	self.backLayer.addChild(foodLayer);
	var foodLabel = getStrokeLabel(Language.get("food_condition"), 16, "#FFFFFF", "#000000", 4);
	foodLayer.addChild(foodLabel);
	self.foodSum = cityModel.food() > self.historyObject.food ? self.historyObject.food : cityModel.food();
	var food = getStrokeLabel( String.format("{0}/{1}",0,self.foodSum), 18, "#FFFFFF", "#000000", 4);
	food.x = 130;
	foodLayer.addChild(food);
	self.food = food;
	var rangeFood = new LRange(rangeBackground.clone(), rangeSelect.clone());
	rangeFood.x = 10;
	rangeFood.y = 18;
	foodLayer.addChild(rangeFood);
	rangeFood.addEventListener(LRange.ON_CHANGE, self.onFoodChange);
	if(self.foodSum == 0){
		rangeFood.visible = false;
	}
	var msg = getStrokeLabel(Language.get("historical_food_message"),14,"#ff0000","#000000",2);
	msg.width = 460;
	msg.x = 10;
	msg.y = 128;
	msg.setWordWrap(true,17);
	self.backLayer.addChild(msg);
	self.mustCount = 0;
	var mustLabel = getStrokeLabel(String.format(Language.get("must_battle_generals"),self.mustCount,self.historyObject.characters.length),16,"#ffffff","#000000",2);
	mustLabel.x = 10;
	mustLabel.y = 148;
	self.mustLabel = mustLabel;
	self.backLayer.addChild(mustLabel);
	self.mustLayer.x = 10;
	self.mustLayer.y = 170;
	self.listLayerInit();
	self.subCount=0;
	var canLabel = getStrokeLabel(String.format(Language.get("can_battle_generals"),self.subCount,self.historyObject.maxSubCharacter),16,"#ffffff","#000000",2);
	canLabel.x = 10;
	canLabel.y = 346;
	self.canLabel = canLabel;
	self.backLayer.addChild(canLabel);
	self.canLayer.x = 10;
	self.canLayer.y = 368;
	self.subListLayerInit();
	
	var payLabel = getStrokeLabel(String.format(Language.get("special_support_generals")),16,"#ffffff","#000000",2);
	payLabel.x = 10;
	payLabel.y = 434;
	self.payLabel = payLabel;
	self.backLayer.addChild(payLabel);
	self.payLayer.x = 10;
	self.payLayer.y = 456;
	self.payListLayerInit();
	
	self.ctrlLayerInit();
	
	var buttonOk = getSizeButton(Language.get("battle_play"),180, 45);
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
HistoryListDetailedView.prototype.onFoodChange=function(event){
	var rangeFood = event.currentTarget;
	var self = rangeFood.parent.parent.parent;
	self.selectFood = self.foodSum*rangeFood.value*0.01>>0;
	self.food.text = String.format("{0}/{1}",self.selectFood,self.foodSum);
};
HistoryListDetailedView.prototype.gotoBattle = function(event){
	var self = event.currentTarget.getParentByConstructor(HistoryListDetailedView);
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	if(self.historyObject.level > seignior.level()){
		var obj = {width:300, height:200, message:Language.get("seignior_level_error"), title:Language.get("confirm")};
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
		var obj = {width:300, height:200, message:Language.get("must_battle_generals_label"), title:Language.get("confirm")};
		var dialog = ConfirmWindow(obj);
		LMvc.layer.addChild(dialog);
		return;
	}
	var script = "";
	for(var i = 0;i<10;i++){
		script += "Var.set(main_character_"+i+",0);";
		script += "Var.set(sub_character_"+i+",0);";
	}
	for(var i = 0;i<50;i++){
		script += "Var.set(battle_value_"+i+",0);";
	}
	for(var i = 0;i<items.length;i++){
		var item = items[i];
		script += "Var.set(main_character_"+i+","+item.selectCharacter.id()+");";
	}
	items = self.subListView.getItems();
	for(var i = 0;i<items.length;i++){
		var item = items[i];
		if(item.focus){
			var chara = CharacterModel.getChara(item.characterId);
			expeditionCharacterList.push(chara);
			script += "Var.set(sub_character_"+i+","+item.characterId+");";
		}
	}
	LGlobal.script.addScript(script);
	items = self.payListView.getItems();
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
	battleData.money = 0;
	battleData.food = self.selectFood;
	battleData.troops = self.selectTroops;
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
	var background = getPanel("win04",450, 56*3+10);
	background.x = background.y = -5;
	self.mustLayer.addChild(background);
	
	self.listView = new LListView();
	//self.listView.y = 15;
	self.listView.resize(440, 56*3);
	self.listView.maxPerLine = 1;
	self.listView.cellWidth = 440;
	self.listView.cellHeight = 56;
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
	var background = getPanel("win04",450, 56+10);
	background.x = background.y = -5;
	self.canLayer.addChild(background);
	self.subListView = new LListView();
	self.subListView.movement = LListView.Direction.Horizontal;
	self.subListView.arrangement = LListView.Direction.Vertical;

	self.subListView.resize(440, 56);
	self.subListView.maxPerLine = 1;
	self.subListView.cellWidth = 55;
	self.subListView.cellHeight = 56;
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
HistoryListDetailedView.prototype.payListLayerInit=function(){
	var self = this;
	var characters = historyPurchaseCharacters;
	var background = getPanel("win04",65*characters.length + 15, 56+10);
	background.x = background.y = -5;
	self.payLayer.addChild(background);
	self.payListView = new LListView();
	self.payListView.movement = LListView.Direction.Horizontal;
	self.payListView.arrangement = LListView.Direction.Vertical;

	self.payListView.resize(440, 56);
	self.payListView.maxPerLine = 1;
	self.payListView.cellWidth = 65;
	self.payListView.cellHeight = 56;
	self.payLayer.addChild(self.payListView);
	//self.listView.x = 20;
	//self.listView.y = 80;
	var items = [];
	
	for(var i=0,l=characters.length;i<l;i++){
		var child = new HistoryListPayChildView(characters[i]);
		items.push(child);
	}
	self.payListView.updateList(items);
	
	var buttonList = getSizeButton(Language.get("detail"),100, 45);
	buttonList.x = background.getWidth() + 5 ;
	//buttonList.y = LMvc.screenHeight - 70;
	self.payLayer.addChild(buttonList);
	buttonList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickPayGenerals);
};
HistoryListDetailedView.prototype.onClickPayGenerals=function(event){
	var self = event.currentTarget.getParentByConstructor(HistoryListDetailedView);
	//self.visible = false;
	var generals = [];
	var characters = historyPurchaseCharacters;
	for(var i=0,l=characters.length;i<l;i++){
		var child = CharacterModel.getChara(characters[i]);
		//console.log(child.name()+"="+(child.basicPropertiesSum()));
		generals.push(child);
	}
	self.controller.loadCharacterList(CharacterListType.OWN_CHARACTER_LIST, generals, {showOnly:true,showAbility:true,cutoverName:"ability_properties", noCutover:true});
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
	self.canLabel.text = String.format(Language.get("can_battle_generals"),self.subCount,self.historyObject.maxSubCharacter);
};
HistoryListDetailedView.prototype.changeMustCount=function(){
	var self = this;
	self.mustCount += 1;
	self.mustLabel.text = String.format(Language.get("must_battle_generals"),self.mustCount,self.historyObject.characters.length);
};
