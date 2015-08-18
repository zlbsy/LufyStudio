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
	return Language.get("skill_name_"+this.data.id);
};
SkillMasterModel.prototype.explanation = function() {
	return Language.get("skill_explanation_"+this.data.id);
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
SkillMasterModel.prototype.vampire = function() {
	return this.data.vampire;
};
