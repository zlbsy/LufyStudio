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
	buttonHire.addEventListener(LMouseEvent.MOUSE_UP, self.onClickHireButton);
	
	return layer;
};
BuildTavernView.prototype.onClickHireButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.loadCharacterList(CharacterListType.HIRE,self);
};
BuildTavernView.prototype.showBuild=function(event){
	var contentLayer = event.currentTarget.view.contentLayer;
	var self = contentLayer.childList.find(function(child){
		return child.isBuildBaseView;
	});
	self.callParent("showBuild",arguments);
	if(self.controller.hireCharacter){
		self.controller.loadCharacterList(CharacterListType.CHARACTER_HIRE,self);
	}
};