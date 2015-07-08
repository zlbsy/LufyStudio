function SingleCombatArenaView(controller){
	var self = this;
	base(self,LView,[controller]);
}
SingleCombatArenaView.prototype.construct=function(){
	var self = this;
	self.controller.addEventListener(LEvent.COMPLETE, self.init.bind(self));
	self.controller.addEventListener(CharacterListEvent.CLOSE, self.closeCharacterList);
};
SingleCombatArenaView.prototype.init=function(){
	var self = this;
	self.contentLayer = new LSprite();
	self.addChild(self.contentLayer);
	
	self.arenaLayer = new LSprite();
	self.addChild(self.arenaLayer);
	
	self.controller.loadCharacterList(CharacterListType.TEST,self);
};
SingleCombatArenaView.prototype.addCharacterListView=function(characterListView){
	this.contentLayer.addChild(characterListView);
};
SingleCombatArenaView.prototype.closeCharacterList=function(event){
	var self = event.currentTarget.view;
	if(event.characterList.length > 1){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_leader_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return false;
	}
	var selectCharacterId = event.characterList[0].id();
	self.controller.setValue("selectCharacterId",selectCharacterId);
	var enemyList = [];
	var killedEnemyList = [];
	CharacterModel.list.forEach(function(child){
		if(child.id() == selectCharacterId){
			return;
		}
		enemyList.push(child.id());
	});
	self.controller.setValue("enemyList",enemyList);
	self.controller.setValue("killedEnemyList",killedEnemyList);
	self.singleCombatStart();
	self.contentLayer.visible = false;
	return true;
};
SingleCombatArenaView.prototype.singleCombatStart=function(){
	var self = this;
	self.arenaLayer.removeAllChild();
	var selectCharacterId = self.controller.getValue("selectCharacterId");
	var enemyList = self.controller.getValue("enemyList");
	var currentEnemyId = enemyList.splice(enemyList.length * Math.random() >>> 0, 1)[0];
	self.controller.setValue("enemyList",enemyList);
	self.currentEnemyId = currentEnemyId;
	var selectCharacter = CharacterModel.getChara(selectCharacterId);
	selectCharacter.maxHP(100);
	selectCharacter.HP(100);
	var currentEnemy = CharacterModel.getChara(currentEnemyId);
	currentEnemy.maxHP(100);
	currentEnemy.HP(100);
	var combat = new SingleCombatController(self.controller,selectCharacterId,currentEnemyId);
	self.arenaLayer.addChild(combat.view);
};
SingleCombatArenaView.prototype.keepUp=function(){
	var self = this;
	var killedEnemyList = self.controller.getValue("killedEnemyList");
	killedEnemyList.push(self.currentEnemyId);
	self.controller.setValue("killedEnemyList",killedEnemyList);
	self.singleCombatStart();
};
SingleCombatArenaView.prototype.restart=function(){
	var self = this;
	self.arenaLayer.removeAllChild();
	self.contentLayer.visible = true;
};