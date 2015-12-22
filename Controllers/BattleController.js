function BattleController(battleData, fromController){
	var self = this;
	base(self,OpenCharacterListController,[]);
	self.fromController = fromController;
	self.fromController.view.visible = false;
	//TODO::
	self.loadLayer = new LSprite();
	self.loadLayer.addChild(getBlackBitmap());
	var label = getStrokeLabel("XXXXX",20,"#FFFFFF","#000000",4);
	label.x = (LGlobal.width - label.getWidth())*0.5;
	label.y = LGlobal.height*0.3;
	self.loadLayer.addChild(label);
	self.fromController.view.parent.addChild(self.loadLayer);
	self.battleData = battleData;
	self.setValue("bout", 0);
}
BattleController.prototype.construct=function(){
	var self = this;
	self.downX = self.downY = 0;
	self.initOver = false;
	LMvc.keepLoading(true);
	LMvc.changeLoading(BattleLoading);
	if(Toast.layer){
		Toast.layer.removeAllChild();
	}
	self.mvcLoad();
};
BattleController.prototype.mvcLoad=function(){
	var self = this;
	self.loadMvc(["BattleSelectMenu","SingleCombat"],self.configLoad);
	//self.configLoad();
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
	"Battle/CharacterStatusIcon","Battle/BattleWeather","Battle/BattleTerrain","Battle/BattleResult","Battle/BattleField"],self.addMap);
};
BattleController.prototype.addMap=function(){
	var self = this;
	var mapPath = "s01.smap";
	self.model.loadMapFile(mapPath,self.globalFilesLoad);
};
BattleController.prototype.globalFilesLoad = function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.createMapData);
};
BattleController.prototype.createMapData = function(){
	var self = this;
	console.log("BattleController.prototype.createMapData");
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
	if(!chara){
		return;
	}
	self.view.baseLayer.stopDrag();
	self.draging = false;
	self.currentCharacter = chara;
	self.loadMvc(["CharacterList"],self.showCharacterDetailedView);
};
BattleController.prototype.showCharacterDetailedView=function(){
	var self = this;
	//var chara = self.currentCharacter;
	//self.currentCharacter = null;
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
	self.loadLayer.remove();
	self.loadLayer = null;
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
	if(self.battleData.toCity.seigniorCharaId() == 0 || self.battleData.toCity.troops() == 0 || 
		self.battleData.toCity.generalsSum() == 0){
		self.noBattle = true;
		self.dispatchEvent(LEvent.COMPLETE);
		return;
	}
	self.dispatchEvent(LEvent.COMPLETE);
	if(LMvc.areaData.battleData){
		/*
		 LMvc.areaData.battleData= 
		 {"food":12000,"money":2224,"troops":600,"toCityId":22,"fromCityId":24,
		 "expeditionEnemyCharacterList":[526,479,165,159],
		 "ourList":[
		 {"id":39,"status":{"status":[],"aidStatus":[]},"direction":"up","action":"stand","mode":"endAction","x":240,"y":624},
		 {"id":99,"status":{"status":[],"aidStatus":[]},"direction":"up","action":"move","mode":"none","x":192,"y":624}],
		 "enemyList":[
		 {"id":526,"status":{"status":[],"aidStatus":[]},"direction":"down","action":"move","x":0,"y":0},
		 {"id":479,"status":{"status":[],"aidStatus":[]},"direction":"down","action":"move","x":0,"y":48},
		 {"id":165,"status":{"status":[],"aidStatus":[]},"direction":"down","action":"move","x":48,"y":48},
		 {"id":159,"status":{"status":[],"aidStatus":[]},"direction":"down","action":"move","x":48,"y":0}
		 ],
		 "selfCaptive":[],
		 "enemyCaptive":[],
		 "selfMinusStrategyCharas":[],
		 "enemyMinusStrategyCharas":[]}*/
		return;
	}
	var enemyCharas;
	var enemyPositions;
	var selfPositions;
	console.log(self.battleData.fromCity.seigniorCharaId() +"=="+LMvc.selectSeignorId);
	if(self.battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId){
		enemyCharas = getDefenseEnemiesFromCity(self.battleData.toCity);
		//enemyCharas[0].isLeader = true;
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
			//TODO::
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
		var charaObjs = enemyPositions[i];
		var charaId = enemyCharas[i].id();
		CharacterModel.getChara(charaId).calculation(true);
		self.addEnemyCharacter(charaId,charaObjs.direction,charaObjs.x,charaObjs.y);
	}
	self.model.enemyList[0].isLeader = true;
	for(var i=0,l=selfPositions.length;i<l;i++){
		var charaObjs = selfPositions[i];
		self.view.charaLayer.addCharacterPosition(charaObjs.direction,charaObjs.x,charaObjs.y);
	}
	
	//self.dispatchEvent(LController.NOTIFY);
	
	
	/*for(var i = 0;i<self.battleData.expeditionCharacterList.length;i++){
		var chara = self.battleData.expeditionCharacterList[i];
		chara.calculation(true);
		self.addOurCharacter(chara.id());
	}*/
	/*
	for(var i = 1;i<16;i++){
		//CharacterModel.getChara(i).data.troops = CharacterModel.getChara(i).maxTroops() - 50;
		//CharacterModel.getChara(i).maxHP(100);
		//CharacterModel.getChara(i).HP(100);
		CharacterModel.getChara(i).calculation(true);
		CharacterModel.getChara(i).troops(CharacterModel.getChara(i).troops() - 40);
	}
	CharacterModel.getChara(2).troops(80);
	CharacterModel.getChara(2).wounded(70);
	CharacterModel.getChara(4).troops(10);
	
	self.addOurCharacter(1,CharacterAction.MOVE,CharacterDirection.DOWN,5,5);
	self.addOurCharacter(2,CharacterAction.MOVE,CharacterDirection.UP,4,4);
	self.addOurCharacter(3,CharacterAction.MOVE,CharacterDirection.LEFT,3,3);
	self.addEnemyCharacter(4,CharacterAction.MOVE,CharacterDirection.LEFT,3,4);
	self.addEnemyCharacter(5,CharacterAction.MOVE,CharacterDirection.LEFT,4,6);
	self.addFriendCharacter(6,CharacterAction.MOVE,CharacterDirection.RIGHT,0,12);*/
	
	//TODO::先决定出战位置
	//self.boutNotify(Belong.SELF);
	//self.view.charaLayer.getCharacter(Belong.SELF,2).status.addStatus(StrategyType.Chaos, 0);
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
	event.currentTarget.startDrag(event.touchPointID);
	self.draging = true;
	BattleController.timer.reset();
	BattleController.timer.start();
};
BattleController.prototype.singleCombat = function(event){
	var self = event.currentTarget.parent.controller;
	var chara = self.view.charaLayer.getCharacterFromCoordinate(event.selfX,event.selfY);
	if(!chara || chara.belong != Belong.ENEMY){
		return;
	}
	self.view.roadLayer.clear();
	BattleController.ctrlChara.AI.singleCombat(chara);
};
BattleController.prototype.physicalAttack = function(event){
	var self = event.currentTarget.parent.controller;
	var chara = self.view.charaLayer.getCharacterFromCoordinate(event.selfX,event.selfY);
	if(!chara || chara.belong != Belong.ENEMY){
		return;
	}
	self.view.roadLayer.clear();
	BattleController.ctrlChara.AI.physicalAttack(chara);
};
BattleController.prototype.clickStrategyRange = function(chara){
	var self = this;
	if(!chara){
		return;
	}
	if(!isSameBelong(BattleController.ctrlChara.currentSelectStrategy.belong(),chara.belong)){
		//Todo::
		Toast.makeText(String.format(Language.get("不可对{0}使用!"), Language.get(BattleController.ctrlChara.belong))).show();
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
};

BattleController.prototype.loadSingleCombat = function(){
	var self = this;
	LMvc.keepLoading(true);
	LMvc.changeLoading(TranslucentLoading);
	self.loadMvc("SingleCombat",self.loadSingleCombatComplete);
};
BattleController.prototype.loadSingleCombatComplete=function(){
	var self = this;
	var singleCombat = new SingleCombatController(self,BattleController.ctrlChara.data.id(),BattleController.ctrlChara.AI.attackTarget.data.id());
	LMvc.stageLayer.addChild(singleCombat.view);
};