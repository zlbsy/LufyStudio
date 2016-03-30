function BattleLoading(data){
	base(this,LSprite,[]);
	var s = this;
	var background = getBlackBitmap(LGlobal.width,LGlobal.height);
	s.addChild(background);
	s.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	s.addEventListener(LMouseEvent.MOUSE_UP, function(){});
	var bitmap = new LBitmap(new LBitmapData(LMvc.datalist["common-loading"]));
	bitmap.x = -bitmap.getWidth()*0.5;
	bitmap.y = -bitmap.getHeight()*0.5;
	s.layer = new LSprite();
	s.addChild(s.layer);
	s.layer.addChild(bitmap);
	s.layer.x = LGlobal.width * 0.5;
	s.layer.y = LGlobal.height * 0.7;
	
	var title = getStrokeLabel("XXXXX",30,"#FFFFFF","#00FF00",4);
	s.title = title;
	title.y = 50;
	s.addChild(title);
	
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
}
BattleLoading.prototype.setTitle = function (value){
	var self = this;
	self.title.text = value;
	self.title.x = (LGlobal.width - self.title.getWidth())*0.5;
};
BattleLoading.prototype.setProgress = function (value){};
BattleLoading.prototype.onframe = function(event){
	var self = event.currentTarget;
	self.layer.rotate += 10;
};