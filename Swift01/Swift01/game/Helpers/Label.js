function getStrokeLabel(txt,size,color,lineColor,lineWidth,type){
	var label = LTextField.getLabel();//new LTextField();
	if(type == "htmlText"){
		label.htmlText = txt;
	}else{
		label.text = txt;
	}
	label.size = size;
	label.color = color;
	label.lineColor = lineColor;
	label.stroke = true;
	label.lineWidth = lineWidth;
	label.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	if(type == "bitmap"){
		label.cacheAsBitmap(true);
		/*var layer = new LSprite();
		layer.addChild(label);
		return getBitmap(label);*/
	}
	return label;
}
function getLabelWindow(text,size,width,height,img){
	if(typeof img == UNDEFINED){
		img = "win05";
	}
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist[img]),width,height);
	var textLabel = getStrokeLabel(text,size,"#FFFFFF","#000000",3);
	textLabel.x = (width - textLabel.getWidth()) * 0.5;
	textLabel.y = (height - textLabel.getHeight()) * 0.5;
	bitmapWin.addChild(textLabel);
	bitmapWin.cacheAsBitmap(true);
	return bitmapWin;
}