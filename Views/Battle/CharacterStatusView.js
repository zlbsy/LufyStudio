function CharacterStatusView(controller){
	var self = this;
	LExtends(self,LView,[controller]);
	self.status = [];
}
CharacterStatusView.prototype.addStatus = function(mode){
	var self = this;
	//{mode:??,p:0.1}
	for(var i = 0;i<self.status.length;i++){
		var child = self.status[i];
		if(child.mode == mode){
			child.p = 0.1;
			return;
		}
	}
	self.status.push({mode:mode,p:0.1});
};
CharacterStatusView.prototype.removeStatus = function(){
	var self = this;
	for(var i = self.status.length-1;i>=0;i--){
		var child = self.status[i];
		if(Math.random() < child.p){
			self.status.splice(i, 1);
		}else{
			child.p += (child.p < 0.5 ? 0.1 : 0);
		}
	}
};
CharacterStatusView.prototype.hasStatus = function(mode){
	var status = this.status.find(function(child){
		return child.mode == mode;
	});
	return status != null;
};