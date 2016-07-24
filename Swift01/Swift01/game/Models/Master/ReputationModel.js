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
ReputationModel.prototype.attack = function(){
	return this.data.attack?this.data.attack:0;
};
ReputationModel.prototype.defense = function(){
	return this.data.defense?this.data.defense:0;
};
ReputationModel.prototype.breakout = function(){
	return this.data.breakout?this.data.breakout:0;
};
ReputationModel.prototype.morale = function(){
	return this.data.morale?this.data.morale:0;
};
ReputationModel.prototype.spirit = function(){
	return this.data.spirit?this.data.spirit:0;
};
ReputationModel.prototype.force = function(){
	return this.data.force?this.data.force:0;
};
ReputationModel.prototype.intelligence = function(){
	return this.data.intelligence?this.data.intelligence:0;
};
ReputationModel.prototype.command = function(){
	return this.data.command?this.data.command:0;
};
ReputationModel.prototype.agility = function(){
	return this.data.agility?this.data.agility:0;
};
ReputationModel.prototype.luck = function(){
	return this.data.luck?this.data.luck:0;
};