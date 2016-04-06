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
		if(LMvc.CityController){
			if(LMvc.cityId == self.areaStatus.id()){
				self.showDialogKey("dialog_select_city_common_error");
				return;
			}
			var params = self.controller.getValue("selectCityParams");
			var obj;
			var cityData = LMvc.CityController.getValue("cityData");
			//if(params.neighbor){
			var neighbor = cityData.neighbor();
			if(neighbor.indexOf(self.areaStatus.id()) < 0 || LMvc.cityId == self.areaStatus.id()){
				self.showDialogKey("dialog_select_city_neighbor_error");
				return;
			}
			//}
			if((params.isSelf && self.areaStatus.seigniorCharaId() != LMvc.selectSeignorId) ||
			(!params.isSelf && self.areaStatus.seigniorCharaId() == LMvc.selectSeignorId)){
				self.showDialogKey(params.belongError);
				return;
			}
			if(typeof params.stopBattle != UNDEFINED){
				var isStopBattle = SeigniorModel.getSeignior(LMvc.selectSeignorId).isStopBattle(self.areaStatus.seigniorCharaId());
				if(isStopBattle != params.stopBattle){
					self.showDialogKey(params.stopBattleError);
					return;
				}
			}
			if(params.spy){
				var cityFree = SeigniorModel.getSeignior(LMvc.selectSeignorId).isSpyCity(self.areaStatus.id());
				if(!cityFree){
					self.showDialogKey(params.spyError);
					return;
				}
			}
			if(params.confirmMessage){
				var formatMsg = Language.get(params.confirmMessage);
				var message=String.format(formatMsg,self.areaStatus.name());
				self.showDialogMessage(message, function(event){
					self.selectCityComplete(event);
				},null);
			}else{
				self.selectCityComplete(null);
			}
		}else{
			self.controller.showCity(self.areaStatus.id());
		}
	}
};
AreaIconView.prototype.showDialogKey=function(msgKey, okEvent, cancelEvent){
	var self = this;
	self.showDialogMessage(Language.get(msgKey), okEvent, cancelEvent);
};
AreaIconView.prototype.showDialogMessage=function(msg, okEvent, cancelEvent){
	var self = this;
	var obj = {title:Language.get("confirm"),message:msg,height:240};
	if(typeof okEvent != UNDEFINED){
		obj.okEvent = okEvent;
	}
	if(typeof cancelEvent != UNDEFINED){
		obj.cancelEvent = cancelEvent;
	}
	var windowLayer = ConfirmWindow(obj);
	self.controller.view.parent.addChild(windowLayer);
};
AreaIconView.prototype.selectCityComplete=function(event){
	var self = this;
	if(event){
		event.currentTarget.parent.remove();
	}
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
	self.addShape(LShape.RECT,[0,0,CityIconConfig.width, CityIconConfig.height]);
	LMvc.MapController.view.mapBitmapData.copyPixels(self.icon._ll_cacheAsBitmap.bitmapData, 
	new LRectangle(0, 0, self.width, self.height), 
	new LPoint(self.x+self.icon._ll_cacheAsBitmap.x,self.y + self.icon._ll_cacheAsBitmap.y));
	//self.layer.addChild(self.icon);
};
AreaIconView.prototype.resetIcon = function(){
	var self = this;
	self.layer.remove();
	self.set();
};
