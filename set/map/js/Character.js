function Character(color){
	var self = this;
	base(self,LSprite,[]);
	self.direction = "down";
	self.color = color;
	self.index = 0;
	self.indexText = new LTextField();
	self.indexText.y = 10;
	self.addChild(self.indexText);
	self.draw();
};
Character.prototype.draw=function(){
	var self = this;
	self.indexText.text = self.index;
	self.indexText.x = (48-self.indexText.getWidth())*0.5;
	self.graphics.clear();
	self.graphics.drawRect(0,self.color,[9,9,30,30],true,self.color);
	switch(self.direction){
		case "down":
			self.graphics.drawRect(2,self.color,[20,39,8,8]);
			break;
		case "up":
			self.graphics.drawRect(2,self.color,[20,1,8,8]);
			break;
		case "left":
			self.graphics.drawRect(2,self.color,[1,20,8,8]);
			break;
		case "right":
			self.graphics.drawRect(2,self.color,[39,20,8,8]);
			break;
	}
};