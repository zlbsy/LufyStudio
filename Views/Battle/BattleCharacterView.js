function BattleCharacterView(controller, id, w, h) {
	var self = this;
	LExtends(self, CharacterView, [controller, id, w, h]);
	self.step = self.moveStep = 4;
	self.layer.x = self.layer.y = -8;
	self.belong = null;
	self.AI = new BattleCharacterAI(self);
	self.addShape(LShape.RECT,[0,0,BattleCharacterSize.width,BattleCharacterSize.height]);
}
BattleCharacterView.cacheBitmapDatas = {};
BattleCharacterView.DEFAULT_IMG = "character-s-default";
BattleCharacterView.getAnimationData = function(){
	if(!BattleCharacterView._animationData){
		// 1792 x 64
		var list = LGlobal.divideCoordinate(1792, 64, 1, 28);
		BattleCharacterView._animationData = [
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
			[list[0][23]],//BLOCK 10
			[list[0][24]],//BLOCK 11
			[list[0][25]],//BLOCK 12
			[list[0][26]],//HERT 13
			[list[0][27]],//WAKE 14
			[list[0][18],list[0][23],list[0][18],list[0][23],list[0][27],list[0][27],list[0][27]],//LEVELUP 15
			[list[0][19],list[0][24],list[0][19],list[0][24],list[0][27],list[0][27],list[0][27]],//LEVELUP 16
			[list[0][20],list[0][25],list[0][20],list[0][25],list[0][27],list[0][27],list[0][27]],//LEVELUP 17
			[list[0][0]],//MAGIC_ATTACK 18
			[list[0][4]],//MAGIC_ATTACK 19
			[list[0][8]],//MAGIC_ATTACK 20
		];
	}
	return BattleCharacterView._animationData;
};
BattleCharacterView.prototype.getBitmapData = function() {
	var self = this;
	var rowIndex = self.anime.rowIndex, colIndex = self.anime.colIndex;
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
BattleCharacterView.prototype.addAnimation = function() {
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist[BattleCharacterView.DEFAULT_IMG]);
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
	
	var img = self.data.currentSoldiers().img();
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
	if(value){
		var result = self.controller.view.mapLayer.characterIn(self);
		if(result){
			self.anime.visible = false;
		}
	}else{
		self.controller.view.mapLayer.characterOut(self);
		self.anime.visible = true;
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
BattleCharacterView.prototype.saveShowMoveRoadObject = function(roadList) {
	var self = this;
	self.showMoveRoadObject = {x:self.x,y:self.y,action:self.action,direction:self.direction,roadList:roadList};
};
BattleCharacterView.prototype.returnShowMoveRoadObject = function() {
	var self = this;
	self.setCoordinate(self.showMoveRoadObject.x,self.showMoveRoadObject.y);
	self.setActionDirection(self.action,self.direction);
	LMvc.BattleController.clickSelfCharacter(self);
};