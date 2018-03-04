function BattleController(battleData, fromController){
	var self = this;
	self.fromController = fromController;
	self.fromController.view.visible = false;
	self.battleData = battleData;
	base(self,OpenCharacterListController,[]);
}
BattleController.prototype.construct=function(){
	var self = this;
	var historyId = self.battleData.historyId;
	if(!historyId && (LMvc.areaData && LMvc.areaData.battleData)){
		historyId = LMvc.areaData.battleData.historyId;
	}
	self.setValue("historyId", historyId);
	self.downX = self.downY = 0;
	self.setValue("bout", 0);
	LMvc.keepLoading(true);
	LMvc.changeLoading(BattleLoading);
	if(historyId){
		self.militaryOver = true;
		LMvc.loading.setTitle(Language.get("history_" + historyId));
	}else{
		var city = self.battleData.toCity;
		LMvc.loading.setTitle(String.format(Language.get("battle_title"), city.name()));
	}
	
	if(Toast.layer){
		Toast.layer.removeAllChild();
	}
	self.mvcLoad();
};
BattleController.prototype.mvcLoad=function(){
	var self = this;
	self.loadMvc(["BattleSelectMenu","SingleCombat"],self.configLoad);
};
BattleController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Soldiers","Character","GroupSkills","Terrain","HistoryList"],self.libraryLoad);
};
BattleController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["Num","LStarQuery","Battle/BattleQuery","Battle/BattleCharacterAI","Battle/BattleIntelligentAI","Battle/HertParams"],self.helperLoad);
};
BattleController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Talk","Hert","JobAIHelper","BattleHelper","MapHelper","CommonHelper","BattleCalculateHelper","SkillCalculateHelper"],self.modelLoad);
};
BattleController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/SoldierMaster","Master/Soldier","Master/TerrainMaster","Master/GroupSkill","Master/SkillMaster"],self.viewLoad);
};
BattleController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Battle/Background","Battle/BattleMiniPreview","Battle/BattleMap","Common/Character","Common/SpecialEffect","Common/StatusBar",
	"Battle/BattleCharacterLayer","Battle/BattleCharacter","Battle/BattleRoad","Battle/BattleCharacterStatus",
	"Strategy/Strategy","Strategy/StrategyChild","Battle/EffectStrategy","Battle/BattleMainMenu","Battle/BattleBout",
	"Battle/CharacterStatusIcon","Battle/BattleWeather","Battle/BattleTerrain","Battle/BattleResult","Battle/BattleResultConfirm",
	"Battle/BattleExpChange","Battle/BattleField","Battle/MilitaryAdviser"],self.addMap);
};
BattleController.prototype.addMap=function(){
	var self = this, mapPath, historyId = self.battleData.historyId;
	if(LMvc.areaData && LMvc.areaData.battleData){
		historyId = LMvc.areaData.battleData.historyId;
	}
	if(historyId){
		mapPath = String.format("history/{0}.js", historyId);
	}else{
		mapPath = String.format("{0}.js", self.battleData.toCity.smap());
	}
	self.model.loadMapFile(mapPath,self.globalFilesLoad);
};
BattleController.prototype.globalFilesLoad = function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.createMapData);
};
BattleController.prototype.createMapData = function(){
	var self = this;
	self.model.createMap(self.init);
};
BattleController.prototype.showCharacterDetailed = function(){
	var self = LMvc.BattleController;
	if(self == null){
		return;
	}
	if(Math.abs(self.downX - mouseX) > 12 || Math.abs(self.downY - mouseY) > 12){
		return;
	}
	var chara = self.view.charaLayer.getCharacterFromCoordinate(self.selfX, self.selfY);
	if(!chara || chara.hideByCloud){
		return;
	}
	self.view.baseLayer.stopDrag();
	self.draging = false;
	self.currentCharacter = chara;
	self.loadMvc(["CharacterList"],self.showCharacterDetailedView);
};
BattleController.prototype.showCharacterDetailedView=function(){
	var self = this;
	
	var selfCharas = self.view.charaLayer.getCharactersFromBelong(Belong.SELF);
	var enemyCharas = self.view.charaLayer.getCharactersFromBelong(Belong.ENEMY);
	//self.controller.loadCharacterList(CharacterListType.BATTLE_CHARACTER_LIST,selfCharas.concat(enemyCharas), {showOnly:true});
	
	var charaList = new CharacterListController(CharacterListType.BATTLE_SINGLE, self,selfCharas.concat(enemyCharas), {showDetailed:true,showOnly:true});
	self.view.parent.addChild(charaList.view);
};
BattleController.prototype.init = function(){
	var self = this;
	TerrainMasterModel.setMaster(TerrainConfig);
	SkillMasterModel.setMaster(SkillsData);
	SoldierMasterModel.setMaster(SoldierDatas);
	GroupSkillModel.setMaster(GroupSkillsData);
	self.queryInit();
	BattleMapConfig.SPEED = (LPlugin.gameSetting.speed == 1 ? BattleMapConfig.SPEED_NORMAL : BattleMapConfig.SPEED_FAST);
	LMvc.keepLoading(false);
	self.fromController.view.parent.addChild(self.view);
	self.fromController.view.visible = false;
	LMvc.BattleController = self;
	if(!BattleController.timer){
		BattleController.timer = new LTimer(1000, 1);
	}
	BattleController.timer.removeAllEventListener();
	BattleController.timer.addEventListener(LTimerEvent.TIMER, self.showCharacterDetailed);

	var enemyTroops = self.battleData.toCity.troops();
	if(LMvc.areaData && LMvc.areaData.battleData){
		var charaIds = LMvc.areaData.battleData.expeditionEnemyCharacterList;
		for(var i=0,l=charaIds.length;i<l;i++){
			var chara = CharacterModel.getChara(charaIds[i]);
			enemyTroops += chara.troops();
		}
	}else{
		var generals = self.battleData.toCity.generals();
		for(var i=0,l=generals.length;i<l;i++){
			enemyTroops += generals[i].troops();
		}
	}
	var selfAttack = (self.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId);
	if(selfAttack){
		self.battleData.fromCity.expeditionCount(1);
	}
	if(self.battleData.toCity.seigniorCharaId() == 0 || enemyTroops == 0 || 
		self.battleData.toCity.generalsSum() == 0){
		self.noBattle = true;
		if(!selfAttack){
			self.battleData.expeditionEnemyCharacterList = self.battleData.expeditionEnemyData.expeditionCharacterList;
		}
		self.dispatchEvent(LEvent.COMPLETE);
		return;
	}
	self.militaryOver = false;
	self.dispatchEvent(LEvent.COMPLETE);
	if(LMvc.areaData && LMvc.areaData.battleData){
		setBattleSaveData();
		LMvc.areaData = null;
	}else{
		Math.fakeReset();
		self.charactersInit();
	}
	self.setValue("currentBelong", Belong.SELF);
	LPlugin.playBGM("battle" + ((2 * Math.random() >>> 0) + 1), LPlugin.gameSetting.BGM);
};
BattleController.prototype.charactersInit = function(){
	var self = this;
	var enemyCharas;
	var enemyPositions;
	var selfPositions;
	var selfAttack = (self.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId);
	if(selfAttack){
		var generals = self.battleData.toCity.generals();
		for(var i=0,l=generals.length;i<l;i++){
			var chara = generals[i];
			if(chara.troops() > 0){
				self.battleData.toCity.troops(self.battleData.toCity.troops() + chara.troops());
				chara.troops(0);
			}
		}
		if(self.battleData.historyId){
			enemyCharas = self.battleData.toCity.generals();
		}else{
			enemyCharas = self.battleData.toCity.getDefenseEnemies();
		}
		enemyPositions = self.model.map.charas;
		selfPositions = self.model.map.enemys;
		var sumTroops = self.battleData.toCity.troops();
		for(var i = 0;i<enemyCharas.length;i++){
			var charaId = enemyCharas[i].id();
			var chara = CharacterModel.getChara(charaId);
			var maxTroop = chara.maxTroops();
			if(maxTroop > sumTroops){
				maxTroop = sumTroops;
			}
			chara.troops(maxTroop);
			sumTroops -= maxTroop;
			self.battleData.toCity.troops(sumTroops);
			if(sumTroops > 0 || i == enemyCharas.length - 1){
				continue;
			}
			enemyCharas = enemyCharas.splice(0, i + 1);
			break;
		}
		if(!self.battleData.historyId && !LMvc.TutorialController && enemyCharas.length < BattleMapConfig.DefenseQuantity){
			var neighbor = self.battleData.toCity.neighbor();
			neighbor = neighbor.sort(function(){
				return Math.fakeRandom()>0.5?1:-1;
			});
			for(var i=0;i<neighbor.length;i++){
				var city = AreaModel.getArea(neighbor[i]);
				if(city.seigniorCharaId() != self.battleData.toCity.seigniorCharaId() || city.id() == self.battleData.toCity.id()){
					continue;
				}
				generals = getBattleReinforcement(city, enemyCharas.length, BattleMapConfig.DefenseQuantity);
				enemyCharas = enemyCharas.concat(generals);
			}
		}
		
		var employCharacters;
		while(!self.battleData.historyId && !LMvc.TutorialController && enemyCharas.length < BattleMapConfig.DefenseQuantity){
			if(!employCharacters){
				employCharacters = self.battleData.toCity.getEmployCharacters();
			}
			if(employCharacters.length <= 0){
				break;
			}
			var chara = employCharacters.shift();
			var multiplier = 1;
			if(LMvc.chapterData.trouble == TroubleConfig.HARD){
				multiplier = 0;
			}else if(LMvc.chapterData.trouble == TroubleConfig.NORMAL){
				multiplier = 0.5;
			}
			var price = chara.employPrice() * multiplier >>> 0;
			if(self.battleData.toCity.money() < price){
				break;
			}
			if(self.battleData.toCity.troops() < chara.maxTroops()){
				break;
			}
			chara.troops(chara.maxTroops());
			self.battleData.toCity.troops(self.battleData.toCity.troops() - chara.maxTroops());
			self.battleData.toCity.money(-price);
			enemyCharas.push(chara);
		}
		if(!self.battleData.historyId && !LMvc.TutorialController && selfAttack && LMvc.chapterData.trouble == TroubleConfig.HARD){
			for(var i=HardEmployCharacter[0];i<HardEmployCharacter[0] + 2;i++){
				var soldierId = SpecializedSoldiers[SpecializedSoldiers.length * Math.fakeRandom() >>> 0];
				var chara = CharacterModel.createEmployCharacter(i, soldierId, self.battleData.toCity.id());
				chara.troops(chara.maxTroops());
				enemyCharas.push(chara);
			}
		}
	}else{
		enemyCharas = self.battleData.expeditionEnemyData.expeditionCharacterList;
		self.battleData.food = self.battleData.expeditionEnemyData.food;
		self.battleData.money = self.battleData.expeditionEnemyData.money;
		self.battleData.troops = self.battleData.expeditionEnemyData.troops;
		enemyPositions = self.model.map.enemys;
		selfPositions = self.model.map.charas;
	}
	enemyPositions = enemyPositions.sort(function(a,b){
		var v = b.index - a.index;
		if(v == 0){
			return Math.fakeRandom() - 0.5;
		}
		return v;
	});
	self.battleData.expeditionEnemyCharacterList = enemyCharas;
	var seignior = SeigniorModel.getSeignior(LMvc.selectSeignorId);
	var seigniorLevel = seignior.level();
	
	var coreCount = Math.max(enemyCharas.length / 3 >>> 0, 1);
	for(var i = 0;i<enemyCharas.length;i++){
		var child = enemyPositions[i];
		var chara = enemyCharas[i];
		var charaId = chara.id();
		setEquipmentsStoneItem(chara, seigniorLevel, i < coreCount);
		if(LMvc.chapterData.trouble == TroubleConfig.HARD || LMvc.chapterData.trouble == TroubleConfig.NORMAL){
			if(LMvc.chapterData.trouble == TroubleConfig.HARD && i < coreCount){
				var currentSoldiers = chara.currentSoldiers();
				var specialSoldierId = getBattleSoldierSelectId(currentSoldiers, chara);
				var img = currentSoldiers.img();
				if(img && [5,29,6,30].indexOf(currentSoldiers.id()) >= 0){
					var soldierData = chara.data.soldiers.find(function(c){return c.id == 4;});
					img = (soldierData && soldierData.img) ? soldierData.img : null;
				}
				chara.battleSoldierSelect(specialSoldierId, currentSoldiers.proficiency(), img);
			}else{
				var currentSoldiers = chara.currentSoldiers();
				 if(currentSoldiers.next()){
					chara.battleSoldierSelect(currentSoldiers.next(), currentSoldiers.proficiency(), currentSoldiers.img());
				}
			}
		}
		self.addEnemyCharacter(charaId,child.direction,child.x,child.y);
		chara.HP(chara.maxHP());
		chara.MP(chara.maxMP());
		var battleCharacter = self.view.charaLayer.getCharacter(Belong.ENEMY, charaId);
		if(child.index > 0 && selfAttack){
			battleCharacter.mission = BattleCharacterMission.Passive;
		}
	}
	self.model.enemyList[0].isLeader = true;
	if(selfAttack){
		self.model.enemyList[0].mission = BattleCharacterMission.Defensive;
	}
	if(self.battleData.historyId){
		var charas = self.battleData.expeditionCharacterList;
		for(var i=0,l=charas.length;i<l;i++){
			var child = selfPositions[i];
			//self.view.charaLayer.addCharacterPosition(charaObjs.direction,charaObjs.x,charaObjs.y,i);
			var chara = charas[i];
			self.addOurCharacter(chara.id(),child.direction,child.x,child.y);
			chara.troops(chara.maxTroops());
			chara.HP(chara.maxHP());
			chara.MP(chara.maxMP());
		}
	}else{
		self.defCharactersInit();
		for(var i=0,l=selfPositions.length;i<l;i++){
			var charaObjs = selfPositions[i];
			self.view.charaLayer.addCharacterPosition(charaObjs.direction,charaObjs.x,charaObjs.y,i);
		}
	}
};
BattleController.prototype.defCharactersInit=function(){
	var self = this;
	var defCharas = self.model.map.defCharas.sort(function(a, b) {return a.index - b.index;});
	var charaIndexObj = {};
	var defense = self.battleData.toCity.cityDefense();
	var isSelfDef = self.battleData.toCity.seigniorCharaId() == LMvc.selectSeignorId;
	var defCostValue = DefenseCharacterCost;
	for(var i = 0;defense >= defCostValue && i<defCharas.length;i++){
		var child = defCharas[i];
		var soldierId = child.id;
		var key = "soldier_" + soldierId;
		if(typeof charaIndexObj[key] == UNDEFINED){
			charaIndexObj[key] = 0;
		}
		var ids = DefCharacterList[key];
		var charaId = ids[charaIndexObj[key]];
		charaIndexObj[key] += 1;
		var chara = CharacterModel.getChara(charaId);
		chara.isDefCharacter(1);
		chara.data.skill = 0;
		if(!isSelfDef || self.battleData.toCity.level() >= 4){
			if(LMvc.chapterData.trouble == TroubleConfig.HARD || LMvc.chapterData.trouble == TroubleConfig.NORMAL){
				var currentSoldiers = chara.currentSoldiers();
				chara.battleSoldierSelect(currentSoldiers.next(), currentSoldiers.proficiency());
			}
			if(!isSelfDef || self.battleData.toCity.level() >= 5){
				if(LMvc.chapterData.trouble == TroubleConfig.HARD){
					chara.data.skill = 98;
				}
			}
		}
		chara.currentSoldiers().data.img =  DefCharacterImage[key] + (isSelfDef ? "-1" : "-2");
		chara.seigniorId(self.battleData.toCity.seigniorCharaId());
		chara.cityId(self.battleData.toCity.id());
		chara.calculation(true);
		chara.troops(chara.maxTroops());
		if(!isSelfDef){
			self.addEnemyCharacter(charaId,child.direction,child.x,child.y);
		}else{
			self.addOurCharacter(charaId,child.direction,child.x,child.y);
		}
		var battleCharacter = self.view.charaLayer.getCharacter(null, charaId);
		battleCharacter.mission = BattleCharacterMission.Defensive;
		defense -= defCostValue;
	}
};
BattleController.prototype.boutEnd=function(){
	var self = this;
	var e = new LEvent(BattleBoutEvent.END);
	e.belong = self.getValue("currentBelong");
	self.dispatchEvent(e);
	
	if(e.belong == Belong.SELF){
		var childList = self.view.charaLayer.getCharactersFromBelong(Belong.FRIEND);
		self.boutNotify(childList.length > 0 ? Belong.FRIEND : Belong.ENEMY);
	}else if(e.belong == Belong.FRIEND){
		self.boutNotify(Belong.ENEMY);
	}else{
		self.boutNotify(Belong.SELF);
	}
};
BattleController.prototype.boutNotify=function(belong){
	var self = this;
	var e = new LEvent(BattleBoutEvent.SHOW);
	e.belong = belong;
	self.dispatchEvent(e);
};
BattleController.prototype.addOurCharacter=function(index,direction,x,y){
	var self = this;
	self.view.charaLayer.addOurCharacter(index,CharacterAction.MOVE,direction,x,y);
};
BattleController.prototype.addEnemyCharacter=function(index,direction,x,y){
	var self = this;
	self.view.charaLayer.addEnemyCharacter(index,CharacterAction.MOVE,direction,x,y);
};
BattleController.prototype.addFriendCharacter=function(index,direction,x,y){
	var self = this;
	self.view.charaLayer.addFriendCharacter(index,CharacterAction.MOVE,direction,x,y);
};
BattleController.prototype.queryInit=function(){
	var self = this;
	var map = self.model.map.data;
	self.query = new BattleQuery(self.model.map.data);
};
BattleController.prototype.mapMouseUp = function(event){
	if(LMvc.running || BattleSelectMenuController.instance().view.visible){
		return;
	}
	if(BattleController.ctrlChara && BattleController.ctrlChara.isMoving()){
		return;
	}
	var self = event.currentTarget.parent.controller;
	if(!self.draging){
		return;
	}
	self.draging = false;
	event.currentTarget.stopDrag();
	BattleController.timer.stop();
	if(Math.abs(self.downX - event.offsetX) > 12 || Math.abs(self.downY - event.offsetY) > 12){
		return;
	}
	if(self.getValue("currentBelong") && self.getValue("currentBelong") != Belong.SELF){
		return;
	}
	if(!self.view.roadLayer.visible){
		var onChara = self.characterClick(event.selfX,event.selfY);
		if(onChara){
			self.view.mainMenu.visible = false;
			return;
		}
		self.view.mapLayer.showTerrain(event.selfX,event.selfY);
	}else if(!self.view.roadLayer.hitTestPoint(event.offsetX,event.offsetY)){
		self.notClickOnRoadLayer(event);
	}else if(BattleController.ctrlChara.mode == CharacterMode.WAIT_ATTACK){
		self.physicalAttack(event);
	}else if(BattleController.ctrlChara.mode == CharacterMode.WAIT_SINGLE_COMBAT){
		self.singleCombat(event);
	}else{
		self.clickOnRoadLayer(event);
	}
};
BattleController.prototype.mapMouseDown = function(event){
	if(LMvc.running || BattleSelectMenuController.instance().view.visible){
		return;
	}
	var self = event.currentTarget.parent.controller;
	if(self.getValue("currentBelong") && self.getValue("currentBelong") != Belong.SELF){
		return;
	}
	self.downX = event.offsetX;
	self.downY = event.offsetY;
	self.selfX = event.selfX;
	self.selfY = event.selfY;
	if(LMvc.screenHeight < self.model.map.height || LMvc.screenWidth < self.model.map.width){
		event.currentTarget.startDrag(event.touchPointID);
	}
	self.draging = true;
	BattleController.timer.reset();
	BattleController.timer.start();
};
BattleController.prototype.singleCombat = function(event){
	var self = event.currentTarget.parent.controller;
	var chara = self.view.charaLayer.getCharacterFromCoordinate(event.selfX,event.selfY);
	if(!chara || chara.hideByCloud || chara.belong != Belong.ENEMY){
		return;
	}
	if(chara.data.isDefCharacter()){
		Toast.makeText(Language.get("def_single_combat_error")).show();
		return;
	}
	self.view.roadLayer.clear();
	BattleController.ctrlChara.AI.singleCombat(chara);
};
BattleController.prototype.physicalAttack = function(event){
	var self = event.currentTarget.parent.controller;
	var chara = self.physicalAttackCharacter(event.selfX,event.selfY);
};
BattleController.prototype.physicalAttackCharacter = function(x, y){
	var self = this;
	var chara = self.view.charaLayer.getCharacterFromCoordinate(x, y);
	if(!chara || chara.hideByCloud || chara.belong != Belong.ENEMY){
		return;
	}
	self.view.roadLayer.clear();
	BattleController.ctrlChara.AI.physicalAttack(chara);
};
BattleController.prototype.clickStrategyRange = function(chara){
	var self = this;
	if(!chara || chara.hideByCloud){
		return;
	}
	if(!isSameBelong(BattleController.ctrlChara.currentSelectStrategy.belong(),chara.belong)){
		Toast.makeText(String.format(Language.get("use_strategy_belong_error"), Language.get(BattleController.ctrlChara.belong))).show();
		return;
	}else if(!self.view.mapLayer.canUseStrategyOnTerrain(BattleController.ctrlChara.currentSelectStrategy, chara.locationX(), chara.locationY())){
		Toast.makeText(String.format(Language.get("use_strategy_terrain_error"), BattleController.ctrlChara.currentSelectStrategy.name())).show();
		return;
	}
	self.view.roadLayer.clear();
	BattleController.ctrlChara.AI.magicAttack(chara);
};
BattleController.prototype.clickOnRoadLayer = function(event){
	var self = event.currentTarget.parent.controller;
	if(!self.getValue("currentBelong")){
		Toast.makeText(Language.get("can_not_move")).show();
		return;
	}else if(BattleController.ctrlChara.belong != Belong.SELF){
		Toast.makeText(String.format(Language.get("can_not_operating"), Language.get(BattleController.ctrlChara.belong))).show();
		return;
	}else if(BattleController.ctrlChara.status.hasStatus(StrategyType.Chaos)){
		Toast.makeText(Language.get("ctrl_Chaos_error")).show();
		return;
	}else if(BattleController.ctrlChara.mode == CharacterMode.END_ACTION){
		Toast.makeText(Language.get("action_end_error")).show();	
		return;
	}
	var chara = self.view.charaLayer.getCharacterFromCoordinate(event.selfX,event.selfY);
	if(BattleController.ctrlChara.mode == CharacterMode.STRATEGY_SELECT){
		self.clickStrategyRange(chara);
		return;
	}
	
	if(chara){
		if(chara.data.id() == BattleController.ctrlChara.data.id()){
			self.view.roadLayer.clear();
			BattleController.ctrlChara.dispatchEvent(CharacterActionEvent.MOVE_COMPLETE);
		}
		return;
	}
	self.charaToMove(event.selfX/self.model.stepWidth >>> 0,event.selfY/self.model.stepHeight >>> 0);
	/*chara = BattleController.ctrlChara;
		
	var coordinate = chara.getTo();
	var fx = coordinate[0] , fy = coordinate[1];
	var returnList = self.query.queryPath(new LPoint(fx,fy),new LPoint(event.selfX/self.model.stepWidth >>> 0,event.selfY/self.model.stepHeight >>> 0));
	if(returnList.length > 0){
		self.view.roadLayer.clear();
		chara.setRoad(returnList);//move
	}*/
};
BattleController.prototype.charaToMove = function(lx,ly){
	var self = this;
	var chara = BattleController.ctrlChara;
	var coordinate = chara.getTo();
	var fx = coordinate[0] , fy = coordinate[1];
	var returnList = self.query.queryPath(new LPoint(fx,fy),new LPoint(lx,ly));
	if(returnList.length > 0){
		self.view.roadLayer.clear();
		chara.setRoad(returnList);//move
	}
};
BattleController.prototype.notClickOnRoadLayer = function(event){
	var self = event.currentTarget.parent.controller;
	self.view.roadLayer.clear();
	switch(BattleController.ctrlChara.mode){
		case CharacterMode.WAIT_ATTACK:
		case CharacterMode.WAIT_SINGLE_COMBAT:
			BattleController.ctrlChara.dispatchEvent(CharacterActionEvent.MOVE_COMPLETE);
			break;
		case CharacterMode.STRATEGY_SELECT:
			BattleSelectMenuController.instance().magicSelect();
			break;
		case CharacterMode.SHOW_MOVE_ROAD:
		default:
			BattleController.ctrlChara.removeAllEventListener();
			self.view.mainMenu.visible = true;
	}
};
BattleController.prototype.characterClick = function(cx,cy){
	var self = this;
	var chara = self.view.charaLayer.getCharacterFromCoordinate(cx,cy);
	if(!chara){
		return false;
	}
	BattleController.ctrlChara = chara;
	if(chara.hideByCloud){
		return false;
	}
	self.view.resetMapPosition(chara);
	switch(chara.belong){
		case Belong.SELF:
			BattleController.ctrlChara.AI.setEvent();
			self.clickSelfCharacter(chara);
			break;
		case Belong.FRIEND:
			self.clickOtherCharacter(chara);
			break;
		case Belong.ENEMY:
			self.clickOtherCharacter(chara);
			break;
	}
	return true;
};
BattleController.prototype.clickSelfCharacter = function(chara){
	var self = this, path;
	if(chara.status.hasStatus(StrategyType.Fixed)){
		path = [new LPoint(chara.locationX(), chara.locationY())];
	}else{
		path = self.query.makePath(chara);
	}
	self.view.roadLayer.setMoveRoads(path, chara.belong);
	self.view.roadLayer.addRangeAttack(chara);
	chara.showStatusView();
	if(chara.mode == CharacterMode.END_ACTION){
		return;
	}
	chara.mode = CharacterMode.SHOW_MOVE_ROAD;
	BattleController.ctrlChara.saveShowMoveRoadObject();
};
BattleController.prototype.clickOtherCharacter = function(chara){
	var self = this;
	var path = self.query.makePath(chara);
	self.view.roadLayer.setMoveRoads(path, chara.belong);
	self.view.roadLayer.addRangeAttack(chara);
	chara.mode = CharacterMode.SHOW_MOVE_ROAD;
	chara.showStatusView();
};

BattleController.prototype.loadSingleCombat = function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	self.loadMvc("SingleCombat",self.loadSingleCombatComplete);
};
BattleController.prototype.loadSingleCombatComplete=function(){
	var self = this;
	var singleCombat;
	if(BattleController.ctrlChara.belong == Belong.SELF){
		singleCombat = new SingleCombatController(self,BattleController.ctrlChara.data.id(),BattleController.ctrlChara.AI.attackTarget.data.id());
	}else{
		singleCombat = new SingleCombatController(self, BattleController.ctrlChara.AI.attackTarget.data.id(), BattleController.ctrlChara.data.id());
	}
	LMvc.stageLayer.addChild(singleCombat.view);
};
