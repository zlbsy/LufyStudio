function TournamentsView(controller){
	var self = this;
	base(self,LView,[controller]);
}
TournamentsView.prototype.construct=function(){
	var self = this;
	self.controller.addEventListener(LEvent.COMPLETE, self.init.bind(self));
	self.controller.addEventListener(CharacterListEvent.CLOSE, self.closeCharacterList);
};
TournamentsView.prototype.init=function(){
	var self = this;
	self.contentLayer = new LSprite();
	self.addChild(self.contentLayer);
	
	self.arenaLayer = new LSprite();
	self.addChild(self.arenaLayer);
	var charas = [];
	var charasAll = SeigniorModel.getSeignior(LMvc.selectSeignorId).generals();
	
	for(var i=0, l=charasAll.length; i<l; i++){
		var chara = charasAll[i];
		if(chara.data.force < 80 && i>20){
			break;
		}
		charas.push(chara);
	}
	charas = charas.sort(function(a, b){return b.data.force - a.data.force;});
	self.characters = [];
	for(var i=0,l=SeigniorModel.list.length;i<l;i++){
		var seignior = SeigniorModel.list[i];
		if(seignior.chara_id() == LMvc.selectSeignorId){
			continue;
		}
		var generals = seignior.generals().sort(function(a, b){return b.data.force - a.data.force;});
		self.characters.push(generals[0]);
	}
	self.characters = self.characters.sort(function(a, b){return b.data.force - a.data.force;});
	self.controller.loadCharacterList(CharacterListType.TOURNAMENTS_SELECT, charas, {isOnlyOne:true, buttonLabel:"execute", noCutover:true, noDetailed:true, toast:"tournaments_select_toast",closeDisable:true});
};
TournamentsView.prototype.addCharacterListView=function(characterListView){
	this.contentLayer.addChild(characterListView);
};
TournamentsView.prototype.closeCharacterList=function(event){
	var self = event.currentTarget.view;
	var selectCharacterId = event.characterList[0].id();
	self.controller.setValue("selectCharacterId",selectCharacterId);
	var force = event.characterList[0].force();
	var maxLength = 8;
	var enemyList = [];
	var killedEnemyList = [];
	self.characters.forEach(function(child){
		if(child.id() == selectCharacterId || enemyList.length >= maxLength - 1){
			return;
		}
		enemyList.push({id:child.id(), r:[]});
	});
	var charas = [622,626,632,638,642,644,652,658,662,668];
	charas = charas.sort(function(a, b){return Math.fakeRandom() > 0.5 ? 1 : -1;});
	while(enemyList.length < maxLength - 1){
		enemyList.push({id:charas.shift(), r:[]});
	}
	enemyList = enemyList.sort(function(a,b){return Math.fakeRandom() > 0.5 ? 1 : -1;});
	enemyList.unshift({id:selectCharacterId, r:[]});
	
	self.controller.setValue("characters",enemyList);
	//self.singleCombatStart();
	self.confirmShow();
	self.contentLayer.visible = false;
	return true;
};
TournamentsView.prototype.singleCombatStart=function(hp){
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
TournamentsView.prototype.keepUp=function(){
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
TournamentsView.prototype.confirmShow=function(){
	var self = this;
	if(!self.confirmDialog){
		self.confirmDialog = new TournamentsConfirmView();
		self.addChild(self.confirmDialog);
	}
	self.confirmDialog.visible = true;
	self.confirmDialog.updateView();
	//LMvc.SingleCombatController.over();
	//self.contentLayer.visible = true;
};