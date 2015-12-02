function Component(position, data){
	var self = this;
	base(self,LSprite,[]);
	self.position = position;
	//console.log(position,data);
	if(!data){
		data = {};
	}
	self.index = data.i ? data.i : 1;
	self.visible = data.i ? true : false;
	self.init(data);
}
Component.prototype.init = function(data){
	var self = this;
	self.x = data.x ? data.x : 0;
	self.y = data.y ? data.y : 0;
	self.scaleX = data.sx ? data.sx : 1;
	self.scaleY = data.sy ? data.sy : 1;
	self.rotate = data.r ? data.r : 0;
	if(!data.c){
		data.c = [1,1,1,1,0,0,0,0];
	}
	if(!data.bx){
		data.bx = 1;
	}
	if(!data.by){
		data.by = 1;
	}
	self.bx = data.bx;
	self.by = data.by;
	self.color = new LColorTransform(data.c[0], data.c[1], data.c[2], data.c[3], data.c[4], data.c[5], data.c[6], data.c[7]);
	var name = self.position + ("0" + self.index).substr(-2);
	//console.log(name, datalist[name]);
	self.bitmapDataBase = new LBitmapData(LMvc.datalist[name]);
	self.bitmapDataCopy = new LBitmapData(null, 0, 0, self.bitmapDataBase.width, self.bitmapDataBase.height, LBitmapData.DATA_CANVAS);
     var matrix = new LMatrix();
    if(self.bx == -1 || self.by == -1){
		matrix.scale(self.bx, self.by);
		matrix.translate(self.bx == -1 ? self.bitmapDataBase.width : 0, self.by == -1 ? self.bitmapDataBase.height : 0);
    }
    self.bitmapDataCopy.draw(self.bitmapDataBase, matrix);
    self.bitmapData = new LBitmapData(null, 0, 0, self.bitmapDataBase.width, self.bitmapDataBase.height, LBitmapData.DATA_CANVAS);
    //self.bitmapData.draw(self.bitmapDataBase, matrix);
	self.backLayer = new LSprite();
	self.backLayer.x = -self.bitmapData.width * 0.5;
	self.backLayer.y = -self.bitmapData.height * 0.5;
	self.addChild(self.backLayer);
	self.rectLayer = new LSprite();
	self.rectLayer.myType = "rectLayer";
	self.rectLayer.graphics.drawRect(1,"#cccccc",[-10,-10,self.bitmapData.width + 20,self.bitmapData.height + 20]);
	self.backLayer.addChild(self.rectLayer);
	self.pointLayer = new LSprite();
	self.pointLayer.myType = "pointLayer";
	self.backLayer.addChild(self.pointLayer);
	self.cut(data);
	self.colorTransformRun();
	self.ctrlDisabled();
};
Component.prototype.change = function(index){
	var self = this;
	self.index = index;
    self.reset();
};
Component.prototype.reset = function(){
	var self = this;
	self.removeAllChild();
	self.init({x:self.x,y:self.y});
	self.ctrlEnabled();
	components.review();
};
Component.prototype.horizontal = function(bx){//水平翻转
	var self = this;
	self.bx = bx;
	var matrix = new LMatrix();
	matrix.scale(self.bx, self.by);
	matrix.translate(self.bx == -1 ? self.bitmapDataBase.width : 0, self.by == -1 ? self.bitmapDataBase.height : 0);
    self.bitmapDataCopy.clear();
    self.bitmapDataCopy.draw(self.bitmapDataBase, matrix);
    self.colorTransformRun();
};
Component.prototype.vertical = function(by){//竖直翻转
	var self = this;
	self.by = by;
	var matrix = new LMatrix();
	matrix.scale(self.bx, self.by);
	matrix.translate(self.bx == -1 ? self.bitmapDataBase.width : 0, self.by == -1 ? self.bitmapDataBase.height : 0);
    
    self.bitmapDataCopy.clear();
    self.bitmapDataCopy.draw(self.bitmapDataBase, matrix);
    self.colorTransformRun();
};
Component.prototype.colorTransformRun = function(){
	var self = this;
    self.bitmapData.clear();
    self.bitmapData.draw(self.bitmapDataCopy);
	self.bitmapData.colorTransform(new LRectangle(0, 0, self.bitmapData.width, self.bitmapData.height), self.color);
};
Component.prototype.cut = function(data){
	var self = this;
	var bitmapData = self.bitmapData;
	var backLayer = self.backLayer;
	var num = 4;
	var width = bitmapData.width / num;
	var height = bitmapData.height / num;
	var vertices = data.p;
	var pointList = [];
	var indices = [];
	var uvtData = [];
	if(!vertices){
		vertices = [];
		for(var i=0;i<=num;i++){
			for(var j=0;j<=num;j++){
				vertices.push(i*width,j*height);
			}
		}
	}
	for(var i = 0;i < vertices.length;i+=2){
		obj = new LSprite();
		obj.alpha = 0.2;
		obj.x = vertices[i];
		obj.y = vertices[i+1];
		obj.graphics.drawArc(0,"#ff0000",[0,0,1.5,0,2*Math.PI],true,"#ff0000");
		self.pointLayer.addChild(obj);
		pointList.push(obj);
	}
	for(var i=0;i<num;i++){
		for(var j=0;j<num;j++){
			indices.push(i*(num+1)+j,(i+1)*(num+1)+j,i*(num+1)+j+1);
			indices.push((i+1)*(num+1)+j,i*(num+1)+j+1,(i+1)*(num+1)+j+1);
		}
	}
	for(var i=0;i<=num;i++){
		for(var j=0;j<=num;j++){
			uvtData.push(i/num, j/num);
		}
	}
	backLayer.graphics.clear();
	backLayer.graphics.beginBitmapFill(bitmapData);
	backLayer.graphics.drawTriangles(vertices, indices, uvtData);
	
	self.vertices = vertices;
};
Component.prototype.save = function(init){
	var self = this;
	self._rectLayerVisible = self.rectLayer.visible;
	self._pointLayerVisible = self.pointLayer.visible;
	self._alpha = self.alpha;
	if(init){
		self.rectLayer.visible = false;
		self.pointLayer.visible = false;
		self.alpha = 1;
	}
};
Component.prototype.restore = function(){
	var self = this;
	self.rectLayer.visible = self._rectLayerVisible;
	self.pointLayer.visible = self._pointLayerVisible;
	self.alpha = self._alpha;
};
Component.prototype.ctrlDisabled = function(){
	var self = this;
	self.rectLayer.visible = false;
	self.pointLayer.visible = false;
	self.removeAllEventListener();
};
Component.prototype.ctrlEnabled = function(){
	var self = this;
	self.rectLayer.visible = true;
	self.pointLayer.visible = true;
	self.alpha = 1;
	self.addEventListener(LMouseEvent.MOUSE_DOWN,self.downCheck);
};
Component.prototype.downCheck = function(event){
	var self = event.currentTarget;
	var index = self.pointLayer.childList.findIndex(function(child){
		return child.hitTestPoint(event.offsetX,event.offsetY);
	});
	if(index >= 0){
		dragPoint = self.pointLayer.getChildAt(index);
		dragPoint.index = index * 2;
		dragPoint.startDrag(event.touchPointID);
		self.addEventListener(LEvent.ENTER_FRAME,self.onFrame);
	}else{
		self.startDrag(event.touchPointID);
	}
	self.removeEventListener(LMouseEvent.MOUSE_DOWN,self.downCheck);
	self.addEventListener(LMouseEvent.MOUSE_UP,self.upCheck);
};
Component.prototype.upCheck = function(event){
	var self = event.currentTarget;
	if(dragPoint){
		dragPoint.stopDrag();
		self.vertices[dragPoint.index] = dragPoint.x;
		self.vertices[dragPoint.index + 1] = dragPoint.y;
		self.removeEventListener(LEvent.ENTER_FRAME,self.onFrame);
	}else{
		self.stopDrag();
	}
	dragPoint = null;
	self.removeEventListener(LMouseEvent.MOUSE_UP,self.upCheck);
	self.addEventListener(LMouseEvent.MOUSE_DOWN,self.downCheck);
	components.review();
};
Component.prototype.onFrame = function(event){
	var self = event.currentTarget;
	self.vertices[dragPoint.index] = dragPoint.x;
	self.vertices[dragPoint.index + 1] = dragPoint.y;
};
Component.prototype.getData = function(){
	var self = this;
	if(!self.visible){
		return {};
	}
	var c = self.color;
	var color = [c.redMultiplier,c.greenMultiplier,c.blueMultiplier,c.alphaMultiplier,c.redOffset,c.greenOffset,c.blueOffset,c.alphaOffset];
	return {i:self.index,x:self.x,y:self.y,r:self.rotate,sx:self.scaleX,sy:self.scaleY,bx:self.bx,by:self.by,p:self.vertices,c:color};
};
