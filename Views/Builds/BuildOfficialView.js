/**
 * 官府
 * 出征，武将一览，谍报，
 * 外交:->选择外交势力->根据势力关系选择外交项目
 */
function BuildOfficialView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"official"]);
}
BuildOfficialView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	//var cityModel = self.controller.getValue("cityData");
	if(self.controller.getValue("selfCity")){
		var buttonExpedition = getButton(Language.get("expedition"),200);
		buttonExpedition.y = menuY;
		layer.addChild(buttonExpedition);
		buttonExpedition.addEventListener(LMouseEvent.MOUSE_UP, self.onClickExpeditionButton.bind(self));
		
		menuY += menuHeight;
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
BuildOfficialView.prototype.onClickDiplomacyButton=function(event){
	var self = this, menuY = 0, menuHeight = 55;
	self.menuLayer.removeAllChild();
	var menuLayer = new LSprite();
	var buttonRedeem = getButton(Language.get("redeem"),200);
	buttonRedeem.y = menuY;
	menuLayer.addChild(buttonRedeem);
	buttonRedeem.addEventListener(LMouseEvent.MOUSE_UP, self.onClickRedeemButton.bind(self));
		
	menuY += menuHeight;
	var buttonStopBattle = getButton(Language.get("stop_battle"),200);
	buttonStopBattle.y = menuY;
	menuLayer.addChild(buttonStopBattle);
	buttonStopBattle.addEventListener(LMouseEvent.MOUSE_UP, self.onClickStopBattleButton.bind(self));
	self.menuLayer.addChild(menuLayer);
	
	var build = self.controller.view.buildLayer.childList.find(function(child){
		return child.name == self.buildName;
	});
	self.setMenuPosition(build, menuLayer);
};
BuildOfficialView.prototype.onClickRedeemButton=function(event){
	var self = this;
	
};
BuildOfficialView.prototype.onClickStopBattleButton=function(event){
	var self = this;
	
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
BuildOfficialView.prototype.onClickExpeditionButton=function(event){
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
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.moveToCity);
	controller.loadCharacterList(CharacterListType.EXPEDITION,self);
};
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
	if(event.characterListType == CharacterListType.CHARACTER_MOVE){
		self.controller.setValue("cityId", null);
		event.characterList.forEach(function(child){
			child.moveTo(cityId);
		});
	}else if(event.characterListType == CharacterListType.CHARACTER_SPY){
		self.controller.setValue("cityId", null);
		event.characterList.forEach(function(child){
			child.spy(cityId);
		});
	}else if(event.characterListType == CharacterListType.EXPEDITION){
		var characterList = event.characterList;
		for(var i = 0,l = characterList.length;i<l;i++){
			if(characterList[i].troops() > 0){
				continue;
			}
			var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_character_troops_error"),characterList[i].name()),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}
		self.controller.setValue("expeditionCharacterList", characterList);
	}else if(event.characterListType == CharacterListType.SELECT_LEADER){
		if(event.characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_leader_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}else{
			self.controller.setValue("expeditionLeader",event.characterList[0]);
			self.controller.setValue("toCityId", cityId);
			return true;
		}
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
		if(event.characterListType == CharacterListType.EXPEDITION){
			var expeditionCharacterList = self.controller.getValue("expeditionCharacterList");
			var cityData = self.controller.getValue("cityData");
			troopsFromCharactersToCity(expeditionCharacterList, cityData);
			self.controller.setValue("expeditionCharacterList", null);
			self.controller.setValue("toCityId", null);
			self.controller.dispatchEvent(LController.NOTIFY_ALL);
		}else if(event.characterListType == CharacterListType.SELECT_LEADER){
			self.controller.loadCharacterList(CharacterListType.EXPEDITION,self);
		}
		return;
	}
	if(!self.load){
		self.load = new LMvcLoader(self);
	}
	if(event.characterListType == CharacterListType.EXPEDITION){
		self.controller.loadCharacterList(CharacterListType.SELECT_LEADER,self);
	}else if(event.characterListType == CharacterListType.SELECT_LEADER || event.characterListType == CharacterListType.TRANSPORT){
		self.load.view(["Builds/ExpeditionReady"],self.expeditionReady);
	}
};
BuildOfficialView.prototype.expeditionReady=function(){
	var self = this;
	var readyView = new ExpeditionReadyView(self.controller);
	//self.addChild(readyView);
	var obj = {title:Language.get(self.characterListType == CharacterListType.EXPEDITION ? "备战军资" : "transport"),subWindow:readyView,width:480,height:540,okEvent:self.expeditionReadyComplete,cancelEvent:self.expeditionCancel};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
	self.menuLayer.visible = false;
};
BuildOfficialView.prototype.expeditionCancel=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.parent;
	windowLayer.remove();
	self.menuLayer.visible = true;
};
BuildOfficialView.prototype.expeditionReadyComplete=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.parent;
	var readyView = windowLayer.childList.find(function(child){
		return child.constructor.name == "ExpeditionReadyView";
	});
	var data = readyView.getData();
	if(self.characterListType == CharacterListType.EXPEDITION){
		data.expeditionCharacterList = self.controller.getValue("expeditionCharacterList");
		data.expeditionLeader = self.controller.getValue("expeditionLeader");
		windowLayer.remove();
		self.controller.setValue("battleData",data);
		self.controller.gotoBattle();
	}else if(self.characterListType == CharacterListType.TRANSPORT){
		var characterModel = self.controller.getValue("transportCharacter");
		windowLayer.remove();
		data.cityId = self.controller.getValue("cityId");
		characterModel.transport(data);
		self.controller.dispatchEvent(LController.NOTIFY_ALL);
		self.menuLayer.visible = true;
	}
};