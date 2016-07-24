/**
 * 酒馆
 * 搜索招募人才
 */
function BuildTavernView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"tavern"]);
}
BuildTavernView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var buttonAccess = getButton(Language.get("access"),200);
	buttonAccess.name = "buttonAccess";
	buttonAccess.y = menuY;
	layer.addChild(buttonAccess);
	buttonAccess.addEventListener(LMouseEvent.MOUSE_UP, self.onClickAccessButton);
	
	menuY += menuHeight;
	var buttonHire = getButton(Language.get("hire"),200);
	buttonHire.name = "buttonHire";
	buttonHire.y = menuY;
	layer.addChild(buttonHire);
	buttonHire.addEventListener(LMouseEvent.MOUSE_UP, self.onClickHireButton);
	
	return layer;
};
BuildTavernView.prototype.onClickAccessButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.ACCESS, cityModel.generals(Job.IDLE), {buttonLabel:"execute"});
};
BuildTavernView.prototype.onClickHireButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.toHire();
};
BuildTavernView.prototype.toHire=function(){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.HIRE, cityModel.outOfOffice(), {isOnlyOne:true, buttonLabel:"execute"});
};
BuildTavernView.prototype.showBuild=function(event){
	var contentLayer = event.currentTarget.view.contentLayer;
	var self = contentLayer.childList.find(function(child){
		return child.isBuildBaseView;
	});
	var result = self.callParent("showBuild",arguments);
	if(!result){
		return;
	}
	if(event.subEventType == "return"){
		if(event.characterListType == CharacterListType.CHARACTER_HIRE){
			self.toHire();
		}
		return;
	}
	if(event.characterListType == CharacterListType.HIRE){
		var cityModel = self.controller.getValue("cityData");
		self.controller.loadCharacterList(CharacterListType.CHARACTER_HIRE, cityModel.generals(Job.IDLE), {buttonLabel:"execute"});
	}
};
BuildTavernView.prototype.selectComplete=function(event){
	var self = this;
	var characterList = event.characterList;
	if(!characterList){
		self.cityId = null;
		return true;
	}
	if(event.characterListType == CharacterListType.HIRE){
		if(event.characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_error_hire_more"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}else{
			self.controller.setValue("hireCharacter",event.characterList[0]);
			return true;
		}
	}else if(event.characterListType == CharacterListType.CHARACTER_HIRE){
		var hireCharacter = self.controller.getValue("hireCharacter");
		self.controller.setValue("hireCharacter",null);
		event.characterList.forEach(function(child){
			child.hire(hireCharacter.id());
		});
	}else if(event.characterListType == CharacterListType.ACCESS){
		return self.callParent("selectComplete",arguments);
	}
	return true;
};