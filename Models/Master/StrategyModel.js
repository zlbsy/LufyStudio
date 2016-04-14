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
StrategyModel.prototype.se = function() {
	return this.master().se();
};
StrategyModel.prototype.cost = function() {
	return this.master().cost();
};
StrategyModel.prototype.name = function() {
	return this.master().name();
};
StrategyModel.prototype.effectType = function() {
	return this.master().effectType();
};
StrategyModel.prototype.strategyType = function() {
	return this.master().strategyType();
};
StrategyModel.prototype.weathers = function() {
	return this.master().weathers();
};
StrategyModel.prototype.terrains = function() {
	return this.master().terrains();
};
StrategyModel.prototype.hert = function() {
	return this.master().hert();
};
StrategyModel.prototype.troops = function() {
	return this.master().troops();
};
StrategyModel.prototype.wounded = function() {
	return this.master().wounded();
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
StrategyModel.prototype.imageCache = function(cache) {
	return this.master().imageCache(cache);
};
StrategyModel.prototype.icon=function(size, callback){
	var self = this;
	var icon = new BitmapSprite(LMvc.IMG_PATH + "strategy/icon/"+self.master().icon()+".png", null,size);
	if(typeof callback == "function")icon.addEventListener(LEvent.COMPLETE, callback);
	var winPanel = new LPanel(new LBitmapData(LMvc.datalist["win06"]),size.x,size.y);
	winPanel.cacheAsBitmap(true);
	icon.addChild(winPanel);
	return icon;
};
/*StrategyModel.prototype.icon=function(size){
	return this.master().icon(size);
};*/
StrategyModel.prototype.strategyImageLoad = function(target,callback,params){
	var self = this;
	if(self.imageCache()){
		callback.apply(target);
		return;
	}
	self.target = target;
	self.callback = callback;
	self.params = params;
	var loader = new LLoader();
	loader.parent = self;
	loader.addEventListener(LEvent.COMPLETE, self.loadData);
	loader.load(self.image(), "bitmapData");
	LMvc.keepLoading(true);
};
StrategyModel.prototype.loadData = function(event){
	var self = event.currentTarget.parent;
	var callback = self.callback;
	var target = self.target;
	var params = self.params;
	self.target = null;
	self.callback = null;
	self.params = null;
	LMvc.keepLoading(false);
	self.imageCache(event.target);
	callback.apply(target,params);
};