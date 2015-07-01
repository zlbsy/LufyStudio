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
	bitmap.y = 210;
	self.backLayer.addChild(bitmap);
};
SingleCombatView.prototype.characterLayerInit=function(){
	var self = this;
	self.characterLayer = new LSprite();
	self.backLayer.addChild(self.characterLayer);
	var currentCharacter = new SingleCombatCharacterView(null,self.controller.currentCharacterId,BattleCharacterSize.width,BattleCharacterSize.height);
	currentCharacter.scaleX = currentCharacter.scaleY = 2;
	self.characterLayer.addChild(currentCharacter);
	currentCharacter.setCoordinate(LGlobal.width * 0.5 - 96,230 - 48);
	currentCharacter.changeDirection(CharacterDirection.RIGHT);

	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),220,130);
	self.characterLayer.addChild(win);
	var face = currentCharacter.data.minFace(100);
	face.x = face.y = 15;
	self.characterLayer.addChild(face);
	
	var name = getStrokeLabel(currentCharacter.data.name(),25,"#FFFFFF","#000000",4);
	name.x = 120;
	name.y = 15;
	self.characterLayer.addChild(name);

	var bar = new StatusBarView(self.controller);
	bar.y = 130;
	var obj = {maxValue:200,currentValue:150,name:"HP",icon:"icon_hert",frontBar:"red_bar",barSize:200};
	bar.set(obj);
	self.characterLayer.addChild(bar);

	var bar = new StatusBarView(self.controller);
	bar.y = 150;
	var obj = {maxValue:200,currentValue:150,name:"怒气",icon:"orange_ball",frontBar:"red_bar",barSize:200};
	bar.set(obj);
	self.characterLayer.addChild(bar);
	
	
	targetCharacter = new SingleCombatCharacterView(null,self.controller.targetCharacterId,BattleCharacterSize.width,BattleCharacterSize.height);
	targetCharacter.scaleX = targetCharacter.scaleY = 2;
	self.characterLayer.addChild(targetCharacter);
	targetCharacter.setCoordinate(LGlobal.width * 0.5,230 - 48);
	targetCharacter.changeDirection(CharacterDirection.LEFT);
	
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),220,130);
	win.x = LGlobal.width - win.getWidth();
	self.characterLayer.addChild(win);
	var face = targetCharacter.data.minFace(100);
	face.x = LGlobal.width - 100 - 15;
	face.y = 15;
	self.characterLayer.addChild(face);

	var bar = new StatusBarView(self.controller);
	bar.y = 130;
	var obj = {maxValue:200,currentValue:150,name:"HP",icon:"icon_hert",frontBar:"red_bar",barSize:200};
	bar.set(obj);
	bar.x = LGlobal.width - bar.getWidth();
	self.characterLayer.addChild(bar);

	var bar = new StatusBarView(self.controller);
	bar.y = 150;
	var obj = {maxValue:200,currentValue:150,name:"怒气",icon:"orange_ball",frontBar:"red_bar",barSize:200};
	bar.set(obj);
	bar.x = LGlobal.width - bar.getWidth();
	self.characterLayer.addChild(bar);
	
	var name = getStrokeLabel(targetCharacter.data.name(),25,"#FFFFFF","#000000",4);
	name.x = face.x - name.getWidth() - 10;
	name.y = 15;
	self.characterLayer.addChild(name);
};
