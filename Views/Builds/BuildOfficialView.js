/**
 * 官府
 * 出征，武将一览，谍报，外交
 */
function BuildOfficialView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"official"]);
}
BuildOfficialView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	if(self.controller.getValue("selfCity")){
		var cityModel = self.controller.getValue("cityData");
		if(cityModel.prefecture() != cityModel.seigniorCharaId()){
			var buttonPrefecture = getButton(Language.get("appoint_prefecture"),200);
			buttonPrefecture.y = menuY;
			layer.addChild(buttonPrefecture);
			buttonPrefecture.addEventListener(LMouseEvent.MOUSE_UP, self.onClickPrefectureButton.bind(self));
			menuY += menuHeight;
		}
		var buttonGeneralsList = getButton(Language.get("generals_list"),200);
		buttonGeneralsList.y = menuY;
		layer.addChild(buttonGeneralsList);
		buttonGeneralsList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsListButton.bind(self));
		
		menuY += menuHeight;
		var buttonGeneralsMove = getButton(Language.get("generals_move"),200);
		buttonGeneralsMove.y = menuY;
		layer.addChild(buttonGeneralsMove);
		buttonGeneralsMove.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsMoveButton.bind(self));
		
		menuY += menuHeight;
		var buttonGeneralsMove = getButton(Language.get("transport"),200);
		buttonGeneralsMove.y = menuY;
		layer.addChild(buttonGeneralsMove);
		buttonGeneralsMove.addEventListener(LMouseEvent.MOUSE_UP, self.onClickTransportButton.bind(self));
		
		menuY += menuHeight;
		var buttonSpy = getButton(Language.get("spy"),200);
		buttonSpy.y = menuY;
		layer.addChild(buttonSpy);
		buttonSpy.addEventListener(LMouseEvent.MOUSE_UP, self.onClickSpyButton.bind(self));
		
		menuY += menuHeight;
		var buttonDiplomacy = getButton(Language.get("diplomacy"),200);
		buttonDiplomacy.y = menuY;
		layer.addChild(buttonDiplomacy);
		buttonDiplomacy.addEventListener(LMouseEvent.MOUSE_UP, self.onClickDiplomacyButton.bind(self));
	}else{
		var buttonGeneralsList = getButton(Language.get("generals_list"),200);
		buttonGeneralsList.y = menuY;
		layer.addChild(buttonGeneralsList);
		buttonGeneralsList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsListButton.bind(self));
	}
	
	return layer;
};
BuildOfficialView.prototype.onClickPrefectureButton=function(event){
	var self = this;
	self.controller.loadCharacterList(CharacterListType.APPOINT_PREFECTURE,self);
};
BuildOfficialView.prototype.onClickDiplomacyButton=function(event){
	var self = this;
	var parent = self.parent;
	var controller = self.controller;
	self.remove();
	var buildDiplomacy = new BuildDiplomacyView(controller);
	parent.addChild(buildDiplomacy);
};
BuildOfficialView.prototype.onClickTransportButton=function(event){
	var self = this;
	self.characterListType = CharacterListType.TRANSPORT;
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.transportSelectCharacter);
	self.controller.toSelectMap(CharacterListType.TRANSPORT);
};
BuildOfficialView.prototype.transportSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildOfficialView";
	});
	self.controller.setValue("cityId", event.cityId);
	console.log("event.cityId = " + event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.transportSelectCharacter);
	controller.loadCharacterList(CharacterListType.TRANSPORT,self);
};
/*BuildOfficialView.prototype.onClickExpeditionButton=function(event){
	var self = this;
	//TODO::Testcode
	//self.controller.gotoBattle();
	self.characterListType = CharacterListType.EXPEDITION;
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.expeditionSelectCharacter);
	self.controller.toSelectMap(CharacterListType.EXPEDITION);
};
BuildOfficialView.prototype.expeditionSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildOfficialView";
	});
	self.controller.setValue("cityId", event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.expeditionSelectCharacter);
	controller.loadCharacterList(CharacterListType.EXPEDITION,self);
};*/
BuildOfficialView.prototype.onClickSpyButton=function(event){
	var self = this;
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.spySelectCharacter);
	self.controller.toSelectMap(CharacterListType.CHARACTER_SPY);
};
BuildOfficialView.prototype.onClickGeneralsListButton=function(event){
	var self = this;
	self.controller.loadCharacterList(CharacterListType.CHARACTER_LIST,self);
};
BuildOfficialView.prototype.onClickGeneralsMoveButton=function(event){
	var self = this;
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.moveSelectCharacter);
	self.controller.toSelectMap(CharacterListType.CHARACTER_MOVE);
};
BuildOfficialView.prototype.spySelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildOfficialView";
	});
	self.controller.setValue("cityId", event.cityId);
	console.log("spy event.cityId = " + event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.spySelectCharacter);
	controller.loadCharacterList(CharacterListType.CHARACTER_SPY,self);
};
BuildOfficialView.prototype.moveSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildOfficialView";
	});
	self.controller.setValue("cityId", event.cityId);
	console.log("event.cityId = " + event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.moveSelectCharacter);
	controller.loadCharacterList(CharacterListType.CHARACTER_MOVE,self);
};
BuildOfficialView.prototype.selectComplete=function(event){
	var self = this;
	console.log("BuildOfficialView.prototype.selectComplete event = " , event);
	var characterList = event.characterList;
	var cityId = self.controller.getValue("cityId");
	if(!characterList){
		return true;
	}
	if(event.characterListType == CharacterListType.APPOINT_PREFECTURE){
		if(characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}
		var city = self.controller.getValue("cityData");
		city.prefecture(event.characterList[0].id());
	}else if(event.characterListType == CharacterListType.CHARACTER_MOVE){
		self.controller.setValue("cityId", null);
		event.characterList.forEach(function(child){
			child.moveTo(cityId);
		});
	}else if(event.characterListType == CharacterListType.CHARACTER_SPY){
		self.controller.setValue("cityId", null);
		event.characterList.forEach(function(child){
			child.spy(cityId);
		});
	}else if(event.characterListType == CharacterListType.TRANSPORT){
		if(event.characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}else{
			self.controller.setValue("transportCharacter", event.characterList[0]);
			return true;
		}
	}
	return true;
};
BuildOfficialView.prototype.showBuild=function(event){
	var contentLayer = event.currentTarget.view.contentLayer;
	var self = contentLayer.childList.find(function(child){
		return child.isBuildBaseView;
	});
	var result = self.callParent("showBuild",arguments);
	if(!result){
		return;
	}
	console.log("event.subEventType = " ,event.subEventType,"event.characterListType =",event.characterListType);
	if(event.subEventType == "return"){
		return;
	}
	if(!self.load){
		self.load = new LMvcLoader(self);
	}
	if(event.characterListType == CharacterListType.TRANSPORT){
		self.load.view(["Builds/ExpeditionReady"],self.expeditionReady);
	}
};
BuildOfficialView.prototype.expeditionReady=function(){
	var self = this;
	var readyView = new ExpeditionReadyView(self.controller);
	var obj = {title:Language.get("transport"),subWindow:readyView,width:480,height:540,okEvent:self.expeditionReadyComplete,cancelEvent:self.expeditionCancel};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
	self.menuLayer.visible = false;
};
BuildOfficialView.prototype.expeditionCancel=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.parent;
	windowLayer.remove();
	self.controller.loadCharacterList(CharacterListType.TRANSPORT,self);
};
BuildOfficialView.prototype.expeditionReadyComplete=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.parent;
	var readyView = windowLayer.childList.find(function(child){
		return child.constructor.name == "ExpeditionReadyView";
	});
	var data = readyView.getData();
	var characterModel = self.controller.getValue("transportCharacter");
	windowLayer.remove();
	data.cityId = self.controller.getValue("cityId");
	characterModel.transport(data);
	self.controller.dispatchEvent(LController.NOTIFY_ALL);
	self.menuLayer.visible = true;
};