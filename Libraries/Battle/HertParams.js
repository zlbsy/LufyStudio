function HertParams(value){
	var self = this;
	self.value = value;
	self.list = [];
}
HertParams.prototype.push = function(chara, hertValue){
	this.list.push({chara:chara, hertValue:hertValue});
};
