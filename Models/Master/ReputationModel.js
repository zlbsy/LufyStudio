function ReputationModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "ReputationModel";
	self.data = data;
}
ReputationModel.list = [];
ReputationModel.setReputation=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var reputation = new ReputationModel(null,list[i]);
		ReputationModel.list.push(reputation);
	}
};
ReputationModel.getReputation=function(id){
	var self = this;
	for(var i=0,l=ReputationModel.list.length;i<l;i++){
		var reputation = ReputationModel.list[i];
		if(reputation.id() != id){
			continue;
		}
		return reputation;
	}
	return null;
};
ReputationModel.prototype.id = function() {
	return this.data.id;
};
ReputationModel.prototype.name = function() {
	return Language.get(this.data.name);
};
