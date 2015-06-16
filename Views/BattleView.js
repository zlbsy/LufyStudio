function BattleView(){
	LExtends(this,LView,[]);
}
BattleView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
BattleView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.mapLayerInit();
	//self.buildLayerInit();
	//地图点击事件
	self.baseLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.controller.mapMouseDown);
	self.baseLayer.addEventListener(LMouseEvent.MOUSE_UP, self.controller.mapMouseUp);
	self.miniLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.miniLayerStartDrag);
	self.miniLayer.addEventListener(LMouseEvent.MOUSE_UP, self.miniLayerStopDrag);
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
BattleView.prototype.miniLayerStartDrag = function(event){
	event.currentTarget.startDrag(event.touchPointID);
};
BattleView.prototype.miniLayerStopDrag = function(event){
	event.currentTarget.stopDrag();
};
/**
 * 地图层实现
 * */
BattleView.prototype.mapLayerInit=function(){
	var self = this;
	//获取地图定义
	var map = self.model.map;
	self.mapLayer.setSmall(map);
};

BattleView.prototype.menuLayerInit=function(){
	var self = this;
	
	var openmenuButton = GetButton(LMvc.datalist["openmenu"],null,0);
	openmenuButton.x = LGlobal.width - openmenuButton.getWidth();
	openmenuButton.y = 0;
	self.addChild(openmenuButton);
	openmenuButton.addEventListener(LMouseEvent.MOUSE_UP, function(){
		self.controller.openmenuClick();
	});
};
/**
 * 游戏层的分离和加载
 * */
BattleView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	//地图层
	self.mapLayer = new BattleMapView(self.controller);
	self.baseLayer.addChild(self.mapLayer);
	/*
	//路径层
	self.roadLayer = new LSouSouSMapRoadView(self.controller);
	self.baseLayer.addChild(self.roadLayer);*/
	//人物层
	self.charaLayer = new BattleCharacterLayerView(self.controller);
	self.baseLayer.addChild(self.charaLayer);
	/*//遮挡层
	self.buildLayer = new LSprite();
	self.baseLayer.addChild(self.buildLayer);*/
	//预览层
	self.miniLayer = new BattleMiniPreviewView(self.controller);
	self.addChild(self.miniLayer);
	
	//Test code
	self.buildLayer = new LSprite();
	self.baseLayer.addChild(self.buildLayer);
	self.buildLayer.alpha = 0.4;
	var layer = new LSprite();
    layer.graphics.add(function (){
    	var stepHeight = self.model.stepHeight;
    	var stepWidth = self.model.stepWidth;
    	var c = LGlobal.canvas;
		c.beginPath();
		c.strokeStyle = "#ffffff";
		for(var i=1;i<20;i++){
			c.moveTo(0,stepHeight*i);
			c.lineTo(1000,stepHeight*i);
		}
		for(var i=1;i<20;i++){
			c.moveTo(stepWidth*i,0);
			c.lineTo(stepWidth*i,1000);
		}
		c.stroke();
	});
	self.buildLayer.addChild(layer);
	return;
	var f = new FPS();
	self.addChild(f);
	
};
BattleView.prototype.onframe=function(event){
	var self = event.currentTarget.controller;
	var map = self.model.map;
	var baseLayer = self.view.baseLayer;
	if(baseLayer.x > 0){
		baseLayer.x = 0;
	}else if(baseLayer.x < LGlobal.width - map.width){
		baseLayer.x = LGlobal.width - map.width;
	}
	if(baseLayer.y > 0){
		baseLayer.y = 0;
	}else if(baseLayer.y < LGlobal.height - map.height){
		baseLayer.y = LGlobal.height - map.height;
	}
};
