function SkillMasterModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "SkillMasterModel";
	self.data = data;
}
SkillMasterModel.master = [];
SkillMasterModel.setMaster=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var skill = new SkillMasterModel(null,list[i]);
		SkillMasterModel.master.push(skill);
	}
};
SkillMasterModel.getMaster=function(id){
	var self = this;
	for(var i=0,l=SkillMasterModel.master.length;i<l;i++){
		var skill = SkillMasterModel.master[i];
		if(skill.id() != id){
			continue;
		}
		return skill;
	}
	return null;
};
SkillMasterModel.prototype.id = function() {
	return this.data.id;
};
SkillMasterModel.prototype.name = function() {
	return Language.getSkill("skill_name_"+this.data.id);
};
SkillMasterModel.prototype.explanation = function() {
	return Language.getSkill("skill_explanation_"+this.data.id);
};
SkillMasterModel.prototype.mainType = function() {
	return this.data.type;
};
SkillMasterModel.prototype.subType = function() {
	return this.data.subType;
};
SkillMasterModel.prototype.isSubType = function(subType) {
	return this.data.subType.indexOf(subType) >= 0;
};
SkillMasterModel.prototype.attacks = function() {
	return this.data.attacks;
};
SkillMasterModel.prototype.strategyAttacks = function() {
	return this.data.strategy_attacks;
};
SkillMasterModel.prototype.rects = function() {
	return this.data.rects;
};
SkillMasterModel.prototype.probability = function() {
	return this.data.probability;
};
SkillMasterModel.prototype.hert = function() {
	return this.data.hert;
};
SkillMasterModel.prototype.aids = function() {
	return this.data.aids;
};
SkillMasterModel.prototype.aidCount = function() {
	return this.data.aidCount;
};
SkillMasterModel.prototype.aidRects = function() {
	return this.data.aidRects;
};
SkillMasterModel.prototype.wakeRects = function() {
	return this.data.wakeRects;
};
SkillMasterModel.prototype.minusRects = function() {
	return this.data.minusRects;
};
SkillMasterModel.prototype.vampire = function() {
	return this.data.vampire;
};
SkillMasterModel.prototype.ambush = function() {
	return this.data.ambush;
};
SkillMasterModel.prototype.ambushRects = function() {
	return this.data.ambushRects;
};
SkillMasterModel.prototype.thrift = function() {
	return this.data.thrift;
};
SkillMasterModel.prototype.bounce = function() {
	return this.data.bounce;
};
SkillMasterModel.prototype.condition = function() {
	return this.data.condition;
};
SkillMasterModel.prototype.ignore = function() {
	return this.data.ignore;
};
SkillMasterModel.prototype.speadRects = function() {
	return this.data.speadRects;
};
SkillMasterModel.prototype.speadProbability = function() {
	return this.data.speadProbability;
};
SkillMasterModel.prototype.enlistCount = function() {
	return this.data.enlist_count;
};
SkillMasterModel.prototype.enlistValue = function() {
	return this.data.enlist_value;
};
