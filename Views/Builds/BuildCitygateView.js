function BuildCitygateView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"citygate"]);
}
BuildCitygateView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	if(self.controller.getValue("selfCity")){
		var buttonPolice = getButton(Language.get("police"),200);
		buttonPolice.y = menuY;
		layer.addChild(buttonPolice);
		buttonPolice.addEventListener(LMouseEvent.MOUSE_UP, self.onClickPoliceButton);
		
		menuY += menuHeight;
		var buttonRepair = getButton(Language.get("repair"),200);
		buttonRepair.y = menuY;
		layer.addChild(buttonRepair);
		buttonRepair.addEventListener(LMouseEvent.MOUSE_UP, self.onClickRepairButton);
		
		menuY += menuHeight;
	}
	var buttonMap = getButton(Language.get("big_map"),200);
	buttonMap.y = menuY;
	layer.addChild(buttonMap);
	
	buttonMap.addEventListener(LMouseEvent.MOUSE_UP, self.onClickMapButton.bind(self));
	return layer;
};
BuildCitygateView.prototype.onClickMapButton=function(event){
	var self = this;
	self.controller.gotoMap();
};
BuildCitygateView.prototype.onClickPoliceButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.loadCharacterList(CharacterListType.POLICE,self);
};
BuildCitygateView.prototype.onClickRepairButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	self.controller.loadCharacterList(CharacterListType.REPAIR,self);
};