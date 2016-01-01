/**
 * 兵营
 * 招募，训练
 */
function BuildBarrackView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"barrack"]);
}
BuildBarrackView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
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
	}
	return true;
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
	bitmapOn.scaleX = bitmapOn.scaleY = 0.6;
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	bitmapOff.scaleX = bitmapOff.scaleY = bitmapOn.scaleX;
	var com = new LComboBox(16,"#ffffff","Arial",panel,bitmapOff,bitmapOn);
	com.label.x = 10;
	com.label.y = 9;
	com.label.lineColor = "#000000";
	com.label.stroke = true;
	com.label.lineWidth = 2;
	for(var i=0;i<soldiers.length;i++){
		var soldierModel = soldiers[i];
		var proficiency = 200;
		var label = String.format("{0} {1}({2})", soldierModel.name(), Language.get("proficiency"),proficiency);
		com.setChild({label:label,value:i});
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
	var soldier = soldiers[index];
	if(soldier.proficiency() >= TrainingSetting.MAX){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_proficiency_max_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	console.log("soldier="+soldier);
	selectCharacter.training(soldier.id());
	cityModel.money(-JobPrice.TRAINING);
	self.controller.closeCharacterList({characterListType : null});
	LMvc.CityController.dispatchEvent(LController.NOTIFY_ALL);
	console.log("soldier.id()="+soldier.id());
};
/*
BuildBarrackView.prototype.showBuild=function(event){
	var contentLayer = event.currentTarget.view.contentLayer;
	var self = contentLayer.childList.find(function(child){
		return child.isBuildBaseView;
	});
	var result = self.callParent("showBuild",arguments);
	if(!result){
		return;
	}
	if(event.subEventType == "return"){
		if(event.characterListType == CharacterListType.STOP_BATTLE_CHARACTER){
			self.onClickStopBattleButton();
		}else if(event.characterListType == CharacterListType.REDEEM){
			self.onClickRedeemButton();
		}
		return;
	}
	if(event.characterListType == CharacterListType.TRAINING){
		self.showSoldiers();
	}
};*/
/*
BuildBarrackView.prototype.hideArmBuild=function(event){
	var controller = event.currentTarget;
	var armListLayer = controller.getValue("armListLayer");
	var self = armListLayer.parent;
	
	self.menuLayer.visible = false;
	self.controller.view.baseLayer.visible = false;
};
BuildBarrackView.prototype.showArmBuild=function(event){
	var controller = event.currentTarget;
	var armListLayer = controller.getValue("armListLayer");
	var self = armListLayer.parent;
	console.log("showArmBuild",self);
	armListLayer.remove();
	self.menuLayer.visible = true;
	self.controller.view.baseLayer.visible = true;
	console.log("self.menuLayer.visible",self.menuLayer.visible);
	self.controller.removeEventListener(ArmListEvent.SHOW, self.hideArmBuild);
	self.controller.removeEventListener(ArmListEvent.CLOSE, self.showArmBuild);
};
BuildBarrackView.prototype.onClickArmyListButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.addEventListener(ArmListEvent.SHOW, self.hideArmBuild);
	self.controller.addEventListener(ArmListEvent.CLOSE, self.showArmBuild);
	var armListLayer = new LSprite();
	self.addChild(armListLayer);
	self.controller.setValue("armListLayer", armListLayer);
	self.controller.loadArmList(ArmListType.ARM_LIST);
};*/
BuildBarrackView.prototype.onClickEnlistButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	//self.controller.loadCharacterList(CharacterListType.ENLIST,self);
	//return;
	//self.controller.addEventListener(ArmListEvent.SHOW, self.hideArmBuild);
	//self.controller.addEventListener(ArmListEvent.CLOSE, self.showArmBuild);
	var armListLayer = new LSprite();
	self.addChild(armListLayer);
	self.controller.setValue("armListLayer", armListLayer);
	self.controller.loadArmList(ArmListType.ARM_ENLIST);
};