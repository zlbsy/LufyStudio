function BattleCharacterView(controller, id, w, h) {
	var self = this;
	LExtends(self, CharacterView, [controller, id, w, h]);
	self.step = self.moveStep = 4;
	self.layer.x = self.layer.y = -8;
	self.belong = null;
	//行动方针
	self.mission = BattleCharacterMission.Initiative;
	if(controller.constructor.name == "BattleController"){
		self.AI = new BattleCharacterAI(self);
		self.inteAI = new BattleIntelligentAI(self);
		self.status = new CharacterStatusIconView(null);
		self.addChild(self.status);
	}
	self.addShape(LShape.RECT,[0,0,BattleCharacterSize.width,BattleCharacterSize.height]);
	self.mode = CharacterMode.NONE;
}
BattleCharacterView.cacheBitmapDatas = {};
BattleCharacterView.DEFAULT_IMG = "character-s-default";
BattleCharacterView.getAnimationData = function(){
	// 1792 x 64
	var list = LGlobal.divideCoordinate(1792, 64, 1, 28);
	var data = [
		[list[0][0],list[0][1],list[0][2],list[0][3],list[0][3]],//ATTACK 0
		[list[0][4],list[0][5],list[0][6],list[0][7],list[0][7]],//ATTACK 1
		[list[0][8],list[0][9],list[0][10],list[0][11],list[0][11]],//ATTACK 2
		[list[0][12],list[0][13]],//MOVE 3
		[list[0][14],list[0][15]],//MOVE 4
		[list[0][16],list[0][17]],//MOVE 5
		[list[0][18]],//STAND 6
		[list[0][19]],//STAND 7
		[list[0][20]],//STAND 8
		[list[0][21],list[0][22]],//PANT 9
		[list[0][23],list[0][23]],//BLOCK 10
		[list[0][24],list[0][24]],//BLOCK 11
		[list[0][25],list[0][25]],//BLOCK 12
		[list[0][26],list[0][26]],//HERT 13
		[list[0][27]],//WAKE 14
		[list[0][18],list[0][23],list[0][18],list[0][23],list[0][27],list[0][27],list[0][27]],//LEVELUP 15
		[list[0][19],list[0][24],list[0][19],list[0][24],list[0][27],list[0][27],list[0][27]],//LEVELUP 16
		[list[0][20],list[0][25],list[0][20],list[0][25],list[0][27],list[0][27],list[0][27]],//LEVELUP 17
		[list[0][0]],//MAGIC_ATTACK 18
		[list[0][4]],//MAGIC_ATTACK 19
		[list[0][8]],//MAGIC_ATTACK 20
	];
	return data;
};
BattleCharacterView.prototype.getBitmapData = function() {
	var self = this;
	var rowIndex = self.anime.rowIndex, colIndex = self.anime.colIndex;
	if(self.mode == CharacterMode.END_ACTION){
		colIndex = 0;
	}
	var key = self.data.currentSoldiers().img() + "_" + rowIndex+"_"+colIndex, endKey = key + "_end";
	var resultBitmapData;
	if(self.mode == CharacterMode.END_ACTION){
		if(BattleCharacterView.cacheBitmapDatas[endKey]){
			return BattleCharacterView.cacheBitmapDatas[endKey];
		}
	}
	if(self.direction == CharacterDirection.RIGHT){
		if(!BattleCharacterView.cacheBitmapDatas[key]){
			var bitmapData = self.anime.bitmap.bitmapData.clone();
			BattleCharacterView.cacheBitmapDatas[key] = new LBitmapData(null,0,0,bitmapData.width,bitmapData.height,LBitmapData.DATA_CANVAS);
			BattleCharacterView.cacheBitmapDatas[key].draw(bitmapData,new LMatrix(-1).translate(bitmapData.width,0));
		}
		resultBitmapData = BattleCharacterView.cacheBitmapDatas[key];
	}else{
		resultBitmapData = self.anime.bitmap.bitmapData;
	}
	if(self.mode == CharacterMode.END_ACTION){
		BattleCharacterView.cacheBitmapDatas[endKey] = new LBitmapData(null,0,0,resultBitmapData.width,resultBitmapData.height,LBitmapData.DATA_CANVAS);
		BattleCharacterView.cacheBitmapDatas[endKey].copyPixels(resultBitmapData,new LRectangle(0, 0, resultBitmapData.width, resultBitmapData.height), new LPoint(0,0));
	    BattleCharacterView.cacheBitmapDatas[endKey].colorTransform(new LRectangle(0, 0, resultBitmapData.width, resultBitmapData.height), new LColorTransform(0.4, 0.4, 0.4, 1, 0, 0, 0, 0));
		resultBitmapData = BattleCharacterView.cacheBitmapDatas[endKey];
	}
	return resultBitmapData;
};
BattleCharacterView.prototype.attackToHert = function(anime) {
	var self = anime.parent.parent;
	self.dispatchEvent(BattleCharacterActionEvent.ATTACK_ACTION_COMPLETE);
};
BattleCharacterView.prototype.attackSpecialCheck = function(anime) {
	var self = anime.parent.parent;
	console.log("self.isAngry",self.isAngry);
	console.log("self.groupSkill",self.groupSkill);
	if(self.isAngry){
		self.attackAngry();
	}else if(self.groupSkill){
		self.groupSkillExec();
	}
};
BattleCharacterView.prototype.groupSkillExec = function() {
	var self = this;
	self.anime.stop();
	var members = self.groupSkill.members();
	var script = "";
	script += "SGJTalk.show(" + self.data.id() + ",0," + Language.getSkillName(String.format("group_{0}", self.groupSkill.id())) + ");";
	for (var i = 0; i < members.length; i++) {
		if(members[i] == self.data.id()){
			continue;
		}
		script += "SGJTalk.show(" + members[i] + ",0," + Language.groupSkillTalk() + ");";
	}
	script += "SGJBattleCharacter.attackAngryExec(" + self.belong + ","+ self.data.id() + ");";
	LGlobal.script.addScript(script);
	self.groupSkill = null;
};
BattleCharacterView.prototype.attackAngry = function() {
	var self = this;
	self.isAngry = false;
	self.anime.stop();
	
	var script = "SGJTalk.show(" + self.data.id() + ",0," + self.data.angryTalk() + ");";
	script += "SGJBattleCharacter.attackAngryExec(" + self.belong + ","+ self.data.id() + ");";
	LGlobal.script.addScript(script);
};
BattleCharacterView.prototype.attackAngryExec = function(){
	var self = this;
	self.filterValue = 1;
	var shadow = new LDropShadowFilter(0,0,"#FFFF00",self.filterValue);
	self.filters = [shadow];
	var func = function(event){
		var obj = event.target;
		obj.filters[0].shadowBlur = obj.filterValue;
	};
	LTweenLite.to(self,0.2,{filterValue:15,onUpdate:func}).
	to(self,0.2,{filterValue:1,onUpdate:func}).
	to(self,0.2,{filterValue:15,onUpdate:func}).
	to(self,0.2,{filterValue:1,onUpdate:func,onComplete:self.showLightComplete});
};
BattleCharacterView.prototype.showLightComplete = function(event){
	var self = event.target;
	self.filters = null;
	self.anime.play();
};
BattleCharacterView.prototype.addAnimation = function() {
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist[BattleCharacterView.DEFAULT_IMG], 0, 0, BattleCharacterSize.width, BattleCharacterSize.height);
	self.anime = new LAnimationTimeline(bitmapData, BattleCharacterView.getAnimationData());
	self.anime.speed = BattleMapConfig.SPEED;
	self.layer.addChild(self.anime);
	self.setAnimationLabel();
	self.anime.setFrameSpeedAt(13,0,2);
	
	self.anime.addEventListener(LEvent.COMPLETE, self.actionComplete);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.DOWN),self.attackToHert,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.UP),self.attackToHert,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.LEFT),self.attackToHert,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.RIGHT),self.attackToHert,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.DOWN),self.attackSpecialCheck,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.UP),self.attackSpecialCheck,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.LEFT),self.attackSpecialCheck,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.RIGHT),self.attackSpecialCheck,[]);
	var isSelf = self.data.seigniorId() == LMvc.selectSeignorId;
	var img = self.data.currentSoldiers().img(isSelf);
	var loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE, self.loadSOver);
	loader.load(LMvc.IMG_PATH + "character/s/"+img+".png", "bitmapData");
};
BattleCharacterView.prototype.setAnimationLabel = function() {
	var self = this;
	var anime = self.anime;
	//ATTACK
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.DOWN),0,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.UP),1,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.LEFT),2,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.RIGHT),2,0,1,true);
	
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.DOWN),0,3,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.UP),1,3,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.LEFT),2,3,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.RIGHT),2,3,1,true);
	//MOVE
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MOVE,CharacterDirection.DOWN),3,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MOVE,CharacterDirection.UP),4,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MOVE,CharacterDirection.LEFT),5,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MOVE,CharacterDirection.RIGHT),5,0,1,true);
	//STAND
	anime.setLabel(String.format("{0}-{1}",CharacterAction.STAND,CharacterDirection.DOWN),6,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.STAND,CharacterDirection.UP),7,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.STAND,CharacterDirection.LEFT),8,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.STAND,CharacterDirection.RIGHT),8,0,1,true);
	//PANT
	anime.setLabel(String.format("{0}-{1}",CharacterAction.PANT,CharacterDirection.DOWN),9,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.PANT,CharacterDirection.UP),9,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.PANT,CharacterDirection.LEFT),9,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.PANT,CharacterDirection.RIGHT),9,0,1,false);
	//BLOCK
	anime.setLabel(String.format("{0}-{1}",CharacterAction.BLOCK,CharacterDirection.DOWN),10,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.BLOCK,CharacterDirection.UP),11,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.BLOCK,CharacterDirection.LEFT),12,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.BLOCK,CharacterDirection.RIGHT),12,0,1,true);
	//HERT
	anime.setLabel(String.format("{0}-{1}",CharacterAction.HERT,CharacterDirection.DOWN),13,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.HERT,CharacterDirection.UP),13,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.HERT,CharacterDirection.LEFT),13,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.HERT,CharacterDirection.RIGHT),13,0,1,false);
	//LEVELUP
	anime.setLabel(String.format("{0}-{1}",CharacterAction.WAKE,CharacterDirection.DOWN),14,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.WAKE,CharacterDirection.UP),14,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.WAKE,CharacterDirection.LEFT),14,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.WAKE,CharacterDirection.RIGHT),14,0,1,false);
	//LEVELUP
	anime.setLabel(String.format("{0}-{1}",CharacterAction.LEVELUP,CharacterDirection.DOWN),15,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.LEVELUP,CharacterDirection.UP),16,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.LEVELUP,CharacterDirection.LEFT),17,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.LEVELUP,CharacterDirection.RIGHT),17,0,1,true);
	//MAGIC_ATTACK
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MAGIC_ATTACK,CharacterDirection.DOWN),18,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MAGIC_ATTACK,CharacterDirection.UP),19,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MAGIC_ATTACK,CharacterDirection.LEFT),20,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MAGIC_ATTACK,CharacterDirection.RIGHT),20,0,1,true);
};
BattleCharacterView.prototype.loadSOver = function(event){
	var self = event.currentTarget.parent;
	var animeBitmapData = self.anime.bitmap.bitmapData;
	var bitmapData = new LBitmapData(event.target,animeBitmapData.x,animeBitmapData.y,animeBitmapData.width,animeBitmapData.height);
	self.anime.bitmap.bitmapData = bitmapData;
	self.toStatic(true);
};
BattleCharacterView.prototype.toStatic = function(value){
	var self = this;
	if(self.controller.constructor.name != "BattleController"){
		return;
	}
	console.log(self.data.name() , "toStatic",value,self.anime.visible);
	if(value){
		if(self.anime.visible){
			var result = self.controller.view.mapLayer.characterIn(self);
			console.log(self.data.name() ,"characterIn", result);
			if(result){
				self.anime.visible = false;
			}
		}
	}else{
		if(!self.anime.visible){
			self.controller.view.mapLayer.characterOut(self);
			self.anime.visible = true;
		}
	}
};
BattleCharacterView.prototype.onframe = function(event){
	var self = event.currentTarget.parent;
	self.move();
};
BattleCharacterView.prototype.setActionDirection = function(action, direction) {
	var self = this;
	if (self.action == action && self.direction == direction) {
		return;
	}
	if (!self.anime) {
		self.addAnimation();
	}
	self.anime._send_complete = false;
	var label = action + "-" + direction;
	
	self.anime.gotoAndPlay(label);
	
	self.action = action;
	self.direction = direction;
};
BattleCharacterView.prototype.actionComplete = function(event){
	var self = event.currentTarget.parent.parent;
	switch(self.action){
		case CharacterAction.HERT:
			self.dispatchEvent(BattleCharacterActionEvent.HERT_ACTION_COMPLETE);
			break;
		case CharacterAction.BLOCK:
			self.dispatchEvent(BattleCharacterActionEvent.BLOCK_ACTION_COMPLETE);
			break;
	}
};
BattleCharacterView.prototype.setRoad = function(list){
	var self = this;
	self.callParent("setRoad",arguments);
	self.mode = CharacterMode.MOVING;
};
BattleCharacterView.prototype.setRangeAttack = function(){
	var self = this;
	LMvc.BattleController.view.roadLayer.setRangeAttack(self);
	self.mode = CharacterMode.WAIT_ATTACK;
};
BattleCharacterView.prototype.setRangeSingleCombat = function(){
	var self = this;
	LMvc.BattleController.view.roadLayer.setRangeSingleCombat(self);
	self.mode = CharacterMode.WAIT_SINGLE_COMBAT;
};
BattleCharacterView.prototype.saveShowMoveRoadObject = function(roadList) {
	var self = this;
	self.showMoveRoadObject = {x:self.x,y:self.y,action:CharacterAction.MOVE,direction:self.direction,roadList:roadList};
};
BattleCharacterView.prototype.returnShowMoveRoadObject = function() {
	var self = this;
	self.setCoordinate(self.showMoveRoadObject.x,self.showMoveRoadObject.y);
	self.setActionDirection(self.showMoveRoadObject.action,self.showMoveRoadObject.direction);
	LMvc.BattleController.clickSelfCharacter(self);
};
BattleCharacterView.prototype.toDie = function(isSingleCombat) {
	var self = this;
	var script = "";
	self.data.wounded(0);
	if(self.data.isDefCharacter()){
		//防御设施被摧毁,城防降低
		self.data.city.cityDefense(-DefenseCharacterCost * 0.5);
	}
	if(!self.data.isDefCharacter() && !self.data.isTribeCharacter()){
		var talkMsg;
		if(isSingleCombat || calculateHitrateCaptive(self)){
			if(self.belong == Belong.ENEMY){
				LMvc.BattleController.model.selfCaptive.push(self.data.id());
			}else{
				LMvc.BattleController.model.enemyCaptive.push(self.data.id());
			}
			talkMsg = self.data.underArrestTalk();
		}else{
			talkMsg = self.data.dieTalk();
		}
	}else{
		talkMsg = self.data.dieTalk();
	}
	script += "SGJTalk.show(" + self.data.id() + ",0," + talkMsg + ");";
	script += "SGJBattleCharacter.characterToDie(" + self.belong + ","+ self.data.id() + ");";
	LGlobal.script.addScript(script);
};
BattleCharacterView.prototype.showStatusView = function() {
	var self = this;
	if(LMvc.characterStatusView && LMvc.characterStatusView.parent){
		LMvc.characterStatusView.toDelete();
	}
	LMvc.characterStatusView = new BattleCharacterStatusView(self.controller,self);
	LMvc.characterStatusView.addEventListener(BattleCharacterStatusEvent.CHANGE_COMPLETE,self.hideStatusView);
	self.controller.view.baseLayer.addChild(LMvc.characterStatusView);
	LMvc.characterStatusView.startShow();
};
BattleCharacterView.prototype.getTerrain = function() {
	var self = this;
	var map = self.controller.model.map.data;
	var mapData = map[self.locationY()][self.locationX()];
	var terrainId = getTerrainId(mapData);
	return self.data.currentSoldiers().terrain(terrainId);
};
BattleCharacterView.prototype.hideStatusView = function() {
	LMvc.characterStatusView = null;
};