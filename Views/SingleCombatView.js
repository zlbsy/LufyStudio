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
	self.addChild(self.backLayer);
	
	self.backLayerInit();
	console.log("self.backLayerInit ok");
	self.characterLayerInit();
};
SingleCombatView.prototype.backLayerInit=function(){
	var self = this;
	//TODO::background
	self.backLayer.addChild(getTranslucentBitmap());
	var bitmapData = new LBitmapData(LMvc.datalist["singleCombatBackground"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.x = (LGlobal.width - bitmap.getWidth()) * 0.5;
	bitmap.y = 200;
	self.backLayer.addChild(bitmap);
};
SingleCombatView.prototype.characterLayerInit=function(){
	var self = this;
	self.characterLayer = new LSprite();
	self.backLayer.addChild(self.characterLayer);
	var currentCharacter = new SingleCombatCharacterView(null,self.controller.currentCharacterId,BattleCharacterSize.width,BattleCharacterSize.height);
	currentCharacter.scaleX = currentCharacter.scaleY = 2;
	self.characterLayer.addChild(currentCharacter);
	currentCharacter.setCoordinate(LGlobal.width * 0.5 - 96,200 - 48);
	currentCharacter.changeDirection(CharacterDirection.RIGHT);
	console.log("self.characterLayerInit currentCharacter.data="+currentCharacter.data.minFace);
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),130,130);
	self.characterLayer.addChild(win);
	var face = currentCharacter.data.minFace();
	face.x = face.y = 15;
	self.characterLayer.addChild(face);

	var bar = new StatusBarView(self.controller);
	bar.y = 110;
	var obj = {maxValue:200,currentValue:150,name:"HP",icon:"icon_hert",frontBar:"red_bar",barSize:140};
	bar.set(obj);
	self.characterLayer.addChild(bar);

	var bar = new StatusBarView(self.controller);
	bar.y = 130;
	var obj = {maxValue:200,currentValue:150,name:"怒气",icon:"icon_hert",frontBar:"orange_ball",barSize:140};
	bar.set(obj);
	self.characterLayer.addChild(bar);

	var bar = new StatusBarView(self.controller);
	bar.x = LGlobal.width - 150;
	bar.y = 110;
	var obj = {maxValue:200,currentValue:150,name:"HP",icon:"icon_hert",frontBar:"red_bar",barSize:140};
	bar.set(obj);
	self.characterLayer.addChild(bar);
	
	
	currentCharacter = new SingleCombatCharacterView(null,self.controller.targetCharacterId,BattleCharacterSize.width,BattleCharacterSize.height);
	currentCharacter.scaleX = currentCharacter.scaleY = 2;
	self.characterLayer.addChild(currentCharacter);
	currentCharacter.setCoordinate(LGlobal.width * 0.5,200 - 48);
	currentCharacter.changeDirection(CharacterDirection.LEFT);
};
