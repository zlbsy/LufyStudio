function CreateSettingCharacterListView(controller, title, isOnlyOne, characters, excludeCharacters){
	var self = this;
	base(self,LView,[controller]);
	self.title = title;
	self.isOnlyOne = isOnlyOne;
	self.characters = characters ? characters : null;
	self.excludeCharacters = excludeCharacters ? excludeCharacters : [];
	self.init();
}
CreateSettingCharacterListView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.titleInit();
	self.setCharacterList();
};
CreateSettingCharacterListView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height));
	self.baseLayer.addChild(panel);
	
	self.titleLayer = new LSprite();
	self.baseLayer.addChild(self.titleLayer);
	
	var closeButton = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
	closeButton.x = LGlobal.width - closeButton.getWidth();
	self.baseLayer.addChild(closeButton);
	closeButton.addEventListener(LMouseEvent.MOUSE_UP, self.closeSelf);
	
	var executeButton = getButton(Language.get("execute"),120);
	executeButton.x = (LGlobal.width - executeButton.getWidth()) * 0.5;
	executeButton.y = LGlobal.height - executeButton.getHeight() - 20;
	self.baseLayer.addChild(executeButton);
	executeButton.addEventListener(LMouseEvent.MOUSE_UP, self.execute);
};
CreateSettingCharacterListView.prototype.execute=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSettingCharacterListView);
	var parentView = self.parent;
	var items = self.listView.getItems();
	var characters = [];
	for(var i=0,l=items.length;i<l;i++){
		var item = items[i];
		if(!item.checkbox.checked){
			continue;
		}
		characters.push(item);
	}
	if(characters.length == 0){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_generals"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	parentView.closeCharacterList(characters);
};
CreateSettingCharacterListView.prototype.closeSelf=function(event){
	var self = event.currentTarget.getParentByConstructor(CreateSettingCharacterListView);
	var parentView = self.parent;
	parentView.closeCharacterList([]);
};
CreateSettingCharacterListView.prototype.titleInit=function(){
	var self = this, label;
	label = getStrokeLabel(Language.get(self.title),26,"#CDD4AF","#000000",4);
	label.x = 15;
	label.y = 15;
	self.titleLayer.addChild(label);

	var list = ["name", 90, "force", 190, "intelligence", 240, "command", 290, "agility", 340, "luck", 390];
	for(var i=0,l=list.length;i<l;i+=2){
		label = getStrokeLabel(Language.get(list[i]),20,"#CDD4AF","#000000",4);
		label.x = list[i + 1];
		label.y = 60;
		self.titleLayer.addChild(label);
		if(i+2 >= l){
			break;
		}
		var bitmapLine = new LBitmap(new LBitmapData(LMvc.datalist["icon-line"]));
		bitmapLine.scaleX = 2;
		bitmapLine.scaleY = 20;
		bitmapLine.x = list[i + 3] - 6;
		bitmapLine.y = 60;
		self.titleLayer.addChild(bitmapLine);
	}
	self.titleLayer.cacheAsBitmap(true);
};
CreateSettingCharacterListView.prototype.setCharacterList=function(){
	var self = this;
	var characters = self.characters ? self.characters : GameManager.getNoSetCharacters(LMvc.chapterId);
	self.listView = new LListView();
	self.listView.isOnlyOne = self.isOnlyOne;
	self.listView.x = 10;
	self.listView.y = 90;
	self.listView.cellWidth = LGlobal.width - 40;
	self.listView.cellHeight = 50;
	self.baseLayer.addChild(self.listView);
	var items = [], child;
	for(var i=0,l=characters.length;i<l;i++){
		var character = characters[i];
		if(self.excludeCharacters.indexOf(character.id) >= 0){
			continue;
		}
		child = new CreateSettingCharacterListChildView(character);
		items.push(child);
	}
		
	self.listView.resize(self.listView.cellWidth, LGlobal.height - self.listView.y - 80);
	if(items.length == 0){
		var obj = {title:Language.get("confirm"),message:Language.get("create_seignior_no_character_error"),width:300,height:220};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	self.listView.updateList(items);
};