function BattleResultConfirmView(controller, params){
	var self = this;
	LExtends(self,LView,[controller]);
	self.initLayer();
	self.setBackground();
	self.confirmType = params.confirmType;
	self.characterModel = params.characterModel;
	self.message = params.message;
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
	}
	var y = self.baseLayer.y;
	self.baseLayer.y = LGlobal.height;
	LTweenLite.to(self.baseLayer,0.3,{y:y});
}
BattleResultConfirmView.prototype.initLayer = function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
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
	self.baseLayer.addChild(windowPanel);
	self.resize(self.windowWidth, self.windowHeight);
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
	self.setOnlyMessage(String.format(Language.get("rescue_self_captive_dialog_msg"), self.characterModel.name()), BattleResultEvent.RESCUE_CAPTIVE);//被敌军俘虏的将领也被救回来了
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
	var buttonLayer = new LSprite();
	self.baseLayer.addChild(buttonLayer);
	//buttonLayer.y = 355;
	var btnConfirm = getButton(Language.get("confirm"),100);//释放
	btnConfirm.x = (self.windowWidth - 100)*0.5;
	btnConfirm.y = 120;
	btnConfirm.eventType = eventType;
	self.addEventListener(eventType, self.closeSelf);
	buttonLayer.addChild(btnConfirm);
	buttonLayer.addEventListener(LMouseEvent.MOUSE_UP, self.captiveCheck);
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
	var buttonLayer = new LSprite();
	self.baseLayer.addChild(buttonLayer);
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
	buttonLayer.addEventListener(LMouseEvent.MOUSE_UP, self.captiveCheck);
};
BattleResultConfirmView.prototype.captiveCheck=function(event){
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
	var labels = ["name","force","command","intelligence","agility","luck",
	"stunt"];
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