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
};
CharacterListView.prototype.listInit=function(){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	var generals = cityModel.generals();
	var outOfOffice = cityModel.outOfOffice();
	
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
	switch(self.controller.characterListType){
		case CharacterListType.CHARACTER_LIST:
			title.text = Language.get(CharacterListType.CHARACTER_LIST);
			self.dataList = generals.concat(outOfOffice);
			break;
		case CharacterListType.CHARACTER_MOVE:
			title.text = Language.get(CharacterListType.CHARACTER_MOVE);
			var buttonMove = getButton(Language.get("move_start"),200);
			buttonMove.x = (LGlobal.width - 200) * 0.5;
			buttonMove.y = LGlobal.height - buttonMove.getHeight() - 15;
			self.addChild(buttonMove);
			buttonMove.addEventListener(LMouseEvent.MOUSE_UP, self.onClickMoveButton.bind(self));
			self.dataList = generals;
			break;
		case CharacterListType.AGRICULTURE:
			title.text = Language.get(CharacterListType.AGRICULTURE);
			var button = getButton(Language.get("agriculture"),200);
			button.x = (LGlobal.width - 200) * 0.5;
			button.y = LGlobal.height - button.getHeight() - 15;
			self.addChild(button);
			button.addEventListener(LMouseEvent.MOUSE_UP, self.onClickAgricultureButton);
			self.dataList = generals;
			break;
	}
	self.showList();
};
CharacterListView.prototype.onClickAgricultureButton=function(event){
	var self = event.currentTarget.parent, checked = false;
	self.listChildLayer.childList.forEach(function(child){
		if(child.constructor.name !== "CharacterListChildView" || !child.checkbox.checked){
			return;
		}
		child.charaModel.job(Job.AGRICULTURE);
		checked = true;
	});
	if(checked){
		self.controller.fromController.closeCharacterList();
	}else{
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_generals"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		self.addChild(windowLayer);
	}
};
CharacterListView.prototype.getCutoverButton=function(name){
	var self = this;
	self.showingTabName = name;
	var buttonCutover = getButton(String.format("{0} ({1})",Language.get(name),Language.get("cutover")),200);
	buttonCutover.x = 210;
	buttonCutover.y = 5;
	buttonCutover.name = name;
	self.listLayer.addChild(buttonCutover);console.log("getCutoverButton self",self," self.listLayer" , self.listLayer+",self.listLayer.parent" , self.listLayer.parent);
	buttonCutover.addEventListener(LMouseEvent.MOUSE_UP, self.onClickCutoverButton);
};
CharacterListView.prototype.onClickCutoverButton=function(event){
	var buttonCutover = event.currentTarget, self = buttonCutover.parent.parent, cutoverName = "";
	var cutoverName = "";
	if(buttonCutover.name == CharacterListView.CUTOVER_BASIC){
		buttonCutover.remove();
		cutoverName = CharacterListView.CUTOVER_ABILITY;
		self.getCutoverButton(cutoverName);
		self.basicTab.visible = false;
		self.abilityTab.visible = true;
	}else if(buttonCutover.name == CharacterListView.CUTOVER_ABILITY){
		buttonCutover.remove();
		cutoverName = CharacterListView.CUTOVER_BASIC;
		self.getCutoverButton(cutoverName);
		self.basicTab.visible = true;
		self.abilityTab.visible = false;
	}
	self.listChildLayer.childList.forEach(function(child){
		if(child.constructor.name == "CharacterListChildView"){
			child.cutover(cutoverName);
		}
	});
};
CharacterListView.prototype.onClickMoveButton=function(event){
	var self = this, moveCount = 0;
	var checkSelectCharacter = self.listChildLayer.childList.find(function(child){
		return child.constructor.name == "CharacterListChildView" && child.checkbox.checked;
	});
	if(checkSelectCharacter){
		self.controller.fromController.addEventListener(LCityEvent.SELECT_CITY, self.moveToCity);
		self.controller.toSelectMap(checkSelectCharacter.charaModel.name());
	}else{
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_generals"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		self.addChild(windowLayer);
	}
};
CharacterListView.prototype.moveToCity=function(event){
	console.log("moveToCity",event);
	var contentLayer = event.currentTarget.view.contentLayer;
	var self = contentLayer.getChildAt(contentLayer.numChildren - 1);
	//console.log("characterListView",characterListView);
	//var contentLayer = contentLayer.getChildAt(contentLayer.numChildren - 1).contentLayer;
	//var self = contentLayer.getChildAt(contentLayer.numChildren - 1);
	var controller = self.controller;
	self.listChildLayer.childList.forEach(function(child){
		if(child.constructor.name !== "CharacterListChildView" || !child.checkbox.checked){
			return;
		}
		child.charaModel.moveTo(event.cityId);
		//child.charaModel.job(Job.MOVE);
	});
	var fromController = controller.fromController;
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.moveToCity);
	controller.closeCharacterList();
	fromController.showCharacterList();
	return;
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
	var buttonExpedition = getButton(Language.get("belong"),60);
	self.basicTab.addChild(buttonExpedition);
	var buttonExpedition = getButton(Language.get("identity"),60);
	buttonExpedition.x = 60;
	self.basicTab.addChild(buttonExpedition);
	var buttonExpedition = getButton(Language.get("city"),60);
	buttonExpedition.x = 60*2;
	self.basicTab.addChild(buttonExpedition);
	var buttonExpedition = getButton(Language.get("loyalty"),60);
	buttonExpedition.x = 60*3;
	self.basicTab.addChild(buttonExpedition);
	var buttonExpedition = getButton(Language.get("status"),60);
	buttonExpedition.x = 60*4;
	self.basicTab.addChild(buttonExpedition);
};
CharacterListView.prototype.setAbilityTab=function(){
	var self = this;
	self.abilityTab = new LSprite();
	self.abilityTab.x = 170;
	self.tabMenuLayer.addChild(self.abilityTab);
	var buttonExpedition = getButton(Language.get("command"),60);
	self.abilityTab.addChild(buttonExpedition);
	var buttonExpedition = getButton(Language.get("force"),60);
	buttonExpedition.x = 60;
	self.abilityTab.addChild(buttonExpedition);
	var buttonExpedition = getButton(Language.get("intelligence"),60);
	buttonExpedition.x = 60*2;
	self.abilityTab.addChild(buttonExpedition);
	var buttonExpedition = getButton(Language.get("agility"),60);
	buttonExpedition.x = 60*3;
	self.abilityTab.addChild(buttonExpedition);
	var buttonExpedition = getButton(Language.get("luck"),60);
	buttonExpedition.x = 60*4;
	self.abilityTab.addChild(buttonExpedition);
	self.abilityTab.visible = false;
};
CharacterListView.prototype.showList=function(){
	var self = this;
	var listHeight = LGlobal.height - self.contentLayer.y;
	if(self.controller.characterListType != CharacterListType.CHARACTER_LIST){
		listHeight = LGlobal.height - self.contentLayer.y - 70;
	}
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
