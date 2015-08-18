function StrategyMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "StrategyMasterModel";
	self.data = data;
}
StrategyMasterModel.master = [];
StrategyMasterModel.setMaster=function(list){
	if(StrategyMasterModel.master.length > 0){
		return;
	}
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var strategy = new StrategyMasterModel(null,list[i]);
		StrategyMasterModel.master.push(strategy);
	}
};
StrategyMasterModel.getMaster=function(id){
	var self = this;
	for(var i=0,l=StrategyMasterModel.master.length;i<l;i++){
		var strategy = StrategyMasterModel.master[i];
		if(strategy.id() != id){
			continue;
		}
		return strategy;
	}
	return null;
};
StrategyMasterModel.prototype.id = function() {
	return this.data.id;
};
StrategyMasterModel.prototype.name = function() {
	return this.data.name;
};
StrategyMasterModel.prototype.effectType = function() {
	return this.data.effectType;
};
StrategyMasterModel.prototype.strategyType = function() {
	return this.data.type;
};
StrategyMasterModel.prototype.canChangeStatus = function() {
	return this.data.effectType == StrategyEffectType.Status;
};
StrategyMasterModel.prototype.canAidStatus = function() {
	return this.data.effectType == StrategyEffectType.Aid;
};
StrategyMasterModel.prototype.belong = function() {
	return this.data.belong;
};
StrategyMasterModel.prototype.hert = function() {
	return this.data.hert;
};
StrategyMasterModel.prototype.weathers = function() {
	return this.data.weathers;
};
StrategyMasterModel.prototype.terrains = function() {
	return this.data.terrains;
};
StrategyMasterModel.prototype.rangeAttack = function() {
	return this.data.rangeAttack;
};
StrategyMasterModel.prototype.rangeAttackTarget = function() {
	return this.data.rangeAttackTarget;
};
StrategyMasterModel.prototype.cost = function() {
	return this.data.cost;
};
StrategyMasterModel.prototype.explanation = function() {
	return Language.getSoldier(this.data.explanation);
};
StrategyMasterModel.prototype.image = function() {
	return LMvc.IMG_PATH + "strategy/effect/"+this.data.image+".png";
};
StrategyMasterModel.prototype.icon=function(size){
	var self = this;
	var icon = new BitmapSprite(LMvc.IMG_PATH + "strategy/icon/"+self.data.icon+".png", null,size);
	var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win06"]),size.x,size.y);
	icon.addChild(getBitmap(winPanel));
	return icon;
};
StrategyMasterModel.prototype.imageCache = function(cache) {
	var self = this;
	if(typeof cache != UNDEFINED){
		self._imageCache = cache;
	}
	return self._imageCache;
};