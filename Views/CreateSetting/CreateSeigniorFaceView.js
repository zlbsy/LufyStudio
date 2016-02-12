function CreateSeigniorFaceView(controller, data){
	base(this,LView,[controller]);
	this.init(data);
}
CreateSeigniorFaceView.prototype.init=function(data){
	var self = this;
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = getBitmap(new LPanel(backgroundData,186, 266));
	self.addChild(panel);
	if(data){
		self.changeFace(data.faceImg);
	}
	
	var buttonChange = getButton(Language.get("change_monarch"),176);
	buttonChange.y = 266;
	self.addChild(buttonChange);
	buttonChange.addEventListener(LMouseEvent.MOUSE_UP, self.changeMonarch);
};
CreateSeigniorFaceView.prototype.changeMonarch=function(event){
	var detailedView = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
	detailedView.toSelectSeignior();
};
CreateSeigniorFaceView.prototype.changeFace=function(faceIndex){
	var self = this;
	if(self.face){
		self.face.remove();
	}
	self.face = new CharacterFace(faceIndex);
	self.face.x = self.face.y = 5;
	self.face.scaleX = self.face.scaleY = 0.8;
	self.addChild(self.face);
};