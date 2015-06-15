function BattleCharacter(index, w, h, action, direction) {
	var self = this;
	LExtends(self, Character, [index, w, h, action, direction, RS]);
	var r = self.data[self.RS + "Rect"];
	self.layer.x = w * 0.5 - (r[0] + r[2] * 0.5);
	self.layer.y = h * 0.5 - (r[1] + r[3] * 0.5);
	self.belong = null;
	self.AI = new BattleCharacterAI(self);
}
BattleCharacter.MOVE_COMPLETE = "moveComplete";
BattleCharacter.SHOW_MOVE_ROAD = "showMoveRoad";
BattleCharacter.MOVING = "moving";
BattleCharacter.WAIT_ATTACK = "waitAttack";
BattleCharacter.WAIT_SELECT = "waitSelect";
BattleCharacter.prototype.addAnimation = function() {
	var self = this;
	if (self.RS == "S") {
		self.addSAnimation();
	} else {
		//R
	}
};
BattleCharacter.prototype.addSAnimation = function() {
	var self = this;
	var img = "defaultSCharacter";
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
	self.addShape(LShape.RECT,[r[0] + self.layer.x,r[1] + self.layer.y + r[3] * 0.5,r[2],r[3]]);
};
BattleCharacter.prototype.loadSOver = function(event){
	var self = event.currentTarget.parent;
	var animeBitmapData = self.anime.bitmap.bitmapData;
	var bitmapData = new LBitmapData(event.target,animeBitmapData.x,animeBitmapData.y,animeBitmapData.width,animeBitmapData.height);
	self.anime.bitmap.bitmapData = bitmapData;
};
BattleCharacter.prototype.onframe = function(event){
	var self = event.currentTarget.parent;
	self.move();
};
BattleCharacter.prototype.setActionDirection = function(action, direction) {
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
		label = action + "_" + direction;
	}
	self.anime.gotoAndPlay(label);
	self.action = action;
	self.direction = direction;
};
BattleCharacter.prototype.setRoad = function(list){
	var self = this;
	self.callParent("setRoad",arguments);
	self.mode = BattleCharacter.MOVING;
	self.dispatchEvent(BattleCharacter.MOVING);
};
BattleCharacter.prototype.setRangeAttack = function(){
	var self = this;
	LSouSouObject.SouSouSMap.view.roadLayer.setRangeAttack(self);
	self.mode = BattleCharacter.WAIT_ATTACK;
	self.dispatchEvent(BattleCharacter.WAIT_ATTACK);
};
BattleCharacter.prototype.saveShowMoveRoadObject = function(roadList) {
	var self = this;
	self.mode = BattleCharacter.SHOW_MOVE_ROAD;
	self.showMoveRoadObject = {x:self.x,y:self.y,action:self.action,direction:self.direction,roadList:roadList};
};
BattleCharacter.prototype.returnShowMoveRoadObject = function() {
	var self = this;
	self.setCoordinate(self.showMoveRoadObject.x,self.showMoveRoadObject.y);
	self.setActionDirection(self.action,self.direction);
	LSouSouObject.SouSouSMap.clickSelfCharacter(self);
	self.dispatchEvent(BattleCharacter.SHOW_MOVE_ROAD);
};