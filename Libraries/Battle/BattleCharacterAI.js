function BattleCharacterAI(chara) {
	var self = this;
	self.chara = chara;
}
BattleCharacterAI.prototype.setEvent = function() {
	var self = this;
	self.chara.removeAllEventListener();
	self.chara.addEventListener(BattleCharacterEvent.MOVE_COMPLETE,function(event){
		BattleSelectMenuController.instance().show();
	});
};
BattleCharacterAI.prototype.physicalAttack = function(target) {
	var self = this;
	console.log("LSouSouCharacterAI.prototype.physicalAttack");
	self.target = target;
	self.chara.setActionDirection(CharacterAction.ATTACK,CharacterDirection.RIGHT);
};