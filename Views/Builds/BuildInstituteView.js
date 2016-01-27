/**
 * 太学院
 * 发展技术，升级城池,研究兵种
 */
function BuildInstituteView(controller){
	var self = this;
	base(self,BuildBaseView,[controller,"institute"]);
}
BuildInstituteView.prototype.showMenu=function(){
	var self = this, layer = new LSprite(), menuY = 0, menuHeight = 55;
	var buttonTechnology = getButton(Language.get("technology"),200);
	buttonTechnology.y = menuY;
	layer.addChild(buttonTechnology);
	buttonTechnology.addEventListener(LMouseEvent.MOUSE_UP, self.onClickTechnologyButton);
	
	menuY += menuHeight;
	var buttonLevelUp = getButton(Language.get("levelUpCity"),200);
	buttonLevelUp.y = menuY;
	layer.addChild(buttonLevelUp);
	buttonLevelUp.addEventListener(LMouseEvent.MOUSE_UP, self.onClickLevelUpButton);
	
	return layer;
};
BuildInstituteView.prototype.onClickTechnologyButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.TECHNOLOGY, cityModel.generals(Job.IDLE), {isOnlyOne:true,showMoney:true, buttonLabel:"execute"});
};
BuildInstituteView.prototype.onClickLevelUpButton=function(event){
	var self = event.currentTarget.parent.parent.parent;
	var cityModel = self.controller.getValue("cityData");
	self.controller.loadCharacterList(CharacterListType.LEVEL_UP, cityModel.generals(Job.IDLE), {isOnlyOne:true,showMoney:true, buttonLabel:"execute"});
};
BuildInstituteView.prototype.selectComplete=function(event){
	var self = this;
	console.log("BuildInstituteView.prototype.selectComplete event = " , event);
	if(event.characterListType == CharacterListType.LEVEL_UP){
		if(event.characterList.length > 1){
			var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
			var windowLayer = ConfirmWindow(obj);
			LMvc.layer.addChild(windowLayer);
			return false;
		}else{
			var cityModel = self.controller.getValue("cityData");
			if(cityModel.level() >= cityModel.maxLevel()){
				var obj = {title:Language.get("confirm"),message:Language.get("dialog_city_level_error"),height:200,okEvent:null};
				var windowLayer = ConfirmWindow(obj);
				LMvc.layer.addChild(windowLayer);
				return false;
			}
		}
	}
	
	return self.callParent("selectComplete",arguments);;
};