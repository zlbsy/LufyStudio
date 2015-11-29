function MapChild(mx,my){
	var self = this;
	base(self,LSprite,[]);
	self.graphics.drawRect(2,"#FF0000",[0,0,48,48]);
	self.mx = mx;
	self.my = my;
	self.data = maps[my][mx];
};
MapChild.prototype.init = function(){
	var self = this;
	var coordinate = self.getRootCoordinate();
	var buttonLayer = new LSprite();
	if(coordinate.x >= LGlobal.width - 160){
		buttonLayer.x = 48 - 160;
	}
	if(coordinate.y >= LGlobal.height - 80){
		buttonLayer.y = -80;
	}else{
		buttonLayer.y = 48;
	}
	self.addChild(buttonLayer);
	var button = new LButtonSample1("上");
	button.x = 0;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.up.bind(self));
	button = new LButtonSample1("右");
	button.x = 40;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.right.bind(self));
	button = new LButtonSample1("下");
	button.x = 80;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.down.bind(self));
	button = new LButtonSample1("左");
	button.x = 120;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.left.bind(self));
	var button = new LButtonSample1("地形");
	button.y = 40;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.change.bind(self));
};
MapChild.prototype.up = function(e){
	this.changeDirection(0);
};
MapChild.prototype.right = function(e){
	this.changeDirection(1);
};
MapChild.prototype.down = function(e){
	this.changeDirection(2);
};
MapChild.prototype.left = function(e){
	this.changeDirection(3);
};
MapChild.prototype.changeDirection = function(dir){
	var self = this;
	var data = maps[self.my][self.mx];
	maps[self.my][self.mx][1] = dir;
	var matrix = new LMatrix();
	matrix.translate(-24,-24);
	matrix.rotate(dir*90);
	matrix.translate(24,24);
	matrix.translate(self.mx*48,self.my*48);
	stageBitmap.bitmapData.draw(MapSetting.bitmapData,matrix,null,null,new LRectangle((data[0]/10 >>> 0)*48, (data[0]%10)*48, 48, 48));
};
MapChild.prototype.change = function(e){
	var self = this;
	var translucent = new LSprite();
	translucent.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
	translucent.alpha = 0.5;
	LGlobal.stage.addChild(translucent);
	translucent.addEventListener(LMouseEvent.MOUSE_UP, function (e) {});
	translucent.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {});
	translucent.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {});
	translucent.addEventListener(LMouseEvent.MOUSE_OVER, function (e) {});
	translucent.addEventListener(LMouseEvent.MOUSE_OUT, function (e) {});

	var myWindow = new LWindow({width:480,height:480,title:"新建"});
	myWindow.x = (LGlobal.width - myWindow.getWidth()) * 0.5;
	myWindow.y = (LGlobal.height - myWindow.getHeight()) * 0.5;
	LGlobal.stage.addChild(myWindow);
	myWindow.addEventListener(LWindow.CLOSE, function (e) {
		translucent.die();
		translucent.remove();
	});
	
	var mapLayer = new LSprite();
	myWindow.layer.addChild(mapLayer);
	var bitmap = new LBitmap(MapSetting.bitmapData);
	mapLayer.addChild(bitmap);
	mapLayer.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		stageLayer.downX = stageLayer.downY = -10;
		var x = event.selfX / 48 >>> 0;
		var y = event.selfY / 48 >>> 0;
		var data = maps[self.my][self.mx];
		maps[self.my][self.mx] = [x * 10 + y,data[1]];
		var matrix = new LMatrix();
		matrix.translate(-24,-24);
		matrix.rotate(data[1]*90);
		matrix.translate(24,24);
		matrix.translate(self.mx*48,self.my*48);
		stageBitmap.bitmapData.draw(MapSetting.bitmapData,matrix,null,null,new LRectangle(x*48, y*48, 48, 48));
		myWindow.close();
	});
};