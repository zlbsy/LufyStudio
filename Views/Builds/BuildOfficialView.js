/**
 * 官府
 * 武将一览，谍报，外交
 */
function BuildOfficialView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"official"]);
}
BuildOfficialView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var cityModel = self.controller.getValue("cityData");
	if(cityModel.prefecture() != cityModel.seigniorCharaId()){
		var buttonPrefecture = getButton(Language.get("appoint_prefecture"),200);
		buttonPrefecture.y = menuY;
		layer.addChild(buttonPrefecture);
		buttonPrefecture.addEventListener(LMouseEvent.MOUSE_UP, self.onClickPrefectureButton.bind(self));
		menuY += menuHeight;
	}
	//menuY += menuHeight;
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
	self.addAppointButton(layer, menuY);
	return layer;
};
BuildOfficialView.prototype.addAppointButton=function(layer, y){
	var self = this;
	if(self.buttonAppoint){
		layer = self.buttonAppoint.parent;
		y = self.buttonAppoint.y;
		self.buttonAppoint.remove();
	}
	var cityModel = self.controller.getValue("cityData");
	var buttonAppoint = getButton(Language.get(cityModel.isAppoint() ? "remove_appoint" : "appoint"),200);
	buttonAppoint.y = y;
	self.buttonAppoint = buttonAppoint;
	layer.addChild(buttonAppoint);
	if(cityModel.isAppoint()){
		buttonAppoint.addEventListener(LMouseEvent.MOUSE_UP, self.onClickRemoveAppoint);
	}else{
		buttonAppoint.addEventListener(LMouseEvent.MOUSE_UP, self.onClickAppoint);
	}
};
BuildOfficialView.prototype.onClickAppoint=function(event){
	var self = event.currentTarget.getParentByConstructor(BuildOfficialView);
	self.updateAppoint(1);
};
BuildOfficialView.prototype.onClickRemoveAppoint=function(event){
	var self = event.currentTarget.getParentByConstructor(BuildOfficialView);
	self.updateAppoint(0);
};
BuildOfficialView.prototype.updateAppoint=function(value){
	var self = this;
	var cityData = self.controller.getValue("cityData");
	cityData.isAppoint(value);
	self.controller.setValue("isAppoint",cityData.isAppoint());
	self.addAppointButton();
	LMvc.MapController.view.resetAreaIcon(cityData.id());
	self.controller.dispatchEvent(LController.NOTIFY_ALL);
};
BuildOfficialView.prototype.onClickPrefectureButton=function(event){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.APPOINT_PREFECTURE, cityModel.generals(), {isOnlyOne:true, buttonLabel:"appoint_prefecture"});
};
BuildOfficialView.prototype.onClickTransportButton=function(event){
	var self = this;
	self.characterListType = CharacterListType.TRANSPORT;
	self.controller.removeEventListener(LCityEvent.SELECT_CITY);
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.transportSelectCharacter);
	self.controller.toSelectMap(CharacterListType.TRANSPORT, {isSelf:true,toast:"dialog_common_select_city_toast",belongError:"dialog_transport_select_error",confirmMessage:"dialog_transport_select_confirm"});
};
BuildOfficialView.prototype.transportSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildOfficialView";
	});
	self.controller.setValue("cityId", event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.transportSelectCharacter);
	self.toTransport();
};
BuildOfficialView.prototype.toTransport=function(){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.TRANSPORT, cityModel.generals(Job.IDLE), {isOnlyOne:true, buttonLabel:"execute"});
};
BuildOfficialView.prototype.onClickSpyButton=function(event){
	var self = this;
	self.controller.removeEventListener(LCityEvent.SELECT_CITY);
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.spySelectCharacter);
	self.controller.toSelectMap(CharacterListType.CHARACTER_SPY, {isSelf:false,toast:"dialog_common_select_city_toast", belongError:"dialog_spy_generals_error",confirmMessage:"dialog_spy_generals_confirm"});
};
BuildOfficialView.prototype.spySelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildOfficialView";
	});
	self.controller.setValue("cityId", event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.spySelectCharacter);
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.CHARACTER_SPY, cityModel.generals(Job.IDLE), {showMoney:true, buttonLabel:"execute"});
};
BuildOfficialView.prototype.selectComplete=function(event){
	var self = this;
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
	}else if(event.characterListType == CharacterListType.CHARACTER_SPY){
		self.controller.setValue("cityId", null);
		event.characterList.forEach(function(child){
			child.spy(cityId);
			var city = self.controller.getValue("cityData");
			city.money(-JobPrice.SPY);
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
	var readyView = new ExpeditionReadyView(self.controller,CharacterListType.TRANSPORT);
	var obj = {title:Language.get("transport"),subWindow:readyView,width:480,height:540,okEvent:self.expeditionReadyComplete,cancelEvent:self.expeditionCancel};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
	self.menuLayer.visible = false;
};
BuildOfficialView.prototype.expeditionCancel=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.parent;
	windowLayer.remove();
	self.toTransport();
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