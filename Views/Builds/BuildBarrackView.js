/**
 * 兵营
 * 招募，训练，强化等
 */
function BuildBarrackView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"barrack"]);
}
BuildBarrackView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var buttonEnlist = getButton(Language.get("enlist"),200);
	buttonEnlist.y = menuY;
	layer.addChild(buttonEnlist);
	buttonEnlist.addEventListener(LMouseEvent.MOUSE_UP, self.onClickEnlistButton);
	
	menuY += menuHeight;
	var buttonTraining = getButton(Language.get("training"),200);
	buttonTraining.y = menuY;
	layer.addChild(buttonTraining);
	buttonTraining.addEventListener(LMouseEvent.MOUSE_UP, self.onClickTrainingButton);
	return layer;
};
BuildBarrackView.prototype.onClickTrainingButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	
	self.controller.loadCharacterList(CharacterListType.TRAINING);
};
/*
BuildBarrackView.prototype.hideArmBuild=function(event){
	var controller = event.currentTarget;
	var armListLayer = controller.getValue("armListLayer");
	var self = armListLayer.parent;
	
	self.menuLayer.visible = false;
	self.controller.view.baseLayer.visible = false;
};
BuildBarrackView.prototype.showArmBuild=function(event){
	var controller = event.currentTarget;
	var armListLayer = controller.getValue("armListLayer");
	var self = armListLayer.parent;
	console.log("showArmBuild",self);
	armListLayer.remove();
	self.menuLayer.visible = true;
	self.controller.view.baseLayer.visible = true;
	console.log("self.menuLayer.visible",self.menuLayer.visible);
	self.controller.removeEventListener(ArmListEvent.SHOW, self.hideArmBuild);
	self.controller.removeEventListener(ArmListEvent.CLOSE, self.showArmBuild);
};
BuildBarrackView.prototype.onClickArmyListButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.addEventListener(ArmListEvent.SHOW, self.hideArmBuild);
	self.controller.addEventListener(ArmListEvent.CLOSE, self.showArmBuild);
	var armListLayer = new LSprite();
	self.addChild(armListLayer);
	self.controller.setValue("armListLayer", armListLayer);
	self.controller.loadArmList(ArmListType.ARM_LIST);
};*/
BuildBarrackView.prototype.onClickEnlistButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	//self.controller.loadCharacterList(CharacterListType.ENLIST,self);
	//return;
	//self.controller.addEventListener(ArmListEvent.SHOW, self.hideArmBuild);
	//self.controller.addEventListener(ArmListEvent.CLOSE, self.showArmBuild);
	var armListLayer = new LSprite();
	self.addChild(armListLayer);
	self.controller.setValue("armListLayer", armListLayer);
	self.controller.loadArmList(ArmListType.ARM_ENLIST);
};