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
StrategyModel.prototype.level = function() {
	return this.data.lv;
};
StrategyModel.prototype.cost = function() {
	return this.master().cost();
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
StrategyModel.prototype.icon=function(size){
	return this.master().icon(size);
};
