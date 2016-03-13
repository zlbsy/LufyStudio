function GameCacher(){
}
GameCacher._areaMaps = {};
GameCacher._areaMiniMaps = {};
GameCacher._colorBitmapDatas = {};
GameCacher._panelBitmapDatas = {};
GameCacher._grayBitmapDatas = {};
GameCacher.getGrayDisplayObject = function(key, width, height){
	if(!GameCacher._grayBitmapDatas[key]){
		var layer = new LSprite();
		var bitmap = new LBitmap(new LBitmapData(LMvc.datalist[key]));    
		layer.addChild(bitmap);
		layer.filters = [new LColorMatrixFilter([0.3086,0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0])];
		GameCacher._grayBitmapDatas[key] = layer;
	}
	return GameCacher._grayBitmapDatas[key];
};
GameCacher.getAreaMap = function(key){
	if(GameCacher._areaMaps[key]){
		return GameCacher._areaMaps[key];
	}
	var bitmapData = new LBitmapData(LMvc.datalist[key],null,null,null,null,LBitmapData.DATA_CANVAS);
	GameCacher._areaMaps[key] = bitmapData;
	return bitmapData;
};
GameCacher.getAreaMiniMap = function(key){
	var miniBitmapData;
	var fullBitmapData = GameCacher.getAreaMap(key);
	if(!GameCacher._areaMiniMaps[key]){
		miniBitmapData = new LBitmapData(null,0,0,400,240,LBitmapData.DATA_CANVAS);
		miniBitmapData.mapScaleX = miniBitmapData.width/fullBitmapData.width;
		miniBitmapData.mapScaleY = miniBitmapData.height/fullBitmapData.height;
		GameCacher._areaMiniMaps[key] = miniBitmapData;
	}
	miniBitmapData = GameCacher._areaMiniMaps[key];
	var matrix = new LMatrix();
	matrix.scale(miniBitmapData.mapScaleX, miniBitmapData.mapScaleY);
	miniBitmapData.draw(fullBitmapData, matrix);
	
	return miniBitmapData;
};
GameCacher.getColorBitmapData = function(color, width, height){
	var key = "" + color + "_" + width + "_" + height;
	if(!GameCacher._colorBitmapDatas[key]){
		console.log("color key = " + key);
		var colorData = new LBitmapData(String.format("rgb({0})",color),0,0,width, height,LBitmapData.DATA_CANVAS);
		GameCacher._colorBitmapDatas[key] = colorData;
	}
	return GameCacher._colorBitmapDatas[key];
};
GameCacher.getPanelBitmapData = function(k, w, h, x1, x2, y1, y2){
	var key = k+"_"+(w || 0)+"_"+(h || 0)+"_"+(x1 || 0)+"_"+(x2 || 0)+"_"+(y1 || 0)+"_"+(y2 || 0);
	if(!GameCacher._panelBitmapDatas[key]){
		var data = new LBitmapData(LMvc.datalist[k]);
		var panel = new LPanel(data,w,h,x1,x2,y1,y2);
		var bitmapData = getBitmapData(panel);
		GameCacher._panelBitmapDatas[key] = bitmapData;
	}
	return GameCacher._panelBitmapDatas[key];
};
GameCacher.setPanelBitmapData = function(k, w, h, x1, x2, y1, y2, data){
	var key = k+"_"+(w || 0)+"_"+(h || 0)+"_"+(x1 || 0)+"_"+(x2 || 0)+"_"+(y1 || 0)+"_"+(y2 || 0);
	GameCacher._panelBitmapDatas[key] = data;
};
GameCacher.hasPanelBitmapData = function(k, w, h, x1, x2, y1, y2){
	var key = k+"_"+(w || 0)+"_"+(h || 0)+"_"+(x1 || 0)+"_"+(x2 || 0)+"_"+(y1 || 0)+"_"+(y2 || 0);
	return GameCacher._panelBitmapDatas[key];
};