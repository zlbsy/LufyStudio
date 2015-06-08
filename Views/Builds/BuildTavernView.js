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
	buttonHire.addEventListener(LMouseEvent.MOUSE_UP, self.onClickHireButton.bind(self));
	
	return layer;
};
BuildTavernView.prototype.onClickHireButton=function(event){
	var self = this;
	self.controller.loadCharacterList(CharacterListType.HIRE,self);
};
BuildTavernView.prototype.showBuild=function(event){
	var contentLayer = event.currentTarget.view.contentLayer;
	var self = contentLayer.childList.find(function(child){
		return child.isBuildBaseView;
	});
	self.callParent("die",arguments);
	self.controller.loadCharacterList(CharacterListType.CHARACTER_HIRE,self);
};
BuildBaseView.prototype.die=function(){
	var self = this;
	self.callParent("die",arguments);
	self.controller.removeEventListener(CharacterListEvent.SHOW, self.hideBuild);
	self.controller.removeEventListener(CharacterListEvent.CLOSE, self.showBuild);
};
