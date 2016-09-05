function BattleMarkView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.set();
}
BattleMarkView.prototype.set = function(){
	var self = this;
	var bitmapData = new LBitmapData(LMvc.datalist["arrow"]);
	var mark = new LBitmap(bitmapData);
	mark.x = -bitmapData.width*0.5;
	mark.y = -bitmapData.height*0.5;
	self.mark = new LSprite();
	self.addChild(self.mark);
	self.mark.addChild(mark);
	self.mark.rotate = -90;
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
BattleMarkView.prototype.onframe = function(event){
	var self = event.currentTarget;
	if(self.direction > 0){
		if(self.mark.y >= 10){
			self.direction = -1;
		}else{
			self.mark.y += 2;
		}
	}else{
		if(self.mark.y <= 0){
			self.direction = 1;
		}else{
			self.mark.y -= 2;
		}
	}
};