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
	//self.loadMvc(["sousou/SMap/SouSouSMapSelectMenu"],self.libraryLoad);
	self.configLoad();
};
BattleController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["Soldiers","Character"],self.libraryLoad);
};
BattleController.prototype.libraryLoad=function(){
	var self = this;
	//self.load.library(["sousou/character/LSouSouMember","sousou/character/LSouSouCharacter","sousou/character/LSouSouCharacterAI","sousou/Arms","character/Action","character/Character","character/Face","LStarQuery","window/WindowPanel","BitmapSprite","LSouSouSQuery"],self.helperLoad);
	self.load.library(["LStarQuery","Battle/BattleQuery"],self.helperLoad);
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
	self.addOurCharacter(2,CharacterAction.MOVE,CharacterDirection.UP,5,8);
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
	//TODO::
	/*if(SouSouSMapSelectMenuController.instance().view.visible){
		return;
	}*/
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
	//TODO::
	return;
	if(!self.view.roadLayer.hitTestPoint(event.offsetX,event.offsetY)){
		self.notClickOnRoadLayer(event);
		return;
	}
	if(LSouSouObject.ctrlChara.mode == LSouSouCharacter.WAIT_ATTACK){
		self.physicalAttack(event);
		return;
	}
	self.clickOnRoadLayer(event);
};
BattleController.prototype.mapMouseDown = function(event){
	//TODO::
	/*if(SouSouSMapSelectMenuController.instance().view.visible){
		return;
	}*/
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
	if(!chara || chara.belong != LSouSouObject.BELONG_ENEMY){
		return;
	}
	self.view.roadLayer.clear();
	LSouSouObject.ctrlChara.AI.physicalAttack(chara);
};
BattleController.prototype.clickOnRoadLayer = function(event){
	var self = event.currentTarget.parent.controller;
	var chara = self.view.charaLayer.getCharacterFromCoordinate(event.selfX,event.selfY);
	if(chara){
		return;
	}
	chara = LSouSouObject.ctrlChara;
		
	var coordinate = chara.getTo();
	var fx = coordinate[0] , fy = coordinate[1];
	var returnList = self.query.queryPath(new LPoint(fx,fy),new LPoint(event.selfX/self.model.stepWidth >>> 0,event.selfY/self.model.stepHeight >>> 0));
	if(returnList.length > 0){
		self.view.roadLayer.clear();
		chara.setRoad(returnList);//move
	}
};
BattleController.prototype.notClickOnRoadLayer = function(event){
	var self = event.currentTarget.parent.controller;
	switch(LSouSouObject.ctrlChara.mode){
		case LSouSouCharacter.SHOW_MOVE_ROAD:
			self.view.roadLayer.clear();
			LSouSouObject.ctrlChara.removeAllEventListener();
			break;
		case LSouSouCharacter.WAIT_ATTACK:
			self.view.roadLayer.clear();
			LSouSouObject.ctrlChara.dispatchEvent(LSouSouCharacter.MOVE_COMPLETE);
			break;
	}
};
BattleController.prototype.characterClick = function(cx,cy){
	var self = this;
	var chara = self.view.charaLayer.getCharacterFromCoordinate(cx,cy);
	switch(chara.belong){
		case CharacterConfig.BELONG_SELF:
			BattleController.ctrlChara = chara;
			//TODO::
			//BattleController.ctrlChara.AI.setEvent();
			self.clickSelfCharacter(chara);
			break;
		case CharacterConfig.BELONG_FRIEND:
			break;
		case CharacterConfig.BELONG_ENEMY:
			break;
	}
};
BattleController.prototype.clickSelfCharacter = function(chara){
	var self = this;
	var path = self.query.makePath(chara);
	self.view.roadLayer.setSelfMoveRoads(path);
	self.view.roadLayer.addRangeAttack(chara);
	//TODO::
	//LSouSouObject.ctrlChara.saveShowMoveRoadObject();
};