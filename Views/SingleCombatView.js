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
	self.characterLayer.addChild(currentCharacter.data.minFace());
	
	
	currentCharacter = new SingleCombatCharacterView(null,self.controller.targetCharacterId,BattleCharacterSize.width,BattleCharacterSize.height);
	currentCharacter.scaleX = currentCharacter.scaleY = 2;
	self.characterLayer.addChild(currentCharacter);
	currentCharacter.setCoordinate(LGlobal.width * 0.5,200 - 48);
	currentCharacter.changeDirection(CharacterDirection.LEFT);
};
