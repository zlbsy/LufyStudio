function BattleController(fromController){
	base(this,MyController,[]);
	this.fromController = fromController;
}
BattleController.prototype.construct=function(){
	var self = this;
	self.configLoad();
};
BattleController.prototype.configLoad=function(){
	var self = this;
	self.load.config(["BattleMap","Arms"],self.libraryLoad);
};
BattleController.prototype.libraryLoad=function(){
	var self = this;
	self.load.library(["characterSetting","Character","SingleCombatCharacter","HpBar","Face","Num"],self.helperLoad);
};
BattleController.prototype.helperLoad=function(){
	var self = this;
	self.load.helper(["Hert","Arms","Stop"],self.modelLoad);
};
BattleController.prototype.modelLoad=function(){
	var self = this;
	self.load.model(["User/User","User/Character","User/Skill","Battle/Castle"],self.viewLoad);
};
BattleController.prototype.viewLoad=function(){
	var self = this;
	var views = ["Battle/BattleResult","Battle/BattleNext","Battle/SingleCombat","Battle/Castle","Battle/BattleBackground","Battle/Power","Battle/CharacterButton","Battle/CommandMenu","Battle/CharacterMenu","Battle/AttackArrow","Battle/Shockwave"];
	views.push("Battle/FireGod");
	self.load.view(views,self.getArms);
	//self.load.view(views,self.getCharacters);
};
BattleController.prototype.getCharacters=function(){
	var self = this;
	//self.userModel = new UserModel(self);
	//self.userModel.getCharacters(self.getArms);
	UserModel.own(self).getCharacters(self.getArms);
};
BattleController.prototype.getArms=function(){
	var self = this;
	console.log("BattleController getArms");
	//self.userModel = new UserModel(self);
	//self.userModel.getArms(self.fromController.selectCharacterList, self.getEnemyArms);
	UserModel.own(self).getArms(self.fromController.selectCharacterList, self.getEnemyArms);
};
BattleController.prototype.getEnemyArms=function(){
	var self = this;
	console.log("BattleController getEnemyArms");
	self.model.getEnemyArms(self.imageLoad);
};
BattleController.prototype.imageLoad=function(){
	var self = this;
	console.log("BattleController imageLoad");
	var list = self.model.getImages();
	console.log("BattleController imageLoad list");
	self.load.image(list,self.init);
};
BattleController.prototype.init=function(){
	var self = this;
	console.log("BattleController init");
	LMvc.battleController = self;
	LMvc.stageController.view.visible = false;
	LMvc.keepLoading(false);
	self.mode = BattleMapConfig.GameBattle;
	self.view.init();
};
BattleController.prototype.mapMouseUp = function(event){
	if(LMvc.stop)return;
	var self = event.currentTarget.parent.controller;
	if(self.view.characterMenu.winPanel.visible){
		if(self.view.characterMenu.winPanel.hitTestPoint(event.offsetX,event.offsetY))return;
	}else if(self.clickTargetCharacter && self.clickTargetCharacter.hitTestPoint(event.offsetX,event.offsetY)){
		self.clickTargetCharacter.go();
		delete self.clickTargetCharacter;
		return;
	}
	event.currentTarget.stopDrag();
};
BattleController.prototype.mapMouseDown = function(event){
	if(LMvc.stop)return;
	var self = event.currentTarget.parent.controller;
	if(self.view.characterMenu.winPanel.visible){
		if(self.view.characterMenu.winPanel.hitTestPoint(event.offsetX,event.offsetY))return;
	}else{
		var chara = self.getCharaAtMouse(event);
		if(chara){
			self.clickTargetCharacter = chara;
			return;
		}
	}
	event.currentTarget.startDrag(event.touchPointID);
};
BattleController.prototype.getCharaAtMouse=function(event){
	var self = this;
	for(var i=0,l=self.model.ourCharacterList.length;i<l;i++){
		var chara = self.model.ourCharacterList[i];
		if(chara.readyMode == Character.READY_MODE_WAITING && chara.hitTestPoint(event.offsetX,event.offsetY)){
			return chara;
		}
	}
	return null;
};
BattleController.prototype.returnStage=function(event){
	var self = event.currentTarget.parent.parent.parent.controller;
	console.log(self);
	self.view.remove();
	LMvc.stageController.view.visible = true;
};