function BattleView(){
	LExtends(this,LView,[]);
}
BattleView.prototype.construct=function(){
	var self = this;
	self.controller.addEventListener(LEvent.COMPLETE, self.init.bind(self));
	self.controller.addEventListener(BattleBoutEvent.SHOW, self.boutShow);
};
BattleView.prototype.init=function(){
	var self = this;
	self.layerInit();
	//self.mapLayerInit();
	//self.buildLayerInit();
	var battleData = self.controller.battleData;
	var city = battleData.toCity;
	var enemyTroops = city.troops();
	var generals = city.generals();
	for(var i=0,l=generals.length;i<l;i++){
		enemyTroops += generals[i].troops();
	}
	if(city.seigniorCharaId() == 0 || enemyTroops == 0 || city.generals() == 0){
		self.showResult(battleData.fromCity.seigniorCharaId() == LMvc.selectSeignorId);
		return;
	}
	
	//地图点击事件
	self.baseLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.controller.mapMouseDown);
	self.baseLayer.addEventListener(LMouseEvent.MOUSE_UP, self.controller.mapMouseUp);
	self.miniLayer.addEventListener(LMouseEvent.MOUSE_DOWN, self.miniLayerStartDrag);
	self.miniLayer.addEventListener(LMouseEvent.MOUSE_UP, self.miniLayerStopDrag);
	
	var map = self.model.map;
	if(LGlobal.height < map.height){
		self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
		return;
	}
	return;
	self.addChildAt(getBlackBitmap(LGlobal.width, LGlobal.height), 0);
	var baseLayer = self.baseLayer;
	baseLayer.y = (LGlobal.height - map.height) * 0.5;
};
BattleView.prototype.boutShow = function(event){
	var self = event.currentTarget.view;
	self.controller.setValue("currentBelong", event.belong);
	var boutView = new BattleBoutView(self.controller,event.belong);
	self.addChild(boutView);
	if(event.belong == Belong.SELF){
		//self.mainMenu.visible = true;
		//self.miniLayer.visible = self.mainMenu.miniMapVisible;
	}else{
		self.mainMenu.visible = false;
		self.miniLayer.visible = false;
	}
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
/*BattleView.prototype.mapLayerInit=function(){
	var self = this;
	//获取地图定义
	var map = self.model.map;
	self.mapLayer.setSmall(map);
};
*/
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

	//路径层
	self.roadLayer = new BattleRoadView(self.controller);
	self.baseLayer.addChild(self.roadLayer);
	self.roadLayer.visible = false;
	//人物层
	self.charaLayer = new BattleCharacterLayerView(self.controller);
	self.baseLayer.addChild(self.charaLayer);
	
	//特效层
	self.effectLayer = new LSprite();
	self.baseLayer.addChild(self.effectLayer);
	//地形预览层
	self.terrainWindow = new BattleTerrainView(self.controller);
	self.addChild(self.terrainWindow);
	self.terrainWindow.visible = false;
	//天气层
	self.weatherLayer = new BattleWeatherView();
	self.addChild(self.weatherLayer);
	//预览层
	self.miniLayer = new BattleMiniPreviewView(self.controller);
	self.addChild(self.miniLayer);
	self.miniLayer.visible = false;
	
	self.mainMenu = new BattleMainMenuView(self.controller);
	self.mainMenu.mainLayer.x = LGlobal.width - self.mainMenu.getWidth();
	self.addChild(self.mainMenu);
	self.mainMenu.visible = false;
	
	self.contentLayer = new LSprite();
	self.addChild(self.contentLayer);
};
BattleView.prototype.addCharacterListView=function(characterListView){
	var self = this;
	self.controller.addEventListener(CharacterListEvent.CLOSE, self.clearContentLayer);
	self.contentLayer.addChild(characterListView);
};
BattleView.prototype.showBattleField=function(){
	var self = this;
	var battleField = new BattleFieldView(self.controller);
	var obj = {title:self.controller.battleData.toCity.name()+Language.get("battleField"),subWindow:battleField,width:480,height:540,okEvent:null};
	var windowLayer = ConfirmWindow(obj);
	self.addChild(windowLayer);
};
BattleView.prototype.clearContentLayer=function(event){
	var self = event.currentTarget.view;
	self.contentLayer.removeAllChild();
	self.controller.removeEventListener(CharacterListEvent.CLOSE, self.clearContentLayer);
};
BattleView.prototype.resetMapPosition=function(chara){
	var self = this;
	if(chara.hideByCloud){
		return;
	}
	if(LGlobal.height >= self.model.map.height){
		return;
	}
	var baseLayer = self.baseLayer;
	LTweenLite.to(baseLayer,0.2,{x:LGlobal.width*0.5 - chara.x,y:LGlobal.height*0.5 - chara.y,});
};
BattleView.prototype.checkPosition=function(){
	var self = this;
	var map = self.model.map;
	var baseLayer = self.baseLayer;
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
BattleView.prototype.onframe=function(event){
	event.currentTarget.checkPosition();
};
BattleView.prototype.updateView = function(){
	var self = this;
	/*
	self.model.enemyCaptive.push(1);
	self.model.enemyCaptive.push(2);
	self.model.enemyCaptive.push(3);
	self.model.selfCaptive.push(24);
	self.model.selfCaptive.push(25);
	self.model.selfCaptive.push(26);
	self.showResult(true);*/
};
BattleView.prototype.showResult = function(result){
	var self = this;
	var r = new BattleResultView(self.controller, result);
	self.addChild(r);
};
BattleView.prototype.boutEnd = function() {
	BattleController.ctrlChara.AI.boutEnd();
};
