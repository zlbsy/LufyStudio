function BattleCharacterAI(chara) {
	var self = this;
	self.chara = chara;
}
BattleCharacterAI.prototype.setEvent = function() {
	var self = this;
	self.chara.removeAllEventListener();
	self.chara.addEventListener(Character.MOVE_COMPLETE,function(event){
		//TODO::
		//SouSouSMapSelectMenuController.instance().show();
	});
};
BattleCharacterAI.prototype.physicalAttack = function(target) {
	var self = this;
	console.log("LSouSouCharacterAI.prototype.physicalAttack");
	self.target = target;
	//self.chara.setActionDirection(CharacterAction.ATTACK,CharacterDirection.RIGHT);
};