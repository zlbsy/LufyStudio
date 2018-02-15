/**
 * 武将相关
 * 武将一览，武将移动，武将劝降
 */
function BuildGeneralsView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"generals"]);
}
BuildGeneralsView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	if(self.controller.getValue("selfCity")){
		var buttonGeneralsList = getButton(Language.get("generals_list"),200);
		buttonGeneralsList.y = menuY;
		layer.addChild(buttonGeneralsList);
		buttonGeneralsList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsListButton);
		
		menuY += menuHeight;
		var buttonGeneralsMove = getButton(Language.get("generals_move"),200);
		buttonGeneralsMove.y = menuY;
		layer.addChild(buttonGeneralsMove);
		buttonGeneralsMove.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsMoveButton);
		
		menuY += menuHeight;
		var buttonPersuade = getButton(Language.get("persuade_character"),200);
		buttonPersuade.y = menuY;
		layer.addChild(buttonPersuade);
		buttonPersuade.addEventListener(LMouseEvent.MOUSE_UP, self.onClickPersuade);
	}else{
		var buttonGeneralsList = getButton(Language.get("generals_list"),200);
		buttonGeneralsList.y = menuY;
		layer.addChild(buttonGeneralsList);
		buttonGeneralsList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickGeneralsListButton.bind(self));
	}
	
	return layer;
};
BuildGeneralsView.prototype.onClickPersuade=function(event){
	var self = event.currentTarget.getParentByConstructor(BuildGeneralsView);
	self.characterListType = CharacterListType.PERSUADE_TARGET;
	self.controller.removeEventListener(LCityEvent.SELECT_CITY);
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.persuadeTargetSelectCharacter);
	self.controller.toSelectMap(CharacterListType.PERSUADE_TARGET, {isSelf:false,toast:"dialog_persuade_select_city_toast",spy:true, belongError:"dialog_persuade_belong_error", spyError:"dialog_persuade_spy_error"});
};
BuildGeneralsView.prototype.persuadeTargetSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildGeneralsView";
	});
	self.controller.setValue("cityId", event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.persuadeTargetSelectCharacter);
	var selectCity = AreaModel.getArea(event.cityId);
	var characterList = selectCity.generals();
	self.controller.loadCharacterList(CharacterListType.PERSUADE_TARGET, characterList, {isOnlyOne:true, buttonLabel:"execute"});
};
BuildGeneralsView.prototype.onClickGeneralsListButton=function(event){
	var self = event.currentTarget.getParentByConstructor(BuildGeneralsView);
	var cityModel = self.controller.getValue("cityData");
	generals = cityModel.generals();
	var characterList = generals.concat(cityModel.outOfOffice()).concat(cityModel.captives());
	self.controller.loadCharacterList(CharacterListType.CHARACTER_LIST, characterList, {showOnly:true,prizeAll:true,buttonLabel:"prize_all"});
};
BuildGeneralsView.prototype.onClickGeneralsMoveButton=function(event){
	var self = event.currentTarget.getParentByConstructor(BuildGeneralsView);
	self.controller.removeEventListener(LCityEvent.SELECT_CITY);
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.moveSelectCharacter);
	self.controller.toSelectMap(CharacterListType.CHARACTER_MOVE, {isSelf:true,toast:"dialog_common_select_city_toast",belongError:"dialog_move_generals_error",confirmMessage:"dialog_move_generals_confirm"});
};
BuildGeneralsView.prototype.moveSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildGeneralsView";
	});
	self.controller.setValue("cityId", event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.moveSelectCharacter);
	var cityModel = self.controller.getValue("cityData");
	var characters = cityModel.generals(Job.IDLE);
	var captives = cityModel.captives();
	for(var i=0,l=captives.length;i<l;i++){
		var chara = captives[i];
		if(chara.job() == Job.IDLE){
			characters.push(chara);
		}
	}
	self.controller.loadCharacterList(CharacterListType.CHARACTER_MOVE, characters, {buttonLabel:"move_start"});
};
BuildGeneralsView.prototype.selectComplete=function(event){
	var self = this;
	var characterList = event.characterList;
	var cityId = self.controller.getValue("cityId");
	if(!characterList){
		return true;
	}
	if(event.characterListType == CharacterListType.CHARACTER_LIST && event.subEventType != "return"){
		self.controller.setValue("cityId", null);
		var cityModel = self.controller.getValue("cityData");
		cityModel.generals().forEach(function(child){
			if(!child.isPrized() && child.city().money() >= JobPrice.PRIZE){
				var loyaltyUpValue = toPrizedByMoney(child);
			}
		});
	}else if(event.characterListType == CharacterListType.CHARACTER_MOVE){
		self.controller.setValue("cityId", null);
		event.characterList.forEach(function(child){
			child.moveTo(cityId);
		});
	}else if(event.characterListType == CharacterListType.PERSUADE_TARGET){
		self.controller.setValue("persuadeCharacter", event.characterList[0]);
	}else if(event.characterListType == CharacterListType.PERSUADE){
		self.controller.setValue("cityId", null);
		var persuadeCharacter = self.controller.getValue("persuadeCharacter");
		var characterModel = event.characterList[0];
		characterModel.persuade(persuadeCharacter.id());
	}
	return true;
};
BuildGeneralsView.prototype.showBuild=function(event){
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
	if(event.characterListType == CharacterListType.PERSUADE_TARGET){
		var cityModel = self.controller.getValue("cityData");
		self.controller.loadCharacterList(CharacterListType.PERSUADE, cityModel.generals(Job.IDLE), {isOnlyOne:true, buttonLabel:"execute"});
	}
};
