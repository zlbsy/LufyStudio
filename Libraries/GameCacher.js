function GameCacher(){
}
GameCacher._areaMaps = {};
GameCacher._areaMiniMaps = {};
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