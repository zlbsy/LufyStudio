function GameCacher(){
}
GameCacher._datas = {};
GameCacher._areaMaps = {};
GameCacher._areaMiniMaps = {};
GameCacher._colorBitmapDatas = {};
GameCacher._panelBitmapDatas = {};
GameCacher._grayBitmapDatas = {};
GameCacher._scaleBitmapDatas = {};
GameCacher.getData = function(key){
	return GameCacher._datas[key];
};
GameCacher.setData = function(key, data){
	GameCacher._datas[key] = data;
};
GameCacher.getScaleBitmapData = function(name, scaleX, scaleY){
	var key = name+"_" + scaleX + "_" + scaleY;
	if(!GameCacher._scaleBitmapDatas[key]){
		var baseData = new LBitmapData(LMvc.datalist[name]);
		var bitmapData = new LBitmapData(null, 0, 0, baseData.width, baseData.height, LBitmapData.DATA_CANVAS);
		var matrix = new LMatrix();
		matrix.scale(scaleX, scaleY);
		matrix.translate(scaleX == -1 ? baseData.width : 0, scaleY == -1 ? baseData.height:0);
		bitmapData.draw(new LBitmap(baseData), matrix);
		GameCacher._scaleBitmapDatas[key] = bitmapData;
	}
	return GameCacher._scaleBitmapDatas[key];
};
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
GameCacher.resetAreaMap = function(key){
	var bitmapData = GameCacher.getAreaMap(key);
	var bitmapDataBase = new LBitmapData(LMvc.datalist[key]);
	bitmapData.copyPixels(bitmapDataBase, new LRectangle(0, 0, bitmapDataBase.width, bitmapDataBase.height), new LPoint(0,0));
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
GameCacher.getCircleBitmapData = function(color, radius){
	var key = "" + color + "_" + radius;
	if(!GameCacher._colorBitmapDatas[key]){
		var shape = new LShape();
		shape.graphics.drawArc(0, "#000000", [radius, radius, radius, 0, 2*Math.PI],true,String.format("rgba({0},0.7)",color));
		var whiteData = new LBitmapData(null, 0, 0, radius * 2, radius * 2, LBitmapData.DATA_CANVAS);
		whiteData.draw(shape);
		GameCacher._colorBitmapDatas[key] = whiteData;
	}
	return GameCacher._colorBitmapDatas[key];
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