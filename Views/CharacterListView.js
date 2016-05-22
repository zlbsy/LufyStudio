function CharacterListView(){
	base(this,LView,[]);
}
CharacterListView.prototype.construct=function(){
	var self = this;
	self.sortValue = 1;
	self.controller.addEventListener(LEvent.COMPLETE, self.init.bind(self));
	self.addEventListener(CharacterListEvent.LIST_CHANGE, self.onChangeList);
};
CharacterListView.CUTOVER_BASIC = "basic_properties";
CharacterListView.CUTOVER_ABILITY = "ability_properties";
CharacterListView.CUTOVER_ARM = "arm_properties";
CharacterListView.prototype.init=function(){
	var self = this;
	var backLayer = getTranslucentMask();
	self.addChild(backLayer);
	self.listLayer = new LSprite();
	self.addChild(self.listLayer);
	self.charaDetailedLayer = new LSprite();
	self.addChild(self.charaDetailedLayer);
	switch(self.controller.characterListType){
		case CharacterListType.BATTLE_SINGLE:
			var chara = self.controller.fromController.currentCharacter;
			self.showCharacterDetailed(chara);
			break;
		default:
			self.listInit();
	}
};
CharacterListView.prototype.listInit=function(){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	var generals;
	if(cityModel){
		generals = cityModel.generals();
		self.overageMoney = cityModel.money();
	}else{
		generals = CharacterModel.list;
		self.overageMoney = 0;
	}
	self.selectedCount = 0;
	self.usedMoney = 0;
		
	var title = getStrokeLabel(Language.get(self.controller.characterListType),30,"#FFFFFF","#000000",4);
	title.x = 15;
	title.y = 10;
	self.listLayer.addChild(title);
	if(!self.controller.params.noCutover){
		self.getCutoverButton(self.controller.characterListType == CharacterListType.EXPEDITION ? CharacterListView.CUTOVER_ARM : CharacterListView.CUTOVER_BASIC);
	}
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	self.listLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.onClickCloseButton.bind(self));

	//TODO::ver1.1参数控制
	if((SeigniorExecute.running && self.controller.characterListType == CharacterListType.EXPEDITION)
	|| self.controller.characterListType == CharacterListType.SELECT_MONARCH){
		buttonClose.visible = false;
	}
	
	self.tabMenuLayer = new LSprite();
	self.tabMenuLayer.y = 60;
	self.listLayer.addChild(self.tabMenuLayer);
	self.showTabMenu();
	
	self.contentLayer = new LSprite();
	self.contentLayer.y = 110;
	self.listLayer.addChild(self.contentLayer);
	
	self.dataList = self.controller.characterList;
	
	if(self.controller.params.toast){
		Toast.makeText(Language.get(self.controller.params.toast)).show();
	}
	
	var buttonLabel = self.controller.params.buttonLabel;
	var showMoney = self.controller.params.showMoney;
	
	if(buttonLabel){
		var button = getButton(Language.get(buttonLabel),160);
		self.executeButton = button;
		button.x = (LGlobal.width - 160) * 0.5;
		button.y = LGlobal.height - button.getHeight() - 15;
		self.listLayer.addChild(button);
		button.addEventListener(LMouseEvent.MOUSE_UP, self.onClickExecuteButton);
		self.addEventListener(LCheckBox.ON_CHANGE, self.onChangeChildSelect);
		if(showMoney){
			var lblMoney = getStrokeLabel(String.format("{0}：{1} - {2} = {3}", Language.get("money"), cityModel.moneyLabel(), 0, cityModel.moneyLabel()),26,"#FFFFFF","#000000",4);
			lblMoney.x = (LGlobal.width - lblMoney.getWidth()) * 0.5;
			lblMoney.y = button.y - lblMoney.getHeight() - 10;
			self.lblMoney = lblMoney;
			self.listLayer.addChild(lblMoney);
		}
	}
	self.setFooter();
	
	self.showList();
};
CharacterListView.prototype.setFooter=function(){
	var self = this;
	self.pageLabel = getStrokeLabel("1/1",30,"#FFFFFF","#000000",4);
	self.pageLabel.x = 10;
	self.pageLabel.y = LGlobal.height - self.pageLabel.getHeight() - 15;
	self.listLayer.addChild(self.pageLabel);
	
	var leftBitmapData = new LBitmapData(LMvc.datalist["arrow"]);
	var left = new LBitmap(leftBitmapData);
	var leftButton = new LButton(left);
	leftButton.name = "leftButton";
	leftButton.x = LGlobal.width - leftBitmapData.width * 2 - 20;
	leftButton.y = LGlobal.height - leftBitmapData.height - 15;
	self.listLayer.addChild(leftButton);
	leftButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickLeftArrow);
	var rightBitmapData = GameCacher.getScaleBitmapData("arrow", -1, 1);
	var right = new LBitmap(rightBitmapData);
	var rightButton = new LButton(right);
	rightButton.name = "rightButton";
	rightButton.x = LGlobal.width - leftBitmapData.width - 10;
	rightButton.y = leftButton.y;
	self.listLayer.addChild(rightButton);
	rightButton.addEventListener(LMouseEvent.MOUSE_UP,self.clickRightArrow);
};
CharacterListView.prototype.clickLeftArrow=function(event){
	var self = event.currentTarget.getParentByConstructor(CharacterListView);
	self.charactersPush(self.pageIndex - 1);
};
CharacterListView.prototype.clickRightArrow=function(event){
	var self = event.currentTarget.getParentByConstructor(CharacterListView);
	self.charactersPush(self.pageIndex + 1);
};
CharacterListView.prototype.onChangeList=function(event){
	var self = event.currentTarget;
	var characterId = event.characterModel.id();
	var items = self.listView.getItems();
	var index = items.findIndex(function(child){
		return child.charaModel.id() == characterId;
	});
	if(index < 0){
		return;
	}
	var characterListChildView = items[index];
	characterListChildView.set(event.characterModel);
	characterListChildView.cacheAsBitmap(false);
	characterListChildView.updateView();
	
	characterListChildView.cutover(self.showingTabName, self.listView.isInClipping(index));
};
CharacterListView.prototype.onChangeChildSelect=function(event){
	var self = event.currentTarget,selectedCount=0;
	self.listView.getItems().forEach(function(child){
		if(!child.checkbox || !child.checkbox.checked){
			return;
		}
		selectedCount++;
	});
	self.selectedCount = selectedCount;
	if(!self.lblMoney){
		return;
	}
	var cityModel = self.controller.getValue("cityData");
	var usedMoney = getJobPrice(characterListType2JobType(self.controller.characterListType)) * self.selectedCount;
	var overageMoney = cityModel.money() - usedMoney;
	self.usedMoney = usedMoney;
	self.overageMoney = overageMoney;
	self.lblMoney.text = String.format("{0}：{1} - {2} = {3}", Language.get("money"), cityModel.moneyLabel(), LString.numberFormat(usedMoney,3), LString.numberFormat(overageMoney,3));
	self.lblMoney.x = (LGlobal.width - self.lblMoney.getWidth()) * 0.5;
};
CharacterListView.prototype.onClickExecuteButton=function(event){
	var self = event.currentTarget.parent.parent;
	if(self.selectedCount <= 0){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_generals"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		self.addChild(windowLayer);
		return;
	}else if(self.overageMoney < 0){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_no_money"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		self.addChild(windowLayer);
		return;
	}
	self.selectExecute();
};
CharacterListView.prototype.selectExecute=function(){
	var self = this;
	var characterListType = self.controller.characterListType;
	var characterList = [];
	self.listView.getItems().forEach(function(child){
		if(!child.checkbox.checked){
			return;
		}
		characterList.push(child.charaModel);
	});
	self.controller.fromController.closeCharacterList({characterList : characterList, usedMoney : self.usedMoney, characterListType : self.controller.characterListType});
	if(LMvc.CityController){
		LMvc.CityController.dispatchEvent(LController.NOTIFY_ALL);
	}
};
CharacterListView.prototype.getCutoverButton=function(name){
	var self = this;
	self.showingTabName = name;
	var buttonCutover = getButton(String.format("{0} ({1})",Language.get(name),Language.get("cutover")),200);
	buttonCutover.x = 210;
	buttonCutover.y = 5;
	buttonCutover.name = name;
	self.listLayer.addChild(buttonCutover);
	buttonCutover.addEventListener(LMouseEvent.MOUSE_UP, self.onClickCutoverButton);
};
CharacterListView.prototype.onClickCutoverButton=function(event){
	var buttonCutover = event.currentTarget, self = buttonCutover.parent.parent, cutoverName = "";
	var cutoverName = "";
	if(self.controller.characterListType == CharacterListType.EXPEDITION){
		if(buttonCutover.name == CharacterListView.CUTOVER_ARM){
			cutoverName = CharacterListView.CUTOVER_BASIC;
			self.armTab.visible = false;
			self.basicTab.visible = true;
			self.abilityTab.visible = false;
		}else if(buttonCutover.name == CharacterListView.CUTOVER_BASIC){
			cutoverName = CharacterListView.CUTOVER_ABILITY;
			self.basicTab.visible = false;
			self.armTab.visible = false;
			self.abilityTab.visible = true;
		}else if(buttonCutover.name == CharacterListView.CUTOVER_ABILITY){
			cutoverName = CharacterListView.CUTOVER_ARM;
			self.armTab.visible = true;
			self.basicTab.visible = false;
			self.abilityTab.visible = false;
		}
	}else{
		if(buttonCutover.name == CharacterListView.CUTOVER_BASIC){
			cutoverName = CharacterListView.CUTOVER_ABILITY;
			self.basicTab.visible = false;
			self.abilityTab.visible = true;
		}else if(buttonCutover.name == CharacterListView.CUTOVER_ABILITY){
			cutoverName = CharacterListView.CUTOVER_BASIC;
			self.basicTab.visible = true;
			self.abilityTab.visible = false;
		}
	}
	buttonCutover.remove();
	self.getCutoverButton(cutoverName);
	self.cutoverChilds();
};
CharacterListView.prototype.cutoverChilds=function(){
	var self = this;
	var items = self.listView.getItems();
	for(var i=0,l=items.length;i<l;i++){
		var child = items[i];
		child.cutover(self.showingTabName, self.listView.isInClipping(i));
	}
};
CharacterListView.prototype.onClickCloseButton=function(event){
	this.controller.closeCharacterList({subEventType:"return"});
};
CharacterListView.prototype.showTabMenu=function(){
	var self = this;
	self.commonTab = new LSprite();
	self.commonTab.x = 10;
	self.tabMenuLayer.addChild(self.commonTab);
	var buttonSelected = getButton("↓",50);
	buttonSelected.name = "selected";
	self.commonTab.addChild(buttonSelected);
	
	var buttonCharacterName = getButton(Language.get("name"),110);
	buttonCharacterName.x = 50;
	buttonCharacterName.name = "characterName";
	self.commonTab.addChild(buttonCharacterName);
	self.commonTab.addEventListener(LMouseEvent.MOUSE_UP, self.onClickSortButton);
	self.setBasicTab();
	self.setAbilityTab();
	if(self.controller.characterListType == CharacterListType.EXPEDITION){
		self.setArmTab();
	}else if(self.controller.characterListType == CharacterListType.GAME_SINGLE_COMBAT){
		self.abilityTab.visible = true;
	}
};
CharacterListView.prototype.setBasicTab=function(){
	var self = this;
	self.basicTab = new LSprite();
	self.basicTab.x = 170;
	self.tabMenuLayer.addChild(self.basicTab);
	var tabs = ["belong", "identity", "city", "loyalty", "status"];
	for(var i=0;i<tabs.length;i++){
		var button = getButton(Language.get(tabs[i]),60);
		button.name = tabs[i];
		button.x = 60 * i;
		self.basicTab.addChild(button);
	}
	self.basicTab.addEventListener(LMouseEvent.MOUSE_UP, self.onClickSortButton);
};
CharacterListView.prototype.setAbilityTab=function(){
	var self = this;
	self.abilityTab = new LSprite();
	self.abilityTab.x = 170;
	self.tabMenuLayer.addChild(self.abilityTab);
	var tabs = ["command", "force", "intelligence", "agility", "luck"];
	for(var i=0;i<tabs.length;i++){
		var button = getButton(Language.get(tabs[i]),60);
		button.name = tabs[i];
		button.x = 60 * i;
		self.abilityTab.addChild(button);
	}
	self.abilityTab.addEventListener(LMouseEvent.MOUSE_UP, self.onClickSortButton);
	self.abilityTab.visible = false;
};
CharacterListView.prototype.onClickSortButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	if(self.sortType == event.target.name){
		self.sortValue *= -1;
	}
	self.sortType = event.target.name;
	switch(event.target.name){
		case "selected":
			break;
		case "characterName":
			break;
		case "city":
			break;
		case "status":
			break;
		case "identity":
			break;
		case "belong":
			break;
		default:
			self.dataList = self.dataList.sort(function(a,b){
				var va = a[self.sortType]();
				var vb = b[self.sortType]();
				return self.sortValue*((typeof va == "number" ? va : 0) - (typeof vb == "number" ? vb : 0));
			});
			var selects = [];
			self.listView.getItems().forEach(function(child){
				if(!child.checkbox.checked){
					return;
				}
				selects.push(child.charaModel.id());
			});
			self.charactersPush(0);
			self.cutoverChilds();
			self.listView.getItems().forEach(function(child){
				if(selects.indexOf(child.charaModel.id()) >= 0){
					child.checkbox.setChecked(true);
					child.cacheAsBitmap(false);
					child.updateView();
				}
			});
	}
};
CharacterListView.prototype.setArmTab=function(){
	var self = this;
	self.armTab = new LSprite();
	self.armTab.x = 170;
	self.tabMenuLayer.addChild(self.armTab);
	var tabs = ["troops", "tab_arms"];
	var tabSize = [120, 100];
	for(var i=0;i<tabs.length;i++){
		var button = getButton(Language.get(tabs[i]),tabSize[i]);
		button.name = tabs[i];
		button.x = self.armTab.getWidth();
		self.armTab.addChild(button);
	}
	self.basicTab.visible = false;
};
CharacterListView.prototype.showList=function(){
	var self = this;
	var listHeight = LGlobal.height - self.contentLayer.y;
	var minusHeight = 70;
	if(self.controller.params.showMoney){
		minusHeight = 100;
	}
	listHeight = LGlobal.height - self.contentLayer.y - minusHeight;
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height - self.contentLayer.y));
	self.contentLayer.addChild(panel);
	
	self.listView = new LListView();
	self.listView.y = 15;
	self.listView.resize(LGlobal.width - 20,listHeight - 30);
	self.listView.cellWidth = LGlobal.width - 20;
	self.listView.cellHeight = 50;
	self.contentLayer.addChild(self.listView);
	self.charactersPush(0);
};
CharacterListView.prototype.charactersPush = function(pageIndex) {
	var self = this;
	self.pageIndex = pageIndex;
	var scHeight = 0, maxNum = 50;
	var child, length = self.dataList.length < pageIndex * maxNum + maxNum ? self.dataList.length : pageIndex * maxNum + maxNum;
	var cityModel = self.controller.getValue("cityData");
	var items = [];
	self.listView.clear();
	for(var i=pageIndex * maxNum;i<length;i++){
		var charaModel = self.dataList[i];
		var childLayer = new CharacterListChildView(self.controller,charaModel,cityModel,self);
		childLayer.y = 50 * i;
		items.push(childLayer);
	}
	self.listView.updateList(items);
	var maxPageIndex = self.dataList.length / maxNum >>> 0;
	self.pageLabel.text = String.format("{0} / {1}", pageIndex + 1, maxPageIndex + 1);
	var leftButton = self.listLayer.getChildByName("leftButton");
	leftButton.visible = (pageIndex > 0);
	var rightButton = self.listLayer.getChildByName("rightButton");
	rightButton.visible = (pageIndex < maxPageIndex);
};
CharacterListView.prototype.showCharacterDetailed=function(param){
	var self = this;
	var characterDetailed = new CharacterDetailedView(self.controller, param);
	self.charaDetailedLayer.addChild(characterDetailed);
	if(!self.listView){
		return;
	}
	self.listLayer.visible = false;
};
CharacterListView.prototype.showCharacterList=function(){
	var self = this;
	self.charaDetailedLayer.removeAllChild();
	switch(self.controller.characterListType){
		case CharacterListType.BATTLE_SINGLE:
		self.remove();
		return;
	}
	self.listLayer.visible = true;
};
