function BattleSelectMenuController(){
	LExtends(this,MyController,[]);
}
BattleSelectMenuController.prototype.construct=function(){
	var self = this;
	self.addEventListener(BattleSelectMenuEvent.ATTACK,self.attack);
	self.addEventListener(BattleSelectMenuEvent.SINGLE_COMBAT,self.singleCombat);
	self.addEventListener(BattleSelectMenuEvent.MAGIC_SELECT,self.magicSelect);
	self.addEventListener(BattleSelectMenuEvent.STANDBY,self.standby);
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
BattleSelectMenuController.prototype.singleCombat = function(event){
	BattleController.ctrlChara.setRangeSingleCombat();
};
BattleSelectMenuController.prototype.standby = function(event){
	BattleController.ctrlChara.AI.endAction();
};
BattleSelectMenuController.prototype.magicSelect = function(event){
	var self = BattleSelectMenuController.instance();
	var view = new StrategyView(null, BattleController.ctrlChara.data);
	view.addEventListener(StrategyListEvent.CLOSE,function(){
		self.show();
	});
	view.addEventListener(StrategyListEvent.SELECT,self.strategySelect);
	LMvc.BattleController.view.parent.addChild(view);
};
BattleSelectMenuController.prototype.strategySelect = function(event){
		BattleController.ctrlChara.AI.strategySelect(event.strategyModel);
};