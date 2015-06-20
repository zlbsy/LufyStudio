function BattleSelectMenuController(){
	LExtends(this,MyController,[]);
}
BattleSelectMenuController.prototype.construct=function(){
	var self = this;
	self.addEventListener(BattleSelectMenuEvent.ATTACK,self.attack);
	self.addEventListener(BattleSelectMenuEvent.CANCEL,self.cancel);
};
BattleSelectMenuController.instance = function(){
	if(!BattleSelectMenuController._instance){
		var selectMenuInstance = new BattleSelectMenuController();
		selectMenuInstance.baseView = LMvc.BattleController.view;
		LMvc.BattleController.view.parent.addChild(selectMenuInstance.view);
		selectMenuInstance.view.visible = false;
		BattleSelectMenuController._instance = selectMenuInstance;
	}
	return BattleSelectMenuController._instance;
};
BattleSelectMenuController.prototype.show = function(){
	this.dispatchEvent(BattleSelectMenuEvent.SELECT_MENU_SHOW);
};
BattleSelectMenuController.prototype.hide = function(eventString){
	this.dispatchEvent(BattleSelectMenuEvent.SELECT_MENU_HIDDEN);
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