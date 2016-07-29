/**
 * 出征
 */
function BuildExpeditionView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"expedition"]);
}
BuildExpeditionView.prototype.showMenu=function(){
	return null;
};
BuildExpeditionView.prototype.run=function(){
	var self = this;
	if(SeigniorExecute.running){
		return;
	}
	self.characterListType = CharacterListType.EXPEDITION;
	self.controller.removeEventListener(LCityEvent.SELECT_CITY);
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.expeditionSelectCharacter);
	self.controller.addEventListener(LCityEvent.CLOSE_SELECT_CITY, self.closeSelectCity);
	self.controller.toSelectMap(CharacterListType.EXPEDITION, {isSelf:false, toast:"dialog_common_select_city_toast", belongError:"dialog_expedition_select_error", stopBattle:false, stopBattleError:"dialog_expedition_stop_battle_error", confirmMessage:"dialog_expedition_select_confirm"});
};
BuildExpeditionView.prototype.closeSelectCity=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildExpeditionView";
	});
	controller.removeEventListener(LCityEvent.CLOSE_SELECT_CITY, self.closeSelectCity);
	var cityView = self.getParentByConstructor(CityView);
	cityView.clearContentLayer();
};
BuildExpeditionView.prototype.expeditionSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildExpeditionView";
	});
	self.controller.setValue("cityId", event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.expeditionSelectCharacter);
	self.toExpedition();
};
BuildExpeditionView.prototype.selectComplete=function(event){
	var self = this;
	var characterList = event.characterList;
	if(!characterList){
		return true;
	}
	var cityId = self.controller.getValue("cityId");
	if(event.characterListType == CharacterListType.EXPEDITION){
		var characterList = event.characterList;
		var quantity = SeigniorExecute.running ? BattleMapConfig.DefenseQuantity : BattleMapConfig.AttackQuantity;
		if(characterList.length > quantity){
			var obj = {title:Language.get("confirm"),messageHtml:String.format(Language.get(SeigniorExecute.running ? "expedition_defense_quantity_message" : "expedition_attack_quantity_message"),quantity),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}
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
		if(SeigniorExecute.running){
			var prefecture = LMvc.CityController.getValue("toCity").prefecture();
			var prefectureCharacter = CharacterModel.getChara(prefecture);
			if(characterList.findIndex(function(child){
				return child.id() == prefecture;
			}) < 0){
				var obj = {title:Language.get("confirm"),messageHtml:String.format(Language.get("dialog_prefecture_nodef_error"),prefectureCharacter.name()),height:200,okEvent:null};
				var windowLayer = ConfirmWindow(obj);
				LMvc.layer.addChild(windowLayer);
				return false;
			}else{
				self.controller.setValue("expeditionLeader",prefectureCharacter);
				self.controller.setValue("toCityId", cityId);
				return true;
			}
		}else{
			var index = characterList.findIndex(function(child){
				return child.id() == LMvc.selectSeignorId;
			});
			if(index >= 0){
				var seigniorCharacter = CharacterModel.getChara(LMvc.selectSeignorId);
				self.controller.setValue("expeditionLeader",seigniorCharacter);
				self.controller.setValue("toCityId", cityId);
				return true;
			}
		}
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
	}
	return true;
};
BuildExpeditionView.prototype.showBuild=function(event){
	var contentLayer = event.currentTarget.view.contentLayer;
	var self = contentLayer.childList.find(function(child){
		return child.isBuildBaseView;
	});
	var result = self.callParent("showBuild",arguments);
	if(!result){
		return;
	}
	if(event.subEventType == "return"){
		if(event.characterListType == CharacterListType.EXPEDITION){
			var cityData = self.controller.getValue("cityData");
			troopsFromCharactersToCity(cityData);
			self.controller.setValue("expeditionCharacterList", null);
			self.controller.setValue("toCityId", null);
			self.controller.dispatchEvent(LController.NOTIFY_ALL);
			var cityView = self.getParentByConstructor(CityView);
			cityView.clearContentLayer();
		}else if(event.characterListType == CharacterListType.SELECT_LEADER){
			self.toExpedition();
		}
		return;
	}
	if(!self.load){
		self.load = new LMvcLoader(self);
	}
	if(event.characterListType == CharacterListType.EXPEDITION){
		if(SeigniorExecute.running){
			var data = {};
			data.expeditionCharacterList = self.controller.getValue("expeditionCharacterList");
			data.expeditionLeader = self.controller.getValue("expeditionLeader");
			self.controller.setValue("battleData",data);
			self.controller.gotoBattle();
		}else{
			var expeditionLeader = self.controller.getValue("expeditionLeader");
			if(expeditionLeader){
				self.load.view(["Builds/ExpeditionReady"],self.expeditionReady);
			}else{
				self.toSelectLeader();
			}
		}
	}else if(event.characterListType == CharacterListType.SELECT_LEADER){
		self.load.view(["Builds/ExpeditionReady"],self.expeditionReady);
	}
};
BuildExpeditionView.prototype.expeditionReady=function(){
	var self = this;
	var readyView = new ExpeditionReadyView(self.controller);
	var obj = {title:Language.get("expedition_resources"),subWindow:readyView,width:480,height:540,okEvent:self.expeditionReadyComplete,cancelEvent:self.expeditionCancel};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
	self.menuLayer.visible = false;
};
BuildExpeditionView.prototype.expeditionCancel=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.parent;
	windowLayer.remove();
	var expeditionLeader = self.controller.getValue("expeditionLeader");
	if(LMvc.selectSeignorId == expeditionLeader.id()){
		self.toExpedition();
	}else{
		self.toSelectLeader();
	}
};
BuildExpeditionView.prototype.toExpedition=function(){
	var self = this;
	self.controller.setValue("expeditionLeader", null);
	var toCityId = self.controller.getValue("cityId");
	var toCity = AreaModel.getArea(toCityId);
	var neighbor = toCity.neighbor();
	var cityModel = self.controller.getValue("cityData");
	var generals = [];
	generals = generals.concat(cityModel.generals(Job.IDLE));
	for(var i=0;i<neighbor.length;i++){
		var city = AreaModel.getArea(neighbor[i]);
		if(city.id() == cityModel.id() || city.seigniorCharaId() != LMvc.selectSeignorId){
			continue;
		}
		generals = generals.concat(city.generals(Job.IDLE));
	}
	self.controller.loadCharacterList(CharacterListType.EXPEDITION, generals, 
		{buttonLabel:"execute", countCheckBox:true, checkCity:cityModel.id()});
	//self.controller.loadCharacterList(CharacterListType.EXPEDITION, cityModel.generals(Job.IDLE), {buttonLabel:"execute", countCheckBox:true});
};
BuildExpeditionView.prototype.toSelectLeader=function(){
	var self = this;
	var cityData = self.controller.getValue("cityData");
	var expeditionCharacterList = self.controller.getValue("expeditionCharacterList");
	troopsFromCharactersToCity(cityData, expeditionCharacterList);
	self.controller.loadCharacterList(CharacterListType.SELECT_LEADER, self.controller.getValue("expeditionCharacterList"), 
		{isOnlyOne:true, toast:"dialog_expedition_select_leader", buttonLabel:"execute", showMoney:false});
};
BuildExpeditionView.prototype.expeditionReadyComplete=function(event){
	var self, windowLayer;
	if(event){
		windowLayer = event.currentTarget.parent;
		self = windowLayer.parent;
	}else{
		self = this;
		windowLayer = self.getChildByName("ConfirmWindow");
	}
	var readyView = windowLayer.childList.find(function(child){
		return child.constructor.name == "ExpeditionReadyView";
	});
	var data = readyView.getData();
	windowLayer.remove();
	data.expeditionCharacterList = self.controller.getValue("expeditionCharacterList");
	data.expeditionLeader = self.controller.getValue("expeditionLeader");
	self.controller.setValue("battleData",data);
	self.controller.gotoBattle();
};