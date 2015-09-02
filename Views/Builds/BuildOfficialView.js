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
	var cityModel = self.controller.getValue("cityData");
	if(LMvc.selectSeignorId == cityModel.seignior_chara_id()){
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
		var buttonIntelligence = getButton(Language.get("intelligence"),200);
		buttonIntelligence.y = menuY;
		layer.addChild(buttonIntelligence);
		
		menuY += menuHeight;
		var buttonDiplomacy = getButton(Language.get("diplomacy"),200);
		buttonDiplomacy.y = menuY;
		layer.addChild(buttonDiplomacy);
	}else{
		var buttonGeneralsList = getButton(Language.get("generals_list"),200);
		buttonGeneralsList.y = menuY;
		layer.addChild(buttonGeneralsList);
		buttonGeneralsList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsListButton.bind(self));
	}
	
	return layer;
};
BuildOfficialView.prototype.onClickExpeditionButton=function(event){
	var self = this;
	
	//TODO::
	//self.controller.gotoBattle();
	
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
BuildOfficialView.prototype.onClickGeneralsListButton=function(event){
	var self = this;
	self.controller.loadCharacterList(CharacterListType.CHARACTER_LIST,self);
};
BuildOfficialView.prototype.onClickGeneralsMoveButton=function(event){
	var self = this;
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.moveSelectCharacter);
	self.controller.toSelectMap(CharacterListType.CHARACTER_MOVE);
	
	//self.controller.loadCharacterList(CharacterListType.CHARACTER_MOVE,self);
};
BuildOfficialView.prototype.moveSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildOfficialView";
	});
	self.controller.setValue("cityId", event.cityId);
	console.log("event.cityId = " + event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.moveToCity);
	controller.loadCharacterList(CharacterListType.CHARACTER_MOVE,self);
};
BuildOfficialView.prototype.selectComplete=function(event){
	var self = this;
	console.log("BuildOfficialView.prototype.selectComplete event = " , event);
	var characterList = event.characterList;
	var cityId = self.controller.getValue("cityId");
	self.controller.setValue("cityId", null);
	if(!characterList){
		return true;
	}
	if(event.characterListType == CharacterListType.CHARACTER_MOVE){
		event.characterList.forEach(function(child){
			child.moveTo(cityId);
		});
	}else if(event.characterListType == CharacterListType.EXPEDITION){
		console.log("BuildOfficialView.prototype.selectComplete CharacterListType.EXPEDITION " , event.characterList);
		self.controller.setValue("expeditionCharacterList", event.characterList);
	}else if(event.characterListType == CharacterListType.SELECT_LEADER){
		if(event.characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_leader_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}else{
			self.controller.setValue("expeditionLeader",event.characterList[0]);
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
	}else if(event.characterListType == CharacterListType.SELECT_LEADER){
		self.load.view(["Builds/ExpeditionReady"],self.expeditionReady);
	}
};
BuildOfficialView.prototype.expeditionReady=function(){
	var self = this;
	console.log("BuildOfficialView.prototype.expeditionReady",self);
	var readyView = new ExpeditionReadyView(self.controller);
	//self.addChild(readyView);
	var obj = {title:Language.get("备战军资"),subWindow:readyView,width:480,height:540,okEvent:self.expeditionReadyComplete,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
	self.menuLayer.visible = false;
};
BuildOfficialView.prototype.expeditionReadyComplete=function(event){
	var windowLayer = event.currentTarget.parent;
	console.log("windowLayer="+windowLayer);
	var self = windowLayer.parent;
	var readyView = windowLayer.childList.find(function(child){
		return child.constructor.name == "ExpeditionReadyView";
	});
	console.log("readyView="+readyView);
	var data = readyView.getData();
	console.log("data="+data);
	data.expeditionCharacterList = self.controller.getValue("expeditionCharacterList");
	data.expeditionLeader = self.controller.getValue("expeditionLeader");
	console.log("expeditionReadyComplete",data.expeditionCharacterList,data.expeditionLeader);
	windowLayer.remove();
	self.controller.setValue("battleData",data);
	self.controller.gotoBattle();
};