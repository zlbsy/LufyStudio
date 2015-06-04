/**
 * 酒馆
 * 搜索招募人才
 */
function BuildTavernView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"tavern"]);
}
BuildTavernView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var buttonAccess = getButton(Language.get("access"),200);
	buttonAccess.y = menuY;
	layer.addChild(buttonAccess);
	
	menuY += menuHeight;
	var buttonHire = getButton(Language.get("hire"),200);
	buttonHire.y = menuY;
	layer.addChild(buttonHire);
	
	return layer;
};
BuildTavernView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.controller.tavernShow();
};