function MapChild(mx,my){
	var self = this;
	base(self,LSprite,[]);
	self.graphics.drawRect(2,"#FF0000",[0,0,48,48]);
	self.mx = mx;
	self.my = my;
	self.directionX = 1;
	self.directionY = 1;
	self.data = maps[my][mx];
	self.direction = maps[my][mx][1];
	if(self.direction > 11){
		self.directionX = -1;
		self.directionY = -1;
	}else if(self.direction > 7){
		self.directionY = -1;
	}else if(self.direction > 3){
		self.directionX = -1;
	}
	self.direction %= 4;
};
MapChild.prototype.init = function(){
	var self = this;
	var coordinate = self.getRootCoordinate();
	var buttonLayer = new LSprite();
	if(coordinate.x >= LGlobal.width - 160){
		buttonLayer.x = 48 - 160;
	}
	if(coordinate.y >= LGlobal.height - 160){
		buttonLayer.y = -120;
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
	button = new LButtonSample1("地形");
	button.y = 40;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.change.bind(self));
	button = new LButtonSample1("军队");
	button.x = 52;
	button.y = 40;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.charaAdd.bind(self));
	button = new LButtonSample1("移动");
	button.x = 104;
	button.y = 40;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_DOWN,self.moveStart.bind(self));
	button.addEventListener(LMouseEvent.MOUSE_UP,self.moveEnd.bind(self));
	button = new LButtonSample1("左右");
	button.y = 80;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.changeScaleX.bind(self));
	button = new LButtonSample1("上下");
	button.x = 52;
	button.y = 80;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.changeScaleY.bind(self));
};
MapChild.prototype.changeScaleX = function(e){
	this.directionX *= -1;
	this.changeDirection(this.direction);
};
MapChild.prototype.changeScaleY = function(e){
	this.directionY *= -1;
	this.changeDirection(this.direction);
};
MapChild.prototype.charaAdd = function(e){
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

	var myWindow = new LWindow({width:160,height:140,title:"军队"});
	myWindow.x = (LGlobal.width - myWindow.getWidth()) * 0.5;
	myWindow.y = (LGlobal.height - myWindow.getHeight()) * 0.5;
	LGlobal.stage.addChild(myWindow);
	myWindow.addEventListener(LWindow.CLOSE, function (e) {
		translucent.die();
		translucent.remove();
	});
	var button = new LButtonSample1("守方军队");
	button.x = 20;
	button.y = 20;
	myWindow.layer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		var chara = new Character("red");
		chara.x = self.mx*48;
		chara.y = self.my*48;
		charaLayer.addChild(chara);
		mapChild.remove();
		mapChild = null;
		myWindow.close();
	});
	var button = new LButtonSample1("攻方军队");
	button.x = 20;
	button.y = 60;
	myWindow.layer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		var chara = new Character("blue");
		chara.x = self.mx*48;
		chara.y = self.my*48;
		enemyLayer.addChild(chara);
		mapChild.remove();
		mapChild = null;
		myWindow.close();
	});
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
	self.direction = dir;
	if(self.directionX == -1){
		dir += 4;
	}
	if(self.directionY == -1){
		dir += 8;
	}
	var data = maps[self.my][self.mx];
	maps[self.my][self.mx][1] = dir;
	var bitmapData = getMapTile(maps[self.my][self.mx]);
	stageBitmap.bitmapData.copyPixels(bitmapData,new LRectangle(0, 0, 48, 48),new LPoint(self.mx*48,self.my*48, 48, 48));
};
MapChild.prototype.moveStart = function(e){
	var self = this;
	self.startDrag(e.touchPointID);
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
};
MapChild.prototype.moveEnd = function(e){
	var self = this;
	self.stopDrag();
	self.removeEventListener(LEvent.ENTER_FRAME,self.onframe);
};
MapChild.prototype.onframe = function(e){
	var self = e.currentTarget;
	var mx =  (self.x + 24 - gameStage.x) / 48 >>> 0;
	var my =  (self.y + 24 - gameStage.y) / 48 >>> 0;
	if(self.mx == mx && self.my == my){
		return;
	}
	var data = maps[self.my][self.mx];
	self.mx = mx;
	self.my = my;
	maps[self.my][self.mx] = data;
	var bitmapData = getMapTile(maps[self.my][self.mx]);
	stageBitmap.bitmapData.copyPixels(bitmapData,new LRectangle(0, 0, 48, 48),new LPoint(self.mx*48,self.my*48, 48, 48));
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

	var myWindow = new LWindow({width:480,height:520,title:"新建"});
	myWindow.x = (LGlobal.width - myWindow.getWidth()) * 0.5;
	myWindow.y = (LGlobal.height - myWindow.getHeight()) * 0.5;
	LGlobal.stage.addChild(myWindow);
	myWindow.addEventListener(LWindow.CLOSE, function (e) {
		translucent.die();
		translucent.remove();
	});
	
	var mapLayer = new LSprite();
	myWindow.layer.addChild(mapLayer);
	//MapHelperSetting.bitmapData.setProperties(0, 0, MapHelperSetting.bitmapData.image.width, MapHelperSetting.bitmapData.image.height);
	var bitmap = new LBitmap(MapHelperSetting.bitmapData);
	mapLayer.addChild(bitmap);
	mapLayer.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		stageLayer.downX = stageLayer.downY = -10;
		var y = event.selfX / 48 >>> 0;
		var x = event.selfY / 48 >>> 0;
		var data = maps[self.my][self.mx];
		maps[self.my][self.mx] = [x * 10 + y,data[1]];
		var bitmapData = getMapTile(maps[self.my][self.mx]);
		stageBitmap.bitmapData.copyPixels(bitmapData,new LRectangle(0, 0, 48, 48),new LPoint(self.mx*48,self.my*48, 48, 48));
		myWindow.close();
	});
};