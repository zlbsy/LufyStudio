/**
 * 外交
 */
function BuildDiplomacyView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"official"]);
}
BuildDiplomacyView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var buttonRedeem = getButton(Language.get("redeem"),200);
	buttonRedeem.y = menuY;
	layer.addChild(buttonRedeem);
	buttonRedeem.addEventListener(LMouseEvent.MOUSE_UP, self.onClickRedeemButton.bind(self));
		
	menuY += menuHeight;
	var buttonStopBattle = getButton(Language.get("stop_battle"),200);
	buttonStopBattle.y = menuY;
	layer.addChild(buttonStopBattle);
	buttonStopBattle.addEventListener(LMouseEvent.MOUSE_UP, self.onClickStopBattleButton.bind(self));
	return layer;
};
BuildDiplomacyView.prototype.onClickRedeemButton=function(event){
	var self = this;
	var captivedList = SeigniorModel.getSeignior(LMvc.selectSeignorId).getCaptivedList();
	if(captivedList.length == 0){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_no_captived_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
		return;
	}
	self.characterListType = CharacterListType.REDEEM;
	self.controller.loadCharacterList(CharacterListType.CAPTIVE,captivedList);
};
BuildDiplomacyView.prototype.onClickStopBattleButton=function(event){
	var self = this;
	
};
BuildDiplomacyView.prototype.onClickTransportButton=function(event){
	var self = this;
	self.characterListType = CharacterListType.TRANSPORT;
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.transportSelectCharacter);
	self.controller.toSelectMap(CharacterListType.TRANSPORT);
};
BuildDiplomacyView.prototype.transportSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildOfficialView";
	});
	self.controller.setValue("cityId", event.cityId);
	console.log("event.cityId = " + event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.transportSelectCharacter);
	controller.loadCharacterList(CharacterListType.TRANSPORT,self);
};
BuildDiplomacyView.prototype.onClickExpeditionButton=function(event){
	var self = this;
	//TODO::Testcode
	//self.controller.gotoBattle();
	self.characterListType = CharacterListType.EXPEDITION;
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.expeditionSelectCharacter);
	self.controller.toSelectMap(CharacterListType.EXPEDITION);
};
BuildDiplomacyView.prototype.expeditionSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildOfficialView";
	});
	self.controller.setValue("cityId", event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.moveToCity);
	controller.loadCharacterList(CharacterListType.EXPEDITION,self);
};
BuildDiplomacyView.prototype.onClickSpyButton=function(event){
	var self = this;
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.spySelectCharacter);
	self.controller.toSelectMap(CharacterListType.CHARACTER_SPY);
};
BuildDiplomacyView.prototype.onClickGeneralsListButton=function(event){
	var self = this;
	self.controller.loadCharacterList(CharacterListType.CHARACTER_LIST,self);
};
BuildDiplomacyView.prototype.onClickGeneralsMoveButton=function(event){
	var self = this;
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.moveSelectCharacter);
	self.controller.toSelectMap(CharacterListType.CHARACTER_MOVE);
};
BuildDiplomacyView.prototype.spySelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildOfficialView";
	});
	self.controller.setValue("cityId", event.cityId);
	console.log("spy event.cityId = " + event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.spySelectCharacter);
	controller.loadCharacterList(CharacterListType.CHARACTER_SPY,self);
};
BuildDiplomacyView.prototype.moveSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildOfficialView";
	});
	self.controller.setValue("cityId", event.cityId);
	console.log("event.cityId = " + event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.moveSelectCharacter);
	controller.loadCharacterList(CharacterListType.CHARACTER_MOVE,self);
};
BuildDiplomacyView.prototype.selectComplete=function(event){
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
	}else if(event.characterListType == CharacterListType.REDEEM){
		if(event.characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}else{
			self.controller.setValue("redeemCharacterId", event.characterList[0]);
			//event.characterList[0].redeem(self.controller.getValue("captiveCharacterId"));
			return true;
		}
	}else if(event.characterListType == CharacterListType.CAPTIVE){
		
		if(event.characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}else{
			self.controller.setValue("captiveCharacterId", event.characterList[0].id());
			return true;
		}
	}
	return true;
};
BuildDiplomacyView.prototype.showBuild=function(event){
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
	if(event.characterListType == CharacterListType.CAPTIVE){
		self.controller.loadCharacterList(CharacterListType.REDEEM,self);
	}else if(event.characterListType == CharacterListType.REDEEM){
		self.load.view(["Builds/ExpeditionReady"],self.expeditionReady);
	}
};
BuildDiplomacyView.prototype.expeditionReady=function(){
	var self = this;
	var readyView = new ExpeditionReadyView(self.controller);
	var obj = {title:Language.get(self.characterListType == CharacterListType.REDEEM ? "赎金" : "transport"),subWindow:readyView,width:480,height:540,okEvent:self.expeditionReadyComplete,cancelEvent:self.expeditionCancel};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
	self.menuLayer.visible = false;
};
BuildDiplomacyView.prototype.expeditionCancel=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.parent;
	windowLayer.remove();
	self.menuLayer.visible = true;
};
BuildDiplomacyView.prototype.expeditionReadyComplete=function(event){
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