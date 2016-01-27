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
	buttonAgriculture.addEventListener(LMouseEvent.MOUSE_UP, self.onClickAgricultureButton);
	
	menuY += menuHeight;
	var buttonExplore = getButton(Language.get("explore"),200);
	buttonExplore.y = menuY;
	layer.addChild(buttonExplore);
	buttonExplore.addEventListener(LMouseEvent.MOUSE_UP, self.onClickExploreButton);
	
	return layer;
};
BuildFarmlandView.prototype.onClickAgricultureButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.AGRICULTURE, cityModel.generals(Job.IDLE), {showMoney:true, buttonLabel:"execute"});
};
BuildFarmlandView.prototype.onClickExploreButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.EXPLORE_AGRICULTURE, cityModel.generals(Job.IDLE), {buttonLabel:"execute"});
};