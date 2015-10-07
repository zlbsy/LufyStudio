function EventListChildView(controller, seigniorModel) {
	var self = this;
	base(self, LView, [controller]);
	self.seigniorModel = seigniorModel;
	self.y = LGlobal.height - 160;
	self.layer = new LSprite();
	self.addChild(self.layer);
	
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	
	self.addEventListener(LMouseEvent.MOUSE_DOWN, self.onDown);
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onUp);
}
EventListChildView.prototype.onDown=function(event){
	var self = event.currentTarget;
	self.onTouching = true;
	self.saveTouch = {x:mouseX,y:mouseY,dx:mouseX,dy:mouseY,speed:0,touchMove:false};
	var parent = self.parent;
	parent.startDrag(event.touchPointID);
	self.controller.view.ctrlLayer.visible = false;
};
EventListChildView.prototype.onUp=function(event){
	var self = event.currentTarget;
	self.onTouching = false;
	var parent = self.parent;
	parent.stopDrag();
	self.controller.view.ctrlLayer.visible = true;
	if(!self.saveTouch.touchMove){
		self.controller.showArea(self.chapterStatus.id());
	}else if(parent.x > 0){
		self.controller.view.centerOnChild();
	}else if(parent.x < -(parent.numChildren - 1) * LGlobal.width){
		self.controller.view.centerOnChild();
	}else if(self.saveTouch.speed > 30){
		self.controller.view.moveRight();
	}else if(self.saveTouch.speed < -30){
		self.controller.view.moveLeft();
	}else{
		self.controller.view.centerOnChild();
	}
};
EventListChildView.prototype.onframe=function(event){
	var self = event.currentTarget;
	var parent = self.parent;
	if(parent.x + self.x > -LGlobal.width && parent.x + self.x < LGlobal.width){
		self.layer.visible = true;
		if(self.layer.numChildren == 0){
			self.set();
		}
	}else{
		self.layer.visible = false;
	}
	if(!self.onTouching){
		return;
	}
	if(!self.saveTouch.touchMove && (Math.abs(self.saveTouch.dx - mouseX) > 5 || Math.abs(self.saveTouch.dy - mouseY) > 5)){
		self.saveTouch.touchMove = true;
	}
	self.saveTouch.speed = self.saveTouch.x - mouseX;
	self.saveTouch.x = mouseX;
	self.saveTouch.y = mouseY;
};
EventListChildView.prototype.set=function(){
	var self = this;
	var faceSize = 100;
	var character = self.seigniorModel.character();
	var layer = new LSprite();
	layer.x = 40;
	var win = new LPanel(new LBitmapData(LMvc.datalist["win05"]),400,160);
	layer.addChild(win);
	var name = getStrokeLabel(character.name(),22,"#000000","#CCCCCC",1);
	name.x = 10 + (faceSize - name.getWidth()) * 0.5;
	name.y = 10 + faceSize + 5;
	win.addChild(name);
	
	var city_count_label = getStrokeLabel("城池",20,"#000000","#CCCCCC",1);
	city_count_label.x = 10 + faceSize + 5;
	city_count_label.y = 10;
	win.addChild(city_count_label);
	var city_count = getStrokeLabel(self.seigniorModel.areas().length,20,"#000000","#CCCCCC",1);
	city_count.x = city_count_label.x;
	city_count.y = 37;
	win.addChild(city_count);
	
	var general_count_label = getStrokeLabel("武将",20,"#000000","#CCCCCC",1);
	general_count_label.x = 10 + faceSize + 5;
	general_count_label.y = 72;
	win.addChild(general_count_label);
	var general_count = getStrokeLabel(self.seigniorModel.generalsCount(),20,"#000000","#CCCCCC",1);
	general_count.x = general_count_label.x;
	general_count.y = 99;
	win.addChild(general_count);
	
	var colorLabel = getStrokeLabel("势力颜色",20,"#000000","#CCCCCC",1);
	colorLabel.x = 300;
	colorLabel.y = 10;
	win.addChild(colorLabel);
	var colorSprite = new LShape();
	colorSprite.graphics.drawRect(0, "#000000", [0, 0, colorLabel.getWidth(), 20],true,self.seigniorModel.color());
	colorSprite.x = colorLabel.x;
	colorSprite.y = 37;
	win.addChild(colorSprite);
	
	layer.cacheAsBitmap(true);
	self.layer.addChild(layer);
	
	var face = character.minFace(faceSize);
	face.x = 50;
	face.y = 10;
	self.layer.addChild(face);
};