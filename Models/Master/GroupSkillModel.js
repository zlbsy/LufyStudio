function GroupSkillModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "GroupSkillModel";
	self.data = data;
}
GroupSkillModel.master = [];
GroupSkillModel.setMaster=function(list){
	if(GroupSkillModel.master.length > 0){
		return;
	}
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var child = new GroupSkillModel(null,list[i]);
		GroupSkillModel.master.push(child);
	}
};
GroupSkillModel.getMaster=function(id){
	var self = this;
	for(var i=0,l=GroupSkillModel.master.length;i<l;i++){
		var child = GroupSkillModel.master[i];
		if(child.id() != id){
			continue;
		}
		return child;
	}
	return null;
};
GroupSkillModel.prototype.id=function(){
	return this.data.id;
};
GroupSkillModel.prototype.name=function(){
	return Language.getSkillName("group_"+this.data.id);
};
GroupSkillModel.prototype.probability=function(){
	return this.data.probability;
};
GroupSkillModel.prototype.correctionFactor=function(){
	return this.data.correctionFactor;
};
GroupSkillModel.prototype.group=function(){
	return this.data.group;
};