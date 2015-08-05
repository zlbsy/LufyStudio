function HertParams(){
	var self = this;
	self.list = [];
}
HertParams.prototype.push = function(chara, hertValue){
	this.list.push({chara:chara, hertValue:hertValue});
};
