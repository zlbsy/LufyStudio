function SingleCombatCharacterView(controller, id, w, h) {
	var self = this;
	LExtends(self, BattleCharacterView, [controller, id, w, h]);
	self.commands = [];
	//self.step = self.moveStep = 4;
	//self.layer.x = self.layer.y = -8;
	//self.belong = null;
	//self.AI = new BattleCharacterAI(self);
	//self.addShape(LShape.RECT,[0,0,BattleCharacterSize.width,BattleCharacterSize.height]);
}
SingleCombatCharacterView.prototype.moveTo = function(x,y){
	var self = this;
	self.setRoad([{x:x/BattleCharacterSize.width,y:y/BattleCharacterSize.height}]);
};
SingleCombatCharacterView.prototype.toStatic = function(value){
	var self = this;
	console.log("toStatic");
};