function BattleCharacterView(controller, id, w, h) {
	var self = this;
	LExtends(self, CharacterView, [controller, id, w, h]);
	self.layer.x = self.layer.y = -8;
	self.belong = null;
	//self.AI = new BattleCharacterAI(self);
	self.addShape(LShape.RECT,[0,0,BattleCharacterSize.width,BattleCharacterSize.height]);
}
BattleCharacterView.DEFAULT_IMG = "character-s-default";
BattleCharacterView.getAnimationData = function(){
	if(!BattleCharacter._animationData){
		// 1792 x 64
		var list = LGlobal.divideCoordinate(1792, 64, 1, 28);
		BattleCharacter._animationData = [
			[list[0][0],list[0][1],list[0][2],list[0][3]],
			[list[0][4],list[0][5],list[0][6],list[0][7]],
			[list[0][8],list[0][9],list[0][10],list[0][11]],
			[list[0][12],list[0][13]],[list[0][14],list[0][15]],[list[0][16],list[0][17]],
			[list[0][18]],[list[0][19]],[list[0][20]],
			[list[0][21],list[0][22]],
			[list[0][23]],[list[0][24]],[list[0][25]],
			[list[0][26],list[0][27]],
		];
	}
	return BattleCharacter._animationData;
};
BattleCharacterView.prototype.addAnimation = function() {
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist[BattleCharacterView.DEFAULT_IMG]);
	self.anime = new LAnimationTimeline(bitmapData, BattleCharacterView.getAnimationData());
	self.anime.speed = 5;
	self.layer.addChild(self.anime);
	self.setAnimationLabel();
	
	var img = self.data.currentSoldiers().img();
	var loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE, self.loadSOver);
	console.log("addAnimation " + LMvc.IMG_PATH + "character/s/"+img+".png");
	loader.load(LMvc.IMG_PATH + "character/s/"+img+".png", "bitmapData");
	/*
	if (self.data["S"] > 0) {
		if (LMvc.datalist["SCharacter-" + self.data["S"]]) {
			img = "SCharacter-" + self.data["S"];
		} else {
			loader = new LLoader();
			loader.parent = self;
			loader.addEventListener(LEvent.COMPLETE, self.loadSOver);
			loader.load(LMvc.IMG_PATH + "character/" + self.data["S"] + "/s/1.png", "bitmapData");
		}
	}

	var bitmapData = new LBitmapData(LMvc.datalist[img]);
	self.anime = new LAnimationTimeline(bitmapData, LMvc.datalist["SAction"]);
	self.anime.speed = 5;
	self.layer.addChild(self.anime);
	//self.layer.graphics.drawRect(1, "#ff0000", [0, 0, 64, 64]);
	var r = self.data[self.RS+"Rect"];
	self.addShape(LShape.RECT,[r[0] + self.layer.x,r[1] + self.layer.y + r[3] * 0.5,r[2],r[3]]);*/
};
BattleCharacterView.prototype.setAnimationLabel = function() {
	var self = this;
	var anime = self.anime;
	//ATTACK
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.DOWN),0,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.UP),1,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.LEFT),2,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.RIGHT),2,0,1,true);
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
	anime.setLabel(String.format("{0}-{1}",CharacterAction.LEVELUP,CharacterDirection.DOWN),14,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.LEVELUP,CharacterDirection.UP),14,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.LEVELUP,CharacterDirection.LEFT),14,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.LEVELUP,CharacterDirection.RIGHT),14,0,1,false);
};
BattleCharacterView.prototype.loadSOver = function(event){
	console.log("BattleCharacterView.prototype.loadSOver");
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

	var label;
	if (action == CharacterAction.HERT || action == CharacterAction.WAKE || action == CharacterAction.PANT || action == CharacterAction.LEVELUP) {
		label = action;
	} else {
		label = action + "-" + direction;
	}
	self.anime.gotoAndPlay(label);
	self.action = action;
	self.direction = direction;
};
BattleCharacterView.prototype.setRoad = function(list){
	var self = this;
	self.callParent("setRoad",arguments);
	self.mode = BattleCharacter.MOVING;
	self.dispatchEvent(BattleCharacter.MOVING);
};
BattleCharacterView.prototype.setRangeAttack = function(){
	var self = this;
	LSouSouObject.SouSouSMap.view.roadLayer.setRangeAttack(self);
	self.mode = BattleCharacter.WAIT_ATTACK;
	self.dispatchEvent(BattleCharacter.WAIT_ATTACK);
};
BattleCharacterView.prototype.saveShowMoveRoadObject = function(roadList) {
	var self = this;
	self.mode = BattleCharacter.SHOW_MOVE_ROAD;
	self.showMoveRoadObject = {x:self.x,y:self.y,action:self.action,direction:self.direction,roadList:roadList};
};
BattleCharacterView.prototype.returnShowMoveRoadObject = function() {
	var self = this;
	self.setCoordinate(self.showMoveRoadObject.x,self.showMoveRoadObject.y);
	self.setActionDirection(self.action,self.direction);
	LSouSouObject.SouSouSMap.clickSelfCharacter(self);
	self.dispatchEvent(BattleCharacter.SHOW_MOVE_ROAD);
};