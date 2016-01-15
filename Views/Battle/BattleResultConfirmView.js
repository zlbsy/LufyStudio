function BattleResultConfirmView(controller, confirmType, params){
	var self = this;
	LExtends(self,LView,[controller]);
	self.initLayer();
	self.setBackground();
	if(confirmType == BattleResultConfirmType.selfCaptive){
		self.characterModel = params.characterModel;
		self.setSelfCaptive();
	} 
}
BattleResultConfirmView.prototype.initLayer = function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
};
BattleResultConfirmView.prototype.setBackground = function(){
	var self = this;
	self.windowWidth = 420;
	self.windowHeight = 430;
	var windowData = new LBitmapData(LMvc.datalist["win05"]);
	var windowPanel = new LPanel(windowData,self.windowWidth,self.windowHeight);
	windowPanel.cacheAsBitmap(true);
	self.baseLayer.addChild(windowPanel);
	self.baseLayer.x = (LGlobal.width - self.windowWidth)*0.5;
};
BattleResultConfirmView.prototype.setSelfCaptive = function(){
	var self = this;
	self.setCharacter();
	var lblMsg = getStrokeLabel(String.format("俘虏了敌将{0}!",self.characterModel.name()),20,"#FFFFFF","#000000",4);
	lblMsg.x = (self.windowWidth - lblMsg.getWidth())*0.5;
	lblMsg.y = 325;
	self.baseLayer.addChild(lblMsg);
	var buttonLayer = new LSprite();
	self.baseLayer.addChild(buttonLayer);
	buttonLayer.y = 355;
	var btnCaptive = getButton("招降",100);
	btnCaptive.x = (self.windowWidth - 100)*0.5 - 110;
	btnCaptive.name = "Surrender";
	buttonLayer.addChild(btnCaptive);
	//btnCaptive.addEventListener(LMouseEvent.MOUSE_UP, self.captiveCheck);
	var btnRelease = getButton("释放",100);
	btnRelease.x = (self.windowWidth - 100)*0.5;
	btnRelease.name = "Release";
	buttonLayer.addChild(btnRelease);
	//btnRelease.addEventListener(LMouseEvent.MOUSE_UP, self.captiveCheck);
	var btnBehead = getButton("斩首",100);
	btnBehead.x = (self.windowWidth - 100)*0.5 + 110;
	btnBehead.name = "Behead";
	buttonLayer.addChild(btnBehead);
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
	
};