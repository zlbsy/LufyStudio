function CharacterFace(id){
	var self = this;
	base(self,LSprite,[]);
	console.log("id="+id);
	self.loadData("./Data/face/"+id+".txt");
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
	var layer = new LSprite();
	var data = JSON.parse(event.target);
	var body = new Component("body",data.b);
	self.body = body;
	body.name = "身体";
	layer.addChild(body);
	var face = new Component("face",data.f);
	self.face = face;
	face.name = "脸";
	layer.addChild(face);
	var eye = new Component("eye",data.e);
	self.eye = eye;
	eye.name = "眼睛";
	layer.addChild(eye);
	var nose = new Component("nose",data.n);
	self.nose = nose;
	nose.name = "鼻子";
	layer.addChild(nose);
	var mouth = new Component("mouth",data.m);
	self.mouth = mouth;
	mouth.name = "嘴";
	layer.addChild(mouth);
	var hat = new Component("hat",data.h);
	self.hat = hat;
	hat.name = "帽子";
	layer.addChild(hat);
	
	var decorative1 = new Component("decorative",data.d1);
	self.decorative1 = decorative1;
	decorative1.name = "装饰1";
	layer.addChild(decorative1);
	var decorative2 = new Component("decorative",data.d2);
	self.decorative2 = decorative2;
	decorative2.name = "装饰2";
	layer.addChild(decorative2);
	var decorative3 = new Component("decorative",data.d3);
	self.decorative3 = decorative3;
	decorative3.name = "装饰3";
	layer.addChild(decorative3);
	layer.graphics.drawRect(0,"#CCCCCC",[0,0,220,320]);
	layer.cacheAsBitmap(true);
	//console.log("a",self._ll_cacheAsBitmap.x,self._ll_cacheAsBitmap.y,self._ll_cacheAsBitmap.bitmapData.width,self._ll_cacheAsBitmap.bitmapData.height);
	layer._ll_cacheAsBitmap.bitmapData.setProperties(-layer._ll_cacheAsBitmap.x,layer._ll_cacheAsBitmap.y,220,320);
	//self._ll_cacheAsBitmap.x = self._ll_cacheAsBitmap.y = 0;
	
	//console.log("b",self._ll_cacheAsBitmap.x,self._ll_cacheAsBitmap.y,self._ll_cacheAsBitmap.bitmapData.width,self._ll_cacheAsBitmap.bitmapData.height);
	self.addChild(new LBitmap(layer._ll_cacheAsBitmap.bitmapData));
	/*
    var maskObj = new LSprite();
    maskObj.graphics.drawRect(0, "#ff0000", [0,0,220,320]);
    layer.mask = maskObj;
    
	self.graphics.drawRect(0,"#CCCCCC",[0,0,220,320]);
	self.cacheAsBitmap(true);*/
	self.dispatchEvent(LEvent.COMPLETE);
};