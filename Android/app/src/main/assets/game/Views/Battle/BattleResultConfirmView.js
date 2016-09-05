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
		case BattleFailConfirmType.lossOfResources:
			self.setLossOfResources();
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
BattleResultConfirmView.prototype.setSelectMoveCity = function(){
	var self = this;
	var battleData = self.controller.battleData;
	var city = battleData.toCity;
	var fromSeigniorCharaId = battleData.fromCity.seigniorCharaId();
	var fromSeignior = CharacterModel.getChara(fromSeigniorCharaId);
	var generals = city.generals();
	if(generals.length > self.model.enemyCaptive.length){
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
		var message;
		if(selectCitys == 0){
			for(var i=0,l=generals.length;i<l;i++){
				var child = generals[i];
				if(self.model.enemyCaptive.indexOf(child.id())>=0){
					continue;
				}
				self.model.enemyCaptive.push(child.id());
			}
			///console.error("全员被俘");
			message = String.format(Language.get("lose_city_dialog_msg"), city.name(), fromSeignior.name());//{0}被{1}军占领了
		}else{
			cityButtonLayer.x = (self.windowWidth - cityButtonLayer.getWidth())*0.5;
			if(selectCitys <= 3){
				cityButtonLayer.y += 30;
			}
			self.buttonLayer.visible = false;
			message = String.format(Language.get("retreat_city_dialog_msg"), city.name(), fromSeignior.name());
		}
		self.setOnlyMessage(message, BattleResultEvent.LOSE_CITY);//{0}被{1}军占领了，撤往哪里？
		cityButtonLayer.addEventListener(LMouseEvent.MOUSE_UP, self.citySelectOnClick);
	}else{
		self.setOnlyMessage(String.format(Language.get("lose_city_dialog_msg"), city.name(), fromSeignior.name()), BattleResultEvent.LOSE_CITY);//{0}被{1}军占领了
	}
	self.removeEventListener(BattleResultEvent.LOSE_CITY);
	self.addEventListener(BattleResultEvent.LOSE_CITY, self.citySelected);
};
BattleResultConfirmView.prototype.citySelected=function(event){
	var self = event.currentTarget;
	var battleData = self.controller.battleData;
	if(self.retreatCityId){
		self.parent.retreatCityId = self.retreatCityId;
	}
	battleCityChange(self.winSeigniorId, self.failSeigniorId, self.retreatCityId,  battleData.expeditionEnemyCharacterList, battleData.toCity, self.model.enemyCaptive);
	self.retreatCityId = battleCheckRetreatCity(self.retreatCity, self.failSeigniorId, battleData.toCity);
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
BattleResultConfirmView.prototype.setLossOfResources = function(){
	var self = this;
	self.setOnlyMessage(self.message, BattleResultEvent.LOSS_OF_OCCUPY);//被掠夺
};
BattleResultConfirmView.prototype.setOnlyMessage = function(msg, eventType){
	var self = this;
	self.resize(400,200);
	var lblMsg = getStrokeLabel(msg, 20, "#FFFFFF", "#000000", 4);
	lblMsg.width = self.windowWidth - 60;
	lblMsg.setWordWrap(true,27);
	lblMsg.x = (self.windowWidth - lblMsg.getWidth())*0.5;
	lblMsg.y = 30;
	self.baseLayer.addChild(lblMsg);
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
	if(leftEventType == BattleResultEvent.SURRENDER_CAPTIVE && self.characterModel.id() != self.characterModel.seigniorId()){
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
	var areasLength = self.characterModel.seignior().areas().length;
	if(self.characterModel.id() == self.characterModel.seigniorId() && areasLength > 0){
		btnCaptive.visible = false;
		btnRelease.x = (self.windowWidth - 100)*0.5 - 60;
		btnBehead.x = (self.windowWidth - 100)*0.5 + 60;
	}
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
		if(self){
			self.dispatchEvent(self.eventType);
			if(LMvc.BattleController){
				self.remove();
			}
		}
	}});
};
BattleResultConfirmView.prototype.setFailEnemyCaptive = function(){
	var self = this;
	var toCity = self.controller.battleData.toCity;
	var fromCity = self.controller.battleData.fromCity;
	var message = captiveAutomatedProcessing(self.characterModel, self.leaderId, self.retreatCityId, toCity, fromCity);
	self.setOnlyMessage(message, BattleResultEvent.CLOSE_FAIL_CAPTIVE);
};
BattleResultConfirmView.prototype.captiveSurrender=function(event){
	var self = event.currentTarget, script;
	if(calculateHitrateSurrender(LMvc.selectSeignorId, self.characterModel)){
		generalSurrender(self.characterModel, self.controller.battleData.toCity);
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
	//俘虏
	var self = event.currentTarget, script;
	self.controller.battleData.toCity.addCaptives(self.characterModel);
	self.model.selfCaptive.splice(0, 1);
	self.characterModel.job(Job.END);
	self.parent.dispatchEvent(BattleResultEvent.CLOSE_CAPTIVE);
};
BattleResultConfirmView.prototype.captiveRelease=function(event){
	//释放
	var self = event.currentTarget;
	var resultView = self.parent;
	if(!resultView.retreatCityId){
		//下野
		self.characterModel.toOutOfOffice();
	}else if(self.characterModel.cityId() != resultView.retreatCityId){
		self.characterModel.moveTo(resultView.retreatCityId);
		self.characterModel.moveTo();
	}
	self.model.selfCaptive.splice(0, 1);
	self.parent.dispatchEvent(BattleResultEvent.CLOSE_CAPTIVE);
};
BattleResultConfirmView.prototype.captiveBehead=function(event){
	//斩首
	var self = event.currentTarget;
	self.characterModel.toDie();
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