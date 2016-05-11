function BattleController(battleData, fromController){
	var self = this;
	self.fromController = fromController;
	self.fromController.view.visible = false;
	self.battleData = battleData;
	base(self,OpenCharacterListController,[]);
}
BattleController.prototype.construct=function(){
	var self = this;
	self.downX = self.downY = 0;
	self.setValue("bout", 0);
	self.initOver = false;
	LMvc.keepLoading(true);
	LMvc.changeLoading(BattleLoading);
	var city = self.battleData.toCity;
	LMvc.loading.setTitle(String.format(Language.get("battle_title"), city.name()));
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
	self.load.config(["Soldiers","Character","GroupSkills","Terrain"],self.libraryLoad);
};
BattleController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["Num","LStarQuery","Battle/BattleQuery","Battle/BattleCharacterAI","Battle/BattleIntelligentAI","Battle/HertParams"],self.helperLoad);
};
BattleController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Talk","Hert","BattleHelper","MapHelper","CommonHelper","BattleCalculateHelper","SkillCalculateHelper"],self.modelLoad);
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
	"Battle/BattleExpChange","Battle/BattleField"],self.addMap);
};
BattleController.prototype.addMap=function(){
	var self = this;
	var mapPath = String.format("{0}.js", self.battleData.toCity.smap());
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
	var charaList = new CharacterListController(CharacterListType.BATTLE_SINGLE, self);
	self.view.parent.addChild(charaList.view);
};
BattleController.prototype.init = function(){
	var self = this;
	TerrainMasterModel.setMaster(TerrainConfig);
	SkillMasterModel.setMaster(SkillsData);
	SoldierMasterModel.setMaster(SoldierDatas);
	GroupSkillModel.setMaster(GroupSkillsData);
	self.queryInit();
	
	LMvc.keepLoading(false);
	self.fromController.view.parent.addChild(self.view);
	self.fromController.view.remove();
	LMvc.CityController = null;
	LMvc.BattleController = self;
	console.log("BattleController.prototype.init -- start --");
	if(!BattleController.timer){
		BattleController.timer = new LTimer(1000, 1);
	}
	BattleController.timer.removeAllEventListener();
	BattleController.timer.addEventListener(LTimerEvent.TIMER, self.showCharacterDetailed);

	console.log("self.battleData.toCity --"+self.battleData.toCity);
	var enemyTroops = self.battleData.toCity.troops();
	var generals = self.battleData.toCity.generals();
	for(var i=0,l=generals.length;i<l;i++){
		enemyTroops += generals[i].troops();
	}
	if(self.battleData.toCity.seigniorCharaId() == 0 || enemyTroops == 0 || 
		self.battleData.toCity.generalsSum() == 0){
		self.noBattle = true;
		self.dispatchEvent(LEvent.COMPLETE);
		return;
	}
	self.dispatchEvent(LEvent.COMPLETE);
	console.log("LMvc.areaData.battleData --",LMvc.areaData.battleData);
	if(LMvc.areaData.battleData){
		setBattleSaveData();
	}else{
		self.charactersInit();
	}
	LPlugin.playBGM("battle" + ((2 * Math.random() >>> 0) + 1), LPlugin.volumeBGM);
};
BattleController.prototype.charactersInit = function(){
	var self = this;
	var enemyCharas;
	var enemyPositions;
	var selfPositions;
	var selfAttack = (self.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId);
	if(selfAttack){
		enemyCharas = self.battleData.toCity.getDefenseEnemies();
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
			return Math.random() - 0.5;
		}
		return v;
	});
	console.log("enemyCharas",enemyCharas);
	self.battleData.expeditionEnemyCharacterList = enemyCharas;
	for(var i = 0;i<enemyCharas.length;i++){
		var child = enemyPositions[i];
		var charaId = enemyCharas[i].id();
		self.addEnemyCharacter(charaId,child.direction,child.x,child.y);
		var battleCharacter = self.view.charaLayer.getCharacter(Belong.ENEMY, charaId);
		if(child.index > 0 && selfAttack){
			battleCharacter.mission = BattleCharacterMission.Passive;
		}
	}
	self.model.enemyList[0].isLeader = true;
	if(selfAttack){
		self.model.enemyList[0].mission = BattleCharacterMission.Defensive;
	}
	self.defCharactersInit();
	for(var i=0,l=selfPositions.length;i<l;i++){
		var charaObjs = selfPositions[i];
		self.view.charaLayer.addCharacterPosition(charaObjs.direction,charaObjs.x,charaObjs.y);
	}
};
BattleController.prototype.defCharactersInit=function(){
	var self = this;
	var defCharas = self.model.map.defCharas.sort(function(a, b) {return a.index - b.index;});
	var charaIndexObj = {};
	var defense = self.battleData.toCity.cityDefense();
	var isSelfDef = self.battleData.toCity.seigniorCharaId() == LMvc.selectSeignorId;
	for(var i = 0;defense >= DefenseCharacterCost && i<defCharas.length;i++){
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
		chara.currentSoldiers().data.img =  "common/" + DefCharacterImage[key] + (isSelfDef ? "-1" : "-2");
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
		defense -= DefenseCharacterCost;
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
	console.log("mapMouseUp");
	if(LMvc.running || BattleSelectMenuController.instance().view.visible){
		console.log("LMvc.running = " + LMvc.running + ", visible = " + BattleSelectMenuController.instance().view.visible);
		return;
	}
	if(BattleController.ctrlChara && BattleController.ctrlChara.isMoving()){
		console.log("ctrlChara  isMoving");
		return;
	}
	var self = event.currentTarget.parent.controller;
	if(!self.draging){
		console.log("self.draging = " + self.draging);
		return;
	}
	self.draging = false;
	event.currentTarget.stopDrag();
	BattleController.timer.stop();
	if(Math.abs(self.downX - event.offsetX) > 12 || Math.abs(self.downY - event.offsetY) > 12){
		console.log("Math.abs");
		return;
	}
	if(self.getValue("currentBelong") && self.getValue("currentBelong") != Belong.SELF){
		console.log("currentBelong = " + self.getValue("currentBelong"));
		return;
	}
	if(!self.view.roadLayer.visible){
		var onChara = self.characterClick(event.selfX,event.selfY);
		if(onChara){
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
	if(LGlobal.height < self.model.map.height){
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
	self.view.roadLayer.clear();
	BattleController.ctrlChara.AI.singleCombat(chara);
};
BattleController.prototype.physicalAttack = function(event){
	var self = event.currentTarget.parent.controller;
	var chara = self.view.charaLayer.getCharacterFromCoordinate(event.selfX,event.selfY);
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
		Toast.makeText(String.format(Language.get("不可对{0}使用!"), Language.get(BattleController.ctrlChara.belong))).show();
		return;
	}else if(!self.view.mapLayer.canUseStrategyOnTerrain(BattleController.ctrlChara.currentSelectStrategy, chara.locationX(), chara.locationY())){
		Toast.makeText(String.format(Language.get("{0}无法在此地形下使用!"), BattleController.ctrlChara.currentSelectStrategy.name())).show();
		return;
	}
	self.view.roadLayer.clear();
	BattleController.ctrlChara.AI.magicAttack(chara);
};
BattleController.prototype.clickOnRoadLayer = function(event){
	var self = event.currentTarget.parent.controller;
	if(!self.getValue("currentBelong")){
		Toast.makeText("现在无法移动!").show();
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
	chara = BattleController.ctrlChara;
		
	var coordinate = chara.getTo();
	var fx = coordinate[0] , fy = coordinate[1];
	var returnList = self.query.queryPath(new LPoint(fx,fy),new LPoint(event.selfX/self.model.stepWidth >>> 0,event.selfY/self.model.stepHeight >>> 0));
	if(returnList.length > 0){
		self.view.roadLayer.clear();
		chara.setRoad(returnList);//move
	}
};
BattleController.prototype.notClickOnRoadLayer = function(event){
	console.log("BattleController.prototype.notClickOnRoadLayer ",BattleController.ctrlChara.mode);
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
			BattleController.ctrlChara.toStatic(true);
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
	var self = this;
	
	var path = self.query.makePath(chara);
	self.view.roadLayer.setMoveRoads(path, chara.belong);
	self.view.roadLayer.addRangeAttack(chara);
	chara.showStatusView();
	if(chara.mode == CharacterMode.END_ACTION){
		return;
	}
	chara.toStatic(false);
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
	if(self,BattleController.ctrlChara.belong == Belong.SELF){
		singleCombat = new SingleCombatController(self,BattleController.ctrlChara.data.id(),BattleController.ctrlChara.AI.attackTarget.data.id());
	}else{
		singleCombat = new SingleCombatController(self, BattleController.ctrlChara.AI.attackTarget.data.id(), BattleController.ctrlChara.data.id());
	}
	LMvc.stageLayer.addChild(singleCombat.view);
};