function SoldierMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "SoldierMasterModel";
	self.data = data;
}
SoldierMasterModel.master = [];
SoldierMasterModel.setMaster=function(list){
	if(SoldierMasterModel.master.length > 0){
		return;
	}
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var soldier = new SoldierMasterModel(null,list[i]);
		SoldierMasterModel.master.push(soldier);
	}
};
SoldierMasterModel.getMaster=function(id){
	var self = this;
	for(var i=0,l=SoldierMasterModel.master.length;i<l;i++){
		var soldier = SoldierMasterModel.master[i];
		if(soldier.id() != id){
			continue;
		}
		return soldier;
	}
	return null;
};
SoldierMasterModel.prototype.id = function() {
	return this.data.id;
};
SoldierMasterModel.prototype.name = function() {
	return this.data.name;
};
SoldierMasterModel.prototype.technology = function() {
	return this.data.technology;
};
SoldierMasterModel.prototype.soldierType = function() {
	return this.data.type;
};
SoldierMasterModel.prototype.moveType = function() {
	return this.data.moveType;
};
SoldierMasterModel.prototype.movePower = function() {
	return this.data.movePower;
};
SoldierMasterModel.prototype.property = function() {
	return this.data.property;
};
SoldierMasterModel.prototype.equipment = function() {
	return this.data.equipment;
};
SoldierMasterModel.prototype.strategyHert = function() {
	if(!this.data.strategyHert){
		this.data.strategyHert = 1;
	}
	return this.data.strategyHert;
};
SoldierMasterModel.prototype.restrain = function(restrainId) {
	var self = this;
	if(!self._restrain){
		self._restrain = [];
		for(var i=0;i<self.data.restrain.length;i++){
			var child = self.data.restrain[i];
			self._restrain[child.id] = child;
		}
	}
	var restrainData = self._restrain[restrainId];
	if(!restrainData){
		restrainData = {"id": 1, "value": 100};
		self._restrain[restrainId] = restrainData;
	}
	return restrainData;
};
SoldierMasterModel.prototype.terrain = function(terrainId) {
	var self = this;
	if(!self._terrains){
		self._terrains = [];
		for(var i=0;i<self.data.terrain.length;i++){
			var child = self.data.terrain[i];
			self._terrains[child.id] = child;
		}
	}
	var terrainData = self._terrains[terrainId];
	if(!terrainData){
		terrainData = {"id": 1, "value": 100, "moveCost": 1};
		self._terrains[terrainId] = terrainData;
	}
	return terrainData;
};
SoldierMasterModel.prototype.rangeAttack = function() {
	return this.data.rangeAttack;
};
SoldierMasterModel.prototype.rangeAttackTarget = function() {
	return this.data.rangeAttackTarget;
};
SoldierMasterModel.prototype.strategy = function() {
	var self = this;
	if(!self._strategies){
		self._strategies = [];
		for(var i=0;i<self.data.strategy.length;i++){
			var data = self.data.strategy[i];
			self._strategies.push(new StrategyModel(null, data));
		}
	}
	return self._strategies;
};
SoldierMasterModel.prototype.explanation = function() {
	return Language.getSoldier(this.data.explanation);
};
SoldierMasterModel.prototype.next = function() {
	return this.data.next;
};
SoldierMasterModel.prototype.img=function(){
	return this.data.img;
};
