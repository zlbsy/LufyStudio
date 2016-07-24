function ItemsView() {
	var self = this;
	base(self, LView, []);
	self.addChild(getTranslucentMask());
}
ItemsView.prototype.getItemList = function() {
	var self = this;
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var itemList = seignior.items();
	var items = [];
	var types = [ItemType.FEAT, ItemType.PROFICIENCY, ItemType.LOYALTY];
	for(var i=0;i<itemList.length;i++){
		var item = itemList[i];
		if(types.indexOf(item.itemType()) < 0){
			continue;
		}
		items.push(item);
	}
	items = items.sort(function(a, b){
		var v = b.rarity() - a.rarity();
		if(v != 0){
			return v;
		}
		return b.id() - a.id();
	});
	return items;
};
ItemsView.prototype.updateItems = function(itemList) {
	var self = this;
	var items = self.listView.getItems();
	while(items.length > itemList.length){
		self.listView.deleteChildView(items[items.length - 1]);
	}
	for(var i=0,l=itemList.length;i<l;i++){
		var item;
		if(i < items.length){
			item = items[i];
		}else{
			item = new ItemsChildView(ItemList[i], self.listView.cellWidth);
			self.listView.insertChildView(item);
		}
		item.itemModel = itemList[i];
		item.cacheAsBitmap(false);
		if(!self.listView.isInClipping(i)){
			continue;
		}
		item.set();
		item.updateView();
	}
};
ItemsView.prototype.setItemList = function() {
	var self = this;
	var itemList = self.getItemList();
	if(self.listView){
		self.updateItems(itemList);
		return;
	}
	var backLayer = new LSprite();
	backLayer.x = (LGlobal.width - 420) * 0.5;
	backLayer.y = (LGlobal.height - 420) * 0.5;
	self.addChild(backLayer);
	var panel = getPanel("win05",420, 420);
	backLayer.addChild(panel);
	var titlePanel = getPanel("win02",160,60);
	titlePanel.x = (420 - titlePanel.getWidth()) * 0.5;
	titlePanel.y = -10;
	backLayer.addChild(titlePanel);
	var title = getStrokeLabel(Language.get("item"),20,"#FFFFFF","#000000",4);
	title.x = titlePanel.x + (160 - title.getWidth())*0.5;
	title.y = titlePanel.y + (60 - title.getHeight())*0.5;
	backLayer.addChild(title);
	var width = 360, height = 360;
	self.listView = new LListView();
	self.listView.resize(width, height);
	self.listView.cellWidth = width;
	self.listView.cellHeight = 50;
	backLayer.addChild(self.listView);
	self.listView.x = 30;
	self.listView.y = 60;
	var items = [];
	for (var i = 0, l = itemList.length; i < l; i++) {
		var child = new ItemsChildView(itemList[i], 360);
		items.push(child);
	}
	self.listView.updateList(items);
	
	var closePanel = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closePanel.x = 430 - closePanel.getWidth();
	closePanel.y = -10;
	backLayer.addChild(closePanel);
	closePanel.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		event.currentTarget.getParentByConstructor(ItemsView).visible = false;
	});
};
ItemsView.prototype.updateView = function() {
	this.setItemList();
};
ItemsView.prototype.itemDetailedDialog = function(itemModel) {
	var self = this;
	var itemDetailed = new ItemDetailedView(self.controller,itemModel,self);
	itemDetailed.addEventListener(ItemEvent.USE_ITEM, self.itemUse);
	self.addChild(itemDetailed);
};
ItemsView.prototype.itemUse = function(event) {
	var itemModel = event.item;
	var equipmentDetailed = event.currentTarget;
	var self = equipmentDetailed.getParentByConstructor(ItemsView);
	var characterDetailedView = self.getParentByConstructor(CharacterDetailedView);
	var characterModel = characterDetailedView.controller.getValue("selectedCharacter");
	var subView;
	if(itemModel.itemType() == ItemType.FEAT){
		if(characterModel.level() >= CharacterLevelConfig.maxLevel){
			var obj = {title:Language.get("confirm"),
			message:Language.get("dialog_generals_level_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return;
		}
		characterModel.featPlus(itemModel.feat());
		subView = characterDetailedView.tabLayer.childList.find(function(child){
			return child instanceof CharacterDetailedTabPropertiesView;
		});
		if(subView){
			subView.updateView();
		}
	}else if(itemModel.itemType() == ItemType.LOYALTY){
		if(characterModel.loyalty() >= 100){
			var obj = {title:Language.get("confirm"),
			message:Language.get("dialog_loyalty_level_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return;
		}
		characterModel.loyalty(characterModel.loyalty() + itemModel.loyalty());
		subView = characterDetailedView.tabLayer.childList.find(function(child){
			return child instanceof CharacterDetailedTabStatusView;
		});
		if(subView){
			subView.updateView();
		}
		var characterListView = self.getParentByConstructor(CharacterListView);
		var e = new LEvent(CharacterListEvent.LIST_CHANGE);
		e.characterModel = characterModel;
		characterListView.dispatchEvent(e);
	}else if(itemModel.itemType() == ItemType.PROFICIENCY){
		var proficiency = characterModel.currentSoldiers().proficiency();
		if(proficiency >= itemModel.upperLimit()){
			var obj = {title:Language.get("confirm"),
			message:Language.get("dialog_proficiency_max_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return;
		}
		characterModel.currentSoldiers().proficiency(proficiency + itemModel.proficiency());
		subView = characterDetailedView.tabLayer.childList.find(function(child){
			return child instanceof SoldiersView;
		});
		if(subView){
			subView.updateView();
		}
		subView = characterDetailedView.tabLayer.childList.find(function(child){
			return child instanceof CharacterDetailedTabPropertiesView;
		});
		if(subView){
			subView.updateView();
		}
	}
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	seignior.removeItem(itemModel);
	equipmentDetailed.remove();
	self.updateView();
};
