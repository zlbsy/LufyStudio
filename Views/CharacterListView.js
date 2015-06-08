function CharacterListView(){
	base(this,LView,[]);
}
CharacterListView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
CharacterListView.CUTOVER_BASIC = "basic_properties";
CharacterListView.CUTOVER_ABILITY = "ability_properties";
CharacterListView.prototype.init=function(){
	var self = this;
	self.listLayer = new LSprite();
	self.addChild(self.listLayer);
	self.charaDetailedLayer = new LSprite();
	self.addChild(self.charaDetailedLayer);
	self.listInit();
	Toast.makeText(Language.get("dialog_select_generals")).show();
};
CharacterListView.prototype.listInit=function(){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	var generals = cityModel.generals();
	var outOfOffice = cityModel.outOfOffice();
	self.selectedCount = 0;
	self.overageMoney = cityModel.money();
	self.usedMoney = 0;
	var title = getStrokeLabel("",30,"#FFFFFF","#000000",4);
	title.x = 15;
	title.y = 10;
	self.listLayer.addChild(title);
	
	self.getCutoverButton(CharacterListView.CUTOVER_BASIC);
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	self.listLayer.addChild(buttonClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.onClickCloseButton.bind(self));
	
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
		case CharacterListType.CHARACTER_LIST:
			self.dataList = generals.concat(outOfOffice);
			break;
		case CharacterListType.CHARACTER_MOVE:
			buttonLabel = "move_start";
			self.dataList = cityModel.generals(Job.IDLE);
			break;
		case CharacterListType.ENLIST:
			buttonLabel = "execute";
			self.dataList = cityModel.generals(Job.IDLE);
			break;
		default:
			buttonLabel = "execute";
			showMoney = true;
			self.dataList = cityModel.generals(Job.IDLE);
			break;
	}
	if(buttonLabel){
		var button = getButton(Language.get(buttonLabel),200);
		button.x = (LGlobal.width - 200) * 0.5;
		button.y = LGlobal.height - button.getHeight() - 15;
		self.addChild(button);
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
	self.listChildLayer.childList.forEach(function(child){
		if(child.constructor.name !== "CharacterListChildView" || !child.checkbox.checked){
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
	}else if(self.overageMoney < 0 && self.controller.characterListType != CharacterListType.CHARACTER_MOVE){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_no_money"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		self.addChild(windowLayer);
		return;
	}
	if(self.controller.characterListType == CharacterListType.CHARACTER_MOVE){
		var checkSelectCharacter = self.listChildLayer.childList.find(function(child){
			return child.constructor.name == "CharacterListChildView" && child.checkbox.checked;
		});
		self.controller.fromController.addEventListener(LCityEvent.SELECT_CITY, self.moveToCity);
		self.controller.toSelectMap(checkSelectCharacter.charaModel.name());
	}else if(self.controller.characterListType == CharacterListType.ENLIST){
		var armListController = self.controller.fromController;
		armListController.selectCharacters = [];
		self.listChildLayer.childList.forEach(function(child){
			if(child.constructor.name !== "CharacterListChildView" || !child.checkbox.checked){
				return;
			}
			armListController.selectCharacters.push(child.charaModel);
		});
		self.controller.fromController.closeCharacterList();
	}else{
		self.listChildLayer.childList.forEach(function(child){
			if(child.constructor.name !== "CharacterListChildView" || !child.checkbox.checked){
				return;
			}
			var jobContent = characterListType2JobType(self.controller.characterListType);
			child.charaModel.job(jobContent);
		});
		var cityModel = self.controller.getValue("cityData");
		cityModel.money(-self.usedMoney);
		self.controller.fromController.closeCharacterList();
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
	if(buttonCutover.name == CharacterListView.CUTOVER_BASIC){
		cutoverName = CharacterListView.CUTOVER_ABILITY;
		self.basicTab.visible = false;
		self.abilityTab.visible = true;
	}else if(buttonCutover.name == CharacterListView.CUTOVER_ABILITY){
		cutoverName = CharacterListView.CUTOVER_BASIC;
		self.basicTab.visible = true;
		self.abilityTab.visible = false;
	}
	buttonCutover.remove();
	self.getCutoverButton(cutoverName);
	self.listChildLayer.childList.forEach(function(child){
		if(child.constructor.name == "CharacterListChildView"){
			child.cutover(cutoverName);
		}
	});
};
CharacterListView.prototype.moveToCity=function(event){
	console.log("moveToCity",event);
	var contentLayer = event.currentTarget.view.contentLayer;
	var self = contentLayer.getChildAt(contentLayer.numChildren - 1);
	var controller = self.controller;
	self.listChildLayer.childList.forEach(function(child){
		if(child.constructor.name !== "CharacterListChildView" || !child.checkbox.checked){
			return;
		}
		child.charaModel.moveTo(event.cityId);
	});
	var fromController = controller.fromController;
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.moveToCity);
	controller.closeCharacterList();
	fromController.showCharacterList();
};
CharacterListView.prototype.onClickCloseButton=function(event){
	this.controller.closeCharacterList();
};
CharacterListView.prototype.showTabMenu=function(){
	var self = this;
	var buttonExpedition = getButton("↓",50);
	buttonExpedition.x = 10;
	self.tabMenuLayer.addChild(buttonExpedition);
	
	var buttonExpedition = getButton(Language.get("name"),110);
	buttonExpedition.x = 60;
	self.tabMenuLayer.addChild(buttonExpedition);
	
	self.setBasicTab();
	self.setAbilityTab();
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
	self.abilityTab.visible = false;
};
CharacterListView.prototype.showList=function(){
	var self = this;
	var listHeight = LGlobal.height - self.contentLayer.y;
	var minusHeight = 0;
	switch(self.controller.characterListType){
		case CharacterListType.CHARACTER_LIST:
			break;
		case CharacterListType.CHARACTER_MOVE:
		case CharacterListType.ENLIST:
			minusHeight = 70;
			break;
		default:
			minusHeight = 100;
	}
	listHeight = LGlobal.height - self.contentLayer.y - minusHeight;
	var panel = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win05"]),LGlobal.width, LGlobal.height - self.contentLayer.y));
	self.contentLayer.addChild(panel);
	
	var cityModel = self.controller.getValue("cityData");
	self.listChildLayer = new LSprite();
	var scHeight = 0;
	for(var i=0,l=self.dataList.length;i<l;i++){
		var charaModel = self.dataList[i];
		var childLayer = new CharacterListChildView(self.controller,charaModel,cityModel,self);
		childLayer.y = 50 * i;
		self.listChildLayer.addChild(childLayer);
		if(i < l - 1){
			continue;
		}
		scHeight = childLayer.y + childLayer.getHeight();
	}
	self.listChildLayer.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width - 30, scHeight]);
	var sc = new LScrollbar(self.listChildLayer, LGlobal.width - 20, listHeight - 30, 10);
	sc._showLayer.graphics.clear();
	sc.y = 15;
	self.contentLayer.addChild(sc);
	sc.excluding = true;
	self.listChildLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.characterClickDown);
	self.listChildLayer.addEventListener(LMouseEvent.MOUSE_UP, self.characterClickUp.bind(self));
};
CharacterListView.prototype.characterClickDown = function(event) {
	var chara = event.target;
	chara.offsetX = event.offsetX;
	chara.offsetY = event.offsetY;
};
CharacterListView.prototype.characterClickUp = function(event) {
	if(event.target.constructor.name != "CharacterListChildView"){
		return;
	}
	var self = this;
	var chara = event.target;
	if (chara.offsetX && chara.offsetY && 
		Math.abs(chara.offsetX - event.offsetX) < 5 && 
		Math.abs(chara.offsetY - event.offsetY) < 5 &&
		chara.hitTestPoint(event.offsetX, event.offsetY)) {
		self.showCharacterDetailed(chara.charaModel);
	}
};
CharacterListView.prototype.showCharacterDetailed=function(characterModel){
	var self = this;
	var characterDetailed = new CharacterDetailedView(self.controller, characterModel);
	self.charaDetailedLayer.addChild(characterDetailed);
	self.listChildLayer.visible = false;
};
CharacterListView.prototype.showCharacterList=function(){
	var self = this;
	self.charaDetailedLayer.removeAllChild();
	self.listChildLayer.visible = true;
};
