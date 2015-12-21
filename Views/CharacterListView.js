function CharacterListView(){
	base(this,LView,[]);
}
CharacterListView.prototype.construct=function(){
	this.sortValue = 1;
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
CharacterListView.CUTOVER_BASIC = "basic_properties";
CharacterListView.CUTOVER_ABILITY = "ability_properties";
CharacterListView.CUTOVER_ARM = "arm_properties";
CharacterListView.prototype.init=function(){
	var self = this;
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
		
	var title = getStrokeLabel("",30,"#FFFFFF","#000000",4);
	title.x = 15;
	title.y = 10;
	self.listLayer.addChild(title);
	
	self.getCutoverButton(self.controller.characterListType == CharacterListType.EXPEDITION ? CharacterListView.CUTOVER_ARM : CharacterListView.CUTOVER_BASIC);
	if(!SeigniorExecute.running || self.controller.characterListType != CharacterListType.EXPEDITION){
		var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
		var buttonClose = new LButton(bitmapClose);
		buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
		self.listLayer.addChild(buttonClose);
		buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.onClickCloseButton.bind(self));
	}
	self.tabMenuLayer = new LSprite();
	self.tabMenuLayer.y = 60;
	self.listLayer.addChild(self.tabMenuLayer);
	self.showTabMenu();
	
	self.contentLayer = new LSprite();
	self.contentLayer.y = 110;
	self.listLayer.addChild(self.contentLayer);
	
	title.text = Language.get(self.controller.characterListType);
	var buttonLabel = null, showMoney = false;
	switch(self.controller.characterListType){
		case CharacterListType.TEST:
			buttonLabel = "execute";
			self.dataList = generals;
			break;
		case CharacterListType.CHARACTER_LIST:
			self.dataList = generals.concat(cityModel.outOfOffice()).concat(cityModel.captives());
			break;
		case CharacterListType.HIRE:
			buttonLabel = "hire";
			self.dataList = cityModel.outOfOffice();
			break;
		case CharacterListType.SELECT_LEADER:
			buttonLabel = "execute";
			self.dataList = self.controller.fromController.getValue("expeditionCharacterList");
			Toast.makeText(Language.get("dialog_expedition_select_leader")).show();
			break;
		case CharacterListType.CAPTIVE:
			buttonLabel = "redeem";
		case CharacterListType.BATTLE_CHARACTER_LIST:
			self.dataList = self.controller.characterList;
			break;
		case CharacterListType.STOP_BATTLE:
			self.dataList = self.controller.characterList;
			buttonLabel = "select_seignior";
			break;
		default:
			buttonLabel = "execute";
			showMoney = true;
			self.dataList = cityModel.generals(Job.IDLE);
			Toast.makeText(Language.get("dialog_select_generals")).show();
			switch(self.controller.characterListType){
				case CharacterListType.CHARACTER_MOVE:
					buttonLabel = "move_start";
				case CharacterListType.ENLIST:
				case CharacterListType.CHARACTER_HIRE:
				case CharacterListType.EXPEDITION:
				case CharacterListType.TRANSPORT:
				case CharacterListType.ACCESS:
				case CharacterListType.EXPLORE_AGRICULTURE:
				case CharacterListType.EXPLORE_BUSINESS:
				case CharacterListType.REDEEM:
				case CharacterListType.STOP_BATTLE_CHARACTER:
				case CharacterListType.TRAINING:
					showMoney = false;
					break;
			}
			break;
	}
	console.log("listInit datalist="+self.dataList);
	console.log("listInit buttonLabel="+buttonLabel);
	if(buttonLabel){
		var button = getButton(Language.get(buttonLabel),200);
		self.executeButton = button;
		button.x = (LGlobal.width - 200) * 0.5;
		button.y = LGlobal.height - button.getHeight() - 15;
		self.listLayer.addChild(button);
		button.addEventListener(LMouseEvent.MOUSE_UP, self.onClickExecuteButton);
		self.addEventListener(LCheckBox.ON_CHANGE, self.onChangeChildSelect);
		if(showMoney){
			var lblMoney = getStrokeLabel(String.format("{0}：{1} - {2} = {3}", Language.get("money"), cityModel.moneyLabel(), 0, cityModel.moneyLabel()),26,"#FFFFFF","#000000",4);
			lblMoney.x = (LGlobal.width - lblMoney.getWidth()) * 0.5;
			lblMoney.y = button.y - lblMoney.getHeight() - 10;
			self.lblMoney = lblMoney;
			self.addChild(lblMoney);
		}
	}
	self.showList();
};
CharacterListView.prototype.onChangeChildSelect=function(event){
	var self = event.currentTarget,selectedCount=0;
	self.listView.getItems().forEach(function(child){
		if(!child.checkbox.checked){
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
	var self = event.currentTarget.parent;
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
	if(characterListType == CharacterListType.TEST){
		return;
	}
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
	var items = self.listView.getItems();
	for(var i=0,l=items.length;i<l;i++){
		var child = items[i];
		child.cutover(cutoverName, self.listView.isInClipping(i));
	}
};
CharacterListView.prototype.onClickCloseButton=function(event){
	var self = this;
	if(self.controller.characterListType == CharacterListType.CHARACTER_HIRE){
		fromController.hireCharacter = null;
	}
	self.controller.closeCharacterList({subEventType:"return"});
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
	console.log("onClickSortButton", event.target.name);
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
			var items = self.listView.getItems().sort(function(a,b){
				var va = a.charaModel[self.sortType]();
				var vb = b.charaModel[self.sortType]();
				return self.sortValue*((typeof va == "number" ? va : 0) - (typeof vb == "number" ? vb : 0));
			});
			self.listView.updateList(items);
			self.listView.clipping.y = 0;
			self.listView.updateView();
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
	console.log("showList run");
	var listHeight = LGlobal.height - self.contentLayer.y;
	var minusHeight = 0;
	switch(self.controller.characterListType){
		case CharacterListType.CHARACTER_LIST:
		case CharacterListType.BATTLE_CHARACTER_LIST:
			break;
		case CharacterListType.CHARACTER_MOVE:
		case CharacterListType.ENLIST:
		case CharacterListType.TRAINING:
		case CharacterListType.EXPEDITION:
		case CharacterListType.SELECT_LEADER:
			minusHeight = 70;
			break;
		default:
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
	self.charactersPush(self.dataList, 0);
};
CharacterListView.prototype.charactersPush = function(charas,characterIndex) {
	var self = this;
	var scHeight = 0, maxNum = 50;
	var child,length = charas.length < characterIndex + maxNum ? charas.length : characterIndex + maxNum;
	console.log("charactersPush:"+characterIndex+",length:"+length);
	var cityModel = self.controller.getValue("cityData");
	var items = self.listView.getItems();
	for(var i=characterIndex;i<length;i++){
		var charaModel = charas[i];
		var childLayer = new CharacterListChildView(self.controller,charaModel,cityModel,self);
		childLayer.y = 50 * i;
		items.push(childLayer);
	}
	self.listView.updateList(items);
	if(length < charas.length){
		setTimeout(function(){
			self.charactersPush(charas, length);
		},LGlobal.speed);
	}
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
