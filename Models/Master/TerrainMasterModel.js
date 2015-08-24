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
TerrainMasterModel.prototype.name = function() {
	return this.data.name;
};
TerrainMasterModel.prototype.strategy = function() {
	return this.data.strategy;
};
TerrainMasterModel.prototype.comment = function() {
	return this.data.comment;
};
TerrainMasterModel.prototype.sortValue = function() {
	return this.data.sortValue;
};