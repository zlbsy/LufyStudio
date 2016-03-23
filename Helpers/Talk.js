function Talk(){
	if(arguments.length == 6){
		TalkRun.apply(this,arguments);
	}else if(arguments.length == 4){
		TalkRun.call(this,LMvc.layer,150,arguments[0],arguments[1],arguments[2],arguments[3]);
	}else{
		TalkRun.call(this,arguments[0],150,arguments[1],arguments[2],arguments[3],arguments[4]);
	}
}
function TalkRun(layer,y,index,faceindex,msg,callback){
	if(LMvc.talkLayer && LMvc.talkLayer.parent){
		LMvc.talkLayer.remove();
	}
	var talkLayer = new LSprite();
	
	talkLayer.y = y;
	//talkLayer.x = 50;
	var model = CharacterModel.getChara(index);
	if(faceindex >= 0){
		var face = model.face();
		face.x = 200;
		talkLayer.addChild(face);
	}
	
	var back = new LBitmap(new LBitmapData(LMvc.datalist["talkbox"]));
	back.y = 130;
	back.alpha = 0.7;
	talkLayer.addChild(back);
	var nameText = new LTextField();
	nameText.size = 18;
	nameText.color = "#FFFFFF";
	nameText.text = model.name();;
	nameText.x = 30+(90 - nameText.getWidth())*0.5;
	nameText.y = back.y + 22;
	talkLayer.addChild(nameText);
	
	var msgText = new LTextField();
	msgText.name = "message";
	msgText.x = 25;
	msgText.y = 225;
	msgText.text = msg;
	msgText.size = 12;
	msgText.color = "#FFFFFF";
	msgText.width = 430;
	msgText.setWordWrap(true,23);
	//msgText.speed = 4;
	msgText.wind(callback);
	talkLayer.addChild(msgText);
	if(layer){
		layer.addChild(talkLayer);
	}else{
		LMvc.layer.addChild(talkLayer);
	}
	LMvc.talkOver = false;
	LMvc.talkLayer = talkLayer;
	talkLayer.addShape(LShape.RECT,[-talkLayer.x,-talkLayer.y,LGlobal.width,LGlobal.height]);
	talkLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){});
	talkLayer.addEventListener(LMouseEvent.MOUSE_UP, TalkRemove);
}
function TalkRemove(){
	var msgText = LMvc.talkLayer.getChildByName("message");
	console.log(msgText.constructor.name , "msgText.windRunning = " + msgText.windRunning);
	if(msgText.windRunning){
		msgText.windComplete();
		return;
	}
	LMvc.talkLayer.remove();
	LMvc.talkOver = false;
	LMvc.talkLayer = null;
	LGlobal.script.analysis();
}