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
	var txtHeight = 25, startY = 5, startX = 5;
	var labels = ["belong","identity","city","loyalty","status"];
	var seigniorId = characterModel.seigniorId();
 	var loyaltyLabel = seigniorId > 0 ? characterModel.loyalty() : "--";
	var datas = [
	characterModel.seigniorName(),
	characterModel.identity(),
	characterModel.city().name(),
	loyaltyLabel,
	battleStatus ? battleStatus : characterModel.jobLabel()
	];
	var skill = characterModel.skill();
	if(skill){
		labels.push("stunt");
		datas.push(String.format("{0} ({1})",skill.name(),skill.explanation()));
	}
	for(var i=0;i<labels.length;i++){
		var height = txtHeight;
		var lblCost = getStrokeLabel(String.format("{0} : {1}",Language.get(labels[i]), datas[i]),20,"#FFFFFF","#000000",4);
		if(labels[i] == "stunt" || labels[i] == "status"){
			lblCost.width = LGlobal.width - 60;
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
	self.setCtrlButtons(backLayer);
	var sc = new LScrollbar(backLayer, self.tabWidth, self.tabHeight, 10);
	self.addChild(sc);
};
CharacterDetailedTabStatusView.prototype.setCtrlButtons=function(backLayer){
	var self = this;
	var characterModel = self.controller.getValue("selectedCharacter");
	var battleStatus = self.controller.getValue("battleStatus");
	if(battleStatus || characterModel.city().seigniorCharaId() != LMvc.selectSeignorId){
		return;
	}
	if(characterModel.seigniorId() > 0 && characterModel.seigniorId() != LMvc.selectSeignorId){
		var btnRecruit = getButton(Language.get("recruit"),200);//招降
		btnRecruit.x = LGlobal.width - 260;
		btnRecruit.y = 5;
		backLayer.addChild(btnRecruit);
		if(characterModel.job() == Job.END){
			btnRecruit.alpha = 0.4;
		}else{
			btnRecruit.addEventListener(LMouseEvent.MOUSE_UP,self.clickRecruit);
		}
		var btnRelease = getButton(Language.get("release"),200);//释放
		btnRelease.x = LGlobal.width - 260;
		btnRelease.y = 55;
		backLayer.addChild(btnRelease);
		btnRelease.addEventListener(LMouseEvent.MOUSE_UP,self.clickRelease);
		var btnBehead = getButton(Language.get("behead"),200);//斩首
		btnBehead.x = LGlobal.width - 260;
		btnBehead.y = 105;
		backLayer.addChild(btnBehead);
		btnBehead.addEventListener(LMouseEvent.MOUSE_UP,self.clickBehead);
	}else if(characterModel.loyalty() < 100 && !characterModel.isPrized()){
		var btnPrized = getButton(Language.get("褒奖"),200);//褒奖
		btnPrized.x = LGlobal.width - 260;
		btnPrized.y = 5;
		backLayer.addChild(btnPrized);
		btnPrized.addEventListener(LMouseEvent.MOUSE_UP,self.clickPrized);
	}
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
	//武将{0}的忠诚度提升了{1}!
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_prize_success_message"), characterModel.name(),loyaltyUpValue),height:200,okEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
CharacterDetailedTabStatusView.prototype.clickRecruit=function(event){
	var btnRecruit = event.currentTarget;
	var self = btnRecruit.getParentByConstructor(CharacterDetailedTabStatusView);
	btnRecruit.removeEventListener(LMouseEvent.MOUSE_UP,self.clickRecruit);
	var detailedView = self.getParentByConstructor(CharacterDetailedView);
	var characterModel = self.controller.getValue("selectedCharacter");
	var cityData = self.controller.getValue("cityData");
	characterModel.job(Job.END);
	btnRecruit.alpha = 0.4;
	var script;
	if(calculateHitrateSurrender(LMvc.selectSeignorId, characterModel)){
		var cityData = self.controller.getValue("cityData");
		characterModel.seigniorId(LMvc.selectSeignorId);
		cityData.removeCaptives(characterModel.id());
		cityData.addGenerals(characterModel);
		//list更新
		var listView = self.controller.view.listView;
		var items = listView.getItems();
		var item = items.find(function(child){
			return characterId == child.charaModel.id();
		});
		item.set(characterModel);
		item.cacheAsBitmap(false);
		item.updateView();
		//详细更新
		detailedView.changeCharacter(0);
		script = "SGJTalk.show(" + characterModel.id() + ",0,"+Language.get("dialog_recruit_success_message")+");";//愿效犬马之劳!
		script += "SGJBattleResult.selfCaptiveWin();";
	}else{
		script = "SGJTalk.show(" + characterModel.id() + ",0,"+Language.get("dialog_recruit_fail_message")+");";//少废话!忠臣不事二主!
		script += "SGJBattleResult.selfCaptiveWin(1);";
	}
	LGlobal.script.addScript(script);
};
CharacterDetailedTabStatusView.prototype.clickRelease=function(event){
	var self = event.currentTarget.getParentByConstructor(CharacterDetailedTabStatusView);
	var detailedView = self.getParentByConstructor(CharacterDetailedView);
	var characterModel = self.controller.getValue("selectedCharacter");
	var cityData = self.controller.getValue("cityData");
	cityData.removeCaptives(characterModel.id());
	var targetSeignior = characterModel.seignior();
	var areas = targetSeignior.areas();
	var city = areas[areas.length * Math.random() >>> 0];
	characterModel.moveTo(city.id());
	characterModel.moveTo();
	detailedView.deleteChildFromList(characterModel.id());
	//武将{0}被释放了!
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_release_message"), characterModel.name()),height:200,okEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
CharacterDetailedTabStatusView.prototype.clickBehead=function(event){
	var self = event.currentTarget.getParentByConstructor(CharacterDetailedTabStatusView);
	var detailedView = self.getParentByConstructor(CharacterDetailedView);
	var characterModel = self.controller.getValue("selectedCharacter");
	var cityData = self.controller.getValue("cityData");
	cityData.removeCaptives(characterModel.id());
	detailedView.deleteChildFromList(characterModel.id());
	//武将{0}被斩首了!
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("dialog_behead_message"), characterModel.name()),height:200,okEvent:null};
	var windowLayer = ConfirmWindow(obj);
	LMvc.layer.addChild(windowLayer);
};
