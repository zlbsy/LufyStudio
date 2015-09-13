function SeigniorModel(controller, data) {
	var self = this;
	base(self, MyModel, [controller]);
	self.type = "StageMasterModel";
	self.data = data;
	
}

SeigniorModel.list = [];
SeigniorModel.setSeignior=function(list){
	var self = this;
	for(var i=0,l=list.length;i<l;i++){
		var seignior = new SeigniorModel(null,list[i]);
		SeigniorModel.list.push(seignior);
	}
};
SeigniorModel.getSeignior=function(chara_id){
	var self = this;
	for(var i=0,l=SeigniorModel.list.length;i<l;i++){
		var seignior = SeigniorModel.list[i];
		if(seignior.chara_id() != chara_id){
			continue;
		}
		return seignior;
	}
	return null;
};
SeigniorModel.removeSeignior = function(seigniorId){
	var self = this;
	for(var i=0,l=SeigniorModel.list.length;i<l;i++){
		var seignior = SeigniorModel.list[i];
		if(seignior.chara_id() == seigniorId){
			SeigniorModel.list.splice(i, 1);
			break;
		}
	}
};
SeigniorModel.prototype.chara_id = function(){
	return this.data.chara_id;
};
SeigniorModel.prototype.color = function(){
	return this.data.color;
};
/**
 * 城池
 **/
SeigniorModel.prototype.areas = function(){
	return this.data.areas;
};
SeigniorModel.prototype.addCity = function(area){
	this.data.areas.push(area);
};
SeigniorModel.prototype.removeCity = function(areaId){
	var index = this.data.areas.findIndex(function(child){
		return child.id() == areaId;
	});
	this.data.areas.splice(index, 1);
};
/**
 * 武将
 **/
SeigniorModel.prototype.generals = function(){
	return this.data.generals;
};