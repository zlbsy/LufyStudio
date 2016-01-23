/**
 * 兵营
 * 出征，招募，训练
 */
function BuildBarrackView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"barrack"]);
}
BuildBarrackView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	
	var buttonExpedition = getButton(Language.get("expedition"),200);
	buttonExpedition.y = menuY;
	layer.addChild(buttonExpedition);
	buttonExpedition.addEventListener(LMouseEvent.MOUSE_UP, self.onClickExpeditionButton);
		
	menuY += menuHeight;
	var buttonEnlist = getButton(Language.get("enlist"),200);
	buttonEnlist.y = menuY;
	layer.addChild(buttonEnlist);
	buttonEnlist.addEventListener(LMouseEvent.MOUSE_UP, self.onClickEnlistButton);
	
	menuY += menuHeight;
	var buttonTraining = getButton(Language.get("training"),200);
	buttonTraining.y = menuY;
	layer.addChild(buttonTraining);
	buttonTraining.addEventListener(LMouseEvent.MOUSE_UP, self.onClickTrainingButton);
	return layer;
};
BuildBarrackView.prototype.onClickExpeditionButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.characterListType = CharacterListType.EXPEDITION;
	self.controller.addEventListener(LCityEvent.SELECT_CITY, self.expeditionSelectCharacter);
	self.controller.toSelectMap(CharacterListType.EXPEDITION);
};
BuildBarrackView.prototype.expeditionSelectCharacter=function(event){
	var controller = event.currentTarget;
	var self = controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "BuildBarrackView";
	});
	self.controller.setValue("cityId", event.cityId);
	controller.removeEventListener(LCityEvent.SELECT_CITY, self.expeditionSelectCharacter);
	controller.loadCharacterList(CharacterListType.EXPEDITION,self);
};

BuildBarrackView.prototype.onClickTrainingButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.loadCharacterList(CharacterListType.TRAINING);
};
BuildBarrackView.prototype.selectComplete=function(event){
	var self = this;
	console.log("BuildBarrackView.prototype.selectComplete event = " , event);
	var characterList = event.characterList;
	if(!characterList){
		return true;
	}
	var cityId = self.controller.getValue("cityId");
	if(event.characterListType == CharacterListType.TRAINING){
		if(event.characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
		}else{
			self.controller.setValue("selectCharacter", event.characterList[0]);
			self.showSoldiers();
		}
		return false;
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
	}
	return true;
};
BuildBarrackView.prototype.showBuild=function(event){
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
		self.controller.loadCharacterList(CharacterListType.SELECT_LEADER, self.controller.getValue("expeditionCharacterList"), true);
	}else if(event.characterListType == CharacterListType.SELECT_LEADER){
		if(SeigniorExecute.running){
			var data = {};
			data.expeditionCharacterList = self.controller.getValue("expeditionCharacterList");
			data.expeditionLeader = self.controller.getValue("expeditionLeader");
			self.controller.setValue("battleData",data);
			self.controller.gotoBattle();
		}else{
			self.load.view(["Builds/ExpeditionReady"],self.expeditionReady);
		}
	}
};
BuildBarrackView.prototype.expeditionReady=function(){
	var self = this;
	var readyView = new ExpeditionReadyView(self.controller);
	//self.addChild(readyView);
	var obj = {title:Language.get("expedition_resources"),subWindow:readyView,width:480,height:540,okEvent:self.expeditionReadyComplete,cancelEvent:self.expeditionCancel};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
	self.menuLayer.visible = false;
};
BuildBarrackView.prototype.expeditionCancel=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.parent;
	windowLayer.remove();
	//self.menuLayer.visible = true;
	self.controller.loadCharacterList(CharacterListType.SELECT_LEADER, self.controller.getValue("expeditionCharacterList"), true);

};
BuildBarrackView.prototype.expeditionReadyComplete=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.parent;
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
BuildBarrackView.prototype.showSoldiers=function(){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	var selectCharacter = self.controller.getValue("selectCharacter");
	var soldiers = selectCharacter.soldiers();
	var layer = new LSprite();
	var msg = getStrokeLabel(Language.get("dialog_training_confirm"),16,"#FFFFFF","#000000",4);
	layer.addChild(msg);
	layer.name = "SubWindow";
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win01"]),260,40);
	panel.cacheAsBitmap(true);
	var bitmapOn = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var com = new LComboBox(18,"#ffffff","Arial",panel,bitmapOff,bitmapOn);
	com.setListChildView(TrainingComboBoxChild);
	com.listView.cellWidth = 250;
	com.label.x = 10;
	com.label.y = 9;
	com.label.lineColor = "#000000";
	com.label.stroke = true;
	com.label.lineWidth = 3;
	for(var i=0;i<soldiers.length;i++){
		var soldierModel = soldiers[i];
		var label = String.format("{0} {1}({2})", soldierModel.name(), Language.get("proficiency"),soldierModel.proficiency());
		com.setChild({label:label,value:soldierModel.id()});
	}
	com.y = 55;
	layer.addChild(com);
	var obj = {title:Language.get("confirm"),subWindow:layer,height:300,okEvent:self.selectSoldier,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	var contentLayer = self.controller.view.contentLayer;
	var characterListLayer = contentLayer.getChildAt(contentLayer.numChildren - 1);
	characterListLayer.addChild(windowLayer);
};
BuildBarrackView.prototype.selectSoldier=function(event){
	var windowObj = event.currentTarget.parent;
	var characterListLayer = windowObj.parent;
	var contentLayer = characterListLayer.parent;
	var self = contentLayer.childList.find(function(child){
		return child.isBuildBaseView;
	});
	var layer = windowObj.getChildByName("SubWindow");
	var com = layer.getChildAt(1);
	var index = com.value;
	var selectCharacter = self.controller.getValue("selectCharacter");
	var cityModel = self.controller.getValue("cityData");
	var soldiers = selectCharacter.soldiers();
	var soldier = soldiers.find(function(child){
		return child.id() == index;
	});
	if(soldier.proficiency() >= TrainingSetting.MAX){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_proficiency_max_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	selectCharacter.training(soldier.id());
	cityModel.money(-JobPrice.TRAINING);
	self.controller.closeCharacterList({characterListType : null});
	LMvc.CityController.dispatchEvent(LController.NOTIFY_ALL);
	console.log("soldier.id()="+soldier.id());
};
BuildBarrackView.prototype.onClickEnlistButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var armListLayer = new LSprite();
	self.addChild(armListLayer);
	self.controller.setValue("armListLayer", armListLayer);
	self.controller.loadArmList(ArmListType.ARM_ENLIST);
};