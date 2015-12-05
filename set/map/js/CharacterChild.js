function CharacterChild(chara){
	var self = this;
	base(self,LSprite,[]);
	self.graphics.drawRect(2,"#FF0000",[0,0,48,48]);
	self.chara = chara;
};
CharacterChild.prototype.init = function(){
	var self = this;
	var coordinate = self.getRootCoordinate();
	var buttonLayer = new LSprite();
	if(coordinate.x >= LGlobal.width - 160){
		buttonLayer.x = 48 - 160;
	}
	if(coordinate.y >= LGlobal.height - 120){
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
	button = new LButtonSample1("删除");
	button.y = 40;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.removeChara.bind(self));
	button = new LButtonSample1("+");
	button.x = 60;
	button.y = 40;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.plusIndex.bind(self));
	button = new LButtonSample1("-");
	button.x = 100;
	button.y = 40;
	buttonLayer.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,self.minusIndex.bind(self));
};
CharacterChild.prototype.plusIndex = function(e){
	this.chara.index++;
	this.chara.draw();
};
CharacterChild.prototype.minusIndex = function(e){
	this.chara.index--;
	this.chara.draw();
};
CharacterChild.prototype.up = function(e){
	this.chara.direction = "up";
	this.chara.draw();
};
CharacterChild.prototype.right = function(e){
	this.chara.direction = "right";
	this.chara.draw();
};
CharacterChild.prototype.down = function(e){
	this.chara.direction = "down";
	this.chara.draw();
};
CharacterChild.prototype.left = function(e){
	this.chara.direction = "left";
	this.chara.draw();
};
CharacterChild.prototype.removeChara = function(e){
	var self = this;
	self.chara.remove();
	self.remove();
	charaChild = null;
};
