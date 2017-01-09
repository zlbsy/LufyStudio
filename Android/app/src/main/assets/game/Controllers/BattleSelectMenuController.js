function BattleSelectMenuController(){
	LExtends(this,MyController,[]);
}
BattleSelectMenuController.prototype.construct=function(){
	var self = this;
	self.addEventListener(BattleSelectMenuEvent.ATTACK,self.attack);
	self.addEventListener(BattleSelectMenuEvent.SINGLE_COMBAT,self.singleCombat);
	self.addEventListener(BattleSelectMenuEvent.MAGIC_SELECT,self.magicSelect);
	self.addEventListener(BattleSelectMenuEvent.MILITARY_ADVISER,self.militaryAdviserLoad);
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
BattleSelectMenuController.prototype.militaryAdviserLoad = function(event){
	LMvc.running = true;
	var self = BattleSelectMenuController.instance();
	var characterModel = BattleController.ctrlChara.data;
	var militaryModel = characterModel.military();
	var list = [{name:"military-"+militaryModel.image(),path:LMvc.IMG_PATH+"military/" + militaryModel.image() + ".png"}];
	self.load.image(list,self.militaryAdviser);
};
BattleSelectMenuController.prototype.militaryAdviser = function(event){
	var self = BattleSelectMenuController.instance();
	var view = new MilitaryAdviserView(null, BattleController.ctrlChara.data);
	var obj = {width:360, height:300, subWindow:view, title:Language.get("military")};
	obj.okEvent = self.militaryAdviserSelect;
	obj.cancelEvent = self.militaryAdviserCancel;
	var dialog = ConfirmWindow(obj);
	LMvc.layer.addChild(dialog);
};
BattleSelectMenuController.prototype.militaryAdviserSelect = function(event){
	event.currentTarget.parent.remove();
	militaryAdviserStart(BattleController.ctrlChara.data);
};
BattleSelectMenuController.prototype.militaryAdviserCancel = function(event){
	event.currentTarget.parent.remove();
	LMvc.running = false;
	var self = BattleSelectMenuController.instance();
	self.show();
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