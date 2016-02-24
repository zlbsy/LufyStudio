function CharacterDetailedFaceView(controller){
	var self = this;
	base(self,LView,[controller]);
	self.init();
}
CharacterDetailedFaceView.prototype.init=function(){
	var self = this;
	
	var faceW = CharacterFaceSize.width + 20, faceH = CharacterFaceSize.height + 20;
	
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),faceW,faceH)
	self.addChild(win);
	win.cacheAsBitmap(true);
	
	var face = new LSprite();
	face.x = 10;
	face.y = 10;
	self.faceLayer = face;
	self.addChild(face);
	
	self.textLayer = new LSprite();
	self.addChild(self.textLayer);
	
	var name = getStrokeLabel("", 20, "#FFFFFF", "#000000", 4);
	name.x = face.x + 10;
	name.y = face.y + 10;
	self.textLayer.addChild(name);
	self.textFieldName = name;
	var battleBelong = self.controller.getValue("battleBelong");
	if(!battleBelong){
		var belongLabel = getStrokeLabel("", 20, "#FFFFFF", "#000000", 4);
		belongLabel.x = name.x;
		belongLabel.y = name.y + 30;
		self.textLayer.addChild(belongLabel);
		self.textFieldBelong = belongLabel;
	}
};
CharacterDetailedFaceView.prototype.updateView=function(){
	console.log("CharacterDetailedFaceView.prototype.updateView");
	var self = this;
	self.showFace();
	self.textLayer.cacheAsBitmap(false);
	self.textLayer.cacheAsBitmap(true);
};
CharacterDetailedFaceView.prototype.showFace=function(){
	var self = this;
	var characterModel = self.controller.getValue("selectedCharacter");
	self.faceLayer.removeAllChild();
	var face = characterModel.face();
	self.faceLayer.addChild(face);
	self.textFieldName.text = characterModel.name();
	var battleBelong = self.controller.getValue("battleBelong");
	if(!battleBelong){
		self.textFieldBelong.text = Language.get(battleBelong);
	}
};