function LBitmapObject(){
};
LBitmapObject.save = function(displayObject){
	var childList = projectFiles.showLayer.childList;
	for(var i=0,l=childList.length;i<l;i++){
		if(childList[i].data.name == displayObject.name){
			childList[i].data.getChildAt(0).bitmapData = displayObject.getChildAt(0).bitmapData;
			break;
		}
	}
};
LBitmapObject.addToSprite = function(name){
	var stageList = gameStage.childList;
	var bitmapLayer = stageList[stageList.length - 1];
	if(bitmapLayer.childType != "LBitmap"){
		LMessageBox.show({
			width:340,
			height:200,
			title:"错误信息",
			message:"LBitmapData只能添加到LBitmap上！"
		});
		return;
	}
	console.log("LBitmapDataObject.addToBitmap",bitmapLayer);
	var childList = projectFiles.showLayer.childList;
	for(var i=0,l=childList.length;i<l;i++){
		if(childList[i].data.name == name){
			console.log(childList[i].data);
			bitmapLayer.getChildAt(0).bitmapData = childList[i].data.getChildAt(1).bitmapData;
			break;
		}
	}
};
