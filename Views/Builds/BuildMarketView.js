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
	buttonBusiness.addEventListener(LMouseEvent.MOUSE_UP, self.onClickBusinessButton);
	
	menuY += menuHeight;
	var buttonExplore = getButton(Language.get("explore"),200);
	buttonExplore.y = menuY;
	layer.addChild(buttonExplore);
	buttonExplore.addEventListener(LMouseEvent.MOUSE_UP, self.onClickExploreButton);
	
	return layer;
};
BuildMarketView.prototype.onClickBusinessButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.BUSINESS, cityModel.generals(Job.IDLE), {showMoney:true, buttonLabel:"execute"});
};
BuildMarketView.prototype.onClickExploreButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.EXPLORE_BUSINESS, cityModel.generals(Job.IDLE), {buttonLabel:"execute"});
};