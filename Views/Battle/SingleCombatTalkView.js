function SingleCombatTalkView(controller, id, w, h) {
	var self = this;
	LExtends(self, BattleCharacterView, [controller, id, w, h]);
	self.commands = [];
	self.selectedCommands = [];
	self.selectedButtons = [];
	self.maxCommand = getSingleCombatCommandCount(self.data.force());
	self.setCommands();
}
SingleCombatTalkView.prototype.moveTo = function(x,y){
	var self = this;
	self.setRoad([{x:x/BattleCharacterSize.width,y:y/BattleCharacterSize.height}]);
};
SingleCombatTalkView.prototype.toStatic = function(value){
	//覆盖父类处理
};
SingleCombatTalkView.prototype.setCommands=function(){
	var self = this, command;
	while(self.commands.length < self.maxCommand){
		command = getSingleCombatCommand(self.commands,self.angry,self.data.force());
		self.commands.push(command);
	}
};
SingleCombatTalkView.prototype.toSelectCommand=function(){
	var self = this;
	while(self.selectedCommands.length < 2){
		var index = self.commands.length * Math.random() >> 0;
		var command = self.commands[i];
		self.commands.splice(index, 1);
		self.selectedCommands.push(command);
	}
};