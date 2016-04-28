function CreateCharacterFaceView(controller, data){
	base(this,LView,[controller]);
	this.init(data);
}
CreateCharacterFaceView.prototype.init=function(data){
	var self = this;
	self.females = [36,37,380,524,528,548];
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	var panel = getBitmap(new LPanel(backgroundData,186, 266));
	self.addChild(panel);
	if(!data){
		data = {faceImg:1, gender:1};
	}
	self.randomFace(data.faceImg);
	
	var buttonFace = getButton(Language.get("change_face"),176);
	buttonFace.y = 266;
	self.addChild(buttonFace);
	buttonFace.addEventListener(LMouseEvent.MOUSE_UP, self.changeFace);
	
	var normalLabel = getStrokeLabel(Language.get("gender_male"),20,"#FFFFFF","#000000",4);
	normalLabel.x = 10;
	normalLabel.y = 330;
	self.addChild(normalLabel);
	var fastLabel = getStrokeLabel(Language.get("gender_female"),20,"#FFFFFF","#000000",4);
	fastLabel.x = 85;
	fastLabel.y = 330;
	self.addChild(fastLabel);
	var radioBackground = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-background"]));
	var radioSelect = new LBitmap(new LBitmapData(LMvc.datalist["checkbox-on"]));
	var genderRadio = new LRadio();
	genderRadio.x = 29;
	genderRadio.y = 330;
	genderRadio.setChildRadio(1,0,0,radioBackground,radioSelect);
	genderRadio.setChildRadio(2,77,0,radioBackground,radioSelect);
	genderRadio.setValue(data.gender);
	self.addChild(genderRadio);
	self.genderRadio = genderRadio;
};
CreateCharacterFaceView.prototype.changeFace=function(event){
	var self = event.currentTarget.parent;
	self.randomFace();
};
CreateCharacterFaceView.prototype.randomFace=function(faceIndex){
	var self = this;
	if(self.face){
		self.face.remove();
	}
	if(!faceIndex){
		faceIndex = self.faceIndex;
		if(self.genderRadio.value == 2){
			while(self.faceIndex == faceIndex){
				faceIndex = self.females[self.females.length * Math.random() >>> 0];
			}
		}else{
			while(self.faceIndex == faceIndex || self.females.indexOf(self.faceIndex) >= 0){
				faceIndex = (620 * Math.random() >>> 0) + 1;break;
			}
		}
	}
	self.faceIndex = faceIndex;
	self.face = new Face(faceIndex);
	self.face.x = self.face.y = 5;
	self.face.scaleX = self.face.scaleY = 0.8;
	self.addChild(self.face);
};