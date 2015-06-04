function StrategyModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "StrategyModel";
	self.data = data;
}
StrategyModel.prototype.master=function(){
	var self = this;
	if(!self._master){
		self._master = StrategyMasterModel.getMaster(self.id());
	}
	return self._master;
};
StrategyModel.prototype.id = function() {
	return this.data.id;
};
StrategyModel.prototype.cost = function() {
	return this.data.cost;
};
StrategyModel.prototype.name = function() {
	return this.master().name();
};
StrategyModel.prototype.strategyType = function() {
	return this.master().strategyType();
};
StrategyModel.prototype.hert = function() {
	return this.master().hert();
};
StrategyModel.prototype.belong = function() {
	return this.master().belong();
};
StrategyModel.prototype.rangeAttack = function() {
	return this.master().rangeAttack();
};
StrategyModel.prototype.rangeAttackTarget = function() {
	return this.master().rangeAttackTarget();
};
StrategyModel.prototype.strategy = function() {
	return this.master().strategy();
};
StrategyModel.prototype.explanation = function() {
	return this.master().explanation();
};
StrategyModel.prototype.image = function() {
	return this.master().image();
};
StrategyModel.prototype.icon=function(size,anime){
	var self = this;
	if(!size){
		size = new LPoint(100,100);
	}
	var imgIndex = self.data.img;
	if(!imgIndex){
		imgIndex = self.master().img();
	}
	var icon = new BitmapSprite(LMvc.IMG_PATH + "character/"+imgIndex+"/mov.png", [0,48*6,48,48],size);
	if(anime){
		icon.addEventListener(LEvent.COMPLETE, function(event){
			var sprite = event.currentTarget;
			var bitmap = sprite.getChildByName("bitmap");
			var bitmapData = bitmap.bitmapData;
			sprite.removeChild(bitmap);
			var list = LGlobal.divideCoordinate(48, 96, 2, 1);
			list = [[list[0][0],list[1][0]]];
			var animation = new LAnimationTimeline(bitmapData,list);
			animation.speed = 5;
			sprite.addChild(animation);
		});
	}
	var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win06"]),size.x,size.y);
	icon.addChild(getBitmap(winPanel));
	return icon;
};
