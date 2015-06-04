function BuildCitygateView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"citygate"]);
}
BuildCitygateView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var buttonPolice = getButton(Language.get("police"),200);
	buttonPolice.y = menuY;
	layer.addChild(buttonPolice);
	
	menuY += menuHeight;
	var buttonRepair = getButton(Language.get("repair"),200);
	buttonRepair.y = menuY;
	layer.addChild(buttonRepair);
	
	menuY += menuHeight;
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