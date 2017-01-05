function getBitmapData(displayObject, cache){
	if(!cache)console.error("*********** getBitmapData *********");
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
	var bitmapWin = getPanel(img,width,50);
	//var bitmapWin = new LPanel(new LBitmapData(LMvc.datalist[img]),width,50);
	var bitmapIcon = new LBitmap(new LBitmapData(LMvc.datalist[icon],rect.x,rect.y,rect.width,rect.height));
	bitmapIcon.x = 10;
	bitmapIcon.y = (50 - bitmapIcon.getHeight()) * 0.5;
	bitmapWin.addChild(bitmapIcon);
	var textLabel = getStrokeLabel(text,18,"#FFFFFF","#000000",3);
	textLabel.x = bitmapIcon.getHeight() + (width - bitmapIcon.x - bitmapIcon.getHeight() - textLabel.getWidth()) * 0.5;
	textLabel.y = (50 - textLabel.getHeight()) * 0.5;
	bitmapWin.addChild(textLabel);
	bitmapWin.cacheAsBitmap(true);
	return new LButton(bitmapWin);
}
function getPanel(key, width, height, x1, x2, y1, y2){
	var data = GameCacher.getPanelBitmapData(key,width,height,x1,x2,y1,y2);
	var sprite = new LSprite();
	sprite.addChild(new LBitmap(data));
	return sprite;
}
function getSizeButton(text,width,height,img){
	if(typeof img == UNDEFINED){
		img = "win01";
	}
	var bitmapWin = getPanel(img,width,height);
	var textLabel = getStrokeLabel(text,18,"#FFFFFF","#000000",3);
	textLabel.name = "label";
	textLabel.x = (width - textLabel.getWidth()) * 0.5;
	textLabel.y = (height - textLabel.getHeight()) * 0.5;
	bitmapWin.addChild(textLabel);
	bitmapWin.cacheAsBitmap(true);
	var btn = new LButton(bitmapWin);
	btn.text = text;
	return btn;
}
function getButton(text,width,img){
	return getSizeButton(text,width,50,img);
}
function lockedButton(button){
	var lock = new LBitmap(new LBitmapData(LMvc.datalist["lock"]));
	lock.name = "lock";
	lock.scaleX = lock.scaleY = (button.getHeight() - 20) / lock.getHeight();
	lock.x = button.getWidth() - lock.getWidth() - 10;
	lock.y = 10;
	button.addChild(lock);
}
function playButtonSe(e){
	LPlugin.playSE(e.currentTarget.se, LPlugin.gameSetting.SE);
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
	background.scaleX = (width ? width : LMvc.screenWidth) / backgroundData.width;
	background.scaleY = (height ? height : LMvc.screenHeight) / backgroundData.height;
	return background;
}
function getBlackBitmap(width,height){
	var backgroundData = new LBitmapData(LMvc.datalist["common-black"]);
	var background = new LBitmap(backgroundData);
	background.scaleX = (width ? width : LMvc.screenWidth) / backgroundData.width;
	background.scaleY = (height ? height : LMvc.screenHeight) / backgroundData.height;
	return background;
}
/**
 *title,message,okEvent,cancelEvent 
 */
function ConfirmWindow(obj){
	//console.log("ConfirmWindow",obj);
	var windowLayer = getTranslucentMask();
	
	//var backgroundData = new LBitmapData(LMvc.datalist["win05"]);
	if(!obj.width){
		obj.width = 320;
	}
	if(!obj.height){
		obj.height = 300;
	}
	var panel = getPanel("win05",obj.width,obj.height);
	panel.x = (LMvc.screenWidth - obj.width) * 0.5;
	panel.y = (LMvc.screenHeight - obj.height) * 0.5;
	windowLayer.addChild(panel);
	var titlePanel = getPanel("win02",obj.titleWidth ? obj.titleWidth : 160,60);
	//var titleData = new LBitmapData(LMvc.datalist["win02"]);
	//var titlePanel = getBitmap(new LPanel(titleData,160,60));
	titlePanel.x = (LMvc.screenWidth - titlePanel.getWidth()) * 0.5;
	titlePanel.y = panel.y - 10;
	windowLayer.addChild(titlePanel);
	
	var title = getStrokeLabel(obj.title,20,"#FFFFFF","#000000",4);
	title.x = (LMvc.screenWidth - title.getWidth())*0.5;
	title.y = panel.y + 8;
	windowLayer.addChild(title);
	var msg;
	if(obj.subWindow){
		msg = obj.subWindow;
	}else if(obj.messageHtml){
		msg = getStrokeLabel(obj.messageHtml,16,"#FFFFFF","#000000",2,"htmlText");
		msg.width = obj.width - 60;
		msg.setWordWrap(true,27);
	}else{
		msg = getStrokeLabel(obj.message,16,"#FFFFFF","#000000",4);
		msg.width = obj.width - 60;
		msg.setWordWrap(true,27);
	}
	if(obj.width < LMvc.screenWidth){
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
		if(!obj.cancelEvent){
			obj.cancelEvent = function(event){
				event.currentTarget.parent.remove();
			};
		}
		closePanel.addEventListener(LMouseEvent.MOUSE_UP,obj.cancelEvent);
		return windowLayer;
	}
	var okPanel = getButton(Language.get("yes"), 100);//new LButton(new LBitmap(new LBitmapData(LMvc.datalist["ok"])));
	okPanel.y = panel.y + panel.getHeight() - okPanel.getHeight() - 20;
	windowLayer.addChild(okPanel);
	okPanel.name = "okButton";
	if(typeof obj.cancelEvent != UNDEFINED){
		var cancelPanel = getButton(Language.get("no"), 100);//new LButton(new LBitmap(new LBitmapData(LMvc.datalist["close"])));
		cancelPanel.se = "Se_cancel";
		cancelPanel.y = panel.y + panel.getHeight() - cancelPanel.getHeight() - 20;
		windowLayer.addChild(cancelPanel);
		
		cancelPanel.addEventListener(LMouseEvent.MOUSE_UP, obj.cancelEvent?obj.cancelEvent:function(event){
			event.currentTarget.parent.remove();
		});
	
		okPanel.x = LMvc.screenWidth*0.5 - okPanel.getWidth() - 20;
		cancelPanel.x = LMvc.screenWidth*0.5 + 20;
	}else{
		okPanel.x = (LMvc.screenWidth - okPanel.getWidth())*0.5;
	}
	okPanel.addEventListener(LMouseEvent.MOUSE_UP, obj.okEvent?obj.okEvent:function(event){
		event.currentTarget.parent.remove();
	});
	windowLayer.name = "ConfirmWindow";
	return windowLayer;
}
