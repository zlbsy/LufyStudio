function SoldierModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "SoldierModel";
	self.data = data;
}
SoldierModel.prototype.master=function(){
	var self = this;
	if(!self._master){
		self._master = SoldierMasterModel.getMaster(self.id());
	}
	return self._master;
};
SoldierModel.prototype.id = function() {
	return this.data.id;
};
SoldierModel.prototype.learned = function() {
	return this.data.learned;
};
SoldierModel.prototype.proficiency = function() {
	return this.data.proficiency;
};
SoldierModel.prototype.name = function() {
	return this.master().name();
};
SoldierModel.prototype.enlistPrice = function() {
	return this.master().enlistPrice();
};
SoldierModel.prototype.soldierType = function() {
	return this.master().soldierType();
};
SoldierModel.prototype.moveType = function() {
	return this.master().moveType();
};
SoldierModel.prototype.movePower = function() {
	return this.master().movePower();
};
SoldierModel.prototype.property = function() {
	return this.master().property();
};
SoldierModel.prototype.equipment = function() {
	return this.master().equipment();
};
SoldierModel.prototype.restrain = function() {
	return this.master().restrain();
};
SoldierModel.prototype.terrain = function() {
	return this.master().terrain();
};
SoldierModel.prototype.rangeAttack = function() {
	return this.master().rangeAttack();
};
SoldierModel.prototype.rangeAttackTarget = function() {
	return this.master().rangeAttackTarget();
};
SoldierModel.prototype.strategy = function() {
	return this.master().strategy();
};
SoldierModel.prototype.explanation = function() {
	return this.master().explanation();
};
SoldierModel.prototype.next = function() {
	return this.master().next();
};
SoldierModel.prototype.icon=function(size,anime){
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
