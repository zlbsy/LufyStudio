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
SoldierModel.prototype.getData = function() {
	var self = this;
	return {id:self.id(), proficiency:self.proficiency(), img:self.img()};
};
SoldierModel.prototype.id = function() {
	return this.data.id;
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
SoldierModel.prototype.isSpecialSoldiers = function() {
	return this.master().isSpecialSoldiers();
};
SoldierModel.prototype.newcount = function() {
	return this.master().newcount();
};
SoldierModel.prototype.strategyHert = function() {
	return this.master().strategyHert();
};
SoldierModel.prototype.quantity = function(value) {
	return this.data.quantity;
};
SoldierModel.prototype.maxProficiency = function() {
	return this.master().maxProficiency();
};
SoldierModel.prototype.proficiency = function(value) {
	var self = this;
	var maxProficiency = self.maxProficiency();
	return self._dataValue("proficiency",value,0,0,maxProficiency);
};
SoldierModel.prototype.name = function() {
	return this.master().name();
};
SoldierModel.prototype.maxTroops = function(charaModel) {
	return this.master().maxTroops(charaModel);
};
SoldierModel.prototype.maxMP = function(charaModel) {
	return this.master().maxMP(charaModel);
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
	return this.master().rangeAttack().concat();
};
SoldierModel.prototype.rangeAttackTarget = function() {
	return this.master().rangeAttackTarget().concat();
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
SoldierModel.prototype.strategySkill = function() {
	return this.master().strategySkill();
};
SoldierModel.prototype.img = function(isSelf) {
	var self = this;
	var imgIndex = self.data.img;
	if(!imgIndex || (imgIndex.indexOf("common") >= 0 && imgIndex.indexOf("common/200") < 0)){
		imgIndex = "common/" + self.master().img() + (isSelf ? "-1" : "-2");
	}
	return imgIndex;
};
SoldierModel.prototype.icon=function(size,callback){
	var self = this;
	if(typeof callback != "undefined" && typeof callback != "function"){console.error("error SoldierModel.prototype.icon");}
	if(!size){
		size = new LPoint(100,100);
	}
	var imgIndex = self.img();
	var icon = new BitmapSprite(LMvc.IMG_PATH + "character/s/"+imgIndex+".png", [64*18,0,64,64],size);
	if(typeof callback == "function")icon.addEventListener(LEvent.COMPLETE, callback);
	var winPanel = getPanel("win06",size.x,size.y);
	icon.addChild(winPanel);
	return icon;
};
SoldierModel.prototype.skill = function(type) {
	return this.master().skill(type);
};
SoldierModel.prototype.hasSkill = function(subType) {
	return this.master().hasSkill(subType);
};
