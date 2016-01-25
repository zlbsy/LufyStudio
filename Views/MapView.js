function MapView(){
	base(this,LView,[]);
}
MapView.prototype.construct=function(){
	var self = this;
	self.controller.addEventListener(LEvent.COMPLETE, self.init.bind(self));
};
MapView.prototype.layerInit=function(){
	var self = this;
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
MapView.prototype.backLayerInit=function(){
	var self = this;
	//TODO::春夏秋冬
	var bitmapData = new LBitmapData(LMvc.datalist["area-map-1"],null,null,null,null,LBitmapData.DATA_CANVAS);
	self.backgroundWidth = bitmapData.width;
	self.backgroundHeight = bitmapData.height;
	//var roadBitmapData = new LBitmapData(null,0,0,bitmapData.width,bitmapData.height,LBitmapData.DATA_CANVAS);
	//bitmapData.copyPixels(roadBitmapData, new LRectangle(0, 0, 28, 28), new LPoint(50,50));
	var roadLayer = new LShape();
	roadLayer.alpha = 0.7;
	//"checkbox-background"
	//self.x = self.areaStatus.position().x;
	//self.y = self.areaStatus.position().y;
	//neighbor:[1,3,4,50]
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
			roadLayer.graphics.drawLine(10, "#FFFFFF", [75 + areaStatus.position().x, 65 + areaStatus.position().y, 75 + neighborArea.position().x, 65 + neighborArea.position().y]);
		}
	}
	roadLayer.cacheAsBitmap(true);
	bitmapData.copyPixels(roadLayer._ll_cacheAsBitmap.bitmapData, new LRectangle(0, 0, self.backgroundWidth, self.backgroundHeight), new LPoint(0,0));
	self.mapBitmapData = bitmapData;
	var background = new BackgroundView();
	background.set(bitmapData);
	self.backLayer.addChild(background);
	//self.backLayer.addChild(roadLayer);
};
MapView.prototype.areaDragStart=function(event){
	event.currentTarget.parent.startDrag(event.touchPointID);
};
MapView.prototype.areaDragStop=function(event){
	event.currentTarget.parent.stopDrag();
	LMvc.mapX = event.currentTarget.parent.x;
	LMvc.mapY = event.currentTarget.parent.y;
};
MapView.prototype.addBattleMark=function(city){
	var self = this;
	console.log("addBattleMark:"+city);
	var position = city.position();
	console.log("addBattleMark:"+position+(typeof BattleMarkView));
	var mark = new BattleMarkView();
	mark.x = position.x + CityIconConfig.width*0.5;
	mark.y = position.y;
	self.markLayer.addChild(mark);
	console.log("addBattleMark:"+mark.x+","+mark.y);
};
MapView.prototype.positionChangeToCity=function(city){
	var self = this;
	var position = city.position();
	self.toPosition(position.x, position.y);
};
MapView.prototype.toPosition=function(x, y){
	var self = this;
	self.baseLayer.x = LGlobal.width * 0.5 - x - CityIconConfig.width * 0.5;
	self.baseLayer.y = LGlobal.height * 0.5 - y - CityIconConfig.height * 0.3;
	console.log("toPosition:x="+self.baseLayer.x+",y="+self.baseLayer.y);
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
	console.log("toPosition check:x="+self.baseLayer.x+",y="+self.baseLayer.y);
};
MapView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.backLayerInit();
	//self.areaLayerInit();
	self.ctrlLayerInit();

	self.baseLayer.dragRange = new LRectangle(
		LGlobal.width - self.baseLayer.getWidth(),
		LGlobal.height - self.baseLayer.getHeight(),
		self.baseLayer.getWidth() - LGlobal.width,
		self.baseLayer.getHeight() - LGlobal.height
	);
	self.backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,self.areaDragStart);
	self.backLayer.addEventListener(LMouseEvent.MOUSE_UP,self.areaDragStop);
	self.updateMapCoordinate();
};
MapView.prototype.updateMapCoordinate = function(){
	var self = this;
	console.log("LMvc.mapX,LMvc.mapY",LMvc.mapX,LMvc.mapY);
	if(LMvc.mapX || LMvc.mapY){
		self.baseLayer.x = LMvc.mapX;
		self.baseLayer.y = LMvc.mapY;
	}else{
		LMvc.mapX = 0;
		LMvc.mapY = 0;
	}
};
MapView.prototype.updateView = function(){
	var self = this;
	console.log("MapView.prototype.updateView isRead = " + LMvc.isRead);
	self.areaLayerInit();
	if(!LMvc.isRead){
		return;
	}
	console.log("LMvc.areaData.battleData=",JSON.stringify(LMvc.areaData.battleData));
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
	self.areaLayer.removeAllChild();
	//bitmapData.copyPixels(roadLayer._ll_cacheAsBitmap.bitmapData, 
	//new LRectangle(0, 0, self.backgroundWidth, self.backgroundHeight), new LPoint(0,0));
	//iconLayer.cacheAsBitmap(true);
	var rect = new LRectangle(self.mapBitmapData.x, self.mapBitmapData.y, self.mapBitmapData.width, self.mapBitmapData.height);
	self.mapBitmapData.setProperties(0, 0, self.backgroundWidth, self.backgroundHeight);
	for(var i=0,l=AreaModel.list.length;i<l;i++){
		var areaStatus = AreaModel.list[i];
		var area = new AreaIconView(self.controller,areaStatus);
		self.areaLayer.addChild(area);
	}
	self.mapBitmapData.setProperties(rect.x, rect.y, rect.width, rect.height);
};
MapView.prototype.changeMode=function(mode){
	var self = this;
	self.ctrlLayer.childList.forEach(function(child){
		child.visible = false;
		if(mode == MapController.MODE_MAP && child.name == "menu"){
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
	
	var bitmapClose = new LBitmap(new LBitmapData(LMvc.datalist["close"]));
	var buttonClose = new LButton(bitmapClose);
	buttonClose.addEventListener(LMouseEvent.MOUSE_UP, self.closeMap);
	buttonClose.name = "close";
	buttonClose.x = LGlobal.width - bitmapClose.getWidth() - 5;
	buttonClose.y = 5;
	self.ctrlLayer.addChild(buttonClose);
	self.changeMode(MapController.MODE_MAP);
};
MapView.prototype.resetAreaIcon=function(cityId){
	var self = this;
	var area = self.areaLayer.childList.find(function(child){
		return child.areaStatus.id() == cityId;
	});
	if(area != null){
		area.resetIcon();
	}
};
MapView.prototype.hideMapLayer=function(event){
	var self = event.currentTarget.view;
	self.baseLayer.visible = false;
	self.ctrlLayer.visible = false;
};
MapView.prototype.showMapLayer=function(event){
	var self = event.currentTarget.view;
	if(event.characterList.length > 1){
		var obj = {title:Language.get("confirm"),message:Language.get("dialog_select_onlyone_error"),height:200,okEvent:null};
		var windowLayer = ConfirmWindow(obj);
		LMvc.layer.addChild(windowLayer);
		return;
	}
	console.log("MapView.prototype.showMapLayer",event.characterList);
	var character = event.characterList[0];
	monarchChange(LMvc.selectSeignorId, character.id());
	LMvc.selectSeignorId = character.id();
	self.baseLayer.visible = true;
	self.ctrlLayer.visible = true;
	self.characterLayer.removeAllChild();
	if(SeigniorExecute.running){
		SeigniorExecute.run();
	}
};
MapView.prototype.addCharacterListView=function(characterListView){
	var self = this;
	console.log("MapView.prototype.addCharacterListView:"+characterListView);
	self.baseLayer.visible = false;
	self.ctrlLayer.visible = false;
	self.characterLayer.addChild(getTranslucentMask());
	self.characterLayer.addChild(characterListView);
};

