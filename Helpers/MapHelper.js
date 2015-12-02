
function getMapTile(data){
	var key = data[0]+"_"+data[1];
	if(MapHelperSetting.tiles[key]){
		return MapHelperSetting.tiles[key];
	}
	var sx = (data[0]/MapHelperSetting.w >>> 0)*BattleCharacterSize.width;
	var sy = (data[0]%MapHelperSetting.w)*BattleCharacterSize.height;
	//var tile = MapHelperSetting.bitmapData.clone().setProperties(sx, sy, 48, 48);
	var tile = new LBitmapData(LMvc.datalist["tile_map"],sx, sy, BattleCharacterSize.width, BattleCharacterSize.height);
	var bitmapData = new LBitmapData(null,0,0,BattleCharacterSize.width,BattleCharacterSize.height, LBitmapData.DATA_CANVAS);
	var matrix = new LMatrix();
	matrix.translate(-24,-24);
	matrix.rotate(data[1]*90);
	matrix.translate(24,24);
	bitmapData.draw(tile,matrix,null,null,new LRectangle(0, 0, BattleCharacterSize.width, BattleCharacterSize.height));
	MapHelperSetting.tiles[key] = bitmapData;
	return bitmapData;
}
function getTerrainId(data){
	var terrainSetting = [
	1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1
	];
	return terrainSetting[data[0]];
}