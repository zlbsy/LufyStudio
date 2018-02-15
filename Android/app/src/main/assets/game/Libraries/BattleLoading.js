function BattleLoading(data){
	base(this,LSprite,[]);
	var s = this;
	var background = getBlackBitmap(LMvc.screenWidth,LMvc.screenHeight);
	s.addChild(background);
	s.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	s.addEventListener(LMouseEvent.MOUSE_UP, function(){});
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["common-loading"]));
	bitmap.x = -bitmap.getWidth()*0.5;
	bitmap.y = -bitmap.getHeight()*0.5;
	s.layer = new LSprite();
	s.addChild(s.layer);
	s.layer.addChild(bitmap);
	s.layer.x = LMvc.screenWidth * 0.5;
	s.layer.y = LMvc.screenHeight * 0.7;
	
	var title = getStrokeLabel("",34,"#FFFFFF","#FFFF00",2);
	s.title = title;
	title.y = 50;
	s.addChild(title);
	
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
}
BattleLoading.prototype.setTitle = function (value){
	var self = this;
	self.title.text = value;
	self.title.x = (LMvc.screenWidth - self.title.getWidth())*0.5;
};
BattleLoading.prototype.setProgress = function (value){};
BattleLoading.prototype.onframe = function(event){
	var self = event.currentTarget;
	self.layer.rotate += 10;
};