function AreaIconView(controller,areaStatus){
	var self = this;
	base(self,LView,[controller]);
	self.areaStatus = areaStatus;
	self.x = self.areaStatus.position().x;
	self.y = self.areaStatus.position().y;
	self.set();
	
	self.addEventListener(LMouseEvent.MOUSE_DOWN, self.onDown);
	self.addEventListener(LMouseEvent.MOUSE_UP, self.onUp);
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
	
}
AreaIconView.prototype.onDown=function(event){
	var self = event.currentTarget;
	self.offsetX = event.offsetX;
	self.offsetY = event.offsetY;
	self.onTouching = true;
	self.saveTouch = {dx:mouseX,dy:mouseY,touchMove:false};
	var baseView = self.parent.parent;
	baseView.startDrag(event.touchPointID);
};
AreaIconView.prototype.onUp=function(event){
	var self = event.currentTarget;
	self.onTouching = false;
	var baseView = self.parent.parent;
	baseView.stopDrag();
	if(LPoint.distance2(self.offsetX,self.offsetY,event.offsetX,event.offsetY) < 5){
		console.log("AreaIconView.prototype.onUp");
		if(LMvc.CityController){
			var obj;
			var cityData = LMvc.CityController.getValue("cityData");
			var neighbor = cityData.neighbor();
			var errorMessage = "";
			switch(LMvc.CityController.eventType){
				case CharacterListType.CHARACTER_MOVE:
					errorMessage = "dialog_move_generals_error";
					break;
				case CharacterListType.CHARACTER_SPY:
					errorMessage = "dialog_spy_generals_error";
					break;
				case CharacterListType.EXPEDITION:
					errorMessage = "dialog_expedition_select_error";
					break;
			}
			if(neighbor.indexOf(self.areaStatus.id()) < 0 || LMvc.cityId == self.areaStatus.id()){
				obj = {title:Language.get("confirm"),message:Language.get(errorMessage),height:240};
			}else if(LMvc.CityController.eventType == CharacterListType.CHARACTER_MOVE){
				if(cityData.seignior_chara_id() != self.areaStatus.seignior_chara_id()){
					obj = {title:Language.get("confirm"),message:Language.get(errorMessage),height:240};
				}else{
					obj = {title:Language.get("confirm"),
					message:String.format(Language.get("dialog_move_generals_confirm"),self.areaStatus.name()),
					height:240,
					okEvent:function(event){
						self.selectCityComplete(event);
					},cancelEvent:null};
				}
			}else if(LMvc.CityController.eventType == CharacterListType.CHARACTER_SPY){
				if(cityData.seignior_chara_id() == self.areaStatus.seignior_chara_id()){
					obj = {title:Language.get("confirm"),message:Language.get(errorMessage),height:240};
				}else{
					obj = {title:Language.get("confirm"),
					message:String.format(Language.get("dialog_spy_generals_confirm"),self.areaStatus.name()),
					height:240,
					okEvent:function(event){
						self.selectCityComplete(event);
					},cancelEvent:null};
				}
			}else if(LMvc.CityController.eventType == CharacterListType.EXPEDITION){
				if(cityData.seignior_chara_id() == self.areaStatus.seignior_chara_id()){
					obj = {title:Language.get("confirm"),message:Language.get(errorMessage),height:240};
				}else{
					obj = {title:Language.get("confirm"),
					message:String.format(Language.get("dialog_expedition_select_confirm"),self.areaStatus.name()),
					height:240,
					okEvent:function(event){
						self.selectCityComplete(event);
					},cancelEvent:null};
				}
			}
			var windowLayer = ConfirmWindow(obj);
			self.controller.view.parent.addChild(windowLayer);
		}else{
			self.controller.showCity(self.areaStatus.id());
		}
	}
};
AreaIconView.prototype.selectCityComplete=function(event){
	var self = this;
	event.currentTarget.parent.remove();
	self.controller.returnToCity(self.areaStatus.id());
};
AreaIconView.prototype.onframe=function(event){
	var self = event.currentTarget;
	var point = self.getRootCoordinate();
	if(point.x > LGlobal.width || point.x < -self.width || point.y > LGlobal.height || point.y < -self.height){
		self.layer.visible = false;
	}else{
		self.layer.visible = true;
	}
	if(!self.onTouching){
		return;
	}
	if(!self.saveTouch.touchMove && (Math.abs(self.saveTouch.dx - mouseX) > 5 || Math.abs(self.saveTouch.dy - mouseY) > 5)){
		self.saveTouch.touchMove = true;
	}
};
AreaIconView.prototype.set=function(){
	var self = this;
	
	self.layer = new LSprite();
	self.addChild(self.layer);
	self.icon = self.areaStatus.icon();
	self.width = self.icon.getWidth();
	self.height = self.icon.getHeight();
	self.layer.addChild(self.icon);
};
AreaIconView.prototype.resetIcon = function(){
	var self = this;
	self.layer.remove();
	self.set();
};
