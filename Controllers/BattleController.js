function BattleController(battleData, fromController){
	var self = this;
	base(self,MyController,[]);
	self.fromController = fromController;
	self.setValue("bout", 0);
}
BattleController.prototype.construct=function(){
	var self = this;
	self.downX = self.downY = 0;
	self.initOver = false;
	LMvc.keepLoading(true);
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
	self.load.library(["Num","LStarQuery","Battle/BattleQuery","Battle/BattleCharacterAI"],self.helperLoad);
};
BattleController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Talk","Hert","BattleHelper","BattleCalculateHelper","SkillCalculateHelper"],self.modelLoad);
};
BattleController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/SoldierMaster","Master/Soldier","Master/TerrainMaster","Master/GroupSkill"],self.viewLoad);
};
BattleController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Battle/Background","Battle/BattleMiniPreview","Battle/BattleMap","Common/Character",
	"Battle/BattleCharacterLayer","Battle/BattleCharacter","Battle/BattleRoad","Battle/BattleCharacterStatus",
	"Strategy/Strategy","Strategy/StrategyChild","Battle/EffectStrategy","Battle/BattleMainMenu","Battle/BattleBout",
	"Battle/CharacterStatusIcon","Battle/BattleWeather","Battle/BattleTerrain"],self.addMap);
};
BattleController.prototype.addMap=function(){
	var self = this;
	var mapPath = "s01.smap";
	self.model.loadMapFile(mapPath,self.globalFilesLoad);
};
BattleController.prototype.globalFilesLoad = function(){
	var self = this;
	var list = self.model.getImages();
	self.load.image(list,self.init);
};
BattleController.prototype.showCharacterDetailed = function(){
	var self = LMvc.BattleController;
	if(self == null){
		return;
	}
	if(Math.abs(self.downX - mouseX) > 12 || Math.abs(self.downY - mouseY) > 12){
		return;
	}
	var chara = self.view.charaLayer.getCharacterFromCoordinate(self.downX, self.downY);
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

	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	for(var i = 1;i<16;i++){
		CharacterModel.getChara(i).data.troops = CharacterModel.getChara(i).maxTroops();
		CharacterModel.getChara(i).maxHP(100);
		CharacterModel.getChara(i).HP(100);
		CharacterModel.getChara(i).calculation();
	}
	self.addOurCharacter(1,CharacterAction.MOVE,CharacterDirection.DOWN,5,5);
	self.addOurCharacter(2,CharacterAction.MOVE,CharacterDirection.UP,4,4);
	self.addOurCharacter(3,CharacterAction.MOVE,CharacterDirection.LEFT,3,3);
	self.addEnemyCharacter(4,CharacterAction.MOVE,CharacterDirection.LEFT,3,4);
	self.addEnemyCharacter(5,CharacterAction.MOVE,CharacterDirection.LEFT,2,5);
	self.addFriendCharacter(6,CharacterAction.MOVE,CharacterDirection.RIGHT,1,7);
	self.boutNotify(Belong.SELF);
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
BattleController.prototype.addOurCharacter=function(index,action,direction,x,y,callback){
	this.view.charaLayer.addOurCharacter(index,action,direction,x,y,callback);
};
BattleController.prototype.addEnemyCharacter=function(index,action,direction,x,y,isHide,ai,callback){
	this.view.charaLayer.addEnemyCharacter(index,action,direction,x,y,isHide,ai,callback);
};
BattleController.prototype.addFriendCharacter=function(index,action,direction,x,y,isHide,ai,callback){
	this.view.charaLayer.addFriendCharacter(index,action,direction,x,y,isHide,ai,callback);
};
BattleController.prototype.queryInit=function(){
	var self = this;
	var map = self.model.map.data;
	self.query = new BattleQuery(self.model.map.data);
};
BattleController.prototype.mapMouseUp = function(event){
	if(BattleSelectMenuController.instance().view.visible){
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
	if(self.getValue("currentBelong") != Belong.SELF){
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
	if(BattleSelectMenuController.instance().view.visible){
		return;
	}
	var self = event.currentTarget.parent.controller;
	if(self.getValue("currentBelong") != Belong.SELF){
		return;
	}
	self.downX = event.offsetX;
	self.downY = event.offsetY;
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
	if(BattleController.ctrlChara.belong != Belong.SELF){
		Toast.makeText(String.format(Language.get("can_not_operating"), Language.get(BattleController.ctrlChara.belong))).show();
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
	var singleCombat = new SingleCombatController(self,BattleController.ctrlChara.data.id(),BattleController.ctrlChara.AI.target.data.id());
	LMvc.stageLayer.addChild(singleCombat.view);
};