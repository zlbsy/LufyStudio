function BuildCitygateView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"citygate"]);
}
BuildCitygateView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var buttonPolice = getButton(Language.get("police"),200);
	buttonPolice.y = menuY;
	layer.addChild(buttonPolice);
	buttonPolice.addEventListener(LMouseEvent.MOUSE_UP, self.onClickPoliceButton);
		
	menuY += menuHeight;
	var buttonRepair = getButton(Language.get("repair"),200);
	buttonRepair.y = menuY;
	layer.addChild(buttonRepair);
	buttonRepair.addEventListener(LMouseEvent.MOUSE_UP, self.onClickRepairButton);
	return layer;
};
BuildCitygateView.prototype.onClickPoliceButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.POLICE, cityModel.generals(Job.IDLE), {showMoney:true, buttonLabel:"execute"});
};
BuildCitygateView.prototype.onClickRepairButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.REPAIR, cityModel.generals(Job.IDLE), {showMoney:true, buttonLabel:"execute"});
};