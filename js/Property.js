function Property(){
	var self = this;
	base(self,LSprite,[]);
	//self.graphics.drawRect(2,"#000000",[0,0,200,500],true,"#333333");
	//self.graphics.drawRect(2,"#000000",[1,1,200,23],true,"#222222");
	
	var titleLayer = new LSprite();
	self.titleLayer = titleLayer;
	titleLayer.graphics.drawRect(0,"#000000",[51,1,50,23],false,"#333333");
	titleLayer.addEventListener(LMouseEvent.MOUSE_UP,self.toshow);
	self.addChild(titleLayer);
	var title = new LTextField();
	title.x = 60;
	title.y = 5;
	title.text = "属性";
	title.color = "#FFFFFF";
	self.addChild(title);
	
	var showLayer = new LSprite();
	self.showLayer = showLayer;
	showLayer.graphics.drawRect(0,"#000000",[0,0,200,473],true,"#333333");
	var scrollbar = new LScrollbar(showLayer,178,473,20,false);
	self.scrollbar = scrollbar;
	scrollbar.x = 1;
	scrollbar.y = 26;
	self.addChild(scrollbar);
	/*
	var xLabel = new LTextField();
	xLabel.color = "#FFFFFF";
	xLabel.text = "坐标";
	self.showLayer.addChild(xLabel);*/
}
Property.prototype.toshow = function(e){
	var self = e.clickTarget.parent;
	self.showLayer.removeAllChild();
	
	self.scrollbar.visible = true;
	materials.scrollbar.visible = false;
	materials.translucentBitmap.visible = false;
	self.titleLayer.graphics.clear();
	self.titleLayer.graphics.drawRect(2,"#000000",[51,1,50,23],true,"#333333");
	materials.titleLayer.graphics.clear();
	materials.titleLayer.graphics.drawRect(0,"#000000",[1,1,50,23],false,"#333333");
	var displayObject = stageList[stageList.length - 1];
	self.displayObject = displayObject;
	console.log(displayObject);
	switch(displayObject.childType){
		case "LBitmapData":
			self.toshowBitmapData(displayObject);
			break;
	}
};
Property.prototype.mousedownBitmapData = function(e){
	var s = e.clickTarget;
	s.startDrag();
	s.value = s.input.text;
	console.log(s.value);
	s.addEventListener(LEvent.ENTER_FRAME,s.root.frameBitmapData);
};
Property.prototype.mouseupBitmapData = function(e){
	var s = e.clickTarget;
	s.stopDrag();
	s.x = s.sx;
	s.y = s.sy;
	s.removeEventListener(LEvent.ENTER_FRAME,s.root.frameBitmapData);
};
Property.prototype.mouseoverBitmapData = function(e){
	document.body.style.cursor = "move";
};
Property.prototype.mouseoutBitmapData = function(e){
	document.body.style.cursor = "default";
};
Property.prototype.frameBitmapData = function(e){
	var s = e.target;
	s.input.text = s.x - s.sx + s.value;
	if(s.input.text > s.max)s.input.text = s.max;
	if(s.input.text < s.min)s.input.text = s.min;
	var bitmapData = s.root.displayObject.getChildAt(1).bitmapData;
	var bitmapDataBack = s.root.displayObject.getChildAt(0);
	bitmapDataBack.alpha = 0.2;
	switch(s.input.name){
		case "x":
			bitmapData.setProperties(s.input.text,bitmapData.y,bitmapData.width,bitmapData.height);
			bitmapDataBack.x = -bitmapData.x;
			break;
		case "y":
			bitmapData.setProperties(bitmapData.x,s.input.text,bitmapData.width,bitmapData.height);
			bitmapDataBack.y = -bitmapData.y;
			break;
		case "width":
			bitmapData.setProperties(bitmapData.x,bitmapData.y,s.input.text,bitmapData.height);
			break;
		case "height":
			bitmapData.setProperties(bitmapData.x,bitmapData.y,bitmapData.width,s.input.text);
			break;
	}
};
Property.prototype.setMouseEventBitmapData = function(label,input,min,max){
	var self = this;
	var mouseLayer = new LSprite();
	mouseLayer.root = self;
	mouseLayer.input = input;
	mouseLayer.min = min;
	mouseLayer.max = max;
	mouseLayer.sx = mouseLayer.x = label.x + label.getWidth();
	mouseLayer.sy = mouseLayer.y = label.y;
	mouseLayer.graphics.drawRect(0,"#000000",[0,-1,8,22],false,"#CCCCCC");
	mouseLayer.addEventListener(LMouseEvent.MOUSE_OVER,self.mouseoverBitmapData);
	mouseLayer.addEventListener(LMouseEvent.MOUSE_OUT,self.mouseoutBitmapData);
	mouseLayer.addEventListener(LMouseEvent.MOUSE_DOWN,self.mousedownBitmapData);
	mouseLayer.addEventListener(LMouseEvent.MOUSE_UP,self.mouseupBitmapData);
	self.showLayer.addChild(mouseLayer);
};
Property.prototype.toshowBitmapData = function(displayObject){
	var self = this;
	var imageLabel = new LTextField();
	imageLabel.color = "#FFFFFF";
	imageLabel.text = "图片数据：";
	imageLabel.x = imageLabel.y = 10;
	self.showLayer.addChild(imageLabel);
	var inputBack = new LSprite();
	inputBack.graphics.drawRect(1,"#000000",[-1,-1,162,22],true,"#FFFFFF");
	var imageInput = new LTextField();
	imageInput.width = 160;
	imageInput.color = "#000000";
	imageInput.x = 10;
	imageInput.y = imageLabel.y + imageLabel.getHeight()+ 5;
	imageInput.text = displayObject.getChildAt(1).bitmapData.name;
	imageInput.setType(LTextFieldType.INPUT,inputBack);
	self.showLayer.addChild(imageInput);
	
	var xyLabel = new LTextField();
	xyLabel.color = "#FFFFFF";
	xyLabel.text = "坐标：";
	xyLabel.x = 10;
	xyLabel.y = imageInput.y + 32;
	self.showLayer.addChild(xyLabel);
	
	var xLabel = new LTextField();
	xLabel.color = "#FFFFFF";
	xLabel.text = "x:";
	xLabel.x = 10;
	xLabel.y = xyLabel.y + xyLabel.getHeight()+5;
	self.showLayer.addChild(xLabel);
	var xBack = new LSprite();
	xBack.graphics.drawRect(1,"#000000",[-1,-1,52,22],true,"#FFFFFF");
	var xInput = new LTextField();
	xInput.name = "x";
	xInput.width = 50;
	xInput.color = "#000000";
	xInput.x = xLabel.x + xLabel.getWidth() + 10;
	xInput.y = xLabel.y;
	xInput.text = displayObject.getChildAt(1).bitmapData.x;
	xInput.setType(LTextFieldType.INPUT,xBack);
	self.showLayer.addChild(xInput);
	self.setMouseEventBitmapData(xLabel,xInput,0,parseInt(displayObject.getChildAt(1).bitmapData.width));
	
	var yLabel = new LTextField();
	yLabel.color = "#FFFFFF";
	yLabel.text = "y:";
	yLabel.x = 95;
	yLabel.y = xLabel.y;
	self.showLayer.addChild(yLabel);
	var yBack = new LSprite();
	yBack.graphics.drawRect(1,"#000000",[-1,-1,52,22],true,"#FFFFFF");
	var yInput = new LTextField();
	yInput.name = "y";
	yInput.width = 50;
	yInput.color = "#000000";
	yInput.x = yLabel.x + yLabel.getWidth() + 10;
	yInput.y = yLabel.y;
	yInput.text = displayObject.getChildAt(1).bitmapData.y;
	yInput.setType(LTextFieldType.INPUT,yBack);
	self.showLayer.addChild(yInput);
	self.setMouseEventBitmapData(yLabel,yInput,0,parseInt(displayObject.getChildAt(1).bitmapData.height));
	
	
	var sizeLabel = new LTextField();
	sizeLabel.color = "#FFFFFF";
	sizeLabel.text = "范围：";
	sizeLabel.x = 10;
	sizeLabel.y = yInput.y + 32;
	self.showLayer.addChild(sizeLabel);
	
	var wLabel = new LTextField();
	wLabel.color = "#FFFFFF";
	wLabel.text = "W:";
	wLabel.x = 10;
	wLabel.y = sizeLabel.y + sizeLabel.getHeight()+5;
	self.showLayer.addChild(wLabel);
	var wBack = new LSprite();
	wBack.graphics.drawRect(1,"#000000",[-1,-1,52,22],true,"#FFFFFF");
	var wInput = new LTextField();
	wInput.name = "width";
	wInput.width = 50;
	wInput.color = "#000000";
	wInput.x = wLabel.x + wLabel.getWidth() + 10;
	wInput.y =wLabel.y;
	wInput.text = displayObject.getChildAt(1).bitmapData.width;
	wInput.setType(LTextFieldType.INPUT,wBack);
	self.showLayer.addChild(wInput);
	self.setMouseEventBitmapData(wLabel,wInput,0,parseInt(displayObject.getChildAt(1).bitmapData.width));
	
	var hLabel = new LTextField();
	hLabel.color = "#FFFFFF";
	hLabel.text = "H:";
	hLabel.x = 95;
	hLabel.y = wLabel.y;
	self.showLayer.addChild(hLabel);
	var hBack = new LSprite();
	hBack.graphics.drawRect(1,"#000000",[-1,-1,52,22],true,"#FFFFFF");
	var hInput = new LTextField();
	hInput.name = "height";
	hInput.width = 50;
	hInput.color = "#000000";
	hInput.x = hLabel.x + hLabel.getWidth() + 10;
	hInput.y = hLabel.y;
	hInput.text = displayObject.getChildAt(1).bitmapData.height;
	hInput.setType(LTextFieldType.INPUT,hBack);
	self.showLayer.addChild(hInput);
	self.setMouseEventBitmapData(hLabel,hInput,0,parseInt(displayObject.getChildAt(1).bitmapData.height));
};
