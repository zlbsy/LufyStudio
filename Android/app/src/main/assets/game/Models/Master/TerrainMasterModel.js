function TerrainMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "StrategyMasterModel";
	self.data = data;
}
TerrainMasterModel.master = [];
TerrainMasterModel.setMaster=function(list){
	if(TerrainMasterModel.master.length > 0){
		return;
	}
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var data = new TerrainMasterModel(null,list[i]);
		TerrainMasterModel.master.push(data);
	}
};
TerrainMasterModel.getMaster=function(id){
	var self = this;
	for(var i=0,l=TerrainMasterModel.master.length;i<l;i++){
		var data = TerrainMasterModel.master[i];
		if(data.id() != id){
			continue;
		}
		return data;
	}
	return null;
};
TerrainMasterModel.getMasterFromValue=function(id){
	var self = this;
	for(var i=0,l=TerrainMasterModel.master.length;i<l;i++){
		var data = TerrainMasterModel.master[i];
		if(data.id() != id){
			continue;
		}
		return data;
	}
	return null;
};
TerrainMasterModel.prototype.id = function() {
	return this.data.id;
};
TerrainMasterModel.prototype.se = function() {
	return this.data.se;
};
TerrainMasterModel.prototype.boat = function() {
	return this.data.boat;
};
TerrainMasterModel.prototype.name = function() {
	return Language.get("terrain_"+this.data.id);
};
TerrainMasterModel.prototype.heal = function() {
	return this.data.heal;
};
TerrainMasterModel.prototype.strategy = function() {
	return this.data.strategy;
};
TerrainMasterModel.prototype.comment = function() {
	return Language.get(this.data.comment);
};
TerrainMasterModel.prototype.sortValue = function() {
	console.error("已删除属性");
	alert("已删除属性");
	return 1;
};