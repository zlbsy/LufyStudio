function CreateSeigniorColorView(controller, color){
	var self = this;
	base(self,LView,[controller]);
	self.init(color);
}
CreateSeigniorColorView.prototype.init=function(color){
	var self = this;
	var colors = color.split(",");
};
CreateSeigniorColorView.prototype.getData=function(){
	var self = this;
};