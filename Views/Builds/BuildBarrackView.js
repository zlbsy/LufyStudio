/**
 * 兵营
 * 招募，训练，强化等
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
	var soldiers = cityModel.soldiers();
	var layer = new LSprite();
	var panel = new LPanel(new LBitmapData(LMvc.datalist["win01"]),110,40);
	var bitmapOn = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var bitmapOff = new LBitmap(new LBitmapData(LMvc.datalist["combobox_arraw"]));
	var com = new LComboBox(16,"#000000","Arial",panel,bitmapOff,bitmapOn);
	for(var i=0;i<soldiers.length;i++){
	/*console.error("showSoldiers i="+i);
	com.setChild({label:"aaa",value:i});
	continue;*/
		var soldierModel = soldiers[i];
		var proficiency = 200;
		var label = String.format("{0} 熟练度({1})", soldierModel.name(), proficiency);
		com.setChild({label:label,value:i});
	}
	com.x = 40;
	com.y = 55;
	layer.addChild(com);
	LMvc.layer.addChild(layer);
	console.error("showSoldiers soldiers.length="+soldiers.length);
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