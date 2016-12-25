function CharacterDetailedTabStatusView(controller, w, h){
	var self = this;
	base(self,LView,[controller]);
	self.tabWidth = w;
	self.tabHeight = h;
}
CharacterDetailedTabStatusView.prototype.updateView=function(){
	var self = this;
	self.showStatus();
};
CharacterDetailedTabStatusView.prototype.showStatus=function(){
	var self = this;
	self.removeAllChild();
	var statusLayer = new LSprite();
	var characterModel = self.controller.getValue("selectedCharacter");
	var battleStatus = self.controller.getValue("battleStatus");
	var txtHeight = 27, startY = 5, startX = 5;
	var labels = ["belong","identity","age","city","loyalty","status"];
	var seigniorId = characterModel.seigniorId();
 	var loyaltyLabel = (seigniorId > 0 && characterModel.id() != seigniorId) ? characterModel.loyalty() : "--";
	var datas = [
	characterModel.seigniorName(),
	characterModel.identity(),
	LMvc.chapterData.noLife ? "--" : characterModel.age(),
	characterModel.cityId() > 0 ? characterModel.city().name() : "--",
	loyaltyLabel,
	battleStatus ? battleStatus : characterModel.jobLabel()
	];
	var reputation = characterModel.reputation();
	if(reputation && reputation.length > 0){
		labels.push("reputation");
		datas.push(characterModel.reputationLabel());
	}
	var skill = characterModel.skill();
	if(skill){
		labels.push("stunt");
		datas.push(String.format(Language.get("skill_explanation"),skill.name(),skill.explanation(),skill.probability()));
	}
	for(var i=0;i<labels.length;i++){
		var height = txtHeight;
		var lblCost = getStrokeLabel(String.format("{0} : {1}",Language.get(labels[i]), datas[i]),20,"#FFFFFF","#000000",4);
		if(labels[i] == "stunt" || labels[i] == "status"){
			lblCost.width = LMvc.screenWidth - 60;
			lblCost.setWordWrap(true, txtHeight);
			height = lblCost.getHeight();
		}
		lblCost.x = startX;
		lblCost.y = startY;
		statusLayer.addChild(lblCost);
		startY += height;
	}
	statusLayer.graphics.drawRect(0, "#000000", [0, 0, self.tabWidth, startY]);
	statusLayer.cacheAsBitmap(true);
	var backLayer = new LSprite();
	backLayer.addChild(statusLayer);
	if(!LMvc.BattleController){
		self.setCtrlButtons(backLayer);
	}
	var sc = new LScrollbar(backLayer, self.tabWidth, self.tabHeight, 10);
	self.addChild(sc);
};
CharacterDetailedTabStatusView.prototype.setCtrlButtons=function(backLayer){
	var self = this;
	var characterModel = self.controller.getValue("selectedCharacter");
	var battleStatus = self.controller.getValue("battleStatus");
	if(battleStatus || !characterModel.city() || characterModel.city().seigniorCharaId() != LMvc.selectSeignorId){
		return;
	}
	if(characterModel.seigniorId() == 0){
		return;
	}
	if(characterModel.seigniorId() != LMvc.selectSeignorId){
		var recruitDisable = characterModel.job() != Job.IDLE;
		var btnRecruit = getButton(Language.get("recruit"),200, recruitDisable ? "win07" : "win01");//招降
		btnRecruit.x = LMvc.screenWidth - 260;
		btnRecruit.y = 5;
		backLayer.addChild(btnRecruit);
		if(recruitDisable){
			btnRecruit.staticMode = true;
		}else{
			btnRecruit.addEventListener(LMouseEvent.MOUSE_UP,self.clickRecruit);
		}
		var btnRelease = getButton(Language.get("release"),200);//释放
		btnRelease.x = LMvc.screenWidth - 260;
		btnRelease.y = 55;
		backLayer.addChild(btnRelease);
		btnRelease.addEventListener(LMouseEvent.MOUSE_UP,self.clickRelease);
		var btnBehead = getButton(Language.get("behead"),200);//斩首
		btnBehead.x = LMvc.screenWidth - 260;
		btnBehead.y = 105;
		backLayer.addChild(btnBehead);
		btnBehead.addEventListener(LMouseEvent.MOUSE_UP,self.clickBehead);
	}else if(characterModel.id() != characterModel.seigniorId()){
		var btnExile = getButton(Language.get("exile"),200);//流放
		btnExile.x = LMvc.screenWidth - 260;
		btnExile.y = 5;
		backLayer.addChild(btnExile);
		btnExile.addEventListener(LMouseEvent.MOUSE_UP,self.clickExile);
		if(characterModel.loyalty() < 100 && !characterModel.isPrized()){
			var btnPrized = getButton(Language.get("prize"),200);//褒奖
			btnPrized.x = LMvc.screenWidth - 260;
			btnPrized.y = 55;
			backLayer.addChild(btnPrized);
			btnPrized.addEventListener(LMouseEvent.MOUSE_UP,self.clickPrized);
		}
	}
};
CharacterDetailedTabStatusView.prototype.clickExile=function(event){
	var btnExile = event.currentTarget;
	var self = btnExile.getParentByConstructor(CharacterDetailedTabStatusView);
	var characterListView = self.getParentByConstructor(CharacterListView);
	var characterModel = self.controller.getValue("selectedCharacter");
	var obj = {title:Language.get("confirm"),
	message:String.format(Language.get("dialog_exile_message"), 
	characterModel.name()),height:200,
	okEvent:function(e){
		e.currentTarget.parent.remove();
		btnExile.visible = false;
		self.exileRun(characterListView, characterModel);
	},cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
CharacterDetailedTabStatusView.prototype.exileRun=function(characterListView, characterModel){
	var self = this;
	characterModel.city().addOutOfOfficeCharacter(characterModel.id());
	self.controller.dispatchEvent(LController.NOTIFY_ALL);
	var e = new LEvent(CharacterListEvent.LIST_CHANGE);
	e.characterModel = characterModel;
	characterListView.dispatchEvent(e);
};
CharacterDetailedTabStatusView.prototype.clickPrized=function(event){
	var btnPrized = event.currentTarget;
	btnPrized.visible = false;
	var self = btnPrized.getParentByConstructor(CharacterDetailedTabStatusView);
	var characterModel = self.controller.getValue("selectedCharacter");
	var cityData = self.controller.getValue("cityData");
	if(cityData.money() < JobPrice.PRIZE){
		//金钱不够，褒奖一次需要{0}金钱!
		var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_prize_nomoney_error"), JobPrice.PRIZE),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return;
	}
	var loyaltyUpValue = toPrizedByMoney(characterModel);
	self.controller.dispatchEvent(LController.NOTIFY_ALL);
	var characterListView = self.getParentByConstructor(CharacterListView);
	var e = new LEvent(CharacterListEvent.LIST_CHANGE);
	e.characterModel = characterModel;
	characterListView.dispatchEvent(e);
	//武将{0}的忠诚度提升了{1}!
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_prize_success_message"), characterModel.name(),loyaltyUpValue),height:200,okEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
CharacterDetailedTabStatusView.prototype.clickRecruit=function(event){
	var btnRecruit = event.currentTarget;
	var self = btnRecruit.getParentByConstructor(CharacterDetailedTabStatusView);
	//btnRecruit.removeEventListener(LMouseEvent.MOUSE_UP,self.clickRecruit);
	var detailedView = self.getParentByConstructor(CharacterDetailedView);
	var characterModel = self.controller.getValue("selectedCharacter");
	var cityData = self.controller.getValue("cityData");
	characterModel.job(Job.END);
	var script;
	var parentConfig = charactersParentConfig.find(function(child){
		return child.id == characterModel.id();
	}), parentCharacter;
	if(parentConfig){
		parentCharacter = CharacterModel.getChara(parentConfig.parent);
	}
	if((parentConfig && parentCharacter.seigniorId() == cityData.seigniorCharaId()) 
	|| calculateHitrateSurrender(LMvc.selectSeignorId, characterModel)){
		var cityData = self.controller.getValue("cityData");
		if(parentConfig && parentCharacter.seigniorId() == cityData.seigniorCharaId()){
			characterModel.loyalty(parentCharacter.loyalty());
		}else{
			calculateLoyalty(characterModel, LMvc.selectSeignorId);
		}
		characterModel.seigniorId(LMvc.selectSeignorId);
		cityData.removeCaptives(characterModel.id());
		cityData.addGenerals(characterModel);
		//详细更新
		detailedView.changeCharacter(0);
		script = "SGJTalk.show(" + characterModel.id() + ",0,"+Language.get("dialog_recruit_success_message")+");";//愿效犬马之劳!
		script += "SGJBattleResult.selfCaptiveWin();";
	}else{
		var buttonParent = btnRecruit.parent;
		var index = buttonParent.getChildIndex(btnRecruit);
		var disableButton = getButton(Language.get("recruit"),200, "win07");
		disableButton.x = btnRecruit.x;
		disableButton.y = btnRecruit.y;
		btnRecruit.remove();
		buttonParent.addChildAt(disableButton, index);
		disableButton.staticMode = true;
		
		script = "SGJTalk.show(" + characterModel.id() + ",0,"+Language.get("dialog_recruit_fail_message")+");";//少废话!忠臣不事二主!
		script += "SGJBattleResult.selfCaptiveWin(1);";
	}
	//list更新
	var listView = self.controller.view.listView;
	var items = listView.getItems();
	var item = items.find(function(child){
		return characterModel.id() == child.charaModel.id();
	});
	item.set(characterModel);
	item.cacheAsBitmap(false);
	item.updateView();
	LGlobal.script.addScript(script);
};
CharacterDetailedTabStatusView.prototype.clickRelease=function(event){
	var self = event.currentTarget.getParentByConstructor(CharacterDetailedTabStatusView);
	var detailedView = self.getParentByConstructor(CharacterDetailedView);
	var characterModel = self.controller.getValue("selectedCharacter");
	var cityData = self.controller.getValue("cityData");
	cityData.removeCaptives(characterModel.id());
	var targetSeignior = characterModel.seignior();
	
	if(targetSeignior && targetSeignior.areas().length > 0){
		var areas = targetSeignior.areas();
		var city = areas[areas.length * Math.fakeRandom() >>> 0];
		characterModel.moveTo(city.id());
		characterModel.moveTo();
		detailedView.deleteChildFromList(characterModel.id());
	}else{
		characterModel.seignior(0);
		cityData.addOutOfOfficeCharacter(characterModel);
		detailedView.updateChildFromList(characterModel.id());
	}
	//var detailedView = self.getParentByConstructor(CharacterDetailedView);
	
	//武将{0}被释放了!
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_release_message"), characterModel.name()),height:200,okEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
CharacterDetailedTabStatusView.prototype.clickBehead=function(event){
	var self = event.currentTarget.getParentByConstructor(CharacterDetailedTabStatusView);
	var detailedView = self.getParentByConstructor(CharacterDetailedView);
	var characterModel = self.controller.getValue("selectedCharacter");
	characterModel.toDie();
	beheadCountPlus();
	detailedView.deleteChildFromList(characterModel.id());
	//武将{0}被斩首了!
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_behead_message"), characterModel.name()),height:200,okEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
