function LBitmapDataObject(){
};
LBitmapDataObject.save = function(displayObject){
	var childList = projectFiles.showLayer.childList;
	for(var i=0,l=childList.length;i<l;i++){
		if(childList[i].data.name == displayObject.name){
			childList[i].data = displayObject.clone();
			console.log(childList[i].data);
			break;
		}
	}
};
