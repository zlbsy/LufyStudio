function CharacterDetailedTabStatusView(controller){
	var self = this;
	base(self,LView,[controller]);
}
CharacterDetailedTabStatusView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
};
CharacterDetailedTabStatusView.prototype.updateView=function(){
	var self = this;
	self.showStatus();
};
CharacterDetailedTabStatusView.prototype.showStatus=function(){
	var self = this;
	var statusLayer = new LSprite();
	var characterModel = self.controller.getValue("selectedCharacter");
	var battleStatus = self.controller.getValue("battleStatus");
	var txtHeight = 25, startY = 5, startX = 5;
	var labels = ["belong","identity","city","loyalty","status"];
	var seigniorId = characterModel.seigniorId();
 	var loyaltyLabel = seigniorId > 0 ? characterModel.loyalty() : "--";
	var datas = [
	self.characterModel.seigniorName(),
	self.characterModel.identity(),
	self.characterModel.city().name(),
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
	statusLayer.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width - 50, startY]);
	statusLayer.cacheAsBitmap(true);
	var backLayer = new LSprite();
	backLayer.addChild(statusLayer);
	self.setCtrlButtons(backLayer);
	var sc = new LScrollbar(backLayer, LGlobal.width - 50, LGlobal.height - self.tabLayer.y - 70, 10);
	sc.x = 10;
	sc.y = 50;
	self.tabLayer.addChild(sc);
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
			//btnRecruit.addEventListener(LMouseEvent.MOUSE_UP,self.clickRecruit);
		}
		var btnRelease = getButton(Language.get("release"),200);//释放
		btnRelease.x = LGlobal.width - 260;
		btnRelease.y = 55;
		backLayer.addChild(btnRelease);
		//btnRelease.addEventListener(LMouseEvent.MOUSE_UP,self.clickRelease);
		var btnBehead = getButton(Language.get("behead"),200);//斩首
		btnBehead.x = LGlobal.width - 260;
		btnBehead.y = 105;
		backLayer.addChild(btnBehead);
		//btnBehead.addEventListener(LMouseEvent.MOUSE_UP,self.clickBehead);
	}else if(characterModel.loyalty() < 100 && !characterModel.isPrized()){
		var btnPrized = getButton(Language.get("褒奖"),200);//褒奖
		btnPrized.x = LGlobal.width - 260;
		btnPrized.y = 5;
		backLayer.addChild(btnPrized);
		//btnPrized.addEventListener(LMouseEvent.MOUSE_UP,self.clickPrized);
	}
};
CharacterDetailedTabStatusView.prototype.clickPrized=function(event){
	event.currentTarget.visible = false;
	var self = event.currentTarget.getParentByConstructor(CharacterDetailedView);
	var charaModel = self.characterModel;
	var cityData = self.controller.getValue("cityData");
	if(cityData.money() < JobPrice.PRIZE){
		var obj = {title:Language.get("confirm"),message:String.format(Language.get("金钱不够，褒奖一次需要{0}金钱!"), JobPrice.PRIZE),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return;
	}
	var loyaltyUpValue = toPrizedByMoney(charaModel);
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("武将{0}的忠诚度提升了{1}!"), charaModel.name(),loyaltyUpValue),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
};
CharacterDetailedTabStatusView.prototype.clickRecruit=function(event){
	var btnRecruit = event.currentTarget;
	var self = btnRecruit.parent.parent.parent.parent.parent;
	var charaModel = self.characterModel;
	charaModel.job(Job.END);
	btnRecruit.alpha = 0.4;
	var script;
	if(calculateHitrateSurrender(LMvc.selectSeignorId, charaModel)){
		var cityData = self.controller.getValue("cityData");
		charaModel.seigniorId(LMvc.selectSeignorId);
		cityData.removeCaptives(charaModel.id());
		cityData.addGenerals(charaModel);
		var characterChildView = self.getCharacterChildView();
		characterChildView.set(charaModel);
		self.changeCharacter(0);
		script = "SGJTalk.show(" + charaModel.id() + ",0,愿效犬马之力!);";
		script += "SGJBattleResult.selfCaptiveWin();";
	}else{
		script = "SGJTalk.show(" + charaModel.id() + ",0,少废话!忠臣不事二主!);";
		script += "SGJBattleResult.selfCaptiveWin(1);";
	}
	LGlobal.script.addScript(script);
};
CharacterDetailedTabStatusView.prototype.clickRelease=function(event){
	var self = event.currentTarget.parent.parent.parent.parent.parent;
	var charaModel = self.characterModel;
	var cityData = self.controller.getValue("cityData");
	cityData.removeCaptives(charaModel.id());
	var targetSeignior = charaModel.seignior();
	var areas = targetSeignior.areas();
	var city = areas[areas.length * Math.random() >>> 0];
	charaModel.moveTo(city.id());
	charaModel.moveTo();
	var characterChildView = self.getCharacterChildView();
	characterChildView.toDelete();
	self.closeCharacterDetailed();
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("武将{0}被释放了"), charaModel.name()),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
};
CharacterDetailedTabStatusView.prototype.clickBehead=function(event){
	var self = event.currentTarget.parent.parent.parent.parent.parent;
	var charaModel = self.characterModel;
	var cityData = self.controller.getValue("cityData");
	cityData.removeCaptives(charaModel.id());
	var characterChildView = self.getCharacterChildView();
	characterChildView.toDelete();
	self.closeCharacterDetailed();
	var obj = {title:Language.get("confirm"),message:String.format(Language.get("武将{0}被斩首了"), charaModel.name()),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
};
CharacterDetailedTabStatusView.prototype.getCharacterChildView=function(){
	var self = this;
	var scrollbar = self.controller.view.contentLayer.childList.find(function(child){
		return child.constructor.name == "LScrollbar";
	});
	var characterChildView = scrollbar._showObject.childList.find(function(child){
		return child.charaModel && child.charaModel.id() == self.characterModel.id();
	});
	return characterChildView;
};
