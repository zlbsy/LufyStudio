function MapView(){
	base(this,LView,[]);
}
MapView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
MapView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	self.backLayer = new LSprite();
	self.baseLayer.addChild(self.backLayer);
	self.areaLayer = new LSprite();
	self.baseLayer.addChild(self.areaLayer);
	self.ctrlLayer = new LSprite();
	self.addChild(self.ctrlLayer);
};
MapView.prototype.backLayerInit=function(){
	var self = this;
	//TODO::春夏秋冬
	var bitmapData = new LBitmapData(LMvc.datalist["area-map-1"],null,null,null,null,LBitmapData.DATA_CANVAS);
	var roadBitmapData = new LBitmapData(null,0,0,bitmapData.width,bitmapData.height,LBitmapData.DATA_CANVAS);
	//bitmapData.copyPixels(roadBitmapData, new LRectangle(0, 0, 28, 28), new LPoint(50,50));
	var roadLayer = new LShape();
	roadLayer.alpha = 0.5;
	//"checkbox-background"
	//self.x = self.areaStatus.position().x;
	//self.y = self.areaStatus.position().y;
	//neighbor:[1,3,4,50]
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
	
	var background = new BackgroundView();
	background.set(bitmapData);
	self.backLayer.addChild(background);
	self.backLayer.addChild(roadLayer);
};
MapView.prototype.areaDragStart=function(event){
	event.currentTarget.parent.startDrag(event.touchPointID);
};
MapView.prototype.areaDragStop=function(event){
	event.currentTarget.parent.stopDrag();
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
};
MapView.prototype.updateView = function(){
	var self = this;
	console.log("LMvc.areaData.battleData="+LMvc.areaData.battleData);
	if(!LMvc.areaData.battleData){
		self.areaLayerInit();
		return;
	}
	LMvc.MapController.showCity(targetCity.id(), function(){
		LMvc.CityController.gotoBattle();
		
		
	});
};
MapView.prototype.areaLayerInit=function(){
	var self = this;
	self.areaLayer.removeAllChild();
	for(var i=0,l=AreaModel.list.length;i<l;i++){
		var areaStatus = AreaModel.list[i];
		var area = new AreaIconView(self.controller,areaStatus);
		self.areaLayer.addChild(area);
	}
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
