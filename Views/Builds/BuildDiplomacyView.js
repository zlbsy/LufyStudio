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
	self.controller.loadCharacterList(CharacterListType.CAPTIVE,captivedList,{isOnlyOne:true, buttonLabel:"redeem"});
};
BuildDiplomacyView.prototype.onClickStopBattleButton=function(event){
	var self = this;
	var characters = SeigniorModel.getSeigniors(LMvc.selectSeignorId);
	self.characterListType = CharacterListType.STOP_BATTLE;
	self.controller.loadCharacterList(CharacterListType.STOP_BATTLE,characters,{isOnlyOne:true, buttonLabel:"select_seignior"});
};
BuildDiplomacyView.prototype.selectComplete=function(event){
	var self = this;
	console.log("BuildDiplomacyView.prototype.selectComplete event = " , event);
	var characterList = event.characterList;
	if(!characterList){
		return true;
	}
	if(event.characterListType == CharacterListType.STOP_BATTLE_CHARACTER){
		if(event.characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}else{
			self.controller.setValue("selectCharacter", event.characterList[0]);
			return true;
		}
	}else if(event.characterListType == CharacterListType.STOP_BATTLE){
		if(event.characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}else{
			self.controller.setValue("seigniorCharacterId", event.characterList[0].id());
			return true;
		}
	}else if(event.characterListType == CharacterListType.REDEEM){
		if(event.characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}else{
			self.controller.setValue("selectCharacter", event.characterList[0]);
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
	if(event.subEventType == "return"){
		if(event.characterListType == CharacterListType.STOP_BATTLE_CHARACTER){
			self.onClickStopBattleButton();
		}else if(event.characterListType == CharacterListType.REDEEM){
			self.onClickRedeemButton();
		}
		return;
	}
	if(event.characterListType == CharacterListType.STOP_BATTLE){
		self.stopBattleCharacter();
	}else if(event.characterListType == CharacterListType.CAPTIVE){
		self.toRedeem();
	}else if(event.characterListType == CharacterListType.REDEEM || event.characterListType == CharacterListType.STOP_BATTLE_CHARACTER){
		self.selectMoneyRedeem();
	}
};
BuildDiplomacyView.prototype.stopBattleCharacter=function(){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.STOP_BATTLE_CHARACTER, cityModel.generals(Job.IDLE), {isOnlyOne:true, buttonLabel:"execute"});
};
BuildDiplomacyView.prototype.toRedeem=function(){
	var self = this;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.REDEEM, cityModel.generals(Job.IDLE), {isOnlyOne:true, buttonLabel:"execute"});
};
BuildDiplomacyView.prototype.selectMoneyRedeem = function(){
	var self = this;
	var windowWidth = 400;
	var cityModel = self.controller.getValue("cityData");
	var rangeBackground = getBitmap(new LPanel(new LBitmapData(LMvc.datalist["win04"]),300,40));
	var rangeSelect = new LBitmap(new LBitmapData(LMvc.datalist["range"]));
	var moneyLayer = new LSprite();
	var redeemMessage = getStrokeLabel(Language.get("diplomacy_message"), 18, "#FFFFFF", "#000000", 4);
	redeemMessage.x = (windowWidth - redeemMessage.getWidth() - 40) * 0.5;
	redeemMessage.y =20;
	moneyLayer.addChild(redeemMessage);
	var moneyLabel = getStrokeLabel(Language.get("money"), 18, "#FFFFFF", "#000000", 4);
	moneyLabel.x = 10;
	moneyLabel.y = 60;
	moneyLayer.addChild(moneyLabel);
	self.moneySum = cityModel.money();
	var money = getStrokeLabel( String.format("{0}/{1}",0,self.moneySum), 18, "#FFFFFF", "#000000", 4);
	money.x = 60;
	money.y = 60;
	moneyLayer.addChild(money);
	self.money = money;
	var rangeMoney = new LRange(rangeBackground.clone(), rangeSelect.clone());
	rangeMoney.x = 10;
	rangeMoney.y = 80;
	moneyLayer.addChild(rangeMoney);
	rangeMoney.addEventListener(LRange.ON_CHANGE, self.onMoneyChange);
	
	var obj = {title:Language.get("confirm"),
	subWindow:moneyLayer,width:windowWidth,height:340,
	okEvent:self.redeemMoneyComplete,cancelEvent:self.redeemMoneyCancel};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
	self.menuLayer.visible = false;
};
BuildDiplomacyView.prototype.onMoneyChange=function(event){
	var rangeMoney = event.currentTarget;
	var self = rangeMoney.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.selectMoney = self.moneySum*rangeMoney.value*0.01>>0;
	self.money.text = String.format("{0}/{1}",self.selectMoney,self.moneySum);	
};
BuildDiplomacyView.prototype.redeemMoneyCancel=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.parent;
	windowLayer.remove();
	if(self.characterListType == CharacterListType.REDEEM){
		self.toRedeem();
	}else if(self.characterListType == CharacterListType.STOP_BATTLE){
		self.stopBattleCharacter();
	}
};
BuildDiplomacyView.prototype.redeemMoneyComplete=function(event){
	var windowLayer = event.currentTarget.parent;
	var self = windowLayer.parent;
	windowLayer.remove();
	self.menuLayer.visible = true;
	console.error("self.characterListType="+self.characterListType);
	if(self.characterListType == CharacterListType.REDEEM){
		var captiveCharacterId = self.controller.getValue("captiveCharacterId");
		var redeemCharacter = self.controller.getValue("selectCharacter");
		redeemCharacter.redeem(captiveCharacterId, self.selectMoney);
	}else if(self.characterListType == CharacterListType.STOP_BATTLE){
		var seigniorCharacterId = self.controller.getValue("seigniorCharacterId");
		var selectCharacter = self.controller.getValue("selectCharacter");
		selectCharacter.stopBattle(seigniorCharacterId, self.selectMoney);
	}
};