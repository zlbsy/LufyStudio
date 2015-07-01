function SingleCombatView(controller){
	var self = this;
	base(self,LView,[controller]);
}
SingleCombatView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
SingleCombatView.prototype.init=function(){
	var self = this;
	self.backLayer = new LSprite();
	//self.addChild(self.backLayer);
	self.characterLayer = new LSprite();
	self.addChild(self.characterLayer);
	self.backLayerInit();
	self.characterLayerInit();
	
	self.addChildAt(getBitmap(self.backLayer),0);
};
SingleCombatView.prototype.backLayerInit=function(){
	var self = this;
	//TODO::background
	self.backLayer.addChild(getTranslucentBitmap());
	var bitmapData = new LBitmapData(LMvc.datalist["singleCombatBackground"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.x = (LGlobal.width - bitmap.getWidth()) * 0.5;
	bitmap.y = 210;
	self.backLayer.addChild(bitmap);
};
SingleCombatView.prototype.characterLayerInit=function(){
	var self = this;
	
	var currentCharacter = new SingleCombatCharacterView(null,self.controller.currentCharacterId,BattleCharacterSize.width,BattleCharacterSize.height);
	currentCharacter.scaleX = currentCharacter.scaleY = 2;
	self.characterLayer.addChild(currentCharacter);
	currentCharacter.setCoordinate(LGlobal.width * 0.5 - 96,230 - 48);
	currentCharacter.changeDirection(CharacterDirection.RIGHT);
	self.faceLayerInit(currentCharacter.data,true);
	
	
	var targetCharacter = new SingleCombatCharacterView(null,self.controller.targetCharacterId,BattleCharacterSize.width,BattleCharacterSize.height);
	targetCharacter.scaleX = targetCharacter.scaleY = 2;
	self.characterLayer.addChild(targetCharacter);
	targetCharacter.setCoordinate(LGlobal.width * 0.5,230 - 48);
	targetCharacter.changeDirection(CharacterDirection.LEFT);
	self.faceLayerInit(targetCharacter.data,false);
};
SingleCombatView.prototype.faceLayerInit=function(characterModel,isLeft){
	var self = this;
	var faceSize = 100, startPosition = 10;
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),220,160);
	win.x = isLeft ? 0 : LGlobal.width - win.getWidth();
	self.backLayer.addChild(win);
	var face = characterModel.minFace(faceSize);
	face.x = isLeft ? startPosition : LGlobal.width - faceSize - startPosition;
	face.y = startPosition;
	self.characterLayer.addChild(face);
	
	var name = getStrokeLabel(characterModel.name(),20,"#FFFFFF","#000000",2);
	name.x = isLeft ? face.x + faceSize + startPosition * 0.5: win.x + startPosition;
	name.y = startPosition;
	self.backLayer.addChild(name);
	var formatForce = "武力 : {0}";
	var force = getStrokeLabel(String.format(formatForce, characterModel.force()),18,"#FFFFFF","#000000",2);
	force.x = name.x;
	force.y = name.y + name.getHeight() + startPosition;
	self.backLayer.addChild(force);

	var barHp = new StatusBarView(self.controller);
	barHp.y = face.y + faceSize;
	var obj = {maxValue:200,currentValue:150,name:"HP",icon:"icon_hert",frontBar:"red_bar",barSize:170};
	barHp.set(obj);
	barHp.x = isLeft ? startPosition : LGlobal.width - barHp.getWidth() - startPosition;
	self.characterLayer.addChild(barHp);

	var barAngry = new StatusBarView(self.controller);
	barAngry.x = barHp.x;
	barAngry.y = barHp.y + barHp.getHeight();
	var obj = {maxValue:200,currentValue:150,name:"怒气",icon:"orange_ball",frontBar:"orange_bar",barSize:170};
	barAngry.set(obj);
	self.characterLayer.addChild(barAngry);
	
};