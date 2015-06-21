function BattleController(battleData, fromController){
	console.log("BattleController -- start --");
	base(this,MyController,[]);
	this.fromController = fromController;
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
	self.loadMvc(["BattleSelectMenu"],self.configLoad);
	//self.configLoad();
};
BattleController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Soldiers","Character"],self.libraryLoad);
};
BattleController.prototype.libraryLoad=function(){
	var self = this;
	//self.load.library(["sousou/character/LSouSouMember","sousou/character/LSouSouCharacter","sousou/character/LSouSouCharacterAI","sousou/Arms","character/Action","character/Character","character/Face","LStarQuery","window/WindowPanel","BitmapSprite","LSouSouSQuery"],self.helperLoad);
	self.load.library(["LStarQuery","Battle/BattleQuery","Battle/BattleCharacterAI"],self.helperLoad);
};
BattleController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Talk"],self.modelLoad);
};
BattleController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["Master/SoldierMaster","Master/Soldier"],self.viewLoad);
};
BattleController.prototype.viewLoad=function(){
	var self = this;
	self.load.view(["Battle/Background","Battle/BattleMiniPreview","Battle/BattleMap","Battle/BattleCharacterLayer","Common/Character","Battle/BattleCharacter","Battle/BattleRoad"],self.addMap);
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
BattleController.prototype.init = function(){
	var self = this;
	SoldierMasterModel.setMaster(SoldierDatas);
	self.queryInit();
	LMvc.keepLoading(false);
	self.fromController.view.parent.addChild(self.view);
	self.fromController.view.remove();
	LMvc.CityController = null;
	LMvc.BattleController = self;
	console.log("BattleController.prototype.init -- start --");
	self.dispatchEvent(LEvent.COMPLETE);
	self.dispatchEvent(LController.NOTIFY);
	
	self.addOurCharacter(1,CharacterAction.MOVE,CharacterDirection.DOWN,5,5);
	self.addOurCharacter(2,CharacterAction.MOVE,CharacterDirection.UP,6,8);
	self.addEnemyCharacter(3,CharacterAction.MOVE,CharacterDirection.LEFT,3,2);
	self.addFriendCharacter(4,CharacterAction.MOVE,CharacterDirection.RIGHT,1,7);
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
	/*if(LSouSouObject.talkLayer){
		if(LSouSouObject.talkOver){
			//TalkRemove();
		}
		return;
	}*/
	event.currentTarget.stopDrag();
	if(Math.abs(self.downX - event.offsetX) > 12 || Math.abs(self.downY - event.offsetY) > 12){
		return;
	}
	
	if(!self.view.roadLayer.visible){
		self.characterClick(event.selfX,event.selfY);
		return;
	}
	if(!self.view.roadLayer.hitTestPoint(event.offsetX,event.offsetY)){
		self.notClickOnRoadLayer(event);
		return;
	}
	if(BattleController.ctrlChara.mode == CharacterMode.WAIT_ATTACK){
		self.physicalAttack(event);
		return;
	}
	self.clickOnRoadLayer(event);
};
BattleController.prototype.mapMouseDown = function(event){
	if(BattleSelectMenuController.instance().view.visible){
		return;
	}
	var self = event.currentTarget.parent.controller;
	/*if(LSouSouObject.talkLayer || LSouSouObject.runMode){
		return;
	}*/
	self.downX = event.offsetX;
	self.downY = event.offsetY;
	event.currentTarget.startDrag(event.touchPointID);
};
BattleController.prototype.physicalAttack = function(event){
	var self = event.currentTarget.parent.controller;
	var chara = self.view.charaLayer.getCharacterFromCoordinate(event.selfX,event.selfY);
	if(!chara || chara.belong != CharacterConfig.BELONG_ENEMY){
		return;
	}
	self.view.roadLayer.clear();
	BattleController.ctrlChara.AI.physicalAttack(chara);
};
BattleController.prototype.clickOnRoadLayer = function(event){
	var self = event.currentTarget.parent.controller;
	if(BattleController.ctrlChara.belong != CharacterConfig.BELONG_SELF){
		Toast.makeText(String.format(Language.get("can_not_operating"), Language.get(BattleController.ctrlChara.belong))).show();
		return;
	}
	var chara = self.view.charaLayer.getCharacterFromCoordinate(event.selfX,event.selfY);
	if(chara && chara.id() != BattleController.ctrlChara.id()){
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
	switch(BattleController.ctrlChara.mode){
		case BattleCharacterEvent.SHOW_MOVE_ROAD:
			self.view.roadLayer.clear();
			BattleController.ctrlChara.removeAllEventListener();
			break;
		case BattleCharacterEvent.WAIT_ATTACK:
			self.view.roadLayer.clear();
			BattleController.ctrlChara.dispatchEvent(BattleCharacterEvent.MOVE_COMPLETE);
			break;
	}
};
BattleController.prototype.characterClick = function(cx,cy){
	var self = this;
	var chara = self.view.charaLayer.getCharacterFromCoordinate(cx,cy);
	BattleController.ctrlChara = chara;
	switch(chara.belong){
		case CharacterConfig.BELONG_SELF:
			BattleController.ctrlChara.AI.setEvent();
			self.clickSelfCharacter(chara);
			break;
		case CharacterConfig.BELONG_FRIEND:
			self.clickOtherCharacter(chara);
			break;
		case CharacterConfig.BELONG_ENEMY:
			self.clickOtherCharacter(chara);
			break;
	}
};
BattleController.prototype.clickSelfCharacter = function(chara){
	var self = this;
	chara.toStatic(false);
	var path = self.query.makePath(chara);
	self.view.roadLayer.setMoveRoads(path, chara.belong);
	self.view.roadLayer.addRangeAttack(chara);
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