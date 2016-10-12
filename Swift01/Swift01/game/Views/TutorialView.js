function TutorialView(){
	base(this,LView,[]);
}
TutorialView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
TutorialView.prototype.init=function(){
	var self = this;
	self.layerInit();
};
TutorialView.prototype.layerInit=function(){
	var self = this;
	//self.addChild(getBlackBitmap());
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	
	self.maskLayer = new LSprite();
	self.baseLayer.addChild(self.maskLayer);
	//人物层
	self.charaLayer = new LSprite();
	self.baseLayer.addChild(self.charaLayer);
	
	self.messageLayer = new LSprite();
	self.baseLayer.addChild(self.messageLayer);
	
	self.clickLayer = new LSprite();
	self.clickLayer.addShape(LShape.RECT,[0,0,LMvc.screenWidth,LMvc.screenHeight]);
	self.clickLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	self.clickLayer.addEventListener(LMouseEvent.MOUSE_UP, self.clickToNextScript);
	self.baseLayer.addChild(self.clickLayer);
};
TutorialView.prototype.clickToNextScript=function(event){
	var self = event.currentTarget.getParentByConstructor(TutorialView);
	if(self.messageLayer.numChildren > 0){
		TalkRemove();
		/*
		var msgText = self.messageLayer.getChildAt(0).getChildByName("message");
		if(msgText.windRunning){
			msgText.windComplete();
			return;
		}
		self.messageLayer.removeAllChild();
		LGlobal.script.analysis();*/
	}else if(self.maskLayer.numChildren > 0){
		var rectangle = self.maskLayer.getChildAt(0).rectangle;
		if(event.offsetX > rectangle.x && event.offsetX < rectangle.x + rectangle.width && 
			event.offsetY > rectangle.y && event.offsetY < rectangle.y + rectangle.height){
			self.maskLayer.removeAllChild();
			LGlobal.script.analysis();
		}
	}
};
TutorialView.prototype.talk=function(id,message){
	var self = this;
	Talk(self.messageLayer, id, 1, message, function() {
		LMvc.talkOver = true;
	});
};
TutorialView.prototype.setMask=function(rectangle){
	var self = this;
	var baseLayer = new LSprite();
	baseLayer.rectangle = rectangle;
	var rectangleLayer = new LSprite();
	rectangleLayer.graphics.drawRect(0, "#000000", [rectangle.x, rectangle.y, rectangle.width, rectangle.height], true, "#000000");
	baseLayer.addChild(rectangleLayer);
	var pointLayer = getPanel("translucent", LMvc.screenWidth, LMvc.screenHeight);
	pointLayer.blendMode = LBlendMode.SOURCE_OUT;
	baseLayer.addChild(pointLayer);
	baseLayer.cacheAsBitmap(true);
	self.maskLayer.addChild(baseLayer);
	var focus = getPanel("focus", rectangle.width + 28, rectangle.height + 28);
	focus.x = rectangle.x - 14;
	focus.y = rectangle.y - 14;
	self.maskLayer.addChild(focus);
};