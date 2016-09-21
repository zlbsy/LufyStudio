function RPGCharacterView(controller, id, w, h,action,direction) {
	var self = this;
	LExtends(self, CharacterView, [controller, id, w, h]);
	self.step = self.moveStep = 4;
	//self.layer.x = self.layer.y = -8;
	self.belong = null;
	//self.addShape(LShape.RECT,[0,0,BattleCharacterSize.width,BattleCharacterSize.height]);
	self.addShape(LShape.RECT,[0,0,48,64]);
	self.mode = CharacterMode.NONE;
	self.directionList = {
		"-1,-1":CharacterDirection.LEFT,
		"-1,0":CharacterDirection.LEFT,
		"-1,1":CharacterDirection.DOWN,
		"0,-1":CharacterDirection.UP,
		"0,1":CharacterDirection.DOWN,
		"1,-1":CharacterDirection.UP,
		"1,0":CharacterDirection.RIGHT,
		"1,1":CharacterDirection.RIGHT
	};
}
RPGCharacterView.cacheBitmapDatas = {};
RPGCharacterView.DEFAULT_IMG = "character-s-default";
RPGCharacterView.getAnimationData = function(){
	// 1920 x 64
	var list = LGlobal.divideCoordinate(1920, 64, 1, 40);
	var data = [
		[list[0][0]],//STAND 0
		[list[0][20]],//STAND 1
		[list[0][1],list[0][2]],//MOVE 2
		[list[0][21],list[0][22]],//MOVE 3
	];
	return data;
};
RPGCharacterView.prototype.addAnimation = function() {
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist[RPGCharacterView.DEFAULT_IMG]);
	self.anime = new LAnimationTimeline(bitmapData, RPGCharacterView.getAnimationData());
	self.anime.speed = RPGCharacterConfig.SPEED;
	self.layer.addChild(self.anime);
	self.setAnimationLabel();
	self.anime.setFrameSpeedAt(13,0,2);
	
	self.anime.addEventListener(LEvent.COMPLETE, self.actionComplete);
	/*
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.DOWN),self.attackToHert,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.UP),self.attackToHert,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.LEFT),self.attackToHert,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK_START,CharacterDirection.RIGHT),self.attackToHert,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.DOWN),self.attackSpecialCheck,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.UP),self.attackSpecialCheck,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.LEFT),self.attackSpecialCheck,[]);
	self.anime.addFrameScript(String.format("{0}-{1}",CharacterAction.ATTACK,CharacterDirection.RIGHT),self.attackSpecialCheck,[]);
	*/
	var img = self.data.id();
	var loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE, self.loadSOver);
	loader.load(LMvc.IMG_PATH + "character/r/"+img+".png", "bitmapData");
};
RPGCharacterView.prototype.setAnimationLabel = function() {
	var self = this;
	var anime = self.anime;
	//STAND
	anime.setLabel(String.format("{0}-{1}",CharacterAction.STAND,CharacterDirection.DOWN),0,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.STAND,CharacterDirection.UP),1,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.STAND,CharacterDirection.RIGHT),0,0,1,true);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.STAND,CharacterDirection.LEFT),1,0,1,true);
	//MOVE
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MOVE,CharacterDirection.DOWN),2,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MOVE,CharacterDirection.UP),3,0,1,false);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MOVE,CharacterDirection.RIGHT),2,0,1,true);
	anime.setLabel(String.format("{0}-{1}",CharacterAction.MOVE,CharacterDirection.LEFT),3,0,1,true);
	/*
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
	*/
};
RPGCharacterView.prototype.loadSOver = function(event){
	var self = event.currentTarget.parent;
	var animeBitmapData = self.anime.bitmap.bitmapData;
	var bitmapData = new LBitmapData(event.target,animeBitmapData.x,animeBitmapData.y,animeBitmapData.width,animeBitmapData.height);
	self.anime.bitmap.bitmapData = bitmapData;
};
RPGCharacterView.prototype.onframe = function(event){
	var self = event.currentTarget.parent;
	self.move();
};
RPGCharacterView.prototype.setActionDirection = function(action, direction) {
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
RPGCharacterView.prototype.getTo = function(){
	var self = this;
	return [self.to.x/self.w >>> 0,self.to.y/self.h >>> 0];
};
RPGCharacterView.prototype.actionComplete = function(event){
	var self = event.currentTarget.parent.parent;
	/*switch(self.action){
		case CharacterAction.HERT:
			self.dispatchEvent(BattleCharacterActionEvent.HERT_ACTION_COMPLETE);
			break;
		case CharacterAction.BLOCK:
			self.dispatchEvent(BattleCharacterActionEvent.BLOCK_ACTION_COMPLETE);
			break;
	}*/
	self.dispatchEvent(LEvent.COMPLETE);
};
RPGCharacterView.prototype.setRoad = function(list){
	var self = this;
	self.callParent("setRoad",arguments);
	self.mode = CharacterMode.MOVING;
};