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
	var buttonArmyList = getButton(Language.get("arm_list"),200);
	buttonArmyList.y = menuY;
	layer.addChild(buttonArmyList);
	buttonArmyList.addEventListener(LMouseEvent.MOUSE_UP, self.onClickArmyListButton);
	
	menuY += menuHeight;
	var buttonTraining = getButton(Language.get("training"),200);
	buttonTraining.y = menuY;
	layer.addChild(buttonTraining);
	
	menuY += menuHeight;
	var buttonStrengthen = getButton(Language.get("strengthen"),200);
	buttonStrengthen.y = menuY;
	layer.addChild(buttonStrengthen);
	
	return layer;
};
BuildBarrackView.prototype.hideBuild=function(){
	var self = this;
	self.menuLayer.visible = false;
	self.controller.view.baseLayer.visible = false;
};
BuildBarrackView.prototype.showBuild=function(){
	var self = this;
	self.menuLayer.visible = true;
	self.controller.view.baseLayer.visible = true;
};
BuildBarrackView.prototype.onClickArmyListButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.loadArmList(ArmListType.ARM_LIST,self);
};
BuildBarrackView.prototype.onClickEnlistButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.loadArmList(ArmListType.ARM_ENLIST,self);
};