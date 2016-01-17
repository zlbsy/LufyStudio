function BattleResultConfirmView(controller, params){
	var self = this;
	LExtends(self,LView,[controller]);
	self.initLayer();
	self.setBackground();
	self.confirmType = params.confirmType;
	self.characterModel = params.characterModel;
	self.message = params.message;
	self.winSeigniorId = params.winSeigniorId;
	self.failSeigniorId = params.failSeigniorId;
	self.leaderId = params.leaderId;
	self.retreatCityId = params.retreatCityId;
	console.log("BattleResultConfirmView", params.confirmType);
	switch(self.confirmType){
		case BattleWinConfirmType.selfCaptive:
			self.setSelfCaptive();
			break;
		case BattleWinConfirmType.selfRecruitFail:
			self.setSelfRecruitFail();
			break;
		case BattleWinConfirmType.enemyCaptive:
			self.setEnemyCaptive();
			break;
		case BattleWinConfirmType.attackAndOccupy:
			self.setAttackAndOccupy();
			break;
		case BattleFailConfirmType.selectMoveCity:
			self.setSelectMoveCity();
			break;
		case BattleFailConfirmType.enemyCaptive:
			self.setFailEnemyCaptive();
			break;
		case BattleFailConfirmType.selfCaptive:
			self.setFailSelfCaptive();
			break;
		case BattleFailConfirmType.attackAndOccupy:
			self.setAttackAndOccupy();
			break;
	}
	var y = self.baseLayer.y;
	self.baseLayer.y = LGlobal.height;
	LTweenLite.to(self.baseLayer,0.3,{y:y});
}
BattleResultConfirmView.prototype.initLayer = function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	self.buttonLayer = new LSprite();
	self.baseLayer.addChild(self.buttonLayer);
};
BattleResultConfirmView.prototype.resize = function(w, h){
	var self = this;
	self.windowWidth = w;
	self.windowHeight = h;
	self.windowPanel.cacheAsBitmap(false);
	self.windowPanel.resize(w, h);
	self.windowPanel.cacheAsBitmap(true);
	self.baseLayer.x = (LGlobal.width - self.windowWidth)*0.5;
	self.baseLayer.y = (LGlobal.height - self.windowHeight)*0.5;
};
BattleResultConfirmView.prototype.setBackground = function(){
	var self = this;
	self.windowWidth = 420;
	self.windowHeight = 430;
	var windowData = new LBitmapData(LMvc.datalist["win05"]);
	var windowPanel = new LPanel(windowData,self.windowWidth,self.windowHeight);
	windowPanel.cacheAsBitmap(true);
	self.windowPanel = windowPanel;
	self.baseLayer.addChildAt(windowPanel, 0);
	self.resize(self.windowWidth, self.windowHeight);
};
BattleResultConfirmView.prototype.setFailSelfCaptive = function(){
	var self = this;
	self.setOnlyMessage(Language.get("rescue_enemy_captive_dialog_msg"), BattleResultEvent.RESCUE_CAPTIVE);//我军俘虏的敌将也被救回去了!
};
BattleResultConfirmView.prototype.setFailEnemyCaptive = function(){
	var self = this, message;
	var toCity = self.controller.battleData.toCity;
	var fromCity = self.controller.battleData.fromCity;
	var seigniorId = toCity.seigniorCharaId();
	if(calculateHitrateSurrender(seigniorId, self.characterModel)){//投降
		self.surrender(seigniorId, self.characterModel);
		message = String.format(Language.get("surrender_dialog_msg"),self.characterModel.name());//{0}投降了敌军!
	}else if(calculateHitrateBehead(self.leaderId, self.characterModel)){//斩首
		message = String.format(Language.get("beheaded_dialog_msg"),self.characterModel.name());//{0}被敌军斩首了!
	}else if(calculateHitrateRelease(self.leaderId, self.characterModel)){//释放
		if(toCity.seigniorCharaId() == LMvc.selectSeignorId){
			self.characterModel.moveTo(self.retreatCityId);
			self.characterModel.moveTo();
		}
		message = String.format(Language.get("released_dialog_msg"),self.characterModel.name());//{0}被敌军释放了!
	}else{//俘虏
		toCity.addCaptives(self.characterModel);
		message = String.format(Language.get("captived_dialog_msg"),self.characterModel.name());//{0}被敌军俘虏了!
	}
	self.setOnlyMessage(message, BattleResultEvent.CLOSE_FAIL_CAPTIVE);
};
BattleResultConfirmView.prototype.setSelectMoveCity = function(){
	var self = this;
	var battleData = self.controller.battleData;
	var city = battleData.toCity;
	var fromSeigniorCharaId = battleData.fromCity.seigniorCharaId();
	var fromSeignior = CharacterModel.getChara(fromSeigniorCharaId);
	if(city.generals().length > self.model.enemyCaptive.length){
		var selectCitys = 0;
		var neighbors = battleData.toCity.neighbor();
		var cityButtonLayer = new LSprite();
		cityButtonLayer.y = 70;
		self.baseLayer.addChild(cityButtonLayer);
		for(var i=0,l=neighbors.length;i<l;i++){
			var neighbor = AreaModel.getArea(neighbors[i]);
			if(neighbor.seigniorCharaId() > 0 && neighbor.seigniorCharaId() != LMvc.selectSeignorId){
				continue;
			}
			var btnMoveTo = getButton(neighbor.name(),100);
			btnMoveTo.x = (selectCitys % 3)*120;
			btnMoveTo.y = (selectCitys / 3 >> 0)*55;
			btnMoveTo.cityId = neighbor.id();
			btnMoveTo.eventType = BattleResultEvent.LOSE_CITY;
			cityButtonLayer.addChild(btnMoveTo);
			selectCitys++;
		}
		if(selectCitys == 0){
			//self.cityChange(self.model.enemyCaptive,  self.controller.battleData.expeditionEnemyCharacterList);
			//self.enemyCaptiveFail();
			console.error("全部被俘");
		}else{
			cityButtonLayer.x = (self.windowWidth - cityButtonLayer.getWidth())*0.5;
			if(selectCitys <= 3){
				cityButtonLayer.y += 30;
			}
			self.buttonLayer.visible = false;
		}
		self.setOnlyMessage(String.format(Language.get("retreat_city_dialog_msg"), city.name(), fromSeignior.name()), BattleResultEvent.LOSE_CITY);//{0}被{1}军占领了，撤往哪里？
		cityButtonLayer.addEventListener(LMouseEvent.MOUSE_UP, self.citySelectOnClick);
	}else{
		self.setOnlyMessage(String.format(Language.get("lose_city_dialog_msg"), city.name(), fromSeignior.name()), BattleResultEvent.LOSE_CITY);//{0}被{1}军占领了
	}
	self.removeEventListener(BattleResultEvent.LOSE_CITY);
	self.addEventListener(BattleResultEvent.LOSE_CITY, self.citySelected);
};
BattleResultConfirmView.prototype.citySelected=function(event){
	var self = event.currentTarget;
	console.log("self.retreatCityId = " + self.retreatCityId);
	self.parent.retreatCityId = self.retreatCityId;
	var city = self.controller.battleData.toCity;
	self.retreatCity = AreaModel.getArea(self.retreatCityId);
	/*if(!self.retreatCity.seigniorCharaId()){
		console.log("self.failSeigniorId="+self.failSeigniorId);
		var seignior = SeigniorModel.getSeignior(self.failSeigniorId);
		console.log("seignior="+seignior);
		seignior.addCity(self.retreatCityId);
		self.retreatCity.seigniorCharaId(self.failSeigniorId);
		console.log("self.retreatCity="+self.retreatCity.seigniorCharaId());
	}*/
	//战斗失败后资源移动
	battleExpeditionMove(city, self.retreatCity);
	battleCityChange(self.winSeigniorId, self.failSeigniorId, self.retreatCityId, self.model.enemyCaptive,  self.controller.battleData.expeditionEnemyCharacterList);
	self.parent.dispatchEvent(BattleResultEvent.LOSE_CITY);
};
BattleResultConfirmView.prototype.citySelectOnClick=function(event){
	var button = event.target;
	var baseLayer = event.currentTarget.parent;
	var self = baseLayer.parent;
	self.retreatCityId = event.target.cityId;
	self.tweenClose(event);
};
BattleResultConfirmView.prototype.setSelfCaptive = function(){
	var self = this;
	self.addEventListener(BattleResultEvent.SURRENDER_CAPTIVE, self.captiveSurrender);
	self.selfCaptiveButton(Language.get("captive_dialog_msg"), BattleResultEvent.SURRENDER_CAPTIVE);//俘虏了敌将{0}!
};
BattleResultConfirmView.prototype.setSelfRecruitFail = function(){
	var self = this;
	self.addEventListener(BattleResultEvent.CAPTIVE_CAPTIVE, self.captiveCaptive);
	self.selfCaptiveButton(Language.get("recruit_fail_dialog_msg"), BattleResultEvent.CAPTIVE_CAPTIVE);//敌将{0}拒绝加入我军!
};
BattleResultConfirmView.prototype.setEnemyCaptive = function(){
	var self = this;
	self.setOnlyMessage(Language.get("rescue_self_captive_dialog_msg"), BattleResultEvent.RESCUE_CAPTIVE);//被敌军俘虏的将领也被救回来了
};
BattleResultConfirmView.prototype.setAttackAndOccupy = function(){
	var self = this;
	self.setOnlyMessage(self.message, BattleResultEvent.ATTACK_AND_OCCUPY);//攻占
};
BattleResultConfirmView.prototype.setOnlyMessage = function(msg, eventType){
	var self = this;
	self.resize(400,200);
	var lblMsg = getStrokeLabel(msg, 20, "#FFFFFF", "#000000", 4);
	lblMsg.x = (self.windowWidth - lblMsg.getWidth())*0.5;
	lblMsg.y = 30;
	self.baseLayer.addChild(lblMsg);
	//buttonLayer.y = 355;
	var btnConfirm = getButton(Language.get("confirm"),100);//确认按钮
	btnConfirm.x = (self.windowWidth - 100)*0.5;
	btnConfirm.eventType = eventType;
	if(eventType){
		self.addEventListener(eventType, self.closeSelf);
	}
	self.buttonLayer.addChild(btnConfirm);
	self.buttonLayer.y = 120;
	self.buttonLayer.addEventListener(LMouseEvent.MOUSE_UP, self.tweenClose);
};
BattleResultConfirmView.prototype.closeSelf=function(event){
	var self = event.currentTarget;
	self.parent.dispatchEvent(event.eventType);
};
BattleResultConfirmView.prototype.selfCaptiveButton = function(msg, leftEventType){
	var self = this;
	self.setCharacter();
	var lblMsg = getStrokeLabel(String.format(msg, self.characterModel.name()), 20, "#FFFFFF", "#000000", 4);
	lblMsg.x = (self.windowWidth - lblMsg.getWidth())*0.5;
	lblMsg.y = 325;
	self.baseLayer.addChild(lblMsg);
	var buttonLayer = self.buttonLayer;
	buttonLayer.y = 355;
	var btnCaptive;
	if(leftEventType == BattleResultEvent.SURRENDER_CAPTIVE){
		btnCaptive = getButton(Language.get("recruit"),100);//招降
	}else{
		btnCaptive = getButton(Language.get("captive"),100);//俘虏
	}
	btnCaptive.x = (self.windowWidth - 100)*0.5 - 110;
	btnCaptive.eventType = leftEventType;
	buttonLayer.addChild(btnCaptive);
	var btnRelease = getButton(Language.get("release"),100);//释放
	btnRelease.x = (self.windowWidth - 100)*0.5;
	btnRelease.eventType = BattleResultEvent.RELEASE_CAPTIVE;
	buttonLayer.addChild(btnRelease);
	var btnBehead = getButton(Language.get("behead"),100);//斩首
	btnBehead.x = (self.windowWidth - 100)*0.5 + 110;
	btnBehead.eventType = BattleResultEvent.BEHEAD_CAPTIVE;
	buttonLayer.addChild(btnBehead);
	
	self.addEventListener(BattleResultEvent.RELEASE_CAPTIVE, self.captiveRelease);
	self.addEventListener(BattleResultEvent.BEHEAD_CAPTIVE, self.captiveBehead);
	buttonLayer.addEventListener(LMouseEvent.MOUSE_UP, self.tweenClose);
};
BattleResultConfirmView.prototype.tweenClose=function(event){
	var buttonLayer = event.currentTarget;
	var button = event.target;
	var baseLayer = buttonLayer.parent;
	baseLayer.parent.eventType = button.eventType;
	LTweenLite.to(buttonLayer.parent,0.3,{y:LGlobal.height,onComplete:function(e){
		var self = e.target.parent;
		self.dispatchEvent(self.eventType);
		if(LMvc.BattleController){
			self.remove();
		}
	}});
};
BattleResultConfirmView.prototype.surrender=function(seigniorId){
	var self = this;
	var city = self.controller.battleData.toCity;
	self.characterModel.moveTo(city.id());
	self.characterModel.moveTo();
	self.characterModel.seigniorId(seigniorId);
};
BattleResultConfirmView.prototype.captiveSurrender=function(event){
	var self = event.currentTarget, script;
	if(calculateHitrateSurrender(LMvc.selectSeignorId, self.characterModel)){
		self.surrender(LMvc.selectSeignorId);
		script = "SGJTalk.show(" + self.characterModel.id() + ",0,"+Language.get("recruit_success")+");";//愿效犬马之力!
		script += "SGJBattleResult.talk("+BattleResultEvent.CLOSE_CAPTIVE+");";
		self.model.selfCaptive.splice(0, 1);
	}else{
		var resultView = self.parent;
		resultView.checkCaptives.push(self.characterModel.id());
		script = "SGJTalk.show(" + self.characterModel.id() + ",0,"+Language.get("recruit_fail")+");";//少废话!忠臣不事二主!
		script += "SGJBattleResult.talk("+BattleResultEvent.CLOSE_CAPTIVE+");";
	}
	LGlobal.script.addScript(script);
};
BattleResultConfirmView.prototype.captiveCaptive=function(event){
	var self = event.currentTarget, script;
	self.controller.battleData.toCity.addCaptives(self.characterModel);
	self.model.selfCaptive.splice(0, 1);
	self.parent.dispatchEvent(BattleResultEvent.CLOSE_CAPTIVE);
};
BattleResultConfirmView.prototype.captiveRelease=function(event){
	var self = event.currentTarget;
	var resultView = self.parent;
	if(self.controller.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		console.log("释放retreatCityId="+resultView.retreatCityId);
		self.characterModel.moveTo(resultView.retreatCityId);
		self.characterModel.moveTo();
	}
	self.model.selfCaptive.splice(0, 1);
	self.parent.dispatchEvent(BattleResultEvent.CLOSE_CAPTIVE);
};
BattleResultConfirmView.prototype.captiveBehead=function(event){
	var self = event.currentTarget;
	self.model.selfCaptive.splice(0, 1);
	self.parent.dispatchEvent(BattleResultEvent.CLOSE_CAPTIVE);
};
BattleResultConfirmView.prototype.setCharacter = function(){
	var self = this;
	var faceW = 220, faceH = 320;
	var txtHeight = 25, startY = -txtHeight + 10, startX = 5;
	var face = self.characterModel.face();
	face.x = 5;
	face.y = 5;
	self.baseLayer.addChild(face);
	var statusLayer = new LSprite();
	statusLayer.x = faceW + 10;
	statusLayer.y = 5;
	self.baseLayer.addChild(statusLayer);
	var skill = self.characterModel.skill();
	var labels = ["name","force","command","intelligence","agility","luck","stunt"];
	var datas = [
	self.characterModel.name(),
	self.characterModel.force(),
	self.characterModel.command(),
	self.characterModel.intelligence(),
	self.characterModel.agility(),
	self.characterModel.luck(),
	skill?skill.name():Language.get("null")
	];
	for(var i=0;i<labels.length;i++){
		startY += txtHeight;
		var lblLeft = getStrokeLabel(String.format("{0} : {1}",Language.get(labels[i]), datas[i]),20,"#FFFFFF","#000000",4);
		lblLeft.x = startX;
		lblLeft.y = startY;
		statusLayer.addChild(lblLeft);
	}
	
	var soldiers = self.characterModel.soldiers();
	var soldierList = [];
	for(var i=0;i<soldiers.length;i++){
		var soldier = soldiers[i];
		var label = String.format("{0} {1}({2})", soldier.name(), Language.get("proficiency"),soldier.proficiency());
		soldierList.push({label:label,proficiency:soldier.proficiency()});
	}
	soldierList = soldierList.sort(function(a, b) {return b.proficiency - a.proficiency;});
	startY += 10;
	for(var i=0;i<2;i++){
		var soldier = soldierList[i];
		startY += txtHeight;
		var lblLeft = getStrokeLabel(soldier.label,20,"#FFFFFF","#000000",4);
		lblLeft.x = startX;
		lblLeft.y = startY;
		statusLayer.addChild(lblLeft);
	}
	statusLayer.cacheAsBitmap(true);
};