function EventMapView(){
	base(this,LView,[]);
}
EventMapView.prototype.construct=function(){
	this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
};
EventMapView.prototype.init=function(){
	var self = this;
	self.layerInit();
	self.menuLayerInit();
};
EventMapView.prototype.layerInit=function(){
	var self = this;
	self.addChild(getBlackBitmap());
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	self.mapLayer = new LSprite();
	self.baseLayer.addChild(self.mapLayer);
	//人物层
	self.charaLayer = new LSprite();
	self.baseLayer.addChild(self.charaLayer);
	
	self.messageLayer = new LSprite();
	self.baseLayer.addChild(self.messageLayer);
	
	self.clickLayer = new LSprite();
	self.clickLayer.addShape(LShape.RECT,[0,0,LGlobal.width,LGlobal.height]);
	self.clickLayer.addEventListener(LMouseEvent.MOUSE_UP, self.clickToNextScript);
	self.baseLayer.addChild(self.clickLayer);
	self.clickLayer.visible = false;
	//遮挡层
	self.menuLayer = new LSprite();
	self.baseLayer.addChild(self.menuLayer);
};
EventMapView.prototype.clickToNextScript=function(event){
	var self = event.currentTarget.getParentByConstructor(EventMapView);
	self.clickLayer.visible = false;
	if(self.messageLayer.numChildren > 0){
		self.messageLayer.removeAllChild();
	}
	LGlobal.script.analysis();
};
EventMapView.prototype.menuLayerInit=function(){
	var self = this;
	var buttonSkip = getButton(Language.get("跳过剧情"),100);
	buttonSkip.x = LGlobal.width - 100;
	self.menuLayer.addChild(buttonSkip);
	buttonSkip.addEventListener(LMouseEvent.MOUSE_UP, self.onClickSkipButton);
};
EventMapView.prototype.onClickSkipButton=function(event){
	var self = event.currentTarget.getParentByConstructor(EventMapView);
	
};
EventMapView.prototype.addCharacter=function(id,x,y,animation,waitClick){
	var self = this;
	var characterModel = CharacterModel.getChara(id);
	var face = characterModel.face();
	face.characterId = characterModel.id();
	face.y = y;
	self.charaLayer.addChild(face);
	var animationObj = {ease:LEasing.Strong.easeIn};
	if(waitClick){
		animationObj.onComplete = function(){
			self.clickLayer.visible = true;
		};
	}else{
		animationObj.onComplete = LGlobal.script.analysis;
	}
	switch(animation){
		case "fade":
		default:
			face.x = x;
			face.alpha = 0;
			animationObj.alpha = 1;
			break;
	}
	LTweenLite.to(face,0.5,animationObj);
};
EventMapView.prototype.removeCharacter=function(index){
	var self = this;
	
};
EventMapView.prototype.mapShow=function(mapIndex){
	var self = this;
	var path = self.model.mapPath(mapIndex);
	var bitmapSprite = new BitmapSprite(path);
	bitmapSprite.alpha = 0;
	bitmapSprite.addEventListener(LEvent.COMPLETE, self.loadMapOver);
	self.mapLayer.addChild(bitmapSprite);
};
EventMapView.prototype.loadMapOver=function(event){
	var bitmapSprite = event.currentTarget;
	bitmapSprite.removeEventListener(LEvent.COMPLETE);
	LTweenLite.to(bitmapSprite,0.5,{alpha:1,ease:LEasing.Strong.easeIn,onComplete:LGlobal.script.analysis});
};
EventMapView.prototype.messageShow=function(msg, speed){
	var self = this;
	var panel = getPanel("win05",360,300);
	panel.x = (LGlobal.width - 360) * 0.5;
	panel.y = (LGlobal.height - 300) * 0.5;
	var label = getStrokeLabel(msg,20,"#FFFFFF","#000000",4);
	label.width = 320;
	label.x = label.y = 20;
	label.setWordWrap(true,27);
	panel.addChild(label);
	label.speed = speed;
	label.wind();
    label.addEventListener(LTextEvent.WIND_COMPLETE, self.messageWindOver);
	self.messageLayer.addChild(panel);
};
EventMapView.prototype.messageWindOver=function(event){
	var self = event.currentTarget.getParentByConstructor(EventMapView);
	self.clickLayer.visible = true;
};
EventMapView.prototype.talk=function(id,message){
	var self = this;
	var characterModel = CharacterModel.getChara(id);
};
/**
 * 建筑层实现
 * */
/**/
/**
 * 测试层实现
 * */
/*EventMapView.prototype.testCtrlLayerInit=function(){
	var self = this;
	var backLayer = new LSprite();
	backLayer.alpha = 0.7;
	backLayer.graphics.drawRect(0,"#000000",[0, 0, 160, 200],true,"#000000");
	self.testCtrlLayer.addChild(backLayer);
	var buttonMinus = new LButtonSample1("ー",15,"宋体");
	buttonMinus.x = 20;
	buttonMinus.y = 20;
	self.testCtrlLayer.addChild(buttonMinus);
	buttonMinus.addEventListener(LMouseEvent.MOUSE_UP, self.controller.testMinus);
	var buttonPlus = new LButtonSample1("＋",15,"宋体");
	buttonPlus.x = 100;
	buttonPlus.y = 20;
	self.testCtrlLayer.addChild(buttonPlus);
	buttonPlus.addEventListener(LMouseEvent.MOUSE_UP, self.controller.testPlus);
	var textScale = new LTextField();
	textScale.text = "100%";
	textScale.color = "#FFFFFF";
	textScale.x = 55;
	textScale.y = 30;
	self.testCtrlLayer.addChild(textScale);
	self.textScale = textScale;
	
	var buttonGrid = new LButtonSample1("网格显隐",15,"宋体");
	buttonGrid.x = 30;
	buttonGrid.y = 100;
	self.testCtrlLayer.addChild(buttonGrid);
	buttonGrid.addEventListener(LMouseEvent.MOUSE_UP, self.controller.testGridShow);
};*/
/**
 * 地图层实现
 * */
/*EventMapView.prototype.mapLayerInit=function(){
	var self = this;
	//获取地图定义
	var map = self.model.map;
	for(var i=0;i<map.imgs.length;i++){
		for(var j=0;j<map.imgs[i].length;j++){
			var imgObj = map.imgs[i][j];
			var bitmap = new LBitmap(new LBitmapData(LMvc.datalist[imgObj.img],imgObj.rect[0],imgObj.rect[1],map.pieceWidth,map.pieceHeight));
			bitmap.x = j*map.pieceWidth;
			bitmap.y = i*map.pieceHeight;
			self.mapLayer.addChild(bitmap);
		}
	}
	//地图点击事件
	self.mapLayer.addEventListener(LMouseEvent.MOUSE_UP, self.controller.mapClick);
};*/
/**
 * 网格层实现
 * */
/*EventMapView.prototype.gridLayerInit=function(){
	var self = this;
	var map = self.model.map;
	var grids = map.data;
	var stepWidth = map.width/grids[0].length;
	//var stepHeight = map.height/grids.length;
	var stepHeight = stepWidth * 2 / 3;
	self.controller.stepWidth = stepWidth;
	self.controller.stepHeight = stepHeight;
    self.gridLayer.graphics.add(function (){
    	var c = LGlobal.canvas;
		c.beginPath();
		c.strokeStyle = "#000000";
		for(var i=1;i<grids.length;i++){
			c.moveTo(0,stepHeight*i);
			c.lineTo(map.width,stepHeight*i);
		}
		for(var i=1;i<grids[0].length;i++){
			c.moveTo(stepWidth*i,0);
			c.lineTo(stepWidth*i,map.height);
		}
		c.stroke();
		
		c.beginPath();
        c.fillStyle = "#FF0000";
		for(var i=0;i<grids.length;i++){
			for(var j=0;j<grids[i].length;j++){
				if(grids[i][j] == 0)continue;
                c.rect(stepWidth*j+stepWidth*0.25, stepHeight*i+stepHeight*0.25, stepWidth*0.5, stepHeight*0.5);
			}
		}
        c.fill();
	});
};*/
/**
 * 游戏层的分离和加载
 * */
/*EventMapView.prototype.layerInit=function(){
	var self = this;
	self.baseLayer = new LSprite();
	self.addChild(self.baseLayer);
	//地图层
	self.mapLayer = new LSprite();
	self.baseLayer.addChild(self.mapLayer);
	//网格层
	self.gridLayer = new LSprite();
	//self.gridLayer.visible = false;
	self.baseLayer.addChild(self.gridLayer);
	//人物层
	self.charaLayer = new LSprite();
	self.baseLayer.addChild(self.charaLayer);
	//遮挡层
	self.buildLayer = new LSprite();
	self.baseLayer.addChild(self.buildLayer);
	
	self.testCtrlLayer = new LSprite();
	self.addChild(self.testCtrlLayer);
};*/
/*
EventMapView.prototype.addItem = function(name,x,y){
	var self = this,item;
	switch(name){
		case "entrance":
			item = new Entrance();
			item.x = x*self.model.stepWidth;
			item.y = y*self.model.stepHeight;
			self.mapLayer.addChild(item);
			break;
	}	
};*/