var MapHelperSetting = {
	w:10,h:10,
	bitmapData:null,
	tiles:{}
};
function getMapTile(data){
	var key = data[0]+"_"+data[1];
	if(MapHelperSetting.tiles[key]){
		return MapHelperSetting.tiles[key];
	}
	var sx = (data[0]/MapHelperSetting.w >>> 0)*48;
	var sy = (data[0]%MapHelperSetting.w)*48;
	//var tile = MapHelperSetting.bitmapData.clone().setProperties(sx, sy, 48, 48);
	var tile = new LBitmapData(datalist["tile_map"],sx, sy, 48, 48);
	var bitmapData = new LBitmapData(null,0,0,48,48, LBitmapData.DATA_CANVAS);
	var matrix = new LMatrix();
	matrix.translate(-24,-24);
	matrix.rotate(data[1]*90);
	matrix.translate(24,24);
	bitmapData.draw(tile,matrix,null,null,new LRectangle(0, 0, 48, 48));
	MapHelperSetting.tiles[key] = bitmapData;
	return bitmapData;
}