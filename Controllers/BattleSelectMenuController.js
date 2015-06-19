function BattleSelectMenuController(){
	LExtends(this,MyController,[]);
}
BattleSelectMenuController.prototype.construct=function(){
	var self = this;
	self.addEventListener(BattleSelectMenuController.ATTACK,self.attack);
	self.addEventListener(BattleSelectMenuController.CANCEL,self.cancel);
};
BattleSelectMenuController.instance = function(){
	if(!BattleSelectMenuController._instance){
		var selectMenuInstance = new BattleSelectMenuController();
		selectMenuInstance.baseView = LMvc.BattleController.view;
		LMvc.BattleController.view.parent.addChild(selectMenuInstance.view);
		selectMenuInstance.view.visible = false;
		selectMenuInstance.view.x = LGlobal.width * 0.5;
		selectMenuInstance.view.y = LGlobal.height * 0.5;
		BattleSelectMenuController._instance = selectMenuInstance;
	}
	return BattleSelectMenuController._instance;
};
BattleSelectMenuController.prototype.show = function(){
	this.view.show();
};
BattleSelectMenuController.prototype.hide = function(eventString){
	this.view.hide(eventString);
};
BattleSelectMenuController.prototype.click = function(event){
	event.currentTarget.hide(event.target.name);
};
BattleSelectMenuController.prototype.attack = function(event){
	BattleController.ctrlChara.setRangeAttack();
};
BattleSelectMenuController.prototype.cancel = function(event){
	BattleController.ctrlChara.returnShowMoveRoadObject();
};