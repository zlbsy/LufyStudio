/**
 * 市场
 * 发展商业，探索文官相关类宝物
 */
function BuildMarketView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"market"]);
}
BuildMarketView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var buttonBusiness = getButton(Language.get("business"),200);
	buttonBusiness.y = menuY;
	layer.addChild(buttonBusiness);
	
	menuY += menuHeight;
	var buttonExplore = getButton(Language.get("explore"),200);
	buttonExplore.y = menuY;
	layer.addChild(buttonExplore);
	
	return layer;
};
BuildMarketView.prototype.onClick=function(event){
	var self = event.currentTarget;
	self.controller.tavernShow();
};