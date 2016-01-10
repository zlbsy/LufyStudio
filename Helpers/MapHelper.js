
function getMapTile(data){
	var key = data[0]+"_"+data[1];
	if(MapHelperSetting.tiles[key]){
		return MapHelperSetting.tiles[key];
	}
	var sx = (data[0]/MapHelperSetting.w >>> 0)*48;
	var sy = (data[0]%MapHelperSetting.w)*48;
	//var tile = MapHelperSetting.bitmapData.clone().setProperties(sx, sy, 48, 48);
	var tile = new LBitmapData(LMvc.datalist["tile_map"],sx, sy, 48, 48);
	var bitmapData = new LBitmapData(null,0,0,48,48, LBitmapData.DATA_CANVAS);
	var matrix = new LMatrix();
	matrix.translate(-24,-24);
	var dir = data[1];
	if(dir > 11){
		matrix.scale(-1,-1);
	}else if(dir > 7){
		matrix.scale(1,-1);
	}else if(dir > 3){
		matrix.scale(-1,1);
	}
	dir %= 4;
	matrix.rotate(dir*90);
	matrix.translate(24,24);
	bitmapData.draw(tile,matrix,null,null,new LRectangle(0, 0, 48, 48));
	MapHelperSetting.tiles[key] = bitmapData;
	return bitmapData;
}
function getTerrainId(data){
	var terrainSetting = [
	1,2,3,9,19,2,4,4,7,8,
	0,0,0,9,0,0,0,0,0,9,
	0,0,0,9,0,0,0,0,0,9,
	0,0,0,0,0,0,0,0,0,8,
	21,10,6,22,21,10,6,0,0,8,
	21,14,10,22,21,14,10,0,0,8,
	21,12,10,22,21,12,20,0,0,8,
	21,16,10,22,21,15,20,0,0,14,
	21,20,20,22,21,20,5,0,0,16,
	21,20,20,22,21,20,0,0,0,11/*,
	1, 0,0,0,21,21,21,21,21,21,
	2, 0,0,0,10,14,12,15,20,20,
	3, 0,0,0,6, 10,10,10,20,20,
	9, 9,9,0,22,22,22,22,22,22,
	19,0,0,0,21,21,21,21,21,21,
	2, 0,0,0,10,14,12,15,20,20,
	4, 0,0,0,6, 10,20,20,5, 0,
	4, 0,0,0,0, 0, 0, 0, 0, 0,
	7, 0,0,0,0, 0, 0, 0, 0, 0,
	8, 9,9,8,8, 8, 8, 14,16,11*/
	];
	return terrainSetting[data[0]];
}