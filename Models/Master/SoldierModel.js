function SoldierModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "SoldierModel";
	self.data = data;
}
SoldierModel.createModel = function(id){
	return new SoldierModel(null,{id:id,proficiency:"B"});
};
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
SoldierModel.prototype.readyQuantity = function(value) {
	if(typeof value != UNDEFINED){
		this.data.readyQuantity = value;
		return;
	}else if(typeof this.data.readyQuantity == UNDEFINED){
		this.data.readyQuantity = 0;
	}
	return this.data.readyQuantity;
};
SoldierModel.prototype.strategyHert = function() {
	return this.master().strategyHert();
};
SoldierModel.prototype.quantity = function(value) {
	return this.data.quantity;
};
SoldierModel.prototype.proficiency = function(value) {
	return this._dataValue("proficiency",value,0);
};
SoldierModel.prototype.name = function() {
	return this.master().name();
};
SoldierModel.prototype.maxTroops = function(charaModel) {
	return this.master().maxTroops(charaModel);
};
SoldierModel.prototype.technology = function() {
	return this.master().technology();
};
SoldierModel.prototype.soldierType = function() {
	return this.master().soldierType();
};
SoldierModel.prototype.attackType = function() {
	return this.master().attackType();
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
SoldierModel.prototype.restrain = function(restrainId) {
	return this.master().restrain(restrainId);
};
SoldierModel.prototype.terrain = function(terrainId) {
	return this.master().terrain(terrainId);
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
SoldierModel.prototype.img = function() {
	var self = this;
	var imgIndex = self.data.img;
	if(!imgIndex){
		imgIndex = self.master().img();
	}
	return imgIndex;
};
SoldierModel.prototype.icon=function(size,callback){
	var self = this;
	if(typeof callback != "undefined" && typeof callback != "function"){alert("error SoldierModel.prototype.icon");}
	if(!size){
		size = new LPoint(100,100);
	}
	var imgIndex = self.data.img;
	if(!imgIndex){
		imgIndex = self.master().img();
	}
	var icon = new BitmapSprite(LMvc.IMG_PATH + "character/s/"+imgIndex+".png", [64*12,0,64,64],size);
	if(typeof callback == "function")icon.addEventListener(LEvent.COMPLETE, callback);
	var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win06"]),size.x,size.y);
	winPanel.cacheAsBitmap(true);
	icon.addChild(winPanel);
	return icon;
};
