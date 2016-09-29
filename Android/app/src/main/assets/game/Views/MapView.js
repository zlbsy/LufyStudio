function MapView(){
	base(this,LView,[]);
}
MapView.prototype.construct=function(){
	var self = this;
	self.controller.addEventListener(LEvent.COMPLETE, self.init.bind(self));
};
MapView.prototype.layerInit=function(){
	var self = this;
	self.mapLayer = new LSprite();
	self.addChild(self.mapLayer);
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	self.backLayer = new LSprite();
	self.baseLayer.addChild(self.backLayer);
	self.areaLayer = new LSprite();
	self.baseLayer.addChild(self.areaLayer);
	self.markLayer = new LSprite();
	self.baseLayer.addChild(self.markLayer);
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
	self.characterLayer = new LSprite();
	self.addChild(self.characterLayer);
};
MapView.prototype.mapInit=function(){
	var self = this;
	self.backLayer.removeAllChild();
	self.backLayer.die();
	self.mapLayer.removeAllChild();
	self.mapLayer.die();
	//TODO::ver1.1春夏秋冬
	var bitmapData = GameCacher.getAreaMap("area-map-1");//new LBitmapData(LMvc.datalist["area-map-1"],null,null,null,null,LBitmapData.DATA_CANVAS);
	self.backgroundWidth = bitmapData.width;
	self.backgroundHeight = bitmapData.height;
	/*var roadLayer = new LShape();
	roadLayer.alpha = 0.7;
	roadLayer.graphics.drawRect(0,"#FFFFFF",[0, 0, self.backgroundWidth, self.backgroundHeight]);
	for(var i=0,l=AreaModel.list.length;i<l;i++){
		var areaStatus = AreaModel.list[i];
		var neighbor = areaStatus.neighbor();
		for(var j=0;j<neighbor.length;j++){
			var neighborId = neighbor[j];
			if(areaStatus.id() < neighborId){
				continue;
			}
			var neighborArea = AreaModel.getArea(neighborId);
			//roadLayer.graphics.drawLine(10, "#FFFFFF", [75 + areaStatus.position().x - 40, 65 + areaStatus.position().y - 40, 75 + neighborArea.position().x - 40, 65 + neighborArea.position().y - 40]);
		}
	}
	roadLayer.cacheAsBitmap(true);
	//bitmapData.copyPixels(roadLayer._ll_cacheAsBitmap.bitmapData, new LRectangle(0, 0, self.backgroundWidth, self.backgroundHeight), new LPoint(0,0));
	*/
	self.mapBitmapData = bitmapData;
	var background = new BackgroundView();
	background.set(bitmapData, self.baseLayer);
	self.mapLayer.addChild(background);
	self.backLayer.addShape(LShape.RECT,[0,0,self.backgroundWidth,self.backgroundHeight]);
	
	self.baseLayer.dragRange = new LRectangle(
		LGlobal.width - self.backgroundWidth,
		LGlobal.height - self.backgroundHeight,
		self.backgroundWidth - LGlobal.width,
		self.backgroundHeight - LGlobal.height
	);
	self.toPosition();
	self.backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,self.areaDragStart);
	self.backLayer.addEventListener(LMouseEvent.MOUSE_UP,self.areaDragStop);
};
MapView.prototype.areaDragStart=function(event){
	event.currentTarget.parent.startDrag(event.touchPointID);
};
MapView.prototype.areaDragStop=function(event){
	event.currentTarget.parent.stopDrag();
	LMvc.mapX = event.currentTarget.parent.x;
	LMvc.mapY = event.currentTarget.parent.y;
};
MapView.prototype.clearBattleMark=function(){
	this.markLayer.removeAllChild();
};
MapView.prototype.addBattleMark=function(city){
	var self = this;
	var position = city.position();
	var mark = new BattleMarkView();
	mark.x = position.x + CityIconConfig.width*0.5;
	mark.y = position.y;
	self.markLayer.addChild(mark);
};
MapView.prototype.positionChangeToCity=function(city){
	var self = this;
	var position = city.position();
	self.toPosition(position.x, position.y);
};
MapView.prototype.toPosition=function(x, y){
	var self = this;
	if(typeof x != UNDEFINED && typeof y != UNDEFINED){
		self.baseLayer.x = LGlobal.width * 0.5 - x - CityIconConfig.width * 0.5;
		self.baseLayer.y = LGlobal.height * 0.5 - y - CityIconConfig.height * 0.3;
	}
	if(self.baseLayer.x > 0){
		self.baseLayer.x = 0;
	}else if(self.baseLayer.x < LGlobal.width - self.backgroundWidth){
		self.baseLayer.x = LGlobal.width - self.backgroundWidth;
	}
	if(self.baseLayer.y > 0){
		self.baseLayer.y = 0;
	}else if(self.baseLayer.y < LGlobal.height - self.backgroundHeight){
		self.baseLayer.y = LGlobal.height - self.backgroundHeight;
	}
};
MapView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.ctrlLayerInit();

	self.updateMapCoordinate();
};
MapView.prototype.updateMapCoordinate = function(){
	var self = this;
	if(LMvc.mapX || LMvc.mapY){
		self.baseLayer.x = LMvc.mapX;
		self.baseLayer.y = LMvc.mapY;
	}else{
		self.positionChangeToCity(CharacterModel.getChara(LMvc.selectSeignorId).city());
	}
};
MapView.prototype.updateView = function(){
	var self = this;
	self.areaLayerInit();
	if(!LMvc.isRead){
		LMvc.areaData = null;
		return;
	}
	LMvc.MapController.showCity(LMvc.areaData.battleData.toCityId, self.readDataToBattle);
};
MapView.prototype.readDataToBattle = function(){
	var battleData = {};
	battleData.food = LMvc.areaData.battleData.food;
	battleData.money = LMvc.areaData.battleData.money;
	battleData.troops = LMvc.areaData.battleData.troops;
	var targetCity = AreaModel.getArea(LMvc.areaData.battleData.toCityId);
	var fromCity = AreaModel.getArea(LMvc.areaData.battleData.fromCityId);
	LMvc.CityController.setValue("cityData",fromCity);
	LMvc.CityController.setValue("toCity",targetCity);
	LMvc.CityController.setValue("battleData", battleData);
	LMvc.CityController.gotoBattle();
};
MapView.prototype.areaLayerInit=function(){
	var self = this;
	self.mapInit();
	self.areaLayer.removeAllChild();
	for(var i=0,l=AreaModel.list.length;i<l;i++){
		var areaStatus = AreaModel.list[i];
		var area = new AreaIconView(self.controller,areaStatus);
		self.areaLayer.addChild(area);
	}
};
MapView.prototype.changeMode=function(mode){
	var self = this;
	LMvc.MapController.mode = mode; 
	self.ctrlLayer.childList.forEach(function(child){
		child.visible = false;
		if(mode == MapController.MODE_MAP && (child.name == "menu" || child.name == "go")){
			child.visible = true;
		}else if(mode == MapController.MODE_CHARACTER_MOVE && child.name == "close"){
			child.visible = true;
		}
	});
};
MapView.prototype.closeMap=function(event){
	event.currentTarget.parent.parent.controller.returnToCity();
};
MapView.prototype.showMainMenu=function(event){
	MenuController.instance().show();
};
MapView.prototype.ctrlLayerInit=function(){
	var self = this;
	var buttonMenu = getButton(Language.get("menu"),100);
	buttonMenu.addEventListener(LMouseEvent.MOUSE_UP,self.showMainMenu);
	buttonMenu.name = "menu";
	buttonMenu.x = LGlobal.width - buttonMenu.getWidth();
	self.ctrlLayer.addChild(buttonMenu);
	var buttonGo = getButton(Language.get("go"),100);
	buttonGo.addEventListener(LMouseEvent.MOUSE_UP,self.gotoExecute);
	buttonGo.name = "go";
	buttonGo.x = LGlobal.width - buttonGo.getWidth();
	buttonGo.y = 50;
	self.ctrlLayer.addChild(buttonGo);
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.closeMap);
	buttonClose.name = "close";
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	self.ctrlLayer.addChild(buttonClose);
	self.changeMode(MapController.MODE_MAP);
};
MapView.prototype.gotoExecute=function(event){
	var self = event ? event.currentTarget.getParentByConstructor(MapView) : this;
	var obj = {title:Language.get("confirm"),message:Language.get("goto_execute_message"),height:220,
	okEvent:self.gotoExecuteStart,cancelEvent:null};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
MapView.prototype.gotoExecuteStart=function(event){
	var self = LMvc.MapController.view;
	var windowLayer = self.getChildByName("ConfirmWindow");
	windowLayer.remove();
	SeigniorExecute.run();
};
MapView.prototype.resetAreaIcon=function(cityId){
	var self = this;
	var area = self.areaLayer.childList.find(function(child){
		return child.areaStatus.id() == cityId;
	});
	if(area != null){
		area.resetIcon();
		self.mapLayer.getChildAt(0).updateView();
	}
};
MapView.prototype.hideMapLayer=function(event){
	var self = event.currentTarget.view;
	self.baseLayer.visible = false;
	self.ctrlLayer.visible = false;
};
MapView.prototype.showMapLayer=function(event){
	var self = event.currentTarget.view;
	/*if(event.characterList.length > 1){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}*/
	if(event.characterListType == CharacterListType.SELECT_MONARCH){
		var character = event.characterList[0];
		monarchChange(LMvc.selectSeignorId, character.id());
		LMvc.selectSeignorId = character.id();
	}
	self.baseLayer.visible = true;
	self.ctrlLayer.visible = true;
	self.characterLayer.die();
	self.characterLayer.removeAllChild();
	if(SeigniorExecute.running){
		SeigniorExecute.run();
	}
};
MapView.prototype.addCharacterListView=function(characterListView){
	var self = this;
	self.baseLayer.visible = false;
	self.ctrlLayer.visible = false;
	//self.characterLayer.addChild(getTranslucentMask());
	self.characterLayer.addChild(characterListView);
};

