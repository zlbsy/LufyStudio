function getBitmapData(displayObject){
	var bitmapData = new LBitmapData(null,0,0,displayObject.getWidth(),displayObject.getHeight(),LBitmapData.DATA_CANVAS);
	bitmapData.draw(displayObject);
	return bitmapData;
}
function getBitmap(displayObject){
	return new LBitmap(getBitmapData(displayObject));
}
function getIconButton(icon, rect, text,width,img){
	if(typeof img == UNDEFINED){
		img = "win01";
	}
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist[img]),width,50);
	var bitmapIcon = new LBitmap(new LBitmapData(LMvc.datalist[icon],rect.x,rect.y,rect.width,rect.height));
	bitmapIcon.x = 10;
	bitmapIcon.y = (50 - bitmapIcon.getHeight()) * 0.5;
	bitmapWin.addChild(bitmapIcon);
	var textLabel = getStrokeLabel(text,18,"#FFFFFF","#000000",3);
	textLabel.x = bitmapIcon.getHeight() + (width - bitmapIcon.x - bitmapIcon.getHeight() - textLabel.getWidth()) * 0.5;
	textLabel.y = (50 - textLabel.getHeight()) * 0.5;
	bitmapWin.addChild(textLabel);
	return new LButton(getBitmap(bitmapWin));
}
function getSizeButton(text,width,height,img){
	if(typeof img == UNDEFINED){
		img = "win01";
	}
	var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist[img]),width,height);
	var textLabel = getStrokeLabel(text,18,"#FFFFFF","#000000",3);
	textLabel.x = (width - textLabel.getWidth()) * 0.5;
	textLabel.y = (height - textLabel.getHeight()) * 0.5;
	bitmapWin.addChild(textLabel);
	var btn = new LButton(getBitmap(bitmapWin));
	btn.text = text;
	return btn;
}
function getButton(text,width,img){
	return getSizeButton(text,width,50,img);
}
function getTranslucentMask(){
	var layer = new LSprite();
	var windowBackgrond = getTranslucentBitmap();
	layer.addChild(windowBackgrond);
	layer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	layer.addEventListener(LMouseEvent.MOUSE_UP, function(){});
	layer.addEventListener(LMouseEvent.MOUSE_MOVE, function(){});
	layer.addEventListener(LMouseEvent.MOUSE_OVER, function(){});
	layer.addEventListener(LMouseEvent.MOUSE_OUT, function(){});
	return layer;
}
function getTranslucentBitmap(width,height){
	var backgroundData = new LBitmapData(LMvc.datalist["translucent"]);
	var background = new LBitmap(backgroundData);
	background.scaleX = (width ? width : LGlobal.width) / backgroundData.width;
	background.scaleY = (height ? height : LGlobal.height) / backgroundData.height;
	return background;
}
function getBlackBitmap(width,height){
	var backgroundData = new LBitmapData(LMvc.datalist["common-black"]);
	var background = new LBitmap(backgroundData);
	background.scaleX = (width ? width : LGlobal.width) / backgroundData.width;
	background.scaleY = (height ? height : LGlobal.height) / backgroundData.height;
	return background;
}
/**
 *title,message,okEvent,cancelEvent 
 */
function ConfirmWindow(obj){
	console.log("ConfirmWindow",obj);
	var windowLayer = getTranslucentMask();
	/*var windowBackgrond = getTranslucentBitmap();
	windowLayer.addChild(windowBackgrond);
	windowLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	windowLayer.addEventListener(LMouseEvent.MOUSE_UP, function(){});
	windowLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function(){});
	windowLayer.addEventListener(LMouseEvent.MOUSE_OVER, function(){});
	windowLayer.addEventListener(LMouseEvent.MOUSE_OUT, function(){});*/
	
	var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	if(!obj.width){
		obj.width = 320;
	}
	if(!obj.height){
		obj.height = 300;
	}
	var panel = getBitmap(new LPanel(backgroundData,obj.width,obj.height));
	panel.x = (LGlobal.width - panel.getWidth()) * 0.5;
	panel.y = (LGlobal.height - panel.getHeight()) * 0.5;
	windowLayer.addChild(panel);
	var titleData = new LBitmapData(LMvc.datalist["win02"]);
	var titlePanel = getBitmap(new LPanel(titleData,160,60));
	titlePanel.x = (LGlobal.width - titlePanel.getWidth()) * 0.5;
	titlePanel.y = panel.y - 10;
	windowLayer.addChild(titlePanel);
	
	var title = getStrokeLabel(obj.title,20,"#FFFFFF","#000000",4);
	title.x = (LGlobal.width - title.getWidth())*0.5;
	title.y = panel.y + 8;
	windowLayer.addChild(title);
	var msg;
	if(obj.subWindow){
		msg = obj.subWindow;
	}else if(obj.messageHtml){
		msg = getStrokeLabel(obj.messageHtml,16,"#FFFFFF","#000000",2,"htmlText");
		msg.width = 260;
		msg.setWordWrap(true,27);
	}else{
		msg = getStrokeLabel(obj.message,16,"#FFFFFF","#000000",4);
		msg.width = obj.width - 60;
		msg.setWordWrap(true,27);
	}
	if(obj.width < LGlobal.width){
		msg.x = panel.x + 30;
	}
	if(!obj.contentStartY){
		obj.contentStartY = 70;
	}
	msg.y = panel.y + obj.contentStartY;
	windowLayer.addChild(msg);
	
	if(obj.noButton){
		var closePanel = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
		closePanel.x = panel.x + panel.getWidth() - closePanel.getWidth() + 10;
		closePanel.y = panel.y - 10;
		windowLayer.addChild(closePanel);
		closePanel.addEventListener(LMouseEvent.MOUSE_UP,function(event){
			event.currentTarget.parent.remove();
		});
		return windowLayer;
	}
	var okPanel = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["ok"])));
	okPanel.y = panel.y + panel.getHeight() - okPanel.getHeight() - 20;
	windowLayer.addChild(okPanel);
	
	if(typeof obj.cancelEvent != UNDEFINED){
		var cancelPanel = new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
		cancelPanel.y = panel.y + panel.getHeight() - cancelPanel.getHeight() - 20;
		windowLayer.addChild(cancelPanel);
		
		cancelPanel.addEventListener(LMouseEvent.MOUSE_UP, obj.cancelEvent?obj.cancelEvent:function(event){
			event.currentTarget.parent.remove();
		});
	
		okPanel.x = LGlobal.width*0.5 - okPanel.getWidth() - 20;
		cancelPanel.x = LGlobal.width*0.5 + 20;
	}else{
		okPanel.x = (LGlobal.width - okPanel.getWidth())*0.5;
	}
	okPanel.addEventListener(LMouseEvent.MOUSE_UP, obj.okEvent?obj.okEvent:function(event){
		event.currentTarget.parent.remove();
	});
	return windowLayer;
}
