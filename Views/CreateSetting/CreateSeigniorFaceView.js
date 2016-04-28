function CreateSeigniorFaceView(controller, data){
	base(this,LView,[controller]);
	this.init(data);
}
CreateSeigniorFaceView.prototype.init=function(data){
	var self = this;
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = getBitmap(new LPanel(backgroundData,186, 266));
	self.addChild(panel);
	
	var label = getStrokeLabel(Language.get("monarch") + ": " + Language.get("null"),18,"#FFFFFF","#000000",4);
	self.nameTextField = label;
	label.x = (176 - label.getWidth()) * 0.5;
	label.y = 270;
	self.addChild(label);
	
	var buttonBackground = new LPanel(new LBitmapData(LMvc.datalist["win07"]),176,50);
	var textLabel = getStrokeLabel(Language.get("seignior_color"),18,"#999999","#000000",3);
	textLabel.x = (buttonBackground.getWidth() - textLabel.getWidth()) * 0.5;
	textLabel.y = (buttonBackground.getHeight() - textLabel.getHeight()) * 0.5;
	buttonBackground.addChild(textLabel);
	buttonBackground.y = 385;
	buttonBackground.cacheAsBitmap(true);
	self.addChild(buttonBackground);
	var buttonChangeColor = getButton(Language.get("seignior_color"),176);
	buttonChangeColor.y = 385;
	self.addChild(buttonChangeColor);
	self.buttonChangeColor = buttonChangeColor;
	buttonChangeColor.visible = false;
	buttonChangeColor.addEventListener(LMouseEvent.MOUSE_UP, self.changeMonarchColor);
	if(!data){
		var buttonChange = getButton(Language.get("change_monarch"),176);
		buttonChange.y = 292;
		self.addChild(buttonChange);
		buttonChange.addEventListener(LMouseEvent.MOUSE_UP, self.changeMonarch);
		self.setData(null);
	}else{
		var buttonBackground = new LPanel(new LBitmapData(LMvc.datalist["win07"]),176,50);
		var textLabel = getStrokeLabel(Language.get("change_monarch"),20,"#999999","#000000",3);
		textLabel.x = (buttonBackground.getWidth() - textLabel.getWidth()) * 0.5;
		textLabel.y = (buttonBackground.getHeight() - textLabel.getHeight()) * 0.5;
		buttonBackground.addChild(textLabel);
		buttonBackground.y = 292;
		buttonBackground.cacheAsBitmap(true);
		self.addChild(buttonBackground);
		var characters = LPlugin.characters().list;
		self.setData(characters.find(function(child){return child.id == data.id;}), data.color);
	}
};
CreateSeigniorFaceView.prototype.changeMonarchColor=function(event){
	var detailedView = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
	detailedView.changeMonarchColor();
};
CreateSeigniorFaceView.prototype.changeMonarch=function(event){
	var detailedView = event.currentTarget.getParentByConstructor(CreateSeigniorDetailedView);
	detailedView.toSelectSeignior();
};
CreateSeigniorFaceView.prototype.setData=function(data, color){
	var self = this;
	if(!data){
		self.buttonChangeColor.visible = false;
		return;
	}
	self.data = data;
	self.color = color;
	self.buttonChangeColor.visible = true;
	self.changeFace(data.faceImg);
	self.nameTextField.text = Language.get("monarch") + ": " + data.name;
	self.nameTextField.x = (176 - self.nameTextField.getWidth()) * 0.5;
	self.graphics.clear();
	self.graphics.drawRect(0, "#ff0000", [58, 350, 60, 30],true,String.format("rgb({0})",color));
};
CreateSeigniorFaceView.prototype.changeFace=function(faceIndex){
	var self = this;
	if(self.face){
		self.face.remove();
	}
	self.face = new Face(faceIndex);
	self.face.x = self.face.y = 5;
	self.face.scaleX = self.face.scaleY = 0.8;
	self.addChild(self.face);
};