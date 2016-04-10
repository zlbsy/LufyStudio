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
	
	var charas = [];
	for(var i=0; i<MaxHistoryCharacterIndex; i++){
		var chara = CharacterModel.list[i];
		if(chara.data.force >= 80){
			charas.push(chara);
		}
	}
	charas = charas.sort(function(a, b){return b.data.force - a.data.force;});
	self.characters = charas;
	self.controller.loadCharacterList(CharacterListType.GAME_SINGLE_COMBAT, charas, {isOnlyOne:true, buttonLabel:"execute", noCutover:true, noDetailed:true});
};
SingleCombatArenaView.prototype.addCharacterListView=function(characterListView){
	this.contentLayer.addChild(characterListView);
};
SingleCombatArenaView.prototype.closeCharacterList=function(event){
	var self = event.currentTarget.view;
	if(event.subEventType == "return"){
		self.controller.closeSelf();
		return;
	}
	if(event.characterList.length > 1){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return false;
	}
	var selectCharacterId = event.characterList[0].id();
	self.controller.setValue("selectCharacterId",selectCharacterId);
	var enemyList = [];
	var killedEnemyList = [];
	self.characters.forEach(function(child){
		if(child.id() == selectCharacterId){
			return;
		}
		enemyList.push(child.id());
	});
	enemyList = enemyList.sort(function(a,b){return Math.random() > 0.5 ? 1 : -1;});
	self.controller.setValue("enemyList",enemyList);
	self.controller.setValue("killedEnemyList",killedEnemyList);
	self.singleCombatStart();
	self.contentLayer.visible = false;
	return true;
};
SingleCombatArenaView.prototype.singleCombatStart=function(hp){
	var self = this;
	var selectCharacterId = self.controller.getValue("selectCharacterId");
	var enemyList = self.controller.getValue("enemyList");
	var currentEnemyId = enemyList.splice(enemyList.length * Math.random() >>> 0, 1)[0];
	self.controller.setValue("enemyList",enemyList);
	self.currentEnemyId = currentEnemyId;
	var selectCharacter = CharacterModel.getChara(selectCharacterId);
	selectCharacter.maxHP(100);
	selectCharacter.HP(hp ? hp : 100);
	var currentEnemy = CharacterModel.getChara(currentEnemyId);
	currentEnemy.maxHP(100);
	currentEnemy.HP(100);
	var combat = new SingleCombatController(self.controller,selectCharacterId,currentEnemyId);
	self.parent.addChild(combat.view);
};
SingleCombatArenaView.prototype.keepUp=function(){
	var self = this;
	var killedEnemyList = self.controller.getValue("killedEnemyList");
	killedEnemyList.push(self.currentEnemyId);
	self.controller.setValue("killedEnemyList",killedEnemyList);
	var selectCharacterId = self.controller.getValue("selectCharacterId");
	var selectCharacter = CharacterModel.getChara(selectCharacterId);
	var hp = LMvc.SingleCombatController.view.leftCharacter.barHp.value;
	LMvc.SingleCombatController.over();
	self.singleCombatStart(hp + Math.floor((100 - hp) * 0.5));
};
SingleCombatArenaView.prototype.restart=function(){
	var self = this;
	LMvc.SingleCombatController.over();
	self.contentLayer.visible = true;
};