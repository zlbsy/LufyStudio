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
	charasAll = charasAll.sort(function(a, b){return b.data.force - a.data.force;});
	for(var i=0, l=charasAll.length; i<l; i++){
		var chara = charasAll[i];
		if(chara.data.force < 80 && i > 1){
			continue;
		}
		charas.push(chara);
	}
	//charas = charas.sort(function(a, b){return b.data.force - a.data.force;});
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
	self.controller.loadCharacterList(CharacterListType.TOURNAMENTS_SELECT, charas, {isOnlyOne:true, cutoverName:"ability_properties", showAbility:true, buttonLabel:"execute", noCutover:true, noDetailed:true, toast:"tournaments_select_toast",closeDisable:true});
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
	console.error(self.characters);
	self.characters.forEach(function(child){
		if(child.id() == selectCharacterId || enemyList.length >= maxLength - 1){
			return;
		}
		enemyList.push({id:child.id(), r:0});
	});
	var charas = [622,626,632,638,642,644,652,658,662,668];
	charas = charas.sort(function(a, b){return Math.fakeRandom() > 0.5 ? 1 : -1;});
	while(enemyList.length < maxLength - 1){
		enemyList.push({id:charas.shift(), r:0});
	}
	enemyList = enemyList.sort(function(a,b){return Math.fakeRandom() > 0.5 ? 1 : -1;});
	enemyList.unshift({id:selectCharacterId, r:0});
	if(isInNewYearTrem()){
		enemyList.pop();
		enemyList.push({id:NewYearPresentConfig.boss, r:0});
	}
	/*enemyList[0].r=1;
	enemyList[3].r=1;
	enemyList[5].r=1;
	enemyList[6].r=1;
	enemyList.push({id:enemyList[0].id, r:1});
	enemyList.push({id:enemyList[3].id, r:0});
	enemyList.push({id:enemyList[5].id, r:0});
	enemyList.push({id:enemyList[6].id, r:1});
	enemyList.push({id:enemyList[0].id, r:0});
	enemyList.push({id:enemyList[6].id, r:0});*/
	self.controller.setValue("characters",enemyList);
	//self.singleCombatStart();
	self.confirmShow();
	self.contentLayer.visible = false;
	return true;
};
TournamentsView.prototype.singleCombatStart=function(){
	var self = this;
	var charas = self.controller.getValue("characters");
	var selectCharacterId = self.controller.getValue("selectCharacterId");
	if(charas.length == 8){
		self.currentEnemyId = charas[1].id;
	}else if(charas.length == 12){
		self.currentEnemyId = charas[9].id;
	}else{
		self.currentEnemyId = charas[13].id;
	}
	var selectCharacter = CharacterModel.getChara(selectCharacterId);
	selectCharacter.maxHP(100);
	selectCharacter.HP(100);
	var currentEnemy = CharacterModel.getChara(self.currentEnemyId);
	currentEnemy.maxHP(100);
	currentEnemy.HP(100);
	self.confirmDialog.visible = false;
	var combat = new SingleCombatController(self.controller,selectCharacterId,self.currentEnemyId);
	self.parent.addChild(combat.view);
};
TournamentsView.prototype.win=function(){
	var self = this;
	var characters = self.controller.getValue("characters");
	var from, to;
	var selectCharacterId = self.controller.getValue("selectCharacterId");
	if(characters.length == 8){
		characters[0].r=1;
		characters.push({id:characters[0].id, r:0});
		from = 2;
		to = 8;
	}else if(characters.length == 12){
		characters[8].r=1;
		characters.push({id:characters[8].id, r:0});
		from = 10;
		to = 12;
	}else{
		LMvc.SingleCombatController.over();
		self.controller.closeSelf();
		//talk
		var script = String.format("SGJTalk.show({0},{1},{2});", selectCharacterId, 1, Language.get("tournaments_result_talk_1"));
		script += "SGJEvent.tournamentsGet(1);";
		LGlobal.script.addScript(script);
		return;
	}
	for(var i=from;i<to;i+=2){
		var isWin = self.autoCheck(characters[i].id, characters[i+1].id);
		if(isWin){
			characters[i].r = 1;
			characters.push({id:characters[i].id, r:0});
		}else{
			characters[i+1].r = 1;
			characters.push({id:characters[i+1].id, r:0});
		}
	}
	LMvc.SingleCombatController.over();
	self.confirmShow();
};
TournamentsView.prototype.fail=function(){
	var self = this;
	var selectCharacterId = self.controller.getValue("selectCharacterId");
	var characters = self.controller.getValue("characters");
	var scriptTalk, result = 0;
	if(characters.length == 8){
		//安慰奖
	}else if(characters.length == 12){
		//4强奖品
		result = 4;
	}else{
		//亚军奖品
		result = 2;
	}
	scriptTalk = Language.get("tournaments_result_talk_" + result);
	LMvc.SingleCombatController.over();
	self.controller.closeSelf();
	//talk
	var script = String.format("SGJTalk.show({0},{1},{2});", selectCharacterId, 1, scriptTalk);
	script += "SGJEvent.tournamentsGet("+result+");";
	LGlobal.script.addScript(script);
};
TournamentsView.prototype.autoCheck=function(id1,id2){
	if(id1 == NewYearPresent_Boss){
		return true;
	}else if(id2 == NewYearPresent_Boss){
		return false;
	}
	var chara1 = CharacterModel.getChara(id1);
	var chara2 = CharacterModel.getChara(id2);
	var force1 = chara1.force() + 10 - 20 * Math.fakeRandom();
	var force2 = chara2.force() + 10 - 20 * Math.fakeRandom();
	return force1 > force2;
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