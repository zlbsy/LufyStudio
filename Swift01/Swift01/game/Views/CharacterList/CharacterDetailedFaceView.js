function CharacterDetailedFaceView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.init();
}
CharacterDetailedFaceView.prototype.init=function(controller){
	var self = this;
	if(controller){
		self.addController(controller);
	}
	var faceW = CharacterFaceSize.width + 20, faceH = CharacterFaceSize.height + 20;
	if(!self.faceLayer){
		var win = new LPanel(new LBitmapData(LMvc.datalist["win02"]),faceW,faceH);
		self.addChild(win);
		win.cacheAsBitmap(true);
		
		var face = new LSprite();
		face.x = 10;
		face.y = 10;
		self.faceLayer = face;
		self.addChild(face);
	}
	if(!self.textFieldName){
		self.textLayer = new LSprite();
		self.textLayer.graphics.drawRect(0, "#ff0000", [0, 0, 200, 80]);
		self.addChild(self.textLayer);
		
		var name = getStrokeLabel("", 20, "#FFFFFF", "#000000", 4);
		name.x = face.x + 10;
		name.y = face.y + 10;
		self.textLayer.addChild(name);
		self.textFieldName = name;
	}
	if(!self.textFieldBelong){
		var belongLabel = getStrokeLabel("", 20, "#FFFFFF", "#000000", 4);
		belongLabel.x = name.x;
		belongLabel.y = name.y + 30;
		self.textLayer.addChild(belongLabel);
		self.textFieldBelong = belongLabel;
	}
};
CharacterDetailedFaceView.prototype.updateView=function(){
	var self = this;
	if(LMvc.BattleController){
		self.textFieldBelong.visible = true;
	}else{
		self.textFieldBelong.visible = false;
	}
	var characterModel = self.controller.getValue("selectedCharacter");
	self.showLabel(characterModel);
	self.faceLayer.removeAllChild();
	if(characterModel.hasFaceCacher()){
		self.showFace();
	}else{
		self.controller.nextFrameExecute(function(){
			self.showFace();
		});
	}
};
CharacterDetailedFaceView.prototype.showLabel=function(characterModel){
	var self = this;
	self.textFieldName.text = characterModel.name();
	var battleBelong = self.controller.getValue("battleBelong");
	if(LMvc.BattleController && battleBelong){
		self.textFieldBelong.text = Language.get(battleBelong);
	}
	self.textLayer.cacheAsBitmap(false);
	self.textLayer.cacheAsBitmap(true);
};
CharacterDetailedFaceView.prototype.showFace=function(){
	var self = this;
	if(!self.controller || !self.controller.getValue){
		return;
	}
	var characterModel = self.controller.getValue("selectedCharacter");
	var face = characterModel.face();
	self.faceLayer.addChild(face);
};