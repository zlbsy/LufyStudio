var studioMenubar;
var maps;
var stageBitmap;
var mapChild;
var gameStage;
var character;
var currentComponent;
var dragPoint;
var user;
var helper;
var iconSlider;
var MapSetting = {
	w:10,h:10
};
function ToolInterface(){
};
ToolInterface.stageInit = function(){
	var h = maps.length;
	var w = maps[0].length;
	stageBitmap.bitmapData = new LBitmapData("#FF0000",0,0,48 * w,48 * h, LBitmapData.DATA_CANVAS);
	for(var i=0;i<h;i++){
		for(var j=0;j<w;j++){
			var data = maps[i][j];
			var matrix = new LMatrix();
			matrix.translate(-24,-24);
			matrix.rotate(data[1]*90);
			matrix.translate(24,24);
			matrix.translate(j*48,i*48);
			//console.log(stageBitmap.bitmapData.width,stageBitmap.bitmapData.height,new LRectangle((data[0]/10 >>> 0)*48, (data[0]%10)*48, 48, 48));
			var sx = (data[0]/10 >>> 0)*48;
			var sy = (data[0]%10)*48;
			stageBitmap.bitmapData.draw(MapSetting.bitmapData,matrix,null,null,new LRectangle(sx, sy, 48, 48));
		}
	}
};
ToolInterface.init = function(){
	MapSetting.bitmapData = new LBitmapData(datalist["tile_map"]);
	gameStage = new LSprite();
	var bitmapData = new LBitmapData(null,0,0,48,48); 
	stageBitmap = new LBitmap(bitmapData);
	gameStage.addChild(stageBitmap);
	
	studioMenubar = new StudioMenubar();
	rootLayer.addChild(studioMenubar);
	
	stageLayer.x = 1;
	stageLayer.y = studioMenubar.getHeight() + 1;
	var scrollbar = new LScrollbar(gameStage,LGlobal.width,LGlobal.height - stageLayer.y,20);
	stageLayer.addChild(scrollbar);
	
	gameStage.addEventListener(LMouseEvent.MOUSE_DOWN,ToolInterface.clickDownMap);
	gameStage.addEventListener(LMouseEvent.MOUSE_UP,ToolInterface.clickUpMap);
};
ToolInterface.clickDownMap = function(e){
	stageLayer.downX = e.selfX;
	stageLayer.downY = e.selfY;
};
ToolInterface.clickUpMap = function(e){
	if(Math.abs(stageLayer.downX - e.selfX) > 5 || Math.abs(stageLayer.downY - e.selfY) > 5){
		if(mapChild){
			mapChild.remove();
			mapChild = null;
		}
		return;
	}
	if(mapChild){
		mapChild.remove();
		mapChild = null;
	}
	var x = e.selfX/48 >>> 0;
	var y = e.selfY/48 >>> 0;
	mapChild = new MapChild(x,y);
	mapChild.x = x * 48 + gameStage.x;
	mapChild.y = y * 48 + gameStage.y;
	stageLayer.addChild(mapChild);
	mapChild.init();
};