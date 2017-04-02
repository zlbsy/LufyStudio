function MilitaryModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "MilitaryModel";
	self.data = data;
}
MilitaryModel.master = [];
MilitaryModel.setMaster=function(list){
	if(MilitaryModel.master.length > 0){
		return;
	}
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var military = new MilitaryModel(null,list[i]);
		MilitaryModel.master.push(military);
	}
};
MilitaryModel.getMaster=function(id){
	var self = this;
	for(var i=0,l=MilitaryModel.master.length;i<l;i++){
		var military = MilitaryModel.master[i];
		if(military.id() != id){
			continue;
		}
		return military;
	}
	return null;
};
MilitaryModel.prototype.id = function() {
	return this.data.id;
};
MilitaryModel.prototype.image = function() {
	return this.data.image;
};
MilitaryModel.prototype.imageCount = function() {
	return this.data.imageCount;
};
MilitaryModel.prototype.isType = function(type) {
	return this.data.type.indexOf(type) >= 0;
};
MilitaryModel.prototype.validLimit = function() {
	return this.data.validLimit;
};
MilitaryModel.prototype.belong = function() {
	return this.data.belong;
};
MilitaryModel.prototype.aids = function() {
	return this.data.aids;
};
MilitaryModel.prototype.aidCount = function() {
	return this.data.aidCount;
};
MilitaryModel.prototype.heals = function() {
	return this.data.heals;
};
MilitaryModel.prototype.healCount = function() {
	return this.data.healCount;
};
MilitaryModel.prototype.hert = function() {
	return this.data.hert;
};
MilitaryModel.prototype.strategys = function() {
	return this.data.strategys;
};
MilitaryModel.prototype.healTroops = function() {
	return this.data.healTroops;
};
MilitaryModel.prototype.name = function() {
	return Language.getSkill("m_"+this.data.id);
};
MilitaryModel.prototype.explanation = function() {
	return Language.getSkill("mi_"+this.data.id);
};
MilitaryModel.prototype.strategyCount = function() {
	return this.data.strategyCount;
};
MilitaryModel.prototype.powerful = function() {
	return this.data.powerful;
};
MilitaryModel.prototype.condition = function() {
	return this.data.condition;
};