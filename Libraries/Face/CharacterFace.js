function CharacterFace(id){
	var self = this;
	base(self,LSprite,[]);
	self.loadData("./Data/face/3.txt");
}
CharacterFace.prototype.loadData = function(path){
	var self = this;
	var loader = new LURLLoader();
	loader.parent = self;
    loader.addEventListener(LEvent.COMPLETE, self.loadDataComplete); 
    loader.load(path+"?t="+(new Date()).getTime(), "text");
};
CharacterFace.prototype.loadDataComplete = function(event){
	var loader = event.currentTarget;
	var self = loader.parent;
	var data = JSON.parse(event.target);
	var body = new Component("body",data.b);
	self.body = body;
	body.name = "身体";
	self.addChild(body);
	var face = new Component("face",data.f);
	self.face = face;
	face.name = "脸";
	self.addChild(face);
	var eye = new Component("eye",data.e);
	self.eye = eye;
	eye.name = "眼睛";
	self.addChild(eye);
	var nose = new Component("nose",data.n);
	self.nose = nose;
	nose.name = "鼻子";
	self.addChild(nose);
	var mouth = new Component("mouth",data.m);
	self.mouth = mouth;
	mouth.name = "嘴";
	self.addChild(mouth);
	var hat = new Component("hat",data.h);
	self.hat = hat;
	hat.name = "帽子";
	self.addChild(hat);
	
	var decorative1 = new Component("decorative",data.d1);
	self.decorative1 = decorative1;
	decorative1.name = "装饰1";
	self.addChild(decorative1);
	var decorative2 = new Component("decorative",data.d2);
	self.decorative2 = decorative2;
	decorative2.name = "装饰2";
	self.addChild(decorative2);
	var decorative3 = new Component("decorative",data.d3);
	self.decorative3 = decorative3;
	decorative3.name = "装饰3";
	self.addChild(decorative3);
	
	self.cacheAsBitmap(true);
};