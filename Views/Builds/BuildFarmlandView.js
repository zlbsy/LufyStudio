/**
 * 农地
 * 发展农业，探索武将相关类宝物
 */
function BuildFarmlandView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"farmland"]);
}
BuildFarmlandView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var buttonAgriculture = getButton(Language.get("agriculture"),200);
	buttonAgriculture.y = menuY;
	layer.addChild(buttonAgriculture);
	
	menuY += menuHeight;
	var buttonExplore = getButton(Language.get("explore"),200);
	buttonExplore.y = menuY;
	layer.addChild(buttonExplore);
	
	return layer;
};
BuildFarmlandView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.controller.tavernShow();
};